// 《愛的邊緣》(Edge of Love) — 戀與製作人唯美戀愛風格 ＆ 漸進式 DSM-5-TR 解鎖控制器

import { LOCATIONS, CLUSTERS, CHARACTERS } from './data/characters.js?v=4';
import { SCENARIOS_CLUSTER_A } from './data/scenarios_cluster_a.js?v=4';
import { SCENARIOS_CLUSTER_B } from './data/scenarios_cluster_b.js?v=4';
import { SCENARIOS_CLUSTER_C_OTHER } from './data/scenarios_cluster_c_other.js?v=4';
import {
  MASTER_STYLE_PROMPT,
  EMOTION_ACTION_MODIFIERS,
  CHARACTER_PROMPTS,
  buildCharacterActionPrompt
} from './data/characterPrompts.js?v=4';
import { renderCharacterSVG } from './ui/avatarRenderer.js?v=4';
import { audio } from './ui/audioEngine.js?v=4';

const ALL_SCENARIOS = {
  ...SCENARIOS_CLUSTER_A,
  ...SCENARIOS_CLUSTER_B,
  ...SCENARIOS_CLUSTER_C_OTHER
};

const TIME_SLOTS = ['晨間微光 (Morning)', '午後暖陽 (Afternoon)', '星夜微醺 (Midnight)'];
const STORAGE_KEY_AUTOSAVE = 'edge_of_love_browser_save_v2';
const STORAGE_KEY_SESSION = 'edge_of_love_session_save_v2';

