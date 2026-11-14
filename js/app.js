// 《愛的邊緣》2.3 — 平行角色故事、具體後果、雙方關係意願與獨立學習紀錄

import { STORY_ROUTES, CLINICAL_SOURCES, CONTENT_VERSION, getLearningTasks, getEndingPlace, composeNarrative, makeNarration, expandChoiceReply, expandEnding, OPENING_NARRATIVE } from './data/storyContent.js?v=31';
import { LOCATIONS, CLUSTERS, CHARACTERS } from './data/characters.js?v=32';
import { DSM_REFERENCE } from './data/dsmReference.js?v=31';
import { SCENARIOS_CLUSTER_A } from './data/scenarios_cluster_a.js?v=31';
import { SCENARIOS_CLUSTER_B } from './data/scenarios_cluster_b.js?v=31';
import { SCENARIOS_CLUSTER_C_OTHER } from './data/scenarios_cluster_c_other.js?v=31';
import {
  CHARACTER_EXTENDED_LORE,
  TRIO_SCENES_DATA,
  UNIQUE_DISASTER_EVENTS,
  EXTRA_DAILY_TALKS,
  getCharacter15Events,
  getCharacterAchievements,
  getDiagnosisRevealEvent,
  getPerfectScoreTable,
  getPerfectProgress
} from './data/eventTreeEngine.js?v=31';
import {
  CHARACTER_PROMPTS,
  getSceneBackground
} from './data/characterPrompts.js?v=32';
import { renderCharacterSVG } from './ui/avatarRenderer.js?v=31';
import { audio } from './ui/audioEngine.js?v=34';
import {
  preloadAllAssets,
  resolveAssetUrl,
  areAllAssetsPreloaded,
  getAllGameImageAssets,
  formatBytesMB
} from './ui/assetPreloader.js?v=31';

const ALL_SCENARIOS = {
  ...SCENARIOS_CLUSTER_A,
  ...SCENARIOS_CLUSTER_B,
  ...SCENARIOS_CLUSTER_C_OTHER
};

const STORAGE_KEY_AUTOSAVE = 'edge_of_love_browser_save_v6';
const STORAGE_KEY_SESSION = 'edge_of_love_session_save_v6';

function escapeHtml(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getDeviceType() {
  const ua = navigator.userAgent || '';
  if (/tablet|ipad|playbook|silk/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua)) {
    return 'mobile';
  }
  return window.innerWidth <= 768 ? 'mobile' : 'desktop';
}

function trackGA(eventName, params = {}) {
  try {
    const payload = {
      device_type: getDeviceType(),
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      ...params
    };
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, payload);
    }
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...payload });
    }
  } catch (_) {
    // ignore tracking errors
  }
}

class EdgeOfLoveGame {
  constructor() {
    this.state = this.getDefaultState();
    this.activeScene = null;
    this.activeMainTab = 'locations'; // 'locations' (故事推進) | 'relationships' (人物關係圖＆角色成就)
    this.selectedFilter = 'ALL';
    this.activeLocationId = 'apartment'; // 'apartment' (無特定場景時預設為雙層公寓) 或 6 大場景 ID
    this.lastSavedTime = null;
    this.eventCache = {};
    this.dsmWidgetOpen = false;
    this.selectedDsmRefCode = null;
    this.mobileNavOpen = false;
    this.sessionStartTime = Date.now();
    this.selectedFirstCharId = null; // 封面合照選定之開場角色 ID（null 代表預設隨機挑選）
    this._lastHoveredPillar = null;
    this.loadingState = null;
  }

  getEventsForChar(charId) {
    if (!this.eventCache[charId]) {
      this.eventCache[charId] = getCharacter15Events(charId, ALL_SCENARIOS[charId]);
    }
    return this.eventCache[charId];
  }

  getDefaultState() {
    const charState = {};
    CHARACTERS.forEach((c) => {
      charState[c.id] = {
        affection: c.initialStats.affection,
        security: c.initialStats.security,
        boundary: c.initialStats.boundary,
        eventCompleted: 0, // 0 ~ 15
        chapterCompleted: 0,
        unlockedCriteria: [],
        unlockedSpecifiers: [],
        unlockedComorbidities: [],
        evidenceLog: {}, // { [itemId]: { eventCode, eventTitle, quote, behavior, choiceText, defenseMechanism } }
        caseStudyUnlocked: false,
        relationshipIntent: null,
        characterConsent: null,
        memories: {},
        uncertainCriteria: [],
        endingKey: null,
        choiceEffects: {},
        ethicsIncidents: [],
        knowledge: {},
        sharedQuakeDone: false,
        sharedTyphoonDone: false,
        backstoryUnlocked: false,
        unlockedEndings: [],
        dailyTalkIndex: 0,
        choiceScores: {}, // 每個抉擇節點最近一次選擇的 {affection, security, boundary}（用於尊重與協商判定）
        perfectAchieved: false,
        diary: []
      };
    });

    return {
      contentVersion: CONTENT_VERSION,
      initialized: false,
      studyMode: false, // 教學檢視模式（可隨時於頂部工具列切換）
      player: {
        name: '林予安',
        sex: 'female',
        sexLabel: '生理女性／女性認同 (Female)',
        pronoun: '她',
        trait: 'balanced'
      },
      roamCycle: 0,
      metCharacters: [],
      unlockedRoutes: [], // 已開放可攻略（可切換主線）的角色；每揭曉一位角色的人格障礙症即再開放一位
      currentStoryChar: null,
      storyStack: [],
      characters: charState
    };
  }

  init() {
    const savedRaw =
      localStorage.getItem(STORAGE_KEY_AUTOSAVE) ||
      sessionStorage.getItem(STORAGE_KEY_SESSION) ||
      localStorage.getItem('edge_of_love_browser_save_v5') ||
      sessionStorage.getItem('edge_of_love_session_save_v5') ||
      localStorage.getItem('edge_of_love_browser_save_v4') ||
      sessionStorage.getItem('edge_of_love_session_save_v4') ||
      localStorage.getItem('edge_of_love_browser_save_v3') ||
      sessionStorage.getItem('edge_of_love_session_save_v3') ||
      localStorage.getItem('edge_of_love_browser_save_v2') ||
      sessionStorage.getItem('edge_of_love_session_save_v2');

    if (savedRaw) {
      try {
        const parsed = JSON.parse(savedRaw);
        const loadedState = parsed.state ? parsed.state : parsed;
        if (loadedState && loadedState.initialized && loadedState.characters) {
          this.state = this.migrateState(loadedState);
          this.activeScene = this.sanitizeActiveScene(parsed.activeScene);
          if (parsed.savedAt) {
            this.lastSavedTime = parsed.savedAt;
          }
        }
      } catch (_) {
        // ignore corrupted save
      }
    }

    window.addEventListener('beforeunload', () => {
      if (this.state.initialized) {
        this.autoSave();
      }
      this.trackRetention('unload');
    });

    document.addEventListener('visibilitychange', () => {
      audio.setVisible(document.visibilityState !== 'hidden');
      if (document.visibilityState === 'hidden') {
        this.trackRetention('hidden');
      }
    });

    trackGA('game_visit', {
      has_save: Boolean(this.state.initialized)
    });

    this.bindGlobalEvents();
    this.render();

    // 若玩家帶著舊存檔重整進入遊戲，於背景靜默預載剩餘立繪與背景，減少後續切換等待
    if (this.state.initialized && !areAllAssetsPreloaded()) {
      preloadAllAssets({ concurrency: 4 });
    }
  }

  trackRetention(reason = 'check') {
    const durationSec = Math.round((Date.now() - this.sessionStartTime) / 1000);
    if (durationSec < 2) return;
    const playedChars = CHARACTERS.filter((c) => (this.state.characters[c.id]?.eventCompleted || 0) > 0).map(
      (c) => c.name
    );
    trackGA('game_retention', {
      duration_seconds: durationSec,
      duration_minutes: Number((durationSec / 60).toFixed(1)),
      played_characters: playedChars.join(',') || 'none',
      played_characters_count: playedChars.length,
      reason
    });
  }

  sanitizeActiveScene(scene) {
    if (!scene || typeof scene !== 'object' || scene.contentVersion !== CONTENT_VERSION) return null;
    const char = CHARACTERS.find((c) => c.id === scene.charId);
    if (!char) return null;

    if (scene.mode === 'event') {
      const events = this.getEventsForChar(scene.charId);
      const evNum = Number(scene.eventNumber) || 1;
      if (evNum >= 15) return null;
      const freshEv = this.prepareEvent(scene.charId, evNum);
      const continuity = this.getContinuityText(scene.charId, evNum);
      freshEv.continuityText = [freshEv.unfinishedWork?'先前的工作還沒談妥，私人合作還沒恢復。':null,continuity].filter(Boolean).join('\n\n');
      if (!freshEv || !Array.isArray(freshEv.nodes) || freshEv.nodes.length === 0) return null;
      const safeIdx = Math.max(0, Math.min(Number(scene.nodeIndex) || 0, freshEv.nodes.length - 1));
      const curNode = freshEv.nodes[safeIdx];
      const previousIndex=scene.lastChoiceOutcome?.choiceIndex ?? scene.eventData?.nodes?.[scene.nodeIndex]?.choices?.findIndex(c=>this.formatText(c.text)===scene.lastChoiceOutcome?.choiceText);
      const chosen = scene.awaitingNextAfterChoice && (curNode?.choices?.find(c => this.formatText(c.text) === scene.lastChoiceOutcome?.choiceText)||curNode?.choices?.[previousIndex]);
      const outcome = chosen ? {...scene.lastChoiceOutcome, choiceText:this.formatText(chosen.text),reply:this.formatText(chosen.reply),replyCore:this.formatText(chosen.replyCore||chosen.reply)} : scene.lastChoiceOutcome;
      return {
        ...scene,
        eventNumber: freshEv.eventNumber,
        eventData: freshEv,
        partnerId: freshEv.partnerId || null,
        locationId: freshEv.locationId || char.locationId,
        nodeIndex: safeIdx,
        expression: chosen?.expression || curNode?.expression || scene.expression || 'neutral',
        awaitingNextAfterChoice: Boolean(scene.awaitingNextAfterChoice && scene.lastChoiceOutcome),
        lastChoiceOutcome: scene.awaitingNextAfterChoice ? outcome : null
      };
    }

    if (scene.mode === 'daily') {
      if (!scene.talk || !Array.isArray(scene.talk.choices) || scene.talk.choices.length === 0) {
        return null;
      }
      const talk = ALL_SCENARIOS[scene.charId]?.dailyTalks?.find(t => t.title === scene.talk.title) || scene.talk;
      const previousIndex=scene.picked?.choiceIndex ?? scene.talk.choices.findIndex(c=>this.formatText(c.text)===scene.picked?.text);
      const chosen = talk.choices.find(c => this.formatText(c.text) === scene.picked?.text)||talk.choices[previousIndex];
      return {...scene, talk, picked: chosen ? {...scene.picked,text:this.formatText(chosen.text),reply:this.formatText(chosen.reply),replyCore:this.formatText(chosen.replyCore||chosen.reply)} : scene.picked,
        expression: chosen?.expression || scene.expression || 'neutral'};
    }

    if (scene.mode === 'ending') {
      const scenario = ALL_SCENARIOS[scene.charId];
      const endingKey = scene.endingKey || 'normalEnd';
      const freshEndingData = scenario?.endings?.[endingKey] || scene.endingData;
      if (!freshEndingData) return null;
      const endingData=this.prepareEndingData(scene.charId,endingKey,scene.preview);
      if(!scene.preview&&endingKey==='codependentEnd'&&this.getEthicsInfo(scene.charId).active){endingData.title=`【爭議結局】${STORY_ROUTES[scene.charId].task}`;endingData.subtitle='靠近之後，仍須面對越界的代價';}
      return {
        ...scene,
        ...getEndingPlace(scene.charId,endingKey),
        endingKey,
        endingData,
        endingMode: scene.endingMode || 'romantic'
      };
    }

    return null;
  }

  migrateState(loadedState) {
    const def = this.getDefaultState();
    const old = JSON.parse(JSON.stringify(loadedState));
    const sameVersion = old.contentVersion === CONTENT_VERSION;
    const validIds = new Set(CHARACTERS.map(c => c.id));
    const state = { ...def, ...old, contentVersion: CONTENT_VERSION, player: { ...def.player, ...(old.player || {}) }, characters: {} };
    state.unlockedRoutes = [...new Set((old.unlockedRoutes || []).filter(id=>validIds.has(id)))];
    state.metCharacters = [...new Set((old.metCharacters || []).filter(id=>validIds.has(id)))];
    state.currentStoryChar = validIds.has(old.currentStoryChar) ? old.currentStoryChar : null;
    state.storyStack = [];
    if (!sameVersion) {
      state.legacyArchive = { version: old.contentVersion || 4, characters: old.characters || {}, previousArchive: old.legacyArchive || null, savedNote: '舊版進度與日記保留於此；新版故事從 E01 開始，已開放角色保留。' };
    }
    for (const c of CHARACTERS) {
      const saved = sameVersion ? old.characters?.[c.id] || {} : {};
      const cs = { ...def.characters[c.id], ...saved };
      for (const key of ['affection','security','boundary']) cs[key] = this.clampStat(Number.isFinite(cs[key]) ? cs[key] : def.characters[c.id][key]);
      cs.eventCompleted = Math.max(0,Math.min(15,Math.floor(Number(cs.eventCompleted)||0)));
      for (const key of ['diary','unlockedEndings','ethicsIncidents']) if (!Array.isArray(cs[key])) cs[key] = [];
      for (const key of ['evidenceLog','choiceScores','choiceEffects','knowledge','memories']) if (!cs[key] || typeof cs[key] !== 'object' || Array.isArray(cs[key])) cs[key] = {};
      const events=this.getEventsForChar(c.id);
      if(cs.boundary<30&&!cs.ethicsIncidents.length){
        const prior=Object.entries(cs.choiceScores).find(([key,value])=>this.isRecordedEthicalRisk(c.id,key,value,cs));
        const ev=prior&&events.find(e=>e.eventNumber===Number(prior[0].split('_')[0]));
        if(ev)cs.ethicsIncidents.push({code:ev.code,title:ev.title,choiceText:cs.diary.find(d=>d.code===ev.code)?.choiceText||'先前界線受損的相處選擇'});
      }
      cs.evidenceLog=Object.fromEntries(Object.entries(cs.evidenceLog).map(([id,logs])=>[id,(Array.isArray(logs)?logs:[]).filter(log=>events.some(ev=>ev.code===log.eventCode&&[...(ev.unlockCriteria||[]),...(ev.candidateCriteria||[]),...(ev.unlockSpecifiers||[])].includes(id))).map(log=>({...log,...events.find(ev=>ev.code===log.eventCode)?.evidence?.[id]}))]).filter(([,logs])=>logs.length));
      const evidenceIds = new Set(c.criteria.map(x=>x.id));
      cs.unlockedCriteria = Object.keys(cs.evidenceLog).filter(id=>evidenceIds.has(id) && Array.isArray(cs.evidenceLog[id]) && cs.evidenceLog[id].some(log=>this.getEventsForChar(c.id).some(ev=>ev.code===log.eventCode && ev.unlockCriteria?.includes(id))));
      cs.uncertainCriteria = Object.keys(cs.evidenceLog).filter(id=>evidenceIds.has(id) && Array.isArray(cs.evidenceLog[id]) && cs.evidenceLog[id].some(log=>this.getEventsForChar(c.id).some(ev=>ev.code===log.eventCode && ev.candidateCriteria?.includes(id))));
      cs.characterConsent = ['romantic','friendship','distance'].includes(saved.characterConsent) ? saved.characterConsent : null;
      cs.unlockedSpecifiers = (saved.unlockedSpecifiers || []).filter(id=>c.specifiers.some(x=>x.id===id));
      cs.unlockedComorbidities = [];
      cs.caseStudyUnlocked = Boolean(saved.caseStudyUnlocked && cs.eventCompleted >= 8);
      cs.relationshipIntent = ['romantic','friendship','distance'].includes(saved.relationshipIntent) ? saved.relationshipIntent : null;
      cs.perfectAchieved = getPerfectProgress(getPerfectScoreTable(this.getEventsForChar(c.id)), cs).isPerfect;
      delete cs.diagnosed;
      state.characters[c.id] = cs;
    }
    if (!state.unlockedRoutes.length) state.unlockedRoutes.push(state.currentStoryChar || CHARACTERS[0].id);
    if (!state.currentStoryChar) state.currentStoryChar = state.unlockedRoutes[0];
    if (!state.unlockedRoutes.includes(state.currentStoryChar)) state.unlockedRoutes.push(state.currentStoryChar);
    this.ensureRouteUnlocks(state);
    return state;
  }

