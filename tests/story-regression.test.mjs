import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {CHARACTERS,LOCATIONS,CLUSTERS} from '../js/data/characters.js';
import {DSM_REFERENCE} from '../js/data/dsmReference.js';
import * as content from '../js/data/storyContent.js';
import * as engine from '../js/data/eventTreeEngine.js';
import {SCENARIOS_CLUSTER_A as A} from '../js/data/scenarios_cluster_a.js';
import {SCENARIOS_CLUSTER_B as B} from '../js/data/scenarios_cluster_b.js';
import {SCENARIOS_CLUSTER_C_OTHER as C} from '../js/data/scenarios_cluster_c_other.js';
const source=fs.readFileSync(new URL('../js/app.js',import.meta.url),'utf8');
const body=source.slice(source.indexOf('class EdgeOfLoveGame'),source.lastIndexOf("window.addEventListener('DOMContentLoaded'"));
const noop=()=>{};
const esc=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const all={...A,...B,...C};
const ctx={...engine,...content,CHARACTERS,LOCATIONS,CLUSTERS,DSM_REFERENCE,ALL_SCENARIOS:all,audio:new Proxy({},{get:()=>noop}),trackGA:noop,escapeHtml:esc,resolveAssetUrl:x=>x,renderCharacterSVG:()=>'<img alt="portrait">',getSceneBackground:()=>({name:'公寓',imagePath:'./assets/backgrounds/apartment.jpg'}),window:{},document:{getElementById:()=>null},Date,console};
vm.createContext(ctx);vm.runInContext(body+'\nthis.Game=EdgeOfLoveGame;',ctx);
function game(){const g=new ctx.Game();for(const key of ['render','autoSave','showToast','renderAchievementModal','renderRouteUnlockModal'])g[key]=noop;g.state.initialized=true;g.state.unlockedRoutes=CHARACTERS.map(c=>c.id);return g;}
function playEvent(g,id,num,pick=()=>0){g.startEvent(id,num);let limit=0;while(g.activeScene?.mode==='event'&&limit++<30){const sc=g.activeScene,n=sc.eventData.nodes[sc.nodeIndex];if(n.choices?.length&&!sc.awaitingNextAfterChoice)g.handleChoiceSelect(pick(n,sc));else g.handleNextNode();}assert.ok(limit<30);}
// 調整過的角色：單一風格不會走到真結局，'romantic' 改走設計路線
const TUNED_ENDS={su_fei:{second:'normalEnd',reasoning:'triggerEnd','romance-style':'triggerEnd',friend:'codependentEnd',distance:'normalEnd',boundary:'triggerEnd',pause:'triggerEnd'},
 shen_mo:{second:'normalEnd',reasoning:'normalEnd','romance-style':'triggerEnd',friend:'triggerEnd',distance:'normalEnd',boundary:'normalEnd',pause:'triggerEnd'},
 gu_qingcheng:{second:'normalEnd',reasoning:'normalEnd','romance-style':'codependentEnd',friend:'friendEnd',distance:'normalEnd',boundary:'trueEnd',pause:'triggerEnd'},
 bai_xiaolu:{second:'trueEnd',reasoning:'codependentEnd','romance-style':'codependentEnd',friend:'friendEnd',distance:'normalEnd',boundary:'triggerEnd',pause:'triggerEnd'},
 han_xiao:{second:'codependentEnd',reasoning:'normalEnd','romance-style':'triggerEnd',friend:'triggerEnd',distance:'normalEnd',boundary:'triggerEnd',pause:'normalEnd'},
 xia_le:{second:'normalEnd',reasoning:'normalEnd','romance-style':'triggerEnd',friend:'codependentEnd',distance:'normalEnd',boundary:'trueEnd',pause:'triggerEnd'},
 ruri:{second:'normalEnd',reasoning:'normalEnd','romance-style':'triggerEnd',friend:'friendEnd',distance:'normalEnd',boundary:'triggerEnd',pause:'triggerEnd'},
 you_ziqian:{second:'normalEnd',reasoning:'normalEnd','romance-style':'codependentEnd',friend:'friendEnd',distance:'normalEnd',boundary:'normalEnd',pause:'triggerEnd'},
 ji_yan:{second:'normalEnd',reasoning:'triggerEnd','romance-style':'normalEnd',friend:'triggerEnd',distance:'normalEnd',boundary:'trueEnd',pause:'normalEnd'},
 lin_jianwei:{second:'normalEnd',reasoning:'normalEnd','romance-style':'triggerEnd',friend:'triggerEnd',distance:'normalEnd',boundary:'triggerEnd',pause:'triggerEnd'},
 lu_qinglan:{second:'normalEnd',reasoning:'normalEnd','romance-style':'normalEnd',friend:'friendEnd',distance:'normalEnd',boundary:'normalEnd',pause:'triggerEnd'},
 wen_yan:{second:'trueEnd',reasoning:'normalEnd','romance-style':'triggerEnd',friend:'friendEnd',distance:'normalEnd',boundary:'triggerEnd',pause:'triggerEnd'}};
const expectEnd=(id,policy,fallback)=>TUNED_ENDS[id]?.[policy]||fallback;
// 一路挑戰對多數角色是「讓對方想保持距離」；韓梟例外（挑戰讓他尊重你），改用一路戀愛攻略
const pauseKind=id=>({han_xiao:'romance-style',xia_le:'romance-style',ji_yan:'reasoning'})[id]||'pause';
function route(id,kind){
 const g=game(),designed=kind==='romantic'&&content.getTuning(id)?.designedRoute;
 for(let e=1;e<=13;e++)playEvent(g,id,e,()=>designed?designed[e-1]:kind==='second'?1:kind==='reasoning'?3:kind==='romance-style'?4:kind==='pause'?2:0);
 if(kind==='boundary'){
  const ev=g.getEventsForChar(id).find(e=>e.nodes[1]?.choices.some(c=>!c.healthy));
  for(let n=0;n<12;n++)playEvent(g,id,ev.eventNumber,()=>2);
 }
 playEvent(g,id,14,()=>kind==='friend'?1:kind==='distance'?2:0);return g;
}

test('all scenes have explicit, valid evidence and three untagged daily scenes',()=>{
 assert.equal(CHARACTERS.length,12);
 for(const c of CHARACTERS){const events=engine.getCharacter15Events(c.id);assert.equal(events.length,15);assert.equal(events.filter(e=>e.nodes.some(n=>n.choices)).length,14);assert.equal(events[7].unlockCriteria.length,0);assert.equal(events[7].unlockDiagnosisOnComplete,undefined);
 for(const e of events){for(const id of e.unlockCriteria||[])assert.ok(c.criteria.some(x=>x.id===id),`${c.id} ${e.code} ${id}`);for(const n of e.nodes)if(n.choices)assert.ok(n.choices.filter(x=>x.healthy).length>=2);}
 for(const no of [2,6,13])assert.equal(events[no-1].unlockCriteria.length,0);
 for(const cr of c.criteria){if(!cr.behavioralAnchor)continue;const ev=events.find(e=>e.code===cr.behavioralAnchor.eventCode);assert.ok(ev.unlockCriteria.includes(cr.id)||ev.candidateCriteria.includes(cr.id));assert.ok(ev.nodes.some(n=>n.text===cr.behavioralAnchor.quote));}
 }
});
for(const c of CHARACTERS){test(c.name+': consent, multiple good choices, five endings, and no unearned evidence',()=>{
 for(let [policy,end]of [['romantic','trueEnd'],['second','trueEnd'],['reasoning','trueEnd'],['romance-style','trueEnd'],['friend','friendEnd'],['distance','normalEnd'],['boundary','codependentEnd'],['pause','triggerEnd']]){
  end=expectEnd(c.id,policy,end);const g=route(c.id,policy),cs=g.state.characters[c.id];assert.equal(g.activeScene.endingKey,end,policy);assert.equal(cs.eventCompleted,15);assert.equal(cs.caseStudyUnlocked,true);assert.equal(cs.diagnosed,undefined);if(!TUNED_ENDS[c.id])assert.equal(cs.perfectAchieved,['romantic','second','reasoning','romance-style','friend','distance'].includes(policy));
  const actual=new Set(g.getEventsForChar(c.id).flatMap(e=>e.unlockCriteria||[]));assert.deepEqual([...cs.unlockedCriteria].sort(),[...actual].sort());
  const before=JSON.stringify(cs);g.showEndingForCharacter(c.id,'trueEnd');assert.equal(JSON.stringify(cs),before,'preview must not mutate saved outcome');assert.equal(g.activeScene.preview,true);g.showEndingForCharacter(c.id);assert.equal(g.activeScene.endingKey,end);
  assert.ok(!g.renderEndingScene(c,cs,g.getRouteType(c),g.getDiagnosisDisplay(c)).includes('[object Object]'));
 }
 const g=route(c.id,'romantic');playEvent(g,c.id,14,()=>1);assert.equal(g.activeScene.endingKey,'friendEnd','explicit later refusal overrides high scores');assert.equal(g.getRelationshipStatusInfo(c,g.state.characters[c.id]).label,'🌿 完整友情');
});}

