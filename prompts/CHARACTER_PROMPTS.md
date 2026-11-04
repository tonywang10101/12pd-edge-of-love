# 《愛的邊緣》(Edge of Love) — 12 角色立繪與劇情動作生成 Prompt 規範庫

本文件收錄《愛的邊緣》除主角外全部 12 位可攻略角色的 **《戀與製作人》風格基礎立繪 Prompt**、**角色外觀固定錨點 (Appearance Anchor)** 以及**隨劇情章節與情緒變化的動作生成指令**，供後續擴充不同劇情 CG 與動作差分時直接使用。

## 1. 全域畫風主指令 (Master Style Prompt)
```text
Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution.
```

## 2. 情緒與動作差分修飾詞 (Emotion & Pose Modifiers)
- **`neutral` (平靜凝視 (Default / Neutral))**: `calm and composed expression, looking directly at the viewer with subtle emotional depth, natural relaxed posture`
- **`smile` (溫柔心動 (Warm Smile / Affectionate))**: `soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles`
- **`vulnerable` (脆弱動搖 (Vulnerable / Tearful))**: `vulnerable and touched expression, glistening eyes with a single tear on the eyelashes, lowered guard, fragile and deeply moving romantic moment, soft moonlight rim lighting`
- **`anxious` (不安警戒 (Anxious / Guarded))**: `tense and guarded expression, slightly furrowed brows, hesitant posture, looking away slightly with conflicted emotions, dramatic twilight shadows`
- **`triggered` (情緒爆發／防衛激發 (Triggered / Intense))**: `intense and dramatic emotional expression, narrowed or widened eyes filled with shock and hurt, gripping their signature item tightly, high-contrast cinematic lighting`

---

## 3. 12 位角色個別立繪與章節動作 Prompts

### #01 沈墨 (Shen Mo) [SSR]
- **圖片路徑**: `./assets/characters/shen_mo.png`
- **角色外觀錨點 (Appearance Anchor)**:
  ```text
  A handsome 27-year-old East Asian man (Shen Mo, investigative journalist), slightly messy dark indigo-black hair with soft bangs framing his sharp deep violet-blue eyes, wearing a tailored charcoal trench coat over a black turtleneck, signature silver voice recorder
  ```
- **預設角色立繪完整 Prompt**:
  ```text
  Otome game character portrait in the style of Love and Producer (戀與製作人), SSR card art style. A handsome 27-year-old East Asian man (Shen Mo, investigative journalist), slightly messy dark indigo-black hair with soft bangs framing his sharp, guarded deep violet-blue eyes. Wearing a tailored charcoal trench coat over a black turtleneck, holding a sleek silver voice recorder in one hand. Standing on a rainy city rooftop at twilight with soft neon rose and indigo bokeh lights in the background, warm rim lighting on his face, mysterious and intense romantic gaze, masterpiece anime illustration.
  ```
