// 《愛的邊緣》(Edge of Love) — 12 位可攻略角色與 DSM-5-TR 臨床設定資料庫

export const LOCATIONS = [
  {
    id: 'rooftop',
    name: '公寓交誼廳',
    desc: '能俯瞰整座城市霓虹與夜空的角落，適合需要距離感與獨處的靈魂。',
    icon: '🌙',
    characters: ['shen_mo', 'lin_jianwei']
  },
  {
    id: 'atelier',
    name: '畫室',
    desc: '空氣中飄著松節油、線香與陶土氣息，色彩與情緒在此劇烈碰撞。',
    icon: '🎨',
    characters: ['ruri', 'su_fei', 'lu_qinglan']
  },
  {
    id: 'cafe',
    name: '咖啡廳',
    desc: '白日裡最溫暖的街角空間，午後陽光灑落木桌，卻也藏著說不出口的心事。',
    icon: '☕',
    characters: ['bai_xiaolu', 'you_ziqian']
  },
  {
    id: 'archive',
    name: '圖書修復研究室',
    desc: '時間在這裡被精確切割成秒針與編號，安靜得能聽見紙頁翻動與心跳。',
    icon: '📚',
    characters: ['wen_yan', 'ji_yan']
  },
  {
    id: 'lounge',
    name: '地下酒吧',
    desc: '夜晚才甦醒的聚光燈與搖晃酒杯，慾望、表演與危險的博弈場。',
    icon: '🍸',
    characters: ['han_xiao', 'xia_le']
  },
  {
    id: 'studio',
    name: '建築事務所',
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
    shortBio: '住在公寓頂樓加蓋的獨立調查記者。拉上三層遮光窗簾，門鎖裝了兩道電子警報。他聰明敏銳、觀察入微，卻深信所有不請自來的善意都是精心設計的陷阱。',
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
    minThreshold: 4,
    thresholdLabel: '最低法定門檻：4 / 7 項核心準則（E01～E08）',
    criteria: [
      {
        id: 'F60.0-A1',
        code: '準則 A1',
        stage: 'threshold',
        targetEvent: 'E01',
        title: '無根據懷疑他人剝削或欺騙',
        desc: '在沒有充分依據下，懷疑他人正在剝削、傷害或欺騙自己（視善意室友為「被房東安插的監視者」）。',
        behavioralAnchor: {
          eventCode: 'E01',
          eventTitle: '第一章：茶杯裡的指紋與錄音筆',
          quote: '「別再演這套心理學戲碼了……你會突然對我這麼好，是房東叫你來套我的話，對吧？」',
          behavior: '在無實據的情況下，將室友單純的好意直接推論為系統性監視與背叛陷阱。'
        }
      },
      {
        id: 'F60.0-A2',
        code: '準則 A2',
        stage: 'threshold',
        targetEvent: 'E02 / E05',
        title: '對朋友與夥伴忠誠度的無理懷疑',
        desc: '被對朋友或同事之忠誠度與可信度的無理懷疑所盤據，反覆設定資訊一致性測試。',
        behavioralAnchor: {
          eventCode: 'E02',
          eventTitle: '夜間巡邏與忠誠度口徑測試',
          quote: '「你剛才跟蘇緋講了什麼？為什麼她的說法跟你在玄關跟我講的時間差了三分鐘？」',
          behavior: '透過交叉比對日常對話細節與時間差，反覆驗證室友是否暗中站在對立面。'
        }
      },
      {
        id: 'F60.0-A3',
        code: '準則 A3',
        stage: 'threshold',
        targetEvent: 'E03',
        title: '畏懼資訊被惡意利用而不願傾訴',
        desc: '因不當地害怕私密資訊會被用來對付自己，拒絕吐露心事與個人脆弱。',
        behavioralAnchor: {
          eventCode: 'E03',
          eventTitle: '加密鐵盒與拒絕傾訴',
          quote: '「這不關你的事。少知道一點底細，對我們兩個都比較安全。」',
          behavior: '將加密錄音筆鎖入鐵盒，刻意切斷任何涉及過往調查經歷與私事的對話。'
        }
      },
      {
        id: 'F60.0-A4',
        code: '準則 A4',
        stage: 'threshold',
        targetEvent: 'E06 / E08',
        title: '從善意言語或事件解讀出威脅',
        desc: '從他人善意的評論或中性事件中，解讀出隱藏的貶低、試探或威脅意涵。',
        behavioralAnchor: {
          eventCode: 'E06',
          eventTitle: '停電備用鑰匙的善意誤讀',
          quote: '「你把備用鑰匙留給我，是為了等我出錯時有理由搜查我的房間嗎？」',
          behavior: '把緊急停電時對方主動分享備用鑰匙與暖茶的舉動，解讀為預謀入侵的釣魚手段。'
        }
      },
      {
        id: 'F60.0-A5',
        code: '準則 A5',
        stage: 'advanced',
        targetEvent: 'E10',
        title: '持續懷恨與不原諒輕視',
        desc: '持續懷恨在心——對過去感知到的侮辱、傷害或輕視長期不予原諒，將其永久寫入防備檔案。',
        behavioralAnchor: {
          eventCode: 'E10',
          eventTitle: '發黃報紙裡的舊背叛清單',
          quote: '「三年前他那句『你太敏感』我一輩子都不會忘，帳本上記著的每一筆都還沒結清。」',
          behavior: '即使事過境遷多年，仍將昔日搭檔一句無心的輕視牢記於心並視同敵對宣戰。'
        }
      },
      {
        id: 'F60.0-A6',
        code: '準則 A6',
        stage: 'advanced',
        targetEvent: 'E11',
        title: '感知名譽受攻擊並迅速憤怒反擊',
        desc: '認為自己的人格或名譽受到攻擊（他人未必察覺），並迅速以尖銳的憤怒或投射性指責反擊。',
        behavioralAnchor: {
          eventCode: 'E11',
          eventTitle: '媒體澄清稿與名譽防禦爆發',
          quote: '「你說我偏執？這就是你用來貼我標籤、毀掉我記者專業可信度的手段吧！」',
          behavior: '僅因討論報導用語的客觀建議，立刻感到專業尊嚴被貶低並以先發制人的怒火反咬。'
        }
      },
      {
        id: 'F60.0-A7',
        code: '準則 A7',
        stage: 'advanced',
        targetEvent: 'E12 / E14',
        title: '對親密伴侶忠貞的反覆無端懷疑',
        desc: '在缺乏正當理由下，對配偶或伴侶的忠貞抱持反覆猜疑，試圖檢查行蹤與通訊紀錄。',
        behavioralAnchor: {
          eventCode: 'E12',
          eventTitle: '第三章：天台門鎖與未讀訊息時間戳',
          quote: '「凌晨兩點十七分你的手機螢幕亮了，別告訴我那是系統更新——你在跟誰傳訊息？」',
          behavior: '在關係已建立後仍無法克制對親密伴侶忠誠度的反覆查核與訊問。'
        }
      }
    ],
    specifiers: [
      {
        id: 'F60.0-SPEC1',
        code: '臨床亞型 / 鑑別註記',
        targetEvent: 'E11 / E12',
        title: '高度警覺型與非荒謬意念（保留現實檢驗力）',
        desc: '猜疑內容雖過度推論但具生活脈絡可能性（非外星晶片或讀心等荒謬妄想），屬於人格層級之防衛性高警覺，藉此與妄想症及思覺失調症鑑別。',
        behavioralAnchor: {
          eventCode: 'E12',
          eventTitle: '可驗證事實下的理性退讓',
          quote: '「……我看見通話紀錄確實是你妹妹打來的。是我太神經質，把現實線索扭曲了。」',
          behavior: '面對明確且具安全感的客觀證據時，仍具備重新修正解讀的現實檢驗能力。'
        }
      }
    ],
    comorbidities: [
      {
        id: 'F60.0-COM1',
        code: '常見臨床共病',
        targetEvent: 'E13 / E14',
        title: 'PTSD 過度警覺症狀 ＆ 重鬱發作風險',
        desc: '曾遭遇系統性背叛或職業創傷後，常共病創傷後壓力症（PTSD）之睡眠剝奪、驚嚇反應及長期孤立下的次發性重鬱發作。',
        behavioralAnchor: {
          eventCode: 'E13',
          eventTitle: '失眠夜裡的錄音回放與耗竭',
          quote: '「連閉上眼睛都像在聽竊聽器的電流聲……我已經三個月沒有睡過一個完整的覺了。」',
          behavior: '呈現嚴重警覺過度、噩夢警醒以及深層信任崩解後的情感麻木與鬱卒耗竭。'
        }
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
    minThreshold: 4,
    thresholdLabel: '最低法定門檻：4 / 7 項核心準則（E01～E08）',
    criteria: [
      {
        id: 'F60.1-A1',
        code: '準則 A1',
        stage: 'threshold',
        targetEvent: 'E01 / E04',
        title: '既不渴望也不享受親密關係',
        desc: '對建立親密情感或家庭連結缺乏內在需求與愉悅感，寧可維持安靜的平行空間。',
        behavioralAnchor: {
          eventCode: 'E01',
          eventTitle: '第一章：赤道儀的平行距離',
          quote: '「你不用特地找話題。人類之間並不是靠交換心事才能共存的。」',
          behavior: '溫和但明確地婉拒情感深談與親密邀約，並非因為緊張，而是真切不感興趣。'
        }
      },
      {
        id: 'F60.1-A2',
        code: '準則 A2',
        stage: 'threshold',
        targetEvent: 'E02 / E03',
        title: '幾乎總是選擇獨自進行的活動',
        desc: '主動且一貫地挑選無需人際協作的活動（如凌晨觀星、獨自修復機械鐘錶）。',
        behavioralAnchor: {
          eventCode: 'E02',
          eventTitle: '古董懷錶的零點五秒誤差',
          quote: '「比起團體聚餐，我更喜歡凌晨兩點一個人對著齒輪和星圖校準時間。」',
          behavior: '幾乎所有休閒與專業時刻都優先安排單獨作業，對集體娛樂毫無動力。'
        }
      },
      {
        id: 'F60.1-A6',
        code: '準則 A6',
        stage: 'threshold',
        targetEvent: 'E06',
        title: '對他人的讚美或批評顯得漠不關心',
        desc: '不論他人熱烈稱讚或尖銳批評，內心與外顯反應都維持平靜無波。',
        behavioralAnchor: {
          eventCode: 'E06',
          eventTitle: '天台星圖評鑑後的平靜反應',
          quote: '「他說我冷血、你說我是天才——這兩種形容詞對星體的軌跡都不會造成影響。」',
          behavior: '面對誇獎不見欣喜、遭遇批判亦無羞憤防衛，社會評價對其毫無獎懲效應。'
        }
      },
      {
        id: 'F60.1-A7',
        code: '準則 A7',
        stage: 'threshold',
        targetEvent: 'E05 / E08',
        title: '情緒冷淡、疏離或情感表達平淡',
        desc: '面部表情與語氣起伏極少，極罕回應微笑或熱絡的社交暗示。',
        behavioralAnchor: {
          eventCode: 'E08',
          eventTitle: '天台停電狂風中的零振幅語調',
          quote: '「備用電源在左櫃。風速每秒十八公尺，我先把赤道儀蓋上。」',
          behavior: '在危機現場仍維持平板冷靜的表情與陳述語調，幾近無情感張力波動。'
        }
      },
      {
        id: 'F60.1-A3',
        code: '準則 A3',
        stage: 'advanced',
        targetEvent: 'E10',
        title: '對與他人發生性經驗幾乎沒有興趣',
        desc: '對肉體親密、性吸引力或情慾互動極度低需求或毫無渴望（非出於壓抑或恐懼）。',
        behavioralAnchor: {
          eventCode: 'E10',
          eventTitle: '體溫與物理邊界的坦誠對話',
          quote: '「對我來說，肌膚相觸的感覺跟碰觸木桌沒有太大差別……你會覺得這很奇怪嗎？」',
          behavior: '冷靜且無羞恥感地描述自身對性接觸缺乏感官驅力的本質狀態。'
        }
      },
      {
        id: 'F60.1-A4',
        code: '準則 A4',
        stage: 'advanced',
        targetEvent: 'E11 / E12',
        title: '對很少活動感到愉悅（低享樂能力）',
        desc: '對大多數娛樂、美食、慶祝或感官刺激幾乎無法經驗到快樂或興奮感。',
        behavioralAnchor: {
          eventCode: 'E11',
          eventTitle: '無味甜點與感官低喚起測試',
          quote: '「草莓甜、黑咖啡苦，我能辨認味道，但大腦裡好像沒有『開心』那個開關。」',
          behavior: '對感官享受與節慶氛圍呈現生理性的快感缺乏（Anhedonia）。'
        }
      },
      {
        id: 'F60.1-A5',
        code: '準則 A5',
        stage: 'advanced',
        targetEvent: 'E12 / E13',
        title: '除了一等親外缺乏親近朋友或知己',
        desc: '生命歷程中長期沒有知心好友，亦無維繫深交朋友圈的習慣。',
        behavioralAnchor: {
          eventCode: 'E12',
          eventTitle: '第三章：空白的緊急聯絡人欄位',
          quote: '「手機通訊錄裡除了房東與天文館值班表，十幾年來一直都只有這些號碼。」',
          behavior: '檢視其長期生活史時，證實除必要血親與公務聯繫外幾乎零知交。'
        }
      }
    ],
    specifiers: [
      {
        id: 'F60.1-SPEC1',
        code: '臨床亞型 / 鑑別註記',
        targetEvent: 'E09 / E14',
        title: '純粹低社交驅力型（與畏避型／ASD 鑑別）',
        desc: '具備完整心理理論（ToM）與社交理解力，非因怕被拒絕（畏避型）或讀不懂暗示（自閉症類群）而退縮，而是本能偏向「平行共存（Parallel Play）」。',
        behavioralAnchor: {
          eventCode: 'E09',
          eventTitle: '圖書館暴雨夜的雙重對照',
          quote: '「我看得懂他在害怕被討厭；我只是單純覺得，安靜地各自存在比較省力。」',
          behavior: '能準確讀出他人情緒需求，卻誠實區辨自己沒有加入社交的情感驅力。'
        }
      }
    ],
    comorbidities: [
      {
        id: 'F60.1-COM1',
        code: '常見臨床共病',
        targetEvent: 'E13 / E14',
        title: '持續性憂鬱症（PDD）與存在孤寂感風險',
        desc: '雖然習慣孤處，當長期完全無人理解或被強迫社交時，可能伴隨低動力的持續性憂鬱（輕鬱）或對人際格格不入的沉悶負荷。',
        behavioralAnchor: {
          eventCode: 'E13',
          eventTitle: '機械停擺夜裡的精神疲憊',
          quote: '「世界一直要我表現出他們期待的熱情，假裝回應比觀測整夜的流星雨更累人。」',
          behavior: '展現因應社會期待偽裝情緒後的深層消耗與低落期（非渴望熱鬧，而是需要休止）。'
        }
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
    minThreshold: 5,
    thresholdLabel: '最低法定門檻：5 / 9 項核心準則（E01～E08）',
    criteria: [
      {
        id: 'F21-A1',
        code: '準則 A1',
        stage: 'threshold',
        targetEvent: 'E01',
        title: '關係觀念（非關係妄想）',
        desc: '覺得無關的外在事件或巧合與自己具有特殊預兆關聯（如門牌號、路燈閃爍頻率）。',
        behavioralAnchor: {
          eventCode: 'E01',
          eventTitle: '第一章：307 號房的星軌共振',
          quote: '「街燈剛好在七秒的時候閃了兩下，代表你的頻率跟這棟樓的第三脈輪對上了。」',
          behavior: '將隨機環境巧合賦予針對自我的特殊宇宙象徵意義，但未堅固成荒謬迫害妄想。'
        }
      },
      {
        id: 'F21-A2',
        code: '準則 A2',
        stage: 'threshold',
        targetEvent: 'E02 / E03',
        title: '影響行為的古怪信念與魔幻思考',
        desc: '深信超越文化常規的超自然因果、心電感應、塔羅或鹽陣結界並據此行動。',
        behavioralAnchor: {
          eventCode: 'E02',
          eventTitle: '門檻鹽陣與乙太絲線測試',
          quote: '「跨門檻前要先踩兩下鹽線，不然昨晚的負面乙太會沿著鞋底爬上你的袖口。」',
          behavior: '日常作息與防禦完全受個人化的神秘儀式與魔幻因果規則所引導。'
        }
      },
      {
        id: 'F21-A3',
        code: '準則 A3',
        stage: 'threshold',
        targetEvent: 'E06 / E07',
        title: '不尋常的知覺經驗與身體錯覺',
        desc: '經驗到微弱低語、空間能量波紋或指尖電流感等身體知覺錯覺（未達明顯幻覺）。',
        behavioralAnchor: {
          eventCode: 'E06',
          eventTitle: '指尖微電流與牆縫低語',
          quote: '「你有聽見牆壁水管裡那種類似紫羅蘭色的嗡嗡聲嗎？每次下雨它就會順著手指爬上來。」',
          behavior: '生動描述非實體刺激的知覺異常與共感體覺錯覺。'
        }
      },
      {
        id: 'F21-A7',
        code: '準則 A7',
        stage: 'threshold',
        targetEvent: 'E04 / E01',
        title: '行為或外表古怪、奇特與特異',
        desc: '穿著混搭、飾品符號與談吐儀態奇特出格，顯著偏離主流社交習慣。',
        behavioralAnchor: {
          eventCode: 'E04',
          eventTitle: '畫室暗角中的星空徽章與銅鈴儀式',
          quote: '「左腳穿紫襪、右袖別著黃銅星盤，這樣才不會在午茶時間被別人的視線偷走影子。」',
          behavior: '在公寓公共場合仍維持不對稱奇裝與獨特物理防護動作。'
        }
      },
      {
        id: 'F21-A9',
        code: '準則 A9',
        stage: 'threshold',
        targetEvent: 'E05 / E08',
        title: '不隨熟悉度減退之猜疑性社交焦慮',
        desc: '過度社交焦慮不因熟識而緩解，且根植於對他人動機的類妄想猜疑，而非負面自我評價。',
        behavioralAnchor: {
          eventCode: 'E08',
          eventTitle: '暴雨通訊中斷夜的能量防衛崩潰',
          quote: '「即使認識了這麼多天，當燈一暗，我還是覺得你身上戴著會吸乾我信號的干擾器！」',
          behavior: '相處日久仍未見社交放鬆，壓力下反因懷疑外界惡意干擾而劇烈退縮。'
        }
      },
      {
        id: 'F21-A4',
        code: '準則 A4',
        stage: 'advanced',
        targetEvent: 'E10 / E12',
        title: '古怪思考與隱喻離題言談',
        desc: '說話充滿過於抽象的星象隱喻、含糊跳躍或迂迴修辭，使聽者難以直接掌握重點。',
        behavioralAnchor: {
          eventCode: 'E10',
          eventTitle: '過度精細的暗號信札',
          quote: '「昨天那片雲像極了倒置的水銀天平，所以我才把晚餐的勺子轉向西南方。」',
          behavior: '對簡單生活事件採用高度跳躍與私人符號化的言語組織方式。'
        }
      },
      {
        id: 'F21-A5',
        code: '準則 A5',
        stage: 'advanced',
        targetEvent: 'E11',
        title: '猜疑或類妄想的想法',
        desc: '壓力升高時出現被追蹤、訊號被竊取或他人心懷祕密議程的類妄想念頭。',
        behavioralAnchor: {
          eventCode: 'E11',
          eventTitle: '地下室舊檔案盒裡的陰謀假設',
          quote: '「管理員把信箱鎖換成銀色，是不是因為我們這個樓層被劃進了觀測實驗區？」',
          behavior: '在未知事件刺激下浮現強烈類妄想推論，但被接納時願意退後審視。'
        }
      },
      {
        id: 'F21-A6',
        code: '準則 A6',
        stage: 'advanced',
        targetEvent: 'E12 / E13',
        title: '情感不適切或表現受限',
        desc: '情緒表達與談話氣氛不協調（如敘述恐懼或失落時露出空洞或奇異的微笑）。',
        behavioralAnchor: {
          eventCode: 'E12',
          eventTitle: '第三章：面對真實孤寂時的抽離微笑',
          quote: '「小時候沒有人坐在我旁邊吃飯……（唇角卻忽然輕輕上揚，眼神失焦）因為星星比較安靜呀。」',
          behavior: '表層表情與內在創傷敘事顯現明顯解離式落差，呈現情感不適切。'
        }
      },
      {
        id: 'F21-A8',
        code: '準則 A8',
        stage: 'advanced',
        targetEvent: 'E14',
        title: '除一等親外缺乏親密朋友或知己',
        desc: '因言行古怪與猜疑退縮，長期以來除了親屬外極少建立同儕友誼。',
        behavioralAnchor: {
          eventCode: 'E14',
          eventTitle: '破曉前的獨白：沒有回音的通訊錄',
          quote: '「以前學校裡的同學總叫我神棍，最後整個青春期只有陽台上的風鈴會回答我。」',
          behavior: '親口證實長期社會孤立史與同儕關係匱乏的背景脈絡。'
        }
      }
    ],
    specifiers: [
      {
        id: 'F21-SPEC1',
        code: '臨床亞型 / 鑑別註記',
        targetEvent: 'E12 / E13',
        title: '未達精神病性門檻之雙重帳本（與思覺失調症鑑別）',
        desc: '雖有顯著奇特信念與知覺錯覺，但不存在持續性幻覺與僵固妄想；透過「魔幻符號＝安全感隱喻」可進行現實核對與部分轉化。',
        behavioralAnchor: {
          eventCode: 'E12',
          eventTitle: '隱喻翻譯後的現實接軌',
          quote: '「我其實知道那不是外星電波……只是每當心裡太怕被傷害，『結界』這個詞比較好懂。」',
          behavior: '當防衛鬆動後能區辨象徵隱喻與物理現實，確證其屬人格障礙而非精神病症。'
        }
      }
    ],
    comorbidities: [
      {
        id: 'F21-COM1',
        code: '常見臨床共病',
        targetEvent: 'E11 / E14',
        title: '壓力誘發短暫精神病性插曲風險 ＆ 重鬱症／GAD',
        desc: '面對極端感官過載或人際背叛時，認知解構加劇可能觸發短暫精神病性反應，且常伴隨長期孤立衍生的憂鬱情緒與廣泛性焦慮。',
        behavioralAnchor: {
          eventCode: 'E11',
          eventTitle: '感官過載夜的暫時性解構邊緣',
          quote: '「所有的顏色和人聲都在牆上融化了……如果再沒人握住我的手，我怕我會掉出這個世界。」',
          behavior: '在高度孤立與壓力下出現現實邊界模糊與重度焦慮憂鬱混雜之臨床表徵。'
        }
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
    occupation: '地下酒吧調酒師／重機賽車手',
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
    minThreshold: 4,
    thresholdLabel: '最低法定門檻：3 / 7 項成人準則 ＋ 15 歲前品行障礙史（E01～E08）',
    criteria: [
      {
        id: 'F60.2-A2',
        code: '準則 A2',
        stage: 'threshold',
        targetEvent: 'E01 / E02',
        title: '欺騙與工具性操弄（反覆說謊／設局）',
        desc: '反覆說謊、使用假話術或為個人利益或樂趣而操弄欺騙他人，視真誠為可利用的弱點。',
        behavioralAnchor: {
          eventCode: 'E01',
          eventTitle: '第一章：威士忌冰球裡的合約背面',
          quote: '「合約背面那行小字？哈哈，簽名之前沒看清楚的傢伙，本來就該為自己的天真買單吧。」',
          behavior: '熟練運用模糊條款、吹牛話術與資訊不對等來測試並套利他人。'
        }
      },
      {
        id: 'F60.2-A3',
        code: '準則 A3',
        stage: 'threshold',
        targetEvent: 'E03 / E06',
        title: '衝動性與無法事先計畫',
        desc: '對無聊容忍度極低，行事不計長期後果，憑一時興起大幅改動計畫或做出高賭注行動。',
        behavioralAnchor: {
          eventCode: 'E06',
          eventTitle: '午夜十二點的臨時起意',
          quote: '「計畫表？現在引擎已經發動了，明天早上會不會出事，明天再說。」',
          behavior: '厭惡可預測的平靜生活，在沒有安全評估下說走就走以換取多巴胺刺激。'
        }
      },
      {
        id: 'F60.2-A5',
        code: '準則 A5',
        stage: 'threshold',
        targetEvent: 'E04 / E05',
        title: '魯莽漠視自己或他人的安全',
        desc: '故意忽略物理風險或法律安全紅線（如磨損煞車下山道飆車、暴力試探），從失控邊緣獲取快感。',
        behavioralAnchor: {
          eventCode: 'E05',
          eventTitle: '第二章：時速兩百公里的無聊深淵',
          quote: '「怕了嗎？只有在輪胎快抓不住地面的那零點一秒，心臟才算真正跳過。」',
          behavior: '明知重機煞車耗損仍高速壓彎，將他人與自身置於生命危險中而不以為意。'
        }
      },
      {
        id: 'F60.2-CD',
        code: '必要前置（15 歲前 CD 史）',
        stage: 'threshold',
        targetEvent: 'E07 / E08',
        title: '15 歲前品行障礙症（Conduct Disorder）發病證據',
        desc: 'DSM-5-TR 法定強制要件：必須追溯至 15 歲前已出現逃學、縱火、竊盜、霸凌打架或嚴重破壞規範之病史。',
        behavioralAnchor: {
          eventCode: 'E07',
          eventTitle: '舊檔案裡的少年管訓與廢棄倉庫火光',
          quote: '「十四歲那年被退學進少輔院之前，我就懂一個道理——規則是寫給綿羊看的，火柴才講道理。」',
          behavior: '主動或受迫揭露 15 歲前逃學、暴力衝突與縱火破壊規範的少年品行障礙紀實。'
        }
      },
      {
        id: 'F60.2-A7',
        code: '準則 A7',
        stage: 'advanced',
        targetEvent: 'E10 / E12',
        title: '缺乏悔意與合理化傷害',
        desc: '對傷害、欺騙或剝削他人表現出麻木冷酷，常以「輸家活該」或「現實規則本如此」開脫。',
        behavioralAnchor: {
          eventCode: 'E10',
          eventTitle: '欠債合夥人登門對質現場',
          quote: '「我又沒拿刀逼他簽本票，願賭服輸而已。他哭給誰看？弱者才需要罪惡感這種東西。」',
          behavior: '親眼目睹受害者崩潰卻毫無內疚，把人際剝削冷酷合理化為達爾文式優勝劣敗。'
        }
      },
      {
        id: 'F60.2-A4',
        code: '準則 A4',
        stage: 'advanced',
        targetEvent: 'E09 / E11',
        title: '易怒與攻擊性衝動',
        desc: '利益受阻或遭挑釁時，快速切換為冷血威懾或肢體衝突攻擊性，對秩序權威展現低耐受。',
        behavioralAnchor: {
          eventCode: 'E11',
          eventTitle: '地下拳館與挑釁失控瞬間',
          quote: '「再多說一個字試試看？我有十種方法讓你在警車趕到前先躺著數天花板。」',
          behavior: '當控制感受到威脅時，褪去微笑面具並迅速訴諸威嚇與攻擊姿態。'
        }
      },
      {
        id: 'F60.2-A1',
        code: '準則 A1',
        stage: 'advanced',
        targetEvent: 'E13',
        title: '不遵守社會規範與法律紅線',
        desc: '反覆游走灰色地下金融、非法賭局與足以遭逮捕或制裁的違規邊緣而不當一回事。',
        behavioralAnchor: {
          eventCode: 'E13',
          eventTitle: '深夜暗帳與地下牌局清點',
          quote: '「稅法跟合規條文只是成本計算的參數，抓不到我的時候，那就不算犯法。」',
          behavior: '把違法邊緣行為常態化為日常營運策略，對法治邊界毫無敬畏。'
        }
      },
      {
        id: 'F60.2-A6',
        code: '準則 A6',
        stage: 'advanced',
        targetEvent: 'E14',
        title: '一貫地不負責任（財務／職責跳票）',
        desc: '長期無法維持單一正職承諾或按期履行穩定社會義務，對他人依賴視為束縛。',
        behavioralAnchor: {
          eventCode: 'E14',
          eventTitle: '破曉吧台上的最後誠實告白',
          quote: '「連房租跟合夥合約我都隨時準備抽身落跑——因為一旦留下承諾，就等於交出把柄。」',
          behavior: '坦承歷史上反覆棄職、跳票與在責任收網前瞬間人間蒸發的行為慣性。'
        }
      }
    ],
    specifiers: [
      {
        id: 'F60.2-SPEC1',
        code: '臨床亞型 / 鑑別註記',
        targetEvent: 'E10 / E12',
        title: '高魅力冷血工具型（高認知同理 × 零情感共鳴）',
        desc: '具備敏銳的心理讀取與魅力操弄（Superficial Charm），卻缺乏感同身受的羞愧與內疚；需與 B 群自戀型（追求崇拜）及邊緣型（恐懼遺棄）明確鑑別。',
        behavioralAnchor: {
          eventCode: 'E12',
          eventTitle: '第三章：牌桌上的唯一底牌',
          quote: '「我當然知道你現在心率加快、手心出汗——讀懂你的害怕太容易了，難的是我為什麼要在乎？」',
          behavior: '能精準判讀對方情緒脆弱處卻維持情感零捲入，展現反社會核心認知特徵。'
        }
      }
    ],
    comorbidities: [
      {
        id: 'F60.2-COM1',
        code: '常見臨床共病',
        targetEvent: 'E11 / E13',
        title: '物質使用障礙症（酒精／尼古丁）＆ 賭博障礙',
        desc: '反社會型人格障礙症患者高度共病酒精與物質濫用（追求高喚起刺激與麻痺無聊），以及高風險賭博行為障礙。',
        behavioralAnchor: {
          eventCode: 'E13',
          eventTitle: '空酒瓶與失控賭注的凌晨四點',
          quote: '「不灌半瓶波本、不把籌碼全推上紅黑盤，這漫長無聊的夜晚要怎麼熬過去？」',
          behavior: '顯現以酒精依賴與賭博成癮來對抗長期慢性空虛與尋求感官刺激的共病型態。'
        }
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
    minThreshold: 5,
    thresholdLabel: '最低法定門檻：5 / 9 項核心準則（E01～E08）',
    criteria: [
      {
        id: 'F60.3-A1',
        code: '準則 A1',
        stage: 'threshold',
        targetEvent: 'E01 / E04',
        title: '瘋狂努力避免真實或想像的被遺棄',
        desc: '對分離、延遲或微小距離極度警覺，僅遲回幾分鐘訊息便引發瀕死般的遺棄恐慌與奪命追問。',
        behavioralAnchor: {
          eventCode: 'E01',
          eventTitle: '第一章：神明與惡魔的十二分鐘鐘擺',
          quote: '「十二分鐘沒回訊……你是不是已經厭煩我、想好要怎麼把我丟在這個畫室了？求你告訴我！」',
          behavior: '因室友手機遲回十二分鐘即認定關係將被毀滅性拋棄，急切抓住對方尋求保證。'
        }
      },
      {
        id: 'F60.3-A2',
        code: '準則 A2',
        stage: 'threshold',
        targetEvent: 'E02 / E05',
        title: '人際理想化與極端貶低擺盪（Splitting）',
        desc: '人際認知呈現「全好神明」或「全壞惡魔」二元分裂，一旦期待落空便瞬間從深愛翻轉為惡毒詛咒。',
        behavioralAnchor: {
          eventCode: 'E05',
          eventTitle: '第二章：從拯救者墜為冷血背叛者',
          quote: '「早上我還覺得你是唯一能救我的人，現在我看透了——你跟那些拋棄我的人一樣噁心！」',
          behavior: '在極短時間內對同一對象經歷截然極端的人格評價劇變（Splitting）。'
        }
      },
      {
        id: 'F60.3-A6',
        code: '準則 A6',
        stage: 'threshold',
        targetEvent: 'E03 / E06',
        title: '心情反應性所致之情感不穩定',
        desc: '情緒對人際微細線索極端敏感，可在數小時內由欣喜若狂急墜至深度絕望、暴怒與焦慮崩潰。',
        behavioralAnchor: {
          eventCode: 'E03',
          eventTitle: '布偶兔鈕扣鬆脫後的情緒海嘯',
          quote: '「五分鐘前我還想畫下我們的第一幅畫，現在只是一句話不對，我心口就像被炸開一樣痛！」',
          behavior: '微小的情境挫折觸發劇烈、短促但海嘯級別的情感反轉波動。'
        }
      },
      {
        id: 'F60.3-A7',
        code: '準則 A7',
        stage: 'threshold',
        targetEvent: 'E06 / E07',
        title: '長期的空虛感',
        desc: '內心長期存在無法被填滿的黑洞感，常試圖透過強烈痛覺、高濃度顏料或緊抱安撫物對抗虛無。',
        behavioralAnchor: {
          eventCode: 'E07',
          eventTitle: '深夜調色盤與吞噬感黑洞',
          quote: '「安靜下來的時候，我覺得胸口裡面什麼都沒有……只有一片刮風的黑洞，快把我吸進去了。」',
          behavior: '鮮明陳述獨立於外在事件之外、慢性盤據內在的深層存在性空虛感。'
        }
      },
      {
        id: 'F60.3-A8',
        code: '準則 A8',
        stage: 'threshold',
        targetEvent: 'E08',
        title: '不適切、強烈的憤怒或難以控制怒氣',
        desc: '感知被忽視時爆發遠超比例的尖銳怒火與毀物衝動，事後又陷入極度的自我厭惡與恐慌。',
        behavioralAnchor: {
          eventCode: 'E08',
          eventTitle: '地震停電夜的畫具崩塌與失控暴怒',
          quote: '「你為什麼先去敲別人的門？！我把這幅畫撕掉算了——你反正本來就不想要我！」',
          behavior: '在災難優先序的刺激下爆發強烈憤怒並砸毀畫架，緊接著為自己的失控劇烈羞愧。'
        }
      },
      {
        id: 'F60.3-A3',
        code: '準則 A3',
        stage: 'advanced',
        targetEvent: 'E10',
        title: '認同障礙（自我形象顯著持續不穩定）',
        desc: '缺乏連貫的核心自我感，時而覺得自己是天才神祇、時而確信自己是「只配被丟掉的垃圾」。',
        behavioralAnchor: {
          eventCode: 'E10',
          eventTitle: '鏡像碎裂前的身分迷航',
          quote: '「沒人看著我的時候，我連自己叫蘇緋還是只是個空殼都分不清楚……我到底是什麼人？」',
          behavior: '自我價值與自我定義劇烈依附他人目光，缺乏穩固的內在核心認同。'
        }
      },
      {
        id: 'F60.3-A4',
        code: '準則 A4',
        stage: 'advanced',
        targetEvent: 'E11',
        title: '兩個以上潛在自我傷害領域的衝動性',
        desc: '承受情緒壓力時透過報復性消費畫材、通宵不眠不食或危險衝動來快速轉移內在痛楚。',
        behavioralAnchor: {
          eventCode: 'E11',
          eventTitle: '刷爆卡的顏料堆與危險夜行',
          quote: '「反正帳單付不出來也沒差！不趁現在把整個畫廊買下來、去頂樓吹冷風，我會窒息！」',
          behavior: '呈現財務揮霍與自我耗損性不計後果的跨領域衝動發作。'
        }
      },
      {
        id: 'F60.3-A5',
        code: '準則 A5',
        stage: 'advanced',
        targetEvent: 'E12 / E13',
        title: '反覆自殺姿態、威脅或自殘衝動',
        desc: '在瀕臨失落與被拋棄絕望中，將自殘傷痛或極端試探當成「喚回關注或止痛」的絕望訊號（教學安全呈現）。',
        behavioralAnchor: {
          eventCode: 'E12',
          eventTitle: '第三章：松節油與成功前夕的自我毀滅試探',
          quote: '「如果我把手劃傷，你是不是就會永遠記住我、不敢轉身離開這扇門？」',
          behavior: '在關係即將穩定美好時因害怕最終仍會失去，浮現自傷試探衝動（臨床須安全介入與界線保護）。'
        }
      },
      {
        id: 'F60.3-A9',
        code: '準則 A9',
        stage: 'advanced',
        targetEvent: 'E13 / E14',
        title: '短暫壓力相關類妄想想法或嚴重解離',
        desc: '處於極高遺棄威脅或創傷觸發下，出現時間空白感、體外漂浮感等嚴重解離症狀或短暫被背叛懷疑。',
        behavioralAnchor: {
          eventCode: 'E13',
          eventTitle: '畫室白牆前的十五分鐘解離空白',
          quote: '「我看見顏料灑了一地，可我感覺手腳都不是我自己的……像隔著毛玻璃看另外一個人在哭。」',
          behavior: '高壓衝突後啟動解離（Depersonalization/Derealization）以隔絕無法承受的情感劇痛。'
        }
      }
    ],
    specifiers: [
      {
        id: 'F60.3-SPEC1',
        code: '臨床亞型 / 動力特徵',
        targetEvent: 'E12 / E14',
        title: '成功前夕自我破壞（Self-sabotage）＆ 過渡客體依附',
        desc: '潛意識深信「既然好東西終將被奪走，不如親手毀掉比較不痛」；並透過舊布偶兔等過渡性客體維持最低安全錨點，須與依賴型之順從討好鑑別。',
        behavioralAnchor: {
          eventCode: 'E12',
          eventTitle: '幸福確定前故意潑灑松節油',
          quote: '「畫展快成功、你也說不會走了——可我好害怕下一秒醒來什麼都沒了，不如現在先毀掉！」',
          behavior: '於正準備收穫穩定關係之際啟動先發制人的毀滅測試與抱緊布偶兔安撫行為。'
        }
      }
    ],
    comorbidities: [
      {
        id: 'F60.3-COM1',
        code: '常見臨床共病',
        targetEvent: 'E10 / E13',
        title: '複雜性創傷後壓力症（C-PTSD）＆ 雙相 II 型臨床鑑別',
        desc: '早年反覆關係創傷與照顧者不一致常導致 C-PTSD 共病（情緒調節障礙、負面自我概念、關係困難）；另須鑑別 BPD 數小時人際觸發波折 vs 雙相障礙症數日自發性發作。',
        behavioralAnchor: {
          eventCode: 'E10',
          eventTitle: '童年被關暗房的回憶閃回',
          quote: '「不是突然躁起來……只要門鎖咔噠一響，我腦袋裡就只剩下八歲那年等不到爸媽回來的黑夜。」',
          behavior: '揭露人際觸發型劇變背後的長期童年遺棄創傷結構，明確區辨 BPD/C-PTSD 與純雙相情感疾患。'
        }
      }
    ]
  },
  {
    id: 'xia_le',
    number: '06',
    name: '夏樂',
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
    minThreshold: 5,
    thresholdLabel: '最低法定門檻：5 / 8 項核心準則（E01～E08）',
    criteria: [
      {
        id: 'F60.4-A1',
        code: '準則 A1',
        stage: 'threshold',
        targetEvent: 'E01 / E04',
        title: '非注意力焦點時感到明顯不自在',
        desc: '一旦他人注意力移開自己（即使僅數分鐘），便感到被忽視的失溫與焦躁，急切製造事件重奪舞台。',
        behavioralAnchor: {
          eventCode: 'E01',
          eventTitle: '第一章：聚光燈轉移後的三分鐘失溫',
          quote: '「剛才服務生怎麼都在看隔壁桌的甜點啊？算了，你看我新畫的眼妝是不是比較特別？」',
          behavior: '目光焦點一轉移即坐立難安，迅速透過話題轉移或動作誇張拉回全場注視。'
        }
      },
      {
        id: 'F60.4-A4',
        code: '準則 A4',
        stage: 'threshold',
        targetEvent: 'E02',
        title: '持續使用外表與打扮吸引注意',
        desc: '花費龐大心力以驚豔裝扮、妝容與吸睛單品來換取他人的注視與讚歎，以此確認自身存在價值。',
        behavioralAnchor: {
          eventCode: 'E02',
          eventTitle: '卸妝前必拍的三百張精修與造型',
          quote: '「如果不穿得像隨時要走紅毯一樣出門，大家走在街上還會看我第二眼嗎？」',
          behavior: '高度投資外貌作為維繫人際連結與情緒穩定的核心媒介。'
        }
      },
      {
        id: 'F60.4-A2',
        code: '準則 A2',
        stage: 'threshold',
        targetEvent: 'E03 / E05',
        title: '不適切的性誘惑或挑逗互動行為',
        desc: '在不分關係親疏與場合適當性的狀況下，習慣使用親密曖昧肢體接觸或挑逗言詞測試吸引力。',
        behavioralAnchor: {
          eventCode: 'E05',
          eventTitle: '排練場邊的貼耳低語與曖昧試探',
          quote: '「幹嘛退後呀？你心跳這麼快，是不是其實也對我有特別的感覺呀～？」',
          behavior: '在普通共事或剛建立交流時迅速跨入帶有挑逗色彩的肢體與言語靠近。'
        }
      },
      {
        id: 'F60.4-A5',
        code: '準則 A5',
        stage: 'threshold',
        targetEvent: 'E06 / E07',
        title: '言談過度印象化且缺乏具體細節',
        desc: '詞藻華麗誇張、充滿情緒形容詞，卻在被問及具體時間、事件或事實細節時顯得含糊空洞。',
        behavioralAnchor: {
          eventCode: 'E06',
          eventTitle: '不准用形容詞的午餐挑戰',
          quote: '「那個導演簡直神級夢幻、美到讓人窒息……呃？你問他到底導過哪一齣戲？就是很有感覺啊！」',
          behavior: '剝去浮誇修辭後無法具體舉證實質內容，語言風格高度印象派。'
        }
      },
      {
        id: 'F60.4-A6',
        code: '準則 A6',
        stage: 'threshold',
        targetEvent: 'E08',
        title: '自我戲劇化、舞台化與誇大情緒表達',
        desc: '將日常挫折演繹為生死戲碼般的誇張演出，情緒張力宛如在無形觀眾面前登台飆戲。',
        behavioralAnchor: {
          eventCode: 'E08',
          eventTitle: '台風停電夜的舞台聚光失序崩潰',
          quote: '「燈全滅了就沒人看得見我了——我感覺自己就像被扔進地下室的過氣道具！」',
          behavior: '面對黑暗停電環境，將尋常不便演繹成被世界拋棄的戲劇化悲劇場面。'
        }
      },
      {
        id: 'F60.4-A3',
        code: '準則 A3',
        stage: 'advanced',
        targetEvent: 'E10 / E12',
        title: '情緒表達快速變換且顯得膚淺',
        desc: '激烈落淚與破涕為笑之間切換迅速，外在戲劇強度遠大於持續的深層情感體驗。',
        behavioralAnchor: {
          eventCode: 'E10',
          eventTitle: '三秒鐘從啜泣切換為補妝鏡前微笑',
          quote: '「嗚……為什麼沒人理解我——啊等一下，剛那滴眼淚滑下來時燈光角度好像還滿好看的？」',
          behavior: '情緒高漲後極快跳脫至外在形象評估，顯現情緒轉換快且深度淺表的特質。'
        }
      },
      {
        id: 'F60.4-A7',
        code: '準則 A7',
        stage: 'advanced',
        targetEvent: 'E11 / E13',
        title: '易受暗示（極易被他人評論或氣氛左右）',
        desc: '立場與信念強烈隨當下最具魅力或最具權威之旁觀者的評論而迅速擺盪改向。',
        behavioralAnchor: {
          eventCode: 'E11',
          eventTitle: '新銳劇評家一句隨口點評引發的自我全盤推翻',
          quote: '「他昨天才隨口說我這場演得太舊，我就突然覺得自己過去三年演的戲全都是垃圾……」',
          behavior: '缺乏穩定內在參照基準，他人的片面意見足以瞬間改寫其自我與事物判斷。'
        }
      },
      {
        id: 'F60.4-A8',
        code: '準則 A8',
        stage: 'advanced',
        targetEvent: 'E14',
        title: '高估人際關係實際親密程度',
        desc: '將泛泛之交或初識沒多久的對象迅速冠以「摯友」、「靈魂伴侶」等過度親密標籤。',
        behavioralAnchor: {
          eventCode: 'E14',
          eventTitle: '素顏謝幕前對「永遠靈魂伴侶」的界線練習',
          quote: '「我們才喝過兩次咖啡，但我已經跟全劇組介紹你是我這輩子最默契的靈魂搭檔了！」',
          behavior: '以誇張親密稱謂取代真實循序漸進的信任累積與關係檢驗。'
        }
      }
    ],
    specifiers: [
      {
        id: 'F60.4-SPEC1',
        code: '臨床亞型 / 鑑別註記',
        targetEvent: 'E12 / E14',
        title: '舞台化補償尋求關注型（與自戀型 NPD 鑑別）',
        desc: '自戀型（NPD）渴望「優越崇拜」且羞於示弱；做作型（HPD）渴望「被看見與陪伴」而不惜透過示弱、可愛或戲劇性演出換取焦點。',
        behavioralAnchor: {
          eventCode: 'E12',
          eventTitle: '第三章：只有一位觀眾的素顏謝幕',
          quote: '「其實我根本不在乎誰是第一名……我只是很怕舞台燈關掉以後，連半個留著等我卸妝的人都沒有。」',
          behavior: '揭示誇張演出底層「寧可出糗也不要被遺忘」的依附空洞核心動機。'
        }
      }
    ],
    comorbidities: [
      {
        id: 'F60.4-COM1',
        code: '常見臨床共病',
        targetEvent: 'E10 / E13',
        title: '軀體症狀與功能性轉換傾向 ＆ 分離性憂鬱風險',
        desc: '做作型個案在關注威脅或失落時，高度共病將心理痛苦轉化為戲劇化身體不適（如突發頭暈、失聲等轉換反應）與焦點消退期之抑鬱發作。',
        behavioralAnchor: {
          eventCode: 'E13',
          eventTitle: '開演前突發失聲與卸妝後的空洞哭泣',
          quote: '「耳鼻喉科說聲帶完全沒發炎，可是一想到台下座位空了一半，我的喉嚨就真的發不出聲音了……」',
          behavior: '呈現無器質病變但受人際焦點壓力觸發的心因性軀體／轉換症狀表現。'
        }
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
    minThreshold: 5,
    thresholdLabel: '最低法定門檻：5 / 9 項核心準則（E01～E08）',
    criteria: [
      {
        id: 'F60.81-A1',
        code: '準則 A1',
        stage: 'threshold',
        targetEvent: 'E01',
        title: '誇大的自我重要感',
        desc: '高估自身成就與才華標準，深信唯有自己足以定義建築與審美的最高規準。',
        behavioralAnchor: {
          eventCode: 'E01',
          eventTitle: '第一章：頂層玻璃塔的鏡映與十五分鐘',
          quote: '「這座城市百分之九十九的建築師都只是畫牆的工匠，真正配得上評論我線條的人屈指可數。」',
          behavior: '開門見山確立俯視眾人的階序定位，對未經認可的同儕展現明顯貶抑。'
        }
      },
      {
        id: 'F60.81-A3',
        code: '準則 A3',
        stage: 'threshold',
        targetEvent: 'E02 / E04',
        title: '深信自身「特別」且只能被菁英理解',
        desc: '認定自己的思想境界高於凡俗，拒絕和被歸類為「平庸者」的人平等互動（鏡映選擇性）。',
        behavioralAnchor: {
          eventCode: 'E02',
          eventTitle: '對普通滷肉飯與俗套評論的菁英劃界',
          quote: '「你身上有少見的結構洞察力，我才破例多留給你十五分鐘——別讓我發現你跟他們一樣平庸。」',
          behavior: '僅因覺得對方夠特別（能鏡映自己的光芒）才准許靠近，否則立即關閉交流大門。'
        }
      },
      {
        id: 'F60.81-A4',
        code: '準則 A4',
        stage: 'threshold',
        targetEvent: 'E03 / E05',
        title: '需要過度的讚賞與完美鏡映',
        desc: '極度仰賴外界持續仰慕與專業肯定來維持膨脹自尊，微小的不讚賞即被視為侮辱或否定。',
        behavioralAnchor: {
          eventCode: 'E05',
          eventTitle: '第二章：皇冠裂開的羞恥夜與白手套',
          quote: '「如果這個案子連首席評審都看不出它有多無懈可擊……那我在這裡撐這麼多年算什麼？」',
          behavior: '在外部評價動搖瞬間，暴露膨脹外殼下依賴鏡映供給的脆弱自尊核心。'
        }
      },
      {
        id: 'F60.81-A7',
        code: '準則 A7',
        stage: 'threshold',
        targetEvent: 'E06 / E07',
        title: '缺乏情感同理心',
        desc: '雖能理性看穿別人的動機（認知同理），卻拒絕辨識或承接他人的痛苦（視軟弱為無能之錯）。',
        behavioralAnchor: {
          eventCode: 'E06',
          eventTitle: '設計圖修改與助理的眼淚',
          quote: '「眼淚能讓線條自己修正嗎？連這點壓力都扛不住的人，本來就不該坐在我的事務所裡。」',
          behavior: '面對下屬崩潰落淚，完全無法經驗情感共鳴，僅從績效與強弱角度冷酷評斷。'
        }
      },
      {
        id: 'F60.81-A9',
        code: '準則 A9',
        stage: 'threshold',
        targetEvent: 'E08',
        title: '傲慢、自大、輕蔑的行為態度',
        desc: '在威脅與壓力情境下以居高臨下的命令口吻、貶低他人與拒不妥協來掩護失控焦慮。',
        behavioralAnchor: {
          eventCode: 'E08',
          eventTitle: '強颱滲水檢修夜的高塔自尊保衛戰',
          quote: '「我的結構計算怎麼可能有誤？一定是這棟老舊公寓的施工團隊連基本規範都沒讀懂！」',
          behavior: '面臨作品瑕疵危機時拒絕承認任何責任，以傲慢輕蔑將失誤全盤外歸因。'
        }
      },
      {
        id: 'F60.81-A5',
        code: '準則 A5',
        stage: 'advanced',
        targetEvent: 'E10',
        title: '特權感（合理期待特別禮遇與順從）',
        desc: '視自己的便利與行程優先於他人的基本邊界，當別人不配合其預期時視為冒犯特權。',
        behavioralAnchor: {
          eventCode: 'E10',
          eventTitle: '深夜臨時改圖的理所當然要求',
          quote: '「凌晨三點叫你上來看草圖是你的榮幸。別人想進我這間書房還得排三個月的隊。」',
          behavior: '將個人需求當成不可質疑的皇室敕令，理直氣壯要求伴侶或夥伴無條件讓步。'
        }
      },
      {
        id: 'F60.81-A6',
        code: '準則 A6',
        stage: 'advanced',
        targetEvent: 'E11 / E12',
        title: '人際剝削（工具化利用他人成就自我）',
        desc: '不自覺將身邊親近之人視為延伸自我的道具，藉此承接榮耀或替自己承擔麻煩代價。',
        behavioralAnchor: {
          eventCode: 'E11',
          eventTitle: '匿名掛名風波中的人際工具化抉擇',
          quote: '「那個概念最初確實是你的靈感，但寫在我的大作總署名底下，才不會浪費它的價值，不是嗎？」',
          behavior: '把功勞順理成章收歸己有，並合理化為替對方「提升價值」。'
        }
      },
      {
        id: 'F60.81-A2',
        code: '準則 A2',
        stage: 'advanced',
        targetEvent: 'E12 / E13',
        title: '專注於無限成功、權力與完美幻想',
        desc: '深陷建構不朽名望、絕對權力與毫無瑕疵「理想伴侶關係」的宏大幻想中無法著陸。',
        behavioralAnchor: {
          eventCode: 'E12',
          eventTitle: '第三章：只為一人保留的氣泡玻璃',
          quote: '「我一生都在蓋絕不留一絲氣泡、能寫進建築史教科書的水晶殿堂——感情原本也該如此零瑕疵。」',
          behavior: '對事業與愛情皆懷抱「非史詩級完美即一文不值」的絕對幻想。'
        }
      },
      {
        id: 'F60.81-A8',
        code: '準則 A8',
        stage: 'advanced',
        targetEvent: 'E14',
        title: '深層妒忌或認定他人妒忌自己',
        desc: '嘴上宣稱批評者只是妒忌自己才華，實則在看到更年輕自由的新秀時湧起難以言說的妒意。',
        behavioralAnchor: {
          eventCode: 'E14',
          eventTitle: '新秀獲獎夜的裂紋坦白',
          quote: '「我嘴上說他們只會迎合大眾……其實看著他們隨便就能笑得那麼輕鬆，我嫉妒得快發瘋了。」',
          behavior: '卸下防衛後坦承傲慢背後的深層羨妒與自我囚禁的孤寂。'
        }
      }
    ],
    specifiers: [
      {
        id: 'F60.81-SPEC1',
        code: '臨床亞型 / 動力切換',
        targetEvent: 'E10 / E13',
        title: '誇大自戀（Grandiose）⇔ 脆弱自戀（Vulnerable）＆ 自戀暴怒',
        desc: '順境與被讚賞時呈現誇大傲慢型態；一旦遭遇失敗、批評或被比較，迅速崩塌為充滿羞恥與防衛暴怒（Narcissistic Rage）的脆弱／隱蔽型態。',
        behavioralAnchor: {
          eventCode: 'E13',
          eventTitle: '評選落榜後的羞恥坍塌與暴怒切換',
          quote: '「滾出去！別用那種同情失敗者的眼神看著我！……還是說連你也覺得顧傾城其實是個空架子？」',
          behavior: '在同一場壓力事件內完整呈現「暴怒攻擊 ➔ 滅頂羞恥退縮」的自戀雙態震盪。'
        }
      }
    ],
    comorbidities: [
      {
        id: 'F60.81-COM1',
        code: '常見臨床共病',
        targetEvent: 'E12 / E14',
        title: '自戀崩潰期之重鬱發作（Shame-based Depression）與適應焦慮',
        desc: '當誇大防衛罩出現裂縫（被否決、衰老或公開落敗），自戀型個案極易陷入源於極端羞恥感與無價值感的重鬱期與焦慮狀態。',
        behavioralAnchor: {
          eventCode: 'E14',
          eventTitle: '頂樓長桌前的空虛崩潰期回溯',
          quote: '「那年競圖輸掉後的一整個月，我關掉手機躺在地毯上，覺得自己連打開一盞燈的資格都沒有。」',
          behavior: '揭示一旦無法維持完美神話，高傲面具之下隨時伴發嚴重羞恥性憂鬱的共病機制。'
        }
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
    minThreshold: 4,
    thresholdLabel: '最低法定門檻：4 / 7 項核心準則（E01～E08）',
    criteria: [
      {
        id: 'F60.6-A4',
        code: '準則 A4',
        stage: 'threshold',
        targetEvent: 'E01 / E04',
        title: '專注於被批評、嘲笑或排斥的可能性',
        desc: '在社交情境中像雷達般掃描微小負面線索，將別人不經意的皺眉或沉默直接判讀為厭惡與批評。',
        behavioralAnchor: {
          eventCode: 'E01',
          eventTitle: '第一章：看一眼皺眉就逃跑的譯者',
          quote: '「你剛才眉毛動了一下……是不是覺得我翻譯的字句很乏味？我馬上把位置讓出來。」',
          behavior: '把對方思考時的中性表情立刻解讀為負面評價，準備縮回防禦外殼逃離現場。'
        }
      },
      {
        id: 'F60.6-A2',
        code: '準則 A2',
        stage: 'threshold',
        targetEvent: 'E02 / E05',
        title: '除非確定被喜歡，否則不願與人交往',
        desc: '內心渴望連結卻必須反覆取得百分之百無條件接納的擔保，否則拒絕踏出建立關係的一步。',
        behavioralAnchor: {
          eventCode: 'E02',
          eventTitle: '朗讀譯詩前的反覆自我確認',
          quote: '「如果你只是出於禮貌陪我坐著，其實不用勉強的……等確定你真的不討厭我再說話就好。」',
          behavior: '主動退讓並設置極高安全保證門檻，不願在有一絲不確定性時投入交流。'
        }
      },
      {
        id: 'F60.6-A5',
        code: '準則 A5',
        stage: 'threshold',
        targetEvent: 'E03 / E06',
        title: '因自覺能力不足而在新人際情境受到抑制',
        desc: '在陌生互動或群體場合中極度緊張緘默，認定自己的發言註定顯得貧乏可笑。',
        behavioralAnchor: {
          eventCode: 'E06',
          eventTitle: '打烊前書店的結巴與退縮',
          quote: '「這種讀書分享會我還是躲在書架後面就好……我開口只會把氣氛弄得很尷尬。」',
          behavior: '在新社交情境中啟動強烈行為抑制，寧願隱形也不敢展現真實觀點。'
        }
      },
      {
        id: 'F60.6-A6',
        code: '準則 A6',
        stage: 'threshold',
        targetEvent: 'E07 / E08',
        title: '自認社交笨拙、無趣且低人一等',
        desc: '核心自我圖式深度羞愧化，堅信他人越接近自己就越會發現自己的「空洞與貧瘠」。',
        behavioralAnchor: {
          eventCode: 'E08',
          eventTitle: '強震滲水危機中的自責躲避',
          quote: '「對不起，遇到這種突發狀況我什麼忙也幫不上……我這麼笨手笨腳的，只是個累贅而已。」',
          behavior: '在實際危機尚未被責怪前即先一步貶抑自我價值並退縮道歉。'
        }
      },
      {
        id: 'F60.6-A1',
        code: '準則 A1',
        stage: 'advanced',
        targetEvent: 'E10',
        title: '害怕批評否定而逃避人際接觸職業活動',
        desc: '為了迴避任何被公開品頭論足的風險，主動放棄演講、新書座談與升遷協作機會。',
        behavioralAnchor: {
          eventCode: 'E10',
          eventTitle: '新書譯本座談會邀約前的退縮棄權',
          quote: '「我寧可永遠只把名字印在版權頁角落……一想到要上台看下面的人皺眉，我胃就痛得發抖。」',
          behavior: '因恐懼負評而準備自我放棄重要的專業能見度與發展舞台。'
        }
      },
      {
        id: 'F60.6-A3',
        code: '準則 A3',
        stage: 'advanced',
        targetEvent: 'E11 / E12',
        title: '因怕羞辱或嘲笑而在親密關係中表現拘謹',
        desc: '即使關係已十分靠近，仍不敢卸下心理武裝自由表達渴望與愛意，深怕露出破綻遭人取笑。',
        behavioralAnchor: {
          eventCode: 'E12',
          eventTitle: '第三章：寫在譯本扉頁裡的躊躇告白',
          quote: '「把喜歡說出口的話……萬一在你眼裡顯得很滑稽怎麼辦？寫成譯註還比較不會弄丟體面。」',
          behavior: '於安全親密階段依然以迂迴書寫與高度拘謹保護脆弱核心。'
        }
      },
      {
        id: 'F60.6-A7',
        code: '準則 A7',
        stage: 'advanced',
        targetEvent: 'E13 / E14',
        title: '因怕困窘而異常不願冒個人風險或嘗新',
        desc: '寧可守在狹小但熟悉的古籍修復角落，也不願嘗試可能出糗或失敗的任何新生活挑戰。',
        behavioralAnchor: {
          eventCode: 'E13',
          eventTitle: '跨出舒適圈邀約前的僵直猶豫',
          quote: '「新的畫展太亮、人也太多了……萬一我連入場票都刷不過出糗的話，乾脆一開始就別去了吧。」',
          behavior: '誇大微小社交失誤的羞辱後果，以全面迴避新經驗換取零困窘保證。'
        }
      }
    ],
    specifiers: [
      {
        id: 'F60.6-SPEC1',
        code: '臨床亞型 / 鑑別註記',
        targetEvent: 'E09 / E12',
        title: '渴望連結卻恐懼退縮型（與 F60.1 孤僻型鑑別）',
        desc: '與孤僻型（林見微）「本能不渴望親密、對毀譽無感」完全相反，畏避型內心極度渴望被愛與歸屬，退縮純粹源於「預期自己必將被羞辱排斥」之苦痛恐懼。',
        behavioralAnchor: {
          eventCode: 'E09',
          eventTitle: '圖書館暴雨夜的雙重對照',
          quote: '「我每天都在羨慕大廳裡能自在聊天的人……我不是不需要陪伴，我只是怕靠近了會讓人失望。」',
          behavior: '在與孤僻型同場對照下，明確道出強烈依戀渴望與自我貶抑焦慮間的撕裂衝突。'
        }
      }
    ],
    comorbidities: [
      {
        id: 'F60.6-COM1',
        code: '常見臨床共病',
        targetEvent: 'E10 / E14',
        title: '社交焦慮症（SAD 廣泛型）＆ 廣泛性焦慮症（GAD）',
        desc: '畏避型人格障礙症與廣泛性社交焦慮症高度重疊共病（常被視為嚴重與泛化自我意象版本的連續光譜），並常共病過度反芻擔憂與次發性憂鬱。',
        behavioralAnchor: {
          eventCode: 'E10',
          eventTitle: '公開場合前的自律神經焦慮發作',
          quote: '「手心全濕了、呼吸卡在喉嚨……我不是只有緊張上台，是從骨子裡覺得『溫言這個人』本身就是個錯誤。」',
          behavior: '同時呈現社交焦慮生理激發（SAD）與滲透至自我存在層面的恥感圖式（AvPD）。'
        }
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
    minThreshold: 5,
    thresholdLabel: '最低法定門檻：5 / 8 項核心準則（E01～E08）',
    criteria: [
      {
        id: 'F60.7-A1',
        code: '準則 A1',
        stage: 'threshold',
        targetEvent: 'E01 / E02',
        title: '缺乏他人建議與保證時難以做日常決定',
        desc: '即使選甜點口味、點餐或帶不帶雨傘等小事，沒有權威或依附對象反覆保證便陷入癱瘓性猶豫。',
        behavioralAnchor: {
          eventCode: 'E01',
          eventTitle: '第一章：連草莓或藍莓都不敢選的女孩',
          quote: '「草莓的好甜、藍莓的好像比較清爽……你覺得我今天該選哪一個才好？你幫我決定，我聽你的！」',
          behavior: '將最微小的個人偏好選擇權主動雙手奉上，只為避免自行決斷的焦慮與責任。'
        }
      },
      {
        id: 'F60.7-A2',
        code: '準則 A2',
        stage: 'threshold',
        targetEvent: 'E05',
        title: '需由他人承擔生活重要領域的責任',
        desc: '把工作去留、財務管理與人際去向等重大人生決策全盤交託給照顧者拍板。',
        behavioralAnchor: {
          eventCode: 'E05',
          eventTitle: '甜點屋續約與生涯去向的空白支票',
          quote: '「調店通知跟租約我都拿來了……你說我應該留還是走？只要你安排好，我照著簽名就好。」',
          behavior: '企圖讓身邊親密對象實質接管自己關鍵生命決定的主導權與後果責任。'
        }
      },
      {
        id: 'F60.7-A3',
        code: '準則 A3',
        stage: 'threshold',
        targetEvent: 'E03 / E04',
        title: '因怕失去支持而難以表達不同意見',
        desc: '明知自己不喜歡或受到不合理對待，仍恐懼一旦說「不」就會遭對方嫌棄遺棄而微笑吞忍。',
        behavioralAnchor: {
          eventCode: 'E03',
          eventTitle: '面對奧客退換貨與不合理要求時的微笑退讓',
          quote: '「沒關係、都是我沒包好，我再重新幫您做一份……只要大家別生我的氣怎麼樣都好。」',
          behavior: '壓抑真實委屈與憤怒情緒，透過無條件配合來保住任何可能的認可。'
        }
      },
      {
        id: 'F60.7-A5',
        code: '準則 A5',
        stage: 'threshold',
        targetEvent: 'E06 / E07',
        title: '為獲照顧支持不惜做到極端、自願做不快之事',
        desc: '為了交換留下來被照料的承諾，主動包攬令人疲憊、卑微甚至損害自身界線的雜務與犧牲。',
        behavioralAnchor: {
          eventCode: 'E06',
          eventTitle: '凌晨趕工代班的討好犧牲',
          quote: '「你的衣服跟報告書也通通拿來給我弄沒關係！只要你明天還會回來看看小鹿就好……」',
          behavior: '以過度付出與甘願受委屈作為換取對方不離不棄的安全籌碼。'
        }
      },
      {
        id: 'F60.7-A6',
        code: '準則 A6',
        stage: 'threshold',
        targetEvent: 'E08',
        title: '獨處時感到極度不適或無助（怕無法照顧自己）',
        desc: '一旦被迫單獨面對空間或問題，立刻湧起深不見底的無助感與生存危機慌亂。',
        behavioralAnchor: {
          eventCode: 'E08',
          eventTitle: '停電孤立夜的恐慌啜泣與緊抓衣角',
          quote: '「不要把門關起來只留我一個人在這層樓……沒有你在旁邊指示，我連手電筒都不知道該怎麼握……」',
          behavior: '在實際獨處僅數十分鐘下便產生深刻無能感與無法照料自己的恐慌。'
        }
      },
      {
        id: 'F60.7-A4',
        code: '準則 A4',
        stage: 'advanced',
        targetEvent: 'E10 / E12',
        title: '因缺乏自信而難以獨自發起計畫（能力恐懼）',
        desc: '表面看似缺乏能力，實則潛意識害怕一旦表現得獨立勝任（Competent），照顧者就會「不再需要照顧自己而離去」。',
        behavioralAnchor: {
          eventCode: 'E12',
          eventTitle: '第三章：故意烤焦的最後一盤蛋糕',
          quote: '「其實我看過食譜十遍了，可是如果我真的烤出完美的蛋糕……你是不是就會覺得小鹿已經不需要你了？」',
          behavior: '在終於能獨當一面完成作品前夕刻意出錯退行，展露「能力恐懼」核心動力。'
        }
      },
      {
        id: 'F60.7-A7',
        code: '準則 A7',
        stage: 'advanced',
        targetEvent: 'E11 / E13',
        title: '關係結束時急切尋找下一位照顧來源',
        desc: '無法承受任何空窗期，一旦感到現有依附動搖或失去聯絡，立刻本能尋找新的依賴替代對象。',
        behavioralAnchor: {
          eventCode: 'E11',
          eventTitle: '短暫失聯危機中的緊急替代依附衝動',
          quote: '「昨天你晚歸沒接電話，我慌到差點衝下樓問前店長能不能讓我回去打工……我不能沒有人告訴我怎麼辦。」',
          behavior: '呈現只要原本依靠出現微幅不確定性，便急切物色下一個依靠避風港的依賴循環。'
        }
      },
      {
        id: 'F60.7-A8',
        code: '準則 A8',
        stage: 'advanced',
        targetEvent: 'E14',
        title: '不切實際盤據於「被留下來自己照顧自己」的恐懼',
        desc: '即便事實上已具備生活技能與工作收入，仍被不合現實比例的孤立棄置災難想像所盤據。',
        behavioralAnchor: {
          eventCode: 'E14',
          eventTitle: '獨立開張前的災難化獨居想像',
          quote: '「萬一有一天大家都有自己的生活、只剩我一個人坐在店裡，我一定連帳單跟門鎖都會弄丟的吧……」',
          behavior: '在離去保護傘前夕反覆重現不符實際能力的災難性無能自我預言。'
        }
      }
    ],
    specifiers: [
      {
        id: 'F60.7-SPEC1',
        code: '臨床亞型 / 動力鑑別',
        targetEvent: 'E10 / E12',
        title: '病態順從與能力恐懼（與 F60.3 BPD ＆ F60.89 被動攻擊鑑別）',
        desc: '面對遺棄威脅時：邊緣型（蘇緋）以暴怒、要求與自我破壞反擊；被動攻擊型（游子謙）表面答應暗中拖延報復；依賴型（白小鹿）則變得更加卑微順從與示弱無助。',
        behavioralAnchor: {
          eventCode: 'E12',
          eventTitle: '順從退行背後的分離恐懼剖析',
          quote: '「我不會生氣、也不會反抗……只要乖乖聽話當一個什麼都需要你教的小孩，你就能多留一會對不對？」',
          behavior: '清楚展現以「退行無能＋極度順從」維繫關係的依賴型防衛機制。'
        }
      }
    ],
    comorbidities: [
      {
        id: 'F60.7-COM1',
        code: '常見臨床共病',
        targetEvent: 'E11 / E14',
        title: '廣泛性焦慮症（GAD）＆ 成人分離焦慮症',
        desc: '長期擔憂無法勝任獨立生活常共病慢性軀體緊繃與災難思考（GAD），並於依附對象短暫遠行時出現符合分離焦慮症特徵之軀體不適與過度擔憂。',
        behavioralAnchor: {
          eventCode: 'E11',
          eventTitle: '無法接通電話夜的胃痙攣與分離焦慮',
          quote: '「從下午開始我的胸口就悶到想吐，腦子裡一直閃過『萬一你在路上出事、以後沒人管我了』的畫面……」',
          behavior: '展露典型的成人分離焦慮軀體化反應與廣泛性預警擔憂狀態。'
        }
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
    minThreshold: 4,
    thresholdLabel: '最低法定門檻：4 / 8 項核心準則（E01～E08）',
    criteria: [
      {
        id: 'F60.5-A1',
        code: '準則 A1',
        stage: 'threshold',
        targetEvent: 'E01 / E02',
        title: '專注於細節、規則與清單而失去重點',
        desc: '過度執著於流程表格、甘特圖、擺放角度與時間順序，往往反而忽略事件真正的情感目的與實用效率。',
        behavioralAnchor: {
          eventCode: 'E01',
          eventTitle: '第一章：遺失的待辦清單與遲到的兩分鐘',
          quote: '「約會遲到兩分鐘，代表優先序排列失準；請等我先把這張四十六項行前核對表找出來再出發。」',
          behavior: '為了找一張寫滿瑣碎規矩的清單而讓真正共處的時光全數耗盡。'
        }
      },
      {
        id: 'F60.5-A2',
        code: '準則 A2',
        stage: 'threshold',
        targetEvent: 'E05 / E07',
        title: '妨礙任務完成的極端完美主義',
        desc: '設下超乎現實的嚴格準則，因微小措辭或排版不完美而反覆作廢重來，經常拖延甚至無法交出成果。',
        behavioralAnchor: {
          eventCode: 'E07',
          eventTitle: '深夜報告第十二遍重寫的自我卡關',
          quote: '「標點與註腳的邏輯完美度還差 3%，在它達到百分之百無懈可擊之前，我寧可先延後繳交期限。」',
          behavior: '因追求毫無瑕疵而讓早就夠水準的案件陷入無止境修改循環。'
        }
      },
      {
        id: 'F60.5-A3',
        code: '準則 A3',
        stage: 'threshold',
        targetEvent: 'E03 / E06',
        title: '過度投入工作生產力，排除休閒與友誼',
        desc: '非出於經濟迫切，將週末與休假仍塞滿待辦任務與進修進度，把單純放空享受視為道德罪惡。',
        behavioralAnchor: {
          eventCode: 'E03',
          eventTitle: '連野餐都帶著法醫案例分析書的休假',
          quote: '「只是坐著吹風什麼都不做，每過去一分鐘我都覺得像在對自己的人生怠忽職守。」',
          behavior: '即使被迫休假仍攜帶工作文件，無法單純體會無產值的生活樂趣。'
        }
      },
      {
        id: 'F60.5-A8',
        code: '準則 A8',
        stage: 'threshold',
        targetEvent: 'E04 / E08',
        title: '表現出高度僵化與頑固',
        desc: '認定自己的邏輯與系統是唯一客觀真理，面對突發變故與他人彈性建議時執意硬扛不肯退讓。',
        behavioralAnchor: {
          eventCode: 'E08',
          eventTitle: '樓層停水斷電危機裡的 SOP 僵化衝突',
          quote: '「緊急撤離程序書寫明必須依樓層編號清點物資——為什麼大家都不照清單排隊，只顧著亂衝？」',
          behavior: '混亂危機中仍執拗要求嚴格執行既定規範與順序，對他人情緒混亂極度不耐。'
        }
      },
      {
        id: 'F60.5-A6',
        code: '準則 A6',
        stage: 'advanced',
        targetEvent: 'E10 / E12',
        title: '不願將任務授權或與他人協作（除非完全照做）',
        desc: '寧願自己熬夜扛下全部事務也不交給別人分擔，深信他人無法按自己精準到毫米的標準完成。',
        behavioralAnchor: {
          eventCode: 'E10',
          eventTitle: '檔案架重整時的全面接管與拒絕協助',
          quote: '「標籤貼歪一公釐我之後就會找不到——別碰，放著讓我自己一個人整理到天亮就好。」',
          behavior: '奪回別人善意幫忙的工具，展現「若非照我的方式做便一概不可信」的微觀控制。'
        }
      },
      {
        id: 'F60.5-A4',
        code: '準則 A4',
        stage: 'advanced',
        targetEvent: 'E11',
        title: '對道德、倫理與原則過度謹慎且缺乏彈性',
        desc: '自我要求與批判極為嚴苛，將微小生活瑕疵或情感猶豫放大成嚴重的品格失格（非宗教或文化常規所致）。',
        behavioralAnchor: {
          eventCode: 'E11',
          eventTitle: '為一句失言寫下的三十條自我檢討備忘',
          quote: '「昨晚我多睡過頭十分鐘又忘了道謝，這在我的倫理準則裡就是不負責任與失禮。」',
          behavior: '對微小人性疏忽套用過度嚴酷的道德與自律審判。'
        }
      },
      {
        id: 'F60.5-A5',
        code: '準則 A5',
        stage: 'advanced',
        targetEvent: 'E13',
        title: '無法丟棄磨損或無價值的舊物（無情感價值亦然）',
        desc: '堆積過期收據、舊零件與作廢筆記本，理由並非懷舊紀念，而是「未來某天比對資料時說不定需要查證」。',
        behavioralAnchor: {
          eventCode: 'E13',
          eventTitle: '儲藏室裡十年不丟的發票與壞零件箱',
          quote: '「這張八年前的超商發票跟壞掉的節拍器螺絲萬一未來需要核對購入日或規格呢？現在丟掉太冒險了。」',
          behavior: '以功能性防萬一為由囤積毫無使用價值與情感溫度的廢棄紙件物品。'
        }
      },
      {
        id: 'F60.5-A7',
        code: '準則 A7',
        stage: 'advanced',
        targetEvent: 'E14',
        title: '對自己與他人採取極度節儉吝嗇的風險防禦',
        desc: '即使經濟寬裕仍嚴苛控制消費，視金錢為必須全力囤積以防範未知災難的安全庫存。',
        behavioralAnchor: {
          eventCode: 'E14',
          eventTitle: '紀念日花束與預算危機防備備忘錄',
          quote: '「不是捨不得給你買花……而是只要帳戶的災難預備金少一格，我就覺得明天會出大事。」',
          behavior: '吐露過度節制背後的災難性失控焦慮，學會第一次允許微小留白與犒賞。'
        }
      }
    ],
    specifiers: [
      {
        id: 'F60.5-SPEC1',
        code: '臨床亞型 / 鑑別註記',
        targetEvent: 'E12 / E14',
        title: '自我協調（Ego-syntonic）秩序控 ＆ 情感隔離（與 OCD 鑑別）',
        desc: 'OCPD 無真正強迫思考與重複洗滌儀式，其秩序、完美主義與節制屬於「自我協調（覺得這樣才是對的）」且伴隨理智化／情感隔離防衛，直至練習為關係「留白」。',
        behavioralAnchor: {
          eventCode: 'E12',
          eventTitle: '第三章：打了十七遍草稿的未完成情書',
          quote: '「我把『我愛你』改成了分析兩人契合率的結構報告……因為情感一旦沒被寫成規則，我就不知道怎麼控制它。」',
          behavior: '揭示過度理性化與情感克制其實是用來緩衝親密失控焦慮的自我協調結構。'
        }
      }
    ],
    comorbidities: [
      {
        id: 'F60.5-COM1',
        code: '常見臨床共病',
        targetEvent: 'E11 / E13',
        title: '廣泛性焦慮症（GAD）＆ 控制崩解型次發性憂鬱',
        desc: '長期透過超額努力維持無瑕秩序極易演變為慢性緊繃焦慮（GAD）；一旦現實失控打破完美平衡，患者常陷入強烈自我貶抑與耗竭性次發憂鬱。',
        behavioralAnchor: {
          eventCode: 'E13',
          eventTitle: '失控卡關夜的高壓頭痛與自我耗竭',
          quote: '「如果連生活細節都控制不住，我就覺得整個自己正在一寸寸垮掉……這幾個月胸口一直像壓著石塊。」',
          behavior: '展現完美主義失靈時迅速併發之慢性焦慮軀體緊繃與耗竭型憂鬱低潮。'
        }
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
    minThreshold: 5,
    thresholdLabel: '最低法定門檻：5 / 5 項診斷要件 A～E（E01～E08）',
    criteria: [
      {
        id: 'F07.0-A',
        code: '準則 A',
        stage: 'threshold',
        targetEvent: 'E01 / E05',
        title: '持續且顯著的既有人格特質改變',
        desc: '個體長期表現出與病前截然不同的人格模式——昔日極端克制冷靜的神外名醫變得直率愛哭且不按牌理出牌。',
        behavioralAnchor: {
          eventCode: 'E01',
          eventTitle: '第一章：金繼陶碗與額角的疤痕',
          quote: '「以前的手術室同仁總說我看見人又換了個靈魂……連我自己翻舊日記，都覺得那像另一個陌生人。」',
          behavior: '具體呈現與車禍前沉穩克制性格之間的鮮明人格斷裂（Premorbid vs Post-injury Shift）。'
        }
      },
      {
        id: 'F07.0-B',
        code: '準則 B',
        stage: 'threshold',
        targetEvent: 'E02 / E08',
        title: '身體病況之直接病理生理證據（右額葉外傷）',
        desc: '病史、神經影像學與臨床檢查明確證實右側前額葉／眼眶面皮質創傷導致抑制與情緒調節環路受損。',
        behavioralAnchor: {
          eventCode: 'E02',
          eventTitle: 'MRI 影像片與額角金繼傷痕對照',
          quote: '「片子上右側眶額葉那塊暗影還在——主管煞車與情緒過濾的線路車禍時斷掉了，這不是『個性變壞』。」',
          behavior: '從神經醫學病歷與掃描紀錄確認人格轉變源於可驗證的腦部結構器質損害。'
        }
      },
      {
        id: 'F07.0-C',
        code: '準則 C',
        stage: 'threshold',
        targetEvent: 'E03 / E06',
        title: '排除原發性精神疾患之更好解釋',
        desc: '人格變化出現於成年期車禍之後，而非始於成年早期之原發 BPD／雙相躁鬱或物質誘發疾患。',
        behavioralAnchor: {
          eventCode: 'E03',
          eventTitle: '三十一歲以前的零病史病程回顧',
          quote: '「三十一歲以前的我從來沒有情緒失控過，既沒發過躁也沒混亂依附——時間線就切在三年前那場車禍當晚。」',
          behavior: '釐清發病時間錨點明確落於腦創傷事件後，藉此排除原發性 B 群人格疾患或雙相疾患。'
        }
      },
      {
        id: 'F07.0-D',
        code: '準則 D',
        stage: 'threshold',
        targetEvent: 'E07',
        title: '非僅出現於急性譫妄之病程中',
        desc: '確認其認知清晰、時地人定向感完整且覺醒度穩定，並非急性意識混濁或譫妄狀態下的暫時表現。',
        behavioralAnchor: {
          eventCode: 'E07',
          eventTitle: '清醒定向評估下的金漆專注作業',
          quote: '「幾點幾分、你在我左邊、金漆要等二十分鐘才會乾——我清醒得很，只是感情跟煞車管不住而已。」',
          behavior: '維持清晰意識與高階空間專注力的情況下持續展現人格調節改變，明確排除譫妄。'
        }
      },
      {
        id: 'F07.0-E',
        code: '準則 E',
        stage: 'threshold',
        targetEvent: 'E04 / E08',
        title: '造成顯著臨床苦惱與職業／社交功能損害',
        desc: '因言行去抑制與突發情緒波動被迫離開手術台，並在親密社交中承受他人異樣眼光與自我挫折。',
        behavioralAnchor: {
          eventCode: 'E08',
          eventTitle: '暴雨停電夜的情緒潰堤與功能失落痛楚',
          quote: '「停電一喊我手就發抖……不能再拿手術刀、連跟室友好好說句話都要先忍住眼淚，這比骨折痛多了。」',
          behavior: '真實呈現器質後遺症如何嚴重衝擊原有的專業身份、人際互動與心理痛苦。'
        }
      },
      {
        id: 'F07.0-SUB-DIS',
        code: '亞型準則：去抑制型 (Disinhibited)',
        stage: 'advanced',
        targetEvent: 'E09 / E11',
        title: '去抑制型表現（直率、詼諧 Facetiousness ＆ 低衝動煞車）',
        desc: '額葉前扣帶／眶額迴損害典型特徵：想到什麼直接脫口而出、合宜與不合宜的黑色幽默（Facetiousness）及花市衝動消費。',
        behavioralAnchor: {
          eventCode: 'E11',
          eventTitle: '花市裡的衝動購物與直球黑色幽默',
          quote: '「啊對不起我剛剛是不是又直接把老闆的價格講破還一次買了七盆龜背芋？我的社交過濾器又離家出走了～」',
          behavior: '呈現無惡意但缺乏額葉煞車緩衝的衝動購物與不經修飾直言表現。'
        }
      },
      {
        id: 'F07.0-SUB-LAB',
        code: '亞型準則：情緒易變型 (Labile)',
        stage: 'advanced',
        targetEvent: 'E10 / E12',
        title: '情緒易變型表現（急驟且明顯的情感波動）',
        desc: '看電影片段、聽見一首曲子或見舊相簿即在幾秒內潸然淚下或大笑，情感波幅遠超過自身意識想要的控制。',
        behavioralAnchor: {
          eventCode: 'E10',
          eventTitle: '舊相簿前的瞬間落淚與自嘲笑聲',
          quote: '「你看我連眼淚都要自己擦不及——三秒前才在哭，看到那隻歪掉的貓又想笑了，真是失禮的大腦。」',
          behavior: '展演典型器官性情緒失禁／高度易變（Affective Lability），但內在感知依然真摯清醒。'
        }
      },
      {
        id: 'F07.0-COMB',
        code: '整合議題',
        stage: 'advanced',
        targetEvent: 'E13 / E14',
        title: '合併亞型確認 ＆ 舊自我哀悼之金繼重生',
        desc: '確認同時具「情緒易變＋去抑制」之合併型（Combined Type），並協助個案哀悼失去的「完美舊我」完成心理整合。',
        behavioralAnchor: {
          eventCode: 'E12',
          eventTitle: '第三章：名為《新生》的金繼雙杯',
          quote: '「陶碗裂了用金漆修好並不是回到沒破過以前……現在這個愛哭又囉唆的陸晴嵐，你願意一起認養嗎？」',
          behavior: '在整合病前與病後雙重生命經驗下，從「懷念過去」走向接納新自我的金繼隱喻。'
        }
      }
    ],
    specifiers: [
      {
        id: 'F07.0-SPEC1',
        code: 'DSM-5-TR 亞型註記',
        targetEvent: 'E11 / E12',
        title: '合併型：情緒易變型（Labile）＋ 去抑制型（Disinhibited）',
        desc: '依 DSM-5-TR F07.0 規定指明具體臨床表型：同時顯著呈現眶額葉受損之「去抑制衝動／詼諧感」與情感閥值降低之「快速易變哭笑反應」，而非原發性躁期。',
        behavioralAnchor: {
          eventCode: 'E11',
          eventTitle: '臨床評估下的雙重亞型對照',
          quote: '「不是情緒上癮，也不是精力亢奮不睡覺……就是腦袋裡的『抑制閥門』少了一半。」',
          behavior: '清楚標記兩種 F07.0 亞型特徵並示範與雙相躁症的精力/睡眠鑑別重點。'
        }
      }
    ],
    comorbidities: [
      {
        id: 'F07.0-COM1',
        code: '常見臨床共病',
        targetEvent: 'E13 / E14',
        title: '創傷失落性次發憂鬱 ＆ 輕度神經認知障礙（執行疲乏）',
        desc: '腦傷後被迫告別原本高成就身分，極高比例伴發哀悼「舊自我死亡」之次發性憂鬱情緒，以及注意力／執行疲乏（認知耐力下降）。',
        behavioralAnchor: {
          eventCode: 'E13',
          eventTitle: '舊手術袍前無聲的午後疲憊',
          quote: '「專心修補完兩個杯子後，整個前額就像斷電一樣空轉……更難過的是覺得那個完美的自己再也回不來了。」',
          behavior: '同時揭露高強度用腦後執行功能疲乏與身份失落相關憂鬱之雙重臨床負荷。'
        }
      }
    ]
  },
  {
    id: 'you_ziqian',
    number: '12',
    name: '游子謙',
    enName: 'You Ziqian',
    age: 26,
    occupation: '咖啡廳店長／自由平面設計師',
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
    shortBio: '公寓裡人緣最好、永遠笑臉迎人的溫柔店長。他從來不跟任何人吵架，對所有要求都微笑說「好啊、沒問題、我都配合你」；但只要是他心裡不情願的事，他就會「不小心」忘記、「剛好」淋濕文件、用最溫柔的語氣說出最酸的抱怨。因為他從小被教育「生氣是不被允許的」。',
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
    minThreshold: 4,
    thresholdLabel: '最低法定門檻：一般 PD 準則 A～D ＋ 特定特徵註明（E01～E08）',
    criteria: [
      {
        id: 'F60.89-GA',
        code: '一般準則 A',
        stage: 'threshold',
        targetEvent: 'E01 / E02',
        title: '持久偏離文化預期（微笑面具下包裹反抗）',
        desc: '內在經驗與行為持續顯著偏離所屬文化期待（表現在情感表達抑制、人際隱性抵抗與衝突迴避控制）。',
        behavioralAnchor: {
          eventCode: 'E01',
          eventTitle: '第一章：微笑著淋濕的企劃書',
          quote: '「好啊，都聽你的，我完全沒意見喔～……哎呀真糟糕，剛拿水杯手滑了一下，整疊企劃書全濕了呢。」',
          behavior: '口頭百分之百合作順從，轉身卻透過「無辜意外」精準抵銷不情願承受的要求。'
        }
      },
      {
        id: 'F60.89-GB',
        code: '一般準則 B',
        stage: 'threshold',
        targetEvent: 'E03 / E05',
        title: '跨職場與親密情境之僵化、廣泛適應不良',
        desc: '無論面對咖啡廳奧客、合夥人或親近對象，皆無法直接說「不」，一致僵化重複被動抵抗循環。',
        behavioralAnchor: {
          eventCode: 'E05',
          eventTitle: '第二章：加了鹽巴的特調咖啡',
          quote: '「你喜歡濃一點對吧？沒問題～（端上的無咖啡因配方裡剛好誤摻了一匙海鹽）呀，真是不好意思～」',
          behavior: '在親密磨合衝突時依舊微笑退讓，再藉由「貼心失誤」釋放受壓抑的敵意。'
        }
      },
      {
        id: 'F60.89-GC',
        code: '一般準則 C',
        stage: 'threshold',
        targetEvent: 'E04 / E06',
        title: '引發顯著人際挫敗、無力感與功能損害',
        desc: '使親密伴侶與同事長期處於猜忌與困惑自責之中，自己則在不斷壓抑委屈與內耗裡筋疲力盡。',
        behavioralAnchor: {
          eventCode: 'E06',
          eventTitle: '真心話反話翻譯機的無聲消耗',
          quote: '「每次我說『隨便』其實心裡都快氣炸了……可看你們又猜不到又開始內疚，我自己也覺得好累好髒。」',
          behavior: '證實此溝通僵局對關係品質與個體主觀幸福感造成重大且持續的損害。'
        }
      },
      {
        id: 'F60.89-GD',
        code: '一般準則 D ＋ 特定註明',
        stage: 'threshold',
        targetEvent: 'E07 / E08',
        title: '成年早期長期穩定 ＋ 註明「被動攻擊／混合特徵」',
        desc: '回溯至青少年／成年早期長期穩定，不完全符合任一單一正式 PD 準則，依 DSM-5-TR 註明「被動攻擊型（以遺忘、拖延、低效消極抵抗）」特徵。',
        behavioralAnchor: {
          eventCode: 'E08',
          eventTitle: '暴雨危機中的微笑失靈與消極怠工揭露',
          quote: '「小時候只要皺眉拒絕就會被罰站……所以我學會了把所有檔案『忘在倉庫』，直到沒人還能強迫我。」',
          behavior: '溯源長期成長史與排他檢視，正式確立 F60.89（註明：被動攻擊特徵）。'
        }
      },
      {
        id: 'F60.89-PA1',
        code: '進階特徵 1',
        stage: 'advanced',
        targetEvent: 'E10 / E12',
        title: '隱性敵意、酸言酸語與罪惡感誘導',
        desc: '壓抑直接憤怒，慣用「我哪敢有意見呀」或溫柔自嘲反諷令對方感到虧欠與困惑（軟釘子操控）。',
        behavioralAnchor: {
          eventCode: 'E10',
          eventTitle: '溫柔自嘲背後的罪惡感陷阱',
          quote: '「沒事沒事，大忙人當然比較重要，我一個小小店長在這裡多等兩小時本來就很合理呀～」',
          behavior: '嘴上體諒實則植入道德虧欠壓力，藉以在表面和平下讓對方負罪退讓。'
        }
      },
      {
        id: 'F60.89-PA2',
        code: '進階特徵 2',
        stage: 'advanced',
        targetEvent: 'E11 / E13',
        title: '權威抗拒與拖延性自我設障（Self-handicapping）',
        desc: '只要感受到一絲「被指示或支配」的意味，便故意降低效率或遺漏細節，寧可一起損失也要保住隱性自主權。',
        behavioralAnchor: {
          eventCode: 'E11',
          eventTitle: '秋季菜單聯名企劃的刻意低效拖延',
          quote: '「明明兩小時就能打完的配方，只要聽到像命令的語氣，我就會『不小心』拖到過了期限。」',
          behavior: '揭露拖延與低效背後的真實心理功能：對抗感知到的控制權剝奪。'
        }
      },
      {
        id: 'F60.89-MIX',
        code: '進階特徵 3',
        stage: 'advanced',
        targetEvent: 'E12 / E14',
        title: '混合型防衛結構（被動攻擊 × 畏避衝突依附）',
        desc: '混合了對自主權的極端渴求與對衝突撕裂的畏避恐懼，當練習真誠說出「我生氣／我不要」時才得以整合。',
        behavioralAnchor: {
          eventCode: 'E12',
          eventTitle: '第三章：第一次摔碎杯子的真心話',
          quote: '「我討厭每次都用失誤報復你——好啦！我現在就很不高興，我今天就是不想照你的排程走！」',
          behavior: '跨出假笑面具，第一次在安全界線內以直接言語表達生氣與拒絕。'
        }
      }
    ],
    specifiers: [
      {
        id: 'F60.89-SPEC1',
        code: '臨床註明 / 鑑別要點',
        targetEvent: 'E12 / E14',
        title: '被動攻擊（負性主義）＋ 畏避衝突混合型特徵（與依賴型鑑別）',
        desc: '對應 DSM-5-TR「其他特定之人格障礙症」臨床註記規範；與依賴型（白小鹿）「因無助順從討好」不同，子謙的順從是掩飾隱性憤怒與維護自主權的面具。',
        behavioralAnchor: {
          eventCode: 'E14',
          eventTitle: '微笑面具下的自主宣告練習',
          quote: '「我從來不是沒主見……我只是不敢直接開戰，才改用讓人更生氣的溫水煮青蛙方式說不。」',
          behavior: '明辨「表面順從的權力反抗（F60.89）」與「恐懼獨處的真正順從（F60.7）」。'
        }
      }
    ],
    comorbidities: [
      {
        id: 'F60.89-COM1',
        code: '常見臨床共病',
        targetEvent: 'E13 / E14',
        title: '持續性憂鬱症（PDD）＆ 抑怒相關焦慮與軀體緊繃',
        desc: '長期壓抑憤怒並只能以陰陽怪氣或自我設障抒發，極高比例伴發長期委屈感的持續性憂鬱症（惡劣心境）與咬牙／胃痛等抑怒軀體症狀。',
        behavioralAnchor: {
          eventCode: 'E13',
          eventTitle: '打烊後安靜咖啡廳裡的疲憊感與胃痙攣',
          quote: '「每天陪笑十二個小時，打烊後連抬起手沖壺都覺得沉重……憤怒全堵在胃裡變成悶痛。」',
          behavior: '揭示長期壓抑真實攻擊性背後所伴隨的慢性無力憂鬱與自律神經壓力。'
        }
      }
    ]
  }
];
