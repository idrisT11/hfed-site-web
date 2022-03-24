
const   TYPE = {
    NATIVE_CASE: 0,    
    FOREIGN_CASE: 1,
    NATIVE_WRITE: 2,    
    FOREIGN_WRITE: 3,
    QCM_FOREIGN: 4,
    QCM_NATIVE: 5,
    LINK_WORDS: 6,
}

const Table = [
    {
        id: "0",
        htmlContentUrl: 'course1',
        wordAudio: [
            'CourseData/vocal/nekki.ogg',
            'CourseData/vocal/rohegh.ogg',
        ]
    },

    {
        id: "1",
        tp: TYPE.NATIVE_CASE,
        ans : ["I went"],
        pro : ["I", "ate", "went"],
        def: [
            ["Nekki", "I"],
            ["Rohegh", "[I] Went"]
        ],

        phraseAudio: 'CourseData/vocal/nekki_rohegh.ogg',
        wordAudio:[
            'CourseData/vocal/nekki.ogg',
            'CourseData/vocal/rohegh.ogg',
        ]

    },  
  
    {
        id: "2",
        tp : TYPE.NATIVE_CASE,
        ans : ["You ate"],
        pro : ["You", "ate", "an apple", "went"],
        def: [
            ["Kechi", "You [Singular Masculine]"],
            ["tchit", "Ate [singular You]"],
        ],

        phraseAudio: 'CourseData/vocal/kchi_tchit.ogg',
        wordAudio:[
            'CourseData/vocal/kchi.ogg',
            'CourseData/vocal/tchit.ogg',
        ]
    },

    {
        id: "3",
        tp: TYPE.NATIVE_WRITE,
        ans: ["I went to school"],
        def: [
            ["Nekki", "I"],
            ["rohegh", "went"],
            ["agh", "To"],
            ["l-djama3", "School"]
        ]
    },

    {
        id: "4",
        tp : TYPE.NATIVE_CASE,
        ans : ["You went to the beach"],
        pro : ["You", "the school", "the beach", "went", "to"],
        def: [
          ["Kechi", "You [Singular Masculine]"],
          ["TRohet","Went [singular You]"],
          ["Agh", "To"],
          ["lbhar", "The beach"]
        ]
    },

    {
        id: "5",
        tp : TYPE.FOREIGN_CASE,
        ans : ["Nekki Chigh", "Chigh"],
        pro : ["Nekki", "Chigh", "Kechi"],
        def : [
            ["I", "Nekki"],
            ["Ate", "Cha"]
        ],
    },
    
    {
        id: "6",
        tp : TYPE.NATIVE_CASE,
        ans : ["You ate an appel"],
        pro : ["You", "an appel", "a watermelon", "ate"],
        def: [
          ["Kunwi", "You [Plural masculine]"],
          ["TChim", "Ate [You plural masculine]"],
          ["ta_tfaht", "An apple"]
        ]
    }, 

    {
        id: "7",
        tp : TYPE.FOREIGN_CASE,
        ans : ["Nekki Chigh ta_tfaht"],
        pro : ["Nekki", "Chigh", "dela3" ,"ta_tfaht"],
        def : [
            ["I", "Nekki"], 
            ["ate", "Cha"], 
            ["an apple", "Ta_fhat"]
        ],
    },    
    {
        id: "8",
        tp : TYPE.QCM_FOREIGN,
        ans : 2,
        pro : [
            "Kechi Rohegh agh lbhar",
            "Nekki TRohet agh lbhar",
            "Kechi TRohet agh lbhar",
        ],
        def : [ 
            ["You", "Kechi"], 
            ["went", "TRohet"], 
            ["to", "agh"],
            ["the beach", "lbhar"],
        ],
    },
    
    

    {
        id: "9",
        tp : TYPE.LINK_WORDS,
        cpl : [
            ["I", "Nekki"], 
            ["You", "Kechi"], 
            ["Water", "A_man"],
            ["The beach", "Lbhar"],
            ["I went", "Nekki Rohegh"],
            ["You ate", "Kechi TChit"]
        ],
    },

    {
        id: "10",
        tp : TYPE.FOREIGN_CASE,
        ans : ["Nekki swigh a_man", "Swigh a_man"],
        pro : ["Nekki", "swigh", "Tswit" ,"a_man"],
        def : [
            ["I", "Nekki"], 
            ["drank", "swa"], 
            ["water", "A_man"]
        ],
    },

  ];

  export {Table, TYPE};