- **各章節專屬劇情動作 Prompts**:
  - **第一章動作：門縫後的防竊聽警戒**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A handsome 27-year-old East Asian man (Shen Mo, investigative journalist), slightly messy dark indigo-black hair with soft bangs framing his sharp deep violet-blue eyes, wearing a tailored charcoal trench coat over a black turtleneck, signature silver voice recorder. Scene & Action: standing behind a half-open apartment door with a security chain, holding a signal detector toward the viewer, suspicious yet intrigued sharp gaze, dim hallway neon lighting. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```
  - **第二章動作：天台雨夜對質與鬆懈**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A handsome 27-year-old East Asian man (Shen Mo, investigative journalist), slightly messy dark indigo-black hair with soft bangs framing his sharp deep violet-blue eyes, wearing a tailored charcoal trench coat over a black turtleneck, signature silver voice recorder. Scene & Action: standing on a rainy city rooftop at midnight gripping the wet railing, looking at a receipt in his hand with softened eyes and parted lips, rain droplets catching indigo and rose bokeh light. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```
  - **第三章動作：交出備用鑰匙的告白**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A handsome 27-year-old East Asian man (Shen Mo, investigative journalist), slightly messy dark indigo-black hair with soft bangs framing his sharp deep violet-blue eyes, wearing a tailored charcoal trench coat over a black turtleneck, signature silver voice recorder. Scene & Action: sitting in a sunlit study room with half-open curtains, extending his palm holding a silver key toward the viewer, a rare gentle smile and slightly reddened ears, warm morning golden flare. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```

### #02 林見微 (Lin Jianwei) [SSR]
- **圖片路徑**: `./assets/characters/lin_jianwei.png`
- **角色外觀錨點 (Appearance Anchor)**:
  ```text
  A breathtaking 25-year-old East Asian woman (Lin Jianwei, astronomer and antique watchmaker), long silky straight raven-black hair, calm and ethereal ice-blue eyes with long eyelashes, porcelain skin, wearing an elegant vintage slate-blue vest over a crisp white blouse, golden antique pocket watch
  ```
- **預設角色立繪完整 Prompt**:
  ```text
  Otome romance game character portrait in the style of Love and Producer (戀與製作人), SSR card art style. A breathtaking 25-year-old East Asian woman (Lin Jianwei, astronomer and antique watchmaker), long silky straight raven-black hair, calm and ethereal ice-blue eyes with long eyelashes, porcelain skin. Wearing an elegant vintage slate-blue vest over a crisp white blouse, holding a delicate golden antique pocket watch with a fine chain. Starry observatory dome background with soft glowing stardust and dreamy silver-blue bokeh flares, serene and poetic atmosphere, masterpiece anime illustration.
  ```
- **各章節專屬劇情動作 Prompts**:
  - **第一章動作：天台獨自校準赤道儀**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A breathtaking 25-year-old East Asian woman (Lin Jianwei, astronomer and antique watchmaker), long silky straight raven-black hair, calm and ethereal ice-blue eyes with long eyelashes, porcelain skin, wearing an elegant vintage slate-blue vest over a crisp white blouse, golden antique pocket watch. Scene & Action: adjusting a brass astronomical telescope on a quiet rooftop under the autumn full moon, looking back over her shoulder with a calm, crystal-clear gaze, silver moonlight rim light. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```
  - **第二章動作：鐘錶室裡聽雨傾訴**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A breathtaking 25-year-old East Asian woman (Lin Jianwei, astronomer and antique watchmaker), long silky straight raven-black hair, calm and ethereal ice-blue eyes with long eyelashes, porcelain skin, wearing an elegant vintage slate-blue vest over a crisp white blouse, golden antique pocket watch. Scene & Action: sitting at a wooden watchmaker workbench surrounded by vintage clocks, holding a warm teacup with both hands, looking at the viewer with a rare vulnerable and relieved expression. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```
  - **第三章動作：共享雙星望遠鏡目鏡**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A breathtaking 25-year-old East Asian woman (Lin Jianwei, astronomer and antique watchmaker), long silky straight raven-black hair, calm and ethereal ice-blue eyes with long eyelashes, porcelain skin, wearing an elegant vintage slate-blue vest over a crisp white blouse, golden antique pocket watch. Scene & Action: standing close beside a giant observatory telescope under a meteor shower, holding open an engraved golden pocket watch, a faint ethereal smile on her lips, starry bokeh sparkles. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```

### #03 星野 琉璃 (Hoshino Ruri) [SSR]
- **圖片路徑**: `./assets/characters/ruri.png`
- **角色外觀錨點 (Appearance Anchor)**:
  ```text
  An enchanting 23-year-old East Asian beauty (Hoshino Ruri, tarot astrologer and vintage shop owner), wavy plum-violet hair with delicate silver star hairpins and a crystal forehead ornament, luminous amethyst eyes, wearing a romantic bohemian velvet shawl with gold embroidery
  ```
- **預設角色立繪完整 Prompt**:
  ```text
  Otome romance game character portrait in the style of Love and Producer (戀與製作人), SSR card art style. An enchanting 23-year-old androgynous East Asian beauty (Hoshino Ruri, tarot astrologer and vintage shop owner), wavy plum-violet hair with delicate silver star hairpins and a crystal forehead ornament, luminous amethyst eyes. Wearing a romantic bohemian velvet shawl with gold embroidery, holding a glowing gilded tarot card. Warm candlelight and floating lavender prism sparkles in an antique atelier background, dreamy and mystical romantic gaze, masterpiece anime illustration.
  ```
