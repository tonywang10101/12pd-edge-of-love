// 《愛的邊緣》(Edge of Love) — 12 位可攻略角色與 DSM-5-TR 臨床設定資料庫

export const LOCATIONS = [
  {
    id: 'rooftop',
    name: '棲遲公寓・天台觀星閣',
    desc: '能俯瞰整座城市霓虹與夜空的角落，適合需要距離感與獨處的靈魂。',
    icon: '🌙',
    characters: ['shen_mo', 'lin_jianwei']
  },
  {
    id: 'atelier',
    name: '微光藝術工坊＆古著店',
    desc: '空氣中飄著松節油、線香與陶土氣息，色彩與情緒在此劇烈碰撞。',
    icon: '🎨',
    characters: ['ruri', 'su_fei', 'lu_qinglan']
  },
  {
    id: 'cafe',
    name: '「邊界」手沖咖啡＆甜點屋',
    desc: '白日裡最溫暖的社區聚落，午後陽光灑落木桌，卻也藏著說不出口的心事。',
    icon: '☕',
    characters: ['bai_xiaolu', 'you_ziqian']
  },
  {
    id: 'archive',
    name: '大學古籍修復室＆法醫中心',
    desc: '時間在這裡被精確切割成秒針與編號，安靜得能聽見紙頁翻動與心跳。',
    icon: '📚',
    characters: ['wen_yan', 'ji_yan']
  },
  {
    id: 'lounge',
    name: '「失重」地下酒吧＆小劇場',
    desc: '夜晚才甦醒的聚光燈與搖晃酒杯，慾望、表演與危險的博弈場。',
    icon: '🍸',
    characters: ['han_xiao', 'xia_le']
  },
  {
    id: 'studio',
    name: '雲端建築事務所＆落地窗露台',
    desc: '高聳於城市頂層的極簡玻璃空間，俯視眾生的完美主義堡壘。',
    icon: '🏛️',
    characters: ['gu_qingcheng']
  }
];

export const CLUSTERS = {
  A: {
    id: 'A',
    name: 'Cluster A：奇特／古怪型 (Odd / Eccentric)',
    color: '#818cf8',
    desc: '包含妄想型、孤僻型、思覺失調型。在人際關係中常表現出疏離、猜疑或獨特的認知與知覺體驗（DSM-5-TR 中位數盛行率約 3.6%）。'
  },
  B: {
    id: 'B',
    name: 'Cluster B：戲劇化／情緒化／不穩定型 (Dramatic / Emotional / Erratic)',
    color: '#f43f5e',
    desc: '包含反社會型、邊緣型、做作型、自戀型。情感濃烈、戲劇化、衝動或人際關係劇烈擺盪（DSM-5-TR 中位數盛行率約 4.5%）。'
  },
  C: {
    id: 'C',
    name: 'Cluster C：焦慮／恐懼型 (Anxious / Fearful)',
    color: '#34d399',
    desc: '包含畏避型、依賴型、強迫型。核心驅力來自深層的焦慮、對被拒絕或失控的恐懼（DSM-5-TR 中位數盛行率約 2.8%）。'
  },
  OTHER: {
    id: 'OTHER',
    name: 'Other PD：生理病況改變與其他特定型',
    color: '#f59e0b',
    desc: '包含「另一身體病況引起之人格改變 (F07.0)」與「其他特定之人格障礙症：被動攻擊／混合特徵 (F60.89)」。'
  }
};

