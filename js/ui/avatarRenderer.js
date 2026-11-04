// 《愛的邊緣》角色動態 SVG 立繪與頭像渲染引擎
// 根據 12 位角色的外觀特徵、專屬道具與當下情緒（neutral / smile / vulnerable / anxious / triggered）繪製精緻向量立繪

export function renderCharacterSVG(char, expression = 'neutral', mode = 'portrait') {
  const { avatar, themeColor, id, cluster } = char;
  const isMini = mode === 'mini';
  const viewBox = isMini ? '0 0 200 200' : '0 0 320 420';

  // 依據情緒決定眼睛、眉毛、嘴巴與特效
  const expr = getExpressionGeometry(expression, avatar.eyeColor, themeColor);
  const hairBack = getHairBackSVG(avatar.hairStyle, avatar.hairColor);
  const hairFront = getHairFrontSVG(avatar.hairStyle, avatar.hairColor, id);
  const accessorySVG = isMini ? '' : getAccessorySVG(avatar.accessory, avatar.accentColor);
  const outfitSVG = getOutfitSVG(char, avatar.outfitColor, avatar.accentColor);

  // 情緒氛圍光暈
  let auraColor = themeColor;
  let auraPulseClass = 'aura-calm';
  if (expression === 'triggered') {
    auraColor = '#ef4444';
    auraPulseClass = 'aura-triggered';
  } else if (expression === 'anxious') {
    auraColor = '#f59e0b';
    auraPulseClass = 'aura-anxious';
  } else if (expression === 'smile') {
    auraPulseClass = 'aura-warm';
  }

  return `
    <svg class="char-svg ${auraPulseClass} expr-${expression}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="aura-${id}-${mode}" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stop-color="${auraColor}" stop-opacity="0.38" />
          <stop offset="65%" stop-color="${auraColor}" stop-opacity="0.1" />
          <stop offset="100%" stop-color="${auraColor}" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="outfit-${id}-${mode}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${avatar.outfitColor}" />
          <stop offset="100%" stop-color="#090d16" />
        </linearGradient>
        <linearGradient id="hair-${id}-${mode}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${avatar.hairColor}" />
          <stop offset="100%" stop-color="#09090b" />
        </linearGradient>
      </defs>

      <!-- 背景心理光暈與幾何環 -->
      <circle cx="${isMini ? 100 : 160}" cy="${isMini ? 100 : 175}" r="${isMini ? 92 : 145}" fill="url(#aura-${id}-${mode})" />
      <circle cx="${isMini ? 100 : 160}" cy="${isMini ? 100 : 175}" r="${isMini ? 82 : 125}" fill="none" stroke="${auraColor}" stroke-width="1" stroke-dasharray="${cluster === 'B' ? '6 4' : cluster === 'A' ? '2 8' : '12 4'}" opacity="0.45" />

      <g transform="${isMini ? 'translate(-60, -32)' : 'translate(0, 0)'}">
        <!-- 後髮 -->
        ${hairBack}

        <!-- 頸部與肩膀服裝 -->
        <path d="M142 195 L142 235 L178 235 L178 195 Z" fill="${avatar.skin}" />
        <path d="M142 212 Q160 222 178 212" fill="none" stroke="rgba(0,0,0,0.18)" stroke-width="3" />
        ${outfitSVG}

        <!-- 臉部輪廓 -->
        <path d="M112 115 C112 75, 208 75, 208 115 C208 158, 192 194, 160 204 C128 194, 112 158, 112 115 Z" fill="${avatar.skin}" stroke="rgba(0,0,0,0.15)" stroke-width="1.5" />

        <!-- 耳朵 -->
        <path d="M112 135 C103 135, 103 158, 114 162" fill="${avatar.skin}" stroke="rgba(0,0,0,0.15)" stroke-width="1.5" />
        <path d="M208 135 C217 135, 217 158, 206 162" fill="${avatar.skin}" stroke="rgba(0,0,0,0.15)" stroke-width="1.5" />

        <!-- 臉紅／陰影情緒特效 -->
        ${expr.faceOverlay}

        <!-- 眼睛與眉毛 -->
        ${expr.brows}
        ${expr.eyes}

        <!-- 鼻子與嘴唇 -->
        <path d="M159 152 L157 163 L162 164" fill="none" stroke="rgba(0,0,0,0.22)" stroke-width="1.6" stroke-linecap="round" />
        ${expr.mouth}

        <!-- 前髮與角色特徵（如陸晴嵐額角疤痕、溫言眼鏡） -->
        ${hairFront}

        <!-- 角色專屬識別道具 -->
        ${accessorySVG}
      </g>
    </svg>
  `;
}