- **各章節專屬劇情動作 Prompts**:
  - **第一章動作：紫水晶靈擺占卜**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: An enchanting 23-year-old East Asian beauty (Hoshino Ruri, tarot astrologer and vintage shop owner), wavy plum-violet hair with delicate silver star hairpins and a crystal forehead ornament, luminous amethyst eyes, wearing a romantic bohemian velvet shawl with gold embroidery. Scene & Action: holding a glowing amethyst pendulum suspended from a silver chain in a vintage shop filled with wind chimes, wide mystical eyes studying the viewer’s aura. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```
  - **第二章動作：逃離茶會後緊握雙手**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: An enchanting 23-year-old East Asian beauty (Hoshino Ruri, tarot astrologer and vintage shop owner), wavy plum-violet hair with delicate silver star hairpins and a crystal forehead ornament, luminous amethyst eyes, wearing a romantic bohemian velvet shawl with gold embroidery. Scene & Action: leaning against a quiet sunlit corridor wall catching her breath, holding onto the viewer’s warm hand with both of hers, tear-glistening amethyst eyes filled with gratitude. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```
  - **第三章動作：閣樓燭光下的小指契約**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: An enchanting 23-year-old East Asian beauty (Hoshino Ruri, tarot astrologer and vintage shop owner), wavy plum-violet hair with delicate silver star hairpins and a crystal forehead ornament, luminous amethyst eyes, wearing a romantic bohemian velvet shawl with gold embroidery. Scene & Action: sitting across a tarot table lit by warm candles, extending her pinky finger adorned with a silver ring for a pinky promise, radiant and dreamy smile. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```

### #04 韓梟 (Han Xiao) [SSR]
- **圖片路徑**: `./assets/characters/han_xiao.png`
- **角色外觀錨點 (Appearance Anchor)**:
  ```text
  A dangerously handsome 28-year-old East Asian man (Han Xiao, underground bartender and motorcycle racer), styled jet-black undercut hair, captivating crimson-amber eyes, wearing a burgundy dress shirt with top buttons undone and a black leather jacket
  ```
- **預設角色立繪完整 Prompt**:
  ```text
  Otome game character portrait in the style of Love and Producer (戀與製作人), SSR card art style. A dangerously handsome 28-year-old East Asian man (Han Xiao, underground bartender and motorcycle racer), styled jet-black undercut hair, captivating crimson-amber eyes, a charming and provocative half-smile. Wearing a burgundy dress shirt with the top buttons undone and a black leather jacket draped over his shoulders, holding a crystal cocktail glass with amber liquid. Warm golden-rose bar lighting with dreamy bokeh sparkles, intense romantic tension, masterpiece anime illustration.
  ```
- **各章節專屬劇情動作 Prompts**:
  - **第一章動作：吧台撐顎挑眉博弈**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A dangerously handsome 28-year-old East Asian man (Han Xiao, underground bartender and motorcycle racer), styled jet-black undercut hair, captivating crimson-amber eyes, wearing a burgundy dress shirt with top buttons undone and a black leather jacket. Scene & Action: leaning across a polished mahogany bar counter, resting his chin on one hand while sliding a contract with the other, a dangerously charming smirk and amused crimson-amber eyes. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```
  - **第二章動作：午夜重機遞出安全帽**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A dangerously handsome 28-year-old East Asian man (Han Xiao, underground bartender and motorcycle racer), styled jet-black undercut hair, captivating crimson-amber eyes, wearing a burgundy dress shirt with top buttons undone and a black leather jacket. Scene & Action: sitting astride a sleek black Ducati motorcycle on a city overpass at night, holding out a racing helmet toward the viewer with a wild, exhilarated grin, neon city light trails. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```
  - **第三章動作：點燃支票的吻手禮**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A dangerously handsome 28-year-old East Asian man (Han Xiao, underground bartender and motorcycle racer), styled jet-black undercut hair, captivating crimson-amber eyes, wearing a burgundy dress shirt with top buttons undone and a black leather jacket. Scene & Action: in a dimly lit VIP lounge, holding a lighter with a burning check in one hand while gently kissing the viewer’s fingertips with the other, intense devoted gaze. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```

### #05 蘇緋 (Su Fei) [SSR]
- **圖片路徑**: `./assets/characters/su_fei.png`
- **角色外觀錨點 (Appearance Anchor)**:
  ```text
  A gorgeous 22-year-old East Asian woman (Su Fei, expressionist painter and indie vocalist), wavy rose-crimson hair tied in soft side ribbons, emotional and sparkling ruby-pink eyes, wearing an off-shoulder cream knit sweater, vintage pastel-pink plush bunny
  ```