export const CHARACTERS = [
  // ==================== CLUSTER A ====================
  {
    id: 'shen_mo',
    number: '01',
    name: '沈墨',
    enName: 'Shen Mo',
    age: 27,
    occupation: '獨立調查記者／資安顧問',
    cluster: 'A',
    dsmCode: 'F60.0',
    dsmTitle: '妄想型人格障礙症',
    dsmTitleEn: 'Paranoid Personality Disorder',
    sex: 'male',
    genderLabel: '順性別男性 (Cis Male)',
    pronoun: '他',
    orientation: 'bisexual',
    orientationLabel: '雙性戀 (Bisexual)',
    romanticGenders: ['female', 'male', 'nonbinary'],
    locationId: 'rooftop',
    themeColor: '#6366f1',
    ecgType: 'vigilant',
    tagline: '「你對我這麼好，背後到底受誰指使？……別笑，我是認真的。」',
    shortBio: '住在棲遲公寓頂樓加蓋的獨立調查記者。拉上三層遮光窗簾，門鎖裝了兩道電子警報。他聰明敏銳、觀察入微，卻深信所有不請自來的善意都是精心設計的陷阱。',
    clinicalOverview: '核心特徵為對他人普遍的不信任和猜疑，把別人的動機都解釋為充滿惡意（Criterion A）。常在沒有充分根據下懷疑別人正在利用、傷害或欺騙自己，對無心的評論讀出隱藏的貶抑或威脅，極度記仇，並在親密關係中反覆質疑伴侶的忠誠度。',
    differentialNote: '【臨床鑑別】與「思覺失調型」不同，妄想型沒有魔幻思考或奇特知覺；與「畏避型」也不同——畏避型不敢敞開心房是因為怕被嘲笑羞辱，妄想型則是怕吐露的秘密被當成攻擊自己的武器。',
    strategyHint: '切忌過度熱情的讚美（他會覺得你在諷刺或有所圖謀）或善意的謊言。保持高度透明、守時、給他掌控距離的權利，才能建立安全感。',
    initialStats: { affection: 8, security: 8, boundary: 42 },
    avatar: {
      skin: '#f1dca7',
      hairColor: '#1e1b4b',
      hairStyle: 'short_messy',
      eyeColor: '#4338ca',
      outfitColor: '#1e293b',
      accentColor: '#6366f1',
      accessory: 'recorder'
    },
    criteria: [
      {
        id: 'F60.0-A1',
        code: '準則 A1 & A2',
        title: '無根據的懷疑與忠誠度考驗',
        desc: '在沒有充分根據下猜疑別人正在利用或欺騙自己，全神貫注於懷疑朋友或夥伴的忠誠與可靠度。'
      },
      {
        id: 'F60.0-A3',
        code: '準則 A3',
        title: '畏懼吐露秘密被惡意利用',
        desc: '不願對人傾訴，因為毫無根據地害怕資訊會被惡意用來對付自己（常回答「這不關你的事」）。'
      },
      {
        id: 'F60.0-A4',
        code: '準則 A4',
        title: '過度解讀善意為威脅',
        desc: '由他人善意的評論或事件中，讀出隱藏的貶抑或威脅意味（連讚美都可能被誤解為操控）。'
      },
      {
        id: 'F60.0-A7',
        code: '準則 A7',
        title: '病理性嫉妒與控制需求',
        desc: '在沒有充分理由下反覆猜疑伴侶的忠誠，試圖透過掌握行蹤來避免被背叛。'
      }
    ]
  },
  {
    id: 'lin_jianwei',
    number: '02',
    name: '林見微',
    enName: 'Lin Jianwei',
    age: 25,
    occupation: '市立天文館觀測員／古董鐘錶修復師',
    cluster: 'A',
    dsmCode: 'F60.1',
    dsmTitle: '孤僻型人格障礙症',
    dsmTitleEn: 'Schizoid Personality Disorder',
    sex: 'female',
    genderLabel: '順性別女性 (Cis Female)',
    pronoun: '她',
    orientation: 'asexual_demi',
    orientationLabel: '無性戀／半浪漫傾向 (Asexual Demi-romantic)',
    romanticGenders: ['female', 'male', 'nonbinary'],
    locationId: 'rooftop',
    themeColor: '#38bdf8',
    ecgType: 'flat_calm',
    tagline: '「齒輪比人類好懂。人類需要回應，但星空不需要。」',
    shortBio: '總是在凌晨獨自待在天台調校赤道儀的女孩。表情淡漠如靜水，不參加聚會、不滑社群軟體，對他人的稱讚或批評毫不在意，卻能精準聽出機械鐘錶裡千分之一秒的誤差。',
    clinicalOverview: '核心特徵為對社會關係普遍疏離，且在人際情境中情緒表達範圍極度受限（Criterion A）。既不渴望也不享受親密關係，幾乎總是選擇獨處活動，對與他人發生性經驗或感官享樂幾乎沒有興趣，對外界讚美或批評顯得漠不關心。',
    differentialNote: '【臨床鑑別】與「畏避型」最大的差異在於：畏避型內心非常渴望人際連結但因怕被拒絕而不敢靠近；孤僻型則是本質上缺乏對親密社交與感官刺激的需求，十分享受獨處。',
    strategyHint: '不要強行拉她去熱鬧場合，也不要逼問「妳到底在想什麼」。學會與她在同一個空間裡安靜地各自做自己的事（Parallel Play），是走進她世界的唯一方式。',
    initialStats: { affection: 8, security: 8, boundary: 42 },
    avatar: {
      skin: '#f8fafc',
      hairColor: '#0f172a',
      hairStyle: 'long_straight',
      eyeColor: '#0284c7',
      outfitColor: '#334155',
      accentColor: '#38bdf8',
      accessory: 'pocketwatch'
    },
    criteria: [
      {
        id: 'F60.1-A1',
        code: '準則 A1 & A2',
        title: '疏離親密關係與偏好獨處',
        desc: '既不想要也不享受親密關係，幾乎總是選擇不需與人互動的獨處活動（如天文觀測、機械與數學）。'
      },
      {
        id: 'F60.1-A3',
        code: '準則 A3 & A4',
        title: '低感官享樂與無性傾向',
        desc: '對與他人發生性經驗幾乎沒有興趣，且極少在日常活動或感官體驗中感到強烈愉悅。'
      },
      {
        id: 'F60.1-A6',
        code: '準則 A6',
        title: '對毀譽漠不關心',
        desc: '對於他人的讚美或批評顯得無動於衷，不受社會評價左右。'
      },
      {
        id: 'F60.1-A7',
        code: '準則 A7',
        title: '情感冷淡與平淡表情',
        desc: '情緒冷淡、疏離或情感表現平淡，極少回報微笑或點頭等社交暗示，但在極罕見的安全時刻會坦承社交帶來的痛苦。'
      }
    ]
  },
  {
    id: 'ruri',
    number: '03',
    name: '星野 琉璃',
    enName: 'Hoshino Ruri',
    age: 23,
    occupation: '神秘學古著店主／占星與聲音療癒師',
    cluster: 'A',
    dsmCode: 'F21',
    dsmTitle: '思覺失調型人格障礙症',
    dsmTitleEn: 'Schizotypal Personality Disorder',
    sex: 'female',
    genderLabel: '生理女／非二元流動性別 (Genderfluid)',
    pronoun: '她／祂',
    orientation: 'pansexual',
    orientationLabel: '泛性戀 (Pansexual)',
    romanticGenders: ['female', 'male', 'nonbinary'],
    locationId: 'atelier',
    themeColor: '#c084fc',
    ecgType: 'mystic_wave',
    tagline: '「剛才路燈閃了三次，烏鴉往西邊飛……這是宇宙要我今天別相信人類的訊號。」',
    shortBio: '穿著不對稱刺繡披肩與叮噹作響的銀飾，說話像詩句又像謎語。她相信自己的意念會影響天氣，總覺得街上的招牌在對她傳遞暗號。雖然渴望靈魂共鳴，卻在人群中感到強烈的異質與不安。',
    clinicalOverview: '核心特徵為社交與人際缺損（對親密關係極度不自在），伴隨認知或知覺扭曲及行為古怪（Criterion A）。常見關係意念（Ideas of reference）、奇特信念或魔幻思考（第六感、心電感應、魔法儀式）、不尋常知覺經驗、言談過度抽象或隱喻，以及不會隨熟識度而減輕的社交焦慮。',
    differentialNote: '【臨床鑑別】雖有關係意念與奇特知覺，但未達思覺失調症（Schizophrenia）的持續性妄想或幻覺程度；其社交焦慮源自偏執恐懼（怕外在惡意能量），而非畏避型的自我貶低。',
    strategyHint: '不要嘲笑她的占卜與小儀式（繞過特定路磚三次），但當她因偏執恐懼而焦慮時，溫柔地幫她與現實世界建立安全的定錨。',
    initialStats: { affection: 8, security: 8, boundary: 42 },
    avatar: {
      skin: '#fef3c7',
      hairColor: '#581c87',
      hairStyle: 'wavy_twin',
      eyeColor: '#9333ea',
      outfitColor: '#3b0764',
      accentColor: '#c084fc',
      accessory: 'tarot'
    },
    criteria: [
      {
        id: 'F21-A1',
        code: '準則 A1 & A2',
        title: '關係意念與魔幻思考',
        desc: '將偶然的外在事件解讀為對自己有特殊意義（關係意念），並相信第六感、心電感應或儀式能控制結果。'
      },
      {
        id: 'F21-A3',
        code: '準則 A3 & A4',
        title: '不尋常知覺與隱喻言談',
        desc: '常感覺到「某種存在」或聽見低語，言談充滿獨特隱喻、過度抽象或離題。'
      },
      {
        id: 'F21-A7',
        code: '準則 A7',
        title: '奇特裝扮與舉止',
        desc: '穿著風格與舉止獨特古怪，不拘泥於一般社交常規。'
      },
      {
        id: 'F21-A9',
        code: '準則 A9',
        title: '不隨熟識減退的社交焦慮',
        desc: '過度社交焦慮不會隨著相處時間變長而緩解，因為其焦慮與對他人動機的猜疑有關。'
      }
    ]
  },

  // ==================== CLUSTER B ====================
  {
    id: 'han_xiao',
    number: '04',
    name: '韓梟',
    enName: 'Han Xiao',
    age: 28,
    occupation: '「失重」地下酒吧調酒師／重機賽車手',
    cluster: 'B',
    dsmCode: 'F60.2',
    dsmTitle: '反社會型人格障礙症',
    dsmTitleEn: 'Antisocial Personality Disorder',
    sex: 'male',
    genderLabel: '順性別男性 (Cis Male)',
    pronoun: '他',
    orientation: 'pansexual',
    orientationLabel: '泛性戀 (Pansexual)',
    romanticGenders: ['female', 'male', 'nonbinary'],
    locationId: 'lounge',
    themeColor: '#ef4444',
    ecgType: 'thrill_seeker',
    tagline: '「規則是寫給不敢贏的人看的。怎麼，你想當我的獵物，還是我的共犯？」',
    shortBio: '嘴角總掛著漫不經心的迷人壞笑，能在三分鐘內看穿任何人的弱點並投其所好。他極度厭惡無聊，熱衷遊走法律與道德邊緣的刺激遊戲。在他眼裡，人際關係只分「有趣的工具」與「無聊的廢物」——直到遇見看穿他把戲的你。',
    clinicalOverview: '核心特徵為漠視並侵犯他人權利（Criterion A）。具表面魅力（Superficial charm）與能言善道，實則常說謊或操弄他人以獲取利益或樂趣，衝動、不顧自身與他人安全、缺乏責任感，且對傷害他人毫無悔意（常合理化為「弱肉強食」）。',
    differentialNote: '【臨床鑑別】與「自戀型」或「做作型」不同：做作型與邊緣型的操弄是為了獲取關愛與照顧，而反社會型的操弄是為了獲取利益、權力或感官刺激，且缺乏罪惡感。',
    strategyHint: '絕對不能當乖乖聽話的獵物（邊界值過低會直接進入被榨乾拋棄的結局）。你必須識破他的謊言、立下不可侵犯的底線，才能讓他對你產生真正的敬意與執著。',
    initialStats: { affection: 8, security: 8, boundary: 42 },
    avatar: {
      skin: '#e6c29f',
      hairColor: '#111827',
      hairStyle: 'undercut',
      eyeColor: '#dc2626',
      outfitColor: '#450a0a',
      accentColor: '#ef4444',
      accessory: 'shaker'
    },
    criteria: [
      {
        id: 'F60.2-A1',
        code: '準則 A1 & A2',
        title: '表面魅力與操弄欺瞞',
        desc: '善用膚淺的迷人魅力與言詞打動他人，卻反覆為個人利益或樂趣說謊、設局操弄。'
      },
      {
        id: 'F60.2-A3',
        code: '準則 A3 & A5',
        title: '尋求刺激與漠視安全',
        desc: '無法忍受無聊，行事衝動不顧後果，常透過飆車或高風險行為尋求瞬間刺激。'
      },
      {
        id: 'F60.2-A7',
        code: '準則 A7',
        title: '缺乏悔意與合理化傷害',
        desc: '對自己造成的傷害漠不關心，常以「世界本來就不公平」、「輸家活該」來合理化。'
      }
    ]
  },
  {
    id: 'su_fei',
    number: '05',
    name: '蘇緋',
    enName: 'Su Fei',
    age: 22,
    occupation: '新銳表現主義畫家／樂團主唱',
    cluster: 'B',
    dsmCode: 'F60.3',
    dsmTitle: '邊緣型人格障礙症',
    dsmTitleEn: 'Borderline Personality Disorder',
    sex: 'female',
    genderLabel: '順性別女性 (Cis Female)',
    pronoun: '她',
    orientation: 'bisexual',
    orientationLabel: '雙性戀 (Bisexual)',
    romanticGenders: ['female', 'male', 'nonbinary'],
    locationId: 'atelier',
    themeColor: '#ec4899',
    ecgType: 'erratic_spike',
    tagline: '「只要你慢五分鐘回我，我就覺得你已經不愛我了……求你別丟下我，不然我們一起毀掉好不好？」',
    shortBio: '像一團燃燒的玫瑰火焰。初見面就能對你傾訴最深沉的秘密，把你當成拯救她的唯一神明；但只要你因為工作改期或語氣稍微平淡，她就會瞬間墜入被拋棄的冰窖，用尖銳的怒火或自我破壞來測試你是否真的在乎。背包裡總是放著一隻舊布偶兔。',
    clinicalOverview: '核心特徵為人際關係、自我形象、情感的不穩定以及明顯的衝動性（Criterion A）。瘋狂努力避免真實或想像中的被拋棄；人際關係在「極端理想化」與「極端貶抑」間擺盪；自我認同混亂；慢性空虛感；甚至在關係即將穩定時故意搞砸（Self-sabotage）。',
    differentialNote: '【臨床鑑別】邊緣型與「依賴型」都極度害怕被拋棄：但依賴型面對分離會變得更加順從討好，而邊緣型則會以空虛、暴怒與激烈要求來反應。',
    strategyHint: '不能無底線順從她的情緒勒索（會陷入毀滅性共依存），更不能冷暴力消失。需要「肯定她的感受（Validation）＋溫柔而堅定的界線（Boundary）」。',
    initialStats: { affection: 8, security: 8, boundary: 42 },
    avatar: {
      skin: '#fde8e8',
      hairColor: '#be185d',
      hairStyle: 'twintails_wavy',
      eyeColor: '#db2777',
      outfitColor: '#500724',
      accentColor: '#ec4899',
      accessory: 'plush_bunny'
    },
    criteria: [
      {
        id: 'F60.3-A1',
        code: '準則 A1',
        title: '瘋狂逃避真實或想像的被拋棄',
        desc: '對分離或計畫改變極度敏感，即使對方只是遲到幾分鐘或臨時有事，也會引發強烈的恐慌與被遺棄感。'
      },
      {
        id: 'F60.3-A2',
        code: '準則 A2',
        title: '理想化與貶抑的極端擺盪 (Splitting)',
        desc: '初識時將對方奉若神明，一旦覺得對方不夠關心自己，瞬間將對方貶為殘忍的壞人。'
      },
      {
        id: 'F60.3-A7',
        code: '準則 A7 & A8',
        title: '慢性空虛感與失控怒火',
        desc: '長期被深沉的空虛與孤獨感折磨，對伴侶的些微疏忽爆發激烈嘲諷或怒火，事後又陷入羞恥與覺得自己「很壞」的自責。'
      },
      {
        id: 'F60.3-ASSOC',
        code: '伴隨特徵',
        title: '成功前夕的自我破壞與過渡客體',
        desc: '在關係即將穩定美好時故意搞砸（怕最後還是會失去），且對寵物或玩偶（過渡性客體）比對人更有安全感。'
      }
    ]
  },
  {
    id: 'xia_le',
    number: '06',
    name: '夏樂 (Charlotte)',
    enName: 'Xia Le',
    age: 24,
    occupation: '實驗劇場首席演員／時尚美妝 KOL',
    cluster: 'B',
    dsmCode: 'F60.4',
    dsmTitle: '做作型（戲劇化）人格障礙症',
    dsmTitleEn: 'Histrionic Personality Disorder',
    sex: 'male',
    genderLabel: '順性別男性／華麗中性美學',
    pronoun: '他',
    orientation: 'gay_flex',
    orientationLabel: '多元流動／男同性戀傾向 (Queer / Gay)',
    romanticGenders: ['male', 'nonbinary'],
    locationId: 'lounge',
    themeColor: '#f97316',
    ecgType: 'dramatic_stage',
    tagline: '「親愛的！沒看到我今天換了新香水嗎？快看著我，別看別處！」',
    shortBio: '只要走進房間，全場的燈光彷彿都必須打在他身上。他熱情、愛放電、逢人就抱著喊「我最親愛的靈魂摯友」，說話充滿驚嘆號卻說不出具體細節。一旦大家的話題不在他身上，他就會假裝暈眩或製造戲劇化事件把目光搶回來。',
    clinicalOverview: '核心特徵為過度情緒化與尋求他人注意（Criterion A）。不是目光焦點時會強烈不安；常有不恰當的挑逗行為；情緒轉換極快且流於表面；高度依賴外貌吸引注意；說話偏印象派而缺乏細節；常誤以為關係比實際上更親密，卻害怕真正的深層情感親密。',
    differentialNote: '【臨床鑑別】與「自戀型」都渴望關注：但自戀型要求別人崇拜其「優越與完美」，而做作型只要能成為焦點，即使展現脆弱、依賴或出糗也在所不惜。',
    strategyHint: '不要只當台下鼓掌的觀眾。當他用誇張的表演或挑逗掩飾不安時，溫和地邀請他卸下舞台妝容，肯定那個「不需要發光也值得被愛」的他。',
    initialStats: { affection: 8, security: 8, boundary: 42 },
    avatar: {
      skin: '#ffedd5',
      hairColor: '#fb923c',
      hairStyle: 'fluffy_idol',
      eyeColor: '#ea580c',
      outfitColor: '#431407',
      accentColor: '#f97316',
      accessory: 'rose'
    },
    criteria: [
      {
        id: 'F60.4-A1',
        code: '準則 A1 & A4',
        title: '焦點渴求與外貌焦慮',
        desc: '在自己不是全場注目焦點時感到強烈不安，持續利用外貌吸引注意並四處「討讚美」。'
      },
      {
        id: 'F60.4-A2',
        code: '準則 A2 & A8',
        title: '普遍挑逗與高估親密度',
        desc: '對各種人際關係都帶有挑逗或誘惑色彩，並把剛認識不久的人稱為「最親愛的摯友」。'
      },
      {
        id: 'F60.4-A5',
        code: '準則 A5 & A6',
        title: '印象派言談與戲劇化情緒',
        desc: '說話充滿誇張形容詞卻缺乏事實細節（例如大讚某人完美卻舉不出半個例子），情緒像開關一樣瞬間切換。'
      }
    ]
  },
  {
    id: 'gu_qingcheng',
    number: '07',
    name: '顧傾城',
    enName: 'Gu Qingcheng',
    age: 30,
    occupation: '國際建築師事務所最年輕合夥人',
    cluster: 'B',
    dsmCode: 'F60.81',
    dsmTitle: '自戀型人格障礙症',
    dsmTitleEn: 'Narcissistic Personality Disorder',
    sex: 'female',
    genderLabel: '順性別女性 (Cis Female)',
    pronoun: '她',
    orientation: 'lesbian_flex',
    orientationLabel: '多元流動／女同性戀傾向 (Queer / Lesbian)',
    romanticGenders: ['female', 'nonbinary'],
    locationId: 'studio',
    themeColor: '#eab308',
    ecgType: 'proud_pulse',
    tagline: '「能站在我身邊的人，本身就是一種特權。別讓我發現你跟那群庸才一樣平庸。」',
    shortBio: '站在頂層落地窗前的女王。她才華橫溢、氣場凌人，認為世上99%的人都配不上她的時間。她之所以注意到你，是因為你展現了少見的洞察力（鏡映效應）。然而在她高傲無瑕的盔甲下，任何一絲被批評或失敗的跡象，都會讓她陷入滅頂的羞恥與空洞。',
    clinicalOverview: '核心特徵為誇大感、需要被讚美以及缺乏同理心（Criterion A）。深信自己「特別」且只能被頂尖的人理解；理所當然的特權感；具備「認知同理心」（懂別人在想什麼）卻缺乏「情感同理心」（將他人的脆弱視為軟弱）；高傲背後其實是極度脆弱、害怕暴露缺陷的自尊。',
    differentialNote: '【臨床鑑別】與「強迫型」都追求完美：強迫型總是自我批判覺得自己還不夠好，而自戀型則深信自己已經達到完美，並把錯誤歸咎於他人不懂欣賞。',
    strategyHint: '當眾否定她會引發「自戀暴怒（Narcissistic Rage）」，一味當應聲蟲則會被她看不起。在私密空間裡接住她對失敗的恐懼，讓她知道「不完美也不會失去價值」。',
    initialStats: { affection: 8, security: 8, boundary: 42 },
    avatar: {
      skin: '#fefce8',
      hairColor: '#1c1917',
      hairStyle: 'queen_updo',
      eyeColor: '#ca8a04',
      outfitColor: '#422006',
      accentColor: '#eab308',
      accessory: 'blueprint'
    },
    criteria: [
      {
        id: 'F60.81-A1',
        code: '準則 A1 & A3',
        title: '誇大自我與「唯我特別」信念',
        desc: '擁有誇大的自我重要性，深信自己獨特非凡，只能被其他頂尖或特別的人理解（鏡映自尊）。'
      },
      {
        id: 'F60.81-A4',
        code: '準則 A4 & A5',
        title: '需要過度崇拜與特權感',
        desc: '期待受到特別禮遇與自動順從，對讚美有永無止境的需求，自尊實則極度脆弱。'
      },
      {
        id: 'F60.81-A7',
        code: '準則 A7 & 伴隨特徵',
        title: '缺乏情感同理與羞恥防衛',
        desc: '具認知同理卻缺乏情感同理，且在面對批評或挫敗時會因深層羞恥感而轉為傲慢反擊或退縮。'
      }
    ]
  },

  // ==================== CLUSTER C ====================
  {
    id: 'wen_yan',
    number: '08',
    name: '溫言',
    enName: 'Wen Yan',
    age: 26,
    occupation: '大學古籍修復師／文學譯者',
    cluster: 'C',
    dsmCode: 'F60.6',
    dsmTitle: '畏避型（逃避型）人格障礙症',
    dsmTitleEn: 'Avoidant Personality Disorder',
    sex: 'male',
    genderLabel: '順性別男性 (Cis Male)',
    pronoun: '他',
    orientation: 'hetero_bi',
    orientationLabel: '異性戀／雙性浪漫傾向 (Bi-romantic)',
    romanticGenders: ['female', 'male', 'nonbinary'],
    locationId: 'archive',
    themeColor: '#10b981',
    ecgType: 'anxious_flutter',
    tagline: '「對不起，我剛才是不是說錯話了？如果你覺得我很無聊，隨時離開也沒關係的……」',
    shortBio: '總是坐在古籍修復室最角落的青年，聲音輕得像怕驚動灰塵。他翻譯過最動人的情詩，內心比誰都渴望溫暖的擁抱，卻因為深信自己「笨拙、無趣、次人一等」，只要你微微皺眉，他就會立刻縮回殼裡，認定你一定在心裡嘲笑他。',
    clinicalOverview: '核心特徵為社交抑制、覺得自己不夠好，以及對負面評價極度敏感（Criterion A）。除非確定被喜歡否則不敢與人來往；在親密關係中因怕被羞辱或嘲笑而高度保留；全神貫注於觀察他人是否批評或拒絕自己，將中性表情解讀為否定。',
    differentialNote: '【臨床鑑別】與「孤僻型」最大的不同是：畏避型內心深切渴望愛與歸屬感，並為自己的孤單感到痛苦；孤僻型則對人際連結無感。',
    strategyHint: '給他百分之百明確、不曖昧的肯定，千萬不要開貶損式的玩笑或強迫他在眾人面前表現。循序漸進的安全感是打開他心門的鑰匙。',
    initialStats: { affection: 8, security: 8, boundary: 42 },
    avatar: {
      skin: '#f1f5f9',
      hairColor: '#3f3f46',
      hairStyle: 'soft_bangs',
      eyeColor: '#059669',
      outfitColor: '#064e3b',
      accentColor: '#10b981',
      accessory: 'glasses_book'
    },
    criteria: [
      {
        id: 'F60.6-A2',
        code: '準則 A2 & A3',
        title: '確定被喜歡才敢靠近與親密保留',
        desc: '除非通過嚴格測試確定對方百分之百接納自己，否則不敢投入關係，在親密互動中也因怕出糗而極度克制。'
      },
      {
        id: 'F60.6-A4',
        code: '準則 A4',
        title: '對批評與拒絕的極度敏感',
        desc: '全神貫注於他人的微小表情與語氣，將中性的沉默或動作過度解讀為嘲諷與拒絕。'
      },
      {
        id: 'F60.6-A6',
        code: '準則 A6 & A7',
        title: '自卑感與逃避新事物',
        desc: '認為自己在社交上笨拙、毫無吸引力，因害怕尷尬而抗拒任何個人冒險或新活動。'
      }
    ]
  },
  {
    id: 'bai_xiaolu',
    number: '09',
    name: '白小鹿',
    enName: 'Bai Xiaolu',
    age: 21,
    occupation: '甜點屋學徒／花藝助手',
    cluster: 'C',
    dsmCode: 'F60.7',
    dsmTitle: '依賴型人格障礙症',
    dsmTitleEn: 'Dependent Personality Disorder',
    sex: 'female',
    genderLabel: '順性別女性 (Cis Female)',
    pronoun: '她',
    orientation: 'bisexual',
    orientationLabel: '雙性戀 (Bisexual)',
    romanticGenders: ['female', 'male', 'nonbinary'],
    locationId: 'cafe',
    themeColor: '#f472b6',
    ecgType: 'clinging_beat',
    tagline: '「今天要穿白色還是米色？要帶傘嗎？我都聽你的，只要你別丟下我一個人就好……」',
    shortBio: '眼神像受驚的小鹿般溫順柔軟，總是跟在你身後半步。她烤得出全社區最美味的戚風蛋糕，卻連菜單定價、今天穿什麼衣服都不敢自己決定。為了留住你的照顧，她願意幫你做任何苦差事，甚至故意表現得笨手笨腳——因為她深怕自己一旦變得獨立，你就不再需要她了。',
    clinicalOverview: '核心特徵為普遍且過度需要被人照顧，導致順從、黏人行為及害怕分離（Criterion A）。沒有他人大量建議與保證就無法做日常決定；需要他人為自己的人生負起主要責任；因怕失去支持而不敢表達反對意見；甚至害怕表現得太能幹會導致被遺棄。',
    differentialNote: '【臨床鑑別】依賴型與邊緣型都害怕被拋棄，但依賴型面對分離威脅時會變得更加溫順討好、甚至急迫尋找下一個照顧者，而非像邊緣型那樣爆發憤怒。',
    strategyHint: '【最大攻略陷阱】如果你覺得她很可愛就「幫她決定所有事」，好感度雖然會暴增，但邊界值會歸零並鎖死在「病態共依存結局」！你必須溫柔地把選擇權還給她，並保證「就算妳學會獨立，我也依然愛妳」。',
    initialStats: { affection: 8, security: 8, boundary: 42 },
    avatar: {
      skin: '#fff1f2',
      hairColor: '#9d174d',
      hairStyle: 'braid_soft',
      eyeColor: '#e11d48',
      outfitColor: '#500724',
      accentColor: '#f472b6',
      accessory: 'flower_apron'
    },
    criteria: [
      {
        id: 'F60.7-A1',
        code: '準則 A1 & A2',
        title: '日常決策困難與責任轉移',
        desc: '沒有他人大量的建議與保證，連穿什麼顏色衣服、帶不帶傘等日常小事都難以決定，習慣讓他人主導自己的人生。'
      },
      {
        id: 'F60.7-A3',
        code: '準則 A3 & A5',
        title: '不敢說「不」與過度討好犧牲',
        desc: '因害怕失去支持與認同而不敢表達反對意見，甚至自願承擔不合理或不愉快的要求以換取照顧。'
      },
      {
        id: 'F60.7-A4',
        code: '準則 A4 & 伴隨特徵',
        title: '能力恐懼（害怕獨立會失去愛）',
        desc: '缺乏獨自行動的自信，且潛意識害怕表現得太能幹會讓照顧者覺得「不再需要照顧她」而離開。'
      }
    ]
  },
  {
    id: 'ji_yan',
    number: '10',
    name: '紀嚴',
    enName: 'Ji Yan',
    age: 29,
    occupation: '法醫病理學家／業餘古典鋼琴家',
    cluster: 'C',
    dsmCode: 'F60.5',
    dsmTitle: '強迫型人格障礙症',
    dsmTitleEn: 'Obsessive-Compulsive Personality Disorder (OCPD)',
    sex: 'male',
    genderLabel: '順性別男性 (Cis Male)',
    pronoun: '他',
    orientation: 'hetero_flex',
    orientationLabel: '雙性浪漫／異性戀傾向 (Bi-romantic)',
    romanticGenders: ['female'],
    locationId: 'archive',
    themeColor: '#14b8a6',
    ecgType: 'metronome',
    tagline: '「約會遲到兩分鐘，代表你對這段關係的優先序排列有誤。這是我的修正清單，請過目。」',
    shortBio: '襯衫扣子永遠扣到最頂端，連喝水時間都寫在甘特圖裡的男人。他為了把報告寫到「絕對完美」而反覆重寫到錯過截稿日；拒絕讓別人幫忙洗碗，因為「別人擺放碗盤的角度不對」。在感情裡，他總是反覆排練到確定每一句話都完美無瑕才敢開口，結果往往錯過了擁抱的時機。',
    clinicalOverview: '核心特徵為全神貫注於秩序、完美主義以及精神與人際的控制，因而犧牲彈性、開放性與效率（Criterion A）。過度專注於規則與清單以致迷失活動主旨；完美主義妨礙任務完成；過度投入工作排斥休閒；道德標準僵化；不願授權他人；情感表達極度克制拘謹。',
    differentialNote: '【臨床鑑別】強迫型人格障礙症（OCPD）與強迫症（OCD）不同：OCPD 沒有真正的強迫思考與儀式行為（如反覆洗手防細菌），而是將僵化的秩序與控制視為正確的生活原則（自我協調 ego-syntonic）。',
    strategyHint: '不要故意弄亂他的東西來「治療」他，那只會讓他失控憤怒。在他因為計畫被打亂而陷入自我批判時，陪他體驗一次「即使不照清單走，世界也不會崩塌」的溫暖。',
    initialStats: { affection: 8, security: 8, boundary: 42 },
    avatar: {
      skin: '#f8fafc',
      hairColor: '#0f172a',
      hairStyle: 'parted_neat',
      eyeColor: '#0d9488',
      outfitColor: '#134e4a',
      accentColor: '#14b8a6',
      accessory: 'metronome_list'
    },
    criteria: [
      {
        id: 'F60.5-A1',
        code: '準則 A1 & A2',
        title: '清單執著與妨礙完成的完美主義',
        desc: '過度專注於細節、規則、清單與排程以致迷失活動原本的目的（例如弄丟待辦清單時花數小時找清單，而非直接做事）。'
      },
      {
        id: 'F60.5-A3',
        code: '準則 A3 & A6',
        title: '工作狂熱與拒絕授權',
        desc: '連休假都必須帶著工作才不會覺得「浪費時間」，且堅持只有自己的做法才唯一正確，拒絕他人幫忙。'
      },
      {
        id: 'F60.5-ASSOC',
        code: '伴隨特徵',
        title: '高度克制的情感表達',
        desc: '面對他人熱情表達情感會感到不自在，總是壓抑溫柔的感受，直到確定自己能說出「最完美的句子」才敢開口。'
      }
    ]
  },

  // ==================== OTHER PERSONALITY DISORDERS ====================
  {
    id: 'lu_qinglan',
    number: '11',
    name: '陸晴嵐',
    enName: 'Lu Qinglan',
    age: 29,
    occupation: '前神經外科主治醫師／現職「金繼」陶藝家',
    cluster: 'OTHER',
    dsmCode: 'F07.0',
    dsmTitle: '另一身體病況引起之人格改變',
    dsmTitleEn: 'Personality Change Due to Another Medical Condition',
    sex: 'female',
    genderLabel: '順性別女性 (Cis Female)',
    pronoun: '她',
    orientation: 'pansexual',
    orientationLabel: '泛性戀 (Pansexual)',
    romanticGenders: ['female', 'male', 'nonbinary'],
    locationId: 'atelier',
    themeColor: '#f59e0b',
    ecgType: 'irregular_rebirth',
    tagline: '「大家都懷念車禍前那個冷靜完美的外科醫師陸晴嵐……只有你問我，現在的我快不快樂。」',
    shortBio: '兩年前一場嚴重車禍造成右側額葉受損。康復後的她雖然保住了記憶，性格卻判若兩人——從原本端莊內斂、情緒不露聲色的菁英醫師，變得直率衝動、笑點奇特、眼淚與大笑說來就來（情緒易變與去抑制型）。以前的伴侶與同事紛紛離她而去，感嘆「她不再是以前的她了」，她於是用黃金修補碎裂的陶器（金繼），也修補自己。',
    clinicalOverview: '核心特徵為由另一身體病況（如額葉創傷、腦血管疾病、癲癇等）直接病理生理後果所導致的持續性人格改變（Criterion A & B）。常見亞型包含情緒易變型（Labile）、去抑制型（Disinhibited，衝動與不合時宜的詼諧）、冷漠型（Apathetic）等，常被周遭人認為「不像以前的自己」。',
    differentialNote: '【臨床鑑別】不同於自青少年時期即穩定存在的原發性人格障礙，F07.0 具有明確的生理病因與病前／病後的人格斷裂，當事人除了適應新性格，還必須面對他人對「舊自我」的哀悼與否定。',
    strategyHint: '千萬不要拿她車禍前的榮耀或舊照片來比較。接納她的直接、衝動與偶爾的情緒潰堤，愛上「此刻重生的她」。',
    initialStats: { affection: 8, security: 8, boundary: 42 },
    avatar: {
      skin: '#fef3c7',
      hairColor: '#78350f',
      hairStyle: 'short_bob_scar',
      eyeColor: '#d97706',
      outfitColor: '#451a03',
      accentColor: '#f59e0b',
      accessory: 'kintsugi'
    },
    criteria: [
      {
        id: 'F07.0-A',
        code: '準則 A & B',
        title: '額葉創傷後之顯著人格斷裂',
        desc: '因腦部額葉受損導致與病前截然不同的人格模式，周遭親友常感嘆「她不再是以前那個人了」。'
      },
      {
        id: 'F07.0-SUB1',
        code: '亞型特徵',
        title: '情緒易變 (Labile) 與去抑制 (Disinhibited)',
        desc: '表現出情緒快速起伏、不加掩飾的直率、詼諧（Facetiousness）以及較低的衝動控制力。'
      },
      {
        id: 'F07.0-PSYCH',
        code: '心理議題',
        title: '舊自我哀悼與金繼重生',
        desc: '在他人對「過去完美醫師」的懷念中感到被否定，渴望有人能接納受傷後真實的自己。'
      }
    ]
  },
  {
    id: 'you_ziqian',
    number: '12',
    name: '游子謙',
    enName: 'You Ziqian',
    age: 26,
    occupation: '「邊界」咖啡廳店長／自由平面設計師',
    cluster: 'OTHER',
    dsmCode: 'F60.89',
    dsmTitle: '其他特定之人格障礙症（被動攻擊／混合特徵）',
    dsmTitleEn: 'Other Specified PD (Passive-Aggressive / Mixed Features)',
    sex: 'male',
    genderLabel: '順性別男性 (Cis Male)',
    pronoun: '他',
    orientation: 'gay_bi',
    orientationLabel: '男同性戀／雙性戀 (Gay / Bisexual)',
    romanticGenders: ['male', 'nonbinary', 'female'],
    locationId: 'cafe',
    themeColor: '#a855f7',
    ecgType: 'masked_wave',
    tagline: '「好啊，都聽你的，我完全沒意見喔～（微笑把你的濃縮咖啡換成無咖啡因）」',
    shortBio: '棲遲公寓裡人緣最好、永遠笑臉迎人的溫柔店長。他從來不跟任何人吵架，對所有要求都微笑說「好啊、沒問題、我都配合你」；但只要是他心裡不情願的事，他就會「不小心」忘記、「剛好」淋濕文件、用最溫柔的語氣說出最酸的抱怨。因為他從小被教育「生氣是不被允許的」。',
    clinicalOverview: '對應 DSM-5-TR 第 734 與 778 頁之「其他特定之人格障礙症（Other Specified PD, F60.89）」，包含被動攻擊型（Passive-Aggressive）與混合型人格特徵。表面順從合作，實則透過拖延、故意遺忘、沒效率、冷嘲熱諷與消極抵抗來表達對他人的敵意與對控制的抗拒。',
    differentialNote: '【臨床鑑別】與「依賴型」的順從不同：依賴型的順從是真心害怕失去依靠，而被動攻擊型的順從則是帶著隱性憤怒的防衛面具，背後藏著對自主權的渴望與對正面衝突的恐懼。',
    strategyHint: '不要相信他嘴上的「隨便、都可以」，也不要因為他「不小心搞砸」而對他破口大罵（這只會讓他更確信你是暴君）。溫和地戳破他的微笑面具，告訴他：「在我面前，你可以直接生氣、可以直接拒絕。」',
    initialStats: { affection: 8, security: 8, boundary: 42 },
    avatar: {
      skin: '#f3e8ff',
      hairColor: '#4c1d95',
      hairStyle: 'gentle_wave',
      eyeColor: '#7e22ce',
      outfitColor: '#2e1065',
      accentColor: '#a855f7',
      accessory: 'coffee_pot'
    },
    criteria: [
      {
        id: 'F60.89-PA1',
        code: '特徵 1',
        title: '口頭順從與行動拖延',
        desc: '面對他人的期待或要求時表面微笑答應，卻透過拖延、「不小心忘記」或故意沒效率來消極抵抗。'
      },
      {
        id: 'F60.89-PA2',
        code: '特徵 2',
        title: '隱性敵意與酸言酸語',
        desc: '無法直接表達憤怒，常以自嘲、「我哪敢有意見」或溫和的酸言酸語讓對方產生罪惡感。'
      },
      {
        id: 'F60.89-MIX',
        code: '特徵 3',
        title: '混合型防衛（討好與抗拒交織）',
        desc: '同時帶有畏避衝突與渴望自主的混合特徵，唯有在確認「拒絕也不會被懲罰」時才能卸下假笑。'
      }
    ]
  }
];
