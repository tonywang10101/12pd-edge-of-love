// Original 16-bar romantic miniature, rendered without external samples.
// Regenerate: node scripts/compose-background.mjs && ffmpeg -y -i /tmp/edge-of-love-bgm.wav -codec:a libmp3lame -b:a 128k assets/audio/apartment-at-dusk.mp3
import fs from 'node:fs';
const rate = 24000, beat = 60 / 72, bar = beat * 4;
const count = Math.round(16 * bar * rate);
const left = new Float32Array(count), right = new Float32Array(count);
const hz = midi => 440 * 2 ** ((midi - 69) / 12);
function note(midi, start, duration, amplitude, pan = 0, pad = false) {
  const frequency = hz(midi), frames = Math.ceil(duration * rate), offset = Math.round(start * rate);
  const l = Math.sqrt((1 - pan) / 2), r = Math.sqrt((1 + pan) / 2);
  for (let n = 0; n < frames; n++) {
    const t = n / rate, phase = 2 * Math.PI * frequency * t;
    const attack = 1 - Math.exp(-t / (pad ? .45 : .012));
    const release = Math.min(1, (duration - t) / (pad ? .9 : .35));
    const envelope = attack * Math.max(0, release) * Math.exp(-t / (pad ? 4.5 : 1.15));
    const tone = pad
      ? .65 * Math.sin(phase) + .17 * Math.sin(phase * 1.0015) + .08 * Math.sin(phase * 2)
      : Math.sin(phase) + .24 * Math.exp(-t * 1.8) * Math.sin(phase * 2.001) + .08 * Math.exp(-t * 3) * Math.sin(phase * 3.002);
    const value = tone * envelope * amplitude;
    const index = (offset + n) % count;
    left[index] += value * l; right[index] += value * r;
  }
}
// Cmaj9 – G/B – Am9 – Fmaj9, with a Dm/G turnaround.
const chords = [
  [48,55,59,62,64], [47,55,59,62,67], [45,52,55,59,60], [41,48,52,55,57],
  [48,55,59,62,64], [47,55,59,62,67], [50,57,60,64,65], [43,50,55,57,62],
  [48,55,59,62,64], [47,55,59,62,67], [45,52,55,59,60], [41,48,52,55,57],
  [50,57,60,64,65], [43,50,55,59,62], [41,48,52,55,57], [43,50,55,59,62]
];
// A small melody with breaths, a second phrase, then a gentle return to C.
const melody = [
  [[0,76,1.5],[2,79,1],[3,74,.8]], [[0,74,2],[2.5,71,1]],
  [[0,72,1.5],[2,76,1.5]], [[0,69,2.5],[3,67,.7]],
  [[0,67,1],[1.5,72,1],[3,74,.8]], [[0,71,2.5]],
  [[0,69,1.5],[2,72,1]], [[0,71,1.5],[2,74,1]],
  [[0,76,2],[2.5,79,1]], [[0,74,1.5],[2,71,1.5]],
  [[0,72,1],[1.5,76,1],[3,79,.8]], [[0,77,2.5],[3,76,.7]],
  [[0,74,1.5],[2,72,1.5]], [[0,71,1.5],[2,67,1.5]],
  [[0,69,2],[2.5,72,1]], [[0,71,1.5],[2,67,1]]
];
chords.forEach((chord, b) => {
  note(chord[0], b * bar, 4.7, .055, -.12);
  chord.slice(1).forEach((m, i) => note(m, b * bar, 5.8, .017, (i - 1.5) * .24, true));
  [0,2,3,1,4,2].forEach((index, i) => note(chord[index] + 12, b * bar + (i * .5 + .5) * beat, 2.7, .034 * (i % 2 ? .8 : 1), i % 2 ? .32 : -.32));
  melody[b].forEach(([at,m,length]) => note(m, b * bar + at * beat, length * beat + 1.1, .064, .08));
});
// Circular reflections keep the reverb tail continuous at the loop boundary.
for (const [delay, volume] of [[.137,.11],[.283,.08],[.431,.055],[.719,.035]]) {
  const offset = Math.round(delay * rate), a = left.slice(), b = right.slice();
  for (let n = 0; n < count; n++) {const source = (n - offset + count) % count; left[n] += b[source] * volume; right[n] += a[source] * volume;}
}
let peak = 0, square = 0;
for(let n=0;n<count;n++){peak=Math.max(peak,Math.abs(left[n]),Math.abs(right[n]));square+=left[n]**2+right[n]**2;}
const gain = .55 / peak;
const pcm = Buffer.alloc(count * 4);
for(let n=0;n<count;n++){pcm.writeInt16LE(Math.round(left[n]*gain*32767),n*4);pcm.writeInt16LE(Math.round(right[n]*gain*32767),n*4+2);}
const header = Buffer.alloc(44);
header.write('RIFF');header.writeUInt32LE(36+pcm.length,4);header.write('WAVEfmt ',8);header.writeUInt32LE(16,16);header.writeUInt16LE(1,20);header.writeUInt16LE(2,22);header.writeUInt32LE(rate,24);header.writeUInt32LE(rate*4,28);header.writeUInt16LE(4,32);header.writeUInt16LE(16,34);header.write('data',36);header.writeUInt32LE(pcm.length,40);
fs.writeFileSync('/tmp/edge-of-love-bgm.wav',Buffer.concat([header,pcm]));
console.log(JSON.stringify({seconds:count/rate,peak:.55,rms:Math.sqrt(square/(count*2))*gain,loopBoundary:[Math.abs(left[0]-left[count-1])*gain,Math.abs(right[0]-right[count-1])*gain]}));