test('E08 disclosure does not add missing evidence, and preview does not fabricate it',()=>{const g=game(),id='lin_jianwei';for(let e=1;e<=7;e++)playEvent(g,id,e);const before=[...g.state.characters[id].unlockedCriteria];g.state.studyMode=true;g.renderEvidenceChecklist(CHARACTERS[1]);assert.deepEqual([...g.state.characters[id].unlockedCriteria],before);playEvent(g,id,8);assert.deepEqual([...g.state.characters[id].unlockedCriteria],before);assert.ok(!before.includes('F60.1-A3'));assert.ok(!before.includes('F60.1-A4'));});
test('cannot skip ahead or finish on an unchosen decision; duplicate input has no effect',()=>{const g=game();g.startEvent('shen_mo',8);assert.equal(g.activeScene,null);g.showEndingForCharacter('shen_mo');assert.equal(g.state.characters.shen_mo.eventCompleted,0);g.startEvent('shen_mo',1);g.handleNextNode();g.handleChoiceSelect(0);const before=JSON.stringify(g.state);g.handleChoiceSelect(0);assert.equal(JSON.stringify(g.state),before);});
test('legacy saves archive old histories without granting revised evidence or consent',()=>{const g=game(),old=JSON.parse(JSON.stringify(g.state));delete old.contentVersion;old.characters.shen_mo.eventCompleted=15;old.characters.shen_mo.unlockedCriteria=['F60.0-A7'];old.characters.shen_mo.diary=[{context:'old memory'}];old.characters.shen_mo.diagnosed=true;const migrated=g.migrateState(old);assert.equal(migrated.characters.shen_mo.eventCompleted,0);assert.equal(migrated.characters.shen_mo.caseStudyUnlocked,false);assert.equal(migrated.characters.shen_mo.unlockedCriteria.length,0);assert.equal(migrated.characters.shen_mo.relationshipIntent,null);assert.equal(migrated.legacyArchive.characters.shen_mo.diary[0].context,'old memory');assert.equal(migrated.unlockedRoutes.length,12);g.state=migrated;assert.equal(g.sanitizeActiveScene({mode:'event',charId:'shen_mo',eventNumber:12}),null);});
test('structured and legacy summaries are rendered safely; teaching and relationship scores are separate',()=>{const g=game();assert.match(g.renderStudySummary({title:'<title>',points:['<script>']}),/&lt;script&gt;/);assert.ok(!g.renderStudySummary({title:'t',points:['p']}).includes('[object Object]'));assert.match(g.renderStudySummary('legacy'),/legacy/);assert.match(g.renderStudySummary(['history item'],'case'),/history item/);assert.match(g.renderCaseStudy('su_fei'),/成年早期/);const cs=g.state.characters.shen_mo,before=JSON.stringify([cs.affection,cs.security,cs.boundary]);cs.knowledge.E08={answered:true,correct:true};assert.equal(JSON.stringify([cs.affection,cs.security,cs.boundary]),before);});
test('daily choices make small changes once per selection without manufacturing consent or evidence',()=>{
 for(const pick of [0,1,2,3,4]){const g=game(),id='bai_xiaolu',cs=g.state.characters[id];
 const before={affection:cs.affection,security:cs.security,boundary:cs.boundary};
 g.state.characters[id].eventCompleted=Math.max(2,g.state.characters[id].eventCompleted);g.startDailyTalk(id);g.handleDailyChoice(pick);
 assert.ok(Object.keys(before).some(k=>cs[k]!==before[k]),'each choice changes at least one value');
 for(const k of Object.keys(before))assert.ok(Math.abs(cs[k]-before[k])<=2,k);
 const after=JSON.stringify(cs);g.handleDailyChoice(pick);assert.equal(JSON.stringify(cs),after,'resolved choice cannot apply twice');
 assert.equal(cs.relationshipIntent,null);assert.equal(cs.unlockedCriteria.length,0);assert.equal(Object.keys(cs.memories).length,0);
 assert.ok(g.renderActiveScene().includes('delta-badge'));
 }
});
test('privacy decisions have visible later consequences',()=>{const g=game(),id='shen_mo';for(let e=1;e<=10;e++)playEvent(g,id,e);g.startEvent(id,11);assert.match(g.activeScene.eventData.continuityText,/拍/);assert.match(g.activeScene.eventData.continuityText,/隱私界線還是有效|隱私界線仍然有效/);});
test('replay uses raw decision quality but diminishes numeric gains',()=>{const g=route('wen_yan','romantic');g.state.characters.wen_yan.affection=10;playEvent(g,'wen_yan',1);assert.equal(g.state.characters.wen_yan.affection,11);assert.equal(g.state.characters.wen_yan.choiceScores['1_1'].affection,1);assert.equal(g.getPerfectInfo('wen_yan').isPerfect,true);});

test('current saves restore pending choices, learning answers, evidence, and earned friendship',()=>{
 const g=game(),id='ruri';for(let e=1;e<=7;e++)playEvent(g,id,e);g.startEvent(id,8);g.handleNextNode();g.handleChoiceSelect(0);
 g.state.characters[id].knowledge.E08={answered:true,correct:true};
 const saved=JSON.parse(JSON.stringify(g.state)),scene=JSON.parse(JSON.stringify({...g.activeScene,contentVersion:content.CONTENT_VERSION}));
 const restored=game();restored.state=restored.migrateState(saved);restored.activeScene=restored.sanitizeActiveScene(scene);
 assert.equal(restored.activeScene.eventNumber,8);assert.equal(restored.activeScene.awaitingNextAfterChoice,true);assert.equal(restored.state.characters[id].knowledge.E08.correct,true);
 assert.deepEqual([...restored.state.characters[id].unlockedCriteria],[...g.state.characters[id].unlockedCriteria]);
 restored.handleNextNode();for(let e=9;e<=14;e++)playEvent(restored,id,e,()=>e===14?1:0);
 const endScene=JSON.parse(JSON.stringify({...restored.activeScene,contentVersion:content.CONTENT_VERSION}));
 restored.state=restored.migrateState(restored.state);restored.activeScene=restored.sanitizeActiveScene(endScene);
 assert.equal(restored.activeScene.endingKey,'friendEnd');assert.equal(restored.state.characters[id].relationshipIntent,'friendship');assert.equal(restored.state.characters[id].perfectAchieved,true);
});
test('ordinary interaction has no clinical judgment panel or fabricated score display',()=>{
 const g=game();g.state.characters.xia_le.eventCompleted=2;g.startDailyTalk('xia_le');g.handleDailyChoice(0);
 const c=CHARACTERS.find(c=>c.id==='xia_le');const html=g.renderDailyScene(c,g.state.characters[c.id],g.getRouteType(c),{});
 assert.ok(!html.includes('DSM 臨床觀察判斷'));assert.ok(!html.includes('outcome-deltas'));assert.ok(!html.includes('[object Object]'));
 for(const c of CHARACTERS){const events=g.getEventsForChar(c.id);assert.match(events[7].ambience,/第 3 週/);assert.match(events[14].ambience,/第 7 週/);}
});