- **預設角色立繪完整 Prompt**:
  ```text
  Otome romance game character portrait in the style of Love and Producer (戀與製作人), SSR card art style. A gorgeous 22-year-old East Asian woman (Su Fei, expressionist painter and indie vocalist), wavy rose-crimson hair tied in soft side ribbons, emotional and sparkling ruby-pink eyes with a touch of vulnerability. Wearing an off-shoulder cream knit sweater with a tiny smudge of rose paint on her finger, hugging a cute vintage pastel-pink plush bunny close to her chest. Sunlit art studio background with floating cherry blossom petals and warm golden light flares, deeply affectionate gaze, masterpiece anime illustration.
  ```
- **各章節專屬劇情動作 Prompts**:
  - **第一章動作：畫布前的眼淚與被握住的手腕**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A gorgeous 22-year-old East Asian woman (Su Fei, expressionist painter and indie vocalist), wavy rose-crimson hair tied in soft side ribbons, emotional and sparkling ruby-pink eyes, wearing an off-shoulder cream knit sweater, vintage pastel-pink plush bunny. Scene & Action: standing in front of a large crimson and gold oil painting canvas, holding a paintbrush with tears in her ruby eyes as the viewer gently holds her wrist, emotional and dramatic lighting. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```
  - **第二章動作：雨夜毛巾下的臉頰觸碰**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A gorgeous 22-year-old East Asian woman (Su Fei, expressionist painter and indie vocalist), wavy rose-crimson hair tied in soft side ribbons, emotional and sparkling ruby-pink eyes, wearing an off-shoulder cream knit sweater, vintage pastel-pink plush bunny. Scene & Action: wrapped in a warm white towel on a rainy night, gently pressing the viewer’s warm palm against her cheek with closed eyes and a relieved expression. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```
  - **第三章動作：畫展前夕緊抱布偶兔破涕為笑**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A gorgeous 22-year-old East Asian woman (Su Fei, expressionist painter and indie vocalist), wavy rose-crimson hair tied in soft side ribbons, emotional and sparkling ruby-pink eyes, wearing an off-shoulder cream knit sweater, vintage pastel-pink plush bunny. Scene & Action: standing in a brightly lit art gallery hugging her pastel plush bunny, smiling through tears with glowing rose-gold spotlights and floating petals. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```

### #06 夏樂 / Charlotte (Xia Le) [SSR]
- **圖片路徑**: `./assets/characters/xia_le.png`
- **角色外觀錨點 (Appearance Anchor)**:
  ```text
  A dazzling 24-year-old East Asian man (Xia Le / Charlotte, theater actor and fashion icon), fluffy golden-blonde wavy hair, bright honey-amber eyes with long lashes, wearing an ivory silk shirt
  ```
- **預設角色立繪完整 Prompt**:
  ```text
  Otome game character portrait in the style of Love and Producer (戀與製作人), SSR card art style. A dazzling 24-year-old East Asian man (Xia Le / Charlotte, theater actor and fashion icon), fluffy golden-blonde wavy hair, bright honey-amber eyes with long lashes, radiant and flirtatious smile. Wearing a luxurious ivory silk shirt with a loose ribbon tie, holding a blooming red rose near his lips. Soft stage spotlight with iridescent champagne and rose-gold bokeh sparkles, romantic and glamorous atmosphere, masterpiece anime illustration.
  ```
- **各章節專屬劇情動作 Prompts**:
  - **第一章動作：派對露台戲劇化倚靠**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A dazzling 24-year-old East Asian man (Xia Le / Charlotte, theater actor and fashion icon), fluffy golden-blonde wavy hair, bright honey-amber eyes with long lashes, wearing an ivory silk shirt. Scene & Action: leaning dramatically against a champagne party balcony railing, winking playfully while holding a glass of water, warm golden party lights and sparkles. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```
  - **第二章動作：後台化妝鏡前卸下眼妝**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A dazzling 24-year-old East Asian man (Xia Le / Charlotte, theater actor and fashion icon), fluffy golden-blonde wavy hair, bright honey-amber eyes with long lashes, wearing an ivory silk shirt. Scene & Action: sitting in front of a glowing Hollywood vanity mirror backstage, makeup half-removed revealing cute faint freckles, looking up at the viewer with shy, genuine honey-amber eyes. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```
  - **第三章動作：清晨露台白T恤的真實擁抱**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A dazzling 24-year-old East Asian man (Xia Le / Charlotte, theater actor and fashion icon), fluffy golden-blonde wavy hair, bright honey-amber eyes with long lashes, wearing an ivory silk shirt. Scene & Action: wearing a simple soft white cotton t-shirt on a sunlit morning terrace without stage makeup, blushing shyly and opening his arms for a warm embrace. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```