  autoSave() {
    try {
      const nowStr = new Date().toLocaleTimeString('zh-TW', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      this.lastSavedTime = nowStr;
      if (this.activeScene) this.activeScene.contentVersion = CONTENT_VERSION;
      const payload = JSON.stringify({
        savedAt: new Date().toLocaleString('zh-TW'),
        state: this.state,
        activeScene: this.activeScene
      });
      localStorage.setItem(STORAGE_KEY_AUTOSAVE, payload);
      sessionStorage.setItem(STORAGE_KEY_SESSION, payload);
    } catch (_) {
      // ignore storage quota errors
    }
  }

  saveToSlot(slotIndex) {
    const key = `edge_of_love_slot_${slotIndex}`;
    const payload = {
      savedAt: new Date().toLocaleString('zh-TW'),
      state: this.state,
      activeScene: this.activeScene
    };
    const serialized = JSON.stringify(payload);
    localStorage.setItem(key, serialized);
    sessionStorage.setItem(key, serialized);
    this.autoSave();
    audio.playSelect();
    this.showToast(`💾 已儲存至瀏覽器記憶槽 #${slotIndex}`);
    this.renderSaveModal();
  }

  loadFromSlot(slotIndex) {
    const key = `edge_of_love_slot_${slotIndex}`;
    const raw = localStorage.getItem(key) || sessionStorage.getItem(key);
    if (!raw) return;
    try {
      const payload = JSON.parse(raw);
      if (payload && payload.state) {
        this.state = this.migrateState(payload.state);
        this.activeScene = this.sanitizeActiveScene(payload.activeScene);
        this.autoSave();
        audio.playSelect();
        this.closeModals();
        this.render();
        this.showToast(`📂 已從瀏覽器記憶槽 #${slotIndex} 恢復進度`);
      }
    } catch (_) {
      this.showToast('存檔讀取失敗');
    }
  }

  getRouteType(char) {
    const cs = this.state.characters[char.id];
    return {type:cs.relationshipIntent || 'open', label:this.getRelationshipStatusInfo(char,cs).label, badgeClass:'route-romantic'};
  }

  recordBoundaryConsequence(charId, choice, source) {
    const cs=this.state.characters[charId];
    if(cs.boundary>=30 || choice.ethicalRisk!==true || !(choice.stats?.boundary<0))return;
    const entry={code:source.code,title:source.title,choiceText:this.formatText(choice.text)};
    if(!cs.ethicsIncidents.some(x=>x.code===entry.code&&x.choiceText===entry.choiceText))cs.ethicsIncidents.push(entry);
  }

  isRecordedEthicalRisk(charId, key, value, cs=this.state.characters[charId]) {
    if(value.ethicalRisk!==undefined)return value.ethicalRisk===true;
    const [number,index]=key.split('_').map(Number);
    const event=this.getEventsForChar(charId).find(e=>e.eventNumber===number);
    const entry=cs.diary.find(d=>d.code===event?.code);
    return Boolean(entry&&event?.nodes[index]?.choices?.some(c=>c.ethicalRisk===true&&this.formatText(c.text)===entry.choiceText));
  }

  getEthicsInfo(charId) {
    const cs=this.state.characters[charId];
    const incidents=cs.ethicsIncidents || [];
    const pastOverstep=Object.entries(cs.choiceScores).some(([key,value])=>this.isRecordedEthicalRisk(charId,key,value,cs));
    const exists=incidents.length>0 || (cs.boundary<30&&pastOverstep);
    return {exists,active:exists&&cs.boundary<45,label:exists?(cs.boundary<45?'⚠ 越界與倫理爭議':'🕊 爭議後的修補'):''};
  }

  renderRelationshipMeters(char) {
    const cs=this.state.characters[char.id],ethics=this.getEthicsInfo(char.id);
    return `<div class="vn-live-stats relationship-meters" aria-label="與${escapeHtml(char.name)}的相處數值">${[['affection','💗 好感度'],['security','🛡️ 安全感'],['boundary','🧭 邊界感']].map(([key,label])=>`<div class="relationship-meter ${key}"><label for="meter-${char.id}-${key}">${label}<strong>${cs[key]} <small>/ 100</small></strong></label><meter id="meter-${char.id}-${key}" min="0" max="100" value="${cs[key]}">${cs[key]} / 100</meter></div>`).join('')}</div>${ethics.exists?`<p class="ethics-reputation ${ethics.active?'is-active':''}">${escapeHtml(ethics.label)}<small>${ethics.active?'先前接管、干預或貶抑他人的做法已引起質疑，親近也無法平息。':'分寸正在重建；先前受到的質疑仍留在相處紀錄裡。'}</small></p>`:''}`;
  }

  getThresholdStats(char, cs) {
    const threshCriteria = (char.criteria || []).filter((cr) => (cr.stage || 'threshold') === 'threshold');
    const threshIds = threshCriteria.map((cr) => cr.id);
    const minReq = char.minThreshold || threshIds.length;
    const unlockedList = cs?.unlockedCriteria || [];
    const threshCount = unlockedList.filter((id) => threshIds.includes(id)).length;
    return {
      threshCriteria,
      threshIds,
      minReq,
      threshCount,
      advCount: unlockedList.length - threshCount,
      totalUnlocked: unlockedList.length,
      totalCriteria: (char.criteria || []).length,
      specCount: (cs?.unlockedSpecifiers || []).length,
      specTotal: (char.specifiers || []).length,
      comCount: (cs?.unlockedComorbidities || []).length,
      comTotal: (char.comorbidities || []).length
    };
  }

  isDiagnosed(charId) {
    // Compatibility name: this means disclosure of an authored case, never a player diagnosis.
    return Boolean(this.state.characters[charId]?.caseStudyUnlocked);
  }

  getRevealCode(charId) {
    return `E${String(getDiagnosisRevealEvent(charId)).padStart(2, '0')}`;
  }

  // 尊重與協商進度：以每個抉擇的最佳選項（親密＋依戀＋邊界加總最高）為滿分
  getPerfectInfo(charId) {
    if (!this.perfectTableCache) this.perfectTableCache = {};
    if (!this.perfectTableCache[charId]) {
      this.perfectTableCache[charId] = getPerfectScoreTable(this.getEventsForChar(charId));
    }
    return getPerfectProgress(this.perfectTableCache[charId], this.state.characters[charId]);
  }

  getAchievements(char) {
    const cs = this.state.characters[char.id];
    return getCharacterAchievements(char, cs, this.isDiagnosed(char.id), this.getPerfectInfo(char.id));
  }

  getDiagnosisDisplay(char) {
    const unlocked = this.isDiagnosed(char.id);
    const preview = this.state.studyMode;
    const count = this.state.characters[char.id]?.unlockedCriteria?.length || 0;
    return { diagnosed: unlocked, revealedByStudyMode: !unlocked && preview, code: unlocked || preview ? char.dsmCode : '觀察中', title: unlocked || preview ? char.dsmTitle : '案例說明尚未開啟', fullTitle: unlocked || preview ? char.dsmTitle+'（作者預設的虛構案例）' : '完成 E08 可閱讀案例說明，不會自動產生診斷或證據。', clusterLabel: char.cluster === 'OTHER' ? '其他相關案例' : 'Cluster '+char.cluster, badgeColor: CLUSTERS[char.cluster].color, progressText: '已記錄 '+count+' 項線索；未呈現項目維持待確認，不是診斷進度。' };
  }

  // ==================== 跨地點動態出沒與下一事件計算 ====================
  getNextEventForChar(charId) {
    const cs = this.state.characters[charId];
    const events = this.getEventsForChar(charId);
    const nextIdx = Math.min(cs.eventCompleted || 0, events.length - 1);
    return events[nextIdx];
  }

  // 取得某地點當前出現的角色列表
  isMet(charId) {
    return (this.state.metCharacters || []).includes(charId);
  }

  meetCharacter(charId) {
    if (!Array.isArray(this.state.metCharacters)) this.state.metCharacters = [];
    if (!this.state.metCharacters.includes(charId)) {
      this.state.metCharacters.push(charId);
      return true;
    }
    return false;
  }

  // 隨機順序：每次進入一個選擇節點時產生一次，避免玩家用位置記答案
  getChoiceOrder(node) {
    const sc = this.activeScene;
    const n = node?.choices?.length || 0;
    const key = `${sc.eventNumber ?? 'daily'}_${sc.nodeIndex ?? 0}`;
    if (!sc.choiceOrder || sc.choiceOrder.key !== key || sc.choiceOrder.order.length !== n) {
      const order = Array.from({ length: n }, (_, i) => i);
      for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
      sc.choiceOrder = { key, order };
    }
    return sc.choiceOrder.order;
  }

  isStoryFinished(charId) {
    return (this.state.characters[charId]?.eventCompleted || 0) >= 15;
  }

  // ==================== 路線解鎖：每揭曉一位角色的人格障礙症（案例閱讀），即開放一位新角色 ====================
  isRouteUnlocked(charId, st = this.state) {
    return (st.unlockedRoutes || []).includes(charId);
  }

  // 下一位開放的角色：優先選擇在三人同場已邂逅（故事上已有交集）的房客，其次隨機開啟一位尚未邂逅的房客
  pickNextRouteChar(st = this.state, fromCharId = null) {
    const unlocked = st.unlockedRoutes || [];
    const candidates = CHARACTERS.filter((c) => !unlocked.includes(c.id));
    if (!candidates.length) return null;

    const fromLore = fromCharId ? CHARACTER_EXTENDED_LORE[fromCharId] : null;
    const preferred = [fromLore?.trioPartner1, fromLore?.trioPartner2].filter(
      (id) => id && candidates.some((c) => c.id === id)
    );
    if (preferred.length) return preferred[0];

    const metLocked = candidates.filter((c) => (st.metCharacters || []).includes(c.id));
    if (metLocked.length) return metLocked[0].id;

    return candidates[Math.floor(Math.random() * candidates.length)].id;
  }

  // 確保開放名額 = 1（起始角色）＋ 已揭曉人格障礙症的角色數；回傳本次新開放的角色 ID 列表
  ensureRouteUnlocks(st = this.state, fromCharId = null) {
    if (!Array.isArray(st.unlockedRoutes)) st.unlockedRoutes = [];
    if (!Array.isArray(st.metCharacters)) st.metCharacters = [];
    const diagnosedCount = CHARACTERS.filter((c) => {
      const cs = st.characters?.[c.id];
      return cs && st.unlockedRoutes.includes(c.id) && cs.caseStudyUnlocked;
    }).length;
    const target = Math.min(CHARACTERS.length, 1 + diagnosedCount);
    const newly = [];
    while (st.unlockedRoutes.length < target) {
      const nextId = this.pickNextRouteChar(st, fromCharId);
      if (!nextId) break;
      st.unlockedRoutes.push(nextId);
      if (!st.metCharacters.includes(nextId)) st.metCharacters.push(nextId);
      newly.push(nextId);
    }
    return newly;
  }

  // 故事走訪：預設持續走目前角色的故事；揭曉人格障礙症後玩家可隨時切換到新開放的角色
  resolveStoryStep() {
    const st = this.state;
    st.storyStack = [];

    // 若目前角色尚未走完，直接繼續走目前角色的故事（E01 ~ E15）
    if (st.currentStoryChar && this.isRouteUnlocked(st.currentStoryChar) && !this.isStoryFinished(st.currentStoryChar)) {
      return st.currentStoryChar;
    }

    // 目前角色已走完時，選擇已開放但尚未走完的角色
    const unfinishedUnlocked = CHARACTERS.filter((c) => this.isRouteUnlocked(c.id) && !this.isStoryFinished(c.id));
    if (unfinishedUnlocked.length) {
      st.currentStoryChar = unfinishedUnlocked[0].id;
      return st.currentStoryChar;
    }

    // 保險：若已開放的都走完了，再開放下一位
    const nextId = this.pickNextRouteChar(st, st.currentStoryChar);
    if (!nextId) {
      st.currentStoryChar = null;
      return null;
    }
    st.unlockedRoutes.push(nextId);
    st.currentStoryChar = nextId;
    this.meetCharacter(nextId);
    return st.currentStoryChar;
  }

  getStoryStatus() {
    const cur = this.resolveStoryStep();
    if (!cur) return null;
    const char = CHARACTERS.find((c) => c.id === cur);
    const cs = this.state.characters[cur];
    const nextEv = this.getNextEventForChar(cur);
    return { char, cs, nextEv, retChar: null };
  }

  continueStory() {
    const cur = this.resolveStoryStep();
    if (!cur) {
      this.showToast('🌙 十二個故事都走到了盡頭。');
      this.render();
      return;
    }
    this.activeLocationId = 'apartment';
    this.startEvent(cur);
  }

  getCharactersAtLocation(locationId) {
    return CHARACTERS.filter((char) => {
      if (!this.isMet(char.id)) return false;
      const lore = CHARACTER_EXTENDED_LORE[char.id];
      const nextEv = this.getNextEventForChar(char.id);
      const roamLoc = lore.scheduleLocations[(this.state.roamCycle + Number(char.number)) % lore.scheduleLocations.length];
      return nextEv?.locationId === locationId || roamLoc === locationId;
    });
  }

  maskUndiagnosedText(text = '', charId) {
    // Case references are explicitly labeled; never rewrite object summaries into strings.
    return typeof text === 'string' ? text : '';
  }

  startNewGameFromForm() {
    if (this.loadingState?.active) return;

    const nameInput = document.getElementById('player-name-input');
    const pronounInput = document.getElementById('player-pronoun-input');

    const fresh = this.getDefaultState();
    fresh.initialized = true;
    fresh.player.name = (nameInput?.value || '林予安').trim() || '林予安';
    const pronoun = (pronounInput?.value || '她').trim() || '她';
    fresh.player.pronoun = pronoun;

    fresh.player.sex = 'unspecified';
    fresh.player.sexLabel = `代名詞「${pronoun}」`;
    fresh.player.trait = 'balanced';

    // 封面大合照選角：若使用者點選指定了角色，則以此角色開啟故事；若未指定，預設隨機挑選一位
    let firstChar = null;
    if (this.selectedFirstCharId) {
      firstChar = CHARACTERS.find((c) => c.id === this.selectedFirstCharId);
    }
    if (!firstChar) {
      firstChar = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
    }

    fresh.metCharacters = [firstChar.id];
    fresh.unlockedRoutes = [firstChar.id];
    fresh.currentStoryChar = firstChar.id;

    const pendingGame = {
      fresh,
      firstChar,
      selectionMode: this.selectedFirstCharId ? 'manual' : 'random'
    };

    audio.playSelect();

    if (areAllAssetsPreloaded()) {
      this.finalizeNewGameStart(pendingGame);
      return;
    }

    this.beginPreloadAndStart(pendingGame);
  }

  async beginPreloadAndStart(pendingGame) {
    const totalAssets = getAllGameImageAssets().length;
    this.loadingState = {
      active: true,
      pendingGame,
      failedAssets: [],
      snapshot: {
        totalCount: totalAssets,
        loadedCount: 0,
        failedCount: 0,
        completedCount: 0,
        loadedBytes: 0,
        percent: 0,
        currentLabel: '正在連結公寓記憶檔案…',
        done: false
      }
    };
    this.render();

    const result = await preloadAllAssets({
      concurrency: 6,
      onProgress: (snapshot) => {
        if (!this.loadingState) return;
        this.loadingState.snapshot = snapshot;
        this.updateLoadingProgressUI(snapshot);
      }
    });

    if (!this.loadingState) return;
    this.loadingState.snapshot = result;
    this.updateLoadingProgressUI(result);

    if (result.failedAssets && result.failedAssets.length > 0) {
      this.loadingState.failedAssets = result.failedAssets;
      this.render();
      return;
    }

    setTimeout(() => {
      if (!this.loadingState) return;
      this.finalizeNewGameStart(pendingGame);
    }, 320);
  }

  updateLoadingProgressUI(snapshot) {
    if (!snapshot) return;
    const fillEl = document.getElementById('loading-progress-fill');
    const percentEl = document.getElementById('loading-percent');
    const countEl = document.getElementById('loading-count');
    const bytesEl = document.getElementById('loading-bytes');
    const currentEl = document.getElementById('loading-current-item');

    if (fillEl) fillEl.style.width = `${snapshot.percent}%`;
    if (percentEl) percentEl.textContent = `${snapshot.percent}%`;
    if (countEl) countEl.textContent = `${snapshot.loadedCount} / ${snapshot.totalCount} 張圖片`;
    if (bytesEl) bytesEl.textContent = `${formatBytesMB(snapshot.loadedBytes)} MB`;
    if (currentEl) {
      currentEl.textContent = snapshot.done && snapshot.failedCount === 0
        ? '✨ 所有人物立繪與場景記憶已就緒，正在推開大門…'
        : `正在下載：${snapshot.currentLabel}`;
    }
  }

  finalizeNewGameStart(pendingGame) {
    if (!pendingGame) return;
    const { fresh, firstChar, selectionMode } = pendingGame;

    this.loadingState = null;
    this.state = fresh;
    this.activeScene = null;
    this.activeMainTab = 'locations';
    this.activeLocationId = 'apartment';
    this.autoSave();

    trackGA('game_start', {
      player_sex: fresh.player.sex,
      first_character_id: firstChar.id,
      first_character_name: firstChar.name,
      selection_mode: selectionMode
    });

    this.render();
    this.startEvent(firstChar.id, 1);
  }

  setFirstCharSelection(charId) {
    if (this.selectedFirstCharId === charId) {
      this.selectedFirstCharId = null;
    } else {
      this.selectedFirstCharId = charId;
    }
    audio.playSelect();

    // 暫存輸入框已填寫的姓名與代名詞
    const nameInput = document.getElementById('player-name-input');
    if (nameInput) this.state.player.name = nameInput.value;
    const pronounInput = document.getElementById('player-pronoun-input');
    if (pronounInput) this.state.player.pronoun = pronounInput.value;

    this.updateGroupPhotoSelectionUI();
  }

  updateGroupPhotoSelectionUI() {
    const selectedChar = this.selectedFirstCharId
      ? CHARACTERS.find((c) => c.id === this.selectedFirstCharId)
      : null;

    // 更新角色立繪柱之選中狀態、ARIA 屬性與標籤
    document.querySelectorAll('.photo-char-pillar').forEach((pillar) => {
      const cid = pillar.dataset.charId;
      const isSel = Boolean(this.selectedFirstCharId && cid === this.selectedFirstCharId);
      pillar.classList.toggle('is-selected', isSel);
      pillar.setAttribute('aria-pressed', isSel ? 'true' : 'false');

      const imgWrapper = pillar.querySelector('.photo-char-img-wrapper');
      let badge = pillar.querySelector('.photo-selected-badge');
      if (isSel && !badge && imgWrapper) {
        const b = document.createElement('span');
        b.className = 'photo-selected-badge';
        b.textContent = '✦ 首選';
        imgWrapper.appendChild(b);
      } else if (!isSel && badge) {
        badge.remove();
      }

      const actionText = pillar.querySelector('.hover-card-action');
      if (actionText) {
        actionText.textContent = isSel ? '✦ 已選中為首發故事 ✦' : '點擊選擇由此開啟故事';
      }
    });

    // 更新底部選擇提示列
    const statusDesc = document.getElementById('selection-status-desc');
    const actionsBox = document.getElementById('selection-actions');
    const statusIcon = document.querySelector('.selection-status-text .status-icon');
    const startBtn = document.getElementById('btn-start-game');

    if (statusDesc) {
      statusDesc.innerHTML = selectedChar
        ? `已指定故事起點：<strong class="selected-char-highlight">${selectedChar.name}</strong>（${selectedChar.occupation}）`
        : `目前狀態：<strong>未指定（隨機邂逅）</strong>`;
    }

    if (statusIcon) {
      statusIcon.textContent = selectedChar ? '✨' : '🎲';
    }

    if (actionsBox) {
      actionsBox.innerHTML = selectedChar
        ? `<button type="button" class="btn-clear-selection" data-action="clear-char-selection" title="取消指定，改為隨機選擇">🎲 改為隨機選擇</button>`
        : '';
    }

    if (startBtn) {
      startBtn.innerHTML = selectedChar
        ? `📖 與「${selectedChar.name}」推開公寓木門，翻開第一頁故事`
        : `📖 推開公寓木門，翻開第一頁故事（隨機邂逅一位房客）`;
    }
  }

  clampStat(val) {
    return Math.max(0, Math.min(100, Math.round(val)));
  }

  applyStats(charId, delta = {}) {
    const cs = this.state.characters[charId], applied = {};
    if (!cs) return applied;
    for(const key of ['affection','security','boundary']){
      if(!Number.isFinite(delta[key]))continue;
      const before=cs[key];
      cs[key]=this.clampStat(before+delta[key]);
      applied[key]=cs[key]-before;
    }
    return applied;
  }

  unlockCriterion(charId, criterionId, logEntry = null) {
    return this.unlockClinicalItem(charId, 'criterion', criterionId, logEntry);
  }

  unlockClinicalItem(charId, itemType, itemId, logEntry = null) {
    const char = CHARACTERS.find(c=>c.id===charId), cs=this.state.characters[charId];
    if (!char || !cs || !logEntry) return false;
    const items = itemType==='specifier' ? char.specifiers : itemType==='comorbidity' ? char.comorbidities : char.criteria;
    if (!items.some(x=>x.id===itemId)) return false;
    const ev=this.getEventsForChar(charId).find(e=>e.code===logEntry.eventCode);
    const allowed=itemType==='specifier' ? ev?.unlockSpecifiers : itemType==='comorbidity' ? ev?.unlockComorbidities : ev?.unlockCriteria;
    if (!allowed?.includes(itemId)) return false;
    const bucket=itemType==='specifier' ? cs.unlockedSpecifiers : itemType==='comorbidity' ? cs.unlockedComorbidities : cs.unlockedCriteria;
    const added=!bucket.includes(itemId);if(added)bucket.push(itemId);
    const logs=cs.evidenceLog[itemId] || [];
    if (!logs.some(x=>x.eventCode===logEntry.eventCode && x.choiceText===logEntry.choiceText)) logs.push(logEntry);
    cs.evidenceLog[itemId]=logs;
    if(added&&this.state.studyMode)this.showToast(`📓 ${char.name}：記錄一項線索，仍需脈絡與評估。`);
    return added;
  }

  getClinicalItemMeta(char, itemType, itemId) {
    if (!char) return null;
    if (itemType === 'specifier') {
      return (char.specifiers || []).find((sp) => sp.id === itemId) || null;
    }
    if (itemType === 'comorbidity') {
      return (char.comorbidities || []).find((cm) => cm.id === itemId) || null;
    }
    return (char.criteria || []).find((cr) => cr.id === itemId) || null;
  }

  renderEvidenceModal(charId, itemType, itemId) {
    const root = document.getElementById('modal-root');
    const char = CHARACTERS.find(c => c.id === charId), cs = this.state.characters[charId];
    const item = char && this.getClinicalItemMeta(char, itemType, itemId);
    if (!root || !item || !cs) return;
    const logs = cs.evidenceLog[itemId] || [];
    root.innerHTML = `<div class="modal-backdrop" data-action="close-modal">
      <div class="modal-window evidence-modal" role="dialog" aria-modal="true" aria-labelledby="evidence-modal-title">
        <div class="modal-header"><div><p class="evidence-modal-eyebrow">角色線索紀錄</p><h2 id="evidence-modal-title">${escapeHtml(char.name)}｜這一輪的線索</h2></div><button class="btn-close" data-action="close-modal" aria-label="關閉線索紀錄">✕</button></div>
        <div class="modal-body">
          <section class="evidence-modal-overview"><span class="criterion-code">${escapeHtml(item.code || '')}</span><p>${escapeHtml(item.desc || item.title || '')}</p><small>線索不等於診斷。以下保留這一輪讀到的內容，並分開說明支持依據與觀察限制。</small></section>
          ${logs.length ? logs.map((log, index) => `<article class="evidence-log-entry evidence-record">
            <header class="evidence-record-header"><span class="evidence-record-number">紀錄 ${String(index + 1).padStart(2,'0')}</span><h3>${escapeHtml(log.eventTitle || log.eventCode || '故事片段')}</h3><span class="criterion-status ${log.status==='uncertain'?'status-uncertain':'status-recorded'}">${log.status==='uncertain'?'待確認／有其他解釋':'已記錄相關線索'}</span><p class="evidence-record-source">資料來源：${escapeHtml((log.sources || []).join('、') || '這一幕的紀錄')}</p></header>
            <section class="evidence-record-section"><h4>這一幕的原始對話</h4><blockquote>${escapeHtml(log.quote || '這段紀錄未保存原始對話。')}</blockquote></section>
            <section class="evidence-record-section evidence-player-response"><h4>你的回應${log.reply?'與對方反應':''}</h4><p>${escapeHtml(log.choiceText || '這段紀錄未保存玩家回應。')}</p>${log.reply?`<div class="evidence-character-reply"><h5>對方的反應</h5><p>${escapeHtml(log.reply)}</p></div>`:''}</section>
            <section class="evidence-record-section"><h4>這段內容提供的線索</h4><p>${escapeHtml(log.basis || log.behavior || '這段紀錄未提供額外的線索說明。')}</p></section>
            <section class="evidence-record-section evidence-record-limit"><h4>觀察限制與其他解釋</h4><p>${escapeHtml(log.limitation || '這段紀錄未提供額外的限制說明；單一情境仍不足以完成診斷。')}</p></section>
          </article>`).join('') : '<p class="evidence-empty-state">這一輪尚無這項線索的觀察紀錄。教材與其他故事中的內容不會自動加入。</p>'}
        </div>
      </div>
    </div>`;
  }

  // ==================== 啟動 15 事件決策樹中的特定事件 ====================
  startEvent(charId, requestedEventNum = null) {
    const char = CHARACTERS.find((c) => c.id === charId);
    const cs = this.state.characters[charId];
    const events = this.getEventsForChar(charId);
    if (!char || !cs || !events.length) return;

    const targetEvNum =
      requestedEventNum !== null ? Number(requestedEventNum) : Math.min((cs.eventCompleted || 0) + 1, 15);

    if (targetEvNum === 15) {
      this.showEndingForCharacter(charId);
      return;
    }

    if (!this.isRouteUnlocked(charId) || targetEvNum > (cs.eventCompleted || 0) + 1 || targetEvNum < 1) {
      this.showToast('請先完成前一事件；已走過的篇章可重溫。');
      return;
    }
    const evObj = this.prepareEvent(charId, targetEvNum);
    const continuity = this.getContinuityText(charId, targetEvNum);
    evObj.continuityText = [evObj.unfinishedWork?'先前的工作還沒談妥，私人合作還沒恢復。':null,continuity].filter(Boolean).join('\n\n');
    this.activeLocationId = evObj.locationId || char.locationId;
    this.meetCharacter(charId);
    if (evObj.partnerId) this.meetCharacter(evObj.partnerId);

    audio.playSelect();
    trackGA('story_play', {
      character_id: char.id,
      character_name: char.name,
      event_number: evObj.eventNumber,
      event_code: evObj.code,
      event_title: evObj.title
    });
    this.activeScene = {
      mode: 'event',
      charId,
      partnerId: evObj.partnerId || null,
      eventNumber: evObj.eventNumber,
      eventData: evObj,
      locationId: evObj.locationId,
      nodeIndex: 0,
      expression: evObj.nodes[0]?.expression || 'neutral',
      awaitingNextAfterChoice: false,
      lastChoiceOutcome: null
    };

    this.autoSave();
    this.render();
  }

  // 直接從地圖觸發「角色專屬天災事件 (E08) / 雙人秘密羈絆事件 (E10)」
  triggerSharedDisasterModal(disasterType = 'quake') {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return;

    const isQuake = disasterType === 'quake';
    const title = isQuake
      ? '📚 E08｜案例筆記'
      : '🌙 E10｜協商與修補';
    const subtitle = isQuake
      ? '閱讀已到達事件的教學筆記；不能跳過前面的故事。'
      : '重溫已到達的協商場景；雙方意願與生活安排都需要尊重。';

    modalRoot.innerHTML = `
      <div class="modal-backdrop" data-action="close-modal">
        <div class="modal-window">
          <div class="modal-header">
            <div>
              <h2>${title}</h2>
              <p>${subtitle}</p>
            </div>
            <button type="button" class="btn-close" data-action="close-modal" aria-label="關閉">✕</button>
          </div>
          <div class="modal-body">
            <div class="disaster-char-grid">
              ${CHARACTERS.map((c) => {
                const cs = this.state.characters[c.id];
                const done = isQuake ? cs.sharedQuakeDone : cs.sharedTyphoonDone;
                const uTitle = isQuake ? (UNIQUE_DISASTER_EVENTS[c.id]?.title || 'E08 案例筆記') : 'E10 協商與修補';
                return `
                  <button
                    class="disaster-char-pick"
                    data-action="launch-shared-disaster"
                    data-char-id="${c.id}"
                    data-disaster="${disasterType}"
                  >
                    <img src="${resolveAssetUrl(`./assets/characters/${c.id}.png`)}" alt="${c.name}" />
                    <div>
                      <strong>#${c.number} ${c.name}</strong>
                      <small>${uTitle.replace(/^E\d+｜/, '')}</small>
                      <span class="disaster-status-tag ${done ? 'done' : ''}">
                        ${done ? '✅ 已共度此事件（可重溫）' : '⚡ 點擊立即前往陪伴'}
                      </span>
                    </div>
                  </button>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  launchSharedDisasterForChar(charId, disasterType) {
    this.closeModals();
    this.startEvent(charId, disasterType === 'quake' ? 8 : 10);
  }

  startDailyTalk(charId) {
    const char = CHARACTERS.find((c) => c.id === charId);
    const scenario = ALL_SCENARIOS[charId];
    const cs = this.state.characters[charId];
    if (!char || !scenario || !cs || !this.isRouteUnlocked(charId)) return;

    const extraPool = EXTRA_DAILY_TALKS[charId] || [];
    const basePool = scenario.dailyTalks || [];
    const talks = [...extraPool, ...basePool];
    const talk = talks[cs.dailyTalkIndex % talks.length];
    const repeatCount = Math.floor(cs.dailyTalkIndex / Math.max(1, talks.length));
    cs.dailyTalkIndex += 1;

    audio.playSelect();
    trackGA('story_daily', {
      character_id: char.id,
      character_name: char.name,
      talk_title: talk.title
    });

    this.activeScene = {
      mode: 'daily',
      charId,
      locationId: this.activeLocationId !== 'apartment' ? this.activeLocationId : char.locationId,
      talk,
      repeatCount,
      picked: null,
      expression: 'smile'
    };

    this.autoSave();
    this.render();
  }

  handleDailyChoice(choiceIndex) {
    const sc = this.activeScene;
    if (!sc || sc.mode !== 'daily' || sc.picked) return;
    const { charId, talk } = sc;
    const cs = this.state.characters[charId];
    const choice = talk.choices?.[choiceIndex];
    if (!choice || !cs) return;

    const requestedStats = Object.fromEntries(Object.entries(choice.stats || {}).map(([key,value])=>[key,Math.sign(value)*Math.min(2,Math.ceil(Math.abs(value)/3))]));
    const stats=this.applyStats(charId,requestedStats);
    this.recordBoundaryConsequence(charId,{...choice,stats:requestedStats},{code:`daily:${talk.title}`,title:talk.title});
    audio.playSelect();

    sc.picked = { choiceIndex, text: this.formatText(choice.text), reply: this.formatText(choice.reply), psychNote: '', stats };
    sc.expression = choice.expression || 'neutral';

    if (!Array.isArray(cs.diary)) cs.diary = [];
    cs.diary.unshift({
      id: `daily_${Date.now()}`,
      type: 'daily',
      stats,
      code: '🌸 日常',
      title: `日常互動：${talk.title}`,
      context: this.formatText(talk.prompt),
      choiceText: this.formatText(choice.text),
      reaction: this.formatText(choice.reply),
      dsmJudgment: this.maskUndiagnosedText(choice.psychNote || '', charId),
      criterionBasis: null,
      recordedAt: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })
    });
    this.autoSave();
    this.render();
  }