test('uncertain experiences stay uncertain through save restoration and do not become counted evidence',()=>{
 for(const [id,key,event] of [['su_fei','F60.3-A9',12]]){
  const g=game();for(let e=1;e<=event;e++)playEvent(g,id,e);
  const cs=g.state.characters[id];assert.ok(!cs.unlockedCriteria.includes(key));assert.ok(cs.uncertainCriteria.includes(key));assert.equal(cs.evidenceLog[key][0].status,'uncertain');
  g.state=g.migrateState(JSON.parse(JSON.stringify(g.state)));
  assert.ok(g.state.characters[id].uncertainCriteria.includes(key));assert.ok(!g.state.characters[id].unlockedCriteria.includes(key));
 }
 const x=content.buildRouteEvents('xia_le');assert.deepEqual(x[0].unlockCriteria,['F60.4-A1']);
 const lu=content.buildRouteEvents('lu_qinglan');assert.equal(lu[9].unlockCriteria.length,0);assert.ok(lu[10].unlockCriteria.includes('F07.0-E'));
});

test('source provenance and multiple distinct item bases survive in journal and actual evidence',()=>{
 const g=game();for(let e=1;e<=7;e++)playEvent(g,'gu_qingcheng',e);
 const cs=g.state.characters.gu_qingcheng,entry=cs.diary[0];assert.equal(entry.criteriaBasis.length,3);assert.ok(entry.context.includes('助理'));
 const bases=entry.criteriaBasis.map(c=>entry.evidence[c.id].basis);assert.equal(new Set(bases).size,3);
 assert.ok(cs.evidenceLog['F60.81-A6'][0].sources.includes('本幕行為'));
 g.state.studyMode=true;
 const html=g.renderCharacterDiaryDrawer(CHARACTERS.find(c=>c.id==='gu_qingcheng'),cs);
 for(const cr of entry.criteriaBasis)assert.ok(html.includes(cr.code));assert.ok(html.includes('原始情境與對話'));
 playEvent(g,'gu_qingcheng',8);playEvent(g,'gu_qingcheng',9);playEvent(g,'gu_qingcheng',10);
 const ordinary=cs.diary.find(d=>d.code==='E06');assert.equal(ordinary.clinical,false);
 assert.ok(!g.renderCharacterDiaryDrawer(CHARACTERS[0],{diary:[ordinary]}).includes('觀察線索與限制'));
});

test('a temporary privacy hold is never described as deletion and persists on reload',()=>{
 const id='shen_mo',g=game();for(let e=1;e<=9;e++)playEvent(g,id,e);playEvent(g,id,10,()=>1);
 g.startEvent(id,11);assert.match(g.activeScene.eventData.continuityText,/仍封存/);assert.match(g.activeScene.eventData.continuityText,/沒有刪除|還沒有|還沒/);
 const state=JSON.parse(JSON.stringify(g.state)),scene=JSON.parse(JSON.stringify({...g.activeScene,contentVersion:content.CONTENT_VERSION}));const h=game();h.state=h.migrateState(state);h.activeScene=h.sanitizeActiveScene(scene);assert.match(h.activeScene.eventData.continuityText,/仍封存/);
 playEvent(h,id,10,()=>0);h.startEvent(id,11);assert.match(h.activeScene.eventData.continuityText,/刪除|銷毀/);assert.ok(!h.activeScene.eventData.continuityText.includes('仍封存'));
});

test('unfinished tasks do not magically produce autonomous success at E13',()=>{
 const g=game(),id='you_ziqian';for(let e=1;e<=12;e++)playEvent(g,id,e,()=>e===3?2:0);g.startEvent(id,13);
 assert.match(g.activeScene.eventData.continuityText,/還沒恢復/);assert.equal(g.activeScene.eventData.nodes[1].text,content.STORY_ROUTES[id].ordinary[2].line);assert.notEqual(g.activeScene.eventData.nodes[0].text,content.STORY_ROUTES[id].ordinary[2].context);assert.match(g.activeScene.eventData.nodes[0].text,/「誰的事誰決定」還沒談好/);assert.ok(!g.activeScene.eventData.nodes[1].choices[0].reply.includes('該簽的名字'));
 assert.ok(g.activeScene.eventData.nodes[1].choices.every(c=>!c.memory));
});

test('character refusal, player refusal and relationship quality are independent',()=>{
 for(const c of CHARACTERS){
  const g=route(c.id,pauseKind(c.id)),cs=g.state.characters[c.id];
  assert.equal(cs.relationshipIntent,'romantic');assert.equal(cs.characterConsent,'distance');assert.equal(g.activeScene.endingKey,'triggerEnd');
  playEvent(g,c.id,14,()=>1);assert.equal(cs.relationshipIntent,'friendship');assert.equal(g.activeScene.endingKey,'triggerEnd');
 }
 const h=route('shen_mo','romantic');playEvent(h,'shen_mo',14,()=>2);
 assert.equal(h.activeScene.endingKey,'normalEnd');assert.equal(h.state.characters.shen_mo.characterConsent,'distance');
});

test('learning records first attempts and feedback without delayed review or relationship rewards',()=>{
 const g=game(),id='ruri',cs=g.state.characters[id];assert.equal(g.answerLearning(id,'e03_bricks','evidence'),false,'no future quiz before reading');
 for(let e=1;e<=3;e++)playEvent(g,id,e);
 const before=JSON.stringify([cs.affection,cs.security,cs.boundary,cs.unlockedCriteria,cs.uncertainCriteria]);
 assert.equal(g.answerLearning(id,'e03_bricks','alternative'),true);assert.equal(cs.knowledge.e03_bricks.firstCorrect,false);assert.equal(g.answerLearning(id,'e03_bricks','alternative'),false);
 assert.equal(g.answerLearning(id,'e03_bricks','evidence'),true);assert.equal(cs.knowledge.e03_bricks.correct,true);assert.equal(cs.knowledge.e03_bricks.firstCorrect,false);assert.equal(cs.knowledge.e03_bricks.attempts.length,2);
 assert.equal(JSON.stringify([cs.affection,cs.security,cs.boundary,cs.unlockedCriteria,cs.uncertainCriteria]),before);
 for(let e=4;e<=14;e++)playEvent(g,id,e);
 assert.equal(g.answerLearning(id,'transfer','alternative'),true);assert.equal(cs.knowledge.transfer.reviewDueAt,undefined);assert.equal(cs.knowledge.transfer.revision,content.LEARNING_REVISION);
 const restored=g.migrateState(JSON.parse(JSON.stringify(g.state)));assert.equal(restored.characters[id].knowledge.e03_bricks.firstCorrect,false);assert.equal(restored.characters[id].knowledge.transfer.firstCorrect,false);
 g.showEndingForCharacter(id,'normalEnd');assert.equal(g.answerLearning(id,'e12_smile','evidence'),false,'preview is not a new learning context');
});

test('all lesson options have specific feedback; all chapters render without missing content',()=>{
 const questions=[];
 for(const c of CHARACTERS){
  const g=game();for(let e=1;e<=14;e++){
   g.startEvent(c.id,e);let guard=0;while(g.activeScene?.mode==='event'&&guard++<25){const sc=g.activeScene,node=sc.eventData.nodes[sc.nodeIndex];const html=g.renderActiveScene();assert.ok(!html.includes('[object Object]'));assert.ok(!html.includes('undefined'));
    if(node.choices&&!sc.awaitingNextAfterChoice)g.handleChoiceSelect(0);else g.handleNextNode();
   }
  }
  assert.ok(!g.renderActiveScene().includes('undefined'));
  for(const stage of content.LEARNING_STAGES)for(const t of content.getLearningTasks(c.id,stage)){questions.push(t.prompt);assert.equal(t.options.filter(x=>x.correct).length,1);assert.equal(new Set(t.options.map(x=>x.feedback)).size,3);assert.ok(t.options.every(x=>x.feedback.length>8));}
 }
 assert.equal(questions.length,96);assert.equal(new Set(questions).size,96);
});

test('v5 archive preserves previous archives; chapter picker and completed home offer real replay',()=>{
 const g=game(),old=JSON.parse(JSON.stringify(g.state));old.contentVersion=5;old.legacyArchive={version:4,characters:{shen_mo:{diary:[{context:'v4 memory'}]}}};old.characters.xia_le.eventCompleted=15;old.characters.xia_le.diary=[{context:'v5 memory'}];
 const next=g.migrateState(old);assert.equal(next.legacyArchive.version,5);assert.equal(next.legacyArchive.previousArchive.version,4);assert.equal(next.legacyArchive.characters.xia_le.diary[0].context,'v5 memory');assert.equal(next.characters.xia_le.eventCompleted,0);
 for(const c of CHARACTERS){g.state.characters[c.id].eventCompleted=15;g.state.metCharacters.push(c.id);}
 const home=g.renderLocationExplorer();assert.ok(home.includes('選幕重玩'));assert.ok(home.includes('open-learning'));
 assert.ok(g.renderCharacterCard(CHARACTERS[0]).includes('open-event-tree-modal'));
});

