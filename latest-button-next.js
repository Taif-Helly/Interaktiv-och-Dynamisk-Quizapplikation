// import { quizArray } from "./array.js"

// const headerContainer = document.getElementById("header-container")
// const mainContainer = document.getElementById('main-container')

// // Logotext
// const logo = document.createElement('h1')
// logo.textContent = 'GI QUIZ'
// headerContainer.appendChild(logo)

// // Sidotitel
// const pageTitle = document.createElement('h2')
// pageTitle.textContent = 'Välj frågekategori'
// mainContainer.appendChild(pageTitle)

// // Kategori-container
// const categoryContainer = document.createElement('div')
// categoryContainer.id = 'category-container'

// // Array med alla kategorier och deras information
// const categories = [
//     {value: 'coding', title: 'Coding', description: 'Everything about code', questions: 5},
//     {value: 'gaming', title: 'Gaming', description: 'Everything about video games', questions: 5}
// ]

// // Knapp med information för varje kategori
// categories.forEach(category => {
//     const btn = document.createElement('button')
//     btn.value = category.value

//     const title = document.createElement('div')
//     title.textContent = category.title

//     const description = document.createElement('div')
//     description.textContent = category.description

//     const questions = document.createElement('div')
//     questions.textContent = `${category.questions} frågor`

//     btn.appendChild(title)
//     btn.appendChild(description)
//     btn.appendChild(questions)

//     categoryContainer.appendChild(btn)
// })

// mainContainer.appendChild(categoryContainer)

// // Svårighetsgrad-container
// const difficultyContainer = document.createElement('div')
// difficultyContainer.id = 'difficulty-container'

// // Array med alla svårighetsgrader
// const difficulties = [
//     {value: 'easy', text: 'Easy'},
//     {value: 'medium', text: 'Medium'},
//     {value: 'hard', text: 'Hard'},
//     {value: 'extreme', text: 'Extreme'}
// ]

// // Knapp för varje svårighetsgrad
// difficulties.forEach(difficulty => {
//     const btn = document.createElement('button')
//     btn.value = difficulty.value
//     btn.textContent = difficulty.text
//     difficultyContainer.appendChild(btn)
// })

// mainContainer.appendChild(difficultyContainer)

// // Startknapp
// const startButton = document.createElement('button')
// startButton.id = 'start-btn'
// startButton.value = 'start-btn'
// startButton.textContent = 'Start quiz'
// mainContainer.appendChild (startButton)

// // Gammalt, kan tas bort
// /* const categoryContainer = document.getElementById('category-container')
// const difficultyContainer = document.getElementById('difficulty-container')
// const startButton = document.getElementById('start-btn') */

// // Logik
// let currentCategory = null
// let currentDifficulty = null

// // Om vi bara vill välja kategori
// /* categoryContainer.addEventListener('click', (e) => { 
//     if (e.target.tagName === 'BUTTON') {
//         currentCategory = e.target.value 
//         console.log(currentCategory) } }) */


// // Om vi vill välja kategori och svårighetsgrad
// categoryContainer.addEventListener('click', (e) => {
//     // Undviker att fånga andra klick i containern
//     const categoryBtn = e.target.closest('button')

//     if (categoryBtn) {
//         // Hämtar value från knappen som användaren har klickat på
//         const clickedCategory = categoryBtn.value

//         // Avmarkerar tidigare vald knapp
//         categoryContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('selected')) // Det här kanske man kan lägga i en funktion eftersom det upprepas

//         if (currentCategory === clickedCategory) {
//             // Om användaren klickar på samma knapp igen avmarkeras den
//             currentCategory = null
//             categoryBtn.classList.remove('selected')
            
//             // Döljer och avmarkerar svårighetsknapparna
//             difficultyContainer.style.display = 'none'
//             currentDifficulty = null
//             difficultyContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
//         } else {
//             // Markerar kategorin som användaren klickat på
//             currentCategory =  clickedCategory
//             categoryBtn.classList.add('selected')

//             // Visar och avmarkerar svårighetsknapparna (när användaren byter kategori)
//             difficultyContainer.style.display = 'block';
//             currentDifficulty = null;
//             difficultyContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
//         }
        
