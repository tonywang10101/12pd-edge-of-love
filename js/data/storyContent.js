import {PAUSED_CLOSURES,DISTANCE_LINES,DECLINED_INVITATIONS,DIALOGUE_REVISION,DIALOGUE_VARIANTS,CONFESSION_VARIANTS,SHARED_HELPERS,DAILY_VARIANTS} from './dialogueChoices.js?v=32';
export {DIALOGUE_REVISION,DECLINED_INVITATIONS,PAUSED_CLOSURES,DISTANCE_LINES};
import {composeNarrative, makeNarration, expandChoiceReply, expandEnding} from './narrativeContent.js?v=32';
export {composeNarrative, makeNarration, expandChoiceReply, expandEnding, narrativeLength, OPENING_NARRATIVE} from './narrativeContent.js?v=32';
// Revised narrative source: evidence belongs to an observed scene, never an array index.
// Dialogue is fictional. Case notes describe teaching hypotheses, not player diagnoses.
export const CONTENT_VERSION = 6;
export const CLINICAL_SOURCES = [
  ['APA｜人格特質、功能與十種特定人格障礙', 'https://www.psychiatry.org/patients-families/personality-disorders/what-are-personality-disorders'],
  ['APA｜強迫意念、儀式及鑑別背景', 'https://www.psychiatry.org/patients-families/obsessive-compulsive-disorder/what-is-obsessive-compulsive-disorder'],
  ['NIMH｜BPD、治療與親友支持', 'https://www.nimh.nih.gov/health/publications/borderline-personality-disorder'],
  ['VA｜DSM 與 ICD-11 的複雜性創傷分類', 'https://www.ptsd.va.gov/professional/treat/essentials/complex_ptsd.asp'],
  ['CDC｜ASD 的完整診斷架構', 'https://www.cdc.gov/autism/hcp/diagnosis/index.html'],
  ['研究｜無性戀不應直接病理化', 'https://pubmed.ncbi.nlm.nih.gov/27542079/'],
  ['研究｜降低喚起與宣洩的怒氣管理統合分析', 'https://doi.org/10.1016/j.cpr.2024.102414']
];

function S(title, context, line, criteria, actions, note, effects = {}) {
  return { title, context, line, criteria, actions, note, ...effects };
}
export { getLearningTasks, LEARNING_TASKS, LEGACY_LEARNING_TASKS } from './learningContent.js?v=32';

import { STORY_ROUTES } from './routeStories.js?v=32';
export { STORY_ROUTES };