test('evidence restoration rejects unrelated scenes and keeps self-report distinct from a medical summary',()=>{
 const g=game(),id='han_xiao';for(let e=1;e<=7;e++)playEvent(g,id,e);
 const saved=JSON.parse(JSON.stringify(g.state)),cs=saved.characters[id];
 cs.evidenceLog['F60.2-C'][0].sources=['本人同意分享的專業摘要'];
 cs.evidenceLog['F60.2-A1']=[{eventCode:'E02',quote:'a daily conversation is not a criterion'}];
 const restored=g.migrateState(saved).characters[id];assert.deepEqual([...restored.evidenceLog['F60.2-C'][0].sources],['本人回顧']);assert.ok(!restored.unlockedCriteria.includes('F60.2-A1'));assert.equal(restored.evidenceLog['F60.2-A1'],undefined);
});


test('teaching mode changes presentation without changing choices, records or progress',()=>{
 const g=game(),id='su_fei';for(let n=1;n<=2;n++)playEvent(g,id,n);
 g.startEvent(id,3);g.handleNextNode();g.handleChoiceSelect(0);
 const before=JSON.stringify(g.state.characters[id]),scene=JSON.stringify(g.activeScene);
 g.state.studyMode=false;const story=g.renderActiveScene();
 assert.ok(!story.includes('outcome-dsm-judgment-panel'));assert.ok(story.includes('learning-prompt'),'quizzes stay visible with teaching mode off');assert.ok(story.includes('隨堂小考'));assert.ok(story.includes('vn-live-stats'));assert.ok(story.includes('delta-badge'));
 for(const label of ['好感度','安全感','邊界感'])assert.ok(story.includes(label));
 g.state.studyMode=true;const teaching=g.renderActiveScene();
 for(const marker of ['outcome-dsm-judgment-panel','learning-prompt','vn-live-stats'])assert.ok(teaching.includes(marker),marker);
 assert.equal(JSON.stringify(g.state.characters[id]),before);assert.equal(JSON.stringify(g.activeScene),scene);
 const c=CHARACTERS.find(c=>c.id===id);assert.ok(g.renderCharacterDiaryDrawer(c,g.state.characters[id]).includes('diary-dsm-block'));
 g.state.studyMode=false;assert.ok(!g.renderCharacterDiaryDrawer(c,g.state.characters[id]).includes('diary-dsm-block'));
 assert.ok(g.renderCharacterDiaryDrawer(c,g.state.characters[id],false).includes('diary-dsm-block'),'manual dossier stays available');
});

test('authored response emotions survive selection, reloading and daily interactions',()=>{
 for(const c of CHARACTERS){const g=game(),id=c.id;for(let n=1;n<=2;n++)playEvent(g,id,n);
 g.startEvent(id,3);g.handleNextNode();const choice=g.activeScene.eventData.nodes[1].choices[0];g.handleChoiceSelect(0);
 assert.equal(g.activeScene.expression,choice.expression);
 const restored=g.sanitizeActiveScene({...JSON.parse(JSON.stringify(g.activeScene)),contentVersion:content.CONTENT_VERSION,expression:'smile'});
 assert.equal(restored.expression,choice.expression);assert.equal(restored.lastChoiceOutcome.reply,choice.reply);
 g.state.characters[id].eventCompleted=Math.max(2,g.state.characters[id].eventCompleted);g.startDailyTalk(id);const mood=g.activeScene.talk.choices[0].expression||'neutral';g.handleDailyChoice(0);assert.equal(g.activeScene.expression,mood);
 }
});

test('E08 quietly unlocks the next route without revealing the complete author dossier',()=>{
 for(const studyMode of [false,true]){const g=game();g.state.studyMode=studyMode;let popups=0;g.renderAchievementModal=()=>popups++;
 for(let e=1;e<=8;e++)playEvent(g,'shen_mo',e);assert.equal(g.state.characters.shen_mo.caseStudyUnlocked,true);assert.equal(popups,0);}
});


test('all three relationship metrics influence the relationship definition and willingness',()=>{
 const g=game(),c=CHARACTERS[0],cs=g.state.characters[c.id];
 cs.eventCompleted=5;cs.affection=35;cs.security=40;cs.boundary=60;cs.memories={ordinary_0:{},ordinary_1:{}};
 assert.match(g.getRelationshipStatusInfo(c,cs).label,/曖昧/);assert.equal(g.getCharacterConsent(c.id),'romantic');
 cs.affection=12;assert.doesNotMatch(g.getRelationshipStatusInfo(c,cs).label,/曖昧/);assert.equal(g.getCharacterConsent(c.id),'friendship');
 cs.affection=35;cs.security=15;assert.match(g.getRelationshipStatusInfo(c,cs).label,/戒備/);assert.equal(g.getCharacterConsent(c.id),'distance');
 cs.security=40;cs.boundary=35;assert.match(g.getRelationshipStatusInfo(c,cs).label,/失衡/);assert.equal(g.getCharacterConsent(c.id),'friendship');
 assert.equal(g.getEthicsInfo(c.id).exists,false,'a low score alone does not fabricate misconduct');
});

test('documented historical interference retains its consequences without labelling new insecurity as misconduct',()=>{
 for(const c of CHARACTERS){const g=route(c.id,'boundary'),cs=g.state.characters[c.id];
 assert.equal(g.activeScene.endingKey,expectEnd(c.id,'boundary','codependentEnd'));assert.equal(cs.ethicsIncidents.length,0);
 g.applyStats(c.id,{boundary:-Math.max(15,cs.boundary-20)});
 g.recordBoundaryConsequence(c.id,{text:'「未經同意代寄私人資料。」',ethicalRisk:true,stats:{boundary:-1}},{code:'legacy:E10',title:'舊版明確干預紀錄'});
 assert.ok(cs.ethicsIncidents.length);assert.equal(g.getEthicsInfo(c.id).active,true);
 const h=game();h.state=h.migrateState(JSON.parse(JSON.stringify(g.state)));
 assert.equal(h.state.characters[c.id].ethicsIncidents.length,cs.ethicsIncidents.length);
 g.startEvent(c.id,11);assert.ok(g.activeScene.eventData.continuityText.includes(content.STORY_ROUTES[c.id].ethicsContext));
 const count=cs.ethicsIncidents.length;g.applyStats(c.id,{boundary:100});
 assert.equal(g.getEthicsInfo(c.id).active,false);assert.equal(g.getEthicsInfo(c.id).exists,true);assert.equal(cs.ethicsIncidents.length,count);
 }
});

test('displayed relationship changes report only the points actually applied at the limits',()=>{
 const g=game(),id='lin_jianwei',cs=g.state.characters[id];cs.affection=99;cs.security=99;cs.boundary=99;
 g.startEvent(id,1);g.handleNextNode();g.handleChoiceSelect(3);
 for(const key of ['affection','security','boundary']){assert.equal(cs[key],100);assert.equal(g.activeScene.lastChoiceOutcome.stats[key],1);}
 assert.equal(cs.choiceScores['1_1'].affection,2,'raw decision quality is independent of the capped display');
 g.state.characters[id].eventCompleted=Math.max(2,g.state.characters[id].eventCompleted);g.startDailyTalk(id);g.handleDailyChoice(0);assert.ok(Object.values(g.activeScene.picked.stats).every(x=>x===0));
});


test('expressing insecurity does not invent enacted interference or ethical incidents',()=>{
 for(const c of CHARACTERS){const g=route(c.id,'pause'),cs=g.state.characters[c.id];
 assert.equal(cs.ethicsIncidents.length,0);assert.equal(g.getEthicsInfo(c.id).exists,false);
 const restored=g.migrateState(JSON.parse(JSON.stringify(g.state)));assert.equal(restored.characters[c.id].ethicsIncidents.length,0);
 for(const d of Object.values(cs.choiceEffects))if(d?.task)assert.notEqual(d.status,'takenOver');
 }
});

