// Narrative, observed evidence and case-study disclosure are deliberately separate.
import { STORY_ROUTES, buildRouteEvents, CONTENT_VERSION } from './storyContent.js?v=31';
export { CONTENT_VERSION };
export const CHARACTER_EXTENDED_LORE = Object.fromEntries(Object.entries(STORY_ROUTES).map(([id,r]) => [id, {
  scheduleLocations: [r.location,'cafe','archive',r.location], trioPartner1:r.partners[0],trioPartner2:r.partners[1],
  currentBackground:r.bio, growthBackstory:{title:'由本人選擇分享的自我理解',story:r.memory},caseHistory:r.history
}]));
export const TRIO_SCENES_DATA = {};
// Kept as compatibility exports for the optional event-picker UI; E08 is no longer a disaster.
export const UNIQUE_DISASTER_EVENTS = Object.fromEntries(Object.keys(STORY_ROUTES).map(id=>[id,{title:'E08｜展覽中途的案例筆記'}]));
export const EXTRA_DAILY_TALKS = {};
export const getDiagnosisRevealEvent = () => 8;
export const getCharacter15Events = id => buildRouteEvents(id);
export function getChoiceScore(stats = {}) {
  return (stats.affection||0)+(stats.security||0)+(stats.boundary||0);
}
export function getPerfectScoreTable(events=[]) {
  const nodes={}; let maxTotal=0; const maxAxis={affection:0,security:0,boundary:0};
  for(const ev of events)for(const [index,node]of(ev.nodes||[]).entries()) {
    if(!node.choices?.length)continue;
    const healthy=node.choices.filter(c=>c.healthy);
    const best=Math.max(...healthy.map(c=>getChoiceScore(c.stats)));
    nodes[`${ev.eventNumber}_${index}`]=best;maxTotal+=best;
    for(const k of Object.keys(maxAxis))maxAxis[k]+=healthy[0]?.stats?.[k]||0;
  }
  return {nodes,maxTotal,maxAxis,nodeCount:Object.keys(nodes).length};
}
export function getPerfectProgress(table,cs) {
  let total=0,perfectCount=0;const axis={affection:0,security:0,boundary:0};
  for(const key of Object.keys(table.nodes)) {
    const pick=cs?.choiceScores?.[key];if(!pick)continue;
    total+=getChoiceScore(pick);
    for(const k of Object.keys(axis))axis[k]+=pick[k]||0;
    if(pick.healthy===true)perfectCount++;
  }
  return {total,axis,perfectCount,maxTotal:table.maxTotal,maxAxis:table.maxAxis,nodeCount:table.nodeCount,isPerfect:table.nodeCount>0&&perfectCount===table.nodeCount};
}
export function getCharacterAchievements(char,cs,isCaseUnlocked,perfect=null) {
  return [
    {id:'ach_case',icon:'📚',title:'案例閱讀',desc:'完成 E08，閱讀作者預設的教學案例；不表示玩家完成臨床診斷。',unlocked:Boolean(isCaseUnlocked)},
    {id:'ach_perfect',icon:'🌱',title:'尊重與協商',desc:`E01～E14 的互動尊重自主、界線與責任；不同合理回答都可達成（目前 ${perfect?.perfectCount||0}/${perfect?.nodeCount||14}）。此成就不評量醫療成效。`,unlocked:Boolean(cs?.perfectAchieved)}
  ];
}
