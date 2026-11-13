// 《愛的邊緣》(Edge of Love) 2.0 — 15 事件決策樹引擎、跨地點動態行程、雙層背景（現在背景／成長養成故事）、三人同場與專屬天災事件庫

import { LOCATIONS, CHARACTERS } from './characters.js?v=14';

// ==================== 12 角色：跨地點動態行程 ＆ 現在背景（公開） ＆ 成長養成背景（探索完解鎖） ====================
export const CHARACTER_EXTENDED_LORE = {
  shen_mo: {
    scheduleLocations: ['rooftop', 'cafe', 'archive', 'lounge'],
    trioPartner1: 'lin_jianwei',
    trioPartner2: 'gu_qingcheng',
    currentBackground:
      '27 歲，住在公寓頂樓加蓋的獨立調查記者兼資安顧問。房門裝了兩道電子鎖與針孔偵測器，喝水只喝自己親手拆封的瓶裝水。他邏輯縝密、觀察力驚人，專門揭發企業弊案，但在日常生活中總覺得鄰居的寒暄別有用心、外送員遲到是在安裝監聽器。',
    growthBackstory: {
      title: '《被雙親當作籌碼與間諜的童年》',
      story:
        '沈墨的父母在他 8 歲時陷入長達十年的惡性爭產與離婚官司。母親每晚會溫柔哄他喝熱牛奶，套出他白天跟父親去了哪裡，隔天就在法庭上用這些話讓父親身敗名裂；父親則在他的書包與泰迪熊裡縫入微型錄音筆，一旦沈墨沒說實話就會被鎖進地下室。16 歲那年，他唯一信任的摯友為了獎學金名額，將他私下吐露的家庭創傷投稿到校刊公開羞辱。從那天起，沈墨大腦的警報器再也沒有關上過——對他而言，「相信別人」就等於「把刀柄遞給對方刺向自己」。'
    },
    eventBlueprint: [
      { code: 'E01', phase: 1, loc: 'rooftop', type: 'base_chap', chapIdx: 0, title: '頂樓的雙重門鎖與試探', critIdx: 0 },
      {
        code: 'E02', phase: 1, loc: 'cafe', type: 'custom', title: '轉角監聽：密封瓶裝水的戒心', critIdx: 1,
        criterionTags: ['F60.0-A2'],
        prompt: '在咖啡廳角落，沈墨戴著單邊監聽耳機，面前放著一瓶未拆封的礦泉水，堅決不碰店員端來的手沖咖啡。',
        charLine: '「開放式吧台的飲品有 17 種下藥途徑。你剛才跟蘇緋講了什麼？為什麼她的說法跟你在玄關跟我講的時間差了三分鐘？你坐過來之前，有注意到門口那輛黑色轎車停了多久嗎？」',
        choices: [
          { text: '「我剛才有留意車牌，是附近花店的送貨車，三分鐘差距是我去二樓放傘的時間，時間線可以核對。」', reply: '他緊繃的肩膀微不可察地放鬆了一毫米：「……你連時間誤差都能提出客觀佐證。」', stats: { affection: 8, security: 10, boundary: 6 }, psychNote: '提供可查證的客觀事實，能有效降低高警覺者對「友誼或忠誠不可靠」的猜疑（F60.0-A2）。' },
          { text: '自己也點一瓶未拆封的氣泡水陪他喝，不勉強他喝吧台的咖啡。', reply: '他看了一眼你手中的密封瓶蓋，眼神柔和了幾分：「這樣最安全。」', stats: { affection: 7, security: 9, boundary: 6 }, psychNote: '尊重他的安全儀式而不加以嘲笑，能建立初步默契。' },
          { text: '把自己的手沖咖啡推過去：「我幫你先喝一口試毒，這樣你總能放心喝了吧！」', reply: '他皺起眉頭把杯子推回來：「別拿你自己的身體演這套戲。過度熱心試探，反而更像有人叫你來套話。」', defenseMechanism: '懷疑性防衛投射（Suspicious Motive Attribution）', stats: { affection: 3, security: 2, boundary: -6 }, psychNote: '【病理展演】過度戲劇化的犧牲對妄想型而言反而像「操弄性試探」，誘發他對他人動機的二次懷疑。' },
          { text: '「你想太多了吧！子謙怎麼可能下藥，我只是晚幾分鐘下來而已，你連這都要查！」', reply: '他冷冷拉下帽簷：「毫無防備又急著替別人開脫的人，通常不是盲目就是同夥。」', defenseMechanism: '投射性反擊與敵意歸因（Projective Counter-Hostility）', stats: { affection: -5, security: -10, boundary: 0 }, psychNote: '【病理展演】直接否定他的懷疑會立刻觸發妄想型的二分歸因，將你劃入「盲目或敵方同夥」。' }
        ],
        studySummary: '【DSM-5-TR 考點】準則 A2 展現個案「無根據地懷疑同事或朋友的忠誠與可信度」，連三分鐘動線差異都需反覆交叉比對。'
      },
      {
        code: 'E03', phase: 1, loc: 'archive', type: 'custom', title: '加密硬碟：背後的盯視與資訊隱瞞', critIdx: 2,
        criterionTags: ['F60.0-A3'],
        prompt: '在圖書修復室，沈墨委託修復一頁燒焦的紙本帳冊，卻把關鍵頁角用黑卡紙遮住，全程站在桌後死死盯著每一個動作。',
        charLine: '「這不關你的事。少知道一點底細，對我們兩個都比較安全——我連自己的影子都不敢交出完整資訊。」',
        choices: [
          { text: '「理解，那我把雙手都放在檯燈照射範圍內，遮住的部分我不看也不問，每做一步都先跟你說明工序。」', reply: '他愣了一下，眼神閃過一絲動容：「……謝謝你尊重資訊隔離，沒有逼我向他人傾訴細節。」', stats: { affection: 10, security: 12, boundary: 8 }, psychNote: '尊重其不願意向他人傾訴的恐懼與控制需求（F60.0-A3），保持高透明度才能建立初步信任。' },
          { text: '搬一張椅子放在旁邊特定視角：「站著盯兩個小時太累了，這個角度你可以看清我的手，也能坐著休息。」', reply: '他猶豫了兩秒，依言坐下：「……謝了，這個視角確實沒有死角。」', stats: { affection: 9, security: 10, boundary: 7 }, psychNote: '貼心照顧其生理疲勞同時保留其安全感控制權。' },
          { text: '「既然你這麼不放心，那我把手機跟背包都押在你那裡當人質總行了吧！」', reply: '他看著你的背包，眉頭微蹙：「我不需要人質——而且你這麼急著交出隱私，是不是想藉此反過來套我的帳冊？」', defenseMechanism: '防衛性不信任擴散（Defensive Distrust Generalization）', stats: { affection: 2, security: 2, boundary: -8 }, psychNote: '【病理展演】過度讓渡邊界對妄想型毫無安撫作用，反而激發他「對等交換陰謀」的警覺。' },
          { text: '「你這樣什麼都不肯講還盯著我看，幫忙還要被當成竊密間諜嗎！」', reply: '他立刻伸手抽回帳冊放進防彈公事包：「抱歉，從頭到尾不該讓任何人經手。」', defenseMechanism: '撤回保密孤島（Withdraw into Secrecy）', stats: { affection: -6, security: -8, boundary: 4 }, psychNote: '【病理展演】逼問或抱怨他不肯信任，會直接印證 F60.0-A3「資訊遲早被惡意利用」的核心恐懼。' }
        ],
        studySummary: '【DSM-5-TR 考點】準則 A3「不願意向他人傾訴，原因是無根據地害怕這些資訊會被惡意地用來對付他或她」。'
      },
      { code: 'E04', phase: 1, loc: 'rooftop', type: 'trio', partnerId: 'lin_jianwei', title: '三人交會：天台望遠鏡的監視疑雲', critIdx: 0 },
      { code: 'E05', phase: 2, loc: 'lounge', type: 'base_chap', chapIdx: 1, title: '地下酒吧的線人與五分鐘空白', critIdx: 1 },
      {
        code: 'E06', phase: 2, loc: 'rooftop', type: 'custom', title: '無心的讚美：風衣領口的暗號？', critIdx: 3,
        criterionTags: ['F60.0-A4'],
        prompt: '傍晚在公寓交誼廳偶遇沈墨，你隨口誇獎他今天穿的深灰風衣很襯他的氣質，並提到剛在樓下信箱放了一把備用鑰匙。',
        charLine: '他瞬間按住領口往後退了一步，眼神銳利：「你把備用鑰匙留給我，是為了等我出錯時有理由搜查我的房間嗎？連稱讚外套都是試探動線的暗號！」',
        choices: [
          { text: '「只是單純覺得這個顏色很適合你，鑰匙也是房東請我交給各住戶的。如果讓你覺得被試探，鑰匙我先放回管理室。」', reply: '他沉默數秒，耳根微紅地別過臉：「……是我反應過度了，把無害的舉動解讀成陷阱。」', stats: { affection: 10, security: 12, boundary: 8 }, psychNote: '穩定而不慌亂地拆解關係過度解讀（F60.0-A4），能幫他從受迫害預設回到現實。' },
          { text: '溫和地指了指自己手上的洗衣籃：「因為我剛剛上來曬衣服，剛好看到你走上樓梯，鑰匙袋上也有房東簽條喔。」', reply: '他看了一眼洗衣籃與簽條，緊繃的肩膀鬆了下來：「……原來如此，物證與動線吻合。」', stats: { affection: 9, security: 10, boundary: 7 }, psychNote: '給出清晰透明的來龍去脈，能迅速解除他的脅迫解讀警報。' },
          { text: '「對不起對不起！我以後見到你都低著頭不講話、不給任何東西了！」', reply: '他眼神更緊繃：「突然一反常態過度低姿態道歉……你在掩飾什麼實情？」', defenseMechanism: '關係意念過度解讀（Benign-to-Threat Misinterpretation）', stats: { affection: 2, security: 0, boundary: -8 }, psychNote: '【病理展演】過度惶恐反而會被妄想型解讀為「心虛掩飾隱情」，進一步激活準則 A4。' },
          { text: '「誇你帥、給鑰匙也不行？你真的有被害妄想症耶！」', reply: '他眼神瞬間結冰並冷笑：「用精神病理標籤封我的口？果然被我抓到你的企圖了。」', defenseMechanism: '反控標籤與防禦反擊（Counter-Labeling Defense）', stats: { affection: -12, security: -15, boundary: -5 }, psychNote: '【病理展演】對高猜疑人格貼診斷標籤，會立刻成為對方眼中「企圖使其喪失公信力」的證據。' }
        ],
        studySummary: '【DSM-5-TR 考點】準則 A4「從良性言詞或事件中解讀出隱藏的貶抑或威脅意味」；也是區分思覺失調症（固定怪異妄想）與妄想型人格（高估動機但不脫離現實邏輯）的關鍵。'
      }
    ]
  },

  lin_jianwei: {
    scheduleLocations: ['rooftop', 'archive', 'cafe', 'atelier'],
    trioPartner1: 'shen_mo',
    trioPartner2: 'wen_yan',
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
      '23 歲，畫室與古著店的占星插畫家兼店主。總是披著繡滿星月圖騰的罩衫，脖子上掛著紫水晶靈擺。說話充滿詩意的跳躍與隱喻，常覺得路邊的黑貓、咖啡杯裡的奶泡形狀或街角的紅綠燈閃爍是在向她傳遞宇宙的預言。',
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
      '28 歲，地下酒吧的首席調酒師兼危機談判專家。嘴角永遠掛著漫不經心卻致命迷人的微笑，極度擅長察言觀色與精準說出別人最想聽的話。熱愛重機競速與高風險賭局，視社會規則與道德契約如無物。',
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
      '29 歲，建築事務所創辦人，業界最年輕的普立茲克獎提名新星。氣場強大、舉手投足皆是貴族般的傲慢與優雅。常把「平庸是一種傳染病」掛在嘴邊，認為只有頂尖的餐廳、藝術品與伴侶才配得上她，卻對任何一絲微小的負評極度暴怒。',
    growthBackstory: {
      title: '《只准拿第一名的玻璃獎盃與被丟進壁爐的 98 分畫紙》',
      story:
        '顧傾城出身建築世家，父親是威權冷酷的建築泰斗。從她懂事起，家裡沒有「愛」，只有「績效評估」。10 歲那年她拿了全校繪畫比賽第二名，父親當著所有賓客的面把她的獎狀撕碎丟進壁爐，冷冷地說：「顧家不需要亞軍，如果你不能成為受人仰望的神，你就只是一文不值的廢物。」為了不再體驗那種深入骨髓的羞恥感，顧傾城為自己鍛造了一具黃金盔甲——她必須永遠高高在上、完美無瑕，因為一旦承認自己有半點脆弱，那個 10 歲的小女孩就會再次被丟進火裡。'
    }
  },

  wen_yan: {
    scheduleLocations: ['archive', 'cafe', 'atelier', 'rooftop'],
    trioPartner1: 'gu_qingcheng',
    trioPartner2: 'lin_jianwei',
    currentBackground:
      '25 歲，圖書修復師兼獨立文學譯者。總是穿著寬鬆的米色針織衫、戴著細框眼鏡，說話聲音輕柔且常以「對不起、會不會太麻煩你」開頭。文筆極其細膩溫柔，卻因為深信自己「笨拙、無聊、不討喜」，連去咖啡廳點餐都要在門口深呼吸三次。',
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
      '22 歲，咖啡廳的甜點學徒兼花店助手。眼神像受驚的小鹿般清澈無辜，烤出來的草莓塔甜美誘人。但她連今天要穿哪件圍裙、草莓要擺幾顆都要反覆詢問主角的意見；為了不讓別人討厭她，經常無償幫所有人代班到深夜。',
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
      '29 歲，畫室的陶藝家（專修金繼 Kintsugi 工藝），曾是前途無量的腦神經外科主治醫師。她性格直率熱情、想到什麼就立刻去做，常開一些不合時宜卻毫無惡意的直白玩笑，情緒來得快去得也快，右側額角髮際線下有一道淡淡的手術疤痕，用一片金箔髮夾遮住。',
    growthBackstory: {
      title: '《手術檯上的天才醫師與車禍額葉受損後的「陌生人」》',
      story:
        '三年前的陸晴嵐，是全院最冷靜自持、溫文儒雅、從不失態的菁英外科醫師。在一場趕往醫院搶救病患的暴雨夜連環車禍中，她遭受嚴重創傷性腦損傷（右側前額葉眼眶皮質挫傷出血）。歷經兩年復健奇蹟生還後，她的手部精細穩定度已無法再拿手術刀，更重要的是——額葉受損改變了她的情緒調節與衝動抑制迴路（Labile & Disinhibited type）。她變得愛哭愛笑、直白衝動。未婚夫與昔日親友紛紛離她而去，感嘆「以前那個優雅完美的陸醫師已經死在那場車禍裡了」。她躲進公寓用黃金修補碎裂的瓷器，只想知道：如果我不再是從前那個完美的我，還有人願意愛現在這個「壞掉後重組」的我嗎？'
    }
  },

  you_ziqian: {
    scheduleLocations: ['cafe', 'atelier', 'lounge', 'studio'],
    trioPartner1: 'ji_yan',
    trioPartner2: 'bai_xiaolu',
    currentBackground:
      '26 歲，咖啡廳店長兼自由平面設計師。永遠掛著無懈可擊的溫柔微笑，口頭禪是「好啊、沒問題、都聽你的、我沒生氣呀」。但只要是他心裡不情願的事，他就會「剛好忘記存檔」、「不小心把咖啡灑在企劃書上」或用帶著笑意的酸言酸語讓人如鯁在喉。',
    growthBackstory: {
      title: '《不准皺眉的模範家庭與唯一安全的「不小心忘記」》',
      story:
        '游子謙成長於一個表面極度和諧、實則高壓控制的家庭。家規第一條就是「我們家的人永遠相親相愛，絕對不准發脾氣或頂嘴」。小時候只要他表現出一絲不滿或拒絕，父母就會發動長達數週的冷暴力與道德審判，逼他在全家人面前下跪懺悔自己的「自私與憤怒」。年幼的游子謙發現，正面反抗會招來滅頂之災，但只要他笑著說「好的爸爸媽媽」，然後「不小心把考卷忘在學校」、「剛好發燒錯過發表會」，父母就拿他沒轍。久而久之，他的真實憤怒被深埋在溫和的假笑之下，只能透過拖延、遺忘與暗中破壞來捍衛自己僅存的主權。'
    }
  }
};

// ==================== 三人同場事件劇本庫（全部皆為角色量身打造選項，無罐頭湊數選項） ====================
export const TRIO_SCENES_DATA = {
  'shen_mo__lin_jianwei': {
    locationId: 'rooftop',
    title: '【三人同場】天台望遠鏡的監視疑雲（沈墨 ＆ 林見微）',
    ambience: '星夜微風、赤道儀馬達低鳴與電磁偵測器的嗶嗶聲',
    criterionTags: ['F60.0-A1', 'F60.0-A4', 'F60.1-A1'],
    differentialContrast: {
      summary: '同處深夜天台「被觀察/共處」刺激下的病理動機對比：妄想型把中性行為過度解讀為敵意監控，孤僻型則單純沉浸於非人際客觀事物並無社交敵意。',
      partnerA: { name: '沈墨', disorder: '妄想型 PPD', motive: '過度警戒他人意圖，將 14 度仰角解讀為定點光學監控。', mechanism: '猜疑與威脅歸因（Hypervigilant Attribution）' },
      partnerB: { name: '林見微', disorder: '孤僻型 SzPD', motive: '對人際衝突毫無興趣，只關注木星觀測座標與不願被打擾。', mechanism: '情感冷漠與低社交動機（Affective Detachment）' }
    },
    nodes: [
      {
        speaker: 'narrator',
        expression: 'anxious',
        text: '深夜走上公寓交誼廳，你赫然發現氣氛緊繃——沈墨手裡握著高頻訊號偵測器，正冷冷指著林見微剛架設好的大型折反射式天文望遠鏡。'
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
            text: '拿出一張便條紙幫兩人畫出天台地標線：「以後東側歸天文觀測區，西側歸沈墨的安全巡邏區，互不越界怎麼樣？」',
            nextExpression: 'smile',
            reply: '林見微看了一眼分界線：「清楚明白，我贊成。」沈墨收起偵測器：「只要鏡筒不往西偏，我沒意見。」',
            psychNote: '【三人互動解析】清晰的物理邊界能同時給予孤僻型與妄想型高度的安全感。',
            stats: { affection: 8, security: 10, boundary: 9 }
          },
          {
            text: '順著沈墨的話懷疑林見微：「對啊見微，妳每天半夜不睡覺在頂樓架機器，難怪沈墨會懷疑妳！」',
            nextExpression: 'triggered',
            defenseMechanism: '連坐猜疑與冷淡退場（Suspicious Triangulation vs. Schizoid Exit）',
            reply: '林見微面無表情地收起腳架：「跟沒有天文常識的人解釋很浪費時間，我回房了。」沈墨反而狐疑地看了你一眼：「你這麼急著附和我，是在掩飾什麼？」',
            psychNote: '【病理展演】妄想型連附和者都會懷疑動機；孤僻型不解釋也不憤怒，直接中止無效社交。',
            stats: { affection: -6, security: -9, boundary: -5 }
          },
          {
            text: '當場嘲笑沈墨：「人家見微是天文館觀測員耶，誰有空監視你啊，你真的太神經質了！」',
            nextExpression: 'triggered',
            defenseMechanism: '敵意反擊與邊界封鎖（Paranoid Freezing & Lockout）',
            reply: '沈墨臉色瞬間冷如寒冰，轉身走下樓梯並鎖死鐵門：「既然覺得我神經質，以後天台有事別找我——你跟她的立場倒挺一致。」',
            psychNote: '【病理展演】羞辱妄想型的警覺會觸發防衛性敵意，將調解者歸為對立面。',
            stats: { affection: -8, security: -12, boundary: -4 }
          }
        ]
      }
    ],
    studySummary: '【鑑別考點】同為 Cluster A 的社交疏離：妄想型「因恐懼惡意而退縮且高度警覺」；孤僻型「因缺乏連結獎賞感而自然抽離、對他人在想什麼漠然無感」。'
  },

  'lin_jianwei__wen_yan': {
    locationId: 'rooftop',
    title: '【三人同場】公寓頂樓慶功邀請：無慾疏離 vs 恐懼退縮（林見微 ＆ 溫言）',
    ambience: '樓下交誼廳傳來的溫暖笑聲、咖啡香與微涼的夜風',
    criterionTags: ['F60.1-A1', 'F60.1-A6', 'F60.1-SPEC1', 'F60.6-A1', 'F60.6-A4', 'F60.6-SPEC1'],
    specifierTags: ['F60.1-SPEC1', 'F60.6-SPEC1'],
    differentialContrast: {
      summary: 'DSM-5-TR 最經典臨床考點：同在面對「熱鬧人群與社交邀請」都不參與，但林見微是「沒有需求也不在乎評價」，溫言是「深切渴望連結卻因羞恥與怕被拒絕而逃避」。',
      partnerA: { name: '林見微', disorder: '孤僻型 SzPD', motive: '內心並無寂寞感，認為聚會只是低資訊密度的熱量消耗，獨自算星圖更自在。', mechanism: '社交無快感與評價無感（Social Anhedonia & Indifference）' },
      partnerB: { name: '溫言', disorder: '畏避型 AvPD', motive: '其實很想下樓跟大家喝茶，卻因害怕講錯話被嘲笑而縮在樓梯轉角反覆自責。', mechanism: '羞恥預支與拒絕敏感退縮（Rejection-Fearful Avoidance）' }
    },
    nodes: [
      {
        speaker: 'narrator',
        expression: 'anxious',
        text: '樓下公寓交誼廳正舉辦慶祝住戶獲獎的小茶會，你上頂樓喊林見微與溫言一起下去。兩個人都站在露台陰影裡沒有進屋，可眼神裡的溫度卻截然不同。'
      },
      {
        speaker: 'char',
        expression: 'anxious',
        text: '林見微（看了一眼星圖，語調毫無波瀾）：「樓下有十一位住戶，交談頻率重疊率高，我沒有參與社交的動機。我看得懂他在害怕被討厭；我只是單純覺得，安靜地各自存在比較省力。」\n溫言（雙手緊緊抓著剛烤好的小餅乾盒，指節泛白地往門後退）：「不、不是我不想去……我其實也很想跟大家坐在一起，但剛才在樓梯口聽到大家在笑，我好怕自己一進去冷場、害氣氛變尷尬，最後被所有人討厭……我還是在這裡待著就好。」',
        choices: [
          {
            text: '尊重見微留在頂樓看星，同時拿一個溫熱的瓷盤陪溫言先到玄關外安靜處坐著，再慢慢進茶會只跟兩個熟人打招呼。',
            nextExpression: 'smile',
            reply: '林見微點頭致意後戴回耳機：「謝謝你節省我的無效溝通成本。」溫言則鬆了一大口氣，緊握著餅乾盒對你小聲道謝：「只有跟熟人先打招呼的話……我好像做得到了！」',
            psychNote: '【臨床鑑別實作】對孤僻型採取「低侵入性尊重其獨處」；對畏避型則給予「漸進式暴露安全網（Graded Exposure）」。',
            stats: { affection: 13, security: 14, boundary: 12 }
          },
          {
            text: '幫兩人各自找合適的位置：請見微在十點後空無一人時下來領她的外帶烏龍茶，自己陪溫言從送餅乾的小任務開始加入大家。',
            nextExpression: 'smile',
            reply: '見微平靜表示接受；溫言捧著餅乾盒鼓起勇氣走下兩階樓梯：「幫、幫大家端餅乾的話，我就知道要說什麼話了……」',
            psychNote: '【臨床鑑別實作】為畏避型設定「具體可預測的小角色」，能大幅降低其評價焦慮（F60.6-A1/A4）。',
            stats: { affection: 11, security: 13, boundary: 11 }
          },
          {
            text: '拉住林見微的手硬拖她下樓：「妳就是太冷血才沒朋友！別裝酷了，跟我下去跟十幾個人敬酒聊天！」',
            nextExpression: 'triggered',
            defenseMechanism: '過載關機與抽離（Sensory-Social Shutdown）',
            reply: '林見微直接抽回手關上頂樓氣窗：「我的需求並不包含熱鬧。你的強迫干預只會讓我把對你的互動評級降為零。」溫言在一旁也被嚇得往後退了三步。',
            psychNote: '【病理展演】把孤僻型誤當成畏避型去「鼓勵合群」，會引發其徹底疏離；且強勢衝突也會同時嚇壞旁邊的畏避型。',
            stats: { affection: -9, security: -12, boundary: -10 }
          },
          {
            text: '對溫言擺擺手：「既然你們兩個都不愛出門、性格都這麼孤僻，那以後聚會我也不約你們了，省得尷尬！」',
            nextExpression: 'triggered',
            defenseMechanism: '預言成真與羞恥逃避（Self-Fulfilling Shame Retreat）',
            reply: '林見微面無表情地說「理解」便繼續寫筆記；溫言卻瞬間眼眶通紅、僵在原地：「……對、對不起，你果然覺得我很掃興，以後不用再找我了……」',
            psychNote: '【病理展演】同一句拒絕——孤僻型毫髮無傷（F60.1-A6），畏避型卻體驗到如墜冰窟的拒絕痛楚（F60.6-A4）！',
            stats: { affection: -10, security: -15, boundary: -6 }
          }
        ]
      }
    ],
    studySummary: '【鑑別核心考題】Schizoid（F60.1）vs Avoidant（F60.6）：兩者表面都「社交退縮」，但見微屬於『無慾望、低痛苦、對評價無感（ego-syntonic）』；溫言屬於『有渴望、高焦慮、極度敏感於否定（ego-dystonic）』，臨床處遇方向完全相反。'
  },

  'ji_yan__you_ziqian': {
    locationId: 'cafe',
    title: '【三人同場】1.5 度歪斜的海報修羅場（紀嚴 ＆ 游子謙）',
    ambience: '義式咖啡機蒸氣聲、紀嚴的鋼尺敲擊聲與游子謙溫和的微笑',
    criterionTags: ['F60.5-A1', 'F60.5-A8', 'F60.89-GB', 'F60.89-GC'],
    differentialContrast: {
      summary: '剛性控制與被動抗拒的權力角力：強迫型將字距失誤視為秩序崩壞威脅；被動攻擊型不敢正面拒絕高壓控制，遂以「手滑拖延與假笑自貶」完成無聲反抗。',
      partnerA: { name: '紀嚴', disorder: '強迫型 OCPD', motive: '執著於規則細節與精準標準，深信失去秩序就會引發災難。', mechanism: '情感隔離與規則控制（Isolation of Affect & Controllingness）' },
      partnerB: { name: '游子謙', disorder: '被動攻擊型 Passive-Aggressive', motive: '厭惡被當工具命令卻懼怕正面衝突，以「忘記／手滑」發洩憤怒並誘發對方罪惡感。', mechanism: '順從假面下的消極阻撓（Malicious Compliance & Procrastination）' }
    },
    nodes: [
      {
        speaker: 'narrator',
        expression: 'anxious',
        text: '一踏進咖啡廳，你就感受到一股名為「絕對控制 vs 微笑抵抗」的低氣壓。紀嚴手裡拿著游標卡尺與紅筆，正指著筆電螢幕上的社區音樂會海報；游子謙則雙手托腮，笑得像朵春風裡的百合花。'
      },
      {
        speaker: 'char',
        expression: 'anxious',
        text: '紀嚴：「游店長，我昨晚 22:15 給你的修正清單第 4 條寫得很清楚，標題字距必須是 1.25 倍。為什麼這版不僅沒改，連主視覺軸線都往右偏了 1.5 度？」\n游子謙：「哎呀，紀醫師觀察力真是神乎其技！我昨晚改到凌晨三點太睏，手滑按錯快捷鍵了嘛～還是我這個外行人太笨了，不如紀醫師您親自拉輔助線教我？」',
        choices: [
          {
            text: '溫和拆穿並分流：「子謙是不是覺得原本的排版比較有呼吸感？不如主標照紀嚴的精準對齊，副標保留子謙的手寫斜角設計？」',
            nextExpression: 'smile',
            reply: '游子謙眨了眨眼，收起假笑小聲說：「……還是{player}懂我的設計。」紀嚴推了推眼鏡：「若能確保資訊階層清晰，此折衷方案尚可接受。」',
            psychNote: '【三人互動解析】看見被動攻擊背後「渴望創作自主權」的心聲，同時滿足強迫型對「結構秩序」的安全感。',
            stats: { affection: 12, security: 12, boundary: 10 }
          },
          {
            text: '先泡兩杯熱茶請兩人休息十分鐘，由你記錄兩人的核心需求：「紀嚴負責校對文字精準度，子謙全權決定視覺美感，這樣最專業！」',
            nextExpression: 'smile',
            reply: '紀嚴點了點頭：「權責分明，確實能減少無謂的返工。」游子謙彎起眼睛：「只要別規定我的字距，我十分鐘就能排好喔。」',
            psychNote: '【三人互動解析】透過明確的領域劃分，化解強迫型的控制欲與被動攻擊型的隱性反抗。',
            stats: { affection: 10, security: 10, boundary: 9 }
          },
          {
            text: '站在紀嚴那邊嚴厲批評游子謙：「子謙你別再找藉口拖延了，趕快照紀嚴的清單一模一樣改好！」',
            nextExpression: 'triggered',
            defenseMechanism: '被動攻擊「意外當機」阻撓（Passive-Aggressive Sabotage）',
            reply: '游子謙笑得更燦爛了：「好喔～都聽你們的！」結果五分鐘後他的筆電「剛好」沒電自動關機，檔案還沒存檔。',
            psychNote: '【病理展演】高壓命令直接觸發被動攻擊型的經典防衛——表面微笑順從（F60.89-GA），實際透過「意外遺失未存檔」完成報復。',
            stats: { affection: -6, security: -8, boundary: -5 }
          },
          {
            text: '站在游子謙那邊嘲笑紀嚴：「不過是一張社區海報，拿游標卡尺量字距也太吹毛求疵了吧！」',
            nextExpression: 'triggered',
            defenseMechanism: '道德優越退場與僵化凍結（Rigid Withdrawal & Moral Rectitude）',
            reply: '紀嚴冷冷收起鋼尺與清單：「既然你們不在乎品質，這場活動的審查我不必參與了。」',
            psychNote: '【病理展演】公開否定強迫型的標準（F60.5-A1/A8）會誘發強烈失控焦慮，使之以冷酷道德切割保護自己。',
            stats: { affection: -7, security: -10, boundary: -4 }
          }
        ]
      }
    ],
    studySummary: '【鑑別考點】當極高控制的 OCPD（F60.5-A8）遇上高隱性反抗的被動攻擊型（F60.89-GB），會形成典型的「控制升級 ↔ 失誤拖延」惡性循環。'
  },

  'su_fei__bai_xiaolu': {
    locationId: 'atelier',
    title: '【三人同場】打翻的草莓塔與嫉妒風暴（蘇緋 ＆ 白小鹿）',
    ambience: '大提琴低音餘韻、瓷盤碎裂聲與急促的呼吸',
    criterionTags: ['F60.3-A1', 'F60.3-A2', 'F60.7-A2', 'F60.7-A5'],
    differentialContrast: {
      summary: '兩者皆具高度「被拋棄恐懼」下的分化比較：邊緣型（BPD）在威脅下出現狂暴嫉妒與極端黑白分化；依賴型（DPD）則瞬間退回過度自責與討好順從以求不被丟下。',
      partnerA: { name: '蘇緋', disorder: '邊緣型 BPD', motive: '將同伴視為競爭者並預見自己即將被取代，以推開與指控來防禦被拋棄恐慌。', mechanism: '分裂防衛與拋棄狂怒（Splitting & Abandonment Panic）' },
      partnerB: { name: '白小鹿', disorder: '依賴型 DPD', motive: '不敢表達不滿或設定界線，立即把所有責任攬在自己身上以換取保護。', mechanism: '過度順從與自貶求和（Pathological Appeasement）' }
    },
    nodes: [
      {
        speaker: 'narrator',
        expression: 'triggered',
        text: '你在畫室陪蘇緋排練大提琴，白小鹿捧著剛烤好的草莓塔推門進來想給你們驚喜。沒想到蘇緋看到小鹿袖口沾著與你同款的香草葉，眼神瞬間從溫柔轉為刺骨的冰寒。'
      },
      {
        speaker: 'char',
        expression: 'triggered',
        text: '蘇緋（冷笑著放下琴弓）：「原來你今天早到半小時，是因為先去咖啡廳陪你溫柔聽話的小鹿妹妹了？我這種隨時會發瘋的人，果然比不上永遠只會說『好』的洋娃娃吧！」\n白小鹿（嚇得手一抖，草莓塔掉在地上，立刻紅著眼眶跪下撿）：「對不起！蘇緋姊對不起，都是我不好，我不該來的，{player}你不要生蘇緋姊的氣，要罵就罵我……」',
        choices: [
          {
            text: '先扶起小鹿避免她被瓷片割傷，再轉身直視蘇緋：「小鹿是來送點心的朋友；而我現在就在這裡陪妳練琴。蘇緋，別用推開我的方式確認愛。」',
            nextExpression: 'vulnerable',
            reply: '蘇緋眼眶瞬間湧出淚水，咬著唇別過臉：「……我只是怕你覺得她比較輕鬆。」白小鹿也鬆了一口氣，小聲說：「謝謝{player}沒有讓我一個人在地上……」',
            psychNote: '【三人互動解析】在邊緣型的「被拋棄恐慌」與依賴型的「自責討好」之間，立下清晰、公平且安定的雙向界線。',
            stats: { affection: 12, security: 14, boundary: 12 }
          },
          {
            text: '拿掃把清理碎片，溫和地請小鹿先坐下喝水，並握住蘇緋冰冷的手：「香草葉是我早上幫花店搬盆栽沾到的，我一結束就來找妳了，沒有偏心誰。」',
            nextExpression: 'smile',
            reply: '聽到具體的時間線解釋，蘇緋緊繃的肩膀終於垮了下來：「……下次早點告訴我嘛。」小鹿也破涕為笑：「那我再去拿備用的餅乾跟蘇緋姊分享！」',
            psychNote: '【三人互動解析】透明的事實說明加上穩定的情緒接納，能同時安撫兩人的焦慮。',
            stats: { affection: 10, security: 12, boundary: 10 }
          },
          {
            text: '為了哄蘇緋開心，轉頭對白小鹿兇道：「都是妳突然跑來害蘇緋心情不好，快點把地上擦乾淨出去！」',
            nextExpression: 'triggered',
            defenseMechanism: '討好型自殘順從 × 邊緣型關係不信任擴散（Self-Harming Compliance vs. Splitting）',
            reply: '白小鹿哭著徒手撿碎瓷片，手指被割出血也不敢吭聲；蘇緋看著這一幕，眼神反而更加空洞不安：「……你連這麼聽話的她都能說趕走就趕走，哪天也會這樣對我吧。」',
            psychNote: '【病理展演】依賴型為避免被棄（F60.7-A5）甚至甘願受傷忍受不合理對待；而邊緣型目睹冷酷對待他人反而觸發自身「遲早也被拋棄」的恐懼（F60.3-A1）。',
            stats: { affection: -8, security: -14, boundary: -10 }
          },
          {
            text: '只顧著心疼白小鹿，當場大罵蘇緋是不可理喻的瘋子並拉著小鹿離開。',
            nextExpression: 'triggered',
            defenseMechanism: '拋棄感誘發破壞性爆發（Abandonment Rage Act-Out）',
            reply: '蘇緋獨自站在滿地碎瓷與草莓醬中，絕望地拉斷了大提琴弦；小鹿也一路哭著自責是自己害你們吵架。',
            psychNote: '【病理展演】當場被比較並被丟下，會直接點燃邊緣型的破壞性衝動與被棄危機（F60.3-A1/A8）。',
            stats: { affection: -10, security: -15, boundary: -6 }
          }
        ]
      }
    ],
    studySummary: '【鑑別考點】BPD（F60.3）與 DPD（F60.7）皆害怕分離，但面臨被棄威脅時：BPD 呈現「激烈憤怒、指控、自傷/破壞或急速推拉」；DPD 呈現「卑微自貶、迎合要求與害怕觸怒照顧者」。'
  },

  'han_xiao__xia_le': {
    locationId: 'lounge',
    title: '【三人同場】聚光燈與危險賭局（韓梟 ＆ 夏樂）',
    ambience: '地下酒吧爵士樂、鎂光燈快門與冰塊撞擊威士忌杯的脆響',
    criterionTags: ['F60.2-A5', 'F60.2-A2', 'F60.4-A1', 'F60.4-A4'],
    differentialContrast: {
      summary: '同為 Cluster B 高度戲劇化與高喚起需求：做作型搶焦點是為了「確認自己仍被喜愛、避免被遺忘」；反社會型撩撥規則與挑釁則是為了「追求刺激感與測試權力籌碼」。',
      partnerA: { name: '夏樂', disorder: '做作型 HPD', motive: '失去全場目光即陷入空虛失溫，急於拉攏旁人確認自己仍是鎂光燈中心。', mechanism: '尋求關注與情感誇張化（Attention-Seeking Dramatization）' },
      partnerB: { name: '韓梟', disorder: '反社會型 ASPD', motive: '無聊厭煩平靜，蓄意製造衝突與高風險遊戲來測試別人的反應與把柄。', mechanism: '工具性挑釁與冒險操弄（Instrumental Provocation）' }
    },
    nodes: [
      {
        speaker: 'narrator',
        expression: 'smile',
        text: '在地下酒吧的小劇場之夜，夏樂正站在舞台中央張開雙臂準備迎接全場歡呼，吧台後的韓梟卻突然點燃了一座藍紫色的火焰艾碧斯酒塔，瞬間把全場客人的目光與尖叫全部吸了過去。'
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
            text: '舉起手機幫兩人拍一張「火焰吧台與舞台主演」的雙人合照：「韓老闆的火焰剛好當夏樂謝幕的特效背景，今晚你們兩個都是焦點！」',
            nextExpression: 'smile',
            reply: '夏樂立刻擺出最迷人的角度：「這張構圖超神！」韓梟也配合地舉杯致意：「算你會打圓場。」',
            psychNote: '【三人互動解析】巧妙將競爭轉化為雙贏舞台，化解做作型的失落與反社會型的挑釁。',
            stats: { affection: 10, security: 10, boundary: 9 }
          },
          {
            text: '被韓梟帶著一起起鬨嘲笑夏樂：「對啊夏樂，你的舞台劇哪有火焰調酒好看，別在那邊刷存在感了！」',
            nextExpression: 'triggered',
            defenseMechanism: '做作型羞恥崩潰 × 反社會型輕蔑支配（Attention Collapse vs. Predator Contempt）',
            reply: '夏樂臉上的笑容瞬間碎裂，捂著臉跑進後台化妝間；韓梟看著附和他的你，眼底卻掠過一絲看穿獵物般的輕蔑。',
            psychNote: '【病理展演】隨波逐流羞辱人，會擊潰做作型的表演自尊（F60.4-A1），同時證實反社會型對「人人皆可被誘導作惡」的冷血價值觀。',
            stats: { affection: -8, security: -10, boundary: -10 }
          },
          {
            text: '為了討好夏樂，直接伸手把韓梟吧台上的酒杯掃落在地大罵他搶風頭。',
            nextExpression: 'triggered',
            defenseMechanism: '冷血敵對反制與驚嚇退縮（Cold Intimidation vs. Theatrical Panic）',
            reply: '酒吧瞬間安靜，韓梟擦掉手背上的酒漬，眼神冷得令人發寒：「你想試試看這間吧台的規矩？」夏樂也被這股真實暴戾氣息嚇得臉色發白。',
            psychNote: '【病理展演】做作型渴望的是戲劇張力而非真實暴力；與反社會型正面硬碰硬的失控行為只會喚醒他無同理的叢林反擊。',
            stats: { affection: -9, security: -12, boundary: -8 }
          }
        ]
      }
    ],
    studySummary: '【鑑別考點】HPD 與 ASPD 皆愛追求興奮與戲劇性場面：HPD 的動機是『依附與被看重（害怕成為空氣）』；ASPD 則是『刺激搜尋、測試操控力與漠視他人安全/規則』。'
  },

  'gu_qingcheng__wen_yan': {
    locationId: 'studio',
    title: '【三人同場】建築事務所裡的古建築圖紙（顧傾城 ＆ 溫言）',
    ambience: '頂樓落地窗外的風聲、咖啡杯輕放聲與翻動宣紙的沙沙聲',
    criterionTags: ['F60.81-A3', 'F60.81-A9', 'F60.6-A4', 'F60.6-A2'],
    differentialContrast: {
      summary: '極端自尊防禦的兩種鏡像表現：自戀型（NPD）用居高臨下與挑剔貶抑來維持優越安全感；畏避型（AvPD）將任何評價都內化為「我不夠好、快逃離現場」的自卑退縮。',
      partnerA: { name: '顧傾城', disorder: '自戀型 NPD', motive: '透過權威姿態與菁英標準掌控對話高地，無法容忍不自信或平庸氣場。', mechanism: '貶抑與高傲鏡像防衛（Devaluation & Superiority Armor）' },
      partnerB: { name: '溫言', disorder: '畏避型 AvPD', motive: '將對方的銳利評價全盤接收為對整個人格的否定，寧可先退縮免於當場受辱。', mechanism: '羞恥內化與先發逃離（Shame Internalization & Escape）' }
    },
    nodes: [
      {
        speaker: 'narrator',
        expression: 'anxious',
        text: '溫言抱著修復好的百年古建築測繪圖來到建築事務所，在顧傾城強大的女王氣場下，他緊張得連推眼鏡的手指都在發抖。'
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
            text: '請溫言在會議桌坐下，將話題引導回古建築本身的結構美學：「這張圖紙的榫卯細節太精彩了，你們兩位專家要不要一起對照看看？」',
            nextExpression: 'smile',
            reply: '一談到專業技術，溫言的眼神逐漸專注安定下來，顧傾城也露出了欣賞的目光。',
            psychNote: '【三人互動解析】將焦點從「個人評價」轉移到「客觀專業交流」，讓畏避型與自戀型都能在安全區發揮所長。',
            stats: { affection: 10, security: 12, boundary: 9 }
          },
          {
            text: '當著溫言的面大罵顧傾城：「妳講話怎麼這麼傲慢刻薄啊，仗著有錢有名就欺負老實人嗎！」',
            nextExpression: 'triggered',
            defenseMechanism: '自戀暴怒驅逐 × 畏避自責恐慌（Narcissistic Rage vs. Shame Freeze）',
            reply: '顧傾城臉色驟變，冷冷下達逐客令：「不懂得區分品質與欺壓的蠢貨，請立刻離開我的視線！」溫言更是嚇得渾身發抖，不斷向你和顧傾城鞠躬道歉。',
            psychNote: '【病理展演】直接攻擊自戀型的權威會觸發其自戀暴怒（NPD Rage）；衝突氛圍同時讓畏避型把過錯攬到自己身上。',
            stats: { affection: -10, security: -12, boundary: -6 }
          },
          {
            text: '跟著顧傾城一起數落溫言：「對啊溫言，你一個大男人畏畏縮縮的真的很丟臉耶，抬頭挺胸一點行不行！」',
            nextExpression: 'triggered',
            defenseMechanism: '畏避型羞恥潰逃 × 自戀型菁英附和確認（Avoidant Collapse & NPD Contempt）',
            reply: '溫言眼眶泛紅，抱著圖紙筒倉皇逃出辦公室，連電梯都不敢搭就直接衝下安全梯；顧傾城也微微皺眉：「一個毫無主見的跟風者，更顯平庸。」',
            psychNote: '【病理展演】雙重羞辱直接擊穿畏避型 F60.6-A4 防線，引發奪門而逃的經典反應。',
            stats: { affection: -12, security: -15, boundary: -4 }
          }
        ]
      }
    ],
    studySummary: '【鑑別考點】當隱含自卑但外顯誇大的 NPD 碰上內外皆感低人一等的 AvPD，同一句專業評語會被 NPD 用來區分等第（F60.81-A3）、被 AvPD 解讀為「我果然不配待在這裡」（F60.6-A4/A6）。'
  },

  'ruri__lu_qinglan': {
    locationId: 'atelier',
    title: '【三人同場】碎瓷片上的星象預言與金箔（星野琉璃 ＆ 陸晴嵐）',
    ambience: '風鈴叮噹聲、金繼生漆調合聲與歡快的笑聲',
    criterionTags: ['F21-A7', 'F21-A2', 'F07.0-E', 'F07.0-B'],
    differentialContrast: {
      summary: '非器質精神病理信念 vs 器質性額葉去抑制：思覺失調型透過「奇幻的思考與超自然符號」建構孤立心理防線；另一身體病況引起的人格改變則為神經過濾器受損後的直接直率與情緒易變，兩者皆保有對現實意義的創作連結。',
      partnerA: { name: '星野琉璃', disorder: '思覺失調型 StPD', motive: '將破碎茶碗視為天鵝座星象的神秘對應，藉以緩衝殘酷現實的傷害。', mechanism: '奇幻的思考與超自然符號投射（Magical Thinking）' },
      partnerB: { name: '陸晴嵐', disorder: '另一身體病況引起的人格改變 F07.0', motive: '無任何超自然妄想，單純因手部微顫打破碗後以金繼自嘲裂痕與腦傷。', mechanism: '去抑制幽默與現實自嘲整合（Disinhibited Humor & Self-Acceptance）' }
    },
    nodes: [
      {
        speaker: 'narrator',
        expression: 'smile',
        text: '在畫室裡，陸晴嵐正哼著歌用純金粉末修補一只摔成五瓣的青瓷碗，星野琉璃則捧著水晶球湊在旁邊目不轉睛地盯著裂痕看。'
      },
      {
        speaker: 'char',
        expression: 'smile',
        text: '星野琉璃：「哇……晴嵐姊姊，這道裂紋的形狀跟天鵝座的北十字一模一樣！這是宇宙在告訴我們，破碎的靈魂只要注入陽光就會變成星座！」\n陸晴嵐（哈哈大笑，不小心把金粉沾到自己鼻尖上）：「什麼星座啦！這是我昨天手滑撞到桌角摔破的！不過被琉璃這麼一說，我車禍撞壞的腦袋好像也變成銀河系了耶！{player}你覺得呢？」',
        choices: [
          {
            text: '微笑著幫晴嵐擦掉鼻尖的金粉：「琉璃看見了裂痕裡的詩意，晴嵐親手把裂痕變成了藝術。你們兩個人都讓破碎的東西變得更珍貴了。」',
            nextExpression: 'smile',
            reply: '琉璃開心地轉了個圈，晴嵐則眼眶微熱地拍了拍你的肩膀：「這句話我超喜歡！今天這只星空金繼碗就送給{player}當紀念！」',
            psychNote: '【三人互動解析】接納思覺失調型的象徵語言與腦傷性格改變者的豁達自嘲，創造溫暖去污名化的療癒場域。',
            stats: { affection: 14, security: 14, boundary: 10 }
          },
          {
            text: '提議三個人一起合作：由晴嵐修補瓷碗，琉璃在碗盒上繪製天鵝座星圖，你負責泡花草茶。',
            nextExpression: 'smile',
            reply: '兩人異口同聲地歡呼贊成，工坊裡充滿了溫暖的笑聲與茶香。',
            psychNote: '【三人互動解析】透過共同創作將兩人的獨特視角結合，建立安全的歸屬感。',
            stats: { affection: 12, security: 12, boundary: 9 }
          },
          {
            text: '潑冷水說：「摔破的碗就是壞掉了，腦袋受傷也是醫療事故，講什麼星座銀河都只是自欺欺人吧。」',
            nextExpression: 'triggered',
            defenseMechanism: '腦傷自卑退縮 × 思覺失調解離退回（Shame Collapse vs. Schizotypal Withdrawal）',
            reply: '工坊裡的笑聲瞬間消失。晴嵐握著畫筆的手微微發抖：「……原來只是自我安慰嗎。」琉璃則默默退回天鵝絨簾幕後面切斷對話。',
            psychNote: '【病理展演】無情否定裂痕的價值會撕下晴嵐樂觀面具下的深深自卑（F07.0-E），並推開本就社交焦慮的琉璃（F21-A9）。',
            stats: { affection: -10, security: -14, boundary: -4 }
          },
          {
            text: '叫晴嵐別再亂動以免又打破東西，叫琉璃也別在旁邊講怪話干擾工作。',
            nextExpression: 'anxious',
            defenseMechanism: '抑制受挫壓抑 × 古怪語言靜音（Frustrated Restraint & Odd-Speech Suppression）',
            reply: '兩人尷尬地停下手邊的事，原本充滿生氣的工坊變得死氣沉沉。',
            psychNote: '【病理展演】過度控制與貶抑「怪話」會雙重壓抑兩位住戶的表達安全感。',
            stats: { affection: -6, security: -8, boundary: -6 }
          }
        ]
      }
    ],
    studySummary: '【鑑別考點】區分 StPD（F21-A2 奇幻的思考／心理防禦性怪異）與 F07.0（F07.0-B 器質損傷後的易變與去抑制），不可將腦傷後直白口無遮攔誤診為思覺失調症。'
  },

  'shen_mo__gu_qingcheng': {
    locationId: 'cafe',
    title: '【三人同場】競圖洩密案的針鋒相對（沈墨 ＆ 顧傾城）',
    ambience: '冰美式攪拌聲、加密筆電鍵盤聲與高跟鞋敲地聲',
    criterionTags: ['F60.0-A6', 'F60.0-A3', 'F60.81-SPEC1', 'F60.81-A3'],
    differentialContrast: {
      summary: '高警戒 vs 高特權的正面衝撞：妄想型把要求保密條款解讀為「遮掩內鬼與不配合查案」；自戀型將全面審查私生活解讀為「對其頂級身份與管理權威的冒犯」。',
      partnerA: { name: '沈墨', disorder: '妄想型 PPD', motive: '拒絕任何授權限制，深信委託人自身亦可能是洩密盲點或陷阱來源。', mechanism: '全盤懷疑與無豁免調查防衛（Zero-Trust Investigation）' },
      partnerB: { name: '顧傾城', disorder: '自戀型 NPD', motive: '期待以金錢與地位享有特權豁免，無法忍受「管理傲慢」的指控戳痛脆弱核心。', mechanism: '特權豁免主張與傲慢防禦（Entitlement & Vulnerability Shield）' }
    },
    nodes: [
      { speaker: 'narrator', expression: 'anxious', text: '咖啡廳靠窗座，顧傾城把一份競圖外洩調查委託書推到沈墨面前。一個是絕不低頭的建築女王，一個是連委託人都懷疑的資安獵犬。' },
      {
        speaker: 'char', expression: 'anxious',
        text: '顧傾城：「沈先生，我付雙倍顧問費是請你查出內鬼，不是讓你連我的私人行程表都列入嫌疑清單。」\n沈墨：「顧總，百分之八十的商業洩密都源於內部管理傲慢造成的漏洞。想讓我接案，就別規定我怎麼查。」',
        choices: [
          { text: '居中協調：「傾城需要的是對外絕對保密以維護商譽，沈墨需要的是權限範圍內的獨立調查。我們先簽雙向保密範疇協議如何？」', nextExpression: 'smile', reply: '顧傾城讚許地看了你一眼：「還是{player}懂專業溝通。」沈墨推了推眼鏡：「有你見證範疇，我可以接受。」', psychNote: '【三人互動解析】同時給予自戀型「尊榮面子」與妄想型「清晰契約邊界」。', stats: { affection: 12, security: 12, boundary: 10 } },
          { text: '請沈墨先展示一項外圍網路漏洞作為專業證明，讓傾城安心授權。', nextExpression: 'smile', reply: '沈墨敲了三下鍵盤調出紀錄，顧傾城眼神一凜：「確實有兩把刷子，這案子交給你了。」', psychNote: '【三人互動解析】用實力證據取代口舌之爭，滿足雙方的專業高標準。', stats: { affection: 10, security: 11, boundary: 9 } },
          { text: '幫著顧傾城指責沈墨太無禮，要求他立刻向顧總道歉。', nextExpression: 'triggered', defenseMechanism: '懷疑串謀與強制切斷連結（Collusion Suspicion & Hostile Exit）', reply: '沈墨直接合上筆電起身走人：「你幫她壓下審查權限？那我也沒有查這條線的必要了。」', psychNote: '【病理展演】強迫妄想型向權威低頭並放棄獨立檢視（F60.0-A6），會讓他認定你也被權勢收買而斷開合作。', stats: { affection: -8, security: -10, boundary: -5 } },
          { text: '幫著沈墨嘲諷顧傾城：「就是因為妳平常太自大才被員工出賣吧！」', nextExpression: 'triggered', defenseMechanism: '自戀暴怒驅逐（Narcissistic Rage & Devaluing Termination）', reply: '顧傾城冷笑一聲撕毀支票：「不知天高地厚的蠢貨，我的事務所不歡迎你們這種酸葡萄心理的失敗者。」', psychNote: '【病理展演】當眾拆穿自戀型的傲慢與失敗（F60.81-SPEC1 脆弱端破口），會瞬間引爆毀滅性的自戀暴怒。', stats: { affection: -9, security: -11, boundary: -5 } }
        ]
      }
    ],
    studySummary: '【鑑別考點】PPD 與 NPD 的猜忌差異：PPD 懷疑他人『想要害我／利用我』；NPD 則對冒犯優越感的評論敏感，重點在於『誰敢質疑我的卓越地位』。'
  },

  'lin_jianwei__su_fei': {
    locationId: 'rooftop',
    title: '【三人同場】絕對零度與攝氏一百度（林見微 ＆ 蘇緋）',
    ambience: '天台夜風、大提琴即興旋律與天文鐘滴答聲',
    criterionTags: ['F60.1-A4', 'F60.1-A7', 'F60.3-A1', 'F60.3-A8'],
    differentialContrast: {
      summary: '情感調控光譜的兩極極端：孤僻型感受力扁平且表達純理性（聽出半音偏高 3 音分卻不表露共鳴）；邊緣型情感洪流過載，將對方的平靜視作冷酷拋棄。',
      partnerA: { name: '蘇緋', disorder: '邊緣型 BPD', motive: '需要即刻強烈的情感回應確認自己在對方眼中重要，沉默對她等同拒絕。', mechanism: '情感過載與被忽視即拋棄歸因（Affective Storm & Rejection Hypersensitivity）' },
      partnerB: { name: '林見微', disorder: '孤僻型 SzPD', motive: '專注於音律數據與樂器保養理性分析，完全不明白為何沒看眼睛就代表沒在聽。', mechanism: '情感的冷淡、疏離或平板的情感性（Flat Affect & Literalism）' }
    },
    nodes: [
      { speaker: 'narrator', expression: 'anxious', text: '蘇緋抱著大提琴在天台拉奏一首悲傷到極點的夜曲，眼淚掉在琴板上；林見微在一旁記錄流星數據，全程沒有轉頭看她一眼。' },
      {
        speaker: 'char', expression: 'triggered',
        text: '蘇緋（突然停弓哭喊）：「林見微！我都拉得這麼心碎了，妳的心是鐵做的嗎？為什麼連看都不看我一眼！」\n林見微：「我有聽見，A 小調，第 24 小節半音偏高了 3 音分。還有，眼淚含鹽分會腐蝕琴漆，建議立刻擦乾。」',
        choices: [
          { text: '遞手帕給蘇緋，笑著幫兩人翻譯：「蘇緋，見微連妳差了 3 音分都聽出來了，代表她從頭到尾都在認真聽妳拉琴喔！」', nextExpression: 'smile', reply: '蘇緋愣住，破涕為笑：「真、真的嗎？原來妳有在聽！」林見微輕輕點頭：「嗯，音色很有張力。」', psychNote: '【三人互動解析】幫情感濃烈的邊緣型「翻譯」孤僻型特有的理性關注方式，化解被忽視的恐慌。', stats: { affection: 12, security: 14, boundary: 9 } },
          { text: '邀請見微指出天琴座的位置，讓蘇緋為那顆星星拉一首溫柔的曲子。', nextExpression: 'smile', reply: '在琴聲與星光的交織下，一冷一熱的兩人意外達成了奇妙的平衡。', psychNote: '【三人互動解析】以共同的藝術與天文媒介搭建安全橋樑。', stats: { affection: 10, security: 12, boundary: 8 } },
          { text: '跟著蘇緋一起罵林見微是沒血沒淚的機器人。', nextExpression: 'triggered', defenseMechanism: '孤僻漠然抽離 × 邊緣全壞分裂放大（Schizoid Indifference vs. BPD Splitting）', reply: '林見微默默收拾星圖下樓：「我回房了。」蘇緋雖然一時出氣，隨後卻又焦慮起來：「連她也走了，會不會大家都嫌我太情緒化？」', psychNote: '【病理展演】順從邊緣型的分裂評價（F60.3-A2），既無法讓孤僻型感到愧疚（F60.1-A6），還會反過來加重邊緣型的內疚焦慮。', stats: { affection: -7, security: -9, boundary: -5 } },
          { text: '冷冷對蘇緋說：「妳看人家見微多冷靜，妳別再無病呻吟吵人了！」', nextExpression: 'triggered', defenseMechanism: '羞辱誘發極端棄絕失控（Invalidation-Triggered Tantrum）', reply: '蘇緋臉色慘白，抱著琴衝下天台：「連你也覺得我是個惹人厭的瘋子！」', psychNote: '【病理展演】用高度扁平的人來羞辱情感敏感高喚起的 BPD，會立刻重演其「感情無人能接住」的童年無效化創傷。', stats: { affection: -10, security: -12, boundary: -4 } }
        ]
      }
    ],
    studySummary: '【鑑別考點】臨床最明顯的情感光譜對照：BPD（情緒高振幅、過度偵測人際眼神）vs SzPD（F60.1-A7 情感的冷淡、疏離或平板的情感性）。'
  },

  'ruri__shen_mo': {
    locationId: 'rooftop',
    title: '【三人同場】神秘符號與摩斯密碼（星野琉璃 ＆ 沈墨）',
    ambience: '夜風吹拂水晶簾、手電筒光束與緊張的低語',
    criterionTags: ['F21-A1', 'F21-A2', 'F60.0-A4', 'F60.0-A1'],
    differentialContrast: {
      summary: 'DSM-5-TR Cluster A 核心鑑別（Ideas of Reference vs Paranoid Suspiciousness）：同對物理世界過敏解碼——思覺失調型傾向超自然與個人宇宙聯繫（星際精靈打招呼）；妄想型則鎖定人為敵對陰謀（莫斯密碼接頭）。',
      partnerA: { name: '沈墨', disorder: '妄想型 PPD', motive: '認定三短三長敲擊必屬人為通訊暗號，高度戒備敵人外部接頭。', mechanism: '人際陰謀過度歸因（Hypervigilant Conspiracy Inference）' },
      partnerB: { name: '星野琉璃', disorder: '思覺失調型 StPD', motive: '將物理風聲與風鈴排列體驗為宇宙精靈傳遞給自己的神祕訊息。', mechanism: '關係意念與奇幻的思考（Ideas of Reference & Magical Thinking）' }
    },
    nodes: [
      { speaker: 'narrator', expression: 'anxious', text: '星野琉璃在頂樓欄杆上掛了一排不同長短的紫水晶風鈴，沈墨卻拿著筆記本在旁邊神情嚴肅地抄寫風鈴碰撞的節奏。' },
      {
        speaker: 'char', expression: 'anxious',
        text: '沈墨：「三短、三長、三短……星野小姐，這串風鈴的敲擊頻率是標準摩斯密碼的求救訊號，你在向對面大樓的誰傳遞情報？」\n星野琉璃：「咦？這是北風精靈在跟天狼星打招呼的音階呀！沈墨先生也聽得見宇宙的暗號嗎？」',
        choices: [
          { text: '笑著向兩人解釋：「琉璃是照水晶大小排列的，剛好大風吹過形成了三短三長的節奏。沈墨你看，把第三顆水晶換個位置就不是摩斯密碼了。」', nextExpression: 'smile', reply: '沈墨看著調整後的風鈴節奏，終於合上筆記本：「……巧合機率萬分之一。」琉璃則崇拜地看著你們：「原來{player}跟沈墨先生都是解碼大師！」', psychNote: '【三人互動解析】用具體可驗證的操作解除妄想型的警報，同時不破壞思覺失調型的童話世界。', stats: { affection: 12, security: 12, boundary: 9 } },
          { text: '泡兩杯安神洋甘菊茶請兩人喝，聊起星座神話與古代密碼學的共通點。', nextExpression: 'smile', reply: '兩人竟然認真討論起古埃及星圖密碼，氣氛意外融洽。', psychNote: '【三人互動解析】找出兩位Cluster A角色對「隱藏規律」的共同興趣，轉化焦慮為知識交流。', stats: { affection: 10, security: 11, boundary: 8 } },
          { text: '附和沈墨說琉璃一定是可疑的間諜，要把她的風鈴全部沒收。', nextExpression: 'triggered', defenseMechanism: '奇幻創傷恐慌 × 猜忌擴散（Schizotypal Panic vs. Paranoid Purge）', reply: '琉璃嚇得抱緊風鈴躲到角落哭泣，沈墨反而沉下臉看你：「沒取證就沒收證物，你想替誰毀滅線索？」', psychNote: '【病理展演】附和盲目行動反而觸動妄想型「銷毀線索」的警惕，並重創思覺失調型的安全寄託。', stats: { affection: -8, security: -10, boundary: -6 } },
          { text: '對兩人翻白眼：「一個神神叨叨、一個疑神疑鬼，你們兩個乾脆一起去精神科掛號算了！」', nextExpression: 'triggered', defenseMechanism: '雙重病恥感隔離封閉（Dual Stigmatization Isolation）', reply: '兩人同時沉默下來，沈墨起身鎖上筆記本，琉璃則徹底躲回屋裡對你築起了深深的心防。', psychNote: '【病理展演】嘲笑式病理貼標是整個 Cluster A 最嚴重的破壞性處置。', stats: { affection: -12, security: -15, boundary: -5 } }
        ]
      }
    ],
    studySummary: '【鑑別考點】同有「關係意念與猜疑」，但 PPD 猜測「有具體人為敵意勢力設計陷阱」，StPD 則偏向「怪異超自然因果與古怪知覺（F21-A1/A2）」。'
  },

  'han_xiao__bai_xiaolu': {
    locationId: 'cafe',
    title: '【三人同場】惡魔的玩笑與小鹿的眼淚（韓梟 ＆ 白小鹿）',
    ambience: '午後咖啡廳音樂、重機引擎熄火聲與攪拌匙輕響',
    criterionTags: ['F60.2-A2', 'F60.2-A6', 'F60.7-A5', 'F60.7-A6'],
    differentialContrast: {
      summary: '掠食性操弄者 vs 高度依附順從者：反社會型視輕信他人者為無聊卻可測試的玩具；依賴型一旦被威脅「失去依附環境與保護」，哪怕條件極不合理也急於屈從求生。',
      partnerA: { name: '韓梟', disorder: '反社會型 ASPD', motive: '純粹測試底線、利用資訊不對稱詐欺嚇唬人並尋求主導樂趣，不知悔恨（F60.2-A2/A7）。', mechanism: '詐欺試探與不知悔恨（Conning & Lack of Remorse）' },
      partnerB: { name: '白小鹿', disorder: '依賴型 DPD', motive: '不切實際地專注於害怕被獨自留下與無法自我照顧（F60.7-A6/A8），立即屈從勒索以換取留在安全圈的保障。', mechanism: '恐懼驅動的順服性（Helpless Submissiveness）' }
    },
    nodes: [
      { speaker: 'narrator', expression: 'anxious', text: '韓梟難得在白天晃進咖啡廳，似笑非笑地逗弄正在擦桌子的白小鹿，騙她說店長要把咖啡廳賣掉改建成地下賭場。' },
      {
        speaker: 'char', expression: 'anxious',
        text: '白小鹿（眼眶瞬間紅透，緊緊抓著抹布）：「怎、怎麼辦……如果變成賭場，我只會烤蛋糕不會發牌，是不是就要失業被趕出去了……」\n韓梟（支著下巴看戲）：「別怕啊小綿羊，只要你現在求我，並答應幫我免費跑腿一個月，我就考慮把甜點櫃留給你，如何？」',
        choices: [
          { text: '走到小鹿身邊拍拍她的肩：「小鹿別怕，韓梟在逗妳玩呢，咖啡廳好得很。韓老闆，想吃小鹿烤的閃電泡芙就直接點單，別用嚇唬人的方式討點心。」', nextExpression: 'smile', reply: '白小鹿破涕為笑：「原來是開玩笑的！」韓梟被你看穿心思，摸了摸鼻子低笑：「嘖，有{player}護著，連逗一下都不行了。那給我來兩份泡芙，我付雙倍小費。」', psychNote: '【三人互動解析】替依賴型擋下操弄並給予確定感，同時溫和拆穿反社會型的惡作劇並立下規矩。', stats: { affection: 12, security: 14, boundary: 12 } },
          { text: '請小鹿端出一盤剛出爐的苦甜巧克力塔，跟韓梟交換一個「保證不再嚇店員」的承諾。', nextExpression: 'smile', reply: '韓梟咬了一口巧克力塔，挑眉道：「味道不錯，成交。」小鹿也開心地露出了自信的笑容。', psychNote: '【三人互動解析】將單向捉弄轉化為平等互惠的良性互動。', stats: { affection: 10, security: 11, boundary: 10 } },
          { text: '跟著韓梟一起騙小鹿，看她嚇得掉眼淚覺得很好玩。', nextExpression: 'triggered', defenseMechanism: '共同霸凌潰堤 × 依賴恐慌崩潰（Collusive Exploitation & DPD Panic）', reply: '白小鹿哭著跑進廚房，手裡的抹布落了一地；韓梟看了一眼慌亂的小鹿又瞥向你，嘴角勾起冷冷的諷刺：「原來你跟我也沒什麼兩樣嘛。」', psychNote: '【病理展演】迎合詐欺操弄不僅徹底摧毀依賴者的安全感，在反社會者眼裡也證實了這世界只是弱肉強食。', stats: { affection: -9, security: -14, boundary: -8 } },
          { text: '叫小鹿乖乖聽韓梟的話去幫他跑腿一個月，免得惹怒他。', nextExpression: 'anxious', defenseMechanism: '強化順從與不當索求共生體系（Subjugation & Predator Reinforcement）', reply: '小鹿委屈地低頭答應，韓梟則覺得你們兩個人都軟弱無趣透頂，連捉弄的興致也沒了。', psychNote: '【病理展演】勸弱勢者屈從不合理要求，直接將 DPD 推進受虐／被利用的典型高風險情境。', stats: { affection: -7, security: -10, boundary: -12 } }
        ]
      }
    ],
    studySummary: '【鑑別考點】臨床高風險配對：ASPD 的詐欺與為個人私利操弄（F60.2-A2/A7）往往精準吸引 DPD 自願去做不愉快的事來換取撫慰或支持（F60.7-A5），介入重點是建立現實保護界線。'
  },

  'xia_le__wen_yan': {
    locationId: 'archive',
    title: '【三人同場】新書發表會前的朗讀請求（夏樂 ＆ 溫言）',
    ambience: '麥克風測音聲、翻動書頁與遠處排練的掌聲',
    criterionTags: ['F60.4-A1', 'F60.4-A7', 'F60.6-A1', 'F60.6-A5'],
    differentialContrast: {
      summary: '聚光燈焦慮的相反向量：做作型視上台與眾人注視為呼吸般不可或缺的養分（沒有目光就感覺失去價值）；畏避型則將舞台視為暴露個人缺點與招來當眾羞辱的刑場。',
      partnerA: { name: '夏樂', disorder: '做作型 HPD', motive: '直覺將「觀眾注目」等同「被喜歡與存在感」，無法理解為何有人會拒絕成為主角。', mechanism: '聚光燈中心需求與過度社交自信（Spotlight Hunger & Impressionistic Optimism）' },
      partnerB: { name: '溫言', disorder: '畏避型 AvPD', motive: '將大眾目光預測為災難性檢視與嘲笑（F60.6-A5），寧願退居幕後免得丟臉。', mechanism: '社交退避與自卑災難化（Catastrophic Embarrassment Avoidance）' }
    },
    nodes: [
      { speaker: 'narrator', expression: 'anxious', text: '圖書室的小型譯詩發表會即將開始，夏樂被請來當開場嘉賓，溫言則是譯者本人。休息室裡，夏樂正對著鏡子調整笑容，溫言縮在最角落的沙發邊緣。' },
      {
        speaker: 'char', expression: 'anxious',
        text: '夏樂：「溫老師！你不要這麼緊張嘛，台下看你的人那麼多，你只要想像他們都很喜歡你就好啦！」\n溫言（聲音很輕）：「……他們要是不喜歡呢？我寧可不上台，這樣至少不會有人對我失望。」',
        choices: [
          { text: '提議改成「雙人朗讀」：由夏樂站在聚光燈下朗讀主詩句，溫言坐在溫暖的檯燈旁補充翻譯筆記。', nextExpression: 'smile', reply: '夏樂眼睛一亮：「這個形式超浪漫！我可以幫溫老師分擔目光！」溫言也鬆了一大口氣：「如果是坐著念筆記……我可以試試看。」', psychNote: '【三人互動解析】利用做作型熱愛聚光燈的特質，替畏避型分擔社交暴露焦慮，達成完美互補。', stats: { affection: 12, security: 12, boundary: 9 } },
          { text: '請溫言只看著台下第一排的你與夏樂朗讀就好，不必看其他觀眾。', nextExpression: 'smile', reply: '溫言看著你溫和的眼神，輕輕點頭：「……只要看著{player}，我的聲音就不會抖了。」', psychNote: '【三人互動解析】提供具體的「安全基地（Secure Base）」，幫助畏避型度過社交挑戰。', stats: { affection: 10, security: 11, boundary: 8 } },
          { text: '對溫言說：「你是今天的主角，大家都是衝著你來的，你絕對不能怯場丟臉！」', nextExpression: 'triggered', defenseMechanism: '畏避型預期羞辱恐慌爆發（Anticipatory Humiliation Panic）', reply: '溫言的臉色一下子慘白如紙，呼吸急促地抓緊胸口：「……大家都看著我的話，我一定會又開始結巴……」', psychNote: '【病理展演】用「絕不能丟臉」施壓會直接激活 AvPD F60.6-A5 抑制反應與身體化焦慮（SAD 共病徵象）。', stats: { affection: -8, security: -12, boundary: -4 } },
          { text: '叫溫言乾脆躲在後台別出來了，整場發表會全讓夏樂一個人自由發揮。', nextExpression: 'anxious', defenseMechanism: '做作獨攬焦點 × 畏避「我是透明人」驗證（HPD Spotlight Takeover vs. AvPD Erasure）', reply: '夏樂雖然過足了舞台癮，但溫言獨自坐在陰暗的後台，覺得自己再次成了毫無價值的透明人。', psychNote: '【病理展演】全面迎合 HPD 的舞台慾卻剝奪 AvPD 的嘗試機會，會雙重固化兩者各自的病理信念。', stats: { affection: -4, security: -8, boundary: -6 } }
        ]
      }
    ],
    studySummary: '【鑑別考點】同為高度依賴他人眼光決定自我價值：HPD 以「外向演出與魅力攫取目光（F60.4-A1/A4）」；AvPD 則以「隱形、迴避與沉默躲避批判（F60.6-A1/A5）」。'
  },

  'bai_xiaolu__you_ziqian': {
    locationId: 'cafe',
    title: '【三人同場】打烊前的一杯「隨便」（白小鹿 ＆ 游子謙）',
    ambience: '咖啡機蒸氣聲、晚間爵士與關店前的清潔聲',
    criterionTags: ['F60.7-A2', 'F60.7-A5', 'F60.89-GA', 'F60.89-GC'],
    differentialContrast: {
      summary: '兩者表面都講著「都可以、沒關係、好啊」，核心動機卻大相逕庭：依賴型（DPD）是因為害怕失去支持或讚許而困難表達不同意見、害怕被拋棄；被動攻擊型則是因壓抑內在怒氣與不滿，刻意退讓並誘發他人猜忌與內疚。',
      partnerA: { name: '白小鹿', disorder: '依賴型 DPD', motive: '把決定權交給他人以求安全無錯，害怕點錯東西惹人討厭。', mechanism: '決策癱瘓與過度配合求生（Decision Paralysis & Compliance）' },
      partnerB: { name: '游子謙', disorder: '被動攻擊型 Passive-Aggressive', motive: '內心煩厭無止境的配合卻不願撕破臉，以客氣笑臉掩蓋冷淡抱怨與怨恨情緒。', mechanism: '微笑式暗刺與反感壓抑（Smiling Cynicism & Covert Resentment）' }
    },
    nodes: [
      { speaker: 'narrator', expression: 'neutral', text: '咖啡廳快打烊了。白小鹿坐在吧台邊，游子謙笑盈盈地問她想喝什麼，她又說了一次「都可以」。他把杯子放下，笑容沒有變，但眼神微妙地冷了一點。' },
      {
        speaker: 'char', expression: 'neutral',
        text: '游子謙：「小鹿每次都說『都可以』，我真的好羨慕這麼好說話的人呢～不像我，每次都要想很久才知道自己想要什麼。」\n白小鹿：「對、對不起，我是不是又讓你為難了？我不是故意要讓你一直問的……」',
        choices: [
          { text: '笑著發給兩人各一張便條紙：「今晚玩個遊戲，兩個人都在紙上寫下『自己真正想喝的飲料』，不准寫隨便或都可以！」', nextExpression: 'smile', reply: '白小鹿咬著筆頭寫下「草莓熱牛奶」；游子謙愣了一下，噗哧笑出聲，寫下「不加糖的冰美式」：「……被{player}治好了呢。」', psychNote: '【三人互動解析】同時引導依賴型與被動攻擊型練習「直接表達真實需求」。', stats: { affection: 11, security: 12, boundary: 10 } },
          { text: '對小鹿說：「先選熱的還是冰的就好。」再轉頭對子謙說：「子謙今天辛苦了，換我幫你沖一杯你喜歡的洋甘菊茶吧。」', nextExpression: 'smile', reply: '小鹿安心地說：「熱的！」游子謙耳根微紅地放下抹布：「……原來你記得我喜歡喝什麼呀。」', psychNote: '【三人互動解析】降低依賴者的決策門檻，同時主動看見被動攻擊者隱藏的疲憊。', stats: { affection: 9, security: 10, boundary: 8 } },
          { text: '當著小鹿的面拆穿游子謙：「你講話幹嘛這麼陰陽怪氣欺負小鹿啊？」', nextExpression: 'triggered', defenseMechanism: '受害者委屈面具回防（Passive Victim Inversion）', reply: '游子謙立刻露出受盡委屈的苦笑：「對不起嘛，都是我嘴笨～」小鹿也慌張地跟著自責道歉，場面反而更尷尬。', psychNote: '【病理展演】公開情緒指責正中被動攻擊型的劇本下懷，讓他反轉為無辜受害者（F60.89-GC），也讓 DPD 自責升溫。', stats: { affection: -6, security: -8, boundary: -3 } },
          { text: '幫兩個人統一點兩杯白開水：「既然都說隨便，那就通通喝白開水最省事！」', nextExpression: 'anxious', defenseMechanism: '無視隱性訊號致雙雙疏離（Mutual Detachment & Quiet Resentment）', reply: '兩個人看著面前的白開水，心裡同時感到一陣被敷衍的失落——小鹿覺得自己又沒做好，子謙微笑著把杯子推開一公分。', psychNote: '【病理展演】粗暴替代兩者做決定，表面省事卻關閉了真實意願被聽見的通道。', stats: { affection: -5, security: -7, boundary: 0 } }
        ]
      }
    ],
    studySummary: '【鑑別考點】同為「不敢直接表達拒絕或主張」：DPD 是害怕「做了選擇失去他人」（F60.7-A2），故由真誠服從出發；被動攻擊型則心懷不滿與憤怒（F60.89-GB/GC），故以「都可以」或假笑暗藏抵制。'
  },

  'ji_yan__lu_qinglan': {
    locationId: 'atelier',
    title: '【三人同場】窯燒前夕的時刻表（紀嚴 ＆ 陸晴嵐）',
    ambience: '窯爐預熱聲、計時器滴答與午後蟬鳴',
    criterionTags: ['F60.5-A1', 'F60.5-A8', 'F07.0-B', 'F07.0-SUB-DIS'],
    differentialContrast: {
      summary: '最高控制的強迫型（OCPD）vs 神經去抑制（F07.0）：強迫型用表格與 15 分鐘精度壓抑所有隨機焦慮；腦傷性格改變者則在瞬間直覺跳躍並難以維持僵化編號流程，卻極富創作生命力。',
      partnerA: { name: '紀嚴', disorder: '強迫型 OCPD', motive: '將升溫曲線與坯體編號視為防範炸窯與失誤災難的唯一盾牌（F60.5-A1/A8）。', mechanism: '規則條列化與表現死板、頑固（Hyper-Scheduling & Rigidity）' },
      partnerB: { name: '陸晴嵐', disorder: '另一身體病況引起的人格改變 F07.0', motive: '並非惡意搗亂，而是右側眶額葉受損後的計畫順序跳躍與去抑制自嘲。', mechanism: '衝動隨性行動與自嘲化解尷尬（Orbitofrontal Disinhibition & Humor）' }
    },
    nodes: [
      { speaker: 'narrator', expression: 'neutral', text: '陸晴嵐的窯要在下午三點入窯，紀嚴受邀來協助記錄燒製曲線。他帶來了三份表格與兩支溫度計，陸晴嵐則抱著一堆還沒修坯的杯子，一邊笑一邊哼歌。' },
      {
        speaker: 'char', expression: 'neutral',
        text: '紀嚴：「升溫曲線必須在 14:55 前核對完畢，現在已經 14:41。陸小姐，請把坯體按編號擺好。」\n陸晴嵐：「哎呀紀醫師，燒窯又不是做解剖！偏一點點又不會怎樣——啊，我把三號杯放到九號的位置了，哈哈哈，還好有你在！」',
        choices: [
          { text: '幫晴嵐把坯體分成「精密溫控區」與「自由落灰區」兩層，讓紀嚴控管第一層數據，晴嵐自由擺放第二層。', nextExpression: 'smile', reply: '紀嚴看著分層圖，點頭道：「結構合理，誤差可控。」晴嵐開心地拍手：「太棒了！這樣既不會炸窯，又有驚喜！」', psychNote: '【三人互動解析】把「秩序需求」和「自由需求」切割成可共存的範圍，讓強迫型與去抑制型完美合作。', stats: { affection: 11, security: 12, boundary: 10 } },
          { text: '自告奮勇當碼錶記錄員，幫紀嚴抄寫升溫數據，並陪晴嵐一起核對杯底編號。', nextExpression: 'smile', reply: '紀嚴把鋼筆遞給你：「有你協助，時程剛好在 14:54 完成。」晴嵐也笑彎了眼：「我們三個簡直是黃金組合！」', psychNote: '【三人互動解析】成為穩定緩衝橋樑，降低強迫型的時間焦慮與腦傷者的記憶負荷。', stats: { affection: 9, security: 10, boundary: 8 } },
          { text: '勸晴嵐別再嘻皮笑臉，完全照紀嚴的SOP一個口令一個動作。', nextExpression: 'anxious', defenseMechanism: '強壓引發挫折顫抖（Sensorimotor Stress Overload）', reply: '晴嵐笑容收了一半，緊張得手抖打破了一只陶坯；紀嚴看著破掉的陶坯眉頭鎖得更緊：「……不精準反而消耗時間。」', psychNote: '【病理展演】強行要求額葉損傷者遵守嚴密 SOP，會誘發高壓力動作失誤，並加重其「壞掉的我什麼都做不好」的自卑。', stats: { affection: -6, security: -8, boundary: -5 } },
          { text: '把紀嚴的表格收起來說：「燒陶就是要隨性，看什麼表格，直接關窯門點火啦！」', nextExpression: 'triggered', defenseMechanism: '失控急停與情感隔離凍結（Loss-of-Control Freeze）', reply: '紀嚴臉色鐵青地站在原地，呼吸急促，完全無法忍受這種毫無章法的失控風險：「若無溫度曲線紀錄，我無法為任何可能失敗負責。」', psychNote: '【病理展演】強行抽走強迫型賴以為生的工具清單，會直接引發急性失控恐慌。', stats: { affection: -8, security: -11, boundary: -6 } }
        ]
      }
    ],
    studySummary: '【鑑別考點】當缺乏秩序耐受度的 OCPD（F60.5-A8）協助 TBI 後去抑制型（F07.0）時，關鍵教學觀念是「分工分層」——讓系統型人格負責外圍結構保護，而非要求神經受損者抑制天性。'
  }
};

// ==================== 12 角色專屬：一人一次・12 種完全不同的突發天災與危機事件 (E08) ====================
export const UNIQUE_DISASTER_EVENTS = {
  shen_mo: {
    title: 'E08｜突發天災：深夜六級強震與斷電驚魂',
    ambience: '緊急地震警報聲、全棟斷電的黑暗與劇烈心跳',
    narratorText: '深夜 23:47，六級強震讓整棟公寓劇烈搖晃、瞬間斷電！沈墨在警報響起的第一秒沒有逃往空地，而是死死抱著他的加密備份硬碟衝下樓梯，在黑暗中一把將你拉進一樓承重柱三角區，用自己的後背護住你的頭。',
    charLine: '「別動！餘震波還有 12 秒，我算過這根柱子的耐震係數。外面的基地台斷訊了，抓緊我的風衣，一步都別離開我的視線！」',
    choices: [
      {
        text: '反手穩穩握住他冰冷發抖的手腕：「好，我抓緊你了。硬碟很安全，我們兩個人也都很安全。」',
        nextExpression: 'smile',
        reply: '黑暗中，沈墨將下巴抵在你的發頂，劇烈的心跳慢慢平復：「……原來在天塌下來的時候，有一個人能讓我放心把後背交出去，是這種感覺。」',
        psychNote: '【突發天災羈絆】在地震斷訊誘發他失去環境控制感時，給予具體的事實確認與身體定錨。',
        stats: { affection: 14, security: 16, boundary: 8 }
      },
      {
        text: '打開手機手電筒照亮周圍三角區，陪他一起清點逃生背包裡的物資。',
        nextExpression: 'smile',
        reply: '看著你在光束下冷靜清點飲水與電池的側臉，沈墨眼底閃過深深的讚賞：「你比我想像中更適合當生死搭檔。」',
        psychNote: '【突發天災羈絆】以共同執行安全確認來轉化他的高度警覺，建立深厚戰友信任。',
        stats: { affection: 12, security: 14, boundary: 9 }
      },
      {
        text: '為了讓他安心，主動把自己的手機密碼跟定位權限全部交給他保管。',
        nextExpression: 'vulnerable',
        reply: '沈墨緊緊攥住你的手機，眼神在黑暗中顯得既依戀又偏執：「從今晚起，我不允許你再失聯一秒鐘。」',
        psychNote: '【共依存警訊】在災難恐慌中讓渡個人隱私邊界，會強化他的控制欲。',
        stats: { affection: 12, security: 4, boundary: -14 }
      },
      {
        text: '掙脫他的手抱怨道：「都地震了你還抱著那顆破硬碟不放，資料比命還重要嗎！」',
        nextExpression: 'triggered',
        reply: '沈墨手臂一僵，默默收回護著你的手，退回黑暗角落。',
        psychNote: '【防禦觸發】否定他賴以生存的安全感象徵，會讓他在危機中再次封閉自我。',
        stats: { affection: -8, security: -12, boundary: -2 }
      }
    ]
  },

  lin_jianwei: {
    title: 'E08｜突發天災：強烈颱風過境與全城大停電',
    ambience: '狂風呼嘯、暴雨拍打玻璃與萬籟俱寂的星空',
    narratorText: '十年一遇的強烈颱風在午夜切斷了變電所，整座城市的霓虹燈火在同一秒熄滅。風眼剛巧掠過公寓上空，風雨暫歇的死寂中，林見微獨自站在頂樓觀測窗前，看著平時被光害掩蓋的壯麗銀河。',
    charLine: '「全城停電了，連電子鐘的滴答聲都停了……小時候在極地觀測站遇到暴風雪斷電時，也是這樣安靜得像全世界只剩下我一個人。」',
    choices: [
      {
        text: '不開刺眼的強光手電筒，只拿出一塊溫熱的暖暖包放進她手心，陪她並肩安靜看銀河。',
        nextExpression: 'smile',
        reply: '林見微低頭看著掌心的暖暖包，第一次主動將微涼的肩膀輕輕靠向你：「……37.2 度的恆溫。今晚的暴風眼，比小時候溫暖很多。」',
        psychNote: '【突發天災羈絆】不破壞她熱愛的星夜靜謐，僅提供恰到好處的物理溫暖，融化孤僻型的疏離感。',
        stats: { affection: 14, security: 16, boundary: 10 }
      },
      {
        text: '拿出機械式懷錶放在窗台：「電子鐘停了沒關係，這只發條錶還能替妳數秒針。」',
        nextExpression: 'smile',
        reply: '聽著規律清脆的齒輪滴答聲，見微緊繃的眉梢舒展開來：「謝謝你，這是今晚最令人安心的頻率。」',
        psychNote: '【突發天災羈絆】理解她對規律機械聲的安全感依賴，給予精準的情感支持。',
        stats: { affection: 12, security: 14, boundary: 9 }
      },
      {
        text: '從背後緊緊抱住她不放：「以後停電我都二十四小時黏著妳，絕對不讓妳一個人！」',
        nextExpression: 'anxious',
        reply: '林見微身體微微僵硬：「……太近了，我的呼吸空間被壓縮了。」',
        psychNote: '【界線提醒】過度密集的肢體包圍會讓孤僻型個體感到窒息。',
        stats: { affection: 4, security: -4, boundary: -10 }
      },
      {
        text: '打開大功率探照燈催她下樓：「停電黑漆漆的有什麼好看，快跟我去大廳跟大家擠在一起！」',
        nextExpression: 'triggered',
        reply: '強光瞬間毀了她的暗適應視力，她皺眉閉上眼，獨自退回房間鎖上門。',
        psychNote: '【防禦觸發】粗暴打斷她的獨處儀式並強迫群體社交，會引發強烈排斥。',
        stats: { affection: -8, security: -12, boundary: -6 }
      }
    ]
  },

  ruri: {
    title: 'E08｜突發天災：異常濃霧鎖城與日偏食驟暗',
    ambience: '濃霧中的低沉霧笛聲、驟降的氣溫與風鈴輕響',
    narratorText: '午後三點，罕見的平流濃霧與日偏食同時降臨城市，白晝在幾分鐘內驟然暗如永夜，三公尺外白茫茫一片。星野琉璃站在畫室陽台邊，看著被黑影吞噬的太陽，驚恐得指尖冰涼。',
    charLine: '「太陽被霧裡的巨鯨吞掉了……{player}，是不是因為我昨天看穿了命運的縫隙，世界才降下迷霧要把我收走？我快看不見你的臉了……」',
    choices: [
      {
        text: '握住她發抖的雙手貼在自己溫熱的臉頰上：「不是世界要收走妳，只是日偏食跟海霧剛好相遇了。摸摸看，我就在這裡，哪裡都不會去。」',
        nextExpression: 'smile',
        reply: '琉璃感受到你臉頰真實的溫度，眼角的淚水化作安心的微笑：「原來在永夜的迷霧裡，你的體溫就是我的北極星。」',
        psychNote: '【突發天災羈絆】溫柔提供氣象解釋與感官定錨，將思覺失調型的恐慌轉化為安全依附。',
        stats: { affection: 14, security: 16, boundary: 9 }
      },
      {
        text: '點亮一盞暖橘色的鹽燈放在窗邊：「我們點起太陽的火種，等三點四十分日食結束，光就會回來了。」',
        nextExpression: 'smile',
        reply: '琉璃抱著鹽燈暖呼呼的光芒，安心地點了點頭：「嗯！有火種守護，黑影就進不來了。」',
        psychNote: '【突發天災羈絆】善用她熟悉的象徵語言結合明確的時間預告，有效平撫知覺焦慮。',
        stats: { affection: 12, security: 14, boundary: 8 }
      },
      {
        text: '順著她的恐慌一起大喊：「對！外面的霧有毒又被詛咒了，我們把門窗釘死永遠別出門！」',
        nextExpression: 'vulnerable',
        reply: '琉璃死死抓著你的袖子：「只有我們兩個人醒著……我們永遠躲在閣樓裡好不好？」',
        psychNote: '【共依存警訊】強化其被害與奇幻思考妄想，會讓兩人與現實世界徹底脫節。',
        stats: { affection: 12, security: 2, boundary: -15 }
      },
      {
        text: '大笑嘲諷她：「都二十一世紀了還怕日食跟起霧？妳腦袋真的裝滿迷信耶！」',
        nextExpression: 'triggered',
        reply: '琉璃像被刺傷般猛然縮回手，躲進天鵝絨簾幕後再也不肯開口。',
        psychNote: '【防禦觸發】羞辱其知覺體驗會重演她童年受霸凌的創傷。',
        stats: { affection: -10, security: -14, boundary: -4 }
      }
    ]
  },

  han_xiao: {
    title: 'E08｜突發天災：午夜狂風暴雨與地下酒吧倒灌淹水',
    ambience: '湍急的水流聲、斷電警報器與玻璃酒瓶漂浮碰撞聲',
    narratorText: '午夜突發破紀錄的超大豪雨，排水系統瞬間崩潰，混濁的雨水順著階梯湍急灌入地下酒吧！韓梟在及踝的冰冷積水中面不改色地拉下總電源閘門，卻在轉身去撈吧台底層一只生鏽舊鐵盒時，被暗流沖倒的酒架砸中肩膀。',
    charLine: '他悶哼一聲，卻還握著那只舊鐵盒對趕下樓的你勾起嘴角：「水淹得比我想的快嘛。你怎麼不往高處跑，反而跳進水裡找我？不怕我拉你一起墊背？」',
    choices: [
      {
        text: '一言不發地涉水過去架起他的手臂，先幫他把鐵盒塞進防水袋：「少逞強了，手搭在我肩上，我們一起爬上安全梯！」',
        nextExpression: 'smile',
        reply: '韓梟看著你在冰冷積水中毫不猶豫撐住他的眼神，嘴角的痞笑第一次消失，反手緊緊扣住你的五指：「……這輩子還沒人敢這樣救我。這條命，算你贏去了。」',
        psychNote: '【突發天災羈絆】不被他的挑釁話術干擾，以果斷行動接住他罕見的狼狽與真實軟肋。',
        stats: { affection: 14, security: 16, boundary: 10 }
      },
      {
        text: '一邊幫他按住肩膀傷口止血，一邊打趣他：「韓老闆連逃命都要救這個小鐵盒，看來你也沒有自己說的那麼冷血無情嘛。」',
        nextExpression: 'vulnerable',
        reply: '韓梟耳根微熱地別過頭：「……裡面裝的只是以前老街友留給我的破打火機而已，少囉嗦。」',
        psychNote: '【突發天災羈絆】溫和點破他冰冷偽裝下的重情義，讓他卸下防備。',
        stats: { affection: 12, security: 14, boundary: 9 }
      },
      {
        text: '哭著抱住他的腿不肯走：「水淹上來也沒關係，就算淹死我也要跟你死在酒吧裡！」',
        nextExpression: 'anxious',
        reply: '韓梟皺起眉頭，一把將你扛上肩頭推上樓梯：「別犯傻，我最討厭別人拿命來情緒勒索。」',
        psychNote: '【界線失衡】失去理智的自我毀滅式討好，反而無法贏得他的尊重。',
        stats: { affection: 4, security: -4, boundary: -14 }
      },
      {
        text: '站在乾爽的樓梯口冷眼看他：「誰叫你平時愛玩火，現在酒吧淹水也是現世報吧！」',
        nextExpression: 'triggered',
        reply: '韓梟眼神瞬間冷得像冰刀，獨自撐著牆走出積水，與你擦肩而過時連看都沒看你一眼。',
        psychNote: '【防禦觸發】落井下石會徹底印證他「人性本惡、唯有強者生存」的叢林信念。',
        stats: { affection: -12, security: -14, boundary: -4 }
      }
    ]
  },

  su_fei: {
    title: 'E08｜突發天災：劇烈落雷與狂風吹裂畫室天窗',
    ambience: '震耳欲聾的雷鳴、天窗玻璃碎裂聲與傾盆大雨',
    narratorText: '傍晚的雷暴雲壓在頭頂，一道慘白的閃電劈中頂樓避雷針，緊接著十級狂風將畫室天窗震裂！大雨傾盆灌下，蘇緋尖叫一聲，竟然不顧滿地碎玻璃，赤著腳撲過去用自己的身體護住那幅畫著你們兩人的未乾油畫！',
    charLine: '「不能淋濕！要是連這幅畫都糊掉了，你是不是也要像這場雨一樣離開我了？！{player}，雷聲好大，抱緊我，發誓你絕對不會丟下我！」',
    choices: [
      {
        text: '立刻拿防水畫布幫她蓋好畫作，再一把將她抱離碎玻璃區：「畫我幫妳護住了，妳的腳比畫更重要！我在這裡，雷停之前我都會抱著妳。」',
        nextExpression: 'smile',
        reply: '蘇緋在你懷裡渾身發抖，滾燙的眼淚浸濕了你的領口，哭聲卻漸漸平息下來：「……你先救了我的畫，又救了我……原來我不用流血也能被你抱緊。」',
        psychNote: '【突發天災羈絆】同時照顧她的情感象徵物與人身安全，給予極高安全感與健康保護界線。',
        stats: { affection: 14, security: 16, boundary: 10 }
      },
      {
        text: '用大毛巾包裹住她冰冷的身體，握著她的手一起把畫架搬到乾燥的內室。',
        nextExpression: 'smile',
        reply: '看著完好無損的畫布與你忙碌的身影，蘇緋破涕為笑，乖巧地靠在你肩上：「有你在，連暴風雨都沒那麼可怕了。」',
        psychNote: '【突發天災羈絆】以穩定的合作行動帶領她走出恐慌閃回。',
        stats: { affection: 12, security: 14, boundary: 9 }
      },
      {
        text: '陪她一起踩在碎玻璃與大雨裡痛哭發誓：「我發誓！我現在就把所有朋友都封鎖，這輩子只當妳一個人的俘虜！」',
        nextExpression: 'vulnerable',
        reply: '蘇緋緊緊勒住你的脖子，眼神狂熱而脆弱：「這可是你說的……誰都不准把你從我身邊搶走。」',
        psychNote: '【共依存警訊】捲入她的情緒風暴並放棄健康人際邊界，會加速走向病態共生。',
        stats: { affection: 15, security: 4, boundary: -18 }
      },
      {
        text: '生氣地吼她：「不過是一張畫而已，妳為了一張畫連鞋子都不穿，是不是瘋了啊！」',
        nextExpression: 'triggered',
        reply: '蘇緋在雷光中臉色慘白：「在你眼裡，我們兩個人的記憶……就只是一張破畫嗎？」',
        psychNote: '【防禦觸發】否定她的依附象徵物並吼叫指責，會造成劇烈的被拋棄創傷。',
        stats: { affection: -12, security: -16, boundary: -4 }
      }
    ]
  },

  xia_le: {
    title: 'E08｜突發天災：異常高溫焚風與小劇場跳電危機',
    ambience: '空調停擺的悶熱喘息聲、緊急照明燈閃爍與扇風聲',
    narratorText: '夏季罕見的焚風席捲城市，室外飆破四十度高溫，小劇場卻在此時因全區電網超載而徹底跳電！舞台聚光燈與冷氣瞬間熄滅，在悶熱幽暗的排練室裡，汗水很快弄花了夏樂精心畫好的舞台妝。',
    charLine: '他慌張地背過身捂住臉，聲音在黑暗中帶著哭腔：「不要過來！也沒燈光、妝也花了、連頭髮都濕答答地貼在額頭上……現在這麼醜、這麼狼狽的我，一點都不值得你看！」',
    choices: [
      {
        text: '拿出手帕與冰鎮礦泉水貼在他汗濕的臉頰上，溫柔地說：「有沒有聚光燈都沒關係。流著汗努力排練的夏樂，比海報上修過圖的大明星還要迷人。」',
        nextExpression: 'smile',
        reply: '夏樂怔怔地放下手，露出臉頰上淺淺的小雀斑，眼眶泛紅地笑了起來：「……你真的不嫌棄沒打光的我嗎？那、那我要把這瓶水當成你頒給我的最佳男主角獎盃！」',
        psychNote: '【突發天災羈絆】在失去外在光環與妝容的危機中，肯定他真實素樸的自我價值。',
        stats: { affection: 14, security: 16, boundary: 9 }
      },
      {
        text: '推開排練室通往露台的逃生窗引進夜風，拿劇本幫他搧風聊起小時候的趣事。',
        nextExpression: 'smile',
        reply: '涼風吹散了悶熱，夏樂放鬆地坐在地板上靠著你的膝蓋：「跟你這樣在暗處吹風聊天，好像比在台上謝幕還要舒服耶。」',
        psychNote: '【突發天災羈絆】引導他體驗「不必時刻表演也能享受親密」的放鬆感。',
        stats: { affection: 12, security: 14, boundary: 8 }
      },
      {
        text: '立刻拿十支手機幫他打光並誇張吹捧：「誰說妝花了！你現在就算流汗也是全宇宙最完美的神仙下凡，快繼續演給我一個人看！」',
        nextExpression: 'smile',
        reply: '夏樂雖然破涕為笑繼續擺姿勢，卻也更害怕一旦燈光熄滅就會失去你的愛。',
        psychNote: '【共依存警訊】持續強化「唯有完美表演才值得被愛」的條件式自尊。',
        stats: { affection: 10, security: 2, boundary: -12 }
      },
      {
        text: '嫌棄地退開一步：「真的熱死人了，而且你眼線暈開像熊貓一樣超好笑的！」',
        nextExpression: 'triggered',
        reply: '夏樂瞬間像被抽乾了所有力氣，抱著膝蓋縮進布幕後再也不肯露面。',
        psychNote: '【防禦觸發】對外貌狼狽的嘲笑會直接擊穿做作型最脆弱的自尊防線。',
        stats: { affection: -12, security: -15, boundary: -4 }
      }
    ]
  },

  gu_qingcheng: {
    title: 'E08｜突發天災：瞬間冰雹與十級強陣風襲擊高樓',
    ambience: '冰雹密集砸擊防爆玻璃的巨響、高樓風切聲與電梯停駛廣播',
    narratorText: '午後對流雲系突變，乒乓球大小的瞬間冰雹夾帶十級強陣風猛烈砸向建築事務所的頂樓落地窗！整棟摩天大樓的風阻尼器微微擺動，電梯因安全機制全面停駛，孤傲的顧傾城站在劇烈作響的玻璃幕牆前，指節捏得發白。',
    charLine: '「這棟大樓的抗風係數是我親自審核的，絕對不會有事……」她嘴上維持著女王般的鎮定，卻在下一記雷鳴冰雹砸中窗面時微微晃了晃，高跟鞋踩在地毯上竟有些站不穩。',
    choices: [
      {
        text: '自然地走過去挽住她的手臂，帶她退到內側沙發並遞上一條披肩：「大樓結構當然是滿分，但總建築師本人也需要避風港。先坐下來喝口熱紅酒，我陪妳等風停。」',
        nextExpression: 'smile',
        reply: '顧傾城順著你的力道坐下，緊繃的後背終於靠進沙發裡，反手握住你的手指：「……算你體貼，知道再堅固的鋼骨也需要緩衝墊。」',
        psychNote: '【突發天災羈絆】在不折損她專業驕傲的前提下，給她一個體面卸下武裝的台階。',
        stats: { affection: 14, security: 16, boundary: 9 }
      },
      {
        text: '陪她一起檢視大樓數位監測螢幕上的阻尼器數據，誇讚她設計的減震結構果然穩如泰山。',
        nextExpression: 'smile',
        reply: '看著螢幕上平穩的綠色曲線，顧傾城嘴角重新揚起自信的弧度：「那是自然，有你在旁邊見證，這場冰雹也算沒白下。」',
        psychNote: '【突發天災羈絆】透過客觀專業數據安撫她對失控的潛在焦慮。',
        stats: { affection: 12, security: 14, boundary: 8 }
      },
      {
        text: '跪在沙發邊幫她脫高跟鞋揉腳：「女王大人受驚了！都是這場破冰雹不好，您把氣都出在我身上吧！」',
        nextExpression: 'neutral',
        reply: '顧傾城居高臨下地看著你：「算你識相，以後只要我心情不好，你就隨傳隨到。」',
        psychNote: '【共依存警訊】矮化自我的奴僕式討好，會讓關係徹底失去平等尊重。',
        stats: { affection: 10, security: 2, boundary: -15 }
      },
      {
        text: '拆穿她的逞強：「妳明明嚇得腿都在抖了，還裝什麼冷靜大建築師啊？」',
        nextExpression: 'triggered',
        reply: '顧傾城眼神瞬間冷如冰霜，甩開你的手獨自走進內室反鎖房門。',
        psychNote: '【防禦觸發】當面羞辱她的脆弱會觸發強烈的自戀暴怒與防禦封鎖。',
        stats: { affection: -12, security: -15, boundary: -4 }
      }
    ]
  },

  wen_yan: {
    title: 'E08｜突發天災：連日梅雨土石警戒與除濕機短路危機',
    ambience: '窗外滂沱梅雨聲、手機防災警報長鳴與除濕機警示音',
    narratorText: '連日破紀錄的梅雨讓山坡地發布了黃色警戒，驚人的濕氣灌進圖書修復室。偏偏此時大型防潮箱與除濕機因電壓不穩突然短路冒出白煙，溫言為了搶救桌上攤開的明代孤本詩集，急得眼眶泛紅、手忙腳亂。',
    charLine: '「糟了、糟了！濕度已經飆破百分之八十五了，紙頁纖維正在膨脹……都是我太沒用了，連機器故障都處理不好，如果這批書毀在我手裡，我還有什麼臉見人……」',
    choices: [
      {
        text: '先俐落地拔掉短路插頭、打開備用防潮劑與無酸吸水紙，溫和而堅定地握住他的手：「溫言，看我！書頁沒有受損，你剛剛第一時間護住孤本的動作非常專業！」',
        nextExpression: 'smile',
        reply: '溫言看著妥善收進密封箱的古籍，急促的呼吸終於平復下來，眼角微濕地看著你：「……還好有你在。每次我快被自責淹沒的時候，都是你的聲音把我拉上岸。」',
        psychNote: '【突發天災羈絆】以具體救援行動加上明確的正向肯定，打斷畏避型的災難化自責迴圈。',
        stats: { affection: 14, security: 16, boundary: 9 }
      },
      {
        text: '分工合作：由他發揮專業將古籍逐頁夾入吸水宣紙，你負責聯絡總務處更換備用除濕機。',
        nextExpression: 'smile',
        reply: '一旦進入熟悉的修復工序，溫言的手不再發抖，感激地對你微笑：「謝謝你讓我發現，原來我還是有能做好的事。」',
        psychNote: '【突發天災羈絆】賦予他可控的專業任務，幫助他重拾自我效能感。',
        stats: { affection: 12, security: 14, boundary: 9 }
      },
      {
        text: '把溫言推到旁邊：「你別動了免得越幫越忙，以後修復室大大小小的事全部由我一個人包辦！」',
        nextExpression: 'anxious',
        reply: '溫言低著頭縮在角落：「……對不起，我果然只會添亂。」',
        psychNote: '【界線失衡】過度代勞反而印證了他「自己毫無用處」的負面核心信念。',
        stats: { affection: 4, security: -6, boundary: -12 }
      },
      {
        text: '皺眉責備他：「除濕機平常怎麼沒檢查？出事了只會緊張道歉有什麼用！」',
        nextExpression: 'triggered',
        reply: '溫言臉色慘白地退後兩步，深吸一口氣後鞠躬逃出了修復室。',
        psychNote: '【防禦觸發】嚴厲批評會直接誘發畏避型的逃避防衛。',
        stats: { affection: -10, security: -15, boundary: -4 }
      }
    ]
  },

  bai_xiaolu: {
    title: 'E08｜突發天災：霸王級寒流來襲與全區水管凍裂停水',
    ambience: '北風呼嘯聲、冰霜凝結窗玻璃與廚房計時器的滴答聲',
    narratorText: '五十年一遇的霸王級寒流在清晨急凍整座城市，咖啡廳後廚的水管因低溫凍裂而全面停水，連暖氣管線也跟著罷工。白小鹿站在冰窖般的廚房裡，看著一籃還沒清洗的草莓與訂單，凍紅的雙手抖個不停。',
    charLine: '「怎麼辦……水龍頭一滴水都流不出來，手好凍、腦袋也一片空白……{player}，如果今天做不出草莓塔，客人跟店長一定會覺得我很沒用、不要我了對不對？快告訴我現在該怎麼辦……」',
    choices: [
      {
        text: '先把自己的厚圍巾圍在她脖子上，再把兩瓶飲用水和烤盤擺在她面前：「別怕，我們今天不洗草莓，改烤『不用水的焦糖杏仁酥餅』好不好？配方由小鹿主廚決定！」',
        nextExpression: 'smile',
        reply: '白小鹿摸著溫暖的圍巾，眼睛突然亮了起來：「對耶！杏仁酥餅不用洗水果，而且烤箱開起來廚房就會變暖和了！{player}，我馬上來調麵團！」',
        psychNote: '【突發天災羈絆】先給予溫暖安撫，再引導依賴型運用自身專業做出替代決策，建立獨立自信。',
        stats: { affection: 14, security: 16, boundary: 12 }
      },
      {
        text: '陪她一起用保溫瓶裡的溫水化開結凍的毛巾，一步步列出停水時的簡單應變步驟讓她勾選。',
        nextExpression: 'smile',
        reply: '小鹿看著清楚的小步驟，深吸一口氣露出笑容：「原來一步一步慢慢來，我也可以自己處理好！」',
        psychNote: '【突發天災羈絆】拆解危機步驟，陪伴而不代勞。',
        stats: { affection: 12, security: 14, boundary: 10 }
      },
      {
        text: '把她抱到椅子上坐好：「妳乖乖坐著別動！從揉麵團到寫公告全部我一個人做，妳以後什麼都不用想！」',
        nextExpression: 'smile',
        reply: '小鹿依戀地抱著你的外套：「太好了……只要有{player}在，我這輩子都不用長大了。」',
        psychNote: '【共依存警訊】全面剝奪她面對挫折與解決問題的機會，加深病態依賴。',
        stats: { affection: 14, security: 4, boundary: -18 }
      },
      {
        text: '冷淡地說：「停水這種小事也要問我？妳都幾歲了還不會自己想辦法嗎？」',
        nextExpression: 'triggered',
        reply: '白小鹿眼淚瞬間決堤，蹲在冰冷的地板上不敢出聲。',
        psychNote: '【防禦觸發】在恐慌時刻給予拋棄式指責，會讓依賴型陷入徹底的無助崩潰。',
        stats: { affection: -10, security: -15, boundary: -4 }
      }
    ]
  },

  ji_yan: {
    title: 'E08｜突發天災：滯留鋒面大雷雨致全城交通癱瘓',
    ambience: '暴雨傾盆聲、地下道封閉廣播與懷錶秒針聲',
    narratorText: '午後滯留鋒面降下破紀錄的致災性大雷雨，市區地下道積水封閉、捷運與公車全線停駛！紀嚴原本精確到分鐘的研討會與實驗室行程表徹底報銷。被困在車站廊柱下的他，看著手錶指針一分一秒流逝，白皙的臉龐緊繃得像快要斷裂的弦。',
    charLine: '「15:00 的審查會遲到了，16:30 的樣本恆溫檢查也趕不回去……所有的備案都因為這場不在預測模型裡的暴雨失效了。一旦時程脫軌，後面的一切都會失控……」',
    choices: [
      {
        text: '握住他冰冷僵硬的右手，幫他撥通實驗室代理人的電話確認樣本已自動轉入備用電源：「紀嚴，樣本很安全。今天老天爺強制全城放假，我們允許日程表留白兩個小時，好嗎？」',
        nextExpression: 'smile',
        reply: '聽見電話那頭確認安全的回報，紀嚴劇烈起伏的胸口終於緩緩吐出一口長氣，反手握住你的掌心：「……留白兩個小時嗎？只要你在旁邊，這兩個小時的誤差，我可以承受。」',
        psychNote: '【突發天災羈絆】先協助解除實質風險，再溫柔引導強迫型體驗「計畫被打亂也不會毀滅」的彈性。',
        stats: { affection: 14, security: 16, boundary: 10 }
      },
      {
        text: '拿出筆記本陪他一起制定「暴風雨臨時時刻表」，把「在超商喝熱薑茶避雨 45 分鐘」正式寫進第 1 項。',
        nextExpression: 'smile',
        reply: '紀嚴看著筆記本上工整的「避雨行程」，鏡片後的眼神柔和了下來：「既然已列入正式議程，那就按表執行喝薑茶吧。」',
        psychNote: '【突發天災羈絆】用他熟悉的「結構化框架」包裝休息與放鬆，巧妙化解失控焦慮。',
        stats: { affection: 12, security: 14, boundary: 9 }
      },
      {
        text: '陪他一起冒著齊膝的暴雨水流硬闖封鎖線走回研究室：「不管多危險我都陪你硬走回去，絕對不讓你的時刻表晚一秒！」',
        nextExpression: 'anxious',
        reply: '兩人淋成落湯雞還差點滑倒，紀嚴看著發抖的你，內心反而更加自責與緊繃。',
        psychNote: '【共依存警訊】盲目配合僵化的強迫規則而忽視現實安全，並非健康的陪伴。',
        stats: { affection: 8, security: 0, boundary: -14 }
      },
      {
        text: '翻白眼說：「下大雨塞車又不是世界末日，你在那邊神經兮兮唸什麼時間表，煩不煩啊！」',
        nextExpression: 'triggered',
        reply: '紀嚴推了推眼鏡，眼神瞬間封閉：「道不同不相為謀，你先請便吧。」',
        psychNote: '【防禦觸發】羞辱其秩序感需求會讓他立刻築起高牆。',
        stats: { affection: -10, security: -14, boundary: -4 }
      }
    ]
  },

  lu_qinglan: {
    title: 'E08｜突發天災：盛夏熱浪跳電與電窯冷卻斷電警報',
    ambience: '刺耳的斷電蜂鳴器、熱浪蟬鳴與急促的心跳聲',
    narratorText: '盛夏午後的極端熱浪導致老舊街區變電箱跳電，陶藝工坊裡正在進行降溫控制的電窯突然發出刺耳的斷電蜂鳴警報！高頻噪音與悶熱瞬間誘發了陸晴嵐腦傷後的前庭暈眩與感官超載，她痛苦地按住右額角的疤痕蹲在窯爐旁。',
    charLine: '「蜂鳴器一直叫、頭好痛、好吵……要是溫度掉太快，裡面的青瓷全都會裂開！為什麼我連關個警報器都站不穩……以前的我明明在急診室聽八台儀器叫都不會暈的！」',
    choices: [
      {
        text: '第一時間關掉刺耳的蜂鳴器、用石棉毯包覆窯體保溫，再蹲下來把冰毛巾敷在她後頸：「窯已經包好保溫了！晴嵐，閉上眼睛聽我的呼吸，不用跟以前的急診室比，現在有我幫妳擋著噪音。」',
        nextExpression: 'smile',
        reply: '刺耳的聲音消失後，晴嵐靠在你懷裡大口喘氣，眼角滑下淚水卻露出了安心的笑容：「……你的聲音比任何止痛藥都有效。謝謝你沒有嫌現在的我麻煩。」',
        psychNote: '【突發天災羈絆】迅速移除感官超載源（噪音與高熱），並接納她腦傷後的生理限制。',
        stats: { affection: 14, security: 16, boundary: 10 }
      },
      {
        text: '扶她到通風的陰涼長椅坐下，笑著安慰她：「就算青瓷真的多了一道冰裂紋，剛好又能讓金繼大師發揮拿手絕活啦！」',
        nextExpression: 'smile',
        reply: '晴嵐愣了一下，隨即破涕為笑：「對喔！裂開了就補上金箔，這可是我的招牌呢！」',
        psychNote: '【突發天災羈絆】以幽默正向重構，幫助她從挫折自責中抽離。',
        stats: { affection: 12, security: 14, boundary: 9 }
      },
      {
        text: '嚴肅地沒收她的工坊鑰匙：「妳有腦傷後遺症太危險了，以後不准妳再碰陶藝窯爐，乖乖在家當被我照顧的病人！」',
        nextExpression: 'vulnerable',
        reply: '晴嵐看著空空的雙手，眼神一點一點黯淡下去：「……連唯一能讓我覺得自己還活著的陶土，也要收走嗎？」',
        psychNote: '【共依存警訊】過度醫療化與保護性剝奪，會摧毀她的生命自主感。',
        stats: { affection: 4, security: -6, boundary: -16 }
      },
      {
        text: '捂著耳朵抱怨：「這警報聲也太吵了吧，妳自己開工坊怎麼連不斷電系統都沒裝好？」',
        nextExpression: 'triggered',
        reply: '晴嵐咬著嘴唇強撐著站起來，臉色蒼白地別過頭不讓你看見她的眼淚。',
        psychNote: '【防禦觸發】在生理不適與挫折時加以指責，會加深她的自我否定。',
        stats: { affection: -10, security: -14, boundary: -4 }
      }
    ]
  },

  you_ziqian: {
    title: 'E08｜突發天災：春日強烈沙塵暴吹垮咖啡廳遮陽棚',
    ambience: '狂風呼嘯聲、金屬棚架倒塌聲與玻璃風鈴急響',
    narratorText: '春日午後突如其來的強烈沙塵暴與八級陣風，瞬間將咖啡廳門口的露天遮陽棚吹翻！游子謙為了護住門口的盆栽與招牌，手背被斷裂的金屬支架劃出一道深深的血痕，但他卻把手藏在圍裙後面，滿臉沙土還對衝出來的你露出無懈可擊的微笑。',
    charLine: '「哎呀，今天的風真是熱情呢～遮陽棚壞了剛好可以曬太陽，我的手也完全沒事喔，一點都不痛！{player}你快進屋裡喝咖啡，這種粗活交給我這個小店員自己收就好啦～」',
    choices: [
      {
        text: '不聽他的客套話，直接握住他藏在身後流血的手腕拉進店裡拿急救箱：「別笑了！手都流血了還說不痛，現在換我照顧游店長，痛的話可以直接皺眉喊痛！」',
        nextExpression: 'vulnerable',
        reply: '當碘酒碰到傷口時，游子謙嘴角的假笑終於垮了下來，眼眶紅紅地小聲吸了吸鼻子：「……其實真的超級痛的啦，而且我最喜歡的迷迭香盆栽還被風吹破了……謝謝你拉住我的手。」',
        psychNote: '【突發天災羈絆】溫柔識破他「報喜不報憂」的假面，允許他在受傷時展現真實的脆弱與疼痛。',
        stats: { affection: 14, security: 16, boundary: 10 }
      },
      {
        text: '先幫他包紮好傷口，再拿掃把主動把門口吹倒的棚架與碎盆栽收拾乾淨，不讓他單獨硬撐。',
        nextExpression: 'smile',
        reply: '游子謙站在玻璃門後看著你替他撐起殘局的背影，眼神裡滿是真誠的溫柔：「原來不用我自己一個人假裝沒事硬扛，是這麼安心的感覺。」',
        psychNote: '【突發天災羈絆】以實際分擔行動取代口頭客套，融化他的孤立防衛。',
        stats: { affection: 12, security: 14, boundary: 9 }
      },
      {
        text: '心疼地說：「以後你什麼都不用做！就算你想把店砸了或每天躺著擺爛，我也養你一輩子！」',
        nextExpression: 'smile',
        reply: '游子謙彎起眼睛笑得有些狡黠：「那我以後都不開店了，天天等你伺候我囉～」',
        psychNote: '【共依存警訊】無底線縱容消極依附，會侵蝕雙方的健康責任界線。',
        stats: { affection: 10, security: 2, boundary: -14 }
      },
      {
        text: '信以為真地點頭：「既然你說完全沒事，那門口那些破盆栽跟棚架就交給你慢慢掃囉，我先回去了！」',
        nextExpression: 'triggered',
        reply: '游子謙站在風沙裡，臉上的微笑徹底僵硬，心裡狠狠記下了一筆被忽視的怨懟。',
        psychNote: '【防禦觸發】忽視他明顯的傷口與求救訊號，會讓他更加確信沒人真心在乎他。',
        stats: { affection: -10, security: -14, boundary: -2 }
      }
    ]
  }
};

// ==================== 12 角色專屬：E07(防衛反撲)、E10(雙人羈絆分水嶺)、E11(核心危機)、E13(第一人稱童年傾訴)、E14(最終約會) ====================
export const CHARACTER_BESPOKE_STORY_NODES = {
  shen_mo: {
    e07: {
      title: 'E07｜防衛反撲：被退回的備用磁卡',
      prompt: '因為前幾天相談甚歡，沈墨反而在隔天傍晚刻意迴避你的視線，在走廊攔住你，將頂樓工作室的備用通行磁卡退還給你。',
      charLine: '「我們走得太近了。當一個人成為我的軟肋，暗處的敵人就會從你下手。這張磁卡你先收回去，離我遠一點對你比較安全。」',
      choices: [
        { text: '雙手接過磁卡放進口袋：「好，磁卡我先幫你收著。等你哪天確認周圍夠安全了，隨時可以再交給我，我都在。」', reply: '沈墨怔怔看著你平靜清澈的眼神，緊繃的下顎微不可察地鬆動：「……你總是讓我算不準下一步。」', psychNote: '賦予妄想型個體控制距離的主導權與隨時回頭的安全感，能有效緩解其親密恐慌。', stats: { affection: 12, security: 15, boundary: 10 } },
        { text: '與他約定改用「每天固定晚上九點傳一個句號」的方式報平安，不強行上頂樓。', reply: '他點了點頭，耳根微紅：「九點整，誤差不超過三十秒。這個通訊協定我接受。」', psychNote: '以結構化、可預測的輕量聯繫代替高壓親密，尊重他的防禦邊界。', stats: { affection: 10, security: 12, boundary: 9 } },
        { text: '把磁卡硬塞回他手裡：「我不怕危險！我以後二十四小時都睡在你門口當你的保鑣，誰都不准把我們分開！」', reply: '沈墨眼底閃過一絲偏執的動搖：「……既然是你自己要留下來的，那以後連半步都不准離開我的監控範圍。」', psychNote: '【共依存警訊】無底線的自我犧牲會強化其控制與監視防衛。', stats: { affection: 14, security: 4, boundary: -16 } },
        { text: '生氣地把磁卡丟在地上：「一下給我一下又收回，你把我當什麼了？愛信不信隨便你！」', reply: '沈墨眼神瞬間結冰，默默撿起磁卡轉身鎖死頂樓鐵門。', psychNote: '激烈的指責會印證他「親密必然帶來背叛與傷害」的預期。', stats: { affection: -10, security: -14, boundary: -4 } }
      ]
    },
    e10: {
      title: 'E10｜雙人秘密：暗房紅光下的未公開底片（邊界分水嶺）',
      prompt: '夜深人靜時，沈墨第一次邀請你走進他從不讓外人踏入的沖印暗房。暗紅色的安全燈下，他正在沖洗一排黑白底片，裡面全是他這幾個月在天台無意間拍下的你的側影。',
      charLine: '「起初我拍下你，是為了交叉比對你的動線有沒有異常……但洗出來之後我才發現，每次鏡頭對準你，我的焦距就再也移不開了。{player}，你要命令我把這些底片銷毀嗎？」',
      choices: [
        { text: '微笑拿起夾子幫他把底片掛上晾乾繩：「不用銷毀，但從今天起，想拍我的話可以直接開口，我會看著你的鏡頭笑。」', reply: '暗紅燈光下，沈墨的臉頰浮現罕見的紅暈，低聲應道：「……好，以後我只光明正大地拍你。」', psychNote: '【分水嶺：通往 True End】溫和建立隱私邊界，同時接納他笨拙的深情，將「暗中觀察」轉化為「對等凝視」。', stats: { affection: 15, security: 18, boundary: 15 } },
        { text: '挑選其中一張你最喜歡的黑白照片，在背面簽上日期送給他當作護身符。', reply: '他小心翼翼地將那張照片收進貼身皮夾內側：「這是我收過最珍貴的合法證物。」', psychNote: '將猜疑的產物轉化為信任的信物，鞏固安全依附。', stats: { affection: 13, security: 15, boundary: 10 } },
        { text: '羞怯地說：「你可以隨便偷拍我，甚至在我房間裝攝影機也沒關係，我的一切都歸你管！」', reply: '他呼吸一滯，眼神變得幽暗而危險：「這可是你親口授權的。」', psychNote: '【分水嶺：通往 Codependent End】主動放棄隱私底線會讓關係滑向全面監控的泥淖。', stats: { affection: 20, security: 5, boundary: -25 } },
        { text: '生氣地把底片全部扯下來曝光：「你居然偷拍我，簡直跟變態跟蹤狂沒兩樣！」', reply: '沈墨臉色慘白地站在曝光的廢片中，緩緩拉開暗房的門請你離開。', psychNote: '【分水嶺：通往 Trigger End】在他主動坦白並交出決定權時給予羞辱，會徹底斬斷信任連結。', stats: { affection: -18, security: -25, boundary: 0 } }
      ]
    },
    e11: {
      title: 'E11｜核心危機：財團黑客的全面反撲與栽贓',
      prompt: '沈墨追查多年的跨國洗錢案遭到對方買通網軍全面反撲，網路上出現大量偽造他收受賄賂的假截圖，連他的匿名信箱都塞滿威脅，整個人陷入極度緊繃的刺蝟狀態。',
      charLine: '「連當初跟我一起宣誓揭發真相的同夥都收錢背叛了我……{player}，看著我的眼睛告訴我，你留在這裡，真的沒有拿任何人的好處嗎？」',
      choices: [
        { text: '直視他布滿血絲的雙眼，將自己整理好的反證時間軸放在他桌上：「我唯一圖謀的，就是你平安活著。懷疑我也沒關係，我們用證據說話。」', reply: '沈墨看著那疊熬夜整理的反證資料，眼眶終於泛紅，緊緊握住你的手腕：「……對不起，我明明知道只有你不會背叛我。」', psychNote: '接納他在創傷重演時的猜忌反應，並以實際行動與客觀事實成為他的定海神針。', stats: { affection: 14, security: 16, boundary: 10 } },
        { text: '泡一杯溫熱的黑咖啡放在他手邊，安靜陪他一起追查偽造截圖的原始 IP。', reply: '在鍵盤敲擊聲中，他的呼吸逐漸平穩下來：「有你在旁邊盯著螢幕，我的腦袋清醒多了。」', psychNote: '穩定並肩作戰的陪伴，比空泛的口頭保證更能安撫妄想型焦慮。', stats: { affection: 12, security: 14, boundary: 9 } },
        { text: '為了證明清白，發誓從此斷絕與外界所有人的聯繫，把自己鎖在他房裡足不出戶。', reply: '他緊緊抱住你：「這樣最好，只要我們與世隔絕，就沒人能收買你了。」', psychNote: '【共依存警訊】以自我囚禁來換取他的信任，會形成封閉的雙人妄想孤島。', stats: { affection: 14, security: 5, boundary: -18 } },
        { text: '失望地摔門離開：「我陪了你這麼久，你居然還懷疑我收錢？那你自己一個人扛吧！」', reply: '他在黑暗中發出一聲苦澀至極的低笑：「果然……最後還是只剩我一個。」', psychNote: '在他最脆弱的恐慌時刻抽身離去，會再次印證其被背叛的宿命感。', stats: { affection: -15, security: -20, boundary: 0 } }
      ]
    },
    e13: {
      title: 'E13｜過去的房間：泰迪熊裡的微型錄音筆',
      prompt: '在卸下所有心防後，沈墨第一次帶你打開他頂樓保險箱最底層的生鏽鐵盒，裡面裝著一隻肚子被縫補過的舊泰迪熊與一捲泛黃的微型錄音帶。',
      charLine: '「八歲那年，我以為媽媽睡前哄我喝熱牛奶的擁抱是愛，隔天卻在法庭擴音器裡聽見自己的童音被拿來毀掉爸爸；而爸爸送我的這隻泰迪熊肚子裡，縫著監視我的錄音筆……16 歲那年連我最好的朋友都把我的秘密賣給校刊。{player}，在遇見你之前，我以為『相信一個人』就等於把刀柄遞給對方刺死自己。」',
      choices: [
        { text: '溫柔地替那隻舊泰迪熊繫上一條乾淨的緞帶，再緊緊抱住眼前的他：「那個八歲的小男孩已經長大了，從今以後，我的擁抱裡永遠不會有錄音筆，只有體溫。」', reply: '沈墨將臉深深埋進你的頸窩，壓抑了二十年的滾燙淚水終於滑落：「……謝謝你讓我知道，原來卸下防備不會死，而是終於能活過來。」', psychNote: '【👑 終極成就解鎖】深刻同理其童年雙重背叛創傷，完成安全依附的矯正性情緒體驗。', stats: { affection: 16, security: 18, boundary: 12 } },
        { text: '握住他的手輕聲說：「謝謝你願意把這麼痛的秘密交給我。就算你偶爾還是會多心也沒關係，我們有一輩子的時間慢慢練習信任。」', reply: '他眼底閃爍著清澈的淚光，緊緊與你十指交扣：「這輩子，我只把軟肋交給你一個人保管。」', psychNote: '不要求他一夕抹除防衛本能，給予長期而有彈性的接納。', stats: { affection: 14, security: 16, boundary: 10 } },
        { text: '激動地說：「你爸媽跟那個朋友太可惡了！我現在就去幫你找他們算帳報仇！」', reply: '沈墨拉住你的手臂搖了搖頭：「過去的事我已經不在乎了，我現在只想守著你。」', psychNote: '雖然出於心疼，但過度激憤容易偏離他此刻需要被溫柔接住的情感需求。', stats: { affection: 8, security: 6, boundary: -4 } },
        { text: '嘆了口氣說：「都過去快二十年了，你也該放下童年陰影，別再拿小時候的事當藉口疑神疑鬼了吧。」', reply: '沈墨默默將鐵盒重新鎖回保險箱，眼神黯淡下來：「……是我不該提起的。」', psychNote: '輕視童年創傷的重量，會讓剛敞開的心門再度關上。', stats: { affection: -10, security: -14, boundary: -2 } }
      ]
    },
    e14: {
      title: 'E14｜最終約會：不設密碼的雙人黎明',
      prompt: '黎明時分的公寓交誼廳，晨曦染紅了天際。沈墨親手拆掉了頂樓門口的第二道警報器，將一把溫熱的純銅實體鑰匙放進你掌心。',
      charLine: '「我可能這輩子還是會習慣進餐廳先看逃生口、還是會比別人多心一點……但在你身邊，我願意練習把背交給你。{player}，你願意當我唯一的白帽共犯嗎？」',
      choices: [
        { text: '收下純銅鑰匙並與他十指緊扣：「我們不搞突然的驚喜，一輩子都坦率透明地向彼此預告愛意。」', reply: '沈墨眼底浮現前所未有的純粹笑意，在晨光中低頭輕吻你的指節：「一言為定，我的共犯。」', psychNote: '【終章共鳴】在尊重彼此性格特質與健康邊界的基礎上，締結真正的伴侶盟約。', stats: { affection: 15, security: 15, boundary: 12 } },
        { text: '把自己家的備用鑰匙也放進他手心：「那我們互相交換鑰匙，去對方家之前都先敲三下門打暗號。」', reply: '他握緊那把鑰匙，嘴角溫柔上揚：「敲三下門——這是我聽過最浪漫的加密協定。」', psychNote: '既有親密共享，又保留了互相尊重的空間儀式。', stats: { affection: 14, security: 14, boundary: 12 } },
        { text: '把鑰匙丟掉說：「我們乾脆把門焊死，以後一秒鐘都不准分開！」', reply: '他深深地看著你，眼神既熾熱又沉重：「好，誰都別想離開。」', psychNote: '【共依存傾向】在終章依然選擇無界線的共生封閉。', stats: { affection: 12, security: 2, boundary: -16 } },
        { text: '猶豫著推開鑰匙：「我覺得壓力還是太大了，我們還是當普通鄰居比較輕鬆。」', reply: '沈墨收回手，禮貌而克制地點了點頭：「我尊重你的決定。」', psychNote: '退回安全而疏離的平行線距離。', stats: { affection: -8, security: -6, boundary: 4 } }
      ]
    }
  },

  lin_jianwei: {
    e07: {
      title: 'E07｜防衛反撲：反鎖三天的鐘錶工作間',
      prompt: '自從上次在工作室聊了許久後，林見微突然連續三天沒有上天台觀星，工作間門上掛著「精密校準中・請勿敲門」的木牌。傍晚你在走廊遇見出來拿信的她，她下意識往後退了半步。',
      charLine: '「我的腦內記憶體最近有百分之三十被關於你的雜訊佔用了，導致我修錶時算錯了一個齒輪比。{player}，人際連結真的會降低運轉效率，我們應該恢復最初的三公尺安全距離。」',
      choices: [
        { text: '主動退後半步停在三公尺線外，溫和地微笑：「好，那我們這週先開啟『省電靜音模式』，等你把齒輪校準好、想看星星的時候再敲兩下門找我。」', reply: '林見微愣了一下，清冷的冰藍眼眸微微閃動：「……你不生氣嗎？一般人被要求退後都會覺得受辱。謝謝你支援我的省電模式。」', psychNote: '完全尊重孤僻型對「退回獨處充電」的生理需求，不將其解讀為個人拒絕，反而能讓她安心再次靠近。', stats: { affection: 12, security: 15, boundary: 12 } },
        { text: '把一小罐鐘錶潤滑油放在信箱上：「那我不打擾妳，這罐油放這裡，祝妳校準順利。」', reply: '她拿起那罐潤滑油，輕聲說：「型號完全正確。星期五晚上十一點，天台見。」', psychNote: '低侵入性、高實用度的關懷最適合孤僻型特質。', stats: { affection: 10, security: 13, boundary: 10 } },
        { text: '直接拉住她的手不讓她退後：「不行！什麼三公尺距離，我每天都要進妳房間陪妳聊天，幫妳把孤僻的毛病治好！」', reply: '林見微像觸電般抽回手，眼神瞬間恢復成毫無溫度的冰霜：「請不要強行格式化我的系統。」', psychNote: '強行入侵獨處空間並試圖「矯正」孤僻特質，是最大的相處雷區。', stats: { affection: -10, security: -14, boundary: -14 } },
        { text: '受傷地冷笑：「原來我在妳心裡只是妨礙工作的雜訊？那我以後再也不理妳了！」', reply: '她看著你離去的背影，在筆記本上默默劃掉了雙人觀測的計畫：「……果然人類的情緒總是這麼難以預測。」', psychNote: '情緒化的指責會讓她更加確信人際關係充滿負擔。', stats: { affection: -8, security: -12, boundary: -4 } }
      ]
    },
    e10: {
      title: 'E10｜雙人秘密：凌晨三點的雙星觀測與無聲熱可可（邊界分水嶺）',
      prompt: '深秋凌晨三點，林見微敲了兩下你的房門，帶你走上無人的天台。她將赤道儀對準了天鵝座的輦道增七（Albireo）——那是一顆由金黃色與寶石藍組成的美麗雙星。',
      charLine: '「它們在宇宙中相距至少三十八光年，從不互相碰撞、也不會燒毀對方，卻在地球的望遠鏡裡永遠並肩發光。{player}，我沒辦法像世俗戀人那樣天天說情話，但我想和你在同一個軌道上運行，可以嗎？」',
      choices: [
        { text: '從目鏡裡看完那對金藍雙星，轉頭對她微笑：「三十八光年的並肩剛剛好。我們不需要黏在一起，也能成為彼此夜空裡最亮的雙星。」', reply: '林見微唇角揚起一抹極罕見、宛如初雪融化般的淺笑，主動伸出小指輕輕勾住你的小指三秒鐘：「雙星軌道契約，正式生效。」', psychNote: '【分水嶺：通往 True End】深刻理解並讚賞孤僻型獨有的「有距離卻恆久」的浪漫語言。', stats: { affection: 15, security: 18, boundary: 15 } },
        { text: '遞給她一杯溫熱的可可，兩人一句話也沒說，只是安靜地並肩坐到日出。', reply: '晨光亮起時，她輕聲說：「這是二十五年來，我第一次覺得兩個人的沉默比一個人的沉默更好聽。」', psychNote: '高質量的無聲陪伴是孤僻型最高等級的親密體驗。', stats: { affection: 14, security: 16, boundary: 12 } },
        { text: '趁機把她拉進懷裡要求：「既然喜歡我，那就把天文館的工作辭掉，以後我們每天待在同一個房間裡寸步不離！」', reply: '林見微在你懷裡眼神逐漸空洞：「如果那就是你想要的……我把望遠鏡收起來就是了。」', psychNote: '【分水嶺：通往 Codependent End】剝奪她的精神寄託與獨處空間，會讓她變成失去靈魂的木偶。', stats: { affection: 20, security: 5, boundary: -25 } },
        { text: '失望地嘆氣：「相距三十八光年算什麼談戀愛？妳根本只是想找個不吵妳的室友而已吧！」', reply: '林見微收回看向你的目光，重新轉向冰冷的星圖：「……抱歉，我的系統確實無法提供你需要的熱度。」', psychNote: '【分水嶺：通往 Trigger End】否定她竭盡全力表達的愛意形式，會讓她退回絕對孤獨。', stats: { affection: -18, security: -25, boundary: 0 } }
      ]
    },
    e11: {
      title: 'E11｜核心危機：家族學術酒會的強迫社交風暴',
      prompt: '林見微的父母回國舉辦大型天體物理學界酒會，強硬要求她盛裝出席並與各路名流寒暄應酬。站在衣香鬢影、喧囂刺耳的宴會廳角落，見微的臉色蒼白如紙，手指死死抓著懷錶鍊子，幾乎快要感官超載。',
      charLine: '「分貝數超過 78，每個人都在說沒有資訊量的客套話，母親剛剛又說我像一具沒有感情的木偶……{player}，我的核心溫度正在下降，我想離開這裡。」',
      choices: [
        { text: '立刻幫她向主辦方禮貌致意，牽起她的袖口帶她從側門溜上安靜的頂樓天台透氣：「我們現在就走，妳不需要為了向誰證明正常而勉強自己。」', reply: '逃離喧囂踏上夜風微涼的天台那刻，見微長長地舒了一口氣，額頭輕輕抵在你背上：「謝謝你帶我逃出高噪音區……你是我的防磁保護殼。」', psychNote: '在社交超載危機中替孤僻型守住界線並提供逃生出口，建立牢不可破的信任。', stats: { affection: 15, security: 16, boundary: 12 } },
        { text: '給她戴上降噪耳機播放白噪音，擋在她身前替她應付前來搭話的賓客。', reply: '隔著降噪耳機，見微安心地看著你的背影，緊繃的指節慢慢放鬆下來。', psychNote: '具體的感官屏蔽與人際緩衝能有效保護她的心理空間。', stats: { affection: 12, security: 14, boundary: 10 } },
        { text: '直接衝上台拿麥克風大罵她父母跟全場賓客，宣布以後見微跟全世界斷絕關係只跟你來往。', reply: '全場譁然，見微被幾十道視線同時注視，感官超載得更加嚴重。', psychNote: '製造戲劇化衝突反而讓極度討厭成為焦點的她承受更大壓力。', stats: { affection: 6, security: -6, boundary: -14 } },
        { text: '勸她忍耐一下：「那畢竟是妳爸媽，妳就笑一個跟大家敬酒寒暄幾句又不會少塊肉！」', reply: '見微眼神徹底黯淡下去，像一台被強制關機的機器般站在原地。', psychNote: '與她的原生家庭站在一起強迫她進行虛假社交，會造成深層背叛感。', stats: { affection: -12, security: -16, boundary: -6 } }
      ]
    },
    e13: {
      title: 'E13｜過去的房間：結冰的北極觀測站與滴答聲',
      prompt: '夜深時，林見微帶你走進她工作間最裡面的儲藏櫃，打開一只泛黃的木製儀器箱，裡面放著一只已經停擺的蘇聯製舊式觀測站掛鐘與一本七歲時的字帖。',
      charLine: '「我七歲到十四歲的時候，父母常為了追極光把我一個人留在北極圈的觀測站宿舍裡，一留就是半個月。剛開始我也會哭、會在窗戶上哈氣畫畫等他們回來；但每次他們回來，只會檢查我的體溫表跟作業，對我說『哭泣是最消耗熱量的無意義行為』。後來我就學會了——只要把心臟變成跟這座掛鐘一樣的黃銅齒輪，沒有期待，就永遠不會覺得冷了。」',
      choices: [
        { text: '用溫熱的雙手輕輕包住她握著舊掛鐘的手：「那個在雪地窗邊等大人的小女孩辛苦了。妳的心臟不是冰冷的齒輪，它只是在等一個不會嫌妳麻煩的人。」', reply: '林見微低頭看著交疊的雙手，一滴晶瑩的淚珠無聲地落在舊掛鐘玻璃面上：「……原來眼淚掉下來的時候，心裡反而會變暖。」', psychNote: '【👑 終極成就解鎖】溫柔接住她童年被情感忽視的創傷，讓她重新連結內在感受。', stats: { affection: 16, security: 18, boundary: 12 } },
        { text: '幫她一起把那只舊掛鐘清理乾淨，放進溫暖的檯燈光圈下：「以後想看雪或想看星星，都不必一個人等了，我陪妳。」', reply: '她輕輕靠在你的肩頭，低聲說：「嗯，我的觀測日誌裡，已經把你的名字寫在第一頁了。」', psychNote: '以穩定長情的陪伴改寫她孤獨的童年記憶。', stats: { affection: 14, security: 16, boundary: 10 } },
        { text: '氣憤地說：「妳爸媽太冷血了吧！我要帶妳去跟他們大吵一架討回公道！」', reply: '見微輕輕搖頭：「不需要消耗能量在過去的座標上，有現在就夠了。」', psychNote: '孤僻型偏好平靜接納而非激烈的情緒對抗。', stats: { affection: 6, security: 4, boundary: -4 } },
        { text: '隨口說：「原來妳小時候就被放生喔，難怪長大個性這麼冷淡孤僻。」', reply: '見微默默合上木箱鎖扣：「分析完畢，你可以回去了。」', psychNote: '將她的創傷貼上冷漠標籤會讓她立刻收回自我揭露。', stats: { affection: -12, security: -15, boundary: -4 } }
      ]
    },
    e14: {
      title: 'E14｜最終約會：刻在金錶背蓋上的永恆座標',
      prompt: '在雙子座流星雨降臨的夜晚，你們並肩坐在公寓交誼廳的躺椅上。林見微拿出一只她耗時三個月親手修復的鎏金古董懷錶，翻開背蓋遞給你。',
      charLine: '「背蓋內側我用微雕刀刻了我們第一次在天台相遇時的赤經與赤緯座標。{player}，宇宙一直在膨脹，但只要你敲兩下桌面，我的引力就永遠為你停留。」',
      choices: [
        { text: '在桌面上輕輕敲了兩下「叩、叩」，微笑著握住她的手：「收到訊號了。未來的每場流星雨，我們都一起在同一個座標觀測。」', reply: '流星劃過夜空的瞬間，林見微主動傾身，在你唇角落下一個輕如星光的吻。', psychNote: '【終章共鳴】以專屬於兩人的秘密通訊協定，達成健康而詩意的共生結局。', stats: { affection: 15, security: 15, boundary: 12 } },
        { text: '替她把懷錶鍊繫在胸前口袋，與她並肩仰望星空直到黎明。', reply: '她安心地閉上眼靠在你肩上，呼吸與懷錶的滴答聲完美同步。', psychNote: '尊重彼此節奏的靜謐陪伴。', stats: { affection: 14, security: 14, boundary: 10 } },
        { text: '要求她把懷錶送你，並立下每天必須擁抱十次、講滿一小時電話的規定。', reply: '她看著密密麻麻的規定，眼神有些疲憊卻還是點了頭。', psychNote: '【共依存傾向】過度的情感索求會壓縮孤僻型的呼吸空間。', stats: { affection: 8, security: -2, boundary: -14 } },
        { text: '搖搖頭說：「我還是比較嚮往熱熱鬧鬧的生活，我們當普通觀星室友就好。」', reply: '見微平靜地點了點頭：「理解，座標已更新為友好鄰居。」', psychNote: '尊重彼此需求差異，退回平行線。', stats: { affection: -6, security: -4, boundary: 6 } }
      ]
    }
  },

  ruri: {
    e07: {
      title: 'E07｜防衛反撲：逆位高塔牌的絕交預言',
      prompt: '這天傍晚你去畫室與古著店找星野琉璃時，發現她在門口灑了一圈白鹽，手裡捏著一張逆位的「高塔」塔羅牌，眼神既眷戀又驚恐地看著你。',
      charLine: '「不要跨過這條鹽線！昨晚紫微星被紅霧遮住了，牌面說只要人類離我太近，我的怪異氣場就會給對方帶來厄運……{player}，趁我還沒害你受傷之前，快點忘記我吧！」',
      choices: [
        { text: '停在鹽線外尊重她的界線，從口袋拿出一顆向日葵糖果放在鹽線上：「我不跨過去，但厄運是怕太陽的。等妳哪天算到吉時了，再親手把鹽線掃開讓我進去，好嗎？」', reply: '琉璃看著那顆金黃色的糖果，紫眸裡的淚水打著轉：「……你居然沒有笑我迷信，還用太陽糖果幫我改運……那我現在就再抽一張牌！」', psychNote: '不強行突破她的防禦儀式，而是用她能理解的溫暖象徵化解「自己會帶來厄運」的關係意念。', stats: { affection: 12, security: 15, boundary: 10 } },
        { text: '溫和地告訴她：「跟妳認識以來，我每天都很開心，這就是最真實的好運證據喔。」', reply: '她怯生生地探出半步：「真的嗎？原來我帶給你的是好運……」', psychNote: '以客觀溫暖的現實回饋修正其負面奇幻的思考。', stats: { affection: 10, security: 13, boundary: 9 } },
        { text: '直接衝過去抱住她大喊：「就算會遭到天譴詛咒我也認了，我們把全世界的門都封死，只活在妳的占卜世界裡！」', reply: '琉璃狂喜又慌張地緊抓著你：「好！我們一起逃離這個人類世界！」', psychNote: '【共依存警訊】附和其與現實隔絕的奇幻思考防衛，會加劇社會退縮。', stats: { affection: 14, security: 4, boundary: -16 } },
        { text: '一腳踩碎鹽線罵道：「什麼厄運詛咒，全部都是妳自己幻想出來的神經病藉口！」', reply: '琉璃尖叫一聲退回暗處，抓起天鵝絨布蓋住自己的頭瑟瑟發抖。', psychNote: '粗暴否定並羞辱其防衛信念，會造成嚴重的創傷恐慌。', stats: { affection: -12, security: -16, boundary: -6 } }
      ]
    },
    e10: {
      title: 'E10｜雙人秘密：不帶水晶與塔羅牌的黃昏散步（邊界分水嶺）',
      prompt: '週末黃昏，星野琉璃罕見地摘下了額頭上的紫水晶墜飾，也沒有帶任何塔羅牌與靈擺，只穿著一件簡單的米白針織衫站在公寓門口等你。',
      charLine: '「今天出門前，我沒有算吉凶方位……沒有水晶保護，街上的行人和車聲聽起來好大聲、好真實。{player}，如果我今天不做占星師，只當一個普通人，你願意牽著我的手走過這條街嗎？」',
      choices: [
        { text: '自然地牽起她微涼的手放進自己溫暖的外套口袋：「當然願意。不管妳戴不戴水晶，在我眼裡妳都是最特別、最真實的琉璃。」', reply: '琉璃感受著口袋裡的溫暖，眼睛彎成了漂亮的月牙：「原來不靠魔法保護，只靠你的手掌溫度，我也能勇敢走在陽光下。」', psychNote: '【分水嶺：通往 True End】鼓勵並陪伴她練習接觸真實世界，提供最穩固的現實安全感。', stats: { affection: 15, security: 18, boundary: 15 } },
        { text: '帶她去逛街角的植物花市，買一盆真正會開花的薰衣草送給她。', reply: '她抱著散發自然香氣的薰衣草盆栽，開心地蹭了蹭花瓣：「活著的植物，比水晶球更有生命力呢。」', psychNote: '透過五感真實體驗幫助她建立與現實世界的正向連結。', stats: { affection: 13, security: 15, boundary: 10 } },
        { text: '緊張地幫她把水晶跟罩衫全部穿戴回去：「外面普通人太邪惡了，妳絕對不能當普通人，只能當我一個人的神祕巫女！」', reply: '琉璃乖乖戴回水晶，重新退回了魔幻的面紗之後。', psychNote: '【分水嶺：通往 Codependent End】阻止她接觸現實世界以維持她對你的依賴。', stats: { affection: 20, security: 5, boundary: -25 } },
        { text: '打量她一眼說：「拿掉那些叮叮噹噹的飾品看起來總算正常多了，以後永遠不准再碰塔羅牌！」', reply: '琉璃臉色一白，覺得連過去的自己都被全盤否定了。', psychNote: '【分水嶺：通往 Trigger End】全盤否定她的審美與精神世界會讓她感到自我被抹殺。', stats: { affection: -18, security: -25, boundary: 0 } }
      ]
    },
    e11: {
      title: 'E11｜核心危機：市集上的惡意嘲笑與幻影重演',
      prompt: '社區文創市集上，幾個路過的年輕人對著琉璃的占星攤位指指點點，大聲嘲笑她是「神棍怪胎」，還故意碰倒了她的展示架。周圍刺耳的哄笑聲讓琉璃瞬間陷入童年被全班霸凌的創傷閃回，抱著頭蹲在地上呼吸急促。',
      charLine: '「那些笑聲又來了……他們的影子變成尖嘴的烏鴉在啄我的畫冊……{player}，大家是不是都覺得我是不該存在的怪物？」',
      choices: [
        { text: '立刻上前冷靜喝退那群鬧事者，再蹲下來用外套圍住琉璃，溫柔握住她的手：「烏鴉已經被我趕走了！琉璃，看我的眼睛，這裡是市集，我是{player}，我絕對不會讓任何人欺負妳。」', reply: '在你的懷抱與堅定的聲音中，琉璃眼中的恐懼幻影漸漸散去，抓著你的衣襟泣不成聲：「……這次有人替我擋住了石頭，我的畫冊沒有被丟進水溝裡……」', psychNote: '果斷保護其免受外界霸凌，並以現實定錨帶領她走出知覺扭曲與創傷閃回。', stats: { affection: 16, security: 18, boundary: 12 } },
        { text: '幫她把散落的畫卡一張張擦乾淨收好，大聲誇讚她的星象插畫是全場最美的藝術品。', reply: '周圍幾個溫柔的客人也紛紛點頭稱讚並買下畫卡，琉璃破涕為笑：「原來我的畫真的有人喜歡！」', psychNote: '協助她在現實社交中獲得正向回饋，打破「外界皆惡意」的恐懼。', stats: { affection: 14, security: 15, boundary: 10 } },
        { text: '帶著她直接砸毀攤位並對她說：「全人類都是壞人！我們從此鎖死房門，永遠不要再見任何外人了！」', reply: '琉璃驚魂未定地點頭：「好，我們永遠躲起來……」', psychNote: '【共依存警訊】將保護扭曲為全面隔絕，強化其社交偏執焦慮。', stats: { affection: 12, security: 4, boundary: -18 } },
        { text: '站在旁邊覺得丟臉：「妳穿得這麼古怪又講那些神神叨叨的話，難怪人家會笑妳啊！」', reply: '琉璃難以置信地看著你，眼神瞬間碎裂成一片死寂。', psychNote: '與霸凌者站在一起檢討受害者，會造成毀滅性的二次創傷。', stats: { affection: -16, security: -22, boundary: -4 } }
      ]
    },
    e13: {
      title: 'E13｜過去的房間：神龕煙霧與水溝裡的畫冊',
      prompt: '深夜的占星室裡，琉璃點燃了一支安神的雪松線香，從古董木櫃底層捧出一本邊角泡水發皺、卻用金線仔細縫補過的童年蠟筆畫冊遞給你。',
      charLine: '「我小時候住在山城，外婆在神龕前點滿長明燈，說我高燒後看到的那些光影都是神明的旨意，不准我跟普通小孩玩。上了小學後，同學們叫我小魔女，把我的畫冊撕破丟進臭水溝裡……那時候沒有人救我，我只能告訴自己：『這都是星象逆行的考驗，只要我學會聽懂星星的話，就不會痛了。』{player}，其實我一直好害怕，怕拿掉魔法之後，我只是一個沒人要的小孩。」',
      choices: [
        { text: '輕輕撫摸那本縫補過的蠟筆畫冊，將她擁入懷裡：「那套魔法幫小時候的琉璃撐過了最痛的日子，它很了不起。而現在，不管有沒有魔法，我都愛這個溫柔的妳。」', reply: '琉璃在你懷裡放聲痛哭，把積壓多年的孤單全部哭了出來：「……終於有人聽懂我的星星語言了。」', psychNote: '【👑 終極成就解鎖】肯定其奇幻思考在童年創傷中的生存保護價值，並給予無條件的現實接納。', stats: { affection: 16, security: 18, boundary: 12 } },
        { text: '在畫冊空白的最後一頁，握著她的手一起畫下你們兩個人的笑臉。', reply: '看著畫紙上並肩的兩人，琉璃眼角帶淚地笑了：「這本畫冊終於迎來幸福的結局了。」', psychNote: '以共同創作改寫創傷記憶，建立安全的未來預期。', stats: { affection: 14, security: 16, boundary: 10 } },
        { text: '對她說：「妳本來就是真正的神明轉世，凡人都不配跟妳說話！」', reply: '琉璃雖然高興，眼神卻更加迷離地飄向虛空。', psychNote: '過度迎合非現實信念不利於維持現實感。', stats: { affection: 10, security: 2, boundary: -12 } },
        { text: '冷淡地說：「說穿了就是妳外婆迷信害了妳嘛，把這些舊東西全丟掉就好了。」', reply: '琉璃連忙把畫冊搶回來緊緊護在胸口，戒備地看著你。', psychNote: '粗暴否定過去的生存記憶會引發強烈防衛。', stats: { affection: -10, security: -14, boundary: -4 } }
      ]
    },
    e14: {
      title: 'E14｜最終約會：星空與大地交會的指尖契約',
      prompt: '晴朗的夜晚，星野琉璃帶你來到鋪滿柔軟抱枕的露台。她將最後一張「戀人（The Lovers）」塔羅牌收進牌盒，轉身向你伸出戴著銀戒的小指。',
      charLine: '「以前我總是在天上的星盤裡找答案，直到遇見{player}，我才喜歡上腳踩在地面上的感覺。以後我還是會畫占星圖、還是喜歡亮晶晶的水晶，但我的心已經降落在你身邊了。」',
      choices: [
        { text: '勾住她的小指並握緊她的手掌：「妳在天上飛的時候，我就當牽著妳的風箏線；妳想降落的時候，我永遠是妳的地面。」', reply: '琉璃紫色的眼眸裡落滿了漫天星光，羞怯而堅定地吻上你的臉頰：「這是我這輩子最喜歡的一個預言。」', psychNote: '【終章共鳴】保留她的詩意與想像力，同時成為她最溫暖穩定的現實錨點。', stats: { affection: 15, security: 15, boundary: 12 } },
        { text: '送給她一枚刻著兩人名字縮寫的指南針吊墜：「迷路的時候看它，就能找到我。」', reply: '她開心地把指南針掛在胸前：「比靈擺還要準確一百倍！」', psychNote: '溫暖而具象的定錨信物。', stats: { affection: 14, security: 14, boundary: 10 } },
        { text: '說：「以後我的每一件小事都要由妳占卜決定，沒問過牌我絕不出門！」', reply: '她興奮地點頭，卻也把兩人的生活完全綁在牌陣上。', psychNote: '【共依存傾向】將日常決策權讓渡給儀式化占卜。', stats: { affection: 10, security: 2, boundary: -14 } },
        { text: '微笑著退開一步：「我們當彼此最好的靈感朋友吧。」', reply: '琉璃輕輕點頭：「朋友也是星盤上很溫柔的相位喔。」', psychNote: '停留在友善而安全的距離。', stats: { affection: -6, security: -4, boundary: 4 } }
      ]
    }
  },

  han_xiao: {
    e07: {
      title: 'E07｜防衛反撲：故意輸掉的賭局與危險推開',
      prompt: '自從上次在海濱公路對你流露出一絲真心後，韓梟整整兩天都表現得玩世不恭。今晚你走進地下酒吧時，他正故意拿著撲克牌跟客人豪賭，看見你進來，竟挑釁地把一枚籌碼彈到你腳邊。',
      charLine: '「怎麼又來了？我警告過你，我是個沒有良心、隨時會把人賣掉的混蛋。趁我還沒把你手裡的底牌全騙光之前，乖乖滾回你的安全世界去，別妄想馴服我。」',
      choices: [
        { text: '彎腰撿起籌碼放回吧台，直視他眼底的躁動：「你越是故意裝壞人趕我走，越證明你開始在乎我會不會受傷了。我不玩馴服遊戲，但我也沒那麼容易被你嚇跑。」', reply: '韓梟捏著撲克牌的手指猛然收緊，眼底的戾氣化作一絲無奈又著迷的低笑：「……真該死，連我故意亮獠牙都嚇不走你。」', psychNote: '看穿反社會型「先下手推開以免暴露軟肋」的防衛操作，以無懼且堅定的底線贏得他的敬意。', stats: { affection: 12, security: 15, boundary: 12 } },
        { text: '冷靜地坐在吧台角落點了一杯蘇打水：「你要賭你的，我只是來喝杯水看書，十一點準時回家。」', reply: '看著你完全不受他挑釁影響的淡定模樣，韓梟反而沒了賭興，主動走過來幫你續杯。', psychNote: '不隨他的戲劇化挑釁起舞，保持穩定的自我邊界。', stats: { affection: 10, security: 13, boundary: 10 } },
        { text: '哭著求他：「就算你要騙我、要利用我也沒關係，我把所有積蓄都給你，只求你別趕我走！」', reply: '韓梟看著毫無底線的你，嘴角勾起一抹殘酷而輕蔑的弧度：「這可是你自己送上門當獵物的。」', psychNote: '【共依存警訊】在反社會型特質面前放棄底線當獵物，只會招致真正的剝削與操控。', stats: { affection: 8, security: -4, boundary: -20 } },
        { text: '指著他的鼻子大罵：「你果然是個無可救藥的人渣敗類，我看錯你了！」', reply: '韓梟聳聳肩，仰頭喝光杯中烈酒：「早告訴過你了，慢走不送。」', psychNote: '道德審判只會印證他「自己本就是壞人」的自我認知。', stats: { affection: -10, security: -12, boundary: 0 } }
      ]
    },
    e10: {
      title: 'E10｜雙人秘密：打烊後的無酒精特調與舊傷疤（邊界分水嶺）',
      prompt: '凌晨兩點地下酒吧打烊後，韓梟鎖上大門，沒有倒烈酒，而是切了新鮮檸檬與薄荷替你調了一杯清爽的熱果茶。他捲起酒紅襯衫袖子時，前臂內側露出一道長長的陳年刀疤。',
      charLine: '「十六歲那年在後巷替一個朋友擋刀留下的，結果隔天那傢伙就為了五千塊把我出賣給對頭。從那之後我就發誓，只有傻子才會講真心……{player}，你說我現在替你煮果茶，是不是也開始變傻了？」',
      choices: [
        { text: '輕輕碰了碰他手臂上的舊疤，認真地看著他：「當年那個少年一點都不傻，他只是遇到了錯的人。在我面前，你的真心永遠不會被標價出售。」', reply: '韓梟呼吸微滯，反手將你的手掌按在他胸口，讓你感受他真實而劇烈的心跳：「……記住你今晚說的話。要是連你也騙我，我就真的萬劫不復了。」', psychNote: '【分水嶺：通往 True End】肯定他早年被背叛前的同理心與重情義，修復他對人性的基本信任。', stats: { affection: 15, security: 18, boundary: 15 } },
        { text: '端起熱果茶喝了一大口，笑著對他說：「這杯『傻子特調』是我喝過最好喝的飲料，謝謝韓老闆。」', reply: '他耳根罕見地紅了一片，別過臉輕哼一聲：「只調給你一個人喝，出門別給我亂宣傳。」', psychNote: '以輕鬆溫暖的幽默接納他卸下冷酷面具後的溫柔。', stats: { affection: 13, security: 15, boundary: 10 } },
        { text: '激動地說：「以後誰敢背叛你，我就陪你一起去犯法報復他們，我們一起對抗全世界的法律！」', reply: '韓梟挑了挑眉，眼底閃過危險的狂熱：「好啊，那你就當我的共犯。」', psychNote: '【分水嶺：通往 Codependent End】放棄法律與道德底線去迎合他的反社會衝動，會走向毀滅性共生。', stats: { affection: 20, security: 5, boundary: -25 } },
        { text: '皺眉說：「你以前居然混黑道還跟人動刀，果然本性難移，太可怕了！」', reply: '韓梟面無表情地放下袖子扣好鈕扣：「怕了就趁早滾。」', psychNote: '【分水嶺：通往 Trigger End】在他罕見揭露傷疤時給予恐懼與排斥，會讓他瞬間戴回冷血面具。', stats: { affection: -18, security: -25, boundary: 0 } }
      ]
    },
    e11: {
      title: 'E11｜核心危機：昔日地下債主的威脅與底線考驗',
      prompt: '韓梟父親當年的地下錢莊舊識找上門來，威脅韓梟若不幫忙參與一場非法洗錢賽車賭局，就要在道上散播他早年的黑歷史並砸毀酒吧。韓梟站在重機旁，眼神重新浮現當年街頭搏命時的狠戾。',
      charLine: '「用規則對付不講規則的人太慢了。只要我今晚騎車去跟他們賭命贏下這一局，就能一勞永逸……{player}，讓開，這是我習慣的解決方式。」',
      choices: [
        { text: '直接拔下他的重機鑰匙握在手裡，拿出你剛蒐集到的對方恐嚇錄音：「我不讓！要解決他們，我們用合法證據送他們進監獄，我絕不准你拿自己的命去賭！」', reply: '韓梟死死盯著擋在車前的你，良久才鬆開緊握的拳頭，將額頭抵在你肩上低嘆：「……明明我連命都不怕丟，現在卻最怕看見你為我掉眼淚。聽你的，報警。」', psychNote: '以堅定不可動搖的邊界攔阻其衝動犯險（準則 A3/A5），證明「守規則也能保護彼此」。', stats: { affection: 16, security: 18, boundary: 15 } },
        { text: '陪他一起聯絡沈墨與法務顧問，在天亮前透過正規管道凍結對方的非法帳戶。', reply: '看著兵不血刃就瓦解危機的結果，韓梟怔了怔：「……原來不用流血也能贏。」', psychNote: '示範健康理性的問題解決策略，取代叢林法則。', stats: { affection: 14, security: 15, boundary: 12 } },
        { text: '直接跨上他的重機後座：「你要去賭命我就陪你一起飆車，贏了我們分贓，輸了我們一起死！」', reply: '韓梟狂笑一聲發動引擎，帶著你衝向危險的深淵。', psychNote: '【共依存警訊】與其毀滅性衝動合謀，徹底喪失邊界。', stats: { affection: 15, security: 0, boundary: -22 } },
        { text: '嚇得往後退：「你們這些黑道恩怨太恐怖了，你自己去解決吧，別連累我！」', reply: '韓梟冷笑一聲，戴上安全帽獨自衝進夜色中。', psychNote: '在危機時刻自保切割，印證了他「沒人靠得住」的信念。', stats: { affection: -14, security: -18, boundary: 0 } }
      ]
    },
    e13: {
      title: 'E13｜過去的房間：賭場後巷與十三歲的打火機',
      prompt: '風暴平息後的深夜，韓梟帶你打開吧台底層那只生鏽的舊鐵盒，裡面沒有錢也沒有帳本，只有一只磨損嚴重的銀色防風打火機與一張泛黃的孤兒院合照。',
      charLine: '「我爸是收高利貸的打手，我媽是車手。六歲那年我因為心疼路邊凍死的小狗哭了，我爸用皮帶抽了我一頓，罵我『同情心是給廢物留的，不狠就會被吃掉』。十三歲那年他們雙雙入獄，我在街頭學會了說謊、打架、先下手為強……因為只要我不流血、不露出一點軟弱，就沒有人能再踩在我頭上。{player}，是你讓我發現，原來當一個有心的人，不會死。」',
      choices: [
        { text: '雙手握住他拿著舊打火機的手：「六歲那年為小狗掉眼淚的男孩，一直都活在你心裡。以後在我身邊，你可以放心當一個有溫度的人。」', reply: '韓梟眼底泛起一層薄紅，低頭用力將你擁入懷中：「那個六歲的小鬼……今天終於被你救出來了。」', psychNote: '【👑 終極成就解鎖】穿透反社會武裝，喚醒並接納他童年被迫埋葬的同理與柔軟。', stats: { affection: 16, security: 18, boundary: 12 } },
        { text: '替他把那只舊打火機擦亮收好：「過去的叢林已經結束了，現在這間酒吧是我們兩個人的安全基地。」', reply: '他凝視著你溫柔的雙眼，輕聲應道：「嗯，有你在的地方才是家。」', psychNote: '協助他與創傷過去告別，建立穩定的當下歸屬感。', stats: { affection: 14, security: 16, boundary: 10 } },
        { text: '說：「你爸說得也沒錯啊，這個世界本來就是弱肉強食，我們一起當最狠的人！」', reply: '韓梟看了你一眼，眼底的光芒微微黯淡。', psychNote: '認同其創傷防衛而非療癒創傷。', stats: { affection: 6, security: -4, boundary: -12 } },
        { text: '搖頭說：「原來你家庭背景這麼複雜，難怪長大這麼愛騙人。」', reply: '韓梟啪地蓋上鐵盒：「是啊，聽完了就離我遠點吧。」', psychNote: '貼標籤式的評判會讓他徹底關閉心門。', stats: { affection: -12, security: -16, boundary: -4 } }
      ]
    },
    e14: {
      title: 'E14｜最終約會：不押注的雙人海岸線',
      prompt: '破曉時分的海濱公路，韓梟騎著重機載你來到看海的懸崖平台。這一次他沒有超速，而是將車速維持在最平穩安全的六十公里。他摘下安全帽，看著海平線升起的金色朝陽。',
      charLine: '「以前我總覺得人生是一場賭局，不是贏光別人就是輸得精光。但現在看著你，我第一次不想賭了——因為你是我唯一輸不起的底牌。」',
      choices: [
        { text: '笑著靠在他寬闊的肩背上：「那我們以後都不賭了，遵守交通規則，平平安安地一起騎到白頭。」', reply: '韓梟低笑出聲，轉身在晨風中深情地吻住你：「遵命，我的副駕駛。」', psychNote: '【終章共鳴】將刺激成癮與博弈防衛轉化為健康、長久且守住邊界的深情承諾。', stats: { affection: 15, security: 15, boundary: 12 } },
        { text: '拿出兩枚紀念硬幣，兩面都貼上愛心貼紙遞給他：「這枚硬幣不管怎麼擲，結果都是我們在一起。」', reply: '他接過硬幣放進胸口口袋，眼底滿是寵溺：「這是我見過最棒的出老千。」', psychNote: '以幽默溫暖的方式重新定義他的博弈符號。', stats: { affection: 14, security: 14, boundary: 10 } },
        { text: '說：「為了證明你愛我，你把酒吧賣掉，以後每一塊錢跟每一分鐘都要向我報備！」', reply: '他挑了挑眉：「想當我的典獄長？行啊，看誰關得住誰。」', psychNote: '【共依存傾向】試圖以控制取代對等信任。', stats: { affection: 8, security: -2, boundary: -14 } },
        { text: '把安全帽還給他：「我還是比較適合安穩的生活，我們當喝酒聊天的朋友就好。」', reply: '韓梟灑脫地揮了揮手：「行，隨時歡迎來酒吧喝一杯。」', psychNote: '各自回到平行的生活軌道。', stats: { affection: -6, security: -4, boundary: 6 } }
      ]
    }
  },

  su_fei: {
    e07: {
      title: 'E07｜防衛反撲：紅漆塗抹的畫布與推開試探',
      prompt: '昨晚你因為手機沒電晚了一個小時回覆訊息，今天傍晚走進畫室時，發現蘇緋眼眶紅腫地坐在地上，面前那幅畫了一半的風景畫被她塗上了一道刺目的鮮紅顏料。',
      charLine: '「昨晚十一點到十二點你消失了一個小時……我坐在電話旁邊數了三千六百秒，覺得自己快要死掉了！{player}，與其等你哪天膩了突然丟下我，不如我們現在就結束！你走啊，去過你沒有瘋子打擾的正常生活啊！」',
      choices: [
        { text: '沒有被她的氣話推開，蹲下來握住她沾滿紅顏料的手：「昨晚手機沒電讓你害怕了，對不起。但我現在就在這裡，不會因為妳說氣話就走，也不會隨便放棄我們。」', reply: '蘇緋看著你沒有退縮的眼睛，眼淚大顆大顆砸在手背上，猛地撲進你懷裡：「……我剛剛說反話的時候好怕你真的轉身就走……別走，求你別走。」', psychNote: '看穿邊緣型「先推開你以免被你拋棄」的防禦試探，提供恆定不變的在場證明（Object Constancy）。', stats: { affection: 12, security: 16, boundary: 10 } },
        { text: '拿出一顆行動電源放進背包，跟她約定：「以後要是手機快沒電，我一定先借電話跟妳說一聲；但如果我真的在忙，妳也要練習深呼吸等我，好嗎？」', reply: '蘇緋吸了吸鼻子，乖乖點頭：「只要你先跟我說一聲，我可以練習等……」', psychNote: '建立可預測的提前告知機制，同時溫和設定健康界線。', stats: { affection: 11, security: 14, boundary: 12 } },
        { text: '驚慌地發誓：「都是我的錯！我現在就把手機綁在身上二十四小時開視訊直播給妳看，一秒鐘都不掛斷！」', reply: '蘇緋破涕為笑：「真的嗎？那你睡覺跟上班都要開著鏡頭讓我看到你喔！」', psychNote: '【共依存警訊】用極端24小時監控來緩解分離焦慮，會徹底摧毀雙方的私人空間。', stats: { affection: 14, security: 4, boundary: -18 } },
        { text: '被激怒地轉身：「不過是一小時沒回訊息妳就毀掉畫還趕我走？那我就如妳所願現在走！」', reply: '關門聲響起的那一刻，蘇緋在畫室裡崩潰地摔碎了所有調色盤。', psychNote: '順著她的防禦氣話憤而離去，會直接印證她「所有人終將拋棄我」的核心創傷。', stats: { affection: -14, security: -18, boundary: -4 } }
      ]
    },
    e10: {
      title: 'E10｜雙人秘密：大提琴盒裡的車票與安撫信物（邊界分水嶺）',
      prompt: '夜深時，蘇緋抱著大提琴坐在畫室地毯上，從琴盒夾層裡拿出一疊厚厚的車票與你寫給她的每一張便條紙。她把臉貼在膝蓋上，眼神像個害怕天黑的孩子。',
      charLine: '「只要看不見你的時候，我心裡就會有一個黑洞一直吃掉我的記憶，讓我忘了你其實是愛我的……{player}，如果我把你鎖在這間畫室裡，是不是那個黑洞就永遠不會出現了？」',
      choices: [
        { text: '摘下自己貼身戴著的圍巾圍在她脖子上，並握住她的手：「把我鎖起來不能填滿黑洞。但這條圍巾上有我的溫度，當妳看不見我的時候，抱著它，記住我一定會回來找妳。」', reply: '蘇緋將臉埋進帶著你氣息的圍巾裡，眼角滑下一滴溫暖的淚：「……原來就算你不在房間裡，你的愛也不會消失。我會抱著它等你的。」', psychNote: '【分水嶺：通往 True End】運用「過渡性客體（Transitional Object）」幫助她建立客體恆常性，同時堅守不被囚禁的健康邊界！', stats: { affection: 15, security: 18, boundary: 15 } },
        { text: '錄下一段三十秒的溫柔語音設成她的手機桌面捷徑：「想我的時候就按一下聽我的聲音，幾次都可以。」', reply: '她反覆聽了三次，臉上綻放出安心而燦爛的笑容：「這是最棒的止痛藥！」', psychNote: '提供健康、可隨時取用的安撫資源，減少恐慌發作。', stats: { affection: 14, security: 16, boundary: 12 } },
        { text: '順從地把自己的鑰匙跟錢包交出去：「好啊，妳現在就把門鎖起來，我辭掉工作永遠不出這間畫室半步！」', reply: '蘇緋緊緊抱住你，眼神裡浮現令人窒息的狂喜：「太好了，我們永遠融化在一起……」', psychNote: '【分水嶺：通往 Codependent End】徹底放棄自我邊界，走入雙人與世隔絕的病態共生。', stats: { affection: 20, security: 5, boundary: -25 } },
        { text: '用力甩開她的手：「妳居然想把我鎖起來？妳這種恐怖情人真的太令人窒息了！」', reply: '蘇緋的眼神瞬間碎裂成絕望的深淵，手指無力地垂落在地毯上。', psychNote: '【分水嶺：通往 Trigger End】在她坦露內心空洞與恐懼時給予激烈排斥，引發毀滅性崩潰。', stats: { affection: -18, security: -25, boundary: 0 } }
      ]
    },
    e11: {
      title: 'E11｜核心危機：樂團公演前夕的母親電話與崩潰邊緣',
      prompt: '交響樂團年度公演上台前半小時，蘇緋遠在國外的母親突然打來電話，冷冷批評她海報上的姿勢難看，說完「妳永遠比不上我當年」便直接掛斷。休息室裡的蘇緋渾身發抖，拿起剪刀差點要剪斷大提琴弦。',
      charLine: '「她又掛我電話了……不管我拉得多好，在她眼裡我永遠是那個可以被隨時丟掉的累贅！我不上台了，我現在就把琴砸了，反正沒有人真心在乎我的音樂！」',
      choices: [
        { text: '第一時間穩穩握住她拿剪刀的手腕取下剪刀，雙手捧住她的臉讓她看著你：「蘇緋，看著我！台下第一排正中央坐著我，妳今晚不是為了妳媽媽拉琴，是為了妳自己和愛妳的我而拉！」', reply: '蘇緋喘著氣看著你堅定發亮的雙眼，崩潰的淚水奪眶而出，隨後用力點了點頭，擦乾眼淚抱起大提琴走上舞台，拉出了震撼全場的樂章。', psychNote: '果斷制止自我破壞衝動（準則 A4/A5），並協助她將自我價值從原生家庭的否定中剝離出來。', stats: { affection: 16, security: 18, boundary: 14 } },
        { text: '用溫毛巾幫她敷熱冰冷的手指，陪她在後台做完五分鐘的4-7-8深呼吸定錨。', reply: '隨著呼吸節奏放慢，蘇緋緊繃的指尖恢復了溫度：「……謝謝你幫我把靈魂抓回來。」', psychNote: '運用具體的生理調節技巧幫助她度過急性情緒風暴。', stats: { affection: 14, security: 16, boundary: 10 } },
        { text: '幫她一起把大提琴砸爛：「對！我們不去公演了，讓全場觀眾開天窗，我們現在私奔去海邊！」', reply: '雖然一時痛快，但事後蘇緋看著摔碎的心愛大提琴，陷入了更深的空虛與懊悔。', psychNote: '【共依存警訊】縱容衝動自毀行為會摧毀她珍視的專業生涯。', stats: { affection: 12, security: -4, boundary: -18 } },
        { text: '不耐煩地罵她：「馬上就要上台了妳還在鬧什麼大小姐脾氣？害樂團開天窗妳賠得起嗎！」', reply: '蘇緋臉色死白地站在原地，在台上頻頻拉錯音，演出結束後便鎖進休息室。', psychNote: '在創傷觸發時刻加以指責，會讓她陷入徹底的自我厭惡。', stats: { affection: -14, security: -18, boundary: -4 } }
      ]
    },
    e13: {
      title: 'E13｜過去的房間：雨夜裡追不上的紅色行李箱',
      prompt: '公演大獲成功後的深夜，蘇緋帶你回到畫室最深處的小閣樓，打開一只老舊的紅色皮箱，裡面裝著一雙磨破腳底的兒童紅舞鞋與一捲斷掉的錄音帶。',
      charLine: '「我四歲的時候爸爸走了，媽媽只要心情好就會抱著我哭，說『緋緋是媽媽唯一的命』；可只要我練琴拉錯一個音，她就會拖出這只紅色行李箱走到大門口，對我說『媽媽不要妳了』。七歲那年的大雨夜，我沒穿鞋子在後面一邊跑一邊哭著追她的計程車，腳底全被碎石頭割破了……{player}，我不是故意要作鬧、故意要盧你的，我只是太害怕那輛計程車又開走了……」',
      choices: [
        { text: '心疼地將她整個擁入懷中，輕輕撫摸她的長髮：「那個赤著腳在雨裡跑的七歲小女孩，以後再也不用追計程車了。我不會開走，我會停在原地等妳慢慢走過來。」', reply: '蘇緋在你懷裡哭得像個終於找到家的孩子，緊緊抓著你的衣角久久不放：「……我終於不用再跑得滿腳是血了。」', psychNote: '【👑 終極成就解鎖】深刻同理其童年「溺愛與拋棄交替」造成的依附創傷，完成最深層的療癒。', stats: { affection: 16, security: 18, boundary: 12 } },
        { text: '拿出一雙溫暖柔軟的室內毛絨拖鞋幫她穿上：「以後在我們家，永遠都有溫暖的鞋子穿，誰都不會把誰丟在雨裡。」', reply: '她低頭看著暖呼呼的拖鞋，破涕為笑：「這是我穿過最安心的鞋子。」', psychNote: '以溫暖具象的行動改寫她赤腳追逐的童年噩夢。', stats: { affection: 14, security: 16, boundary: 10 } },
        { text: '憤怒地說：「妳媽媽太病態了！我現在就打電話去罵她一頓！」', reply: '蘇緋搖了搖頭拉住你：「別打了，只要有你在我身邊就夠了。」', psychNote: '把焦點放在當下的安全感比挑起家庭衝突更重要。', stats: { affection: 8, security: 6, boundary: -4 } },
        { text: '嘆氣說：「難怪妳情緒這麼不穩定，原來是遺傳妳媽媽的歇斯底里啊。」', reply: '蘇緋像被雷擊中般僵住，臉色慘白地關上了皮箱。', psychNote: '將受害者與施虐父母畫上等號，是最殘忍的二次傷害。', stats: { affection: -14, security: -18, boundary: -4 } }
      ]
    },
    e14: {
      title: 'E14｜最終約會：不再塗改的雙人肖像畫',
      prompt: '夕陽灑滿畫室的黃昏，蘇緋揭開了畫架上的白布——那是一幅色彩溫暖明亮、筆觸卻格外溫柔安定的雙人油畫。畫裡的你們並肩坐在天台上，中間留著一束柔和的陽光。',
      charLine: '「以前我畫畫總是把顏料堆得厚到快要裂開，因為我怕顏色淡了愛就沒了。但現在我學會留白了……{player}，即使我偶爾還是會害怕，你願意陪我一起把這幅人生的畫慢慢畫完嗎？」',
      choices: [
        { text: '拿起畫筆在右下角與她一起簽下兩個人的名字：「我們有一輩子的時間慢慢上色，不管是晴天還是雨天，我都在畫裡陪妳。」', reply: '蘇緋眼中閃耀著璀璨的淚光與笑意，主動踮起腳尖深情地吻住你。', psychNote: '【終章共鳴】從非黑即白的濃烈撕扯，走向既有深情又能留白的成熟共生。', stats: { affection: 15, security: 15, boundary: 12 } },
        { text: '幫這幅畫裝上堅固的木框掛在陽光最充足的牆面：「這幅畫永遠不會淋濕，也永遠不會被塗掉。」', reply: '她幸福地靠在你肩上：「這是我們兩個人的傳家寶。」', psychNote: '給予恆久穩定的情感承諾。', stats: { affection: 14, security: 14, boundary: 10 } },
        { text: '說：「把中間的留白全部塗滿！我們要黏得一點縫隙都沒有！」', reply: '她愣了一下，順從地拿起紅顏料塗滿了留白。', psychNote: '【共依存傾向】拒絕留白與個體空間。', stats: { affection: 10, security: 2, boundary: -14 } },
        { text: '微笑著說：「這幅畫很美，我們當彼此永遠的藝術知己吧。」', reply: '蘇緋眼眶微紅，卻還是努力微笑著點了點頭。', psychNote: '退回知己的距離。', stats: { affection: -6, security: -4, boundary: 6 } }
      ]
    }
  },

  xia_le: {
    e07: {
      title: 'E07｜防衛反撲：刻意製造的緋聞與吃醋試探',
      prompt: '這幾天你因為工作忙沒去小劇場看夏樂排練，今天傍晚你在咖啡廳遇見他時，他故意摟著一位模特兒朋友大聲說笑，還不斷用眼角餘光偷瞄你的反應。等朋友一走，他立刻委屈地湊到你面前。',
      charLine: '「你都三天沒來看我了！是不是覺得我沒有新鮮感、不如別人好看了？你看剛剛那個模特兒對我多熱情，你要是再不誇我、再不把注意力放回我身上，本少爺真的要被別人搶走囉！」',
      choices: [
        { text: '溫和地笑著點了點他的鼻尖：「我看見你剛剛一直在偷瞄我了。不用特地找人演戲讓我吃醋，這三天沒去看排練是因為在忙，但我每天都有想你喔。」', reply: '夏樂臉頰瞬間紅透，像被戳破氣球一樣抱住你的手臂撒嬌：「……討厭啦，居然被你看穿了！因為你沒來，我覺得台下空蕩蕩的嘛！」', psychNote: '看穿做作型「透過戲劇化吃醋戲碼來索取關注」的防衛，直接給予真實安全感而不隨其挑釁起舞。', stats: { affection: 12, security: 15, boundary: 10 } },
        { text: '拿出你早就買好的首演日第一排正中央門票晃了晃：「我怎麼可能忘記大明星？我可是把最重要的正式演出留著專心看呢。」', reply: '他眼睛亮得像星星：「第一排正中央！那我謝幕的時候第一個飛吻一定只給你！」', psychNote: '具體的重視證明能迅速安撫他對「被忽視」的恐懼。', stats: { affection: 11, security: 13, boundary: 9 } },
        { text: '當場失控大哭大鬧並衝出去找那個模特兒算帳：「你不准跟任何人說話，以後二十四小時只能看著我！」', reply: '夏樂雖然覺得很有戲劇張力，卻也被你失控的佔有慾嚇了一跳。', psychNote: '【共依存警訊】捲入高戲劇張力的嫉妒遊戲，會讓關係變成疲憊不堪的八點檔。', stats: { affection: 12, security: 2, boundary: -16 } },
        { text: '冷淡地翻白眼：「你愛跟誰走就跟誰走啊，少在那邊像孔雀一樣到處放電刷存在感了！」', reply: '夏樂臉上的笑容僵住，眼底的光芒瞬間熄滅。', psychNote: '羞辱其尋求關注的本能會讓他陷入深層的自我否定。', stats: { affection: -10, security: -14, boundary: -4 } }
      ]
    },
    e10: {
      title: 'E10｜雙人秘密：卸妝鏡前沒有聚光燈的素顏夜晚（邊界分水嶺）',
      prompt: '公演結束後的深夜十一點，小劇場所有觀眾與工作人員都散去了。你走進空無一人的後台化妝間，看見夏樂正對著鏡子一點一點卸掉華麗的眼妝，脫下亮片戲服的他穿著洗舊的白T恤，顯得格外單薄安靜。',
      charLine: '「掌聲停了、亮片脫下來了……鏡子裡這個沒有妝、也不會講笑話逗大家開心的普通男生，連我自己看了都覺得好無聊。{player}，如果我下台之後這麼安靜無趣，你還會喜歡我嗎？」',
      choices: [
        { text: '走到他身後，從鏡子裡溫柔地看著素顏的他，輕輕握住他的肩膀：「舞台上的夏樂很耀眼，但現在這個穿著舊T恤、會累也會安靜的夏樂，才是我最想擁抱的人。」', reply: '夏樂看著鏡中你的眼神，眼淚無聲地滑過乾淨的臉龐，轉身緊緊埋進你懷裡：「……這是第一次，有人對沒穿戲服的我說喜歡。」', psychNote: '【分水嶺：通往 True End】接納他卸下表演面具後的真實脆弱與平凡，將他的條件式自尊轉化為無條件被愛的安全感！', stats: { affection: 15, security: 18, boundary: 15 } },
        { text: '幫他貼上一片溫和的保濕面膜，笑著說：「那今晚我們不演戲，去便利商店買關東煮安安靜靜吃宵夜吧。」', reply: '他頂著面膜噗哧笑出聲：「好耶！不用擺姿勢吃關東煮，一定超好吃！」', psychNote: '帶領他體驗日常樸實的幸福，減少對高強度掌聲的成癮依賴。', stats: { affection: 13, security: 15, boundary: 10 } },
        { text: '連忙拿起化妝刷幫他重新畫上濃妝：「你素顏真的太沒精神了！快把亮片穿上，不管幾點你在我面前都要保持完美偶像的樣子！」', reply: '夏樂強打起精神重新擠出燦爛假笑：「好……我會永遠為你表演下去的。」', psychNote: '【分水嶺：通往 Codependent End】要求他永遠戴著表演面具，讓他在關係中徹底耗竭。', stats: { affection: 20, security: 5, boundary: -25 } },
        { text: '冷冷地說：「原來你私底下這麼陰沉無聊喔，那我還是去追別的偶像好了。」', reply: '夏樂像被判了死刑般低頭看著地面，再也不敢抬頭看鏡子。', psychNote: '【分水嶺：通往 Trigger End】印證他「不表演就不值得被愛」的童年噩夢。', stats: { affection: -18, security: -25, boundary: 0 } }
      ]
    },
    e11: {
      title: 'E11｜核心危機：直播鏡頭前的失誤與網暴退粉潮',
      prompt: '夏樂在一場大型品牌直播中因為感冒失聲破音，結果被黑粉截圖做成搞笑迷因在網路上瘋傳，一夜之間掉了兩萬粉絲。他把自己關在公寓房間裡拉上所有窗簾，瘋狂刷新留言區，手抖得幾乎拿不住手機。',
      charLine: '「他們都在笑我過氣、笑我連聲音都控制不好……留言數一直在掉，沒有人愛我了！{player}，如果我不再是受歡迎的大明星，我是不是就徹底消失、變成空氣了？！」',
      choices: [
        { text: '溫和而堅定地幫他關掉手機螢幕，握住他冰冷的雙手：「粉絲數字不是你的生命值。就算全世界都關掉螢幕，我也看得見你、聽得見你的聲音。你永遠不會變成空氣。」', reply: '夏樂呆呆地看著你，隨即放聲大哭，把多日來的恐懼全發洩出來：「……只要你的眼睛還看著我，我就還活著對不對？」', psychNote: '在「失去外在關注焦點」的核心危機中，幫他切斷網路評價綁架，建立穩固的內在自我價值。', stats: { affection: 16, security: 18, boundary: 12 } },
        { text: '煮一壺溫熱的膨大海羅漢果護嗓茶餵他喝下，陪他在不開鏡頭的房間裡安靜休息。', reply: '溫潤的茶水撫平了喉嚨的刺痛，他安心地靠在你肩頭睡著了。', psychNote: '將注意力從「外在形象焦慮」拉回「真實身體照護」。', stats: { affection: 14, security: 15, boundary: 10 } },
        { text: '教唆他立刻開直播上演吞藥暈倒的假戲來博取全網同情與流量！', reply: '夏樂眼神一亮差點照做，整個人的心理狀態卻變得更加扭曲不穩。', psychNote: '【共依存警訊】煽動極端戲劇化操弄來換取關注，會徹底毀掉他的身心健康。', stats: { affection: 12, security: -4, boundary: -20 } },
        { text: '嘆氣說：「誰叫你平時只顧著愛漂亮不練基本功，現在翻車被群嘲也是活該吧。」', reply: '夏樂臉色慘白地縮進棉被裡，覺得連最後一個避風港都崩塌了。', psychNote: '落井下石會讓他陷入嚴重的憂鬱與空虛。', stats: { affection: -14, security: -18, boundary: -4 } }
      ]
    },
    e13: {
      title: 'E13｜過去的房間：沒有蠟燭的七歲生日與小丑紙帽',
      prompt: '風波平息後的午後，夏樂打開衣帽間最底層一個不起眼的鞋盒，裡面沒有名牌飾品，只有一頂用彩色廣告紙摺成的破舊小丑帽，以及一張他站在角落只拍到半張臉的全家福。',
      charLine: '「我哥是永遠考第一名的天才，我妹從小體弱多病。七歲生日那天，爸媽因為忙著照顧發燒的妹妹，完全忘了我的生日。我躲在客廳桌子底下哭，卻沒有人發現我不見了……後來我戴上這頂廣告紙摺的小丑帽跳出來翻跟斗學電視明星唱歌，媽媽才第一次笑著抱起我說『樂樂真乖』。從那天起我就知道了——如果我不夠亮、不夠吵、不夠漂亮，連我爸媽都會忘記我的存在。」',
      choices: [
        { text: '捧起那頂舊紙帽輕輕放在桌邊，再緊緊抱住他：「以後每年的生日，你不用翻跟斗、也不用戴小丑帽，我都會第一個幫你點亮蠟燭。你在我這裡永遠是第一順位。」', reply: '夏樂把臉埋在你肩窩裡，滾燙的眼淚浸濕了你的衣服：「……原來不用當小丑，也能擁有自己的生日蛋糕。」', psychNote: '【👑 終極成就解鎖】深刻療癒他童年「情感被忽視而不得不靠表演求生」的核心創傷。', stats: { affection: 16, security: 18, boundary: 12 } },
        { text: '拿出拍立得，把鏡頭正中央只對準他一個人拍下一張素顏微笑的照片收進皮夾。', reply: '看著照片裡被完整拍下的自己，夏樂破涕為笑：「這次我沒有被切掉半張臉了！」', psychNote: '以具體的視覺象徵彌補他童年的隱形創傷。', stats: { affection: 14, security: 16, boundary: 10 } },
        { text: '說：「那你更要努力當全世界最紅的巨星，讓你爸媽跟哥哥後悔莫及！」', reply: '夏樂用力點頭，卻覺得肩膀上的表演擔子更重了。', psychNote: '強化成就導向而非無條件接納。', stats: { affection: 8, security: 4, boundary: -6 } },
        { text: '不以為然地說：「多子家庭本來就會偏心啊，為這點小事記到現在也太玻璃心了吧。」', reply: '夏樂默默把鞋盒塞回衣櫃深處，重新掛上營業用的假笑。', psychNote: '貶低童年創傷會讓他立刻退回表淺防衛。', stats: { affection: -12, security: -16, boundary: -4 } }
      ]
    },
    e14: {
      title: 'E14｜最終約會：觀眾席只有一個人的專屬劇場',
      prompt: '夜晚的小劇場沒有開炫目的霓虹舞台燈，只點了一盞溫暖的落地小黃燈。夏樂穿著最舒服的針織毛衣坐在舞台邊緣，晃著雙腿對台下唯一的觀眾——你——伸出手。',
      charLine: '「以前我需要一萬個人的尖叫聲才覺得安心；現在我發現，只要台下坐著一個真正懂我的{player}，就勝過全世界的聚光燈了。你願意當我一輩子的專屬觀眾兼男主角嗎？」',
      choices: [
        { text: '走上舞台坐在他身邊，與他十指緊扣：「無論在舞台上還是生活裡，我都願意陪你一起演完這輩子最真實的故事。」', reply: '夏樂眼中盛滿溫暖的星光，笑著傾身吻上你的唇：「這齣戲沒有劇本，而且永遠不謝幕！」', psychNote: '【終章共鳴】將外在浮誇的尋求關注，昇華為真實深厚的一對一親密連結。', stats: { affection: 15, security: 15, boundary: 12 } },
        { text: '為他獻上一束不加包裝亮片、卻清香撲鼻的白色滿天星。', reply: '他抱著滿天星開心地轉圈：「雖然不是紅玫瑰，但這是世界上最溫柔的花！」', psychNote: '肯定真實質樸的美好。', stats: { affection: 14, security: 14, boundary: 10 } },
        { text: '要求他退出演藝圈，以後不准讓任何外人看到他的臉。', reply: '他猶豫了一下，為了留住你還是勉強答應了。', psychNote: '【共依存傾向】以剝奪舞台來換取獨佔。', stats: { affection: 8, security: 0, boundary: -16 } },
        { text: '在台下為他鼓掌：「我會永遠坐在觀眾席為你加油的，我最閃亮的大明星朋友。」', reply: '夏樂優雅地鞠躬致意：「謝謝你，我最重要的知音。」', psychNote: '停留在真摯的知音距離。', stats: { affection: -6, security: -4, boundary: 6 } }
      ]
    }
  },

  gu_qingcheng: {
    e07: {
      title: 'E07｜防衛反撲：貴賓名單的階級試探与拉開距離',
      prompt: '自從上次在休息室被你看穿她對網評的在意後，顧傾城連續兩天表現得比平時更加高傲冷酷。今天你在建築事務所遇見她時，她正拿著金筆審閱私人晚宴名單，看你的眼神像在評估一件商品。',
      charLine: '「我最近讓你進我私人領域的頻率太高了。別誤會，像我這種站在金字塔頂端的人，偶爾施捨一點時間給普通人只是消遣。你要是開始妄想跟我平起平坐，那就太不自量力了。」',
      choices: [
        { text: '平靜地微笑直視她：「我從來不需要靠妳的名氣來證明價值，我來找妳，只是因為我欣賞拿著鉛筆畫圖的顧傾城。如果妳今天想戴著女王王冠，那我們改天再聊。」', reply: '顧傾城握著金筆的手指微微一頓，眼底閃過一絲被看穿的慌亂與敬意：「……站住！誰准你轉身就走的？算你有骨氣，坐下來陪我喝完這杯咖啡。」', psychNote: '面對自戀型因暴露脆弱後產生的「傲慢貶抑防衛（Devaluation）」，不卑不亢守住自尊底線，反而能贏得她的平等尊重。', stats: { affection: 12, security: 15, boundary: 12 } },
        { text: '把一本剛出版的絕版建築構造圖集放在她桌上：「我只是順路把這本妳找了很久的圖集送來，不打擾顧總工作。」', reply: '她看到那本絕版圖集眼睛一亮，語氣瞬間軟化了三分：「……算你有心。既然來了，就幫我看一眼第三頁的剖面圖吧。」', psychNote: '以實力與品味回應她的防衛，給她體面收回傲慢話語的台階。', stats: { affection: 11, security: 13, boundary: 10 } },
        { text: '卑微地低頭說：「您說得對！我本來就是配不上您的凡夫俗子，只要能當您的墊腳石我就心滿意足了！」', reply: '顧傾城冷哼一聲：「知道自己幾兩重就好。」你在她心中的地位也徹底變成了隨時可替換的附庸。', psychNote: '【共依存警訊】自我貶抑與逢迎會直接餵養自戀型的特權感與人際剝削傾向。', stats: { affection: 8, security: -2, boundary: -18 } },
        { text: '當場拍桌反唇相譏：「妳以為妳是誰啊？不過是個心理自卑又愛裝模作樣的暴發戶罷了！」', reply: '顧傾城臉色鐵青，立刻叫保全將你請出大樓並列入黑名單。', psychNote: '直接戳破並羞辱自戀者的脆弱核心，會引發劇烈的自戀暴怒與決裂。', stats: { affection: -14, security: -16, boundary: -4 } }
      ]
    },
    e10: {
      title: 'E10｜雙人秘密：脫下高跟鞋與撕毀的 98 分競圖稿（邊界分水嶺）',
      prompt: '深夜十二點的建築事務所頂樓，所有員工都下班了。你推開半掩的門，發現顧傾城踢掉了那雙象徵戰袍的紅底高跟鞋，光著腳坐在冰冷的大理石地板上，周圍散落著被她親手撕碎的設計圖紙，眼眶泛紅。',
      charLine: '「國際評審團剛才給我的初稿打了 98 分，位居第二……又是第二名！只要不是第一名，所有人明天都會看我的笑話！{player}，是不是連你也覺得跌下神壇的顧傾城一文不值了？！」',
      choices: [
        { text: '蹲下來將自己的西裝外套披在她肩上，並一片片拾起地上的圖紙：「98 分已經是很了不起的傑作了。傾城，就算妳今天考零分、就算沒有任何獎盃，妳在我心裡也永遠是最珍貴的人。」', reply: '顧傾城怔怔地看著你溫柔拾起圖紙的手，高傲的防線瞬間潰堤，第一次主動抱住你的脖子埋首痛哭：「……從來沒有人告訴過我，不拿第一名也可以被愛。」', psychNote: '【分水嶺：通往 True End】將她的「外在成就表現」與「內在存在價值」解綁，療癒她對不完美的極度羞恥感！', stats: { affection: 15, security: 18, boundary: 15 } },
        { text: '幫她揉了揉紅腫的腳踝，泡一杯溫熱的紅棗茶遞給她：「不管要不要改圖，今天先讓顧傾城休息一晚，明天我們再一起看哪裡還能更好。」', reply: '她捧著熱茶靠在你肩上，緊繃的眉心終於舒展開來：「……好，今晚我只當你的傾城，不當總建築師。」', psychNote: '照顧她被完美主義壓榨的身心，提供安全的喘息空間。', stats: { affection: 14, security: 16, boundary: 12 } },
        { text: '跪在地上發誓：「誰敢給妳打 98 分我就去網路上肉搜攻擊評審！妳永遠是全宇宙完美無瑕的女王，絕對不可能有任何缺點！」', reply: '顧傾城擦乾眼淚重新揚起高傲的下巴：「沒錯，錯的是那些沒眼光的評審！」', psychNote: '【分水嶺：通往 Codependent End】用盲目造神與攻擊外界來維持她脆弱的誇大自戀，無法帶來真正的內在安全感。', stats: { affection: 20, security: 5, boundary: -25 } },
        { text: '冷笑一聲說：「拿第二名就在地上哭，妳平時那股看不起人的傲氣去哪了？真是輸不起！」', reply: '顧傾城臉色慘白如紙，抓起高跟鞋砸向門口：「滾出去！永遠別再出現在我面前！」', psychNote: '【分水嶺：通往 Trigger End】在她最羞恥脆弱的時刻加以嘲諷，造成不可逆的自戀創傷。', stats: { affection: -18, security: -25, boundary: 0 } }
      ]
    },
    e11: {
      title: 'E11｜核心危機：父親公開演講的貶抑與自尊雪崩',
      prompt: '在年度建築雙年展的開幕論壇上，顧傾城的父親——建築界泰斗顧老先生——當著全場三百名同行與媒體的面，公開批評顧傾城的新設計「華而不實、還沒學會走路就想飛」。台下的竊竊私語讓顧傾城在散場後躲進逃生梯間，渾身冰冷發抖。',
      charLine: '「你聽見了嗎？連我親生父親都當眾羞辱我……剛才那些平常巴結我的人全都在背後偷笑！我這十年拼命蓋起的高塔，在他一句話面前就像笑話一樣……我好恨這種被人踩在腳底下的感覺！」',
      choices: [
        { text: '握住她冰冷握拳的雙手，直視她的眼睛：「你父親代表的是過去的舊權威，而妳的作品剛剛讓許多年輕建築師紅了眼眶。妳不需要贏過他的嘴，妳已經活出自己的高度了。」', reply: '顧傾城深吸一口氣，眼角的淚水滑落卻重新挺直了脊背，緊緊反握住你的手：「……你說得對。我的價值，早就不必由那個老頭子來打分數了。」', psychNote: '在原生家庭權威羞辱的創傷重演中，幫助她完成心理分離與個體化（Individuation）。', stats: { affection: 16, security: 18, boundary: 12 } },
        { text: '帶她離開會場去海邊吹風，不看任何媒體報導，只聊你們第一次一起看建築模型時的初心。', reply: '海風吹散了會場的窒息感，顧傾城看著海平線輕聲說：「還好有你在，不然我剛才真的快喘不過氣了。」', psychNote: '帶她脫離高評價壓力的比較場域，回到純粹的熱愛本身。', stats: { affection: 14, security: 15, boundary: 10 } },
        { text: '慫恿她動用公司全部資金去惡意收購並搞垮批評她的媒體與對手！', reply: '顧傾城眼中閃過報復的快感，卻也將事務所推向了財務險境。', psychNote: '【共依存警訊】助長報復性自戀暴怒，會帶來嚴重的現實反噬。', stats: { affection: 12, security: -4, boundary: -18 } },
        { text: '附和她父親的話：「薑還是老的辣，妳爸講得其實很中肯啊，妳本來就太自以為是了。」', reply: '顧傾城眼神瞬間死寂，像看陌生人一樣看著你轉身離去。', psychNote: '在傷口上撒鹽並認同施虐權威，會徹底終結關係。', stats: { affection: -16, security: -22, boundary: -4 } }
      ]
    },
    e13: {
      title: 'E13｜過去的房間：壁爐裡的灰燼與十歲的亞軍獎狀',
      prompt: '深夜的私人頂樓寓所裡，顧傾城打開書房暗格，取出一只保存完好的絨布盒——裡面裝著一張只剩下一半、邊緣被火燒焦的國小繪畫比賽「第二名」獎狀。',
      charLine: '「十歲那年，我畫了一整個月的『我們這一家』拿了全校第二名。我開心地跑去書房給爸爸看，當時家裡正在辦酒會，他當著二十幾個客人的面把我的獎狀撕碎丟進壁爐裡，冷冷對我說：『顧家不需要亞軍，如果你不能成為受人仰望的神，你就只是一文不值的廢物。』那天晚上等火熄了，我徒手從燙手的灰燼裡把這半張紙撿回來……{player}，我之所以對所有人都那麼驕傲刻薄，是因為我太怕有人發現，我心裡其實還住著那個蹲在壁爐前撿灰燼的小女孩。」',
      choices: [
        { text: '溫柔地親吻她當年被爐灰燙過的手指，將她擁入懷中：「那張畫拿第一名，在我心裡它是全世界最無價的作品。從今以後，妳不用再當孤獨的神了，在我身邊放心當顧傾城吧。」', reply: '高傲的女王在你懷裡徹底卸下了黃金盔甲，眼淚浸濕了你的胸膛：「……謝謝你接住了那個十歲的我。」', psychNote: '【👑 終極成就解鎖】穿透自戀誇大盔甲，擁抱其底層「因有條件的愛而產生的深層羞恥與脆弱」。', stats: { affection: 16, security: 18, boundary: 12 } },
        { text: '替那半張燒焦的獎狀配了一個溫潤的胡桃木相框，放在你們兩人的合照旁邊。', reply: '顧傾城看著相框，眼底浮現前所未有的溫柔：「有你的合照在旁邊，這道焦痕好像也沒那麼痛了。」', psychNote: '協助她接納自己的不完美與過去，整合真實自我。', stats: { affection: 14, security: 16, boundary: 10 } },
        { text: '咬牙切齒地說：「我們現在就去把妳爸的獎盃全部砸爛替妳出氣！」', reply: '她搖了搖頭：「不必了，我不想再活在他的陰影裡。」', psychNote: '真正的療癒是超越而非報復。', stats: { affection: 8, security: 6, boundary: -4 } },
        { text: '說：「原來妳是因為小時候沒拿到第一名才心理變態喔，真是小題大作。」', reply: '顧傾城啪地關上絨布盒，眼神恢復成萬年不化的寒冰。', psychNote: '羞辱其核心創傷會讓黃金盔甲永久焊死。', stats: { affection: -14, security: -18, boundary: -4 } }
      ]
    },
    e14: {
      title: 'E14｜最終約會：不蓋高塔、只屬於兩人的平房藍圖',
      prompt: '黃昏的建築事務所露台，夕陽將雲海染成瑰麗的紫金色。顧傾城沒有拿摩天大樓的模型，而是攤開了一張她親手用鉛筆繪製的「雙人木造小平房」草圖。',
      charLine: '「我這輩子蓋過無數座讓人仰望的摩天高塔，卻從來沒有畫過一間能讓自己安心睡覺的平房。{player}，這張沒有要參賽、也不必拿第一名的『家』，你願意當它的共同持有人嗎？」',
      choices: [
        { text: '拿起鉛筆在平房的院子裡畫上兩把躺椅與一棵樹：「這個家不需要任何評審打分，只要有妳在裡面，就是滿分。」', reply: '顧傾城眼角微彎，露出宛如玫瑰盛開般動人的真誠笑容，低頭吻住你的唇：「這是我這輩子最驕傲的代表作。」', psychNote: '【終章共鳴】從追求外在仰望的孤高自戀，走向平等溫暖的真實親密。', stats: { affection: 15, security: 15, boundary: 12 } },
        { text: '握住她的手一起在藍圖右下角蓋上兩人的指印。', reply: '她看著交疊的紅泥指印，溫柔地靠在你肩頭。', psychNote: '平等而深情的伴侶盟約。', stats: { affection: 14, security: 14, boundary: 10 } },
        { text: '說：「平房太寒酸了，妳必須蓋一棟全世界最高的皇宮把我關在裡面養我！」', reply: '她皺了皺眉，覺得你依然只看重她的外在光環。', psychNote: '【共依存傾向】將關係物化為虛榮與依附。', stats: { affection: 6, security: -2, boundary: -14 } },
        { text: '微笑著將藍圖捲好遞還給她：「這一定會是很棒的建築，我永遠是妳最忠實的建築迷朋友。」', reply: '顧傾城優雅地收回藍圖：「能當我的知音，也是你的榮幸。」', psychNote: '保持優雅的知己距離。', stats: { affection: -6, security: -4, boundary: 6 } }
      ]
    }
  },

  wen_yan: {
    e07: {
      title: 'E07｜防衛反撲：門縫下的道歉信與畏懼退縮',
      prompt: '自從上次在譯詩討論時與你對視了五秒鐘後，溫言突然一連三天都躲著你。當你去圖書修復室找他時，他隔著半掩的木門從門縫下塞出一封手寫信，聲音細若蚊蚋。',
      charLine: '「對、對不起……{player}，我昨晚想了一整夜，像我這麼沉悶、講話又會結巴的無聊男人，待在你身邊一定只會讓你覺得丟臉又無趣吧……趁你還沒開始討厭我之前，我還是自己退回角落比較好……」',
      choices: [
        { text: '沒有強行推門，而是坐在門外地板上溫和地念出信上的句子：「溫言，我從來沒有覺得你無聊。跟你一起安靜修書的時間，是我一週裡最放鬆的時刻。等你準備好了再開門就好，我在外面陪你。」', reply: '門內安靜了幾秒，隨即傳來門鎖輕輕轉開的聲音。溫言紅著眼眶站在門後，手指緊緊抓著衣角：「……你、你真的不嫌棄我嗎？」', psychNote: '面對畏避型「因害怕被拒絕而先自我放逐」的防衛，給予明確的接納保證並尊重其開門的節奏。', stats: { affection: 12, security: 16, boundary: 10 } },
        { text: '從門縫下回塞一張畫著笑臉的小紙條與一塊桂花糕：「今天不講話也沒關係，我們用紙條聊天吧！」', reply: '門縫下很快又遞出了一張紙條，上面端正地寫著：「謝謝你……桂花糕很甜，門沒鎖，你可以進來。」', psychNote: '降低面對面社交壓力，用他最自在的文字媒介重建連結。', stats: { affection: 11, security: 14, boundary: 9 } },
        { text: '一把推開門抓住他的手大喊：「你不准躲！以後你的所有社交跟工作全部由我替你決定，你只要躲在我背後當個隱形人就好！」', reply: '溫言嚇得退到書架邊，雖然順從地點頭，卻更加確信自己是個毫無能力的廢物。', psychNote: '【共依存警訊】過度控制與剝奪自主性會強化畏避型的自卑感。', stats: { affection: 8, security: -2, boundary: -16 } },
        { text: '不耐煩地把信丟回去：「我明明對你這麼好，你還整天疑神疑鬼說自己沒用，跟負能量的人相處真的太累了！」', reply: '門瞬間被死死鎖上，裡面傳來壓抑的啜泣聲：「對不起……我果然只會讓人覺得累……」', psychNote: '責備其自卑反應會直接印證他「我果然惹人厭」的核心信念。', stats: { affection: -12, security: -16, boundary: -4 } }
      ]
    },
    e10: {
      title: 'E10｜雙人秘密：只為你一人朗讀的未寄出情詩（邊界分水嶺）',
      prompt: '雨夜的圖書修復室裡，只有一盞鵝黃色的落地燈亮著。溫言鼓起畢生的勇氣，拿出一本他親手用線裝古法縫製的小冊子——裡面全是他這幾個月為你翻譯並撰寫的短詩。他的手微微發抖，臉頰紅得像要滴血。',
      charLine: '「我、我從小學五年級之後，就再也不敢在別人面前念自己寫的字了……因為我怕自己會結巴、怕看到別人嘲笑的眼神。可是今晚，我好想親口念這首詩給{player}聽……如、如果我念得很笨拙，你會笑我嗎？」',
      choices: [
        { text: '溫柔地握住他發抖的左手，眼神專注而鼓勵地看著他：「你慢慢念，就算中間停頓十次、就算結巴也沒關係，你的每一個字我都想聽。」', reply: '在你的注視下，溫言剛開始還有些微顫的聲音漸漸變得清澈而深情。念完最後一行時，他眼含熱淚地對你露出了這輩子最燦爛的微笑：「……我做到了，我在你面前沒有逃跑。」', psychNote: '【分水嶺：通往 True End】創造百分之百無評判的安全人際空間，幫助畏避型完成克服社交恐懼的關鍵突破！', stats: { affection: 15, security: 18, boundary: 15 } },
        { text: '輕輕靠在他身邊，陪他一起小聲合讀那首詩的最後兩句。', reply: '兩人的聲音在安靜的修復室裡重疊，溫言感動得耳根通紅：「有你的聲音陪著我，我就一點都不怕了。」', psychNote: '以溫和的共同參與減輕他單獨暴露的焦慮。', stats: { affection: 14, security: 16, boundary: 12 } },
        { text: '一把搶過他的詩集：「你念得太慢太緊張了，別念了！以後你想說什麼都寫下來由我幫你念，你一輩子都不用開口說話！」', reply: '溫言低著頭收回手：「……好，都聽你的，我以後都不開口了。」', psychNote: '【分水嶺：通往 Codependent End】以「保護」為名剝奪他自我表達與成長的機會，將他困在永遠的退縮中。', stats: { affection: 20, security: 5, boundary: -25 } },
        { text: '聽他念第一句卡詞時就噗哧笑出來：「哈哈，你緊張的時候結巴的樣子真的超好笑的！」', reply: '溫言的聲音瞬間像被掐斷一樣停住，臉色慘白地搶回詩集抱在胸前，渾身發抖。', psychNote: '【分水嶺：通往 Trigger End】重演他童年被全班哄堂大笑的致命創傷，造成徹底的心門封閉。', stats: { affection: -18, security: -25, boundary: 0 } }
      ]
    },
    e11: {
      title: 'E11｜核心危機：出版社編輯的當眾刁難與逃避衝動',
      prompt: '出版社舉辦的小型譯者座談會上，一位向來刻薄的資深評論家當眾拿起麥克風，嘲諷溫言的最新譯作「用詞過於保守拘謹，連上台講話都蚊子叫，根本不配翻譯經典」。溫言在台上臉色死白，下意識就要丟下麥克風逃離會場。',
      charLine: '他逃到後台走廊時呼吸急促、眼淚在眼眶裡打轉：「他、他說得對……我就是個連話都講不清楚的膽小鬼！我現在就去簽解約書，我再也不要翻譯任何書、再也不要見任何人了！」',
      choices: [
        { text: '穩穩扶住他的雙臂，打開手機給他看剛才台下讀者們寫滿感動與支持的回饋卡：「溫言，別只聽一個刻薄的人說話！你看這三十張讀者卡，大家都是因為你溫柔細膩的譯筆才愛上這本書的。我們不逃，我陪你回座談會只回答真心讀者的問題！」', reply: '溫言看著那一張張手寫的讀者感謝卡，淚水滑落臉頰，深吸一口氣後握緊了你的手：「……為了你，也為了這些讀懂我的人，我不逃了，我回去。」', psychNote: '幫助畏避型打破「選擇性聚焦負評並災難化（準則 A2/A4）」的認知偏誤，陪伴他完成暴露與面對。', stats: { affection: 16, security: 18, boundary: 14 } },
        { text: '先陪他在安靜的休息室喝口溫水平復心跳，再請主辦方將下半場改為「書面提問與溫馨簽書」形式。', reply: '調整為一對一簽書後，溫言發揮了他細膩傾聽的長處，順利完成了整場活動。', psychNote: '根據其氣質特點調整環境壓力梯度，幫助他建立成功經驗。', stats: { affection: 14, security: 16, boundary: 11 } },
        { text: '立刻拉著他逃出後門：「對！外面的人都太壞了，我們馬上解約回家，以後你只要鎖在房間裡寫字給我看就好！」', reply: '溫言跟著你逃回了安全的房間，卻也從此失去了站上陽光下的勇氣。', psychNote: '【共依存警訊】強化逃避行為會讓他的生活圈越來越萎縮。', stats: { affection: 12, security: 2, boundary: -18 } },
        { text: '生氣地責備他：「人家才講你兩句你就想逃跑解約，你也太沒出息了吧！」', reply: '溫言深深低下頭，連看都不敢再看你一眼。', psychNote: '羞辱性指責會徹底擊垮他僅存的自尊。', stats: { affection: -14, security: -18, boundary: -4 } }
      ]
    },
    e13: {
      title: 'E13｜過去的房間：被搶走的五年級卡片與母親的嘆息',
      prompt: '座談會圓滿落幕後的夜晚，溫言帶你打開他書桌最底層上鎖的抽屜，裡面放著一張被揉皺又小心翼翼用漿糊修補平整的國小五年級卡片。',
      charLine: '「我小時候講話有點口吃，我媽是學校的教務主任，每次親戚來家裡，她都會在我開口前捏我的手說『你別講話，別丟媽媽的臉』。小學五年級那年，我好不容易鼓起勇氣寫了這張卡片想跟班上同學交朋友，結果被惡作劇的男生搶走，站在講台上學我結巴的樣子大聲念出來，全班笑得東倒西歪……我哭著跑回家找媽媽，她卻只是看著我嘆了一口好長好長的氣，說：『溫言，為什麼你總是這麼不討人喜歡？』從那天起我就告訴自己——只要我把自己變成透明人、永遠不要伸出手，就不會再讓人嘆氣了。」',
      choices: [
        { text: '雙手捧起那張修補過的舊卡片貼在心口，再溫柔地抱住他：「五年級的溫言寫的卡片非常真誠。你從來都不是不討人喜歡的孩子，在我心裡，沒有人比你更溫柔、更值得被愛。」', reply: '溫言將臉埋在你的肩頭，壓抑了十幾年的委屈化作滾燙的淚水：「……謝謝你收下了五年級的我送出的卡片。」', psychNote: '【👑 終極成就解鎖】深刻療癒其童年「因生理弱點遭受同儕羞辱與母親情感拒絕」的核心羞恥創傷。', stats: { affection: 16, security: 18, boundary: 12 } },
        { text: '拿出一張精美的信紙，當場寫下一封給他的回信放進抽屜裡：「遲到了十五年的回信，現在送到你手上了。」', reply: '溫言捧著你的回信，手指輕輕摩挲著字跡，眼角帶淚地笑了：「這是我收過最珍貴的寶物。」', psychNote: '以跨越時空的溫暖回信完成創傷記憶的改寫。', stats: { affection: 14, security: 16, boundary: 10 } },
        { text: '氣憤地說：「那些同學跟妳媽太過分了！我們以後把所有人都當仇人！」', reply: '溫言嚇了一跳，小聲說：「不用這樣啦……現在有你就好了。」', psychNote: '畏避型渴望的是平靜接納而非激烈仇恨。', stats: { affection: 6, security: 4, boundary: -4 } },
        { text: '隨口說：「小男生開玩笑很正常啊，你居然記恨到現在，心眼也太小了吧。」', reply: '溫言臉色一白，默默把抽屜鎖上：「……對不起，是我太小心眼了。」', psychNote: '否定創傷感受會讓他再次退回自我封閉。', stats: { affection: -12, security: -16, boundary: -4 } }
      ]
    },
    e14: {
      title: 'E14｜最終約會：在陽光下抬起頭的雙人書頁',
      prompt: '灑滿春日陽光的圖書修復室窗邊，溫言不再縮在陰暗的書架角落，而是主動坐在陽光最明亮的長桌前，將一本扉頁印著「獻給我最摯愛的{player}」的全新譯作遞給你。',
      charLine: '「以前我只敢活在別人的故事和舊書頁裡。是{player}牽著我的手，讓我敢抬起頭看陽光、敢大聲說出自己的名字。未來我可能偶爾還是會害羞緊張，但只要有你在，我願意一直勇敢下去。」',
      choices: [
        { text: '翻開扉頁，主動握住他溫暖的手：「以後不管去哪裡，我們都並肩走在陽光下，一起寫屬於我們兩個人的故事。」', reply: '溫言細框眼鏡後的雙眼盛滿了清澈的愛意，紅著耳根卻堅定地傾身吻上你的唇。', psychNote: '【終章共鳴】陪伴畏避型走出透明人的角落，建立充滿安全感與自主勇氣的成熟關係。', stats: { affection: 15, security: 15, boundary: 12 } },
        { text: '請他在扉頁上親筆簽名，並大聲念出他寫給你的獻詞。', reply: '他清楚而溫柔地念完了整段話，臉上洋溢著自信與幸福的光彩。', psychNote: '肯定他的成長與自我表達。', stats: { affection: 14, security: 14, boundary: 10 } },
        { text: '說：「你還是別出門見人比較安全，以後一輩子待在修復室裡寫書給我看就好。」', reply: '他順從地點了點頭，剛長出來的翅膀又收了回去。', psychNote: '【共依存傾向】限制其社會參與以維持依賴。', stats: { affection: 8, security: 0, boundary: -14 } },
        { text: '微笑著收下書：「恭喜你出新書，我會永遠當你最忠實的讀者朋友。」', reply: '溫言溫和地微笑點頭：「謝謝你，我最重要的知己。」', psychNote: '停留在溫暖的知己關係。', stats: { affection: -6, security: -4, boundary: 6 } }
      ]
    }
  },

  bai_xiaolu: {
    e07: {
      title: 'E07｜防衛反撲：連代五天夜班的討好與崩潰',
      prompt: '這幾天你稍微鼓勵白小鹿「試著自己決定甜點配方」，她卻誤以為你嫌她煩、不想再管她了。為了證明自己「乖巧有用」，她竟然瞞著你連續五天幫咖啡廳所有同事代班到凌晨，直到今晚在廚房累到差點打翻熱糖漿。',
      charLine: '「對不起、對不起！{player}你不要生氣，也不要嫌我煩……只要我幫所有人把活都幹完、只要我乖乖聽話不給你添麻煩，你就不會像其他人一樣丟下我不管了對不對？你叫我做什麼都可以，求你別讓我自己拿主意……」',
      choices: [
        { text: '立刻關掉爐火扶她坐下，心疼而堅定地握住她的手：「小鹿，我讓你自己選配方是因為我相信妳的才華，絕對不是不要妳！妳不需要靠累壞自己來換取我的愛，就算妳拒絕別人，我也一樣愛妳。」', reply: '白小鹿呆呆地看著你，眼淚瞬間大顆大顆掉下來：「……真、真的嗎？原來我不用當工具人討好大家，你也不會丟下我……」', psychNote: '看穿依賴型「把鼓勵獨立誤解為拋棄前兆，進而用極端討好求生」的防衛，給予無條件的歸屬保證與健康界線。', stats: { affection: 12, security: 16, boundary: 12 } },
        { text: '陪她一起寫一張「小鹿的每週休息權利卡」貼在排班表旁，規定每週最多只能幫別人代班一次。', reply: '她看著那張休息卡，破涕為笑：「有{player}幫我見證，我明天就敢跟同事說我要休息了！」', psychNote: '協助依賴型建立具體的拒絕框架，練習自我保護。', stats: { affection: 11, security: 14, boundary: 10 } },
        { text: '心疼地抱住她說：「好，那以後妳連一個字都不用自己想！從穿衣服到交朋友全部由我下命令，妳只要當我的小洋娃娃就好！」', reply: '白小鹿安心地縮進你懷裡：「太好了……我最喜歡完全聽{player}的話了。」', psychNote: '【共依存警訊】順應她的退行依賴，徹底剝奪其成人自主能力。', stats: { affection: 14, security: 4, boundary: -18 } },
        { text: '生氣地數落她：「妳自己愛當爛好人幫別人代班，現在累倒了還怪我不幫妳做決定？真是沒救了！」', reply: '白小鹿嚇得渾身發抖，縮在廚櫃角落一個勁地磕頭道歉。', psychNote: '嚴厲指責會加深依賴型的無助感與被拋棄恐懼。', stats: { affection: -12, security: -16, boundary: -4 } }
      ]
    },
    e10: {
      title: 'E10｜雙人秘密：打烊廚房裡的專屬新配方與人生選擇權（邊界分水嶺）',
      prompt: '週末夜晚的咖啡廳後廚，白小鹿拿出一份青年甜點大賽的報名表，手裡卻同時拿著一張空白的切結書，眼神既渴望又害怕地看著你。',
      charLine: '「我、我其實偷偷研發了一款用迷迭香跟白桃做的千層酥……可是我媽以前常說我只要自己做決定就會搞砸一切。{player}，我好怕我去比賽會出醜，要不我還是別報名了，我把這張切結書簽給你，以後我這輩子只待在廚房烤你指定口味的麵包，一步都不離開你身邊好不好？」',
      choices: [
        { text: '溫柔地把切結書收起來，拿起筆放進她手裡，指著報名表：「妳烤的白桃千層酥一定很棒。小鹿，我愛的是閃閃發光的妳，不是被綁在廚房的妳。去報名吧，無論結果如何，我都在台下為妳鼓掌！」', reply: '白小鹿看著手裡的筆，眼淚滴在報名表上，卻第一次沒有問「好不好」，而是自己用力簽下了「白小鹿」三個字：「……謝謝你相信我能飛，我一定會烤出最棒的千層酥！」', psychNote: '【分水嶺：通往 True End】拒絕扮演控制型拯救者，賦予依賴型獨立嘗試與承擔風險的勇氣，同時提供穩固的安全基地！', stats: { affection: 15, security: 18, boundary: 16 } },
        { text: '先當她的第一位試吃員，誇讚她自己調配的迷迭香白桃比例非常有天賦，鼓勵她相信自己的味覺。', reply: '看到你驚豔的表情，小鹿眼睛亮了起來：「原來我自己決定的味道，真的很好吃！」', psychNote: '透過具體能力肯定強化其自我效能感（Self-efficacy）。', stats: { affection: 14, security: 16, boundary: 12 } },
        { text: '立刻撕掉報名表並收下切結書：「外面比賽太險惡了，妳這麼笨去了一定會被欺負！乖乖留在這裡一輩子聽我的話就夠了！」', reply: '白小鹿順從地依偎在你懷裡：「嗯，我哪裡都不去，這輩子都靠你養我了。」', psychNote: '【分水嶺：通往 Codependent End】複製她母親的洗腦模式，以保護為名折斷她的翅膀，鎖死主從共生。', stats: { affection: 20, security: 5, boundary: -25 } },
        { text: '不耐煩地推開她：「連報個名都要寫切結書問我，妳能不能別像個巨嬰一樣黏著我啊！」', reply: '白小鹿臉色慘白地跌坐在地上，覺得自己徹底被全世界拋棄了。', psychNote: '【分水嶺：通往 Trigger End】羞辱並推開她的依附需求，引爆徹底的崩潰。', stats: { affection: -18, security: -25, boundary: 0 } }
      ]
    },
    e11: {
      title: 'E11｜核心危機：控制狂母親的突襲與情緒勒索風暴',
      prompt: '青年甜點大賽初賽當天早上，白小鹿的母親突然衝進咖啡廳，當眾哭天搶地指責小鹿「翅膀硬了連媽媽都不聽」，還伸手要去砸小鹿剛做好的參賽蛋糕盒！小鹿嚇得瞬間退回童年模式，雙腿發軟差點跪下來跟母親回家。',
      charLine: '「媽媽別哭了……都是小鹿不好、小鹿不該自己報名的！{player}，我媽說得對，離了她我什麼都做不好，我還是放棄比賽跟媽媽回家鎖在房裡好了……」',
      choices: [
        { text: '上前一步穩穩護住蛋糕盒，禮貌而堅定地擋在小鹿身前對她母親說：「伯母，小鹿已經成年了，今天是她的比賽日，我們比完賽再跟您聯絡。」隨後轉頭握住小鹿的手：「小鹿，看我！拿好妳的蛋糕，妳自己走出去的那一步，我陪妳走！」', reply: '看著你為她撐起的安全界線，白小鹿發抖的雙腿終於站直了，她抱緊蛋糕盒對母親小聲卻清晰地說了一句：「媽，我今天要去比賽。」說完牽著你的手勇敢走出了大門！', psychNote: '在原生家庭共生絞殺的危機時刻，協助她設立人際邊界並完成人生第一次自主行動。', stats: { affection: 16, security: 18, boundary: 15 } },
        { text: '請游子謙幫忙泡茶安撫白媽媽留在店裡休息，你則幫小鹿叫計程車護送她準時抵達賽場。', reply: '在車上，小鹿緊緊握著你的手深呼吸，到了賽場後順利發揮出了真正實力。', psychNote: '有效隔離情緒勒索源，保護她的自主空間。', stats: { affection: 14, security: 15, boundary: 12 } },
        { text: '跟她媽媽大吵一架說：「小鹿現在歸我管了，以後她的每一件事都由我替她決定，輪不到妳管！」', reply: '雖然趕走了她母親，但小鹿只是從一個控制狂手裡換到了另一個控制狂手裡。', psychNote: '【共依存警訊】爭奪控制權而非賦權給當事人。', stats: { affection: 10, security: 2, boundary: -16 } },
        { text: '袖手旁觀說：「妳自己的家務事自己解決，既然妳這麼聽媽媽的話就跟她回去吧！」', reply: '小鹿含著眼淚被母親拖上車帶走，蛋糕盒掉在地上摔得粉碎。', psychNote: '在她最需要支持以突破家庭束縛時放手不管，導致其退回原點。', stats: { affection: -14, security: -18, boundary: -4 } }
      ]
    },
    e13: {
      title: 'E13｜過去的房間：被剪掉拉鍊的兒童背包與金絲雀籠',
      prompt: '比賽獲得佳作獎的夜晚，白小鹿帶你回到她房間，從衣櫃深處拿出一個粉紅色的小學帆布背包——背包上的拉鍊頭被剪掉了，裡面裝著一張從未蓋過章的「小學生夏令營」報名表。',
      charLine: '「我六歲的時候爸爸過世了，從那天起，媽媽每天晚上都會抱著我哭，把大門鎖上三道鎖。小學三年級那年我想跟同學去兩天一夜的露營，媽媽發現後大哭著把我的背包拉鍊剪壞，指著外面的大雨對我喊：『外面全都是壞人，小鹿這麼笨、連鞋帶都綁不好，沒有媽媽照顧妳一定會死在路邊的！』久而久之我就真的相信了——相信我是一個什麼都做不好的笨蛋，只要我敢自己做決定，愛我的人就會哭、就會不要我了。」',
      choices: [
        { text: '拿出一枚可愛的小鹿造型金屬鑰匙圈，親手幫那個舊背包換上新的拉鍊頭：「小鹿一點都不笨。從今天起，妳的背包拉鍊修好了，想去哪裡露營、想烤什麼甜點，妳都可以自己決定。」', reply: '白小鹿摸著修好的拉鍊頭，眼淚撲簌簌地落下，卻笑得比陽光還燦爛：「……我的背包終於可以自己打開、自己拉上了！」', psychNote: '【👑 終極成就解鎖】以極具象徵意義的修復行動，療癒其童年「被高焦慮母親剝奪自主性與習得性無助」的創傷。', stats: { affection: 16, security: 18, boundary: 14 } },
        { text: '緊緊抱住她溫柔地說：「以後不管妳做對還是做錯決定，我都不會哭、也不會怪妳，我們一起承擔。」', reply: '她安心地靠在你懷裡點頭：「有{player}這句話，我什麼都不怕試試看了！」', psychNote: '提供容錯的安全感，消除她對自主決策的恐懼。', stats: { affection: 14, security: 16, boundary: 12 } },
        { text: '氣呼呼地說：「妳媽真是太自私了，以後絕對不准再跟她聯絡！」', reply: '小鹿有些為難地咬著唇，心裡還是放不下母親。', psychNote: '健康界線不等於強迫切斷親情。', stats: { affection: 6, security: 4, boundary: -4 } },
        { text: '嘆氣說：「但妳現在確實還是很沒主見啊，習慣成自然很難改了啦。」', reply: '小鹿眼神一黯，默默把背包塞回衣櫃深處。', psychNote: '再次強化其無能信念。', stats: { affection: -12, security: -15, boundary: -4 } }
      ]
    },
    e14: {
      title: 'E14｜最終約會：自己挑選配方的雙人野餐籃',
      prompt: '風和日麗的週末午後，白小鹿第一次沒有事先問你「今天去哪裡、吃什麼」，而是自己背著修好拉鍊的帆布包，提著親手準備的野餐籃站在公寓花園等你，臉頰紅撲撲的。',
      charLine: '「{player}！今天的野餐地點是我自己看地圖選的，籃子裡的白桃塔跟伯爵茶也是我自己決定的喔！雖然出門前心臟還是跳得好快，但我做到了！從今天起，我想用『能夠自己站穩的小鹿』的身分，繼續愛你，好嗎？」',
      choices: [
        { text: '笑著接過一半重量的野餐籃，牽起她的手：「太棒了！那今天小鹿主廚帶路，我們一起去妳選的秘密基地野餐！」', reply: '白小鹿開心地原地小跳了一下，在花香與陽光中踮起腳尖吻上你的臉頰：「出發囉！」', psychNote: '【終章共鳴】見證依賴型從無助附庸蛻變為擁有自信與獨立人格的平等伴侶。', stats: { affection: 15, security: 15, boundary: 14 } },
        { text: '認真品嚐她準備的每一樣點心，給予最真誠具體的讚美。', reply: '她幸福地瞇起眼睛：「下次我還要研發更多新口味給你吃！」', psychNote: '持續滋養她的自主自信。', stats: { affection: 14, security: 14, boundary: 12 } },
        { text: '皺眉說：「妳怎麼沒問過我就自己選伯爵茶？我比較喜歡以前那個什麼都問我的小鹿。」', reply: '小鹿臉上的光彩瞬間黯淡下來：「對不起……那我下次不敢自己選了。」', psychNote: '【共依存傾向】打壓伴侶的獨立成長以維持掌控感。', stats: { affection: 4, security: -6, boundary: -16 } },
        { text: '微笑著拍拍她的頭：「看到妳能獨當一面真的太好了，我們永遠是最好的朋友。」', reply: '小鹿眼眶微濕，卻還是勇敢地笑著點頭：「嗯！謝謝你教會我長大！」', psychNote: '溫暖祝福彼此的獨立人生。', stats: { affection: -6, security: -4, boundary: 8 } }
      ]
    }
  },

  ji_yan: {
    e07: {
      title: 'E07｜防衛反撲：精確到分鐘的《雙人互動規範契約》',
      prompt: '自從上次在研究室對你產生心動後，紀嚴的心率統計表連續三天出現異常峰值。為了重新掌控局面，他今天約你在咖啡廳見面，推過來一份厚達十二頁、排版嚴謹的《人際互動時間與邊界管理辦法》。',
      charLine: '「最近因為你的出現，我的工作效率下降了百分之六點四，睡眠潛伏期延長了十八分鐘。為了避免情感變數導致系統崩潰，我制定了這份雙人互動SOP——今後每週見面兩次、每次四十五分鐘，禁止任何未經預約的偶遇與肢體接觸。請在第七頁簽名。」',
      choices: [
        { text: '拿起鋼筆在第七頁空白處畫了一個小小的愛心，溫和地看著他：「紀嚴，是因為越來越在乎我，才會緊張到寫出十二頁SOP對不對？我不簽冷冰冰的合約，但我答應你，去研究室找你前一定提前傳訊息。」', reply: '紀嚴看著那個破壞了完美排版的愛心，鏡片後的睫毛劇烈顫動了一下，耳根瞬間紅透：「……你違反了文件填寫規範。但、但提前傳訊息這一條，我勉為其難批准。」', psychNote: '看穿強迫型「用過度僵化的規則條文來防禦心動失控感（Isolation of affect）」的機制，溫柔接住他的緊張並給予可預測性。', stats: { affection: 12, security: 15, boundary: 10 } },
        { text: '認真翻閱完十二頁文件，笑著提議：「我們保留『互相尊重作息』的核心精神，但把『禁止偶遇』改成『偶遇時微笑點頭三秒鐘』作為彈性條款如何？」', reply: '紀嚴推了推眼鏡，思考了五秒後拿出紅筆修改：「三秒鐘屬於合理誤差範圍，修訂通過。」', psychNote: '尊重他的結構化語言，同時在規則中引入健康的彈性空間。', stats: { affection: 11, security: 14, boundary: 9 } },
        { text: '一字不差地簽名畫押：「我完全服從紀醫師的所有規定！連我每天幾點吃飯、幾點呼吸、穿什麼顏色的衣服都請你寫成SOP管我！」', reply: '紀嚴滿意地收起合約，卻也開始把你當成實驗室裡另一項必須嚴格控管的數據標本。', psychNote: '【共依存警訊】無底線順從強迫型的控制欲，會讓關係徹底失去溫度與彈性。', stats: { affection: 10, security: 4, boundary: -18 } },
        { text: '直接把十二頁文件揉成一團丟進垃圾桶：「談個戀愛還要簽十二頁SOP？你這種控制狂機器人自己去跟規章制度過一輩子吧！」', reply: '紀嚴看著被揉爛的文件，臉色瞬間刷白，手指緊緊扣住桌沿，一句話也說不出來。', psychNote: '粗暴摧毀其防禦結構並加以羞辱，會引發極度的失控恐慌與封閉。', stats: { affection: -12, security: -16, boundary: -4 } }
      ]
    },
    e10: {
      title: 'E10｜雙人秘密：停擺的懷錶與沒有清單的雨夜（邊界分水嶺）',
      prompt: '深夜十一點的圖書與研究檔案室，紀嚴獨自坐在長桌前。那只他隨身攜帶、象徵父親遺言與絕對準時的銀色懷錶，因為發條簧片疲勞斷裂而徹底停在了 23:10。他死死盯著不動的秒針，額頭滲出冷汗，呼吸急促得像快要窒息。',
      charLine: '「錶停了……我居然忘了計算發條金屬疲勞的週期！一旦時間失去基準，明天的研究會出錯、後天的審查會崩潰，然後就會像當年那場車禍一樣無可挽回……{player}，快幫我找備用計時器，一秒鐘都不能沒有刻度！」',
      choices: [
        { text: '沒有去拿計時器，而是走過去用雙手溫柔地覆蓋住他握著壞懷錶的手，將他的手貼在你平穩跳動的心口：「紀嚴，聽我的心跳。就算懷錶停了一晚，天也不會塌下來，我們每個人都平平安安地在這裡。」', reply: '掌心傳來你規律而溫熱的心跳聲，紀嚴緊繃到發抖的肩膀一點一點鬆懈下來，將額頭抵在你的肩窩長嘆了一口氣：「……原來沒有秒針的時候，你的心跳也能當我的時間基準。」', psychNote: '【分水嶺：通往 True End】在他的秩序象徵崩潰時，以真實溫暖的生命連結取代僵化的機械控制，打破「失誤即死亡」的強迫魔咒！', stats: { affection: 15, security: 18, boundary: 15 } },
        { text: '幫他把壞掉的懷錶收進絨布盒：「今晚我們先讓這只辛苦了十幾年的懷錶放個假，明天早上我陪你去找林見微一起修好它。」', reply: '聽到有具體的修復計畫，紀嚴深吸一口氣點了點頭：「……好，今晚就暫時交給你保管。」', psychNote: '給予合理的過渡安排與陪伴，緩解急性失控焦慮。', stats: { affection: 14, security: 16, boundary: 12 } },
        { text: '立刻拿出五個電子鬧鐘和碼錶擺滿整張桌子，陪他一整夜不睡覺盯著秒針讀秒：「我陪你一起盯著時間，我們這輩子一秒鐘都不准鬆懈！」', reply: '紀嚴死死盯著五個跳動的電子鐘，眼神更加緊繃偏執：「對，一秒鐘都不能錯……」', psychNote: '【分水嶺：通往 Codependent End】與他的強迫焦慮合謀，讓兩人永遠困在緊繃的讀秒牢籠裡。', stats: { affection: 20, security: 5, boundary: -25 } },
        { text: '把壞懷錶拿起來晃了晃冷笑：「不過是一只破錶壞了，你至於嚇成這樣嗎？真是病得不輕！」', reply: '紀嚴猛地奪回懷錶緊緊護在胸前，眼神瞬間結冰，轉身將你鎖在門外。', psychNote: '【分水嶺：通往 Trigger End】羞辱他與父親遺物相連的核心創傷，造成徹底決裂。', stats: { affection: -18, security: -25, boundary: 0 } }
      ]
    },
    e11: {
      title: 'E11｜核心危機：研究助理的數據疏失與道德完美風暴',
      prompt: '紀嚴主持的臨床倫理專案中，一名實習助理因粗心將兩組非核心對照組的標籤貼反了。雖然及時發現且完全不影響最終結論，紀嚴卻陷入了極度的道德與完美主義風暴，準備不眠不休獨自重做全部三千份樣本，並要自請處分辭去主持人職務。',
      charLine: '「只要有一個標籤貼錯，這份報告在道德與科學上就有了污點！我身為長子與主持人，沒有檢查出這個螺絲鬆動就是不可原諒的失職……別勸我休息，我要在天亮前把三千份樣本全部重測一遍！」',
      choices: [
        { text: '合上他的實驗紀錄本，直視他布滿血絲的眼睛：「紀嚴，你不是十一歲那年山路上的孩子了，一個對照組標籤貼反不會害死任何人！真正的負責任是寫入勘誤紀錄並建立雙人覆核機制，而不是用自我懲罰來贖罪。」', reply: '紀嚴渾身一震，看著你清澈堅定的目光，眼底積壓多年的罪惡感終於裂開一道縫隙：「……你說得對，我又把實驗室當成當年那輛吉普車了……謝謝你叫醒我。」', psychNote: '精準點破他將日常小疏失投射為童年車禍創傷的心理機制（準則 A1/A2/A3），幫助他區分「健康負責」與「強迫自懲」。', stats: { affection: 16, security: 18, boundary: 14 } },
        { text: '陪他一起把那兩組貼反的二十份樣本重新核對並撰寫透明的勘誤附錄，同時強制規定凌晨一點必須停工去睡覺。', reply: '在你的陪伴與監督下，他僅用兩小時就妥善修正了誤差，並在凌晨一點乖乖關燈休息。', psychNote: '引導他採取合乎比例原則的務實修正，而非全盤推翻重來。', stats: { affection: 14, security: 16, boundary: 12 } },
        { text: '幫他把貼錯的標籤偷偷撕下來銷毀：「我們把數據改掉假裝沒發生過，這樣你的報告就依然是一百分的完美無瑕了！」', reply: '紀嚴臉色劇變：「竄改數據違反學術倫理底線！我絕不允許這種事！」', psychNote: '觸犯強迫型最看重的道德潔癖與誠信原則，會引發強烈反感。', stats: { affection: -10, security: -12, boundary: -14 } },
        { text: '冷嘲熱諷地說：「你平常管別人管得那麼嚴，結果自己的團隊還不是出包，真是雙標！」', reply: '紀嚴一言不發地轉身走進冷凍庫通宵重測，對你徹底關上了心門。', psychNote: '羞辱其專業權威會加重他的強迫自懲。', stats: { affection: -14, security: -18, boundary: -4 } }
      ]
    },
    e13: {
      title: 'E13｜過去的房間：少看一眼的右後輪警示燈與十一歲的雨夜',
      prompt: '在林見微幫忙修好那只銀色懷錶的夜晚，紀嚴帶你來到他書房最整潔的玻璃櫃前，取出一張十一歲那年全家露營出發前在吉普車旁拍的合照，照片背面寫著一排力透紙背的字：「絕不再犯錯」。',
      charLine: '「十一歲那年夏天，身為工程師的爸爸帶全家去山區露營，出發前把檢查清單交給我，讓我幫忙核對裝備跟胎壓。那時候我急著想玩新買的望遠鏡，少看了一眼右後輪胎壓不足的警示燈，就跟爸爸說『檢查完畢』……結果下山時暴雨打滑，吉普車翻下邊坡，爸爸為了用身體護住我當場重傷過世。他在救護車上握著我的手，留下的最後一句話是：『阿嚴，你是長子，以後家裡不能再出任何差錯了。』{player}，這十八年來，我每天對著清單檢查十遍門鎖、連一分鐘都不敢遲到，因為我好怕只要我鬆懈一秒鐘，我愛的人又會因為我的疏忽而死掉……」',
      choices: [
        { text: '解開他襯衫最上面那顆緊繃的第一顆鈕扣，將他緊緊擁入懷中：「阿嚴，那場大雨車禍不是十一歲的你的錯。你已經當了十八年滿分的長子了，在我身邊，你可以卸下十字架，偶爾犯錯、偶爾遲到也沒關係。」', reply: '向來克制自持的紀嚴在你懷裡渾身顫抖，滾燙的淚水終於滴落在潔白的研究袍上：「……十八年了，終於有人告訴我，我可以不用再背著那輛車活下去了。」', psychNote: '【👑 終極成就解鎖】深刻同理其強迫症與強迫型人格背後「倖存者內疚與防止災難重演」的童年創傷，給予最深層的寬恕與釋放。', stats: { affection: 16, security: 18, boundary: 12 } },
        { text: '握住他的手，在那張照片背面輕輕寫下一行字：「爸爸也希望阿嚴能幸福輕鬆地長大。」', reply: '紀嚴凝視著那行字，摘下眼鏡拭去眼角的淚水，對你露出了如釋重負的溫柔微笑。', psychNote: '協助他重新詮釋父親的遺言，從詛咒轉化為祝福。', stats: { affection: 14, security: 16, boundary: 10 } },
        { text: '嚴肅地說：「那確實是你小時候太粗心了，所以你這輩子都必須更嚴格檢查所有事來贖罪！」', reply: '紀嚴眼神一黯，重新把第一顆鈕扣扣得死緊：「……你說得對，我不能原諒自己。」', psychNote: '加重其倖存者罪惡感，讓強迫枷鎖更加沉重。', stats: { affection: -10, security: -14, boundary: -8 } },
        { text: '隨口說：「車禍是意外跟輪胎有什麼關係，你一個法醫怎麼連這種基本因果關係都想不通啊？」', reply: '紀嚴默默收回照片放進櫃子鎖好：「……感性與理性確實無法相通，請回吧。」', psychNote: '冷漠的說理無法觸及創傷記憶的情感核心。', stats: { affection: -12, security: -15, boundary: -4 } }
      ]
    },
    e14: {
      title: 'E14｜最終約會：刻意留白一整頁的雙人週末日程表',
      prompt: '週六早晨的陽光灑在公寓交誼廳，紀嚴穿著沒有打領帶的休閒白襯衫，袖口自然捲起。他將他的真皮萬年曆筆記本遞給你——向來以 15 分鐘為單位寫滿的週末頁面，今天竟然整整兩頁全是一片空白，只在正中央寫著你的名字。',
      charLine: '「我還是習慣把書按高度排好，還是喜歡準時起床。但從今天起，我每週都會在日程表上為{player}留出完全空白的兩天——不設鬧鐘、不列清單，走到哪裡算哪裡。你願意成為我生命裡最美好的『計畫外變數』嗎？」',
      choices: [
        { text: '合上他的筆記本，笑著牽起他的手：「那我們現在就出發，去過一個沒有時刻表、卻每一秒都屬於我們的週末！」', reply: '紀嚴鏡片後的雙眼漾起溫潤而寵溺的笑意，在晨光中低頭溫柔地吻住你：「遵命，我的最高優先級。」', psychNote: '【終章共鳴】保留強迫型可靠的秩序特質，同時在愛裡學會擁抱留白與未知的浪漫。', stats: { affection: 15, security: 15, boundary: 12 } },
        { text: '在空白頁的角落畫上一顆小太陽：「這兩天的唯一行程，就是跟紀嚴一起曬太陽發呆。」', reply: '他珍重地撫過那顆小太陽：「這是我見過最完美的行程規劃。」', psychNote: '溫暖接納彼此的節奏。', stats: { affection: 14, security: 14, boundary: 10 } },
        { text: '把他的筆記本搶過來撕掉：「以後你一頁日程表都不准寫，連上班也不准看手錶！」', reply: '他眉頭微蹙，雖然勉強配合，心裡卻感到隱隱的不安。', psychNote: '【共依存傾向】強行抹殺對方的秩序感習慣。', stats: { affection: 6, security: -4, boundary: -14 } },
        { text: '微笑著把筆記本還給他：「很高興看到你學會放鬆了，我最敬重的紀醫師朋友。」', reply: '紀嚴溫和而有禮地點頭致意：「謝謝你這段時間的陪伴，我的摯友。」', psychNote: '維持互相敬重的知己關係。', stats: { affection: -6, security: -4, boundary: 6 } }
      ]
    }
  },

  lu_qinglan: {
    e07: {
      title: 'E07｜防衛反撲：打翻的金漆碗與豁達假面下的自卑推開',
      prompt: '昨天你在陶藝工坊不小心提到某本醫學期刊的文章，今天下午你再去工坊找陸晴嵐時，發現她正一邊大笑一邊把剛修補好的幾只金繼茶碗全部塞進紙箱裡，看到你進來，她突然收起笑容把門擋住。',
      charLine: '「{player}，你別再每天跑來工坊找我玩了啦！我現在是個腦袋撞壞、講話沒遮攔、連手指都會突然抽筋打破碗的半殘廢陶藝工，早就不配跟你們這種聰明正常的人在一起了。趁我還沒失控對你亂發脾氣之前，你快去找個情緒穩定的正常人談戀愛吧！」',
      choices: [
        { text: '穩穩扶住門框看著她的眼睛：「我昨天提醫學期刊不是在懷念以前的陸醫師，我喜歡的就是現在這個會大笑、會帶我看金繼裂痕的陸晴嵐。不管妳的手會不會抖，我都想留在妳身邊。」', reply: '陸晴嵐臉上逞強的爽朗瞬間垮了下來，眼淚啪嗒啪嗒掉在工作圍裙上：「……你騙人，連我以前的未婚夫都說現在的我像個瘋婆子……你真的喜歡車禍後的這個我嗎？」', psychNote: '看穿額葉腦傷性格改變者「用嘻笑怒罵掩飾喪失過往菁英自我的深深自卑」，給予當下自我的無條件肯定。', stats: { affection: 12, security: 16, boundary: 10 } },
        { text: '自然地幫她把紙箱裡的金繼茶碗拿出來擺回架上：「這麼美的茶碗收起來太可惜了，今天我當妳的學徒，我們一起慢慢磨金粉。」', reply: '她破涕為笑，用力抹了抹眼角：「好啦！既然大徒弟都不怕被我連累，那師父就繼續教你！」', psychNote: '以平常心與實際陪伴化解她的退縮防衛。', stats: { affection: 11, security: 14, boundary: 9 } },
        { text: '把她按在椅子上說：「妳就是個腦傷病人，以後什麼話都不准說、什麼事都不准做，一切由我這個正常人來照顧管理妳！」', reply: '陸晴嵐眼底的光芒瞬間熄滅，像個真正的重症病患一樣垂下了頭。', psychNote: '【共依存警訊】將她徹底貼上「失能病人」標籤並剝奪自主尊嚴。', stats: { affection: 6, security: -6, boundary: -18 } },
        { text: '嘆了口氣說：「妳說得也對，跟情緒陰晴不定的人相處確實滿累的，那我先走了。」', reply: '陸晴嵐砰地關上工坊大門，背靠著門板滑坐在地無聲痛哭。', psychNote: '印證她「車禍後的自己不值得被愛」的創傷信念。', stats: { affection: -12, security: -16, boundary: -4 } }
      ]
    },
    e10: {
      title: 'E10｜雙人秘密：額角金箔髮夾下的手術疤痕（邊界分水嶺）',
      prompt: '夜晚的畫室裡，只點著一盞溫暖的工作檯燈。陸晴嵐洗完臉走出來，罕見地摘下了平時用來遮掩右額角的那枚金箔髮夾——髮際線下露出一道長達七公分、蜿蜒深刻的開顱手術疤痕。她沒有開玩笑，只是安靜而脆弱地站在你面前。',
      charLine: '「三年前車禍醒來第一次照鏡子時，我認不出裡面那個剃光頭髮、講話會突然爆哭或爆笑的女人是誰。以前的陸醫師優雅、冷靜、從不失態；現在的我卻連眼淚都剎不住車……{player}，看著這道疤，你真的不會覺得我是個壞掉的瑕疵品嗎？」',
      choices: [
        { text: '伸手極其溫柔地撫過她右額角的手術疤痕，就像撫摸瓷器上最美的金繼紋路：「晴嵐，這道疤不是瑕疵，是妳從死神手裡勇敢活下來的勳章。以前的陸醫師很優秀，但現在這個真實鮮活的陸晴嵐，才是我深愛的人。」', reply: '陸晴嵐閉上眼睛感受你指尖的溫度，滾燙的淚水順著臉頰滑落，卻露出了這三年來最平靜、最幸福的笑容：「……原來我自己的裂痕，也終於被你塗上金箔了。」', psychNote: '【分水嶺：通往 True End】將「金繼（Kintsugi）接納裂痕」的哲學延伸到她的腦傷疤痕與新性格上，完成最深層的自我整合與接納！', stats: { affection: 15, security: 18, boundary: 15 } },
        { text: '幫她把金箔髮夾別在胸前當胸針：「在我們兩個人面前，不用遮住這道疤也沒關係，它跟妳一樣美。」', reply: '她摸了摸露出來的額角，釋懷地笑了起來：「好，在你面前我就不藏了！」', psychNote: '創造無需偽裝與遮掩的安全親密空間。', stats: { affection: 14, security: 16, boundary: 12 } },
        { text: '連忙幫她把髮夾戴回去遮住疤痕：「還是遮起來比較好看，妳以後少講話、少笑，努力裝回以前那個優雅冰冷的女醫師樣子給我看！」', reply: '陸晴嵐眼神一黯，僵硬地收起所有表情：「……好，我努力裝回以前的樣子。」', psychNote: '【分水嶺：通往 Codependent End】否定她現在的真實模樣，強迫她扮演已經回不去的過去幻影。', stats: { affection: 16, security: -4, boundary: -22 } },
        { text: '皺眉退後半步：「這道開顱疤痕看起來確實滿嚇人的，妳以後還是戴著帽子出門吧！」', reply: '陸晴嵐像被燙傷一樣摀住額頭，眼底的光瞬間碎裂。', psychNote: '【分水嶺：通往 Trigger End】對身體與腦傷創痕的嫌惡，會造成毀滅性的羞恥打擊。', stats: { affection: -18, security: -25, boundary: 0 } }
      ]
    },
    e11: {
      title: 'E11｜核心危機：昔日醫學院同僚與前未婚夫的偶遇羞辱',
      prompt: '你陪陸晴嵐去美術館運送參展的金繼陶藝作品時，在大廳迎面撞見了她車禍前醫院的副院長與前未婚夫。對方看到晴嵐沾著陶土的衣服與大嗓門，當眾露出惋惜又鄙夷的表情說：「真可惜，當年的天才腦外科醫師，現在居然變得這麼粗俗瘋癲。」晴嵐的呼吸瞬間急促起來，額角青筋微跳，手裡的陶匣劇烈發抖。',
      charLine: '「我、我才沒有瘋癲！我的額葉只是抑制迴路受損，我的智商跟記憶力根本沒退化……為什麼你們每個人都要用看屍體的眼神看我？！{player}，我氣到腦袋嗡嗡叫、手停不下來了……」',
      choices: [
        { text: '一手穩穩接過她手中的陶匣，一手緊緊牽住她發抖的手，不卑不亢地對前未婚夫說：「陸晴嵐老師現在是本館特邀的金繼藝術家，懂得欣賞生命裂痕的人自然懂她的價值。」隨後帶她走進展廳安靜區深呼吸。', reply: '前未婚夫討了個沒趣悻悻離去。走進展廳後，晴嵐靠在你肩上眼淚奪眶而出，幾秒後又破涕為笑：「……你剛剛叫我陸老師的樣子帥呆了！我的手一點都不抖了！」', psychNote: '在創傷觸發與情緒失調（準則 A/B/C）的當下，替她穩住尊嚴並迅速帶離高刺激衝突現場，協助其前額葉恢復調節。', stats: { affection: 16, security: 18, boundary: 14 } },
        { text: '帶著她直接把金繼作品擺上主展台，讓周圍觀眾對作品的驚嘆掌聲蓋過剛才的酸言酸語。', reply: '聽著觀眾對金繼茶碗的讚美，晴嵐挺起胸膛露出了驕傲的笑容：「沒錯！拿手術刀跟拿畫筆的我一樣棒！」', psychNote: '以當下的真實成就鞏固新的自我認同。', stats: { affection: 14, security: 16, boundary: 11 } },
        { text: '慫恿晴嵐當場把參展陶碗砸在對方臉上大鬧美術館！', reply: '場面徹底失控鬧上警局，對方更是指著晴嵐大喊「你看她果然腦子壞了會傷人」，讓晴嵐事後懊悔痛哭。', psychNote: '【共依存警訊】順應去抑制衝動會讓她在社會功能上遭受更大挫敗。', stats: { affection: 8, security: -8, boundary: -18 } },
        { text: '拉了拉她的袖子小聲抱怨：「妳剛剛在大廳講話確實太大聲太失態了，難怪妳前未婚夫會那樣說妳。」', reply: '陸晴嵐難以置信地看著你，像被抽走了所有力氣般跌坐在長椅上。', psychNote: '與羞辱者站在同一陣線批判她的腦傷後遺症，是最大的背叛。', stats: { affection: -16, security: -22, boundary: -4 } }
      ]
    },
    e13: {
      title: 'E13｜過去的房間：收起的銀色手術刀與第一只金繼碗',
      prompt: '展覽大獲好評後的深夜，陸晴嵐帶你打開工坊閣樓的木箱，裡面並排放著兩樣東西：一套擦得雪亮卻再也沒打開過的神經外科顯微器械盒，以及一只修補得歪歪扭扭、滿是金疙瘩的粗陶碗。',
      charLine: '「三年前那場暴雨夜，為了趕回醫院救一個腦動脈瘤破裂的病人，我的車在高速公路被追撞翻了三圈。右側前額葉眼眶皮質挫傷出血……醒來復健兩年後，我發現自己再也沒辦法拿穩 0.1 毫米的顯微手術刀，而且只要一激動就會克制不住大笑或大哭。所有人都在悼念以前那個完美冷靜的陸醫師，好像現在還活著的我是個冒牌貨。直到我遇見金繼工藝，把第一只被我手抖摔破的碗用金粉黏回來……{player}，謝謝你愛上了這個被黃金重新拼湊起來的我。」',
      choices: [
        { text: '一手輕撫那盒外科器械，一手捧起那只金繼粗陶碗，溫柔地抱住她：「以前拿手術刀救人的是妳，現在用金繼療癒人心的也是妳。妳從來不是冒牌貨，過去和現在的每一個妳，我都愛。」', reply: '陸晴嵐在你懷裡嚎啕大哭，哭完又笑著用力親了你的臉頰一下：「……這輩子能遇到你，我那場車禍就算沒白撞了！」', psychNote: '【👑 終極成就解鎖】協助創傷性腦損傷（TBI）導致性格改變的個體，完成「創傷前自我」與「創傷後新自我」的哀悼與整合。', stats: { affection: 16, security: 18, boundary: 12 } },
        { text: '陪她一起用絲絨布把手術器械盒妥善封存紀念，再把那只初代金繼碗擺在工坊最顯眼的鎮店之寶位置。', reply: '她看著並排的過去與現在，眼神清澈而堅定：「我終於可以跟過去的自己好好說再見了。」', psychNote: '具有儀式感的告別與重生。', stats: { affection: 14, security: 16, boundary: 10 } },
        { text: '說：「我們每天練十小時拿針，一定要逼妳的手恢復到以前當外科醫師的水準！」', reply: '晴嵐看著自己微顫的指尖，苦笑著搖了搖頭。', psychNote: '忽視器質性損傷的不可逆性而強求復原，會帶來無止境的挫折。', stats: { affection: 4, security: -4, boundary: -8 } },
        { text: '嘆氣說：「從名醫變成做手工藝的，落差真的太大了，換作是我一定受不了。」', reply: '晴嵐臉上的笑容漸漸淡去，默默蓋上了木箱。', psychNote: '強化社會階級落差感會刺傷她的自尊。', stats: { affection: -10, security: -14, boundary: -4 } }
      ]
    },
    e14: {
      title: 'E14｜最終約會：用純金連結彼此裂痕的對杯',
      prompt: '夕陽西下的公寓交誼廳，陸晴嵐笑盈盈地捧出兩只剛出窯的青瓷對杯——她特意將兩只杯子邊緣的一道自然窯裂紋對齊，用璀璨的 24K 純金描繪成一顆相連的心形。',
      charLine: '「我這個人呢，以後可能還是會講話太直、還是會三秒鐘前掉眼淚三秒鐘後哈哈大笑！但我的心就像這道金繼線一樣，一旦跟你黏在一起，就比原本的瓷器還要堅固十倍！{player}，你要不要收下我這個吵吵鬧鬧的伴侶呀？」',
      choices: [
        { text: '舉起其中一只金繼杯與她的杯子輕輕相碰：「我最喜歡妳真實直率的樣子。未來的每一天，我們都一起大笑、一起把生活的裂痕補成黃金！」', reply: '清脆的碰杯聲中，陸晴嵐開心地撲進你懷裡，在夕陽下給了你一個熱情如火的吻！', psychNote: '【終章共鳴】擁抱生命的不完美與鮮活真性情，達成充滿生命力的金繼之愛。', stats: { affection: 15, security: 15, boundary: 12 } },
        { text: '用這對金繼杯倒滿溫暖的桂花釀，與她喝下象徵一生羈絆的交杯茶。', reply: '她喝完茶，臉頰紅通通地靠在你肩上：「甜到心裡去了！」', psychNote: '溫暖而平等的承諾。', stats: { affection: 14, security: 14, boundary: 10 } },
        { text: '說：「我可以跟妳在一起，但妳出門在外面絕對不准大聲笑也不准亂講話。」', reply: '晴嵐吐了吐舌頭，眼神卻有些委屈與拘束。', psychNote: '【共依存傾向】試圖壓抑伴侶的自然天性。', stats: { affection: 6, security: -2, boundary: -14 } },
        { text: '微笑著收下杯子：「這對杯子太美了，我們永遠是彼此最棒的知己好友！」', reply: '晴嵐豪爽地拍拍你的肩膀：「沒問題！好知己一輩子！」', psychNote: '豁達溫暖的知己情誼。', stats: { affection: -6, security: -4, boundary: 6 } }
      ]
    }
  },

  you_ziqian: {
    e07: {
      title: 'E07｜防衛反撲：加了雙倍濃縮的苦咖啡與微笑冷戰',
      prompt: '昨天你無意間請游子謙幫忙順手改一張活動傳單，他當時笑瞇瞇地連聲說「好呀好呀完全沒問題」。結果今天下午你去咖啡廳拿傳單時，他不僅笑著說「哎呀我不小心把隨身碟丟進洗衣機洗壞了呢」，端給你的拿鐵還苦得像中藥。',
      charLine: '他雙手托腮，臉上掛著無懈可擊卻一點溫度都沒有的微笑：「怎麼了{player}？咖啡太苦了嗎？真對不起喔，我昨晚為了幫大家做雜事太累了，手滑多壓了兩份濃縮呢～反正我就是這麼粗心大意又沒用的人，你一定在心裡罵死我了吧？」',
      choices: [
        { text: '放下咖啡杯，溫和而直率地看著他的眼睛：「子謙，昨天請你臨時改傳單是不是讓你覺得被當成免費工具人了？如果不想做或太累，你可以直接跟我說『不』，不用對我笑著喝苦咖啡。」', reply: '游子謙臉上完美的假笑瞬間僵住了兩秒，眼神閃過一絲慌亂，隨即把那杯苦咖啡端走換成一杯溫牛奶：「……你這個人真的很犯規耶。明明我都在擺爛氣你了，你居然還替我問我累不累。」', psychNote: '看穿被動攻擊型「不敢直接拒絕，只能用故意忘記、弄壞東西與自嘲酸話來表達憤怒」的防衛，賦予他安全說「不」的權利。', stats: { affection: 12, security: 16, boundary: 12 } },
        { text: '與他約定一個「真心話暗号」：「以後只要你把手背在後面說『沒問題』，我就知道其實是『我不情願』，那我就絕對不勉強你。」', reply: '他噗哧一聲笑了出來，耳根微紅：「那你可要看仔細我的手囉。」', psychNote: '為害怕正面衝突的他設計低壓力的拒絕管道，逐步減少被動抵抗。', stats: { affection: 11, security: 14, boundary: 10 } },
        { text: '把整杯苦到發澀的咖啡硬吞下去討好他：「一點都不苦！只要是你泡的，就算加了鹽巴我也全部喝光，求你別對我冷淡！」', reply: '游子謙笑彎了眼：「{player}真好說話呢～」心裡卻覺得你跟其他人一樣根本看不懂他的真實情緒。', psychNote: '【共依存警訊】無底線吞下對方的隱性攻擊，只會讓被動攻擊模式變本加厲。', stats: { affection: 10, security: 0, boundary: -16 } },
        { text: '當場拍桌大罵：「不想改傳單就直說！故意洗壞隨身碟還泡苦咖啡整我，你這個人怎麼這麼陰險雙面啊！」', reply: '游子謙立刻眼眶泛紅地向全店客人鞠躬：「對不起！都是我手笨惹{player}生氣了！」瞬間讓你成了仗勢欺人的惡人。', psychNote: '正面暴怒指責會正中被動攻擊者的下懷，讓他順理成章退回「無辜受虐者」的位置。', stats: { affection: -12, security: -16, boundary: -6 } }
      ]
    },
    e10: {
      title: 'E10｜雙人秘密：打烊吧台後的摔杯子練習與真實眼淚（邊界分水嶺）',
      prompt: '深夜打烊後的咖啡廳，游子謙剛剛接完家裡催他回去相親並幫弟弟還貸款的電話。電話裡他全程溫柔地笑著說「好的媽媽、我沒有不開心呀」，掛斷電話的那一刻，他卻死死咬住自己的手背直到滲出血絲，整個人蹲在吧台後面渾身發抖，臉上卻還掛著扭曲的微笑。',
      charLine: '「我沒有生氣喔……我們家的人最相親相愛了，當哥哥的本來就該笑著犧牲一切嘛……{player}，你看我笑得多好看，我一點都不委屈對不對？」',
      choices: [
        { text: '蹲下來輕輕拉開他咬著的手背，把一只淘汰的舊瓷杯塞進他手裡：「子謙，在我面前不用笑！你可以生氣、可以罵人，現在把這只舊杯子摔在地上，大聲說一句『我氣死了』！」', reply: '游子謙怔怔地看著你，眼淚突然奪眶而出。他顫抖著手把舊杯子摔在地板上，「啪」的一聲脆響後，他終於卸下二十六年的假笑，抱住你放聲痛哭：「……我好生氣！我真的覺得好不公平、好委屈……原來生氣說出來不會被討厭……」', psychNote: '【分水嶺：通往 True End】創造安全宣洩真實憤怒的空間，打破他「一旦生氣就會遭受冷暴力拋棄」的童年制約，讓真實情感重見天日！', stats: { affection: 15, security: 18, boundary: 15 } },
        { text: '溫柔地抱住發抖的他，替他擦掉手背上的齒痕：「覺得委屈就皺眉頭吧，今晚我幫你把手機關機，誰都不能再逼你笑。」', reply: '他把臉埋在你肩窩裡，第一次毫無防備地皺起眉頭哭了出來：「……只有你准我不笑。」', psychNote: '接納他的負面情緒，解除他必須時刻維持和諧假面的枷鎖。', stats: { affection: 14, security: 16, boundary: 12 } },
        { text: '說：「那我幫你把錢還清，以後你也不用對別人笑，只要每天假笑著服侍我一個人、當我的專屬僕人就好！」', reply: '游子謙擦乾眼淚，重新掛上那副空洞而順從的微笑：「好呀，都聽你的～」', psychNote: '【分水嶺：通往 Codependent End】用金錢與控制收編他的順從假面，讓他永遠無法活出真實自我。', stats: { affection: 20, security: 5, boundary: -25 } },
        { text: '冷冷地看著他：「你在電話裡自己答應得那麼痛快，掛了電話才在這邊自殘演苦肉計給誰看啊？太假了吧！」', reply: '游子謙緩緩站起身，臉上的表情徹底焊死成一張毫無破綻的微笑面具：「是呀，我最愛演戲了，慢走不送喔。」', psychNote: '【分水嶺：通往 Trigger End】在他瀕臨崩潰的求救時刻給予嘲諷，讓他徹底鎖死真實心門。', stats: { affection: -18, security: -25, boundary: 0 } }
      ]
    },
    e11: {
      title: 'E11｜核心危機：設計大展截稿前夕的「自我破壞」衝動',
      prompt: '游子謙入圍了極具份量的青年視覺設計大賞，明天中午十二點就是最終上傳截稿時間。這本該是他擺脫家庭控制、證明自我的機會，但他卻在截稿前一晚坐在電腦前發呆，故意拖延著不肯按輸出鍵，甚至準備「不小心」把整杯水打翻在主機上。',
      charLine: '「反正就算我認真交稿，評審一定也會覺得我的作品很普通；要是家裡知道了，又會拿去當炫耀的工具……不如現在電腦剛好壞掉，這樣我沒得獎也只是因為運氣不好，誰都不能怪我沒實力對不對？」',
      choices: [
        { text: '及時伸手接住他快要推倒的水杯，溫柔而堅定地握住他放在滑鼠上的手：「子謙，別因為害怕被控制或怕輸，就親手毀掉自己最愛的作品！這個獎不是為了你爸媽拿的，是為了游子謙自己。我們現在一起存檔上傳！」', reply: '游子謙看著被你穩穩護住的主機與手掌，眼眶微紅地深吸了一口氣：「……你連我想用『電腦壞掉』來逃跑都看穿了。好，這次我不逃了，我們一起按上傳！」', psychNote: '精準攔截被動攻擊與自我設障（Self-handicapping）的防衛機制，幫助他為自己的真正渴望負起責任。', stats: { affection: 16, security: 18, boundary: 14 } },
        { text: '幫他把檔案先備份到雲端與你的隨身碟：「檔案我已經幫你雙重備份好了，就算水打翻也沒用喔！放心交出去吧，你的設計超棒的。」', reply: '他看著雙重備份，無奈又感動地笑出聲：「連退路都被{player}封死了，那我只好堂堂正正去拿獎囉。」', psychNote: '以溫和幽默的行動阻斷其消極破壞退路，給予堅定支持。', stats: { affection: 14, security: 16, boundary: 12 } },
        { text: '幫他把水倒進電腦主機裡：「對！我們把電腦弄壞，明天我就去跟主辦單位大吵一架說他們系統有問題！」', reply: '電腦冒出黑煙報銷，游子謙看著毀掉的心血，內心深處卻充滿了空虛與遺憾。', psychNote: '【共依存警訊】成為他自我破壞與怪罪外界的共犯。', stats: { affection: 10, security: -6, boundary: -18 } },
        { text: '生氣地摔門：「你自己愛拖延擺爛毀掉前途隨便你，以後別再跟我抱怨你懷才不遇！」', reply: '游子謙獨自坐在黑暗中，默默刪除了整個設計資料夾。', psychNote: '憤怒拋棄會讓他用徹底的自我毀滅來完成對你的隱性報復。', stats: { affection: -14, security: -18, boundary: -4 } }
      ]
    },
    e13: {
      title: 'E13｜過去的房間：不准皺眉的全家福與藏在床底的零分考卷',
      prompt: '獲得設計大賞銀獎的夜晚，游子謙帶你回到他的私人工作室，從書櫃夾層裡抽出一張裱框的童年全家福——照片裡十歲的他笑得嘴角僵硬，而相框背面卻夾著一張被撕碎又黏起來的美術比賽報名表。',
      charLine: '「我們家有一條絕對不能違反的家規，叫做『我們家永遠相親相愛，誰都不准皺眉頭或頂嘴』。十歲那年我說不想去念爸媽安排的珠算班、想去畫畫，結果爸媽整整三個禮拜不跟我講話，把我當空氣，直到我在客廳跪下來哭著懺悔『都是我自私不懂事』才肯理我。從那之後我就學會了——正面說『不』會死得很慘，但只要我笑瞇瞇地說『好呀』，然後『剛好發燒』、『不小心忘記帶准考證』，他們就沒辦法處罰我了。{player}，我戴著這張笑臉面具二十年，差點連我自己都忘了不笑的時候長什麼樣子……」',
      choices: [
        { text: '伸手輕輕揉開他習慣性上揚的嘴角，將他擁入懷中：「那個跪在客廳裡不敢皺眉的十歲男孩辛苦了。從今以後，在我身邊你可以光明正大地皺眉、生氣、說不想要，我永遠不會對你冷暴力。」', reply: '游子謙緊緊抱住你的腰，把臉埋在你懷裡哭得毫無防備：「……謝謝你把真正的我的臉找了回來。」', psychNote: '【👑 終極成就解鎖】深刻同理被動攻擊型人格背後「高壓偽善家庭與冷暴力懲罰」造成的習得性防衛，完成安全依附的重建。', stats: { affection: 16, security: 18, boundary: 12 } },
        { text: '拿出一支畫筆，陪他一起在全新畫紙上畫出一幅「每個人都可以做鬼臉」的雙人自畫像。', reply: '他看著畫紙上吐舌頭皺眉的自己，開心地笑了出來——這一次，笑意真正抵達了眼底。', psychNote: '以幽默溫暖的藝術創作釋放被壓抑的真實情緒。', stats: { affection: 14, security: 16, boundary: 10 } },
        { text: '說：「那我們以後也用這招去陰所有討厭的人，表面對他們笑，背後偷偷搞垮他們！」', reply: '游子謙愣了一下，覺得這樣好像只是把童年的陰影繼續複製下去。', psychNote: '強化暗中破壞的防衛機制而非療癒。', stats: { affection: 6, security: -2, boundary: -10 } },
        { text: '搖頭說：「說到底就是你小時候不敢反抗，長大才養成這種陽奉陰違的壞習慣嘛。」', reply: '游子謙臉上的真誠瞬間消失，又掛回了那副客套疏離的營業微笑：「是呀，都是我的壞習慣呢。」', psychNote: '道德說教會讓他立刻重新戴上面具。', stats: { affection: -12, security: -16, boundary: -4 } }
      ]
    },
    e14: {
      title: 'E14｜最終約會：不加糖也不加假笑的真實手沖咖啡',
      prompt: '清晨陽光灑進咖啡廳的吧台，游子謙沒有穿那件印著標準笑臉的店員圍裙，而是穿著輕鬆的亞麻襯衫，親手為你沖了一壺散發純粹果香的淺焙手沖咖啡，臉上的神情溫柔而自在。',
      charLine: '「以前我泡咖啡總是習慣加很多奶泡跟焦糖拉花，就像我習慣把真心話藏在漂亮話後面一樣。但這一杯沒有加糖、也沒有拉花——{player}，這個偶爾會耍點小脾氣、但每一句『我愛你』都百分之百真心的游子謙，你願意收下嗎？」',
      choices: [
        { text: '端起咖啡與他碰杯，看著他清澈的眼睛：「我最喜歡這杯純粹真實的咖啡。以後不管甜還是苦，我們都坦坦白白地一起品嚐。」', reply: '游子謙眼底漾起無比真摯動人的光芒，傾身越過吧台溫柔地吻住你：「這輩子都不會再對你手滑或忘記存檔了，我保證。」', psychNote: '【終章共鳴】卸下被動攻擊的微笑假面，走向坦誠直率、能夠安全表達愛與不滿的健康伴侶關係。', stats: { affection: 15, security: 15, boundary: 12 } },
        { text: '送給他一塊寫著「店長今日心情：誠實營業中」的雙面小木牌掛在吧台。', reply: '他愛不釋手地摸著那塊木牌：「有你在，我每天都可以誠實營業！」', psychNote: '支持他持續練習真實表達。', stats: { affection: 14, security: 14, boundary: 10 } },
        { text: '說：「我還是比較喜歡你以前不管我多過分都笑著說『好呀』的樣子。」', reply: '游子謙眼神微黯，嘴角又習慣性地勾起了那抹假笑。', psychNote: '【共依存傾向】拒絕伴侶的真實成長，偏愛虛假的順從。', stats: { affection: 4, security: -6, boundary: -16 } },
        { text: '微笑著喝完咖啡：「這杯咖啡真的很好喝，我們永遠是可以說真心話的摯友。」', reply: '游子謙真誠地對你笑了笑：「能擁有一個不用假笑的朋友，我已經很幸福了。」', psychNote: '真誠溫暖的知己結局。', stats: { affection: -6, security: -4, boundary: 6 } }
      ]
    }
  }
};

// ==================== 12 角色專屬：額外日常閒聊池（供「🌸 日常相處」使用，與主線 E02/E03/E06 完全區隔、絕不重複或罐頭） ====================
export const EXTRA_DAILY_TALKS = {
  shen_mo: [
    {
      title: '便利商店的保存期限排查',
      prompt: '在巷口便利商店遇見沈墨，他正蹲在冷藏櫃前，把同一排鮮奶從最裡面那瓶拿到最外面逐一比對批號。',
      response: '「最外排第三瓶的封口膜有 0.5 毫米的按壓痕跡，不排除被人動過手腳。你要買的話，拿我手裡這瓶今天凌晨剛進貨、編號末三碼 049 的。」',
      choices: [
        { text: '笑著接過他手裡那瓶 049 號鮮奶：「有沈大顧問幫我把關食安，我喝得超安心，謝啦！」', reply: '沈墨耳根微熱地別過臉，順手幫你把鮮奶放進購物籃：「……順手而已，別買來路不明的開封飲品。」', psychNote: '以輕鬆感謝接納他的過度警覺習慣，讓他感受到被信任的溫暖。', stats: { affection: 6, security: 8, boundary: 5 } },
        { text: '拿起一包密封原裝的堅果放進他籃子裡：「你熬夜寫稿別光喝水，這個原廠鋁箔密封包裝很安全，補充點體力。」', reply: '他仔細檢查了一圈鋁箔封口，點了點頭：「包裝完整，我收下了。」', psychNote: '順應他的安全規則給予日常關懷，效果事半功倍。', stats: { affection: 7, security: 7, boundary: 6 } },
        { text: '開玩笑說：「你連買瓶牛奶都要當犯罪現場調查，店員都要以為你是神祕稽查員了！」', reply: '他淡淡地看了店員一眼：「小心駛得萬年船。」', psychNote: '溫和調侃雖未激怒他，但較難增進安全感。', stats: { affection: 2, security: 1, boundary: 2 } },
        { text: '直接拿了最外面那瓶被他嫌棄的鮮奶打開喝：「你看，根本沒毒啊，你別再疑神疑鬼了！」', reply: '沈墨臉色一沉，盯著你看了五秒確認你沒事後，頭也不回地走出了超商。', psychNote: '以身試險來否定他的警覺，只會讓他覺得你魯莽且不尊重他的提醒。', stats: { affection: -4, security: -6, boundary: -2 } }
      ]
    },
    {
      title: '雨天的雙重摺疊傘',
      prompt: '午後突然下起陣雨，你在公寓一樓玄關遇見準備出門的沈墨，發現他背包側袋竟然同時插著兩把一模一樣的黑色摺疊傘。',
      response: '「氣象局預報降雨機率只有百分之三十，但他們的預測模型常忽略局部地形微氣候。第二把是備用傘——既然遇到了，這把未拆封的給你。」',
      choices: [
        { text: '開心地收下備用傘：「你的風險預判簡直比氣象局還準！那我們一起撐傘走去巷口吧。」', reply: '沈墨撐開黑傘，自然地將傘面往你那側傾斜了十五度：「走內側，小心路面積水濺起。」', psychNote: '肯定他的未雨綢繆，將防衛性準備轉化為貼心的雙人日常。', stats: { affection: 8, security: 8, boundary: 6 } },
        { text: '跟他約定：「傘我借走，明天洗乾淨曬乾後，掛在你頂樓門把上還你。」', reply: '他點了點頭：「有借有還，我喜歡守信的人。」', psychNote: '清楚交代歸還方式，符合他對可預測性的偏好。', stats: { affection: 6, security: 7, boundary: 6 } },
        { text: '擠進他正在撐的那把傘下面：「我有你就不用撐第二把傘啦！」', reply: '突然縮小的個人空間讓他肩膀微微一僵，但終究沒有把你推開。', psychNote: '稍微越過了他習慣的物理邊界，但仍在可容忍範圍。', stats: { affection: 5, security: 2, boundary: -3 } },
        { text: '笑他：「大晴天背兩把傘重不重啊，你也太缺乏安全感了吧！」', reply: '他默默把備用傘塞回背包側袋：「那你自己淋雨吧。」', psychNote: '將他的善意分享貼上心理分析標籤，會讓他收回好意。', stats: { affection: -4, security: -6, boundary: -2 } }
      ]
    }
  ],

  lin_jianwei: [
    {
      title: '午後窗邊的微雕放大鏡',
      prompt: '午後經過工作間，看見林見微正戴著單眼鐘錶放大鏡，用鑷子夾著一顆比米粒還小的藍鋼螺絲，連呼吸都放得極輕。',
      response: '她過了十秒鐘才把螺絲旋入機芯，摘下放大鏡看向門口的你：「你在門口站了四十二秒，沒有出聲打斷我，使這顆 1890 年的游絲螺絲免於滑牙。謝謝。」',
      choices: [
        { text: '輕聲微笑：「看妳專注修錶的樣子就像在看一場精密的藝術表演，我怎麼捨得打斷。現在忙完了嗎？要不要喝杯溫水？」', reply: '林見微接過溫水喝了一口，冰藍色的眼眸微微柔和：「機芯已經開始規律擺動了。你可以進來看它的擒縱輪運轉。」', psychNote: '尊重她的高度專注界線，能換來她主動邀請你進入她的內在世界。', stats: { affection: 8, security: 8, boundary: 6 } },
        { text: '把一盒剛買的無塵擦拭布放在她桌角：「我看妳上次那盒快用完了，順路幫妳帶了一盒同規格的。」', reply: '她看了一眼包裝上的型號：「無絨超細纖維，完全符合標準。你很有心。」', psychNote: '不帶情緒壓力的實用支持最能打動孤僻型。', stats: { affection: 7, security: 7, boundary: 6 } },
        { text: '湊過去對著機芯吹氣：「哇，這螺絲真的好小喔，要是不見了怎麼辦？」', reply: '見微瞬間用防塵罩蓋住機芯，眉頭微蹙：「人體呼氣含有水氣與唾液微粒，會導致游絲生鏽，請退後一步。」', psychNote: '侵入她的精密工作空間會引發防衛反應。', stats: { affection: -4, security: -6, boundary: -5 } },
        { text: '抱怨道：「我在門口站了快一分鐘妳都不理我，一顆破螺絲比我還重要喔？」', reply: '她平靜地回答：「螺絲一旦滑牙就無法復原，而人類站在門口並不會受損。」', psychNote: '情緒化的比較無法被她的邏輯系統理解。', stats: { affection: -5, security: -6, boundary: -4 } }
      ]
    },
    {
      title: '頂樓的流浪黑貓與罐頭',
      prompt: '傍晚在公寓交誼廳樓梯口，你看見林見微正蹲在地上，把一罐打開的無鹽鮪魚貓罐頭放在距離自己剛好一公尺遠的地面上，一隻流浪黑貓正安靜地低頭進食。',
      response: '「牠每天傍晚六點十五分會經過這裡。我們有默契——我不摸牠，牠也不蹭我，吃完就各自離開。這是最理想的生物社交模式。」',
      choices: [
        { text: '也安靜地蹲在你與她距離一公尺的位置，陪她和黑貓一起看夕陽，不驚動牠們。', reply: '黑貓吃完罐頭甩甩尾巴走了，見微轉頭看了你一眼，唇角微不可察地彎了 1 毫米：「……你也懂得貓的禮貌。」', psychNote: '以同樣尊重距離的方式融入她的日常，讓她感到無比自在。', stats: { affection: 8, security: 9, boundary: 7 } },
        { text: '遞給她一張濕紙巾擦手：「原來見微雖然話少，卻默默照顧著這隻小貓呢。」', reply: '她接過濕紙巾：「只是簡單的熱量分配而已……不過牠的毛色確實像黑洞一樣漂亮。」', psychNote: '溫和肯定她冷淡外表下的善良。', stats: { affection: 6, security: 7, boundary: 5 } },
        { text: '大叫一聲衝過去想抓黑貓來抱：「好可愛的貓咪喔！快讓我抱抱！」', reply: '黑貓嚇得炸毛逃走，林見微也默默站起身：「高分貝音量破壞了觀測環境，我先下樓了。」', psychNote: '過度熱情的突發舉動會同時嚇跑貓與孤僻型角色。', stats: { affection: -5, security: -7, boundary: -5 } }
      ]
    }
  ],

  ruri: [
    {
      title: '午後紅茶裡的漩渦星雲',
      prompt: '午後在咖啡廳，星野琉璃正拿著銀匙順時針攪拌杯中的伯爵鮮奶茶，目不轉睛地盯著白色奶泡旋轉出的紋路。',
      response: '「{player}快看！奶泡剛剛轉出了仙女座大星雲的雙旋臂形狀，而且有一顆小茶葉停在正中央——這代表今天下午你心裡想的那個人，也在想你喔！」',
      choices: [
        { text: '笑著湊過去看了一眼杯子：「真的耶，那顆小茶葉一定很準，因為我現在心裡想的人就坐在我對面呀。」', reply: '琉璃眨了眨紫水晶般的大眼睛，臉頰瞬間染上一層粉霞：「咦？！原、原來星雲預告的人是我自己嗎……我的靈擺突然跳得好快喔！」', psychNote: '順著她的象徵語言給予溫暖真誠的直球回應，讓她心花怒放。', stats: { affection: 8, security: 8, boundary: 6 } },
        { text: '點了一份星星造型的檸檬糖霜餅乾放在她盤子裡：「配著星雲奶茶一起吃，好運一定加倍！」', reply: '她雙手合十開心地歡呼：「是星星餅乾！{player}果然最懂宇宙的餐桌禮儀了！」', psychNote: '尊重並呼應她的童話生活美學。', stats: { affection: 7, security: 7, boundary: 6 } },
        { text: '認真跟她科普流體力學與科氏力：「那只是液體旋轉的物理現象啦，每一杯奶茶攪拌都會這樣。」', reply: '琉璃鼓起臉頰小聲嘀咕：「物理學也是宇宙魔法的一種方言嘛，幹嘛講得這麼乾巴巴的……」', psychNote: '過度生硬的科普會稍微掃興，但尚不至於觸發恐慌。', stats: { affection: 1, security: 0, boundary: 2 } },
        { text: '不耐煩地把她的茶攪亂：「喝個奶茶也要算命，妳能不能正常一點啊？」', reply: '琉璃看著散掉的奶泡，眼神黯淡地放下湯匙，再也不敢跟你分享她看到的小驚喜。', psychNote: '粗暴打斷她的日常分享會讓她退縮回自我世界。', stats: { affection: -6, security: -8, boundary: -4 } }
      ]
    }
  ],

  han_xiao: [
    {
      title: '午後重機保養與借工具',
      prompt: '難得在晴朗的午後看見韓梟沒在酒吧睡覺，而是穿著黑色背心在公寓後院拆洗他那台重機的化油器，手指上沾著黑機油，嘴裡咬著一根沒點燃的薄荷菸。',
      response: '看到你走過來，他挑了挑眉，用下巴指了指腳邊的工具箱：「來得正好，幫我拿那把 12 號梅花扳手。怎麼，大白天看到我沒穿酒保背心，認不出來了？」',
      choices: [
        { text: '精準拿起 12 號扳手遞到他沒沾油的手掌位置，順手幫他把額前滑落的碎髮撥開：「認識啊，不就是平時愛裝壞人、其實對自己愛車超細心的韓老闆嗎？」', reply: '韓梟愣了半秒，隨即低笑出聲，眼底閃過一抹真實的愉悅：「手挺巧的嘛。等我調好怠速，帶你去河濱兜一圈當報酬。」', psychNote: '自在應對他的調侃並肯定他專注認真的一面，能建立輕鬆對等的默契。', stats: { affection: 8, security: 8, boundary: 6 } },
        { text: '丟給他一條乾淨的濕毛巾與冰鎮檸檬水：「大太陽下修車小心中暑，先擦擦汗喝口水吧。」', reply: '他單手接住冰水仰頭喝了一半，勾起嘴角：「算你有良心。」', psychNote: '自然的日常關懷能軟化他硬派的防衛。', stats: { affection: 7, security: 7, boundary: 6 } },
        { text: '故意拿錯工具還把他的螺絲盒踢翻：「我不會分幾號扳手啦，你快點過來幫我撿！」', reply: '韓梟看著滾進水溝的螺絲，嘴角的笑意淡了下去：「幫倒忙的話就去旁邊待著。」', psychNote: '無意義的作鬧無法引起他的興趣，反而顯得幼稚。', stats: { affection: -4, security: -4, boundary: -4 } }
      ]
    }
  ],

  su_fei: [
    {
      title: '大提琴弦的松香與指尖溫度',
      prompt: '午後經過畫室，聽見裡面傳來一陣大提琴調音的撥弦聲。推門進去時，蘇緋正拿著琥珀色的松香塊，一下一下在馬尾琴弓上摩擦，粉末在陽光下像金色細雪。',
      response: '她一抬頭看見你，原本有些冷清的眉眼瞬間像點亮了煙火：「{player}！我剛才還在想，要是磨完這塊松香三十下你還沒出現，我今天就不練琴了！結果數到第二十七下你就開門了，我們是不是有心電感應？」',
      choices: [
        { text: '笑著走到她身邊坐下：「那還好我走得夠快，趕在第 27 下推門進來。今天想拉什麼曲子？我當妳的第一個聽眾。」', reply: '蘇緋開心地把琴弓架上弦，眼神專注而深情地看著你：「那我要拉巴哈無伴奏第一號前奏曲，每一個音符都是拉給你聽的！」', psychNote: '溫柔接住她日常的小小期待與儀式感，能讓她的情緒穩定在溫暖愉悅的狀態。', stats: { affection: 8, security: 9, boundary: 6 } },
        { text: '幫她擦掉鼻尖不小心沾到的一點松香粉：「我們不用靠數數賭運氣，想見我的話隨時傳個訊息，我有空就會過來。」', reply: '她摸了摸鼻尖，乖巧地點頭：「嗯！下次我直接傳訊息找你，不在心裡自己跟自己賭氣了。」', psychNote: '溫和引導她用直接溝通取代「心裡默默設考驗」的邊緣型習慣。', stats: { affection: 7, security: 9, boundary: 8 } },
        { text: '潑冷水說：「什麼心電感應，我只是剛好路過而已，妳別每天都在腦補小劇場好不好？」', reply: '蘇緋臉上的光彩瞬間熄滅，默默放下琴弓：「……原來只是順路啊。」', psychNote: '冷漠戳破她的雀躍會讓她瞬間跌入失落。', stats: { affection: -5, security: -8, boundary: -2 } }
      ]
    }
  ],

  xia_le: [
    {
      title: '街角櫥窗的穿搭投票',
      prompt: '在商業街轉角遇見夏樂，他正戴著墨鏡站在服裝店落地鏡前，左右手各拿著一件寶藍色絲絨外套與一件米白色粗針織毛衣，對著自己的倒影苦惱不已。',
      response: '「親愛的{player}！救星來了！你快幫我評評理，明天拍雜誌封面我穿寶藍色是不是超有巨星氣場？可是穿米白色看起來好像比較溫柔居家……天啊，你覺得哪一件比較能讓你一眼愛上我？」',
      choices: [
        { text: '認真看了看兩件衣服：「拍雜誌封面穿寶藍色一定超搶眼；但如果是我們兩個私下散步喝咖啡，我最喜歡看你穿那件柔軟的米白色毛衣。」', reply: '夏樂摘下墨鏡，眼睛亮晶晶地把兩件都抱在懷裡：「太會說了吧！那寶藍色穿給粉絲看，米白色這件我只在跟你約會的時候穿！」', psychNote: '既肯定他的舞台魅力，又明確傳達你重視「私下真實溫柔的他」，讓他倍感窩心。', stats: { affection: 8, security: 9, boundary: 6 } },
        { text: '幫他把領口整理好，笑著說：「衣服只是陪襯，不管穿哪一件，你的笑容才是最好看的重點喔。」', reply: '他開心地原地轉了一圈：「跟{player}逛街心情永遠是一百分！」', psychNote: '將讚美從外在包裝拉回他本人，提升安全感。', stats: { affection: 7, security: 8, boundary: 5 } },
        { text: '敷衍地看了一眼手機：「兩件都差不多啦，隨便買一件快點走吧。」', reply: '夏樂噘起嘴把衣服掛回去：「哼，你根本沒認真看我……」', psychNote: '敷衍的態度會讓重視關注的做作型感到失落。', stats: { affection: -4, security: -5, boundary: 0 } }
      ]
    }
  ],

  gu_qingcheng: [
    {
      title: '手沖咖啡的黃金水溫',
      prompt: '午後在建築事務所的私人吧台，顧傾城正拿著細口手沖壺沖泡藝伎咖啡，眼神專注得像在審核百億建案的結構圖，旁邊還放著電子秤與紅外線測溫槍。',
      response: '她將沖好的第一杯琥珀色咖啡推到你面前，微微揚起下巴：「水溫 91.5 度，粉水比 1 比 15，悶蒸三十秒。整個事務所只有你喝得到我親手沖的巴拿馬翡翠莊園紅標。嚐嚐看，說出你的感想。」',
      choices: [
        { text: '細細品嚐一口，微笑著看著她：「茉莉花香跟柑橘尾韻層次非常明顯，不過最難得的是顧總願意花五分鐘為我沖咖啡的心意，比紅標豆更珍貴。」', reply: '顧傾城耳根微不可察地紅了一絲，嘴角勾起驕傲又愉悅的弧度：「……算你嘴甜又有品味。以後每週三下午，我都准你來喝一杯。」', psychNote: '同時肯定她的頂級品味與她隱藏在高傲下的體貼心意，完美契合自戀型的心理需求。', stats: { affection: 8, security: 8, boundary: 6 } },
        { text: '拿出一盒頂級手工黑巧克力與她分享：「這麼好的藝伎咖啡，配這塊百分之七十二的單一產區黑巧剛好相得益彰。」', reply: '她嚐了一小口巧克力，讚賞地點頭：「懂得用對等的品質回應我，你果然沒讓我失望。」', psychNote: '以平等優雅的姿態互動，建立互相尊重的默契。', stats: { affection: 7, security: 7, boundary: 7 } },
        { text: '一口氣像喝白開水一樣牛飲喝光：「好酸喔，有沒有三合一奶精跟砂糖可以加啊？」', reply: '顧傾城扶著額頭，露出難以忍受的表情：「把我的翡翠莊園紅標拿去加奶精……真是暴殄天物！」', psychNote: '否定她的心血與品味會讓她大感挫折。', stats: { affection: -5, security: -6, boundary: -2 } }
      ]
    }
  ],

  wen_yan: [
    {
      title: '古籍書籤上的壓花銀杏',
      prompt: '經過圖書修復室時，看見溫言正低著頭，用鑷子將一片金黃色的乾燥銀杏葉小心翼翼地貼在手工宣紙書籤上，旁邊還放著一張寫了你名字卻不敢送出的小卡片。',
      response: '發現你走近，他慌張地用袖子遮住書籤，眼鏡滑到了鼻尖：「啊！{player}……這、這只是我拿邊角料隨便做的書籤，手藝很粗糙，本想說要是你不嫌棄的話……但還是算了，太拿不出手了……」',
      choices: [
        { text: '溫和地伸手幫他扶正眼鏡，指著那枚銀杏書籤：「葉脈保存得這麼完整，宣紙纖維也很細膩，我非常喜歡！這是特地做給我的嗎？」', reply: '溫言臉頰紅得像熟透的蘋果，雙手捧著書籤遞給你，小聲卻開心地說：「嗯！因為上次看你讀書習慣摺頁角……太好了，你沒有覺得它寒酸！」', psychNote: '具體讚美細節並主動接納他的心意，能化解畏避型「怕禮物被嫌棄而先自我貶抑」的焦慮。', stats: { affection: 8, security: 9, boundary: 6 } },
        { text: '馬上拿出隨身攜帶的書，把銀杏書籤夾進正在讀的那一頁給他看：「你看，尺寸剛剛好，我每天看書都會看到它了。」', reply: '看著自己的手作書籤被你珍重地夾進書裡，溫言眼底閃耀著溫暖的光芒。', psychNote: '立即使用的行動證明比口頭客套更能給他安全感。', stats: { affection: 7, security: 8, boundary: 6 } },
        { text: '隨口說：「既然你自己都覺得粗糙拿不出手，那就等做好看一點再送我吧。」', reply: '溫言的手指瞬間縮了回去，把書籤塞進口袋低聲說：「……嗯，對不起，我下次會改進的。」', psychNote: '順著他的自謙客套話拒絕，會被他解讀為真實的否定。', stats: { affection: -5, security: -8, boundary: -2 } }
      ]
    }
  ],

  bai_xiaolu: [
    {
      title: '花店門口的向日葵與滿天星',
      prompt: '午後經過花店與咖啡廳走廊，白小鹿正抱著兩束花站在門口左右為難，一看到你就像看到救星一樣小跑過來。',
      response: '「{player}！今天咖啡廳窗台要換新花，我剛才自己選了這束黃色向日葵，因為覺得看起來很溫暖！可是選完我又好怕大家覺得向日葵太土氣……你快幫我看，我是不是應該換成旁邊那束大家常買的白色滿天星比較安全？」',
      choices: [
        { text: '笑著指了指她懷裡的向日葵：「不用換！妳第一眼選的向日葵超有精神，放在木頭窗台上一定很漂亮。相信妳自己的眼光！」', reply: '白小鹿眼睛亮了起來，抱緊向日葵開心地點頭：「真的嗎！原來我自己選的花也很好看！那我現在就去插在窗台上！」', psychNote: '在她已經做出初步自主選擇卻又自我懷疑時，給予堅定支持，強化其獨立判斷的信心。', stats: { affection: 8, security: 9, boundary: 8 } },
        { text: '提議把向日葵當主花，周圍點綴幾枝小巧的滿天星：「這樣既有妳喜歡的溫暖陽光，又有柔和的層次感喔。」', reply: '她開心地拍手：「哇，這樣搭配起來超美的！我學起來了！」', psychNote: '溫和引導而非代勞決定。', stats: { affection: 7, security: 8, boundary: 6 } },
        { text: '直接把向日葵抽走丟回桶子裡：「妳眼光真的不行，以後買什麼花先拍給我審核，不准自己亂挑！」', reply: '小鹿縮了縮脖子，小聲說：「……好，我果然還是不會挑花。」', psychNote: '打壓她的自主嘗試會加深其無助與依賴。', stats: { affection: -4, security: -6, boundary: -8 } }
      ]
    }
  ],

  ji_yan: [
    {
      title: '書架上的毫米級對齊',
      prompt: '午後走進圖書檔案室，看見紀嚴正站在梯子上，拿著一把不鏽鋼直尺貼在書架邊緣，將一整排厚重的精裝醫學大辭典調整到與書架前緣完全齊平、誤差不超過一毫米。',
      response: '他聽見腳步聲，頭也不回地說：「第 3 排第 7 本《臨床病理學》昨天被人借閱後歸位時往內縮了 1.2 公分，破壞了整面牆的散熱氣流與視覺對稱。已經校正完畢了。」',
      choices: [
        { text: '站在下面幫他扶穩梯子，抬頭微笑：「整理完看著整整齊齊的書牆，確實讓人心情很舒暢呢。需要我幫你把下面這疊待歸檔的期刊按年份排好嗎？」', reply: '紀嚴從梯子走下來，看著整齊的書牆與你溫和的笑臉，神色明顯放鬆了許多：「謝謝，按出版年月由舊到新排列即可。跟你合作總是特別省心。」', psychNote: '不嘲笑他的秩序儀式，並以實際配合展現理解，能讓他感到高度的安定與愉悅。', stats: { affection: 8, security: 9, boundary: 6 } },
        { text: '遞給他一杯剛好 65 度的溫熱伯爵茶：「校正完畢，現在是紀醫師的十分鐘下午茶時間。」', reply: '他看了一眼懷錶：「時間剛剛好，溫度也很完美。」', psychNote: '用他喜歡的精準風格提醒他適度休息。', stats: { affection: 7, security: 8, boundary: 6 } },
        { text: '故意伸手把旁邊三本書往裡面推得參差不齊：「這樣高高低低的才隨性自然嘛！」', reply: '紀嚴的眉頭瞬間鎖死，一言不發地立刻伸手把那三本書重新拉回原位。', psychNote: '故意破壞強迫型的秩序空間只會引發焦慮與反感。', stats: { affection: -5, security: -7, boundary: -4 } }
      ]
    }
  ],

  lu_qinglan: [
    {
      title: '拉坏機上的泥巴小意外',
      prompt: '走進畫室時，陸晴嵐正踩著電動拉坏機做花瓶，結果因為轉速不小心調太快，一團濕軟的陶土「啪」地飛濺出來，正好糊在她自己的臉頰和圍裙上。',
      response: '她愣了兩秒鐘，隨即看著鏡子裡的自己拍著大腿哈哈大笑：「哈哈哈哈！{player}你快看！我本來想拉一個優雅的玉壺春瓶，結果現在我自己變成兵馬俑啦！哎喲笑死我了，不過這團土甩出去的弧度還挺有現代藝術感的對吧！」',
      choices: [
        { text: '被她爽朗的笑聲感染，拿濕毛巾笑著幫她擦掉臉頰上的泥巴：「兵馬俑大師辛苦啦！我們把轉速調慢一點，我陪妳一起把這個花瓶救回來。」', reply: '陸晴嵐任由你幫她擦臉，笑彎了的眼睛裡閃著溫柔的光：「還是{player}最好了，都不會嫌我粗魯笨手笨腳！來，我們一起拉坏！」', psychNote: '自然接納她的失誤與豁達幽默，不以過去完美醫師的標準苛責她，讓她感到無比放鬆。', stats: { affection: 8, security: 9, boundary: 6 } },
        { text: '拿手機幫她跟那個歪掉的陶坯拍了一張可愛的紀念照：「這叫『不對稱流派大師』的誕生瞬間！」', reply: '她比了個大大的耶：「洗出來我要貼在工坊牆上！」', psychNote: '正向重構生活中的小插曲。', stats: { affection: 7, security: 8, boundary: 6 } },
        { text: '皺眉嘆氣：「妳看妳現在連轉速都控制不好，弄得全身髒兮兮的，跟以前比真是差太多了。」', reply: '晴嵐臉上的大笑瞬間停住，低頭看著圍裙上的泥巴，小聲說：「……對不起，我馬上洗乾淨。」', psychNote: '拿現在與腦傷前作比較是她最痛的傷口。', stats: { affection: -6, security: -9, boundary: -4 } }
      ]
    }
  ],

  you_ziqian: [
    {
      title: '打烊前的隱藏版烤布蕾',
      prompt: '傍晚經過咖啡廳時，游子謙正把店門口的牌子翻到「準備中」，卻對著你招了招手讓你進來。吧台上放著兩盅剛用噴槍烤出焦糖脆皮的香草烤布蕾。',
      response: '「今天最後一桌奧客嫌甜點太甜退貨了，害我好傷心喔～不過沒關係，我多烤了兩盅『完全不照店裡SOP、只加了我自己喜歡的馬達加斯加香草莢』的私房烤布蕾。{player}，你要不要陪我這個不聽話的店長一起偷吃？」',
      choices: [
        { text: '拿起小湯匙敲開清脆的焦糖層嚐了一口：「比菜單上的標準版還香濃！子謙不用管奧客怎麼說，你按自己心意做出來的東西最好吃。」', reply: '游子謙托著下巴看著你，臉上的營業微笑化作了真誠溫暖的笑意：「……每次被客人氣到想擺爛的時候，只要聽到你誇我，我就覺得好像又可以認真開店了呢。」', psychNote: '肯定他「按自己真實心意創作」的成果，減少他因受氣而轉向被動攻擊的需求。', stats: { affection: 8, security: 9, boundary: 6 } },
        { text: '幫他把吧台剩下的杯子一起收進洗碗機：「謝謝招待私房布蕾，那收店的工作我陪你一起分擔，我們早點下班休息。」', reply: '他驚訝地眨了眨眼：「咦？你居然沒有吃完就拍拍屁股走人……謝謝你，{player}。」', psychNote: '主動分擔而非理所當然享受他的付出，能融化他心中的不平衡感。', stats: { affection: 7, security: 8, boundary: 6 } },
        { text: '說：「既然是退貨剩下的食材做的，那你應該每天免費做十個送給我跟我的朋友吃啊！」', reply: '游子謙笑瞇瞇地點頭：「好呀，沒問題～」心裡卻決定下次在你的布蕾裡多放兩匙鹽巴。', psychNote: '得寸進尺的索取會立刻觸發他的隱性報復。', stats: { affection: -5, security: -6, boundary: -6 } }
      ]
    }
  ]
};

// ==================== 15 個事件完整決策樹產生器（100% 角色專屬劇本與獨立天災，零罐頭選項） ====================
// ==================== 初步攻略：每位角色「靈魂真名（DSM-5-TR 法定最低門檻確立）」的觸發事件 ====================
// 嚴格採「雙階段教學架構」：
// Phase I~II（E01～E08）精準收集齊該疾患 DSM-5-TR 法定最低診斷門檻數量之核心準則；
// 在 E08（突發天災危機事件）結尾頒發【🥇 初步成就：確立臨床診斷（靈魂真名）】，解鎖診斷卡與下一位房客！
// Phase III~IV（E09～E15）則解鎖剩餘進階準則、臨床特徵／亞型註記（Specifiers）與共病傾向（Comorbidities）。
export const DIAGNOSIS_REVEAL_CONFIG = {
  shen_mo: {
    revealEvent: 8,
    revealNote:
      '【Phase I~II 最低法定門檻達成：4/7 項（F60.0-A1, A2, A3, A4）】從頂樓雙鎖試探、瓶裝水對質、加密帳冊隱瞞到強震裡死抱硬碟防線鬆動——你的觀察筆記已收集齊妄想型人格障礙症的法定診斷門檻。他並非拒絕被愛，而是早已無法停止掃描背叛訊號。\n🔓 進入 Phase III~IV（E09～E15）：解鎖剩餘進階準則（A5～A7）、現實扭曲亞型區辨與失眠焦慮共病脈絡。'
  },
  lin_jianwei: {
    revealEvent: 8,
    revealNote:
      '【Phase I~II 最低法定門檻達成：4/7 項（F60.1-A1, A2, A6, A7）】從拒絕交換心事、極度偏愛獨處算星圖、對讚貶同樣平靜到暴風眼停電夜只關切赤道儀與恆溫數據——孤僻型的核心特徵已達法定門檻。她不是畏懼人群，而是真切覺得不需要社交獎賞。\n🔓 進入 Phase III~IV（E09～E15）：解鎖剩餘準則（A3～A5）、與畏避型鑑別註記及偽裝耗竭共病。'
  },
  ruri: {
    revealEvent: 8,
    revealNote:
      '【Phase I~II 最低法定門檻達成：5/9 項（F21-A1, A2, A3, A7, A9）】街燈摩斯碼的關係意念、跨門檻鹽線的奇幻信念、紫羅蘭電流音錯覺、不合時宜的古怪穿著到日食濃霧裡急升的社交恐懼——思覺失調型法定五項門檻已集齊。\n🔓 進入 Phase III~IV（E09～E15）：解鎖進階準則（A4, A5, A6, A8）、防禦性隱喻鑑別與急性解離恐慌共病。'
  },
  han_xiao: {
    revealEvent: 8,
    revealNote:
      '【Phase I~II 最低法定門檻達成：3 項成人準則 + 行為規範障礙症史（F60.2-A2, A3, A5, CD）】詐欺套牌局、街頭無法做長遠打算的挑釁、時速兩百不顧雙方安危與酒吧淹水仍冷笑不逞強的叢林規則——你已確認其從 15 歲前行為規範障礙症延續至今的反社會型門檻。\n🔓 進入 Phase III~IV（E09～E15）：解鎖剩餘準則（A1, A4, A6, A7）、有限親社會情緒註記與物質成癮共病。'
  },
  su_fei: {
    revealEvent: 8,
    revealNote:
      '【Phase I~II 最低法定門檻達成：5/9 項（F60.3-A1, A2, A6, A7, A8）】狂熱與冰封交替、十二分鐘內從神明變惡魔的理想化與貶抑擺盪、夜雨中情緒急墜、慢性空虛感與落雷踩碎玻璃護畫——邊緣型法定五項核心準則完全顯現。\n🔓 進入 Phase III~IV（E09～E15）：解鎖認同障礙（A3）、衝動自傷（A4/A5）與解離（A9），以及 C-PTSD／情緒障礙症共病。'
  },
  xia_le: {
    revealEvent: 8,
    revealNote:
      '【Phase I~II 最低法定門檻達成：5/8 項（F60.4-A1, A2, A4, A5, A6）】聚光燈外即感不適、無界線性挑逗調情、利用外觀吸引全場注意、過度概念化且缺乏細節的讚美與停電卸妝時的戲劇性崩潰——做作型五項法定門檻已在危機中定型。\n🔓 進入 Phase III~IV（E09～E15）：解鎖快速轉變與膚淺情緒（A3）、易受暗示（A7）、自認人際更為親密（A8）與憂鬱空虛共病。'
  },
  gu_qingcheng: {
    revealEvent: 8,
    revealNote:
      '【Phase I~II 最低法定門檻達成：5/9 項（F60.81-A1, A3, A4, A7, A9）】「平庸傳染病」對自我重要性的誇大認知、頂級階級菁英圈鎖定、需要過度讚賞、缺乏同理貶抑助手與強陣風玻璃前死撐自大傲慢姿態——自戀型五項門檻完整拼合。\n🔓 進入 Phase III~IV（E09～E15）：解鎖特權剝削（A5/A6）、妒忌（A8）、無止境的成功幻想（A2）及「誇大 vs 脆弱自戀」切換註記。'
  },
  wen_yan: {
    revealEvent: 8,
    revealNote:
      '【Phase I~II 最低法定門檻達成：4/7 項（F60.6-A2, A4, A5, A6）】除非確信受到歡迎否則不願交涉、對負面評價與被拒絕特別敏感、因信心不足在新的人際情境顯得壓抑、自認社交笨拙或不如人與梅雨短路時的自我封閉責怪——畏避型法定四項門檻正式確立。\n🔓 進入 Phase III~IV（E09～E15）：解鎖職業迴避（A1）、怕丟臉嘲諷而克制親密關係（A3）、不願冒個人風險（A7）、與孤僻型鑑別及社交焦慮症（SAD）共病。'
  },
  bai_xiaolu: {
    revealEvent: 8,
    revealNote:
      '【Phase I~II 最低法定門檻達成：5/8 項（F60.7-A1, A2, A3, A5, A6）】挑草莓藍莓需他人建議與再保證、需要他人為生活中大多數主要事務負責、害怕失去支持或讚許而困難表達異議、連代五天夜班做不愉快的事與獨處即無助恐慌——依賴型五項法定門檻已全數就位。\n🔓 進入 Phase III~IV（E09～E15）：解鎖困難於自己實施新計劃或執行事務（A4）、急於尋找替代關係（A7）、害怕被獨自留下（A8）與廣泛性焦慮症（GAD）共病。'
  },
  ji_yan: {
    revealEvent: 8,
    revealNote:
      '【Phase I~II 最低法定門檻達成：4/8 項（F60.5-A1, A2, A3, A8）】十五分鐘刻度日程專注細節與條列、過度要求完美而妨礙任務完成、過度投入工作與生產力而排除休閒與友誼、寫下十二頁互動合約與暴雨脫軌的死板頑固——強迫型四項法定門檻正式達成。\n🔓 進入 Phase III~IV（E09～E15）：解鎖道德價值觀過度嚴謹（A4）、無法拋棄破舊無價值物品（A5）、不願分派任務（A6）、吝於花費（A7）、OCD 鑑別及次發性憂鬱共病。'
  },
  lu_qinglan: {
    revealEvent: 8,
    revealNote:
      '【Phase I~II 最低法定門檻達成：F07.0-A～E 核心五準則全齊】從醫護同僚證言與先前特徵人格模式改變（A）、右側眶額葉損傷之直接病理生理證據（B）、排除發生於譫妄時（D）並無法以另一精神疾病做更好解釋（C），到熱浪跳電警報誘發顯著苦痛與功能減損（E）——另一身體病況引起的人格改變臨床門檻已完整確認。\n🔓 進入 Phase III~IV（E09～E15）：解鎖「易變型＋去抑制型」合併型註記、與雙相情緒障礙症/BPD鑑別及創傷適應悲傷共病。'
  },
  you_ziqian: {
    revealEvent: 8,
    revealNote:
      '【Phase I~II 最低法定門檻達成：F60.89 一般人格障礙症準則 A～F 齊備】表面順從說好卻手滑弄濕企劃（GA）、跨個人及社交情境缺乏彈性且普遍存在（GB）、引起臨床顯著苦惱與功能減損（GC），以及起始可追溯至青少年禁怒家規之穩定長期軌跡（GD）——其他特定的人格障礙症門檻確立。\n🔓 進入 Phase III~IV（E09～E15）：解鎖被動攻擊／混合型人格特質註記及壓抑憤怒致身心症／持續性憂鬱共病。'
  }
};

export function getDiagnosisRevealEvent(charId) {
  return DIAGNOSIS_REVEAL_CONFIG[charId]?.revealEvent || 8;
}

// ==================== 雙階段臨床教學覆寫層（Phase I~II 門檻錨點 × Phase III~IV 亞型與共病 × 防衛展演 × 小結） ====================
const CLINICAL_EVENT_OVERLAY = {
  shen_mo: {
    E04: { unlockCriteria: ['F60.0-A1'], criterionTags: ['F60.0-A1', 'F60.0-A4', 'F60.1-A1'], studySummary: '【鑑別要點】妄想型（PPD）在雙人互動裡把「望遠鏡角度」視為惡意監控；孤僻型（SzPD）只是毫不在乎他人在場。' },
    E07: {
      unlockCriteria: ['F60.0-A1', 'F60.0-A4'],
      criterionTags: ['F60.0-A1', 'F60.0-A4'],
      choiceDefenses: {
        2: '共依附雙向監控擴張（Paranoid Merger Control）',
        3: '背叛印證與敵對切割（Betrayal Confirmation & Freeze）'
      },
      studySummary: '【階段檢核】進入緊繃試探時，PPD 出現「先切斷親密以免成為軟肋」的反撲防衛，展現準則 A1/A4 的深層不安全感。'
    },
    E08: {
      unlockCriteria: ['F60.0-A4'],
      criterionTags: ['F60.0-A4'],
      choiceDefenses: {
        2: '隱私讓渡與監視依戀固化（Surveillance Codependency）',
        3: '安全象徵威脅防衛（Security-Threat Withdrawal）'
      },
      studySummary: '【🥇 Phase I~II 門檻結算】已完成 F60.0-A1, A2, A3, A4 共 4/7 項核心準則，達到 DSM-5-TR 妄想型人格障礙症最低診斷門檻！'
    },
    E09: { unlockCriteria: ['F60.0-A6'], criterionTags: ['F60.0-A6', 'F60.81-A3'], studySummary: '【Phase III 進階鑑別】PPD 對他人的動機攻擊敏感；NPD 對尊嚴冒犯敏感。面對沈墨必須維持獨立與程序透明。' },
    E10: {
      unlockCriteria: ['F60.0-A5'],
      criterionTags: ['F60.0-A5'],
      choiceDefenses: {
        2: '同意監控合謀（Collusive Hyper-Surveillance）',
        3: '羞恥與舊恨激活絕交（Grudge-Triggered Severance）'
      },
      studySummary: '【Phase III 準則 A5】暗房裡的長久記恨與「十字架式清單記憶」（三年前一句話永不遺忘）正是 A5 的核心展現。'
    },
    E11: {
      unlockCriteria: ['F60.0-A6', 'F60.0-A1'],
      unlockSpecifiers: ['F60.0-SPEC1'],
      criterionTags: ['F60.0-A6'],
      specifierTags: ['F60.0-SPEC1'],
      choiceDefenses: {
        2: '雙人孤島妄想合流（Folie-à-Deux Isolation）',
        3: '被拋棄背叛感誘發暴烈猜忌（Persecutory Rage Reaction）'
      },
      studySummary: '【Phase III 準則 A6 × 亞型註記】將正常勸說扭曲為惡意攻擊與串謀，並在現實證據檢核下區分「性格多疑（F60.0-SPEC1）」與「精神病症固定妄想」。'
    },
    E13: {
      unlockComorbidities: ['F60.0-COM1'],
      comorbidityTags: ['F60.0-COM1'],
      choiceDefenses: {
        2: '復仇反擊投射（Retaliatory Hostility Escalation）',
        3: '創傷失格防衛抽離（Trauma-Invalidated Shutdown）'
      },
      studySummary: '【Phase IV 共病傾向】長期戰備狀態（聽見電流聲即難入眠）與泰迪熊錄音筆童年創傷，常共病廣泛性焦慮症與慢性失眠（F60.0-COM1）。'
    },
    E14: {
      unlockCriteria: ['F60.0-A7'],
      unlockSpecifiers: ['F60.0-SPEC1'],
      unlockComorbidities: ['F60.0-COM1'],
      criterionTags: ['F60.0-A7'],
      specifierTags: ['F60.0-SPEC1'],
      comorbidityTags: ['F60.0-COM1'],
      choiceDefenses: {
        2: '無界線共生鎖定（Boundless Enmeshment）',
        3: '客體距離退防（Neutralizing Detachment）'
      },
      studySummary: '【Phase IV 綜合整理】伴侶親密穩定能減緩對忠誠的強迫試探（A7），但臨床處遇必須保留「先確認、不過度侵略隱私」的清楚界線。'
    },
    E15: {
      studySummary: '【全章病理總結｜妄想型 F60.0】門檻：4/7（E01 A1、E02 A2、E03 A3、E06/E08 A4）➔ 進階：A5（E10）、A6（E11）、A7（E12/E14）｜亞型：高度警戒但仍保有現實核對彈性（SPEC1）｜共病：慢性失眠／焦慮症（COM1）。'
    }
  },
  lin_jianwei: {
    E04: { unlockCriteria: ['F60.1-A1'], criterionTags: ['F60.1-A1', 'F60.0-A1'], studySummary: '【Phase I】孤僻型缺乏進入人際情感交換的驅力（A1），面對誤會僅陳述客觀座標而非防衛反擊。' },
    E07: {
      unlockCriteria: ['F60.1-A1', 'F60.1-A7'],
      criterionTags: ['F60.1-A1', 'F60.1-A7'],
      choiceDefenses: {
        2: '感官過載與系統關閉（Sensory-Social Overload Shutdown）',
        3: '情緒剝離冷靜退場（Affective Detachment Withdrawal）'
      },
      studySummary: '【Phase II】孤僻型的「反鎖工作間」不是生氣傲嬌，而是高強度的社群負荷過載後的自然冷卻需求。'
    },
    E08: {
      unlockCriteria: ['F60.1-A7'],
      criterionTags: ['F60.1-A7'],
      choiceDefenses: {
        2: '物理空間侵佔引發窒息防衛（Intrusive Claustrophobia）',
        3: '強制社交引發徹夜關機（Forced-Social Retreat）'
      },
      studySummary: '【🥇 Phase I~II 門檻結算】已完成 F60.1-A1, A2, A6, A7 共 4/7 項，達到 DSM-5-TR 孤僻型人格障礙症最低診斷門檻！'
    },
    E09: {
      unlockSpecifiers: ['F60.1-SPEC1'],
      specifierTags: ['F60.1-SPEC1', 'F60.6-SPEC1'],
      criterionTags: ['F60.1-A1', 'F60.1-A6'],
      studySummary: '【Phase III 亞型鑑別註記】透過林見微 ＆ 溫言同場事件，確立「無慾疏離（SzPD）vs 恐懼退縮（AvPD）」的臨床鑑別。'
    },
    E10: {
      unlockCriteria: ['F60.1-A3'],
      criterionTags: ['F60.1-A3'],
      choiceDefenses: {
        2: '順從抹除與木偶化空洞（Hollow Compliance）',
        3: '低社交親密驗證退回（Detached Validation Exit）'
      },
      studySummary: '【Phase III 準則 A3】「三十八光年並肩而行」具象化孤僻型對性與近距離親密經驗的低需求（F60.1-A3），但仍能建立專屬知音連結。'
    },
    E11: {
      unlockCriteria: ['F60.1-A4'],
      criterionTags: ['F60.1-A4'],
      choiceDefenses: {
        2: '群眾焦點感官超載崩潰（Public-Focus Overload）',
        3: '情感系統強制休眠（Emotional System Shutdown）'
      },
      studySummary: '【Phase III 準則 A4】在嘈雜酒會上無感官與社交愉悅感（快感缺失 Anhedonia），唯有安靜天台與可控的星圖能使其復原。'
    },
    E13: {
      unlockCriteria: ['F60.1-A5'],
      unlockComorbidities: ['F60.1-COM1'],
      criterionTags: ['F60.1-A5'],
      comorbidityTags: ['F60.1-COM1'],
      choiceDefenses: {
        2: '理智隔離衝突逃避（Intellectualization Escape）',
        3: '自我隔離關閉情感輸出（Affective Seal-Off）'
      },
      studySummary: '【Phase IV 準則 A5 × 共病傾向】除一等親外，缺乏親近朋友或知己（A5）；長期「假裝表現熱情」可能引發慢性疲勞與持續性憂鬱情緒（F60.1-COM1）。'
    },
    E14: {
      unlockSpecifiers: ['F60.1-SPEC1'],
      unlockComorbidities: ['F60.1-COM1'],
      specifierTags: ['F60.1-SPEC1'],
      comorbidityTags: ['F60.1-COM1'],
      choiceDefenses: {
        2: '高頻情緒索求誘發倦怠（Affective Demand Fatigue）',
        3: '零衝突平行退讓（Neutral Parallel Shift）'
      },
      studySummary: '【Phase IV 處遇總結】尊重雙星軌道距離而非強迫改變其社交基線，能避免社交偽裝耗竭共病。'
    },
    E15: {
      studySummary: '【全章病理總結｜孤僻型 F60.1】門檻：4/7（E01 A1、E02/E03 A2、E06 A6、E05/E08 A7）➔ 進階：A3（E10）、A4（E11）、A5（E12/E13）｜鑑別註記：無慾疏離 vs 畏避恐懼（SPEC1）｜共病：持續性憂鬱／面具耗竭（COM1）。'
    }
  },
  ruri: {
    E04: { unlockCriteria: ['F21-A7'], criterionTags: ['F21-A7', 'F07.0-E'], studySummary: '【Phase I】準則 A7「古怪奇特的穿著與星象外表儀軌」，結合其對破碎瓷片賦予神祕宇宙意涵的表現。' },
    E07: {
      unlockCriteria: ['F21-A3'],
      criterionTags: ['F21-A3'],
      choiceDefenses: {
        2: '隔離現實的魔幻共犯退行（Shared Magical Withdrawal）',
        3: '霸凌創傷閃回與解離退縮（Stigma-Triggered Dissociation）'
      },
      studySummary: '【Phase II 準則 A3】異常感官體驗與鹽線淨化儀式，常反映她高度不安時企圖隔絕厄運的保護方式。'
    },
    E08: {
      unlockCriteria: ['F21-A9'],
      criterionTags: ['F21-A9'],
      choiceDefenses: {
        2: '被害妄想合流鎖閉（Shared Persecutory Locking）',
        3: '知覺嘲諷引發絨布藏匿防衛（Traumatic Concealment）'
      },
      studySummary: '【🥇 Phase I~II 門檻結算】已完成 F21-A1, A2, A3, A7, A9 共 5/9 項，達到 DSM-5-TR 思覺失調型人格障礙症最低診斷門檻！'
    },
    E09: { unlockCriteria: ['F21-A1', 'F21-A2'], criterionTags: ['F21-A1', 'F21-A2', 'F60.0-A4'], studySummary: '【Phase III 鑑別比較】對同一陣風吹動風鈴的解碼：StPD（北風精靈問候）vs PPD（敵對摩斯密碼）。' },
    E10: {
      unlockCriteria: ['F21-A4'],
      criterionTags: ['F21-A4'],
      choiceDefenses: {
        2: '禁止回歸現實之魔幻共生（Magical Isolation Lock）',
        3: '全盤自我否定誘發退縮（Identity Invalidating Exit）'
      },
      studySummary: '【Phase III 準則 A4】脫下隱喻與占星面紗走進真實街道時，呈現詩意、跳躍卻充滿感知負荷的奇特思維語言（A4）。'
    },
    E11: {
      unlockCriteria: ['F21-A5'],
      unlockComorbidities: ['F21-COM1'],
      criterionTags: ['F21-A5'],
      comorbidityTags: ['F21-COM1'],
      choiceDefenses: {
        2: '全面社交封閉型偏執逃亡（Paranoid Social Isolation）',
        3: '烏鴉知覺閃回與現實感解離（Stress-Induced Dissociation）'
      },
      studySummary: '【Phase III 準則 A5 × 共病傾向】壓力霸凌同時引發準則 A5 猜疑或偏執的意念，並可能共病「短暫精神病症插曲／急性解離恐慌（F21-COM1）」。'
    },
    E13: {
      unlockCriteria: ['F21-A6'],
      unlockSpecifiers: ['F21-SPEC1'],
      criterionTags: ['F21-A6'],
      specifierTags: ['F21-SPEC1'],
      choiceDefenses: {
        2: '妄想附和與現實界線流失（Delusional Collusion）',
        3: '生存符號摧毀防衛反鎖（Survival-Metaphor Guard）'
      },
      studySummary: '【Phase IV 準則 A6 × 特徵註記】A6 不適當或狹隘的情感實為外婆神龕與霸凌經歷下的防禦性解離隱喻（SPEC1），非真正思覺失調症平板的情感性或固定妄想。'
    },
    E14: {
      unlockCriteria: ['F21-A8'],
      unlockComorbidities: ['F21-COM1'],
      criterionTags: ['F21-A8'],
      comorbidityTags: ['F21-COM1'],
      choiceDefenses: {
        2: '依賴式儀式占卜代償（Ritual-Dependent Decision Proxy）',
        3: '界線安全退位（Gentle Boundary Distance）'
      },
      studySummary: '【Phase IV 準則 A8】過去因古怪而除一等親外，缺乏親近朋友或知己（A8）；在真實地面定錨後仍能保存想像力與藝術天賦。'
    },
    E15: {
      studySummary: '【全章病理總結｜思覺失調型 F21】門檻：5/9（E01 A1、E02 A2、E06/E07 A3、E04 A7、E05/E08 A9）➔ 進階：A4（E10）、A5（E11）、A6（E12/E13）、A8（E14）｜註記：具現實檢驗力與隱喻防禦功能（SPEC1）｜共病：短暫知覺解離／焦慮恐慌（COM1）。'
    }
  },
  han_xiao: {
    E04: { unlockCriteria: ['F60.2-A5'], criterionTags: ['F60.2-A5', 'F60.4-A1'], studySummary: '【Phase I 鑑別】同於聚光燈與危險氛圍中活躍：ASPD 藉由火焰賭局製造風險與操控快感（A5），HPD 則恐懼被搶走注目焦點。' },
    E07: {
      unlockCriteria: ['F60.2-CD'],
      criterionTags: ['F60.2-CD'],
      choiceDefenses: {
        2: '工具性掠奪與獵物測試（Exploitative Prey Testing）',
        3: '冷酷自認標籤拒絕改變（Cynical Anti-Moral Dismissal）'
      },
      studySummary: '【Phase II 準則 CD】在暴露感情風險時先亮出「混蛋」招牌推開人，同時透露 15 歲前行為規範障礙症的生存習性。'
    },
    E08: {
      unlockCriteria: ['F60.2-CD'],
      criterionTags: ['F60.2-CD'],
      choiceDefenses: {
        2: '抗拒被情感挾持之硬派推斥（Anti-Manipulation Rejection）',
        3: '叢林法則冷漠自足驗證（Jungle-Law Hardening）'
      },
      studySummary: '【🥇 Phase I~II 門檻結算】已完成 3 項成人準則（A2 詐欺、A3 衝動或無法做長遠打算、A5 魯莽不在意自己及他人的安危）及 15 歲前行為規範障礙症證據（準則 C），達到 DSM-5-TR 反社會型人格障礙症最低診斷門檻！'
    },
    E09: { unlockCriteria: ['F60.2-A2', 'F60.2-A4'], criterionTags: ['F60.2-A2', 'F60.2-A4', 'F60.7-A5'], studySummary: '【Phase III 鑑別比較】ASPD 利用不對等恐嚇測試邊界；DPD 則立即自我降價討好保命。' },
    E10: {
      unlockCriteria: ['F60.2-A7'],
      unlockSpecifiers: ['F60.2-SPEC1'],
      criterionTags: ['F60.2-A7'],
      specifierTags: ['F60.2-SPEC1'],
      choiceDefenses: {
        2: '共犯毀滅盟約誘發（Antisocial Dyad Escalation）',
        3: '武裝冷血面具復位（Callous Armor Re-Latching）'
      },
      studySummary: '【Phase III 準則 A7 × 亞型註記】表面不知悔恨（A7），卻在十六歲擋刀舊疤背後的被背叛記憶裡揭示：非先天「有限親社會情緒（CU 特質）」，而是創傷武裝出的工具性防衛（SPEC1）。'
    },
    E11: {
      unlockCriteria: ['F60.2-A4'],
      unlockComorbidities: ['F60.2-COM1'],
      criterionTags: ['F60.2-A4'],
      comorbidityTags: ['F60.2-COM1'],
      choiceDefenses: {
        2: '高喚起極限衝動共謀（Reckless Escalation）',
        3: '弱者退場驗證叢林信念（Distrust Validation）'
      },
      studySummary: '【Phase III 準則 A4 × 共病傾向】面對暴力與威脅習慣用「以暴制暴／賭命飆車（A4）」解決，且臨床上高度共病物質酒精使用與賭博成癮（F60.2-COM1）。'
    },
    E13: {
      unlockCriteria: ['F60.2-A1'],
      unlockComorbidities: ['F60.2-COM1'],
      criterionTags: ['F60.2-A1'],
      comorbidityTags: ['F60.2-COM1'],
      choiceDefenses: {
        2: '合理化施暴生存哲學（Hostile Worldview Reinforcement）',
        3: '標籤防衛徹底閉鎖（Labeling Shutoff）'
      },
      studySummary: '【Phase IV 準則 A1 × 共病】後巷毒打與父母雙雙入獄（A1 藐視法規範之成長背景），理解同理心曾如何被家庭懲罰。'
    },
    E14: {
      unlockCriteria: ['F60.2-A6'],
      criterionTags: ['F60.2-A6'],
      choiceDefenses: {
        2: '控制對抗與反支配遊戲（Dominance Resistance）',
        3: '情感抽離回安全距（Detached Neutrality）'
      },
      studySummary: '【Phase IV 準則 A6】過往一貫地不負責任（A6）在邊界穩定的真實關係中轉化為願意為一個人的安全守規矩。'
    },
    E15: {
      studySummary: '【全章病理總結｜反社會型 F60.2】門檻：3 項成人+行為規範障礙症（E01/E02 A2、E03/E06 A3、E04/E05 A5、E07/E08 C）➔ 進階：A4（E09/E11）、A7（E10/E12）、A1（E13）、A6（E14）｜註記：創傷防衛 vs 原發性有限親社會情緒（SPEC1）｜共病：物質使用與嗜賭傾向（COM1）。'
    }
  },
  su_fei: {
    E04: { unlockCriteria: ['F60.3-A1'], criterionTags: ['F60.3-A1', 'F60.3-A2', 'F60.7-A5'], studySummary: '【Phase I 鑑別】同恐懼失去重視者，BPD 在瞬間觸發「我會被比下去而被拋棄（A1）」並展開言語貶抑。' },
    E07: {
      unlockCriteria: ['F60.3-A7'],
      criterionTags: ['F60.3-A7'],
      choiceDefenses: {
        2: '無界線全天候共生綁定（24h Fusion Surveillance）',
        3: '推開自驗預言崩潰（Self-Sabotaging Abandonment Validation）'
      },
      studySummary: '【Phase II 準則 A7】慢回一小時即爆發極度空虛與「你先走吧」的預防性推開，呈現 BPD 的經典測試反應。'
    },
    E08: {
      unlockCriteria: ['F60.3-A8'],
      criterionTags: ['F60.3-A8'],
      choiceDefenses: {
        2: '情緒海嘯與人際獨佔誓言（Symbiotic Enmeshment Pact）',
        3: '無效化咆哮引發創傷劇痛（Invalidation-Triggered Rage/Despair）'
      },
      studySummary: '【🥇 Phase I~II 門檻結算】已完成 F60.3-A1, A2, A6, A7, A8 共 5/9 項，達到 DSM-5-TR 邊緣型人格障礙症最低診斷門檻！'
    },
    E09: { unlockCriteria: ['F60.3-A8'], criterionTags: ['F60.3-A8', 'F60.1-A7'], studySummary: '【Phase III 鑑別比較】面對大提琴與星座，BPD 用強烈情緒渴求鏡像；SzPD 用冷靜音律數據回應。' },
    E10: {
      unlockCriteria: ['F60.3-A3'],
      unlockComorbidities: ['F60.3-COM1'],
      criterionTags: ['F60.3-A3'],
      comorbidityTags: ['F60.3-COM1'],
      choiceDefenses: {
        2: '病態共生囚禁合謀（Object-Loss Fusion）',
        3: '恐懼嫌惡擊碎自我客體（Self-Fragmentation Collapse）'
      },
      studySummary: '【Phase III 準則 A3 × 共病傾向】「看不見你，我就記不得自己是誰、自己被愛嗎？」揭示準則 A3 認同障礙：顯著和持續不穩定的自我形象或自我感知，與 C-PTSD 依附斷裂共病（F60.3-COM1）。'
    },
    E11: {
      unlockCriteria: ['F60.3-A4'],
      criterionTags: ['F60.3-A4'],
      choiceDefenses: {
        2: '衝動自毀破壞共謀（Impulsive Wrecking Escapism）',
        3: '被否定羞辱引發舞台創傷崩壞（Shame-Rage Self-Harm Act）'
      },
      studySummary: '【Phase III 準則 A4】受母親掛電話否定後想拿起剪刀毀琴（準則 A4 潛在自我傷害的衝動行為風險），須即時設立安全停損並區分核心價值。'
    },
    E13: {
      unlockCriteria: ['F60.3-A5', 'F60.3-A9'],
      unlockComorbidities: ['F60.3-COM1'],
      criterionTags: ['F60.3-A5', 'F60.3-A9'],
      comorbidityTags: ['F60.3-COM1'],
      choiceDefenses: {
        2: '仇恨轉移失焦（Misdirected Anger Escalation）',
        3: '宿命標籤二次重創（Biological-Fate Stigma Injury）'
      },
      studySummary: '【Phase IV 準則 A5/A9 × 共病】赤腳追計程車的紅色皮箱揭示為何壓力下出現嚴重解離症狀（A9）與自殺或自殘威脅／行為（A5），並常考量憂鬱症／雙相情緒障礙症共病診斷。'
    },
    E14: {
      unlockCriteria: ['F60.3-A9'],
      unlockSpecifiers: ['F60.3-SPEC1'],
      criterionTags: ['F60.3-A9'],
      specifierTags: ['F60.3-SPEC1'],
      choiceDefenses: {
        2: '消滅個人空間共生（Boundary-Free Painting）',
        3: '依附安全退場（Bittersweet Boundary Exit）'
      },
      studySummary: '【Phase IV 鑑別筆記】BPD 的情緒轉換（minutes/hours，受人際觸發）顯著不同於雙相情緒障礙症持續數日～數週的生理躁鬱週期（F60.3-SPEC1）。'
    },
    E15: {
      studySummary: '【全章病理總結｜邊緣型 F60.3】門檻：5/9（E01/E04 A1、E02 A2、E03/E06 A6、E05/E07 A7、E08 A8）➔ 進階：A3（E10）、A4（E11）、A5（E12/E13）、A9（E13/E14）｜註記：與雙相情緒障礙症鑑別（SPEC1）｜共病：C-PTSD／情緒障礙症（COM1）。'
    }
  },
  xia_le: {
    E04: { unlockCriteria: ['F60.4-A1'], criterionTags: ['F60.4-A1', 'F60.2-A5'], studySummary: '【Phase I 鑑別】同樣搶占舞台焦點：HPD 恐懼被觀眾忘記而情緒外顯失落（A1）；ASPD 只為控制感與冒險撩撥。' },
    E07: {
      unlockCriteria: ['F60.4-A5'],
      criterionTags: ['F60.4-A5'],
      choiceDefenses: {
        2: '戲劇張力嫉妒成癮循環（Dramatic Triangulation Hook）',
        3: '「成為透明人」羞恥熄火（Spotlight-Loss Collapse）'
      },
      studySummary: '【Phase II 準則 A5】用緋聞戲碼索求關注，背後呈現 HPD 說話風格過度概念化並缺乏細節（A5）。'
    },
    E08: {
      unlockCriteria: ['F60.4-A6'],
      criterionTags: ['F60.4-A6'],
      choiceDefenses: {
        2: '條件式自尊表演綁架（Conditional Spotlight Dependency）',
        3: '外貌羞辱引發舞台幕後萎縮（Cosmetic-Shame Collapse）'
      },
      studySummary: '【🥇 Phase I~II 門檻結算】已完成 F60.4-A1, A2, A4, A5, A6 共 5/8 項，達到 DSM-5-TR 做作型人格障礙症最低診斷門檻！'
    },
    E09: { unlockCriteria: ['F60.4-A1', 'F60.4-A7'], criterionTags: ['F60.4-A1', 'F60.4-A7', 'F60.6-A5'], studySummary: '【Phase III 鑑別比較】對公開朗讀的完全相反反應：做作型視眾目為保護色；畏避型視眾目為處刑台。' },
    E10: {
      unlockCriteria: ['F60.4-A3'],
      unlockComorbidities: ['F60.4-COM1'],
      criterionTags: ['F60.4-A3'],
      comorbidityTags: ['F60.4-COM1'],
      choiceDefenses: {
        2: '強迫性濃妝面具共生（Persona-Only Attachment）',
        3: '素顏否定引發虛無崩解（False-Self Rejection Despair）'
      },
      studySummary: '【Phase III 準則 A3 × 共病傾向】卸下亮片戲服後的情感空洞感與快速切換（A3），揭露當失去表演強化時容易出現身體化疲勞與次發性憂鬱情緒（F60.4-COM1）。'
    },
    E11: {
      unlockCriteria: ['F60.4-A7'],
      criterionTags: ['F60.4-A7'],
      choiceDefenses: {
        2: '極端戲劇操弄（Histrionic Crisis Escalation）',
        3: '負評內化致存在消散焦慮（Public-Rejection Despair）'
      },
      studySummary: '【Phase III 準則 A7】易受他人留言與環境聲音所影響（易受暗示 A7），粉絲退粉即等同自己存在被擦除。'
    },
    E13: {
      unlockCriteria: ['F60.4-A7'],
      unlockComorbidities: ['F60.4-COM1'],
      criterionTags: ['F60.4-A7'],
      comorbidityTags: ['F60.4-COM1'],
      choiceDefenses: {
        2: '強迫巨星代償壓迫（Compensatory Fame Drive）',
        3: '輕忽童年被遺忘創傷（Invisible-Child Invalidation）'
      },
      studySummary: '【Phase IV 準則 × 共病】破舊小丑紙帽揭示其「不閃亮就不存在」的起源，是區分 HPD 與僅愛自戀獨尊的 NPD 的深層共情鑰匙。'
    },
    E14: {
      unlockCriteria: ['F60.4-A8'],
      unlockSpecifiers: ['F60.4-SPEC1'],
      criterionTags: ['F60.4-A8'],
      specifierTags: ['F60.4-SPEC1'],
      choiceDefenses: {
        2: '獨佔囚禁削弱自信（Possessive Stage-Lock）',
        3: '崇拜距離安全切割（Audience-Zone Detachment）'
      },
      studySummary: '【Phase IV 準則 A8 × 特徵註記】A8「自認為人際關係比實際更為親密」，最終在專屬兩人劇場中轉向真實而非僅僅以不恰當性挑逗維繫（F60.4-SPEC1）。'
    },
    E15: {
      studySummary: '【全章病理總結｜做作型 F60.4】門檻：5/8（E01/E04 A1、E03 A2、E02/E05 A4、E07 A5、E08 A6）➔ 進階：A3（E10）、A7（E09/E11/E13）、A8（E12/E14）｜註記：淺薄表演下的真實依附渴求（SPEC1）｜共病：身體化困擾／憂鬱空虛傾向（COM1）。'
    }
  },
  gu_qingcheng: {
    E04: { unlockCriteria: ['F60.81-A3', 'F60.81-A9'], criterionTags: ['F60.81-A3', 'F60.81-A9', 'F60.6-A4'], studySummary: '【Phase I 鑑別】對專業能力的挑剔評價：NPD 利用自大、傲慢的態度拉開高低階序；AvPD 則專注於被批評或被拒絕並逃離。' },
    E07: {
      unlockCriteria: ['F60.81-A7'],
      criterionTags: ['F60.81-A7'],
      choiceDefenses: {
        2: '階層附庸與特權剝削餵養（Submissive Entitlement Feeding）',
        3: '自戀暴怒與全盤驅逐防衛（Narcissistic Rage & Cut-off）'
      },
      studySummary: '【Phase II 準則 A7】面對自卑感微露，NPD 立即使用高壓「施捨時間」貶抑對方，展現缺乏同理心的防禦甲冑（A7）。'
    },
    E08: {
      unlockCriteria: ['F60.81-A9'],
      criterionTags: ['F60.81-A9'],
      choiceDefenses: {
        2: '奴僕化討好強化高傲剝削（Grandiose Servitude Lock）',
        3: '自尊脆弱拆穿觸發反鎖防禦（Vulnerability-Triggered Rage Seal）'
      },
      studySummary: '【🥇 Phase I~II 門檻結算】已完成 F60.81-A1, A3, A4, A7, A9 共 5/9 項，達到 DSM-5-TR 自戀型人格障礙症最低診斷門檻！'
    },
    E09: {
      unlockSpecifiers: ['F60.81-SPEC1'],
      criterionTags: ['F60.81-A3'],
      specifierTags: ['F60.81-SPEC1', 'F60.0-A6'],
      studySummary: '【Phase III 亞型鑑別】面對沈墨的平視挑戰，揭露 NPD 在外顯高壓特權下「誰也不能質疑我權威」的敏感脆弱底層。'
    },
    E10: {
      unlockCriteria: ['F60.81-A5'],
      unlockSpecifiers: ['F60.81-SPEC1'],
      criterionTags: ['F60.81-A5'],
      specifierTags: ['F60.81-SPEC1'],
      choiceDefenses: {
        2: '虛妄造神共同攻擊外界（Grandiose Delusional Collusion）',
        3: '第二名羞恥暴怒極端斷交（Shame-Triggered Narcissistic Rage）'
      },
      studySummary: '【Phase III 準則 A5 × 亞型切換】98 分第二名碎裂時，外顯「誇大自戀 Grandiose」瞬間塌縮為「脆弱自戀 Vulnerable」，呈現認為自己享有特權（A5）與無價值毀滅感的急劇交替（F60.81-SPEC1）。'
    },
    E11: {
      unlockCriteria: ['F60.81-A6'],
      criterionTags: ['F60.81-A6'],
      choiceDefenses: {
        2: '報復性剝削與資源傾軋（Vindictive Exploitativeness）',
        3: '認同羞辱權威引發冰封死寂（Parental-Shame Collapse）'
      },
      studySummary: '【Phase III 準則 A6】被父親權威打壓後，傾向動用優勢資源佔別人便宜以達到自己的目的（A6 在人際上顯得剝削性）以奪回優越位置。'
    },
    E13: {
      unlockCriteria: ['F60.81-A2'],
      unlockSpecifiers: ['F60.81-SPEC1'],
      criterionTags: ['F60.81-A2'],
      specifierTags: ['F60.81-SPEC1'],
      choiceDefenses: {
        2: '復仇對抗延續評價輪迴（Competitive Rage Cycle）',
        3: '二次嘲諷焊接黃金盔甲（Shame Armor Permanent Lock）'
      },
      studySummary: '【Phase IV 準則 A2 × 亞型註記】壁爐灰燼中的半張亞軍獎狀證明：專注於無止境的成功、權力、顯赫或理想愛情等幻想（A2）只是怕「拿第二名就會被父母丟進火裡」的童年求生術。'
    },
    E14: {
      unlockCriteria: ['F60.81-A8'],
      unlockComorbidities: ['F60.81-COM1'],
      criterionTags: ['F60.81-A8'],
      comorbidityTags: ['F60.81-COM1'],
      choiceDefenses: {
        2: '虛榮物化強化孤高焦慮（Grandiose Objectification）',
        3: '崇拜仰望平行結案（Admirer Boundary Distance）'
      },
      studySummary: '【Phase IV 準則 A8 × 共病傾向】不再時常妒忌別人或認為別人嫉妒自己（A8），也療癒了自戀潰敗期潛藏的低自尊憂鬱困擾（F60.81-COM1）。'
    },
    E15: {
      studySummary: '【全章病理總結｜自戀型 F60.81】門檻：5/9（E01 A1、E03/E04 A3、E05/E06 A4、E02/E07 A7、E08 A9）➔ 進階：A5（E10）、A6（E11）、A2（E12/E13）、A8（E14）｜亞型：誇大自戀 ↔ 脆弱自戀切換（SPEC1）｜共病：自戀潰敗鬱期（COM1）。'
    }
  },
  wen_yan: {
    E04: { unlockCriteria: ['F60.6-A4'], criterionTags: ['F60.6-A4', 'F60.81-A3'], studySummary: '【Phase I 鑑別】面對同一句「像來道歉的學徒」，AvPD 立刻將嚴苛評論內化並先退場自責（A4）。' },
    E07: {
      unlockCriteria: ['F60.6-A6'],
      criterionTags: ['F60.6-A6'],
      choiceDefenses: {
        2: '無能羞愧強化逃避隱形（Incompetence Confirmation）',
        3: '徹底印證「我惹人厭」而鎖門哭泣（Rejection Confirmation Withdrawal）'
      },
      studySummary: '【Phase II 準則 A6】門縫下的道歉信具體展示 A6「自認社交笨拙、缺乏吸引力或不如人」，並主動提前自我放逐。'
    },
    E08: {
      unlockCriteria: ['F60.6-A6'],
      criterionTags: ['F60.6-A6'],
      choiceDefenses: {
        2: '過度代勞印證自己無用（Helpless Inadequacy Proof）',
        3: '嚴厲批評觸發羞恥逃離（Criticism-Driven Escape）'
      },
      studySummary: '【🥇 Phase I~II 門檻結算】已完成 F60.6-A2, A4, A5, A6 共 4/7 項，達到 DSM-5-TR 畏避型人格障礙症最低診斷門檻！'
    },
    E09: {
      unlockSpecifiers: ['F60.6-SPEC1'],
      criterionTags: ['F60.6-A4'],
      specifierTags: ['F60.6-SPEC1', 'F60.1-SPEC1'],
      studySummary: '【Phase III 亞型鑑別註記】與孤僻型林見微同場對照：溫言不是不想參與慶功茶會，而是渴望連結卻因「怕講錯話冷場」的深度自我厭惡退縮。'
    },
    E10: {
      unlockCriteria: ['F60.6-A1'],
      unlockComorbidities: ['F60.6-COM1'],
      criterionTags: ['F60.6-A1'],
      comorbidityTags: ['F60.6-COM1'],
      choiceDefenses: {
        2: '替他發言強化終身畏避（Co-Avoidant Silencing）',
        3: '重演嘲笑創傷瞬間休克失語（Trauma-Triggered Speech Freeze）'
      },
      studySummary: '【Phase III 準則 A1 × 共病傾向】在公開朗讀恐慌裡同時展現社交場合口吃、心跳狂飆等「廣泛性社交焦慮症（SAD）」共病特徵（F60.6-COM1）。'
    },
    E11: {
      unlockCriteria: ['F60.6-A3'],
      criterionTags: ['F60.6-A3'],
      choiceDefenses: {
        2: '共謀逃避加速社會萎縮（Avoidant Sanctuary Isolation）',
        3: '羞辱逼迫自我否定坍塌（Shame-Induced Collapse）'
      },
      studySummary: '【Phase III 準則 A3】當眾受到挑釁後立即想簽解約永不見人（因害怕丟臉或被嘲諷而克制親密關係 A3），考驗支持者是「推入防空洞」還是「陪同暴露面對」。'
    },
    E13: {
      unlockCriteria: ['F60.6-A7'],
      criterionTags: ['F60.6-A7'],
      choiceDefenses: {
        2: '對立情緒驚嚇畏避者（Hostile Tension Discomfort）',
        3: '否定創傷觸發再度鎖櫃（Shame-Reinforced Shutoff）'
      },
      studySummary: '【Phase IV 準則 A7】小學五年級講台受嘲與母親的長嘆，種下他因為害怕尷尬，通常不願意冒個人風險或從事任何新活動的種子（A7）。'
    },
    E14: {
      unlockCriteria: ['F60.6-A7'],
      unlockComorbidities: ['F60.6-COM1'],
      criterionTags: ['F60.6-A7'],
      comorbidityTags: ['F60.6-COM1'],
      choiceDefenses: {
        2: '社交圈封鎖式保護依附（Protective Isolation）',
        3: '安全旁觀溫和結案（Safe-Distance Acquaintance）'
      },
      studySummary: '【Phase IV 預後總結】畏避型共病廣泛性社交焦慮症（SAD）比例極高；臨床關鍵不是替代說話，而是與個案建立不批評的安全暴露梯度。'
    },
    E15: {
      studySummary: '【全章病理總結｜畏避型 F60.6】門檻：4/7（E01/E04 A4、E02/E05 A2、E03/E06 A5、E07/E08 A6）➔ 進階：A1（E10）、A3（E11/E12）、A7（E13/E14）｜註記：與孤僻型「無慾 vs 渴望但怕痛」鑑別（SPEC1）｜共病：廣泛性社交焦慮症（COM1）。'
    }
  },
  bai_xiaolu: {
    E04: { unlockCriteria: ['F60.7-A3'], criterionTags: ['F60.7-A3', 'F60.3-A1'], studySummary: '【Phase I 鑑別】同面對失誤衝突：BPD 激烈指責被拋棄；DPD 則即刻攬下所有錯處、自我貶抑並請求留情（A3）。' },
    E07: {
      unlockCriteria: ['F60.7-A5'],
      criterionTags: ['F60.7-A5'],
      choiceDefenses: {
        2: '順從退行與自主能力剝奪（Infantilizing Symbiosis）',
        3: '怕被拋棄而自我跪求貶抑（Terror-Driven Subjugation）'
      },
      studySummary: '【Phase II 準則 A5】把「被鼓勵自己挑配方」解讀為「要丟下不管了」，連代五天夜班正是為了獲得他人撫慰或支持而自願去做不愉快的事（A5）。'
    },
    E08: {
      unlockCriteria: ['F60.7-A6'],
      criterionTags: ['F60.7-A6'],
      choiceDefenses: {
        2: '徹底退行回金絲雀籠（Total Regression Compliance）',
        3: '拋棄危機引發癱瘓無助哭泣（Helpless Abandonment Collapse）'
      },
      studySummary: '【🥇 Phase I~II 門檻結算】已完成 F60.7-A1, A2, A3, A5, A6 共 5/8 項，達到 DSM-5-TR 依賴型人格障礙症最低診斷門檻！'
    },
    E09: { unlockCriteria: ['F60.7-A2', 'F60.7-A5'], criterionTags: ['F60.7-A2', 'F60.7-A5', 'F60.89-GA'], studySummary: '【Phase III 鑑別比較】句型同樣是「都可以」：小鹿是害怕失去支持或讚許、害怕被拋棄的恐慌；子謙則是隱性冷笑與反擊抱怨。' },
    E10: {
      unlockCriteria: ['F60.7-A4'],
      unlockSpecifiers: ['F60.7-SPEC1'],
      criterionTags: ['F60.7-A4'],
      specifierTags: ['F60.7-SPEC1'],
      choiceDefenses: {
        2: '簽立主從切結鎖死共生（Subjugated-Bond Codependency）',
        3: '推開巨嬰批判引發被棄絕崩盤（Abandonment Panic Breakdown）'
      },
      studySummary: '【Phase III 準則 A4 × 臨床註記】困難於為自己實施新計劃或執行事務（對自己的判斷或能力缺乏自信）（A4），必須區分她渴望的不是拒絕長大，而是「怕獨立就會換來照顧者哭泣與離別（SPEC1）」。'
    },
    E11: {
      unlockCriteria: ['F60.7-A7'],
      unlockComorbidities: ['F60.7-COM1'],
      criterionTags: ['F60.7-A7'],
      comorbidityTags: ['F60.7-COM1'],
      choiceDefenses: {
        2: '替換式控制爭奪權力（Savior-Controller Swap）',
        3: '交還家庭情緒勒索源（Enmeshed Family Recapture）'
      },
      studySummary: '【Phase III 準則 A7 × 共病傾向】面對家庭施壓即刻想換取保護依附傘，或陷入持續對外在危險過度擔憂的廣泛性焦慮症（GAD，F60.7-COM1）共病表現。'
    },
    E13: {
      unlockCriteria: ['F60.7-A7'],
      criterionTags: ['F60.7-A7'],
      choiceDefenses: {
        2: '強制斷親引發生存依附焦慮（Forced-Cut Loyalty Conflict）',
        3: '印證先天無能信念（Learned-Helplessness Reinforcement）'
      },
      studySummary: '【Phase IV 準則 A7 根源】被母親剪掉拉鍊的小背包解釋了一切：她學會了「獨立＝會害媽媽死或被拋棄」，遂極度依賴他人的指引才敢行動。'
    },
    E14: {
      unlockCriteria: ['F60.7-A8'],
      unlockComorbidities: ['F60.7-COM1'],
      criterionTags: ['F60.7-A8'],
      comorbidityTags: ['F60.7-COM1'],
      choiceDefenses: {
        2: '打壓伴侶獨立成長回退（Growth-Suppressing Control）',
        3: '自主祝福平行離席（Supportive Independence Farewell）'
      },
      studySummary: '【Phase IV 準則 A8 × 共病療癒】不切實際地專注於害怕被獨自留下而需自己照顧自己（A8）與 GAD 慢性焦慮在自主成功經驗中大幅緩解。'
    },
    E15: {
      studySummary: '【全章病理總結｜依賴型 F60.7】門檻：5/8（E01/E02 A1、E05 A2、E03/E04 A3、E06/E07 A5、E08 A6）➔ 進階：A4（E10/E12）、A7（E11/E13）、A8（E14）｜註記：共生恐懼源於控制依附學習（SPEC1）｜共病：廣泛性焦慮症 GAD（COM1）。'
    }
  },
  ji_yan: {
    E04: { unlockCriteria: ['F60.5-A8'], criterionTags: ['F60.5-A8', 'F60.89-GB'], studySummary: '【Phase I 鑑別】OCPD 對時間表與字距的 15 分鐘級別表現死板、頑固（A8），在遇到消極阻撓時越發收緊準則防禦。' },
    E07: {
      unlockCriteria: ['F60.5-A2'],
      criterionTags: ['F60.5-A2'],
      choiceDefenses: {
        2: '僵化規則納管標本化（Hyper-Regulated Objectification）',
        3: '破壞結構誘發失控冷戰（Structure-Loss Defensive Freeze）'
      },
      studySummary: '【Phase II 準則 A2】心率上升時立即寫出十二頁 SOP 防範失控感（理智化與情感隔離 Defense），並顯示過度要求完美而妨礙任務的完成（A2）。'
    },
    E08: {
      unlockCriteria: ['F60.5-A8'],
      criterionTags: ['F60.5-A8'],
      choiceDefenses: {
        2: '助長僵化冒險規則執行（Rigid Compliance Hazard）',
        3: '羞辱秩序需求導致隔離鎖門（Order-Shaming Lockout）'
      },
      studySummary: '【🥇 Phase I~II 門檻結算】已完成 F60.5-A1, A2, A3, A8 共 4/8 項，達到 DSM-5-TR 強迫型人格障礙症最低診斷門檻！'
    },
    E09: { unlockCriteria: ['F60.5-A1', 'F60.5-A8'], criterionTags: ['F60.5-A1', 'F60.5-A8', 'F07.0-B'], studySummary: '【Phase III 鑑別比較】OCPD 靠剛性時刻表壓制失控焦慮；TBI 性格改變則無法仰賴大腦抑制迴路。' },
    E10: {
      unlockCriteria: ['F60.5-A6'],
      criterionTags: ['F60.5-A6'],
      choiceDefenses: {
        2: '強迫讀秒共謀牢籠（Compulsive-Clock Collusion）',
        3: '創傷失格羞辱觸發決裂（Trauma-Object Desecration Freeze）'
      },
      studySummary: '【Phase III 準則 A6】除非別人完全照自己的意思來做，否則不願分派任務或與他人一起工作（A6），連壞掉的懷錶失去刻度都要獨自拼命補償。'
    },
    E11: {
      unlockCriteria: ['F60.5-A4'],
      unlockComorbidities: ['F60.5-COM1'],
      criterionTags: ['F60.5-A4'],
      comorbidityTags: ['F60.5-COM1'],
      choiceDefenses: {
        2: '觸犯道德潔癖引發極端排斥（Scrupulosity Moral Breach）',
        3: '羞辱職責加深強迫自懲（Self-Punitive Overwork Escalation）'
      },
      studySummary: '【Phase III 準則 A4 × 共病傾向】一點貼反的非核心標籤引發對道德、倫理或價值觀過度嚴謹、一絲不苟、缺乏彈性（A4），背後常伴隨焦慮緊繃與自責性次發憂鬱（F60.5-COM1）。'
    },
    E13: {
      unlockCriteria: ['F60.5-A5'],
      unlockComorbidities: ['F60.5-COM1'],
      criterionTags: ['F60.5-A5'],
      comorbidityTags: ['F60.5-COM1'],
      choiceDefenses: {
        2: '強化倖存者內疚自懲（Survivor-Guilt Reinforcement）',
        3: '理智化割裂創傷共鳴（Empathic Disconnect Freeze）'
      },
      studySummary: '【Phase IV 準則 A5 × 共病】保存舊照與發票物件（A5 即使已無情感價值，也無法拋棄破舊或無價值的物品），源於十一歲漏看胎壓的倖存者內疚與慢性鬱悶（F60.5-COM1）。'
    },
    E14: {
      unlockCriteria: ['F60.5-A7'],
      unlockSpecifiers: ['F60.5-SPEC1'],
      criterionTags: ['F60.5-A7'],
      specifierTags: ['F60.5-SPEC1'],
      choiceDefenses: {
        2: '剝奪秩序框架引發隱微焦慮（Routine-Deprivation Anxiety）',
        3: '禮貌邊界尊敬道別（Respectful Boundary Parting）'
      },
      studySummary: '【Phase IV 準則 A7 × 臨床鑑別】把防錯預備視作愛與保護的方式（A7）；並確認「自我協調型 OCPD（覺得規章沒錯）」與「自我衝突型 OCD（痛苦於強迫儀式）」的關鍵分化（F60.5-SPEC1）。'
    },
    E15: {
      studySummary: '【全章病理總結｜強迫型 F60.5】門檻：4/8（E01/E02 A1、E05/E07 A2、E03/E06 A3、E04/E08 A8）➔ 進階：A6（E10/E12）、A4（E11）、A5（E13）、A7（E14）｜註記：Ego-syntonic OCPD vs Ego-dystonic OCD（SPEC1）｜共病：焦慮／次發性憂鬱（COM1）。'
    }
  },
  lu_qinglan: {
    E04: { unlockCriteria: ['F07.0-E'], criterionTags: ['F07.0-E', 'F21-A7'], studySummary: '【Phase I】即使對陶瓷自嘲幽默，她依然真切體驗到失去過去精密手術能力的苦痛與人際落差（準則 E）。' },
    E07: {
      unlockCriteria: ['F07.0-D'],
      criterionTags: ['F07.0-D'],
      choiceDefenses: {
        2: '病理標籤化剝奪主體尊嚴（Medicalized Invalidism）',
        3: '失去自我價值自卑潰敗（Post-Injury Worthlessness Despair）'
      },
      studySummary: '【Phase II 準則 D】在情緒低落自貶中，她的人格雖變卻無譫妄或失智混亂（準則 D：非發生於譫妄時，意識與認知定向完全清晰）。'
    },
    E08: {
      unlockCriteria: ['F07.0-B', 'F07.0-E'],
      criterionTags: ['F07.0-B', 'F07.0-E'],
      choiceDefenses: {
        2: '過度醫療保護禁錮（Over-Medicalized Deprivation）',
        3: '機能殘障斥責加劇自我否定（Competence-Loss Shame）'
      },
      studySummary: '【🥇 Phase I~II 門檻結算】已完成 F07.0-A, B, C, D, E 全部 5 項診斷門檻，確立車禍右額葉腦傷（另一身體病況）引起的人格改變！'
    },
    E09: {
      unlockCriteria: ['F07.0-SUB-DIS'],
      criterionTags: ['F07.0-SUB-DIS', 'F60.5-A8'],
      studySummary: '【Phase III 亞型註記｜去抑制型】在窯燒排列與對話中自然表現出眶額葉過濾器缺損（衝動直率、無法按僵化編號操作）。'
    },
    E10: {
      unlockCriteria: ['F07.0-SUB-LAB'],
      criterionTags: ['F07.0-SUB-LAB'],
      choiceDefenses: {
        2: '強迫偽裝創傷前完美幻影（Pre-Morbid Persona Coercion）',
        3: '身體創疤嫌惡羞恥擊碎（Somatic-Scar Rejection Trauma）'
      },
      studySummary: '【Phase III 亞型註記｜易變型】摘下額角金箔髮夾展現開顱疤痕時，迅速湧現不穩卻真實的悲喜流動（F07.0-SUB-LAB）。'
    },
    E11: {
      unlockCriteria: ['F07.0-SUB-DIS'],
      unlockSpecifiers: ['F07.0-SPEC1'],
      criterionTags: ['F07.0-SUB-DIS'],
      specifierTags: ['F07.0-SPEC1'],
      choiceDefenses: {
        2: '煽動去抑制衝動毀損社會功能（Disinhibited Wrecking Escalation）',
        3: '內化舊同事鄙夷引發失力潰敗（Social-Stigma Abandonment Collapse）'
      },
      studySummary: '【Phase III 亞型與鑑別註記】面對前未婚夫嘲笑，「氣到嗡嗡叫手停不下來」揭示雙重課題：需保護其「去抑制型衝動控制不佳（SUB-DIS）」，且病理切線明確落於車禍神經學損傷而非原發性雙相情緒障礙症／躁症（SPEC1）。'
    },
    E13: {
      unlockCriteria: ['F07.0-COMB'],
      unlockComorbidities: ['F07.0-COM1'],
      criterionTags: ['F07.0-COMB'],
      comorbidityTags: ['F07.0-COM1'],
      choiceDefenses: {
        2: '無視器質限制之復原強求（Organic-Limit Denial Stress）',
        3: '社會階級墜落感羞辱（Status-Loss Stigma Blow）'
      },
      studySummary: '【Phase IV 合併型 × 共病傾向】顯微器械與初代金繼碗整合了易變型與去抑制型「合併型（COMB）」，並照見TBI 後常見的認知疲勞與失去過往完美自我的適應性悲傷（F07.0-COM1）。'
    },
    E14: {
      unlockComorbidities: ['F07.0-COM1'],
      comorbidityTags: ['F07.0-COM1'],
      choiceDefenses: {
        2: '過度糾正神經學特質（Behavioral Over-Suppression）',
        3: '爽朗支持式朋友距離（Appreciative Companionship）'
      },
      studySummary: '【Phase IV 預後總結】「金繼（Kintsugi）」概念成為接納器質受損與性格新貌的最佳隱喻，緩解其失落悲傷並建立互助結構。'
    },
    E15: {
      studySummary: '【全章病理總結｜另一身體病況引起的人格改變 F07.0】門檻：A～E 五核心準則齊備（E01～E08）➔ 亞型揭曉：易變型（E10）＋去抑制型（E09/E11）➔ 合併型（E12/E13）｜鑑別註記：神經器質病因 vs 原發雙相情緒障礙症/BPD（SPEC1）｜共病：TBI 認知疲勞／喪失前自我之適應性悲傷（COM1）。'
    }
  },
  you_ziqian: {
    E04: { unlockCriteria: ['F60.89-GC'], criterionTags: ['F60.89-GC', 'F60.7-A5'], studySummary: '【Phase I 鑑別】同是迴避衝突，小鹿是害怕被拋棄的自貶（DPD）；子謙則因長期隱忍累積成暗刺與疲憊困擾（GC）。' },
    E07: {
      unlockCriteria: ['F60.89-GD'],
      criterionTags: ['F60.89-GD'],
      choiceDefenses: {
        2: '吞下苦水加劇陰陽失衡（Passive-Resentment Escalation）',
        3: '無辜受虐劇本道德反殺（Martyr-Victim Inversion）'
      },
      studySummary: '【Phase II 準則 GD】「隨身碟不小心丟進洗衣機」＋雙倍苦拿鐵＋微笑自嘲，呈現跨越長期生命的穩定被動攻擊模式（GD）。'
    },
    E08: {
      unlockCriteria: ['F60.89-GD'],
      criterionTags: ['F60.89-GD'],
      choiceDefenses: {
        2: '縱容消極躺平依附破壞界線（Passive-Dependency Enabling）',
        3: '誤信假笑累加隱性怨懟（Resentment Ledger Accumulation）'
      },
      studySummary: '【🥇 Phase I~II 門檻結算】已完成 DSM-5-TR 一般人格障礙症準則（A～F：缺乏彈性且普遍存在、引起顯著苦惱或功能減損、起始可追溯至青春期或成年期早期），正式確立其他特定的人格障礙症！'
    },
    E09: { unlockCriteria: ['F60.89-GA', 'F60.89-GC'], criterionTags: ['F60.89-GA', 'F60.89-GC', 'F60.7-A2'], studySummary: '【Phase III 鑑別比較】透過咖啡廳一杯「隨便」區分：真誠順從怕出錯（DPD）vs 微笑冷眼拒表態（被動攻擊型）。' },
    E10: {
      unlockCriteria: ['F60.89-PA1'],
      criterionTags: ['F60.89-PA1'],
      choiceDefenses: {
        2: '金錢支配順從假面（Servile-Mask Enmeshment）',
        3: '面具焊死冷酷隔離（Smile-Armor Permanent Seal）'
      },
      studySummary: '【Phase III 研究準則 PA1】被家族當成無情緒提款機時邊微笑邊咬出血背，具體體現被動阻撓與難以承接合理期望背後不被看見的委屈怒氣（PA1）。'
    },
    E11: {
      unlockCriteria: ['F60.89-PA2'],
      criterionTags: ['F60.89-PA2'],
      choiceDefenses: {
        2: '自我毀滅式破壞共犯（Self-Sabotage Collusion）',
        3: '怒棄後徹底自我抹除（Self-Destructive Retaliation）'
      },
      studySummary: '【Phase III 研究準則 PA2】截稿前想打翻水毀掉主機，演繹「抱怨不被理解卻同時透過自我設障與拖延懲罰自己與世界（PA2）」。'
    },
    E13: {
      unlockCriteria: ['F60.89-PA2'],
      unlockComorbidities: ['F60.89-COM1'],
      criterionTags: ['F60.89-PA2'],
      comorbidityTags: ['F60.89-COM1'],
      choiceDefenses: {
        2: '擴張隱性報復（Covert-Revenge Generalization）',
        3: '道德說教重啟營業假笑（Moral-Shaming Mask Reset）'
      },
      studySummary: '【Phase IV 研究準則 × 共病傾向】「家裡不准皺眉」強制冷暴力罰跪揭示起源，且長年的微笑壓抑常導致慢性憂鬱情緒與心身化胃痛困擾（F60.89-COM1）。'
    },
    E14: {
      unlockCriteria: ['F60.89-MIX'],
      unlockSpecifiers: ['F60.89-SPEC1'],
      unlockComorbidities: ['F60.89-COM1'],
      criterionTags: ['F60.89-MIX'],
      specifierTags: ['F60.89-SPEC1'],
      comorbidityTags: ['F60.89-COM1'],
      choiceDefenses: {
        2: '拒絕伴侶真實情感成長（Compliance-Preference Regression）',
        3: '不用假笑之真誠友誼（Honest Boundary Friendship）'
      },
      studySummary: '【Phase IV 亞型與共病總結】DSM-5-TR 已將傳統「被動攻擊型」納入其他特定的人格障礙症 F60.89（混合型／被動攻擊特徵註記 SPEC1），練習在安全關係裡直接說「不」才是去面具治本之道。'
    },
    E15: {
      studySummary: '【全章病理總結｜其他特定的人格障礙症（含被動攻擊特徵）F60.89】門檻：一般準則 GA～GD 齊備（E01～E08）➔ 進階研究準則：PA1（E10）、PA2（E11/E13）、MIX（E12/E14）｜註記：DSM-5-TR F60.89 被動攻擊特徵分類轉變（SPEC1）｜共病：持續性憂鬱／心身症腸胃緊繃（COM1）。'
    }
  }
};

function mergeTags(...lists) {
  return [...new Set(lists.flat().filter(Boolean))];
}

function enrichChoicesWithOverlay(choices = [], overlay = {}) {
  return choices.map((c, idx) => {
    const next = { ...c };
    if (overlay.choiceDefenses && overlay.choiceDefenses[idx] && !next.defenseMechanism) {
      next.defenseMechanism = overlay.choiceDefenses[idx];
    }
    if (idx === 0 && overlay.unlockCriteria?.[0] && !next.unlockCriterion) {
      next.unlockCriterion = overlay.unlockCriteria[0];
    }
    if (idx === 0 && overlay.unlockSpecifiers?.[0] && !next.unlockSpecifier) {
      next.unlockSpecifier = overlay.unlockSpecifiers[0];
    }
    if (idx === 0 && overlay.unlockComorbidities?.[0] && !next.unlockComorbidity) {
      next.unlockComorbidity = overlay.unlockComorbidities[0];
    }
    return next;
  });
}

// 將「靈魂真名（Phase I~II 法定最低門檻達成）」揭曉點統一套用到 E08，並將 E01~E15 的教學詮釋與防禦標註整合完成
function applyDiagnosisReveal(charId, events) {
  const cfg = DIAGNOSIS_REVEAL_CONFIG[charId];
  const revealNum = getDiagnosisRevealEvent(charId);
  const charOverlay = CLINICAL_EVENT_OVERLAY[charId] || {};

  return events.map((ev) => {
    const ov = charOverlay[ev.code] || {};
    const mergedEvent = {
      ...ev,
      unlockCriteria: mergeTags(ev.unlockCriteria, ev.criterionId ? [ev.criterionId] : [], ov.unlockCriteria),
      unlockSpecifiers: mergeTags(ev.unlockSpecifiers, ov.unlockSpecifiers),
      unlockComorbidities: mergeTags(ev.unlockComorbidities, ov.unlockComorbidities),
      criterionTags: mergeTags(ev.criterionTags, ov.criterionTags, ov.unlockCriteria),
      specifierTags: mergeTags(ev.specifierTags, ov.specifierTags, ov.unlockSpecifiers),
      comorbidityTags: mergeTags(ev.comorbidityTags, ov.comorbidityTags, ov.unlockComorbidities),
      studySummary: ov.studySummary || ev.studySummary || null
    };

    if (ov.choiceDefenses || ov.unlockCriteria || ov.unlockSpecifiers || ov.unlockComorbidities) {
      mergedEvent.nodes = (mergedEvent.nodes || []).map((node) => {
        if (!Array.isArray(node.choices) || node.choices.length === 0) return node;
        return {
          ...node,
          choices: enrichChoicesWithOverlay(node.choices, ov)
        };
      });
    }

    if (mergedEvent.eventNumber === 12 && revealNum !== 12) {
      return {
        ...mergedEvent,
        unlockDiagnosisOnComplete: false,
        title: mergedEvent.title.replace(/（🥇 解鎖臨床真相）/, '')
      };
    }

    if (mergedEvent.eventNumber === revealNum) {
      const nodes = Array.isArray(mergedEvent.nodes) ? [...mergedEvent.nodes] : [];
      if (cfg?.revealNote) {
        nodes.push({
          speaker: 'narrator',
          expression: 'vulnerable',
          text: `📓 ${cfg.revealNote}`
        });
      }
      return {
        ...mergedEvent,
        unlockDiagnosisOnComplete: true,
        title: `${mergedEvent.title}（🥇 確立臨床診斷）`,
        nodes
      };
    }
    return mergedEvent;
  });
}

export function getCharacter15Events(charId, scenarioData) {
  const char = CHARACTERS.find((c) => c.id === charId);
  const lore = CHARACTER_EXTENDED_LORE[charId];
  const locs = lore.scheduleLocations;
  const critList = char.criteria || char.dsmCriteria || [];
  const bespoke = CHARACTER_BESPOKE_STORY_NODES[charId];
  const uniqueDisaster = UNIQUE_DISASTER_EVENTS[charId];

  // 取得基礎劇本中的 3 個核心章節與 3 個日常對話
  const baseChaps = scenarioData?.chapters || [];
  const talks = scenarioData?.dailyTalks || [];

  const chap1 = baseChaps[0] || { title: '初遇的微光', ambience: '午後微風', nodes: [] };
  const chap2 = baseChaps[1] || { title: '心防的裂隙', ambience: '傍晚暮色', nodes: [] };
  const chap3 = baseChaps[2] || { title: '靈魂的真名', ambience: '深夜靜謐', nodes: [] };

  // 建立自訂節點的輔助函式（保留完整角色專屬選項、防禦標記與亞型／共病解鎖）
  const makeCustomNodes = (title, promptText, charLine, choices, unlockCritId) => [
    {
      speaker: 'narrator',
      expression: 'neutral',
      text: promptText
    },
    {
      speaker: 'char',
      expression: 'anxious',
      text: charLine,
      choices: choices.map((c, idx) => ({
        text: c.text,
        nextExpression: c.nextExpression || (c.stats?.security > 0 ? 'smile' : c.stats?.security < -10 ? 'triggered' : 'vulnerable'),
        reply: c.reply,
        psychNote: c.psychNote,
        defenseMechanism: c.defenseMechanism || null,
        stats: c.stats,
        unlockCriterion: idx === 0 && unlockCritId ? unlockCritId : c.unlockCriterion || null,
        unlockSpecifier: c.unlockSpecifier || null,
        unlockComorbidity: c.unlockComorbidity || null
      }))
    }
  ];

  // 查詢三人同場事件（若正反 key 皆可匹配）
  const findTrio = (pId) => {
    const k1 = `${charId}__${pId}`;
    const k2 = `${pId}__${charId}`;
    return TRIO_SCENES_DATA[k1] || TRIO_SCENES_DATA[k2] || TRIO_SCENES_DATA['shen_mo__lin_jianwei'];
  };

  const trio1 = findTrio(lore.trioPartner1);
  const trio2 = findTrio(lore.trioPartner2);

  // 檢查是否有 eventBlueprint 專屬 E02 / E03 / E06（如沈墨），否則使用 scenarioData.dailyTalks 的專屬劇本
  const bpMap = {};
  if (Array.isArray(lore.eventBlueprint)) {
    lore.eventBlueprint.forEach((bp) => {
      if (bp && bp.code) bpMap[bp.code] = bp;
    });
  }

  const buildDailyOrBlueprintEvent = (eventNumber, code, phase, phaseName, locId, talkIdx, fallbackCritId) => {
    const bp = bpMap[code];
    if (bp && bp.type === 'custom' && bp.choices) {
      const targetCritId = critList[bp.critIdx]?.id || fallbackCritId;
      return {
        eventNumber,
        code,
        phase,
        phaseName,
        locationId: bp.loc || locId,
        type: 'story',
        title: `${code}｜${bp.title}`,
        ambience: `${LOCATIONS.find((l) => l.id === (bp.loc || locId))?.name}的微光與呼吸`,
        criterionId: targetCritId,
        criterionTags: mergeTags(bp.criterionTags, [targetCritId]),
        studySummary: bp.studySummary || null,
        nodes: makeCustomNodes(
          bp.title,
          bp.prompt,
          bp.charLine,
          bp.choices,
          targetCritId
        )
      };
    }

    const tk = talks[talkIdx] || {};
    const locName = LOCATIONS.find((l) => l.id === locId)?.name || '公寓';
    const targetCritId = tk.unlockCriterion || fallbackCritId;
    return {
      eventNumber,
      code,
      phase,
      phaseName,
      locationId: locId,
      type: 'story',
      title: `${code}｜${tk.title || '日常交會'}`,
      ambience: `${locName}的柔和光影`,
      criterionId: targetCritId,
      unlockCriteria: targetCritId ? [targetCritId] : [],
      unlockSpecifiers: tk.unlockSpecifier ? [tk.unlockSpecifier] : [],
      unlockComorbidities: tk.unlockComorbidity ? [tk.unlockComorbidity] : [],
      criterionTags: mergeTags(tk.criterionTags, targetCritId ? [targetCritId] : []),
      specifierTags: tk.specifierTags || (tk.unlockSpecifier ? [tk.unlockSpecifier] : []),
      comorbidityTags: tk.comorbidityTags || (tk.unlockComorbidity ? [tk.unlockComorbidity] : []),
      studySummary: tk.studySummary || null,
      nodes: makeCustomNodes(
        tk.title || '日常交會',
        `在【${locName}】，${tk.prompt || `你遇見了${char.name}。`}`,
        tk.response || char.tagline,
        Array.isArray(tk.choices) && tk.choices.length > 0 ? tk.choices : [],
        targetCritId
      )
    };
  };

  const extractNodeTags = (nodes = [], field) =>
    mergeTags(...nodes.map((n) => [n[field], ...(n.choices || []).map((c) => c[field])].flat()));

  const events = [
    // ==================== PHASE I：初識與日常表象 (E01 ~ E04) ====================
    {
      eventNumber: 1,
      code: 'E01',
      phase: 1,
      phaseName: 'Phase I：初識與日常表象（門檻蒐集）',
      locationId: locs[0],
      type: 'story',
      title: `E01｜初遇：${chap1.title.replace(/^第.章：/, '')}`,
      ambience: chap1.ambience,
      criterionId: chap1.nodes?.find((n) => n.unlockCriterion)?.unlockCriterion || critList[0]?.id,
      criterionTags: mergeTags(chap1.criterionTags, extractNodeTags(chap1.nodes, 'unlockCriterion')),
      studySummary: chap1.studySummary || null,
      nodes: chap1.nodes
    },
    buildDailyOrBlueprintEvent(2, 'E02', 1, 'Phase I：初識與日常表象（門檻蒐集）', locs[1], 0, critList[0]?.id),
    buildDailyOrBlueprintEvent(3, 'E03', 1, 'Phase I：初識與日常表象（門檻蒐集）', locs[2], 1, critList[1]?.id || critList[0]?.id),
    {
      eventNumber: 4,
      code: 'E04',
      phase: 1,
      phaseName: 'Phase I：初識與日常表象（門檻蒐集）',
      locationId: trio1.locationId,
      type: 'trio',
      partnerId: lore.trioPartner1,
      title: `E04｜${trio1.title}`,
      ambience: trio1.ambience,
      criterionId: critList[1]?.id || critList[0]?.id,
      criterionTags: trio1.criterionTags || [],
      specifierTags: trio1.specifierTags || [],
      differentialContrast: trio1.differentialContrast || null,
      studySummary: trio1.studySummary || null,
      nodes: trio1.nodes
    },

    // ==================== PHASE II：試探、防衛與法定門檻確立 (E05 ~ E08) ====================
    {
      eventNumber: 5,
      code: 'E05',
      phase: 2,
      phaseName: 'Phase II：試探、防衛與法定門檻確立',
      locationId: locs[0],
      type: 'story',
      title: `E05｜深入試探：${chap2.title.replace(/^第.章：/, '')}`,
      ambience: chap2.ambience,
      criterionId: chap2.nodes?.find((n) => n.unlockCriterion)?.unlockCriterion || critList[1]?.id || critList[0]?.id,
      criterionTags: mergeTags(chap2.criterionTags, extractNodeTags(chap2.nodes, 'unlockCriterion')),
      studySummary: chap2.studySummary || null,
      nodes: chap2.nodes
    },
    buildDailyOrBlueprintEvent(6, 'E06', 2, 'Phase II：試探、防衛與法定門檻確立', locs[3], 2, critList[2]?.id || critList[1]?.id),
    {
      eventNumber: 7,
      code: 'E07',
      phase: 2,
      phaseName: 'Phase II：試探、防衛與法定門檻確立',
      locationId: locs[1],
      type: 'story',
      title: bespoke.e07.title,
      ambience: '微雨午後的防衛與試探',
      criterionId: critList[2]?.id || critList[0]?.id,
      nodes: makeCustomNodes(
        bespoke.e07.title,
        bespoke.e07.prompt,
        bespoke.e07.charLine,
        bespoke.e07.choices,
        critList[2]?.id || critList[0]?.id
      )
    },
    {
      eventNumber: 8,
      code: 'E08',
      phase: 2,
      phaseName: 'Phase II：試探、防衛與法定門檻確立',
      locationId: locs[0],
      type: 'shared_quake',
      title: uniqueDisaster.title,
      ambience: uniqueDisaster.ambience,
      criterionId: critList[Math.min((char.minThreshold || 4) - 1, critList.length - 1)]?.id || critList[2]?.id,
      nodes: [
        {
          speaker: 'narrator',
          expression: 'anxious',
          text: uniqueDisaster.narratorText
        },
        {
          speaker: 'char',
          expression: 'vulnerable',
          text: uniqueDisaster.charLine,
          choices: uniqueDisaster.choices.map((c, idx) => ({
            ...c,
            unlockCriterion: idx === 0 ? (critList[Math.min((char.minThreshold || 4) - 1, critList.length - 1)]?.id || critList[2]?.id) : null
          }))
        }
      ]
    },

    // ==================== PHASE III：進階準則、亞型註記與核心風暴 (E09 ~ E12) ====================
    {
      eventNumber: 9,
      code: 'E09',
      phase: 3,
      phaseName: 'Phase III：進階準則、亞型註記與核心風暴',
      locationId: trio2.locationId,
      type: 'trio',
      partnerId: lore.trioPartner2,
      title: `E09｜${trio2.title}`,
      ambience: trio2.ambience,
      criterionId: critList[critList.length - 1]?.id,
      criterionTags: trio2.criterionTags || [],
      specifierTags: trio2.specifierTags || [],
      differentialContrast: trio2.differentialContrast || null,
      studySummary: trio2.studySummary || null,
      nodes: trio2.nodes
    },
    {
      eventNumber: 10,
      code: 'E10',
      phase: 3,
      phaseName: 'Phase III：進階準則、亞型註記與核心風暴',
      locationId: locs[0],
      type: 'shared_typhoon',
      title: bespoke.e10.title,
      ambience: '靜夜裡的真心與邊界分水嶺',
      criterionId: critList[critList.length - 1]?.id,
      nodes: [
        {
          speaker: 'narrator',
          expression: 'vulnerable',
          text: bespoke.e10.prompt
        },
        {
          speaker: 'char',
          expression: 'vulnerable',
          text: bespoke.e10.charLine,
          choices: bespoke.e10.choices.map((c, idx) => ({
            ...c,
            nextExpression: c.nextExpression || (c.stats?.security >= 15 ? 'smile' : c.stats?.security < 0 ? 'triggered' : 'vulnerable'),
            unlockCriterion: idx < 2 ? (CLINICAL_EVENT_OVERLAY[charId]?.E10?.unlockCriteria?.[0] || critList[critList.length - 1]?.id) : null
          }))
        }
      ]
    },
    {
      eventNumber: 11,
      code: 'E11',
      phase: 3,
      phaseName: 'Phase III：進階準則、亞型註記與核心風暴',
      locationId: locs[2],
      type: 'story',
      title: bespoke.e11.title,
      ambience: '現實壓力與創傷重演的考驗',
      criterionId: critList[critList.length - 1]?.id,
      nodes: makeCustomNodes(
        bespoke.e11.title,
        bespoke.e11.prompt,
        bespoke.e11.charLine,
        bespoke.e11.choices,
        CLINICAL_EVENT_OVERLAY[charId]?.E11?.unlockCriteria?.[0] || critList[critList.length - 1]?.id
      )
    },
    {
      eventNumber: 12,
      code: 'E12',
      phase: 3,
      phaseName: 'Phase III：進階準則、亞型註記與核心風暴',
      locationId: locs[0],
      type: 'story',
      unlockDiagnosisOnComplete: false,
      title: `E12｜心門對峙：${chap3.title.replace(/^第.章：/, '')}`,
      ambience: chap3.ambience,
      criterionId: chap3.nodes?.find((n) => n.unlockCriterion)?.unlockCriterion || critList[critList.length - 1]?.id,
      criterionTags: mergeTags(chap3.criterionTags, extractNodeTags(chap3.nodes, 'unlockCriterion')),
      specifierTags: mergeTags(chap3.specifierTags, extractNodeTags(chap3.nodes, 'unlockSpecifier')),
      comorbidityTags: mergeTags(chap3.comorbidityTags, extractNodeTags(chap3.nodes, 'unlockComorbidity')),
      studySummary: chap3.studySummary || null,
      nodes: chap3.nodes
    },

    // ==================== PHASE IV：童年溯源、共病解析與命定結局 (E13 ~ E15) ====================
    {
      eventNumber: 13,
      code: 'E13',
      phase: 4,
      phaseName: 'Phase IV：童年溯源、共病解析與命定結局',
      locationId: locs[0],
      type: 'backstory',
      unlockBackstoryOnComplete: true,
      title: `${bespoke.e13.title}（👑 解鎖成長養成故事）`,
      ambience: '溫暖靜謐的暮光與舊日記憶的迴響',
      nodes: [
        {
          speaker: 'narrator',
          expression: 'vulnerable',
          text: bespoke.e13.prompt
        },
        {
          speaker: 'char',
          expression: 'vulnerable',
          text: bespoke.e13.charLine,
          choices: bespoke.e13.choices.map((c) => ({
            ...c,
            nextExpression: c.nextExpression || (c.stats?.security > 0 ? 'smile' : 'triggered')
          }))
        }
      ]
    },
    {
      eventNumber: 14,
      code: 'E14',
      phase: 4,
      phaseName: 'Phase IV：童年溯源、共病解析與命定結局',
      locationId: locs[1],
      type: 'story',
      title: bespoke.e14.title,
      ambience: '夕陽玫瑰金灑落的浪漫黃昏',
      nodes: makeCustomNodes(
        bespoke.e14.title,
        bespoke.e14.prompt,
        bespoke.e14.charLine,
        bespoke.e14.choices,
        null
      )
    },
    {
      eventNumber: 15,
      code: 'E15',
      phase: 4,
      phaseName: 'Phase IV：童年溯源、共病解析與命定結局',
      locationId: locs[0],
      type: 'ending',
      title: `E15｜命定結局：愛的邊緣最終章`,
      ambience: '命定羈絆的最終樂章',
      nodes: []
    }
  ];

  return applyDiagnosisReveal(charId, events);
}

// ==================== 完美攻略：每個抉擇的「最佳選項」分數（親密＋依戀安全感＋邊界）====================
// 以 E01～E14 每個抉擇節點中三項數值加總最高的選項為「最佳選項」，全部加總即該角色的完美分數
export function getChoiceScore(stats = {}) {
  return (stats.affection || 0) + (stats.security || 0) + (stats.boundary || 0);
}

export function getPerfectScoreTable(events = []) {
  const nodes = {};
  let maxTotal = 0;
  const maxAxis = { affection: 0, security: 0, boundary: 0 };
  events.forEach((ev) => {
    if (!ev || ev.eventNumber > 14 || !Array.isArray(ev.nodes)) return;
    ev.nodes.forEach((nd, idx) => {
      if (!Array.isArray(nd.choices) || nd.choices.length === 0) return;
      let bestIdx = 0;
      let best = -Infinity;
      nd.choices.forEach((ch, ci) => {
        const sc = getChoiceScore(ch.stats);
        if (sc > best) {
          best = sc;
          bestIdx = ci;
        }
      });
      nodes[`${ev.eventNumber}_${idx}`] = best;
      maxTotal += best;
      const bs = nd.choices[bestIdx].stats || {};
      maxAxis.affection += bs.affection || 0;
      maxAxis.security += bs.security || 0;
      maxAxis.boundary += bs.boundary || 0;
    });
  });
  return { nodes, maxTotal, maxAxis, nodeCount: Object.keys(nodes).length };
}

// 根據玩家在每個抉擇節點「最近一次」的選擇，計算完美度
export function getPerfectProgress(table, cs) {
  const picks = cs?.choiceScores || {};
  let total = 0;
  let perfectCount = 0;
  const axis = { affection: 0, security: 0, boundary: 0 };
  Object.entries(table.nodes).forEach(([key, max]) => {
    const p = picks[key];
    if (!p) return;
    const sc = getChoiceScore(p);
    total += sc;
    axis.affection += p.affection || 0;
    axis.security += p.security || 0;
    axis.boundary += p.boundary || 0;
    if (sc >= max) perfectCount += 1;
  });
  return {
    total,
    axis,
    perfectCount,
    maxTotal: table.maxTotal,
    maxAxis: table.maxAxis,
    nodeCount: table.nodeCount,
    isPerfect: table.nodeCount > 0 && perfectCount >= table.nodeCount
  };
}

// 取得角色 2 枚心靈成就：🥇 初步攻略（靈魂真名）＋ 👑 終極成就（完美攻略）
export function getCharacterAchievements(char, cs, isDiagnosed, perfect = null) {
  const revealNum = getDiagnosisRevealEvent(char.id);
  const revealCode = `E${String(revealNum).padStart(2, '0')}`;
  const perfectDesc = perfect
    ? `E01～E14 的 ${perfect.nodeCount} 個抉擇全部選到最佳選項（親密＋依戀＋邊界加總達滿分 ${perfect.maxTotal}；目前 ${perfect.total} 分、完美抉擇 ${perfect.perfectCount}/${perfect.nodeCount}）`
    : 'E01～E14 每個抉擇都選到最佳選項，親密＋依戀＋邊界加總達該角色滿分';

  return [
    {
      id: 'ach_diagnosis',
      icon: '🥇',
      title: '初步攻略・靈魂真名',
      desc: `完成 ${revealCode}，正式揭曉【${isDiagnosed ? char.dsmTitle : '？？？'}】並解鎖下一位可攻略房客`,
      unlocked: Boolean(isDiagnosed)
    },
    {
      id: 'ach_perfect',
      icon: '👑',
      title: '終極成就・完美攻略',
      desc: perfectDesc,
      unlocked: Boolean(cs?.perfectAchieved)
    }
  ];
}