test('reference tool is character-independent and switches one diagnosis at a time',()=>{
 const g=game(),before=JSON.stringify(g.state);
 let html=g.renderSideDsmCriteriaWidget();
 for(const removed of ['12 位角色與證據','一般準則','dsm-char-pill','data-char-id','jump-dsm-ref'])assert.ok(!html.includes(removed),removed);
 for(const c of CHARACTERS)assert.ok(!html.includes(c.name));
 assert.equal(g.selectedDsmRefCode,null);assert.ok(!html.includes('data-reference-code='));
 const options=g.getDsmReferenceOptions();assert.equal(options.length,14);assert.equal(options[0].code,'GENERAL');
 for(const {code}of options){assert.equal(g.selectDsmReference(code),true);html=g.renderSideDsmCriteriaWidget();assert.equal((html.match(/data-reference-code=/g)||[]).length,1);assert.ok(html.includes(`data-reference-code="${code}"`));assert.ok(html.includes('aria-pressed="true"'));}
 const selected=g.selectedDsmRefCode;assert.equal(g.selectDsmReference('unknown'),false);assert.equal(g.selectedDsmRefCode,selected);assert.equal(JSON.stringify(g.state),before,'reading references cannot modify story or evidence');
 g.startEvent('han_xiao',1);assert.equal(g.selectedDsmRefCode,selected,'new scenes cannot auto-select their diagnosis');
});

test('shared scenes show both present residents through choices and restoration',()=>{
 for(const c of CHARACTERS){const g=game();for(let e=1;e<=9;e++){
 g.startEvent(c.id,e);const sc=g.activeScene;let html=g.renderActiveScene();
 const partner=sc.eventData.partnerId;
 assert.equal((html.match(/data-cast-char-id=/g)||[]).length,partner?2:1,`${c.id} E${e}`);
 if(partner){assert.ok(html.includes(`data-cast-char-id="${c.id}"`));assert.ok(html.includes(`data-cast-char-id="${partner}"`));
 const partnerBefore=JSON.stringify(g.state.characters[partner]);g.handleNextNode();g.handleChoiceSelect(0);html=g.renderActiveScene();assert.equal((html.match(/data-cast-char-id=/g)||[]).length,2);assert.equal(JSON.stringify(g.state.characters[partner]),partnerBefore,'showing a participant must not award them unplayed evidence or intimacy');
 g.activeScene=g.sanitizeActiveScene({...JSON.parse(JSON.stringify(g.activeScene)),contentVersion:content.CONTENT_VERSION});assert.equal((g.renderActiveScene().match(/data-cast-char-id=/g)||[]).length,2);g.handleNextNode();
 }else playEvent(g,c.id,e);
 }}
});


test('scene narration stays between 100 and 150 characters and replies stay brief',()=>{
 const check=(text,label,min=100)=>{const count=[...text.replace(/\s/g,'')].length;assert.ok(count>=min&&count<=150,`${label}: ${count} characters`);};
 check(content.OPENING_NARRATIVE,'opening');
 for(const c of CHARACTERS){
  for(const policy of ['romantic','second','friend','distance','boundary','pause']){
   const g=game();for(let e=1;e<=14;e++){
    g.startEvent(c.id,e);const sc=g.activeScene;check(sc.eventData.nodes[0].text,`${c.id} ${policy} E${e} context`);
    for(const [index,choice]of sc.eventData.nodes[1].choices.entries())check(choice.reply,`${c.id} ${policy} E${e} reply${index}`,1);
    playEvent(g,c.id,e,()=>e===14?policy==='friend'?1:policy==='distance'?2:0:policy==='second'?1:policy==='boundary'&&e<=5?2:policy==='pause'?3:0);
   }
   const end=g.activeScene;const data=end.endingData;const text=data.romanticText;check(text,`${c.id} ${policy} ending`);
  }
  for(const d of all[c.id].dailyTalks){check(d.prompt,`${c.id} daily`);for(const choice of d.choices)check(choice.reply,`${c.id} daily reply`,1);}
  for(const end of Object.values(all[c.id].endings))check(end.romanticText,`${c.id} preview`);
 }
});

test('completion dossier belongs only to the completed character and is available with teaching off',()=>{
 for(const c of CHARACTERS){const g=game();assert.equal(g.renderCompletedCaseDossier(c),'');
 const cs=g.state.characters[c.id];cs.eventCompleted=14;assert.equal(g.renderCompletedCaseDossier(c),'');
 cs.eventCompleted=15;g.state.studyMode=false;const html=g.renderCompletedCaseDossier(c);assert.ok(html.includes('completed-case-dossier'));assert.ok(html.includes(c.dsmTitle));assert.ok(html.includes('本角色的準則與故事證據'));assert.ok(html.includes('本人分享的自我理解'));assert.ok(!html.includes('稍後回顧'));assert.ok(!html.includes('24 小時'));
 }
 const g=route('wen_yan','romantic');const html=g.renderActiveScene();assert.ok(!html.includes('觀察與限制'));assert.ok(!html.includes('dsm-char-pill'));assert.ok(html.includes('completed-case-dossier'));
});

test('episode teaching quotes the current dialogue, selected reply and every option',()=>{
 const g=game();g.state.studyMode=true;g.startEvent('lin_jianwei',1);g.handleNextNode();g.handleChoiceSelect(1);
 const sc=g.activeScene,html=g.renderActiveScene();assert.ok(html.includes('本節教學：心理病理學觀點'));assert.ok(html.includes(esc(sc.eventData.nodes[1].text)));assert.ok(html.includes(esc(sc.lastChoiceOutcome.choiceText)));assert.ok(html.includes(esc(sc.lastChoiceOutcome.replyCore)));assert.ok(!html.includes('renderCaseStudy'));assert.ok(html.includes('資料來源'));assert.ok(html.includes(esc(sc.eventData.nodes[1].choices[1].interactionAnalysis)));
});


test('low closeness after respectful interaction does not invent a history of hurtful speech',()=>{
 const g=route('lin_jianwei','second'),cs=g.state.characters.lin_jianwei;cs.affection=10;
 g.showEndingForCharacter('lin_jianwei');assert.equal(g.activeScene.endingKey,'triggerEnd');
 assert.ok(!g.activeScene.endingData.romanticText.includes('幾次傷人的話'));
 assert.ok(!g.activeScene.endingData.romanticText.includes('幾次談不攏的期待'));
 assert.ok(g.activeScene.endingData.title.includes('未完結局'));
});

test('all story and optional daily choices are unique spoken lines with five replies per scene',()=>{
 const seen=new Map();let count=0;
 const check=(choice,label)=>{
  assert.match(choice.text,/^「[^「」]+」$/,label);
  const normalized=choice.text.replace(/[\s「」。，？、！；：]/g,'');
  assert.ok(!seen.has(normalized),`${label} repeats ${seen.get(normalized)}: ${choice.text}`);
  seen.set(normalized,label);count++;
 };
 for(const c of CHARACTERS){
  for(const e of content.buildRouteEvents(c.id))for(const node of e.nodes){
   if(!node.choices)continue;
   assert.equal(node.choices.length,5,`${c.id} ${e.code}`);
   node.choices.forEach((choice,i)=>check(choice,`${c.id} ${e.code} ${i}`));
  }
  for(const [i,daily]of all[c.id].dailyTalks.entries())daily.choices.forEach((choice,j)=>check(choice,`${c.id} daily ${i} ${j}`));
 }
 assert.equal(count,1020);
});

test('friendship remembers only the drawing, tea name and lining choice actually selected',()=>{
 for(const pick of [0,1]){
  const g=game(),id='shen_mo',plan=content.getTuning(id).designedRoute;for(let e=1;e<=14;e++)playEvent(g,id,e,()=>e===13?pick:e===14?1:plan[e-1]);
  assert.equal(g.activeScene.endingKey,'friendEnd');
  assert.ok(g.activeScene.endingData.romanticText.includes(pick===0?'寫了豆腐':'畫了湯碗'));
  const saved=JSON.parse(JSON.stringify({...g.activeScene,contentVersion:content.CONTENT_VERSION}));g.activeScene=g.sanitizeActiveScene(saved);
  assert.ok(g.activeScene.endingData.romanticText.includes(pick===0?'寫了豆腐':'畫了湯碗'));
 }
 for(const id of ['han_xiao','ruri']){
  const ex=ENDING_EXAMPLES[id]?.friendEnd,g=game();for(let e=1;e<=14;e++)playEvent(g,id,e,()=>ex?Number(e===14?ex.split('|')[1]:ex[e-1]):1);
  assert.equal(g.activeScene.endingKey,'friendEnd');
  assert.ok(!g.activeScene.endingData.romanticText.includes(id==='han_xiao'?'你取的名字':'你挑的那段'));
 }
});

