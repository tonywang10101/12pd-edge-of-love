// 《愛的邊緣》(Edge of Love) — 全遊戲圖片預載與本地 Blob 記憶體快取管理器
// 在玩家點擊「開始」時確保所有角色常態/情緒立繪與場景背景皆已完整下載並解碼至本地記憶體，
// 並透過 blob: Object URL 確保切換場景或情緒時零網路延遲、不重複向伺服器請求。

import { CHARACTERS } from '../data/characters.js?v=24';
import { CHARACTER_PROMPTS, SCENE_BACKGROUNDS } from '../data/characterPrompts.js?v=24';

const blobUrlCache = new Map();
const decodedImageCache = new Map();
let activePreloadPromise = null;
const progressSubscribers = new Set();

function normalizeAssetKey(url = '') {
  const clean = String(url).split('?')[0].split('#')[0].trim();
  if (!clean) return '';
  if (clean.startsWith('./')) return clean;
  if (clean.startsWith('/assets/')) return `.${clean}`;
  if (clean.startsWith('assets/')) return `./${clean}`;
  return clean;
}

export function resolveAssetUrl(url = '') {
  if (!url) return url;
  const key = normalizeAssetKey(url);
  return blobUrlCache.get(key) || url;
}

export function getAllGameImageAssets() {
  const list = [];
  const seen = new Set();

  const pushAsset = (url, label, category) => {
    const key = normalizeAssetKey(url);
    if (!key || seen.has(key)) return;
    seen.add(key);
    list.push({ key, url: key, label, category });
  };

  Object.values(SCENE_BACKGROUNDS).forEach((bg) => {
    if (bg?.imagePath) {
      pushAsset(bg.imagePath, `場景・${bg.name}`, 'background');
    }
  });

  CHARACTERS.forEach((char) => {
    const promptInfo = CHARACTER_PROMPTS[char.id];
    const basePath = promptInfo?.imagePath || `./assets/characters/${char.id}.png`;
    const emoPath = promptInfo?.emotionalImagePath || `./assets/characters/${char.id}_emotional.png`;
    pushAsset(basePath, `${char.name}・常態立繪`, 'character');
    pushAsset(emoPath, `${char.name}・情緒立繪`, 'character-emotional');
  });

  return list;
}

export function areAllAssetsPreloaded() {
  const assets = getAllGameImageAssets();
  return assets.every((a) => decodedImageCache.has(a.key));
}

function decodeImageElement(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';

    const finishSuccess = () => {
      if (typeof img.decode === 'function') {
        img.decode().catch(() => {}).finally(() => resolve(img));
      } else {
        resolve(img);
      }
    };

    img.onload = finishSuccess;
    img.onerror = () => reject(new Error(`Failed to decode image: ${src}`));
    img.src = src;

    if (img.complete && img.naturalWidth > 0) {
      finishSuccess();
    }
  });
}

async function fetchAssetAsBlob(url, onBytesChunk) {
  const response = await fetch(url, { mode: 'cors', credentials: 'same-origin' });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }

  const contentLengthHeader = response.headers.get('content-length');
  const totalBytes = contentLengthHeader ? Number(contentLengthHeader) || 0 : 0;
  const contentType = response.headers.get('content-type') || '';

  if (response.body && typeof response.body.getReader === 'function') {
    const reader = response.body.getReader();
    const chunks = [];
    let receivedBytes = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        chunks.push(value);
        receivedBytes += value.byteLength;
        if (onBytesChunk) {
          onBytesChunk(receivedBytes, totalBytes);
        }
      }
    }

    return {
      blob: new Blob(chunks, contentType ? { type: contentType } : undefined),
      byteLength: receivedBytes
    };
  }

  const blob = await response.blob();
  if (onBytesChunk) {
    onBytesChunk(blob.size, totalBytes || blob.size);
  }
  return { blob, byteLength: blob.size };
}

function waitMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loadSingleAsset(asset, onAssetProgress) {
  if (decodedImageCache.has(asset.key) && blobUrlCache.has(asset.key)) {
    const prevBytes = decodedImageCache.get(asset.key)?._byteSize || 0;
    onAssetProgress(1, prevBytes);
    return { ok: true, asset, cached: true };
  }

  const maxAttempts = 3;
  let lastError = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const { blob, byteLength } = await fetchAssetAsBlob(asset.url, (received, totalHeader) => {
        const fraction = totalHeader > 0 ? Math.min(0.9, (received / totalHeader) * 0.9) : 0.45;
        onAssetProgress(fraction, received);
      });

      const prevBlobUrl = blobUrlCache.get(asset.key);
      if (prevBlobUrl && prevBlobUrl.startsWith('blob:')) {
        URL.revokeObjectURL(prevBlobUrl);
      }

      const objectUrl = URL.createObjectURL(blob);
      const img = await decodeImageElement(objectUrl);
      img._byteSize = byteLength || blob.size;

      blobUrlCache.set(asset.key, objectUrl);
      decodedImageCache.set(asset.key, img);
      onAssetProgress(1, img._byteSize);
      return { ok: true, asset, cached: false };
    } catch (err) {
      lastError = err;
      if (attempt < maxAttempts) {
        await waitMs(attempt * 350);
      }
    }
  }

  // Fallback: 若 fetch 被特殊環境阻擋，退回直接用 <img> 載入瀏覽器快取
  try {
    const img = await decodeImageElement(asset.url);
    decodedImageCache.set(asset.key, img);
    onAssetProgress(1, 0);
    return { ok: true, asset, cached: false, fallbackImg: true };
  } catch (imgErr) {
    onAssetProgress(1, 0);
    return { ok: false, asset, error: lastError || imgErr };
  }
}

export function formatBytesMB(bytes = 0) {
  return (bytes / (1024 * 1024)).toFixed(1);
}

export function preloadAllAssets({ concurrency = 6, onProgress } = {}) {
  if (onProgress) {
    progressSubscribers.add(onProgress);
  }

  if (activePreloadPromise) {
    return activePreloadPromise.finally(() => {
      if (onProgress) progressSubscribers.delete(onProgress);
    });
  }

  const assets = getAllGameImageAssets();
  const totalCount = assets.length;
  const assetFractions = new Array(totalCount).fill(0);
  const assetBytes = new Array(totalCount).fill(0);
  const failedAssets = [];
  let loadedCount = 0;
  let completedCount = 0;
  let currentLabel = assets[0]?.label || '準備圖檔中…';

  const emitProgress = (done = false) => {
    let fractionSum = 0;
    let totalBytes = 0;
    for (let i = 0; i < totalCount; i++) {
      fractionSum += assetFractions[i];
      totalBytes += assetBytes[i];
    }
    const percent = totalCount > 0 ? Math.min(100, Math.round((fractionSum / totalCount) * 100)) : 100;
    const snapshot = {
      totalCount,
      loadedCount,
      failedCount: failedAssets.length,
      completedCount,
      failedAssets: [...failedAssets],
      loadedBytes: totalBytes,
      percent: done && failedAssets.length === 0 ? 100 : Math.min(done ? 100 : 99, percent),
      currentLabel,
      done
    };
    progressSubscribers.forEach((cb) => {
      try {
        cb(snapshot);
      } catch (_) {
        // ignore subscriber error
      }
    });
    return snapshot;
  };

  emitProgress(false);

  let nextIdx = 0;
  const workerCount = Math.min(Math.max(1, concurrency), Math.max(1, totalCount));

  const runWorker = async () => {
    while (true) {
      const idx = nextIdx++;
      if (idx >= totalCount) break;
      const asset = assets[idx];
      currentLabel = asset.label;

      const result = await loadSingleAsset(asset, (frac, bytes) => {
        if (frac > assetFractions[idx]) assetFractions[idx] = frac;
        if (bytes > assetBytes[idx]) assetBytes[idx] = bytes;
        emitProgress(false);
      });

      assetFractions[idx] = 1;
      completedCount += 1;
      if (result.ok) {
        loadedCount += 1;
      } else {
        failedAssets.push(asset);
      }
      emitProgress(false);
    }
  };

  activePreloadPromise = Promise.all(Array.from({ length: workerCount }, () => runWorker()))
    .then(() => {
      currentLabel =
        failedAssets.length === 0 ? '所有人物立繪與場景記憶已就緒 ✨' : `有 ${failedAssets.length} 張圖片載入失敗`;
      return emitProgress(true);
    })
    .finally(() => {
      activePreloadPromise = null;
      if (onProgress) progressSubscribers.delete(onProgress);
    });

  return activePreloadPromise;
}