class EdgeOfLoveGame {
  constructor() {
    this.state = this.getDefaultState();
    this.activeScene = null;
    this.selectedFilter = 'ALL';
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
        chapterCompleted: 0,
        unlockedCriteria: [],
        diagnosed: false,
        unlockedEndings: [],
        dailyTalkIndex: 0
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
      day: 1,
      timeSlotIndex: 0,
      characters: charState
    };
  }

  init() {
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
        // ignore corrupted save
      }
    }

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
    return Boolean(cs.diagnosed || cs.unlockedCriteria.length >= char.criteria.length);
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
        progressText: `✅ 已達診斷標準 (${count}/${total})`
      };
    }

    return {
      diagnosed: false,
      code: `羈絆 ${count}/${total}`,
      title: count === 0 ? '？？？・心靈特質待觀察' : `？？？・已收集 ${count}/${total} 項特徵`,
      fullTitle:
        count === 0
          ? '【尚未揭曉】需透過約會與劇情互動觀察其心靈特質'
          : `【心靈觀察中：已解鎖 ${count}/${total} 項特徵】尚未達確診門檻`,
      clusterLabel: '未分類',
      badgeColor: '#9f6b8c',
      progressText: `🔍 心靈線索 ${count}/${total}`
    };
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
    this.showToast(`🌸 歡迎入住棲遲公寓，${this.state.player.name}！十二段命定邂逅即將展開。`);
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
          `✨ 符合 DSM-5-TR 診斷標準！正式揭曉【${char.name}】心靈真相：${char.dsmTitle} (${char.dsmCode})`
        );
      } else if (crit) {
        audio.playChime(660, 0.14);
        this.showToast(
          `🌸 解鎖【${char.name}】心靈線索：「${crit.title}」（進度 ${currentCount}/${total}）`
        );
      }
      this.autoSave();
    }
    return newlyAdded;
  }

  syncCriteriaByChapterProgress(charId, chapterIndexZeroBased) {
    const char = CHARACTERS.find((c) => c.id === charId);
    if (!char) return;
    const total = char.criteria.length;
    if (chapterIndexZeroBased === 0 && total >= 1) {
      this.unlockCriterion(charId, char.criteria[0].id);
    } else if (chapterIndexZeroBased === 1 && total >= 2) {
      this.unlockCriterion(charId, char.criteria[0].id);
      this.unlockCriterion(charId, char.criteria[1].id);
      if (total >= 4) {
        this.unlockCriterion(charId, char.criteria[2].id);
      }
    } else if (chapterIndexZeroBased >= 2) {
      char.criteria.forEach((cr) => this.unlockCriterion(charId, cr.id));
    }
  }

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
          this.showToast(`✨ 已完成第 ${chapterIndex + 1} 章羈絆劇情！`);
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
            this.showToast('🔒 請先完成該角色的 3 章羈絆劇情，達診斷標準後即可解鎖戀愛結局！');
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
        case 'open-prompt-studio':
          this.renderPromptStudioModal(
            target.dataset.charId || (this.activeScene ? this.activeScene.charId : 'shen_mo'),
            this.activeScene?.expression || 'smile',
            this.activeScene?.chapterIndex !== undefined ? this.activeScene.chapterIndex + 1 : 1
          );
          break;
        case 'copy-prompt': {
          const textEl = document.getElementById(target.dataset.targetId);
          if (textEl) {
            navigator.clipboard?.writeText(textEl.value || textEl.textContent);
            this.showToast('✨ 已複製角色動作生成 Prompt 至剪貼簿！');
          }
          break;
        }
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
          if (confirm('要返回初始畫面修改主角姓名與性別設定嗎？（目前的攻略進度仍會保留）')) {
            this.state.initialized = false;
            this.activeScene = null;
            this.render();
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
          <span class="brand-logo">🌸</span>
          <div>
            <h1 class="brand-title">愛的邊緣 <span class="brand-sub">EDGE OF LOVE</span></h1>
            <p class="brand-meta">
              主角：<strong>${this.state.player.name}</strong>（${this.state.player.sexLabel}・代名詞「${this.state.player.pronoun}」）
              ｜ Day ${this.state.day}・${TIME_SLOTS[this.state.timeSlotIndex]}
              ${this.lastSavedTime ? `｜ <span class="saved-indicator">♥ 記憶已同步 (${this.lastSavedTime})</span>` : ''}
            </p>
          </div>
        </div>

        <div class="nav-actions">
          <div class="stat-pill" title="已揭曉心靈真相之角色數">
            <span>💘 真相揭曉</span>
            <strong>${diagnosedCount} / 12</strong>
          </div>
          <button class="nav-btn btn-accent" data-action="open-compendium">
            📖 心靈羈絆圖鑑 (${unlockedCriteria}/${totalCriteria})
          </button>
          <button class="nav-btn btn-gold" data-action="open-prompt-studio">
            🎨 角色動作 Prompt 庫
          </button>
          <button class="nav-btn" data-action="open-save-modal">
            💾 記憶存檔
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
    const showcaseIds = ['shen_mo', 'han_xiao', 'xia_le', 'wen_yan', 'su_fei', 'gu_qingcheng', 'lin_jianwei', 'bai_xiaolu'];
    const showcaseChars = showcaseIds.map((id) => CHARACTERS.find((c) => c.id === id)).filter(Boolean);

    return `
      <section class="creator-screen">
        <div class="creator-card">
          <div class="creator-header">
            <span class="creator-badge">✦ 戀與心靈羈絆・唯美戀愛養成 ✦</span>
            <h1>愛的邊緣 <small style="font-size:1.1rem; font-weight:400; display:block; margin-top:4px;">Edge of Love</small></h1>
            <p>
              十二位迷人卻各自懷抱心靈秘密的棲遲公寓房客，十二段刻骨銘心的命定愛戀。<br/>
              最初你並不知道他們隱藏著什麼樣的心理防衛——唯有在每一次心動與試探中收集線索，才能在達標的那一刻，揭開他們靈魂深處真正的名字。
            </p>
          </div>

          <!-- 戀與製作人風格拱門立繪展示牆 -->
          <div class="otome-showcase-strip">
            ${showcaseChars
              .map(
                (c) => `
                  <div class="showcase-pillar">
                    <img src="./assets/characters/${c.id}.png" alt="${c.name}" />
                    <span class="pillar-name">${c.name}</span>
                  </div>
                `
              )
              .join('')}
          </div>

          <div class="creator-form">
            <div class="form-row">
              <label for="player-name-input">✦ 你的名字</label>
              <input id="player-name-input" type="text" value="${this.state.player.name}" maxlength="16" placeholder="輸入你的名字" />
            </div>

            <div class="form-row">
              <label for="player-sex-select">✦ 你的性別設定</label>
              <select id="player-sex-select" onchange="document.getElementById('player-pronoun-input').value = this.value === 'male' ? '他' : this.value === 'nonbinary' ? 'TA' : '她'">
                <option value="female">♀ 生理女性／女性認同 (Female)</option>
                <option value="male">♂ 生理男性／男性認同 (Male)</option>
                <option value="nonbinary">⚧ 非二元性別／跨性別／雙性人 (Non-binary / Intersex / Queer)</option>
              </select>
            </div>

            <div class="form-row">
              <label for="player-pronoun-input">✦ 自訂人稱代名詞</label>
              <input id="player-pronoun-input" type="text" value="她" maxlength="6" placeholder="她 / 他 / TA / 祂" />
            </div>

            <div class="form-row">
              <label for="player-trait-select">✦ 初始戀愛特質傾向（全角色初始數值加成）</label>
              <select id="player-trait-select">
                <option value="balanced">⚖️ 溫柔直覺者（心動、安全感、邊界均衡發展）</option>
                <option value="empathy">💗 傾聽共情者（全角色初始【親密度 +8】，更快觸發心動瞬間）</option>
                <option value="stability">🛡️ 暖陽陪伴者（全角色初始【安全感 +10】，溫柔安撫對方不安）</option>
                <option value="boundary">🧭 清醒獨立者（全角色初始【健康邊界 +10】，守護健康雙向戀愛）</option>
              </select>
            </div>

            <button class="btn-primary-large" data-action="start-new-game">
              ✨ 推開棲遲公寓大門，邂逅 12 段命定愛戀 ✨
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
            <h2>🌸 城市漫步・邂逅地圖</h2>
            <p>選擇想前往的浪漫場所與心儀對象約會。隨著劇情推進收集心靈線索，符合標準後將揭曉其深層人格特質。</p>
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
                  <small>${loc.characters.length} 位邂逅對象</small>
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
                      </div>
                      <div class="loc-char-buttons">
                        <button class="btn-action-primary" data-action="start-chapter" data-char-id="${char.id}">
                          ${cs.chapterCompleted < 3 ? `💖 進入第 ${cs.chapterCompleted + 1} 章約會劇情` : '✨ 重溫羈絆劇情'}
                        </button>
                        <button class="btn-action-secondary" data-action="start-daily" data-char-id="${char.id}">
                          🌸 甜蜜日常
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
            <h2>✨ 12 位命定羈絆角色卡冊 (SSR / SR)</h2>
            <p>點擊任一角色即可推進約會章節、查看心靈觀察線索，或開啟「🎨 動作 Prompt 工坊」生成專屬劇情動作。</p>
          </div>

          <div class="cluster-filters">
            <button class="filter-btn ${this.selectedFilter === 'ALL' ? 'active' : ''}" data-action="filter-roster" data-filter="ALL">
              全部羈絆 (12)
            </button>
            <button class="filter-btn ${this.selectedFilter === 'OBSERVING' ? 'active' : ''}" data-action="filter-roster" data-filter="OBSERVING">
              🔍 心靈探索中 (${observingCount})
            </button>
            <button class="filter-btn ${this.selectedFilter === 'DIAGNOSED' ? 'active' : ''}" data-action="filter-roster" data-filter="DIAGNOSED">
              💖 已揭曉真相 (${diagnosedCount})
            </button>
          </div>
        </div>

        <div class="roster-grid">
          ${
            filteredChars.length > 0
              ? filteredChars.map((char) => this.renderCharacterCard(char)).join('')
              : `<div style="grid-column: 1/-1; text-align:center; padding: 36px; color:#f5d0fe;">目前尚無符合此條件的角色，快去推進約會劇情吧！</div>`
          }
        </div>
      </section>
    `;
  }

  renderCharacterCard(char) {
    const cs = this.state.characters[char.id];
    const diag = this.getDiagnosisDisplay(char);
    const promptInfo = CHARACTER_PROMPTS[char.id];

    return `
      <article class="char-card otome-gacha-card" style="--char-color: ${char.themeColor}">
        <!-- 上半部：戀與製作人拱門卡面與立繪 -->
        <div class="gacha-card-visual" data-action="start-chapter" data-char-id="${char.id}">
          <div class="gacha-arch-window">
            <img src="${promptInfo?.imagePath || `./assets/characters/${char.id}.png`}" alt="${char.name}" class="gacha-char-img" loading="lazy" />
            <div class="gacha-gradient-veil"></div>
            <span class="gacha-rarity-badge">${promptInfo?.rarity || 'SSR'}</span>
            <span class="gacha-clue-pill ${diag.diagnosed ? 'unlocked' : ''}">
              ${diag.code}
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

        <!-- 下半部：心靈真相狀態、三維戀愛數值與操作按鈕 -->
        <div class="gacha-card-body">
          <div class="char-dsm-name ${diag.diagnosed ? '' : 'undiscovered-dsm'}">
            ${diag.fullTitle}
          </div>

          <div class="char-tags-row">
            <span class="gender-tag">${char.genderLabel}</span>
            <span class="orient-tag">${char.orientationLabel}</span>
          </div>

          <p class="char-bio">${char.shortBio}</p>

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

          <div class="chapter-progress-row">
            <span>約會章節：</span>
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
              ${cs.chapterCompleted < 3 ? `💖 第 ${cs.chapterCompleted + 1} 章約會` : '✨ 重溫約會'}
            </button>
            <button class="btn-card-sub" data-action="start-daily" data-char-id="${char.id}">
              🌸 日常
            </button>
            <button class="btn-card-sub" data-action="show-ending" data-char-id="${char.id}">
              ${diag.diagnosed || cs.chapterCompleted >= 3 ? '🎬 結局' : '🔒 結局'}
            </button>
            <button class="btn-card-icon" data-action="open-prompt-studio" data-char-id="${char.id}" title="查看此角色之立繪與劇情動作生成 Prompt">
              🎨
            </button>
            <button class="btn-card-icon" data-action="open-compendium" data-char-id="${char.id}" title="查看心靈觀察紀錄">
              📋
            </button>
          </div>
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

    const { chapter, nodeIndex, awaitingNextAfterChoice, lastChoiceOutcome, chapterIndex } = this.activeScene;
    const node = chapter.nodes[nodeIndex];
    const currentActionPrompt = buildCharacterActionPrompt(char.id, expression, chapterIndex + 1);

    return `
      <section class="vn-stage" style="--char-color: ${char.themeColor}">
        <div class="vn-top-bar">
          <div class="vn-loc-info">
            <span class="vn-chap-badge">${chapter.title}</span>
            <strong>📍 ${chapter.location}</strong>
            <small>🎧 ${chapter.ambience}</small>
          </div>
          <div class="vn-top-buttons">
            <button class="nav-btn btn-gold" data-action="open-prompt-studio" data-char-id="${char.id}">
              🎨 本幕動作 Prompt
            </button>
            <button class="nav-btn" data-action="open-compendium" data-char-id="${char.id}">
              📋 心靈線索 (${cs.unlockedCriteria.length}/${char.criteria.length})
            </button>
            <button class="nav-btn" data-action="exit-scene">
              ↩ 返回地圖
            </button>
          </div>
        </div>

        <div class="vn-main-grid">
          <!-- 左側：戀與製作人拱門角色立繪與心動波形 -->
          <div class="vn-portrait-column">
            <div class="vn-portrait-frame">
              ${renderCharacterSVG(char, expression, 'portrait')}
              <div class="vn-emotion-tag">
                ✨ 當下神情：${this.getEmotionLabel(expression)}
              </div>
            </div>

            <div class="vn-ecg-box">
              <div class="ecg-header">
                <span>💓 心動與防衛頻率（${diag.diagnosed ? char.dsmTitle : '真相探索中'}）</span>
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

          <!-- 右側：戀愛對話框與分支選項 -->
          <div class="vn-dialogue-column">
            <div class="vn-dialogue-box">
              <div class="speaker-banner">
                <span class="speaker-name">
                  ${
                    node.speaker === 'char'
                      ? `${char.name}（${diag.diagnosed ? char.dsmTitle : `${char.occupation}・心靈線索 ${cs.unlockedCriteria.length}/${char.criteria.length}`}）`
                      : '✦ 情境與心動描寫 ✦'
                  }
                </span>
                <span class="node-step">SCENE ${nodeIndex + 1} / ${chapter.nodes.length}</span>
              </div>

              <div class="dialogue-text">
                ${this.formatText(node.text)}
              </div>

              ${
                awaitingNextAfterChoice && lastChoiceOutcome
                  ? `
                    <div class="choice-outcome-box">
                      <div class="outcome-reply">
                        <strong>💖 ${char.name}的回應：</strong>
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
                      <div class="choices-prompt">✨ 請選擇你的回應方式（兼具溫柔共情與健康界線更能觸動真心）：</div>
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

            <!-- 底部相處備忘與本幕動作 Prompt 預覽 -->
            <div class="vn-hint-card">
              <div><strong>💌 戀愛相處提示：</strong> ${this.maskUndiagnosedText(char.strategyHint, char.id)}</div>
              <details class="scene-prompt-details">
                <summary>🎨 展開本幕角色動作生成 Prompt（供後續動態生成 CG 動作）</summary>
                <div class="scene-prompt-box">
                  <textarea id="live-scene-prompt" readonly rows="3">${currentActionPrompt}</textarea>
                  <button class="nav-btn btn-gold" data-action="copy-prompt" data-target-id="live-scene-prompt">複製 Prompt</button>
                </div>
              </details>
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
            <span class="vn-chap-badge">甜蜜日常互動</span>
            <strong>🌸 ${talk.title}（${diag.title}）</strong>
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
                <p style="color:#f5d0fe; margin-bottom:12px;">▶ 你的貼心舉動：${this.formatText(talk.prompt)}</p>
                <p>${this.formatText(talk.response)}</p>
              </div>
              <div class="outcome-deltas" style="margin: 16px 0;">
                ${this.formatStatDeltas(talk.stats)}
              </div>
              <button class="btn-vn-continue" data-action="next-node">
                完成日常約會 ▶
              </button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  renderEndingScene(char, cs, route, diag) {
    const { endingKey, endingData, expression } = this.activeScene;
    const storyText = this.formatText(endingData.romanticText);

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
            <span class="vn-chap-badge" style="background:${badgeColors[endingKey]}">命定結局＆心靈真相揭曉</span>
            <strong>${char.name} — ${diag.diagnosed ? `${char.dsmTitle} (${char.dsmCode})` : diag.title}</strong>
          </div>
          <button class="nav-btn" data-action="exit-scene">↩ 返回卡冊</button>
        </div>

        <div class="vn-main-grid">
          <div class="vn-portrait-column">
            <div class="vn-portrait-frame">
              ${renderCharacterSVG(char, expression, 'portrait')}
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
                <h2>${endingData.title}</h2>
                <p class="ending-sub">${endingData.subtitle}</p>
              </div>

              <div class="dialogue-text ending-body">
                ${storyText}
              </div>

              <div class="ending-clinical-box">
                <strong>🧠 心靈真相檔案揭曉：【${char.dsmTitle} (${char.dsmTitleEn}, ${char.dsmCode})】</strong>
                <p style="margin-top:6px;">${char.clinicalOverview}</p>
                <p style="margin-top:8px; color:#f5d0fe;">${char.differentialNote}</p>
              </div>

              <div class="ending-switcher">
                <span>切換體驗本角色全部 4 種結局分支：</span>
                <div class="ending-switch-btns">
                  <button class="btn-end-tab ${endingKey === 'trueEnd' ? 'active' : ''}" data-action="show-ending" data-char-id="${char.id}" data-ending-key="trueEnd">
                    💖 True End (健康相愛)
                  </button>
                  <button class="btn-end-tab ${endingKey === 'codependentEnd' ? 'active' : ''}" data-action="show-ending" data-char-id="${char.id}" data-ending-key="codependentEnd">
                    🕸️ Codependent (沉溺共依存)
                  </button>
                  <button class="btn-end-tab ${endingKey === 'triggerEnd' ? 'active' : ''}" data-action="show-ending" data-char-id="${char.id}" data-ending-key="triggerEnd">
                    💔 Trigger End (心碎決裂)
                  </button>
                  <button class="btn-end-tab ${endingKey === 'normalEnd' ? 'active' : ''}" data-action="show-ending" data-char-id="${char.id}" data-ending-key="normalEnd">
                    🍃 Normal End (平行線)
                  </button>
                </div>
              </div>

              <div class="vn-continue-row" style="margin-top:18px;">
                <button class="btn-vn-continue" data-action="exit-scene">
                  返回棲遲公寓繼續邂逅其他角色 ▶
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // ==================== 彈窗：角色立繪與劇情動作 Prompt 工坊 ====================
  renderPromptStudioModal(selectedCharId = 'shen_mo', selectedEmo = 'smile', selectedChap = 1) {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return;

    const char = CHARACTERS.find((c) => c.id === selectedCharId) || CHARACTERS[0];
    const pData = CHARACTER_PROMPTS[char.id];
    const dynamicPrompt = buildCharacterActionPrompt(char.id, selectedEmo, selectedChap);

    modalRoot.innerHTML = `
      <div class="modal-backdrop" data-action="close-modal">
        <div class="modal-window" onclick="event.stopPropagation()">
          <div class="modal-header">
            <div>
              <h2>🎨 角色立繪＆劇情動作 Prompt 工坊</h2>
              <p>所有 12 位角色的基礎立繪與各章節動作 Prompt 已儲存於專案 <code>prompts/character_prompts.json</code> 與 <code>prompts/CHARACTER_PROMPTS.md</code>。</p>
            </div>
            <button class="btn-close" data-action="close-modal">✕</button>
          </div>

          <div class="modal-body">
            <!-- 12 角色快速切換列 -->
            <div class="prompt-char-selector">
              ${CHARACTERS.map(
                (c) => `
                  <button
                    class="filter-btn ${c.id === char.id ? 'active' : ''}"
                    data-action="open-prompt-studio"
                    data-char-id="${c.id}"
                  >
                    #${c.number} ${c.name}
                  </button>
                `
              ).join('')}
            </div>

            <div class="prompt-studio-grid">
              <div class="prompt-preview-col">
                ${renderCharacterSVG(char, selectedEmo, 'portrait')}
              </div>

              <div class="prompt-details-col">
                <h3>#${char.number} ${char.name} (${char.enName}) — 專屬外觀與動作生成規範</h3>

                <div class="prompt-block">
                  <div class="prompt-block-head">
                    <strong>1. 角色固定外觀錨點 (Appearance Anchor - 保持跨動作臉部與服裝一致)</strong>
                    <button class="nav-btn" data-action="copy-prompt" data-target-id="anchor-prompt-text">複製</button>
                  </div>
                  <textarea id="anchor-prompt-text" readonly rows="3">${pData.appearanceAnchor}</textarea>
                </div>

                <div class="prompt-block">
                  <div class="prompt-block-head">
                    <strong>2. 預設《戀與製作人》SSR 角色立繪完整 Prompt</strong>
                    <button class="nav-btn" data-action="copy-prompt" data-target-id="base-prompt-text">複製</button>
                  </div>
                  <textarea id="base-prompt-text" readonly rows="4">${pData.basePrompt}</textarea>
                </div>

                <div class="prompt-block">
                  <div class="prompt-block-head">
                    <strong>3. 各章節劇情專屬動作 Prompts（可直接用於生成新動作差分）</strong>
                  </div>
                  ${pData.storyActions
                    .map(
                      (act) => `
                        <div class="action-prompt-item">
                          <div class="action-prompt-title">
                            <span>🎬 ${act.title}</span>
                            <button class="nav-btn btn-gold" data-action="copy-prompt" data-target-id="chap-prompt-${act.chapter}">複製完整指令</button>
                          </div>
                          <textarea id="chap-prompt-${act.chapter}" readonly rows="3">${buildCharacterActionPrompt(char.id, 'smile', act.chapter)}</textarea>
                        </div>
                      `
                    )
                    .join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
              <h2>📖 心靈羈絆圖鑑（行為觀察紀錄 ＆ DSM-5-TR 診斷揭曉）</h2>
              <p>唯有在跨情境約會中收集滿該角色的核心行為線索，符合診斷標準後才會正式揭曉其人格障礙名稱與臨床解析。</p>
            </div>
            <div class="modal-header-btns">
              ${
                focusCharId
                  ? `<button class="nav-btn" data-action="open-compendium">顯示全部 12 位角色</button>`
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
                        <span class="comp-code">${diag.diagnosed ? `${char.dsmCode}｜Cluster ${char.cluster}` : `🔍 心靈線索進度：${cs.unlockedCriteria.length} / ${char.criteria.length}`}</span>
                        <h3>#${char.number} ${char.name} — ${diag.diagnosed ? `${char.dsmTitle} (${char.dsmTitleEn})` : '🔒 心靈真相未揭曉（需達診斷標準）'}</h3>
                        <p class="comp-meta">${char.genderLabel}｜${char.orientationLabel}｜${char.occupation}</p>
                      </div>
                    </div>

                    ${
                      diag.diagnosed
                        ? `
                          <p class="comp-overview"><strong>🧠 臨床核心特徵：</strong>${char.clinicalOverview}</p>
                          <p class="comp-diff">${char.differentialNote}</p>
                          <p class="comp-hint"><strong>💌 戀愛相處關鍵：</strong>${char.strategyHint}</p>
                        `
                        : `
                          <div class="comp-locked-banner">
                            🔒 <strong>尚未達 DSM-5-TR 確診門檻（目前已觀察到 ${cs.unlockedCriteria.length} / ${char.criteria.length} 項特徵）</strong><br/>
                            <span>提示：請與 ${char.name} 進行第 1～3 章約會劇情互動。當收集滿 ${char.criteria.length} 項核心準則時，將正式揭曉其心靈真相與臨床鑑別分析。</span>
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
                              <p>${unlocked ? this.maskUndiagnosedText(cr.desc, char.id) : '（推進與該角色的約會章節即可觀察並記錄此特徵）'}</p>
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
              <h2>💾 戀愛記憶存檔與讀檔</h2>
              <p>所有進度皆已即時保存在瀏覽器 Session / LocalStorage 中，下次打開網頁會自動接續！</p>
            </div>
            <button class="btn-close" data-action="close-modal">✕</button>
          </div>

          <div class="modal-body save-slots-list">
            <div class="save-slot-card" style="border-color:#f472b6;">
              <div>
                <strong style="color:#f9a8d4;">⚡ 瀏覽器自動接續記憶 (Session Auto-Resume)</strong>
                <p>主角：${this.state.player.name}｜Day ${this.state.day}・已揭曉真相 ${CHARACTERS.filter((c) => this.isDiagnosed(c.id)).length}/12 人</p>
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
                          ? `<p>主角：${st.player.name}｜Day ${st.day}｜已揭曉真相 ${diagCount}/12 人</p>
                             <small>儲存時間：${info.savedAt}</small>`
                          : `<p style="color:#cbd5e1;">— 空白槽位 —</p>`
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
              <button class="nav-btn" style="color:#fda4af; border-color:rgba(253,164,175,0.4);" data-action="clear-all-saves">
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
      neutral: '平靜凝視 (Calm Gaze)',
      smile: '溫柔心動 (Affectionate)',
      vulnerable: '脆弱動搖 (Vulnerable)',
      anxious: '不安警戒 (Guarded)',
      triggered: '情緒激盪 (Intense)'
    };
    return map[expr] || map.neutral;
  }

  renderECGSVG(expression, color) {
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
