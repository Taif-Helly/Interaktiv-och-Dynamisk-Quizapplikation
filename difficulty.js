import { quizArray } from "./array.js"

// ---------------- HTML-ELEMENT ----------------
const headerContainer = document.getElementById("header-container")
const mainContainer = document.getElementById('main-container')

const logo = document.createElement('h1')
logo.textContent = 'GI QUIZ'
mainContainer.appendChild(logo)

const pageTitle = document.createElement('h2')
pageTitle.textContent = 'Välj frågekategori'
mainContainer.appendChild(pageTitle)

// ---------------- KATEGORI-ARRAY OCH -KNAPPAR ----------------
const categoryContainer = document.createElement('div')
categoryContainer.id = 'category-container'

function countQuestionsPerDifficulty(category, difficulty) {
    return quizArray.filter(q => q.category === category && q.difficulty === difficulty).length
}

// Array med alla kategorier och deras information
const categories = [
    {
        value: 'coding', 
        title: 'Coding', 
        description: 'Everything about code', 
        difficulties: [
            { value: 'easy', text: 'Easy', questions: countQuestionsPerDifficulty('coding', 'easy') },
            { value: 'medium', text: 'Medium', questions: countQuestionsPerDifficulty('coding', 'medium') },
            { value: 'hard', text: 'Hard', questions: countQuestionsPerDifficulty('coding', 'hard') },
            { value: 'extreme', text: 'Extreme', questions: countQuestionsPerDifficulty('coding', 'extreme') }
        ]
    },
    {
        value: 'gaming', 
        title: 'Gaming', 
        description: 'Everything about video games', 
        difficulties : [
            { value: 'easy', text: 'Easy', questions: countQuestionsPerDifficulty('gaming', 'easy') },
            { value: 'medium', text: 'Medium', questions: countQuestionsPerDifficulty('gaming', 'medium') },
            { value: 'hard', text: 'Hard', questions: countQuestionsPerDifficulty('gaming', 'hard') },
            { value: 'extreme', text: 'Extreme', questions: countQuestionsPerDifficulty('gaming', 'extreme') }
        ]
    }
]

// Skapar en knapp för varje kategori, med information om kategorin
categories.forEach(category => {
    const btn = document.createElement('button')
    btn.value = category.value

    const title = document.createElement('div')
    title.textContent = category.title

    const description = document.createElement('div')
    description.textContent = category.description

    btn.appendChild(title)
    btn.appendChild(description)

    categoryContainer.appendChild(btn)
})

mainContainer.appendChild(categoryContainer)

// ---------------- SVÅRIGHETSGRAD-ARRAY OCH -KNAPPAR ----------------
const difficultyContainer = document.createElement('div')
difficultyContainer.id = 'difficulty-container'
difficultyContainer.style.display = 'none'
mainContainer.appendChild(difficultyContainer)

// Skapar knappar för kategorins svårighetsgrader, när användaren har valt kategori
function showDifficulitesForCategory(categoryValue) {
    const category = categories.find(cat => cat.value === categoryValue)
    difficultyContainer.innerHTML = ''

    if (category) {
        category.difficulties.forEach(difficulty => {
            const btn = document.createElement('button')
            btn.value = difficulty.value

            btn.textContent = `${difficulty.text} ${difficulty.questions} frågor`

            difficultyContainer.appendChild(btn)
        })

        difficultyContainer.style.display = 'block'
    }
}

// ---------------- STARTKNAPP ----------------
const startButton = document.createElement('button')
startButton.id = 'start-btn'
startButton.style.display = 'none'
startButton.value = 'start-btn'
startButton.textContent = 'Start quiz'
mainContainer.appendChild(startButton)

// Visar startknapp när användaren har valt kategori och svårighetsgrad
function checkIfReady() {
    if (currentCategory && currentDifficulty) {
    startButton.style.display = 'block'
    console.log(currentCategory + ' och ' + currentDifficulty)
} else {
    startButton.style.display = 'none'
}
}