//         console.log(currentCategory)
//         checkIfReady()
//     }
// })

// difficultyContainer.addEventListener('click', (e) => {
//     const difficultyBtn = e.target.closest('button')

//     if (difficultyBtn) {
//         const clickedDifficulty = difficultyBtn.value

//         if (currentDifficulty === clickedDifficulty) {
//             currentDifficulty = null
//             difficultyBtn.classList.remove('selected') 
//         } else {
//             currentDifficulty =  clickedDifficulty  
//             difficultyContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'))
//             difficultyBtn.classList.add('selected')     
//         }

//         console.log(currentDifficulty)
//         checkIfReady()
//     }
// })

// // Kollar om användaren har valt kategori och svårighetsgrad
// function checkIfReady() {
//     if (currentCategory && currentDifficulty) {
//     // Här ska vi välja rätt frågor från arrayen

//     // Visar startknappen
//     startButton.style.display = 'block'
//     console.log(currentCategory + ' och ' + currentDifficulty)
// } else {
//     startButton.style.display = 'none'
// }
// }

// //Ovan är koden från category-chooser






// //Här börjar next-question-integration koden.


// //Function för att tömma allt i mainContainer
// function clearMainContainer() {
//     mainContainer.replaceChildren();
// }

// let filteredQuestions = []
// let currentQuestionIndex = 0

// startButton.addEventListener("click", (e) => {
//     clearMainContainer()
//     //Använder .find för att hitta kategorier och svårighetsgrad utifrån currentCategory och currentDifficulty som man klickade i när man valde
//     //Spottar ut det man valt i en ny div (header-container) som nu ligger över main-container.
//     const showCategory = quizArray.find(cat => cat.category === currentCategory)
//     const showDifficulty = quizArray.find(diff => diff.difficulty === currentDifficulty)
//     const chosenQuizParameters = document.createElement("h2")
//     chosenQuizParameters.textContent = `Din valda kategori är ${showCategory.category} och svårighetsgraden är ${showDifficulty.difficulty}.`
//     headerContainer.appendChild(chosenQuizParameters)

//     //Filtrerar ut frågorna utifrån valda kriterier
//     filteredQuestions = quizArray.filter(
//         quizArray => quizArray.category === currentCategory && quizArray.difficulty === currentDifficulty)
//     currentQuestionIndex = 0
//     showQuestion()

// })
// //Jävligt lång funktion för att visa frågorna
// function showQuestion() {
//     const question = filteredQuestions[currentQuestionIndex]
//     if (question) {
//         const questionContainer = document.createElement("h2")
//         questionContainer.textContent = question.question
//         mainContainer.appendChild(questionContainer)
        
//         let answerSelected = false
//         const answerDiv = document.createElement("div")

//         question.answers.forEach(answer => {
//             const answerButton = document.createElement("button")
//             answerButton.textContent = answer
//             answerButton.addEventListener("click", () => {
//                 answerSelected = true
//                 nextButton.disabled = false
//             })
//             answerDiv.appendChild(answerButton)
//         })
//         mainContainer.appendChild(answerDiv)

//         const stepDiv = document.createElement("div")

//         const previousButton = document.createElement("button")
//         previousButton.textContent = "Föregående fråga"
//         previousButton.disabled = currentQuestionIndex === 0
//         previousButton.addEventListener("click", () => {
//             if (currentQuestionIndex > 0) {
//                 currentQuestionIndex--
//                 clearMainContainer()
//                 showQuestion()
//             }
//         })
//         stepDiv.appendChild(previousButton)

//         const nextButton = document.createElement("button")
//         nextButton.textContent = "Nästa fråga"
//         nextButton.disabled = true
//             nextButton.addEventListener("click", (e) => {
//                 currentQuestionIndex++
//                 clearMainContainer()
//                 showQuestion()
//         })
//         stepDiv.appendChild(nextButton)
//         mainContainer.appendChild(stepDiv)
//     }
//     else
//     {
//         mainContainer.textContent = "Out of questions at the moment, please hold"
//     }
// }

import { quizArray } from "./array.js"

// Hämta containers (samma som original.work.js)
const headerContainer = document.getElementById("header-container")
const mainContainer = document.getElementById('main-container')

