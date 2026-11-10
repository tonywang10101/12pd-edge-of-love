// 《愛的邊緣》(Edge of Love) — 12 角色視覺設定與劇情動作生成 Prompt 資料庫
// 供後續根據不同劇情章節、情緒與動作自動組合一致的角色 CG 生成指令

export const MASTER_STYLE_PROMPT =
  'Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution.';

export const EMOTION_ACTION_MODIFIERS = {
  neutral: {
    label: '平靜凝視 (Default / Neutral)',
    prompt: 'calm and composed expression, looking directly at the viewer with subtle emotional depth, natural relaxed posture'
  },
  smile: {
    label: '溫柔心動 (Warm Smile / Affectionate)',
    prompt: 'soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles'
  },
  vulnerable: {
    label: '脆弱動搖 (Vulnerable / Tearful)',
    prompt: 'vulnerable and touched expression, glistening eyes with a single tear on the eyelashes, lowered guard, fragile and deeply moving romantic moment, soft moonlight rim lighting'
  },
  anxious: {
    label: '不安警戒 (Anxious / Guarded)',
    prompt: 'tense and guarded expression, slightly furrowed brows, hesitant posture, looking away slightly with conflicted emotions, dramatic twilight shadows'
  },
  triggered: {
    label: '情緒爆發／防衛激發 (Triggered / Intense)',
    prompt: 'intense and dramatic emotional expression, narrowed or widened eyes filled with shock and hurt, gripping their signature item tightly, high-contrast cinematic lighting'
  }
};

