// 《愛的邊緣》(Edge of Love) 2.0 — 15 事件決策樹、跨地點動態出沒、三人同場、12 角色專屬天災危機、角色雙層背景與心靈成就控制器

import { LOCATIONS, CLUSTERS, CHARACTERS } from './data/characters.js?v=15';
import { DSM_REFERENCE } from './data/dsmReference.js?v=15';
import { SCENARIOS_CLUSTER_A } from './data/scenarios_cluster_a.js?v=15';
import { SCENARIOS_CLUSTER_B } from './data/scenarios_cluster_b.js?v=15';
import { SCENARIOS_CLUSTER_C_OTHER } from './data/scenarios_cluster_c_other.js?v=15';
import {
  CHARACTER_EXTENDED_LORE,
  TRIO_SCENES_DATA,
  UNIQUE_DISASTER_EVENTS,
  EXTRA_DAILY_TALKS,
  getCharacter15Events,
  getCharacterAchievements
} from './data/eventTreeEngine.js?v=15';
import {
  CHARACTER_PROMPTS,
  getSceneBackground
} from './data/characterPrompts.js?v=15';
import { renderCharacterSVG } from './ui/avatarRenderer.js?v=15';
import { audio } from './ui/audioEngine.js?v=15';

const ALL_SCENARIOS = {
  ...SCENARIOS_CLUSTER_A,
  ...SCENARIOS_CLUSTER_B,
  ...SCENARIOS_CLUSTER_C_OTHER
};