test('Ziqian weekend agreement from E10 carries into E11 and E13',()=>{
 const g=game(),id='you_ziqian';for(let e=1;e<=10;e++)playEvent(g,id,e);
 g.startEvent(id,11);assert.match(g.activeScene.eventData.continuityText,/手機|朋友|週末/);
 playEvent(g,id,11);playEvent(g,id,12);g.startEvent(id,13);
 assert.ok(!g.activeScene.eventData.continuityText.includes('拒絕信'));
});

test('stalled daily responses still answer the selected activity without awarding a repaired memory',()=>{
 // 調整過的角色若把 E03 的挑戰設為已完成安排（例：顧傾城被面質後排了回饋會），就不會卡在未談妥
 for(const c of CHARACTERS.filter(c=>!content.getTuning(c.id)?.decisionStatus?.[3]?.challenge)){
  const g=game();for(let e=1;e<=12;e++)playEvent(g,c.id,e,()=>e<=5?2:0);
  g.startEvent(c.id,13);const choices=g.activeScene.eventData.nodes[1].choices;
  for(const i of [0,1])assert.ok(choices[i].reply.startsWith(content.STORY_ROUTES[c.id].ordinary[2].actions[i*2+1]));
  assert.ok(choices.every(x=>!x.memory));assert.match(g.activeScene.eventData.continuityText,/還沒恢復/);
 }
});

test('shared scenes use the same place from both routes and chapters have actual place labels',()=>{
 const seen=new Map();
 for(const c of CHARACTERS)for(const ev of content.buildRouteEvents(c.id)){
  assert.ok(ev.locationName);
  if(!ev.sharedSceneKey)continue;
  const place=JSON.stringify([ev.locationId,ev.locationName]);
  if(seen.has(ev.sharedSceneKey))assert.equal(place,seen.get(ev.sharedSceneKey));else seen.set(ev.sharedSceneKey,place);
 }
 assert.equal(content.buildRouteEvents('shen_mo')[9].locationName,'暗房');
 assert.equal(content.buildRouteEvents('ruri')[3].locationName,'陶藝工坊');
});

test('rewritten options restore pending older text by its original index without applying stats twice',()=>{
 const g=game(),id='shen_mo';g.startEvent(id,1);g.handleNextNode();g.handleChoiceSelect(1);
 const before=JSON.stringify(g.state.characters[id]);const saved=JSON.parse(JSON.stringify({...g.activeScene,contentVersion:content.CONTENT_VERSION}));
 delete saved.lastChoiceOutcome.choiceIndex;
 saved.lastChoiceOutcome.choiceText='改約管理室一起看公開資料，今天先離開。';
 saved.eventData.nodes[1].choices[1].text=saved.lastChoiceOutcome.choiceText;
 g.activeScene=g.sanitizeActiveScene(saved);
 assert.equal(g.activeScene.awaitingNextAfterChoice,true);
 assert.equal(g.activeScene.lastChoiceOutcome.choiceText,content.buildRouteEvents(id)[0].nodes[1].choices[1].text);
 assert.equal(JSON.stringify(g.state.characters[id]),before);
});


test('all three romantic voices respect refusal and a clear distance choice remains effective',()=>{
 for(const c of CHARACTERS){
  for(const pick of [0,3,4]){const g=route(c.id,'romantic');playEvent(g,c.id,14,()=>pick);assert.equal(g.activeScene.endingKey,'trueEnd');
   const h=route(c.id,pauseKind(c.id));h.startEvent(c.id,14);const reply=h.activeScene.eventData.nodes[1].choices[pick].reply;
   assert.notEqual(reply,content.buildRouteEvents(c.id)[13].nodes[1].choices[pick].reply);
   playEvent(h,c.id,14,()=>pick);assert.equal(h.state.characters[c.id].characterConsent,'distance');assert.equal(h.activeScene.endingKey,'triggerEnd');
  }
  const g=route(c.id,'romantic');playEvent(g,c.id,14,()=>2);assert.equal(g.activeScene.endingKey,'normalEnd');assert.equal(g.state.characters[c.id].relationshipIntent,'distance');
 }
});

test('an older optional daily choice restores rewritten text and response without changing its stats',()=>{
 const g=game(),id='shen_mo';g.state.characters[id].eventCompleted=Math.max(2,g.state.characters[id].eventCompleted);g.startDailyTalk(id);g.handleDailyChoice(0);const before=JSON.stringify(g.state.characters[id]);
 const saved=JSON.parse(JSON.stringify({...g.activeScene,contentVersion:content.CONTENT_VERSION}));delete saved.picked.choiceIndex;
 saved.picked.text='「拍你的白牆，我替它取名字。」';saved.talk.choices[0].text=saved.picked.text;
 g.activeScene=g.sanitizeActiveScene(saved);assert.equal(g.activeScene.picked.text,all[id].dailyTalks[0].choices[0].text);assert.equal(JSON.stringify(g.state.characters[id]),before);
});

test('entering a scene starts at the top and returning restores the list position',()=>{
 const g=game(),oldDocument=ctx.document,oldWindow=ctx.window;
 const scrolls=[];
 ctx.document={getElementById:id=>id==='app-root'?{}:null,body:{classList:{toggle:noop}}};
 ctx.window={scrollY:0,scrollTo:position=>scrolls.push(position.top)};
 g.renderPage=noop;
 const render=()=>ctx.Game.prototype.render.call(g);
 try {
  g.activeMainTab='relationships';g.activeScene=null;render();
  ctx.window.scrollY=860;
  g.activeScene={mode:'ending',charId:'shen_mo',endingKey:'friendEnd'};render();
  assert.equal(scrolls.at(-1),0,'a new ending must not inherit a scrolled roster position');
  ctx.window.scrollY=220;render();
  assert.equal(scrolls.length,2,'a same-view update must not move the reader');
  g.activeScene=null;render();
  assert.equal(scrolls.at(-1),860,'returning to the roster restores its position');
 } finally {ctx.document=oldDocument;ctx.window=oldWindow;}
});

// Semantic regression cases from the 2026-11-15 playthrough.
test('every conversation offers five approaches without repeated spoken choices or reactions',()=>{
 const choices=new Map(),replies=new Map();let count=0;
 const check=(choice,label)=>{
  for(const [value,seen]of [[choice.text,choices],[choice.reply,replies]]){
   const normalized=value.replace(/[\p{P}\p{Z}\s]/gu,'');
   assert.ok(!seen.has(normalized),`${label} repeats ${seen.get(normalized)}`);seen.set(normalized,label);
  }
  assert.match(choice.text,/^「[^「」]+」$/);count++;
 };
 for(const c of CHARACTERS){
  for(const ev of content.buildRouteEvents(c.id))if(ev.nodes[1]){
   const options=ev.nodes[1].choices;assert.equal(options.length,5);
   if(content.getTuning(c.id)){assert.deepEqual(options.map(x=>x.style).sort(),[...content.STYLE_CODES].sort());assert.ok(options.filter(x=>x.healthy).length>=2);}
   else{assert.deepEqual(options.map(x=>x.style).sort(),['anxious','everyday','reasoning','romantic','supportive']);
   assert.equal(options.find(x=>x.style==='supportive').healthy,true);
   assert.equal(options.find(x=>x.style==='everyday').healthy,true);}
   options.forEach((x,i)=>check(x,`${c.id} ${ev.code} ${i}`));
  }
  all[c.id].dailyTalks.forEach((d,i)=>{assert.equal(d.choices.length,5);d.choices.forEach((x,j)=>check(x,`${c.id} daily${i} ${j}`));});
 }
 assert.equal(count,1020);assert.equal(choices.size,1020);assert.equal(replies.size,1020);
});

