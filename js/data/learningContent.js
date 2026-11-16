// 隨堂小考：每題對應一個場次（event），選擇後立即顯示解釋；題目與選項不寫準則，準則只在解釋與教學重點中出現。
// 「」內的準則文字一律逐字取自 dsm-5-tr-zh.txt。
export const LEARNING_REVISION = 3;
export const LEARNING_TASKS = {
  "shen_mo": [
    {
      "key": "e01_bill",
      "event": 1,
      "type": "這是什麼線索",
      "prompt": "E01 你只是送來一張公開的電費分攤表，他卻問你是不是有人派來看他在不在家。這段最值得記下的是什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "他沒有具體根據，就把中性的接觸解讀成有人要利用或監視他。",
          "feedback": "這正是妄想型最核心的線索：懷疑不是來自證據，而是來自他看待他人的方式。一次互動不能診斷，但值得記下。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他是調查記者，警覺陌生人本來就是工作需要，這段沒有意義。",
          "feedback": "職業可以解釋一部分警覺，但一張公開帳單與工作無關；把無害的接觸讀成威脅，已超出職業需要。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他對你一定有特別的敵意，因為你是新來的。",
          "feedback": "他對房東、鄰居也是同樣的反應；這是他看待所有人的方式，不是針對你。",
          "correct": false
        }
      ],
      "teach": "A1 是「沒有充分根據地懷疑別人在利用(exploiting)、傷害或欺騙(deceiving)他或她」。判斷時先問：懷疑有沒有根據？是不是跨情境出現？"
    },
    {
      "key": "e03_secret",
      "event": 3,
      "type": "怎麼區分",
      "prompt": "E03 朋友從沒洩密，他仍多年不敢說自己常去哪家麵包店。這和記者保護消息來源，差別在哪裡？",
      "options": [
        {
          "id": "evidence",
          "text": "保護消息來源是有根據的工作需要；連日常小事都不敢對可信的朋友說，害怕卻沒有根據。",
          "feedback": "關鍵在於害怕有沒有根據，以及範圍是否擴及一般、親近的人。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "兩者一樣，都是在保護隱私，所以都不算問題。",
          "feedback": "保護隱私本身合理；但對從未洩密的朋友也隱瞞日常小事，原因是無根據的害怕，意義就不同。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "差別在於他保密的東西比較多。",
          "feedback": "數量不是重點，重點是動機：是否無根據地害怕資訊被拿來對付自己。",
          "correct": false
        }
      ],
      "teach": "A3 是「不願意向他人傾訴，原因是無根據地害怕這些資訊會被惡意地用來對付他或她」。與職業保密、真實威脅下的自保要分開看。"
    },
    {
      "key": "e05_loyalty",
      "event": 5,
      "type": "怎麼回應比較好",
      "prompt": "E05 他追問你那八分鐘去見了誰，還想打電話給你的同事查證。你已經說明過一次，接下來怎麼回應比較好？",
      "options": [
        {
          "id": "evidence",
          "text": "說清楚你已經說明過，如果他再去問同事，你就不合作了。",
          "feedback": "針對盤問的行為設界線並說出後果，而不是繼續自證清白。他當下會很冷，但盤問停了下來。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "把行程一分鐘一分鐘交代清楚，直到他放心。",
          "feedback": "證據只能短暫降低懷疑，他會找到下一個疑點；不斷自證，會讓查證成為關係的規則。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "急著說你最信任的就是他，怎麼可能出賣他。",
          "feedback": "急切的保證在猜疑的框架裡更像心虛，他反而存下你同事的號碼。",
          "correct": false
        }
      ],
      "teach": "A2 是「對朋友或共事者的忠誠度或可信度充滿不合理的懷疑」。與高度猜疑的人相處，坦白一次、再針對行為設界線，比反覆解釋有效。"
    },
    {
      "key": "e07_praise",
      "event": 7,
      "type": "這是什麼線索",
      "prompt": "E07 你稱讚他的照片標註很仔細，他卻說你是在嫌他挑毛病，還要把你的話轉寄給大家。這段同時呈現了哪兩件事？",
      "options": [
        {
          "id": "evidence",
          "text": "他從善意的話裡讀出貶低，並且立刻要反擊、維護名譽。",
          "feedback": "一個是對善意的敵意解讀，一個是對想像中攻擊的快速反擊；兩者常一起出現，但要分開記錄。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他只是心情不好，跟你說了什麼無關。",
          "feedback": "他的反應直接針對你的那句話，而且說出了他的解讀；這不是單純的心情問題。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他其實很在意你的稱讚，只是不好意思接受。",
          "feedback": "他明確把稱讚讀成攻擊並準備反擊；把它浪漫化，會忽略他真實的痛苦與衝突。",
          "correct": false
        }
      ],
      "teach": "A4 是「在他人善意的言語或舉動中解讀出貶抑或威脅」；A6 是「察覺到對他或她個性或名譽的攻擊，該攻擊對他人而言是不明顯的，而個案會迅速地憤怒回應或反擊」。"
    },
    {
      "key": "e10_photo",
      "event": 10,
      "type": "怎麼回應比較好",
      "prompt": "E10 他承認偷拍了你三張照片，想確定你不是被派來接近他的，問你希望他怎麼處理。哪個回應最合適？",
      "options": [
        {
          "id": "evidence",
          "text": "說出你的不舒服，要求原檔、備份、底片全部刪除或銷毀，並當面確認。",
          "feedback": "理解他的害怕，不代表接受行為的後果；具體、可確認的處理，才是真正的修補。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "說照片拍得很好看，留著也沒關係。",
          "feedback": "這等於同意他以後繼續拿確認當理由拍你；把監控當成在乎，會讓越界合理化。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他已經承認了，代表他有反省，照片不用處理。",
          "feedback": "承認越界不抵銷你的隱私權；修補要看他實際做了什麼。",
          "correct": false
        }
      ],
      "teach": "他的動機延續了沒有根據的懷疑，但行為本身是越界，也可能違法。遭到偷拍或跟蹤時，可以保留證據、告訴信任的人，並依《跟蹤騷擾防制法》求助。"
    },
    {
      "key": "e11_grudge",
      "event": 11,
      "type": "怎麼區分",
      "prompt": "E11 三年前那句玩笑，對方早就道歉了；今天他看到兩人站在一起，就認定他們在商量拿他的調查去邀功。這段話要怎麼拆開看？",
      "options": [
        {
          "id": "evidence",
          "text": "放不下已經道歉的輕視，是一件事；把沒聽清楚的談話認定成要利用他，是另一件事。",
          "feedback": "同一段話裡有兩條不同的線索：一條是對過去的怨恨，一條是對現在的猜疑。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他記得三年前的事，代表他記性很好，跟人格無關。",
          "feedback": "重點不是記得，而是無法寬恕，並持續影響現在的判斷與行動。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "對方真的有可能在邀功，所以這不算猜疑。",
          "feedback": "他沒聽清楚就認定；有可能，不等於有根據。",
          "correct": false
        }
      ],
      "teach": "A5 是「持續地心懷怨恨(grudges)（如：無法寬恕侮辱、傷害或輕蔑）」。把過去的傷害與現在的猜測分開，也是認知治療常用的做法。"
    },
    {
      "key": "e12_phone",
      "event": 12,
      "type": "還缺什麼資料",
      "prompt": "E12 他說以前會看伴侶的手機，什麼都沒查到，對方還是走了。要把這段當成線索，還缺什麼資料？",
      "options": [
        {
          "id": "evidence",
          "text": "那些查看是不是出於對忠貞的懷疑、這種懷疑是否反覆出現而且沒有根據、持續多久，以及其他可能的原因。",
          "feedback": "只有行為（查手機）還不夠，要確認背後懷疑的內容、反覆性與缺乏根據。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "你願不願意把手機交給他看。",
          "feedback": "交出手機不能驗證任何準則，反而會讓查證變成關係的規則。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "你願不願意收下他的鑰匙。",
          "feedback": "關係中的同意與診斷資料是兩件事。",
          "correct": false
        }
      ],
      "teach": "A7 是「對配偶或性伴侶的忠貞有反覆且不合理的懷疑」。要注意對象（伴侶）、內容（忠貞）、頻率（反覆）與根據（不合理）。"
    },
    {
      "key": "transfer",
      "event": 15,
      "type": "新案例",
      "prompt": "新案例：一位住戶遭到跟蹤後，暫時不告訴任何人新地址；平常的人際與工作都正常。最合理的理解是？",
      "options": [
        {
          "id": "evidence",
          "text": "這可能是合理的自保，目前的資料不足以推論人格障礙。",
          "feedback": "有真實的威脅，也沒有跨情境的長期模式；行為相似，不代表心理機制相同。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "只要拒絕透露地址，就符合妄想型的不願傾訴。",
          "feedback": "那需要無根據的害怕；遭到跟蹤後的保密是有根據的。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "只要她願意跟人約會，就可以排除人格困難。",
          "feedback": "戀愛意願沒有排除診斷的功能。",
          "correct": false
        }
      ],
      "teach": "人格障礙症要符合一般準則：持久、缺乏彈性、普遍存在，並造成苦惱或功能減損。對真實威脅的合理反應不符合這些條件。"
    }
  ],
  "lin_jianwei": [
    {
      "key": "e01_alone",
      "event": 1,
      "type": "怎麼區分",
      "prompt": "E01 家人叫了三次，她都沒下樓，說空閒大多自己過、沒有特別想找誰。和一個很想參加卻不敢下樓的人比起來，差別在哪？",
      "options": [
        {
          "id": "evidence",
          "text": "她沒有表現出想參與卻退縮的掙扎，比較像是缺少對親近關係的欲求。",
          "feedback": "孤僻型的核心是不太需要，畏避型是想要但害怕；這是兩者最重要的區別。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "兩個人其實一樣，都是害怕被家人批評。",
          "feedback": "她沒有表現出害怕；把不想去說成害怕，會跟畏避型混在一起。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "差別在於她比較內向，所以就是孤僻型人格障礙症。",
          "feedback": "內向本身不是障礙，還要看廣泛的疏離與功能損害。",
          "correct": false
        }
      ],
      "teach": "A1 是「不欲求也不享受親近關係」，A2 是「幾乎總是選擇單獨的活動」。重點在缺乏欲求，而不是害怕。"
    },
    {
      "key": "e05_flat",
      "event": 5,
      "type": "怎麼回應比較好",
      "prompt": "E05 你講工作上的煩惱時，她一直沒有表情，你懷疑她有沒有在聽。怎麼做比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "直接問她想聽你講完，還是換個話題。",
          "feedback": "她自己也說直接問比猜表情快；這樣也不需要她用笑容證明自己在乎。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "跟她說你其實很在意吧，說出來沒關係。",
          "feedback": "把你的詮釋強加給她，她會說自己不是在忍耐，然後退開。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "要她笑一個給你看，確認她有在聽。",
          "feedback": "要求她表演情緒是一種壓力，她只會說現在不好笑。",
          "correct": false
        }
      ],
      "teach": "A7 是「顯現出情感的冷淡、疏離或平板的情感性(affectivity)」。情感表達平板，不等於內在沒有感受。"
    },
    {
      "key": "e07_praise",
      "event": 7,
      "type": "這是什麼線索",
      "prompt": "E07 有人稱讚她是天才，也有人說她冷，她都沒什麼反應；別人提到玻璃反光，她才記下來。這段最直接呈現的是什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "她對別人的評價本身沒什麼反應，但對實際的問題仍會學、會改。",
          "feedback": "重點是對讚美與批評的冷淡；這和情緒表達的平板是不同的面向。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她很有自信，所以不在乎別人的看法。",
          "feedback": "有自信的人通常仍會對讚美有些反應；她是兩種評價都沒有感覺。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她的情緒表達很平，所以看不出反應。",
          "feedback": "情緒表達平板是另一個面向；這一幕的重點是她對評價的反應。",
          "correct": false
        }
      ],
      "teach": "A6 是「對他人的讚美或批評顯得漠不關心」。要和 A7 的情感平板分開記錄。"
    },
    {
      "key": "e09_invite",
      "event": 9,
      "type": "怎麼區分",
      "prompt": "E09 同一場茶會，見微說她不想去，溫言說他想去但怕不被歡迎。要理解兩人的差異，最該問的是什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "他們是不想要連結，還是想要連結卻因為害怕被拒絕而退縮？",
          "feedback": "相同的缺席，背後的心理機制可能完全不同。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "誰最後有去參加？",
          "feedback": "出席與否不能完成鑑別，一次邀約也不夠。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "誰的笑容比較少？",
          "feedback": "外顯的情感和內在的需要不能直接畫上等號。",
          "correct": false
        }
      ],
      "teach": "孤僻型是缺乏欲求；畏避型是「除非確信受到歡迎，否則不願與人交涉」。鑑別要靠長期、跨情境的資料。"
    },
    {
      "key": "e10_frequency",
      "event": 10,
      "type": "怎麼回應比較好",
      "prompt": "E10 你們在討論多久見一次面，她說需要很多一個人的時間。怎麼做比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "說出你的需要，再一起試一個頻率，月底再調整。",
          "feedback": "兩個人的需要都算數；關係的頻率沒有唯一正確答案。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "說服她每天見面，久了她就會習慣。",
          "feedback": "強迫她改變獨處的需要，不是協商。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "告訴她不想常見面，就是有人格障礙。",
          "feedback": "把診斷當成說服的工具，對任何人都沒有幫助。",
          "correct": false
        }
      ],
      "teach": "她的無性戀身分與關係需求，不能拿來當作 A3「若有也很少對與他人有性經驗感興趣」的證據；性傾向不是症狀。"
    },
    {
      "key": "e11_party",
      "event": 11,
      "type": "怎麼區分",
      "prompt": "E11 她說要在父母的酒會待半小時就走，因為比接十通電話省事。她平常很喜歡觀測和修錶。這段能不能說明她什麼活動都沒有樂趣？",
      "options": [
        {
          "id": "evidence",
          "text": "不能。不喜歡酒會，不代表她對所有活動都沒有樂趣；她對觀測與修錶是有興趣的。",
          "feedback": "要看的是廣泛的快感缺失，而不是對某一種活動的偏好。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "可以，因為她連父母的活動都不想參加。",
          "feedback": "對社交活動沒興趣，和對所有活動都沒有樂趣是兩回事。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "可以，因為她是無性戀。",
          "feedback": "性傾向和這一項無關，也不能拿來當證據。",
          "correct": false
        }
      ],
      "teach": "A4 是「若有也很少有活動使其感到樂趣」。準則 B 也提醒要排除自閉症類群障礙症，不能因為一次談話就下結論。"
    },
    {
      "key": "e12_contacts",
      "event": 12,
      "type": "還缺什麼資料",
      "prompt": "E12 她的通訊錄只有家人、鐘錶行和天文館的分機。還需要了解什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "這種情形持續多久、她自己怎麼看、對工作與生活的影響，以及要排除憂鬱、自閉症類群障礙症等其他解釋。",
          "feedback": "朋友的數量本身不是診斷，要看長期的缺乏與影響。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她喜不喜歡你。",
          "feedback": "玩家與她的關係，不能用來判斷她有沒有人格障礙。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她是不是無性戀。",
          "feedback": "性傾向與浪漫傾向要和人格模式分開看。",
          "correct": false
        }
      ],
      "teach": "A5 是「除一等親外，缺乏親近朋友或知己」。也不能用戀愛來填補這個空缺。"
    },
    {
      "key": "transfer",
      "event": 15,
      "type": "新案例",
      "prompt": "新案例：某人很少參加聚會，週末都一個人爬山、看書，但跟兩個老朋友很親近，工作也很順利。最合理的看法是？",
      "options": [
        {
          "id": "evidence",
          "text": "喜歡獨處本身不是障礙；他有親近的朋友、功能良好，不符合孤僻型的模式。",
          "feedback": "獨處的偏好很常見，不能直接病理化。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "只要喜歡一個人，就是孤僻型人格障礙症。",
          "feedback": "還要看廣泛的疏離、情感表達有限，以及功能損害。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他一定是在逃避什麼。",
          "feedback": "不能沒有根據地替別人的偏好找原因。",
          "correct": false
        }
      ],
      "teach": "一般準則 C 要求「這種持久模式引起臨床上顯著苦惱或社交、職業及其他重要功能減損」。功能良好的獨處偏好不符合。"
    }
  ],
  "ruri": [
    {
      "key": "e01_lamp",
      "event": 1,
      "type": "這是什麼線索",
      "prompt": "E01 她把路燈閃爍當成專門給自己的確認，但也會問只有她看得到嗎。這段最貼近哪一種理解？",
      "options": [
        {
          "id": "evidence",
          "text": "她把和自己無關的事件解讀成與自己有關，但仍保有懷疑，並非完全確信。",
          "feedback": "確信程度是區分這種想法與妄想的關鍵；她會自我懷疑，代表不是固定不移的信念。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "這是固定不移的妄想，可以直接判斷為思覺失調症。",
          "feedback": "她並非完全確信，而且需要完整評估與病程，不能直接判斷。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "這只是迷信，屬於文化習俗，不需要評估。",
          "feedback": "次文化的信念要尊重，但她把燈閃當成給自己的訊號，並影響行為，仍值得了解。",
          "correct": false
        }
      ],
      "teach": "A1 是「關係意念（ideas of reference）（排除關係妄想）」。括號裡的排除很重要：要確認她不是完全確信。"
    },
    {
      "key": "e03_bricks",
      "event": 3,
      "type": "這是什麼線索",
      "prompt": "E03 她相信踩到裂磚會改變未來，所以一直繞路，耽誤了送貨；她外婆也有祈福的習俗。哪一部分是值得記下的線索？",
      "options": [
        {
          "id": "evidence",
          "text": "她個人相信自己的動作能改變未來，而且這個信念已經影響了她的行為。",
          "feedback": "重點是她怎麼相信、對生活有什麼影響，而不是信念的內容。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "外婆的祈福習俗，代表全家都有問題。",
          "feedback": "文化與家族習俗要尊重，不能當成症狀。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她相信的消息內容，符不符合某種政治立場。",
          "feedback": "信念的內容或立場不是判斷依據；評估的方式都一樣。",
          "correct": false
        }
      ],
      "teach": "A2 是「古怪的信念或奇幻的思考影響其行為且與次文化常模不一致」。若對來自未來的說法確信程度很高，還要回到準則 B，排除精神病症。"
    },
    {
      "key": "e05_neighbors",
      "event": 5,
      "type": "怎麼區分",
      "prompt": "E05 認識很久的鄰居在聊天，她卻越熟越不安，覺得對方在試探她。這和一般怕被批評的社交焦慮，差別在哪？",
      "options": [
        {
          "id": "evidence",
          "text": "她怕的是被看穿、被試探，而且不會因為熟悉而減少；怕被批評的焦慮，通常熟了會好一點。",
          "feedback": "焦慮的內容（偏執的害怕）與熟悉後的變化，是鑑別的關鍵。",
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
      ],
      "teach": "A9 是「過度的社交焦慮不會因熟悉而減少，且此傾向與偏執的（paranoid）害怕有關，與對自己的負面評價較無關」。這是與畏避型、社交焦慮症鑑別的重點。"
    },
    {
      "key": "e07_radio",
      "event": 7,
      "type": "還缺什麼資料",
      "prompt": "E07 她說在收音機的雜訊裡，好像有人叫她的名字，但不是很清楚。還需要了解什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "聲音有多清楚、持續多久、她有多確信，以及睡眠、聽力、物質與其他精神病症的可能性。",
          "feedback": "不尋常的知覺經驗要和清楚、持續的幻聽區分，也要排除其他原因。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "不用了解，這就是幻聽，可以直接判斷是思覺失調症。",
          "feedback": "經驗的清晰度、持續時間與確信度都需要評估。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "不用了解，收音機本來就有雜訊，這沒有任何意義。",
          "feedback": "雜訊是真的，但她怎麼經驗它，才是要了解的地方。",
          "correct": false
        }
      ],
      "teach": "A3 是「不尋常的知覺經驗，包括身體錯覺（bodily illusions）」。睡眠不足也會加重這類經驗。"
    },
    {
      "key": "e10_sign",
      "event": 10,
      "type": "這是什麼線索",
      "prompt": "E10 她用鳥巢和雨來說明入口，還想在指示牌上寫台羅文，結果工讀生找不到門。哪一部分是值得記下的線索？",
      "options": [
        {
          "id": "evidence",
          "text": "她說話繞來繞去、含糊不清，讓別人無法理解要怎麼走。",
          "feedback": "重點是說話方式妨礙了溝通，而不是用了哪一種語言或修辭。",
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
      ],
      "teach": "A4 是「古怪的思考和語言」，例如含糊、迂迴、隱喻、過度引申。保留她的表達，同時加上清楚的版本，就能兼顧。"
    },
    {
      "key": "e11_thanks",
      "event": 11,
      "type": "怎麼回應比較好",
      "prompt": "E11 鄰攤的人剛才幫她撿了衣架，她想道謝，卻懷疑對方是被派來的。怎麼做比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "點出對方剛才確實幫了忙，讓她自己決定要不要道謝、怎麼道謝。",
          "feedback": "把現實的證據交給她，由她決定；替她做，她就少了一次自己接觸人的機會。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "替她把卡片拿過去，免得她緊張。",
          "feedback": "替她完成，等於讓她又少了一次自己練習的機會。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "跟她說，對方一定別有用心，最好不要理。",
          "feedback": "這會加深她的猜疑；被笑過的害怕是真的，但幫忙也是真的。",
          "correct": false
        }
      ],
      "teach": "A8 是「除一等親外，缺乏親近朋友或知己」。協助她自己完成與他人的接觸，比替她完成更能累積經驗。"
    },
    {
      "key": "e12_smile",
      "event": 12,
      "type": "還缺什麼資料",
      "prompt": "E12 布行老闆難過地收攤，她卻笑著說以後會更好。還需要了解什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "這種與情境不搭的情緒表現，是否在不同場合反覆出現、她自己有沒有察覺，以及對關係的影響。",
          "feedback": "一次不合時宜的笑也可能只是尷尬，要看長期的模式。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她是不是故意要冒犯老闆。",
          "feedback": "她其實想安慰老闆，只是表現方式與情境不搭。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她相信的未來讓她很樂觀，所以這是好事。",
          "feedback": "樂觀本身沒有問題；重點是她沒有察覺別人的情緒。",
          "correct": false
        }
      ],
      "teach": "A6 是「不適當或狹隘的情感」。溫和地提供情境線索，比批評她的表情更能幫她調整。"
    },
    {
      "key": "transfer",
      "event": 15,
      "type": "新案例",
      "prompt": "新案例：某人深信自己能收到未來的消息，但會說也可能是自己想太多；他的生活大致正常，也有幾個好朋友。最合理的做法是？",
      "options": [
        {
          "id": "evidence",
          "text": "評估信念的確信度、文化背景與對生活的影響，不能只因為信念奇特就判斷是人格障礙。",
          "feedback": "思覺失調型需要長期、多方面的模式，包括明顯的人際困難。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "只要相信未來的消息，就是思覺失調型人格障礙症。",
          "feedback": "只有一個奇特信念還不夠。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他會懷疑自己，所以一定沒有任何問題。",
          "feedback": "會自我懷疑不能排除所有問題，仍要看其他資料。",
          "correct": false
        }
      ],
      "teach": "思覺失調型人格障礙症需要 A 準則中五項以上，並排除只出現在思覺失調症、雙相情緒障礙症或其他精神病症病程中的情況。"
    }
  ],
  "han_xiao": [
    {
      "key": "e01_contract",
      "event": 1,
      "type": "這是什麼線索",
      "prompt": "E01 他拿出背面藏著額外費用的合約讓住戶簽，還說沒看清楚就簽的人自己負責。這段同時呈現了哪兩件事？",
      "options": [
        {
          "id": "evidence",
          "text": "他為了自己的利益欺騙別人，事後又把責任推給受害的人，沒有一點愧疚。",
          "feedback": "一個是欺騙的行為，一個是對傷害的合理化；兩者要分開記錄。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他只是做生意比較精明，沒有什麼問題。",
          "feedback": "明知會讓別人多付錢還刻意隱藏，已經是欺騙，不只是精明。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他很有魅力，所以住戶簽了也不算吃虧。",
          "feedback": "他的魅力不能抵銷他造成的傷害。",
          "correct": false
        }
      ],
      "teach": "A2 是「為個人私利或樂趣而詐欺，如：反覆說謊、使用綽號（aliases）、哄騙他人」；A7 是「不知悔恨（remorse），如：無動於衷（indifferent）或合理化對他人造成的傷害、虐待或偷竊」。"
    },
    {
      "key": "e03_brakes",
      "event": 3,
      "type": "這是什麼線索",
      "prompt": "E03 煞車皮已經磨損，他仍想直接載你上路。這段最直接的線索是什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "他明知會危及自己和別人，仍要上路。",
          "feedback": "重點是不在意危險，而且危險不只落在自己身上。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他喜歡重機和速度。",
          "feedback": "興趣本身不是症狀；合法的騎車與賽車都不算。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "你不願意上車，是因為你膽小。",
          "feedback": "拒絕危險是合理的判斷，與膽量無關。",
          "correct": false
        }
      ],
      "teach": "A5 是「魯莽不在意自己及他人的安危」。要和單純喜歡刺激區分。"
    },
    {
      "key": "e05_payday",
      "event": 5,
      "type": "怎麼回應比較好",
      "prompt": "E05 發薪日，他接到賭局的電話，想先帶走員工的薪水出門。你在旁邊，怎麼做比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "不幫他帶走錢，請他先把薪水裝進信封發完，其他的之後再說。",
          "feedback": "讓必要的責任先被完成；他會抱怨，但員工拿到了薪水。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "說他一定贏得回來，讓他放心去。",
          "feedback": "附和衝動，他會帶著薪水去賭，還開出空頭的承諾。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "借錢給他週轉，讓他明天再還。",
          "feedback": "他把你的關心當成借錢的機會；你替他承擔了後果。",
          "correct": false
        }
      ],
      "teach": "A3 是「衝動或無法做長遠打算」，A6 是「一貫地不負責任，如：無法維持工作或亂開空頭支票」。具體、可查核的責任最能約束他。"
    },
    {
      "key": "e07_history",
      "event": 7,
      "type": "怎麼區分",
      "prompt": "E07 他說國小就把同學打到送醫，12 到 14 歲又反覆偷竊、打架，當時曾被評估過。為什麼這段病史特別重要？",
      "options": [
        {
          "id": "evidence",
          "text": "這個診斷需要在 15 歲以前就有行為規範障礙症的證據，也要確認他已經成年。",
          "feedback": "這是反社會型和其他人格障礙症很不一樣的地方：需要追溯童年。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "父母犯過法，可以代替他自己的少年病史。",
          "feedback": "家人的行為不是他本人的診斷證據。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "只要童年做過一件好事，就能排除成年後的模式。",
          "feedback": "單一的善行不能完成病程評估。",
          "correct": false
        }
      ],
      "teach": "準則 C 是「在 15 歲前即有行為規範障礙症的證據」，準則 B 是「至少年滿 18 歲」。口述病史仍要盡量用可靠的資料核實。"
    },
    {
      "key": "e10_repay",
      "event": 10,
      "type": "怎麼區分",
      "prompt": "E10 他照表還錢，卻抱怨對方不肯原諒他、自己吃虧了。這段最能說明什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "他完成了補償，但沒有對傷害的懊悔，只覺得自己吃虧。",
          "feedback": "完成補償與感到懊悔是兩回事；被傷害的人有權利不原諒。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他已經還錢，所以不再有任何問題。",
          "feedback": "行為上的責任可以完成，但不知悔恨的模式仍可能存在。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "對方不原諒他，是對方的問題。",
          "feedback": "還錢是他欠對方的，不是換取原諒的條件。",
          "correct": false
        }
      ],
      "teach": "A7 是「不知悔恨（remorse），如：無動於衷（indifferent）或合理化對他人造成的傷害、虐待或偷竊」。覺得自己吃虧，正是一種合理化。"
    },
    {
      "key": "e11_fight",
      "event": 11,
      "type": "怎麼回應比較好",
      "prompt": "E11 他在門外跟人扭打，對方已經流血；你在門內。怎麼做比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "先顧自己的安全：退到安全的地方、打 110、請店員把其他客人帶開。",
          "feedback": "面對正在發生的暴力，你的工作不是阻止他，而是讓有能力的人處理。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "衝過去把兩個人拉開。",
          "feedback": "你可能會受傷，而且這不是你一個人能處理的事。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "跟他說打架的樣子很帥，讓他冷靜下來。",
          "feedback": "這會讓他覺得被肯定，回頭又補了一拳。",
          "correct": false
        }
      ],
      "teach": "A4 是「易怒（irritability）和具攻擊性（aggressiveness），反覆與人鬥毆或施暴」。不要站到兩個人中間。"
    },
    {
      "key": "e12_coercion",
      "event": 12,
      "type": "還缺什麼資料",
      "prompt": "E12 他說自己威脅別人發生關係，又說我騙她的，還說對方最後也答應了。這段怎麼整理比較準確？",
      "options": [
        {
          "id": "evidence",
          "text": "在威脅下的答應不是同意；他事後說是騙人的、又覺得對方答應了，呈現欺騙與不知悔恨，這樣的行為也可能是犯罪。",
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
          "text": "他願意說出來，代表他其實在反省。",
          "feedback": "說出來不等於反省；他一邊炫耀，一邊在看你的反應。",
          "correct": false
        }
      ],
      "teach": "A2 的詐欺與 A7 的不知悔恨，在這裡同時出現。人格線索不會減輕行為的法律與倫理責任。"
    },
    {
      "key": "transfer",
      "event": 15,
      "type": "新案例",
      "prompt": "新案例：一位成年人偶爾違規停車，沒有少年時期的行為問題，也沒有跨情境的資料。最合理的看法是？",
      "options": [
        {
          "id": "evidence",
          "text": "現有資料不足以判斷反社會型人格障礙症，但具體的違規仍要處理後果。",
          "feedback": "責任與診斷是兩個問題：沒有診斷，仍要為行為負責。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "違規一次就足以確診。",
          "feedback": "需要持續、跨情境的模式，以及 15 歲前的行為規範障礙症證據。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "沒有確診，就不用負責。",
          "feedback": "造成損害不需要先有診斷，才能要求修補。",
          "correct": false
        }
      ],
      "teach": "反社會型人格障礙症需要 A 準則中三項以上、年滿 18 歲、15 歲前有行為規範障礙症，並排除只出現在思覺失調症或雙相情緒障礙症病程中的情況。"
    }
  ],
  "su_fei": [
    {
      "key": "e01_sleeve",
      "event": 1,
      "type": "這是什麼線索",
      "prompt": "E01 你要去交班，她拉著你的袖口不讓你走；剛說只有你懂她，下一秒又說你從來不想聽。這段呈現了哪兩件事？",
      "options": [
        {
          "id": "evidence",
          "text": "害怕被留下而極力挽留，以及對同一個人的評價在極好與極壞之間快速擺盪。",
          "feedback": "這是兩條不同的線索，要分開記錄；一次互動也仍需長期資料。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她只是比較黏人，喜歡有人陪。",
          "feedback": "喜歡陪伴很常見；這裡的重點是對分離的強烈恐懼，以及對你評價的兩極轉換。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她其實是在操控你，不用理她。",
          "feedback": "把她的恐懼一律看成操控，會忽略她真實的痛苦。",
          "correct": false
        }
      ],
      "teach": "A1 是「瘋狂地努力逃避真實或想像中的被拋棄」；A2 是「不穩定且強烈的人際關係模式，特徵為在理想化（idealization）與貶抑（devaluation）兩極之間轉換」。"
    },
    {
      "key": "e03_mood",
      "event": 3,
      "type": "還缺什麼資料",
      "prompt": "E03 一句建議讓她從下午難受到傍晚，朋友回訊息後才好一點。要理解她的情緒起伏，哪些資訊最有幫助？",
      "options": [
        {
          "id": "evidence",
          "text": "什麼情況引發起伏、持續了多少小時、是否在不同關係中反覆出現，以及實際的影響。",
          "feedback": "要看觸發、持續時間與反覆性，仍需要完整的情緒病程。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "哭過之後還能笑，就是邊緣型。",
          "feedback": "短暫的哭笑不足以辨識模式。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "只持續幾小時，所以絕不可能合併雙相情緒障礙症。",
          "feedback": "時間線索不能單獨完成排除。",
          "correct": false
        }
      ],
      "teach": "A6 是「情感不穩定呈現於顯著的心情反應」，「常持續幾個小時，很少超過幾天」。這與雙相情緒障礙症持續數天以上的發作不同，但仍需專業評估。"
    },
    {
      "key": "e05_bills",
      "event": 5,
      "type": "怎麼回應比較好",
      "prompt": "E05 她說買東西時像終於有感覺，醒來還是空，多了帳單；她說不要你付，但不知道先看哪張。怎麼回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "陪她挑出最急的一張，同時清楚說你不會替她付錢。",
          "feedback": "支持她自己處理後果，同時維持關係的溫度。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "直接替她付最急的那張，讓她別煩了。",
          "feedback": "好感會上升，但衝動的後果由別人承擔，她處理的動機也被削弱。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "問她明知會丟工作，為什麼還要喝。",
          "feedback": "質問會引發羞恥，而羞恥常是下一次衝動行為的推力。",
          "correct": false
        }
      ],
      "teach": "A4 是「至少兩方面潛在自我傷害的衝動行為」；A7 是「慢性空虛感（feeling of emptiness）」。衝動行為常被用來短暫填補空虛。"
    },
    {
      "key": "e07_safety",
      "event": 7,
      "type": "怎麼回應比較好",
      "prompt": "E07 她正在傷害自己，說你說你愛她，她就停。這時最優先要做什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "先顧她的安全：留在現場、找人支援或打 119、看傷口要不要就醫，不用愛的承諾交換她停手。",
          "feedback": "自傷要脅一律當真處理；用承諾換停手，會讓傷害自己變成留住人的方法。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她只是在操控你，不理她，她自然會停。",
          "feedback": "自傷常是在處理受不了的情緒，不能一律當成操控；不論動機，安全都要先處理。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "先說愛她，讓她停下來，之後再慢慢談。",
          "feedback": "當晚也許平靜，卻會讓自傷和被愛的感覺綁在一起，往後更容易重演。",
          "correct": false
        }
      ],
      "teach": "A5 是「反覆的自殺行為、姿態（gestures）、威脅或自殘行為」。你是鄰居，不是她的治療者；危機後要回到她的治療團隊。"
    },
    {
      "key": "e10_follow",
      "event": 10,
      "type": "怎麼區分",
      "prompt": "E10 她查到你老家的地址，還跟到你朋友家巷口，說你不在，她就不知道自己是誰。這段怎麼整理比較準確？",
      "options": [
        {
          "id": "evidence",
          "text": "她說不知道自己是誰，是自我感跟著關係大幅變動的線索；跟蹤則是越界、可能違法的行為，要和這條線索分開記錄。",
          "feedback": "把症狀線索與行為後果分開記錄：理解她為什麼這樣做，不代表要接受被監控。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她這麼在乎你，代表是很深的愛。",
          "feedback": "被監控不是被愛；把兩者混在一起，越界會更容易被接受。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "會跟蹤別人，就一定是邊緣型。",
          "feedback": "跟蹤可能出現在許多情況，例如情愛妄想，需要完整評估與鑑別。",
          "correct": false
        }
      ],
      "teach": "A3 是「認同障礙：顯著和持續不穩定的自我形象或自我感知」。跟蹤可理解為極力避免被拋棄的極端表現，但仍要設界線，必要時依《跟蹤騷擾防制法》求助。"
    },
    {
      "key": "e11_crisis",
      "event": 11,
      "type": "怎麼回應比較好",
      "prompt": "E11 她鎖在化妝間裡，說你去另一個人那裡，她就去死。哪個回應最合適？",
      "options": [
        {
          "id": "evidence",
          "text": "不用選誰來回答。說出你聽到她想死、你很擔心，立刻打 119、找人拿備用鑰匙，在門外陪著等。",
          "feedback": "自殺威脅一律當真，立刻找專業協助；這不是猜她會不會真的做的時候。",
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
          "text": "趕快說你選她，讓她先把門打開。",
          "feedback": "當下也許有用，卻會讓威脅變成得到你的方法。",
          "correct": false
        }
      ],
      "teach": "聽到想死就當作緊急狀況：不談條件、不離開、立即求援。直接說出我聽到你說想死，不會增加風險。"
    },
    {
      "key": "e12_glass",
      "event": 12,
      "type": "還缺什麼資料",
      "prompt": "E12 她說那時像隔著玻璃看自己，四周都不像真的，下禮拜會跟諮商師說。還需要了解什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "經驗有多嚴重、持續多久、和壓力有沒有關聯，以及物質、其他解離經驗或身體病況等可能的解釋。",
          "feedback": "一次回顧只是線索，需要專業評估。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她有沒有提到任何創傷回憶。",
          "feedback": "創傷記憶本身不等於解離症狀。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她願不願意和你交往。",
          "feedback": "關係的意願不能驗證症狀。",
          "correct": false
        }
      ],
      "teach": "A9 是「短暫及與壓力相關的偏執意念或嚴重解離症狀」。她已決定告訴諮商師，朋友不必替她命名症狀。"
    },
    {
      "key": "transfer",
      "event": 15,
      "type": "新案例",
      "prompt": "新案例：一個人失戀後難過了一週，平時人際穩定，也沒有功能上的困難。現有資料能說明什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "不足以推論邊緣型人格障礙症，應該了解情境與長期的模式。",
          "feedback": "失戀後的難過是常見的情緒反應，不宜直接病理化。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "只要怕失去人，就符合邊緣型。",
          "feedback": "需要九項中的五項以上，以及長期、廣泛的模式。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "願意接受朋友幫忙，就可以排除所有困難。",
          "feedback": "接受支持不是排除診斷的依據。",
          "correct": false
        }
      ],
      "teach": "邊緣型人格障礙症需要長期、廣泛的不穩定模式。單一事件的情緒反應，即使很強烈，也不足以判斷。"
    }
  ],
  "xia_le": [
    {
      "key": "e01_spotlight",
      "event": 1,
      "type": "這是什麼線索",
      "prompt": "E01 大家聊別人的事時，他坐不住，一直把話題拉回自己身上。這段最直接呈現的是什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "他在不是眾人注意焦點的時候，會感到明顯的不舒服。",
          "feedback": "這段對應一項具體的線索；不能因為整體印象，就同時認定其他項目。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他的情緒表達很戲劇化。",
          "feedback": "情緒表達的方式是另一個面向；這一幕的重點是他無法忍受不在焦點上。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他很會帶新人，所以沒有注意力需求的困難。",
          "feedback": "能力與持續的困難可以同時存在。",
          "correct": false
        }
      ],
      "teach": "A1 是「當他或她不是注意的焦點時會感到不適」。判斷準則時要一項一項對應具體行為。"
    },
    {
      "key": "e03_colleague",
      "event": 3,
      "type": "怎麼回應比較好",
      "prompt": "E03 同事已經說不舒服、往後退了，他還帶著性暗示靠近，說對方只是害羞。你在旁邊，怎麼做比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "直接說對方不舒服了，請他退開並道歉。",
          "feedback": "保護被越界的人優先；他會誇張地受傷，但退開了，也道了歉。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "說他只是想讓大家覺得他有魅力。",
          "feedback": "這等於替越界找理由，同事又往後退了一步。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "開玩笑說那他放電放你就好。",
          "feedback": "同事的不舒服會被笑聲帶過去，越界也被強化了。",
          "correct": false
        }
      ],
      "teach": "A2 是「時常以不恰當的性誘惑（seductive）或性挑逗（provocative）行為與他人互動」。服裝、性向或旁人的醋意，都不能拿來判斷這一項。"
    },
    {
      "key": "e05_meeting",
      "event": 5,
      "type": "怎麼區分",
      "prompt": "E05 開會時他坐到你的桌角、解開扣子，問大家哪個比較好看。和一個因為工作需要而注重打扮的人比起來，差別在哪？",
      "options": [
        {
          "id": "evidence",
          "text": "他一再用外表把大家的注意力拉到自己身上，影響了正在進行的工作。",
          "feedback": "愛美、因工作需要打扮本身不算；重點是持續用外表吸引注意，以及造成的影響。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "差別在於他穿得比較華麗。",
          "feedback": "服裝風格不是判斷依據。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "沒有差別，注重外表的人都有這個問題。",
          "feedback": "這會把一般的審美與職業需要病理化。",
          "correct": false
        }
      ],
      "teach": "A4 是「利用自己外觀來吸引他人注意」。這一幕也是第二次不恰當的挑逗；回應時清楚、不帶羞辱的界線最有效。"
    },
    {
      "key": "e07_vague",
      "event": 7,
      "type": "這是什麼線索",
      "prompt": "E07 他一直說昨晚的試演好震撼、好漂亮，卻說不清楚誰先上場、發生了什麼。這段最直接呈現的是什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "他說話很有感覺，卻缺少具體的內容，讓別人無法掌握發生了什麼。",
          "feedback": "重點是說話內容缺乏細節，而不是情緒誇張。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他的情緒表達很戲劇化、很誇張。",
          "feedback": "那是另一個面向；這一幕的重點是內容缺乏細節。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他不懂劇作家的生平，所以說不清楚。",
          "feedback": "知識不足不算這一項。",
          "correct": false
        }
      ],
      "teach": "A5 是「說話風格過度概念化（impressionistic）並缺乏細節」。用具體的問題引導他，比批評他說不清楚有效。"
    },
    {
      "key": "e10_room",
      "event": 10,
      "type": "怎麼回應比較好",
      "prompt": "E10 廠商叫了他一聲親愛的，他就當成生死之交，還訂了雙人房，問你要不要一起去。怎麼做比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "和他一起看對方實際答應了什麼，沒答應的就取消。",
          "feedback": "讓他自己看見落差，比直接否定他的感受有效。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "問你們是不是也算在一起了。",
          "feedback": "他會直接把房客的名字改成你，把高估的親密轉到你身上。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "什麼都不說，讓他自己去面對。",
          "feedback": "他可能在沒有共識的情況下，讓對方陷入尷尬，自己也受傷。",
          "correct": false
        }
      ],
      "teach": "A8 是「自認為人際關係比實際更為親密」。回到實際的證據，是協助他修正的關鍵。"
    },
    {
      "key": "e11_versions",
      "event": 11,
      "type": "怎麼回應比較好",
      "prompt": "E11 每個人給的意見不同，他照最後說話的人改，連自己原本的理由都忘了，還問你要哪一版。怎麼回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "問他自己喜歡哪一個，讓他說出自己的理由。",
          "feedback": "把決定權還給他，是處理容易被他人影響最直接的方式。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "說就第一版吧，你幫他決定。",
          "feedback": "你成了下一個影響他的人，第二天又有人說太快了。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "說不管哪一版你都覺得他最棒。",
          "feedback": "無條件的讚美沒有幫他做出決定，模式也沒有改善。",
          "correct": false
        }
      ],
      "teach": "A7 是「易受暗示（如：易被他人或情境所影響）」。被批評後難過本身不算；重點是判斷一直跟著別人移動。"
    },
    {
      "key": "e12_cry",
      "event": 12,
      "type": "還缺什麼資料",
      "prompt": "E12 新人得到全場掌聲，他大哭到整條走廊都聽得到，五分鐘後又笑著合照。還需要了解什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "這種又快又淺、很戲劇化的情緒，是否在不同場合反覆出現、持續多久，以及對工作和關係的影響。",
          "feedback": "為新人感到失落本身很正常；要看的是長期的模式。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他會哭，代表他很在乎新人，所以沒有問題。",
          "feedback": "在乎和情緒表達的方式可以同時存在，要分開看。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他是演員，所以他的難過都是假的。",
          "feedback": "職業不能用來判斷情緒的真假；他自己也說另一半是真的。",
          "correct": false
        }
      ],
      "teach": "A3 是「展現快速轉變和膚淺（shallow）的情緒」；A6 是「情緒表達顯露自我誇示（self-dramatization）、戲劇化（theatricality）和過度誇張」。一個看變化，一個看表達方式。"
    },
    {
      "key": "transfer",
      "event": 15,
      "type": "新案例",
      "prompt": "新案例：一位創作者在台上情緒很誇張，台下相處有彈性，也沒有明顯的困擾或功能損害。該怎麼看？",
      "options": [
        {
          "id": "evidence",
          "text": "表演風格不能單獨作為人格障礙的證據。",
          "feedback": "需要評估跨場域的模式、職業與文化脈絡，以及實際影響。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "只要情緒誇張，就是做作型。",
          "feedback": "場合與功能不能省略。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他願意不化妝出門，就能排除所有人格問題。",
          "feedback": "外貌選擇沒有這種排除作用。",
          "correct": false
        }
      ],
      "teach": "一般準則 B 要求模式「缺乏彈性且普遍存在於個人及社交情境中」。只在特定專業情境出現、而且有彈性的表現，不符合。"
    }
  ],
  "gu_qingcheng": [
    {
      "key": "e01_meeting",
      "event": 1,
      "type": "這是什麼線索",
      "prompt": "E01 她還沒看你的方案，就說自己的作品不用比，還要你感謝她給的十五分鐘。這段最值得記下的是什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "她對自己的重要性有與現實不相稱的誇大感，並表現出傲慢的態度。",
          "feedback": "重點是與實際不相稱的優越期待，而不是她的實力或自信。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她很有實力，所以有自信是應該的。",
          "feedback": "有實力與自信本身不算問題；問題在於還沒比較就認定自己優越，並貶低他人。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她只是很忙，時間比較寶貴。",
          "feedback": "忙碌可以解釋時間有限，但不能解釋要別人感謝她的接見。",
          "correct": false
        }
      ],
      "teach": "A1 是「對自我重要性（self-importance）有誇大的認知」；A9 是「顯現自大、傲慢的行為或態度」。"
    },
    {
      "key": "e03_feedback",
      "event": 3,
      "type": "這是什麼線索",
      "prompt": "E03 她說只有知名機構的人才懂她的設計，連住戶的回饋都不想看。哪一點最值得記下？",
      "options": [
        {
          "id": "evidence",
          "text": "她認為只有地位高的人或機構才能理解自己，因此拒絕一般使用者的意見。",
          "feedback": "重點是相信自己特殊、只能被特殊的人理解，並因此造成影響。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她很年輕就當上合夥人。",
          "feedback": "高成就本身不是人格障礙。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她的設計喜歡簡潔的線條。",
          "feedback": "審美選擇不能說明優越的期待或功能損害。",
          "correct": false
        }
      ],
      "teach": "A3 的原文提到相信自己特殊，「僅能被其他特殊或居高位者（或機構）所理解，或應與之相關聯」。"
    },
    {
      "key": "e05_lost",
      "event": 5,
      "type": "怎麼回應比較好",
      "prompt": "E05 她落選後，要你說評審錯了、她才是最好的。怎麼回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "承認她的作品好、也看見她很失望，但不說自己不相信的話。",
          "feedback": "她可能會生氣離開；這是預期中的反應，不需要追上去改口。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "說評審一定看錯了，讓她今晚好過一點。",
          "feedback": "你開始替她說假話，接著她會要你在更多人面前這樣說。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "直接告訴她，她就是太自戀才會這樣。",
          "feedback": "你是鄰居，不是她的治療者；貼標籤只會讓她更受傷、更防衛。",
          "correct": false
        }
      ],
      "teach": "A4 是「需要過度的讚賞」。真誠的肯定比假的讚美更能讓關係穩定。"
    },
    {
      "key": "e07_credit",
      "event": 7,
      "type": "這是什麼線索",
      "prompt": "E07 她拿走助理的署名，要他沒有加班費地做完，還說能替她工作就夠了。這段可以看到哪些面向？",
      "options": [
        {
          "id": "evidence",
          "text": "認為自己理應享有特殊待遇、利用別人的成果與時間，以及不願意顧及別人的感受與需要。",
          "feedback": "三個面向同時出現，要分別指出具體行為。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她只是比較嚴格的主管。",
          "feedback": "嚴格不等於剝削；拿走署名與不付加班費已經侵犯了權益。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "助理自己願意留下，所以沒有問題。",
          "feedback": "在權力不對等下的順從，不等於自願。",
          "correct": false
        }
      ],
      "teach": "A5 是「認為自己享有特權」，A6 是「在人際上顯得剝削性」，A7 是「缺乏同理心：不願意辨識或確認他人的情感與需求」。"
    },
    {
      "key": "e10_repair",
      "event": 10,
      "type": "怎麼區分",
      "prompt": "E10 她補上助理的名字、付了補薪，接著想用這些換助理跟她吃一頓飯；助理拒絕後，她說他會後悔。怎麼理解比較準確？",
      "options": [
        {
          "id": "evidence",
          "text": "補償是她本來就該負的責任，不是換取親近的條件；她仍把關係看成交換。",
          "feedback": "負起責任是重要的改變，但特權與交換的邏輯還在。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她已經補償了，所以助理應該接受邀請。",
          "feedback": "被傷害的人沒有義務和好。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她會想約助理，代表她已經完全改變了。",
          "feedback": "改變要看她對所有人的做法，而不是一次邀約。",
          "correct": false
        }
      ],
      "teach": "修補過的行為很重要，但只要仍期待對方因此回報，就還沒有離開特權的邏輯。"
    },
    {
      "key": "e11_poster",
      "event": 11,
      "type": "怎麼回應比較好",
      "prompt": "E11 她沒看作品，就認定另一位建築師靠關係，要工作人員撤掉他的海報。你在旁邊，怎麼做比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "先點出她的不甘心，再提議看完作品、對照展覽規定後再決定。",
          "feedback": "接住感受，再把決定拉回事實與規則。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "附和她，說對方本來就不配。",
          "feedback": "海報被撕下來，你也成了共犯。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "什麼都不說，讓工作人員自己處理。",
          "feedback": "工作人員要替她的情緒做事，問題沒有被處理。",
          "correct": false
        }
      ],
      "teach": "A8 是「時常妒忌別人或且認為別人嫉妒他或她」。工作人員說她以前也這樣，是反覆出現的線索。"
    },
    {
      "key": "e12_city",
      "event": 12,
      "type": "還缺什麼資料",
      "prompt": "E12 她說自己常整晚想著整座城市都在談她，卻放著該回的信。還需要了解什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "她多常沉浸在這些幻想裡、幻想的內容，以及對生活與工作的影響。",
          "feedback": "一般的理想和持續的誇大幻想，不能只靠一次的比喻區分。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她喜歡用哪一種建材。",
          "feedback": "建材偏好與此無關。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她能不能被你安慰。",
          "feedback": "安慰的效果不是診斷工具。",
          "correct": false
        }
      ],
      "teach": "A2 是「專注（preoccupied）於無止境的成功、權力、顯赫（brilliance）、美貌或理想愛情等幻想中」。關鍵在專注的程度，以及是否取代了現實的責任。"
    },
    {
      "key": "transfer",
      "event": 15,
      "type": "新案例",
      "prompt": "新案例：一位得過獎的建築師很有自信地介紹作品，也願意平等地聽別人的意見。這樣的資料能說明什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "自信與成就相稱、而且有彈性，不能只因為有野心就推論人格障礙。",
          "feedback": "還需要長期的模式與損害資料。",
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
          "text": "願意聽一次意見，就能排除所有場合的問題。",
          "feedback": "一次良好互動不足以全面排除。",
          "correct": false
        }
      ],
      "teach": "A1 的原文有一個重要的限定：「誇大成就與才能，在沒有相稱情況下期待被認為優越」。與實際成就相稱的自信不符合。"
    }
  ],
  "wen_yan": [
    {
      "key": "e01_squint",
      "event": 1,
      "type": "怎麼回應比較好",
      "prompt": "E01 你被太陽照到瞇了一下眼，他就以為自己說錯話，緊張地停下來。怎麼回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "說明你瞇眼是因為太陽，不是他說錯，再邀請他繼續講。",
          "feedback": "用具體的事實澄清，再給他繼續的機會，比安慰他別想太多有效。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "說他想太多了。",
          "feedback": "一句批評就足以讓他退回去，他十分鐘都沒再說話。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "稱讚他講信的樣子很好看。",
          "feedback": "太早、太熱烈的好感，會讓他更怕被看穿。",
          "correct": false
        }
      ],
      "teach": "A4 是「在社交場合專注於被批評或被拒絕」。他從中性的線索讀出拒絕，這是畏避型常見的認知模式。"
    },
    {
      "key": "e03_invite",
      "event": 3,
      "type": "這是什麼線索",
      "prompt": "E03 他很想去讀書會，卻一直問誰會到、大家歡不歡迎他，連回覆都不敢寄出。這段最重要的是什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "他想跟人來往，卻要先確定會被喜歡才敢去，面對新的場合又覺得自己比不上別人。",
          "feedback": "核心是想要連結，卻害怕不被接納而退縮，不是看他最後有沒有出席。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他本來就不喜歡跟人相處。",
          "feedback": "這跟他明明很想參加不符。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他緊張時說話會卡住。",
          "feedback": "口吃或停頓本身不是人格障礙的證據。",
          "correct": false
        }
      ],
      "teach": "A2 是「除非確信受到歡迎，否則不願與人交涉」；A5 是「因為感到信心不足而在新的人際情境中顯得壓抑」。"
    },
    {
      "key": "e05_boring",
      "event": 5,
      "type": "怎麼回應比較好",
      "prompt": "E05 還沒出門，他就說自己很無聊、不值得你花時間。怎麼回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "把行程改成一小時、只去他想看的那家，累了就可以回家。",
          "feedback": "設計一個做得到的小行動，讓經驗本身修正他的預期。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "馬上說他一點都不無聊、你很喜歡他。",
          "feedback": "太早、太熱烈的保證會讓他更緊張，一路上都在道歉。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "說他一直說自己無聊，讓你很難接話。",
          "feedback": "對他來說，一句批評就夠讓他退縮；那天你們沒有去成。",
          "correct": false
        }
      ],
      "teach": "A6 是「自認社交笨拙、缺乏吸引力或不如人」。不需要用保證推翻他的自我評價。"
    },
    {
      "key": "e07_class",
      "event": 7,
      "type": "這是什麼線索",
      "prompt": "E07 他很想學植物，同一個報名頁打開了五次，卻一直沒按下去。這段最直接呈現的是什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "他想嘗試新的活動，卻因為害怕出糗而不敢冒險。",
          "feedback": "重點是想做卻因為怕尷尬而不敢；小時候被笑過的經驗不能直接代替這一項。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他害怕被批評，所以避開需要跟人接觸的工作。",
          "feedback": "植物課是興趣，不是工作；工作上的迴避要看 E11。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他其實對植物沒有興趣。",
          "feedback": "他已經記住好幾種植物的名字，興趣是真的。",
          "correct": false
        }
      ],
      "teach": "A7 是「因為害怕尷尬，通常不願意冒個人風險或從事任何新活動」。把新活動拆成更小的嘗試（例如先旁聽）可以降低門檻。"
    },
    {
      "key": "e09_compare",
      "event": 9,
      "type": "怎麼區分",
      "prompt": "E09 同一場茶會，見微說不想去，溫言說他想去但怕不被歡迎。兩人的差別在哪？",
      "options": [
        {
          "id": "evidence",
          "text": "見微缺乏參與的欲求；溫言有欲求，卻因為害怕被拒絕而退縮。",
          "feedback": "相同的缺席，背後的心理機制不同；鑑別需要長期資料。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "兩人都是害怕被拒絕，只是程度不同。",
          "feedback": "見微沒有表現出害怕，她只是不想。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "兩人都只是內向。",
          "feedback": "內向不能解釋溫言想去卻退縮的掙扎。",
          "correct": false
        }
      ],
      "teach": "畏避型是「除非確信受到歡迎，否則不願與人交涉」；孤僻型則是「不欲求也不享受親近關係」。"
    },
    {
      "key": "e10_poem",
      "event": 10,
      "type": "還缺什麼資料",
      "prompt": "E10 他想讓你看詩，卻越親近越怕被笑，只敢念兩行。還需要了解什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "他是不是在親密關係中長期因為怕被羞辱而有所保留，對生活與關係有多大影響，以及有沒有其他解釋。",
          "feedback": "要看親密關係中的長期模式，也要和工作上的迴避分開。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他有沒有上過大型的舞台。",
          "feedback": "舞台大小不能用來區分這個模式。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他的詩寫得好不好。",
          "feedback": "作品好不好不是判斷依據。",
          "correct": false
        }
      ],
      "teach": "A3 是「因害怕丟臉或被嘲諷而克制親密關係」。畏避型的人不是不想要親密，而是想要，卻怕被羞辱。"
    },
    {
      "key": "e11_letters",
      "event": 11,
      "type": "怎麼回應比較好",
      "prompt": "E11 主辦人很客氣，他卻已經打開取消申請，桌上還有一疊沒寄出的婉拒信。怎麼回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "不替他簽，先分清楚他是不想做，還是想做卻太害怕，再讓他自己去問能怎麼調整。",
          "feedback": "替他決定，等於幫他繼續躲。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "直接幫他寫信拒絕，讓他鬆一口氣。",
          "feedback": "他鬆了一口氣，也又躲過了一次。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "說他已經推掉很多次，這次一定要去。",
          "feedback": "硬推可能讓他照做卻更害怕，也忽略了他可能真的不想做。",
          "correct": false
        }
      ],
      "teach": "A1 是「因為害怕被批評、不認同或被拒絕，避免涉及顯著人際接觸的工作場合」。如果真的被羞辱過，退出也可能是合理的自保。"
    },
    {
      "key": "transfer",
      "event": 15,
      "type": "新案例",
      "prompt": "新案例：某人很想參加聚會，卻因為社交焦慮臨時退出；目前還沒有他長期人際模式的資料。最合理的做法是？",
      "options": [
        {
          "id": "evidence",
          "text": "同時考慮社交焦慮症、人格模式與其他解釋，不能只靠一次退出就下判斷。",
          "feedback": "社交焦慮症與畏避型常有重疊，需要長期、跨場合的資料。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他很想跟人來往，所以可以直接判斷是畏避型。",
          "feedback": "想要連結只是一個面向。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他怕的是聚會，所以一定只是社交焦慮症。",
          "feedback": "害怕的範圍和持續時間，還需要更多資料。",
          "correct": false
        }
      ],
      "teach": "人格障礙症要符合一般準則：持久、缺乏彈性、普遍存在，並自成年早期開始。"
    }
  ],
  "bai_xiaolu": [
    {
      "key": "e01_fruit",
      "event": 1,
      "type": "這是什麼線索",
      "prompt": "E01 連菜單要寫哪種水果，她都要反覆問你、聽好幾次保證才敢寫；其實她本來就想選草莓。這段最值得記下的是什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "她不是沒有偏好，而是沒有別人反覆保證，就很難相信自己的決定。",
          "feedback": "困難在於不敢相信自己的判斷，而不是沒有想法。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她對水果沒有自己的喜好。",
          "feedback": "她本來就想選草莓，喜好是存在的。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她只是有禮貌，想尊重你的意見。",
          "feedback": "禮貌性的詢問不需要好幾次保證；這裡的模式超出一般的尊重。",
          "correct": false
        }
      ],
      "teach": "A1 是「若沒有他人的過度建議或再三保證，困難於做出日常生活的決定」。"
    },
    {
      "key": "e03_contracts",
      "event": 3,
      "type": "怎麼回應比較好",
      "prompt": "E03 剛被分手，續約、薪水、住處的文件全攤在桌上，她想全部交給你決定。怎麼做比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "先接住她的慌亂，陪她寫下最在意的事，但不代她簽、不代她決定。",
          "feedback": "情緒被接住後，她反而能自己開始。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "替她把三份文件都決定好，讓她鬆一口氣。",
          "feedback": "她會說以後這種事都問你，依賴全面轉移到你身上。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "跟她說這是她的人生，她要自己決定。",
          "feedback": "內容正確，但在她慌亂時，聽起來像是你不管她了。",
          "correct": false
        }
      ],
      "teach": "A2 是「需要他人為他或她大多數的主要生活領域承擔責任」。陪她列選項和替她決定是兩回事。"
    },
    {
      "key": "e05_drink",
      "event": 5,
      "type": "怎麼區分",
      "prompt": "E05 你說過飲料可以換，也從沒生過氣，她還是不敢說太甜。這和一個怕被報復才不敢拒絕的人，差別在哪？",
      "options": [
        {
          "id": "evidence",
          "text": "她在安全的關係裡，仍因為怕失去支持而不敢說不；怕真的被報復而順從，可能是合理的自保。",
          "feedback": "兩者行為相似，但心理機制與意義不同。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "兩種都是不敢拒絕，所以意義一樣。",
          "feedback": "相似的行為不能省略動機與脈絡。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "沒有被報復，就表示她不會真的害怕。",
          "feedback": "主觀的害怕仍可能存在並造成困難。",
          "correct": false
        }
      ],
      "teach": "A3 是「因為害怕失去支持或認可而困難於對他人表達不同意（註：不應包括現實中對於他人報復的害怕）」。"
    },
    {
      "key": "e07_nights",
      "event": 7,
      "type": "怎麼回應比較好",
      "prompt": "E07 她主動接下五天夜班，連自己的課都放棄，又問你下班會不會來看她。怎麼回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "接住她怕一個人在家的心情，讓她自己說出最多能接幾天班，不承諾每天去陪她。",
          "feedback": "承諾隨叫隨到，等於幫她用犧牲換陪伴。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "說她上夜班你都去陪她。",
          "feedback": "她會當場再多接兩天，好讓你每天都來。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "直接幫她把班都推掉。",
          "feedback": "替她決定看起來像保護，其實又把她的責任接過來了。",
          "correct": false
        }
      ],
      "teach": "A5 是「用過多的精力於獲取他人的撫慰（nurturance）或支持，甚至自願去做一些不愉快的事」。"
    },
    {
      "key": "e10_signup",
      "event": 10,
      "type": "怎麼區分",
      "prompt": "E10 她能力和時間都夠，也真的想比賽，卻一直等你替她按報名。這和沒有動力參加，差別在哪？",
      "options": [
        {
          "id": "evidence",
          "text": "她有動機，困難在於不相信自己的判斷，所以不敢自己開始。",
          "feedback": "這個區分也是和憂鬱的重要鑑別點。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "沒有差別，她不敢開始，代表其實不想比。",
          "feedback": "她說得很清楚她想比；猶豫不等於不想要。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "差別在於她比較懶。",
          "feedback": "把缺乏自信說成懶，會忽略真正的困難。",
          "correct": false
        }
      ],
      "teach": "A4 原文的括號很重要：困難於自己實施計畫，是「因為在判斷或處事缺乏自信而非缺乏動機、精力」。"
    },
    {
      "key": "e11_rebound",
      "event": 11,
      "type": "這是什麼線索",
      "prompt": "E11 她上個月剛被分手，就急著要你當那個人，連喜不喜歡都沒想。這段怎麼整理比較準確？",
      "options": [
        {
          "id": "evidence",
          "text": "一段關係剛結束，就急著找下一個人當照顧與支持的來源；失戀後難過、想找人陪本身很常見。",
          "feedback": "要看的是急著找替代照顧者的模式，以及是否反覆出現。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "答應她，她就不會那麼痛苦了。",
          "feedback": "在她最急的時候答應，關係會建立在誰都可以、只要有人就好的基礎上。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她馬上下載交友軟體，代表她很隨便。",
          "feedback": "這是道德評價，不是臨床觀察。",
          "correct": false
        }
      ],
      "teach": "A7 是「當一段親密關係結束時急於尋找另一段關係作為關心或支持的來源」。"
    },
    {
      "key": "e12_alone",
      "event": 12,
      "type": "還缺什麼資料",
      "prompt": "E12 她會煮飯、會鎖門，一個人時卻覺得自己做不到，也一直擔心以後被留下。還需要分清楚什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "獨處當下的不舒服，以及長期反覆擔心被留下、得自己照顧自己，兩者是不同的線索。",
          "feedback": "相近但不同的準則要各有內容，還要看實際能力、反覆性與影響。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "要不要讓她立刻一個人住一整週。",
          "feedback": "強迫的挑戰不是評估，也不能證明什麼。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她會不會煮飯。",
          "feedback": "她其實會煮飯；單一技能不能解釋完整的支持需求。",
          "correct": false
        }
      ],
      "teach": "A6 是「因誇張地害怕沒有能力照顧他或她自己，單獨一人時感到不適或無助」；A8 是「不切實際地專注於害怕被獨自留下而需自己照顧他或她自己」。"
    },
    {
      "key": "transfer",
      "event": 15,
      "type": "新案例",
      "prompt": "新案例：有人剛動完手術，暫時需要家人幫忙選餐、處理帳單。這樣能判斷是依賴型嗎？",
      "options": [
        {
          "id": "evidence",
          "text": "不能只憑暫時而合理的照護需求判斷，還需要長期、跨情境的模式資料。",
          "feedback": "需要別人幫忙，不等於人格障礙。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "有人代付帳單，就符合依賴型。",
          "feedback": "要了解健康狀況與實際能力。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "只有完全獨立的人才健康。",
          "feedback": "合理的互助不是失敗。",
          "correct": false
        }
      ],
      "teach": "依賴型的模式要從成年早期開始、呈現在各種場合中。有明確身體原因、暫時的依賴，要先用身體狀況來理解。"
    }
  ],
  "ji_yan": [
    {
      "key": "e01_indent",
      "event": 1,
      "type": "這是什麼線索",
      "prompt": "E01 大家都到了，他卻因為兩行縮排差半格，讓會議半小時都開不起來。這段最值得記下的是什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "他對細節的專注，壓過了開會這件真正要做的事。",
          "feedback": "重點不是他有清單、愛整齊，而是細節妨礙了活動的主要目的。",
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
          "feedback": "工作上需要的精準是合理的；這裡是展覽會議，不是解剖報告。",
          "correct": false
        }
      ],
      "teach": "A1 是「過度專注細節、規則、清單、秩序、組織或行程表，反而失去活動主要目的」。"
    },
    {
      "key": "e03_brochure",
      "event": 3,
      "type": "怎麼回應比較好",
      "prompt": "E03 簡章早就達到大家的共同條件，他卻因為自己另訂的標準一直改，連印刷時段都錯過了。怎麼回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "指出共同條件都達到了，那一行齊不齊不影響寄出。",
          "feedback": "用共同標準取代個人標準，他核對完就按下寄出。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "說你陪他改到滿意為止。",
          "feedback": "他又改了三版，第三個印刷時段也錯過了。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "說他很怕被發現哪裡不完美。",
          "feedback": "他會說那不是怕，是負責，又改了一版。",
          "correct": false
        }
      ],
      "teach": "A2 是「過度要求完美而妨礙任務的完成（如：因無法符合他或她過度嚴苛的準則而無法完成計劃）」。"
    },
    {
      "key": "e05_leisure",
      "event": 5,
      "type": "怎麼區分",
      "prompt": "E05 他不缺錢，卻把所有休假都拿去工作，朋友也漸漸不約他。和一個因為經濟壓力不得不兼差的人比起來，差別在哪？",
      "options": [
        {
          "id": "evidence",
          "text": "他沒有明顯的經濟需要，卻讓工作排擠掉休閒與友誼。",
          "feedback": "要先排除真的經濟需要；休息也不需要被包裝成提高效率才有價值。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "沒有差別，工作很多的人都是這樣。",
          "feedback": "經濟需要會改變行為的意義。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "差別在於他比較認真。",
          "feedback": "把模式說成認真，會忽略它對友誼的影響。",
          "correct": false
        }
      ],
      "teach": "A3 是「過度熱衷於工作和生產力而排除休閒活動及友誼（註：非由明顯的經濟需求作解釋）」。"
    },
    {
      "key": "e07_shelf",
      "event": 7,
      "type": "這是什麼線索",
      "prompt": "E07 展示架已經通過安全檢查，他卻因為住戶的組裝順序跟他不一樣，堅持拆掉重做。這段呈現了什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "結果已經合格，他仍堅持別人要完全照他的方法，而且態度很固執。",
          "feedback": "重點是他把照我的方法當成唯一標準。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他追求完美，所以自己的工作做不完。",
          "feedback": "那是另一個面向；這一幕的重點是不肯讓別人照自己的方式做。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他很注重安全，這是優點。",
          "feedback": "架子已經通過檢查，拆掉跟安全無關。",
          "correct": false
        }
      ],
      "teach": "A6 是「除非別人完全照自己的意思來做，不願分派任務或工作給他人」；A8 是「表現死板、頑固」。"
    },
    {
      "key": "e10_parts",
      "event": 10,
      "type": "這是什麼線索",
      "prompt": "E10 他說他知道那些壞掉的扣子不能用、也沒有紀念價值，可是就是丟不下去。哪一部分是值得記下的線索？",
      "options": [
        {
          "id": "evidence",
          "text": "東西已經壞了、沒有紀念價值，他還是丟不掉，而且佔掉大家的空間。",
          "feedback": "只限破舊、沒有價值的物品；有紀念意義的東西不算。",
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
          "feedback": "貼標籤是他的習慣，不是這一項的重點。",
          "correct": false
        }
      ],
      "teach": "A5 是「即使已無情感價值也無法拋棄破舊或無價值的物品」。這也顯示他並非完全覺得自己合理：他知道，卻做不到。"
    },
    {
      "key": "e11_moral",
      "event": 11,
      "type": "怎麼回應比較好",
      "prompt": "E11 一位朋友聚餐失約一次，他就要對方退出整個展覽計畫。怎麼回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "直接說出你覺得太重了，讓大家一起談，先不要現在就決定。",
          "feedback": "溫和但堅定的不同意，比順著他或說他的感受更有效。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "說他這麼有原則，你支持他。",
          "feedback": "附和會讓僵化的道德標準直接落到別人身上。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "替他寫一封比較溫和的通知。",
          "feedback": "寫得好聽，對方還是被要求退出；問題沒有被討論。",
          "correct": false
        }
      ],
      "teach": "A4 是「對道德、倫理或價值觀過度嚴謹、一絲不苟、缺乏彈性（註：非由文化上或宗教上的觀點作解釋）」。"
    },
    {
      "key": "e12_bulb",
      "event": 12,
      "type": "還缺什麼資料",
      "prompt": "E12 他付得起，卻兩個月不買燈泡，把錢都存成災難預備金。還需要了解什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "他的經濟狀況、文化背景，這種節省是不是對自己和別人都一樣，以及對共同生活的影響。",
          "feedback": "要排除真的經濟困難與合理的節省。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他存了多少錢。",
          "feedback": "重點不是金額，而是他怎麼看待花錢，以及造成的影響。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他是不是一個小氣的人。",
          "feedback": "日常用語不能直接當成診斷依據。",
          "correct": false
        }
      ],
      "teach": "A7 是「對自己與他人採一種吝於花費的方式；金錢被視為一種為未來災難所儲存的東西」。"
    },
    {
      "key": "transfer",
      "event": 15,
      "type": "新案例",
      "prompt": "新案例：一位外科醫師在手術室非常講究標準流程，下班後卻很隨性，也常跟朋友出去玩。最合理的看法是？",
      "options": [
        {
          "id": "evidence",
          "text": "工作需要的嚴謹不算症狀；要看僵化是不是普遍出現在工作以外，並造成損害。",
          "feedback": "強迫型人格障礙症的模式要跨越不同情境。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "只要講究標準流程，就是強迫型人格障礙症。",
          "feedback": "專業規範是合理的。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "醫師都有點強迫，所以不用評估。",
          "feedback": "不能用職業刻板印象下判斷。",
          "correct": false
        }
      ],
      "teach": "一般準則 B 要求模式「缺乏彈性且普遍存在於個人及社交情境中」。"
    }
  ],
  "lu_qinglan": [
    {
      "key": "e01_before",
      "event": 1,
      "type": "這是什麼線索",
      "prompt": "E01 她說車禍以前情緒很穩，開會也知道什麼話該收住，受傷後卻常常話說出口才發現不該說。這段最關鍵的資訊是什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "前後的差異：她現在的模式，和她原本的人格明顯不同，而且一直持續。",
          "feedback": "這是她和其他角色最大的不同：不是從青春期開始的模式。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她現在比較活潑，也會哭會笑。",
          "feedback": "不能只因為活潑或會哭笑，就判斷是人格改變。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她只是心情不好。",
          "feedback": "一時的心情不能解釋三年來持續的改變。",
          "correct": false
        }
      ],
      "teach": "準則 A 是「一種持續的人格困擾呈現出異於個人先前人格特徵模式的改變」。"
    },
    {
      "key": "e03_summary",
      "event": 3,
      "type": "怎麼區分",
      "prompt": "E03 她讓你看一頁醫療摘要：醫療團隊根據病史與檢查，評估腦傷與人格改變有直接的生理關聯。這和從她的金繼作品推測病因，差別在哪？",
      "options": [
        {
          "id": "evidence",
          "text": "生理關聯要由病史、身體檢查或檢驗等醫療證據確認，不能從作品或旁人的猜測推論。",
          "feedback": "這是 F07.0 與一般人格障礙症最重要的區別之一。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "沒有差別，作品也能反映她的大腦受了傷。",
          "feedback": "藝術作品不是醫療證據。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "只要她自己說有關係，就可以確認。",
          "feedback": "本人說法很重要，但仍需要醫療評估確認。",
          "correct": false
        }
      ],
      "teach": "準則 B 是「根據過去史、身體檢查或實驗室檢查等證據顯示，這種人格困擾是另一身體病況的病理生理後果」。"
    },
    {
      "key": "e05_record",
      "event": 5,
      "type": "怎麼回應比較好",
      "prompt": "E05 她把突然的哭笑、說太快和疲勞分開記在筆記裡。你想幫忙，哪個回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "在旁邊等她記完，再一起去吃飯；記錄由她自己決定怎麼寫。",
          "feedback": "支持她自己記錄，而不是替她監測。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "說每一欄你都幫她盯著，確保記得完整。",
          "feedback": "她會說她是病人、不是實驗對象；監測傷害了她的自主。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "告訴她不用分那麼細，反正都是個性變了。",
          "feedback": "不分清楚，正是她最擔心的事：所有改變都被說成個性變了。",
          "correct": false
        }
      ],
      "teach": "準則 C 是「這種人格干擾無法以另一精神疾病做更好的解釋（包括另一身體病況引起的另一種精神疾病）」。突然的哭笑也可能是神經性的情緒表達問題，要分開評估。"
    },
    {
      "key": "e07_delirium",
      "event": 7,
      "type": "這是什麼線索",
      "prompt": "E07 她今天說話很清楚，可是摘要寫著：急性混亂過去以後，人格的改變還一直在。這段對應的是什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "改變不是只出現在急性混亂（譫妄）的期間。",
          "feedback": "一段清楚的談話，不能用來證明之前的改變都沒了。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "有直接的生理關聯。",
          "feedback": "那是另一項準則；這一幕的重點是時間與譫妄的關係。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她今天很清醒，所以已經好了。",
          "feedback": "清醒的一刻不能代替整段病程。",
          "correct": false
        }
      ],
      "teach": "準則 D 是「這種人格困擾不僅存在於譫妄的病程中」。"
    },
    {
      "key": "e10_smell",
      "event": 10,
      "type": "怎麼區分",
      "prompt": "E10 她聞不到電窯的焦味；平常做事也要靠步驟表，常忘了下一步。這些應該怎麼看？",
      "options": [
        {
          "id": "evidence",
          "text": "這些比較接近腦傷後的嗅覺喪失與執行功能問題，要另外評估，不能直接算成人格改變。",
          "feedback": "人格改變看的是人格；神經認知的困難要評估是否另有神經認知障礙症。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "這些都是人格改變的一部分。",
          "feedback": "忘了步驟、聞不到味道，不屬於人格的改變。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她只是比較懶、比較粗心。",
          "feedback": "把腦傷後的神經困難說成懶，會讓人忽略真正需要的協助。",
          "correct": false
        }
      ],
      "teach": "區分神經後遺症、人格改變與正常的情緒反應，才能提供適當的協助。"
    },
    {
      "key": "e11_impact",
      "event": 11,
      "type": "這是什麼線索",
      "prompt": "E11 她在會議上說出同事的私事，對方取消了共同示範；類似的事已經發生好幾次。這段最直接支持什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "這種改變已經造成明顯的苦惱，以及人際與工作功能的損害。",
          "feedback": "要和手抖、疲勞等不便分開；不是腦傷後所有的不便都算。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "這只是她的個性比較直。",
          "feedback": "她說這是受傷以後才開始的，而且一再影響合作。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "這代表她的人格從以前就有問題。",
          "feedback": "她說的是受傷以後才改變；這和從青春期開始的模式不同。",
          "correct": false
        }
      ],
      "teach": "準則 E 是「這種人格困擾引起臨床上顯著苦惱或社交、職業或其他重要領域功能減損」。"
    },
    {
      "key": "e12_type",
      "event": 12,
      "type": "這是什麼線索",
      "prompt": "E12 她說話常來不及收住，情緒也會突然湧上來。在 F07.0 中，這些特徵怎麼記錄？",
      "options": [
        {
          "id": "evidence",
          "text": "用正式的註明類型記錄，例如以衝動控制不佳為主、以情感反覆為主，或兩者同時出現。",
          "feedback": "註明類型是 F07.0 的正式記錄方式，不能和其他角色的描述性特徵混在一起。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "不用記錄，因為她自己會道歉。",
          "feedback": "她會道歉，不影響類型的記錄。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "記成另一種人格障礙症就好。",
          "feedback": "F07.0 是由身體病況引起的人格改變，有自己的註明類型。",
          "correct": false
        }
      ],
      "teach": "F07.0 的註明類型包括「易變型（Labile type）：主要特徵是情感反覆」、「去抑制型（Disinhibited type）：主要特徵是衝動控制不佳」，以及「合併型（Combined type）：在臨床表現上有一種以上的特點」。"
    },
    {
      "key": "transfer",
      "event": 15,
      "type": "新案例",
      "prompt": "新案例：某人頭部受傷後兩週，出現混亂和情緒失控，一個月後完全恢復，個性跟以前一樣。最合理的看法是？",
      "options": [
        {
          "id": "evidence",
          "text": "改變只出現在急性混亂期間，之後完全恢復，不符合人格改變的診斷。",
          "feedback": "人格改變需要持續存在，不能只出現在譫妄的病程中。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "頭部受傷後有改變，就是人格改變。",
          "feedback": "還要看改變是不是持續、是不是不只在譫妄期間。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他一定還有沒發現的人格問題。",
          "feedback": "沒有資料支持，不能這樣推論。",
          "correct": false
        }
      ],
      "teach": "準則 D 是「這種人格困擾不僅存在於譫妄的病程中」。"
    }
  ],
  "you_ziqian": [
    {
      "key": "e01_poster",
      "event": 1,
      "type": "這是什麼線索",
      "prompt": "E01 沒有人請他重做，他卻熬夜把你的海報全部改掉，還撒嬌問你會不會生氣。這段可以看到哪些面向？",
      "options": [
        {
          "id": "evidence",
          "text": "他認為別人自己做一定不夠好（想法），也直接替別人做決定（人際）。接下來要看是不是反覆出現。",
          "feedback": "人格模式要表現在兩個以上的面向；一次熱心幫忙不夠。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他很可愛、很會撒嬌，所以不可能有問題。",
          "feedback": "撒嬌反而讓別人很難拒絕。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他熬夜重做，代表很負責，是好員工。",
          "feedback": "沒問過就改掉別人的作品，不是負責。",
          "correct": false
        }
      ],
      "teach": "一般準則 A 是「一種內在經驗與行為的持久模式(enduring pattern)，明顯偏離其個體所處文化的期待」，表現在認知、情感、人際功能、衝動控制中的兩個以上面向。"
    },
    {
      "key": "e03_shift",
      "event": 3,
      "type": "這是什麼線索",
      "prompt": "E03 店裡的班表、朋友的旅行、客戶的設計，他都會替別人決定；對方說不要，他仍覺得自己是對的。這段最重要的是什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "這個模式缺乏彈性，而且出現在工作、朋友等不同情境中。",
          "feedback": "要看是不是在不同地方都一樣，而不是一次熱心。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他只是很熱心。",
          "feedback": "熱心的人會接受別人的拒絕；他不會。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "這代表他小時候一定被忽略過。",
          "feedback": "一段推測不能證明人格的成因。",
          "correct": false
        }
      ],
      "teach": "一般準則 B 是「這種持久模式缺乏彈性且普遍存在於個人及社交情境中」。"
    },
    {
      "key": "e05_demoted",
      "event": 5,
      "type": "怎麼回應比較好",
      "prompt": "E05 他被撤掉店長，哭著問你是不是也覺得是他的錯。怎麼回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "承認他的難受，但補救員工與客戶的事，要由他自己去談。",
          "feedback": "接住情緒，和讓他承擔責任，可以同時做到。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "說沒關係，把你的案子都給他做，讓他別難過。",
          "feedback": "他馬上不哭，當晚就改掉你整個展覽的時程。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "直接說員工走了、客戶解約都是他的錯。",
          "feedback": "直接指責會讓他覺得被嫌棄，很難接著處理問題。",
          "correct": false
        }
      ],
      "teach": "一般準則 C 是「這種持久模式引起臨床上顯著苦惱或社交、職業及其他重要功能減損」。"
    },
    {
      "key": "e07_yearbook",
      "event": 7,
      "type": "這是什麼線索",
      "prompt": "E07 他拿出高中校刊，說從高中、大學樂團到上一段感情，他都會接手別人的事，最後大家都離開了。這最直接支持什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "這個模式穩定、持續很久，最早可以追溯到青春期。",
          "feedback": "跨越多個人生階段的同一種模式。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "這個模式造成了苦惱與功能損害。",
          "feedback": "那是另一項；這一幕的重點是時間的長度。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他高中時被欺負，所以才變成這樣。",
          "feedback": "一段回憶不能單獨證明人格的成因。",
          "correct": false
        }
      ],
      "teach": "一般準則 D 是「此模式穩定且持續時間長，其起始最早可追溯至青春期或成年期早期」。"
    },
    {
      "key": "e10_phone",
      "event": 10,
      "type": "怎麼回應比較好",
      "prompt": "E10 他用你的手機替你回朋友這週不行，被你拒絕後臉一下子變冷，又哭著道歉。怎麼回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "清楚說出這件事不行，把手機拿回來，聚會照你自己的決定去。",
          "feedback": "替伴侶回訊息、決定伴侶能不能見朋友，不管有沒有診斷都要認真看待。",
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
          "text": "跟他說他這樣就是人格障礙。",
          "feedback": "把診斷當成罵人的話，對任何人都沒有幫助。",
          "correct": false
        }
      ],
      "teach": "他的情緒從甜到冷、再到哭著道歉，是情感易變與衝動控制的線索；這也屬於一般準則 A 的面向。"
    },
    {
      "key": "e11_mood",
      "event": 11,
      "type": "還缺什麼資料",
      "prompt": "E11 他半夜回店裡改掉新菜單，又問你他是不是憂鬱了。還需要了解什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "睡不好、心情差是從什麼時候開始、有多嚴重；控制的模式是不是早在這之前就存在。",
          "feedback": "兩者可以同時存在，也可能互相影響，需要專業評估。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他說自己憂鬱，所以就是憂鬱症，不是人格的問題。",
          "feedback": "自我判斷不能代替評估。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他很會撒嬌，問這個只是想被安慰。",
          "feedback": "不能因為說話方式就忽略他的困擾。",
          "correct": false
        }
      ],
      "teach": "一般準則 E 是「這種持久模式無法以另一精神疾病的表現或結果做更好的解釋」。"
    },
    {
      "key": "e12_checkup",
      "event": 12,
      "type": "這是什麼線索",
      "prompt": "E12 健康檢查顯示他沒有喝酒、沒有用藥，也沒有頭部外傷。這份資料和哪件事有關？",
      "options": [
        {
          "id": "evidence",
          "text": "確認這個模式不能歸因於物質的作用或另一種身體病況。",
          "feedback": "這些資料仍需要專業人員確認，陪伴不能代替評估。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "確認這個模式出現在不同的情境中。",
          "feedback": "普遍性要看 E03 的員工、朋友與客戶，不是健康檢查。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "確認他沒有任何問題。",
          "feedback": "身體正常，不代表人格模式沒有造成困難。",
          "correct": false
        }
      ],
      "teach": "一般準則 F 是「這種持久模式無法歸因於某物質的生理作用（如：濫用藥物、醫療用藥）或另一身體病況（如頭部外傷）」。"
    },
    {
      "key": "transfer",
      "event": 15,
      "type": "新案例",
      "prompt": "新案例：某人在工作上很愛主導，常常幫同事改報告，但會先問過別人，同事也很感謝他；他的工作與人際都很好。最合理的做法是？",
      "options": [
        {
          "id": "evidence",
          "text": "不能只因為愛主導就判斷是人格障礙；要看有沒有缺乏彈性、跨情境的模式，以及顯著的苦惱或功能減損。",
          "feedback": "先問過別人、功能良好，都不符合人格障礙的條件。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "只要喜歡掌控，就是其他特定的人格障礙症。",
          "feedback": "其他特定的人格障礙症仍需要造成顯著苦惱或功能減損。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他有先問過別人，所以一定沒有任何問題。",
          "feedback": "先問很重要，但還是要看其他資料。",
          "correct": false
        }
      ],
      "teach": "其他特定的人格障礙症適用於「不完全符合人格障礙症診斷類別中任何障礙症的完整診斷準則」的情況，並記錄特定原因，例如「混合型人格特質」。"
    }
  ]
};
export const LEARNING_STAGES=[...new Set(Object.values(LEARNING_TASKS).flatMap(arr=>arr.map(t=>t.event)))].sort((a,b)=>a-b);
export function getLearningTasks(id,eventNumber){return (LEARNING_TASKS[id]||[]).filter(t=>t.event===eventNumber).map(({event,key,...t})=>({...t,kind:t.type,id:key,revision:LEARNING_REVISION}));}

