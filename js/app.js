// 《愛的邊緣》(Edge of Love) — 核心遊戲狀態與漸進式 DSM-5-TR 診斷解鎖控制器

import { LOCATIONS, CLUSTERS, CHARACTERS } from './data/characters.js';
import { SCENARIOS_CLUSTER_A } from './data/scenarios_cluster_a.js';
import { SCENARIOS_CLUSTER_B } from './data/scenarios_cluster_b.js';
import { SCENARIOS_CLUSTER_C_OTHER } from './data/scenarios_cluster_c_other.js';
import { renderCharacterSVG } from './ui/avatarRenderer.js';
import { audio } from './ui/audioEngine.js';

const ALL_SCENARIOS = {
  ...SCENARIOS_CLUSTER_A,
  ...SCENARIOS_CLUSTER_B,
  ...SCENARIOS_CLUSTER_C_OTHER
};

const TIME_SLOTS = ['晨間 (Morning)', '午後 (Afternoon)', '深夜 (Midnight)'];
const STORAGE_KEY_AUTOSAVE = 'edge_of_love_browser_save_v2';
const STORAGE_KEY_SESSION = 'edge_of_love_session_save_v2';

class EdgeOfLoveGame {
  constructor() {
    this.state = this.getDefaultState();
    this.activeScene = null; // 當前進行中的劇本對話狀態
    this.selectedFilter = 'ALL'; // 'ALL' | 'DIAGNOSED' | 'OBSERVING'
    this.activeLocationId = 'rooftop';
    this.lastSavedTime = null;
  }

  getDefaultState() {
    const charState = {};
    CHARACTERS.forEach((c) => {
      charState[c.id] = {
        affection: c.initialStats.affection,
        security: c.initialStats.security,
        boundary: c.initialStats.boundary,
        chapterCompleted: 0, // 0..3
        unlockedCriteria: [], // 已觀察到的 DSM 準則 ID
        diagnosed: false, // 是否已達 DSM-5-TR 診斷標準並解鎖人格障礙名稱
        unlockedEndings: [],
        dailyTalkIndex: 0
      };
    });

    return {
      initialized: false,
      player: {
        name: '林予安',
        sex: 'female', // 'female' | 'male' | 'nonbinary'
        sexLabel: '生理女性／女性認同 (Female)',
        pronoun: '她',
        trait: 'balanced'
      },
      day: 1,
      timeSlotIndex: 0,
      characters: charState
    };
  }

  init() {
    // 優先從瀏覽器儲存空間（localStorage & sessionStorage）載入上次的遊玩進度
    const savedRaw =
      localStorage.getItem(STORAGE_KEY_AUTOSAVE) ||
      sessionStorage.getItem(STORAGE_KEY_SESSION) ||
      localStorage.getItem('edge_of_love_autosave');

    if (savedRaw) {
      try {
        const parsed = JSON.parse(savedRaw);
        const loadedState = parsed.state ? parsed.state : parsed;
        if (loadedState && loadedState.initialized && loadedState.characters) {
          this.state = this.migrateState(loadedState);
          if (parsed.activeScene) {
            this.activeScene = parsed.activeScene;
          }
          if (parsed.savedAt) {
            this.lastSavedTime = parsed.savedAt;
          }
        }
      } catch (_) {
        // 忽略損壞的舊存檔
      }
    }

    // 視窗關閉或切換前自動寫入瀏覽器 session / localStorage
    window.addEventListener('beforeunload', () => {
      if (this.state.initialized) {
        this.autoSave();
      }
    });

    this.bindGlobalEvents();
    this.render();
  }

  migrateState(loadedState) {
    const def = this.getDefaultState();
    CHARACTERS.forEach((c) => {
      if (!loadedState.characters[c.id]) {
        loadedState.characters[c.id] = def.characters[c.id];
      } else {
        const cs = loadedState.characters[c.id];
        if (!Array.isArray(cs.unlockedCriteria)) cs.unlockedCriteria = [];
        if (typeof cs.diagnosed !== 'boolean') {
          cs.diagnosed =
            cs.unlockedCriteria.length >= c.criteria.length && cs.chapterCompleted >= 3;
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
    this.showToast(`💾 已儲存至瀏覽器記憶槽 #${slotIndex}（下次開啟可直接讀取）`);
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
        this.activeScene = payload.activeScene || null;
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

  // 預設全員戀愛模式（所有角色對任何主角性別皆開放完整戀人攻略線）
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

  // 判斷角色是否已達診斷標準（必須收集滿該角色所有臨床特徵準則，才會正式揭曉人格障礙診斷！）
  isDiagnosed(charId) {
    const char = CHARACTERS.find((c) => c.id === charId);
    const cs = this.state.characters[charId];
    if (!char || !cs) return false;
    return Boolean(cs.diagnosed || cs.unlockedCriteria.length >= char.criteria.length);
  }

  // 取得角色目前的診斷顯示狀態（未達標準前隱藏人格障礙名稱與代碼）
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
        progressText: `✅ 已達診斷標準 (${count}/${total})`
      };
    }

    return {
      diagnosed: false,
      code: `觀察 ${count}/${total}`,
      title: count === 0 ? '？？？・心靈特質待觀察' : `？？？・已收集 ${count}/${total} 項特徵`,
      fullTitle:
        count === 0
          ? '【尚未評估】需透過劇情互動觀察其人際與情緒模式'
          : `【評估進行中：已觀察 ${count}/${total} 項準則】尚未達跨情境確診門檻`,
      clusterLabel: '未分類',
      badgeColor: '#475569',
      progressText: `🔍 診斷線索 ${count}/${total}`
    };
  }

  // 遮蔽尚未確診時的臨床筆記劇透詞彙
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
      .replace(/\(F60\.\d+\)|（F60\.\d+）|F60\.\d+|F21|F07\.0/g, '（臨床觀察紀錄）');
  }

  // 啟動新遊戲（從創角畫面）
  startNewGameFromForm() {
    const nameInput = document.getElementById('player-name-input');
    const sexSelect = document.getElementById('player-sex-select');
    const pronounInput = document.getElementById('player-pronoun-input');
    const traitSelect = document.getElementById('player-trait-select');

    const fresh = this.getDefaultState();
    fresh.initialized = true;
    fresh.player.name = (nameInput?.value || '林予安').trim() || '林予安';
    fresh.player.sex = sexSelect?.value || 'female';

    const sexLabels = {
      female: '生理女性／女性認同 (Female)',
      male: '生理男性／男性認同 (Male)',
      nonbinary: '非二元性別／跨性別／雙性人 (Non-binary / Queer)'
    };
    fresh.player.sexLabel = sexLabels[fresh.player.sex] || sexLabels.female;
    fresh.player.pronoun = (pronounInput?.value || '她').trim() || '她';
    fresh.player.trait = traitSelect?.value || 'balanced';

    // 根據初始特質給予所有角色微幅初始加成
    Object.keys(fresh.characters).forEach((cid) => {
      if (fresh.player.trait === 'empathy') {
        fresh.characters[cid].affection += 8;
      } else if (fresh.player.trait === 'stability') {
        fresh.characters[cid].security += 10;
      } else if (fresh.player.trait === 'boundary') {
        fresh.characters[cid].boundary += 10;
      }
    });

    this.state = fresh;
    this.activeScene = null;
    this.autoSave();
    audio.playSelect();
    this.render();
    this.showToast(`🔑 歡迎入住棲遲公寓，${this.state.player.name}！與房客互動以逐步解鎖他們的心靈真相。`);
  }

  advanceTime() {
    this.state.timeSlotIndex += 1;
    if (this.state.timeSlotIndex >= TIME_SLOTS.length) {
      this.state.timeSlotIndex = 0;
      this.state.day += 1;
    }
    this.autoSave();
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

  // 解鎖單一臨床特徵準則；當收集滿所有準則時，正式揭曉該角色的人格障礙診斷！
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
      if (currentCount >= total && !cs.diagnosed) {
        cs.diagnosed = true;
        audio.playUnlockDSM();
        this.showToast(
          `🧠 符合 DSM-5-TR 診斷標準！已正式解鎖【${char.name}】診斷：${char.dsmTitle} (${char.dsmCode})`
        );
      } else if (crit) {
        audio.playChime(660, 0.14);
        this.showToast(
          `🔍 觀察到【${char.name}】行為特徵：「${crit.title}」（診斷線索 ${currentCount}/${total}）`
        );
      }
      this.autoSave();
    }
    return newlyAdded;
  }

