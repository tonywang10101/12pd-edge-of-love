// Character identity and diagnosis references are independent of observed evidence.
import { DSM_REFERENCE } from './dsmReference.js?v=31';
import { STORY_ROUTES, buildRouteEvents } from './storyContent.js?v=31';
export const LOCATIONS = [
  {
    "id": "rooftop",
    "name": "公寓頂樓與觀測間",
    "desc": "能俯瞰整座城市霓虹與夜空的角落，適合需要距離感與獨處的靈魂。",
    "icon": "🌙",
    "characters": [
      "shen_mo",
      "lin_jianwei"
    ]
  },
  {
    "id": "atelier",
    "name": "畫室",
    "desc": "空氣中飄著松節油、線香與陶土氣息，色彩與情緒在此劇烈碰撞。",
    "icon": "🎨",
    "characters": [
      "ruri",
      "su_fei",
      "lu_qinglan"
    ]
  },
  {
    "id": "cafe",
    "name": "咖啡廳",
    "desc": "白日裡最溫暖的街角空間，午後陽光灑落木桌，卻也藏著說不出口的心事。",
    "icon": "☕",
    "characters": [
      "bai_xiaolu",
      "you_ziqian"
    ]
  },
  {
    "id": "archive",
    "name": "圖書修復研究室",
    "desc": "時間在這裡被精確切割成秒針與編號，安靜得能聽見紙頁翻動與心跳。",
    "icon": "📚",
    "characters": [
      "wen_yan",
      "ji_yan"
    ]
  },
  {
    "id": "lounge",
    "name": "地下酒吧",
    "desc": "夜晚才甦醒的聚光燈與搖晃酒杯，慾望、表演與危險的博弈場。",
    "icon": "🍸",
    "characters": [
      "han_xiao",
      "xia_le"
    ]
  },
  {
    "id": "studio",
    "name": "建築事務所",
    "desc": "高聳於城市頂層的極簡玻璃空間，俯視眾生的完美主義堡壘。",
    "icon": "🏛️",
    "characters": [
      "gu_qingcheng"
    ]
  }
];
export const CLUSTERS = {
  "A": {
    "id": "A",
    "name": "Cluster A：奇特／古怪型 (Odd / Eccentric)",
    "color": "#818cf8",
    "desc": "包含妄想型、孤僻型、思覺失調型。在人際關係中常表現出疏離、猜疑或獨特的認知與知覺體驗。"
  },
  "B": {
    "id": "B",
    "name": "Cluster B：戲劇化／情緒化／反覆無常型 (Dramatic / Emotional / Erratic)",
    "color": "#f43f5e",
    "desc": "包含反社會型、邊緣型、做作型、自戀型。情感濃烈、戲劇化、衝動或人際關係劇烈擺盪。"
  },
  "C": {
    "id": "C",
    "name": "Cluster C：焦慮／恐懼型 (Anxious / Fearful)",
    "color": "#34d399",
    "desc": "包含畏避型、依賴型、強迫型。核心驅力來自深層的焦慮、對被拒絕或失控的恐懼。"
  },
  "OTHER": {
    "id": "OTHER",
    "name": "Other PD：身體病況改變與其他特定型",
    "color": "#f59e0b",
    "desc": "包含「另一身體病況引起的人格改變 (F07.0)」、「其他特定的人格障礙症 (F60.89)」與「非特定的人格障礙症 (F60.9)」。"
  }
};
const IDENTITIES = {
  "shen_mo": {
    "id": "shen_mo",
    "number": "01",
    "name": "沈墨",
    "enName": "Adrian",
    "age": 27,
    "occupation": "獨立調查記者／資安顧問",
    "cluster": "A",
    "dsmCode": "F60.0",
    "dsmTitle": "妄想型人格障礙症",
    "dsmTitleEn": "Paranoid Personality Disorder",
    "sex": "male",
    "genderLabel": "順性別男性 (Cis Male)",
    "pronoun": "他",
    "orientation": "bisexual",
    "orientationLabel": "雙性戀 (Bisexual)",
    "romanticGenders": [
      "female",
      "male",
      "nonbinary"
    ],
    "locationId": "rooftop",
    "themeColor": "#6366f1",
    "ecgType": "vigilant",
    "tagline": "「我很會查證，卻還在練習分清事實和自己的猜測。」",
    "avatar": {
      "skin": "#f1dca7",
      "hairColor": "#1e1b4b",
      "hairStyle": "short_messy",
      "eyeColor": "#4338ca",
      "outfitColor": "#1e293b",
      "accentColor": "#6366f1",
      "accessory": "recorder"
    }
  },
  "lin_jianwei": {
    "id": "lin_jianwei",
    "number": "02",
    "name": "林見微",
    "enName": "Claire",
    "age": 25,
    "occupation": "市立天文館觀測員／古董鐘錶修復師",
    "cluster": "A",
    "dsmCode": "F60.1",
    "dsmTitle": "孤僻型人格障礙症",
    "dsmTitleEn": "Schizoid Personality Disorder",
    "sex": "female",
    "genderLabel": "順性別女性 (Cis Female)",
    "pronoun": "她",
    "orientation": "asexual_demi",
    "orientationLabel": "無性戀／半浪漫傾向 (Asexual Demi-romantic)",
    "romanticGenders": [
      "female",
      "male",
      "nonbinary"
    ],
    "locationId": "rooftop",
    "themeColor": "#38bdf8",
    "ecgType": "flat_calm",
    "tagline": "「你可以在那邊看書。我把不擋燈的位置留給你。」",
    "avatar": {
      "skin": "#f8fafc",
      "hairColor": "#0f172a",
      "hairStyle": "long_straight",
      "eyeColor": "#0284c7",
      "outfitColor": "#334155",
      "accentColor": "#38bdf8",
      "accessory": "pocketwatch"
    }
  },
  "ruri": {
    "id": "ruri",
    "number": "03",
    "name": "星野 琉璃",
    "enName": "Iris",
    "age": 23,
    "occupation": "古著店主／占星與聲音藝術創作者",
    "cluster": "A",
    "dsmCode": "F21",
    "dsmTitle": "思覺失調型人格障礙症",
    "dsmTitleEn": "Schizotypal Personality Disorder",
    "sex": "female",
    "genderLabel": "生理女／非二元流動性別 (Genderfluid)",
    "pronoun": "她／祂",
    "orientation": "pansexual",
    "orientationLabel": "泛性戀 (Pansexual)",
    "romanticGenders": [
      "female",
      "male",
      "nonbinary"
    ],
    "locationId": "atelier",
    "themeColor": "#c084fc",
    "ecgType": "mystic_wave",
    "tagline": "「這句是在寫詩。真正讓我害怕的部分，我想慢慢說清楚。」",
    "avatar": {
      "skin": "#fef3c7",
      "hairColor": "#581c87",
      "hairStyle": "wavy_twin",
      "eyeColor": "#9333ea",
      "outfitColor": "#3b0764",
      "accentColor": "#c084fc",
      "accessory": "tarot"
    }
  },
  "han_xiao": {
    "id": "han_xiao",
    "number": "04",
    "name": "韓梟",
    "enName": "Logan",
    "age": 28,
    "occupation": "地下酒吧調酒師／重機賽車手",
    "cluster": "B",
    "dsmCode": "F60.2",
    "dsmTitle": "反社會型人格障礙症",
    "dsmTitleEn": "Antisocial Personality Disorder",
    "sex": "male",
    "genderLabel": "順性別男性 (Cis Male)",
    "pronoun": "他",
    "orientation": "pansexual",
    "orientationLabel": "泛性戀 (Pansexual)",
    "romanticGenders": [
      "female",
      "male",
      "nonbinary"
    ],
    "locationId": "lounge",
    "themeColor": "#ef4444",
    "ecgType": "thrill_seeker",
    "tagline": "「看穿一份合約不算贏，答應的責任還是要做到。」",
    "avatar": {
      "skin": "#e6c29f",
      "hairColor": "#111827",
      "hairStyle": "undercut",
      "eyeColor": "#dc2626",
      "outfitColor": "#450a0a",
      "accentColor": "#ef4444",
      "accessory": "shaker"
    }
  },
  "su_fei": {
    "id": "su_fei",
    "number": "05",
    "name": "蘇緋",
    "enName": "Ruby",
    "age": 22,
    "occupation": "新銳表現主義畫家／樂團主唱",
    "cluster": "B",
    "dsmCode": "F60.3",
    "dsmTitle": "邊緣型人格障礙症",
    "dsmTitleEn": "Borderline Personality Disorder",
    "sex": "female",
    "genderLabel": "順性別女性 (Cis Female)",
    "pronoun": "她",
    "orientation": "bisexual",
    "orientationLabel": "雙性戀 (Bisexual)",
    "romanticGenders": [
      "female",
      "male",
      "nonbinary"
    ],
    "locationId": "atelier",
    "themeColor": "#ec4899",
    "ecgType": "erratic_spike",
    "tagline": "「我還是會怕，但正在學著讓害怕之外也有選擇。」",
    "avatar": {
      "skin": "#fde8e8",
      "hairColor": "#be185d",
      "hairStyle": "twintails_wavy",
      "eyeColor": "#db2777",
      "outfitColor": "#500724",
      "accentColor": "#ec4899",
      "accessory": "plush_bunny"
    }
  },
  "xia_le": {
    "id": "xia_le",
    "number": "06",
    "name": "夏樂",
    "enName": "Julian",
    "age": 24,
    "occupation": "實驗劇場首席演員／時尚美妝 KOL",
    "cluster": "B",
    "dsmCode": "F60.4",
    "dsmTitle": "做作型人格障礙症",
    "dsmTitleEn": "Histrionic Personality Disorder",
    "sex": "male",
    "genderLabel": "順性別男性／華麗中性美學",
    "pronoun": "他",
    "orientation": "gay_flex",
    "orientationLabel": "多元流動／男同性戀傾向 (Queer / Gay)",
    "romanticGenders": [
      "male",
      "nonbinary"
    ],
    "locationId": "lounge",
    "themeColor": "#f97316",
    "ecgType": "dramatic_stage",
    "tagline": "「台上我想發光，台下也想聽你把一句話說完。」",
    "avatar": {
      "skin": "#ffedd5",
      "hairColor": "#fb923c",
      "hairStyle": "fluffy_idol",
      "eyeColor": "#ea580c",
      "outfitColor": "#431407",
      "accentColor": "#f97316",
      "accessory": "rose"
    }
  },
  "gu_qingcheng": {
    "id": "gu_qingcheng",
    "number": "07",
    "name": "顧傾城",
    "enName": "Vivian",
    "age": 30,
    "occupation": "國際建築師事務所最年輕合夥人",
    "cluster": "B",
    "dsmCode": "F60.81",
    "dsmTitle": "自戀型人格障礙症",
    "dsmTitleEn": "Narcissistic Personality Disorder",
    "sex": "female",
    "genderLabel": "順性別女性 (Cis Female)",
    "pronoun": "她",
    "orientation": "lesbian_flex",
    "orientationLabel": "多元流動／女同性戀傾向 (Queer / Lesbian)",
    "romanticGenders": [
      "female",
      "nonbinary"
    ],
    "locationId": "studio",
    "themeColor": "#eab308",
    "ecgType": "proud_pulse",
    "tagline": "「這張圖有我的想法，也該留著每個一起畫它的名字。」",
    "avatar": {
      "skin": "#fefce8",
      "hairColor": "#1c1917",
      "hairStyle": "queen_updo",
      "eyeColor": "#ca8a04",
      "outfitColor": "#422006",
      "accentColor": "#eab308",
      "accessory": "blueprint"
    }
  },
  "wen_yan": {
    "id": "wen_yan",
    "number": "08",
    "name": "溫言",
    "enName": "Elliot",
    "age": 26,
    "occupation": "大學古籍修復師／文學譯者",
    "cluster": "C",
    "dsmCode": "F60.6",
    "dsmTitle": "畏避型人格障礙症",
    "dsmTitleEn": "Avoidant Personality Disorder",
    "sex": "male",
    "genderLabel": "順性別男性 (Cis Male)",
    "pronoun": "他",
    "orientation": "hetero_bi",
    "orientationLabel": "異性戀／雙性浪漫傾向 (Bi-romantic)",
    "romanticGenders": [
      "female",
      "male",
      "nonbinary"
    ],
    "locationId": "archive",
    "themeColor": "#10b981",
    "ecgType": "anxious_flutter",
    "tagline": "「我想去，只是還有點怕。這次我想自己選第一步。」",
    "avatar": {
      "skin": "#f1f5f9",
      "hairColor": "#3f3f46",
      "hairStyle": "soft_bangs",
      "eyeColor": "#059669",
      "outfitColor": "#064e3b",
      "accentColor": "#10b981",
      "accessory": "glasses_book"
    }
  },
  "bai_xiaolu": {
    "id": "bai_xiaolu",
    "number": "09",
    "name": "白小鹿",
    "enName": "Lily",
    "age": 21,
    "occupation": "甜點屋學徒／花藝助手",
    "cluster": "C",
    "dsmCode": "F60.7",
    "dsmTitle": "依賴型人格障礙症",
    "dsmTitleEn": "Dependent Personality Disorder",
    "sex": "female",
    "genderLabel": "順性別女性 (Cis Female)",
    "pronoun": "她",
    "orientation": "bisexual",
    "orientationLabel": "雙性戀 (Bisexual)",
    "romanticGenders": [
      "female",
      "male",
      "nonbinary"
    ],
    "locationId": "cafe",
    "themeColor": "#f472b6",
    "ecgType": "clinging_beat",
    "tagline": "「這個配方我很熟。其他大事，我也想慢慢學著自己選。」",
    "avatar": {
      "skin": "#fff1f2",
      "hairColor": "#9d174d",
      "hairStyle": "braid_soft",
      "eyeColor": "#e11d48",
      "outfitColor": "#500724",
      "accentColor": "#f472b6",
      "accessory": "flower_apron"
    }
  },
  "ji_yan": {
    "id": "ji_yan",
    "number": "10",
    "name": "紀嚴",
    "enName": "Vincent",
    "age": 29,
    "occupation": "法醫病理學家／業餘古典鋼琴家",
    "cluster": "C",
    "dsmCode": "F60.5",
    "dsmTitle": "強迫型人格障礙症",
    "dsmTitleEn": "Obsessive-Compulsive Personality Disorder (OCPD)",
    "sex": "male",
    "genderLabel": "順性別男性 (Cis Male)",
    "pronoun": "他",
    "orientation": "hetero_flex",
    "orientationLabel": "雙性浪漫／異性戀傾向 (Bi-romantic)",
    "romanticGenders": [
      "female"
    ],
    "locationId": "archive",
    "themeColor": "#14b8a6",
    "ecgType": "metronome",
    "tagline": "「我重視準確，也想替不在計畫裡的事留點空間。」",
    "avatar": {
      "skin": "#f8fafc",
      "hairColor": "#0f172a",
      "hairStyle": "parted_neat",
      "eyeColor": "#0d9488",
      "outfitColor": "#134e4a",
      "accentColor": "#14b8a6",
      "accessory": "metronome_list"
    }
  },
  "lu_qinglan": {
    "id": "lu_qinglan",
    "number": "11",
    "name": "陸晴嵐",
    "enName": "Audrey",
    "age": 38,
    "occupation": "前神經外科主治醫師／現職「金繼」陶藝家",
    "cluster": "OTHER",
    "dsmCode": "F07.0",
    "dsmTitle": "另一身體病況引起的人格改變",
    "dsmTitleEn": "Personality Change Due to Another Medical Condition",
    "sex": "female",
    "genderLabel": "順性別女性 (Cis Female)",
    "pronoun": "她",
    "orientation": "pansexual",
    "orientationLabel": "泛性戀 (Pansexual)",
    "romanticGenders": [
      "female",
      "male",
      "nonbinary"
    ],
    "locationId": "atelier",
    "themeColor": "#f59e0b",
    "ecgType": "irregular_rebirth",
    "tagline": "「過去和現在都是我。今天需要怎麼幫忙，由我告訴你。」",
    "avatar": {
      "skin": "#fef3c7",
      "hairColor": "#78350f",
      "hairStyle": "short_bob_scar",
      "eyeColor": "#d97706",
      "outfitColor": "#451a03",
      "accentColor": "#f59e0b",
      "accessory": "kintsugi"
    }
  },
  "you_ziqian": {
    "id": "you_ziqian",
    "number": "12",
    "name": "游子謙",
    "enName": "Oliver",
    "age": 26,
    "occupation": "咖啡廳店長／自由平面設計師",
    "cluster": "OTHER",
    "dsmCode": "F60.89",
    "dsmTitle": "其他特定的人格障礙症（混合型人格特質／被動攻擊特徵）",
    "dsmTitleEn": "Other Specified Personality Disorder (Mixed / Passive-Aggressive Features)",
    "sex": "male",
    "genderLabel": "順性別男性 (Cis Male)",
    "pronoun": "他",
    "orientation": "gay_bi",
    "orientationLabel": "男同性戀／雙性戀 (Gay / Bisexual)",
    "romanticGenders": [
      "male",
      "nonbinary",
      "female"
    ],
    "locationId": "cafe",
    "themeColor": "#a855f7",
    "ecgType": "masked_wave",
    "tagline": "「這次我不說都可以。我有想法，想直接告訴你。」",
    "avatar": {
      "skin": "#f3e8ff",
      "hairColor": "#4c1d95",
      "hairStyle": "gentle_wave",
      "eyeColor": "#7e22ce",
      "outfitColor": "#2e1065",
      "accentColor": "#a855f7",
      "accessory": "coffee_pot"
    }
  }
};
export const CHARACTERS = Object.values(IDENTITIES).map(identity => {
  const r = STORY_ROUTES[identity.id];
  const ref = DSM_REFERENCE[identity.dsmCode];
  const rows = identity.dsmCode === 'F60.89' ? [...DSM_REFERENCE.GENERAL.criteria, ...ref.criteria.map((text,i) => 'R'+(i+1)+'. '+text)] : [...ref.criteria, ...(ref.extraCriteria || [])];
  const events = buildRouteEvents(identity.id);
  const criteria = rows.map((text, i) => {
    const prefix = text.match(/^([A-Z]\d*|\d+)\./)?.[1];
    let key = /^\d+$/.test(prefix || '') ? 'A'+prefix : prefix || 'R'+(i+1);
    if (identity.dsmCode === 'F60.89' && !key.startsWith('R')) key = 'G'+key;
    const id = identity.dsmCode+'-'+key;
    const ev = events.find(e => e.unlockCriteria?.includes(id) || e.candidateCriteria?.includes(id));
    return { id, code: '參照 '+key, stage: 'reference', evidenceStatus: ev?.candidateCriteria?.includes(id)?'uncertain':'discuss', title: text.replace(/^[A-Z0-9]+\.\s*/, ''), desc: text, targetEvent: ev?.code || '本案例未直接呈現', behavioralAnchor: ev ? {eventCode: ev.code, eventTitle: ev.title, quote: ev.nodes.find(n=>n.speaker==='char').text, behavior: ev.studySummary.points[0]} : null };
  });
  return { ...identity, shortBio: r.bio, clinicalOverview: ref.intro+' 症狀項數之外仍需病程、文化、功能與排除評估；作者案例說明不等於玩家確診。', differentialNote: r.differential, strategyHint: '詢問對方與自己的需要；支持、拒絕和暫停都可協商。不以伴侶身分代替專業評估與治療。', initialStats: {affection:8,security:8,boundary:42}, minThreshold: ({'F60.0':4,'F60.1':4,'F21':5,'F60.2':3,'F60.3':5,'F60.4':5,'F60.81':5,'F60.6':4,'F60.7':5,'F60.5':4})[identity.dsmCode] || 0, thresholdLabel: identity.cluster === 'OTHER' ? '此類另有適用條件，不能靠項數判定。' : ref.lead+' 此為教材參考，非集點診斷。', criteria, specifiers: identity.id === 'lu_qinglan' ? [{id:'F07.0-TYPES',code:'正式註明類型',title:'合併型：易變型與去抑制型',desc:'作者案例的醫療評估設定；F07.0 可依主要表現註明類型，需與動作、認知與不自主情感表達分開評估。',behavioralAnchor:{eventCode:'E12',eventTitle:events[11].title,quote:events[11].nodes[1].text,behavior:events[11].studySummary.points[0]}}] : [], comorbidities: [] };
});
