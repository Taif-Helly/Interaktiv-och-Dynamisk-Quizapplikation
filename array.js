export const quizArray = [
    // ================= CODING =================
    // --- EASY ---
    {
        id: "codingEasy1",
        question: "Vilket av följande är ett programmeringsspråk?",
        answers: ["Python", "HTML", "CSS"],
        rightAnswer: 0,
        category: "coding",
        difficulty: "easy"
    },
    {
        id: "codingEasy2",
        question: "Vad används en for-loop till?",
        answers: ["Upprepa kod", "Lagra data", "Sortera filer"],
        rightAnswer: 0,
        category: "coding",
        difficulty: "easy"
    },
    {
        id: "codingEasy3",
        question: "Vilken symbol används ofta för att markera kommentarer i Python?",
        answers: ["//", "#", "/* */"],
        rightAnswer: 1,
        category: "coding",
        difficulty: "easy"
    },
    {
        id: "codingEasy4",
        question: "Vad står 'HTML' för?",
        answers: [
            "HyperText Markup Language",
            "HighText Modern Language",
            "Hyper Transfer Machine Language"
        ],
        rightAnswer: 0,
        category: "coding",
        difficulty: "easy"
    },
    {
        id: "codingEasy5",
        question: "Vilken typ av datatyp är 'true' i de flesta språk?",
        answers: ["Integer", "Boolean", "String"],
        rightAnswer: 1,
        category: "coding",
        difficulty: "easy"
    },

    // --- MEDIUM ---
    {
        id: "codingMedium1",
        question: "Vilken datastruktur använder principen FIFO (First In, First Out)?",
        answers: ["Stack", "Queue", "Tree"],
        rightAnswer: 1,
        category: "coding",
        difficulty: "medium"
    },
    {
        id: "codingMedium2",
        question: "Vad returnerar funktionen len([1, 2, 3, 4]) i Python?",
        answers: ["3", "4", "5"],
        rightAnswer: 1,
        category: "coding",
        difficulty: "medium"
    },
    {
        id: "codingMedium3",
        question: "Vilken HTTP-statuskod betyder att en resurs skapats?",
        answers: ["200 OK", "201 Created", "204 No Content", "301 Moved Permanently"],
        rightAnswer: 1,
        category: "coding",
        difficulty: "medium"
    },
    {
        id: "codingMedium4",
        question: "Vad betyder SQL?",
        answers: [
            "Structured Query Language",
            "System Quality Logic",
            "Simple Quick Loop"
        ],
        rightAnswer: 0,
        category: "coding",
        difficulty: "medium"
    },
    {
        id: "codingMedium5",
        question: "Vad är standardporten för HTTPS?",
        answers: ["21", "25", "80", "443"],
        rightAnswer: 3,
        category: "coding",
        difficulty: "medium"
    },

    // --- HARD ---
    {
        id: "codingHard1",
        question: "Vilken tidskomplexitet har en binärsökning i en sorterad lista?",
        answers: ["O(n)", "O(log n)", "O(n log n)"],
        rightAnswer: 1,
        category: "coding",
        difficulty: "hard"
    },
    {
        id: "codingHard2",
        question: "Vad betyder 'immutability' i programmering?",
        answers: [
            "Att data kan ändras när som helst",
            "Att data inte kan ändras efter skapandet",
            "Att en variabel kan byta typ dynamiskt"
        ],
        rightAnswer: 1,
        category: "coding",
        difficulty: "hard"
    },
    {
        id: "codingHard3",
        question: "Vilket av följande är INTE ett paradigmspråk?",
        answers: ["Objektorienterat", "Funktionellt", "Hexadecimalt"],
        rightAnswer: 2,
        category: "coding",
        difficulty: "hard"
    },
    {
        id: "codingHard4",
        question: "Vilket mönster används ofta för att strukturera MVC-ramverk?",
        answers: ["Model-View-Controller", "Master-Variable-Control", "Main-Vector-Code"],
        rightAnswer: 0,
        category: "coding",
        difficulty: "hard"
    },
    {
        id: "codingHard5",
        question: "Vilken algoritm används ofta för att kryptera data?",
        answers: ["AES", "FIFO", "DFS"],
        rightAnswer: 0,
        category: "coding",
        difficulty: "hard"
    },

    // --- EXTREME ---
    {
        id: "codingExtreme1",
        question: "Vilket av följande är en korrekt beskrivning av 'tail recursion'?",
        answers: [
            "Rekursivt anrop som sker sist i funktionen",
            "En funktion som anropar sig själv flera gånger",
            "En funktion som bara returnerar vid fel"
        ],
        rightAnswer: 0,
        category: "coding",
        difficulty: "extreme"
    },
    {
        id: "codingExtreme2",
        question: "Vilket av följande är ett exempel på ett NP-fullständigt problem?",
        answers: ["Primtalstest", "Traveling Salesman Problem", "Binärsökning"],
        rightAnswer: 1,
        category: "coding",
        difficulty: "extreme"
    },
    {
        id: "codingExtreme3",
        question: "Vilket språk introducerade konceptet 'generics' först?",
        answers: ["Java", "C++", "Ada"],
        rightAnswer: 2,
        category: "coding",
        difficulty: "extreme"
    },
    {
        id: "codingExtreme4",
        question: "Vilket år introducerades Lambda-funktioner i Java?",
        answers: ["2010", "2012", "2014", "2016"],
        rightAnswer: 2,
        category: "coding",
        difficulty: "extreme"
    },
    {
        id: "codingExtreme5",
        question: "Vilken typ av problem försöker P vs NP-frågan besvara?",
        answers: [
            "Om problem som är lätta att verifiera också är lätta att lösa",
            "Om alla problem kan lösas med rekursion",
            "Om datorer kan förstå naturligt språk perfekt"
        ],
        rightAnswer: 0,
        category: "coding",
        difficulty: "extreme"
    },

    // ================= GAMING =================
    // --- EASY ---
    {
        id: "gamingEasy1",
        question: "Vilken spelserie innehåller karaktären Mario?",
        answers: ["Zelda", "Sonic", "Super Mario"],
        rightAnswer: 2,
        category: "gaming",
        difficulty: "easy"
    },
    {
        id: "gamingEasy2",
        question: "Vilken konsol skapades av Sony?",
        answers: ["Xbox", "PlayStation"],
        rightAnswer: 1,
        category: "gaming",
        difficulty: "easy"
    },
    {
        id: "gamingEasy3",
        question: "Vilken figur är maskot för Sega?",
        answers: ["Sonic", "Mario", "Kirby"],
        rightAnswer: 0,
        category: "gaming",
        difficulty: "easy"
    },
    {
        id: "gamingEasy4",
        question: "Vad heter valutan i The Sims?",
        answers: ["Gil", "Rupees", "Simoleons"],
        rightAnswer: 2,
        category: "gaming",
        difficulty: "easy"
    },
    {
        id: "gamingEasy5",
        question: "Vilken genre tillhör spelet FIFA?",
        answers: ["Sport", "RPG", "Strategi"],
        rightAnswer: 0,
        category: "gaming",
        difficulty: "easy"
    },

    // --- MEDIUM ---
    {
        id: "gamingMedium1",
        question: "I vilket spel samlar man på resurser och bygger med block?",
        answers: ["Minecraft", "Fortnite", "Roblox"],
        rightAnswer: 0,
        category: "gaming",
        difficulty: "medium"
    },
    {
        id: "gamingMedium2",
        question: "Vilket år släpptes första versionen av World of Warcraft?",
        answers: ["2002", "2004", "2006"],
        rightAnswer: 1,
        category: "gaming",
        difficulty: "medium"
    },
    {
        id: "gamingMedium3",
        question: "Vad heter huvudkaraktären i Halo-serien?",
        answers: ["Master Chief", "Cortana", "Arbiter"],
        rightAnswer: 0,
        category: "gaming",
        difficulty: "medium"
    },
    {
        id: "gamingMedium4",
        question: "Vilken konsol introducerade rörelsekontroller med 'Wii Remote'?",
        answers: ["Xbox", "Nintendo Wii", "PlayStation 2"],
        rightAnswer: 1,
        category: "gaming",
        difficulty: "medium"
    },
    {
        id: "gamingMedium5",
        question: "Vilket spel är känt för frasen 'The cake is a lie'?",
        answers: ["Half-Life", "Portal", "Bioshock"],
        rightAnswer: 1,
        category: "gaming",
        difficulty: "medium"
    },

    // --- HARD ---
    {
        id: "gamingHard1",
        question: "Vad heter huvudkaraktären i The Legend of Zelda-serien?",
        answers: ["Zelda", "Link", "Ganon"],
        rightAnswer: 1,
        category: "gaming",
        difficulty: "hard"
    },
    {
        id: "gamingHard2",
        question: "Vilken spelutvecklare skapade Half-Life?",
        answers: ["Valve", "id Software", "Bethesda"],
        rightAnswer: 0,
        category: "gaming",
        difficulty: "hard"
    },
    {
        id: "gamingHard3",
        question: "Vilket år släpptes första PlayStation?",
        answers: ["1992", "1994", "1996"],
        rightAnswer: 1,
        category: "gaming",
        difficulty: "hard"
    },
    {
        id: "gamingHard4",
        question: "Vilken spelserie innehåller staden Rapture?",
        answers: ["Fallout", "Bioshock", "Dishonored"],
        rightAnswer: 1,
        category: "gaming",
        difficulty: "hard"
    },
    {
        id: "gamingHard5",
        question: "Vad heter företaget som äger Steam?",
        answers: ["Epic Games", "Valve", "Ubisoft"],
        rightAnswer: 1,
        category: "gaming",
        difficulty: "hard"
    },

    // --- EXTREME ---
    {
        id: "gamingExtreme1",
        question: "Vilket spel anses ofta vara det första kommersiellt framgångsrika MMORPG?",
        answers: ["Ultima Online", "EverQuest", "Runescape"],
        rightAnswer: 0,
        category: "gaming",
        difficulty: "extreme"
    },
    {
        id: "gamingExtreme2",
        question: "I Dark Souls finns en boss som kallas 'The Nameless King'. På vilken plats utspelar sig striden?",
        answers: ["Anor Londo", "Archdragon Peak", "Undead Settlement"],
        rightAnswer: 1,
        category: "gaming",
        difficulty: "extreme"
    },
    {
        id: "gamingExtreme3",
        question: "Vilket spel vann Game of the Year på The Game Awards 2015?",
        answers: ["The Witcher 3", "Bloodborne", "Fallout 4"],
        rightAnswer: 0,
        category: "gaming",
        difficulty: "extreme"
    },
    {
        id: "gamingExtreme4",
        question: "I Metal Gear Solid 3 måste spelaren slåss mot en boss vid namn 'The End'. Hur gammal sägs han vara?",
        answers: ["65", "80", "100"],
        rightAnswer: 2,
        category: "gaming",
        difficulty: "extreme"
    },
    {
        id: "gamingExtreme5",
        question: "Vilket indiespel blev känt för sin svåra bossdesign och 1930-talsinspirerade grafik?",
        answers: ["Cuphead", "Hollow Knight", "Celeste"],
        rightAnswer: 0,
        category: "gaming",
        difficulty: "extreme"
    }
]
