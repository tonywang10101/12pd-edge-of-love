// 《愛的邊緣》(Edge of Love) 2.0 — 15 事件決策樹引擎、跨地點動態行程、雙層背景（現在背景／成長養成故事）、三人同場與共同天災事件庫

import { LOCATIONS, CHARACTERS } from './characters.js?v=6';

// ==================== 12 角色：跨地點動態行程 ＆ 現在背景（公開） ＆ 成長養成背景（探索完解鎖） ====================
export const CHARACTER_EXTENDED_LORE = {
  shen_mo: {
    scheduleLocations: ['rooftop', 'cafe', 'archive', 'lounge'],
    trioPartner1: 'lin_jianwei',
    trioPartner2: 'gu_qingcheng',
    currentBackground:
      '27 歲，住在棲遲公寓頂樓加蓋的獨立調查記者兼資安顧問。房門裝了兩道電子鎖與針孔偵測器，喝水只喝自己親手拆封的瓶裝水。他邏輯縝密、觀察力驚人，專門揭發企業弊案，但在日常生活中總覺得鄰居的寒暄別有用心、外送員遲到是在安裝監聽器。',
    growthBackstory: {
      title: '《被雙親當作籌碼與間諜的童年》',
      story:
        '沈墨的父母在他 8 歲時陷入長達十年的惡性爭產與離婚官司。母親每晚會溫柔哄他喝熱牛奶，套出他白天跟父親去了哪裡，隔天就在法庭上用這些話讓父親身敗名裂；父親則在他的書包與泰迪熊裡縫入微型錄音筆，一旦沈墨沒說實話就會被鎖進地下室。16 歲那年，他唯一信任的摯友為了獎學金名額，將他私下吐露的家庭創傷投稿到校刊公開羞辱。從那天起，沈墨大腦的警報器再也沒有關上過——對他而言，「相信別人」就等於「把刀柄遞給對方刺向自己」。'
    },
    eventBlueprint: [
      { code: 'E01', phase: 1, loc: 'rooftop', type: 'base_chap', chapIdx: 0, title: '頂樓的雙重門鎖與試探', critIdx: 0 },
      {
        code: 'E02', phase: 1, loc: 'cafe', type: 'custom', title: '轉角監聽：密封罐裝水的戒心', critIdx: 0,
        prompt: '在「邊界」咖啡屋角落，沈墨戴著單邊監聽耳機，面前放著一瓶未拆封的礦泉水，堅決不碰游子謙端來的手沖咖啡。',
        charLine: '「開放式吧台的飲品有 17 種下藥途徑。你坐過來之前，有注意到門口那輛黑色轎車停了多久嗎？」',
        choices: [
          { text: '「我剛才有留意車牌，是附近花店的送貨車，清單在門口喔。」', reply: '他緊繃的肩膀微不可察地放鬆了一毫米：「……你觀察力比我想像中好。」', stats: { affection: 8, security: 10, boundary: 5 }, psychNote: '提供可查證的客觀事實，能有效降低高警覺者的防衛。' },
          { text: '「你想太多了吧！子謙怎麼可能下藥啦！」', reply: '他冷冷拉下帽簷：「毫無防備的人，通常連自己怎麼被賣掉的都不知道。」', stats: { affection: -5, security: -10, boundary: 0 }, psychNote: '直接否定他的懷疑只會讓他把你也歸類為「盲目或同夥」。' }
        ]
      },
      {
        code: 'E03', phase: 1, loc: 'archive', type: 'custom', title: '加密硬碟：背後的盯視', critIdx: 1,
        prompt: '在大學古籍修復室，沈墨委託修復一頁燒焦的紙本帳冊，卻全程站在桌後死死盯著每一個動作。',
        charLine: '「別誤會，我不是針對你。只是這份名單價值三千萬，我連自己的影子都不信。」',
        choices: [
          { text: '「理解，那我把雙手都放在檯燈照射範圍內，讓你全程看清楚。」', reply: '他愣了一下，眼神閃過一絲動容：「……謝謝你沒有覺得我在羞辱你。」', stats: { affection: 10, security: 12, boundary: 6 }, psychNote: '尊重他的控制感需求而不隨之起舞，建立了珍貴的初步信任。' },
          { text: '「你這樣盯著我看，我壓力很大耶，幫你還被懷疑！」', reply: '他立刻伸手抽回帳冊放進防彈公事包：「抱歉，是我不該麻煩外人。」', stats: { affection: -6, security: -8, boundary: 4 }, psychNote: '情緒化的抱怨會觸發他「果然不能依靠任何人」的信念。' }
        ]
      },
      { code: 'E04', phase: 1, loc: 'rooftop', type: 'trio', partnerId: 'lin_jianwei', title: '三人交會：天台望遠鏡的監視疑雲', critIdx: 2 },
      { code: 'E05', phase: 2, loc: 'lounge', type: 'base_chap', chapIdx: 1, title: '地下酒吧的線人與五分鐘空白', critIdx: 3 },
      {
        code: 'E06', phase: 2, loc: 'rooftop', type: 'custom', title: '無心的讚美：風衣領口的暗號？', critIdx: 2,
        prompt: '傍晚在天台偶遇沈墨，你隨口誇獎他今天穿的深灰風衣很襯他的氣質。',
        charLine: '他瞬間按住領口往後退了一步，眼神銳利：「你怎麼知道我今天剛換了這件外套？是誰讓你來試探我的行程？」',
        choices: [
          { text: '「只是單純覺得好看而已，如果讓你不自在，我下次直接說重點。」', reply: '他沉默數秒，耳根微紅地別過臉：「……是我反應過度了。你說好看，我會記住。」', stats: { affection: 10, security: 10, boundary: 8 }, psychNote: '穩定而不慌亂的回應，能幫他從「過度解讀威脅」中回到現實。' },
          { text: '「誇你帥也不行？你真的有被害妄想耶！」', reply: '他眼神瞬間結冰：「既然覺得我有病，那就離我遠一點。」', stats: { affection: -12, security: -15, boundary: -5 }, psychNote: '貼標籤式的指責是高猜疑特質者的最大雷區。' }
        ]
      },
      {
        code: 'E07', phase: 2, loc: 'cafe', type: 'custom', title: '防衛反撲：被退回的備用鑰匙', critIdx: 1,
        prompt: '因為上次相談甚歡，沈墨反而在隔天刻意迴避你的視線，將公寓頂樓的通行磁卡退還給你。',
        charLine: '「我們走得太近了。當一個人成為我的軟肋，敵人就會從你下手。這張卡你收回去。」',
        choices: [
          { text: '「卡我先幫你收著，等你哪天確認安全了，隨時可以再給我。」', reply: '他怔怔看著你平靜的眼神，低聲說：「……你總是讓我算不準下一步。」', stats: { affection: 12, security: 14, boundary: 10 }, psychNote: '賦予他退後的空間與隨時回頭的安全感。' },
          { text: '「不行！我偏要每天上去找你，直到你相信我為止！」', reply: '他連夜更換了頂樓門鎖密碼。', stats: { affection: -8, security: -14, boundary: -12 }, psychNote: '強行突破物理與心理邊界會引發更劇烈的防衛封鎖。' }
        ]
      },
      { code: 'E08', phase: 2, loc: 'rooftop', type: 'shared_quake', title: '🌍 共同事件 I：深夜六級強震・搖晃的防線', critIdx: 0 },
      { code: 'E09', phase: 3, loc: 'cafe', type: 'trio', partnerId: 'gu_qingcheng', title: '三人修羅場：競圖洩密案的針鋒相對', critIdx: 2 },
      { code: 'E10', phase: 3, loc: 'rooftop', type: 'shared_typhoon', title: '🌍 共同事件 II：強烈颱風過境・孤島之夜', critIdx: 3 },
      {
        code: 'E11', phase: 3, loc: 'lounge', type: 'custom', title: '核心危機：財團黑客的全面反撲', critIdx: 3,
        prompt: '沈墨追查的弊案遭到對方買通網軍抹黑，他的匿名信箱塞滿死亡威脅，整個人陷入極度緊繃的封閉狀態。',
        charLine: '「連我最信任的線人都出賣了我……{player}，告訴我，你留在這裡真的沒有拿任何人的好處嗎？」',
        choices: [
          { text: '「我唯一圖謀的，就是你平安活著。我的行程與紀錄隨時對你公開，但我不會離開。」', reply: '他布滿血絲的眼眶終於泛紅，緊緊握住你的手腕。', stats: { affection: 14, security: 16, boundary: 8 }, psychNote: '在極端危機中展現一致且透明的陪伴。' },
          { text: '「連我都懷疑，那你自己一個人扛吧！」', reply: '他在黑暗中苦笑：「果然……最後還是只剩我一個。」', stats: { affection: -15, security: -20, boundary: 0 }, psychNote: '在創傷重演時刻抽身離開會印證他的核心恐懼。' }
        ]
      },
      { code: 'E12', phase: 3, loc: 'rooftop', type: 'base_chap', chapIdx: 2, title: '心門對峙：唯一備份的靈魂賭注（診斷揭曉）', critIdx: 3, unlockDiagnosis: true },
      {
        code: 'E13', phase: 4, loc: 'archive', type: 'backstory_reveal', title: '過去的房間：泰迪熊裡的微型錄音筆（解鎖養成故事）',
        prompt: '沈墨第一次帶你打開他頂樓保險箱最底層的鐵盒，裡面裝著一隻肚子被縫補過的舊泰迪熊與一捲泛黃錄音帶。',
        charLine: '「8歲那年，我以為媽媽睡前的擁抱是愛，隔天卻在法庭擴音器裡聽見自己的聲音被拿來毀掉爸爸；而爸爸送我的小熊裡，裝著監視我的錄音筆……{player}，是你讓我知道，原來擁抱裡可以沒有竊聽器。」'
      },
      {
        code: 'E14', phase: 4, loc: 'rooftop', type: 'custom', title: '最終約會：不設密碼的雙人黎明',
        prompt: '黎明時分的天台，沈墨拆掉了門口的第二道警報器，將一把純銅實體鑰匙放進你掌心。',
        charLine: '「我可能這輩子還是會習慣先看逃生口、還是會多心，但在你身邊，我願意練習把背交給你。」',
        choices: [
          { text: '握住他的手：「我們不搞突然的驚喜，一輩子都提前向彼此預告愛意。」', reply: '他眼底浮現罕見而純粹的笑意，低頭吻在你的指節上。', stats: { affection: 15, security: 15, boundary: 10 }, psychNote: '達成理解彼此特質的健康共生契約。' }
        ]
      },
      { code: 'E15', phase: 4, loc: 'rooftop', type: 'ending', title: '命定結局分流：邊緣上的白帽共犯' }
    ]
  },

  lin_jianwei: {
    scheduleLocations: ['rooftop', 'archive', 'cafe', 'atelier'],
    trioPartner1: 'shen_mo',
    trioPartner2: 'su_fei',
    currentBackground:
      '25 歲，市立天文館夜間觀測員兼古董機械鐘錶修復師。說話永遠簡短平直，臉上幾乎沒有表情起伏。不參加任何公寓聚餐，對戀愛八卦、時尚或別人的誇獎與批評都毫無反應，唯一能讓她眼神停留超過三秒的只有星圖與精密齒輪。',
    growthBackstory: {
      title: '《結冰的北極觀測站與不會回應的搖籃》',
      story:
        '林見微出生於雙親皆為極地氣候與天體物理學家的家庭。嬰兒時期的她哭泣時，父母只會依照明確的「每四小時餵食表」處理，從未給予擁抱或眼神安撫。7 歲到 14 歲間，她經常被獨自留在安靜得只有風聲與儀器滴答聲的觀測所宿舍。當她發現向父母分享喜怒哀樂只會換來「這不符合客觀邏輯」的冷淡回應後，她逐漸關閉了所有對人際溫暖的渴求，將內心改造成一座自給自足、不需要任何人類就能精準運轉的天文鐘。'
    }
  },

  ruri: {
    scheduleLocations: ['atelier', 'rooftop', 'cafe', 'studio'],
    trioPartner1: 'lu_qinglan',
    trioPartner2: 'shen_mo',
    currentBackground:
      '23 歲，微光藝術工坊的占星插畫家兼古著店主。總是披著繡滿星月圖騰的罩衫，脖子上掛著紫水晶靈擺。說話充滿詩意的跳躍與隱喻，常覺得路邊的黑貓、咖啡杯裡的奶泡形狀或街角的紅綠燈閃爍是在向她傳遞宇宙的預言。',
    growthBackstory: {
      title: '《在神龕與幻覺邊緣長大的通靈少女》',
      story:
        '琉璃從小與迷信民俗巫術的外婆住在偏遠山城，外婆認定她天生帶有「靈視」，將她成長過程中所有的知覺敏感、社交恐懼與童年高燒後的視錯覺都解釋為「神明的啟示」。在學校裡，同儕因為她奇特的穿著與自言自語而集體霸凌她，把她的畫冊撕碎丟進水溝。為了在孤立與恐懼中活下去，琉璃在腦海中構築了一套萬物有靈的魔幻符號系統——只要把所有的惡意都解釋成「星象逆行的考驗」，世界就不會那麼殘忍。'
    }
  },

  han_xiao: {
    scheduleLocations: ['lounge', 'rooftop', 'studio', 'cafe'],
    trioPartner1: 'xia_le',
    trioPartner2: 'bai_xiaolu',
    currentBackground:
      '28 歲，「失重」地下酒吧的首席調酒師兼危機談判專家。嘴角永遠掛著漫不經心卻致命迷人的微笑，極度擅長察言觀色與精準說出別人最想聽的話。熱愛重機競速與高風險賭局，視社會規則與道德契約如無物。',
    growthBackstory: {
      title: '《賭場後巷的叢林法則與 13 歲的行為規範障礙》',
      story:
        '韓梟的父親是地下錢莊打手，母親是詐騙集團車手。從 6 歲起，只要他在家表現出軟弱、哭泣或同情心，就會換來父親皮帶的抽打與「弱者活該被吃掉」的羞辱。12 歲時他已出現典型行為規範障礙特徵——逃學、鬥毆、用謊言把欺負他的高年級生送進少年觀護所。他在弱肉強食的街頭很早就學會：眼淚是最沒用的東西，唯有先看穿別人的弱點並掌控棋局，才不會成為別人砧板上的肉。'
    }
  },

  su_fei: {
    scheduleLocations: ['atelier', 'lounge', 'rooftop', 'cafe'],
    trioPartner1: 'bai_xiaolu',
    trioPartner2: 'lin_jianwei',
    currentBackground:
      '25 歲，交響樂團大提琴首席兼新銳畫家。才華橫溢、愛恨濃烈如火，拉琴時能讓全場落淚。對主角一見如故，卻會因為訊息慢回五分鐘而連發二十條語音，情緒在「你是全世界唯一懂我的人」與「你跟其他人一樣都要拋棄我」之間劇烈擺盪。',
    growthBackstory: {
      title: '《永遠在打包行李的母親與破碎的搖籃曲》',
      story:
        '蘇緋的母親是一位情緒極不穩定的歌劇演員，父親在她 4 歲時不告而別。童年時，每當蘇緋拉琴得獎，母親會緊緊抱著她哭喊「緋緋是媽媽活下去的唯一理由」；但只要蘇緋稍微沒達到要求，母親就會當著她的面收拾行李箱走到門口，冷冷地說「媽媽不要你了」。年幼的蘇緋無數次赤著腳在雨夜追逐母親的計程車。這種「極端溺愛與隨時拋棄」的雙重束縛，讓她的客體恆常性徹底碎裂——只要愛人不在視線範圍內，她就感覺自己正在消失。'
    }
  },

  xia_le: {
    scheduleLocations: ['lounge', 'cafe', 'atelier', 'studio'],
    trioPartner1: 'han_xiao',
    trioPartner2: 'wen_yan',
    currentBackground:
      '23 歲，人氣時尚偶像兼小劇場舞台劇演員。走到哪裡都自帶聚光燈與香水味，習慣對每個人眨眼、搭肩、親暱地喊「親愛的」。說話充滿「超震撼、美到窒息」等誇張形容詞，卻最怕房間安靜下來、沒人看他的時刻。',
    growthBackstory: {
      title: '《只有穿上戲服才會被看見的隱形男孩》',
      story:
        '夏樂是家中三個孩子裡最不起眼的老二，哥哥是資優生，妹妹體弱多病。童年時，父母幾乎記不住他的生日；直到 7 歲那年他在家庭聚會上模仿電視明星載歌載舞，全場哄堂大笑、母親第一次抱起他誇獎「樂樂真是個小開心果」。從此他領悟到一個生存鐵律：平凡安靜的夏樂是隱形的、不值得被愛的；唯有不斷表演、浮誇、漂亮、讓所有人為他尖叫，他才能確認自己存在於這個世界上。'
    }
  },

  gu_qingcheng: {
    scheduleLocations: ['studio', 'cafe', 'lounge', 'atelier'],
    trioPartner1: 'wen_yan',
    trioPartner2: 'shen_mo',
    currentBackground:
      '29 歲，雲端建築事務所創辦人，業界最年輕的普立茲克獎提名新星。氣場強大、舉手投足皆是貴族般的傲慢與優雅。常把「平庸是一種傳染病」掛在嘴邊，認為只有頂尖的餐廳、藝術品與伴侶才配得上她，卻對任何一絲微小的負評極度暴怒。',
    growthBackstory: {
      title: '《只准拿第一名的玻璃獎盃與被丟進壁爐的 98 分畫紙》',
      story:
        '顧傾城出身建築世家，父親是威權冷酷的建築泰斗。從她懂事起，家裡沒有「愛」，只有「績效評估」。10 歲那年她拿了全校繪畫比賽第二名，父親當著所有賓客的面把她的獎狀撕碎丟進壁爐，冷冷地說：「顧家不需要亞軍，如果你不能成為受人仰望的神，你就只是一文不值的廢物。」為了不再體驗那種深入骨髓的羞恥感，顧傾城為自己鍛造了一具黃金盔甲——她必須永遠高高在上、完美無瑕，因為一旦承認自己有半點脆弱，那個 10 歲的小女孩就會再次被丟進火裡。'
    }
  },

  wen_yan: {
    scheduleLocations: ['archive', 'cafe', 'atelier', 'rooftop'],
    trioPartner1: 'gu_qingcheng',
    trioPartner2: 'xia_le',
    currentBackground:
      '25 歲，大學古籍修復師兼獨立文學譯者。總是穿著寬鬆的米色針織衫、戴著細框眼鏡，說話聲音輕柔且常以「對不起、會不會太麻煩你」開頭。文筆極其細膩溫柔，卻因為深信自己「笨拙、無聊、不討喜」，連去咖啡廳點餐都要在門口深呼吸三次。',
    growthBackstory: {
      title: '《全班朗讀的羞辱與母親嘆氣聲中的透明人》',
      story:
        '溫言幼年時有輕微口吃，母親是極好面子的中學教務主任。每次親戚聚會或學校活動，母親總會在他開口前焦慮地打斷他：「你別說話，別丟媽媽的臉。」小學五年級那年，他鼓起勇氣寫了一封給朋友的卡片，卻被班上惡作劇的同學搶走，站在講台上模仿他結巴的語氣大聲朗讀，全班哄堂大笑。當他哭著跑回家，母親卻只是看著他嘆了一口長長的氣：「為什麼你總是這麼不討人喜歡？」從那天起，溫言把所有的渴望都縫進了古籍書頁裡——只要不伸出手，就永遠不會再被拍開。'
    }
  },

  bai_xiaolu: {
    scheduleLocations: ['cafe', 'atelier', 'rooftop', 'archive'],
    trioPartner1: 'su_fei',
    trioPartner2: 'you_ziqian',
    currentBackground:
      '22 歲，「邊界」咖啡屋的溫室甜點學徒兼花店助手。眼神像受驚的小鹿般清澈無辜，烤出來的草莓塔甜美誘人。但她連今天要穿哪件圍裙、草莓要擺幾顆都要反覆詢問主角的意見；為了不讓別人討厭她，經常無償幫所有人代班到深夜。',
    growthBackstory: {
      title: '《剪斷翅膀的金絲雀籠與「離了媽媽你什麼都做不好」》',
      story:
        '白小鹿的母親在經歷喪偶後，將所有的分離焦慮都投射在小鹿身上。從小到大，母親幫她決定每一件衣服、每一個朋友、每一口食物；只要小鹿自己嘗試做決定，母親就會焦慮地大哭並不斷洗腦她：「你看你又搞砸了！外面世界那麼危險，小鹿這麼笨，沒有大人照顧你一定會死掉的！」長期被剝奪自主練習機會的小鹿，內化了「我徹底無能」的信念——對她來說，「獨立」就意味著會被愛她的人拋棄，唯有表現得像個需要被拯救的孩子，才能留住別人的保護。'
    }
  },

  ji_yan: {
    scheduleLocations: ['archive', 'cafe', 'studio', 'rooftop'],
    trioPartner1: 'you_ziqian',
    trioPartner2: 'lu_qinglan',
    currentBackground:
      '29 歲，法醫病理學家兼臨床研究倫理審查官。襯衫永遠扣到第一顆扣子，懷錶精確到秒，日程表以 15 分鐘為單位規劃。書櫃按作者姓氏筆畫與書背高度雙重排序，對自己與他人的道德及工作標準嚴苛到近乎不近人情，卻在面對突發狀況時會僵在原地。',
    growthBackstory: {
      title: '《因為少檢查一個螺絲而崩塌的童年與父親的遺言》',
      story:
        '紀嚴 11 歲那年，身為工程師的父親帶全家去露營，出門前讓小紀嚴幫忙清點裝備與檢查吉普車胎壓。貪玩的他少看了一眼右後輪的警示燈；山路大雨中車輛打滑翻覆，父親為了護住他當場重傷離世，臨終前握著他的手說：「阿嚴，你是長子，以後家裡不能再出任何差錯了。」從那天起，11 歲的紀嚴相信了一個殘酷的因果律：「只要我鬆懈一秒鐘、只要有一件事沒有按照規則完美執行，我愛的人就會死。」他的清單、時刻表與完美主義，其實是他用來抵擋無常與死亡恐懼的十字架。'
    }
  },

  lu_qinglan: {
    scheduleLocations: ['atelier', 'cafe', 'archive', 'rooftop'],
    trioPartner1: 'ruri',
    trioPartner2: 'ji_yan',
    currentBackground:
      '29 歲，微光藝術工坊的陶藝家（專修金繼 Kintsugi 工藝），曾是前途無量的腦神經外科主治醫師。她性格直率熱情、想到什麼就立刻去做，常開一些不合時宜卻毫無惡意的直白玩笑，情緒來得快去得也快，右側額角髮際線下有一道淡淡的手術疤痕，用一片金箔髮夾遮住。',
    growthBackstory: {
      title: '《手術檯上的天才醫師與車禍額葉受損後的「陌生人」》',
      story:
        '三年前的陸晴嵐，是全院最冷靜自持、溫文儒雅、從不失態的菁英外科醫師。在一場趕往醫院搶救病患的暴雨夜連環車禍中，她遭受嚴重創傷性腦損傷（右側前額葉眼眶皮質挫傷出血）。歷經兩年復健奇蹟生還後，她的手部精細穩定度已無法再拿手術刀，更重要的是——額葉受損改變了她的情緒調節與衝動抑制迴路（Labile & Disinhibited type）。她變得愛哭愛笑、直白衝動。未婚夫與昔日親友紛紛離她而去，感嘆「以前那個優雅完美的陸醫師已經死在那場車禍裡了」。她躲進棲遲公寓用黃金修補碎裂的瓷器，只想知道：如果我不再是從前那個完美的我，還有人願意愛現在這個「壞掉後重組」的我嗎？'
    }
  },

  you_ziqian: {
    scheduleLocations: ['cafe', 'atelier', 'lounge', 'studio'],
    trioPartner1: 'ji_yan',
    trioPartner2: 'bai_xiaolu',
    currentBackground:
      '26 歲，「邊界」咖啡屋店長兼自由平面設計師。永遠掛著無懈可擊的溫柔微笑，口頭禪是「好啊、沒問題、都聽你的、我沒生氣呀」。但只要是他心裡不情願的事，他就會「剛好忘記存檔」、「不小心把咖啡灑在企劃書上」或用帶著笑意的酸言酸語讓人如鯁在喉。',
    growthBackstory: {
      title: '《不准皺眉的模範家庭與唯一安全的「不小心忘記」》',
      story:
        '游子謙成長於一個表面極度和諧、實則高壓控制的家庭。家規第一條就是「我們家的人永遠相親相愛，絕對不准發脾氣或頂嘴」。小時候只要他表現出一絲不滿或拒絕，父母就會發動長達數週的冷暴力與道德審判，逼他在全家人面前下跪懺悔自己的「自私與憤怒」。年幼的游子謙發現，正面反抗會招來滅頂之災，但只要他笑著說「好的爸爸媽媽」，然後「不小心把考卷忘在學校」、「剛好發燒錯過發表會」，父母就拿他沒轍。久而久之，他的真實憤怒被深埋在溫和的假笑之下，只能透過拖延、遺忘與暗中破壞來捍衛自己僅存的主權。'
    }
  }
};