  prepareEndingData(charId,key,preview=false) {
    const data={...ALL_SCENARIOS[charId].endings[key]},cs=this.state.characters[charId],r=STORY_ROUTES[charId];
    if(!preview&&key==='friendEnd'){
      const memory=cs.memories?.ordinary_2;
      let core=data.narrativeCore;
      if(charId==='shen_mo'){
        const bus=memory?.choiceIndex===1||/公車/.test(memory?.choice||'');
        const tofu=memory?.choiceIndex===0||/空白|豆腐/.test(memory?.choice||'');
        core=core.replace('你把畫了公車的相紙帶來',bus?'你把畫了公車的相紙帶來':tofu?'你把寫了豆腐的相紙帶來':'你們翻看今天帶來的相紙');
      }
      if(charId==='han_xiao'){
        const named=cs.memories?.ordinary_0?.choiceIndex===0||/酸，不是輸贏/.test(cs.memories?.ordinary_0?.choice||'');
        core=core.replace('果茶用了你取的名字',named?'果茶用了你取的名字':'你們又試了一杯新果茶');
      }
      if(charId==='ruri'){
        const picked=cs.memories?.ordinary_0?.choiceIndex===0||/選裡面|秘密口袋/.test(cs.memories?.ordinary_0?.choice||'');
        core=core.replace('你挑的那段亮線',picked?'你挑的那段亮線':'她留在內裡的那段亮線');
      }
      const n=expandEnding(charId,key,core);Object.assign(data,{romanticText:n.text,soulmateText:n.text,narrativeCore:core,narrativeAdditions:n.narrativeAdditions});
    }
    if(!preview&&key==='triggerEnd'&&!Object.values(cs.choiceScores).some(choice=>!choice.healthy)){
      const core=`展覽結束，你們還沒熟到想繼續私人來往。${r.name}把「${r.task}」交給負責人，你也回到自己的安排。今天先不約，不用為了湊一個好看的結局答應。以後若想再見，得兩個人都重新願意。`;
      const narration=expandEnding(charId,key,core);Object.assign(data,{title:'【未完結局】還需要一些時間',subtitle:'保留距離，各自生活',romanticText:narration.text,soulmateText:narration.text,narrativeCore:core,narrativeAdditions:narration.narrativeAdditions});
    }
    if(!preview&&key==='codependentEnd'&&this.getEthicsInfo(charId).active){data.title=`【爭議結局】${r.task}`;data.subtitle='靠近之後，仍須面對越界的代價';}
    return data;
  }

  showEndingForCharacter(charId, forcedEndingKey = null) {
    const char=CHARACTERS.find(c=>c.id===charId),cs=this.state.characters[charId];
    if(!char||!cs||cs.eventCompleted<14){this.showToast('先完成 E14 的關係選擇，才能閱讀結局。');return;}
    let endingKey;
    if(cs.relationshipIntent==='distance'||!cs.relationshipIntent)endingKey='normalEnd';
    else if(cs.security<22||cs.affection<20||cs.characterConsent==='distance')endingKey='triggerEnd';
    else if(cs.boundary<45)endingKey='codependentEnd';
    else if(cs.relationshipIntent==='friendship')endingKey='friendEnd';
    else if(cs.characterConsent!=='romantic')endingKey='normalEnd';
    else if(cs.affection>=20&&cs.security>=36)endingKey='trueEnd';
    else endingKey='normalEnd';
    // Alternative endings are explicitly previews and never alter progress, consent or earned endings.
    const preview=Boolean(forcedEndingKey);
    if(preview&&ALL_SCENARIOS[charId].endings[forcedEndingKey])endingKey=forcedEndingKey;
    if(!preview){cs.endingKey=endingKey;cs.eventCompleted=15;if(!cs.unlockedEndings.includes(endingKey))cs.unlockedEndings.push(endingKey);}
    const endingData=this.prepareEndingData(charId,endingKey,preview);
    if(!preview&&endingKey==='codependentEnd'&&this.getEthicsInfo(charId).active){endingData.title=`【爭議結局】${STORY_ROUTES[charId].task}`;endingData.subtitle='靠近之後，仍須面對越界的代價';}
    this.activeScene={mode:'ending',charId,...getEndingPlace(charId,endingKey),endingKey,endingData,expression:endingKey==='trueEnd'?'smile':'neutral',preview,contentVersion:CONTENT_VERSION};
    this.autoSave();this.render();
  }

  handleNextNode() {
    if (!this.activeScene) return;
    if (this.activeScene.mode === 'daily' || this.activeScene.mode === 'ending') {
      this.activeScene = null;
      this.autoSave();
      this.render();
      return;
    }

    const { charId, eventData, eventNumber, nodeIndex, awaitingNextAfterChoice, partnerId } = this.activeScene;
    const nodes = eventData.nodes;

    if (awaitingNextAfterChoice) {
      this.activeScene.awaitingNextAfterChoice = false;
      this.activeScene.lastChoiceOutcome = null;
      if (nodeIndex + 1 < nodes.length) {
        this.activeScene.nodeIndex += 1;
        const nextNode = nodes[this.activeScene.nodeIndex];
        this.activeScene.expression = nextNode.expression || 'neutral';
        this.autoSave();
        this.render();
      } else {
        this.completeCurrentEvent(charId, eventNumber, eventData, partnerId);
      }
      return;
    }

    const currentNode = nodes[nodeIndex];
    if (currentNode.choices && currentNode.choices.length > 0) {
      return;
    }

    if (nodeIndex + 1 < nodes.length) {
      this.activeScene.nodeIndex += 1;
      const nextNode = nodes[this.activeScene.nodeIndex];
      this.activeScene.expression = nextNode.expression || 'neutral';
      audio.playChime(480, 0.06);
      this.autoSave();
      this.render();
    } else {
      this.completeCurrentEvent(charId, eventNumber, eventData, partnerId);
    }
  }

  completeCurrentEvent(charId, eventNumber, eventData, partnerId) {
    const cs=this.state.characters[charId];if(!cs || eventNumber>cs.eventCompleted+1)return;
    cs.eventCompleted=Math.max(cs.eventCompleted,eventNumber);
    cs.chapterCompleted=Math.min(3,Math.floor(cs.eventCompleted/4));
    let newly=[];let unlocked=false;
    if(eventNumber===8 && !cs.caseStudyUnlocked) {
      cs.caseStudyUnlocked=true;unlocked=true;newly=this.ensureRouteUnlocks(this.state,charId);
    }
    if(eventNumber>=13)cs.backstoryUnlocked=true;
    cs.perfectAchieved=this.getPerfectInfo(charId).isPerfect;
    this.state.roamCycle=(this.state.roamCycle||0)+1;
    this.activeScene=null;
    if(eventNumber===14){this.showEndingForCharacter(charId);return;}
    this.autoSave();this.render();
    if(unlocked)this.showToast('新的房客故事已開啟；本角色的完整案例會在故事結束後呈現。');
  }

  // ==================== 彈窗 ①：🥇 案例閱讀成就（教學案例揭曉） ====================
  renderAchievementModal(charId, nextUnlockId = null) {
    const root=document.getElementById('modal-root'),char=CHARACTERS.find(c=>c.id===charId);
    if(!root||!char)return;
    this.pendingRouteUnlock=nextUnlockId?{newCharId:nextUnlockId,fromCharId:charId}:null;
    root.innerHTML=`<div class="modal-backdrop" data-action="ack-achievement"><div class="modal-window achv-modal"><div class="modal-header"><h2>📚 教學案例說明已開啟</h2><button class="btn-close" data-action="ack-achievement" aria-label="關閉">✕</button></div><div class="modal-body"><h3>${escapeHtml(char.dsmTitle)}</h3><p>這是作者預設的虛構案例，不是你替 ${escapeHtml(char.name)} 確診。已觀察的線索不會自動補齊，仍要保留其他解釋。</p>${this.renderCaseStudy(charId)}<button class="btn-primary-large" data-action="ack-achievement">繼續故事</button></div></div></div>`;
  }

