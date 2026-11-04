// 《愛的邊緣》Web Audio API 合成音效引擎（無須外部音檔，純程序化心電圖與環境音效）

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.init();
      this.playChime(523.25, 0.12);
    }
    return this.enabled;
  }

  playChime(freq = 440, duration = 0.15, type = 'sine', volume = 0.08) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (_) {
      // 忽略瀏覽器自動播放限制錯誤
    }
  }

  playSelect() {
    this.playChime(587.33, 0.1, 'triangle', 0.07);
    setTimeout(() => this.playChime(880, 0.14, 'sine', 0.06), 55);
  }

  playUnlockDSM() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, idx) => {
      setTimeout(() => this.playChime(n, 0.22, 'sine', 0.07), idx * 75);
    });
  }

  playTriggerWarning() {
    this.playChime(196, 0.25, 'sawtooth', 0.06);
    setTimeout(() => this.playChime(174.61, 0.35, 'sawtooth', 0.06), 120);
  }

  playEndingChord(isGood = true) {
    const notes = isGood ? [261.63, 329.63, 392.0, 523.25] : [220, 261.63, 311.13, 415.3];
    notes.forEach((n, idx) => {
      setTimeout(() => this.playChime(n, 0.65, 'triangle', 0.06), idx * 110);
    });
  }
}

export const audio = new AudioEngine();