// State management variabler
let appState = "categorySelection"
let currentCategory = null
let currentDifficulty = null
let filteredQuestions = []
let currentQuestionIndex = 0
let score = 0

// Huvudfunktion för state management
function setState(next) {
    appState = next
    render()
}

// Render-funktion som hanterar olika states
function render() {
    switch(appState) {
        case "categorySelection":
            renderCategorySelection()
            break
        case "quiz":
            renderQuiz()
            break
        case "results":
            renderResults()
            break
        default:
            console.log("Unknown state:", appState)
    }
}

// Rensar containers
function clearContainers() {
    headerContainer.replaceChildren()
    mainContainer.replaceChildren()
}

// Render kategoriväljare (samma struktur som original.work.js)
function renderCategorySelection() {
    clearContainers()

    // Logo (samma som original.work.js)
    const logo = document.createElement('h1')
    logo.textContent = 'GI QUIZ'
    headerContainer.appendChild(logo)

    // Titel (samma som original.work.js)
    const pageTitle = document.createElement('h2')
    pageTitle.textContent = 'Välj frågekategori'
    mainContainer.appendChild(pageTitle)

    // Kategorier (samma som original.work.js)
    const categoryContainer = document.createElement('div')
    categoryContainer.id = 'category-container'

    const categories = [
        {value: 'coding', title: 'Coding', description: 'Everything about code', questions: 5},
        {value: 'gaming', title: 'Gaming', description: 'Everything about video games', questions: 5}
    ]

    categories.forEach(category => {
        const btn = document.createElement('button')
        btn.value = category.value

        const title = document.createElement('div')
        title.textContent = category.title

        const description = document.createElement('div')
        description.textContent = category.description

        const questions = document.createElement('div')
        questions.textContent = `${category.questions} frågor`

        btn.appendChild(title)
        btn.appendChild(description)
        btn.appendChild(questions)

        // Event listener för kategori-val
        btn.addEventListener('click', () => {
            selectCategory(category.value, btn, categoryContainer)
        })

        categoryContainer.appendChild(btn)
    })

    mainContainer.appendChild(categoryContainer)

    // Svårighetsgrader (samma som original.work.js)
    const difficultyContainer = document.createElement('div')
    difficultyContainer.id = 'difficulty-container'
    difficultyContainer.style.display = 'none' // Dold från början

    const difficulties = [
        {value: 'easy', text: 'Easy'},
        {value: 'medium', text: 'Medium'},
        {value: 'hard', text: 'Hard'},
        {value: 'extreme', text: 'Extreme'}
    ]

    difficulties.forEach(difficulty => {
        const btn = document.createElement('button')
        btn.value = difficulty.value  
        btn.textContent = difficulty.text

        // Event listener för svårighetsgrad-val
        btn.addEventListener('click', () => {
            selectDifficulty(difficulty.value, btn, difficultyContainer)
        })

        difficultyContainer.appendChild(btn)
    })

    mainContainer.appendChild(difficultyContainer)

    // Startknapp (samma som original.work.js)
    const startButton = document.createElement('button')
    startButton.id = 'start-btn'
    startButton.textContent = 'Start quiz'
    startButton.style.display = 'none' // Dold från början
    
    startButton.addEventListener('click', startQuiz)
    mainContainer.appendChild(startButton)
}

// Hantera kategori-val (samma logik som original.work.js)
function selectCategory(categoryValue, btn, container) {
    const difficultyContainer = document.getElementById('difficulty-container')
    
    container.querySelectorAll('button').forEach(b => b.classList.remove('selected'))
    
    if (currentCategory === categoryValue) {
        currentCategory = null
        btn.classList.remove('selected')
        difficultyContainer.style.display = 'none'
        currentDifficulty = null
    } else {
        currentCategory = categoryValue
        btn.classList.add('selected')
        difficultyContainer.style.display = 'block'
        currentDifficulty = null
        difficultyContainer.querySelectorAll('button').forEach(b => b.classList.remove('selected'))
    }
    
    checkIfReady()
}

