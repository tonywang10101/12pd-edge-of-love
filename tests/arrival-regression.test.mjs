import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { CHARACTERS } from '../js/data/characters.js';
import { getAllGameImageAssets } from '../js/ui/assetPreloader.js';

function setup(preloadResult = {done:true, percent:100, failedAssets:[]}) {
  const source = fs.readFileSync(new URL('../js/app.js', import.meta.url), 'utf8');
  const body = source.slice(source.indexOf('class EdgeOfLoveGame'), source.lastIndexOf("window.addEventListener('DOMContentLoaded'"));
  const elements = new Map([['app-root',{inert:false}],['modal-root',{innerHTML:'',querySelector:()=>null}]]);
  const store = new Map();
  const noop = () => {};
  const ctx = { CHARACTERS, CONTENT_VERSION:6, STORAGE_KEY_AUTOSAVE:'auto', STORAGE_KEY_SESSION:'session',
    Date, console, setTimeout, clearTimeout, escapeHtml:String, trackGA:noop,
    resolveAssetUrl:x=>x, getAllGameImageAssets, formatBytesMB:()=> '0.0',
    preloadAllAssets:async()=>preloadResult, audio:{playSelect:noop},
    window:{addEventListener:noop,matchMedia:()=>({matches:false,addEventListener:noop})},
    document:{getElementById:id=>elements.get(id),querySelector:()=>null,addEventListener:noop},
    localStorage:{getItem:k=>store.get(k),setItem:(k,v)=>store.set(k,v)},
    sessionStorage:{getItem:()=>null,setItem:noop} };
  vm.createContext(ctx); vm.runInContext(body+'\nthis.Game=EdgeOfLoveGame;',ctx);
  const g = new ctx.Game(); g.render=noop; g.bindGlobalEvents=noop;
  return {g,ctx,elements,store};
}

test('first visit shows loading before character selection and waits for explicit continue',async()=>{
  const {g}=setup(); g.init(); assert.equal(g.loadingState.active,true);
  await new Promise(resolve=>setImmediate(resolve)); assert.equal(g.state.initialized,false);
  assert.match(g.renderLoadingScreen(),/溫馨備註/);
  assert.match(g.renderLoadingScreen(),/前往選擇人物/);
  assert.doesNotMatch(g.renderLoadingScreen(),/指定開場對象|命運隨機邂逅/);
  g.finishPreloading(); assert.equal(g.loadingState,null); assert.equal(g.state.initialized,false);
});
test('failed downloads cannot enter character selection and may retry',async()=>{
  const {g}=setup({done:true,failedAssets:[{label:'背景音樂'}]});
  await g.beginPreloadAndStart(); g.finishPreloading();
  assert.equal(g.loadingState.active,true); assert.match(g.renderLoadingScreen(),/retry-preload/);
  assert.doesNotMatch(g.renderLoadingScreen(),/data-action="finish-preload"/);
});
test('music is part of the same preload manifest',()=>{
  const assets=getAllGameImageAssets(); assert.equal(assets.filter(a=>a.category==='audio').length,1);
  assert.ok(assets.some(a=>a.url.endsWith('apartment-at-dusk.mp3')));
});
test('no game starts or saves before agreement; consent cannot be dismissed to bypass it',()=>{
  const {g,elements,store}=setup(); g.startNewGameFromForm();
  assert.equal(g.state.initialized,false); assert.equal(store.size,0);
  assert.match(elements.get('modal-root').innerHTML,/我已閱讀並同意/);
  assert.equal(elements.get('app-root').inert,true);
  g.closeModals(); assert.notEqual(elements.get('modal-root').innerHTML,'');
  g.finalizeNewGameStart(g.pendingNewGame); assert.equal(g.state.initialized,false);
  let started=0;g.finalizeNewGameStart=()=>started++;
  g.startEntranceTransition();assert.equal(g.entranceActive,true);assert.equal(started,0);
  g.finishEntranceTransition();g.finishEntranceTransition();assert.equal(started,1);
});
test('intro story plays before the door and only then starts the door timer',()=>{
  const {g}=setup();g.startNewGameFromForm();let started=0;g.finalizeNewGameStart=()=>started++;
  g.startEntranceTransition();assert.equal(g.entrancePhase,'story');assert.equal(g.entranceTimer,undefined);
  const html=g.renderEntranceStory();
  assert.match(html,/心理與諮商研究所/);assert.match(html,/戀愛的對象/);assert.match(html,/open-entrance-door/);assert.match(html,/skip-entrance/);
  g.openEntranceDoor();assert.equal(g.entrancePhase,'door');assert.ok(g.entranceTimer);g.openEntranceDoor();
  g.finishEntranceTransition();assert.equal(started,1);assert.equal(g.entrancePhase,null);
});
test('72 hours uses numeric timestamps, strict boundary, and legacy Taiwan date formats',()=>{
  const {g}=setup(),now=new Date(2026,10,15,20).getTime(),hours=72*60*60*1000;
  assert.equal(g.isSaveExpired({savedAtMs:now-hours},now),false);
  assert.equal(g.isSaveExpired({savedAtMs:now-hours-1},now),true);
  assert.equal(g.isSaveExpired({savedAt:'2026/11/12 下午7:59:59'},now),true);
  assert.equal(g.isSaveExpired({savedAt:'2026/11/12 下午8:00:00'},now),false);
  assert.equal(g.isSaveExpired({savedAt:'invalid'},now),false);
});
test('returning stale saves prompt immediately and are not overwritten before a choice',()=>{
  const {g,store,elements}=setup();const state=g.getDefaultState();state.initialized=true;
  const payload=JSON.stringify({state,savedAtMs:Date.now()-73*60*60*1000});store.set('auto',payload);
  g.migrateState=x=>x;g.sanitizeActiveScene=()=>null;g.init();
  assert.equal(g.staleSavePending,true);assert.equal(g.loadingState,null);
  g.autoSave();assert.equal(store.get('auto'),payload);
  g.renderPageBackgroundLayer=()=>'';g.renderPage();
  assert.match(elements.get('app-root').innerHTML,/繼續上次存檔紀錄/);
  assert.match(elements.get('app-root').innerHTML,/重新開始新的遊戲/);
});
test('starting over retains manual slots and returns to loading with an uninitialized autosave',async()=>{
  const {g,store}=setup();g.state.initialized=true;g.staleSavePending=true;
  store.set('edge_of_love_slot_1','manual memory');
  g.resetForNewGame();assert.equal(g.loadingState.active,true);
  assert.equal(g.staleSavePending,false);assert.equal(g.state.initialized,false);
  assert.equal(store.get('edge_of_love_slot_1'),'manual memory');
  assert.equal(JSON.parse(store.get('auto')).state.initialized,false);
  await new Promise(resolve=>setImmediate(resolve));
  g.finishPreloading();assert.equal(g.loadingState,null);assert.equal(g.state.initialized,false);
});
