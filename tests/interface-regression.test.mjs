import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { CHARACTERS } from '../js/data/characters.js';

const source = fs.readFileSync(new URL('../js/app.js', import.meta.url), 'utf8');
const body = source.slice(source.indexOf('class EdgeOfLoveGame'), source.lastIndexOf("window.addEventListener('DOMContentLoaded'"));
function setup({localFails = false, sessionFails = false, accept = true} = {}) {
  const local = new Map(), session = new Map(), messages = [], confirmations = [];
  const ctx = {CHARACTERS, Date, console, CONTENT_VERSION:6,
    STORAGE_KEY_AUTOSAVE:'auto', STORAGE_KEY_SESSION:'session',
    localStorage:{getItem:k=>local.get(k),setItem:(k,v)=>{if(localFails)throw Error('quota');local.set(k,v);}},
    sessionStorage:{getItem:k=>session.get(k),setItem:(k,v)=>{if(sessionFails)throw Error('blocked');session.set(k,v);}},
    confirm:message=>{confirmations.push(message);return accept;}, audio:{playSelect(){}},
    document:{querySelector:()=>null,getElementById:()=>null}, window:{}};
  vm.createContext(ctx);vm.runInContext(body+'\nthis.Game=EdgeOfLoveGame;',ctx);
  const g = new ctx.Game(); g.showToast = m=>messages.push(m);g.renderSaveModal = ()=>{};
  return {g,local,session,messages,confirmations,ctx};
}

test('failed persistent saving never advances the successful-save timestamp; a session copy remains recoverable',()=>{
  const {g,session,messages}=setup({localFails:true});g.lastSavedTime='last successful save';
  assert.equal(g.autoSave(),false);assert.equal(g.lastSavedTime,'last successful save');
  assert.equal(g.saveError,true);assert.equal(g.saveSessionOnly,true);
  assert.ok(session.has('session'));assert.match(messages[0],/僅暫存/);
  g.autoSave();assert.equal(messages.length,1,'do not repeat the same failure toast every choice');
});
test('complete storage failure is disclosed without a false saved state',()=>{
  const {g,messages}=setup({localFails:true,sessionFails:true});
  assert.equal(g.autoSave(),false);assert.equal(g.lastSavedTime,null);
  assert.equal(g.saveSessionOnly,false);assert.match(messages[0],/儲存失敗/);
});
test('successful persistent save is valid even when session storage is unavailable',()=>{
  const {g,local}=setup({sessionFails:true});assert.equal(g.autoSave(),true);
  assert.ok(JSON.parse(local.get('auto')).savedAtMs);assert.equal(g.saveError,false);assert.ok(g.lastSavedTime);
});
test('newer session progress is recovered instead of stale persistent data',()=>{
  const {g,local,session}=setup();local.set('auto',JSON.stringify({savedAtMs:10}));
  session.set('session',JSON.stringify({savedAtMs:20}));
  assert.equal(JSON.parse(g.readBrowserSave('auto','session')).savedAtMs,20);
});
test('canceling a manual overwrite preserves both copies and includes original save identity',()=>{
  const {g,local,session,confirmations}=setup({accept:false});
  const old=JSON.stringify({state:{player:{name:'原主角'}},savedAt:'2026/11/15'});
  local.set('edge_of_love_slot_1',old);session.set('edge_of_love_slot_1',old);
  assert.equal(g.saveToSlot(1),false);assert.equal(local.get('edge_of_love_slot_1'),old);assert.equal(session.get('edge_of_love_slot_1'),old);
  assert.match(confirmations[0],/原主角.*2026\/11\/15/);
});
test('failed manual saving does not report a durable success',()=>{
  const {g,messages,local}=setup({localFails:true});assert.equal(g.saveToSlot(1),false);
  assert.equal(local.size,0);assert.match(messages[0],/僅暫存/);assert.doesNotMatch(messages[0],/已儲存至/);
});
test('dialog keyboard focus wraps and redirects background focus',()=>{
  const {g,ctx}=setup();let focused='';const first={focus(){focused='first';}},last={focus(){focused='last';}};
  const modal={contains:el=>el===first||el===last};ctx.document.querySelector=()=>modal;
  g.getFocusables=()=>[first,last];let prevented=false;
  ctx.document.activeElement=last;g.trapDialogFocus({key:'Tab',preventDefault(){prevented=true;}});
  assert.equal(focused,'first');assert.equal(prevented,true);
  ctx.document.activeElement=first;g.trapDialogFocus({key:'Tab',shiftKey:true,preventDefault(){}});assert.equal(focused,'last');
  ctx.document.activeElement={};g.trapDialogFocus({key:'Tab',preventDefault(){}});assert.equal(focused,'first');
});

test('canceling a load leaves the current story and automatic save untouched',()=>{
  const {g,local}=setup({accept:false});const before=JSON.stringify(g.state);
  local.set('edge_of_love_slot_1',JSON.stringify({state:{player:{name:'another'}}}));
  g.loadFromSlot(1);assert.equal(JSON.stringify(g.state),before);assert.equal(local.has('auto'),false);
});