// Each case may leave criteria unobserved. These are learning questions, not romance scores.
export function makeStudySummary(points, title = '觀察與限制') {
  return { title, points: Array.isArray(points) ? points : [points] };
}
const codeFor = (route, key) => `${route.code}-${key}`;
// Five natural approaches; intent alone is not consent or a clinical judgment.
const PROFILES = [
 {style:'supportive',stats:{affection:3,security:3,boundary:3},expression:'pensive'},
 {style:'everyday',stats:{affection:2,security:2,boundary:4},expression:'neutral'},
 {style:'anxious',stats:{affection:1,security:1,boundary:1},expression:'anxious'},
 {style:'reasoning',stats:{affection:1,security:3,boundary:3},expression:'pensive'},
 {style:'romantic',stats:{affection:3,security:2,boundary:2},expression:'warm'}
];
// Only explicit requests for repeated reassurance or taking on unasked-for responsibility
// strain the boundary. Simply disclosing fear remains a respectful choice.
const PRESSURE_SCENES={shen_mo:[5,7,9],lin_jianwei:[3,5,9],ruri:[7,8,13],han_xiao:[4,7,9],su_fei:[1,7,12],xia_le:[8,10,11],gu_qingcheng:[1,5,11],wen_yan:[3,6,11],bai_xiaolu:[3,7,10],ji_yan:[1,3,9],lu_qinglan:[1,5,9],you_ziqian:[3,5,8]};
const APPROACH_NOTES={
 everyday:'你說出自己當下能做、想做或不想做的部分，對方仍能有不同選擇。',
 anxious:'你讓不安被聽見；表達害怕不等於要求對方負責消除它，仍須看這次實際提出的請求。',
 reasoning:'你用能核對的資訊整理問題；分析有助理解，但不代替本人感受或同意。',
 romantic:'你把想靠近放進一個具體邀請，對方仍能拒絕、需要時間或只談眼前的事。'
};
export function buildSceneChoices(scene,id,number,{daily=false}={}) {
 const variants=DIALOGUE_VARIANTS[id]?.[number];
 if(!variants)throw new Error(`Missing authored dialogue: ${id} E${number}`);
 const helper=SHARED_HELPERS[`${id}:${number}`]||[scene.actions[0],scene.actions[1]];
 let lines=[{text:helper[0].startsWith('「')?helper[0]:`「${helper[0]}」`,reply:helper[1]},...variants];
 if(daily){
  const index=[2,6,13].indexOf(number),d=STORY_ROUTES[id].ordinary[index],extra=DAILY_VARIANTS[id][index];
  lines=[{text:d.dailyChoices[0],reply:extra.supportReply},{text:d.dailyChoices[1],reply:extra.everydayReply},...extra.alternatives];
 }
 return lines.map((line,index)=>{
  const profile=PROFILES[index],pressure=!daily&&index===2&&PRESSURE_SCENES[id].includes(number);
  const stats=pressure?{affection:2,security:0,boundary:-4}:{...profile.stats};
  const status=index===0?'committed':index===2?'unsettled':'deferred';
  return {...line,...profile,stats,healthy:!pressure,ethicalRisk:false,
   psychNote:APPROACH_NOTES[profile.style]||scene.note,
   interactionAnalysis:index===0&&!daily?null:APPROACH_NOTES[profile.style]||'你們在這次日常裡各自表達喜好，並保留可以不同意的空間。',
   decision:!daily&&scene.task?{task:scene.task,label:scene.taskLabel,status,...(index===0?{}:{summary:line.reply})}:null,
   memory:!daily&&scene.memory&&!pressure?scene.memory:null,
   expression:index===0?(scene.portrait?.responses?.[0]||profile.expression):profile.expression};
 });
}
function ordinaryScene(route,index){
 const d=route.ordinary[index];
 return S(d.title,d.context,d.line,[],d.actions,'日常的喜好、互惠與分歧不作為症狀證據。',{portrait:d.portrait,memory:`ordinary_${index}`});
}

import { TRIO_PAIRS } from './sharedScenes.js?v=32';