test('unplayed late daily scenes cannot appear by repeatedly opening optional conversations',()=>{
 for(const c of CHARACTERS){const g=game(),cs=g.state.characters[c.id];
  for(const progress of [0,1]){cs.eventCompleted=progress;const before=cs.dailyTalkIndex;g.startDailyTalk(c.id);assert.equal(g.activeScene,null);assert.equal(cs.dailyTalkIndex,before);}
  cs.eventCompleted=2;
  for(let n=0;n<9;n++){g.startDailyTalk(c.id);assert.equal(g.activeScene.talk.sourceEvent,2);}
  cs.eventCompleted=6;const early=new Set();for(let n=0;n<6;n++){g.startDailyTalk(c.id);early.add(g.activeScene.talk.sourceEvent);}
  assert.deepEqual([...early].sort(),[2,6]);
  cs.eventCompleted=13;const late=new Set();for(let n=0;n<6;n++){g.startDailyTalk(c.id);late.add(g.activeScene.talk.sourceEvent);}
  assert.deepEqual([...late].sort((a,b)=>a-b),[2,6,13]);
  const saved=JSON.parse(JSON.stringify(g.activeScene));saved.talk=all[c.id].dailyTalks[2];saved.contentVersion=content.CONTENT_VERSION;
  cs.eventCompleted=1;assert.equal(g.sanitizeActiveScene(saved),null);
 }
});

test('rejected reassurance requests never become completed takeovers in later scenes',()=>{
 for(const c of CHARACTERS.filter(c=>!content.getTuning(c.id)?.decisionStatus?.[3]?.challenge)){const g=game();for(let e=1;e<=5;e++)playEvent(g,c.id,e,()=>e===3?2:0);
  // 承接只接最接近的一幕（E05），不再回頭引用 E03
  const nearest=g.getEventsForChar(c.id)[4].nodes[1].choices[0],selected=g.getEventsForChar(c.id)[2].nodes[1].choices[2];g.startEvent(c.id,6);
  assert.ok(g.activeScene.eventData.continuityText.includes((nearest.replyCore||nearest.reply).split('\n\n')[0]));
  assert.ok(!g.activeScene.eventData.continuityText.includes(selected.reply));
  assert.ok(!g.activeScene.eventData.continuityText.includes('還沒交還'));
  assert.equal(g.getTaskDecision(c.id,'firstAgreement',6).status,'unsettled');
  assert.equal(g.state.characters[c.id].ethicsIncidents.length,0);
 }
});

test('Ziqian ending keeps both agreements across all five approaches and after restore',()=>{
 for(let pick=0;pick<5;pick++){
  const g=game();for(let e=1;e<=14;e++)playEvent(g,'you_ziqian',e,()=>e===14?1:pick);
  const ending=g.renderEndingContinuity('you_ziqian',g.activeScene.endingKey,false);
  assert.match(ending,/誰的事誰決定/);assert.match(ending,/週末怎麼過/);assert.ok(!ending.includes('拒絕信'));
  const restored=game();restored.state=restored.migrateState(g.state);
  assert.match(restored.renderEndingContinuity('you_ziqian','friendEnd',false),/週末怎麼過/);
 }
});

test('already answered legacy dialogue retains the actual answer, reaction and points on repeated restoration',()=>{
 const g=game();g.startEvent('shen_mo',1);g.handleNextNode();g.handleChoiceSelect(3);
 const before=JSON.stringify(g.state.characters.shen_mo),old=JSON.parse(JSON.stringify(g.activeScene));
 old.contentVersion=content.CONTENT_VERSION;delete old.dialogueRevision;old.lastChoiceOutcome.choiceText='「舊版傷人的回答。」';old.lastChoiceOutcome.reply='舊版實際的反應，沒有被改成理性推論。';old.lastChoiceOutcome.replyCore=old.lastChoiceOutcome.reply;
 let scene=g.sanitizeActiveScene(old);scene=g.sanitizeActiveScene(scene);
 assert.equal(scene.lastChoiceOutcome.choiceText,old.lastChoiceOutcome.choiceText);assert.equal(scene.lastChoiceOutcome.reply,old.lastChoiceOutcome.reply);
 assert.equal(JSON.stringify(g.state.characters.shen_mo),before);
 g.state.characters.shen_mo.eventCompleted=2;g.startDailyTalk('shen_mo');g.handleDailyChoice(3);
 const daily=JSON.parse(JSON.stringify(g.activeScene));daily.contentVersion=content.CONTENT_VERSION;delete daily.dialogueRevision;daily.picked.text='「舊版日常的回答。」';daily.picked.reply='舊版日常留下的反應。';
 const restored=g.sanitizeActiveScene(g.sanitizeActiveScene(daily));assert.equal(restored.picked.text,daily.picked.text);assert.equal(restored.picked.reply,daily.picked.reply);
});

test('scene addresses and memories no longer invent an insult, a film mistake or an empty occupied chair',()=>{
 const wen=content.buildRouteEvents('wen_yan')[3];
 assert.ok(wen.nodes[1].choices[0].text.startsWith('「傾城，'));assert.ok(wen.nodes[1].choices[1].text.startsWith('「傾城，'));
 assert.ok(!content.buildRouteEvents('shen_mo')[7].nodes[1].text.includes('你裝反底片'));
 assert.ok(!content.buildRouteEvents('lin_jianwei')[13].nodes[0].text.includes('兩把椅子都空著'));
 // 隨堂小考的題目與選項不寫準則代號，準則只在作答後的解釋出現。
 for(const c of CHARACTERS)for(const stage of content.LEARNING_STAGES)for(const q of content.getLearningTasks(c.id,stage))for(const s of [q.prompt,...q.options.map(o=>o.text)]){assert.ok(!/(^|[^A-Za-z0-9])A\d/.test(s),`${c.id} ${q.id} ${s}`);assert.ok(!s.includes('準則'),`${c.id} ${q.id} ${s}`);}
});

test('randomized choice order stays stable while reading one scene and indexes remain attached to their text',()=>{
 const savedMath=ctx.Math;let seed=4781;ctx.Math=Object.create(Math);ctx.Math.random=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);
 try{const g=game(),orders=new Set();
  for(let n=0;n<8;n++){g.startEvent('shen_mo',1);g.handleNextNode();const node=g.activeScene.eventData.nodes[1],order=[...g.getChoiceOrder(node)];
   assert.deepEqual([...order].sort(),[0,1,2,3,4]);assert.deepEqual([...g.getChoiceOrder(node)],order);orders.add(order.join(''));
   g.handleChoiceSelect(order[0]);assert.equal(g.activeScene.lastChoiceOutcome.choiceText,node.choices[order[0]].text);
  }
  assert.ok(orders.size>1);
 }finally{if(savedMath===undefined)delete ctx.Math;else ctx.Math=savedMath;}
});

test('declined final scenes do not narrate an accepted invitation and keep each answer distinct',()=>{
 const reactions=new Set();
 for(const c of CHARACTERS){const g=route(c.id,pauseKind(c.id));g.startEvent(c.id,14);const ev=g.activeScene.eventData;
  assert.equal(ev.nodes[1].text,content.DISTANCE_LINES[c.id]);assert.equal(ev.nodes[0].text,content.PAUSED_CLOSURES[c.id]);
  const size=[...ev.nodes[0].text.replace(/\s/g,'')].length;assert.ok(size>=100&&size<=150);
  for(const ch of ev.nodes[1].choices){assert.ok(!reactions.has(ch.reply));reactions.add(ch.reply);}
 }
});

