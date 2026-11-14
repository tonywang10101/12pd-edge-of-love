# 公寓暮色 / Apartment at Dusk

原創程序合成的戀愛感輕音樂，沒有使用外部錄音或取樣。

- 53.333 秒、72 BPM、16 小節；柔和鋼琴音色、分解和弦與環境音墊。
- 全場景共用同一個循環播放器，遊戲播放音量 16%，約 0.8 秒淡入。
- 第一次點擊或鍵盤操作後播放；切頁續播、背景分頁暫停、回到分頁接續。
- 音樂與音效共用頂部開關，靜音偏好獨立保存在此瀏覽器。
- 組曲與渲染程式：`scripts/compose-background.mjs`。

在專案根目錄重新產生音檔（需要 Node.js 與 ffmpeg）：

```sh
node scripts/compose-background.mjs
ffmpeg -y -i /tmp/edge-of-love-bgm.wav -codec:a libmp3lame -b:a 128k assets/audio/apartment-at-dusk.mp3
```