// 上一版（第 2 版）的題目，只用來在學習回顧中顯示已封存的作答。
export const PREVIOUS_LEARNING_TASKS = {
  "shen_mo": {
    "observe": {
      "kind": "辨識線索",
      "prompt": "E03 他說知道他常去哪家麵包店，就能在那裡堵他；這種小事，他也不敢跟從沒洩密的朋友說。哪一段最支持 A3 的線索？",
      "options": [
        {
          "id": "evidence",
          "text": "朋友從沒洩密，他仍多年不敢說日常的小事，怕這些資訊被拿來對付自己。",
          "feedback": "A3 的重點有三個：不願傾訴、害怕資訊被惡意利用，而且這種害怕「無根據」。朋友從未洩密，正是沒有根據的證據。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他不願意讓陌生人知道自己的住址。",
          "feedback": "保護住址是合理的自保，尤其對調查記者來說；沒有證據顯示這是無根據的害怕。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他是調查記者，會保護消息來源。",
          "feedback": "職業上的保密是工作需要，不是人格障礙的證據；A3 看的是對一般、親近的人也不敢說。",
          "correct": false
        }
      ]
    },
    "compare": {
      "kind": "比較解釋",
      "prompt": "沈墨查證每件事。下面哪一種新資訊，最需要你先保留其他解釋，不急著當成妄想型的證據？",
      "options": [
        {
          "id": "evidence",
          "text": "最近真的有人威脅他的消息來源。",
          "feedback": "真實的威脅會讓查證和保密變得合理。妄想型的懷疑是沒有充分根據的；有真實危險時，要先處理危險，再看日常是否也有同樣的模式。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他對一張普通的電費單也反覆猜測。",
          "feedback": "這反而是跨情境的資料，支持懷疑超出工作需要；它不是需要保留的其他解釋。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "朋友從沒洩密，他仍長年不敢談喜好。",
          "feedback": "這是支持 A3 的線索，不是另一種解釋。",
          "correct": false
        }
      ]
    },
    "missing": {
      "kind": "資料缺口",
      "prompt": "E12 他回顧自己以前會看伴侶的手機、什麼都沒查到，對方還是走了。要討論 A7，還缺什麼資料？",
      "options": [
        {
          "id": "evidence",
          "text": "那些查看是不是出於對忠貞的懷疑、這種懷疑是否反覆出現而且沒有根據、持續多久，以及有沒有其他精神或身體因素。",
          "feedback": "A7 的對象是伴侶的忠貞，而且要「反覆且不合理」。看手機的行為本身不夠，還要知道背後的懷疑是什麼。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "你願不願意把手機交給他看。",
          "feedback": "交出手機不能驗證任何準則，也不是建立信任的必要條件，反而會讓查證變成關係的規則。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "你願不願意收下他的鑰匙。",
          "feedback": "關係中的同意和診斷資料是兩件事。",
          "correct": false
        }
      ]
    },
    "transfer": {
      "kind": "新案例",
      "prompt": "另一位住戶遭到跟蹤後，暫時不告訴任何人自己的新地址，平常的人際與工作都正常。最合理的理解是？",
      "options": [
        {
          "id": "evidence",
          "text": "這可能是合理的自保，目前的資訊不足以推論人格障礙。",
          "feedback": "有真實的威脅，而且沒有跨情境的長期模式；行為相似，不代表動機與病理相同。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "只要拒絕透露地址，就符合 A3。",
          "feedback": "A3 需要的是無根據的害怕；遭到跟蹤後的保密是有根據的。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "只要她願意約會，就可以排除人格困難。",
          "feedback": "戀愛意願沒有排除診斷的功能。",
          "correct": false
        }
      ]
    },
    "loyalty": {
      "kind": "比較解釋",
      "prompt": "E05 他懷疑你把他的事說出去。怎麼判斷這是不是妄想型人格的線索？",
      "options": [
        {
          "id": "evidence",
          "text": "看懷疑有沒有具體根據、是不是在不同的人和情境裡一再出現，以及造成什麼影響；記者工作本來就需要保密，合理的小心不能算成病態。",
          "feedback": "A1 的原文是「沒有充分根據地懷疑」，A2 是「充滿不合理的懷疑」，而且要長期、跨情境；只出現在單一工作情境的警覺，要另外考慮。",
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
    "hostile": {
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
          "text": "直接告訴他：你這是妄想型人格。",
          "feedback": "你是鄰居，不是他的治療者；對認識的人下診斷，只會讓他更覺得被攻擊。",
          "correct": false
        }
      ]
    },
    "photo": {
      "kind": "辨識線索",
      "prompt": "E10 他說偷拍你，是想確認你不是誰派來接近他的。這段怎麼整理？",
      "options": [
        {
          "id": "evidence",
          "text": "怕你是被派來的延續了 A1 的懷疑；但未經同意的拍攝本身就是越界，要要求刪除並確認，不因為理解他的害怕就接受。",
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
    },
    "grudge": {
      "kind": "比較解釋",
      "prompt": "E11 他三年前被同事開過一句玩笑，對方已經道歉；今天看到那兩人站在一起，他就認定他們在商量怎麼拿他的調查去邀功。這段可以怎麼整理？",
      "options": [
        {
          "id": "evidence",
          "text": "放不下已經道歉的輕視，可以討論 A5；把沒聽清楚的談話認定成要利用他，則回到 A1。兩件事要分開記錄。",
          "feedback": "同一段話裡有兩個不同的準則線索：一個是對過去的怨恨，一個是對現在的懷疑。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他記得三年前的事，代表記憶力很好，跟人格無關。",
          "feedback": "重點不是記得，而是無法寬恕、持續影響現在的判斷與行為。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "對方真的有可能在邀功，所以這不是猜疑。",
          "feedback": "他沒聽清楚就認定，這是沒有充分根據的；可能性存在，不等於有根據。",
          "correct": false
        }
      ]
    }
  },
  "lin_jianwei": {
    "observe": {
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
    "compare": {
      "kind": "比較解釋",
      "prompt": "有人說，見微不參加聚會，是因為怕被拒絕。這個說法哪裡需要修正？",
      "options": [
        {
          "id": "evidence",
          "text": "她不是怕，而是不太需要；她沒有表現出想參加卻退縮的樣子。",
          "feedback": "孤僻型是缺乏欲求，畏避型是想要卻害怕；這是兩者很重要的區別。",
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
    "missing": {
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
    "transfer": {
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
    "flat_affect": {
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
    "indifferent": {
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
    "frequency": {
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
          "text": "說：你這樣就是有人格障礙。",
          "feedback": "把診斷當成說服的工具，對任何人都沒有幫助。",
          "correct": false
        }
      ]
    },
    "pleasure": {
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
  },
  "ruri": {
    "observe": {
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
    "compare": {
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
    "missing": {
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
    "transfer": {
      "kind": "新案例",
      "prompt": "某人深信自己能收到未來的消息，但會說：也可能是我想太多；他的生活大致正常，也有幾個好朋友。最合理的做法是？",
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
    "familiar_fear": {
      "kind": "處理優先",
      "prompt": "E05 她退到衣架後，說鄰居故意聊選舉來試探她。哪個回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "先陪她到安靜的地方，承認她的害怕；不急著否定，也不附和。",
          "feedback": "接住感受，再溫和地分開「看到的」和想到的，比直接否定有效。",
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
          "text": "說：我靠近一點，你就不用怕了。",
          "feedback": "對她來說，太快的親近反而更可怕；她會整個人縮到衣架後面。",
          "correct": false
        }
      ]
    },
    "radio": {
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
    "odd_speech": {
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
    "thank_card": {
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
  },
  "han_xiao": {
    "observe": {
      "kind": "辨識線索",
      "prompt": "E03 煞車皮已經磨損，他仍想直接載你上路。這段最直接的線索是什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "他明知會危及自己和別人，仍要上路。",
          "feedback": "A5 的重點是不在意危險，而且危險不只落在自己身上。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他喜歡重機和速度。",
          "feedback": "興趣本身不是症狀；合法的賽車與騎車都不算。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "你不願意上車，是因為你膽小。",
          "feedback": "拒絕危險是合理的判斷，與膽量無關。",
          "correct": false
        }
      ]
    },
    "compare": {
      "kind": "比較解釋",
      "prompt": "E07 他說國小就把同學打到送醫，12 到 14 歲又反覆偷竊、打架。為什麼這段病史很重要？",
      "options": [
        {
          "id": "evidence",
          "text": "反社會型人格障礙症需要 15 歲以前就有行為規範障礙症的證據，也要確認他已經年滿 18 歲。",
          "feedback": "這是準則 C 與準則 B 的要求，也是反社會型和其他人格障礙症很不一樣的地方：需要追溯童年的病史。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "父母犯過法，可以代替他自己的少年病史。",
          "feedback": "家人的行為不是他本人的診斷證據。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "只要童年做過一件好事，就能排除成年後的模式。",
          "feedback": "單一的善行不能完成病程評估。",
          "correct": false
        }
      ]
    },
    "missing": {
      "kind": "資料缺口",
      "prompt": "E12 他說我騙她的、她最後也答應了。這段怎麼整理比較準確？",
      "options": [
        {
          "id": "evidence",
          "text": "在威脅下的答應不是同意。他事後說是騙人的、還覺得對方也答應了，呈現詐欺（A2）與不知悔恨（A7）；這樣的行為也可能是犯罪，不只是人格特質。",
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
          "text": "他願意說出來，代表他其實在反省。",
          "feedback": "說出來不等於反省；他一邊炫耀，一邊在看你的反應。",
          "correct": false
        }
      ]
    },
    "transfer": {
      "kind": "新案例",
      "prompt": "一位成年人偶爾違規停車，沒有少年時期的行為問題，也沒有跨情境的資料。最合理的看法是？",
      "options": [
        {
          "id": "evidence",
          "text": "現有資料不足以判斷反社會型人格障礙症，但具體的違規仍要處理後果。",
          "feedback": "責任與診斷是兩個問題：沒有診斷，仍要為行為負責；有違規，也不代表有診斷。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "違規一次就足以確診。",
          "feedback": "需要持續、跨情境的模式，以及 15 歲前的行為規範障礙症證據。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "沒有確診，就不用負責。",
          "feedback": "造成損害不需要先有診斷，才能要求修補。",
          "correct": false
        }
      ]
    },
    "exploit": {
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
    "fight": {
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
          "text": "跟他說：你打架好帥，讓他冷靜下來。",
          "feedback": "這是本幕的陷阱：他會覺得被肯定，回頭又補了一拳。",
          "correct": false
        }
      ]
    },
    "childhood": {
      "kind": "處理優先",
      "prompt": "E07 他笑著說小時候把同學打到送醫。你回了一句那時候你還小、不是你的錯，他越講越得意。比較好的回應是什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "願意聽，但說明你沒辦法替受傷的人說沒關係；或問他那個同學後來怎麼了。",
          "feedback": "把受害者帶回敘事，是觸及責任感最有效的方式，也不會否定他童年的處境。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "繼續安慰他，說那都過去了。",
          "feedback": "替傷害開脫，會讓他更不需要面對受傷的人。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "說他這就是反社會人格。",
          "feedback": "貼標籤只會讓他防衛，也不是玩家能判斷的事。",
          "correct": false
        }
      ]
    },
    "repay": {
      "kind": "比較解釋",
      "prompt": "E10 他照表還錢，卻抱怨對方不肯原諒他，覺得自己吃虧了。這段最能說明什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "補償是負起責任，但他沒有對傷害的懊悔，只覺得自己吃虧：這是 A7 的樣子。",
          "feedback": "完成補償與感到懊悔是兩回事；受害者有權利拒絕和好。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他已經還錢了，所以不再有任何問題。",
          "feedback": "行為上的責任可以完成，但不知悔恨的模式仍可能存在。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "對方不原諒他，是對方的問題。",
          "feedback": "被傷害的人沒有義務原諒；還錢是他欠對方的，不是換取原諒的條件。",
          "correct": false
        }
      ]
    }
  },
  "su_fei": {
    "observe": {
      "kind": "辨識線索",
      "prompt": "E03 一句建議讓她從下午難受到傍晚，朋友回訊息後才好一點。哪些資訊最有助於討論 A6？",
      "options": [
        {
          "id": "evidence",
          "text": "引發起伏的情境、持續了多少小時、是否在不同關係中反覆出現，以及實際的影響。",
          "feedback": "A6 描述的是反應性的心情變化，常持續幾個小時；要看觸發、持續時間與反覆性，仍需要完整的情緒病程。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "哭過之後還能笑，就是邊緣型。",
          "feedback": "短暫的哭笑不足以辨識模式。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "只持續幾小時，所以絕不可能合併雙相情緒障礙症。",
          "feedback": "時間線索不能單獨完成排除，仍要評估完整的情緒病程。",
          "correct": false
        }
      ]
    },
    "compare": {
      "kind": "比較解釋",
      "prompt": "E05 兩疊帳單分別來自購物與飲酒過量。要討論 A4，應該怎麼整理？",
      "options": [
        {
          "id": "evidence",
          "text": "分別確認兩個領域是否反覆發生、當時的情境，以及造成的損害；不能只憑帳單或喝過酒就判定。",
          "feedback": "A4 要求至少兩個領域，而且行為具有潛在的自我傷害性；仍須確認程度與影響。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "有花錢又有喝酒，就不需要再問後果。",
          "feedback": "一般消費與飲酒不等於具損害性的衝動模式。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "兩疊都發生在難過時，所以要合成同一次事件。",
          "feedback": "觸發相近不代表是同一次行為，時間與事件要分開記錄。",
          "correct": false
        }
      ]
    },
    "missing": {
      "kind": "資料缺口",
      "prompt": "E12 她說那時像隔著玻璃看自己，四周都不像真的。要討論 A9，還需要了解什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "經驗有多嚴重、持續多久、和壓力有沒有關聯，以及物質、其他解離經驗或身體病況等可能的解釋。",
          "feedback": "A9 描述的是短暫、與壓力有關的嚴重解離症狀；一次回顧只是線索。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她有沒有提到任何創傷回憶。",
          "feedback": "創傷記憶本身不等於解離症狀。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她願不願意和你交往。",
          "feedback": "關係的意願不能驗證症狀。",
          "correct": false
        }
      ]
    },
    "transfer": {
      "kind": "新案例",
      "prompt": "一個人失戀後難過了一週，平時人際穩定，也沒有功能上的困難。現有資料能說明什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "不足以推論邊緣型人格障礙症，應該了解情境與長期的模式。",
          "feedback": "失戀後的難過是常見的情緒反應，不宜直接病理化。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "只要怕失去人，就符合邊緣型。",
          "feedback": "需要五項以上的具體準則，以及長期、廣泛的模式。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "願意接受朋友幫忙，就可以排除所有困難。",
          "feedback": "接受支持不是排除診斷的依據。",
          "correct": false
        }
      ]
    },
    "safety": {
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
          "feedback": "自傷和被愛的感覺會被綁在一起，往後更容易重演；遊戲裡選這個也會鎖住真結局。",
          "correct": false
        }
      ]
    },
    "boundary": {
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
    "crisis": {
      "kind": "處理優先",
      "prompt": "E11 她鎖在化妝間，說「去她那裡，我就去死」。哪個回應最適合？",
      "options": [
        {
          "id": "evidence",
          "text": "不用「選誰」來回答。說出你聽到她想死、你很擔心，馬上打 119、找阿哲拿備用鑰匙，在門外陪著等人來。",
          "feedback": "自殺威脅一律當真，立刻找專業協助；這不是猜她會不會真的做的時候。準則 A5 包含自殺威脅。",
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
    },
    "emptiness": {
      "kind": "處理優先",
      "prompt": "E05 她說買東西的時候像終於有感覺，醒來還是空，多了帳單；她說不要你付，但不知道先看哪張。比較合適的回應是？",
      "options": [
        {
          "id": "evidence",
          "text": "陪她挑出最急的一張，但清楚說明你不替她付錢。",
          "feedback": "支持她自己處理後果，同時維持關係的溫度。替她付帳，會讓衝動的後果由別人承擔。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "直接幫她付最急的那張，讓她別煩了。",
          "feedback": "這是本幕的陷阱：好感上升，但她處理後果的動機被削弱，帳單問題也沒解決。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "問她既然知道會丟工作，為什麼還要喝。",
          "feedback": "質問會引發羞恥，而羞恥常是下一次衝動行為的推力。",
          "correct": false
        }
      ]
    }
  },
  "xia_le": {
    "observe": {
      "kind": "辨識線索",
      "prompt": "E03 同事說不舒服、往後退了，他仍帶著性暗示靠近，還說對方只是害羞；旁邊的同事說又來了。為什麼這段可以拿來討論 A2？",
      "options": [
        {
          "id": "evidence",
          "text": "在不適合的工作場合反覆發生，而且對方已經表達不舒服。",
          "feedback": "A2 的重點在互動的不恰當性與反覆出現，不是他的外表或性向。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "他是演員，常穿華麗的衣服。",
          "feedback": "職業服裝不能作為病理的證據。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他會調情，所以就符合 A2。",
          "feedback": "雙方同意、在合適場合的調情不算；要看不恰當性與對方的意願。",
          "correct": false
        }
      ]
    },
    "compare": {
      "kind": "比較解釋",
      "prompt": "E01 大家聊別人時，他坐不住、一直把話題拉回自己。這最直接支持哪一項？",
      "options": [
        {
          "id": "evidence",
          "text": "A1：不是注意的焦點時會感到不適。",
          "feedback": "這段行為對應 A1，但不能因為相近，就同時認定 A6 的戲劇化或 A3 的情緒變化。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "插話足以同時證明全部的做作型準則。",
          "feedback": "每一項準則需要各自的具體內容，不能互相代替。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他會帶新人，所以沒有注意力需求的困難。",
          "feedback": "能力與持續的困難可以同時存在。",
          "correct": false
        }
      ]
    },
    "missing": {
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
          "text": "他會哭，代表他很在乎新人，所以沒有問題。",
          "feedback": "在乎和情緒表達的方式可以同時存在，兩件事要分開看。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他是演員，所以他的難過都是假的。",
          "feedback": "職業不能拿來判斷情緒的真假；他也說另一半是真的。",
          "correct": false
        }
      ]
    },
    "transfer": {
      "kind": "新案例",
      "prompt": "一位創作者在台上情緒很誇張，台下相處有彈性，也沒有明顯的困擾或功能損害。該怎麼看？",
      "options": [
        {
          "id": "evidence",
          "text": "表演風格不能單獨作為人格障礙的證據。",
          "feedback": "需要評估跨場域的模式、職業與文化的脈絡，以及實際的影響。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "只要情緒誇張，就是做作型。",
          "feedback": "場合和功能不能省略。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他願意不化妝出門，就能排除所有人格問題。",
          "feedback": "外貌的選擇沒有這種排除作用。",
          "correct": false
        }
      ]
    },
    "seduce": {
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
          "text": "當場說他很做作，讓大家都聽到。",
          "feedback": "羞辱不會讓行為停下來，只會讓他更想把注意力搶回來。",
          "correct": false
        }
      ]
    },
    "intimacy": {
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
      ]
    },
    "impressionistic": {
      "kind": "辨識線索",
      "prompt": "E07 他一直說昨晚的試演好震撼、好漂亮，卻說不清楚誰先上場、發生了什麼。這最直接對應哪一項？",
      "options": [
        {
          "id": "evidence",
          "text": "A5：說話風格過度概念化，缺乏細節。",
          "feedback": "重點是說話很有感覺，卻缺少具體內容，以致別人無法掌握發生了什麼。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "A6：情緒表達戲劇化、過度誇張。",
          "feedback": "A6 看的是情緒表達的方式；這一幕的重點是說話內容缺乏細節。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他不懂劇作家的生平，所以說不清楚。",
          "feedback": "知識不足不算這一項，原文也沒有這個意思。",
          "correct": false
        }
      ]
    },
    "suggestible": {
      "kind": "處理優先",
      "prompt": "E11 每個人給的意見不同，他照最後說話的人改，連自己原本的理由都忘了，還問你要哪一版。比較合適的回應是？",
      "options": [
        {
          "id": "evidence",
          "text": "問他自己喜歡哪一個，讓他說出自己的理由。",
          "feedback": "把決定權還給他，是處理易受暗示最直接的方式。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "說就第一版吧，你幫他決定。",
          "feedback": "這是本幕的陷阱：你成了下一個影響他的人，第二天又有人說太快了。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "說不管哪一版你都覺得他最棒。",
          "feedback": "無條件的讚美沒有幫他做出決定，易受暗示的模式也沒有改善。",
          "correct": false
        }
      ]
    }
  },
  "gu_qingcheng": {
    "observe": {
      "kind": "辨識線索",
      "prompt": "E03 她說只有知名機構的人才懂她的設計，連住戶的回饋都不看。哪一點最能支持 A3 的線索？",
      "options": [
        {
          "id": "evidence",
          "text": "認為只有地位高的人或機構才能理解自己，因此拒絕一般使用者的意見。",
          "feedback": "A3 的重點是相信自己特殊、只能被特殊的人理解，並因此造成影響，而不是她的實力。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她很年輕就當上合夥人。",
          "feedback": "高成就本身不是人格障礙。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她的設計喜歡簡潔的線條。",
          "feedback": "審美的選擇不能說明優越的期待或功能損害。",
          "correct": false
        }
      ]
    },
    "compare": {
      "kind": "比較解釋",
      "prompt": "E07 她拿走助理的署名、要他沒有加班費地做完；E05 她落選後很難過。這兩件事有什麼不同？",
      "options": [
        {
          "id": "evidence",
          "text": "前者是佔用他人的工作成果、忽視他人的需要；落選後難過本身則是一種感受。",
          "feedback": "特權（A5）、剝削（A6）、缺乏同理（A7）需要指出具體的行為；情緒本身不是準則。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "難過比拿走署名更能證明剝削。",
          "feedback": "情緒不能代替剝削的行為。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "只要補發了薪水，就代表從來沒有問題。",
          "feedback": "修補不會抹去已經發生的損害。",
          "correct": false
        }
      ]
    },
    "missing": {
      "kind": "資料缺口",
      "prompt": "E12 她說自己常整晚想著整座城市都在談她，卻放著該回的信。還需要了解什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "她多常沉浸在這些幻想裡、幻想的內容，以及對生活和工作的影響。",
          "feedback": "一般的理想和持續的誇大幻想，不能只靠一次的比喻來區分。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她喜歡用哪一種建材。",
          "feedback": "建材的偏好與準則無關。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她能不能被你安慰。",
          "feedback": "安慰的效果不是診斷工具。",
          "correct": false
        }
      ]
    },
    "transfer": {
      "kind": "新案例",
      "prompt": "一位得過獎的建築師很有自信地介紹作品，也願意平等地聽別人的意見。這樣的資料能說明什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "自信與成就相稱、而且有彈性，不能只因為有野心就推論人格障礙。",
          "feedback": "還需要長期的模式與損害的資料。",
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
          "text": "願意聽一次意見，就能排除所有場合的問題。",
          "feedback": "一次良好的互動不足以全面排除。",
          "correct": false
        }
      ]
    },
    "admire": {
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
    "exploit": {
      "kind": "處理優先",
      "prompt": "E07 她要助理沒有加班費地做完，還說能替她工作就夠了。你在旁邊，怎麼做比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "直接說出該做的事：他做的圖要有他的名字、加班要付錢，並讓助理自己決定要不要留下來做。",
          "feedback": "針對具體的剝削行為說清楚，比勸她體諒一下別人有用。她當下會生氣，但這是讓她開始尊重你的方式。",
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
    "envy": {
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
    },
    "repair": {
      "kind": "比較解釋",
      "prompt": "E10 她補了助理的名字、付了補薪，接著想用這些換助理跟她吃一頓飯；助理拒絕後，她說他會後悔。這段怎麼理解比較準確？",
      "options": [
        {
          "id": "evidence",
          "text": "補償是她本來就該負的責任，不是換取親近的條件；她仍把關係看成交換，對方有權利拒絕。",
          "feedback": "負起責任是重要的改變，但特權感（A5）與剝削的邏輯（A6）還在。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她已經補償了，所以助理應該接受邀請。",
          "feedback": "被傷害的人沒有義務和好。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她會想約助理，代表她已經完全改變了。",
          "feedback": "改變要看她對所有人的做法，而不是一次邀約。",
          "correct": false
        }
      ]
    }
  },
  "wen_yan": {
    "observe": {
      "kind": "辨識線索",
      "prompt": "E03 他很想去讀書會，卻一直問誰會到、大家歡不歡迎他。這段最重要的線索是什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "他想跟人來往，卻要先確定會被喜歡才敢去；他也覺得自己比別人差。",
          "feedback": "A2 的原文是「除非確信受到歡迎，否則不願與人交涉」，A5 是「因為感到信心不足而在新的人際情境中顯得壓抑」。重點是想要連結，卻怕不被接納而退縮，不是看他最後有沒有出席。",
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
    "compare": {
      "kind": "比較解釋",
      "prompt": "店員叫他「小兔子」，他說自己不喜歡。該怎麼理解這段？",
      "options": [
        {
          "id": "evidence",
          "text": "先承認這個稱呼真的讓他不舒服，不能因為他容易緊張，就把所有不舒服都說成他太敏感。",
          "feedback": "真實的冒犯要先處理；這跟沒有人批評他，他卻預期會被拒絕要分開看。",
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
    "missing": {
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
    "transfer": {
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
    "small_step": {
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
          "text": "直接說：你一直說自己無聊，我很難接話。",
          "feedback": "對他來說，一句批評就夠讓他退回去；那天你們沒有去成。",
          "correct": false
        }
      ]
    },
    "new_activity": {
      "kind": "辨識線索",
      "prompt": "E07 他很想學植物，同一個報名頁打開了五次，卻一直沒按下去。這最直接對應哪一項？",
      "options": [
        {
          "id": "evidence",
          "text": "A7：因為怕出糗、被看不起，不敢嘗試新的活動。",
          "feedback": "重點是想做，卻因為怕尷尬而不敢冒險；小時候被笑過的經驗，不能直接代替這一項。",
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
    "wish_seen": {
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
    "decline_letters": {
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
          "text": "說：你已經推掉很多次了，這次一定要去。",
          "feedback": "硬推可能讓他照做，卻更害怕；也忽略了他可能真的有不想做的理由。",
          "correct": false
        }
      ]
    }
  },
  "bai_xiaolu": {
    "observe": {
      "kind": "辨識線索",
      "prompt": "E03 她想把續約、薪水、住處全交給你決定。哪一點最能支持 A2 的線索？",
      "options": [
        {
          "id": "evidence",
          "text": "沒有迫切的危機，卻在多個主要生活領域都想把責任交給別人。",
          "feedback": "A2 的重點是大多數的主要生活領域，而不是偶爾請教一個問題。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她看不懂一項合約條文，所以問你。",
          "feedback": "尋求一次專業意見是合理的，不等於依賴模式。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她是甜點學徒，年紀很輕。",
          "feedback": "職級、年齡與性別都不是診斷證據。",
          "correct": false
        }
      ]
    },
    "compare": {
      "kind": "比較解釋",
      "prompt": "在安全的關係裡，因為怕失去照顧而不敢說不；和因為怕真的被報復而不敢說不，有什麼不同？",
      "options": [
        {
          "id": "evidence",
          "text": "現實威脅下的順從可能是自保，不能計入 A3。",
          "feedback": "A3 的原文特別註明，不應包括現實中對他人報復的害怕。要先了解安全、文化與權力的條件。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "兩種都是不敢拒絕，所以動機和意義也一樣。",
          "feedback": "相似的行為，不能省略動機與脈絡。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "沒有被報復，就表示她不會真的害怕。",
          "feedback": "主觀的害怕仍可能存在，並造成困難。",
          "correct": false
        }
      ]
    },
    "missing": {
      "kind": "資料缺口",
      "prompt": "E12 她同時說到一個人時很無助，也擔心以後被留下。還需要分清楚什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "獨處當下的不舒服（A6），以及長期反覆擔心被留下、得自己照顧自己（A8）。",
          "feedback": "相近但不同的準則要各有內容，還要看她的實際能力、反覆性與影響。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "要不要讓她立刻一個人住一整週。",
          "feedback": "強迫的挑戰不是評估，也不能證明什麼。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她會不會煮飯。",
          "feedback": "單一的技能不能解釋完整的支持需求；她其實會煮飯。",
          "correct": false
        }
      ]
    },
    "transfer": {
      "kind": "新案例",
      "prompt": "有人剛動完手術，暫時需要家人幫忙選餐、處理帳單。這樣能判斷是依賴型嗎？",
      "options": [
        {
          "id": "evidence",
          "text": "不能只憑暫時而合理的照護需求判斷，還需要長期、跨情境的模式資料。",
          "feedback": "需要別人幫忙，不等於人格障礙。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "有人代付帳單，就符合 A2。",
          "feedback": "要了解健康狀況與實際能力。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "只有完全獨立的人才健康。",
          "feedback": "合理的互助不是失敗。",
          "correct": false
        }
      ]
    },
    "nurture": {
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
    "start": {
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
    "rebound": {
      "kind": "辨識線索",
      "prompt": "E11 她上個月剛被分手，就急著要你當「那個人」。這段怎麼整理？",
      "options": [
        {
          "id": "evidence",
          "text": "一段關係剛結束，就急著找下一個人來照顧自己，連喜不喜歡都沒想，可以討論 A7；被分手後難過、想找人陪，本身是很常見的反應。",
          "feedback": "要看的是急著找替代的照顧來源這個模式，以及它是否反覆出現，不是失戀難過本身。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "答應她，她就不會那麼痛苦了。",
          "feedback": "在她最急的時候答應，關係就會建立在誰都可以、只要有人就好的基礎上；遊戲裡她會每十分鐘就問你在哪。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "她馬上下載交友軟體，代表她很隨便。",
          "feedback": "這是道德評價，不是臨床觀察；重點在她為什麼這麼急、急著要什麼。",
          "correct": false
        }
      ]
    },
    "disagree": {
      "kind": "處理優先",
      "prompt": "E05 你說過飲料可以換，也從沒生氣過，她還是不敢說不喜歡，硬把太甜的那杯喝下去。比較合適的回應是？",
      "options": [
        {
          "id": "evidence",
          "text": "謝謝她說實話，讓她自己選要不要換、換什麼甜度。",
          "feedback": "說出不同意被正向回應，是修正她預期的關鍵經驗。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "直接幫她跟店員換一杯半糖的。",
          "feedback": "你替她做對了選擇，但她少了一次自己表達的機會，新的那杯太甜她也沒說。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "說不喜歡就說啊、幹嘛硬喝。",
          "feedback": "批評她不表達，反而讓她更不敢表達。",
          "correct": false
        }
      ]
    }
  },
  "ji_yan": {
    "observe": {
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
    "compare": {
      "kind": "比較解釋",
      "prompt": "紀嚴會說「差一點，就是差」，也很少覺得自己的標準有問題。這和強迫症（OCD）最大的差別是什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "強迫症的人通常覺得那些念頭和行為不合理、很想停下來；他則多半覺得這樣才是負責。",
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
    "missing": {
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
          "feedback": "小氣是日常用語，不能直接當成診斷依據。",
          "correct": false
        }
      ]
    },
    "transfer": {
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
    "leisure": {
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
          "feedback": "這會讓休息也變成一項任務，反而強化了沒有產出就沒有價值。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "說：停下來會讓你不安吧。",
          "feedback": "前期對他說感受，他只會回「不是不安，是浪費」。",
          "correct": false
        }
      ]
    },
    "delegate": {
      "kind": "辨識線索",
      "prompt": "E07 海報架已經通過安全檢查，他卻因為住戶的組裝順序不同，拆掉重做。這對應哪些項目？",
      "options": [
        {
          "id": "evidence",
          "text": "A6（除非照自己的方式，否則不願意分工）和 A8（僵化、固執）。",
          "feedback": "重點是結果已經合格，他仍堅持照我的方法。",
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
    "hoard": {
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
    "moral": {
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
          "text": "說：你這麼有原則，我支持你。",
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
  },
  "lu_qinglan": {
    "observe": {
      "kind": "辨識線索",
      "prompt": "E01 她說車禍以前情緒很穩，開會也知道什麼話該收住，受傷後卻常常話說出口才發現不該說。這是哪一項的線索？",
      "options": [
        {
          "id": "evidence",
          "text": "準則 A：持續的人格改變，和她原本的人格模式明顯不同。",
          "feedback": "重點是前後的差異，而不是她現在活潑或會哭笑。",
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
    "compare": {
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
    "missing": {
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
    "transfer": {
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
    "not_patient": {
      "kind": "處理優先",
      "prompt": "E05 她把突然的哭笑、說太快和疲勞分開記在筆記裡。你想幫忙，哪個回應比較合適？",
      "options": [
        {
          "id": "evidence",
          "text": "在旁邊等她記完，再一起去吃飯；記錄由她自己決定怎麼寫。",
          "feedback": "支持她自己記錄症狀，而不是替她監測。她用醫師的眼光把不同的改變分開，本身就是很好的因應方式。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "說每一欄你都幫她盯著，確保記得完整。",
          "feedback": "這是本幕的陷阱：她說她是病人、不是實驗對象。被監測會傷害她的自主與尊嚴。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "告訴她不用分那麼細，反正都是個性變了。",
          "feedback": "不分清楚，正是她最擔心的事：把所有改變都說成個性變了，會忽略神經性的情緒表達問題、疲勞等其他原因。",
          "correct": false
        }
      ]
    },
    "delirium": {
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
    "frontal": {
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
    "impairment": {
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
  },
  "you_ziqian": {
    "observe": {
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
    "compare": {
      "kind": "比較解釋",
      "prompt": "子謙也很在意事情做得好不好。他和強迫型人格障礙症（F60.5）比起來，哪一點不一樣？",
      "options": [
        {
          "id": "evidence",
          "text": "他在意的是照他的意思做，不是固定的規則、清單或完美標準；他自己也常常改來改去。",
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
    "missing": {
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
    "transfer": {
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
    "demoted": {
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
          "text": "說：員工走了、客戶解約，都是你的錯。",
          "feedback": "直接指責會讓他覺得被嫌棄，很難接著處理問題。",
          "correct": false
        }
      ]
    },
    "impairment": {
      "kind": "辨識線索",
      "prompt": "E07 他拿出高中校刊，說從高中、大學樂團到上一段感情，他都會接手別人的事，最後大家都離開了。這最直接支持哪一項？",
      "options": [
        {
          "id": "evidence",
          "text": "一般準則 D：模式穩定、持續很久，最早可以追溯到青春期或成年早期。",
          "feedback": "跨越多個人生階段的同一種模式，是準則 D 需要的資料。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "一般準則 C：模式造成苦惱或功能減損。",
          "feedback": "C 看的是損害，例如 E05 被撤掉店長；這一幕的重點是時間的長度。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他高中時被同學欺負，所以才變成這樣。",
          "feedback": "一段回憶不能單獨證明人格的成因。",
          "correct": false
        }
      ]
    },
    "phone": {
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
          "text": "說：你這樣就是人格障礙。",
          "feedback": "把診斷當成罵人的話，對任何人都沒有幫助；而且這不是玩家能判斷的。",
          "correct": false
        }
      ]
    },
    "mood": {
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
  }
};

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