export function buildRouteEvents(id) {
 const r=STORY_ROUTES[id];if(!r)return [];
 const events=[];
 for(let number=1;number<=15;number++){
  const code=`E${String(number).padStart(2,'0')}`,phase=number<=4?1:number<=8?2:number<=12?3:4;
  const ev={eventNumber:number,code,phase,phaseName:['初識與共同工作','觀察、分歧與理解','協商與實際修補','自主選擇與後續生活'][phase-1],locationId:r.location,type:'story',criterionTags:[],unlockCriteria:[],candidateCriteria:[],evidence:{},nodes:[]};
  let scene=r.scenes[number];
  if([2,6,13].includes(number))scene=ordinaryScene(r,[2,6,13].indexOf(number));
  if(number===4||number===9){
   const partner=r.partners[number===4?0:1],key=[id,partner].sort().join('__'),pair=TRIO_PAIRS[key];
   const t=r.trioChoices[number===4?0:1];
   scene=S(pair[0],pair[1],pair[2],[],t.actions,pair[3],{...t});
   ev.type='trio';ev.partnerId=partner;ev.sharedSceneKey=key;
  }
  if(number===8){
   ev.title=`${code}｜${r.task}：中途筆記`;ev.type='caseStudy';ev.unlockCaseStudyOnComplete=true;
   scene=S(`${r.task}：中途筆記`,r.caseContext,r.caseLine,[],r.caseActions,'作者背景、本人分享與玩家所見分開；不把資料閱讀當作確診。',{portrait:{responses:['vulnerable']}});
  }
  if(number===14){
   const [title,line,romance,romanceReply,friend,friendReply,distance,distanceReply]=r.confession;
   ev.title=`${code}｜${title}`;ev.type='relationshipDecision';
   const [anxious,romantic]=CONFESSION_VARIANTS[id];
   const confessionLines=[
    {text:romance,reply:romanceReply,relationshipIntent:'romantic',style:'supportive',stats:{affection:1,security:2,boundary:2}},
    {text:friend,reply:friendReply,relationshipIntent:'friendship',style:'everyday',stats:{affection:0,security:2,boundary:3}},
    {text:distance,reply:distanceReply,relationshipIntent:'distance',style:'reasoning',stats:{affection:0,security:1,boundary:4}},
    {text:`「${anxious[0]}」`,reply:anxious[1],relationshipIntent:'romantic',style:'anxious',stats:{affection:1,security:1,boundary:1}},
    {text:`「${romantic[0]}」`,reply:romantic[1],relationshipIntent:'romantic',style:'romantic',stats:{affection:2,security:2,boundary:2}}
   ];
   ev.nodes=[{speaker:'narrator',expression:'neutral',text:r.closureContext},{speaker:'char',expression:'pensive',text:line,choices:confessionLines.map(choice=>({...choice,healthy:true,ethicalRisk:false,expression:choice.style==='anxious'?'anxious':'soft',psychNote:'這裡表達的是你的關係意願；對方的答覆仍須另行確認。',interactionAnalysis:'這次邀請與既有工作分開，選擇關係方向不代表同意其他接觸。'}))}];
   ev.studySummary=makeStudySummary(['關係方向不由診斷、分數或學習答案決定。角色也能拒絕或要求時間。']);
  }else if(number===15){
   ev.title=`${code}｜${r.task}之後`;ev.type='ending';
   ev.studySummary=makeStudySummary(['這一輪的關係結果不是診斷或治療成效。','教材線索含本幕行為、本人回顧及同意分享的專業資料，須分開看。','可在新案例練習檢查推理；答對不等於具備臨床診斷資格。']);
  }else{
   ev.title=`${code}｜${scene.title}`;
   ev.unlockCriteria=(scene.criteria||[]).map(k=>codeFor(r,k));
   ev.candidateCriteria=(scene.candidateCriteria||[]).map(k=>codeFor(r,k));
   ev.criterionTags=[...ev.unlockCriteria];
   ev.evidence=Object.fromEntries(Object.entries(scene.evidence||{}).map(([k,v])=>[codeFor(r,k),v]));
   ev.studySummary=makeStudySummary([scene.note]);
   ev.nodes=[{speaker:'narrator',expression:'neutral',text:scene.context},{speaker:ev.type==='trio'?'ensemble':'char',expression:scene.portrait?.dialogue||'neutral',text:scene.line,choices:buildSceneChoices(scene,id,number)}];
   if(scene.spec)ev.unlockSpecifiers=['F07.0-TYPES'];
   if(number===13)ev.unlockBackstoryOnComplete=true;
  }
  Object.assign(ev, getEpisodePlace(id,number,ev.sharedSceneKey));
  ev.ambience=`展覽第 ${[1,2,2,2,3,3,3,3,4,4,5,5,6,7,7][number-1]} 週・${ev.phaseName}${ev.type==='trio'?'・平行視角中的同場情節':''}`;
  for(const node of ev.nodes){
   if(node.speaker==='narrator')Object.assign(node,makeNarration(id,number,node.text,ev.sharedSceneKey));
   if(node.choices)node.choices=node.choices.map((choice,index)=>expandChoiceReply(id,number,choice,index,ev.sharedSceneKey));
  }
  events.push(ev);
 }
 return events;
}
export function makeScenario(id){
 const r=STORY_ROUTES[id];const ending=(title,subtitle,text)=>({title,subtitle,romanticText:text,soulmateText:text});
 const scenario={chapters:[],dailyTalks:r.ordinary.map((d,i)=>{
  const number=[2,6,13][i],scene=ordinaryScene(r,i),place=getEpisodePlace(id,number);
  return {title:scene.title,sourceEvent:number,...place,prompt:d.context,narrativeCore:d.context,narrativeAdditions:[],response:d.line,
   choices:buildSceneChoices(scene,id,number,{daily:true}).map((c,j)=>expandChoiceReply(id,number,c,j))};
 }),endings:{
  trueEnd:ending(`【戀愛結局】${r.confession[0]}`,'雙方願意，慢慢相處',r.endings[0]),
  friendEnd:ending(`【友情結局】${r.ordinary[0].title}`,'友情有自己的生活',r.endings[1]),
  normalEnd:ending(`【開放結局】${r.task}之後`,'保留距離，或還需要時間',r.endings[2]),
  codependentEnd:ending(`【界線重議】${r.task}的另一種分工`,'暫不開始戀愛',`「${r.task}」還有沒談好的分工。${r.slow}

必要工作回到各自負責的人手裡，私人邀請先停。下一次是否見面還沒決定，今天不靠一句喜歡，就當那些分歧都處理好了。`),
  triggerEnd:ending(`【暫停結局】先交接${r.task}`,'暫停互動，保留各自的未來',`幾次談不攏的期待之後，訊息只剩必要交接。${r.name}把「${r.task}」的必要事項交給窗口，你收回自己的東西。

你們先停止私人來往，各自處理工作，也能找原來的支持。道歉不等於對方必須見面，沒有任何一個人需要為了好看的結局改口。`)
 }};
 for(const [key,data]of Object.entries(scenario.endings)){const n=expandEnding(id,key,data.romanticText);data.romanticText=n.text;data.soulmateText=n.text;data.narrativeCore=n.narrativeCore;data.narrativeAdditions=n.narrativeAdditions;}
 return scenario;
}

