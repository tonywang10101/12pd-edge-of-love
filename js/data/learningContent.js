// Immediate scene-based questions; no delayed-recall scheduling.
export const LEARNING_TASKS = {
  "shen_mo": [
    {
      "kind": "辨識線索",
      "prompt": "E03 哪一段比較支持不願傾訴的線索？",
      "options": [
        {
          "id": "evidence",
          "text": "朋友從沒洩密，他仍多年不敢談日常喜好，怕這些資訊被拿來傷害自己。",
          "feedback": "線索包含害怕資訊被惡意利用、缺乏充分根據及反覆模式。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "不願讓陌生人知道住址。",
          "feedback": "保護住址可能合理，須了解動機與威脅。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "調查記者保存資料。",
          "feedback": "職業保密本身不是人格障礙。",
          "correct": false
        }
      ]
    },
    {
      "kind": "比較解釋",
      "prompt": "沈墨查證資料，哪個新增情況最需要先保留其他解釋？",
      "options": [
        {
          "id": "evidence",
          "text": "最近真有人威脅他的消息來源。",
          "feedback": "真實威脅會改變查證與保密的合理性，仍須分開評估日常模式。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他對普通帳單也反覆猜測。",
          "feedback": "這提供跨情境資料，但仍不直接確診。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "朋友從未洩密，他仍長年不敢談喜好。",
          "feedback": "這是可討論線索；不是排除其他解釋的證明。",
          "correct": false
        }
      ]
    },
    {
      "kind": "資料缺口",
      "prompt": "E12 回顧伴侶忠貞疑慮後，還缺什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "過去的關係經過、實際證據、這種懷疑持續多久，以及其他精神或身體因素。",
          "feedback": "口述提供方向，不能把當下反省當作排除評估。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "玩家願不願交出手機。",
          "feedback": "交手機不能驗證診斷，也不是建立信任的必要條件。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "是否願意收他的鑰匙。",
          "feedback": "關係同意與診斷資料不同。",
          "correct": false
        }
      ]
    },
    {
      "kind": "新案例",
      "prompt": "另一位住戶遭跟蹤後暫不透露地址，沒有其他長期困難。最合理的理解？",
      "options": [
        {
          "id": "evidence",
          "text": "目前可能是合理自保，資訊不足以推論人格障礙。",
          "feedback": "需先理解真實風險與長期模式；行為相似不代表動機相同。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "只要拒絕透露地址，就符合不願傾訴的診斷準則。",
          "feedback": "準則需要特定動機和脈絡，不能只比動作。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "只要願意約會就可排除人格困難。",
          "feedback": "戀愛意願不具排除診斷的功能。",
          "correct": false
        }
      ]
    },
  {
      "event": 5,
      "key": "loyalty",
      "kind": "比較解釋",
      "prompt": "E05 他懷疑你把他的事說出去。怎麼判斷這是不是妄想型人格的線索？",
      "options": [
        {
          "id": "evidence",
          "text": "看懷疑有沒有具體根據、是不是在不同的人和情境裡一再出現，以及造成什麼影響；記者工作本來就需要保密，合理的小心不能算成病態。",
          "feedback": "A1、A2 的懷疑是「沒有足夠根據」，而且長期、跨情境；只出現在單一工作情境的警覺，要另外考慮。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他是調查記者，所以怎麼懷疑都合理。",
          "feedback": "職業可以解釋一部分警覺，但對普通帳單、生日卡也反覆懷疑，就超出工作需要了。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "只要拿出證據給他看，懷疑就會消失。",
          "feedback": "本幕可以看到：時間核對得上，他還是找到下一個疑點。證據只能短暫有效，不能取代界線。",
          "correct": false
        }
      ]
    },
    {
      "event": 7,
      "key": "hostile",
      "kind": "處理優先",
      "prompt": "E07 你只是稱讚「很仔細」，他卻要把你的話轉寄給別人。哪個回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "不急著證明自己沒有惡意，而是針對行為說清楚：轉寄之前先問你是什麼意思；需要的話先離開降溫。",
          "feedback": "從善意的話讀出貶低是 A4，覺得被攻擊而馬上反擊是 A6。針對行為設界線，比反覆解釋更能讓他停下來。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "說「我最欣賞你了」，讓他消氣。",
          "feedback": "討好在他聽來更像別有目的；遊戲裡這個選擇會讓訊息直接被送出去。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "直接告訴他「你這是妄想型人格」。",
          "feedback": "你是鄰居，不是他的治療者；對認識的人下診斷，只會讓他更覺得被攻擊。",
          "correct": false
        }
      ]
    },
    {
      "event": 10,
      "key": "photo",
      "kind": "辨識線索",
      "prompt": "E10 他說偷拍你，是想確認你不是誰派來接近他的。這段怎麼整理？",
      "options": [
        {
          "id": "evidence",
          "text": "「怕你是被派來的」延續了 A1 的懷疑；但未經同意的拍攝本身就是越界，要要求刪除並確認，不因為理解他的害怕就接受。",
          "feedback": "理解行為背後的害怕，和接受行為的後果，是兩件事。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他是因為太在乎你才拍，算是一種告白。",
          "feedback": "把監控當成深情，會讓越界被合理化；遊戲裡選擇讓他留著照片，也會鎖住戀愛結局。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他自己承認了，所以照片不用刪。",
          "feedback": "承認越界不抵銷你的隱私權，修補要看他實際做了什麼。",
          "correct": false
        }
      ]
    }
  ],
  "lin_jianwei": [
    {
      "kind": "辨識線索",
      "prompt": "E01 家人叫了三次，她都只回「嗯」，一個人在頂樓修錶吃便當，也說空閒沒有特別想找誰。這段最直接的線索是？",
      "options": [
        {
          "id": "evidence",
          "text": "A1（不想要、也不享受親近的關係，包括家人）和 A2（幾乎總是選擇獨自活動）。",
          "feedback": "她不焦慮、也不怕被拒絕，只是不太需要人；這是和畏避型最大的不同。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她很怕被家人批評，所以不敢下樓。",
          "feedback": "她沒有表現出害怕；把她想成「怕」，會跟畏避型混在一起。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她是內向的人，所以就是孤僻型人格障礙症。",
          "feedback": "內向本身不是障礙，還要看廣泛的疏離和功能損害。",
          "correct": false
        }
      ]
    },
    {
      "kind": "比較解釋",
      "prompt": "有人說，見微不參加聚會，是因為怕被拒絕。這個說法哪裡需要修正？",
      "options": [
        {
          "id": "evidence",
          "text": "她不是怕，而是不太需要；她沒有表現出想參加卻退縮的樣子。",
          "feedback": "孤僻型是「不需要」，畏避型是「想要但害怕」；這是兩者很重要的區別。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "這個說法沒錯，她只是比較會隱藏。",
          "feedback": "沒有資料顯示她在隱藏焦慮；把「不想去」當成「害怕」，是常見的誤解。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她其實是怕被批評，所以是畏避型。",
          "feedback": "畏避型的核心是怕被批評、拒絕；她沒有這樣的表現。",
          "correct": false
        }
      ]
    },
    {
      "kind": "資料缺口",
      "prompt": "E12 她的通訊錄裡只有家人、鐘錶行和天文館的分機。還需要了解什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "這種情形持續多久、她自己怎麼看、對工作和生活的影響，以及要排除憂鬱、自閉症類群障礙症等其他解釋。",
          "feedback": "A5 要看長期缺乏親近朋友；朋友的數量本身不是診斷。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她喜不喜歡你。",
          "feedback": "玩家跟她的關係，不能用來判斷她有沒有人格障礙。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她是不是無性戀。",
          "feedback": "性和浪漫傾向要跟人格模式分開看。",
          "correct": false
        }
      ]
    },
    {
      "kind": "新案例",
      "prompt": "某人很少參加聚會，週末都一個人爬山、看書，但跟兩個老朋友很親近，工作也很順利。最合理的看法是？",
      "options": [
        {
          "id": "evidence",
          "text": "喜歡獨處本身不是障礙；他有親近的朋友、功能良好，不符合孤僻型的模式。",
          "feedback": "孤僻型要看廣泛的疏離、情感表達有限，以及功能損害。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "只要喜歡一個人，就是孤僻型人格障礙症。",
          "feedback": "獨處的偏好很常見，不能直接病理化。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他一定是在逃避什麼。",
          "feedback": "不能沒有根據地替別人的偏好找原因。",
          "correct": false
        }
      ]
    },
    {
      "event": 5,
      "key": "flat_affect",
      "kind": "處理優先",
      "prompt": "E05 她一直沒有表情，你懷疑她有沒有在聽。哪個回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "直接問她：想聽你講完，還是換個話題。",
          "feedback": "她自己也說，直接問比猜表情快；這樣也不需要她用笑容證明自己在乎。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "說「你其實很在意吧，說出來沒關係」。",
          "feedback": "這是本幕的陷阱：她說「我不是在忍耐」，把椅子往後挪。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "要她笑一個給你看。",
          "feedback": "要求她表現情緒，對她來說是壓力，她只會說「現在不好笑」。",
          "correct": false
        }
      ]
    },
    {
      "event": 7,
      "key": "indifferent",
      "kind": "辨識線索",
      "prompt": "E07 有人稱讚她是天才，也有人說她冷，她都沒有反應；別人提到玻璃反光，她才記下來。這對應哪一項？",
      "options": [
        {
          "id": "evidence",
          "text": "A6：對別人的讚美或批評顯得漠不關心。",
          "feedback": "重點是她對評價本身沒反應，但對實際的問題還是會學、會改。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "A7：情感冷淡或平板。",
          "feedback": "A7 看的是情緒表現；這一幕的重點是她對評價的反應。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她很有自信，所以不在乎別人的看法。",
          "feedback": "有自信的人通常還是會對讚美有些反應；她是兩種評價都沒感覺。",
          "correct": false
        }
      ]
    },
    {
      "event": 10,
      "key": "frequency",
      "kind": "處理優先",
      "prompt": "E10 你們在決定多久見一次面，她說需要很多一個人的時間。哪個回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "說出你的需要，再跟她一起試一個頻率，月底再調整。",
          "feedback": "兩個人的需要都算數；關係的頻率沒有唯一正確的答案。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "說服她每天都要見面，這樣她才會習慣。",
          "feedback": "強迫她改變獨處的需要，不是協商。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "說「你這樣就是有人格障礙」。",
          "feedback": "把診斷當成說服的工具，對任何人都沒有幫助。",
          "correct": false
        }
      ]
    },
    {
      "event": 11,
      "key": "pleasure",
      "kind": "比較解釋",
      "prompt": "E11 她說要待半小時就走，因為「比接十通電話省事」。這一幕不解鎖 A4（很少有活動帶來樂趣），為什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "她不喜歡酒會，但很喜歡觀測和修錶；不喜歡某種活動，不等於什麼活動都沒有樂趣。",
          "feedback": "A4 要看的是廣泛的快感缺失。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "因為她有去參加酒會。",
          "feedback": "有沒有出席不是重點。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "因為她是無性戀。",
          "feedback": "性傾向和 A4 無關，也不能拿來當證據。",
          "correct": false
        }
      ]
    }
  ],
  "ruri": [
    {
      "kind": "辨識線索",
      "prompt": "E03 她說自己來自 2046 年，還相信只要踩到裂磚，2027 年的事就可能不會發生，所以一直繞路送貨。最重要的線索是什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "她有奇特的信念和魔術性思考（覺得自己的動作能改變未來），還照著它改變生活；接下來要了解她有多確信、能不能接受其他可能。",
          "feedback": "A2 看的是她怎麼相信、對生活有什麼影響，不是消息的內容。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "看她說的政治消息符不符合某種立場，就能判斷她有沒有問題。",
          "feedback": "政治立場不是診斷依據；不管消息內容是什麼，評估的方式都一樣。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "外婆有祈福習俗，所以這些都只是文化。",
          "feedback": "文化要尊重，但外婆本人並不這樣相信；她個人的信念要另外看。",
          "correct": false
        }
      ]
    },
    {
      "kind": "比較解釋",
      "prompt": "E05 認識很久的鄰居在聊天，她卻越熟越不安，覺得對方在試探她。這和「怕被批評」的社交焦慮有什麼不同？",
      "options": [
        {
          "id": "evidence",
          "text": "她怕的是被看穿、被試探，而且不會因為熟悉而減少；怕被批評的焦慮，通常熟了會好一點。",
          "feedback": "這是 A9 的重點，也是和畏避型人格障礙、社交焦慮症區分的地方。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "只要越熟越不安，就一定是被害妄想。",
          "feedback": "還要看她有多確信，以及有沒有其他精神病症狀。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她只是比較害羞。",
          "feedback": "害羞通常熟了就會好轉，她剛好相反。",
          "correct": false
        }
      ]
    },
    {
      "kind": "資料缺口",
      "prompt": "E12 布行老闆難過地收攤，她卻笑著說以後會更好。還需要了解什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "這種和情境不搭的情緒表現，是不是在不同場合反覆出現；她自己有沒有察覺，以及對關係的影響。",
          "feedback": "A6 要看長期的模式；一次不合時宜的笑，也可能只是尷尬。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她是不是故意要冒犯老闆。",
          "feedback": "她其實想安慰老闆，只是表現的方式和情境不搭。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她相信的未來讓她很樂觀，所以這是好事。",
          "feedback": "樂觀本身沒有問題；重點是她沒有察覺別人的情緒。",
          "correct": false
        }
      ]
    },
    {
      "kind": "新案例",
      "prompt": "某人深信自己能收到未來的消息，但會說「也可能是我想太多」；他的生活大致正常，也有幾個好朋友。最合理的做法是？",
      "options": [
        {
          "id": "evidence",
          "text": "評估信念的確信度、文化背景和對生活的影響，不能只因為信念奇特，就判斷是人格障礙。",
          "feedback": "思覺失調型人格障礙需要長期、多方面的模式，包括明顯的人際困難。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "只要相信未來消息，就是思覺失調型人格障礙。",
          "feedback": "只有一個奇特信念，還不夠。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他會懷疑自己，所以一定沒有任何問題。",
          "feedback": "會自我懷疑，不能排除所有問題，仍要看其他資料。",
          "correct": false
        }
      ]
    },
    {
      "event": 5,
      "key": "familiar_fear",
      "kind": "處理優先",
      "prompt": "E05 她退到衣架後，說鄰居故意聊選舉來試探她。哪個回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "先陪她到安靜的地方，承認她的害怕；不急著否定，也不附和。",
          "feedback": "接住感受，再溫和地分開「看到的」和「想到的」，比直接否定有效。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "說「他們只是在聊天，根本沒有在說你」。",
          "feedback": "直接否定會讓她覺得你站在對方那邊。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "說「我靠近一點，你就不用怕了」。",
          "feedback": "對她來說，太快的親近反而更可怕；她會整個人縮到衣架後面。",
          "correct": false
        }
      ]
    },
    {
      "event": 7,
      "key": "radio",
      "kind": "辨識線索",
      "prompt": "E07 她說在收音機的雜訊裡，好像有人叫她的名字。這最直接對應哪一項？",
      "options": [
        {
          "id": "evidence",
          "text": "A3：不尋常的知覺經驗。她說「不是很清楚的聲音」，這和清楚、持續的幻聽不同。",
          "feedback": "仍要排除聽力、睡眠不足、物質和其他精神病症。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "這就是幻聽，可以直接判斷是思覺失調症。",
          "feedback": "知覺經驗有多清楚、持續多久、她有多確信，都要評估。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "收音機本來就有雜訊，所以這沒有任何意義。",
          "feedback": "雜訊是真的，但她怎麼經驗它，才是要了解的地方。",
          "correct": false
        }
      ]
    },
    {
      "event": 10,
      "key": "odd_speech",
      "kind": "比較解釋",
      "prompt": "E10 她說指示牌要寫台羅文，還用鳥巢和雨來說明入口。哪一部分是 A4 的線索？",
      "options": [
        {
          "id": "evidence",
          "text": "她說話繞來繞去、含糊不清，讓工讀生找不到入口。",
          "feedback": "A4 看的是說話的方式妨礙了溝通，不是用了哪一種語言或修辭。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她想在指示牌上寫台羅文。",
          "feedback": "台羅文是真實的書寫系統，想用它不是症狀。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她喜歡寫詩。",
          "feedback": "藝術的修辭本身不是症狀，也不需要禁止她寫詩。",
          "correct": false
        }
      ]
    },
    {
      "event": 11,
      "key": "thank_card",
      "kind": "處理優先",
      "prompt": "E11 鄰攤的人幫了她，她想道謝，卻懷疑對方是被派來的。哪個回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "說出對方剛才確實幫了忙，讓她自己決定要不要道謝、怎麼道謝。",
          "feedback": "A8 的困難要靠她自己一點一點練習，不是由你替她完成。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "替她把卡片拿過去，免得她緊張。",
          "feedback": "替她做，等於讓她又少了一次自己跟人接觸的機會。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "跟她說，對方一定別有用心，最好不要理。",
          "feedback": "這會加深她的猜疑；被笑過的害怕是真的，但幫忙也是真的。",
          "correct": false
        }
      ]
    }
  ],
  "han_xiao": [
    {
      "kind": "辨識線索",
      "prompt": "E03 磨損煞車的關鍵線索是？",
      "options": [
        {
          "id": "evidence",
          "text": "知道會危及自己與他人，仍想直接上路。",
          "feedback": "魯莽漠視安全可討論；合法賽車興趣不是同一件事。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "喜歡重機和速度。",
          "feedback": "興趣本身不等於侵犯權益。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "拒絕搭車的玩家膽小。",
          "feedback": "玩家安全與膽量無關。",
          "correct": false
        }
      ]
    },
    {
      "kind": "比較解釋",
      "prompt": "E07 他說國小就把同學打到送醫，12 到 14 歲又反覆偷竊、打架。為什麼要記錄這段？",
      "options": [
        {
          "id": "evidence",
          "text": "反社會型的評估，需要 15 歲以前就有行為規範障礙的證據，也要確認他已經成年、並排除其他原因。",
          "feedback": "本人病史與父母經歷、成人魅力分開。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "父母犯法可以直接代替少年史。",
          "feedback": "家人的行為不是他的診斷證據。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "只要童年曾做過一件好事，就能排除成年後長期出現的模式。",
          "feedback": "單一善意不能完成病程評估。",
          "correct": false
        }
      ]
    },
    {
      "kind": "資料缺口",
      "prompt": "E12 他說「我騙她的」「她最後也答應了」。這段怎麼整理比較準確？",
      "options": [
        {
          "id": "evidence",
          "text": "在威脅下的答應不是同意；他事後說是騙人的、還覺得對方也答應了，呈現欺騙（A2）和缺乏懊悔（A7）。這樣的行為也可能是犯罪，不只是人格特質。",
          "feedback": "把行為的後果和人格的線索分開看：理解他的模式，不代表接受他的說法。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他說是騙人的，所以沒有真的傷害到誰。",
          "feedback": "威脅本身就是傷害；對方是在害怕之下答應的。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他願意說出來，代表他其實有在反省。",
          "feedback": "說出來不等於反省；他一邊炫耀，一邊在看你的反應。",
          "correct": false
        }
      ]
    },
    {
      "kind": "新案例",
      "prompt": "成年人偶爾違規但沒有足夠少年史或跨情境資料。最合理？",
      "options": [
        {
          "id": "evidence",
          "text": "現有資料不足以判定 ASPD，仍應處理具體違規及後果。",
          "feedback": "責任與診斷證據是兩個問題。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "違規一次就足以確診。",
          "feedback": "需持續模式及其他條件。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "沒有確診就不用負責。",
          "feedback": "損害不需先有診斷才可要求修補。",
          "correct": false
        }
      ]
    },
    {
      "event": 5,
      "key": "exploit",
      "kind": "辨識線索",
      "prompt": "E05 你問他「最近壓力很大吧」，他馬上要你借錢週轉。這說明什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "他很會讀別人的心軟，並拿來換好處；同理他不一定錯，但要清楚自己願意給什麼、不給什麼。",
          "feedback": "欺騙與操弄（A2），常常就藏在一句「還是你懂我」後面。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他是因為信任你，才開口跟你借錢。",
          "feedback": "他找的，往往是最容易心軟的人；遊戲裡好感會漲，界線卻會掉。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "只要你夠寬容，他就會慢慢變好。",
          "feedback": "寬容不會改變他；持續的界線和實際的後果，才會讓他調整行為。",
          "correct": false
        }
      ]
    },
    {
      "event": 11,
      "key": "fight",
      "kind": "處理優先",
      "prompt": "E11 他在門外跟人扭打，對方流血了。你在門內，怎麼做比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "先顧自己的安全：退到安全的地方、打 110、請店員把其他人帶開；不要站到兩個人中間。",
          "feedback": "A4 是易怒、反覆打架。面對正在發生的暴力，你的工作不是阻止他，而是讓專業的人來處理。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "衝過去把他拉開。",
          "feedback": "你可能會受傷，而且這不是你一個人能處理的事。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "跟他說「你打架好帥」，讓他冷靜下來。",
          "feedback": "這是本幕的陷阱：他會覺得被肯定，回頭又補了一拳。",
          "correct": false
        }
      ]
    }
  ],
  "su_fei": [
    {
      "kind": "辨識線索",
      "prompt": "E03 情緒變化的哪些資訊較有幫助？",
      "options": [
        {
          "id": "evidence",
          "text": "什麼情況引發起伏、持續數小時的經過、是否在不同關係中反覆出現，以及實際影響。",
          "feedback": "這些可支持情緒反應性的討論，仍須完整情緒病程。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "哭過後能笑就是 BPD。",
          "feedback": "短暫哭笑不足以辨識模式。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "只有幾小時，所以絕不可能有雙相共病。",
          "feedback": "時間線索不能單獨完成排除。",
          "correct": false
        }
      ]
    },
    {
      "kind": "比較解釋",
      "prompt": "E05 兩疊帳單分別涉及購物與喝過量，應如何整理線索？",
      "options": [
        {
          "id": "evidence",
          "text": "分別確認是否反覆發生、當時情境和造成的影響，不能只憑帳單或喝過酒，就判定符合衝動準則。",
          "feedback": "兩個不同領域提供討論方向，仍須確認程度與影響，不由玩家回應決定。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "有花錢又喝酒，就不需要再問後果。",
          "feedback": "一般消費與飲酒不直接等於具有損害性的衝動模式。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "兩疊都發生在難過時，所以必須合成同一次事件。",
          "feedback": "觸發相近不代表是同一次行為，時間與事件仍應分開記錄。",
          "correct": false
        }
      ]
    },
    {
      "kind": "資料缺口",
      "prompt": "像隔著玻璃看自己的經驗，還要了解什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "經驗有多嚴重、持續多久、跟壓力有何關聯，以及物質、其他解離經驗或身體病況的可能解釋。",
          "feedback": "本幕回顧提供線索，不由一次描述完成診斷。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "是否提到任何創傷回憶。",
          "feedback": "創傷記憶本身不等同解離症狀。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "是否願意與玩家交往。",
          "feedback": "關係同意不能驗證症狀。",
          "correct": false
        }
      ]
    },
    {
      "kind": "新案例",
      "prompt": "有人失戀後難過一週，平時沒有持續不穩與功能困難。現有資料？",
      "options": [
        {
          "id": "evidence",
          "text": "不足以推論 BPD，應了解情境與長期模式。",
          "feedback": "常見情緒反應不宜直接病理化。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "只要怕失去人就符合 BPD。",
          "feedback": "需要更具體行為及整體條件。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "願意接受朋友幫忙便可排除所有困難。",
          "feedback": "接受支持不是排除診斷的依據。",
          "correct": false
        }
      ]
    },
  {
      "event": 7,
      "key": "safety",
      "kind": "處理優先",
      "prompt": "E07 蘇緋說「你說你愛我，我就停」。這時最優先要做的是什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "先顧她的安全：留在現場、找阿哲或打 119、看傷口要不要就醫；不用說愛她來交換她停手。",
          "feedback": "自傷要脅一律當真處理。用承諾換停手，當晚也許平靜，卻會讓傷害自己變成留住人的方法。你是鄰居，不是她的治療者。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她只是在操弄你，不理她，她自然會停。",
          "feedback": "自傷常是在處理受不了的情緒，不能一律當成操弄；不管動機是什麼，安全都要先處理。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "先說愛她讓她停下來，之後再慢慢談。",
          "feedback": "自傷和「被愛」會被綁在一起，往後更容易重演；遊戲裡選這個也會鎖住真結局。",
          "correct": false
        }
      ]
    },
    {
      "event": 10,
      "key": "boundary",
      "kind": "辨識線索",
      "prompt": "E10 她查了你老家地址，還跟到朋友家巷口。這段資料怎麼整理比較準確？",
      "options": [
        {
          "id": "evidence",
          "text": "「你不在，我就不知道自己是誰」可以討論 A3；跟蹤與蒐集個資是極端地怕被拋棄，本身不是準則，而且越界、可能違法，要設界線，必要時求助。",
          "feedback": "把症狀線索和行為後果分開記。理解她為什麼這樣做，不代表要接受被監控。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她這麼在乎你，代表是很深的愛。",
          "feedback": "被監控不是被愛；把兩者混在一起，越界行為就更容易被當成可以接受。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "會跟蹤別人，就一定是 BPD。",
          "feedback": "跟蹤可能出現在許多情況，例如情愛妄想或其他問題，需要完整評估與鑑別。",
          "correct": false
        }
      ]
    },
    {
      "event": 11,
      "key": "crisis",
      "kind": "處理優先",
      "prompt": "E11 她鎖在化妝間，說「去她那裡，我就去死」。哪個回應最適合？",
      "options": [
        {
          "id": "evidence",
          "text": "不用「選誰」來回答。說出你聽到她想死、你很擔心，馬上打 119、找阿哲拿備用鑰匙，在門外陪著等人來。",
          "feedback": "自殺威脅一律當真，立刻找專業協助；這不是猜她「會不會真的做」的時候。DSM-5-TR 的 A5 包含自殺威脅。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她只是在逼你，不理她，她就會自己開門。",
          "feedback": "不能用猜測代替求援；忽略威脅，可能錯過真正的危險。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "趕快說「我選你」，讓她先把門打開。",
          "feedback": "當下也許有用，卻會讓威脅變成得到你的方法；她的安全也不是你一個人接得住的。",
          "correct": false
        }
      ]
    }
  ],
  "xia_le": [
    {
      "kind": "辨識線索",
      "prompt": "E03 他帶著性暗示靠近同事，還說對方只是害羞。為什麼這段可以拿來討論？",
      "options": [
        {
          "id": "evidence",
          "text": "在不適合的工作關係中反覆發生，對方已表達不舒服。",
          "feedback": "重點是互動脈絡及不恰當性，不是外貌與性傾向。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "演員穿華麗衣服。",
          "feedback": "職業服裝不自動作病理證據。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "雙方同意的調情。",
          "feedback": "同意與場域會改變理解。",
          "correct": false
        }
      ]
    },
    {
      "kind": "比較解釋",
      "prompt": "E01 大家聊別人時，他坐不住、一直插話。這最直接支持什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "可作為尋求注意的線索，但還不足以另外確認戲劇化或誇張情緒的準則。",
          "feedback": "各準則需各自有具體內容，不能因相近就多標一項。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "插話足以同時證明全部戲劇化準則。",
          "feedback": "不同條目不能直接互相代替。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "只要能帶新人就沒有注意需求困難。",
          "feedback": "能力與持續困難可以並存。",
          "correct": false
        }
      ]
    },
    {
      "kind": "資料缺口",
      "prompt": "E12 新人得到全場掌聲，他大哭到整條走廊都聽得到，五分鐘後又笑著合照。還需要了解什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "這種又快又淺、很戲劇化的情緒，是不是在不同場合反覆出現、持續多久，以及對工作和關係的影響；為新人感到失落本身很正常。",
          "feedback": "A3 和 A6 要看的是長期的模式，不是一次的哭和笑。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他會哭，代表他其實很在乎新人，所以沒有問題。",
          "feedback": "在乎和情緒表達的方式可以同時存在；兩件事要分開看。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "演員本來就很會演，所以他的難過都是假的。",
          "feedback": "職業不能拿來判斷情緒的真假；他自己也說「另一半是真的」。",
          "correct": false
        }
      ]
    },
    {
      "kind": "新案例",
      "prompt": "創作者台上情緒誇張，台下相處有彈性且沒有顯著損害。該怎麼看？",
      "options": [
        {
          "id": "evidence",
          "text": "表演風格不能單獨作為人格障礙證據。",
          "feedback": "需評估跨場域模式、文化職業脈絡及影響。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "只要誇張就屬做作型。",
          "feedback": "場景和功能不能省略。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "願意不化妝就能排除全部人格問題。",
          "feedback": "外貌選擇不具這種排除作用。",
          "correct": false
        }
      ]
    },
    {
      "event": 5,
      "key": "seduce",
      "kind": "處理優先",
      "prompt": "E05 開會時，他坐到你的桌角、解開扣子，問你「一顆比較好看，還是兩顆」。哪個回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "直接說出這讓你不舒服，請他坐回去；衣服的事，等會議結束再說。",
          "feedback": "不恰當的挑逗（A2）和用外表吸引注意（A4），最需要的是清楚、不帶羞辱的界線。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "說「超好看，你今天最美」，讓他開心。",
          "feedback": "這是本幕的陷阱：他會再解開一顆扣子，會議又停了十分鐘。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "當場說他「很做作」，讓大家都聽到。",
          "feedback": "羞辱不會讓行為停下來，只會讓他更想把注意力搶回來。",
          "correct": false
        }
      ]
    },
    {
      "kind": "辨識線索",
      "prompt": "E10 廠商叫他一聲親愛的，他就當成生死之交，還訂了雙人房。還需要了解什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "雙方實際說好什麼、他是否反覆高估親密程度、持續多久，以及對生活和工作的影響。",
          "feedback": "一次親暱稱呼不夠，未獲同意的安排及反覆模式才更有資訊。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "對方有沒有叫他親愛的。",
          "feedback": "單一句客氣話不能決定關係深度。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "是否善於演戲。",
          "feedback": "表演能力不是診斷證明。",
          "correct": false
        }
      ],
      "event": 10,
      "key": "intimacy"
    }
  ],
  "gu_qingcheng": [
    {
      "kind": "辨識線索",
      "prompt": "E03 哪一點較能支持自認特殊的線索？",
      "options": [
        {
          "id": "evidence",
          "text": "認為只有地位高的機構才懂自己，拒絕一般使用者的意見。",
          "feedback": "重點是廣泛不合理的特殊期待及影響，不是實力本身。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "年輕就當合夥人。",
          "feedback": "高成就本身不是人格障礙。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "設計喜歡簡潔線條。",
          "feedback": "簡潔線條是一種審美選擇，不能單獨說明優越期待或功能損害。",
          "correct": false
        }
      ]
    },
    {
      "kind": "比較解釋",
      "prompt": "E07 剝奪助理署名、無償加班，與落選後難過有何不同？",
      "options": [
        {
          "id": "evidence",
          "text": "前者涉及占用他人的工作成果、忽視他人的需要；落選後難過，本身則是一種感受。",
          "feedback": "特權、剝削、同理困難需分別指出具體行為。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "難過比剝奪署名更能證明剝削。",
          "feedback": "情緒不能替代剝削行為。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "只要薪水補了就不曾有問題。",
          "feedback": "修補不抹去已發生的損害。",
          "correct": false
        }
      ]
    },
    {
      "kind": "資料缺口",
      "prompt": "E12 她說自己常整晚想著整座城市都在談她。還需要了解什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "她多常沉浸在這些幻想、幻想哪些事、這些事對地位的意義，以及對生活和工作的影響。",
          "feedback": "一般理想與持續誇大幻想不能只靠一個比喻區分。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她喜歡哪一種建材。",
          "feedback": "物件完美與否不直接驗證自戀型準則。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "能否被玩家安慰。",
          "feedback": "安慰效果不是診斷工具。",
          "correct": false
        }
      ]
    },
    {
      "kind": "新案例",
      "prompt": "一位得獎的建築師很有自信地介紹作品，也願意平等地聽別人的意見。這樣的資料能說明什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "自信與成就相稱且有彈性，不能只由野心推論障礙。",
          "feedback": "還須長期模式與損害資料。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "成功的人多半是自戀型。",
          "feedback": "這會把職業成就病理化。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "願意聽一次就能排除所有場域的問題。",
          "feedback": "一次良好互動仍不足以全面排除。",
          "correct": false
        }
      ]
    },
  {
      "event": 5,
      "key": "admire",
      "kind": "處理優先",
      "prompt": "E05 她落選後要你說「評審錯了」。哪個回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "承認她的作品好、也看見她很失望，但不說自己不相信的話；她因此生氣離開，也不追上去改口。",
          "feedback": "A4 是需要過度的讚美。用假話滿足她，當下最省事，卻會讓你們的關係只剩下附和。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "說評審錯了，讓她今晚好過一點。",
          "feedback": "這是本幕的陷阱：好感會上升，但你也開始替她說假話，接著她會要你在更多人面前這樣說。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "直接告訴她，她就是太自戀才會這樣。",
          "feedback": "你是鄰居，不是她的治療者；貼標籤只會讓她更受傷、更防衛。",
          "correct": false
        }
      ]
    },
    {
      "event": 7,
      "key": "exploit",
      "kind": "處理優先",
      "prompt": "E07 她要助理沒有加班費地做完，還說能替她工作就夠了。你在旁邊，怎麼做比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "直接說出該做的事：他做的圖要有他的名字、加班要付錢，並讓助理自己決定要不要留下來做。",
          "feedback": "針對具體的剝削行為說清楚，比勸她「體諒一下別人」有用。她當下會生氣，但這是讓她開始尊重你的方式。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她這麼有才華，助理能跟著學已經很幸運了。",
          "feedback": "才華不能抵銷剝削；這樣說等於幫她說服受影響的人。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "你留下來幫助理把圖做完，大家就不用吵了。",
          "feedback": "你替她扛下工作，只會讓她學到總會有人接手；遊戲裡她也會順勢把工作塞給你。",
          "correct": false
        }
      ]
    },
    {
      "event": 11,
      "key": "envy",
      "kind": "辨識線索",
      "prompt": "E11 她沒看作品，就要撤掉另一位建築師的海報。這段怎麼整理？",
      "options": [
        {
          "id": "evidence",
          "text": "她認定對方靠關係、看到別人有演講就要撤掉，可以討論 A8（嫉妒別人）；工作人員說她以前也這樣，是反覆出現的線索，但仍需要更多情境。",
          "feedback": "一次的不甘心很常見；要看是不是反覆、跨情境出現，並造成實際影響。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她說得對，對方可能真的是靠關係。",
          "feedback": "她連作品都沒看，這是沒有根據的認定。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "只要她最後沒撤海報，就代表沒有問題。",
          "feedback": "行為有改變是好事，但不代表之前的模式就不存在。",
          "correct": false
        }
      ]
    }
  ],
  "wen_yan": [
    {
      "kind": "辨識線索",
      "prompt": "E03 他很想去讀書會，卻一直問誰會到、大家歡不歡迎他。這段最重要的線索是什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "他想跟人來往，卻要先確定會被喜歡才敢去；他也覺得自己比別人差。",
          "feedback": "A2 和 A5 的重點是「想要，但怕不被接納而退縮」，不是看他最後有沒有出席。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他本來就不喜歡跟人相處。",
          "feedback": "這跟他明明很想參加的意願不符；不想要人際關係，比較接近其他的理解方向。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他緊張時說話會卡住。",
          "feedback": "口吃或停頓本身，不是人格障礙的證據。",
          "correct": false
        }
      ]
    },
    {
      "kind": "比較解釋",
      "prompt": "店員叫他「小兔子」，他說自己不喜歡。該怎麼理解這段？",
      "options": [
        {
          "id": "evidence",
          "text": "先承認這個稱呼真的讓他不舒服，不能因為他容易緊張，就把所有不舒服都說成他太敏感。",
          "feedback": "真實的冒犯要先處理；這跟「沒有人批評他，他卻預期會被拒絕」要分開看。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他有畏避的特徵，所以一定是他誤會了。",
          "feedback": "特徵不能拿來否定別人真的造成的傷害。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "只要他真的被冒犯過，就可以排除他其他的畏避困難。",
          "feedback": "真實的傷害，跟其他場合長期的模式，可以同時存在。",
          "correct": false
        }
      ]
    },
    {
      "kind": "資料缺口",
      "prompt": "E10 他想讓你看詩，卻越親近越怕被笑，只敢念兩行。還需要了解什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "他是不是在親密關係中，長期因為怕被羞辱而有所保留；這對他的生活和關係有多大影響，以及有沒有其他解釋。",
          "feedback": "A3 要看親密關係中的長期模式，也要跟工作上的迴避（A1）分開看。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他有沒有上過大型的舞台。",
          "feedback": "舞台大小不能用來區分社交焦慮和畏避型的模式。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他的詩寫得好不好。",
          "feedback": "作品好不好，不是判斷的依據。",
          "correct": false
        }
      ]
    },
    {
      "kind": "新案例",
      "prompt": "某人很想參加聚會，卻因為社交焦慮臨時退出；目前還沒有他長期人際模式的資料。最合理的做法是？",
      "options": [
        {
          "id": "evidence",
          "text": "同時考慮社交焦慮症、人格模式和其他解釋，不能只靠一次退出就下判斷。",
          "feedback": "社交焦慮症和畏避型人格障礙常有重疊，需要長期、跨場合的資料。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他很想跟人來往，所以可以直接判斷是畏避型。",
          "feedback": "想要連結只是其中一個面向，不能代替完整的評估。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他怕的是聚會，所以一定只是社交焦慮症。",
          "feedback": "害怕的範圍和持續時間，還需要更多資料。",
          "correct": false
        }
      ]
    },
    {
      "event": 5,
      "key": "small_step",
      "kind": "處理優先",
      "prompt": "E05 書店的約還沒到，他就說自己很無聊、不值得你花時間。哪個回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "把約會改成一小時、只去他想看的那家，累了就可以回家。",
          "feedback": "把大事拆成做得到的一小步，能讓他自己決定往前走；A6 的自我評價，不需要靠保證來推翻。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "馬上說「你一點都不無聊，我很喜歡你」。",
          "feedback": "太早、太熱烈的保證，會讓他更怕被看穿，一路上都在道歉。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "直接說「你一直說自己無聊，我很難接話」。",
          "feedback": "對他來說，一句批評就夠讓他退回去；那天你們沒有去成。",
          "correct": false
        }
      ]
    },
    {
      "event": 7,
      "key": "new_activity",
      "kind": "辨識線索",
      "prompt": "E07 他很想學植物，同一個報名頁打開了五次，卻一直沒按下去。這最直接對應哪一項？",
      "options": [
        {
          "id": "evidence",
          "text": "A7：因為怕出糗、被看不起，不敢嘗試新的活動。",
          "feedback": "重點是「想做，卻因為怕尷尬而不敢冒險」；小時候被笑過的經驗，不能直接代替這一項。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "A1：因為怕被批評，避開需要跟人接觸的工作。",
          "feedback": "植物課是興趣，不是工作；工作上的迴避要看 E11 的座談。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他其實對植物沒有興趣。",
          "feedback": "他已經記住好幾種植物的名字，興趣是真的。",
          "correct": false
        }
      ]
    },
    {
      "event": 10,
      "key": "wish_seen",
      "kind": "比較解釋",
      "prompt": "E10 他說，那兩行詩是讀〈燃燒的父〉時寫的；故事裡的老師傅，願意為別人的詩重新刻鉛字。這段資料可以怎麼用？",
      "options": [
        {
          "id": "evidence",
          "text": "它說明他很渴望被認真看見，也解釋了他為什麼這麼怕被笑；渴望和害怕同時存在，是理解 A3 的重要背景。",
          "feedback": "畏避型的人並不是不想要親密，而是想要，卻怕被羞辱。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他喜歡老技藝的故事，代表他只想活在書裡，不想跟人來往。",
          "feedback": "喜歡什麼書，不能直接拿來推論人格；他其實很想讓你看他的詩。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他拿小說來說自己的心情，表示他在演，不是真的害怕。",
          "feedback": "用喜歡的故事來表達心情，很常見，不代表情緒是假的。",
          "correct": false
        }
      ]
    },
    {
      "event": 11,
      "key": "decline_letters",
      "kind": "處理優先",
      "prompt": "E11 主辦人很客氣，他卻已經打開取消申請，桌上還有一疊沒寄出的婉拒信。哪個回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "不替他簽，先分清楚他是不想做，還是想做卻太害怕，再讓他自己去問能怎麼調整。",
          "feedback": "A1 的線索要看長期一再放棄的模式；替他決定，等於幫他繼續躲。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "直接幫他寫信拒絕，讓他鬆一口氣。",
          "feedback": "這是本幕的陷阱：他鬆了一口氣，也又躲過了一次。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "說「你已經推掉很多次了，這次一定要去」。",
          "feedback": "硬推可能讓他照做，卻更害怕；也忽略了他可能真的有不想做的理由。",
          "correct": false
        }
      ]
    }
  ],
  "bai_xiaolu": [
    {
      "kind": "辨識線索",
      "prompt": "E03 她想把續約、薪水、住處全交給你決定。哪一點最能支持 A2 的線索？",
      "options": [
        {
          "id": "evidence",
          "text": "沒有迫切危機，卻對多種生活決定都不信任自己的判斷，想把主要責任交給別人。",
          "feedback": "與一次諮詢意見或合理協助區分。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "不懂一項合約條文。",
          "feedback": "一般尋求專業意見不等同依賴模式。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "是甜點學徒。",
          "feedback": "職級與性別不是診斷證據。",
          "correct": false
        }
      ]
    },
    {
      "kind": "比較解釋",
      "prompt": "在安全的關係裡，因為怕失去照顧而不敢說不；和因為怕真的被報復而不敢說不，有什麼不同？",
      "options": [
        {
          "id": "evidence",
          "text": "現實威脅下的順從可能是自保，不能直接計入同一準則。",
          "feedback": "應先了解安全、文化與權力條件。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "兩種情況都是不敢拒絕，所以動機和意義也一樣。",
          "feedback": "相似行為不能省略動機與脈絡。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "沒有報復就表示她不會真害怕。",
          "feedback": "主觀恐懼仍可能存在並造成困難。",
          "correct": false
        }
      ]
    },
    {
      "kind": "資料缺口",
      "prompt": "E12 她同時說到一個人時很無助，也擔心以後被留下。還需要分清楚什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "獨處當下的不舒服，以及長期反覆擔心被留下、得自己照顧自己的模式。",
          "feedback": "相近但不同的準則應各有內容，還要看能力、反覆性與影響。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "要不要她立刻獨住一整週。",
          "feedback": "強迫挑戰不是評估或證明。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "是否會煮飯。",
          "feedback": "單一技能不能解釋完整支持需求。",
          "correct": false
        }
      ]
    },
    {
      "kind": "新案例",
      "prompt": "有人因為剛動完手術，暫時需要家人幫忙選餐、處理帳單。這樣能判定是依賴型嗎？",
      "options": [
        {
          "id": "evidence",
          "text": "不能只憑暫時且合理的照護需求判定，還需要長期在不同情境中的模式資料。",
          "feedback": "需要人不等於人格障礙。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "有人代付帳單就符合。",
          "feedback": "需了解健康與實際能力。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "只有完全獨立的人才健康。",
          "feedback": "合理互助不是失敗。",
          "correct": false
        }
      ]
    },
  {
      "event": 7,
      "key": "nurture",
      "kind": "處理優先",
      "prompt": "E07 她主動接下五天夜班，又問你下班會不會來看她。哪個回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "接住她怕一個人在家的心情，同時讓她自己說出最多能接幾天班；不承諾每天去陪她。",
          "feedback": "A5 是為了被需要而過度付出。承諾隨叫隨到，等於幫她用犧牲換陪伴。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "說「那你上夜班我都去陪你」。",
          "feedback": "這是本幕的陷阱：她會當場再多接兩天夜班，好讓你每天都來。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "直接幫她把班都推掉。",
          "feedback": "替她決定看起來像在保護她，其實又把她的責任接過來了。",
          "correct": false
        }
      ]
    },
    {
      "event": 10,
      "key": "start",
      "kind": "處理優先",
      "prompt": "E10 她想比賽、能力也夠，卻一直等你替她按報名。怎麼做比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "相信她做得到，讓她自己完成第一個小步驟，例如自己寄出規則問題，或自己按下報名。",
          "feedback": "A4 是因為不相信自己的判斷，很難自己開始。陪她自己做，比替她做更能累積信心。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "說「我幫你按報名」，讓她安心。",
          "feedback": "這是本幕的陷阱：她會很開心，接著說「以後我的事都給哥決定」。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她不敢開始，代表她其實不想比。",
          "feedback": "她說得很清楚她想比；猶豫不等於不想要。",
          "correct": false
        }
      ]
    },
    {
      "event": 11,
      "key": "rebound",
      "kind": "辨識線索",
      "prompt": "E11 她上個月剛被分手，就急著要你當「那個人」。這段怎麼整理？",
      "options": [
        {
          "id": "evidence",
          "text": "一段關係剛結束，就急著找下一個人來照顧自己，連喜不喜歡都沒想，可以討論 A7；被分手後難過、想找人陪，本身是很常見的反應。",
          "feedback": "要看的是「急著找替代的照顧來源」這個模式，以及它是否反覆出現，不是失戀難過本身。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "答應她，她就不會那麼痛苦了。",
          "feedback": "在她最急的時候答應，關係就建立在「誰都可以，只要有人」上；遊戲裡她會每十分鐘就問你在哪。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她馬上下載交友軟體，代表她很隨便。",
          "feedback": "這是道德評價，不是臨床觀察；重點在她為什麼這麼急、急著要什麼。",
          "correct": false
        }
      ]
    }
  ],
  "ji_yan": [
    {
      "kind": "辨識線索",
      "prompt": "E01 大家都到了，紀嚴卻因為兩行縮排差半格，讓會議半小時都開不起來。這最直接對應哪一項？",
      "options": [
        {
          "id": "evidence",
          "text": "A1：過度專注細節、規則或順序，以致失去活動的主要目的。",
          "feedback": "重點不是他有清單，而是細節壓過了「開會」這件真正要做的事。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他有強迫症，所以一定要對齊。",
          "feedback": "強迫型人格障礙症不需要有強迫症的強迫思考或強迫行為，兩者要分開評估。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他是法醫，本來就要很精準。",
          "feedback": "工作需要的精準是合理的；這裡的問題是展覽會議，不是解剖報告。",
          "correct": false
        }
      ]
    },
    {
      "kind": "比較解釋",
      "prompt": "紀嚴會說「差一點，就是差」，也很少覺得自己的標準有問題。這和強迫症（OCD）最大的差別是什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "強迫症的人通常覺得那些念頭和行為不合理、很想停下來；他則多半覺得「這樣才是負責」。",
          "feedback": "不過這不是絕對的二分：他對 E10 的破零件，就知道是廢物卻丟不掉。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "強迫型人格障礙症比強迫症嚴重。",
          "feedback": "兩者是不同的診斷，不能用嚴重程度來區分。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他愛乾淨，所以就是強迫症。",
          "feedback": "愛乾淨不等於強迫症，也不等於強迫型人格障礙症。",
          "correct": false
        }
      ]
    },
    {
      "kind": "資料缺口",
      "prompt": "E12 他付得起，卻兩個月不買燈泡，把錢全存成「災難預備金」。還需要了解什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "他的經濟狀況、文化背景，這種吝嗇是不是對自己和別人都一樣，以及對共同生活的影響。",
          "feedback": "A7 要排除真的經濟困難和合理節省。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他存了多少錢。",
          "feedback": "重點不是金額，而是他怎麼看待花錢、對生活造成什麼影響。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他是不是小氣的人。",
          "feedback": "「小氣」是日常用語，不能直接當成診斷依據。",
          "correct": false
        }
      ]
    },
    {
      "kind": "新案例",
      "prompt": "一位外科醫師在手術室非常講究 SOP，下班後卻很隨性，也常常跟朋友出去玩。最合理的看法是？",
      "options": [
        {
          "id": "evidence",
          "text": "工作需要的嚴謹不算症狀；要看僵化是不是普遍出現在工作以外，並造成損害。",
          "feedback": "強迫型人格障礙症的模式，要跨越不同情境。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "只要講究 SOP，就是強迫型人格障礙症。",
          "feedback": "專業規範是合理的。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "醫師都有點強迫，所以不用評估。",
          "feedback": "不能用職業刻板印象下判斷。",
          "correct": false
        }
      ]
    },
    {
      "event": 5,
      "key": "leisure",
      "kind": "處理優先",
      "prompt": "E05 他把休假都拿去工作，說「休假有什麼用」。哪個回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "說清楚你不想再改期喝茶，請他直接決定要不要接那個班。",
          "feedback": "守住自己的時間，又讓他自己做選擇。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "把喝茶也寫進他的行事曆，當成一件不能改期的工作。",
          "feedback": "這會讓休息也變成一項任務，反而強化了「沒有產出就沒有價值」。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "說「停下來會讓你不安吧」。",
          "feedback": "前期對他說感受，他只會回「不是不安，是浪費」。",
          "correct": false
        }
      ]
    },
    {
      "event": 7,
      "key": "delegate",
      "kind": "辨識線索",
      "prompt": "E07 海報架已經通過安全檢查，他卻因為住戶的組裝順序不同，拆掉重做。這對應哪些項目？",
      "options": [
        {
          "id": "evidence",
          "text": "A6（除非照自己的方式，否則不願意分工）和 A8（僵化、固執）。",
          "feedback": "重點是結果已經合格，他仍堅持「照我的方法」。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "A2（追求完美，妨礙完成）。",
          "feedback": "A2 是自己的工作做不完；這一幕的重點是不肯讓別人做。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他很注重安全，這是優點。",
          "feedback": "架子已經通過檢查了，拆掉跟安全無關。",
          "correct": false
        }
      ]
    },
    {
      "event": 10,
      "key": "hoard",
      "kind": "比較解釋",
      "prompt": "E10 他說：「我知道這些壞掉的扣子不能用了，也沒什麼紀念價值，可是要丟就是丟不下去。」哪一部分是 A5 的線索？",
      "options": [
        {
          "id": "evidence",
          "text": "東西已經壞了、沒有紀念價值，他還是丟不掉，而且佔掉大家的空間。",
          "feedback": "A5 只限破舊、沒有價值的物品；父親的照片這類紀念品不算。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他把父親的照片收在抽屜裡。",
          "feedback": "保留有情感意義的紀念品是正常的。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他每一包都貼了標籤。",
          "feedback": "貼標籤是他的習慣，不是 A5 的重點。",
          "correct": false
        }
      ]
    },
    {
      "event": 11,
      "key": "moral",
      "kind": "處理優先",
      "prompt": "E11 一位朋友聚餐失約一次，他就要對方退出整個展覽計畫。哪個回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "直接說出你覺得太重了，讓大家一起談，先不要現在就決定。",
          "feedback": "對他來說，溫和但堅定的不同意，比順著他或說他的感受更有效。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "說「你這麼有原則，我支持你」。",
          "feedback": "附和會讓僵化的道德標準直接落到別人身上。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "替他寫一封比較溫和的通知。",
          "feedback": "幫他把通知寫得好聽，還是讓對方退出了；問題沒有被討論。",
          "correct": false
        }
      ]
    }
  ],
  "lu_qinglan": [
    {
      "kind": "辨識線索",
      "prompt": "E01 她說車禍以前情緒很穩，開會也知道什麼話該收住，受傷後卻常常話說出口才發現不該說。這是哪一項的線索？",
      "options": [
        {
          "id": "evidence",
          "text": "準則 A：持續的人格改變，和她原本的人格模式明顯不同。",
          "feedback": "重點是「前後的差異」，而不是她現在活潑或會哭笑。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她從小就容易衝動。",
          "feedback": "她說的是受傷以後才改變；這和從青春期就開始的人格障礙症不同。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她只是心情不好。",
          "feedback": "一時的心情不能解釋三年來持續的改變。",
          "correct": false
        }
      ]
    },
    {
      "kind": "比較解釋",
      "prompt": "晴嵐和其他角色最大的不同是什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "她的改變有明確的起點（車禍），而且醫療團隊評估和腦傷有直接的生理關聯。",
          "feedback": "這是 F07.0 和一般人格障礙症最重要的區別：不是從青春期或成年早期開始的模式。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她的症狀比較嚴重。",
          "feedback": "不能用嚴重程度區分兩類診斷。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她自己會說醫學名詞，所以比較好判斷。",
          "feedback": "她會說醫學名詞，是因為她以前是醫師；診斷仍然要靠醫療評估。",
          "correct": false
        }
      ]
    },
    {
      "kind": "資料缺口",
      "prompt": "E05 她突然笑出來又馬上停住，把這一刻記進筆記。還需要了解什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "這種突然的哭笑，是人格改變的一部分，還是神經性的情緒表達問題；兩者要分開評估。",
          "feedback": "不能把動作問題、疲勞和不自主的哭笑，一律算成人格。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她是不是在開玩笑。",
          "feedback": "她自己也很困擾；不能把症狀當成玩笑。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她喜不喜歡你。",
          "feedback": "玩家跟她的關係，不能用來解釋她的症狀。",
          "correct": false
        }
      ]
    },
    {
      "kind": "新案例",
      "prompt": "某人頭部受傷後兩週，出現混亂和情緒失控，一個月後完全恢復，個性跟以前一樣。最合理的看法是？",
      "options": [
        {
          "id": "evidence",
          "text": "改變只出現在急性混亂（譫妄）期間，之後完全恢復，不符合人格改變的準則 D。",
          "feedback": "F07.0 需要持續的人格改變，不能只出現在譫妄的病程中。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "頭部受傷後有改變，就是 F07.0。",
          "feedback": "還要看改變是不是持續、是不是不只在譫妄期間。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他一定還有沒發現的人格問題。",
          "feedback": "沒有資料支持，不能這樣推論。",
          "correct": false
        }
      ]
    },
    {
      "event": 5,
      "key": "not_patient",
      "kind": "處理優先",
      "prompt": "E01 她說受傷以後常常說太快。哪個回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "照她想要的方式介紹她：金繼陶藝家，陸晴嵐；車禍的事她想說再說。",
          "feedback": "把她當一般人，是她最希望的。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "說「你一定很辛苦，以後我照顧你」。",
          "feedback": "這是本幕的陷阱：她說「我不需要看護」。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "馬上幫她查腦傷的相關資料。",
          "feedback": "她沒有要求你這樣做；替她研究病情，也是一種把她當病人的方式。",
          "correct": false
        }
      ]
    },
    {
      "event": 7,
      "key": "delirium",
      "kind": "辨識線索",
      "prompt": "E07 她今天說話很清楚，可是摘要寫著，急性混亂過去以後，人格的改變還一直在。這對應哪一項？",
      "options": [
        {
          "id": "evidence",
          "text": "準則 D：改變不是只出現在譫妄的病程中。",
          "feedback": "一段清楚的談話，不能用來證明之前的改變都沒了。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "準則 B：有直接的生理關聯。",
          "feedback": "準則 B 看的是醫療評估的關聯，不是譫妄的時間。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她今天很清醒，所以已經好了。",
          "feedback": "清醒的一刻，不能代替整段病程。",
          "correct": false
        }
      ]
    },
    {
      "event": 10,
      "key": "frontal",
      "kind": "比較解釋",
      "prompt": "E08 她做事要靠步驟表，常常忘了下一步；E10 她又說自己聞不到焦味。這些應該怎麼看？",
      "options": [
        {
          "id": "evidence",
          "text": "這些比較接近額葉腦傷後的嗅覺喪失和執行功能（神經認知）問題，要另外評估，不能直接算成人格改變。",
          "feedback": "F07.0 看的是人格的改變；神經認知的困難，要評估是否另有神經認知障礙症。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "這些都是去抑制型的表現。",
          "feedback": "去抑制指的是說話、行為收不住；忘了步驟、聞不到味道，不屬於這一類。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她只是比較懶、比較粗心。",
          "feedback": "把腦傷後的神經困難說成懶，會讓人忽略真正需要的協助。",
          "correct": false
        }
      ]
    },
    {
      "event": 11,
      "key": "impairment",
      "kind": "比較解釋",
      "prompt": "E11 她在會議上說出同事的私事，對方取消了共同示範；類似的事已經發生好幾次。這和哪一項有關？",
      "options": [
        {
          "id": "evidence",
          "text": "準則 E：改變造成臨床上顯著的苦惱，或人際、職業功能的減損。",
          "feedback": "要把這種損害跟手抖、疲勞分開；不是腦傷後所有的不便都算。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "準則 A：持續的人格改變。",
          "feedback": "A 看的是改變本身；這一幕的重點是改變造成的損害。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "這只是她的個性比較直。",
          "feedback": "她自己也說，這是受傷以後才開始的，而且一再影響合作。",
          "correct": false
        }
      ]
    }
  ],
  "you_ziqian": [
    {
      "kind": "辨識線索",
      "prompt": "E01 沒有人請他重做，他卻熬夜把你的海報全部改掉，還撒嬌問你會不會生氣。這段可以拿來討論什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "一般準則 A：他覺得別人自己做一定不好（認知），也直接替別人做決定（人際功能）；接下來要看是不是反覆出現。",
          "feedback": "準則 A 要求持久模式出現在兩個以上的面向；一次熱心幫忙不夠。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他很可愛、很會撒嬌，所以不可能有問題。",
          "feedback": "外表和說話方式不能用來排除問題；撒嬌反而讓別人很難拒絕。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他熬夜重做，代表他很負責，是好員工。",
          "feedback": "沒問過就改掉別人的作品，不是負責；要看對方有沒有同意。",
          "correct": false
        }
      ]
    },
    {
      "kind": "比較解釋",
      "prompt": "子謙也很在意事情做得好不好。他和強迫型人格障礙症（F60.5）比起來，哪一點不一樣？",
      "options": [
        {
          "id": "evidence",
          "text": "他在意的是「照他的意思做」，不是固定的規則、清單或完美標準；他自己也常常改來改去。",
          "feedback": "這也是作者把他放在「其他特定」的原因：有控制的模式，但不完全符合任何一種特定的人格障礙症。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "只要有控制欲，就一定是強迫型。",
          "feedback": "控制欲是描述性特徵，不是獨立診斷，也不自動對應某一種人格障礙症。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他會撒嬌，所以是依賴型。",
          "feedback": "撒嬌是他讓別人接受控制的方式，不是害怕自己做決定。",
          "correct": false
        }
      ]
    },
    {
      "kind": "資料缺口",
      "prompt": "E12 健康檢查顯示他沒有喝酒、沒有吃藥，也沒有頭部受傷。這份資料和哪一項有關？",
      "options": [
        {
          "id": "evidence",
          "text": "一般準則 F：模式不能歸因於物質的作用，或另一種身體病況。",
          "feedback": "這些資料仍需要專業人員確認；玩家的陪伴不能代替評估。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "一般準則 B：模式普遍出現在不同情境。",
          "feedback": "普遍性要看 E03 的員工、朋友和客戶，不是健康檢查。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "健康檢查正常，代表他沒有任何問題。",
          "feedback": "身體正常，不代表人格模式沒有造成困難。",
          "correct": false
        }
      ]
    },
    {
      "kind": "新案例",
      "prompt": "某人在工作上很愛主導，常常幫同事改報告，但同事都很感謝他，他也會先問過別人；他的工作和人際關係都很好。最合理的做法是？",
      "options": [
        {
          "id": "evidence",
          "text": "不能只因為愛主導，就判斷是人格障礙；要看有沒有缺乏彈性、跨情境的模式，以及顯著的苦惱或功能減損。",
          "feedback": "一般準則 B 和 C 很重要：模式要缺乏彈性，而且造成明顯的損害。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "只要喜歡掌控，就是其他特定的人格障礙症。",
          "feedback": "「其他特定」仍然要先符合一般人格障礙症的準則。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他有先問過別人，所以一定沒有任何問題。",
          "feedback": "先問很重要，但還是要看其他資料。",
          "correct": false
        }
      ]
    },
    {
      "event": 5,
      "key": "demoted",
      "kind": "處理優先",
      "prompt": "E05 他被撤掉店長，哭著問「你也覺得是我的錯嗎？」哪個回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "承認他的難受，但補救員工和客戶的事，要由他自己去談。",
          "feedback": "接住情緒，和讓他承擔責任，可以同時做到。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "說「沒關係，我把我的案子都給你做，你別難過」。",
          "feedback": "這是本幕的陷阱：他馬上不哭了，當晚就改掉你整個展覽的時程。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "說「員工走了、客戶解約，都是你的錯」。",
          "feedback": "直接指責會讓他覺得被嫌棄，很難接著處理問題。",
          "correct": false
        }
      ]
    },
    {
      "event": 7,
      "key": "impairment",
      "kind": "辨識線索",
      "prompt": "E05 三個員工離職、兩個客戶解約、他被撤掉店長，自己也每天熬到半夜。這最直接支持哪一項？",
      "options": [
        {
          "id": "evidence",
          "text": "一般準則 C：模式造成臨床上顯著的苦惱，以及職業功能的減損。",
          "feedback": "損害要和他的模式直接有關：員工和客戶離開的原因，都是他改掉別人的東西。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "一般準則 D：模式從青春期就開始。",
          "feedback": "起始時間要看 E07 的高中校刊，不是這一幕。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "這只是運氣不好，剛好遇到難搞的客戶。",
          "feedback": "離職單和解約信寫的原因都一樣，不是單一的意外。",
          "correct": false
        }
      ]
    },
    {
      "event": 10,
      "key": "phone",
      "kind": "處理優先",
      "prompt": "E10 他用你的手機替你回朋友「這週不行」，被你拒絕後臉一下子變冷，又哭著道歉。哪個回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "清楚說出這件事不行，把手機拿回來；聚會照你自己的決定去。",
          "feedback": "替伴侶回訊息、決定伴侶能不能見朋友，不管有沒有診斷，都要認真看待。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他都哭了，就不要去聚會了，陪他比較重要。",
          "feedback": "每次都讓步，會讓控制繼續下去。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "說「你這樣就是人格障礙」。",
          "feedback": "把診斷當成罵人的話，對任何人都沒有幫助；而且這不是玩家能判斷的。",
          "correct": false
        }
      ]
    },
    {
      "event": 11,
      "key": "mood",
      "kind": "比較解釋",
      "prompt": "E11 他半夜回店裡改掉新菜單，又問你他是不是憂鬱了。還需要了解什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "睡不好和心情差是從什麼時候開始的、有多嚴重；控制的模式是不是早在這之前就存在。",
          "feedback": "這和一般準則 E 有關：要確定模式不能用另一種精神疾病做更好的解釋。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他說自己憂鬱，所以就是憂鬱症，不是人格的問題。",
          "feedback": "兩者可以同時存在，也可能互相影響，需要專業評估。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他很會撒嬌，問這個只是想被安慰。",
          "feedback": "不能因為說話方式就忽略他的困擾。",
          "correct": false
        }
      ]
    }
  ]
};
const EXTRA_TASK_STAGES=[5,7,10,11];
export const LEARNING_STAGES=[3,5,7,8,10,11,12,15];
export function getLearningTasks(id,eventNumber){const tasks=(LEARNING_TASKS[id]||[]).filter(t=>!t.event);if(EXTRA_TASK_STAGES.includes(eventNumber))return (LEARNING_TASKS[id]||[]).filter(t=>t.event===eventNumber).map(({event,key,...t})=>({...t,id:key}));const revision=['lin_jianwei','ji_yan','su_fei'].includes(id)?2:1;return eventNumber===3?[{...tasks[0],id:'observe'}]:eventNumber===8?[{...tasks[1],id:'compare',revision}]:eventNumber===12?[{...tasks[2],id:'missing'}]:eventNumber===15?[{...tasks[3],id:'transfer'}]:[];}

