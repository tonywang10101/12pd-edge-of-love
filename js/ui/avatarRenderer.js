// 《愛的邊緣》戀與製作人風格（SSR / SR 拱門金框）角色立繪與情緒特效渲染器

import { CHARACTER_PROMPTS } from '../data/characterPrompts.js?v=14';

export function renderCharacterSVG(char, expression = 'neutral', mode = 'portrait') {
  const promptData = CHARACTER_PROMPTS[char.id];
  const isIntenseEmotion =
    expression === 'triggered' || expression === 'vulnerable' || expression === 'anxious';
  const baseImg = promptData ? promptData.imagePath : `./assets/characters/${char.id}.png`;
  const emotionalImg =
    promptData?.emotionalImagePath || `./assets/characters/${char.id}_emotional.png`;
  const imgSrc = isIntenseEmotion ? emotionalImg : baseImg;
  const rarity = promptData?.rarity || 'SSR';
  const isMini = mode === 'mini';

  const exprClass = `otome-expr-${expression}`;

  if (isMini) {
    return `
      <div class="otome-mini-card ${exprClass}">
        <img src="${imgSrc}" alt="${char.name}" class="otome-char-img" loading="lazy" />
        <span class="otome-rarity-mini rarity-${rarity.toLowerCase()}">${rarity}</span>
        <div class="otome-shimmer-overlay"></div>
      </div>
    `;
  }

  return `
    <div class="otome-portrait-card ${exprClass}">
      <!-- 戀與製作人風格外層拱門金框與珠光暈染 -->
      <div class="otome-arch-frame">
        <img src="${imgSrc}" alt="${char.name}" class="otome-char-img-full" />
        <div class="otome-lighting-layer"></div>
        <div class="otome-bokeh-sparkles">
          <span class="sparkle s1">✦</span>
          <span class="sparkle s2">✧</span>
          <span class="sparkle s3">✦</span>
          <span class="sparkle s4">❀</span>
        </div>
      </div>

      <!-- 右上角 SSR / SR 燙金徽章 -->
      <div class="otome-rarity-badge rarity-${rarity.toLowerCase()}">
        <span>${rarity}</span>
      </div>

      <!-- 底部角色浪漫花體署名條 -->
      <div class="otome-card-signature">
        <span class="sig-name">${char.name}</span>
        <span class="sig-en">${char.enName}</span>
      </div>
    </div>
  `;
}