  // 依據完成的章節進度，確保對應階段的行為特徵準則被觀察並記錄（避免選不同對話分支時漏掉準則而卡住診斷解鎖）
  syncCriteriaByChapterProgress(charId, chapterIndexZeroBased) {
    const char = CHARACTERS.find((c) => c.id === charId);
    if (!char) return;
    const total = char.criteria.length;
    if (chapterIndexZeroBased === 0 && total >= 1) {
      // 第一章結束至少記錄第 1 項核心特徵
      this.unlockCriterion(charId, char.criteria[0].id);
    } else if (chapterIndexZeroBased === 1 && total >= 2) {
      // 第二章結束至少記錄前 2 項核心特徵（若共有 4 項則記錄前 3 項）
      this.unlockCriterion(charId, char.criteria[0].id);
      this.unlockCriterion(charId, char.criteria[1].id);
      if (total >= 4) {
        this.unlockCriterion(charId, char.criteria[2].id);
      }
    } else if (chapterIndexZeroBased >= 2) {
      // 第三章結束：完成長期跨情境觀察，解鎖所有準則並達成診斷標準！
      char.criteria.forEach((cr) => this.unlockCriterion(charId, cr.id));
    }
  }

  // 開始角色主線章節
  startChapter(charId, chapterNum = null) {
    const char = CHARACTERS.find((c) => c.id === charId);
    const scenario = ALL_SCENARIOS[charId];
    const cs = this.state.characters[charId];
    if (!char || !scenario || !cs) return;

    const targetChapIndex =
      chapterNum !== null ? chapterNum - 1 : Math.min(cs.chapterCompleted, scenario.chapters.length - 1);
    const chapter = scenario.chapters[targetChapIndex];
    if (!chapter) return;

    audio.playSelect();
    this.activeScene = {
      mode: 'chapter',
      charId,
      chapterIndex: targetChapIndex,
      chapter,
      nodeIndex: 0,
      expression: chapter.nodes[0]?.expression || 'neutral',
      awaitingNextAfterChoice: false,
      lastChoiceOutcome: null
    };

    if (chapter.nodes[0]?.unlockCriterion) {
      this.unlockCriterion(charId, chapter.nodes[0].unlockCriterion);
    }

    this.autoSave();
    this.render();
  }

  // 進行日常深度對話
  startDailyTalk(charId) {
    const char = CHARACTERS.find((c) => c.id === charId);
    const scenario = ALL_SCENARIOS[charId];
    const cs = this.state.characters[charId];
    if (!char || !scenario || !cs) return;

    const talks = scenario.dailyTalks || [];
    const talk = talks[cs.dailyTalkIndex % talks.length];
    cs.dailyTalkIndex += 1;

    this.applyStats(charId, talk.stats);
    this.advanceTime();
    audio.playSelect();

    this.activeScene = {
      mode: 'daily',
      charId,
      talk,
      expression: 'smile'
    };

    this.autoSave();
    this.render();
  }