### #07 顧傾城 (Gu Qingcheng) [SSR]
- **圖片路徑**: `./assets/characters/gu_qingcheng.png`
- **角色外觀錨點 (Appearance Anchor)**:
  ```text
  A regal and stunning 30-year-old East Asian woman (Gu Qingcheng, star architect), sleek jet-black hair in an elegant high updo with a gold hairpin, sharp yet alluring golden-hazel eyes, wearing a tailored champagne-white blazer
  ```
- **預設角色立繪完整 Prompt**:
  ```text
  Otome romance game character portrait in the style of Love and Producer (戀與製作人), SSR card art style. A regal and stunning 30-year-old East Asian woman (Gu Qingcheng, star architect), sleek jet-black hair in an elegant high updo with a gold hairpin, sharp yet alluring golden-hazel eyes. Wearing a tailored champagne-white blazer over a silk camisole, standing by a floor-to-ceiling glass window at sunset with golden hour light warming her features, soft lens flare and floating light particles, proud yet tender romantic expression, masterpiece anime illustration.
  ```
- **各章節專屬劇情動作 Prompts**:
  - **第一章動作：頂層落地窗前的女王審視**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A regal and stunning 30-year-old East Asian woman (Gu Qingcheng, star architect), sleek jet-black hair in an elegant high updo with a gold hairpin, sharp yet alluring golden-hazel eyes, wearing a tailored champagne-white blazer. Scene & Action: standing before a panoramic skyscraper window overlooking the city, arms gracefully crossed, holding architectural blueprints with an intrigued, proud smile. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```
  - **第二章動作：深夜模型室包紮手指的依靠**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A regal and stunning 30-year-old East Asian woman (Gu Qingcheng, star architect), sleek jet-black hair in an elegant high updo with a gold hairpin, sharp yet alluring golden-hazel eyes, wearing a tailored champagne-white blazer. Scene & Action: sitting on the floor of a dark architectural model room during a rainstorm, hair slightly loosened, resting her forehead gently against the viewer’s shoulder while her finger is bandaged. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```
  - **第三章動作：玻璃花房夕陽下伸出手**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A regal and stunning 30-year-old East Asian woman (Gu Qingcheng, star architect), sleek jet-black hair in an elegant high updo with a gold hairpin, sharp yet alluring golden-hazel eyes, wearing a tailored champagne-white blazer. Scene & Action: standing inside a sunlit botanical glasshouse at golden hour, rainbow light refracting through cracked artisanal glass, extending a hand with a band-aid toward the viewer with a breathtaking tender smile. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```

### #08 溫言 (Wen Yan) [SR]
- **圖片路徑**: `./assets/characters/wen_yan.png`
- **角色外觀錨點 (Appearance Anchor)**:
  ```text
  A gentle, handsome 26-year-old East Asian man (Wen Yan, antique book restorer and literary translator), soft dark-brown hair with bangs, warm emerald-brown eyes behind thin gold-rimmed glasses, wearing a cozy sage-green cardigan over a white collared shirt
  ```
- **預設角色立繪完整 Prompt**:
  ```text
  Otome game character portrait in the style of Love and Producer (戀與製作人), SSR card art style. A gentle, handsome 26-year-old East Asian man (Wen Yan, antique book restorer and literary translator), soft dark-brown hair with bangs, warm emerald-brown eyes behind thin gold-rimmed glasses, a shy blush on his cheeks. Wearing a cozy sage-green cardigan over a white collared shirt, holding an open leather-bound poetry book. Sunbeams filtering through a library window with floating dust motes and soft warm bokeh, tender and affectionate gaze, masterpiece anime illustration.
  ```
- **各章節專屬劇情動作 Prompts**:
  - **第一章動作：古籍修復桌前的羞怯抬眸**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A gentle, handsome 26-year-old East Asian man (Wen Yan, antique book restorer and literary translator), soft dark-brown hair with bangs, warm emerald-brown eyes behind thin gold-rimmed glasses, wearing a cozy sage-green cardigan over a white collared shirt. Scene & Action: sitting at an antique book restoration desk, adjusting his gold-rimmed glasses with a shy blush while looking up at the viewer with hopeful emerald-brown eyes. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```
  - **第二章動作：綠罩檯燈下的書堆傾訴**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A gentle, handsome 26-year-old East Asian man (Wen Yan, antique book restorer and literary translator), soft dark-brown hair with bangs, warm emerald-brown eyes behind thin gold-rimmed glasses, wearing a cozy sage-green cardigan over a white collared shirt. Scene & Action: sitting on a cozy rug surrounded by stacks of poetry books under a warm green banker lamp, holding a cup of hot tea and smiling softly with relief. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```
  - **第三章動作：雙手遞出署名詩集的告白**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A gentle, handsome 26-year-old East Asian man (Wen Yan, antique book restorer and literary translator), soft dark-brown hair with bangs, warm emerald-brown eyes behind thin gold-rimmed glasses, wearing a cozy sage-green cardigan over a white collared shirt. Scene & Action: standing by a sunlit window with sheer white curtains blowing in the breeze, holding out a newly published poetry book with a hand-drawn star on the title page, blushing deeply with a brave, loving gaze. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```