// Hantera svårighetsgrad-val (samma logik som original.work.js)
function selectDifficulty(difficultyValue, btn, container) {
    if (currentDifficulty === difficultyValue) {
        currentDifficulty = null
        btn.classList.remove('selected')
    } else {
        currentDifficulty = difficultyValue
        container.querySelectorAll('button').forEach(b => b.classList.remove('selected'))
        btn.classList.add('selected')
    }
    
    checkIfReady()
}

// Kontrollera om redo att starta (samma logik som original.work.js)
function checkIfReady() {
    const startButton = document.getElementById('start-btn')
    if (currentCategory && currentDifficulty) {
        startButton.style.display = 'block'
    } else {
        startButton.style.display = 'none'
    }
}

// Starta quiz
function startQuiz() {
    // Visa valda parametrar (samma som original.work.js)
    const showCategory = quizArray.find(cat => cat.category === currentCategory)
    const showDifficulty = quizArray.find(diff => diff.difficulty === currentDifficulty)
    const chosenQuizParameters = document.createElement("h2")
    chosenQuizParameters.textContent = `Din valda kategori är ${showCategory.category} och svårighetsgraden är ${showDifficulty.difficulty}.`
    
    clearContainers()
    headerContainer.appendChild(chosenQuizParameters)

    // Filtrera frågor (samma som original.work.js)
    filteredQuestions = quizArray.filter(
        q => q.category === currentCategory && q.difficulty === currentDifficulty
    )
    currentQuestionIndex = 0
    score = 0
    
    setState("quiz")
}

// Render quiz - ✅ TAR BORT navigation knappar
function renderQuiz() {
    const question = filteredQuestions[currentQuestionIndex]
    
    if (!question) {
        setState("results")
        return
    }

    mainContainer.replaceChildren()

    // Visa fråga med progress
    const questionContainer = document.createElement("h2")
    questionContainer.textContent = `Fråga ${currentQuestionIndex + 1} av ${filteredQuestions.length}: ${question.question}`
    mainContainer.appendChild(questionContainer)

    const answerDiv = document.createElement("div")

    // ✅ ÄNDRAT: Svarsknappar går automatiskt till nästa fråga
    question.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button")
        answerButton.textContent = answer
        answerButton.addEventListener("click", () => {
            // Kontrollera rätt svar
            if (index === question.correctAnswer) {
                score++
                console.log("Rätt svar! Poäng:", score)
                answerButton.style.backgroundColor = 'green' // Visuell feedback
            } else {
                console.log("Fel svar!")
                answerButton.style.backgroundColor = 'red' // Visuell feedback
            }
            
            // ✅ Disable alla knappar för att förhindra flera klick
            answerDiv.querySelectorAll('button').forEach(btn => btn.disabled = true)
            
            // ✅ Automatiskt gå till nästa fråga efter kort delay
            setTimeout(() => {
                currentQuestionIndex++
                
                if (currentQuestionIndex >= filteredQuestions.length) {
                    setState("results")
                } else {
                    render() // Visa nästa fråga
                }
            }, 1000) // 1 sekund delay så användaren ser feedback
        })
        answerDiv.appendChild(answerButton)
    })
    mainContainer.appendChild(answerDiv)

    // ❌ TAR BORT: Alla navigation knappar (previousButton, nextButton, stepDiv)
}

// Render resultat
function renderResults() {
    clearContainers()
    
    const logo = document.createElement('h1')
    logo.textContent = 'GI QUIZ'
    headerContainer.appendChild(logo)

    const resultContainer = document.createElement("div")
    resultContainer.innerHTML = `
        <h2>Quiz Slutfört!</h2>
        <p>Du fick ${score} av ${filteredQuestions.length} rätt!</p>
        <p>Det motsvarar ${Math.round((score/filteredQuestions.length)*100)}%</p>
    `
    
    const restartButton = document.createElement("button")
    restartButton.textContent = "Spela igen"
    restartButton.addEventListener("click", () => {
        // Återställ alla variabler
        currentCategory = null
        currentDifficulty = null
        filteredQuestions = []
        currentQuestionIndex = 0
        score = 0
        setState("categorySelection")
    })
    
    resultContainer.appendChild(restartButton)
    mainContainer.appendChild(resultContainer)
}

// Starta applikationen
render()