export const CHARACTER_PROMPTS = {
  shen_mo: {
    id: 'shen_mo',
    number: '01',
    name: '沈墨 (Shen Mo)',
    rarity: 'SSR',
    imagePath: './assets/characters/shen_mo.png',
    appearanceAnchor:
      'A handsome 27-year-old East Asian man (Shen Mo, investigative journalist), slightly messy dark indigo-black hair with soft bangs framing his sharp deep violet-blue eyes, wearing a tailored charcoal trench coat over a black turtleneck, signature silver voice recorder',
    basePrompt:
      'Otome game character portrait in the style of Love and Producer (戀與製作人), SSR card art style. A handsome 27-year-old East Asian man (Shen Mo, investigative journalist), slightly messy dark indigo-black hair with soft bangs framing his sharp, guarded deep violet-blue eyes. Wearing a tailored charcoal trench coat over a black turtleneck, holding a sleek silver voice recorder in one hand. Standing on a rainy city rooftop at twilight with soft neon rose and indigo bokeh lights in the background, warm rim lighting on his face, mysterious and intense romantic gaze, masterpiece anime illustration.',
    storyActions: [
      {
        chapter: 1,
        title: '第一章動作：門縫後的防竊聽警戒',
        actionPrompt:
          'standing behind a half-open apartment door with a security chain, holding a signal detector toward the viewer, suspicious yet intrigued sharp gaze, dim hallway neon lighting'
      },
      {
        chapter: 2,
        title: '第二章動作：天台雨夜對質與鬆懈',
        actionPrompt:
          'standing on a rainy city rooftop at midnight gripping the wet railing, looking at a receipt in his hand with softened eyes and parted lips, rain droplets catching indigo and rose bokeh light'
      },
      {
        chapter: 3,
        title: '第三章動作：交出備用鑰匙的告白',
        actionPrompt:
          'sitting in a sunlit study room with half-open curtains, extending his palm holding a silver key toward the viewer, a rare gentle smile and slightly reddened ears, warm morning golden flare'
      }
    ]
  },

  lin_jianwei: {
    id: 'lin_jianwei',
    number: '02',
    name: '林見微 (Lin Jianwei)',
    rarity: 'SSR',
    imagePath: './assets/characters/lin_jianwei.png',
    appearanceAnchor:
      'A breathtaking 25-year-old East Asian woman (Lin Jianwei, astronomer and antique watchmaker), long silky straight raven-black hair, calm and ethereal ice-blue eyes with long eyelashes, porcelain skin, wearing an elegant vintage slate-blue vest over a crisp white blouse, golden antique pocket watch',
    basePrompt:
      'Otome romance game character portrait in the style of Love and Producer (戀與製作人), SSR card art style. A breathtaking 25-year-old East Asian woman (Lin Jianwei, astronomer and antique watchmaker), long silky straight raven-black hair, calm and ethereal ice-blue eyes with long eyelashes, porcelain skin. Wearing an elegant vintage slate-blue vest over a crisp white blouse, holding a delicate golden antique pocket watch with a fine chain. Starry observatory dome background with soft glowing stardust and dreamy silver-blue bokeh flares, serene and poetic atmosphere, masterpiece anime illustration.',
    storyActions: [
      {
        chapter: 1,
        title: '第一章動作：天台獨自校準赤道儀',
        actionPrompt:
          'adjusting a brass astronomical telescope on a quiet rooftop under the autumn full moon, looking back over her shoulder with a calm, crystal-clear gaze, silver moonlight rim light'
      },
      {
        chapter: 2,
        title: '第二章動作：鐘錶室裡聽雨傾訴',
        actionPrompt:
          'sitting at a wooden watchmaker workbench surrounded by vintage clocks, holding a warm teacup with both hands, looking at the viewer with a rare vulnerable and relieved expression'
      },
      {
        chapter: 3,
        title: '第三章動作：共享雙星望遠鏡目鏡',
        actionPrompt:
          'standing close beside a giant observatory telescope under a meteor shower, holding open an engraved golden pocket watch, a faint ethereal smile on her lips, starry bokeh sparkles'
      }
    ]
  },

  ruri: {
    id: 'ruri',
    number: '03',
    name: '星野 琉璃 (Hoshino Ruri)',
    rarity: 'SSR',
    imagePath: './assets/characters/ruri.png',
    appearanceAnchor:
      'An enchanting 23-year-old East Asian beauty (Hoshino Ruri, tarot astrologer and vintage shop owner), wavy plum-violet hair with delicate silver star hairpins and a crystal forehead ornament, luminous amethyst eyes, wearing a romantic bohemian velvet shawl with gold embroidery',
    basePrompt:
      'Otome romance game character portrait in the style of Love and Producer (戀與製作人), SSR card art style. An enchanting 23-year-old androgynous East Asian beauty (Hoshino Ruri, tarot astrologer and vintage shop owner), wavy plum-violet hair with delicate silver star hairpins and a crystal forehead ornament, luminous amethyst eyes. Wearing a romantic bohemian velvet shawl with gold embroidery, holding a glowing gilded tarot card. Warm candlelight and floating lavender prism sparkles in an antique atelier background, dreamy and mystical romantic gaze, masterpiece anime illustration.',
    storyActions: [
      {
        chapter: 1,
        title: '第一章動作：紫水晶靈擺占卜',
        actionPrompt:
          'holding a glowing amethyst pendulum suspended from a silver chain in a vintage shop filled with wind chimes, wide mystical eyes studying the viewer’s aura'
      },
      {
        chapter: 2,
        title: '第二章動作：逃離茶會後緊握雙手',
        actionPrompt:
          'leaning against a quiet sunlit corridor wall catching her breath, holding onto the viewer’s warm hand with both of hers, tear-glistening amethyst eyes filled with gratitude'
      },
      {
        chapter: 3,
        title: '第三章動作：閣樓燭光下的小指契約',
        actionPrompt:
          'sitting across a tarot table lit by warm candles, extending her pinky finger adorned with a silver ring for a pinky promise, radiant and dreamy smile'
      }
    ]
  },

  han_xiao: {
    id: 'han_xiao',
    number: '04',
    name: '韓梟 (Han Xiao)',
    rarity: 'SSR',
    imagePath: './assets/characters/han_xiao.png',
    appearanceAnchor:
      'A dangerously handsome 28-year-old East Asian man (Han Xiao, underground bartender and motorcycle racer), styled jet-black undercut hair, captivating crimson-amber eyes, wearing a burgundy dress shirt with top buttons undone and a black leather jacket',
    basePrompt:
      'Otome game character portrait in the style of Love and Producer (戀與製作人), SSR card art style. A dangerously handsome 28-year-old East Asian man (Han Xiao, underground bartender and motorcycle racer), styled jet-black undercut hair, captivating crimson-amber eyes, a charming and provocative half-smile. Wearing a burgundy dress shirt with the top buttons undone and a black leather jacket draped over his shoulders, holding a crystal cocktail glass with amber liquid. Warm golden-rose bar lighting with dreamy bokeh sparkles, intense romantic tension, masterpiece anime illustration.',
    storyActions: [
      {
        chapter: 1,
        title: '第一章動作：吧台撐顎挑眉博弈',
        actionPrompt:
          'leaning across a polished mahogany bar counter, resting his chin on one hand while sliding a contract with the other, a dangerously charming smirk and amused crimson-amber eyes'
      },
      {
        chapter: 2,
        title: '第二章動作：午夜重機遞出安全帽',
        actionPrompt:
          'sitting astride a sleek black Ducati motorcycle on a city overpass at night, holding out a racing helmet toward the viewer with a wild, exhilarated grin, neon city light trails'
      },
      {
        chapter: 3,
        title: '第三章動作：點燃支票的吻手禮',
        actionPrompt:
          'in a dimly lit VIP lounge, holding a lighter with a burning check in one hand while gently kissing the viewer’s fingertips with the other, intense devoted gaze'
      }
    ]
  },

  su_fei: {
    id: 'su_fei',
    number: '05',
    name: '蘇緋 (Su Fei)',
    rarity: 'SSR',
    imagePath: './assets/characters/su_fei.png',
    appearanceAnchor:
      'A gorgeous 22-year-old East Asian woman (Su Fei, expressionist painter and indie vocalist), wavy rose-crimson hair tied in soft side ribbons, emotional and sparkling ruby-pink eyes, wearing an off-shoulder cream knit sweater, vintage pastel-pink plush bunny',
    basePrompt:
      'Otome romance game character portrait in the style of Love and Producer (戀與製作人), SSR card art style. A gorgeous 22-year-old East Asian woman (Su Fei, expressionist painter and indie vocalist), wavy rose-crimson hair tied in soft side ribbons, emotional and sparkling ruby-pink eyes with a touch of vulnerability. Wearing an off-shoulder cream knit sweater with a tiny smudge of rose paint on her finger, hugging a cute vintage pastel-pink plush bunny close to her chest. Sunlit art studio background with floating cherry blossom petals and warm golden light flares, deeply affectionate gaze, masterpiece anime illustration.',
    storyActions: [
      {
        chapter: 1,
        title: '第一章動作：畫布前的眼淚與被握住的手腕',
        actionPrompt:
          'standing in front of a large crimson and gold oil painting canvas, holding a paintbrush with tears in her ruby eyes as the viewer gently holds her wrist, emotional and dramatic lighting'
      },
      {
        chapter: 2,
        title: '第二章動作：雨夜毛巾下的臉頰觸碰',
        actionPrompt:
          'wrapped in a warm white towel on a rainy night, gently pressing the viewer’s warm palm against her cheek with closed eyes and a relieved expression'
      },
      {
        chapter: 3,
        title: '第三章動作：畫展前夕緊抱布偶兔破涕為笑',
        actionPrompt:
          'standing in a brightly lit art gallery hugging her pastel plush bunny, smiling through tears with glowing rose-gold spotlights and floating petals'
      }
    ]
  },

  xia_le: {
    id: 'xia_le',
    number: '06',
    name: '夏樂 / Charlotte (Xia Le)',
    rarity: 'SSR',
    imagePath: './assets/characters/xia_le.png',
    appearanceAnchor:
      'A dazzling 24-year-old East Asian man (Xia Le / Charlotte, theater actor and fashion icon), fluffy golden-blonde wavy hair, bright honey-amber eyes with long lashes, wearing an ivory silk shirt',
    basePrompt:
      'Otome game character portrait in the style of Love and Producer (戀與製作人), SSR card art style. A dazzling 24-year-old East Asian man (Xia Le / Charlotte, theater actor and fashion icon), fluffy golden-blonde wavy hair, bright honey-amber eyes with long lashes, radiant and flirtatious smile. Wearing a luxurious ivory silk shirt with a loose ribbon tie, holding a blooming red rose near his lips. Soft stage spotlight with iridescent champagne and rose-gold bokeh sparkles, romantic and glamorous atmosphere, masterpiece anime illustration.',
    storyActions: [
      {
        chapter: 1,
        title: '第一章動作：派對露台戲劇化倚靠',
        actionPrompt:
          'leaning dramatically against a champagne party balcony railing, winking playfully while holding a glass of water, warm golden party lights and sparkles'
      },
      {
        chapter: 2,
        title: '第二章動作：後台化妝鏡前卸下眼妝',
        actionPrompt:
          'sitting in front of a glowing Hollywood vanity mirror backstage, makeup half-removed revealing cute faint freckles, looking up at the viewer with shy, genuine honey-amber eyes'
      },
      {
        chapter: 3,
        title: '第三章動作：清晨露台白T恤的真實擁抱',
        actionPrompt:
          'wearing a simple soft white cotton t-shirt on a sunlit morning terrace without stage makeup, blushing shyly and opening his arms for a warm embrace'
      }
    ]
  },

  gu_qingcheng: {
    id: 'gu_qingcheng',
    number: '07',
    name: '顧傾城 (Gu Qingcheng)',
    rarity: 'SSR',
    imagePath: './assets/characters/gu_qingcheng.png',
    appearanceAnchor:
      'A regal and stunning 30-year-old East Asian woman (Gu Qingcheng, star architect), sleek jet-black hair in an elegant high updo with a gold hairpin, sharp yet alluring golden-hazel eyes, wearing a tailored champagne-white blazer',
    basePrompt:
      'Otome romance game character portrait in the style of Love and Producer (戀與製作人), SSR card art style. A regal and stunning 30-year-old East Asian woman (Gu Qingcheng, star architect), sleek jet-black hair in an elegant high updo with a gold hairpin, sharp yet alluring golden-hazel eyes. Wearing a tailored champagne-white blazer over a silk camisole, standing by a floor-to-ceiling glass window at sunset with golden hour light warming her features, soft lens flare and floating light particles, proud yet tender romantic expression, masterpiece anime illustration.',
    storyActions: [
      {
        chapter: 1,
        title: '第一章動作：頂層落地窗前的女王審視',
        actionPrompt:
          'standing before a panoramic skyscraper window overlooking the city, arms gracefully crossed, holding architectural blueprints with an intrigued, proud smile'
      },
      {
        chapter: 2,
        title: '第二章動作：深夜模型室包紮手指的依靠',
        actionPrompt:
          'sitting on the floor of a dark architectural model room during a rainstorm, hair slightly loosened, resting her forehead gently against the viewer’s shoulder while her finger is bandaged'
      },
      {
        chapter: 3,
        title: '第三章動作：玻璃花房夕陽下伸出手',
        actionPrompt:
          'standing inside a sunlit botanical glasshouse at golden hour, rainbow light refracting through cracked artisanal glass, extending a hand with a band-aid toward the viewer with a breathtaking tender smile'
      }
    ]
  },

  wen_yan: {
    id: 'wen_yan',
    number: '08',
    name: '溫言 (Wen Yan)',
    rarity: 'SR',
    imagePath: './assets/characters/wen_yan.png',
    appearanceAnchor:
      'A gentle, handsome 26-year-old East Asian man (Wen Yan, antique book restorer and literary translator), soft dark-brown hair with bangs, warm emerald-brown eyes behind thin gold-rimmed glasses, wearing a cozy sage-green cardigan over a white collared shirt',
    basePrompt:
      'Otome game character portrait in the style of Love and Producer (戀與製作人), SSR card art style. A gentle, handsome 26-year-old East Asian man (Wen Yan, antique book restorer and literary translator), soft dark-brown hair with bangs, warm emerald-brown eyes behind thin gold-rimmed glasses, a shy blush on his cheeks. Wearing a cozy sage-green cardigan over a white collared shirt, holding an open leather-bound poetry book. Sunbeams filtering through a library window with floating dust motes and soft warm bokeh, tender and affectionate gaze, masterpiece anime illustration.',
    storyActions: [
      {
        chapter: 1,
        title: '第一章動作：古籍修復桌前的羞怯抬眸',
        actionPrompt:
          'sitting at an antique book restoration desk, adjusting his gold-rimmed glasses with a shy blush while looking up at the viewer with hopeful emerald-brown eyes'
      },
      {
        chapter: 2,
        title: '第二章動作：綠罩檯燈下的書堆傾訴',
        actionPrompt:
          'sitting on a cozy rug surrounded by stacks of poetry books under a warm green banker lamp, holding a cup of hot tea and smiling softly with relief'
      },
      {
        chapter: 3,
        title: '第三章動作：雙手遞出署名詩集的告白',
        actionPrompt:
          'standing by a sunlit window with sheer white curtains blowing in the breeze, holding out a newly published poetry book with a hand-drawn star on the title page, blushing deeply with a brave, loving gaze'
      }
    ]
  },

  bai_xiaolu: {
    id: 'bai_xiaolu',
    number: '09',
    name: '白小鹿 (Bai Xiaolu)',
    rarity: 'SR',
    imagePath: './assets/characters/bai_xiaolu.png',
    appearanceAnchor:
      'An adorable and sweet 21-year-old East Asian woman (Bai Xiaolu, pastry chef apprentice and florist), soft chestnut-pink braided hair with small baby’s breath flowers, big dewy rose-brown eyes, wearing a pastel pink frilled apron over a cream dress',
    basePrompt:
      'Otome romance game character portrait in the style of Love and Producer (戀與製作人), SSR card art style. An adorable and sweet 21-year-old East Asian woman (Bai Xiaolu, pastry chef apprentice and florist), soft chestnut-pink braided hair with small baby’s breath flowers, big dewy rose-brown eyes looking up with pure devotion. Wearing a pastel pink frilled apron over a cream dress, holding a delicate plate with a strawberry shortcake. Warm afternoon patisserie sunlight with dreamy sakura-pink bokeh light flares, heart-melting romantic atmosphere, masterpiece anime illustration.',
    storyActions: [
      {
        chapter: 1,
        title: '第一章動作：捧著草莓與藍莓的期待眼神',
        actionPrompt:
          'standing in a warm bakery kitchen holding a box of fresh strawberries and blueberries, looking up at the viewer with big dewy eyes and a sweet, hopeful smile'
      },
      {
        chapter: 2,
        title: '第二章動作：勇敢練習說出自己想法',
        actionPrompt:
          'sitting at a sunlit cafe table with a band-aid on her finger, clenching her small fists bravely with a rosy blush and determined, adorable expression'
      },
      {
        chapter: 3,
        title: '第三章動作：主廚帽與完美草莓蛋糕的飛撲擁抱',
        actionPrompt:
          'wearing a cute pastry chef toque hat and pink apron at sunset, holding up a freshly baked strawberry chiffon cake with a radiant, confident, and loving smile'
      }
    ]
  },

  ji_yan: {
    id: 'ji_yan',
    number: '10',
    name: '紀嚴 (Ji Yan)',
    rarity: 'SSR',
    imagePath: './assets/characters/ji_yan.png',
    appearanceAnchor:
      'A refined, handsome 29-year-old East Asian man (Ji Yan, forensic pathologist and classical pianist), neatly parted raven-black hair, deep teal-gray eyes behind sleek silver-framed glasses, wearing a crisp white dress shirt buttoned to the top with a dark teal vest',
    basePrompt:
      'Otome game character portrait in the style of Love and Producer (戀與製作人), SSR card art style. A refined, handsome 29-year-old East Asian man (Ji Yan, forensic pathologist and classical pianist), neatly parted raven-black hair, deep teal-gray eyes behind sleek silver-framed glasses, composed yet subtly softened expression. Wearing a crisp white dress shirt buttoned to the top with a dark teal vest, resting one hand on a grand piano keyboard with sheet music. Soft afternoon light through sheer curtains with pearlescent bokeh sparkles, elegant and romantic mood, masterpiece anime illustration.',
    storyActions: [
      {
        chapter: 1,
        title: '第一章動作：推眼鏡核對精緻方格清單',
        actionPrompt:
          'standing in a neat study room, pushing up his silver-framed glasses with one finger while holding a grid notebook, his stern expression softening slightly'
      },
      {
        chapter: 2,
        title: '第二章動作：公園涼亭躲雨共飲熱薑茶',
        actionPrompt:
          'standing under a park pavilion roof during a sun-shower, rain droplets sparkling in the sunlight behind him, holding a warm thermos and looking at the viewer with a gentle, surprised expression'
      },
      {
        chapter: 3,
        title: '第三章動作：史坦威鋼琴前握住雙手的第17稿情書',
        actionPrompt:
          'sitting on a grand piano bench at night surrounded by handwritten draft letters, gently holding the viewer’s hand on the piano keys, blushing ears and a tender, melting smile'
      }
    ]
  },

  lu_qinglan: {
    id: 'lu_qinglan',
    number: '11',
    name: '陸晴嵐 (Lu Qinglan)',
    rarity: 'SSR',
    imagePath: './assets/characters/lu_qinglan.png',
    appearanceAnchor:
      'A warm and radiant 29-year-old East Asian woman (Lu Qinglan, former neurosurgeon turned kintsugi ceramic artist), chestnut-brown short bob hair with a delicate gold leaf hair clip near her right temple, bright amber eyes, wearing a linen artist smock over an amber knit top',
    basePrompt:
      'Otome romance game character portrait in the style of Love and Producer (戀與製作人), SSR card art style. A warm and radiant 29-year-old East Asian woman (Lu Qinglan, former neurosurgeon turned kintsugi ceramic artist), chestnut-brown short bob hair with a tiny, delicate faint healed scar near her right temple hairline accented by a gold leaf hair clip, bright amber eyes filled with lively warmth and emotion. Wearing a linen artist smock over an amber knit top, holding a teacup repaired with glowing golden kintsugi lines. Warm golden sunset light in a pottery studio with floating light particles, touching and romantic smile, masterpiece anime illustration.',
    storyActions: [
      {
        chapter: 1,
        title: '第一章動作：鼻尖沾著陶土的燦爛大笑',
        actionPrompt:
          'sitting in a sunlit pottery studio with a tiny smudge of clay on the tip of her nose, holding a brush dipped in gold lacquer, laughing brightly with glistening amber eyes'
      },
      {
        chapter: 2,
        title: '第二章動作：放下髮夾散落短髮的溫柔擁抱',
        actionPrompt:
          'in a cozy attic studio at night, short chestnut bob hair falling naturally around her face, leaning into the viewer’s embrace with emotional tears and a relieved smile'
      },
      {
        chapter: 3,
        title: '第三章動作：金繼雙杯碰杯的向日葵笑容',
        actionPrompt:
          'at an art exhibition bathed in golden light, raising a celadon teacup repaired with glowing gold kintsugi veins to clink glasses with the viewer, radiant and deeply loving expression'
      }
    ]
  },

  you_ziqian: {
    id: 'you_ziqian',
    number: '12',
    name: '游子謙 (You Ziqian)',
    rarity: 'SSR',
    imagePath: './assets/characters/you_ziqian.png',
    appearanceAnchor:
      'A charming, gentle-looking 26-year-old East Asian man (You Ziqian, cafe owner and graphic designer), soft wavy ash-brown hair with a subtle lavender tint, expressive violet-brown eyes, wearing a stylish barista apron over a lavender-gray shirt with rolled-up sleeves',
    basePrompt:
      'Otome game character portrait in the style of Love and Producer (戀與製作人), SSR card art style. A charming, gentle-looking 26-year-old East Asian man (You Ziqian, cafe owner and graphic designer), soft wavy ash-brown hair with a subtle lavender tint in the light, expressive violet-brown eyes with a playful, enigmatic gentle smile. Wearing a stylish barista apron over a lavender-gray shirt with rolled-up sleeves, pouring steaming coffee from a copper gooseneck kettle. Cozy sunlit cafe background with rainbow lens flare and warm bokeh, romantic otome CG illustration.',
    storyActions: [
      {
        chapter: 1,
        title: '第一章動作：手沖咖啡吧台後的完美微笑面具',
        actionPrompt:
          'standing behind a sunlit wooden coffee bar pouring hand-drip coffee, tilting his head with a polite, slightly teasing smile and mysterious violet-brown eyes'
      },
      {
        chapter: 2,
        title: '第二章動作：打烊吧台被看穿吃醋後的耳根泛紅',
        actionPrompt:
          'leaning on the cafe counter at dusk next to a latte art cup, looking away shyly with a deep blush on his cheeks and ears, pouting slightly in an endearing way'
      },
      {
        chapter: 3,
        title: '第三章動作：卸下假笑後的真實擁抱',
        actionPrompt:
          'in the warm backroom of the cafe, no longer wearing a forced polite smile, eyes glistening with raw emotion and relief as he holds the viewer’s hand tightly against his chest'
      }
    ]
  }
};