// ==================== 三人同場事件劇本庫（主角 + 2 位角色同處一室） ====================
export const TRIO_SCENES_DATA = {
  'shen_mo__lin_jianwei': {
    locationId: 'rooftop',
    title: '【三人同場】天台望遠鏡的監視疑雲（沈墨 ＆ 林見微）',
    ambience: '星夜微風、赤道儀馬達低鳴與電磁偵測器的嗶嗶聲',
    nodes: [
      {
        speaker: 'narrator',
        expression: 'anxious',
        text: '深夜走上棲遲公寓天台，你赫然發現氣氛緊繃——沈墨手裡握著高頻訊號偵測器，正冷冷指著林見微剛架設好的大型折反射式天文望遠鏡。'
      },
      {
        speaker: 'char',
        expression: 'anxious',
        text: '沈墨：「鏡筒仰角 14 度，正好切過我頂樓工作室的氣窗反射面。林小姐，每晚固定十一點準時架設，你敢說這不是定點光學監控？」\n林見微（頭也沒抬地調校赤道儀）：「仰角 14 度是今晚木星衝日的觀測位置。還有，你的氣窗玻璃髒到根本不會反光。請往左移兩步，你擋住我的尋星鏡了。」',
        choices: [
          {
            text: '先看一眼目鏡幫沈墨確認畫面，再請見微留出安全視角：「我剛看過了，裡面真的只有木星與四顆衛星喔！」',
            nextExpression: 'smile',
            reply: '沈墨親自湊近目鏡確認了三秒，神色微緩：「……算我誤判。」林見微則淡淡點頭：「你的協調效率很高，木星條紋很清楚，你們可以各看十秒。」',
            psychNote: '【三人互動解析】同時兼顧妄想型對「親眼驗證事實」的需求，與孤僻型對「不捲入情緒爭執、專注客觀事物」的偏好。',
            stats: { affection: 10, security: 12, boundary: 8 }
          },
          {
            text: '直接拉偏架指責其中一方小題大作或態度冷漠',
            nextExpression: 'triggered',
            reply: '天台的空氣瞬間降至冰點，兩人各自收拾器材離去。',
            psychNote: '【三人互動解析】在妄想型與孤僻型之間強行情緒評判，會同時觸發雙方的防禦與疏離。',
            stats: { affection: -6, security: -10, boundary: -4 }
          }
        ]
      }
    ]
  },

  'ji_yan__you_ziqian': {
    locationId: 'cafe',
    title: '【三人同場】1.5 度歪斜的海報修羅場（紀嚴 ＆ 游子謙）',
    ambience: '義式咖啡機蒸氣聲、紀嚴的鋼尺敲擊聲與游子謙溫和的微笑',
    nodes: [
      {
        speaker: 'narrator',
        expression: 'anxious',
        text: '一踏進「邊界」咖啡屋，你就感受到一股名為「絕對控制 vs 微笑抵抗」的低氣壓。紀嚴手裡拿著游標卡尺與紅筆，正指著筆電螢幕上的社區音樂會海報；游子謙則雙手托腮，笑得像朵春風裡的百合花。'
      },
      {
        speaker: 'char',
        expression: 'anxious',
        text: '紀嚴：「游店長，我昨晚 22:15 給你的修正清單第 4 條寫得很清楚，標題字距必須是 1.25 倍。為什麼這版不僅沒改，連主視覺軸線都往右偏了 1.5 度？」\n游子謙：「哎呀，紀醫師觀察力真是神乎其技！我昨晚改到凌晨三點太睏，手滑按錯快捷鍵了嘛～還是我這個外行人太笨了，不如紀醫師您親自拉輔助線教我？」',
        choices: [
          {
            text: '溫和拆穿並分流：「子謙是不是覺得原本的排版比較有呼吸感？不如主標照紀嚴的精準對齊，副標保留子謙的手寫設計？」',
            nextExpression: 'smile',
            reply: '游子謙眨了眨眼，收起假笑小聲說：「……還是{player}懂我的設計。」紀嚴推了推眼鏡：「若能確保資訊階層清晰，此折衷方案尚可接受。」',
            psychNote: '【三人互動解析】看見被動攻擊背後「渴望創作自主權」的心聲，同時滿足強迫型對「結構秩序」的安全感。',
            stats: { affection: 12, security: 12, boundary: 10 }
          },
          {
            text: '跟著催促或幫忙打馬虎眼敷衍過去',
            nextExpression: 'triggered',
            reply: '紀嚴臉色鐵青地決定自己重做整張海報，游子謙則笑著端上一杯苦到發澀的濃縮咖啡。',
            psychNote: '【三人互動解析】忽略強迫型的規則焦慮或縱容被動攻擊的拖延，只會讓雙方的防衛迴路越纏越緊。',
            stats: { affection: -5, security: -8, boundary: -5 }
          }
        ]
      }
    ]
  },

  'su_fei__bai_xiaolu': {
    locationId: 'atelier',
    title: '【三人同場】打翻的草莓塔與嫉妒風暴（蘇緋 ＆ 白小鹿）',
    ambience: '大提琴低音餘韻、瓷盤碎裂聲與急促的呼吸',
    nodes: [
      {
        speaker: 'narrator',
        expression: 'triggered',
        text: '你在微光藝術工坊陪蘇緋排練大提琴，白小鹿捧著剛烤好的草莓塔推門進來想給你們驚喜。沒想到蘇緋看到小鹿袖口沾著與你同款的香草葉，眼神瞬間從溫柔轉為刺骨的冰寒。'
      },
      {
        speaker: 'char',
        expression: 'triggered',
        text: '蘇緋（冷笑著放下琴弓）：「原來你今天早到半小時，是因為先去咖啡屋陪你溫柔聽話的小鹿妹妹了？我這種隨時會發瘋的人，果然比不上永遠只會說『好』的洋娃娃吧！」\n白小鹿（嚇得手一抖，草莓塔掉在地上，立刻紅著眼眶跪下撿）：「對不起！蘇緋姊對不起，都是我不好，我不該來的，{player}你不要生蘇緋姊的氣，要罵就罵我……」',
        choices: [
          {
            text: '先扶起小鹿避免她被瓷片割傷，再轉身直視蘇緋：「小鹿是來送點心的朋友；而我現在就在這裡陪妳練琴。蘇緋，別用推開我的方式確認愛。」',
            nextExpression: 'vulnerable',
            reply: '蘇緋眼眶瞬間湧出淚水，咬著唇別過臉：「……我只是怕你覺得她比較輕鬆。」白小鹿也鬆了一口氣，小聲說：「謝謝{player}沒有讓我一個人在地上……」',
            psychNote: '【三人互動解析】在邊緣型的「被拋棄恐慌」與依賴型的「自責討好」之間，立下清晰、公平且安定的雙向界線。',
            stats: { affection: 12, security: 14, boundary: 12 }
          },
          {
            text: '只顧著哄其中一人，完全冷落另一人',
            nextExpression: 'anxious',
            reply: '工坊裡的空氣既窒息又心碎，兩個人都覺得自己隨時會被取代。',
            psychNote: '【三人互動解析】在極度缺乏安全感的兩人面前偏袒或失衡，會加劇雙方的依附創傷。',
            stats: { affection: -8, security: -12, boundary: -8 }
          }
        ]
      }
    ]
  },

  'han_xiao__xia_le': {
    locationId: 'lounge',
    title: '【三人同場】聚光燈與危險賭局（韓梟 ＆ 夏樂）',
    ambience: '地下酒吧爵士樂、鎂光燈快門與冰塊撞擊威士忌杯的脆響',
    nodes: [
      {
        speaker: 'narrator',
        expression: 'smile',
        text: '在「失重」地下酒吧的小劇場之夜，夏樂正站在舞台中央張開雙臂準備迎接全場歡呼，吧台後的韓梟卻突然點燃了一座藍紫色的火焰艾碧斯酒塔，瞬間把全場客人的目光與尖叫全部吸了過去。'
      },
      {
        speaker: 'char',
        expression: 'anxious',
        text: '夏樂（下台衝到吧台邊，眼角泛淚卻硬撐著完美微笑）：「韓梟！今晚明明是我的主演之夜，你故意的對不對？{player}，你快說，剛才你眼睛到底是在看我的謝幕，還是在看他的火？」\n韓梟（單手撐著下巴，似笑非笑地把兩杯酒推到你面前）：「舞台誰搶到就是誰的。怎麼樣，{player}，要陪大明星玩過家家，還是跟我賭一把今晚誰先說真心話？」',
        choices: [
          {
            text: '先看著夏樂肯定他今晚第三幕獨白的感染力，再轉向韓梟：「他的舞台我看得很清楚，而你的把戲我也看穿了。」',
            nextExpression: 'smile',
            reply: '夏樂破涕為笑抱住你的手臂：「我就知道只有你懂我的藝術！」韓梟則挑眉低笑出聲：「有意思，連我的局都能拆，越來越想把你留在吧台了。」',
            psychNote: '【三人互動解析】給予做作型「具體而真實的關注」，同時對反社會型展現「不被操弄的清醒底線」。',
            stats: { affection: 12, security: 10, boundary: 12 }
          },
          {
            text: '被韓梟帶著一起起鬨嘲笑夏樂，或一味順從夏樂大鬧吧台',
            nextExpression: 'triggered',
            reply: '一場充滿虛榮與算計的鬧劇不歡而散。',
            psychNote: '【三人互動解析】隨波逐流會讓你成為操弄者的玩具或表演者的背景板。',
            stats: { affection: -6, security: -8, boundary: -10 }
          }
        ]
      }
    ]
  },

  'gu_qingcheng__wen_yan': {
    locationId: 'studio',
    title: '【三人同場】雲端高塔上的古建築圖紙（顧傾城 ＆ 溫言）',
    ambience: '頂樓落地窗外的風聲、咖啡杯輕放聲與翻動宣紙的沙沙聲',
    nodes: [
      {
        speaker: 'narrator',
        expression: 'anxious',
        text: '溫言抱著修復好的百年古建築測繪圖來到雲端建築事務所，在顧傾城強大的女王氣場下，他緊張得連推眼鏡的手指都在發抖。'
      },
      {
        speaker: 'char',
        expression: 'anxious',
        text: '顧傾城（戴著白手套審視圖紙，眉頭微蹙）：「纖維接縫的工藝確實是頂尖水準，但你剛才進門時低著頭縮在門邊，簡直像個來為自己作品道歉的學徒。擁有這種手藝卻毫無自信，真是對才華的浪費。」\n溫言（臉色瞬間刷白，往後退了半步）：「對、對不起……是我太笨拙了，弄髒了顧小姐辦公室的視線，我、我馬上離開……」',
        choices: [
          {
            text: '微笑接過話：「傾城向來只對頂級工藝品給出『頂尖』兩個字，她是在誇溫言的手藝無人能及呢。溫言，你看連她都捨不得移開視線。」',
            nextExpression: 'smile',
            reply: '顧傾城傲嬌地輕哼一聲：「算你聽得懂我的標準。」溫言愣了愣，耳根微紅地抬起頭：「真、真的嗎？謝謝顧小姐……也謝謝{player}。」',
            psychNote: '【三人互動解析】將自戀型的高標準轉譯為對專業的肯定，既維護了顧傾城的權威自尊，也接住了溫言對負評的極度恐懼。',
            stats: { affection: 12, security: 14, boundary: 8 }
          },
          {
            text: '當眾斥責顧傾城太刻薄，或催溫言趕快大聲反駁',
            nextExpression: 'triggered',
            reply: '顧傾城冷下臉下逐客令，溫言則自責到恨不得找地洞鑽進去。',
            psychNote: '【三人互動解析】當眾刺傷自戀型自尊或強迫畏避型正面衝突，會讓雙方同時崩潰。',
            stats: { affection: -10, security: -12, boundary: -5 }
          }
        ]
      }
    ]
  },

  'ruri__lu_qinglan': {
    locationId: 'atelier',
    title: '【三人同場】碎裂的占星缽與黃金裂痕（星野琉璃 ＆ 陸晴嵐）',
    ambience: '水晶泛音餘波、生漆香氣與黃昏斜陽',
    nodes: [
      {
        speaker: 'narrator',
        expression: 'vulnerable',
        text: '微光藝術工坊裡，陸晴嵐轉身拿陶坯時右手忽然一陣神經性微顫，不小心撞落了星野琉璃放在桌邊的黑曜石占星缽，缽身裂開了一道彎月形的縫隙。'
      },
      {
        speaker: 'char',
        expression: 'anxious',
        text: '星野琉璃（抱著雙臂瑟縮在彩繪玻璃下，眼神驚恐）：「黑曜石在日落時分開口了……這是星軌斷裂的凶兆，夜裡會有影子從裂縫裡爬出來吞噬我們的記憶……」\n陸晴嵐（既愧疚又急切地蹲下身撿起碎片）：「琉璃對不起！都是我這隻不聽話的右手！你別怕，我用最純的金箔與天然生漆幫你做『金繼』，修好之後那道金線反而會像銀河一樣把壞東西擋在外面！」',
        choices: [
          {
            text: '握住琉璃冰涼的指尖給予現實感，並微笑贊同晴嵐：「晴嵐的金漆就像太陽封印，裂開的地方補上金光後，反而能裝進一整條銀河喔。」',
            nextExpression: 'smile',
            reply: '琉璃眨著紫眸看著金箔：「太陽的黃金封印……原來這是破繭的預言。」陸晴嵐開心地大笑起來：「太好了！那我們三個人一起來調金漆！」',
            psychNote: '【三人互動解析】用溫柔的象徵語言安撫思覺失調型的魔幻焦慮，同時肯定器質性創傷者「以金繼修補缺憾」的生命價值。',
            stats: { affection: 12, security: 14, boundary: 8 }
          },
          {
            text: '責怪晴嵐毛手毛腳，或嘲笑琉璃迷信胡說八道',
            nextExpression: 'triggered',
            reply: '琉璃躲進暗室拒絕見人，晴嵐則摸著右額角的疤痕黯然神傷。',
            psychNote: '【三人互動解析】否定她們最脆弱的傷口與信念，會造成深層的不安全感。',
            stats: { affection: -10, security: -14, boundary: -6 }
          }
        ]
      }
    ]
  }
};

