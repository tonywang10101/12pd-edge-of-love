import test from 'node:test';
import assert from 'node:assert/strict';

test('music waits for a gesture, stays shared, pauses in background and remembers mute', async () => {
  const names = ['Audio', 'window', 'document', 'localStorage'];
  const descriptors = names.map(name => Object.getOwnPropertyDescriptor(globalThis, name));
  const store = new Map();
  let created = 0, audio;
  class FakeAudio {
    constructor(src) { this.src = src; this.paused = true; this.currentTime = 0; created++; }
    play() { this.paused = false; return Promise.resolve(); }
    pause() { this.paused = true; }
  }
  Object.assign(globalThis, {
    Audio: FakeAudio, window: {}, document: {visibilityState: 'visible'},
    localStorage: {getItem: key => store.get(key), setItem: (key, value) => store.set(key, value)}
  });
  try {
    ({audio} = await import('../js/ui/audioEngine.js?lifecycle'));
    audio.init();
    assert.equal(created, 0, 'do not load music before interaction');
    audio.unlock(); await Promise.resolve();
    assert.equal(created, 1);
    assert.equal(audio.music.loop, true);
    assert.match(audio.music.src, /assets\/audio\/apartment-at-dusk\.mp3$/);
    audio.music.currentTime = 17;
    audio.init();
    assert.equal(created, 1, 'scene changes reuse one player');
    assert.equal(audio.music.currentTime, 17);
    audio.setVisible(false);
    assert.equal(audio.music.paused, true);
    audio.setVisible(true); await Promise.resolve();
    assert.equal(audio.music.paused, false);
    assert.equal(audio.music.currentTime, 17, 'resume rather than restart');
    assert.equal(audio.toggle(), false);
    assert.equal(audio.music.paused, true);
    assert.equal(audio.music.volume, 0);
    assert.equal(store.get('edge_of_love_audio_enabled'), 'false');
    const reloaded = (await import('../js/ui/audioEngine.js?muted-reload')).audio;
    reloaded.unlock();
    assert.equal(reloaded.enabled, false);
    assert.equal(reloaded.music, null, 'saved mute prevents playback after reload');
  } finally {
    audio?.pause();
    names.forEach((name, i) => descriptors[i] ? Object.defineProperty(globalThis, name, descriptors[i]) : delete globalThis[name]);
  }
});