const EPISODE_PLACES = {
 shen_mo:['apartment:沈墨房門外','archive:相機工作桌','archive:相片工作桌',null,'archive:共同工作間','apartment:公寓放映角','archive:相片工作桌','archive:相片工作桌',null,'archive:暗房','archive:共同工作間','apartment:公寓會客處','cafe:編輯家飯廳','archive:展覽收件處'],
 lin_jianwei:['rooftop:公寓頂樓','archive:鐘錶工作桌','archive:鐘錶工作室',null,'apartment:公寓會客處','rooftop:頂樓觀測間','archive:展覽試看區','rooftop:頂樓觀測間',null,'rooftop:頂樓觀測間','studio:酒會入口','archive:鐘錶工作桌','apartment:公寓會客處','rooftop:公寓頂樓'],
 ruri:['apartment:古著店街角','atelier:古著店工作桌','apartment:古著店門口',null,'atelier:試衣區','apartment:古著店窗台','atelier:縫衣工作桌','atelier:古著店工作桌',null,'atelier:衣展入口','apartment:市集衣攤','apartment:古著店門口','apartment:第二次寄信的路口','atelier:古著店收衣處'],
 han_xiao:['lounge:酒吧會客處','lounge:調飲吧台','apartment:酒吧外的騎樓',null,'lounge:酒吧吧台','lounge:酒吧收貨區','lounge:打烊後的酒吧','lounge:調飲吧台',null,'lounge:酒吧會客處','lounge:酒吧內場與安全出口','lounge:酒吧辦公區','lounge:調飲吧台','lounge:飲品攤收攤處'],
 su_fei:['atelier:蘇緋畫室','atelier:試色工作桌','lounge:排練室',null,'atelier:蘇緋畫室','apartment:便利店路上','lounge:排練室','atelier:試色工作桌',null,'atelier:蘇緋畫室','lounge:公演後台','atelier:畫室門邊','atelier:蘇緋畫室','atelier:展覽收畫處'],
 xia_le:['apartment:公寓聚會','lounge:排練舞台','lounge:排演工作區',null,'studio:節目會議室','apartment:排練休息區','lounge:試演紀錄工作桌','lounge:後台化妝間',null,'lounge:後台辦公區','lounge:節目會議區','cafe:早餐休息處','lounge:後台休息區','lounge:散場後台'],
 gu_qingcheng:['studio:建築事務所','apartment:老屋坡道','studio:住戶回饋會議區',null,'studio:事務所休息區','studio:預算工作桌','studio:圖說工作桌','studio:圖說工作桌',null,'studio:建築事務所','studio:展覽海報牆','studio:建築事務所','studio:圖說工作桌','studio:送印後的事務所'],
 wen_yan:['archive:圖書修復室','archive:修書工作桌','archive:圖書修復室',null,'archive:書店路線討論處','archive:修書工作桌','apartment:植物課報名處','archive:圖書修復室',null,'archive:圖書修復室','archive:座談準備處','archive:書店書架旁','archive:書店集合處','archive:朗讀收件處'],
 bai_xiaolu:['cafe:甜點店配方桌','cafe:甜點店休息區','cafe:甜點店文件桌',null,'cafe:飲料店','cafe:甜點報價桌','cafe:甜點店休息區','cafe:甜點店配方桌',null,'cafe:甜點店配方桌','cafe:甜點店休息區','cafe:打烊後的甜點店','cafe:甜點店配方桌','cafe:甜點店收銀處'],
 ji_yan:['archive:展覽會議室','apartment:鋼琴練習間','archive:簡章工作桌',null,'archive:工作室','archive:提案工作桌','archive:海報架製作區','archive:簡章工作桌',null,'archive:共同工作桌','cafe:朋友小聚','apartment:日常支出討論處','cafe:茶桌','archive:簡章收件處'],
 lu_qinglan:['atelier:陶藝工坊','atelier:杯子試用桌','atelier:工坊休息區',null,'atelier:工坊筆記桌','atelier:工坊休息區','atelier:工坊筆記桌','atelier:展台量測區',null,'atelier:電窯旁與安全區','atelier:示範排程桌','atelier:陶藝工作桌','atelier:左手杯試用桌','atelier:展台拆卸處'],
 you_ziqian:['cafe:印刷交件桌','cafe:菜單工作桌','cafe:店務工作桌',null,'cafe:咖啡店休息區','cafe:窗邊座位','cafe:刊物工作桌','cafe:交件討論桌',null,'cafe:咖啡店休息區','cafe:投稿工作桌','cafe:補救費用討論桌','cafe:刊物工作桌','cafe:交件後的窗邊座位']
};
const SHARED_PLACES = {
 bai_xiaolu__han_xiao:'cafe:甜點訂單桌',lin_jianwei__shen_mo:'rooftop:公寓頂樓',gu_qingcheng__wen_yan:'studio:共同圖說工作桌',lu_qinglan__ruri:'atelier:陶藝工坊',han_xiao__xia_le:'lounge:排練舞台',bai_xiaolu__su_fei:'atelier:畫室送貨處',bai_xiaolu__you_ziqian:'cafe:咖啡店',ji_yan__you_ziqian:'archive:海報工作桌',ji_yan__lu_qinglan:'atelier:陶藝工坊',gu_qingcheng__shen_mo:'studio:權限討論桌',lin_jianwei__wen_yan:'apartment:公寓會客處',ruri__shen_mo:'rooftop:頂樓風鈴旁',lin_jianwei__su_fei:'lounge:試音區',wen_yan__xia_le:'archive:小組朗讀室'
};
export function getEpisodePlace(id,number,sharedKey){
 const [locationId,locationName]=(sharedKey?SHARED_PLACES[sharedKey]:EPISODE_PLACES[id]?.[number-1])?.split(':')||['apartment','展覽之後'];
 return {locationId,locationName};
}

