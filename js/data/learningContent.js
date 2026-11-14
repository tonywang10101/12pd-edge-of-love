// Immediate scene-based questions; no delayed-recall scheduling.
export const LEARNING_TASKS = {
  "shen_mo": [
    {
      "kind": "辨識線索",
      "prompt": "E03 哪一段比較支持不願傾訴的線索？",
      "options": [
        {
          "id": "evidence",
          "text": "朋友從未洩密，仍多年怕日常喜好被拿來傷害自己。",
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
          "text": "過往關係脈絡、實際證據、病程及其他精神／身體因素。",
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
          "text": "拒絕說地址就是不願傾訴的診斷準則。",
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
    }
  ],
  "lin_jianwei": [
    {
      "kind": "辨識線索",
      "prompt": "E03 漏掉交班最直接補充哪種資訊？",
      "options": [
        {
          "id": "evidence",
          "text": "必要聯繫失敗造成的工作影響。",
          "feedback": "有功能影響可供評估，仍不能由漏接電話單獨推論人格障礙。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "沒有朋友就一定有障礙。",
          "feedback": "朋友數量不是單獨的診斷判準。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "喜歡修錶代表快感缺失。",
          "feedback": "能享受活動反而不能直接拿來支持「少有樂趣」。",
          "correct": false
        }
      ]
    },
    {
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
    {
      "kind": "資料缺口",
      "prompt": "要理解她的社會疏離，應再了解什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "長期跨情境需求、功能損害、發展史與其他病況。",
          "feedback": "不以性傾向或社交量取代完整評估。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "是否願意改成每天約會。",
          "feedback": "陪伴頻率是協商，不能當成病理測驗。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "能否看懂一個隱喻。",
          "feedback": "一次語言理解不能排除 ASD 或其他發展狀況。",
          "correct": false
        }
      ]
    },
    {
      "kind": "新案例",
      "prompt": "一位無性戀者喜歡獨處，工作與友誼皆符合本人需要。現有資訊支持？",
      "options": [
        {
          "id": "evidence",
          "text": "性傾向與獨處偏好本身不構成障礙證據。",
          "feedback": "仍應尊重個體差異，不靠社交期待病理化。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "沒有性興趣就已證實孤僻型。",
          "feedback": "傾向、動機與功能資料不能省略。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "只要能笑就可排除一切人格困難。",
          "feedback": "有幽默不等於沒有持續困難。",
          "correct": false
        }
      ]
    }
  ],
  "ruri": [
    {
      "kind": "辨識線索",
      "prompt": "E03 裂磚與繞路，哪些資料仍需問清？",
      "options": [
        {
          "id": "evidence",
          "text": "信念確信度、是否侵入且不想要、是否以繞路消除恐懼。",
          "feedback": "可能涉及奇幻信念，也可能有侵入性念頭與中和儀式，現階段保留。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "外婆有沒有水晶。",
          "feedback": "共同文化物品不能直接說明個人症狀。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "衣服是否古怪。",
          "feedback": "藝術風格不是這段信念的證據。",
          "correct": false
        }
      ]
    },
    {
      "kind": "比較解釋",
      "prompt": "哪個情況較值得討論關係意念？",
      "options": [
        {
          "id": "evidence",
          "text": "中性路燈閃動被反覆解作專門給自己的訊息。",
          "feedback": "個人化意義是線索，仍須評估確信程度、文化與影響。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "兩人共同用星圖比喻杯紋。",
          "feedback": "雙方知道是比喻時，不應直接標成症狀。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "家人一起參加祈福活動。",
          "feedback": "文化共同實踐本身不夠。",
          "correct": false
        }
      ]
    },
    {
      "kind": "資料缺口",
      "prompt": "指尖電流感反覆妨礙工作，下一步需哪些資料？",
      "options": [
        {
          "id": "evidence",
          "text": "神經與感官因素、物質／用藥、知覺經驗與病程。",
          "feedback": "感覺真實令人困擾，但不能僅由奇特感覺推論人格病因。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "她是否願意相信玩家。",
          "feedback": "信任不是病因證明。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "能否畫一幅正常的畫。",
          "feedback": "藝術形式不能排除或確定診斷。",
          "correct": false
        }
      ]
    },
    {
      "kind": "新案例",
      "prompt": "有人反覆出現不想要的害人念頭，以固定繞路暫時減輕焦慮。應如何理解？",
      "options": [
        {
          "id": "evidence",
          "text": "需評估強迫意念／儀式等其他解釋，不能只因內容奇特歸入思覺失調型。",
          "feedback": "這是鑑別方向，尚不足直接確診 OCD。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "只要相信繞路有用就是同一人格準則。",
          "feedback": "信念內容相似仍可能有不同體驗與機制。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "知道念頭可能不合理就完全不用評估。",
          "feedback": "保有部分洞察仍可能有顯著困擾。",
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
      "prompt": "為何 E07 記錄 12～14 歲本人的行為史？",
      "options": [
        {
          "id": "evidence",
          "text": "ASPD 評估需有 15 歲前行為規範障礙證據，並確認成人年齡與排除條件。",
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
          "text": "童年曾有一次善意就可排除成年模式。",
          "feedback": "單一善意不能完成病程評估。",
          "correct": false
        }
      ]
    },
    {
      "kind": "資料缺口",
      "prompt": "他把款項交回會計，還應分開了解什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "長期履約、對不同人的行為、物質與情緒／精神病症病程。",
          "feedback": "本次歸還值得記錄，不直接表示模式消失。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "是不是只聽玩家的話。",
          "feedback": "只對特定人例外不能代表普遍改變。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "外表是否很有魅力。",
          "feedback": "魅力不是必要診斷條件。",
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
    }
  ],
  "su_fei": [
    {
      "kind": "辨識線索",
      "prompt": "E03 情緒變化的哪些資訊較有幫助？",
      "options": [
        {
          "id": "evidence",
          "text": "觸發情境、持續數小時、跨關係反覆及實際影響。",
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
    },
    {
      "kind": "資料缺口",
      "prompt": "像隔著玻璃看自己的經驗，還要了解什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "嚴重度、時間、壓力關聯、物質與其他解離／醫療解釋。",
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
    }
  ],
  "xia_le": [
    {
      "kind": "辨識線索",
      "prompt": "E03 的性暗示互動為何可供討論？",
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
      "prompt": "E01 離開焦點不舒服、反覆插話，最直接支持什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "尋求注意的線索；尚不足額外確認戲劇化／誇張情緒。",
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
      "prompt": "他對剛認識的廠商稱生死知己，還需了解？",
      "options": [
        {
          "id": "evidence",
          "text": "實際關係約定、是否反覆高估、病程與功能影響。",
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
    }
  ],
  "gu_qingcheng": [
    {
      "kind": "辨識線索",
      "prompt": "E03 哪一點較能支持自認特殊的線索？",
      "options": [
        {
          "id": "evidence",
          "text": "只認高位機構有資格理解自己，拒絕一般使用者意見。",
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
          "text": "前者涉及佔用利益與忽視需求，後者本身只是感受。",
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
      "prompt": "她曾幻想完美作品與愛人，還要了解？",
      "options": [
        {
          "id": "evidence",
          "text": "幻想的持續專注、範圍、地位意義及功能影響。",
          "feedback": "一般理想與持續誇大幻想不能只靠一個比喻區分。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "是否接受有氣泡的玻璃。",
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
      "prompt": "獲獎建築師自信介紹作品，也願意平等聽回饋。現有資料？",
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
    }
  ],
  "wen_yan": [
    {
      "kind": "辨識線索",
      "prompt": "E03 他想參加卻一直確認是否被歡迎，核心資料是？",
      "options": [
        {
          "id": "evidence",
          "text": "渴望連結，但因害怕不被接納而退縮。",
          "feedback": "不是只看最後有沒有出席。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "天生不喜歡人。",
          "feedback": "這與場景中想參加的意願不符。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "說話會停頓。",
          "feedback": "口吃或停頓本身不是人格障礙。",
          "correct": false
        }
      ]
    },
    {
      "kind": "比較解釋",
      "prompt": "他因被叫小兔子而不舒服，應如何理解？",
      "options": [
        {
          "id": "evidence",
          "text": "先承認真實不妥的玩笑，不能把所有不舒服歸成過度敏感。",
          "feedback": "主角也需負責，與無實際貶抑卻預期被拒分開。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "既有畏避特徵就一定是他誤解。",
          "feedback": "標籤不能取消他人確實的傷害。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "只要真的受傷，就可排除他所有畏避困難。",
          "feedback": "真實傷害與其他情境的持續模式可並存。",
          "correct": false
        }
      ]
    },
    {
      "kind": "資料缺口",
      "prompt": "E10 親密中藏起情詩，應再了解？",
      "options": [
        {
          "id": "evidence",
          "text": "害怕羞辱的動機、長期親密模式、功能及其他解釋。",
          "feedback": "與職業座談迴避區分，不能只由沒念詩判定。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "有沒有上過大型舞台。",
          "feedback": "SAD 與畏避模式不能只用舞台大小區分。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "詩寫得好不好。",
          "feedback": "作品品質不是診斷依據。",
          "correct": false
        }
      ]
    },
    {
      "kind": "新案例",
      "prompt": "某人想去聚會，卻因社交焦慮退出；尚無人格病程資料。最合理？",
      "options": [
        {
          "id": "evidence",
          "text": "保留 SAD、人格模式與其他解釋，不能由一次退出完成鑑別。",
          "feedback": "社交焦慮也能廣泛，兩者可能重疊。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "很想連結就可直接確診畏避型。",
          "feedback": "動機只是部分資訊。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "怕上台一定只有 SAD。",
          "feedback": "場域不能取代完整評估。",
          "correct": false
        }
      ]
    }
  ],
  "bai_xiaolu": [
    {
      "kind": "辨識線索",
      "prompt": "E03 要把續約、薪資、住處全交給主角，較有資訊的是？",
      "options": [
        {
          "id": "evidence",
          "text": "在沒有迫切危機下，廣泛不信任判斷而想交出主要生活責任。",
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
      "prompt": "安全關係中因怕失去照顧而不敢說不，與怕實際報復有何差異？",
      "options": [
        {
          "id": "evidence",
          "text": "現實威脅下的順從可能是自保，不能直接計入同一準則。",
          "feedback": "應先了解安全、文化與權力條件。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "兩種不說不的動作一樣，所以一樣。",
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
      "prompt": "E12 同談獨處無助與害怕被留下，還需區分？",
      "options": [
        {
          "id": "evidence",
          "text": "當下獨處不適，與長期預占擔憂被留下照顧自己的模式。",
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
      "prompt": "有人暫因手術需要家人幫忙選餐、處理帳單。能判定依賴型嗎？",
      "options": [
        {
          "id": "evidence",
          "text": "不能由暫時合理照護推定，需要長期跨情境模式資料。",
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
    }
  ],
  "ji_yan": [
    {
      "kind": "辨識線索",
      "prompt": "E03 簡章已達共同標準卻反覆改到錯過印刷，重點是？",
      "options": [
        {
          "id": "evidence",
          "text": "額外完美標準妨礙任務完成。",
          "feedback": "準則關心代價，不是有校對或清單就算。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "有耐心校稿。",
          "feedback": "合理覆核可能有助完成。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "法醫工作需要準確。",
          "feedback": "必要專業規範不能直接病理化。",
          "correct": false
        }
      ]
    },
    {
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
    {
      "kind": "資料缺口",
      "prompt": "長期把錢留給想像災難，還應了解什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "實際經濟條件、文化、必要支出的剝奪與跨情境影響。",
          "feedback": "合理儲蓄和經濟困難需分開。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "存款數字是否比玩家高。",
          "feedback": "比較資產不足以理解吝嗇模式。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "有沒有反覆洗手。",
          "feedback": "OCPD 不以 OCD 的強迫行為為必要條件，兩者亦可共存。",
          "correct": false
        }
      ]
    },
    {
      "kind": "新案例",
      "prompt": "醫療工作者嚴守樣本安全規範，休閒與人際有彈性。現有資料？",
      "options": [
        {
          "id": "evidence",
          "text": "合理專業標準不能單獨支持 OCPD。",
          "feedback": "須看過度僵化、跨情境與損害。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "守規則就是強迫型。",
          "feedback": "這忽略標準的目的與比例。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "有 OCD 就不可能同時有 OCPD。",
          "feedback": "兩者不是互斥分類。",
          "correct": false
        }
      ]
    }
  ],
  "lu_qinglan": [
    {
      "kind": "辨識線索",
      "prompt": "E03 哪類資料較能支持身體病況的直接關聯？",
      "options": [
        {
          "id": "evidence",
          "text": "本人同意分享的病史、檢查及醫療團隊評估摘要。",
          "feedback": "玩家不靠作品或外表推定病理生理原因。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "金繼作品有裂痕。",
          "feedback": "藝術象徵不能證明病因。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "頭上有疤。",
          "feedback": "疤痕本身不能說明人格改變的直接關聯。",
          "correct": false
        }
      ]
    },
    {
      "kind": "比較解釋",
      "prompt": "F07.0 與典型人格障礙病程應怎樣區分？",
      "options": [
        {
          "id": "evidence",
          "text": "需比較病前已形成人格與病後持續改變，並有病理生理關聯。",
          "feedback": "不能把病後變化自動回推成成年早期的人格模式。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "發生腦傷後所有行為都算人格改變。",
          "feedback": "動作、認知、疲勞與其他病況須分開。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "只要清楚談話就能排除譫妄病程。",
          "feedback": "需要跨時間醫療資料。",
          "correct": false
        }
      ]
    },
    {
      "kind": "資料缺口",
      "prompt": "E12 的易變型與去抑制型，需怎樣理解？",
      "options": [
        {
          "id": "evidence",
          "text": "是 F07.0 正式註明類型的案例設定，依整體病程，不由動作失誤推定。",
          "feedback": "合併型可描述多種特徵，不能與其他診斷的非正式形容混用。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "拿不住杯子就證明去抑制型。",
          "feedback": "動作限制不是衝動控制的同義詞。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "說話溫柔代表沒有身體病況影響。",
          "feedback": "一次良好互動不能排除持續變化。",
          "correct": false
        }
      ]
    },
    {
      "kind": "新案例",
      "prompt": "腦傷後疲倦、手抖，但沒有足夠人格改變資料。可以推論？",
      "options": [
        {
          "id": "evidence",
          "text": "需要分開評估神經、認知、情緒與人格，不能直接判為 F07.0。",
          "feedback": "相關症狀不等於這個診斷的完整條件。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "所有腦傷都會有 F07.0。",
          "feedback": "需具體的病前後改變與其他條件。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "能做藝術就可排除腦傷後變化。",
          "feedback": "能力與持續困難可並存。",
          "correct": false
        }
      ]
    }
  ],
  "you_ziqian": [
    {
      "kind": "辨識線索",
      "prompt": "E03 不同場域都先答應再拖延，最直接補充？",
      "options": [
        {
          "id": "evidence",
          "text": "模式的跨情境與缺乏彈性，仍需時間與功能資料。",
          "feedback": "一次拖稿不能等同一般人格障礙條件。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "微笑的方式。",
          "feedback": "表情不是隱性抗拒的充分證據。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "咖啡店長這個職業。",
          "feedback": "職業不作診斷依據。",
          "correct": false
        }
      ]
    },
    {
      "kind": "比較解釋",
      "prompt": "「被動攻擊」與 F60.89 的關係是？",
      "options": [
        {
          "id": "evidence",
          "text": "前者是描述性特徵，不能自動推出其他特定人格障礙。",
          "feedback": "需持續模式、損害、具體未符合單一類型的理由與排除評估。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "被動攻擊是 DSM-5-TR 獨立人格障礙。",
          "feedback": "現行分類不是這樣使用。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "有畏避特徵就一定不能使用其他特定類別。",
          "feedback": "特徵與完整特定診斷條件不同，需說明理由。",
          "correct": false
        }
      ]
    },
    {
      "kind": "資料缺口",
      "prompt": "作者設定為混合人格特徵，還應交代什麼？",
      "options": [
        {
          "id": "evidence",
          "text": "一般條件、哪些特徵存在、為何未完整符合單一特定診斷及排除限制。",
          "feedback": "不能只用「混合」當作省略推理的標籤。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "玩家是否猜中反話。",
          "feedback": "猜心能力不是診斷證據。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "他有沒有摔破一個杯子。",
          "feedback": "單一破壞行為不足以支持分類。",
          "correct": false
        }
      ]
    },
    {
      "kind": "新案例",
      "prompt": "設計師因期限不可能而延後交件，平時可靠且直接說明。最合理？",
      "options": [
        {
          "id": "evidence",
          "text": "先理解工作條件，不能由這次延期推論持久人格困難。",
          "feedback": "合理拒絕、資源不足與隱性抗拒需分開。",
          "correct": true
        },
        {
          "id": "alternative",
          "text": "延期就是被動攻擊。",
          "feedback": "動作相同不能代替動機與病程。",
          "correct": false
        },
        {
          "id": "inference",
          "text": "只要客戶不高興就達診斷損害門檻。",
          "feedback": "衝突或他人不滿不單獨構成診斷。",
          "correct": false
        }
      ]
    }
  ]
};
export function getLearningTasks(id,eventNumber){const tasks=LEARNING_TASKS[id]||[];return eventNumber===3?[{...tasks[0],id:'observe'}]:eventNumber===8?[{...tasks[1],id:'compare'}]:eventNumber===12?[{...tasks[2],id:'missing'}]:eventNumber===15?[{...tasks[3],id:'transfer'}]:[];}