### #09 白小鹿 (Bai Xiaolu) [SR]
- **圖片路徑**: `./assets/characters/bai_xiaolu.png`
- **角色外觀錨點 (Appearance Anchor)**:
  ```text
  An adorable and sweet 21-year-old East Asian woman (Bai Xiaolu, pastry chef apprentice and florist), soft chestnut-pink braided hair with small baby’s breath flowers, big dewy rose-brown eyes, wearing a pastel pink frilled apron over a cream dress
  ```
- **預設角色立繪完整 Prompt**:
  ```text
  Otome romance game character portrait in the style of Love and Producer (戀與製作人), SSR card art style. An adorable and sweet 21-year-old East Asian woman (Bai Xiaolu, pastry chef apprentice and florist), soft chestnut-pink braided hair with small baby’s breath flowers, big dewy rose-brown eyes looking up with pure devotion. Wearing a pastel pink frilled apron over a cream dress, holding a delicate plate with a strawberry shortcake. Warm afternoon patisserie sunlight with dreamy sakura-pink bokeh light flares, heart-melting romantic atmosphere, masterpiece anime illustration.
  ```
- **各章節專屬劇情動作 Prompts**:
  - **第一章動作：捧著草莓與藍莓的期待眼神**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: An adorable and sweet 21-year-old East Asian woman (Bai Xiaolu, pastry chef apprentice and florist), soft chestnut-pink braided hair with small baby’s breath flowers, big dewy rose-brown eyes, wearing a pastel pink frilled apron over a cream dress. Scene & Action: standing in a warm bakery kitchen holding a box of fresh strawberries and blueberries, looking up at the viewer with big dewy eyes and a sweet, hopeful smile. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```
  - **第二章動作：勇敢練習說出自己想法**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: An adorable and sweet 21-year-old East Asian woman (Bai Xiaolu, pastry chef apprentice and florist), soft chestnut-pink braided hair with small baby’s breath flowers, big dewy rose-brown eyes, wearing a pastel pink frilled apron over a cream dress. Scene & Action: sitting at a sunlit cafe table with a band-aid on her finger, clenching her small fists bravely with a rosy blush and determined, adorable expression. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```
  - **第三章動作：主廚帽與完美草莓蛋糕的飛撲擁抱**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: An adorable and sweet 21-year-old East Asian woman (Bai Xiaolu, pastry chef apprentice and florist), soft chestnut-pink braided hair with small baby’s breath flowers, big dewy rose-brown eyes, wearing a pastel pink frilled apron over a cream dress. Scene & Action: wearing a cute pastry chef toque hat and pink apron at sunset, holding up a freshly baked strawberry chiffon cake with a radiant, confident, and loving smile. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```

### #10 紀嚴 (Ji Yan) [SSR]
- **圖片路徑**: `./assets/characters/ji_yan.png`
- **角色外觀錨點 (Appearance Anchor)**:
  ```text
  A refined, handsome 29-year-old East Asian man (Ji Yan, forensic pathologist and classical pianist), neatly parted raven-black hair, deep teal-gray eyes behind sleek silver-framed glasses, wearing a crisp white dress shirt buttoned to the top with a dark teal vest
  ```
- **預設角色立繪完整 Prompt**:
  ```text
  Otome game character portrait in the style of Love and Producer (戀與製作人), SSR card art style. A refined, handsome 29-year-old East Asian man (Ji Yan, forensic pathologist and classical pianist), neatly parted raven-black hair, deep teal-gray eyes behind sleek silver-framed glasses, composed yet subtly softened expression. Wearing a crisp white dress shirt buttoned to the top with a dark teal vest, resting one hand on a grand piano keyboard with sheet music. Soft afternoon light through sheer curtains with pearlescent bokeh sparkles, elegant and romantic mood, masterpiece anime illustration.
  ```
- **各章節專屬劇情動作 Prompts**:
  - **第一章動作：推眼鏡核對精緻方格清單**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A refined, handsome 29-year-old East Asian man (Ji Yan, forensic pathologist and classical pianist), neatly parted raven-black hair, deep teal-gray eyes behind sleek silver-framed glasses, wearing a crisp white dress shirt buttoned to the top with a dark teal vest. Scene & Action: standing in a neat study room, pushing up his silver-framed glasses with one finger while holding a grid notebook, his stern expression softening slightly. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```
  - **第二章動作：公園涼亭躲雨共飲熱薑茶**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A refined, handsome 29-year-old East Asian man (Ji Yan, forensic pathologist and classical pianist), neatly parted raven-black hair, deep teal-gray eyes behind sleek silver-framed glasses, wearing a crisp white dress shirt buttoned to the top with a dark teal vest. Scene & Action: standing under a park pavilion roof during a sun-shower, rain droplets sparkling in the sunlight behind him, holding a warm thermos and looking at the viewer with a gentle, surprised expression. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```
  - **第三章動作：史坦威鋼琴前握住雙手的第17稿情書**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A refined, handsome 29-year-old East Asian man (Ji Yan, forensic pathologist and classical pianist), neatly parted raven-black hair, deep teal-gray eyes behind sleek silver-framed glasses, wearing a crisp white dress shirt buttoned to the top with a dark teal vest. Scene & Action: sitting on a grand piano bench at night surrounded by handwritten draft letters, gently holding the viewer’s hand on the piano keys, blushing ears and a tender, melting smile. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```