  // 關閉成就彈窗後，接著跳出新角色解鎖彈窗
  acknowledgeAchievement() {
    const pending = this.pendingRouteUnlock;
    this.pendingRouteUnlock = null;
    this.closeModals();
    if (pending) {
      audio.playChime(720, 0.12);
      this.renderRouteUnlockModal(pending.newCharId, pending.fromCharId);
    }
  }

  // ==================== 彈窗 ②：🔓 新角色已解鎖通知 ====================
  renderRouteUnlockModal(newCharId, fromCharId) {
    const modalRoot = document.getElementById('modal-root');
    const newChar = CHARACTERS.find((c) => c.id === newCharId);
    const fromChar = CHARACTERS.find((c) => c.id === fromCharId);
    if (!modalRoot || !newChar || !fromChar) return;
    const fromCs = this.state.characters[fromChar.id];
    const remain = Math.max(0, 15 - (fromCs?.eventCompleted || 0));
    const unlockedCount = (this.state.unlockedRoutes || []).length;
    this.showToast(`🔓 新角色已解鎖：#${newChar.number} ${newChar.name}！可隨時切換攻略`);

    modalRoot.innerHTML = `
      <div class="modal-backdrop" data-action="close-modal">
        <div class="modal-window route-unlock-modal" style="--char-color: ${newChar.themeColor}">
          <div class="modal-header">
            <div>
              <h2>🔓 新角色已解鎖！</h2>
              <p>公寓裡又有一扇門為你打開了（已開放 ${unlockedCount} / ${CHARACTERS.length} 位）。</p>
            </div>
            <button type="button" class="btn-close" data-action="close-modal" aria-label="關閉">✕</button>
          </div>
          <div class="modal-body">
            <div class="route-unlock-body">
              <img class="route-unlock-avatar" src="${resolveAssetUrl(`./assets/characters/${newChar.id}.png`)}" alt="${newChar.name}" />
              <div class="route-unlock-info">
                <span class="route-unlock-tag">✨ NEW ・ 可認識的房客</span>
                <h3>#${newChar.number} ${newChar.name} <small>｜ ${newChar.occupation}</small></h3>
                <p>${newChar.tagline || ''}</p>
              </div>
            </div>
            <div class="route-unlock-actions">
              <button type="button" class="btn-primary-large" data-action="switch-to-unlocked-char" data-char-id="${newChar.id}">
                💖 前往認識 ${newChar.name}
              </button>
              ${
                remain > 0
                  ? `<button type="button" class="nav-btn" data-action="close-modal">📖 繼續陪 ${fromChar.name} 走下去</button>`
                  : ''
              }
            </div>
          </div>
        </div>
      </div>
    `;
  }

  handleChoiceSelect(choiceIndex) {
    const sc=this.activeScene;if(!sc||sc.mode!=='event'||sc.awaitingNextAfterChoice)return;
    const {charId,eventData,nodeIndex}=sc;const cs=this.state.characters[charId],char=CHARACTERS.find(c=>c.id===charId);
    const node=eventData.nodes[nodeIndex],choice=node?.choices?.[choiceIndex];if(!choice||!cs)return;
    const key=`${sc.eventNumber}_${nodeIndex}`;
    const replay=cs.eventCompleted>=sc.eventNumber;
    const requestedStats=Object.fromEntries(Object.entries(choice.stats||{}).map(([k,v])=>[k,replay&&v>0?Math.max(1,Math.round(v*0.35)):v]));
    const stats=this.applyStats(charId,requestedStats);
    cs.choiceScores[key]={choiceIndex,...(choice.stats||{}),healthy:choice.healthy===true,ethicalRisk:choice.ethicalRisk===true};
    this.recordBoundaryConsequence(charId,choice,{code:eventData.code,title:eventData.title});
    cs.choiceEffects[key]=choice.decision || choice.setFlag || null;
    if(choice.memory)cs.memories[choice.memory]={event:eventData.code,choice:this.formatText(choice.text),choiceIndex};
    else if([2,6,13].includes(sc.eventNumber))delete cs.memories[`ordinary_${[2,6,13].indexOf(sc.eventNumber)}`];
    if(choice.relationshipIntent){
      cs.relationshipIntent=choice.relationshipIntent;
      let offered=this.getCharacterConsent(charId);
      if(choice.consentCap==='friendship'&&offered==='romantic')offered='friendship';
      cs.characterConsent=choice.relationshipIntent==='distance'?'distance':choice.relationshipIntent==='friendship'&&offered!=='distance'?'friendship':offered;
    }
    cs.perfectAchieved=this.getPerfectInfo(charId).isPerfect;
    const observed=eventData.nodes.slice(0,nodeIndex+1).map(n=>this.formatText(n.text)).join(' ');
    const log={eventCode:eventData.code,eventTitle:eventData.title,quote:observed,choiceText:this.formatText(choice.text),reply:this.formatText(choice.reply),behavior:eventData.studySummary?.points?.[0]||''};
    for(const id of eventData.unlockCriteria||[])this.unlockCriterion(charId,id,{...log,...eventData.evidence?.[id]});
    for(const id of eventData.candidateCriteria||[]){
      const logs=cs.evidenceLog[id]||[];if(!logs.some(x=>x.eventCode===eventData.code&&x.choiceText===log.choiceText))logs.push({...log,...eventData.evidence?.[id]});cs.evidenceLog[id]=logs;
      if(!cs.uncertainCriteria.includes(id))cs.uncertainCriteria.push(id);
    }
    for(const id of eventData.unlockSpecifiers||[])this.unlockClinicalItem(charId,'specifier',id,log);
    const bases=[...(eventData.unlockCriteria||[]),...(eventData.candidateCriteria||[])].map(id=>char.criteria.find(c=>c.id===id)).filter(Boolean);
    sc.awaitingNextAfterChoice=true;sc.expression=choice.expression||'neutral';
    sc.lastChoiceOutcome={choiceIndex,choiceText:log.choiceText,reply:log.reply,replyCore:this.formatText(choice.replyCore||choice.reply),psychNote:choice.psychNote||'',stats,criterionBasis:bases[0]||null,criteriaBasis:bases,studySummary:eventData.studySummary};
    cs.diary.unshift({id:`${eventData.code}_${nodeIndex}_${Date.now()}`,type:'event',code:eventData.code,title:eventData.title,context:observed,choiceText:log.choiceText,reaction:log.reply,dsmJudgment:choice.psychNote||'',criterionBasis:bases[0]||null,criteriaBasis:bases,evidence:eventData.evidence,clinical:Boolean(bases.length||eventData.type==='caseStudy'||eventData.unlockSpecifiers?.length),stats,recordedAt:new Date().toLocaleTimeString('zh-TW',{hour:'2-digit',minute:'2-digit'})});
    this.autoSave();this.render();
  }

  formatText(text = '') {
    return String(text).replaceAll('{player}', this.state.player.name);
  }

  showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const el = document.createElement('div');
    el.className = 'toast-item';
    el.textContent = msg;
    container.appendChild(el);
    setTimeout(() => {
      el.classList.add('toast-fadeout');
      setTimeout(() => el.remove(), 350);
    }, 3800);
  }

  bindGlobalEvents() {
    // Browsers require a real gesture before starting background audio.
    document.addEventListener('pointerdown', () => audio.unlock(), { passive: true });
    document.addEventListener('keydown', () => audio.unlock());
    window.matchMedia('(max-width: 1199px)').addEventListener('change', () => {
      if (this.dsmWidgetOpen) this.render();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.pendingRouteUnlock) {
          this.acknowledgeAchievement();
        } else if (document.getElementById('modal-root')?.firstElementChild) {
          this.closeModals();
        } else if (this.dsmWidgetOpen) {
          this.dsmWidgetOpen = false;
          this.render();
          document.querySelector('.dsm-side-launcher-tab')?.focus();
        } else {
          this.closeModals();
        }
      }
      if (e.key === 'Enter' || e.key === ' ') {
        const pillar = document.activeElement?.closest('.photo-char-pillar');
        if (pillar && pillar.dataset.charId) {
          e.preventDefault();
          this.setFirstCharSelection(pillar.dataset.charId);
        }
      }
    });

    document.addEventListener('mouseover', (e) => {
      const pillar = e.target.closest('.photo-char-pillar');
      if (pillar && pillar !== this._lastHoveredPillar) {
        this._lastHoveredPillar = pillar;
        const charId = pillar.dataset.charId;
        const char = CHARACTERS.find((c) => c.id === charId);
        const subtitleEl = document.getElementById('photo-frame-subtitle');
        if (subtitleEl && char) {
          subtitleEl.innerHTML = `✨ 探索中：<strong style="color:#fef08a; font-size:0.95rem;">${char.name}</strong>（${char.enName} ‧ ${char.occupation}）— 點選由他開啟第一頁故事`;
        }
        if (audio.enabled && typeof audio.playChime === 'function') {
          audio.playChime(720, 0.02);
        }
      }
    });

    document.addEventListener('mouseout', (e) => {
      const pillar = e.target.closest('.photo-char-pillar');
      if (pillar && pillar === this._lastHoveredPillar) {
        this._lastHoveredPillar = null;
        const subtitleEl = document.getElementById('photo-frame-subtitle');
        if (subtitleEl) {
          subtitleEl.innerHTML = '十二扇房門，十二段尚未相識的故事';
        }
      }
    });

    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-action]');
      if (!target) return;
      // 點擊彈窗內部空白區域時，避免誤觸外層 .modal-backdrop 的 close-modal
      if (target.classList.contains('modal-backdrop') && e.target !== target) {
        return;
      }
      const action = target.dataset.action;

      switch (action) {
        case 'start-new-game':
          this.startNewGameFromForm();
          break;
        case 'retry-preload':
          if (this.loadingState?.pendingGame) {
            this.beginPreloadAndStart(this.loadingState.pendingGame);
          }
          break;
        case 'force-enter-game':
          if (this.loadingState?.pendingGame) {
            this.finalizeNewGameStart(this.loadingState.pendingGame);
          }
          break;
        case 'cancel-loading-to-cover':
          this.loadingState = null;
          this.render();
          break;
        case 'select-first-char':
          this.setFirstCharSelection(target.dataset.charId);
          break;
        case 'clear-char-selection':
          this.setFirstCharSelection(null);
          break;
        case 'toggle-mobile-nav':
          this.mobileNavOpen = !this.mobileNavOpen;
          this.render();
          break;
        case 'switch-main-tab':
          this.activeMainTab = target.dataset.tab || 'locations';
          this.activeScene = null;
          this.mobileNavOpen = false;
          audio.playChime(540, 0.06);
          this.render();
          if (target.dataset.focusCharId) {
            setTimeout(() => {
              const cardEl = document.getElementById(`rel-char-card-${target.dataset.focusCharId}`);
              cardEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 60);
          }
          break;
        case 'focus-rel-card': {
          const cid = target.dataset.charId;
          const cardEl = document.getElementById(`rel-char-card-${cid}`);
          if (cardEl) {
            cardEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            cardEl.classList.add('rel-card-highlight');
            setTimeout(() => cardEl.classList.remove('rel-card-highlight'), 1800);
          }
          break;
        }
        case 'select-location':
          this.activeLocationId = target.dataset.locationId || 'apartment';
          this.activeMainTab = 'locations';
          audio.playChime(520, 0.06);
          this.render();
          break;
        case 'advance-novel-story':
        case 'continue-story':
          this.continueStory();
          break;
        case 'story-daily':
          if (!this.guardRoute(target.dataset.charId)) break;
          this.startDailyTalk(target.dataset.charId);
          break;
        case 'daily-choice':
          this.handleDailyChoice(Number(target.dataset.choiceIndex));
          break;
        case 'roam-shuffle':
          this.state.roamCycle = (this.state.roamCycle || 0) + 1;
          this.autoSave();
          audio.playChime(580, 0.08);
          this.render();
          this.showToast('🌸 漫步街區：房客們已移動至新的日常活動場所！');
          break;
        case 'open-shared-disaster':
          this.triggerSharedDisasterModal(target.dataset.disaster || 'quake');
          break;
        case 'launch-shared-disaster':
          if (!this.guardRoute(target.dataset.charId)) break;
          this.launchSharedDisasterForChar(target.dataset.charId, target.dataset.disaster);
          break;
        case 'open-event-tree-modal':
          this.renderEventTreeModal(target.dataset.charId);
          break;
        case 'filter-roster':
          this.selectedFilter = target.dataset.filter;
          audio.playChime(520, 0.06);
          this.render();
          break;
        case 'select-story-char': {
          const cid = target.dataset.charId;
          if (cid && CHARACTERS.some((c) => c.id === cid)) {
            if (!this.guardRoute(cid)) break;
            this.state.currentStoryChar = cid;
            this.meetCharacter(cid);
            this.autoSave();
            audio.playChime(540, 0.06);
            this.render();
          }
          break;
        }
        case 'switch-to-unlocked-char': {
          const cid = target.dataset.charId;
          this.closeModals();
          if (!cid || !this.guardRoute(cid)) break;
          this.state.currentStoryChar = cid;
          this.activeMainTab = 'locations';
          this.startEvent(cid);
          break;
        }
        case 'start-event':
        case 'start-chapter':
          this.closeModals();
          {
            const cid = target.dataset.charId;
            if (!this.guardRoute(cid)) break;
            const evNum = target.dataset.eventNum ? Number(target.dataset.eventNum) : null;
            const doneUpTo = this.state.characters[cid]?.eventCompleted || 0;
            this.state.currentStoryChar = cid;
            if (evNum !== null && evNum <= doneUpTo) {
              this.startEvent(cid, evNum); // 重溫已走過的事件
            } else {
              this.startEvent(cid, evNum);
            }
          }
          break;
        case 'start-daily':
          if (!this.guardRoute(target.dataset.charId)) break;
          this.startDailyTalk(target.dataset.charId);
          break;
        case 'show-ending': {
          const cid = target.dataset.charId;
          if (!this.guardRoute(cid)) break;
          const cs = this.state.characters[cid];
          if (cs.eventCompleted < 14) {
            this.showToast(`🔒 請先推進該角色的劇情事件至 ${this.getRevealCode(cid)} 讀完該幕，才會開放新的房客故事。`);
            return;
          }
          this.showEndingForCharacter(cid, target.dataset.endingKey || null);
          break;
        }
        case 'view-legacy-archive':
          this.renderLegacyArchiveModal();
          break;
        case 'answer-learning': {
          this.answerLearning(target.dataset.charId,target.dataset.taskId,target.dataset.optionId);
          break;
        }
        case 'open-learning':
          this.renderLearningModal(target.dataset.charId);
          break;
        case 'switch-ending-mode': {
          if (this.activeScene && this.activeScene.mode === 'ending') {
            const newMode = target.dataset.mode || 'romantic';
            this.endingViewMode = newMode;
            this.activeScene.endingMode = newMode;
            audio.playChime(540, 0.05);
            this.render();
          }
          break;
        }
        case 'next-node':
          this.handleNextNode();
          break;
        case 'select-choice':
          this.handleChoiceSelect(Number(target.dataset.choiceIndex));
          break;
        case 'exit-scene':
          this.activeScene = null;
          this.autoSave();
          this.render();
          break;
        case 'open-compendium':
          this.activeMainTab = 'relationships';
          this.activeScene = null;
          this.closeModals();
          this.render();
          if (target.dataset.charId) {
            setTimeout(() => {
              const cardEl = document.getElementById(`rel-char-card-${target.dataset.charId}`);
              cardEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 60);
          }
          break;
        case 'open-save-modal':
          this.mobileNavOpen = false;
          this.render();
          this.renderSaveModal();
          break;
        case 'toggle-dsm-widget':
          this.dsmWidgetOpen = !this.dsmWidgetOpen;
          this.mobileNavOpen = false;
          audio.playChime(560, 0.06);
          this.render();
          document.querySelector(this.dsmWidgetOpen ? '#dsm-reference-drawer .btn-close' : '.dsm-side-launcher-tab')?.focus({preventScroll:true});
          break;
        case 'close-dsm-widget':
          this.dsmWidgetOpen = false;
          this.render();
          break;
        case 'select-dsm-reference':
          this.selectDsmReference(target.dataset.code);
          break;
        case 'open-dsm-ref':
          this.dsmWidgetOpen = true;
          if(!this.selectDsmReference(target.dataset.code))this.render();
          break;
        case 'save-slot':
          this.saveToSlot(Number(target.dataset.slot));
          break;
        case 'load-slot':
          this.loadFromSlot(Number(target.dataset.slot));
          break;
        case 'clear-all-saves':
        case 'restart-game':
          if (confirm('確定要重新開始遊戲嗎？（將重置目前故事進度，並返回初始創角畫面重新開始）')) {
            [
              STORAGE_KEY_AUTOSAVE,
              'edge_of_love_browser_save_v3',
              'edge_of_love_browser_save_v2',
              ...(action === 'clear-all-saves'
                ? ['edge_of_love_slot_1', 'edge_of_love_slot_2', 'edge_of_love_slot_3']
                : [])
            ].forEach((k) => localStorage.removeItem(k));
            [
              STORAGE_KEY_SESSION,
              'edge_of_love_session_save_v3',
              'edge_of_love_session_save_v2',
              ...(action === 'clear-all-saves'
                ? ['edge_of_love_slot_1', 'edge_of_love_slot_2', 'edge_of_love_slot_3']
                : [])
            ].forEach((k) => sessionStorage.removeItem(k));
            this.state = this.getDefaultState();
            this.activeScene = null;
            this.autoSave(); // An uninitialized v6 save prevents silently re-importing legacy progress after restart.
            this.activeMainTab = 'locations';
            this.activeLocationId = 'apartment';
            this.selectedFirstCharId = null;
            this.closeModals();
            this.render();
            this.showToast('🔄 已重新開始遊戲，請設定主角資訊！');
          }
          break;
        case 'toggle-audio': {
          const on = audio.toggle();
          this.render();
          this.showToast(on ? '🔊 背景音樂與音效已開啟' : '🔇 背景音樂與音效已靜音');
          break;
        }
        case 'toggle-study-mode': {
          this.state.studyMode = !this.state.studyMode;
          this.mobileNavOpen = false;
          audio.playChime(this.state.studyMode ? 680 : 480, 0.08);
          this.autoSave();
          this.render();
          this.showToast(
            this.state.studyMode
              ? '🎓 教學模式 ON：顯示線索解析與練習題。'
              : '教學模式 OFF：收起解析與練習題，相處數值照常顯示。'
          );
          break;
        }
        case 'open-evidence-modal':
          this.renderEvidenceModal(
            target.dataset.charId,
            target.dataset.itemType || 'criterion',
            target.dataset.itemId
          );
          break;
        case 'ack-achievement':
          this.acknowledgeAchievement();
          break;
        case 'close-modal':
          this.closeModals();
          break;
      }
    });
  }

  closeModals() {
    this.learningModalChar=null;
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) modalRoot.innerHTML = '';
  }

  // 尚未開放的角色不可直接攻略：提示玩家先揭曉目前角色的人格障礙症
  guardRoute(charId) {
    if (!charId || this.isRouteUnlocked(charId)) return true;
    const char = CHARACTERS.find((c) => c.id === charId);
    // 提示對象：優先指向目前主線；若目前主線已揭曉，改指向任一已開放但尚未揭曉的角色
    const curId = this.state.currentStoryChar;
    const hintId =
      curId && this.isRouteUnlocked(curId) && !this.isDiagnosed(curId)
        ? curId
        : (this.state.unlockedRoutes || []).find((id) => !this.isDiagnosed(id));
    const cur = CHARACTERS.find((c) => c.id === hintId);
    audio.playChime(360, 0.08);
    this.showToast(
      `🔒 ${char?.name || '這位房客'}的路線尚未開放。${
        cur ? `先推進 ${cur.name} 的故事至 ${this.getRevealCode(cur.id)} 揭曉教學案例，` : '揭曉任一位角色的教學案例後，'
      }就能解鎖下一位房客！`
    );
    return false;
  }

  // 取得目前應顯示於全頁底下的場景背景 ID（若無特定場景時，預設就是雙層公寓 'apartment'）
  getCurrentBackgroundSceneId() {
    if (!this.state.initialized) {
      return 'apartment';
    }
    if (this.activeScene) {
      if (this.activeScene.locationId) return this.activeScene.locationId;
      const char = CHARACTERS.find((c) => c.id === this.activeScene.charId);
      return char?.locationId || 'apartment';
    }
    if (this.activeMainTab === 'locations' && this.activeLocationId && this.activeLocationId !== 'apartment') {
      return this.activeLocationId;
    }
    return 'apartment';
  }

  renderPageBackgroundLayer() {
    const sceneId = this.getCurrentBackgroundSceneId();
    const bgInfo = getSceneBackground(sceneId);
    const bgUrl = resolveAssetUrl(bgInfo.imagePath);
    return `
      <div class="page-scene-bg-layer" style="background-image: url('${bgUrl}');">
        <div class="page-scene-bg-vignette"></div>
      </div>
    `;
  }

  getRelationshipStatusInfo(char, cs) {
    const status=(label,color='#94a3b8',lineDash='4,4')=>({label,color,lineDash});
    if(cs.relationshipIntent==='distance')return status('🍃 保留距離');
    if(this.getEthicsInfo(char.id).active)return status(cs.affection>=20?'🥀 失衡依戀・倫理爭議':'⚠ 越界爭議・關係緊繃','#fb7185');
    if(cs.eventCompleted>=3&&(cs.security<22||cs.affection<10))return status('🍂 戒備與疏離');
    if(cs.eventCompleted>=3&&cs.boundary<45&&cs.affection>=20)return status('🥀 曖昧失衡・分寸模糊','#c084fc');
    if(cs.relationshipIntent==='friendship'&&cs.security>=22&&cs.boundary>=45&&cs.affection>=20)return status('🌿 完整友情','#34d399','');
    if(cs.relationshipIntent==='romantic'){
      if(cs.characterConsent==='romantic'&&cs.affection>=20&&cs.security>=36&&cs.boundary>=45)return status('💗 雙方願意・嘗試戀愛','#f472b6','');
      return status('🍃 尚未共同同意');
    }
    if(cs.affection>=32&&cs.security>=30&&cs.boundary>=45)return status('💞 曖昧漸生','#f9a8d4','');
    if(cs.affection>=20&&cs.security>=22&&cs.boundary>=45)return status('🤝 逐漸信任','#a7f3d0','');
    if(cs.affection>=14&&cs.security>=14)return status('☕ 熟悉的鄰居','#fbbf24');
    return status('🏠 初識','#fbbf24');
  }

  getTotalAchievementsCount() {
    let unlocked = 0;
    const total = CHARACTERS.length * 2;
    CHARACTERS.forEach((c) => {
      const achs = this.getAchievements(c);
      unlocked += achs.filter((a) => a.unlocked).length;
    });
    return { unlocked, total };
  }

  // ==================== 畫面渲染 ====================
  render() {
    if (!document.getElementById('app-root')) return;
    const scene = this.activeScene;
    const viewKey = !this.state.initialized ? 'creator' : scene
      ? `scene:${scene.mode}:${scene.charId}:${scene.eventNumber || scene.endingKey || ''}`
      : `hub:${this.activeMainTab}`;
    this.viewScrollPositions ||= {};
    if (this.renderedViewKey && this.renderedViewKey !== viewKey) {
      this.viewScrollPositions[this.renderedViewKey] = window.scrollY || 0;
    }
    const changed = this.renderedViewKey !== viewKey;
    this.renderedViewKey = viewKey;
    document.body?.classList.toggle('reference-open', Boolean(this.dsmWidgetOpen));
    this.renderPage();
    const referenceModal = Boolean(this.dsmWidgetOpen && window.matchMedia?.('(max-width: 1199px)').matches);
    document.querySelectorAll?.('.top-navbar, .hub-container, .vn-stage, .game-footer').forEach(element => {
      element.inert = referenceModal;
    });
    const drawer = document.getElementById('dsm-reference-drawer');
    if (referenceModal && drawer) {
      drawer.setAttribute('role', 'dialog');
      drawer.setAttribute('aria-modal', 'true');
      drawer.setAttribute('aria-label', 'DSM-5-TR 準則參照');
    }
    if (changed) {
      const top = viewKey.startsWith('hub:') ? this.viewScrollPositions[viewKey] || 0 : 0;
      window.scrollTo?.({ top, behavior: 'instant' });
    }
  }

  renderPage() {
    const appRoot = document.getElementById('app-root');
    if (!appRoot) return;

    const bgLayer = this.renderPageBackgroundLayer();

    if (this.loadingState?.active) {
      appRoot.innerHTML = `
        ${bgLayer}
        ${this.renderLoadingScreen()}
      `;
      return;
    }

    if (!this.state.initialized) {
      appRoot.innerHTML = `
        ${bgLayer}
        ${this.renderCharacterCreator()}
        ${this.renderFooter()}
      `;
      return;
    }

    if (this.activeScene) {
      appRoot.innerHTML = `
        ${bgLayer}
        ${this.renderTopNavbar()}
        ${this.renderActiveScene()}
        ${this.renderSideDsmCriteriaWidget()}
        ${this.renderFooter()}
      `;
      return;
    }

    appRoot.innerHTML = `
      ${bgLayer}
      ${this.renderTopNavbar()}
      <main class="hub-container">
        ${
          this.activeMainTab === 'relationships'
            ? this.renderRelationshipGraphTab()
            : this.renderLocationExplorer()
        }
      </main>
      ${this.renderSideDsmCriteriaWidget()}
        ${this.renderFooter()}
    `;
  }

  renderLocationIndicator() {
    const bg=getSceneBackground(this.getCurrentBackgroundSceneId());
    return `<span class="current-bg-indicator" aria-label="當前場景">📍 ${escapeHtml(bg.name)}</span>`;
  }

  // 頂部導覽列（手機版支援收合式選單）
  renderTopNavbar() {

    return `
      <header class="top-navbar ${this.mobileNavOpen ? 'nav-open' : ''}">
        <div class="navbar-top-row">
          <div class="brand-group">
            <span class="brand-logo">🌸</span>
            <div>
              <h1 class="brand-title">愛的邊緣 <span class="brand-sub">EDGE OF LOVE</span></h1>
              <p class="brand-meta">
                主角：<strong>${escapeHtml(this.state.player.name)}</strong>（代名詞「${escapeHtml(this.state.player.pronoun)}」）・就讀心諮所的新房客
                ${this.lastSavedTime ? `｜ <span class="saved-indicator">♥ 記憶已自動保存 (${this.lastSavedTime})</span>` : ''}
              </p>
            </div>
          </div>

          <button
            type="button"
            class="mobile-nav-toggle"
            data-action="toggle-mobile-nav"
            aria-expanded="${this.mobileNavOpen ? 'true' : 'false'}"
            aria-label="展開或收合導覽選單"
          >
            <span class="mobile-nav-icon">${this.mobileNavOpen ? '✕' : '☰'}</span>
            <span class="mobile-nav-label">選單</span>
          </button>
        </div>

        <div class="nav-actions ${this.mobileNavOpen ? 'is-open' : ''}">
          <button
            class="nav-btn ${!this.activeScene && this.activeMainTab === 'locations' ? 'btn-accent' : ''}"
            data-action="switch-main-tab"
            data-tab="locations"
          >
            📍 故事推進
          </button>
          <button
            class="nav-btn ${!this.activeScene && this.activeMainTab === 'relationships' ? 'btn-accent' : ''}"
            data-action="switch-main-tab"
            data-tab="relationships"
          >
            💞 人物關係圖
          </button>
          <button
            class="nav-btn ${this.state.studyMode ? 'btn-accent' : ''}"
            data-action="toggle-study-mode"
            aria-pressed="${Boolean(this.state.studyMode)}"
            title="ON：隨劇情顯示解析與練習；OFF：收起教學。兩者都顯示相處數值。"
          >
            🎓 教學模式：${this.state.studyMode ? 'ON' : 'OFF'}
          </button>
          <button class="nav-btn" data-action="open-save-modal">
            💾 記憶存檔
          </button>
          <button class="nav-btn" data-action="toggle-audio" aria-pressed="${audio.enabled}" aria-label="${audio.enabled ? '關閉' : '開啟'}背景音樂與音效" title="背景音樂與音效（低音量）">
            ${audio.enabled ? '🔊 音樂' : '🔇 靜音'}
          </button>

        </div>
      </header>
    `;
  }

  renderLoadingScreen() {
    const ls = this.loadingState || {};
    const snap = ls.snapshot || {
      totalCount: 31,
      loadedCount: 0,
      failedCount: 0,
      loadedBytes: 0,
      percent: 0,
      currentLabel: '正在準備所有人物立繪與場景背景…',
      done: false
    };
    const pending = ls.pendingGame;
    const firstChar = pending?.firstChar;
    const playerName = escapeHtml(pending?.fresh?.player?.name || '林予安');
    const failedAssets = ls.failedAssets || [];
    const hasFailed = failedAssets.length > 0;

    return `
      <section class="creator-screen loading-screen" aria-live="polite">
        <div class="creator-card loading-card">
          <div class="loading-sparkles" aria-hidden="true">
            <span class="loading-spark s1">✦</span>
            <span class="loading-spark s2">✧</span>
            <span class="loading-spark s3">❀</span>
            <span class="loading-spark s4">✦</span>
          </div>

          <div class="creator-header loading-header">
            <span class="creator-badge">✦ 記憶預載中 ✦</span>
            <h1>愛的邊緣 <small style="font-size:1.05rem; font-weight:400; display:block; margin-top:4px;">Edge of Love</small></h1>
            <p>
              ${playerName}，正在為你將全數人物雙層立繪與公寓場景保存至本機記憶，<br/>
              確保稍後翻開故事的每一頁都能即時呈現、無須等待網路下載。
            </p>
          </div>

          ${
            firstChar && pending?.selectionMode === 'manual'
              ? `
                <div class="loading-partner-preview" style="--char-color: ${firstChar.themeColor}">
                  <img
                    class="loading-partner-avatar"
                    src="${resolveAssetUrl(`./assets/characters/${firstChar.id}.png`)}"
                    alt="${escapeHtml(firstChar.name)}"
                  />
                  <div class="loading-partner-meta">
                    <span class="loading-partner-tag">✨ 指定開場對象</span>
                    <strong>即將推開門遇見「${escapeHtml(firstChar.name)}」</strong>
                    <small>共預載 12 位角色常態與情緒立繪 ＋ 7 處公寓場景</small>
                  </div>
                </div>
              `
              : `
                <div class="loading-partner-preview is-mystery">
                  <div class="loading-partner-mystery-icon" aria-hidden="true">🚪</div>
                  <div class="loading-partner-meta">
                    <span class="loading-partner-tag">🎲 命運隨機邂逅</span>
                    <strong>門後的第一位房客正等待與你相遇</strong>
                    <small>共預載 12 位角色常態與情緒立繪 ＋ 7 處公寓場景</small>
                  </div>
                </div>
              `
          }

          <div class="loading-progress-panel">
            <div class="loading-progress-meta">
              <span class="loading-percent" id="loading-percent">${snap.percent}%</span>
              <span class="loading-counts">
                <span id="loading-count">${snap.loadedCount} / ${snap.totalCount} 張圖片</span>
                <span class="loading-dot-sep">‧</span>
                <span id="loading-bytes">${formatBytesMB(snap.loadedBytes)} MB</span>
              </span>
            </div>

            <div class="loading-progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${snap.percent}">
              <div class="loading-progress-fill" id="loading-progress-fill" style="width: ${snap.percent}%;">
                <div class="loading-progress-glint"></div>
              </div>
            </div>

            <div class="loading-current-row">
              <span class="loading-spinner ${snap.done && !hasFailed ? 'is-done' : ''}" aria-hidden="true"></span>
              <span class="loading-current-item" id="loading-current-item">
                ${
                  hasFailed
                    ? `⚠️ 有 ${failedAssets.length} 張圖片下載失敗`
                    : snap.done
                      ? '✨ 所有人物立繪與場景記憶已就緒，正在推開大門…'
                      : `正在下載：${escapeHtml(snap.currentLabel)}`
                }
              </span>
            </div>
          </div>

          ${
            hasFailed
              ? `
                <div class="loading-error-box" id="loading-error-box">
                  <p class="loading-error-title">⚠️ 部分圖檔因網路不穩未能完成下載（${failedAssets.length} 張）</p>
                  <ul class="loading-error-list">
                    ${failedAssets.map((item) => `<li>${escapeHtml(item.label)}</li>`).join('')}
                  </ul>
                  <div class="loading-error-actions">
                    <button type="button" class="btn-primary-large" data-action="retry-preload">
                      🔄 重新下載失敗的圖片（${failedAssets.length} 張）
                    </button>
                    <button type="button" class="nav-btn" data-action="force-enter-game">
                      略過並進入遊戲
                    </button>
                    <button type="button" class="nav-btn" data-action="cancel-loading-to-cover">
                      返回封面
                    </button>
                  </div>
                </div>
              `
              : `
                <p class="loading-atmosphere-tip">
                  「雨聲漸歇，門縫裡漏出一線暖黃的燈光——所有圖檔載入完成後將自動開啟第一頁故事。」
                </p>
              `
          }
        </div>
      </section>
    `;
  }

  renderCharacterCreator() {
    const selectedChar = this.selectedFirstCharId
      ? CHARACTERS.find((c) => c.id === this.selectedFirstCharId)
      : null;

    // 將 12 位角色分為後排（6位站姿沈穩/高挑）與前排（6位近景/活潑），形成富有公寓生活感的立體大合照
    const backRowIds = ['shen_mo', 'han_xiao', 'gu_qingcheng', 'ji_yan', 'wen_yan', 'lin_jianwei'];
    const frontRowIds = ['ruri', 'su_fei', 'xia_le', 'bai_xiaolu', 'lu_qinglan', 'you_ziqian'];

    const renderPillar = (charId) => {
      const c = CHARACTERS.find((item) => item.id === charId);
      if (!c) return '';
      const isSel = this.selectedFirstCharId === c.id;
      return `
        <div
          class="photo-char-pillar ${isSel ? 'is-selected' : ''}"
          data-action="select-first-char"
          data-char-id="${c.id}"
          tabindex="0"
          role="button"
          aria-pressed="${isSel ? 'true' : 'false'}"
          aria-label="${c.name}（${c.occupation}）"
        >
          <div class="photo-char-img-wrapper">
            <img src="${resolveAssetUrl(`./assets/characters/${c.id}.png`)}" alt="${c.name}" class="photo-char-img" loading="eager" />
            <div class="photo-char-lighting"></div>
            ${isSel ? '<span class="photo-selected-badge">✦ 首選</span>' : ''}
          </div>
          <div class="photo-char-namebar">
            <span class="photo-char-name">${c.name}</span>
          </div>
          <div class="photo-char-hover-card">
            <span class="hover-card-sparkle">✦</span>
            <strong class="hover-card-name">${c.name}</strong>
            <span class="hover-card-en">${c.enName}</span>
            <span class="hover-card-role">${c.occupation}</span>
            <span class="hover-card-action">${isSel ? '✦ 已選中為首發故事 ✦' : '點擊選擇由此開啟故事'}</span>
          </div>
        </div>
      `;
    };

    return `
      <section class="creator-screen">
        <div class="creator-card">
          <div class="creator-header">
            <span class="creator-badge">✦ 序章 ✦</span>
            <h1>愛的邊緣 <small style="font-size:1.1rem; font-weight:400; display:block; margin-top:4px;">Edge of Love</small></h1>
            ${this.renderProse(OPENING_NARRATIVE)}
          </div>

          <!-- 公寓全體房客大合照相框 -->
          <div class="apartment-group-photo-frame">
            <div class="photo-frame-top-bar">
              <span class="photo-frame-plaque">🏡 雙層公寓 ‧ 全體房客合影</span>
              <span class="photo-frame-subtitle" id="photo-frame-subtitle">十二扇房門，十二段尚未相識的故事</span>
            </div>

            <div class="photo-stage-container">
              <!-- 背景暖光與氛圍燈串 -->
              <div class="photo-stage-ambient"></div>
              <div class="photo-fairy-lights" aria-hidden="true">
                <span class="fairy-bulb b1"></span>
                <span class="fairy-bulb b2"></span>
                <span class="fairy-bulb b3"></span>
                <span class="fairy-bulb b4"></span>
                <span class="fairy-bulb b5"></span>
                <span class="fairy-bulb b6"></span>
                <span class="fairy-bulb b7"></span>
                <span class="fairy-bulb b8"></span>
                <span class="fairy-bulb b9"></span>
                <span class="fairy-bulb b10"></span>
                <span class="fairy-bulb b11"></span>
                <span class="fairy-bulb b12"></span>
              </div>

              <!-- 12 位房客合影舞台：後排與前排交錯層次 -->
              <div class="photo-ensemble-layout">
                <div class="photo-row photo-row-back">
                  ${backRowIds.map(renderPillar).join('')}
                </div>
                <div class="photo-row photo-row-front">
                  ${frontRowIds.map(renderPillar).join('')}
                </div>
              </div>
            </div>

            <!-- 選擇狀態提示列 -->
            <div class="photo-selection-bar" id="photo-selection-bar">
              <div class="selection-status-text">
                <span class="status-icon">${selectedChar ? '✨' : '🎲'}</span>
                <span class="status-desc" id="selection-status-desc">
                  ${
                    selectedChar
                      ? `已指定故事起點：<strong class="selected-char-highlight">${selectedChar.name}</strong>（${selectedChar.occupation}）`
                      : `目前狀態：<strong>未指定（隨機邂逅）</strong>`
                  }
                </span>
              </div>
              <div class="selection-actions" id="selection-actions">
                ${
                  selectedChar
                    ? `<button type="button" class="btn-clear-selection" data-action="clear-char-selection" title="取消指定，改為隨機選擇">🎲 改為隨機選擇</button>`
                    : ''
                }
              </div>
            </div>
          </div>

          <div class="creator-form">
            <div class="form-row">
              <label for="player-name-input">✦ 你的名字</label>
              <input id="player-name-input" type="text" value="${this.state.player.name}" maxlength="16" placeholder="輸入你的名字" />
            </div>
            <div class="form-row">
              <label for="player-pronoun-input">✦ 別人怎麼稱呼你（人稱代名詞）</label>
              <input id="player-pronoun-input" type="text" value="${this.state.player.pronoun || '她'}" maxlength="6" placeholder="她 / 他 / TA / 祂" />
            </div>
            <button class="btn-primary-large" id="btn-start-game" data-action="start-new-game">
              ${
                selectedChar
                  ? `📖 與「${selectedChar.name}」推開公寓木門，翻開第一頁故事`
                  : `📖 推開公寓木門，翻開第一頁故事（隨機邂逅一位房客）`
              }
            </button>
          </div>
        </div>
      </section>
    `;
  }

  renderNovelAdvanceCard() {
    const total = CHARACTERS.length;
    const met = (this.state.metCharacters || []).length;
    return `
      <div class="novel-advance-card">
        <div>
          <strong>📖 故事還在繼續</strong>
          <p>已認識 ${met} / ${total} 位房客。不必急著選擇誰——在公寓裡走一走，故事自然會找上你。</p>
        </div>
        <button class="btn-primary-large" data-action="advance-novel-story">📖 繼續下一頁故事</button>
      </div>
    `;
  }

  // ==================== 頁籤 1：故事（一次完整走完一個人的故事，不中斷） ====================
  renderLocationExplorer() {
    const status = this.getStoryStatus();
    const metCount = (this.state.metCharacters || []).length;
    const doneCount = CHARACTERS.filter((c) => this.isStoryFinished(c.id)).length;

    if (!status) {
      return `
        <section class="location-panel story-panel">
          <div class="panel-header"><div><h2>📖 故事</h2>${this.renderLocationIndicator()}<p>十二條平行故事已完成。可以選幕重玩、重新表達關係意願，或用新案例檢查理解。</p></div></div><div class="completed-routes-grid">${CHARACTERS.map(c=>`<article class="completed-route-card"><img src="${resolveAssetUrl(`./assets/characters/${c.id}.png`)}" alt="${escapeHtml(c.name)}" /><div><h3>${escapeHtml(c.name)}</h3><small>✓ 全篇已完成</small></div><div class="route-card-actions"><button class="nav-btn" data-action="open-event-tree-modal" data-char-id="${c.id}">選幕重玩</button><button class="nav-btn" data-action="open-learning" data-char-id="${c.id}">學習回顧</button></div></article>`).join('')}</div>
        </section>`;
    }
    const { char, cs, nextEv } = status;
    const partnerChar = nextEv.partnerId ? CHARACTERS.find((c) => c.id === nextEv.partnerId) : null;
    const unlockedCount = (this.state.unlockedRoutes || []).length;

    return `
      <section class="location-panel story-panel">
        <div class="panel-header">
          <div>
            <h2>📖 故事</h2>${this.renderLocationIndicator()}
          </div>
        </div>

        <article class="story-current-card" style="--char-color: ${char.themeColor}">
          <div class="story-current-cast ${partnerChar?'has-partner':''}">${[char,partnerChar].filter(Boolean).map(person=>`<img class="story-current-avatar" src="${resolveAssetUrl(`./assets/characters/${person.id}.png`)}" alt="${escapeHtml(person.name)}" />`).join('')}</div>
          <div class="story-current-body">
            <span class="story-current-tag">🧭 當前專注故事線</span>
            <h3>${char.name} <small style="font-size:0.9rem; font-weight:400; opacity:0.85;">｜ ${char.occupation}</small></h3>
            <p>${char.tagline || ''}</p>${this.renderRelationshipMeters(char)}
            <div class="story-current-actions">
              <button class="btn-primary-large" data-action="continue-story">📖 繼續 ${char.name} 的故事（${nextEv.code}）</button>
              <button class="nav-btn" data-action="story-daily" data-char-id="${char.id}">🌸 日常相處</button>
              <button class="nav-btn" data-action="open-event-tree-modal" data-char-id="${char.id}">📑 選幕與重玩</button>
            </div>
          </div>
        </article>

        <div class="story-roster">
          <h4>已開放故事 ${unlockedCount} / ${CHARACTERS.length} 位・已走完 ${doneCount} 位（點擊已解鎖的房客可隨時切換主線；每完成一位的 E08，就會再開放一位）</h4>
          <div class="story-roster-chips">
            ${CHARACTERS.map((c) => {
              const ccs = this.state.characters[c.id];
              if (!this.isRouteUnlocked(c.id)) {
                return this.isMet(c.id)
                  ? `<button type="button" class="story-chip locked" data-action="select-story-char" data-char-id="${c.id}" title="已在三人同場邂逅，尚未開放故事">🔒 ${c.name}</button>`
                  : `<span class="story-chip locked">🚪 ？？？</span>`;
              }
              const isNew = (ccs.eventCompleted || 0) === 0 && c.id !== char.id;
              const cls = c.id === char.id ? 'current' : this.isStoryFinished(c.id) ? 'done' : isNew ? 'new' : '';
              const mark = this.isStoryFinished(c.id) ? '✓ ' : isNew ? '✨ ' : '';
              return `<button type="button" class="story-chip ${cls}" data-action="select-story-char" data-char-id="${c.id}" style="cursor:pointer;">${mark}${c.name} ${ccs.eventCompleted || 0}/15${isNew ? ' <em class="chip-new">NEW</em>' : ''}</button>`;
            }).join('')}
          </div>
        </div>
      </section>
    `;
  }

  renderRelationshipGraphTab() {
    return `<section class="relationship-graph-panel"><div class="panel-header"><div><h2>💞 公寓人物關係圖</h2><p>連線呈現你與房客目前的關係。下方卡片可查看好感度、安全感、邊界感，以及實際走過的故事與互動；走完一位房客的故事後，可在結局閱讀該角色的完整案例。</p></div></div><div class="rel-web-container">${this.renderRelationshipWebDiagram()}</div>${this.renderCharacterRoster()}</section>`;
  }

  renderRelationshipWebDiagram() {
    const cx = 560;
    const cy = 330;
    const rx = 410;
    const ry = 235;

    const metList = CHARACTERS.filter((c) => this.isMet(c.id));
    const nodes = metList.map((char, idx) => {
      const angle = ((idx * (360 / Math.max(1, metList.length)) - 90) * Math.PI) / 180;
      const x = Math.round(cx + Math.cos(angle) * rx);
      const y = Math.round(cy + Math.sin(angle) * ry);
      const cs = this.state.characters[char.id];
      const diag = this.getDiagnosisDisplay(char);
      const rel = this.getRelationshipStatusInfo(char, cs);
        return { char, cs, diag, rel, x, y };
    });

    return `
      <div class="rel-mobile-list"><div class="rel-mobile-protagonist">🌸 ${escapeHtml(this.state.player.name)}<small>你與房客的關係</small></div>${nodes.map(({char,cs,rel})=>`<button class="rel-mobile-person" data-action="focus-rel-card" data-char-id="${char.id}" style="--node-color:${rel.color}"><img src="${resolveAssetUrl(`./assets/characters/${char.id}.png`)}" alt="" /><span><strong>${escapeHtml(char.name)}</strong><small>${escapeHtml(rel.label)}</small></span><span class="rel-mobile-progress">${cs.eventCompleted}/15 幕 <span aria-hidden="true">›</span></span></button>`).join('')}</div>
      <div class="rel-diagram-box">
        <svg class="rel-network-svg" viewBox="0 0 1120 660" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="centerHubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#f472b6" stop-opacity="0.42" />
              <stop offset="100%" stop-color="#f472b6" stop-opacity="0" />
            </radialGradient>
          </defs>

          <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="rgba(253,230,138,0.22)" stroke-width="1.5" stroke-dasharray="6,6" />
          <ellipse cx="${cx}" cy="${cy}" rx="${Math.round(rx * 0.55)}" ry="${Math.round(ry * 0.55)}" fill="none" stroke="rgba(244,114,182,0.18)" stroke-width="1" />
          <circle cx="${cx}" cy="${cy}" r="120" fill="url(#centerHubGlow)" />

          ${nodes
            .map(({ char, cs, rel, x, y }) => {
              const mx = Math.round((cx + x) / 2);
              const my = Math.round((cy + y) / 2);
              const strokeW = (1.8 + (cs.affection / 100) * 3.2).toFixed(1);
              return `
                <g class="rel-edge-group">
                  <line
                    x1="${cx}"
                    y1="${cy}"
                    x2="${x}"
                    y2="${y}"
                    stroke="${rel.color}"
                    stroke-width="${strokeW}"
                    stroke-dasharray="${rel.lineDash}"
                    opacity="0.78"
                  />
                  <rect x="${mx - 56}" y="${my - 11}" width="112" height="22" rx="11" fill="rgba(26, 12, 38, 0.88)" stroke="${rel.color}" stroke-width="1" />
                  <text x="${mx}" y="${my + 4}" text-anchor="middle" fill="#fce7f3" font-size="10.2" font-weight="600">
                    E${String(cs.eventCompleted).padStart(2, '0')}/15｜${rel.label.slice(0, 6)}
                  </text>
                </g>
              `;
            })
            .join('')}
        </svg>

        <div class="rel-center-protagonist" style="left: 50%; top: 50%;">
          <div class="protag-avatar-ring">🌸</div>
          <strong>${this.state.player.name}</strong>
          <small>就讀心諮所的新房客（${this.state.player.pronoun}）</small>
        </div>

        ${nodes
          .map(({ char, cs, diag, rel, x, y }) => {
            const leftPct = ((x / 1120) * 100).toFixed(2);
            const topPct = ((y / 660) * 100).toFixed(2);
            return `
              <button
                class="rel-char-node ${cs.eventCompleted>=15?'is-complete':''}"
                style="left: ${leftPct}%; top: ${topPct}%; --node-color: ${rel.color}"
                data-action="focus-rel-card"
                data-char-id="${char.id}"
                title="查看 ${char.name} 的關係、故事與互動紀錄"
              >
                <div class="rel-node-avatar-wrap">
                  <img src="${resolveAssetUrl(`./assets/characters/${char.id}.png`)}" alt="${char.name}" />
                  <span class="rel-node-num">#${char.number}</span>
                </div>
                <div class="rel-node-caption">
                  <strong>${char.name}</strong>
                  <span class="rel-node-status" style="color:${rel.color}">${rel.label}</span>
                  <small class="rel-node-diag ${cs.eventCompleted>=15?'unlocked':''}">
                    ${cs.eventCompleted>=15?'完整故事已讀完':`故事 ${cs.eventCompleted}/15`}
                  </small>
                </div>
              </button>
            `;
          })
          .join('')}
      </div>
    `;
  }

  renderCharacterRoster() {
    const metChars = CHARACTERS.filter((c) => this.isMet(c.id));
    const unmetCount = CHARACTERS.length - metChars.length;
    let filteredChars = metChars;
    if (this.selectedFilter === 'DIAGNOSED') {
      filteredChars = metChars.filter((c) => this.isStoryFinished(c.id));
    } else if (this.selectedFilter === 'OBSERVING') {
      filteredChars = metChars.filter((c) => !this.isStoryFinished(c.id));
    }

    const diagnosedCount = metChars.filter((c) => this.isStoryFinished(c.id)).length;
    const observingCount = metChars.length - diagnosedCount;

    return `
      <section class="roster-panel">
        <div class="panel-header roster-header">
          <div>
            <h2>✨ 公寓房客與互動紀錄</h2>
            <p>每張卡片保留人物背景、目前數值與相處日記；完整案例在該角色的故事結束後開啟。</p>
          </div>

          <div class="cluster-filters">
            <button class="filter-btn ${this.selectedFilter === 'ALL' ? 'active' : ''}" data-action="filter-roster" data-filter="ALL">
              已認識房客 (${metChars.length})
            </button>
            <button class="filter-btn ${this.selectedFilter === 'OBSERVING' ? 'active' : ''}" data-action="filter-roster" data-filter="OBSERVING">
              📖 故事進行中 (${observingCount})
            </button>
            <button class="filter-btn ${this.selectedFilter === 'DIAGNOSED' ? 'active' : ''}" data-action="filter-roster" data-filter="DIAGNOSED">
              ✓ 故事已完成 (${diagnosedCount})
            </button>
          </div>
        </div>

        <div class="roster-grid">
          ${
            filteredChars.length > 0
              ? filteredChars.map((char) => this.renderCharacterCard(char)).join('')
              : `<div style="grid-column: 1/-1; text-align:center; padding: 36px; color:#f5d0fe;">目前尚無符合此篩選條件的角色，快去推進事件吧！</div>`
          }
          ${
            this.selectedFilter !== 'DIAGNOSED' && unmetCount > 0
              ? `<div class="locked-door-card"><span aria-hidden="true">🚪</span><strong>還有 ${unmetCount} 位尚未邂逅的房客</strong><small>隨著故事推進，新的相遇會陸續開放。</small></div>`
              : '' 
          }
        </div>
      </section>
    `;
  }

  renderCharacterCard(char) {
    const cs=this.state.characters[char.id],rel=this.getRelationshipStatusInfo(char,cs);
    return `<article class="char-card otome-gacha-card" id="rel-char-card-${char.id}" style="--char-color:${char.themeColor}"><div class="gacha-card-visual">${renderCharacterSVG(char,'neutral','portrait')}</div><div class="char-card-body"><h3>${escapeHtml(char.name)}</h3><p class="character-occupation">${escapeHtml(char.occupation)}</p><p class="character-relationship">${escapeHtml(rel.label)}</p>${this.renderRelationshipMeters(char)}<div class="relationship-records"><section><h4>故事進度</h4><p>已讀 ${cs.eventCompleted} / 15 幕</p></section><section><h4>互動紀錄</h4><p>${cs.diary.length} 段回憶</p></section></div><div class="char-card-actions"><button class="nav-btn btn-accent" data-action="open-event-tree-modal" data-char-id="${char.id}">選幕與重玩</button><button class="nav-btn" data-action="open-learning" data-char-id="${char.id}">學習回顧</button>${cs.eventCompleted>=15?`<button class="nav-btn" data-action="show-ending" data-char-id="${char.id}">結局與角色案例</button>`:''}</div><details class="character-details"><summary>人物介紹與更多操作</summary><p>${escapeHtml(char.shortBio)}</p><p>${escapeHtml(char.genderLabel)}・${escapeHtml(char.orientationLabel)}</p><button class="nav-btn" data-action="start-event" data-char-id="${char.id}" data-event-num="1">重溫初遇</button></details>${this.renderCharacterDiaryDrawer(char,cs,false)}</div></article>`;
  }

  // ==================== 彈窗：15 事件決策樹總覽（隱藏功能，已移除舊版章節阻擋） ====================
  renderEventTreeModal(charId) {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return;

    const char = CHARACTERS.find((c) => c.id === charId) || CHARACTERS[0];
    const cs = this.state.characters[char.id];
    const events = this.getEventsForChar(char.id);

    modalRoot.innerHTML = `
      <div class="modal-backdrop" data-action="close-modal">
        <div class="modal-window">
          <div class="modal-header">
            <div>
              <h2>🌳 #${char.number} ${char.name} — 章節選擇與重玩（進度 ${cs.eventCompleted} / 15）</h2>
              <p>同一展覽的平行故事。重玩會記錄新的選擇；E14 可重新選擇關係。結局比較則只作預覽。</p>
            </div>
            <button type="button" class="btn-close" data-action="close-modal" aria-label="關閉">✕</button>
          </div>

          <div class="modal-body">
            <div class="decision-tree-list">
              ${events
                .map((ev) => {
                  const isDone = cs.eventCompleted >= ev.eventNumber;
                  const isCurrent = cs.eventCompleted + 1 === ev.eventNumber;
                  const locObj = LOCATIONS.find((l) => l.id === ev.locationId);

                  return `
                    <div class="tree-event-row ${isDone ? 'done' : isCurrent ? 'current' : 'locked'}">
                      <div class="tree-ev-left">
                        <span class="tree-ev-code">${ev.code}</span>
                        <div>
                          <strong>${ev.title}</strong>
                          <small>📍 地點：${locObj?.icon || ''} ${escapeHtml(ev.locationName || locObj?.name || '公寓')} ｜ ${ev.phaseName}</small>
                        </div>
                      </div>
                      <div class="tree-ev-right">
                        <button
                          class="btn-action-primary" aria-label="${ev.code} ${isDone?'重溫':'閱讀'}：${escapeHtml(ev.title)}" ${!isDone&&!isCurrent?'disabled':''}
                          data-action="start-event"
                          data-char-id="${char.id}"
                          data-event-num="${ev.eventNumber}"
                        >
                          ${isDone ? '✨ 重溫事件' : isCurrent ? '💖 立即進行' : '🔒 尚未到達'}
                        </button>
                      </div>
                    </div>
                  `;
                })
                .join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ==================== 過往相處日記（預設折疊，點擊展開查看過往互動與已記錄之 DSM 觀察判斷） ====================
  renderCharacterDiaryDrawer(char, cs, isSceneView = true) {
    const diaryEntries = Array.isArray(cs.diary) ? cs.diary : [];
    const drawerClass = isSceneView ? 'vn-diary-drawer' : 'card-diary-dossier';

    return `
      <details class="${drawerClass}">
        <summary>
          <div class="diary-summary-left">
            <span class="diary-icon">📔</span>
            <strong>過往相處日記（與 ${char.name} 的互動＆心靈觀察紀錄）</strong>
          </div>
          <span class="diary-count-pill">
            共 ${diaryEntries.length} 篇紀錄・點擊展開 ▾
          </span>
        </summary>
        <div class="diary-drawer-body">
          ${
            diaryEntries.length === 0
              ? `
                <div class="diary-empty-state">
                  <p>💌 目前尚無與 <strong>${char.name}</strong> 的過往相處日記。</p>
                  <small>當你在劇情橋段中做出選擇或進行日常互動後，雙方的對話反應與「觀察線索與限制」都會自動收錄至此日記中！</small>
                </div>
              `
              : `
                <div class="diary-entries-list">
                  ${diaryEntries
                    .map(
                      (entry, idx) => `
                        <div class="diary-entry-card">
                          <div class="diary-entry-header">
                            <span class="diary-entry-badge">${escapeHtml(entry.code || `#${diaryEntries.length - idx}`)}</span>
                            <strong>${escapeHtml(entry.title)}</strong>
                            ${entry.recordedAt ? `<small class="diary-time">${entry.recordedAt}</small>` : ''}
                          </div>

                          <!-- 1. 情境與對方反應區 -->
                          <div class="diary-story-block">${entry.context?`<details><summary>原始情境與對話</summary><p>${escapeHtml(entry.context)}</p></details>`:''}
                            <p class="diary-choice-line"><strong>💬 你的選擇：</strong>${escapeHtml(entry.choiceText)}</p>
                            <p class="diary-reaction-line"><strong>💖 ${char.name}的反應：</strong>${escapeHtml(entry.reaction)}</p>
                          </div>

                          <!-- 2. 獨立區隔之 DSM 相關判斷與診斷依據 -->
                          ${entry.clinical && (!isSceneView || this.state.studyMode) ? `<details class="diary-dsm-block"><summary>觀察線索與限制</summary><p>${escapeHtml(entry.dsmJudgment||'')}</p>${(entry.criteriaBasis||[]).map(cr=>`<p>${escapeHtml(cr.code)}：${escapeHtml(cr.title)}</p><p>${escapeHtml((entry.evidence?.[cr.id]?.sources||[]).join('、'))}｜${escapeHtml(entry.evidence?.[cr.id]?.basis||'')}</p>`).join('')}</details>` : ''}

                        </div>
                      `
                    )
                    .join('')}
                </div>
              `
          }
        </div>
      </details>
    `;
  }

  // ==================== 視覺小說對話與結局舞台（專注情境與對方反應，選擇後才顯示獨立區隔之 DSM 判斷） ====================
  renderLegacyArchiveModal() {
    const root=document.getElementById('modal-root');if(!root||!this.state.legacyArchive)return;
    const renderArchive=(archive,depth=0)=>{
      if(!archive||depth>12)return '';
      const archived=archive.characters||{};
      return `<section><h3>內容版本 ${escapeHtml(archive.version||'舊版')}</h3>${CHARACTERS.map(c=>`<details><summary>${escapeHtml(c.name)}・舊進度 ${Number(archived[c.id]?.eventCompleted)||0}/15</summary>${(archived[c.id]?.diary||[]).map(d=>`<section class="evidence-log-entry"><h4>${escapeHtml(d.title||'相處紀錄')}</h4><p>${escapeHtml(d.context||'')}</p><p>${escapeHtml(d.choiceText||'')}</p><p>${escapeHtml(d.reaction||'')}</p></section>`).join('')}</details>`).join('')}${archive.previousArchive?`<details><summary>更早版本的封存</summary>${renderArchive(archive.previousArchive,depth+1)}</details>`:''}</section>`;
    };
    root.innerHTML=`<div class="modal-backdrop" data-action="close-modal"><div class="modal-window"><div class="modal-header"><h2>舊版相處紀錄（封存）</h2><button class="btn-close" data-action="close-modal" aria-label="關閉">✕</button></div><div class="modal-body"><p>以下保留舊版回憶，不當作新版教學證據或關係意願。原有存檔也未刪除。</p>${renderArchive(this.state.legacyArchive)}</div></div></div>`;
  }

  renderStudySummary(summary, titleOverride = null, showTitle = true) {
    if (!summary) return '';
    const title=titleOverride || (typeof summary==='object'?summary.title:'觀察與限制');
    const points=Array.isArray(summary)?summary:typeof summary==='object'?summary.points:[summary];
    return `<section class="study-summary-card">${showTitle?`<h3 class="study-summary-title">${escapeHtml(title||'觀察與限制')}</h3>`:''}<ul>${(Array.isArray(points)?points:[]).map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></section>`;
  }

  renderCaseStudy(charId) {
    const r=STORY_ROUTES[charId];
    return `<section class="case-dossier"><p><strong>10 種特定人格障礙，加上 F07.0 人格改變與 F60.89 其他特定人格障礙案例。</strong></p><p>病程、跨情境、功能影響與排除條件必須一起看；角色不需要呈現所有準則。</p>${this.renderStudySummary(r.history,'作者案例設定與評估限制')}<p>${escapeHtml(r.differential)}</p><details class="educational-sources"><summary>教材來源與適用範圍</summary><p>條文為教學參照，非正式中譯本或臨床工具；描述性特徵、鑑別與正式註明類型分開呈現。尚未經專業者或使用者學習成效驗證。</p><ul>${CLINICAL_SOURCES.map(([title,url])=>`<li><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(title)}</a></li>`).join('')}</ul></details></section>`;
  }

  learningTask(charId,taskId){
    for(const stage of [3,8,12,15]){const task=getLearningTasks(charId,stage).find(t=>t.id===taskId);if(task)return {...task,stage};}
    return null;
  }

  canAnswerLearning(charId,task){
    const cs=this.state.characters[charId];if(!cs||!task||!this.isRouteUnlocked(charId))return false;
    if(this.activeScene?.mode==='ending'&&this.activeScene.preview)return false;
    const sc=this.activeScene;
    const justRead=sc?.mode==='event'&&sc.charId===charId&&sc.eventNumber===task.stage&&sc.awaitingNextAfterChoice;
    if(sc?.mode==='ending'&&sc.charId===charId&&sc.preview)return false;
    return cs.eventCompleted>=task.stage||Boolean(justRead);
  }

  answerLearning(charId,taskId,optionId){
    const task=this.learningTask(charId,taskId);if(!this.canAnswerLearning(charId,task))return false;
    const option=task.options.find(x=>x.id===optionId);if(!option)return false;
    const cs=this.state.characters[charId],record=cs.knowledge[taskId]||{attempts:[]};
    if(!Array.isArray(record.attempts))record.attempts=[];
    if(record.attempts.at(-1)?.correct||record.attempts.some(x=>x.optionId===optionId))return false;
    const attempt={optionId,correct:option.correct,at:Date.now()};record.attempts.push(attempt);
    record.firstCorrect=record.attempts[0].correct;record.correct=option.correct;
    cs.knowledge[taskId]=record;this.autoSave();this.render();
    if(this.learningModalChar===charId)this.renderLearningModal(charId);
    return true;
  }

  renderLearningTask(charId,task){
    const record=this.state.characters[charId].knowledge[task.id],last=record?.attempts?.at(-1);
    const allowed=this.canAnswerLearning(charId,task);
    if(!allowed)return `<p>${escapeHtml(task.kind)}：閱讀至 E${String(task.stage).padStart(2,'0')} 後開放。</p>`;
    const seed=Number(CHARACTERS.find(c=>c.id===charId).number)+task.stage,offset=seed%task.options.length;
    const ordered=task.options.slice(offset).concat(task.options.slice(0,offset));
    const feedback=last?`<div role="status" class="learning-feedback"><strong>${last.correct?'推理方向合適':'再看另一種可能'}</strong><p>${escapeHtml(task.options.find(o=>o.id===last.optionId)?.feedback||'')}</p><small>首次作答：${record.firstCorrect?'推理方向合適':'需要補充'}；後續嘗試保留，不計入關係分數。</small></div>`:'';
    return `<section class="learning-prompt"><h3>📓 ${escapeHtml(task.kind)}</h3><p>${escapeHtml(task.prompt)}</p>${feedback}${last?.correct?`<details><summary>比較各選項的理由</summary>${ordered.map(o=>`<p><strong>${escapeHtml(o.text)}</strong><br>${escapeHtml(o.feedback)}</p>`).join('')}</details>`:ordered.map(o=>`<button class="nav-btn learning-option" data-action="answer-learning" data-char-id="${charId}" data-task-id="${task.id}" data-option-id="${o.id}" ${record?.attempts?.some(x=>x.optionId===o.id)?'disabled':''}>${escapeHtml(o.text)}</button>`).join('')}<p class="learning-scope">這裡檢查證據推理，不替角色或現實人物下診斷。可先繼續故事，之後從學習回顧補做。</p></section>`;
  }

  renderLearningPrompt(charId,eventData){
    return getLearningTasks(charId,eventData.eventNumber).map(task=>this.renderLearningTask(charId,{...task,stage:eventData.eventNumber})).join('');
  }

  renderLearningModal(charId){
    const c=CHARACTERS.find(c=>c.id===charId),root=document.getElementById('modal-root');if(!c||!root||!this.isRouteUnlocked(charId))return;
    this.learningModalChar=charId;
    root.innerHTML=`<div class="modal-backdrop" data-action="close-modal"><div class="modal-window learning-modal"><div class="modal-header"><h2>${escapeHtml(c.name)}｜學習回顧</h2><button class="btn-close" data-action="close-modal" aria-label="關閉學習回顧">✕</button></div><div class="modal-body"><p>首次與重試分開保存。完成或答對不代表已驗證學習成效，也不影響相處與結局。</p>${[3,8,12,15].map(stage=>this.renderLearningPrompt(charId,{eventNumber:stage})).join('')}</div></div></div>`;
  }

  renderEvidenceChecklist(char) {
    const cs = this.state.characters[char.id];
    return `<p class="case-evidence-note">劇情線索不等同診斷，也不需要集滿準則。這一輪的行為、本人回顧與同意分享的專業摘要分開記錄；作者背景不會自動成為這一輪證據。</p>
      <div class="dsm-criteria-checklist">${char.criteria.map(cr => {
        const observed = cs.unlockedCriteria.includes(cr.id);
        const uncertain = cs.uncertainCriteria.includes(cr.id);
        const logs = cs.evidenceLog[cr.id] || [];
        const status = uncertain ? '待確認／有其他解釋' : observed ? '這一輪已記錄相關線索' : cr.behavioralAnchor ? '尚未閱讀此線索' : '本案例未直接呈現';
        const state = uncertain ? 'uncertain' : observed ? 'recorded' : 'unrecorded';
        return `<article class="dsm-crit-card ${observed?'unlocked':'locked'} is-${state}">
          <div class="criterion-heading"><strong class="criterion-code">${escapeHtml(cr.code)}</strong><span class="criterion-status">${escapeHtml(status)}</span></div>
          <p class="criterion-description">${escapeHtml(cr.title)}</p>
          ${logs.length ? `<p class="criterion-source">資料來源：${escapeHtml([...new Set(logs.flatMap(x => x.sources || []))].join('、'))}</p><button class="btn-evidence-anchor" data-action="open-evidence-modal" data-char-id="${char.id}" data-item-type="criterion" data-item-id="${cr.id}">查看這一輪的線索與限制</button>` : '<p class="criterion-source">目前沒有這一輪的觀察紀錄，教材預覽不增加證據。</p>'}
        </article>`;
      }).join('')}</div>`;
  }

  renderEndingContinuity(charId,endingKey,preview){
    if(preview)return '<p>以下是另一條路的示例，不套用這一輪選擇，也不改變同意或進度。</p>';
    const cs=this.state.characters[charId],r=STORY_ROUTES[charId];
    const memories=Object.values(cs.memories).map(m=>`<li>${escapeHtml(m.event)}：${escapeHtml(m.choice)}</li>`).join('');
    const tasks=['firstAgreement','repairPlan'].map(task=>{const d=this.getTaskDecision(charId,task);return d?`<p><strong>${escapeHtml(d.label)}</strong>：${escapeHtml(r.checkpoints[task][d.status])}</p>`:'';}).join('');
    return `<details class="ending-continuity"><summary>相處片段與未完的事</summary>${tasks}${memories?`<details><summary>你們實際選擇過的日常</summary><ul>${memories}</ul></details>`:''}<p>你的意願：${{romantic:'想嘗試戀愛',friendship:'希望做朋友',distance:'需要距離'}[cs.relationshipIntent]||'尚未表達'}；對方目前：${{romantic:'願意嘗試約會',friendship:cs.relationshipIntent==='friendship'?'願意做朋友':'暫不交往，保留朋友的可能',distance:'需要暫停私人互動'}[cs.characterConsent]||'未確認'}。</p></details>`;
  }

  getTaskDecision(charId, task, before=15) {
    const entries=Object.entries(this.state.characters[charId].choiceEffects).filter(([key,value])=>Number(key.split('_')[0])<before&&value?.task===task).sort((a,b)=>Number(b[0].split('_')[0])-Number(a[0].split('_')[0]));
    return entries[0]?.[1]||null;
  }

  getCharacterConsent(charId) {
    const cs=this.state.characters[charId];
    const picks=Object.entries(cs.choiceScores).filter(([key])=>Number(key.split('_')[0])<14).map(([,value])=>value);
    const harmful=picks.filter(x=>!x.healthy).length;
    if(harmful>=7||cs.security<22)return 'distance';
    if(harmful>=3||cs.affection<20||cs.security<30||cs.boundary<45||Object.keys(cs.memories).length<2)return 'friendship';
    return 'romantic';
  }

  prepareEvent(charId,number) {
    const ev=JSON.parse(JSON.stringify(this.getEventsForChar(charId).find(e=>e.eventNumber===number)));
    const cs=this.state.characters[charId],r=STORY_ROUTES[charId];
    if(number===14){
      const consent=this.getCharacterConsent(charId);
      if(consent!=='romantic'){
        ev.nodes[1].text=r.slow;
        ev.nodes[1].choices[0].replyCore=r.slow+' 你把原本想說的話留在唇邊，點了點頭。今天不開始戀愛；失落還在，你沒有急著把它藏好。';
        ev.nodes[1].choices[3].replyCore=r.slow+' 這串承諾沒有改變對方的答案。今天不開始戀愛，也不先替以後的見面作保證。';
        if(consent==='distance')ev.nodes[1].choices[1].replyCore='對方把最後一件交接物推回桌面，沒有接下私下見面的邀請。你點頭收起東西。朋友的稱呼，今天還沒落在你們之間。';
      }
    }
    const stalled=number===13&&['firstAgreement','repairPlan'].some(task=>['takenOver','ruptured'].includes(this.getTaskDecision(charId,task,number)?.status));
    if(stalled){
      // Keep the actual daily question and its matching result; unfinished work is separate.
      for(const choice of ev.nodes[1].choices)choice.memory=null;
      ev.unfinishedWork=true;
    }
    if(number===13||number===14)ev.nodes[1].choices=ev.nodes[1].choices.map((choice,index)=>expandChoiceReply(charId,number,choice,index,null,stalled));
    return ev;
  }

  getContinuityText(charId,eventNumber) {
    const r=STORY_ROUTES[charId],lines=[];
    const task=eventNumber===6?'firstAgreement':eventNumber===11?'repairPlan':null;
    if(task){const d=this.getTaskDecision(charId,task,eventNumber);if(d)lines.push(`${r.checkpoints[task][d.status]}`);}
    if(eventNumber===13){for(const name of ['firstAgreement','repairPlan']){const d=this.getTaskDecision(charId,name,eventNumber);if(d)lines.push(name==='repairPlan'&&charId==='you_ziqian'&&this.state.characters[charId].eventCompleted>=12?[r.letterAfterReply,['takenOver','ruptured'].includes(d.status)?r.checkpoints[name][d.status]:null].filter(Boolean).join(' '):`${r.checkpoints[name][d.status]}`);}}
    if([6,11,13].includes(eventNumber)&&this.getEthicsInfo(charId).active)lines.push(r.ethicsContext);
    return lines.join('\n\n');
  }

  renderFooter() {
    return `<footer class="game-footer" aria-label="遊戲備註與提示"><p><strong>💡 溫馨備註</strong>　本作透過虛構故事認識人格障礙症，希望帶來理解，避免標籤與污名。主角是具有心理學背景的公寓新房客；相處與協助不取代評估、治療。在真實的專業實務中，不應利用治療或評估關係發展戀愛。</p>${this.state.legacyArchive?'<p>舊版相處紀錄已封存。<button class="nav-btn" data-action="view-legacy-archive">閱讀舊版紀錄</button></p>':''}</footer>`;
  }

  renderProse(value, narrative = true) {
    const paragraphs = this.formatText(value || '').split(/\n\s*\n/).filter(Boolean);
    return `<div class="dialogue-text ${narrative ? 'narrative-text' : 'spoken-text'}">${paragraphs.map(p => `<p>${escapeHtml(p).replaceAll('\n','<br>')}</p>`).join('')}</div>`;
  }

  renderInteractionAnalysis(char, event, node, outcome) {
    const choice=node.choices?.find(c=>this.formatText(c.text)===outcome.choiceText);
    const status=choice?.decision?.status;
    const consequence=status?{committed:'你們說好要做什麼。是否做完，得看後續。',deferred:'你把時間或能幫的部分說清楚，其他事還沒答應。',takenOver:'你說得很甜，卻也接下沒談好的決定或責任，對方不一定願意。',ruptured:'這句冷淡的話讓對方不想再談。必要工作還是得交代。'}[status]:choice?.relationshipIntent?'這裡記錄的是你表達的關係方向；對方有自己的答案，原本的分數不替任何人承諾。':choice?.healthy?'這次回應保留了可以討論的範圍，先看對方實際如何接話，而不把一次順利當成整體改變。':'本次反應已顯示這種回覆的代價；承諾、批評或代替他人決定，需要和當事人的需要分開看。';
    const core=outcome.replyCore||choice?.replyCore||outcome.reply.split('\n\n')[0];
    const reactionFocus=status?consequence:choice?.relationshipIntent?'這是本次表達方向後的實際回覆，不能由親近分數替代；之後的接觸仍需再次詢問。':event.type==='caseStudy'?'這次資料分享只涵蓋本人同意的內容，不能補成尚未親見的經驗，也不讓閱讀本身成為診斷。':(outcome.criteriaBasis?.length?'回覆中已發生的動作與安排可以記錄，仍不能單憑一次順利或不順利，證明長期模式已改變或診斷成立。':'這裡呈現的是一次具體互動，沒有新增診斷準則。共同完成什麼、還有什麼未答應，需照當下反應分開留下。');
    const bases=outcome.criteriaBasis||[];
    return `<details class="outcome-dsm-judgment-panel interaction-analysis-panel"><summary>📓 本節互動解析</summary><section><h4>對方說了什麼</h4><blockquote>${escapeHtml(this.formatText(node.text))}</blockquote><p>${escapeHtml(event.studySummary?.points?.[0]||'先把這次互動的具體需要與一般喜好分開看。')}</p></section><section><h4>你這樣回答之後</h4><blockquote>${escapeHtml(outcome.choiceText)}</blockquote><p>${escapeHtml(choice?.interactionAnalysis||(outcome.psychNote===event.studySummary?.points?.[0]?consequence:outcome.psychNote)||consequence)}</p></section><section><h4>對方怎麼回應</h4><blockquote>${escapeHtml(core)}</blockquote><p>${escapeHtml(reactionFocus)}</p></section>${bases.length?`<section><h4>本節的學習線索</h4>${bases.map(cr=>{const evidence=event.evidence?.[cr.id];return `<p><strong>${escapeHtml(cr.code)}｜${escapeHtml(cr.title)}</strong></p><p>${escapeHtml(evidence?.basis||cr.behavioralAnchor?.behavior||'')}</p><p>資料來源：${escapeHtml((evidence?.sources||[]).join('、'))}。${escapeHtml(evidence?.limitation||'仍須結合其他情境與病程。')}</p><button class="btn-evidence-anchor" data-action="open-evidence-modal" data-char-id="${char.id}" data-item-type="criterion" data-item-id="${cr.id}">查看本節紀錄</button>`;}).join('')}</section>`:''}</details>`;
  }

  renderCompletedCaseDossier(char) {
    const cs = this.state.characters[char.id], r = STORY_ROUTES[char.id];
    if (cs.eventCompleted < 15) return '';
    return `<details class="ending-clinical-box completed-case-dossier">
      <summary>角色案例解析</summary>
      <div class="case-dossier-content">
        <header class="case-dossier-header"><span class="case-eyebrow">角色故事已完成</span><h3>${escapeHtml(char.name)}</h3><p class="case-diagnosis">${escapeHtml(char.dsmTitle)} <span>${escapeHtml(char.dsmCode)}</span></p><p>以下分開呈現本人的說法、作者案例設定，以及你在這一輪讀到的線索。</p></header>
        <section class="case-section case-self-understanding"><div class="case-section-heading"><span aria-hidden="true">01</span><h4>本人分享的自我理解</h4></div><p>${escapeHtml(r.memory)}</p></section>
        <section class="case-section case-background"><div class="case-section-heading"><span aria-hidden="true">02</span><h4>作者案例背景</h4></div>${this.renderStudySummary(r.history,'案例背景',false)}<div class="case-other-explanations"><h5>其他解釋與評估限制</h5><p>${escapeHtml(r.differential)}</p></div></section>
        <details class="case-section case-evidence"><summary><span class="case-section-heading"><span aria-hidden="true">03</span><strong>本角色的準則與故事證據</strong></span><small>展開查看這一輪紀錄</small></summary><div class="case-evidence-content">${this.renderEvidenceChecklist(char)}${char.specifiers.length?`<section class="case-specifiers"><h5>補充說明</h5>${char.specifiers.map(sp=>`<p><strong>${escapeHtml(sp.title)}</strong>：${escapeHtml(sp.desc)}</p>`).join('')}</section>`:''}</div></details>
        <section class="case-resources"><div class="case-section-heading"><span aria-hidden="true">04</span><h4>延伸閱讀與相處回顧</h4></div><details class="educational-sources"><summary>教材來源</summary><ul>${CLINICAL_SOURCES.map(([title,url])=>`<li><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(title)}</a></li>`).join('')}</ul></details>${this.renderEndingContinuity(char.id,cs.endingKey,false)}<details class="ending-practice"><summary>延伸練習：新的情境</summary>${this.renderLearningPrompt(char.id,{eventNumber:15})}</details></section>
      </div>
    </details>`;
  }

  renderScenePortraits(char, scene) {
    const partnerId=scene.eventData?.partnerId || scene.partnerId;
    const partner=CHARACTERS.find(c=>c.id===partnerId&&c.id!==char.id);
    const cast=[char,partner].filter(Boolean);
    return `<div class="vn-cast-portraits ${partner?'is-ensemble':''}" aria-label="本幕在場角色">${cast.map(person=>`<div class="vn-portrait-frame" data-cast-char-id="${person.id}" aria-label="${escapeHtml(person.name)}">${renderCharacterSVG(person,person.id===char.id?scene.expression:'neutral','portrait')}</div>`).join('')}</div>`;
  }

  renderActiveScene() {
    const sc=this.activeScene,char=CHARACTERS.find(c=>c.id===sc.charId),cs=this.state.characters[sc.charId];
    const route=this.getRouteType(char),diag=this.getDiagnosisDisplay(char);
    if(sc.mode==='ending')return this.renderEndingScene(char,cs,route,diag);
    if(sc.mode==='daily')return this.renderDailyScene(char,cs,route,diag);
    const ev=sc.eventData,node=ev.nodes[sc.nodeIndex],out=sc.lastChoiceOutcome;
    const text=this.renderProse(node.text,node.speaker==='narrator');
    return `<section class="vn-stage" style="--char-color:${char.themeColor}"><div class="vn-top-bar"><div class="vn-loc-info"><span class="vn-chap-badge">${ev.code} / E15</span><strong>${escapeHtml(ev.title.replace(/^E\d+\s*[｜|]\s*/,''))}</strong><small>${escapeHtml(ev.locationName||'')}・${escapeHtml(ev.ambience)}</small></div>${this.renderRelationshipMeters(char)}</div><div class="vn-main-grid ${ev.partnerId?'ensemble-scene':''}"><div class="vn-portrait-column">${this.renderScenePortraits(char,sc)}</div><div class="vn-dialogue-column"><div class="vn-dialogue-box"><div class="speaker-banner"><strong>${node.speaker==='char'?escapeHtml(char.name):node.speaker==='ensemble'?'同場對話':'旁白'}</strong><span>STEP ${sc.nodeIndex+1} / ${ev.nodes.length}</span></div>${text}${ev.continuityText?`<details class="scene-continuity"><summary>先前的安排</summary>${this.renderProse(ev.continuityText)}</details>`:''}${sc.awaitingNextAfterChoice&&out?`<div class="choice-outcome-box"><p>你的回應：${escapeHtml(out.choiceText)}</p>${this.renderProse(out.reply)}${this.formatStatDeltas(out.stats)}</div>${this.state.studyMode?this.renderInteractionAnalysis(char,ev,node,out):''}${this.state.studyMode?this.renderLearningPrompt(char.id,ev):''}<button class="btn-vn-continue" data-action="next-node">繼續下一段劇情 ▶</button>`:node.choices?.length?`<div class="vn-choices-list">${this.getChoiceOrder(node).map((index,pos)=>`<button class="vn-choice-btn" data-action="select-choice" data-choice-index="${index}"><span class="choice-idx">${String.fromCharCode(65+pos)}</span><span class="choice-text">${escapeHtml(this.formatText(node.choices[index].text))}</span></button>`).join('')}</div>`:'<button class="btn-vn-continue" data-action="next-node">下一段對話 ▶</button>'}</div>${this.renderCharacterDiaryDrawer(char,cs,true)}</div></div></section>`;
  }

  renderDailyScene(char, cs, route, diag) {
    const { talk, picked, expression } = this.activeScene;
    const text = value => escapeHtml(this.formatText(value || ''));
    return `<section class="vn-stage" style="--char-color:${char.themeColor}">
      <div class="vn-top-bar"><strong>日常時光・${text(talk.title)}</strong><button class="nav-btn" data-action="exit-scene">↩ 返回</button>${this.renderRelationshipMeters(char)}</div>
      <div class="vn-main-grid"><div class="vn-portrait-column"><div class="vn-portrait-frame">${renderCharacterSVG(char,expression || 'smile','portrait')}</div></div>
      <div class="vn-dialogue-column"><div class="vn-dialogue-box"><div class="speaker-banner">${text(char.name)}・日常時光</div>${this.renderProse(talk.prompt)}${talk.response?this.renderProse(talk.response,false):''}${picked?`<div class="choice-outcome-box"><p>你：${text(picked.text)}</p>${this.renderProse(picked.reply)}${this.formatStatDeltas(picked.stats)}</div>`:''}
      ${picked?'<button class="btn-vn-continue" data-action="next-node">完成日常互動 ▶</button>':`<div class="vn-choices-list">${this.getChoiceOrder(talk).map(index=>`<button class="vn-choice-btn" data-action="daily-choice" data-choice-index="${index}">${text(talk.choices[index].text)}</button>`).join('')}</div>`}</div>${this.renderCharacterDiaryDrawer(char,cs,true)}</div></div></section>`;
  }

  renderEndingScene(char, cs, route, diag) {
    const {endingKey,endingData,preview}=this.activeScene;
    let text=preview?endingData.romanticText:(cs.relationshipIntent==='romantic'&&endingKey==='trueEnd'?endingData.romanticText:endingData.soulmateText);

    const earned=cs.endingKey||'normalEnd';
    return `<section class="vn-stage ending-stage" style="--char-color:${char.themeColor}"><div class="vn-top-bar"><strong>${preview?'其他結局預覽（不代表這一輪結果）':'E15｜這一輪的故事結局'}・${escapeHtml(char.name)}</strong><small>${escapeHtml(this.activeScene.locationName||'展覽之後')}</small>${this.renderRelationshipMeters(char)}</div><div class="vn-main-grid"><div class="vn-portrait-column"><div class="vn-portrait-frame">${renderCharacterSVG(char,this.activeScene.expression,'portrait')}</div></div><div class="vn-dialogue-column"><div class="vn-dialogue-box ending-card"><h2>${escapeHtml(endingData.title)}</h2><p>${escapeHtml(endingData.subtitle)}</p>${this.renderProse(text)}${!preview&&this.getEthicsInfo(char.id).active?`<details class="ending-ethics"><summary>還沒處理完的爭議</summary>${this.renderProse(STORY_ROUTES[char.id].ethicsEnding)}</details>`:''}${preview?'':this.renderCompletedCaseDossier(char)}<details class="ending-switcher"><summary>比較其他結局（僅預覽，不改變這一輪選擇）</summary>${Object.entries(ALL_SCENARIOS[char.id].endings).map(([key,end])=>`<button class="nav-btn" data-action="show-ending" data-char-id="${char.id}" data-ending-key="${key}">${escapeHtml(end.title)}</button>`).join('')}</details>${preview?`<button class="nav-btn" data-action="show-ending" data-char-id="${char.id}">回到這一輪的結局：${escapeHtml(ALL_SCENARIOS[char.id].endings[earned].title)}</button>`:''}<button class="btn-vn-continue" data-action="exit-scene">返回公寓繼續邂逅其他角色 ▶</button></div>${this.renderCharacterDiaryDrawer(char,cs,true)}</div></div></section>`;
  }

  // ==================== 側邊懸浮小工具：隨時叫出 DSM-5-TR 人格障礙症診斷準則手冊 ====================
  getDsmReferenceOptions() {
    return Object.entries(DSM_REFERENCE).filter(([code])=>code!=='GENERAL').map(([code,ref])=>({code,...ref}));
  }

  selectDsmReference(code) {
    if(!this.getDsmReferenceOptions().some(ref=>ref.code===code))return false;
    this.selectedDsmRefCode=code;
    audio.playChime(540,0.05);
    this.render();
    document.querySelector?.('.dsm-reference-picker summary')?.focus({preventScroll:true});
    return true;
  }

  renderDsmReferenceTab() {
    const options=this.getDsmReferenceOptions();
    const selected=options.find(ref=>ref.code===this.selectedDsmRefCode);
    const list=items=>`<ul class="dsm-ref-list">${items.map(item=>`<li>${escapeHtml(item).replaceAll('\n','<br>')}</li>`).join('')}</ul>`;
    return `<details class="dsm-reference-picker" ${!selected ? 'open' : ''}><summary>${selected ? `切換準則：${escapeHtml(selected.title)}` : '選擇要閱讀的準則'}</summary><div class="dsm-ref-chips" role="group" aria-label="選擇診斷">${options.map(ref=>`<button class="dsm-ref-chip ${selected?.code===ref.code?'active':''}" data-action="select-dsm-reference" data-code="${ref.code}" aria-pressed="${selected?.code===ref.code}"><strong>${escapeHtml(ref.code)}</strong><span>${escapeHtml(ref.title)}</span></button>`).join('')}</div></details><div class="dsm-reference-content">${selected?`<section class="dsm-ref-block" data-reference-code="${selected.code}" role="region" aria-labelledby="selected-reference-title"><h4 id="selected-reference-title">${escapeHtml(selected.title)} <small>${escapeHtml(selected.code)}</small></h4><p class="dsm-ref-en">${escapeHtml(selected.en)}</p><p>${escapeHtml(selected.intro)}</p><p class="dsm-ref-lead"><strong>${escapeHtml(selected.lead)}</strong></p>${list(selected.criteria)}${selected.extraCriteria?.length?list(selected.extraCriteria):''}${selected.subtypes?.length?`<p class="dsm-ref-lead"><strong>${escapeHtml(selected.subtypesLead||'註明是否有：')}</strong></p>${list(selected.subtypes)}`:''}${selected.note?`<p class="dsm-ref-note">${escapeHtml(selected.note)}</p>`:''}</section>`:'<p class="reference-empty">請先選擇上方準則，這裡會顯示完整內容。</p>'}<p class="dsm-ref-disclaimer">準則為遊戲學習參照，非正式中譯本或臨床診斷工具。</p></div>`;
  }

  renderSideDsmCriteriaWidget() {
    return `<aside class="dsm-side-widget-container ${this.dsmWidgetOpen?'is-open':''}"><button class="dsm-side-launcher-tab" data-action="toggle-dsm-widget" aria-label="${this.dsmWidgetOpen?'關閉':'開啟'}準則參照" aria-controls="dsm-reference-drawer" aria-expanded="${this.dsmWidgetOpen}"><span class="launcher-icon">📖</span><span class="launcher-text">準則參照</span></button><div id="dsm-reference-drawer" class="dsm-side-drawer" ${this.dsmWidgetOpen?'':'hidden'}><div class="dsm-drawer-header"><h3>📖 DSM-5-TR 準則參照</h3><button class="btn-close" data-action="toggle-dsm-widget" aria-label="收合準則參照">✕</button></div><div class="dsm-drawer-body">${this.renderDsmReferenceTab()}</div></div></aside>`;
  }

  renderSaveModal() {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return;

    const slots = [1, 2, 3].map((num) => {
      const raw =
        localStorage.getItem(`edge_of_love_slot_${num}`) ||
        sessionStorage.getItem(`edge_of_love_slot_${num}`);
      let info = null;
      if (raw) {
        try {
          info = JSON.parse(raw);
        } catch (_) {
          info = null;
        }
      }
      return { num, info };
    });

    modalRoot.innerHTML = `
      <div class="modal-backdrop" data-action="close-modal">
        <div class="modal-window modal-small">
          <div class="modal-header">
            <div>
              <h2>💾 戀愛記憶存檔與讀檔</h2>
              <p>進度會自動儲存在此瀏覽器，下次開啟即可接續。</p>
            </div>
            <button type="button" class="btn-close" data-action="close-modal" aria-label="關閉">✕</button>
          </div>

          <div class="modal-body save-slots-list">
            ${this.state.legacyArchive?'<button class="nav-btn" data-action="view-legacy-archive">閱讀舊版相處紀錄</button>':''}
            <div class="save-slot-card" style="border-color:#f472b6;">
              <div>
                <strong style="color:#f9a8d4;">⚡ 自動儲存</strong>
                <p>主角：${this.state.player.name}｜已走完 ${CHARACTERS.filter(c=>this.isStoryFinished(c.id)).length} / 12 位角色故事</p>
                <small>狀態：已同步於瀏覽器，關閉分頁或下次開啟時將自動載入</small>
              </div>
            </div>

            ${slots
              .map(({ num, info }) => {
                const st = info?.state;
                return `
                  <div class="save-slot-card">
                    <div>
                      <strong>手動記憶槽位 #${num}</strong>
                      ${
                        st
                          ? `<p>主角：${st.player.name}</p>
                             <small>儲存時間：${info.savedAt}</small>`
                          : `<p style="color:#cbd5e1;">— 空白槽位 —</p>`
                      }
                    </div>
                    <div class="save-slot-btns">
                      <button type="button" class="btn-action-primary" data-action="save-slot" data-slot="${num}">儲存至此槽</button>
                      ${
                        st
                          ? `<button type="button" class="btn-action-secondary" data-action="load-slot" data-slot="${num}">讀取</button>`
                          : ''
                      }
                    </div>
                  </div>
                `;
              })
              .join('')}

            <div class="save-danger-zone"><p>重新開始</p><button type="button" class="nav-btn" data-action="restart-game">重新建立角色（保留手動存檔）</button>
              <button type="button" class="nav-btn btn-restart" data-action="clear-all-saves">
                🗑️ 清除所有存檔並重新開始
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getEmotionLabel(expr) {
    const map = {
      neutral: '平靜凝視 (Calm Gaze)',
      smile: '溫柔心動 (Affectionate)',
      vulnerable: '脆弱動搖 (Vulnerable)',
      anxious: '不安警戒 (Guarded)',
      triggered: '情緒激盪 (Intense)'
    };
    return map[expr] || map.neutral;
  }

  renderECGSVG(expression) {
    let pathData = 'M 0 25 L 40 25 L 50 10 L 60 40 L 70 25 L 140 25 L 150 8 L 160 42 L 170 25 L 240 25';
    let strokeColor = '#f472b6';
    if (expression === 'triggered') {
      strokeColor = '#fb7185';
      pathData = 'M 0 25 L 15 5 L 28 45 L 42 8 L 55 44 L 70 12 L 85 40 L 100 6 L 118 44 L 135 10 L 155 42 L 175 8 L 195 44 L 215 15 L 240 25';
    } else if (expression === 'anxious') {
      strokeColor = '#fbbf24';
      pathData = 'M 0 25 L 25 25 L 33 8 L 41 42 L 49 25 L 85 25 L 93 8 L 101 42 L 109 25 L 150 25 L 158 8 L 166 42 L 174 25 L 240 25';
    }
    return `
      <svg class="ecg-svg" viewBox="0 0 240 50" preserveAspectRatio="none">
        <path class="ecg-line" d="${pathData}" fill="none" stroke="${strokeColor}" stroke-width="2.2" />
      </svg>
    `;
  }

  formatStatDeltas(stats = {}) {
    const items = [];
    if (stats.affection) {
      const s = stats.affection > 0 ? `+${stats.affection}` : stats.affection;
      items.push(`<span class="delta-badge ${stats.affection > 0 ? 'pos' : 'neg'}">💗 好感度 ${s}</span>`);
    }
    if (stats.security) {
      const s = stats.security > 0 ? `+${stats.security}` : stats.security;
      items.push(`<span class="delta-badge ${stats.security > 0 ? 'pos' : 'neg'}">🛡️ 安全感 ${s}</span>`);
    }
    if (stats.boundary) {
      const s = stats.boundary > 0 ? `+${stats.boundary}` : stats.boundary;
      items.push(`<span class="delta-badge ${stats.boundary > 0 ? 'pos' : 'neg'}">🧭 邊界感 ${s}</span>`);
    }
    return items.length?`<div class="choice-stat-deltas" aria-label="本次相處數值變化">${items.join('')}</div>`:'';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const game = new EdgeOfLoveGame();
  game.init();
});