test('rewritten learning questions archive their old answers without resetting story or unrelated answers',()=>{
 const g=game(),saved=JSON.parse(JSON.stringify(g.state));
 for(const id of ['lin_jianwei','ji_yan','su_fei','shen_mo']){
  saved.characters[id].eventCompleted=15;saved.characters[id].affection=52;
  saved.characters[id].knowledge.compare={attempts:[{optionId:'alternative',correct:false},{optionId:'evidence',correct:true}],firstCorrect:false,correct:true};
  saved.characters[id].knowledge.observe={attempts:[{optionId:'evidence',correct:true}],firstCorrect:true,correct:true,revision:1};
 }
 g.state=g.migrateState(saved);
 for(const id of ['lin_jianwei','ji_yan','su_fei','shen_mo']){
  const cs=g.state.characters[id];assert.equal(cs.eventCompleted,15);assert.equal(cs.affection,52);
  assert.equal(cs.knowledge.compare,undefined);assert.equal(cs.knowledge.observe,undefined);
  assert.equal(cs.knowledgeArchive['compare:1'].record.firstCorrect,false);assert.ok(cs.knowledgeArchive['observe:1'].task.prompt);
  assert.match(g.renderLearningArchive(id),/改寫前的題目與作答/);
  assert.equal(g.answerLearning(id,'transfer','evidence'),true);assert.equal(cs.knowledge.transfer.revision,content.LEARNING_REVISION);
 }
 const next=g.migrateState(g.state);for(const id of ['lin_jianwei','ji_yan','su_fei','shen_mo']){
  assert.equal(next.characters[id].knowledge.transfer.revision,content.LEARNING_REVISION);assert.equal(Object.keys(next.characters[id].knowledgeArchive).length,2);
 }
});

// 每個調整過的角色，五個結局都至少有一條走得到的路線（E01–E13 選項｜E14 選項）
const ENDING_EXAMPLES={
 su_fei:{trueEnd:'0413101111104|4',friendEnd:'4121111110241|1',normalEnd:'0112041104004|2',codependentEnd:'4333330041004|0',triggerEnd:'2034032442003|4'},
 shen_mo:{trueEnd:'1133213132004|0',friendEnd:'4121111110241|1',normalEnd:'0112041104004|2',codependentEnd:'1111114114141|0',triggerEnd:'2034032442003|4'},
 gu_qingcheng:{trueEnd:'4333330041004|0',friendEnd:'0324230101444|1',normalEnd:'2034032442003|4',codependentEnd:'3400340443414|3',triggerEnd:'3232222220343|3'},
 xia_le:{trueEnd:'3410300231003|0',friendEnd:'0324230101444|1',normalEnd:'2220430233214|4',codependentEnd:'2034032442003|4',triggerEnd:'0444444414340|1'},
 ruri:{trueEnd:'0100010100400|4',friendEnd:'4121111110241|1',normalEnd:'3410300231003|0',codependentEnd:'1412114141114|0',triggerEnd:'2034032442003|4'},
 you_ziqian:{trueEnd:'4333330041004|0',friendEnd:'0324230101444|1',normalEnd:'2034032442003|4',codependentEnd:'0334404243123|4',triggerEnd:'3232222220343|3'},
 ji_yan:{trueEnd:'2121122110204|0',friendEnd:'0324230101444|1',normalEnd:'2034032442003|4',codependentEnd:'3410300231003|0',triggerEnd:'4133233344333|1'},
 lin_jianwei:{trueEnd:'1311100113233|4',friendEnd:'4133233344333|1',normalEnd:'4131321344441|3',codependentEnd:'3330343341404|4',triggerEnd:'2034032442003|4'},
 lu_qinglan:{trueEnd:'3303110131313|0',friendEnd:'0324230101444|1',normalEnd:'2034032442003|4',codependentEnd:'4444333041434|4',triggerEnd:'0424320000024|1'},
 wen_yan:{trueEnd:'0101303104044|0',friendEnd:'4121111110241|1',normalEnd:'3410300231003|0',codependentEnd:'0044044100313|3',triggerEnd:'2034032442003|4'},
 han_xiao:{trueEnd:'3314333333334|3',friendEnd:'4133233344333|1',normalEnd:'0112041104004|2',codependentEnd:'2034032442003|4',triggerEnd:'4131321344441|3'},
 bai_xiaolu:{trueEnd:'0100010100400|4',friendEnd:'4121111110241|1',normalEnd:'0112041104004|2',codependentEnd:'2034032442003|4',triggerEnd:'2220430233214|4'}};
test('every ending of a tuned character can actually be reached',()=>{
 for(const [id,routes] of Object.entries(ENDING_EXAMPLES))for(const [end,code] of Object.entries(routes)){
  const [main,last]=code.split('|'),g=game();
  for(let e=1;e<=13;e++)playEvent(g,id,e,()=>Number(main[e-1]));playEvent(g,id,14,()=>Number(last));
  assert.equal(g.activeScene.endingKey,end,`${id} ${end} via ${code}`);
 }
});

test('both people in a shared scene change to their emotional portrait together',()=>{
 const g=game(),id='su_fei';for(let e=1;e<=3;e++)playEvent(g,id,e,()=>1);
 g.startEvent(id,4);g.handleNextNode();g.handleChoiceSelect(2); // 挑戰：蘇緋受傷
 const original=ctx.renderCharacterSVG,seen=[];ctx.renderCharacterSVG=(person,expression)=>{seen.push([person.id,expression]);return '';};
 try{g.renderActiveScene();}finally{ctx.renderCharacterSVG=original;}
 assert.deepEqual(seen,[['su_fei','hurt'],['bai_xiaolu','hurt']]);
});

test('every main and daily choice carries its own psychopathology teaching, and every quote in teaching is verbatim DSM text',()=>{
 const gold=fs.readFileSync(new URL('../dsm-5-tr-zh.txt',import.meta.url),'utf8');
 for(const c of CHARACTERS){
  for(const ev of content.buildRouteEvents(c.id).filter(e=>e.eventNumber<15)){
   assert.ok(ev.teaching?.focus,`${c.id} E${ev.eventNumber} focus`);assert.ok(ev.teaching?.counsel,`${c.id} E${ev.eventNumber} counsel`);
   const node=ev.nodes.find(n=>n.choices);assert.equal(node.choices.length,5);
   const texts=node.choices.map(ch=>ch.teaching);assert.ok(texts.every(Boolean),`${c.id} E${ev.eventNumber} options`);assert.equal(new Set(texts).size,5);
   for(const s of [ev.teaching.focus,ev.teaching.counsel,...texts])for(const m of s.matchAll(/「([^「」]+)」/g))assert.ok(gold.includes(m[1]),`${c.id} E${ev.eventNumber} quote ${m[1]}`);
  }
  for(const talk of content.makeScenario(c.id).dailyTalks){assert.ok(talk.teaching?.focus);assert.ok(talk.choices.every(ch=>ch.teaching),`${c.id} daily ${talk.title}`);}
 }
});

test('teaching panel lists all five options with their teaching and a counselling note',()=>{
 const g=game();g.state.studyMode=true;g.startEvent('su_fei',1);g.handleNextNode();g.handleChoiceSelect(2);
 const sc=g.activeScene,html=g.renderActiveScene();
 for(const ch of sc.eventData.nodes[1].choices)assert.ok(html.includes(esc(ch.teaching)));
 assert.ok(html.includes('諮商觀點'));assert.ok(html.includes('每個選項會帶來什麼'));assert.ok(html.includes('你的選擇'));
 g.state.studyMode=false;assert.ok(!g.renderActiveScene().includes('本節教學'));
});

test('every character has eight quizzes tied to episodes, each with one correct option and a teaching point, and answers show their explanation',()=>{
 for(const c of CHARACTERS){
  const tasks=content.LEARNING_STAGES.flatMap(stage=>content.getLearningTasks(c.id,stage));assert.equal(tasks.length,8,c.id);
  for(const t of tasks){assert.equal(t.options.filter(o=>o.correct).length,1);assert.ok(t.teach,`${c.id} ${t.id} teach`);assert.ok(t.type);assert.ok(t.options.every(o=>o.feedback));}
  assert.equal(content.getLearningTasks(c.id,15).length,1,`${c.id} transfer at the ending`);
 }
 const g=game(),cs=g.state.characters.lin_jianwei;cs.eventCompleted=15;
 const task={...content.getLearningTasks('lin_jianwei',1)[0],stage:1},wrong=task.options.find(o=>!o.correct),right=task.options.find(o=>o.correct);
 assert.ok(g.answerLearning('lin_jianwei',task.id,wrong.id));let html=g.renderLearningTask('lin_jianwei',task);
 assert.ok(html.includes('隨堂小考'));assert.ok(html.includes(esc(wrong.feedback)));assert.ok(!html.includes('教學重點'));
 assert.ok(g.answerLearning('lin_jianwei',task.id,right.id));html=g.renderLearningTask('lin_jianwei',task);
 assert.ok(html.includes(esc(right.feedback)));assert.ok(html.includes('教學重點'));assert.ok(html.includes(esc(task.teach)));
});