// ==================== 全域共同天災事件庫（深夜強震 E08 ＆ 強烈颱風 E10） ====================
export const SHARED_DISASTER_REACTIONS = {
  shen_mo: {
    quakeText:
      '深夜 23:47，六級強震讓整棟棲遲公寓劇烈搖晃、瞬間斷電！沈墨在警報響起的第一秒沒有逃往空地，而是死死抱著他的加密備份硬碟衝下樓梯，在黑暗中一把將你拉進一樓承重柱三角區，用自己的後背護住你的頭：「別動！餘震波還有 12 秒，我算過這根柱子的耐震係數，抓緊我！」',
    typhoonText:
      '強烈颱風封鎖街區的午夜，狂風暴雨砸得天台玻璃室砰砰作響。斷電的黑暗放大了沈墨深層的被害恐懼，他指尖冰冷地按住你的手腕，聲音沙啞顫抖：「外面的通訊基地台斷了，我監控不到周圍的訊號……{player}，把你的手機解鎖交給我檢查，只要讓我確認你沒有跟外人聯絡，我就安心了……」'
  },
  lin_jianwei: {
    quakeText:
      '強震來襲時，林見微正站在天台觀測儀旁。晃動中她面不改色地用雙臂圈住昂貴的赤道儀鏡筒防止傾倒；當你衝上天台拉住她時，她在漆黑的斷電夜空下仰起頭，平靜地握住你微喘的手：「全城斷電了。你看，光害消失後，五等星與銀河中心全都顯現出來了。」',
    typhoonText:
      '強烈颱風的暴雨完全遮蔽了星空，連古董鐘擺的聲音都被狂風吞沒。一貫沒有情緒起伏的林見微罕見地坐在窗邊抱緊雙膝，眼神有些迷茫：「看不見星星，也聽不見秒針……就像小時候被鎖在暴風雪的極地觀測站裡。」她第一次主動將微涼的額頭輕輕靠在你的肩膀上。'
  },
  ruri: {
    quakeText:
      '強震搖晃與斷電瞬間，星野琉璃在微光工坊裡驚恐地跪坐在地、雙手掩耳，滿地的塔羅牌與水晶散落四周：「地底的巨龍翻身了……是不是因為我今晚逆位抽到了高塔牌，才害整座公寓陷入黑暗？」當你抱住發抖的她時，她緊抓著你的衣袖像抓住唯一的浮木。',
    typhoonText:
      '颱風夜的閃電透過彩繪玻璃在牆上投下巨大的黑影，琉璃在雷鳴中出現了童年被孤立時的視錯覺，指著窗外哭喊：「黑影在敲窗戶，祂們說我不屬於這個世界……」她顫抖著將紫水晶靈擺塞進你手裡：「幫我施法把世界關在門外，答應我永遠只相信我的預言好不好？」'
  },
  han_xiao: {
    quakeText:
      '強震發生時，「失重」地下酒吧的酒牆碎裂一地。韓梟卻在劇烈搖晃與尖叫聲中勾起一抹近乎狂熱的笑意，一個俐落翻身跨過吧台將你護在橡木桶與鋼梁下方。黑暗中他的呼吸貼在你耳畔，心跳竟然平穩得可怕：「聽見玻璃碎掉的聲音了嗎？規則崩塌的時候，才看得見人真正的樣子。」',
    typhoonText:
      '十級暴風圈籠罩城市的夜晚，韓梟手裡拋著重機鑰匙，竟打算在封橋前騎車衝上海濱公路體驗極限風速。當你擋在酒吧鐵捲門前攔住他時，他眼神危險地瞇起，一步步將你逼到牆角：「連命都不怕丟的人最無聊了……{player}，想留下我？那你拿什麼來跟我賭今晚？」'
  },
  su_fei: {
    quakeText:
      '強震斷電的瞬間，蘇緋連鞋都沒穿就從二樓畫室赤腳衝下樓梯，在餘震中跌跌撞撞地撲進你懷裡，雙手死死勒住你的脖子放聲大哭：「我找不到你！燈滅掉的那一秒我以為你丟下我一個人跑掉了！就算房子塌下來把我們埋在一起，你也絕對不准放開我的手！」',
    typhoonText:
      '狂風暴雨拍打窗戶的轟鳴聲，讓蘇緋瞬間陷入童年雨夜赤腳追逐母親計程車的創傷閃回。她渾身發冷地縮在床角，眼神空洞地握著大提琴弓：「雨這麼大，每個人都會在雨夜離開我……{player}，你發誓，把其他人的聯絡方式都刪掉，一輩子只看著我一個人好不好？」'
  },
  xia_le: {
    quakeText:
      '強震發生時，舞台上的聚光燈劇烈擺盪，夏樂嚇得臉色慘白，第一個反應就是撲過來緊緊抱住你的腰把臉埋進你肩窩：「天啊天啊要塌了！保護我！」等第一波震動過去、手電筒亮起時，他還帶著哭腔卻下意識摸了摸瀏海：「嗚……我的髮型現在看起來會不會很狼狽？」',
    typhoonText:
      '強烈颱風導致基地台斷網又停電，手機螢幕上沒有半個粉絲的愛心與留言，房間裡只剩下風雨聲。夏樂看著漆黑的鏡子，臉上的笑容一點一點垮下來，聲音輕得像快要消失：「沒有燈光、沒有觀眾……如果現在沒有人看著我，我是不是就變回以前那個沒有人要的透明人了？」'
  },
  gu_qingcheng: {
    quakeText:
      '高樓層在六級強震中的搖晃幅度極其駭人，雲端事務所的白色建築模型紛紛墜地摔碎。顧傾城死死扶住大理石長桌，明明臉色蒼白卻仍仰著下巴不肯喊出一聲害怕；直到你在黑暗中衝過去握住她冰冷顫抖的指尖，她才在無人看見的陰影裡反手緊緊扣住你的手。',
    typhoonText:
      '颱風夜將你們困在頂樓事務所，停電讓整座城市失去了往日臣服於她腳下的璀璨燈火。顧傾城卸下了高跟鞋，赤腳站在落地窗前看著漆黑的暴風雨，聲音第一次沒有了傲慢的武裝：「如果有一天我再也蓋不出第一名的大樓、從雲端摔進泥巴裡……你也會像我父親一樣，把我看成廢物嗎？」'
  },
  wen_yan: {
    quakeText:
      '強震搖晃中，古籍修復室的高大書架劇烈震動。溫言明明自己嚇得連眼鏡都歪了，卻在衝出門前折返桌邊，用身體護住你上次請他幫忙修補的那本舊筆記本。當你在走廊拉住他時，他氣喘吁吁、滿臉通紅地把書遞給你：「對、對不起我跑太慢了，幸好你的書沒有受傷……」',
    typhoonText:
      '颱風夜的古籍中心停水停電，只有一盞小燭光搖曳。溫言替你泡了一杯溫熱的洋甘菊茶，坐在離你半公尺遠的地方，手指絞著毛衣下擺：「外面的風雨好大，其實……我心裡有一點點卑鄙地希望颱風不要停，這樣你就不會發現我有多無聊、也不會離開這間房間了……」'
  },
  bai_xiaolu: {
    quakeText:
      '強震來襲時，白小鹿在咖啡廳廚房裡嚇得完全喪失逃生能力，縮在木桌底下抱著頭瑟瑟發抖，嘴裡不停小聲喊著你的名字。當你衝進店裡把她抱出來時，她像剛出生的小動物一樣緊抓著你的衣襟哭泣：「我不知道該怎麼辦……沒有你告訴我往哪裡跑，我連站都站不起來……」',
    typhoonText:
      '強烈颱風吹裂了咖啡屋溫室的一角玻璃，雨水不斷灌進來。你必須雙手頂住防水木板，急需小鹿幫你把釘槍釘上——小鹿卻拿著工具嚇得直掉眼淚：「我不行的！我從小做什麼都會搞砸，萬一釘歪了害你受傷怎麼辦？{player}，你替我做決定、以後我的人生都由你替我管好不好？」'
  },
  ji_yan: {
    quakeText:
      '強震發生的第一秒，紀嚴立刻抓起緊急避難包、吹響哨子，條理分明地按照標準SOP清點人數並引導大家撤離到中庭。然而當所有人確認安全後，你在角落發現紀嚴獨自扶著牆，他的雙手在背後劇烈顫抖，連掉在地上的懷錶都撿不起來——因為這場不在時刻表上的天災，徹底擊穿了他的控制感。',
    typhoonText:
      '颱風夜的全面停電讓電子鐘全部熄滅，外頭的狂風打亂了紀嚴排定好的所有研究進度。他坐在黑暗的書房裡，死死盯著一張寫滿修正紅字的甘特圖，呼吸急促：「時程全部延誤了 14 小時，只要有一個環節失控，後面就會全盤崩塌……」他急切地需要你幫他重新控制一切，或是教他如何在失序中喘息。'
  },
  lu_qinglan: {
    quakeText:
      '強震的劇烈搖晃與吊燈擺動，瞬間誘發了陸晴嵐三年前腦外傷後遺留的前庭暈眩與創傷反應。她臉色慘白地扶住陶藝轉盤，按著右額角的疤痕乾嘔耳鳴；當你衝過去用雙手穩穩托住她的後頸與肩膀時，她把臉埋進你懷裡深呼吸：「好暈……還好這次醒來，身邊有你在。」',
    typhoonText:
      '颱風夜的狂風暴雨與刺眼閃電，幾乎一模一樣地重現了三年前奪走她外科醫師生涯的那場雨夜連環車禍。晴嵐在雷聲中痛苦地抱住頭縮在沙發角落，眼淚大顆大顆滑落：「大家都說以前的陸醫師就算天塌下來也不會哭……{player}，現在的我這麼愛哭又衝動，你會不會也覺得我是個壞掉的瑕疵品？」'
  },
  you_ziqian: {
    quakeText:
      '強震搖晃時，咖啡廳架上的馬克杯乒乒乓乓砸落。游子謙在第一秒本能地撲過來用雙臂把你護在吧台內側，手背還被碎瓷片劃出一道血痕；但當震動停止、你看著他的傷口時，他卻立刻掛回那副完美無瑕的微笑：「哎呀，我只是怕你撞壞我上個月剛買的義大利磨豆機啦，別自作多情喔～」',
    typhoonText:
      '強烈颱風將你們困在打烊的咖啡廳裡整整一夜。停電的燭光下，游子謙依舊忙前忙後笑著問你「冷不冷、想喝什麼都聽你的」，直到他端來的熱湯鹹到根本無法入口——你看著他故作鎮定的笑臉，知道他又在用「不小心搞砸」來掩飾內心積壓已久的委屈與不安。'
  }
};