function getExpressionGeometry(expression, eyeColor, themeColor) {
  let brows = '';
  let eyes = '';
  let mouth = '';
  let faceOverlay = '';

  // 共通眼型基底
  const baseEyes = (pupilScale = 1, highlight = true, tear = false) => `
    <!-- 左眼 -->
    <g transform="translate(135, 140)">
      <ellipse cx="0" cy="0" rx="11" ry="8" fill="#ffffff" />
      <path d="M-12 -3 Q0 -11 12 -2" fill="none" stroke="#1e293b" stroke-width="2.6" stroke-linecap="round" />
      <circle cx="0" cy="0" r="${6.2 * pupilScale}" fill="${eyeColor}" />
      <circle cx="0" cy="0" r="${3.2 * pupilScale}" fill="#090d16" />
      ${highlight ? '<circle cx="-2.5" cy="-2.5" r="2.2" fill="#ffffff" /><circle cx="2.5" cy="2" r="1" fill="#ffffff" />' : ''}
      ${tear ? '<path d="M-6 7 Q-8 15 -4 17 Q0 15 -2 7 Z" fill="#38bdf8" opacity="0.85" />' : ''}
    </g>
    <!-- 右眼 -->
    <g transform="translate(185, 140)">
      <ellipse cx="0" cy="0" rx="11" ry="8" fill="#ffffff" />
      <path d="M-12 -2 Q0 -11 12 -3" fill="none" stroke="#1e293b" stroke-width="2.6" stroke-linecap="round" />
      <circle cx="0" cy="0" r="${6.2 * pupilScale}" fill="${eyeColor}" />
      <circle cx="0" cy="0" r="${3.2 * pupilScale}" fill="#090d16" />
      ${highlight ? '<circle cx="-2.5" cy="-2.5" r="2.2" fill="#ffffff" /><circle cx="2.5" cy="2" r="1" fill="#ffffff" />' : ''}
      ${tear ? '<path d="M6 7 Q8 15 4 17 Q0 15 2 7 Z" fill="#38bdf8" opacity="0.85" />' : ''}
    </g>
  `;

  switch (expression) {
    case 'smile':
      brows = `
        <path d="M123 124 Q135 119 146 123" fill="none" stroke="#1e293b" stroke-width="2.2" stroke-linecap="round" />
        <path d="M174 123 Q185 119 197 124" fill="none" stroke="#1e293b" stroke-width="2.2" stroke-linecap="round" />
      `;
      eyes = baseEyes(1.05, true, false);
      mouth = `<path d="M150 177 Q160 185 170 177" fill="none" stroke="#be123c" stroke-width="2.4" stroke-linecap="round" />`;
      faceOverlay = `
        <ellipse cx="128" cy="156" rx="9" ry="4.5" fill="#fb7185" opacity="0.35" />
        <ellipse cx="192" cy="156" rx="9" ry="4.5" fill="#fb7185" opacity="0.35" />
      `;
      break;

    case 'vulnerable':
      brows = `
        <path d="M123 126 Q135 123 146 119" fill="none" stroke="#1e293b" stroke-width="2.2" stroke-linecap="round" />
        <path d="M174 119 Q185 123 197 126" fill="none" stroke="#1e293b" stroke-width="2.2" stroke-linecap="round" />
      `;
      eyes = baseEyes(1.1, true, true);
      mouth = `<path d="M153 181 Q160 177 167 181" fill="none" stroke="#be123c" stroke-width="2" stroke-linecap="round" />`;
      faceOverlay = `
        <ellipse cx="128" cy="156" rx="10" ry="5" fill="#f43f5e" opacity="0.42" />
        <ellipse cx="192" cy="156" rx="10" ry="5" fill="#f43f5e" opacity="0.42" />
      `;
      break;

    case 'anxious':
      brows = `
        <path d="M123 125 Q135 120 146 121" fill="none" stroke="#1e293b" stroke-width="2.2" stroke-linecap="round" />
        <path d="M174 121 Q185 120 197 125" fill="none" stroke="#1e293b" stroke-width="2.2" stroke-linecap="round" />
      `;
      eyes = baseEyes(0.88, true, false);
      mouth = `<path d="M151 180 Q156 177 160 180 Q164 183 169 179" fill="none" stroke="#9f1239" stroke-width="2" stroke-linecap="round" />`;
      faceOverlay = `
        <path d="M198 118 Q201 126 198 129 Q195 126 198 118 Z" fill="#38bdf8" opacity="0.75" />
      `;
      break;

    case 'triggered':
      brows = `
        <path d="M122 119 L147 127" fill="none" stroke="#1e293b" stroke-width="2.8" stroke-linecap="round" />
        <path d="M198 119 L173 127" fill="none" stroke="#1e293b" stroke-width="2.8" stroke-linecap="round" />
      `;
      eyes = baseEyes(0.72, false, false);
      mouth = `<path d="M149 183 Q160 174 171 183" fill="none" stroke="#881337" stroke-width="2.6" stroke-linecap="round" />`;
      faceOverlay = `
        <path d="M112 95 C112 75, 208 75, 208 95 L208 135 L112 135 Z" fill="rgba(15, 23, 42, 0.38)" />
      `;
      break;

    default: // neutral
      brows = `
        <path d="M123 123 Q135 121 146 123" fill="none" stroke="#1e293b" stroke-width="2.2" stroke-linecap="round" />
        <path d="M174 123 Q185 121 197 123" fill="none" stroke="#1e293b" stroke-width="2.2" stroke-linecap="round" />
      `;
      eyes = baseEyes(1, true, false);
      mouth = `<path d="M152 179 L168 179" fill="none" stroke="#9f1239" stroke-width="2.1" stroke-linecap="round" />`;
      break;
  }

  return { brows, eyes, mouth, faceOverlay };
}