  // 預覽或結算該角色的結局
  showEndingForCharacter(charId, forcedEndingKey = null) {
    const char = CHARACTERS.find((c) => c.id === charId);
    const scenario = ALL_SCENARIOS[charId];
    const cs = this.state.characters[charId];
    if (!char || !scenario || !cs) return;

    let endingKey = forcedEndingKey;
    if (!endingKey) {
      if (cs.security < 30 || cs.affection < 25) {
        endingKey = 'triggerEnd';
      } else if (cs.affection >= 50 && cs.boundary < 42) {
        endingKey = 'codependentEnd';
      } else if (cs.affection >= 58 && cs.security >= 52 && cs.boundary >= 48) {
        endingKey = 'trueEnd';
      } else {
        endingKey = 'normalEnd';
      }
    }

    if (!cs.unlockedEndings.includes(endingKey)) {
      cs.unlockedEndings.push(endingKey);
    }

    const isGood = endingKey === 'trueEnd' || endingKey === 'normalEnd';
    audio.playEndingChord(isGood);

    this.activeScene = {
      mode: 'ending',
      charId,
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

  // 處理劇本節點推進或選項點擊
  handleNextNode() {
    if (!this.activeScene) return;
    if (this.activeScene.mode === 'daily' || this.activeScene.mode === 'ending') {
      this.activeScene = null;
      this.autoSave();
      this.render();
      return;
    }

    const { charId, chapter, nodeIndex, awaitingNextAfterChoice, chapterIndex } = this.activeScene;
    if (awaitingNextAfterChoice) {
      this.activeScene.awaitingNextAfterChoice = false;
      this.activeScene.lastChoiceOutcome = null;
      if (nodeIndex + 1 < chapter.nodes.length) {
        this.activeScene.nodeIndex += 1;
        const nextNode = chapter.nodes[this.activeScene.nodeIndex];
        this.activeScene.expression = nextNode.expression || 'neutral';
        if (nextNode.unlockCriterion) {
          this.unlockCriterion(charId, nextNode.unlockCriterion);
        }
        this.autoSave();
        this.render();
      } else {
        // 章節完成，推進章節進度並同步解鎖該階段觀察到的臨床特徵
        const cs = this.state.characters[charId];
        if (cs.chapterCompleted <= chapterIndex) {
          cs.chapterCompleted = chapterIndex + 1;
        }
        this.syncCriteriaByChapterProgress(charId, chapterIndex);
        this.advanceTime();

        if (cs.chapterCompleted >= 3) {
          this.showEndingForCharacter(charId);
        } else {
          this.activeScene = null;
          this.autoSave();
          this.showToast(`✨ 已完成第 ${chapterIndex + 1} 章！距離解鎖完整心靈檔案更近一步。`);
          this.render();
        }
      }
      return;
    }

    const currentNode = chapter.nodes[nodeIndex];
    if (currentNode.choices && currentNode.choices.length > 0) {
      return;
    }

    if (nodeIndex + 1 < chapter.nodes.length) {
      this.activeScene.nodeIndex += 1;
      const nextNode = chapter.nodes[this.activeScene.nodeIndex];
      this.activeScene.expression = nextNode.expression || 'neutral';
      if (nextNode.unlockCriterion) {
        this.unlockCriterion(charId, nextNode.unlockCriterion);
      }
      audio.playChime(480, 0.06);
      this.autoSave();
      this.render();
    }
  }

  handleChoiceSelect(choiceIndex) {
    if (!this.activeScene || this.activeScene.mode !== 'chapter') return;
    const { charId, chapter, nodeIndex, chapterIndex } = this.activeScene;
    const currentNode = chapter.nodes[nodeIndex];
    const choice = currentNode?.choices?.[choiceIndex];
    if (!choice) return;

    this.applyStats(charId, choice.stats);

    if ((choice.stats?.security || 0) < -10) {
      audio.playTriggerWarning();
    } else {
      audio.playSelect();
    }

    if (choice.unlockCriterion) {
      this.unlockCriterion(charId, choice.unlockCriterion);
    }

    // 若是第三章最後一個選擇，同步觸發診斷完成，讓玩家在結算時看到正式診斷
    if (chapterIndex >= 2 && nodeIndex + 1 >= chapter.nodes.length) {
      this.syncCriteriaByChapterProgress(charId, chapterIndex);
    }

    this.activeScene.expression = choice.nextExpression || 'neutral';
    this.activeScene.awaitingNextAfterChoice = true;
    this.activeScene.lastChoiceOutcome = {
      reply: this.formatText(choice.reply),
      psychNote: this.maskUndiagnosedText(choice.psychNote, charId),
      stats: choice.stats
    };

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
    }, 3600);
  }

  bindGlobalEvents() {
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-action]');
      if (!target) return;
      const action = target.dataset.action;