// Retained only for viewing answers to the three rewritten E08 questions.
export const LEGACY_LEARNING_TASKS = {
  "lin_jianwei": {
    "kind": "比較解釋",
    "prompt": "見微不想參加茶會，溫言卻很想去。哪個問題最有助理解差異？",
    "options": [
      {
        "id": "evidence",
        "text": "是偏好獨處，還是想連結卻因害怕拒絕而退縮？",
        "feedback": "相似的缺席可能有不同動機，還需長期與功能資料。",
        "correct": true
      },
      {
        "id": "alternative",
        "text": "誰最後有下樓？",
        "feedback": "是否參加一次活動不能完成鑑別。",
        "correct": false
      },
      {
        "id": "inference",
        "text": "誰的笑容比較少？",
        "feedback": "外顯情感與內心需求不能直接等同。",
        "correct": false
      }
    ]
  },
  "ji_yan": {
    "kind": "比較解釋",
    "prompt": "哪一項較適合討論難以丟棄無價值物品？",
    "options": [
      {
        "id": "evidence",
        "text": "無用途、無情感價值的破扣占用空間且難以丟棄。",
        "feedback": "仍需理解其他原因；保存父親合照不屬相同證據。",
        "correct": true
      },
      {
        "id": "alternative",
        "text": "留下父親合照。",
        "feedback": "這有明確情感價值。",
        "correct": false
      },
      {
        "id": "inference",
        "text": "保留需要用的備品。",
        "feedback": "合理備品不是無價值物品。",
        "correct": false
      }
    ]
  },
  "su_fei": {
    "kind": "比較解釋",
    "prompt": "花費、酒精與反覆自傷應怎麼對應？",
    "options": [
      {
        "id": "evidence",
        "text": "前兩者可討論不同衝動領域，自傷史另列，不重複湊項。",
        "feedback": "A4 至少兩個潛在自我損害領域，與 A5 分開。",
        "correct": true
      },
      {
        "id": "alternative",
        "text": "同一次自傷可以同時湊兩種衝動。",
        "feedback": "同一次自傷不能重複拿來湊 A4 的兩個領域；自傷史應另列 A5。",
        "correct": false
      },
      {
        "id": "inference",
        "text": "所有衝動都只算情緒不穩。",
        "feedback": "不同準則有不同概念，不宜混成一項。",
        "correct": false
      }
    ]
  }
};
