'use strict';
const examSpellings=[
  {
    "id": "e2-spell-1",
    "kind": "詞語",
    "group": "D",
    "word": "穿戴",
    "key": "戴",
    "pinyin": "dài",
    "meaning": "把衣服、帽子或飾物穿著在身上。",
    "keyMeaning": "戴指把物件加在頭、面、頸、胸等部位。",
    "tip": "帽子用「戴」；運送物品才是「載」。",
    "options": [
      "戴",
      "載",
      "帶",
      "代"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-2",
    "kind": "詞語",
    "group": "D",
    "word": "耽誤",
    "key": "耽",
    "pinyin": "dān",
    "meaning": "因拖延或錯過而影響事情。",
    "keyMeaning": "耽指延遲、停留。",
    "tip": "延遲時間是耽誤；「擔」是承擔、挑擔。",
    "options": [
      "耽",
      "擔",
      "眈",
      "丹"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-3",
    "kind": "詞語",
    "group": "D",
    "word": "砥礪",
    "key": "砥",
    "pinyin": "dǐ",
    "meaning": "本指磨刀石，引申為磨練、勉勵。",
    "keyMeaning": "砥是細緻的磨刀石，也可指磨練。",
    "tip": "磨石有石字旁：砥礪；「抵」有抵擋義。",
    "options": [
      "砥",
      "抵",
      "底",
      "邸"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-4",
    "kind": "詞語",
    "group": "D",
    "word": "落第",
    "key": "第",
    "pinyin": "dì",
    "meaning": "考試未被錄取。",
    "keyMeaning": "第與考試的等第、名次有關。",
    "tip": "考試名次用「第」，不是傳遞的「遞」。",
    "options": [
      "第",
      "遞",
      "弟",
      "帝"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-5",
    "kind": "詞語",
    "group": "D",
    "word": "玷污",
    "key": "玷",
    "pinyin": "diàn",
    "meaning": "弄髒；也比喻損害名譽。",
    "keyMeaning": "玷本指玉上的斑點，引申為污點、缺陷。",
    "tip": "玉有污點叫玷；「沾」表示接觸、附著。",
    "options": [
      "玷",
      "沾",
      "點",
      "拈"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-6",
    "kind": "詞語",
    "group": "D",
    "word": "吊胃口",
    "key": "吊",
    "pinyin": "diào",
    "meaning": "引起好奇或欲望，卻暫不滿足。",
    "keyMeaning": "吊有懸起之意，比喻讓期待懸著。",
    "tip": "胃口被懸起，記「吊」；不是掉落的「掉」。",
    "options": [
      "吊",
      "掉",
      "釣",
      "調"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-7",
    "kind": "詞語",
    "group": "D",
    "word": "更迭",
    "key": "迭",
    "pinyin": "dié",
    "meaning": "交替、更換。",
    "keyMeaning": "迭指輪流、接連。",
    "tip": "新舊交替是更迭；重疊堆放才用「疊」。",
    "options": [
      "迭",
      "疊",
      "跌",
      "碟"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-8",
    "kind": "詞語",
    "group": "D",
    "word": "忙不迭",
    "key": "迭",
    "pinyin": "dié",
    "meaning": "急忙地做某事。",
    "keyMeaning": "不迭表示來不及。",
    "tip": "來不及等待，所以忙不迭；不是堆疊。",
    "options": [
      "迭",
      "疊",
      "碟",
      "蝶"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-9",
    "kind": "詞語",
    "group": "D",
    "word": "折疊",
    "key": "疊",
    "pinyin": "dié",
    "meaning": "把物件翻折，使一部分與另一部分相合。",
    "keyMeaning": "疊指層層相加、重合。",
    "tip": "折起後重疊在一起；與更迭的交替分開記。",
    "options": [
      "疊",
      "迭",
      "碟",
      "蝶"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-10",
    "kind": "詞語",
    "group": "D",
    "word": "通牒",
    "key": "牒",
    "pinyin": "dié",
    "meaning": "書面通知，多用於國與國之間。",
    "keyMeaning": "牒指文書、文件。",
    "tip": "文書是「牒」；光碟是「碟」。",
    "options": [
      "牒",
      "碟",
      "諜",
      "蝶"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-11",
    "kind": "詞語",
    "group": "D",
    "word": "飛碟",
    "key": "碟",
    "pinyin": "dié",
    "meaning": "形狀像碟子的飛行物。",
    "keyMeaning": "碟是小而淺的盤子。",
    "tip": "因外形像碟子而命名，不用文牒的「牒」。",
    "options": [
      "碟",
      "蝶",
      "牒",
      "諜"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-12",
    "kind": "詞語",
    "group": "D",
    "word": "影碟",
    "key": "碟",
    "pinyin": "dié",
    "meaning": "儲存影像的光碟。",
    "keyMeaning": "碟指圓盤形的儲存媒介。",
    "tip": "影像存在圓盤光碟上；蝴蝶才用蟲字旁。",
    "options": [
      "碟",
      "蝶",
      "牒",
      "諜"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-13",
    "kind": "詞語",
    "group": "D",
    "word": "裝訂",
    "key": "訂",
    "pinyin": "dìng",
    "meaning": "把書頁整理、連綴成冊。",
    "keyMeaning": "訂在此指把紙頁連綴成冊。",
    "tip": "記固定詞「裝訂成冊」；不要寫成裝定。",
    "options": [
      "訂",
      "定",
      "釘",
      "盯"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-14",
    "kind": "詞語",
    "group": "D",
    "word": "文牘",
    "key": "牘",
    "pinyin": "dú",
    "meaning": "公文、書信等文書。",
    "keyMeaning": "牘本指古代寫字用的木片，後指文書。",
    "tip": "木片寫成文書，所以是「牘」；閱讀才用「讀」。",
    "options": [
      "牘",
      "讀",
      "瀆",
      "黷"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-15",
    "kind": "詞語",
    "group": "D",
    "word": "橋墩",
    "key": "墩",
    "pinyin": "dūn",
    "meaning": "支承橋身的構造。",
    "keyMeaning": "墩指厚實的土石堆或支承體。",
    "tip": "橋下有厚實支柱，記土字旁；蹲下是足字旁。",
    "options": [
      "墩",
      "蹲",
      "敦",
      "燉"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-16",
    "kind": "詞語",
    "group": "E",
    "word": "扼守",
    "key": "扼",
    "pinyin": "è",
    "meaning": "控制、守住重要地點。",
    "keyMeaning": "扼指把持、控制要害。",
    "tip": "用手扼住要害，所以用提手旁。",
    "options": [
      "扼",
      "厄",
      "遏",
      "呃"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-17",
    "kind": "詞語",
    "group": "E",
    "word": "噩夢",
    "key": "噩",
    "pinyin": "è",
    "meaning": "令人恐懼的夢。",
    "keyMeaning": "噩指可怕、不祥。",
    "tip": "可怕的夢是噩夢；不要只按讀音寫成惡夢，本表採「噩」。",
    "options": [
      "噩",
      "愕",
      "鄂",
      "顎"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-18",
    "kind": "詞語",
    "group": "F",
    "word": "砝碼",
    "key": "砝",
    "pinyin": "fǎ",
    "meaning": "用天平測量質量時配用的標準物件。",
    "keyMeaning": "砝與碼合成名詞「砝碼」。",
    "tip": "記天平旁的砝碼有石字旁，不是方法的「法」。",
    "options": [
      "砝",
      "法",
      "祛",
      "怯"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-19",
    "kind": "詞語",
    "group": "F",
    "word": "返聘",
    "key": "返",
    "pinyin": "fǎn",
    "meaning": "再聘請已退休或離職的人員。",
    "keyMeaning": "返指回來。",
    "tip": "回來受聘是「返」，反方向才用「反」。",
    "options": [
      "返",
      "反",
      "板",
      "坂"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-20",
    "kind": "詞語",
    "group": "F",
    "word": "番邦",
    "key": "番",
    "pinyin": "fān",
    "meaning": "舊時對外國或外族的稱呼。",
    "keyMeaning": "番在這個舊稱中指外族、外國。",
    "tip": "依本表記「番邦」；這是歷史用語。",
    "options": [
      "番",
      "翻",
      "幡",
      "潘"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-21",
    "kind": "詞語",
    "group": "F",
    "word": "藩籬",
    "key": "藩",
    "pinyin": "fān",
    "meaning": "籬笆；比喻屏障、界限。",
    "keyMeaning": "藩指遮蔽、保護的屏障。",
    "tip": "藩籬隔出界限；和草木蕃茂的「蕃」比較。",
    "options": [
      "藩",
      "潘",
      "番",
      "帆"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-22",
    "kind": "詞語",
    "group": "F",
    "word": "蕃茂",
    "key": "蕃",
    "pinyin": "fán",
    "meaning": "草木茂盛。",
    "keyMeaning": "蕃在此指茂盛。",
    "tip": "草木茂盛記草字頭；本表採「蕃茂」，不要改成別的同義詞。",
    "options": [
      "蕃",
      "藩",
      "番",
      "翻"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25,
    "reference": "https://dict.revised.moe.edu.tw/dictView.jsp?ID=1630&la=0&powerMode=0"
  },
  {
    "id": "e2-spell-23",
    "kind": "詞語",
    "group": "F",
    "word": "蜚聲",
    "key": "蜚",
    "pinyin": "fēi",
    "meaning": "名聲傳播出去。",
    "keyMeaning": "蜚在此有飛揚、傳播的意思。",
    "tip": "名聲遠播，固定寫法是蜚聲，不寫成斐聲。",
    "options": [
      "蜚",
      "斐",
      "誹",
      "翡"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-24",
    "kind": "詞語",
    "group": "F",
    "word": "斐然",
    "key": "斐",
    "pinyin": "fěi",
    "meaning": "有文采、顯著的樣子。",
    "keyMeaning": "斐指有文采、有文飾。",
    "tip": "斐下有「文」，聯想文采斐然。",
    "options": [
      "斐",
      "蜚",
      "誹",
      "翡"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-25",
    "kind": "詞語",
    "group": "F",
    "word": "悱惻",
    "key": "悱",
    "pinyin": "fěi",
    "meaning": "悲切而動人的樣子。",
    "keyMeaning": "悱本指想說而難以說出；悱惻形容鬱結、悲切的情感。",
    "tip": "情感藏在心中，記豎心旁；不要用文采的「斐」。",
    "options": [
      "悱",
      "斐",
      "誹",
      "蜚"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25,
    "reference": "https://dict.revised.moe.edu.tw/dictView.jsp?ID=34467&la=0&powerMode=0"
  },
  {
    "id": "e2-spell-26",
    "kind": "詞語",
    "group": "F",
    "word": "俸祿",
    "key": "俸",
    "pinyin": "fèng",
    "meaning": "古代官員的薪給。",
    "keyMeaning": "俸指官員所得的薪酬。",
    "tip": "人的薪給用人字旁；侍奉的「奉」沒有這個偏旁。",
    "options": [
      "俸",
      "奉",
      "棒",
      "捧"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-27",
    "kind": "詞語",
    "group": "F",
    "word": "敷衍",
    "key": "敷",
    "pinyin": "fū",
    "meaning": "可指展開陳述，也常指辦事不認真、只做表面功夫。",
    "keyMeaning": "敷本有鋪開、布置之意；敷衍是合詞，須按語境理解。",
    "tip": "本表用「敷」，別把同音的膚、夫代入；不要把合詞硬拆成兩個現代意思。",
    "options": [
      "敷",
      "膚",
      "夫",
      "孵"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-28",
    "kind": "詞語",
    "group": "F",
    "word": "浮躁",
    "key": "浮",
    "pinyin": "fú",
    "meaning": "不沉著、不踏實。",
    "keyMeaning": "浮指浮在表面、不深入。",
    "tip": "心思浮在表面，便難以沉穩；用水字旁的「浮」。",
    "options": [
      "浮",
      "俘",
      "孚",
      "拂"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-29",
    "kind": "詞語",
    "group": "F",
    "word": "幅員",
    "key": "幅",
    "pinyin": "fú",
    "meaning": "領土的面積或範圍。",
    "keyMeaning": "幅本指布帛寬度，引申為幅面、範圍。",
    "tip": "國土的幅面，用巾字旁；輻射才用車字旁。",
    "options": [
      "幅",
      "輻",
      "副",
      "福"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-30",
    "kind": "詞語",
    "group": "F",
    "word": "輻射",
    "key": "輻",
    "pinyin": "fú",
    "meaning": "從中心向四面八方放射。",
    "keyMeaning": "輻是車輪中由輪轂連向輪圈的直木。",
    "tip": "想像車輪輻條由中心向外伸展，記車字旁。",
    "options": [
      "輻",
      "幅",
      "副",
      "福"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-31",
    "kind": "詞語",
    "group": "F",
    "word": "俯臥撐",
    "key": "俯",
    "pinyin": "fǔ",
    "meaning": "面朝下，以雙臂支撐身體起伏的運動。",
    "keyMeaning": "俯指低頭、向下。",
    "tip": "臉向下是俯；府是處所名稱。",
    "options": [
      "俯",
      "府",
      "腑",
      "腐"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-32",
    "kind": "詞語",
    "group": "F",
    "word": "副刊",
    "key": "副",
    "pinyin": "fù",
    "meaning": "報刊中刊登文藝等內容的版面。",
    "keyMeaning": "副指附屬的、次於主要部分的。",
    "tip": "主刊之外有副刊；一幅畫才用「幅」。",
    "options": [
      "副",
      "幅",
      "付",
      "復"
    ],
    "source": "assets/exam2/spelling-p25.png",
    "page": 25
  },
  {
    "id": "e2-spell-33",
    "kind": "四字詞語",
    "group": "D",
    "word": "以逸待勞",
    "key": "待",
    "pinyin": "dài",
    "meaning": "先養精蓄銳，等待疲憊的對手再行動。",
    "keyMeaning": "待指等待。",
    "tip": "等待對方疲勞，不是替代對方；記「待」。",
    "options": [
      "待",
      "代",
      "怠",
      "殆"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-34",
    "kind": "四字詞語",
    "group": "D",
    "word": "責無旁貸",
    "key": "貸",
    "pinyin": "dài",
    "meaning": "應負的責任不能推給別人。",
    "keyMeaning": "貸在此指推卸。",
    "tip": "責任不可旁推，記「旁貸」，不是旁代。",
    "options": [
      "貸",
      "代",
      "怠",
      "袋"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-35",
    "kind": "四字詞語",
    "group": "D",
    "word": "春風駘蕩",
    "key": "駘",
    "pinyin": "dài",
    "meaning": "春風和暢舒展；也可形容使人愉悅的氣象。",
    "keyMeaning": "駘蕩在這裡形容舒展、和暢。",
    "tip": "把駘蕩當整個詞記，依書寫作馬字旁的「駘」。",
    "options": [
      "駘",
      "殆",
      "怠",
      "貽"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27,
    "reference": "https://dict.revised.moe.edu.tw/dictView.jsp?ID=42417&la=0&powerMode=0"
  },
  {
    "id": "e2-spell-36",
    "kind": "四字詞語",
    "group": "D",
    "word": "戴罪立功",
    "key": "戴",
    "pinyin": "dài",
    "meaning": "承受罪責而爭取建立功勞以補過。",
    "keyMeaning": "戴在此指承受、負著。",
    "tip": "頭上負著罪責，記「戴罪」；不是代替罪責。",
    "options": [
      "戴",
      "帶",
      "代",
      "載"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-37",
    "kind": "四字詞語",
    "group": "D",
    "word": "殫精竭慮",
    "key": "殫",
    "pinyin": "dān",
    "meaning": "用盡精力與心思。",
    "keyMeaning": "殫指盡、用盡。",
    "tip": "殫與竭都有用盡義；不是彈奏的「彈」。",
    "options": [
      "殫",
      "彈",
      "憚",
      "單"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-38",
    "kind": "四字詞語",
    "group": "D",
    "word": "簞食瓢飲",
    "key": "簞",
    "pinyin": "dān",
    "meaning": "一筐飯、一瓢水，形容生活清苦而安貧樂道。",
    "keyMeaning": "簞是盛食物的竹器。",
    "tip": "竹器裝飯，用竹字頭；不是簡單的「單」。",
    "options": [
      "簞",
      "單",
      "殫",
      "禪"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-39",
    "kind": "四字詞語",
    "group": "D",
    "word": "虎視眈眈",
    "key": "眈",
    "pinyin": "dān",
    "meaning": "像老虎般注視，形容貪婪而伺機攫取。",
    "keyMeaning": "眈眈形容貪婪地注視。",
    "tip": "用眼睛盯著，所以是目字旁；耽誤才用耳字旁。",
    "options": [
      "眈",
      "耽",
      "擔",
      "丹"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-40",
    "kind": "四字詞語",
    "group": "D",
    "word": "稍事耽擱",
    "key": "耽",
    "pinyin": "dān",
    "meaning": "略為停留或延誤。",
    "keyMeaning": "耽指延遲；事在此有做、加以之意。",
    "tip": "與耽誤同記「耽」，不是眼睛注視的「眈」。",
    "options": [
      "耽",
      "擔",
      "眈",
      "丹"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-41",
    "kind": "四字詞語",
    "group": "D",
    "word": "獨當一面",
    "key": "當",
    "pinyin": "dāng",
    "meaning": "獨自承擔一方面的工作。",
    "keyMeaning": "當指擔任、承擔。",
    "tip": "能擔當一面的工作，所以是「當」。",
    "options": [
      "當",
      "擋",
      "檔",
      "黨"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-42",
    "kind": "四字詞語",
    "group": "D",
    "word": "投機倒把",
    "key": "倒",
    "pinyin": "dǎo",
    "meaning": "利用機會轉手買賣、囤積等手段牟利。",
    "keyMeaning": "倒在此指轉手買賣。",
    "tip": "聯想「倒賣」，不是到達的「到」。",
    "options": [
      "倒",
      "到",
      "搗",
      "導"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-43",
    "kind": "四字詞語",
    "group": "D",
    "word": "中流砥柱",
    "key": "砥",
    "pinyin": "dǐ",
    "meaning": "比喻能在困難中支撐大局的重要人物或力量。",
    "keyMeaning": "砥柱是黃河中的山石名稱；成語借其屹立激流的形象。",
    "tip": "砥柱是石，不要按抵擋的意思改成「抵柱」。",
    "options": [
      "砥",
      "抵",
      "底",
      "邸"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-44",
    "kind": "四字詞語",
    "group": "D",
    "word": "玷污清白",
    "key": "玷",
    "pinyin": "diàn",
    "meaning": "損害純潔的名譽或操守。",
    "keyMeaning": "玷本指玉的斑點，引申為污點。",
    "tip": "清白如美玉，污點是「玷」。",
    "options": [
      "玷",
      "沾",
      "點",
      "拈"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-45",
    "kind": "四字詞語",
    "group": "D",
    "word": "提心吊膽",
    "key": "吊",
    "pinyin": "diào",
    "meaning": "非常擔心、害怕。",
    "keyMeaning": "吊指懸起，形容心膽不安定。",
    "tip": "心膽像懸著，所以用「吊」；掉是落下。",
    "options": [
      "吊",
      "掉",
      "釣",
      "調"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-46",
    "kind": "四字詞語",
    "group": "D",
    "word": "掉以輕心",
    "key": "掉",
    "pinyin": "diào",
    "meaning": "對事情採取輕忽、不重視的態度。",
    "keyMeaning": "掉在此有擺弄、處置之意。",
    "tip": "「掉以輕心」的掉與「提心吊膽」的吊分開記。",
    "options": [
      "掉",
      "吊",
      "調",
      "釣"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-47",
    "kind": "四字詞語",
    "group": "D",
    "word": "尾大不掉",
    "key": "掉",
    "pinyin": "diào",
    "meaning": "尾巴太大，不能擺動；比喻下屬勢力過大，難以控制。",
    "keyMeaning": "掉指搖動、擺動。",
    "tip": "尾巴擺不動，用「掉」；不是尾巴不落下。",
    "options": [
      "掉",
      "吊",
      "調",
      "釣"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-48",
    "kind": "四字詞語",
    "group": "D",
    "word": "層巒疊嶂",
    "key": "疊",
    "pinyin": "dié",
    "meaning": "山峰重重相連、層層堆疊。",
    "keyMeaning": "疊指重疊。",
    "tip": "山峰一層又一層，所以是「疊」，不是更迭的「迭」。",
    "options": [
      "疊",
      "迭",
      "碟",
      "蝶"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-49",
    "kind": "四字詞語",
    "group": "D",
    "word": "大名鼎鼎",
    "key": "鼎",
    "pinyin": "dǐng",
    "meaning": "形容名聲非常大。",
    "keyMeaning": "鼎鼎在這裡形容盛大、顯赫。",
    "tip": "把鼎鼎作疊詞記，別按讀音寫成頂頂。",
    "options": [
      "鼎",
      "頂",
      "訂",
      "定"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-50",
    "kind": "四字詞語",
    "group": "D",
    "word": "疑竇叢生",
    "key": "竇",
    "pinyin": "dòu",
    "meaning": "接連產生許多疑點。",
    "keyMeaning": "竇本指孔穴；疑竇指令人懷疑的地方。",
    "tip": "疑點像藏在孔穴中的問題，記穴字頭。",
    "options": [
      "竇",
      "痘",
      "逗",
      "豆"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-51",
    "kind": "四字詞語",
    "group": "D",
    "word": "窮兵黷武",
    "key": "黷",
    "pinyin": "dú",
    "meaning": "任意發動戰爭，極力使用武力。",
    "keyMeaning": "黷在此指輕率、濫用。",
    "tip": "濫用武力用「黷」；公文才用「牘」。",
    "options": [
      "黷",
      "瀆",
      "牘",
      "讀"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-52",
    "kind": "四字詞語",
    "group": "D",
    "word": "歡度春節",
    "key": "度",
    "pinyin": "dù",
    "meaning": "愉快地度過春節。",
    "keyMeaning": "度指過時間。",
    "tip": "時間用度，渡江過河才用水字旁。",
    "options": [
      "度",
      "渡",
      "踱",
      "鍍"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-53",
    "kind": "四字詞語",
    "group": "D",
    "word": "橫渡長江",
    "key": "渡",
    "pinyin": "dù",
    "meaning": "從長江一岸到另一岸。",
    "keyMeaning": "渡指跨過水域。",
    "tip": "過河與水有關，所以是「渡」。",
    "options": [
      "渡",
      "度",
      "踱",
      "鍍"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-54",
    "kind": "四字詞語",
    "group": "D",
    "word": "咄咄逼人",
    "key": "咄",
    "pinyin": "duō",
    "meaning": "氣勢凌人，使人感到受壓迫。",
    "keyMeaning": "咄本是表示驚訝或呵斥的聲音。",
    "tip": "話語、聲勢迫人，記口字旁；本詞兩處填同一字。",
    "options": [
      "咄",
      "拙",
      "絀",
      "茁"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-55",
    "kind": "四字詞語",
    "group": "E",
    "word": "峨冠博帶",
    "key": "峨",
    "pinyin": "é",
    "meaning": "高帽子、寬衣帶，指古代士大夫的裝束。",
    "keyMeaning": "峨指高。",
    "tip": "帽子高高的，用山字旁「峨」，不是鵝鳥。",
    "options": [
      "峨",
      "蛾",
      "鵝",
      "娥"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-56",
    "kind": "四字詞語",
    "group": "E",
    "word": "渾渾噩噩",
    "key": "噩",
    "pinyin": "è",
    "meaning": "現代常形容糊塗無知、生活沒有明確目標的狀態。",
    "keyMeaning": "噩噩古有嚴肅淳厚義；此合詞後來常用來形容糊塗。",
    "tip": "本表重點是「噩」；整個詞的現代意義不能硬解成可怕的夢。",
    "options": [
      "噩",
      "愕",
      "鄂",
      "顎"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-57",
    "kind": "四字詞語",
    "group": "E",
    "word": "卓爾不群",
    "key": "爾",
    "pinyin": "ěr",
    "meaning": "才能、品德等超出常人，與眾不同。",
    "keyMeaning": "爾是形容詞詞尾，意為「……的樣子」。",
    "tip": "卓爾是卓越的樣子；爾在這裡不是「你」。",
    "options": [
      "爾",
      "而",
      "耳",
      "洱"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-58",
    "kind": "四字詞語",
    "group": "F",
    "word": "翻雲覆雨",
    "key": "翻",
    "pinyin": "fān",
    "meaning": "比喻反覆無常，或玩弄手段、權術。",
    "keyMeaning": "翻指翻動、翻轉。",
    "tip": "翻動雲雨，記有羽的「翻」；本表標示的是首字。",
    "options": [
      "翻",
      "番",
      "幡",
      "蕃"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-59",
    "kind": "四字詞語",
    "group": "F",
    "word": "不同凡響",
    "key": "凡",
    "pinyin": "fán",
    "meaning": "形容事物突出、不平凡。",
    "keyMeaning": "凡指平凡、普通。",
    "tip": "不同於平凡的聲響，因此用「凡」。",
    "options": [
      "凡",
      "反",
      "煩",
      "帆"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-60",
    "kind": "四字詞語",
    "group": "F",
    "word": "卷帙浩繁",
    "key": "繁",
    "pinyin": "fán",
    "meaning": "形容書籍或篇幅很多。",
    "keyMeaning": "繁指多、繁多；卷帙是書籍、篇卷。",
    "tip": "重點是數量繁多，寫「繁」；不是厭煩的煩。",
    "options": [
      "繁",
      "煩",
      "蕃",
      "帆"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-61",
    "kind": "四字詞語",
    "group": "F",
    "word": "反復無常",
    "key": "反",
    "pinyin": "fǎn",
    "meaning": "一再變來變去，沒有定準。",
    "keyMeaning": "反有翻轉、相反之意；反復指來回重複。",
    "tip": "本表標示首字「反」，不要寫成返。「反復無常」也作「反覆無常」。",
    "options": [
      "反",
      "返",
      "板",
      "坂"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-62",
    "kind": "四字詞語",
    "group": "F",
    "word": "蜚聲中外",
    "key": "蜚",
    "pinyin": "fēi",
    "meaning": "名聲傳遍國內外。",
    "keyMeaning": "蜚在此指傳播、飛揚。",
    "tip": "聲名遠傳用蜚；有文采才用「斐」。",
    "options": [
      "蜚",
      "斐",
      "誹",
      "翡"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-63",
    "kind": "四字詞語",
    "group": "F",
    "word": "奮發圖強",
    "key": "奮",
    "pinyin": "fèn",
    "meaning": "振作精神，謀求強盛。",
    "keyMeaning": "奮指振作、鼓起力量。",
    "tip": "振奮精神用「奮」，不是生氣的「憤」。",
    "options": [
      "奮",
      "憤",
      "糞",
      "忿"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-64",
    "kind": "四字詞語",
    "group": "F",
    "word": "奮發有為",
    "key": "奮",
    "pinyin": "fèn",
    "meaning": "振作向上，有所作為。",
    "keyMeaning": "奮指振作、努力。",
    "tip": "把奮發圖強與奮發有為一起記。",
    "options": [
      "奮",
      "憤",
      "糞",
      "忿"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-65",
    "kind": "四字詞語",
    "group": "F",
    "word": "血脈僨張",
    "key": "僨",
    "pinyin": "fèn",
    "meaning": "血脈張動，常形容情緒激昂、亢奮。",
    "keyMeaning": "僨在此指動起、奮起。",
    "tip": "依本表用人字旁的「僨」；不要因激憤而換成心字旁。",
    "options": [
      "僨",
      "憤",
      "噴",
      "墳"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27,
    "reference": "https://dict.revised.moe.edu.tw/dictView.jsp?ID=35978&la=0&powerMode=0"
  },
  {
    "id": "e2-spell-66",
    "kind": "四字詞語",
    "group": "F",
    "word": "風神瀟灑",
    "key": "風",
    "pinyin": "fēng",
    "meaning": "風采、神態自然大方而不拘束。",
    "keyMeaning": "風在這裡指風度、風采。",
    "tip": "風神是人的風采神態，並非神話中的風神。",
    "options": [
      "風",
      "瘋",
      "楓",
      "峰"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-67",
    "kind": "四字詞語",
    "group": "F",
    "word": "入不敷出",
    "key": "敷",
    "pinyin": "fū",
    "meaning": "收入不足以支付支出。",
    "keyMeaning": "敷在此指足夠。",
    "tip": "收入不夠支出，「敷」就是夠；與敷衍的合詞義分開。",
    "options": [
      "敷",
      "付",
      "孵",
      "膚"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-68",
    "kind": "四字詞語",
    "group": "F",
    "word": "幅員遼闊",
    "key": "幅",
    "pinyin": "fú",
    "meaning": "國土或地域的面積很廣大。",
    "keyMeaning": "幅指幅面、範圍；幅員指領土面積。",
    "tip": "國土幅面用巾字旁；放射線才用「輻」。",
    "options": [
      "幅",
      "輻",
      "副",
      "福"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-69",
    "kind": "四字詞語",
    "group": "F",
    "word": "破釜沉舟",
    "key": "釜",
    "pinyin": "fǔ",
    "meaning": "打破鍋、沉掉船，比喻下定決心，不留退路。",
    "keyMeaning": "釜是古代的鍋。",
    "tip": "鍋用來煮食，記「釜」；不是斧頭的斧。",
    "options": [
      "釜",
      "斧",
      "父",
      "府"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-70",
    "kind": "四字詞語",
    "group": "F",
    "word": "瓦釜雷鳴",
    "key": "釜",
    "pinyin": "fǔ",
    "meaning": "瓦鍋發出雷鳴般的聲響，比喻無才德者居高位、聲勢盛。",
    "keyMeaning": "釜指鍋；瓦釜是陶土製的鍋。",
    "tip": "瓦做的鍋是瓦釜；與破釜沉舟連起來記。",
    "options": [
      "釜",
      "斧",
      "父",
      "府"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-71",
    "kind": "四字詞語",
    "group": "F",
    "word": "肺腑之言",
    "key": "腑",
    "pinyin": "fǔ",
    "meaning": "發自內心的真誠話語。",
    "keyMeaning": "腑指內臟；肺腑比喻內心深處。",
    "tip": "由身體內部比喻內心，用肉（月）字旁。",
    "options": [
      "腑",
      "府",
      "俯",
      "腐"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-72",
    "kind": "四字詞語",
    "group": "F",
    "word": "自負盈虧",
    "key": "負",
    "pinyin": "fù",
    "meaning": "自己承擔盈利或虧損的結果。",
    "keyMeaning": "負指承擔。",
    "tip": "負起責任，記「負」；不是支付的「付」。",
    "options": [
      "負",
      "付",
      "附",
      "赴"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-73",
    "kind": "四字詞語",
    "group": "F",
    "word": "無以復加",
    "key": "復",
    "pinyin": "fù",
    "meaning": "已到極點，不能再增加。",
    "keyMeaning": "復在此指再、又。",
    "tip": "無法再增加，「復」是再；覆蓋的覆意義不同。",
    "options": [
      "復",
      "覆",
      "複",
      "腹"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  },
  {
    "id": "e2-spell-74",
    "kind": "四字詞語",
    "group": "F",
    "word": "天翻地覆",
    "key": "覆",
    "pinyin": "fù",
    "meaning": "形容變化極大，或鬧得十分厲害。",
    "keyMeaning": "覆指翻轉、傾覆。",
    "tip": "天翻、地也翻過來，用覆；再增加才用「復」。",
    "options": [
      "覆",
      "復",
      "複",
      "腹"
    ],
    "source": "assets/exam2/spelling-p27.png",
    "page": 27
  }
];