      switch (action) {
        case 'start-new-game':
          this.startNewGameFromForm();
          break;
        case 'select-location':
          this.activeLocationId = target.dataset.locationId;
          audio.playChime(520, 0.06);
          this.render();
          break;
        case 'filter-roster':
          this.selectedFilter = target.dataset.filter;
          audio.playChime(520, 0.06);
          this.render();
          break;
        case 'start-chapter':
          this.startChapter(
            target.dataset.charId,
            target.dataset.chapter ? Number(target.dataset.chapter) : null
          );
          break;
        case 'start-daily':
          this.startDailyTalk(target.dataset.charId);
          break;
        case 'show-ending': {
          const cid = target.dataset.charId;
          const cs = this.state.characters[cid];
          if (!this.isDiagnosed(cid) && cs.chapterCompleted < 3) {
            this.showToast('🔒 請先推進並完成該角色的 3 章主線劇情，達診斷標準後即可解鎖結局與完整分析！');
            return;
          }
          this.showEndingForCharacter(cid, target.dataset.endingKey || null);
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
          this.renderCompendiumModal(target.dataset.charId || null);
          break;
        case 'open-save-modal':
          this.renderSaveModal();
          break;
        case 'save-slot':
          this.saveToSlot(Number(target.dataset.slot));
          break;
        case 'load-slot':
          this.loadFromSlot(Number(target.dataset.slot));
          break;
        case 'clear-all-saves':
          if (confirm('確定要清除瀏覽器內所有自動存檔與手動存檔，重新開始嗎？')) {
            localStorage.removeItem(STORAGE_KEY_AUTOSAVE);
            sessionStorage.removeItem(STORAGE_KEY_SESSION);
            localStorage.removeItem('edge_of_love_autosave');
            this.state = this.getDefaultState();
            this.activeScene = null;
            this.closeModals();
            this.render();
            this.showToast('已清除瀏覽器存檔並返回初始設定');
          }
          break;
        case 'reset-to-creator':
          if (confirm('要返回創角畫面修改主角資料嗎？（目前的攻略進度仍會保留在存檔槽中）')) {
            this.state.initialized = false;
            this.activeScene = null;
            this.render();
          }
          break;
        case 'toggle-audio': {
          const on = audio.toggle();
          this.render();
          this.showToast(on ? '🔊 心理音效已開啟' : '🔇 音效已靜音');
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

  // ==================== 畫面渲染 ====================
  render() {
    const appRoot = document.getElementById('app-root');
    if (!appRoot) return;

    if (!this.state.initialized) {
      appRoot.innerHTML = this.renderCharacterCreator();
      return;
    }

    if (this.activeScene) {
      appRoot.innerHTML = `
        ${this.renderTopNavbar()}
        ${this.renderActiveScene()}
      `;
      return;
    }

    appRoot.innerHTML = `
      ${this.renderTopNavbar()}
      <main class="hub-container">
        ${this.renderLocationExplorer()}
        ${this.renderCharacterRoster()}
      </main>
    `;
  }

  renderTopNavbar() {
    const totalCriteria = CHARACTERS.reduce((acc, c) => acc + c.criteria.length, 0);
    const unlockedCriteria = Object.values(this.state.characters).reduce(
      (acc, cs) => acc + cs.unlockedCriteria.length,
      0
    );
    const diagnosedCount = CHARACTERS.filter((c) => this.isDiagnosed(c.id)).length;

    return `
      <header class="top-navbar">
        <div class="brand-group">
          <span class="brand-logo">🫀</span>
          <div>
            <h1 class="brand-title">愛的邊緣 <span class="brand-sub">全員戀愛模式</span></h1>
            <p class="brand-meta">
              主角：<strong>${this.state.player.name}</strong>（${this.state.player.sexLabel}・代名詞「${this.state.player.pronoun}」）
              ｜ Day ${this.state.day}・${TIME_SLOTS[this.state.timeSlotIndex]}
              ${this.lastSavedTime ? `｜ <span style="color:#34d399;">✓ 瀏覽器已自動存檔 (${this.lastSavedTime})</span>` : ''}
            </p>
          </div>
        </div>

        <div class="nav-actions">
          <div class="stat-pill" title="達成診斷標準並解鎖人格障礙名稱之角色數">
            <span>🧠 已解鎖診斷</span>
            <strong>${diagnosedCount} / 12 人</strong>
          </div>
          <button class="nav-btn btn-accent" data-action="open-compendium">
            📖 心靈檔案館 (線索 ${unlockedCriteria}/${totalCriteria})
          </button>
          <button class="nav-btn" data-action="open-save-modal">
            💾 存檔 / 讀檔
          </button>
          <button class="nav-btn" data-action="toggle-audio">
            ${audio.enabled ? '🔊' : '🔇'}
          </button>
          <button class="nav-btn" data-action="reset-to-creator" title="修改主角設定">
            ⚙️ 主角設定
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
            <span class="creator-badge">PSYCHOLOGICAL ROMANCE & MYSTERY SIMULATOR</span>
            <h1>《愛的邊緣》Edge of Love</h1>
            <p>
              你作為新任社區協調員搬進了「棲遲公寓」，這裡住著 12 位性格鮮明、各具魅力的房客。<br/>
              他們每個人在親密關係中都有著不為人知的防衛機制與心靈傷痕——<strong>最初你並不知道他們背負著什麼人格特質</strong>，唯有透過相處與跨情境觀察，累積符合診斷標準的線索，才能揭開他們真正的心靈檔案。
            </p>
          </div>

          <div class="creator-form">
            <div class="form-row">
              <label for="player-name-input">1. 主角姓名</label>
              <input id="player-name-input" type="text" value="${this.state.player.name}" maxlength="16" placeholder="輸入你的名字" />
            </div>

            <div class="form-row">
              <label for="player-sex-select">2. 主角性別設定（預設全員戀愛模式：可與全部 12 位角色發展戀愛關係）</label>
              <select id="player-sex-select" onchange="document.getElementById('player-pronoun-input').value = this.value === 'male' ? '他' : this.value === 'nonbinary' ? 'TA' : '她'">
                <option value="female">♀ 生理女性／女性認同 (Female)</option>
                <option value="male">♂ 生理男性／男性認同 (Male)</option>
                <option value="nonbinary">⚧ 非二元性別／跨性別／雙性人 (Non-binary / Intersex / Queer)</option>
              </select>
            </div>

            <div class="form-row">
              <label for="player-pronoun-input">3. 自訂人稱代名詞</label>
              <input id="player-pronoun-input" type="text" value="她" maxlength="6" placeholder="她 / 他 / TA / 祂" />
            </div>

            <div class="form-row">
              <label for="player-trait-select">4. 初始心理特質傾向（全角色初始數值加成）</label>
              <select id="player-trait-select">
                <option value="balanced">⚖️ 均衡觀察者（親密、安全感、邊界平均發展）</option>
                <option value="empathy">💗 高共情傾聽者（全角色初始【親密度 +8】，更容易拉近距離）</option>
                <option value="stability">🛡️ 情緒穩定錨點（全角色初始【安全感 +10】，不易觸發防衛崩潰）</option>
                <option value="boundary">🧭 清晰邊界守護者（全角色初始【健康邊界 +10】，防範病態共依存）</option>
              </select>
            </div>

            <div class="creator-preview-grid">
              <div class="preview-cluster-box" style="border-color:#818cf8">
                <strong>🌙 天台觀星閣</strong>
                <span>#01 沈墨（獨立調查記者）<br/>#02 林見微（天文館觀測員）<br/><em>心靈特質：？？？</em></span>
              </div>
              <div class="preview-cluster-box" style="border-color:#f43f5e">
                <strong>🎨 微光藝術工坊＆古著店</strong>
                <span>#03 星野琉璃（占星古著店主）<br/>#05 蘇緋（新銳插畫家）<br/>#11 陸晴嵐（金繼陶藝家）</span>
              </div>
              <div class="preview-cluster-box" style="border-color:#34d399">
                <strong>☕ 邊界咖啡＆古籍法醫室</strong>
                <span>#08 溫言（古籍修復師）<br/>#09 白小鹿（甜點屋學徒）<br/>#10 紀嚴（法醫）｜#12 游子謙（店長）</span>
              </div>
              <div class="preview-cluster-box" style="border-color:#f59e0b">
                <strong>🍸 失重酒吧＆雲端事務所</strong>
                <span>#04 韓梟（地下調酒師）<br/>#06 夏樂（實驗劇場演員）<br/>#07 顧傾城（建築事務所合夥人）</span>
              </div>
            </div>

            <button class="btn-primary-large" data-action="start-new-game">
              🔑 簽署入住契約，踏入《愛的邊緣》
            </button>
          </div>
        </div>
      </section>
    `;
  }

  renderLocationExplorer() {
    const activeLoc = LOCATIONS.find((l) => l.id === this.activeLocationId) || LOCATIONS[0];
    const charsHere = CHARACTERS.filter((c) => activeLoc.characters.includes(c.id));

    return `
      <section class="location-panel">
        <div class="panel-header">
          <div>
            <h2>🗺️ 棲遲公寓＆街區探索地圖</h2>
            <p>拜訪各場所的房客。隨著劇情推進收集行為線索，當符合 DSM-5-TR 診斷標準時將自動揭曉其人格特質。</p>
          </div>
        </div>

        <div class="location-tabs">
          ${LOCATIONS.map(
            (loc) => `
              <button
                class="loc-tab ${loc.id === activeLoc.id ? 'active' : ''}"
                data-action="select-location"
                data-location-id="${loc.id}"
              >
                <span class="loc-icon">${loc.icon}</span>
                <div class="loc-tab-text">
                  <strong>${loc.name}</strong>
                  <small>${loc.characters.length} 位房客在此</small>
                </div>
              </button>
            `
          ).join('')}
        </div>

        <div class="active-location-stage">
          <div class="loc-stage-info">
            <h3>${activeLoc.icon} ${activeLoc.name}</h3>
            <p>${activeLoc.desc}</p>
          </div>
          <div class="loc-char-cards">
            ${charsHere
              .map((char) => {
                const cs = this.state.characters[char.id];
                const diag = this.getDiagnosisDisplay(char);
                const route = this.getRouteType(char);
                return `
                  <div class="loc-char-spot" style="--char-color: ${char.themeColor}">
                    <div class="loc-char-avatar">
                      ${renderCharacterSVG(char, 'neutral', 'mini')}
                    </div>
                    <div class="loc-char-detail">
                      <div class="loc-char-top">
                        <span class="char-num">#${char.number}</span>
                        <strong>${char.name}</strong>
                        <span class="dsm-tag ${diag.diagnosed ? 'diag-unlocked' : 'diag-locked'}">
                          ${diag.title}
                        </span>
                      </div>
                      <p class="char-quote">${char.tagline}</p>
                      <div class="loc-char-meta">
                        <span>${char.occupation}</span>
                        <span>・${char.genderLabel}</span>
                        <span class="route-pill ${route.badgeClass}">${route.label}</span>
                      </div>
                      <div class="loc-char-buttons">
                        <button class="btn-action-primary" data-action="start-chapter" data-char-id="${char.id}">
                          ${cs.chapterCompleted < 3 ? `▶ 進行第 ${cs.chapterCompleted + 1} 章劇情` : '🔄 重溫劇情'}
                        </button>
                        <button class="btn-action-secondary" data-action="start-daily" data-char-id="${char.id}">
                          💬 日常互動
                        </button>
                      </div>
                    </div>
                  </div>
                `;
              })
              .join('')}
          </div>
        </div>
      </section>
    `;
  }

  renderCharacterRoster() {
    let filteredChars = CHARACTERS;
    if (this.selectedFilter === 'DIAGNOSED') {
      filteredChars = CHARACTERS.filter((c) => this.isDiagnosed(c.id));
    } else if (this.selectedFilter === 'OBSERVING') {
      filteredChars = CHARACTERS.filter((c) => !this.isDiagnosed(c.id));
    }

    const diagnosedCount = CHARACTERS.filter((c) => this.isDiagnosed(c.id)).length;
    const observingCount = CHARACTERS.length - diagnosedCount;

    return `
      <section class="roster-panel">
        <div class="panel-header roster-header">
          <div>
            <h2>🗂️ 12 位可攻略房客名冊</h2>
            <p>未達診斷標準前，角色的人格障礙名稱將保持隱藏（？？？）。完成互動並收集滿診斷準則即可揭曉！</p>
          </div>

          <div class="cluster-filters">
            <button class="filter-btn ${this.selectedFilter === 'ALL' ? 'active' : ''}" data-action="filter-roster" data-filter="ALL">
              全部房客 (12)
            </button>
            <button class="filter-btn ${this.selectedFilter === 'OBSERVING' ? 'active' : ''}" data-action="filter-roster" data-filter="OBSERVING">
              🔍 觀察中・未確診 (${observingCount})
            </button>
            <button class="filter-btn ${this.selectedFilter === 'DIAGNOSED' ? 'active' : ''}" data-action="filter-roster" data-filter="DIAGNOSED">
              🧠 已解鎖診斷 (${diagnosedCount})
            </button>
          </div>
        </div>

        <div class="roster-grid">
          ${
            filteredChars.length > 0
              ? filteredChars.map((char) => this.renderCharacterCard(char)).join('')
              : `<div style="grid-column: 1/-1; text-align:center; padding: 36px; color:#94a3b8;">目前尚無符合此篩選條件的角色，快去推進劇情觀察房客吧！</div>`
          }
        </div>
      </section>
    `;
  }

  renderCharacterCard(char) {
    const cs = this.state.characters[char.id];
    const route = this.getRouteType(char);
    const diag = this.getDiagnosisDisplay(char);

    return `
      <article class="char-card" style="--char-color: ${char.themeColor}">
        <div class="char-card-top">
          <div class="char-mini-portrait">
            ${renderCharacterSVG(char, cs.affection >= 55 ? 'smile' : 'neutral', 'mini')}
            <span class="cluster-badge" style="background:${diag.badgeColor}">
              ${diag.code}
            </span>
          </div>

          <div class="char-head-info">
            <div class="char-title-row">
              <span class="char-number">#${char.number}</span>
              <h3>${char.name} <small>${char.enName}</small></h3>
            </div>
            <div class="char-dsm-name ${diag.diagnosed ? '' : 'undiscovered-dsm'}">
              ${diag.fullTitle}
            </div>
            <div class="char-occ">${char.occupation}｜${char.age} 歲</div>
            <div class="char-tags-row">
              <span class="gender-tag">${char.genderLabel}</span>
              <span class="orient-tag">${char.orientationLabel}</span>
              <span class="route-pill ${route.badgeClass}">${route.label}</span>
            </div>
          </div>
        </div>

        <p class="char-bio">${char.shortBio}</p>

        <!-- 三維心理關係數值條 -->
        <div class="stats-bars">
          <div class="stat-row">
            <div class="stat-label"><span>💗 親密度 (Affection)</span><strong>${cs.affection}%</strong></div>
            <div class="stat-track"><div class="stat-fill fill-affection" style="width:${cs.affection}%"></div></div>
          </div>
          <div class="stat-row">
            <div class="stat-label"><span>🛡️ 安全感 (Security)</span><strong>${cs.security}%</strong></div>
            <div class="stat-track"><div class="stat-fill fill-security" style="width:${cs.security}%"></div></div>
          </div>
          <div class="stat-row">
            <div class="stat-label"><span>🧭 健康邊界 (Boundary)</span><strong>${cs.boundary}%</strong></div>
            <div class="stat-track"><div class="stat-fill fill-boundary" style="width:${cs.boundary}%"></div></div>
          </div>
        </div>

        <div class="chapter-progress-row">
          <span>劇情觀察：</span>
          <div class="chap-pills">
            ${[1, 2, 3]
              .map(
                (num) => `
                  <button
                    class="chap-pill ${cs.chapterCompleted >= num ? 'done' : cs.chapterCompleted + 1 === num ? 'current' : ''}"
                    data-action="start-chapter"
                    data-char-id="${char.id}"
                    data-chapter="${num}"
                    title="進行第 ${num} 章"
                  >
                    Ch.${num}
                  </button>
                `
              )
              .join('')}
          </div>
          <span class="criteria-count">${diag.progressText}</span>
        </div>

        <div class="char-card-actions">
          <button class="btn-card-main" data-action="start-chapter" data-char-id="${char.id}">
            ${cs.chapterCompleted < 3 ? `▶ 推進主線 (第 ${cs.chapterCompleted + 1} 章)` : '✨ 再次體驗主線'}
          </button>
          <button class="btn-card-sub" data-action="start-daily" data-char-id="${char.id}">
            ☕ 日常深聊
          </button>
          <button class="btn-card-sub" data-action="show-ending" data-char-id="${char.id}" title="完成3章達診斷標準後可檢視結局">
            ${diag.diagnosed || cs.chapterCompleted >= 3 ? '🎬 戀愛結局' : '🔒 結局未解鎖'}
          </button>
          <button class="btn-card-icon" data-action="open-compendium" data-char-id="${char.id}" title="查看目前已收集的行為觀察線索">
            📋
          </button>
        </div>
      </article>
    `;
  }

  // ==================== 視覺小說對話與結局舞台 ====================
  renderActiveScene() {
    const { charId, mode, expression } = this.activeScene;
    const char = CHARACTERS.find((c) => c.id === charId);
    const cs = this.state.characters[charId];
    const route = this.getRouteType(char);
    const diag = this.getDiagnosisDisplay(char);

    if (mode === 'ending') {
      return this.renderEndingScene(char, cs, route, diag);
    }

    if (mode === 'daily') {
      return this.renderDailyScene(char, cs, route, diag);
    }

    // 主線章節對話
    const { chapter, nodeIndex, awaitingNextAfterChoice, lastChoiceOutcome } = this.activeScene;
    const node = chapter.nodes[nodeIndex];

    return `
      <section class="vn-stage" style="--char-color: ${char.themeColor}">
        <div class="vn-top-bar">
          <div class="vn-loc-info">
            <span class="vn-chap-badge">${chapter.title}</span>
            <strong>📍 ${chapter.location}</strong>
            <small>🎧 ${chapter.ambience}</small>
          </div>
          <div class="vn-top-buttons">
            <button class="nav-btn" data-action="open-compendium" data-char-id="${char.id}">
              📋 觀察紀錄 (${cs.unlockedCriteria.length}/${char.criteria.length})
            </button>
            <button class="nav-btn" data-action="exit-scene">
              ↩ 返回公寓地圖
            </button>
          </div>
        </div>

        <div class="vn-main-grid">
          <!-- 左側：角色立繪與即時心電圖面板 -->
          <div class="vn-portrait-column">
            <div class="vn-portrait-frame">
              ${renderCharacterSVG(char, expression, 'portrait')}
              <div class="vn-emotion-tag">
                狀態：${this.getEmotionLabel(expression)}
              </div>
            </div>

            <div class="vn-ecg-box">
              <div class="ecg-header">
                <span>🫀 心理防禦心電圖（${diag.diagnosed ? char.dsmCode : '診斷未明'}）</span>
                <span class="route-pill ${route.badgeClass}">${route.label}</span>
              </div>
              ${this.renderECGSVG(expression, char.themeColor)}
              <div class="vn-live-stats">
                <span>💗 親密 <strong>${cs.affection}</strong></span>
                <span>🛡️ 安全 <strong>${cs.security}</strong></span>
                <span>🧭 邊界 <strong>${cs.boundary}</strong></span>
              </div>
            </div>
          </div>

          <!-- 右側：對話框與心理學分支選項 -->
          <div class="vn-dialogue-column">
            <div class="vn-dialogue-box">
              <div class="speaker-banner">
                <span class="speaker-name">
                  ${
                    node.speaker === 'char'
                      ? `${char.name}（${diag.diagnosed ? char.dsmTitle : `${char.occupation}・觀察線索 ${cs.unlockedCriteria.length}/${char.criteria.length}`}）`
                      : '【旁白 / 情境觀察】'
                  }
                </span>
                <span class="node-step">進度 ${nodeIndex + 1} / ${chapter.nodes.length}</span>
              </div>

              <div class="dialogue-text">
                ${this.formatText(node.text)}
              </div>

              ${
                awaitingNextAfterChoice && lastChoiceOutcome
                  ? `
                    <div class="choice-outcome-box">
                      <div class="outcome-reply">
                        <strong>${char.name}的反應：</strong>
                        <p>${lastChoiceOutcome.reply}</p>
                      </div>
                      <div class="outcome-deltas">
                        ${this.formatStatDeltas(lastChoiceOutcome.stats)}
                      </div>
                      <div class="outcome-psych-note">
                        ${lastChoiceOutcome.psychNote}
                      </div>
                      <button class="btn-vn-continue" data-action="next-node">
                        繼續劇情 ▶
                      </button>
                    </div>
                  `
                  : node.choices && node.choices.length > 0
                  ? `
                    <div class="vn-choices-list">
                      <div class="choices-prompt">請選擇你的回應方式（注意安全感與人際邊界的平衡）：</div>
                      ${node.choices
                        .map(
                          (ch, idx) => `
                            <button
                              class="vn-choice-btn"
                              data-action="select-choice"
                              data-choice-index="${idx}"
                            >
                              <span class="choice-idx">${String.fromCharCode(65 + idx)}</span>
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

            <!-- 底部相處備忘（未確診前不暴雷診斷名稱） -->
            <div class="vn-hint-card">
              <strong>💡 相處觀察提示：</strong> ${this.maskUndiagnosedText(char.strategyHint, char.id)}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  renderDailyScene(char, cs, route, diag) {
    const { talk } = this.activeScene;
    return `
      <section class="vn-stage" style="--char-color: ${char.themeColor}">
        <div class="vn-top-bar">
          <div class="vn-loc-info">
            <span class="vn-chap-badge">日常深度互動</span>
            <strong>☕ ${talk.title}（${diag.title}）</strong>
          </div>
          <button class="nav-btn" data-action="exit-scene">↩ 返回</button>
        </div>

        <div class="vn-main-grid">
          <div class="vn-portrait-column">
            <div class="vn-portrait-frame">
              ${renderCharacterSVG(char, 'smile', 'portrait')}
            </div>
            <div class="vn-ecg-box">
              <div class="ecg-header">
                <span>🫀 當下關係數值</span>
                <span class="route-pill ${route.badgeClass}">${route.label}</span>
              </div>
              <div class="vn-live-stats">
                <span>💗 親密 <strong>${cs.affection}</strong></span>
                <span>🛡️ 安全 <strong>${cs.security}</strong></span>
                <span>🧭 邊界 <strong>${cs.boundary}</strong></span>
              </div>
            </div>
          </div>

          <div class="vn-dialogue-column">
            <div class="vn-dialogue-box">
              <div class="speaker-banner">
                <span class="speaker-name">${char.name}・日常時光</span>
              </div>
              <div class="dialogue-text">
                <p style="color:#94a3b8; margin-bottom:12px;">▶ 你的行動：${this.formatText(talk.prompt)}</p>
                <p>${this.formatText(talk.response)}</p>
              </div>
              <div class="outcome-deltas" style="margin: 16px 0;">
                ${this.formatStatDeltas(talk.stats)}
              </div>
              <button class="btn-vn-continue" data-action="next-node">
                結束日常互動 ▶
              </button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  renderEndingScene(char, cs, route, diag) {
    const { endingKey, endingData, expression } = this.activeScene;
    // 全員戀愛模式直接使用 romanticText
    const storyText = this.formatText(endingData.romanticText);

    const badgeColors = {
      trueEnd: '#10b981',
      codependentEnd: '#a855f7',
      triggerEnd: '#ef4444',
      normalEnd: '#64748b'
    };

    return `
      <section class="vn-stage ending-stage" style="--char-color: ${char.themeColor}">
        <div class="vn-top-bar">
          <div class="vn-loc-info">
            <span class="vn-chap-badge" style="background:${badgeColors[endingKey]}">結局達成＆診斷揭曉</span>
            <strong>${char.name} — ${diag.diagnosed ? `${char.dsmTitle} (${char.dsmCode})` : diag.title}</strong>
          </div>
          <button class="nav-btn" data-action="exit-scene">↩ 返回名冊</button>
        </div>

        <div class="vn-main-grid">
          <div class="vn-portrait-column">
            <div class="vn-portrait-frame">
              ${renderCharacterSVG(char, expression, 'portrait')}
            </div>
            <div class="vn-ecg-box">
              <div class="ecg-header">
                <span>最終心理數值結算</span>
                <span class="route-pill ${route.badgeClass}">${route.label}</span>
              </div>
              <div class="vn-live-stats">
                <span>💗 親密 <strong>${cs.affection}</strong></span>
                <span>🛡️ 安全 <strong>${cs.security}</strong></span>
                <span>🧭 邊界 <strong>${cs.boundary}</strong></span>
              </div>
            </div>
          </div>

          <div class="vn-dialogue-column">
            <div class="vn-dialogue-box ending-card">
              <div class="ending-header" style="border-left-color: ${badgeColors[endingKey]}">
                <h2>${endingData.title}</h2>
                <p class="ending-sub">${endingData.subtitle}｜${route.label}</p>
              </div>

              <div class="dialogue-text ending-body">
                ${storyText}
              </div>

              <div class="ending-clinical-box">
                <strong>🧠 DSM-5-TR 診斷揭曉：【${char.dsmTitle} (${char.dsmTitleEn}, ${char.dsmCode})】</strong>
                <p style="margin-top:6px;">${char.clinicalOverview}</p>
                <p style="margin-top:8px; color:#a5b4fc;">${char.differentialNote}</p>
              </div>

              <div class="ending-switcher">
                <span>預覽本角色其他結局走向：</span>
                <div class="ending-switch-btns">
                  <button class="btn-end-tab ${endingKey === 'trueEnd' ? 'active' : ''}" data-action="show-ending" data-char-id="${char.id}" data-ending-key="trueEnd">
                    🌟 True End (健康共生)
                  </button>
                  <button class="btn-end-tab ${endingKey === 'codependentEnd' ? 'active' : ''}" data-action="show-ending" data-char-id="${char.id}" data-ending-key="codependentEnd">
                    🕸️ Codependent (病態共依存)
                  </button>
                  <button class="btn-end-tab ${endingKey === 'triggerEnd' ? 'active' : ''}" data-action="show-ending" data-char-id="${char.id}" data-ending-key="triggerEnd">
                    ⚡ Trigger End (踩雷決裂)
                  </button>
                  <button class="btn-end-tab ${endingKey === 'normalEnd' ? 'active' : ''}" data-action="show-ending" data-char-id="${char.id}" data-ending-key="normalEnd">
                    🍃 Normal End (平行線)
                  </button>
                </div>
              </div>

              <div class="vn-continue-row" style="margin-top:18px;">
                <button class="btn-vn-continue" data-action="exit-scene">
                  返回棲遲公寓繼續探索其他角色 ▶
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // ==================== 彈窗：漸進式 DSM-5-TR 心靈檔案館 & 存檔系統 ====================
  renderCompendiumModal(focusCharId = null) {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return;

    const charsToShow = focusCharId ? CHARACTERS.filter((c) => c.id === focusCharId) : CHARACTERS;

    modalRoot.innerHTML = `
      <div class="modal-backdrop" data-action="close-modal">
        <div class="modal-window" onclick="event.stopPropagation()">
          <div class="modal-header">
            <div>
              <h2>📖 心靈檔案館（行為觀察紀錄 ＆ DSM-5-TR 診斷圖鑑）</h2>
              <p>根據 DSM-5-TR 臨床原則，唯有在跨情境互動中收集齊全行為準則，才會正式顯現該角色的人格障礙診斷名稱与鑑別分析。</p>
            </div>
            <div class="modal-header-btns">
              ${
                focusCharId
                  ? `<button class="nav-btn" data-action="open-compendium">顯示全部 12 位房客</button>`
                  : ''
              }
              <button class="btn-close" data-action="close-modal">✕</button>
            </div>
          </div>

          <div class="modal-body compendium-list">
            ${charsToShow
              .map((char) => {
                const cs = this.state.characters[char.id];
                const diag = this.getDiagnosisDisplay(char);

                return `
                  <div class="compendium-card" style="--char-color: ${char.themeColor}">
                    <div class="comp-head">
                      <div>
                        <span class="comp-code">${diag.diagnosed ? `${char.dsmCode}｜Cluster ${char.cluster}` : `🔍 評估進度：${cs.unlockedCriteria.length} / ${char.criteria.length} 項準則`}</span>
                        <h3>#${char.number} ${char.name} — ${diag.diagnosed ? `${char.dsmTitle} (${char.dsmTitleEn})` : '🔒 診斷名稱未解鎖（需達診斷標準）'}</h3>
                        <p class="comp-meta">${char.genderLabel}｜${char.orientationLabel}｜${char.occupation}</p>
                      </div>
                    </div>

                    ${
                      diag.diagnosed
                        ? `
                          <p class="comp-overview"><strong>🧠 臨床核心特徵：</strong>${char.clinicalOverview}</p>
                          <p class="comp-diff">${char.differentialNote}</p>
                          <p class="comp-hint"><strong>💡 親密關係攻略關鍵：</strong>${char.strategyHint}</p>
                        `
                        : `
                          <div class="comp-locked-banner">
                            🔒 <strong>尚未達 DSM-5-TR 確診門檻（目前已觀察到 ${cs.unlockedCriteria.length} / ${char.criteria.length} 項特徵）</strong><br/>
                            <span>提示：請與 ${char.name} 進行第 1～3 章劇情互動，觀察其在不同情境下的人際與情緒反應。當收集滿 ${char.criteria.length} 項核心準則時，將正式揭曉其人格障礙診斷與臨床鑑別分析。</span>
                          </div>
                        `
                    }

                    <div class="comp-criteria-grid">
                      ${char.criteria
                        .map((cr, idx) => {
                          const unlocked = cs.unlockedCriteria.includes(cr.id);
                          return `
                            <div class="crit-item ${unlocked ? 'unlocked' : 'locked'}">
                              <div class="crit-top">
                                <span>${unlocked ? '✅ 已觀察到行為特徵' : `🔒 待觀察線索 #${idx + 1}`}</span>
                                <strong>${unlocked ? cr.title : '？？？'}</strong>
                              </div>
                              <p>${unlocked ? this.maskUndiagnosedText(cr.desc, char.id) : '（推進與該角色的主線章節互動即可觀察並記錄此特徵）'}</p>
                            </div>
                          `;
                        })
                        .join('')}
                    </div>
                  </div>
                `;
              })
              .join('')}
          </div>
        </div>
      </div>
    `;
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
        <div class="modal-window modal-small" onclick="event.stopPropagation()">
          <div class="modal-header">
            <div>
              <h2>💾 瀏覽器記憶存檔與讀檔</h2>
              <p>所有進度皆已即時儲存於瀏覽器 Session / LocalStorage 中，下次打開網頁會自動接續遊玩！</p>
            </div>
            <button class="btn-close" data-action="close-modal">✕</button>
          </div>

          <div class="modal-body save-slots-list">
            <div class="save-slot-card" style="border-color:#10b981;">
              <div>
                <strong style="color:#34d399;">⚡ 瀏覽器自動接續存檔 (Session Auto-Resume)</strong>
                <p>主角：${this.state.player.name}｜Day ${this.state.day}・已解鎖診斷 ${CHARACTERS.filter((c) => this.isDiagnosed(c.id)).length}/12 人</p>
                <small>狀態：已同步於瀏覽器，關閉分頁或下次開啟時將自動載入</small>
              </div>
            </div>

            ${slots
              .map(({ num, info }) => {
                const st = info?.state;
                const diagCount = st
                  ? CHARACTERS.filter(
                      (c) =>
                        st.characters?.[c.id]?.diagnosed ||
                        (st.characters?.[c.id]?.unlockedCriteria?.length || 0) >= c.criteria.length
                    ).length
                  : 0;
                return `
                  <div class="save-slot-card">
                    <div>
                      <strong>手動記憶槽位 #${num}</strong>
                      ${
                        st
                          ? `<p>主角：${st.player.name}｜Day ${st.day}｜已解鎖診斷 ${diagCount}/12 人</p>
                             <small>儲存時間：${info.savedAt}</small>`
                          : `<p style="color:#64748b;">— 空白槽位 —</p>`
                      }
                    </div>
                    <div class="save-slot-btns">
                      <button class="btn-action-primary" data-action="save-slot" data-slot="${num}">儲存至此槽</button>
                      ${
                        st
                          ? `<button class="btn-action-secondary" data-action="load-slot" data-slot="${num}">讀取</button>`
                          : ''
                      }
                    </div>
                  </div>
                `;
              })
              .join('')}

            <div style="margin-top:8px; display:flex; justify-content:flex-end;">
              <button class="nav-btn" style="color:#f87171; border-color:rgba(248,113,113,0.35);" data-action="clear-all-saves">
                🗑️ 清除所有存檔並重開新局
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getEmotionLabel(expr) {
    const map = {
      neutral: '平靜觀察 (Baseline)',
      smile: '愉悅／敞開 (Warm / Open)',
      vulnerable: '脆弱／卸下防備 (Vulnerable)',
      anxious: '焦慮／防衛警戒 (Guarded / Anxious)',
      triggered: '踩雷／防衛激發 (Triggered / Alert)'
    };
    return map[expr] || map.neutral;
  }

  renderECGSVG(expression, color) {
    let pathData = 'M 0 25 L 40 25 L 50 10 L 60 40 L 70 25 L 140 25 L 150 8 L 160 42 L 170 25 L 240 25';
    let strokeColor = color;
    if (expression === 'triggered') {
      strokeColor = '#ef4444';
      pathData = 'M 0 25 L 15 5 L 28 45 L 42 8 L 55 44 L 70 12 L 85 40 L 100 6 L 118 44 L 135 10 L 155 42 L 175 8 L 195 44 L 215 15 L 240 25';
    } else if (expression === 'anxious') {
      strokeColor = '#f59e0b';
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
      items.push(`<span class="delta-badge ${stats.affection > 0 ? 'pos' : 'neg'}">💗 親密度 ${s}</span>`);
    }
    if (stats.security) {
      const s = stats.security > 0 ? `+${stats.security}` : stats.security;
      items.push(`<span class="delta-badge ${stats.security > 0 ? 'pos' : 'neg'}">🛡️ 安全感 ${s}</span>`);
    }
    if (stats.boundary) {
      const s = stats.boundary > 0 ? `+${stats.boundary}` : stats.boundary;
      items.push(`<span class="delta-badge ${stats.boundary > 0 ? 'pos' : 'neg'}">🧭 健康邊界 ${s}</span>`);
    }
    return items.join('');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const game = new EdgeOfLoveGame();
  game.init();
});