const STORAGE_KEY_AUTOSAVE = 'edge_of_love_browser_save_v4';
const STORAGE_KEY_SESSION = 'edge_of_love_session_save_v4';

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
    this.dsmWidgetCharId = null;
    this.dsmWidgetTab = 'criteria'; // 'criteria' (12角色與準則核對) | 'general' (DSM-5-TR 通則與四大類群)
    this.mobileNavOpen = false;
    this.sessionStartTime = Date.now();
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
        diagnosed: false,
        sharedQuakeDone: false,
        sharedTyphoonDone: false,
        backstoryUnlocked: false,
        unlockedEndings: [],
        dailyTalkIndex: 0,
        diary: []
      };
    });

    return {
      initialized: false,
      player: {
        name: '林予安',
        sex: 'female',
        sexLabel: '生理女性／女性認同 (Female)',
        pronoun: '她',
        trait: 'balanced'
      },
      roamCycle: 0,
      metCharacters: [],
      currentStoryChar: null,
      storyStack: [],
      characters: charState
    };
  }

  init() {
    const savedRaw =
      localStorage.getItem(STORAGE_KEY_AUTOSAVE) ||
      sessionStorage.getItem(STORAGE_KEY_SESSION) ||
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
      if (document.visibilityState === 'hidden') {
        this.trackRetention('hidden');
      }
    });

    trackGA('game_visit', {
      has_save: Boolean(this.state.initialized)
    });

    this.bindGlobalEvents();
    this.render();
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
    if (!scene || typeof scene !== 'object') return null;
    const char = CHARACTERS.find((c) => c.id === scene.charId);
    if (!char) return null;

    if (scene.mode === 'event') {
      const events = this.getEventsForChar(scene.charId);
      const evNum = Number(scene.eventNumber) || 1;
      if (evNum >= 15) return null;
      const freshEv = events.find((e) => e.eventNumber === evNum) || events[0];
      if (!freshEv || !Array.isArray(freshEv.nodes) || freshEv.nodes.length === 0) return null;
      const safeIdx = Math.max(0, Math.min(Number(scene.nodeIndex) || 0, freshEv.nodes.length - 1));
      const curNode = freshEv.nodes[safeIdx];
      return {
        ...scene,
        eventNumber: freshEv.eventNumber,
        eventData: freshEv,
        partnerId: freshEv.partnerId || null,
        locationId: freshEv.locationId || char.locationId,
        nodeIndex: safeIdx,
        expression: scene.expression || curNode?.expression || 'neutral',
        awaitingNextAfterChoice: Boolean(scene.awaitingNextAfterChoice && scene.lastChoiceOutcome),
        lastChoiceOutcome: scene.awaitingNextAfterChoice ? scene.lastChoiceOutcome : null
      };
    }

    if (scene.mode === 'daily') {
      if (!scene.talk || !Array.isArray(scene.talk.choices) || scene.talk.choices.length === 0) {
        return null;
      }
      return scene;
    }

    if (scene.mode === 'ending') {
      const scenario = ALL_SCENARIOS[scene.charId];
      const endingKey = scene.endingKey || 'normalEnd';
      const freshEndingData = scenario?.endings?.[endingKey] || scene.endingData;
      if (!freshEndingData) return null;
      return {
        ...scene,
        endingKey,
        endingData: freshEndingData,
        endingMode: scene.endingMode || 'romantic'
      };
    }

    return null;
  }

  migrateState(loadedState) {
    const def = this.getDefaultState();
    if (!loadedState.player || typeof loadedState.player !== 'object') {
      loadedState.player = def.player;
    } else {
      loadedState.player.name = loadedState.player.name || def.player.name;
      loadedState.player.pronoun = loadedState.player.pronoun || def.player.pronoun;
    }
    if (typeof loadedState.roamCycle !== 'number') loadedState.roamCycle = 0;
    loadedState.storyStack = [];
    if (
      typeof loadedState.currentStoryChar !== 'string' ||
      !CHARACTERS.some((c) => c.id === loadedState.currentStoryChar)
    ) {
      loadedState.currentStoryChar = null;
    }
    if (!Array.isArray(loadedState.metCharacters)) {
      loadedState.metCharacters = CHARACTERS.map((c) => c.id);
    } else {
      loadedState.metCharacters = loadedState.metCharacters.filter((id) =>
        CHARACTERS.some((c) => c.id === id)
      );
    }
    if (loadedState.currentStoryChar && !loadedState.metCharacters.includes(loadedState.currentStoryChar)) {
      loadedState.metCharacters.push(loadedState.currentStoryChar);
    }
    if (loadedState.metCharacters.length === 0) {
      const firstId = loadedState.currentStoryChar || CHARACTERS[0].id;
      loadedState.metCharacters = [firstId];
      loadedState.currentStoryChar = firstId;
    }

    CHARACTERS.forEach((c) => {
      if (!loadedState.characters[c.id]) {
        loadedState.characters[c.id] = def.characters[c.id];
      } else {
        const cs = loadedState.characters[c.id];
        if (!Array.isArray(cs.unlockedCriteria)) cs.unlockedCriteria = [];
        if (!Array.isArray(cs.unlockedEndings)) cs.unlockedEndings = [];
        if (typeof cs.dailyTalkIndex !== 'number') cs.dailyTalkIndex = 0;
        if (typeof cs.eventCompleted !== 'number') {
          cs.eventCompleted = (cs.chapterCompleted || 0) * 4;
        }
        if (typeof cs.diagnosed !== 'boolean') {
          cs.diagnosed = cs.unlockedCriteria.length >= c.criteria.length && cs.eventCompleted >= 12;
        }
        if (typeof cs.backstoryUnlocked !== 'boolean') {
          cs.backstoryUnlocked = cs.eventCompleted >= 13;
        }
        if (!Array.isArray(cs.diary)) {
          cs.diary = [];
        }
      }
    });
    return loadedState;
  }

  autoSave() {
    try {
      const nowStr = new Date().toLocaleTimeString('zh-TW', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      this.lastSavedTime = nowStr;
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
    if (char.orientation === 'asexual_demi') {
      return {
        type: 'romantic',
        label: '💘 柏拉圖愛戀線',
        badgeClass: 'route-ace'
      };
    }
    return {
      type: 'romantic',
      label: '💘 戀人攻略線',
      badgeClass: 'route-romantic'
    };
  }

  isDiagnosed(charId) {
    const char = CHARACTERS.find((c) => c.id === charId);
    const cs = this.state.characters[charId];
    if (!char || !cs) return false;
    return Boolean(cs.diagnosed || (cs.unlockedCriteria.length >= char.criteria.length && cs.eventCompleted >= 12));
  }

  getDiagnosisDisplay(char) {
    const cs = this.state.characters[char.id];
    const total = char.criteria.length;
    const count = cs ? cs.unlockedCriteria.length : 0;
    const diagnosed = this.isDiagnosed(char.id);

    if (diagnosed) {
      return {
        diagnosed: true,
        code: char.dsmCode,
        title: char.dsmTitle,
        fullTitle: `${char.dsmTitle} (${char.dsmTitleEn})`,
        clusterLabel: `Cluster ${char.cluster}`,
        badgeColor: CLUSTERS[char.cluster]?.color || char.themeColor,
        progressText: `🥇 靈魂真名已揭曉 (${count}/${total})`
      };
    }

    return {
      diagnosed: false,
      code: `線索 ${count}/${total}`,
      title: count === 0 ? '？？？・心靈特質待觀察' : `？？？・已收集 ${count}/${total} 項特徵`,
      fullTitle:
        count === 0
          ? '【尚未揭曉】需推進 15 事件決策樹並收集行為線索'
          : `【心靈觀察中：已解鎖 ${count}/${total} 項特徵】達診斷標準後揭曉`,
      clusterLabel: '未分類',
      badgeColor: '#9f6b8c',
      progressText: `🔍 診斷線索 ${count}/${total}`
    };
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

  // 完整線性故事走訪（移除 DFS 強制跳轉）：一次完整走完一個人的 15 個事件，即使在三人同場認識新房客也不中斷當前故事線
  resolveStoryStep() {
    const st = this.state;
    st.storyStack = [];

    // 若目前角色尚未走完，直接繼續走目前角色的故事到底（E01 ~ E15）
    if (st.currentStoryChar && !this.isStoryFinished(st.currentStoryChar)) {
      return st.currentStoryChar;
    }

    // 目前角色已走完時，優先選擇在三人同場事件中已認識但尚未走完的房客
    const unfinishedMet = CHARACTERS.filter((c) => this.isMet(c.id) && !this.isStoryFinished(c.id));
    if (unfinishedMet.length) {
      st.currentStoryChar = unfinishedMet[0].id;
      return st.currentStoryChar;
    }

    // 若已認識的都走完了，從尚未認識的房客中開啟下一段邂逅
    const unmet = CHARACTERS.filter((c) => !this.isMet(c.id));
    if (!unmet.length) {
      st.currentStoryChar = null;
      return null;
    }
    st.currentStoryChar = unmet[0].id;
    this.meetCharacter(st.currentStoryChar);
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
    if (this.isDiagnosed(charId)) return text;
    return text
      .replace(/妄想型人格障礙症|妄想型人格|妄想型個體|妄想型/g, '此類高警覺特質者')
      .replace(/孤僻型人格障礙症|孤僻型人格|孤僻型個體|孤僻型/g, '此類偏好獨處特質者')
      .replace(/思覺失調型人格障礙症|思覺失調型人格|思覺失調型個體|思覺失調型/g, '此類奇特知覺特質者')
      .replace(/反社會型人格障礙症|反社會型人格|反社會型個體|反社會型/g, '此類尋求刺激與博弈特質者')
      .replace(/邊緣型人格障礙症|邊緣型人格|邊緣型個體|邊緣型/g, '此類強烈依附波動特質者')
      .replace(/做作型（戲劇化）人格障礙症|做作型人格|做作型個體|做作型|戲劇化人格/g, '此類渴望聚光燈特質者')
      .replace(/自戀型人格障礙症|自戀型人格|自戀型個體|自戀型/g, '此類高自尊防衛特質者')
      .replace(/畏避型（逃避型）人格障礙症|畏避型人格|畏避型個體|畏避型|逃避型/g, '此類害怕負面評價特質者')
      .replace(/依賴型人格障礙症|依賴型人格|依賴型個體|依賴型/g, '此類高度尋求依靠特質者')
      .replace(/強迫型人格障礙症|強迫型人格|強迫型個體|強迫型/g, '此類追求絕對秩序特質者')
      .replace(/另一身體病況引起之人格改變/g, '生理創傷後之性情轉變')
      .replace(/其他特定之人格障礙症|被動攻擊型|被動攻擊/g, '此類隱性抗拒特質者')
      .replace(/\(F60\.\d+\)|（F60\.\d+）|F60\.\d+|F21|F07\.0/g, '（心靈觀察紀錄）');
  }

  startNewGameFromForm() {
    const nameInput = document.getElementById('player-name-input');
    const pronounInput = document.getElementById('player-pronoun-input');

    const fresh = this.getDefaultState();
    fresh.initialized = true;
    fresh.player.name = (nameInput?.value || '林予安').trim() || '林予安';
    const pronoun = (pronounInput?.value || '她').trim() || '她';
    fresh.player.pronoun = pronoun;

    if (pronoun === '他') {
      fresh.player.sex = 'male';
      fresh.player.sexLabel = '代名詞「他」';
    } else if (pronoun === '她') {
      fresh.player.sex = 'female';
      fresh.player.sexLabel = '代名詞「她」';
    } else {
      fresh.player.sex = 'nonbinary';
      fresh.player.sexLabel = `代名詞「${pronoun}」`;
    }
    fresh.player.trait = 'balanced';

    // 小說式開場：先遇見第一位房客，並能完整走完一個人的故事
    const firstChar = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
    fresh.metCharacters = [firstChar.id];
    fresh.currentStoryChar = firstChar.id;

    this.state = fresh;
    this.activeScene = null;
    this.activeMainTab = 'locations';
    this.activeLocationId = 'apartment';
    this.autoSave();
    audio.playSelect();
    trackGA('game_start', {
      player_sex: fresh.player.sex,
      first_character_id: firstChar.id,
      first_character_name: firstChar.name
    });
    this.render();
    this.startEvent(firstChar.id, 1);
  }

  clampStat(val) {
    return Math.max(0, Math.min(100, Math.round(val)));
  }

  applyStats(charId, delta = {}) {
    const cs = this.state.characters[charId];
    if (!cs) return;
    if (typeof delta.affection === 'number') {
      cs.affection = this.clampStat(cs.affection + delta.affection);
    }
    if (typeof delta.security === 'number') {
      cs.security = this.clampStat(cs.security + delta.security);
    }
    if (typeof delta.boundary === 'number') {
      cs.boundary = this.clampStat(cs.boundary + delta.boundary);
    }
  }

  unlockCriterion(charId, criterionId) {
    if (!criterionId) return false;
    const char = CHARACTERS.find((c) => c.id === charId);
    const cs = this.state.characters[charId];
    if (!char || !cs) return false;

    let newlyAdded = false;
    if (!cs.unlockedCriteria.includes(criterionId)) {
      cs.unlockedCriteria.push(criterionId);
      newlyAdded = true;
    }

    const total = char.criteria.length;
    const currentCount = cs.unlockedCriteria.length;

    if (newlyAdded) {
      const crit = char.criteria.find((cr) => cr.id === criterionId);
      if (currentCount >= total && cs.eventCompleted >= 11 && !cs.diagnosed) {
        cs.diagnosed = true;
        audio.playUnlockDSM();
        this.showToast(
          `🥇 達成成就【靈魂真名】！正式揭曉 ${char.name} 臨床診斷：${char.dsmTitle} (${char.dsmCode})`
        );
      } else if (crit) {
        audio.playChime(660, 0.14);
        this.showToast(
          `🌸 觀察到【${char.name}】心靈特徵：「${crit.title}」（線索 ${currentCount}/${total}）`
        );
      }
      this.autoSave();
    }
    return newlyAdded;
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

    const evObj = events.find((e) => e.eventNumber === targetEvNum) || events[0];
    this.activeLocationId = evObj.locationId || char.locationId;
    this.dsmWidgetCharId = charId;
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
      ? '⚡ 突發天災危機：12 位角色各自專屬的環境風暴 (Event 08)'
      : '🌙 雙人秘密羈絆：邊界分水嶺之夜 (Event 10)';
    const subtitle = isQuake
      ? '一人一次、12 種截然不同的突發天災危機！在極端環境壓力下，你要前往誰的身邊共度風暴？'
      : '走過風暴後的靜謐夜晚，面對對方卸下防備後的深層脆弱，你的選擇將決定關係走向健康相愛或共依存。';

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
                const uTitle = isQuake ? (UNIQUE_DISASTER_EVENTS[c.id]?.title || 'E08 突發天災') : 'E10 雙人秘密羈絆';
                return `
                  <button
                    class="disaster-char-pick"
                    data-action="launch-shared-disaster"
                    data-char-id="${c.id}"
                    data-disaster="${disasterType}"
                  >
                    <img src="./assets/characters/${c.id}.png" alt="${c.name}" />
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
    const events = this.getEventsForChar(charId);
    const evNum = disasterType === 'quake' ? 8 : 10;
    const evObj = events.find((e) => e.eventNumber === evNum);
    const char = CHARACTERS.find((c) => c.id === charId);
    if (!evObj || !char) return;

    this.activeLocationId = evObj.locationId || char.locationId;
    this.dsmWidgetCharId = charId;
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
      partnerId: null,
      eventNumber: evObj.eventNumber,
      eventData: evObj,
      locationId: evObj.locationId,
      nodeIndex: 0,
      expression: evObj.nodes[0]?.expression || 'vulnerable',
      awaitingNextAfterChoice: false,
      lastChoiceOutcome: null
    };

    this.autoSave();
    this.render();
  }

  startDailyTalk(charId) {
    const char = CHARACTERS.find((c) => c.id === charId);
    const scenario = ALL_SCENARIOS[charId];
    const cs = this.state.characters[charId];
    if (!char || !scenario || !cs) return;

    const extraPool = EXTRA_DAILY_TALKS[charId] || [];
    const basePool = scenario.dailyTalks || [];
    const talks = [...extraPool, ...basePool];
    const talk = talks[cs.dailyTalkIndex % talks.length];
    const repeatCount = Math.floor(cs.dailyTalkIndex / Math.max(1, talks.length));
    cs.dailyTalkIndex += 1;

    this.dsmWidgetCharId = charId;
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

    const scale = sc.repeatCount > 0 ? 0.4 : 1;
    const stats = {};
    Object.entries(choice.stats || {}).forEach(([k, v]) => {
      stats[k] = v > 0 ? Math.max(1, Math.round(v * scale)) : v;
    });
    this.applyStats(charId, stats);
    (stats.security || 0) < -3 ? audio.playTriggerWarning() : audio.playSelect();

    sc.picked = { text: choice.text, reply: choice.reply, psychNote: choice.psychNote, stats };
    sc.expression = (stats.security || 0) > 0 ? 'smile' : (stats.security || 0) <= -6 ? 'triggered' : 'anxious';

    if (!Array.isArray(cs.diary)) cs.diary = [];
    cs.diary.unshift({
      id: `daily_${Date.now()}`,
      type: 'daily',
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

  showEndingForCharacter(charId, forcedEndingKey = null) {
    const char = CHARACTERS.find((c) => c.id === charId);
    const scenario = ALL_SCENARIOS[charId];
    const cs = this.state.characters[charId];
    if (!char || !scenario || !cs) return;

    let endingKey = forcedEndingKey;
    if (!endingKey) {
      if (cs.security < 32 || cs.affection < 28) {
        endingKey = 'triggerEnd';
      } else if (cs.affection >= 50 && cs.boundary < 45) {
        endingKey = 'codependentEnd';
      } else if (cs.affection >= 60 && cs.security >= 52 && cs.boundary >= 48) {
        endingKey = 'trueEnd';
      } else {
        endingKey = 'normalEnd';
      }
    }

    if (!cs.unlockedEndings.includes(endingKey)) {
      cs.unlockedEndings.push(endingKey);
    }
    if (cs.eventCompleted < 15) {
      cs.eventCompleted = 15;
    }

    const isGood = endingKey === 'trueEnd' || endingKey === 'normalEnd';
    audio.playEndingChord(isGood);
    trackGA('story_ending', {
      character_id: char.id,
      character_name: char.name,
      ending_key: endingKey,
      ending_title: scenario.endings[endingKey]?.title || endingKey
    });

    this.activeScene = {
      mode: 'ending',
      charId,
      locationId: char.locationId,
      endingKey,
      endingData: scenario.endings[endingKey],
      expression:
        endingKey === 'trueEnd'
          ? 'smile'
          : endingKey === 'codependentEnd'
          ? 'vulnerable'
          : endingKey === 'triggerEnd'
          ? 'triggered'
          : 'neutral'
    };

    this.autoSave();
    this.render();
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
    const char = CHARACTERS.find((c) => c.id === charId);
    const cs = this.state.characters[charId];
    if (!char || !cs) return;

    if (cs.eventCompleted < eventNumber) {
      cs.eventCompleted = eventNumber;
    }
    cs.chapterCompleted = Math.min(3, Math.floor(cs.eventCompleted / 4));

    if (eventData.criterionId) {
      this.unlockCriterion(charId, eventData.criterionId);
    }

    if (eventData.type === 'shared_quake') {
      cs.sharedQuakeDone = true;
    }
    if (eventData.type === 'shared_typhoon') {
      cs.sharedTyphoonDone = true;
    }

    // 三人同場事件同時提升同場夥伴的好感與安全感
    if (partnerId && this.state.characters[partnerId]) {
      this.applyStats(partnerId, { affection: 5, security: 5 });
    }

    // 若完成 E12，確保所有臨床準則與診斷正式揭曉（達成🥇靈魂真名成就）
    if (eventNumber >= 12 || eventData.unlockDiagnosisOnComplete) {
      char.criteria.forEach((cr) => {
        if (!cs.unlockedCriteria.includes(cr.id)) {
          cs.unlockedCriteria.push(cr.id);
        }
      });
      if (!cs.diagnosed) {
        cs.diagnosed = true;
        audio.playUnlockDSM();
        this.showToast(`🥇 達成成就【靈魂真名】！正式揭曉 ${char.name} 臨床診斷：${char.dsmTitle} (${char.dsmCode})`);
      }
    }

    // 若完成 E13，正式解鎖「成長背景與人格疾患養成故事」（達成👑記憶深處的迴響成就）
    if (eventNumber >= 13 || eventData.unlockBackstoryOnComplete) {
      if (!cs.backstoryUnlocked) {
        cs.backstoryUnlocked = true;
        audio.playUnlockDSM();
        this.showToast(`👑 達成終極成就【記憶深處的迴響】！已解鎖 ${char.name} 的成長背景與人格疾患養成故事！`);
      }
    }

    // 推進街區動態漫步週期，讓角色移動到不同地點
    this.state.roamCycle = (this.state.roamCycle || 0) + 1;

    trackGA('story_event_complete', {
      character_id: char.id,
      character_name: char.name,
      event_number: eventNumber,
      event_code: eventData.code
    });

    if (eventNumber === 14) {
      this.showEndingForCharacter(charId);
      return;
    }

    this.activeScene = null;
    this.autoSave();
    this.showToast(`✨ 已完成【${char.name}】劇情事件 E${String(eventNumber).padStart(2, '0')}！`);
    this.render();
  }

  handleChoiceSelect(choiceIndex) {
    if (!this.activeScene || this.activeScene.mode !== 'event') return;
    const { charId, eventData, nodeIndex } = this.activeScene;
    const char = CHARACTERS.find((c) => c.id === charId);
    const cs = this.state.characters[charId];
    const currentNode = eventData.nodes[nodeIndex];
    const choice = currentNode?.choices?.[choiceIndex];
    if (!choice || !char || !cs) return;

    // 重玩已完成事件的正向收益遞減，避免刷滿
    const isReplay = (cs.eventCompleted || 0) >= this.activeScene.eventNumber;
    let effStats = choice.stats || {};
    if (isReplay) {
      effStats = {};
      Object.entries(choice.stats || {}).forEach(([k, v]) => {
        effStats[k] = v > 0 ? Math.max(1, Math.round(v * 0.35)) : v;
      });
    }
    this.applyStats(charId, effStats);

    if ((choice.stats?.security || 0) < -4) {
      audio.playTriggerWarning();
    } else {
      audio.playSelect();
    }

    // 重要：DSM 相關判斷與診斷依據僅在玩家「做出選擇後」才觸發與揭露！
    const criteriaIdsToUnlock = new Set();
    eventData.nodes.slice(0, nodeIndex + 1).forEach((n) => {
      if (n.unlockCriterion) criteriaIdsToUnlock.add(n.unlockCriterion);
    });
    if (choice.unlockCriterion) {
      criteriaIdsToUnlock.add(choice.unlockCriterion);
    }
    if (eventData.criterionId) {
      criteriaIdsToUnlock.add(eventData.criterionId);
    }

    let criterionBasisObj = null;
    criteriaIdsToUnlock.forEach((cid) => {
      this.unlockCriterion(charId, cid);
      const foundCrit = char.criteria.find((cr) => cr.id === cid);
      if (foundCrit) {
        criterionBasisObj = {
          id: foundCrit.id,
          title: foundCrit.title,
          desc: this.maskUndiagnosedText(foundCrit.desc, charId)
        };
      }
    });

    // 整理前段情境與對方台詞摘要（供相處日記完整收錄）
    const sceneContextSummary = eventData.nodes
      .slice(0, nodeIndex + 1)
      .map((n) => this.formatText(n.text))
      .join(' ');

    const replyFormatted = this.formatText(choice.reply);
    const dsmJudgmentFormatted = this.maskUndiagnosedText(choice.psychNote, charId);

    this.activeScene.expression = choice.nextExpression || 'neutral';
    this.activeScene.awaitingNextAfterChoice = true;
    this.activeScene.lastChoiceOutcome = {
      choiceText: this.formatText(choice.text),
      reply: replyFormatted,
      psychNote: dsmJudgmentFormatted,
      criterionBasis: criterionBasisObj,
      stats: effStats
    };

    // 自動將本次「情境、選擇、對方反應、以及區隔出的 DSM 臨床判斷與依據」寫入過往相處日記
    if (!Array.isArray(cs.diary)) cs.diary = [];
    cs.diary.unshift({
      id: `${eventData.code}_${nodeIndex}_${Date.now()}`,
      type: 'event',
      code: eventData.code,
      title: eventData.title,
      context: sceneContextSummary,
      choiceText: this.formatText(choice.text),
      reaction: replyFormatted,
      dsmJudgment: dsmJudgmentFormatted,
      criterionBasis: criterionBasisObj,
      stats: effStats,
      recordedAt: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })
    });

    this.autoSave();
    this.render();
  }

  formatText(text = '') {
    return text.replaceAll('{player}', this.state.player.name);
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
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModals();
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
              cardEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 60);
          }
          break;
        case 'focus-rel-card': {
          const cid = target.dataset.charId;
          const cardEl = document.getElementById(`rel-char-card-${cid}`);
          if (cardEl) {
            cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
            this.state.currentStoryChar = cid;
            this.meetCharacter(cid);
            this.autoSave();
            audio.playChime(540, 0.06);
            this.render();
          }
          break;
        }
        case 'start-event':
        case 'start-chapter':
          this.closeModals();
          {
            const cid = target.dataset.charId;
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
          this.startDailyTalk(target.dataset.charId);
          break;
        case 'show-ending': {
          const cid = target.dataset.charId;
          const cs = this.state.characters[cid];
          if (!this.isDiagnosed(cid) && cs.eventCompleted < 12) {
            this.showToast('🔒 請先推進該角色的劇情事件至 E12 並達成【靈魂真名】成就，即可解鎖命定結局！');
            return;
          }
          this.showEndingForCharacter(cid, target.dataset.endingKey || null);
          break;
        }
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
              cardEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
          if (target.dataset.charId) {
            this.dsmWidgetCharId = target.dataset.charId;
          } else if (!this.dsmWidgetCharId) {
            this.dsmWidgetCharId = this.activeScene?.charId || 'shen_mo';
          }
          audio.playChime(560, 0.06);
          this.render();
          break;
        case 'close-dsm-widget':
          this.dsmWidgetOpen = false;
          this.render();
          break;
        case 'select-dsm-widget-char':
          this.dsmWidgetCharId = target.dataset.charId || 'shen_mo';
          this.dsmWidgetTab = 'criteria';
          audio.playChime(520, 0.05);
          this.render();
          break;
        case 'open-dsm-ref': {
          const code = target.dataset.code;
          this.dsmWidgetTab = 'ref';
          this.dsmWidgetOpen = true;
          audio.playChime(540, 0.05);
          this.render();
          this.scrollToDsmRef(code);
          break;
        }
        case 'jump-dsm-ref':
          this.scrollToDsmRef(target.dataset.code);
          break;
        case 'switch-dsm-widget-tab':
          this.dsmWidgetTab = target.dataset.tab || 'criteria';
          audio.playChime(540, 0.05);
          this.render();
          break;
        case 'save-slot':
          this.saveToSlot(Number(target.dataset.slot));
          break;
        case 'load-slot':
          this.loadFromSlot(Number(target.dataset.slot));
          break;
        case 'clear-all-saves':
        case 'restart-game':
          if (confirm('確定要重新開始遊戲嗎？（將重置目前攻略進度，並返回初始創角畫面重新開始）')) {
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
            this.activeMainTab = 'locations';
            this.activeLocationId = 'apartment';
            this.closeModals();
            this.render();
            this.showToast('🔄 已重新開始遊戲，請設定主角資訊！');
          }
          break;
        case 'toggle-audio': {
          const on = audio.toggle();
          this.render();
          this.showToast(on ? '🔊 浪漫音效已開啟' : '🔇 音效已靜音');
          break;
        }
        case 'close-modal':
          this.closeModals();
          break;
      }
    });
  }

  closeModals() {
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) modalRoot.innerHTML = '';
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
    return `
      <div class="page-scene-bg-layer" style="background-image: url('${bgInfo.imagePath}');">
        <div class="page-scene-bg-vignette"></div>
      </div>
    `;
  }

  getRelationshipStatusInfo(char, cs) {
    const diag = this.getDiagnosisDisplay(char);
    if (cs.unlockedEndings.includes('trueEnd')) {
      return { label: '💍 命定摯愛 (True End)', color: '#f472b6', lineDash: '' };
    }
    if (cs.unlockedEndings.includes('codependentEnd')) {
      return { label: '🥀 沉溺共依存', color: '#c084fc', lineDash: '6,4' };
    }
    if (cs.unlockedEndings.includes('triggerEnd')) {
      return { label: '💔 防衛決裂', color: '#fb7185', lineDash: '3,6' };
    }
    if (cs.affection >= 65 && cs.security >= 55 && cs.boundary >= 48) {
      return { label: '💘 深層相戀・心意相通', color: '#f472b6', lineDash: '' };
    }
    if (cs.affection >= 50 && cs.boundary < 42) {
      return { label: '🥀 危險依附・界線模糊', color: '#a855f7', lineDash: '5,4' };
    }
    if (cs.affection >= 35 || cs.eventCompleted >= 2) {
      return { label: '🌸 曖昧升溫・心動試探', color: '#fbbf24', lineDash: '' };
    }
    if (diag.diagnosed) {
      return { label: '✨ 已讀懂靈魂真相', color: '#38bdf8', lineDash: '' };
    }
    return { label: '🏠 公寓房客（初識）', color: '#94a3b8', lineDash: '4,4' };
  }

  getTotalAchievementsCount() {
    let unlocked = 0;
    const total = CHARACTERS.length * 4;
    CHARACTERS.forEach((c) => {
      const achs = getCharacterAchievements(c, this.state.characters[c.id], this.isDiagnosed(c.id));
      unlocked += achs.filter((a) => a.unlocked).length;
    });
    return { unlocked, total };
  }

  // ==================== 畫面渲染 ====================
  render() {
    const appRoot = document.getElementById('app-root');
    if (!appRoot) return;

    const bgLayer = this.renderPageBackgroundLayer();

    if (!this.state.initialized) {
      appRoot.innerHTML = `
        ${bgLayer}
        ${this.renderCharacterCreator()}
      `;
      return;
    }

    if (this.activeScene) {
      appRoot.innerHTML = `
        ${bgLayer}
        ${this.renderTopNavbar()}
        ${this.renderActiveScene()}
        ${this.renderSideDsmCriteriaWidget()}
      `;
      return;
    }

    appRoot.innerHTML = `
      ${bgLayer}
      ${this.renderTopNavbar()}
      <main class="hub-container">
        ${this.renderMainPageTabs()}
        ${
          this.activeMainTab === 'relationships'
            ? this.renderRelationshipGraphTab()
            : this.renderLocationExplorer()
        }
      </main>
      ${this.renderSideDsmCriteriaWidget()}
    `;
  }

  renderMainPageTabs() {
    const achSummary = this.getTotalAchievementsCount();
    const sceneId = this.getCurrentBackgroundSceneId();
    const bgInfo = getSceneBackground(sceneId);

    return `
      <div class="hub-main-tabs-bar">
        <div class="hub-main-tabs">
          <button
            class="hub-tab-btn ${this.activeMainTab === 'locations' ? 'active' : ''}"
            data-action="switch-main-tab"
            data-tab="locations"
          >
            📖 故事
          </button>
          <button
            class="hub-tab-btn ${this.activeMainTab === 'relationships' ? 'active' : ''}"
            data-action="switch-main-tab"
            data-tab="relationships"
          >
            💞 人物關係圖 ＆ 心靈成就（🏆 ${achSummary.unlocked}/${achSummary.total}）
          </button>
        </div>

        <div class="current-bg-indicator" title="當前頁面底層場景背景圖">
          <span>🖼️ 當前場景背景：<strong>${bgInfo.name}</strong></span>
        </div>
      </div>
    `;
  }

  // 頂部導覽列（手機版支援收合式選單）
  renderTopNavbar() {
    const achSummary = this.getTotalAchievementsCount();

    return `
      <header class="top-navbar ${this.mobileNavOpen ? 'nav-open' : ''}">
        <div class="navbar-top-row">
          <div class="brand-group">
            <span class="brand-logo">🌸</span>
            <div>
              <h1 class="brand-title">愛的邊緣 <span class="brand-sub">EDGE OF LOVE</span></h1>
              <p class="brand-meta">
                主角：<strong>${this.state.player.name}</strong>（代名詞「${this.state.player.pronoun}」）
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
            💞 人物關係圖 (🏆 成就 ${achSummary.unlocked}/${achSummary.total})
          </button>
          <button
            class="nav-btn ${this.dsmWidgetOpen ? 'btn-accent' : 'btn-gold'}"
            data-action="toggle-dsm-widget"
            title="隨時從畫面右側叫出 DSM-5-TR 人格疾患診斷準則隨身小工具"
          >
            📖 診斷準則小工具
          </button>
          <button class="nav-btn" data-action="open-save-modal">
            💾 記憶存檔
          </button>
          <button class="nav-btn" data-action="toggle-audio">
            ${audio.enabled ? '🔊' : '🔇'}
          </button>
          <button class="nav-btn btn-restart" data-action="restart-game" title="清除目前進度並重新開始遊戲">
            🔄 重新開始
          </button>
        </div>
      </header>
    `;
  }

  renderCharacterCreator() {
    return `
      <section class="creator-screen">
        <div class="creator-card">
          <div class="creator-header">
            <span class="creator-badge">✦ 序章 ✦</span>
            <h1>愛的邊緣 <small style="font-size:1.1rem; font-weight:400; display:block; margin-top:4px;">Edge of Love</small></h1>
            <p style="line-height:2;">
              入夜後下起了雨。你拖著行李站在這棟公寓褪色的木門前，<br/>
              門縫裡漏出一線暖黃的燈光，樓上傳來斷斷續續的腳步聲。<br/>
              這棟老公寓裡住著形形色色的人。你還不認識他們——<br/>
              推開大門後，你會開始遇見新朋友，並開始走進對方的生命故事。<br/>
            </p>
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
            <button class="btn-primary-large" data-action="start-new-game">
              📖 推開公寓木門，翻開第一頁故事
            </button>
          </div>

          <div class="home-ethics-note">
            <strong>💡 溫馨備註</strong>：本遊戲旨在透過故事帶領大家認識與理解「人格疾患」，並不希望標籤化或污名化各種心理病理診斷；同時提醒，遊戲情境純屬虛構，在真實世界的臨床與專業實務中，並不建議在真實個案診斷關係中與個案談戀愛。
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
          <div class="panel-header"><div><h2>📖 故事</h2><p>十二位房客的故事都已走到盡頭。到「人物關係圖」回顧每個人的相處日記與成就吧。</p></div></div>
        </section>`;
    }
    const { char, cs, nextEv } = status;
    const progressPct = Math.round(((cs.eventCompleted || 0) / 15) * 100);
    const partnerChar = nextEv.partnerId ? CHARACTERS.find((c) => c.id === nextEv.partnerId) : null;

    return `
      <section class="location-panel story-panel">
        <div class="panel-header">
          <div>
            <h2>📖 故事</h2>
            <p>你搬到了這個公寓，結識不同背景的房客 ... </p>
          </div>
        </div>

        <article class="story-current-card" style="--char-color: ${char.themeColor}">
          <img class="story-current-avatar" src="./assets/characters/${char.id}.png" alt="${char.name}" />
          <div class="story-current-body">
            <span class="story-current-tag">🧭 當前專注故事線（完整直達結局）</span>
            <h3>${char.name} <small style="font-size:0.9rem; font-weight:400; opacity:0.85;">｜ ${char.occupation}</small></h3>
            <p>${char.tagline || ''}</p>
            <div class="story-progress"><div class="story-progress-bar" style="width:${progressPct}%"></div></div>
            <small>目前進度：已完成 ${cs.eventCompleted || 0} / 15 段劇情 ｜ 下一篇章：<strong>${nextEv.title.replace(/（🥇.*?）|（👑.*?）/g, '')}</strong></small>
            ${
              nextEv.type === 'trio' && partnerChar
                ? `<p class="story-hint">👥 接下來的三人同場情節中，房客「<strong>${partnerChar.name}</strong>」也將在場與你們互動（不會中斷 ${char.name} 的主線）。</p>`
                : ''
            }
            <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:6px;">
              <button class="btn-primary-large" data-action="continue-story">📖 繼續 ${char.name} 的故事（${nextEv.code}）</button>
              <button class="nav-btn" data-action="story-daily" data-char-id="${char.id}">🌸 日常相處</button>
              <button class="nav-btn is-hidden-feature" hidden data-action="open-event-tree-modal" data-char-id="${char.id}">🌳 15 事件樹</button>
            </div>
          </div>
        </article>

        <div class="story-roster">
          <h4>已認識 ${metCount} / ${CHARACTERS.length} 位・已走完 ${doneCount} 位（點擊已認識的房客可隨時切換主線）</h4>
          <div class="story-roster-chips">
            ${CHARACTERS.map((c) => {
              if (!this.isMet(c.id)) return `<span class="story-chip locked">🚪 ？？？</span>`;
              const ccs = this.state.characters[c.id];
              const cls = c.id === char.id ? 'current' : this.isStoryFinished(c.id) ? 'done' : '';
              return `<button type="button" class="story-chip ${cls}" data-action="select-story-char" data-char-id="${c.id}" style="cursor:pointer;">${c.name} ${ccs.eventCompleted || 0}/15</button>`;
            }).join('')}
          </div>
        </div>

        <div class="home-ethics-note">
          <strong>💡 溫馨備註</strong>：本遊戲旨在透過故事帶領大家認識與理解「人格疾患」，並不希望標籤化或污名化各種心理病理診斷；同時提醒，遊戲情境純屬虛構，在真實世界的臨床與專業實務中，並不建議在真實個案診斷關係中與個案談戀愛。
        </div>
      </section>
    `;
  }

  renderRelationshipGraphTab() {
    const achSummary = this.getTotalAchievementsCount();
    const diagnosedCount = CHARACTERS.filter((c) => this.isDiagnosed(c.id)).length;

    return `
      <section class="relationship-graph-panel">
        <div class="panel-header">
          <div>
            <h2>💞 公寓・人物關係圖 ＆ 角色心靈成就檔案</h2>
            <p>
              以主角 <strong>${this.state.player.name}</strong> 為核心，呈現與 12 位可攻略房客的關係連線、<strong>4 階段心靈成就徽章（目前已解鎖 ${achSummary.unlocked} / ${achSummary.total} 枚成就，揭曉 ${diagnosedCount} / 12 人臨床診斷）</strong>，以及每位角色的「🟢 現在背景」與探索完成後解鎖的「👑 成長背景與人格疾患養成故事」。
            </p>
          </div>
        </div>

        <div class="rel-web-container">
          ${this.renderRelationshipWebDiagram()}
        </div>

        ${this.renderCharacterRoster()}
      </section>
    `;
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
      const achs = getCharacterAchievements(char, cs, diag.diagnosed);
      return { char, cs, diag, rel, achs, x, y };
    });

    return `
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
          <small>公寓主角（${this.state.player.pronoun}）</small>
        </div>

        ${nodes
          .map(({ char, cs, diag, rel, achs, x, y }) => {
            const leftPct = ((x / 1120) * 100).toFixed(2);
            const topPct = ((y / 660) * 100).toFixed(2);
            const badgesStr = achs.map((a) => (a.unlocked ? a.icon : '⚪')).join('');
            return `
              <button
                class="rel-char-node ${diag.diagnosed ? 'is-diagnosed' : ''}"
                style="left: ${leftPct}%; top: ${topPct}%; --node-color: ${rel.color}"
                data-action="focus-rel-card"
                data-char-id="${char.id}"
                title="點擊捲動至 ${char.name} 的詳細關係、背景與成就卡"
              >
                <div class="rel-node-avatar-wrap">
                  <img src="./assets/characters/${char.id}.png" alt="${char.name}" />
                  <span class="rel-node-num">#${char.number}</span>
                </div>
                <div class="rel-node-caption">
                  <strong>${char.name} <small>${badgesStr}</small></strong>
                  <span class="rel-node-status" style="color:${rel.color}">${rel.label}</span>
                  <small class="rel-node-diag ${diag.diagnosed ? 'unlocked' : ''}">
                    ${diag.diagnosed ? `🥇 ${char.dsmTitle}` : `🔒 事件 ${cs.eventCompleted}/15`}
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
      filteredChars = metChars.filter((c) => this.isDiagnosed(c.id));
    } else if (this.selectedFilter === 'OBSERVING') {
      filteredChars = metChars.filter((c) => !this.isDiagnosed(c.id));
    }

    const diagnosedCount = metChars.filter((c) => this.isDiagnosed(c.id)).length;
    const observingCount = metChars.length - diagnosedCount;

    return `
      <section class="roster-panel">
        <div class="panel-header roster-header">
          <div>
            <h2>✨ 12 位可攻略房客名冊（現在背景 ＆ 成長養成故事 ＆ 專屬成就）</h2>
            <p>直接顯示每位角色的「🟢 現在背景」與跨地點動態行蹤；當推進完第 13 個事件後，將解鎖「👑 成長背景與人格疾患養成故事」。</p>
          </div>

          <div class="cluster-filters">
            <button class="filter-btn ${this.selectedFilter === 'ALL' ? 'active' : ''}" data-action="filter-roster" data-filter="ALL">
              已認識房客 (${metChars.length})
            </button>
            <button class="filter-btn ${this.selectedFilter === 'OBSERVING' ? 'active' : ''}" data-action="filter-roster" data-filter="OBSERVING">
              🔍 探索中 (${observingCount})
            </button>
            <button class="filter-btn ${this.selectedFilter === 'DIAGNOSED' ? 'active' : ''}" data-action="filter-roster" data-filter="DIAGNOSED">
              🥇 已解鎖診斷成就 (${diagnosedCount})
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
            this.selectedFilter !== 'DIAGNOSED'
              ? Array.from({ length: unmetCount })
                  .map(
                    () => `<div class="locked-door-card"><div class="locked-door-icon">🚪</div><strong>尚未邂逅的房客</strong><small>門後的人，會在適當的時候出現。</small></div>`
                  )
                  .join('')
              : ''
          }
        </div>
      </section>
    `;
  }

  renderCharacterCard(char) {
    const cs = this.state.characters[char.id];
    const lore = CHARACTER_EXTENDED_LORE[char.id];
    const diag = this.getDiagnosisDisplay(char);
    const rel = this.getRelationshipStatusInfo(char, cs);
    const promptInfo = CHARACTER_PROMPTS[char.id];
    const achs = getCharacterAchievements(char, cs, diag.diagnosed);
    const nextEv = this.getNextEventForChar(char.id);
    const backstoryUnlocked = Boolean(cs.backstoryUnlocked || cs.eventCompleted >= 13);

    const scheduleNames = lore.scheduleLocations
      .map((lid) => LOCATIONS.find((l) => l.id === lid)?.name.split('・')[1] || LOCATIONS.find((l) => l.id === lid)?.name)
      .join(' ➔ ');

    return `
      <article id="rel-char-card-${char.id}" class="char-card otome-gacha-card" style="--char-color: ${char.themeColor}">
        <div class="gacha-card-visual" data-action="start-event" data-char-id="${char.id}">
          <div class="gacha-arch-window">
            <img src="${promptInfo?.imagePath || `./assets/characters/${char.id}.png`}" alt="${char.name}" class="gacha-char-img" loading="lazy" />
            <div class="gacha-gradient-veil"></div>
            <span class="gacha-rarity-badge">${promptInfo?.rarity || 'SSR'}</span>
            <span class="gacha-clue-pill ${diag.diagnosed ? 'unlocked' : ''}">
              事件 ${cs.eventCompleted}/15
            </span>
            <div class="gacha-bottom-title">
              <div class="gacha-name-line">
                <span class="char-number">#${char.number}</span>
                <h3>${char.name}</h3>
                <small>${char.enName}</small>
              </div>
              <p class="gacha-occ">${char.occupation}｜${char.age} 歲</p>
            </div>
          </div>
        </div>

        <div class="gacha-card-body">
          <div class="rel-status-banner" style="border-color:${rel.color}; color:${rel.color}">
            <span>當前關係：<strong>${rel.label}</strong></span>
          </div>

          <!-- 角色專屬 4 枚心靈成就徽章列 -->
          <div class="char-achievements-row">
            ${achs
              .map(
                (a) => `
                  <div class="ach-pill ${a.unlocked ? 'unlocked' : 'locked'}" title="${a.desc}">
                    <span>${a.unlocked ? a.icon : '🔒'}</span>
                    <small>${a.title}</small>
                  </div>
                `
              )
              .join('')}
          </div>

          <div class="char-tags-row">
            <span class="gender-tag">${char.genderLabel}</span>
            <span class="orient-tag">${char.orientationLabel}</span>
          </div>

          <!-- 1. 公開顯示：現在背景與跨地點出沒路線 -->
          <div class="char-lore-box current-bg-box">
            <strong>🟢 現在背景（公開）：</strong>
            <p>${lore.currentBackground}</p>
            <small class="char-roam-locations">📍 出沒地點：${scheduleNames}</small>
          </div>

          <!-- 2. 探索完解鎖：成長背景與人格疾患養成故事 -->
          <div class="char-lore-box growth-bg-box ${backstoryUnlocked ? 'unlocked' : 'locked'}">
            <strong>${backstoryUnlocked ? `👑 成長背景＆人格疾患養成故事：${lore.growthBackstory.title}` : '🔒 成長背景＆人格疾患養成故事（待探索完解鎖）'}</strong>
            ${
              backstoryUnlocked
                ? `<p>${lore.growthBackstory.story}</p>`
                : `<p class="locked-placeholder">需推進此角色劇情至第 13 事件【E13 過去的房間】並突破心防後，才會揭曉是什麼樣的童年與成長經歷造就了${char.pronoun}今日的人格特質。</p>`
            }
          </div>

          <!-- 三維度關係數值 -->
          <div class="stats-bars">
            <div class="stat-row">
              <div class="stat-label"><span>💗 心動親密 (Affection)</span><strong>${cs.affection}%</strong></div>
              <div class="stat-track"><div class="stat-fill fill-affection" style="width:${cs.affection}%"></div></div>
            </div>
            <div class="stat-row">
              <div class="stat-label"><span>🛡️ 依戀安全感 (Security)</span><strong>${cs.security}%</strong></div>
              <div class="stat-track"><div class="stat-fill fill-security" style="width:${cs.security}%"></div></div>
            </div>
            <div class="stat-row">
              <div class="stat-label"><span>🧭 溫柔邊界 (Boundary)</span><strong>${cs.boundary}%</strong></div>
              <div class="stat-track"><div class="stat-fill fill-boundary" style="width:${cs.boundary}%"></div></div>
            </div>
          </div>

          <!-- 內嵌過往相處日記抽屜（預設折疊，點擊展開查看與該角色的過往對話反應與 DSM 觀察依據） -->
          ${this.renderCharacterDiaryDrawer(char, cs, false)}

          <!-- 內嵌漸進式 DSM-5-TR 診斷與行為觀察線索抽屜 -->
          <details class="card-dsm-dossier" ${diag.diagnosed ? 'open' : ''}>
            <summary>
              <span>🥇 臨床真相成就（線索 ${cs.unlockedCriteria.length}/${char.criteria.length}）</span>
              <strong>${diag.diagnosed ? `✅ ${char.dsmTitle}` : '🔒 待達診斷標準'}</strong>
            </summary>
            <div class="card-dsm-body">
              ${
                diag.diagnosed
                  ? `
                    <div class="card-dsm-unlocked-box">
                      <p><strong>【${char.dsmTitle} (${char.dsmTitleEn}, ${char.dsmCode})】</strong></p>
                      <p>${char.clinicalOverview}</p>
                      <p class="card-dsm-diff">${char.differentialNote}</p>
                    </div>
                  `
                  : `
                    <p class="card-dsm-locked-tip">
                      🔒 尚未符合 DSM-5-TR 確診門檻（需推進事件並收集滿 ${char.criteria.length} 項核心行為特徵後正式揭曉）。
                    </p>
                  `
              }
              <ul class="card-criteria-mini-list">
                ${char.criteria
                  .map((cr, idx) => {
                    const isUnlocked = cs.unlockedCriteria.includes(cr.id);
                    return `
                      <li class="${isUnlocked ? 'unlocked' : 'locked'}">
                        <strong>${isUnlocked ? `✅ ${cr.title}` : `🔒 待觀察行為特徵 #${idx + 1}`}</strong>
                        <span>${isUnlocked ? this.maskUndiagnosedText(cr.desc, char.id) : '推進與該角色的跨地點事件即可記錄此特徵'}</span>
                      </li>
                    `;
                  })
                  .join('')}
              </ul>
            </div>
          </details>

          <div class="char-card-actions">
            <button class="btn-card-main" data-action="start-event" data-char-id="${char.id}">
              ${cs.eventCompleted < 15 ? `💖 推進 ${nextEv.code}` : '✨ 重溫事件'}
            </button>
            <button class="btn-card-sub is-hidden-feature" hidden data-action="open-event-tree-modal" data-char-id="${char.id}" title="開啟 15 事件完整決策樹">
              🌳 決策樹(${cs.eventCompleted}/15)
            </button>
            <button class="btn-card-sub" data-action="start-daily" data-char-id="${char.id}">
              🌸 日常
            </button>
          </div>
        </div>
      </article>
    `;
  }

  // ==================== 彈窗：15 事件決策樹總覽（隱藏功能，已移除舊版章節阻擋） ====================
  renderEventTreeModal(charId) {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return;

    const char = CHARACTERS.find((c) => c.id === charId) || CHARACTERS[0];
    const cs = this.state.characters[char.id];
    const events = this.getEventsForChar(char.id);
    const achs = getCharacterAchievements(char, cs, this.isDiagnosed(char.id));

    modalRoot.innerHTML = `
      <div class="modal-backdrop" data-action="close-modal">
        <div class="modal-window">
          <div class="modal-header">
            <div>
              <h2>🌳 #${char.number} ${char.name} — 15 事件戀愛養成決策樹（進度 ${cs.eventCompleted} / 15）</h2>
              <p>涵蓋四階段劇情、跨地點移動、三人同場事件、專屬危機事件（E08）與成長養成故事解鎖。</p>
            </div>
            <button type="button" class="btn-close" data-action="close-modal" aria-label="關閉">✕</button>
          </div>

          <div class="modal-body">
            <div class="char-achievements-row" style="margin-bottom:14px;">
              ${achs
                .map(
                  (a) => `
                    <div class="ach-pill ${a.unlocked ? 'unlocked' : 'locked'}">
                      <span>${a.unlocked ? a.icon : '🔒'}</span>
                      <strong>${a.title}</strong>：<span>${a.desc}</span>
                    </div>
                  `
                )
                .join('')}
            </div>

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
                          <small>📍 地點：${locObj?.icon || ''} ${locObj?.name || ''} ｜ ${ev.phaseName}</small>
                        </div>
                      </div>
                      <div class="tree-ev-right">
                        <button
                          class="btn-action-primary"
                          data-action="start-event"
                          data-char-id="${char.id}"
                          data-event-num="${ev.eventNumber}"
                        >
                          ${isDone ? '✨ 重溫事件' : '💖 立即進行'}
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
                  <small>當你在劇情橋段中做出選擇或進行日常互動後，雙方的對話反應與「DSM 臨床觀察判斷＆依據」都會自動收錄至此日記中！</small>
                </div>
              `
              : `
                <div class="diary-entries-list">
                  ${diaryEntries
                    .map(
                      (entry, idx) => `
                        <div class="diary-entry-card">
                          <div class="diary-entry-header">
                            <span class="diary-entry-badge">${entry.code || `#${diaryEntries.length - idx}`}</span>
                            <strong>${entry.title}</strong>
                            ${entry.recordedAt ? `<small class="diary-time">${entry.recordedAt}</small>` : ''}
                          </div>

                          <!-- 1. 情境與對方反應區 -->
                          <div class="diary-story-block">
                            <p class="diary-choice-line"><strong>💬 你的選擇：</strong>${entry.choiceText}</p>
                            <p class="diary-reaction-line"><strong>💖 ${char.name}的反應：</strong>${entry.reaction}</p>
                          </div>

                          <!-- 2. 獨立區隔之 DSM 相關判斷與診斷依據 -->
                          ${
                            entry.dsmJudgment || entry.criterionBasis
                              ? `
                                <div class="diary-dsm-block">
                                  <div class="diary-dsm-title">📖 DSM 臨床判斷與行為依據</div>
                                  ${entry.dsmJudgment ? `<p class="diary-dsm-note">${entry.dsmJudgment}</p>` : ''}
                                  ${
                                    entry.criterionBasis
                                      ? `
                                        <div class="diary-criterion-tag">
                                          <strong>📋 對應診斷準則依據【${entry.criterionBasis.title}】：</strong>
                                          <span>${entry.criterionBasis.desc}</span>
                                        </div>
                                      `
                                      : ''
                                  }
                                </div>
                              `
                              : ''
                          }
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
  renderActiveScene() {
    const { charId, partnerId, mode, expression } = this.activeScene;
    const char = CHARACTERS.find((c) => c.id === charId);
    const partnerChar = partnerId ? CHARACTERS.find((c) => c.id === partnerId) : null;
    const cs = this.state.characters[charId];
    const route = this.getRouteType(char);
    const diag = this.getDiagnosisDisplay(char);

    if (mode === 'ending') {
      return this.renderEndingScene(char, cs, route, diag);
    }

    if (mode === 'daily') {
      return this.renderDailyScene(char, cs, route, diag);
    }

    const { eventData, eventNumber, nodeIndex, awaitingNextAfterChoice, lastChoiceOutcome } = this.activeScene;
    const node = eventData.nodes[nodeIndex];
    const locObj = LOCATIONS.find((l) => l.id === eventData.locationId);
    // 過濾掉事件標題中任何臨床字樣，讓橋段頁面100%專注於故事氛圍
    const cleanEventTitle = eventData.title.replace(/（🥇.*?）|（👑.*?）/g, '');

    return `
      <section class="vn-stage" style="--char-color: ${char.themeColor}">
        <div class="vn-top-bar">
          <div class="vn-loc-info">
            <span class="vn-chap-badge">${eventData.code} / E15</span>
            <strong>${cleanEventTitle}</strong>
            <small>📍 ${locObj?.name || ''} ｜ 🎧 ${eventData.ambience}</small>
          </div>
          <div class="vn-top-buttons is-hidden-feature" hidden>
            <button class="nav-btn btn-gold" data-action="toggle-dsm-widget" data-char-id="${char.id}">
              📖 叫出人格疾患準則
            </button>
            <button class="nav-btn" data-action="open-event-tree-modal" data-char-id="${char.id}">
              🌳 15 事件樹
            </button>
            <button class="nav-btn" data-action="exit-scene">
              ↩ 返回地圖
            </button>
          </div>
        </div>

        <div class="vn-main-grid">
          <!-- 左側：角色立繪（若為三人同場事件則同時並排顯示 2 位角色立繪！） -->
          <div class="vn-portrait-column">
            ${
              partnerChar
                ? `
                  <div class="vn-trio-portraits">
                    <div class="trio-p-card">
                      ${renderCharacterSVG(char, expression, 'portrait')}
                      <span class="trio-p-label">#${char.number} ${char.name}</span>
                    </div>
                    <div class="trio-p-card">
                      ${renderCharacterSVG(partnerChar, expression === 'triggered' ? 'anxious' : 'neutral', 'portrait')}
                      <span class="trio-p-label">#${partnerChar.number} ${partnerChar.name}</span>
                    </div>
                  </div>
                `
                : `
                  <div class="vn-portrait-frame">
                    ${renderCharacterSVG(char, expression, 'portrait')}
                    <div class="vn-emotion-tag">
                      ✨ 當下神情：${this.getEmotionLabel(expression)}
                    </div>
                  </div>
                `
            }

            <div class="vn-ecg-box">
              <div class="ecg-header">
                <span>💓 心動共鳴頻率</span>
                <span class="route-pill ${route.badgeClass}">${route.label}</span>
              </div>
              ${this.renderECGSVG(expression, char.themeColor)}
              <div class="vn-live-stats">
                <span>💗 心動 <strong>${cs.affection}</strong></span>
                <span>🛡️ 安全 <strong>${cs.security}</strong></span>
                <span>🧭 邊界 <strong>${cs.boundary}</strong></span>
              </div>
            </div>
          </div>

          <!-- 右側：專注情境描寫與對方反應（DSM 醫療判斷完全區隔，且僅在做出選擇後才出現） -->
          <div class="vn-dialogue-column">
            <div class="vn-dialogue-box">
              <div class="speaker-banner">
                <span class="speaker-name">
                  ${
                    partnerChar
                      ? `👥 三人同場情境：${char.name} ＆ ${partnerChar.name} ＆ ${this.state.player.name}`
                      : node.speaker === 'char'
                      ? `${char.name}（${char.occupation}）`
                      : '✦ 情境氛圍與神情描寫 ✦'
                  }
                </span>
                <span class="node-step">STEP ${nodeIndex + 1} / ${eventData.nodes.length}</span>
              </div>

              <div class="dialogue-text">
                ${this.formatText(node.text).replaceAll('\n', '<br/><br/>')}
              </div>

              ${
                awaitingNextAfterChoice && lastChoiceOutcome
                  ? `
                    <!-- 區塊 1：純粹的情境推進與對方情緒反應 -->
                    <div class="choice-outcome-box">
                      <div class="outcome-selected-choice">
                        <span>💬 你的回應：</span>${lastChoiceOutcome.choiceText}
                      </div>
                      <div class="outcome-reply">
                        <strong>💖 ${char.name}的反應：</strong>
                        <p>${lastChoiceOutcome.reply}</p>
                      </div>
                      <div class="outcome-deltas">
                        ${this.formatStatDeltas(lastChoiceOutcome.stats)}
                      </div>
                    </div>

                    <!-- 區塊 2：做出選擇後才獨立出現的「DSM 相關判斷與診斷依據」（與上方戀愛劇情明確區隔，並同步寫入日記） -->
                    <div class="outcome-dsm-judgment-panel">
                      <div class="dsm-panel-header">
                        <div class="dsm-panel-title">
                          <span>📖 DSM 臨床觀察判斷與依據</span>
                          <small>（於做出選擇後解鎖分析）</small>
                        </div>
                        <span class="dsm-diary-saved-badge">📔 已收錄至過往相處日記</span>
                      </div>

                      <div class="dsm-panel-body">
                        <p class="dsm-psych-analysis">${lastChoiceOutcome.psychNote}</p>
                        ${
                          lastChoiceOutcome.criterionBasis
                            ? `
                              <div class="dsm-criterion-basis-box">
                                <strong>📋 觀察依據【${lastChoiceOutcome.criterionBasis.title}】：</strong>
                                <p>${lastChoiceOutcome.criterionBasis.desc}</p>
                              </div>
                            `
                            : ''
                        }
                      </div>
                    </div>

                    <div class="vn-continue-row">
                      <button class="btn-vn-continue" data-action="next-node">
                        繼續下一段劇情 ▶
                      </button>
                    </div>
                  `
                  : node.choices && node.choices.length > 0
                  ? `
                    <div class="vn-choices-list">
                      <div class="choices-prompt">✨ 面對眼前的${char.name}，請選擇你的回應方式（做出選擇後將揭露對方反應與臨床觀察依據）：</div>
                      ${this.getChoiceOrder(node)
                        .map((origIdx, pos) => ({ ch: node.choices[origIdx], origIdx, pos }))
                        .map(
                          ({ ch, origIdx, pos }) => `
                            <button
                              class="vn-choice-btn"
                              data-action="select-choice"
                              data-choice-index="${origIdx}"
                            >
                              <span class="choice-idx">${String.fromCharCode(65 + pos)}</span>
                              <span class="choice-text">${this.formatText(ch.text)}</span>
                            </button>
                          `
                        )
                        .join('')}
                    </div>
                  `
                  : `
                    <div class="vn-continue-row">
                      <button class="btn-vn-continue" data-action="next-node">
                        下一段對話 ▶
                      </button>
                    </div>
                  `
              }
            </div>

            <!-- 原本的戀愛相處提示改為「過往相處日記」（預設折疊，點擊可展開過往相處與 DSM 判斷紀錄） -->
            ${this.renderCharacterDiaryDrawer(char, cs, true)}
          </div>
        </div>
      </section>
    `;
  }

  renderDailyScene(char, cs, route, diag) {
    const { talk, picked, expression } = this.activeScene;
    return `
      <section class="vn-stage" style="--char-color: ${char.themeColor}">
        <div class="vn-top-bar">
          <div class="vn-loc-info">
            <span class="vn-chap-badge">甜蜜日常互動</span>
            <strong>🌸 ${talk.title}</strong>
          </div>
          <button class="nav-btn" data-action="exit-scene">↩ 返回</button>
        </div>

        <div class="vn-main-grid">
          <div class="vn-portrait-column">
            <div class="vn-portrait-frame">
              ${renderCharacterSVG(char, expression || 'smile', 'portrait')}
              <div class="vn-emotion-tag">
                ✨ 當下神情：${this.getEmotionLabel(expression || 'smile')}
              </div>
            </div>
            <div class="vn-ecg-box">
              <div class="ecg-header">
                <span>💓 當下羈絆數值</span>
                <span class="route-pill ${route.badgeClass}">${route.label}</span>
              </div>
              <div class="vn-live-stats">
                <span>💗 心動 <strong>${cs.affection}</strong></span>
                <span>🛡️ 安全 <strong>${cs.security}</strong></span>
                <span>🧭 邊界 <strong>${cs.boundary}</strong></span>
              </div>
            </div>
          </div>

          <div class="vn-dialogue-column">
            <div class="vn-dialogue-box">
              <div class="speaker-banner">
                <span class="speaker-name">${char.name}・專屬日常時光</span>
              </div>
              <div class="dialogue-text">
                <p>${this.formatText(talk.prompt)}</p>
                ${talk.response ? `<p>${this.formatText(talk.response)}</p>` : ''}
                ${
                  picked
                    ? `<p style="color:#f5d0fe;">💬 你：${this.formatText(picked.text)}</p><p>💖 ${this.formatText(picked.reply)}</p>`
                    : ''
                }
              </div>
              ${
                picked
                  ? `
                <div class="outcome-dsm-judgment-panel">
                  <div class="dsm-panel-header">
                    <div class="dsm-panel-title"><span>📖 DSM 臨床觀察判斷</span><small>（做出選擇後揭露，已收錄至日記）</small></div>
                  </div>
                  <div class="dsm-panel-body"><p>${this.maskUndiagnosedText(picked.psychNote || '', char.id)}</p></div>
                </div>
                <div class="outcome-deltas" style="margin: 16px 0;">${this.formatStatDeltas(picked.stats)}</div>
                <button class="btn-vn-continue" data-action="next-node">完成日常互動 ▶</button>`
                  : `
                <div class="vn-choices-list">
                  <div class="choices-prompt">✨ 你會怎麼回應？</div>
                  ${this.getChoiceOrder(talk)
                    .map((origIdx, pos) => ({ ch: talk.choices[origIdx], origIdx, pos }))
                    .map(
                      ({ ch, origIdx, pos }) => `
                    <button class="vn-choice-btn" data-action="daily-choice" data-choice-index="${origIdx}">
                      <span class="choice-idx">${String.fromCharCode(65 + pos)}</span>
                      <span class="choice-text">${this.formatText(ch.text)}</span>
                    </button>`
                    )
                    .join('')}
                </div>`
              }
            </div>

            ${this.renderCharacterDiaryDrawer(char, cs, true)}
          </div>
        </div>
      </section>
    `;
  }

  renderEndingScene(char, cs, route, diag) {
    const { endingKey, endingData, expression } = this.activeScene;
    const lore = CHARACTER_EXTENDED_LORE[char.id];
    const mode = this.activeScene.endingMode || this.endingViewMode || 'romantic';
    const rawStoryText =
      mode === 'soulmate' && endingData.soulmateText ? endingData.soulmateText : endingData.romanticText;
    const storyText = this.formatText(rawStoryText);

    const badgeColors = {
      trueEnd: '#ec4899',
      codependentEnd: '#a855f7',
      triggerEnd: '#e11d48',
      normalEnd: '#64748b'
    };

    return `
      <section class="vn-stage ending-stage" style="--char-color: ${char.themeColor}">
        <div class="vn-top-bar">
          <div class="vn-loc-info">
            <span class="vn-chap-badge" style="background:${badgeColors[endingKey]}">E15 命定結局＆養成真相全解鎖</span>
            <strong>${char.name} — ${char.dsmTitle} (${char.dsmCode})</strong>
          </div>
          <button class="nav-btn" data-action="exit-scene">↩ 返回</button>
        </div>

        <div class="vn-main-grid">
          <div class="vn-portrait-column">
            <div class="vn-portrait-frame">
              ${renderCharacterSVG(char, expression, 'portrait')}
              <div class="vn-emotion-tag">
                ✨ 當下神情：${this.getEmotionLabel(expression)}
              </div>
            </div>
            <div class="vn-ecg-box">
              <div class="ecg-header">
                <span>最終羈絆結算</span>
                <span class="route-pill ${route.badgeClass}">${route.label}</span>
              </div>
              <div class="vn-live-stats">
                <span>💗 心動 <strong>${cs.affection}</strong></span>
                <span>🛡️ 安全 <strong>${cs.security}</strong></span>
                <span>🧭 邊界 <strong>${cs.boundary}</strong></span>
              </div>
            </div>
          </div>

          <div class="vn-dialogue-column">
            <div class="vn-dialogue-box ending-card">
              <div class="ending-header" style="border-left-color: ${badgeColors[endingKey]}">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px;">
                  <div>
                    <h2>${endingData.title}</h2>
                    <p class="ending-sub">${endingData.subtitle}</p>
                  </div>
                  ${
                    endingData.soulmateText
                      ? `<div class="ending-switch-btns">
                           <button class="btn-end-tab ${mode === 'romantic' ? 'active' : ''}" data-action="switch-ending-mode" data-mode="romantic">💘 浪漫戀人結局</button>
                           <button class="btn-end-tab ${mode === 'soulmate' ? 'active' : ''}" data-action="switch-ending-mode" data-mode="soulmate">🌙 靈魂知己結局</button>
                         </div>`
                      : ''
                  }
                </div>
              </div>

              <div class="dialogue-text ending-body">
                ${storyText}
              </div>

              <div class="ending-clinical-box">
                <strong>🥇 臨床診斷檔案：【${char.dsmTitle} (${char.dsmTitleEn}, ${char.dsmCode})】</strong>
                <p style="margin-top:6px;">${char.clinicalOverview}</p>
                <p style="margin-top:8px; color:#f5d0fe;">${char.differentialNote}</p>
                <hr style="border-color:rgba(253,224,165,0.25); margin:10px 0;" />
                <strong>👑 成長背景與人格疾患養成故事：${lore.growthBackstory.title}</strong>
                <p style="margin-top:6px;">${lore.growthBackstory.story}</p>
              </div>

              <div class="ending-switcher">
                <span>切換體驗本角色全部 4 種結局分支：</span>
                <div class="ending-switch-btns">
                  <button type="button" class="btn-end-tab ${endingKey === 'trueEnd' ? 'active' : ''}" data-action="show-ending" data-char-id="${char.id}" data-ending-key="trueEnd">
                    💖 True End (健康相愛)
                  </button>
                  <button type="button" class="btn-end-tab ${endingKey === 'codependentEnd' ? 'active' : ''}" data-action="show-ending" data-char-id="${char.id}" data-ending-key="codependentEnd">
                    🥀 Codependent (沉溺共依存)
                  </button>
                  <button type="button" class="btn-end-tab ${endingKey === 'triggerEnd' ? 'active' : ''}" data-action="show-ending" data-char-id="${char.id}" data-ending-key="triggerEnd">
                    💔 Trigger End (心碎決裂)
                  </button>
                  <button type="button" class="btn-end-tab ${endingKey === 'normalEnd' ? 'active' : ''}" data-action="show-ending" data-char-id="${char.id}" data-ending-key="normalEnd">
                    🍃 Normal End (平行線)
                  </button>
                </div>
              </div>

              <div class="vn-continue-row" style="margin-top:18px;">
                <button class="btn-vn-continue" data-action="exit-scene">
                  返回公寓繼續邂逅其他角色 ▶
                </button>
              </div>
            </div>

            ${this.renderCharacterDiaryDrawer(char, cs, true)}
          </div>
        </div>
      </section>
    `;
  }

  // ==================== 側邊懸浮小工具：隨時叫出 DSM-5-TR 人格疾患診斷準則手冊 ====================
  scrollToDsmRef(code) {
    if (!code) return;
    setTimeout(() => {
      const el = document.getElementById(`dsm-ref-${code}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        el.classList.add('dsm-ref-highlight');
        setTimeout(() => el.classList.remove('dsm-ref-highlight'), 1800);
      }
    }, 60);
  }

  renderDsmReferenceTab() {
    const list = CHARACTERS.map((c) => ({ code: c.dsmCode, title: c.dsmTitle, en: c.dsmTitleEn, cluster: c.cluster }));
    const seen = new Set();
    const uniq = list.filter((d) => (seen.has(d.code) ? false : seen.add(d.code)));
    return `
      <div class="dsm-ref-index">
        <div class="dsm-criteria-section-title"><span>📚 點選診斷，直接跳到準則列點</span></div>
        <div class="dsm-ref-chips">
          ${uniq
            .map(
              (d) => `<button class="dsm-ref-chip" data-action="jump-dsm-ref" data-code="${d.code}"><strong>${d.code}</strong><span>${d.title}</span></button>`
            )
            .join('')}
        </div>
      </div>
      ${uniq
        .map((d) => {
          const ref = DSM_REFERENCE[d.code];
          if (!ref) return '';
          return `
            <div class="dsm-ref-block" id="dsm-ref-${d.code}">
              <h4>${d.title} <small>${d.code}</small></h4>
              <p class="dsm-ref-en">${d.en}</p>
              <p>${ref.intro}</p>
              <p class="dsm-ref-lead"><strong>${ref.lead}</strong></p>
              <ul class="dsm-ref-list">${ref.criteria.map((c) => `<li>${c}</li>`).join('')}</ul>
              ${ref.note ? `<p class="dsm-ref-note">📝 ${ref.note}</p>` : ''}
              <button class="dsm-ref-top" data-action="jump-dsm-ref" data-code="${uniq[0].code}">↑ 回到第一項</button>
            </div>`;
        })
        .join('')}
      <p class="dsm-ref-disclaimer">※ 以上為 DSM-5-TR 準則的中文意譯整理，僅供遊戲內學習參考，不能用於真實診斷。</p>
    `;
  }

  renderSideDsmCriteriaWidget() {
    const selectedCharId = this.dsmWidgetCharId || this.activeScene?.charId || 'shen_mo';
    const char = CHARACTERS.find((c) => c.id === selectedCharId) || CHARACTERS[0];
    const cs = this.state.characters[char.id];
    const diag = this.getDiagnosisDisplay(char);
    const totalUnlockedClues = CHARACTERS.reduce(
      (acc, c) => acc + (this.state.characters[c.id]?.unlockedCriteria?.length || 0),
      0
    );
    const totalClues = CHARACTERS.reduce((acc, c) => acc + c.criteria.length, 0);

    return `
      <aside class="dsm-side-widget-container ${this.dsmWidgetOpen ? 'is-open' : ''}">
        <!-- 右側固定貼邊呼出把手（點擊可隨時展開／收合） -->
        <button
          class="dsm-side-launcher-tab"
          data-action="toggle-dsm-widget"
          title="點擊展開／收合 DSM-5-TR 人格疾患準則隨身小工具"
        >
          <span class="launcher-icon">📖</span>
          <span class="launcher-text">人格疾患準則</span>
          <span class="launcher-badge">${totalUnlockedClues}/${totalClues}</span>
        </button>

        <!-- 側邊滑出式準則抽屜面板 -->
        <div class="dsm-side-drawer">
          <div class="dsm-drawer-header">
            <div>
              <h3>📖 DSM-5-TR 人格疾患準則小工具</h3>
              <p>隨時對照 12 種人格疾患診斷準則與目前已觀察到的行為線索</p>
            </div>
            <button class="btn-close" data-action="close-dsm-widget" title="收合小工具">✕</button>
          </div>

          <!-- 切換頁籤：各角色診斷準則核對 vs DSM-5-TR 通用準則＆四大類群 -->
          <div class="dsm-drawer-tabs">
            <button
              class="dsm-tab-btn ${this.dsmWidgetTab === 'criteria' ? 'active' : ''}"
              data-action="switch-dsm-widget-tab"
              data-tab="criteria"
            >
              📋 12 角色與診斷準則 (${totalUnlockedClues}/${totalClues})
            </button>
            <button
              class="dsm-tab-btn ${this.dsmWidgetTab === 'ref' ? 'active' : ''}"
              data-action="switch-dsm-widget-tab"
              data-tab="ref"
            >
              📚 診斷準則列點
            </button>
            <button
              class="dsm-tab-btn ${this.dsmWidgetTab === 'general' ? 'active' : ''}"
              data-action="switch-dsm-widget-tab"
              data-tab="general"
            >
              📖 DSM-5-TR 通用定義＆類群
            </button>
          </div>

          <div class="dsm-drawer-body">
            ${
              this.dsmWidgetTab === 'ref'
                ? this.renderDsmReferenceTab()
                : this.dsmWidgetTab === 'general'
                ? `
                  <div class="dsm-general-guide">
                    <div class="dsm-guide-card">
                      <h4>📌 一般人格障礙症通用診斷準則 (General PD Criteria)</h4>
                      <ul class="dsm-guide-list">
                        <li><strong>準則 A（核心偏離）</strong>：內在經驗與行為模式顯著偏離其文化預期，且表現在以下<strong>至少兩個領域</strong>：
                          <ol>
                            <li><strong>認知 (Cognition)</strong>：對自己、他人及事件的知覺與解讀方式。</li>
                            <li><strong>情感 (Affectivity)</strong>：情緒反應的範圍、強度、易變性及適切性。</li>
                            <li><strong>人際功能 (Interpersonal functioning)</strong>：與他人建立親密與界線的模式。</li>
                            <li><strong>衝動控制 (Impulse control)</strong>：對行為衝動的調節能力。</li>
                          </ol>
                        </li>
                        <li><strong>準則 B（僵化與廣泛性）</strong>：此持久模式在廣泛的個人與社交情境中皆缺乏彈性且普遍存在。</li>
                        <li><strong>準則 C（臨床苦惱或損害）</strong>：引起具臨床意義的苦惱，或損害社交、職業及其他重要功能領域。</li>
                        <li><strong>準則 D（長期穩定）</strong>：模式穩定且歷時長久，其發病至少可追溯至青少年期或成年早期。</li>
                      </ul>
                    </div>

                    <div class="dsm-guide-card">
                      <h4>🧭 DSM-5-TR 四大類群 (Clusters) 分類速覽</h4>
                      ${Object.values(CLUSTERS)
                        .map(
                          (cl) => `
                            <div class="dsm-cluster-item" style="border-left-color: ${cl.color}">
                              <strong style="color: ${cl.color}">${cl.name}</strong>
                              <p>${cl.desc}</p>
                            </div>
                          `
                        )
                        .join('')}
                    </div>
                  </div>
                `
                : `
                  <!-- 12 位角色快速切換膠囊列 -->
                  <div class="dsm-char-pills">
                    ${CHARACTERS.map((c) => {
                      const cState = this.state.characters[c.id];
                      const isDiag = this.isDiagnosed(c.id);
                      const isCurScene = this.activeScene?.charId === c.id;
                      return `
                        <button
                          class="dsm-char-pill ${c.id === char.id ? 'active' : ''} ${isDiag ? 'diagnosed' : ''}"
                          data-action="select-dsm-widget-char"
                          data-char-id="${c.id}"
                        >
                          <img src="./assets/characters/${c.id}.png" alt="${c.name}" />
                          <div class="dsm-pill-meta">
                            <strong>#${c.number} ${c.name} ${isCurScene ? '💬' : ''}</strong>
                            <small>${isDiag ? `🥇 ${c.dsmCode}` : `線索 ${cState.unlockedCriteria.length}/${c.criteria.length}`}</small>
                          </div>
                        </button>
                      `;
                    }).join('')}
                  </div>

                  <!-- 當前選中角色的診斷準則詳情 -->
                  <div class="dsm-selected-char-box" style="--char-color: ${char.themeColor}">
                    <div class="dsm-char-head">
                      <img src="./assets/characters/${char.id}.png" alt="${char.name}" class="dsm-char-thumb" />
                      <div>
                        <div class="dsm-char-title-row">
                          <strong>#${char.number} ${char.name}</strong>
                          <span class="dsm-status-tag ${diag.diagnosed ? 'unlocked' : 'locked'}">
                            ${diag.diagnosed ? `🥇 已確診：${char.dsmCode}` : `🔍 觀察中 (${cs.unlockedCriteria.length}/${char.criteria.length})`}
                          </span>
                        </div>
                        <p class="dsm-disorder-name">
                          ${
                            diag.diagnosed
                              ? `<span role="button" tabindex="0" class="dsm-ref-link" data-action="open-dsm-ref" data-code="${char.dsmCode}">${char.dsmTitle} (${char.dsmTitleEn}) 🔗 查看準則</span>`
                              : '🔒 真實人格疾患名稱將於集滿下方準則並完成 E12 後揭曉'
                          }
                        </p>
                      </div>
                    </div>

                    <!-- 核心診斷準則核對清單 -->
                    <div class="dsm-criteria-section-title">
                      <span>📋 DSM-5-TR 核心診斷準則核對表</span>
                      <small>做出劇情選擇後即可解鎖對應準則</small>
                    </div>

                    <div class="dsm-criteria-checklist">
                      ${char.criteria
                        .map((cr, idx) => {
                          const isUnlocked = cs.unlockedCriteria.includes(cr.id);
                          return `
                            <div class="dsm-crit-card ${isUnlocked ? 'unlocked' : 'locked'}">
                              <div class="dsm-crit-top">
                                <span class="dsm-crit-code">${cr.code}</span>
                                <strong>${isUnlocked ? `✅ ${cr.title}` : `🔒 待觀察準則 #${idx + 1}（${cr.code}）`}</strong>
                              </div>
                              <p class="dsm-crit-desc">
                                ${
                                  isUnlocked
                                    ? this.maskUndiagnosedText(cr.desc, char.id)
                                    : '尚未在互動中觀察到此項行為依據。推進與該角色的跨地點事件並做出選擇後即可記錄。'
                                }
                              </p>
                            </div>
                          `;
                        })
                        .join('')}
                    </div>

                    <!-- 臨床概覽與鑑別診斷（已確診時完整顯示，未確診時顯示去標籤化觀察摘要） -->
                    <div class="dsm-clinical-notes-box">
                      <div class="dsm-note-item">
                        <strong>🔬 臨床核心特徵 (Criterion A 概覽)：</strong>
                        <p>${this.maskUndiagnosedText(char.clinicalOverview, char.id)}</p>
                      </div>
                      <div class="dsm-note-item">
                        <strong>⚖️ 臨床鑑別診斷重點 (Differential Diagnosis)：</strong>
                        <p>${this.maskUndiagnosedText(char.differentialNote, char.id)}</p>
                      </div>
                    </div>
                  </div>
                `
            }
          </div>
        </div>
      </aside>
    `;
  }

  renderSaveModal() {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return;

    const achSummary = this.getTotalAchievementsCount();
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
              <p>所有進度皆即時保存在瀏覽器 Session / LocalStorage 中，下次打開網頁會自動接續！</p>
            </div>
            <button type="button" class="btn-close" data-action="close-modal" aria-label="關閉">✕</button>
          </div>

          <div class="modal-body save-slots-list">
            <div class="save-slot-card" style="border-color:#f472b6;">
              <div>
                <strong style="color:#f9a8d4;">⚡ 瀏覽器自動接續記憶 (Session Auto-Resume)</strong>
                <p>主角：${this.state.player.name}｜已解鎖心靈成就 ${achSummary.unlocked}/${achSummary.total}</p>
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

            <div style="margin-top:8px; display:flex; justify-content:flex-end;">
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
      items.push(`<span class="delta-badge ${stats.affection > 0 ? 'pos' : 'neg'}">💗 心動親密 ${s}</span>`);
    }
    if (stats.security) {
      const s = stats.security > 0 ? `+${stats.security}` : stats.security;
      items.push(`<span class="delta-badge ${stats.security > 0 ? 'pos' : 'neg'}">🛡️ 安全感 ${s}</span>`);
    }
    if (stats.boundary) {
      const s = stats.boundary > 0 ? `+${stats.boundary}` : stats.boundary;
      items.push(`<span class="delta-badge ${stats.boundary > 0 ? 'pos' : 'neg'}">🧭 溫柔邊界 ${s}</span>`);
    }
    return items.join('');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const game = new EdgeOfLoveGame();
  game.init();
});