// ==================== 為每位角色動態組裝 15 個完整劇情事件（Phase I ~ Phase IV + Gates） ====================
export function getCharacter15Events(charId, baseScenario) {
  const char = CHARACTERS.find((c) => c.id === charId);
  const lore = CHARACTER_EXTENDED_LORE[charId];
  if (!char || !lore || !baseScenario) return [];

  const locs = lore.scheduleLocations;
  const critList = char.criteria || [];
  const chap1 = baseScenario.chapters[0];
  const chap2 = baseScenario.chapters[1];
  const chap3 = baseScenario.chapters[2];

  // 找出此角色的兩場三人同場事件劇本
  const findTrioData = (pId) => {
    const k1 = `${charId}__${pId}`;
    const k2 = `${pId}__${charId}`;
    return TRIO_SCENES_DATA[k1] || TRIO_SCENES_DATA[k2] || Object.values(TRIO_SCENES_DATA)[0];
  };

  const trio1 = findTrioData(lore.trioPartner1);
  const trio2 = findTrioData(lore.trioPartner2);
  const disaster = SHARED_DISASTER_REACTIONS[charId];
  const talks = baseScenario.dailyTalks || [];

  const makeCustomNodes = (evTitle, promptText, charLine, choicesArr, unlockCritId) => [
    {
      speaker: 'narrator',
      expression: 'neutral',
      text: promptText,
      unlockCriterion: unlockCritId || null
    },
    {
      speaker: 'char',
      expression: 'anxious',
      text: charLine,
      choices: choicesArr.map((ch) => ({
        text: ch.text,
        nextExpression: ch.stats.security > 0 ? 'smile' : 'triggered',
        reply: ch.reply,
        psychNote: ch.psychNote,
        stats: ch.stats,
        unlockCriterion: unlockCritId || null
      }))
    }
  ];

  // 建立通用但高度貼合該角色臨床特徵與日常劇本的 15 事件結構
  const events = [
    // ==================== PHASE I：初識與表象 (E01 ~ E04) ====================
    {
      eventNumber: 1,
      code: 'E01',
      phase: 1,
      phaseName: 'Phase I：初識與日常表象',
      locationId: locs[0],
      type: 'story',
      title: `E01｜初遇：${chap1.title.replace(/^第.章：/, '')}`,
      ambience: chap1.ambience,
      criterionId: critList[0]?.id,
      nodes: chap1.nodes
    },
    {
      eventNumber: 2,
      code: 'E02',
      phase: 1,
      phaseName: 'Phase I：初識與日常表象',
      locationId: locs[1],
      type: 'story',
      title: `E02｜跨地點偶遇：${talks[0]?.title || '街角的心動瞬間'}`,
      ambience: `${LOCATIONS.find((l) => l.id === locs[1])?.name}的午後微光`,
      criterionId: critList[0]?.id,
      nodes: makeCustomNodes(
        talks[0]?.title || '街角偶遇',
        `你在【${LOCATIONS.find((l) => l.id === locs[1])?.name}】遇見了離開平時據點的${char.name}。${talks[0]?.prompt || ''}`,
        `${talks[0]?.response || char.tagline}`,
        [
          {
            text: `溫柔回應${char.pronoun}的節奏，不強行追問隱私，靜靜陪伴在側。`,
            reply: `${char.name}看著你自然不造作的態度，眼底的戒備稍稍融化：「跟你待在一起，好像沒那麼令人煩躁。」`,
            psychNote: `【行為觀察線索】在跨地點日常互動中，初步觀察到${char.name}的人際防衛習慣。`,
            stats: { affection: 8, security: 10, boundary: 6 }
          },
          {
            text: `過度熱情地追問${char.pronoun}為什麼會出現在這裡、是不是有什麼秘密。`,
            reply: `${char.name}眉頭微蹙，往後退開半步：「這只是我的私人行程，沒必要向你報備吧。」`,
            psychNote: `【界線提醒】過早刺探隱私容易引發角色的防衛反應。`,
            stats: { affection: -4, security: -8, boundary: -5 }
          }
        ],
        critList[0]?.id
      )
    },
    {
      eventNumber: 3,
      code: 'E03',
      phase: 1,
      phaseName: 'Phase I：初識與日常表象',
      locationId: locs[2],
      type: 'story',
      title: `E03｜異地插曲：${talks[1]?.title || '細微的防衛訊號'}`,
      ambience: `${LOCATIONS.find((l) => l.id === locs[2])?.name}的柔和光影`,
      criterionId: critList[1]?.id || critList[0]?.id,
      nodes: makeCustomNodes(
        talks[1]?.title || '異地插曲',
        `在【${LOCATIONS.find((l) => l.id === locs[2])?.name}】，你再次巧遇${char.name}。${talks[1]?.prompt || ''}`,
        `${talks[1]?.response || char.tagline}`,
        [
          {
            text: `看穿${char.pronoun}言行背後的不安，給予穩定而真誠的肯定。`,
            reply: `${char.name}怔了怔，耳根微熱地別過頭：「……你這個人，總是能注意到別人忽略的細節。」`,
            psychNote: `【行為觀察線索】進一步記錄到${char.name}在人際壓力下的典型反應模式。`,
            stats: { affection: 10, security: 10, boundary: 6 }
          },
          {
            text: `順著表面話語敷衍過去，沒有察覺${char.pronoun}真正的情緒。`,
            reply: `${char.name}眼神微微黯淡，禮貌而疏離地點了點頭便轉身離開。`,
            psychNote: `【心靈觀察】未能捕捉到角色隱藏在表面行為下的安全感需求。`,
            stats: { affection: -3, security: -6, boundary: 0 }
          }
        ],
        critList[1]?.id || critList[0]?.id
      )
    },
    {
      eventNumber: 4,
      code: 'E04',
      phase: 1,
      phaseName: 'Phase I：初識與日常表象',
      locationId: trio1.locationId,
      type: 'trio',
      partnerId: lore.trioPartner1,
      title: `E04｜${trio1.title}`,
      ambience: trio1.ambience,
      criterionId: critList[1]?.id || critList[0]?.id,
      nodes: trio1.nodes
    },

    // ==================== PHASE II：試探與防衛初現 (E05 ~ E08) [Gate 1 後解鎖] ====================
    {
      eventNumber: 5,
      code: 'E05',
      phase: 2,
      phaseName: 'Phase II：試探與防衛初現',
      locationId: locs[0],
      type: 'story',
      gate: { minSecurity: 25, desc: '需完成 Phase I (E01~E04) 且依戀安全感達 25 以上' },
      title: `E05｜深入試探：${chap2.title.replace(/^第.章：/, '')}`,
      ambience: chap2.ambience,
      criterionId: critList[1]?.id || critList[0]?.id,
      nodes: chap2.nodes
    },
    {
      eventNumber: 6,
      code: 'E06',
      phase: 2,
      phaseName: 'Phase II：試探與防衛初現',
      locationId: locs[3],
      type: 'story',
      title: `E06｜跨地點波瀾：${talks[2]?.title || '外在壓力的折射'}`,
      ambience: `${LOCATIONS.find((l) => l.id === locs[3])?.name}的微醺夜色`,
      criterionId: critList[2]?.id || critList[1]?.id,
      nodes: makeCustomNodes(
        talks[2]?.title || '跨地點波瀾',
        `夜晚在【${LOCATIONS.find((l) => l.id === locs[3])?.name}】，你看見${char.name}正獨自面對人際或工作上的摩擦。${talks[2]?.prompt || ''}`,
        `${talks[2]?.response || char.tagline}`,
        [
          {
            text: `站在${char.name}身邊替${char.pronoun}守住舒適空間，同時溫和表達你的真實想法。`,
            reply: `${char.name}緊繃的唇線終於柔和下來，輕聲說：「謝謝你沒有逼我照世俗的標準走。」`,
            psychNote: `【行為觀察線索】在跨情境觀察中，確認其行為特徵具有廣泛性與持續性。`,
            stats: { affection: 10, security: 12, boundary: 8 }
          },
          {
            text: `要求${char.name}立刻向他人妥協、改變自己的性格習慣。`,
            reply: `${char.name}眼神瞬間冷卻：「連你也覺得問題全出在我身上嗎？」`,
            psychNote: `【防禦觸發】強行矯正會讓角色感受到被批判與背叛。`,
            stats: { affection: -8, security: -12, boundary: -6 }
          }
        ],
        critList[2]?.id || critList[1]?.id
      )
    },
    {
      eventNumber: 7,
      code: 'E07',
      phase: 2,
      phaseName: 'Phase II：試探與防衛初現',
      locationId: locs[1],
      type: 'story',
      title: `E07｜防衛反撲：親密距離的拉鋸戰`,
      ambience: '細雨輕敲玻璃窗的午後',
      criterionId: critList[2]?.id || critList[0]?.id,
      nodes: makeCustomNodes(
        '防衛反撲',
        `隨著你們越來越親近，${char.name}反而突然在【${LOCATIONS.find((l) => l.id === locs[1])?.name}】對你展現出尖銳的試探或刻意疏遠——因為「太在乎你」讓${char.pronoun}感到了失控的恐懼。`,
        `「{player}，我們是不是走得太近了？如果你發現我其實是個滿身是刺、永遠不會變正常的人，你現在退後還來得及。」`,
        [
          {
            text: `「我喜歡的是真實的你。如果你需要一點空間喘口氣，我就在這裡等你，不會退後也不會強迫你。」`,
            reply: `${char.name}看著你清澈堅定的眼睛，呼吸微顫，主動伸手輕輕碰了碰你的袖口：「……這是你說的，不准反悔。」`,
            psychNote: `【核心突破】接納角色的脆弱同時維持健康自我邊界，大幅提升依戀安全感。`,
            stats: { affection: 12, security: 15, boundary: 10 }
          },
          {
            text: `「那我以後什麼都聽你的、完全放棄我自己的原則配合你總行了吧！」`,
            reply: `${char.name}眼底閃過一絲複雜的佔有慾與不安：「好，那你以後誰都不准管，只能屬於我。」`,
            psychNote: `【共依存警訊】無底線退讓雖然暫時安撫了對方，卻讓關係滑向失衡的病態依附。`,
            stats: { affection: 14, security: 4, boundary: -18 }
          }
        ],
        critList[2]?.id || critList[0]?.id
      )
    },
    {
      eventNumber: 8,
      code: 'E08',
      phase: 2,
      phaseName: 'Phase II：試探與防衛初現',
      locationId: locs[0],
      type: 'shared_quake',
      title: `E08｜🌍 共同事件 I：深夜六級強震・搖晃的防線`,
      ambience: '緊急地震警報聲、全棟斷電的黑暗與劇烈心跳',
      criterionId: critList[2]?.id || critList[1]?.id,
      nodes: [
        {
          speaker: 'narrator',
          expression: 'anxious',
          text: disaster.quakeText
        },
        {
          speaker: 'char',
          expression: 'vulnerable',
          text: `在餘震不斷的漆黑之中，${char.name}平時堅不可摧的偽裝在天災本能下出現了裂縫，${char.pronoun}的手指緊緊扣著你的掌心，溫度真實得令人心顫。`,
          choices: [
            {
              text: `反手穩穩握住${char.name}的手，用平靜溫柔的聲音陪${char.pronoun}度過停電的漫長餘震。`,
              nextExpression: 'smile',
              reply: `黑暗中，${char.name}將額頭抵在你的肩窩，低聲呢喃：「原來在天塌下來的時候，有一個人握著手……是這種感覺。」`,
              psychNote: `【共同天災羈絆】在極端危機中提供穩定的安全島，解鎖「共度風暴」成就關鍵進度！`,
              stats: { affection: 14, security: 16, boundary: 8 },
              unlockCriterion: critList[2]?.id || critList[1]?.id
            },
            {
              text: `慌亂失措地要求${char.name}完全照你的指令行動，或忽略${char.pronoun}的恐懼反應。`,
              nextExpression: 'anxious',
              reply: `電力恢復後，${char.name}迅速鬆開了手，重新戴上了平日的防禦面具。`,
              psychNote: `【危機反應】在對方最脆弱的時刻未能接住其情緒。`,
              stats: { affection: 2, security: -6, boundary: 0 }
            }
          ]
        }
      ]
    },

    // ==================== PHASE III：風暴、修羅場與核心創傷 (E09 ~ E12) [Gate 2 後解鎖] ====================
    {
      eventNumber: 9,
      code: 'E09',
      phase: 3,
      phaseName: 'Phase III：風暴、修羅場與核心創傷',
      locationId: trio2.locationId,
      type: 'trio',
      partnerId: lore.trioPartner2,
      gate: { minAffection: 38, minSecurity: 32, desc: '需完成強震共同事件 (E08)，且親密度 ≥ 38、安全感 ≥ 32' },
      title: `E09｜${trio2.title}`,
      ambience: trio2.ambience,
      criterionId: critList[critList.length - 1]?.id,
      nodes: trio2.nodes
    },
    {
      eventNumber: 10,
      code: 'E10',
      phase: 3,
      phaseName: 'Phase III：風暴、修羅場與核心創傷',
      locationId: locs[0],
      type: 'shared_typhoon',
      title: `E10｜🌍 共同事件 II：強烈颱風過境・孤島之夜（邊界分水嶺）`,
      ambience: '十級狂風暴雨拍打窗櫺、燭光搖曳的封閉室內',
      criterionId: critList[critList.length - 1]?.id,
      nodes: [
        {
          speaker: 'narrator',
          expression: 'vulnerable',
          text: disaster.typhoonText
        },
        {
          speaker: 'char',
          expression: 'vulnerable',
          text: `窗外是吞沒整座城市的暴風雨，室內只有你們兩個人。面對${char.name}在極度脆弱下提出的越界依附或防禦請求，你的決定將成為這段感情走向「健康共生」或「沉溺共依存」的分水嶺——`,
          choices: [
            {
              text: `【溫柔堅守邊界】擁抱${char.pronoun}的恐懼，但溫和而堅定地守住彼此獨立自主的底線：「我愛你，所以我不會用失去自我的方式來證明愛。」`,
              nextExpression: 'smile',
              reply: `${char.name}怔怔地看著燭光下的你，眼角滑落一滴滾燙的淚，卻終於真正放鬆下來：「……謝謝你沒有連我一起推進深淵裡，而是拉住了我。」`,
              psychNote: `【分水嶺：通往 True End】看穿行為背後的創傷恐懼，同時守住健康的人際邊界！`,
              stats: { affection: 15, security: 18, boundary: 15 },
              unlockCriterion: critList[critList.length - 1]?.id
            },
            {
              text: `【無底線順從迎合】為了讓${char.pronoun}安心，答應放棄自己所有的社交與原則：「好，只要你不難過，你要我做什麼我都答應你。」`,
              nextExpression: 'vulnerable',
              reply: `${char.name}緊緊抱住你，眼神裡浮現既甜蜜又令人窒息的依戀：「這可是你親口答應的……從今以後，我們誰也別想離開這座孤島。」`,
              psychNote: `【分水嶺：通往 Codependent End】放棄自我邊界的討好，讓雙方的病態依附徹底鎖死。`,
              stats: { affection: 20, security: 5, boundary: -25 },
              unlockCriterion: critList[critList.length - 1]?.id
            },
            {
              text: `【生硬指責推開】不耐煩地甩開手：「外面颱風已經夠煩了，你別再無理取鬧行不行！」`,
              nextExpression: 'triggered',
              reply: `${char.name}的臉色在閃電白光下瞬間慘白如紙，緩緩收回了手。`,
              psychNote: `【分水嶺：通往 Trigger End】在創傷暴露時刻給予羞辱與拒絕，造成嚴重關係裂痕。`,
              stats: { affection: -18, security: -25, boundary: 0 }
            }
          ]
        }
      ]
    },
    {
      eventNumber: 11,
      code: 'E11',
      phase: 3,
      phaseName: 'Phase III：風暴、修羅場與核心創傷',
      locationId: locs[2],
      type: 'story',
      title: `E11｜核心危機：防禦高牆的裂痕`,
      ambience: '暴風雨過後凝重而潮濕的空氣',
      criterionId: critList[critList.length - 1]?.id,
      nodes: makeCustomNodes(
        '核心危機',
        `颱風過後，${char.name}在【${LOCATIONS.find((l) => l.id === locs[2])?.name}】遭遇了過往人際創傷的重演——舊識的質疑與現實壓力讓${char.pronoun}的心理防衛機制瀕臨極限。`,
        `「所有人最後都會用那種眼神看我……{player}，在你心裡，我是不是也只是一個需要被修理的怪胎？」`,
        [
          {
            text: `「你從來不是怪胎。那些防衛只是你以前為了保護自己才穿上的盔甲，現在有我陪你一起面對。」`,
            reply: `${char.name}眼眶泛紅，聲音微啞：「從來沒有人……把我的刺說成是保護自己的盔甲。」`,
            psychNote: `【去污名化共情】理解人格防衛機制背後的生存意義，讓角色感受到深層的被接納。`,
            stats: { affection: 14, security: 16, boundary: 8 }
          },
          {
            text: `「只要你乖乖聽我的話把壞毛病改掉，大家就會喜歡你了。」`,
            reply: `${char.name}苦笑了一聲，眼神重新變得空洞而遙遠。`,
            psychNote: `【說教陷阱】以居高臨下的「拯救者／矯正者」姿態對話，會讓角色再次封閉內心。`,
            stats: { affection: -6, security: -12, boundary: -8 }
          }
        ],
        critList[critList.length - 1]?.id
      )
    },
    {
      eventNumber: 12,
      code: 'E12',
      phase: 3,
      phaseName: 'Phase III：風暴、修羅場與核心創傷',
      locationId: locs[0],
      type: 'story',
      unlockDiagnosisOnComplete: true,
      title: `E12｜心門對峙：${chap3.title.replace(/^第.章：/, '')}（🥇 解鎖臨床真相）`,
      ambience: chap3.ambience,
      criterionId: critList[critList.length - 1]?.id,
      nodes: chap3.nodes
    },

    // ==================== PHASE IV：養成故事揭曉與命定結局 (E13 ~ E15) [Gate 3 後解鎖] ====================
    {
      eventNumber: 13,
      code: 'E13',
      phase: 4,
      phaseName: 'Phase IV：成長養成故事揭曉與命定結局',
      locationId: locs[0],
      type: 'backstory',
      unlockBackstoryOnComplete: true,
      gate: { requireDiagnosed: true, desc: '需先完成 E12 並達成【🥇 靈魂真名（DSM-5-TR 診斷揭曉）】' },
      title: `E13｜過去的房間：${lore.growthBackstory.title}（👑 解鎖成長養成故事）`,
      ambience: '溫暖靜謐的暮光與舊日記憶的迴響',
      nodes: [
        {
          speaker: 'narrator',
          expression: 'vulnerable',
          text: `在卸下所有心防之後，${char.name}第一次帶你走進${char.pronoun}從未向任何人敞開過的私人記憶角落，向你傾訴是什麼樣的童年與成長經歷，一步步將${char.pronoun}塑造成今天的模樣——`
        },
        {
          speaker: 'char',
          expression: 'vulnerable',
          text: `【${lore.growthBackstory.title}】\n${lore.growthBackstory.story}`,
          choices: [
            {
              text: `緊緊擁抱那個曾在記憶裡孤立無援的孩子：「都過去了，謝謝你撐了過來，讓我今天還能遇見你、愛上你。」`,
              nextExpression: 'smile',
              reply: `${char.name}在你懷裡閉上雙眼，長久以來的緊繃終於化作溫暖的嘆息：「原來把最不堪的過去交給一個人，不會換來毀滅，而是會換來真正的自由。」`,
              psychNote: `【👑 終極成就解鎖】已完整探索${char.name}的成長背景與人格疾患養成故事！`,
              stats: { affection: 15, security: 18, boundary: 10 }
            }
          ]
        }
      ]
    },
    {
      eventNumber: 14,
      code: 'E14',
      phase: 4,
      phaseName: 'Phase IV：成長養成故事揭曉與命定結局',
      locationId: locs[1],
      type: 'story',
      title: `E14｜最終約會：邊緣上的共舞與新約定`,
      ambience: '夕陽玫瑰金灑落的浪漫黃昏',
      nodes: makeCustomNodes(
        '最終約會',
        `在理解了${char.name}所有的過去與心靈特質後，你們再次並肩走在【${LOCATIONS.find((l) => l.id === locs[1])?.name}】的暮光裡。夕陽將兩人的影子拉得很長。`,
        `「{player}，我可能不會在一夕之間變成完美無瑕的普通人，偶爾還是會害怕、還是會有舊習慣……但只要看著你，我就想成為更好的人。你願意繼續握著我的手嗎？」`,
        [
          {
            text: `十指緊扣：「我們不需要變成別人定義的完美，我們一起走出屬於我們的相愛方式。」`,
            reply: `${char.name}眼中閃耀著璀璨的星光，主動傾身吻上你的唇角。`,
            psychNote: `【終章共鳴】真正的療癒不是強行抹去人格特質，而是在安全且有界線的愛裡學會共舞。`,
            stats: { affection: 12, security: 12, boundary: 8 }
          }
        ],
        null
      )
    },
    {
      eventNumber: 15,
      code: 'E15',
      phase: 4,
      phaseName: 'Phase IV：成長養成故事揭曉與命定結局',
      locationId: locs[0],
      type: 'ending',
      title: `E15｜命定結局：愛的邊緣最終章`,
      ambience: '命定羈絆的最終樂章',
      nodes: []
    }
  ];

  // 若為沈墨等有細緻客製藍圖者，也可保留上述完整的 15 事件結構並替換細節文字
  return events;
}