// ---------------- KATEGORI- OCH SVÅRIGHETSVAL ----------------
let currentCategory = null
let currentDifficulty = null

categoryContainer.addEventListener('click', (e) => {
    // Undviker att fånga andra klick i containern
    const categoryBtn = e.target.closest('button')

    if (categoryBtn) {
        const clickedCategory = categoryBtn.value

        // Avmarkerar tidigare vald knapp
        categoryContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('selected')) // Det här kanske man kan lägga i en funktion eftersom det upprepas

        if (currentCategory === clickedCategory) {
            // Om användaren klickar på samma knapp igen avmarkeras den
            currentCategory = null
            categoryBtn.classList.remove('selected')
            
            // Döljer och avmarkerar svårighetsknapparna
            difficultyContainer.style.display = 'none'
            currentDifficulty = null
            difficultyContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
        } else {
            // Markerar kategorin som användaren har klickat på
            currentCategory =  clickedCategory
            categoryBtn.classList.add('selected')

            // Visar och avmarkerar svårighetsknapparna (när användaren byter kategori)
            difficultyContainer.style.display = 'block';
            currentDifficulty = null;
            difficultyContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
            showDifficulitesForCategory(clickedCategory)
        }
        
        console.log(currentCategory)
        checkIfReady()
    }
})

difficultyContainer.addEventListener('click', (e) => {
    const difficultyBtn = e.target.closest('button')

    if (difficultyBtn) {
        const clickedDifficulty = difficultyBtn.value

        if (currentDifficulty === clickedDifficulty) {
            currentDifficulty = null
            difficultyBtn.classList.remove('selected') 
        } else {
            currentDifficulty =  clickedDifficulty  
            difficultyContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'))
            difficultyBtn.classList.add('selected')     
        }

        console.log(currentDifficulty)
        checkIfReady()
    }
})

// Ovan är koden från category-chooser






// Här börjar next-question-integration koden.

function clearMainContainer() {
    mainContainer.replaceChildren();
}

let filteredQuestions = []
let currentQuestionIndex = 0

startButton.addEventListener("click", (e) => {
    clearMainContainer()
    // Använder .find för att hitta kategorier och svårighetsgrad utifrån currentCategory och currentDifficulty som man klickade i när man valde
    // Spottar ut det man valt i en ny div (header-container) som nu ligger över main-container.
    const showCategory = quizArray.find(cat => cat.category === currentCategory)
    const showDifficulty = quizArray.find(diff => diff.difficulty === currentDifficulty)

    const chosenQuizParameters = document.createElement("h2")
    chosenQuizParameters.textContent = `Din valda kategori är ${showCategory.category} och svårighetsgraden är ${showDifficulty.difficulty}.`

    headerContainer.appendChild(chosenQuizParameters)

    // Filtrerar ut frågorna utifrån valda kriterier
    filteredQuestions = quizArray.filter(
        quizArray => quizArray.category === currentCategory && quizArray.difficulty === currentDifficulty)

    currentQuestionIndex = 0

    showQuestion()
})

function showQuestion() {
    const question = filteredQuestions[currentQuestionIndex]

    if (question) {
        const questionContainer = document.createElement("h2")
        questionContainer.textContent = question.question

        mainContainer.appendChild(questionContainer)
        
        let answerSelected = false
        const answerDiv = document.createElement("div")

        question.answers.forEach(answer => {
            const answerButton = document.createElement("button")
            answerButton.textContent = answer
            
            answerButton.addEventListener("click", () => {
                answerSelected = true
                currentQuestionIndex++
                clearMainContainer()
                showQuestion()
            })

            answerDiv.appendChild(answerButton)
        })

        mainContainer.appendChild(answerDiv)

    } else {
        mainContainer.textContent = "Out of questions at the moment, please hold"
    }
}