### #11 陸晴嵐 (Lu Qinglan) [SSR]
- **圖片路徑**: `./assets/characters/lu_qinglan.png`
- **角色外觀錨點 (Appearance Anchor)**:
  ```text
  A warm and radiant 29-year-old East Asian woman (Lu Qinglan, former neurosurgeon turned kintsugi ceramic artist), chestnut-brown short bob hair with a delicate gold leaf hair clip near her right temple, bright amber eyes, wearing a linen artist smock over an amber knit top
  ```
- **預設角色立繪完整 Prompt**:
  ```text
  Otome romance game character portrait in the style of Love and Producer (戀與製作人), SSR card art style. A warm and radiant 29-year-old East Asian woman (Lu Qinglan, former neurosurgeon turned kintsugi ceramic artist), chestnut-brown short bob hair with a tiny, delicate faint healed scar near her right temple hairline accented by a gold leaf hair clip, bright amber eyes filled with lively warmth and emotion. Wearing a linen artist smock over an amber knit top, holding a teacup repaired with glowing golden kintsugi lines. Warm golden sunset light in a pottery studio with floating light particles, touching and romantic smile, masterpiece anime illustration.
  ```
- **各章節專屬劇情動作 Prompts**:
  - **第一章動作：鼻尖沾著陶土的燦爛大笑**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A warm and radiant 29-year-old East Asian woman (Lu Qinglan, former neurosurgeon turned kintsugi ceramic artist), chestnut-brown short bob hair with a delicate gold leaf hair clip near her right temple, bright amber eyes, wearing a linen artist smock over an amber knit top. Scene & Action: sitting in a sunlit pottery studio with a tiny smudge of clay on the tip of her nose, holding a brush dipped in gold lacquer, laughing brightly with glistening amber eyes. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```
  - **第二章動作：放下髮夾散落短髮的溫柔擁抱**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A warm and radiant 29-year-old East Asian woman (Lu Qinglan, former neurosurgeon turned kintsugi ceramic artist), chestnut-brown short bob hair with a delicate gold leaf hair clip near her right temple, bright amber eyes, wearing a linen artist smock over an amber knit top. Scene & Action: in a cozy attic studio at night, short chestnut bob hair falling naturally around her face, leaning into the viewer’s embrace with emotional tears and a relieved smile. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```
  - **第三章動作：金繼雙杯碰杯的向日葵笑容**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A warm and radiant 29-year-old East Asian woman (Lu Qinglan, former neurosurgeon turned kintsugi ceramic artist), chestnut-brown short bob hair with a delicate gold leaf hair clip near her right temple, bright amber eyes, wearing a linen artist smock over an amber knit top. Scene & Action: at an art exhibition bathed in golden light, raising a celadon teacup repaired with glowing gold kintsugi veins to clink glasses with the viewer, radiant and deeply loving expression. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```

### #12 游子謙 (You Ziqian) [SSR]
- **圖片路徑**: `./assets/characters/you_ziqian.png`
- **角色外觀錨點 (Appearance Anchor)**:
  ```text
  A charming, gentle-looking 26-year-old East Asian man (You Ziqian, cafe owner and graphic designer), soft wavy ash-brown hair with a subtle lavender tint, expressive violet-brown eyes, wearing a stylish barista apron over a lavender-gray shirt with rolled-up sleeves
  ```
- **預設角色立繪完整 Prompt**:
  ```text
  Otome game character portrait in the style of Love and Producer (戀與製作人), SSR card art style. A charming, gentle-looking 26-year-old East Asian man (You Ziqian, cafe owner and graphic designer), soft wavy ash-brown hair with a subtle lavender tint in the light, expressive violet-brown eyes with a playful, enigmatic gentle smile. Wearing a stylish barista apron over a lavender-gray shirt with rolled-up sleeves, pouring steaming coffee from a copper gooseneck kettle. Cozy sunlit cafe background with rainbow lens flare and warm bokeh, romantic otome CG illustration.
  ```
- **各章節專屬劇情動作 Prompts**:
  - **第一章動作：手沖咖啡吧台後的完美微笑面具**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A charming, gentle-looking 26-year-old East Asian man (You Ziqian, cafe owner and graphic designer), soft wavy ash-brown hair with a subtle lavender tint, expressive violet-brown eyes, wearing a stylish barista apron over a lavender-gray shirt with rolled-up sleeves. Scene & Action: standing behind a sunlit wooden coffee bar pouring hand-drip coffee, tilting his head with a polite, slightly teasing smile and mysterious violet-brown eyes. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```
  - **第二章動作：打烊吧台被看穿吃醋後的耳根泛紅**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A charming, gentle-looking 26-year-old East Asian man (You Ziqian, cafe owner and graphic designer), soft wavy ash-brown hair with a subtle lavender tint, expressive violet-brown eyes, wearing a stylish barista apron over a lavender-gray shirt with rolled-up sleeves. Scene & Action: leaning on the cafe counter at dusk next to a latte art cup, looking away shyly with a deep blush on his cheeks and ears, pouting slightly in an endearing way. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```
  - **第三章動作：卸下假笑後的真實擁抱**:
    ```text
    Otome romance game character illustration in the style of Love and Producer (戀與製作人), SSR card art style, refined semi-realistic anime art, delicate eyelashes and expressive eyes, soft dreamy rim lighting, floating bokeh light flares and prism sparkles, vertical portrait framing, masterpiece anime illustration, high resolution. Character: A charming, gentle-looking 26-year-old East Asian man (You Ziqian, cafe owner and graphic designer), soft wavy ash-brown hair with a subtle lavender tint, expressive violet-brown eyes, wearing a stylish barista apron over a lavender-gray shirt with rolled-up sleeves. Scene & Action: in the warm backroom of the cafe, no longer wearing a forced polite smile, eyes glistening with raw emotion and relief as he holds the viewer’s hand tightly against his chest. Emotion: soft affectionate smile, warm blush on cheeks, tender and loving gaze, reaching one hand gently toward the viewer, surrounded by warm rose-gold bokeh sparkles.
    ```