function getHairBackSVG(style, color) {
  switch (style) {
    case 'long_straight':
      return `<path d="M102 110 L92 310 L228 310 L218 110 Z" fill="${color}" />`;
    case 'wavy_twin':
    case 'twintails_wavy':
      return `
        <path d="M105 110 C70 150, 65 250, 85 305 C98 270, 105 210, 115 160 Z" fill="${color}" />
        <path d="M215 110 C250 150, 255 250, 235 305 C222 270, 215 210, 205 160 Z" fill="${color}" />
        <path d="M106 105 L100 230 L220 230 L214 105 Z" fill="${color}" />
      `;
    case 'braid_soft':
      return `
        <path d="M105 110 L98 250 L222 250 L215 110 Z" fill="${color}" />
        <ellipse cx="112" cy="245" rx="14" ry="28" fill="${color}" />
      `;
    case 'queen_updo':
      return `
        <circle cx="160" cy="64" r="32" fill="${color}" />
        <path d="M108 110 L102 220 L218 220 L212 110 Z" fill="${color}" />
      `;
    case 'short_bob_scar':
      return `<path d="M102 115 C96 165, 102 205, 118 215 L202 215 C218 205, 224 165, 218 115 Z" fill="${color}" />`;
    default:
      return `<path d="M106 105 L104 185 L216 185 L214 105 Z" fill="${color}" />`;
  }
}

function getHairFrontSVG(style, color, id) {
  let baseBangs = `
    <path d="M106 125 C104 68, 216 68, 214 125 C202 95, 185 115, 175 102 C165 122, 145 118, 135 98 C125 115, 114 105, 106 125 Z" fill="${color}" />
  `;

  if (style === 'parted_neat') {
    baseBangs = `
      <path d="M106 120 C106 66, 214 66, 214 120 C195 92, 165 88, 140 112 C125 96, 112 105, 106 120 Z" fill="${color}" />
    `;
  } else if (style === 'undercut') {
    baseBangs = `
      <path d="M108 115 C110 62, 210 62, 212 115 C195 82, 175 118, 155 88 C138 115, 120 88, 108 115 Z" fill="${color}" />
    `;
  }

  // 特殊角色臉部細節：08 溫言與 10 紀嚴戴眼鏡，11 陸晴嵐額角手術微疤
  let extra = '';
  if (id === 'wen_yan' || id === 'ji_yan') {
    const frameColor = id === 'ji_yan' ? '#94a3b8' : '#d97706';
    extra = `
      <g stroke="${frameColor}" stroke-width="2" fill="rgba(255,255,255,0.08)">
        <rect x="119" y="129" width="32" height="21" rx="4" />
        <rect x="169" y="129" width="32" height="21" rx="4" />
        <line x1="151" y1="139" x2="169" y2="139" />
      </g>
    `;
  } else if (id === 'lu_qinglan') {
    // 額葉手術疤痕與金箔髮夾
    extra = `
      <path d="M182 98 L194 114" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" />
      <line x1="185" y1="102" x2="191" y2="100" stroke="#f59e0b" stroke-width="1.5" />
      <line x1="188" y1="108" x2="194" y2="106" stroke="#f59e0b" stroke-width="1.5" />
    `;
  } else if (id === 'ruri') {
    // 星野琉璃額飾
    extra = `
      <path d="M120 105 Q160 118 200 105" fill="none" stroke="#c084fc" stroke-width="1.8" />
      <polygon points="160,106 164,114 160,122 156,114" fill="#e9d5ff" />
    `;
  }

  return baseBangs + extra;
}