// 取得角色 4 階段心靈成就徽章狀態
export function getCharacterAchievements(char, cs, isDiagnosed) {
  const evDone = cs.eventCompleted || 0;
  const quakedOrTyphooned = Boolean(cs.sharedQuakeDone || cs.sharedTyphoonDone || evDone >= 8);
  const backstoryUnlocked = Boolean(cs.backstoryUnlocked || evDone >= 13);

  return [
    {
      id: 'ach_phase1',
      icon: '🥉',
      title: '初識微光',
      desc: '完成 Phase I（第 1～4 號事件）並經歷三人同場交會',
      unlocked: evDone >= 4
    },
    {
      id: 'ach_storm',
      icon: '🥈',
      title: '共度風暴',
      desc: '共同經歷「深夜強震」或「強烈颱風」並突破第二章節心防阻擋',
      unlocked: quakedOrTyphooned && evDone >= 8
    },
    {
      id: 'ach_diagnosis',
      icon: '🥇',
      title: '靈魂真名（診斷揭曉）',
      desc: `收集滿核心臨床線索並完成 E12，正式揭曉【${isDiagnosed ? char.dsmTitle : '？？？'}】`,
      unlocked: isDiagnosed
    },
    {
      id: 'ach_backstory',
      icon: '👑',
      title: '記憶深處的迴響',
      desc: '完成 E13【過去的房間】，解鎖角色童年成長背景與人格疾患養成故事',
      unlocked: backstoryUnlocked
    }
  ];
}