export function getEndingPlace(id,key){
 const romantic={shen_mo:'cafe:街口麵店',lin_jianwei:'cafe:晚餐約會',ruri:'apartment:布市',han_xiao:'cafe:餐廳',su_fei:'cafe:電影後的麵店',xia_le:'cafe:沒有鏡頭的晚餐',gu_qingcheng:'cafe:等位的小店',wen_yan:'archive:書店',bai_xiaolu:'cafe:電影後的晚餐',ji_yan:'cafe:雨中的麵店',lu_qinglan:'cafe:約會餐廳',you_ziqian:'cafe:咖啡店'};
 const friendship={shen_mo:'cafe:朋友聚餐',lin_jianwei:'rooftop:公寓頂樓',ruri:'atelier:衣展',han_xiao:'lounge:調飲吧台',su_fei:'cafe:看展後的聚會',xia_le:'lounge:配角演出之後',gu_qingcheng:'studio:圖說工作桌',wen_yan:'archive:讀書會',bai_xiaolu:'cafe:甜點店',ji_yan:'cafe:朋友茶桌',lu_qinglan:'atelier:陶藝工坊',you_ziqian:'cafe:窗邊座位'};
 const [locationId,locationName]=(key==='trueEnd'?romantic[id]:key==='friendEnd'?friendship[id]:'apartment:展覽後，各自的生活').split(':');
 return {locationId,locationName};
}