function getOutfitSVG(char, outfitColor, accentColor) {
  return `
    <g>
      <!-- 肩膀與外套主體 -->
      <path d="M68 420 L84 248 C95 232, 125 225, 142 225 L178 225 C195 225, 225 232, 236 248 L252 420 Z" fill="url(#outfit-${char.id}-portrait)" stroke="${accentColor}" stroke-width="1.5" />
      <!-- 領口設計 -->
      <path d="M135 225 L160 285 L185 225" fill="#f8fafc" opacity="0.9" />
      <path d="M124 225 L160 298 L196 225" fill="none" stroke="${accentColor}" stroke-width="3" />
      <!-- 胸前角色編號徽章 -->
      <rect x="192" y="268" width="34" height="18" rx="4" fill="rgba(15,23,42,0.85)" stroke="${accentColor}" stroke-width="1.2" />
      <text x="209" y="281" fill="${accentColor}" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">#${char.number}</text>
    </g>
  `;
}

function getAccessorySVG(accessory, accentColor) {
  switch (accessory) {
    case 'recorder':
      return `
        <g transform="translate(215, 315)">
          <rect x="0" y="0" width="32" height="58" rx="5" fill="#1e293b" stroke="${accentColor}" stroke-width="2" />
          <circle cx="16" cy="16" r="6" fill="#ef4444" />
          <text x="16" y="42" fill="#94a3b8" font-size="8" font-family="monospace" text-anchor="middle">REC</text>
        </g>
      `;
    case 'pocketwatch':
      return `
        <g transform="translate(225, 325)">
          <circle cx="16" cy="16" r="20" fill="#0f172a" stroke="${accentColor}" stroke-width="2.5" />
          <line x1="16" y1="16" x2="16" y2="4" stroke="${accentColor}" stroke-width="2" />
          <line x1="16" y1="16" x2="26" y2="16" stroke="#f8fafc" stroke-width="1.5" />
        </g>
      `;
    case 'tarot':
      return `
        <g transform="translate(218, 305) rotate(8)">
          <rect x="0" y="0" width="38" height="62" rx="4" fill="#2e1065" stroke="#e9d5ff" stroke-width="2" />
          <polygon points="19,14 25,30 19,46 13,30" fill="#c084fc" />
        </g>
      `;
    case 'plush_bunny':
      return `
        <g transform="translate(82, 315)">
          <ellipse cx="22" cy="30" rx="18" ry="20" fill="#fbcfe8" stroke="#ec4899" stroke-width="1.8" />
          <ellipse cx="14" cy="6" rx="5" ry="14" fill="#fbcfe8" stroke="#ec4899" stroke-width="1.8" />
          <ellipse cx="30" cy="8" rx="5" ry="14" transform="rotate(15 30 8)" fill="#fbcfe8" stroke="#ec4899" stroke-width="1.8" />
          <circle cx="16" cy="26" r="2.5" fill="#831843" />
          <circle cx="28" cy="26" r="2.5" fill="#831843" />
        </g>
      `;
    case 'kintsugi':
      return `
        <g transform="translate(210, 325)">
          <path d="M4 10 C4 36, 44 36, 44 10 Z" fill="#1e293b" stroke="#f59e0b" stroke-width="2" />
          <path d="M16 10 L22 22 L18 30 M28 10 L22 22 L34 26" fill="none" stroke="#fbbf24" stroke-width="2.2" />
        </g>
      `;
    default:
      return '';
  }
}