// 根據角色 ID、情緒與章節，動態合成完整 AI 繪圖 Prompt
export function buildCharacterActionPrompt(charId, emotion = 'neutral', chapterNum = null) {
  const entry = CHARACTER_PROMPTS[charId];
  if (!entry) return '';
  const emo = EMOTION_ACTION_MODIFIERS[emotion] || EMOTION_ACTION_MODIFIERS.neutral;
  const chapAction = chapterNum
    ? entry.storyActions.find((a) => a.chapter === Number(chapterNum))
    : null;

  const scenePart = chapAction ? chapAction.actionPrompt : emo.prompt;
  return `${MASTER_STYLE_PROMPT} Character: ${entry.appearanceAnchor}. Scene & Action: ${scenePart}. Emotion: ${emo.prompt}.`;
}

// 公寓與 6 大日常場景背景圖設定與生成 Prompt
export const SCENE_BACKGROUNDS = {
  apartment: {
    id: 'apartment',
    name: '公寓',
    imagePath: './assets/backgrounds/apartment.jpg',
    prompt:
      "Masterpiece anime visual novel background art in the style of Love and Producer (戀與製作人), exterior and courtyard view of an apartment building at magic hour twilight, warm glowing arched windows, wrought-iron balconies with blooming climbing roses, string lights in the courtyard, soft pink and violet sunset clouds, floating golden bokeh particles, dreamy romantic atmosphere, no humans, 16:9 wide shot."
  },
  rooftop: {
    id: 'rooftop',
    name: '公寓天台',
    imagePath: './assets/backgrounds/rooftop.jpg',
    prompt:
      "Masterpiece anime visual novel background art in the style of Love and Producer (戀與製作人), apartment rooftop terrace at starry twilight overlooking a dazzling city skyline at night, a brass astronomical telescope, warm fairy string lights, deep indigo and rose-purple sky filled with stars, romantic cinematic lighting, no humans, 16:9 wide shot."
  },
  atelier: {
    id: 'atelier',
    name: '畫室與手作工坊',
    imagePath: './assets/backgrounds/atelier.jpg',
    prompt:
      "Masterpiece anime visual novel background art in the style of Love and Producer (戀與製作人), art studio and pottery workshop with arched windows, oil painting easels, pottery wheel, warm amber lighting and floating dust motes in twilight beams, dreamy artistic atmosphere, no humans, 16:9 wide shot."
  },
  cafe: {
    id: 'cafe',
    name: '咖啡廳',
    imagePath: './assets/backgrounds/cafe.jpg',
    prompt:
      "Masterpiece anime visual novel background art in the style of Love and Producer (戀與製作人), sunlit neighborhood pour-over cafe and patisserie during golden hour sunset, warm oak counter with brass pour-over coffee kettles, glass cake display filled with strawberry tarts, soft pink-gold sunbeams and bokeh, romantic cozy atmosphere, no humans, 16:9 wide shot."
  },
  archive: {
    id: 'archive',
    name: '圖書修復室與研究室',
    imagePath: './assets/backgrounds/archive.jpg',
    prompt:
      "Masterpiece anime visual novel background art in the style of Love and Producer (戀與製作人), two-story classic wood library and restoration studio with tall arched windows letting in warm rose-gold sunset light, antique manuscripts on a wooden worktable, green banker's lamp, grand piano in the corner, floating golden dust motes, quiet romantic atmosphere, no humans, 16:9 wide shot."
  },
  lounge: {
    id: 'lounge',
    name: '地下酒吧與小劇場',
    imagePath: './assets/backgrounds/lounge.svg',
    prompt:
      "Masterpiece anime visual novel background art in the style of Love and Producer (戀與製作人), underground bar and small theater stage, glowing crystal bottles behind a bar counter, crimson velvet curtains with warm golden stage spotlights, seductive dreamy atmosphere, no humans, 16:9 wide shot."
  },
  studio: {
    id: 'studio',
    name: '建築事務所',
    imagePath: './assets/backgrounds/studio.svg',
    prompt:
      "Masterpiece anime visual novel background art in the style of Love and Producer (戀與製作人), high-rise architectural studio with floor-to-ceiling glass windows overlooking a glittering city skyline at twilight, illuminated white architectural scale models, champagne-gold pendant lights, luxurious romantic atmosphere, no humans, 16:9 wide shot."
  }
};

export function getSceneBackground(sceneId) {
  return SCENE_BACKGROUNDS[sceneId] || SCENE_BACKGROUNDS.apartment;
}
