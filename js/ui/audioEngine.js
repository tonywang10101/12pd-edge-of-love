// Shared low-volume background music and Web Audio interaction effects.

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.music = null;
    this.unlocked = false;
    this.visible = typeof document === 'undefined' || document.visibilityState !== 'hidden';
    this.fadeTimer = null;
    try { this.enabled = localStorage.getItem('edge_of_love_audio_enabled') !== 'false'; } catch (_) {}
  }

  unlock() {
    this.unlocked = true;
    this.init();
  }

  setVisible(visible) {
    this.visible = visible;
    if (!visible) this.pause();
    else if (this.unlocked) this.init();
  }

  startMusic() {
    if (!this.enabled || !this.unlocked || !this.visible || typeof Audio === 'undefined') return;
    if (!this.music) {
      this.music = new Audio(new URL('../../assets/audio/apartment-at-dusk.mp3', import.meta.url).href);
      this.music.id = 'background-music';
      this.music.hidden = true;
      this.music.setAttribute?.('aria-hidden', 'true');
      document.body?.appendChild(this.music);
      this.music.loop = true;
      this.music.preload = 'none';
      this.music.volume = 0;
    }
    if (!this.music.paused) return;
    this.music.volume = 0;
    this.music.play().then(() => {
      if (!this.enabled || !this.visible) { this.pause(); return; }
      clearInterval(this.fadeTimer);
      this.fadeTimer = setInterval(() => {
        this.music.volume = Math.min(.16, this.music.volume + .008);
        if (this.music.volume >= .16) { clearInterval(this.fadeTimer); this.fadeTimer = null; }
      }, 40);
    }).catch(() => { /* Retry on the next gesture if playback was blocked. */ });
  }

  pause() {
    clearInterval(this.fadeTimer);
    this.fadeTimer = null;
    if (this.music) { this.music.pause(); this.music.volume = 0; }
    if (this.ctx?.state === 'running') this.ctx.suspend().catch(() => {});
  }

  init() {
    if (!this.enabled || !this.visible) return;
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    this.startMusic();
  }

  toggle() {
    this.enabled = !this.enabled;
    try { localStorage.setItem('edge_of_love_audio_enabled', String(this.enabled)); } catch (_) {}
    if (this.enabled) this.unlock();
    else this.pause();
    return this.enabled;
  }

  playChime(freq = 440, duration = 0.15, type = 'sine', volume = 0.035) {
    if (!this.enabled || !this.visible) return;
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
