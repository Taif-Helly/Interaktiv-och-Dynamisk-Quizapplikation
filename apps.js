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

function countQuestionsPerCategory(category) {
    return quizArray.filter(q => q.category === category).length
}

// Array med alla kategorier och deras information
const categories = [
    {
        value: 'coding', 
        title: 'Coding', 
        description: 'Everything about code', 
        questions: countQuestionsPerCategory('coding')
    },
    {
        value: 'gaming', 
        title: 'Gaming', 
        description: 'Everything about video games', 
        questions: countQuestionsPerCategory('gaming')
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

    const questions = document.createElement('div')
    questions.textContent = `${category.questions} frågor`

    btn.appendChild(title)
    btn.appendChild(description)
    btn.appendChild(questions)

    categoryContainer.appendChild(btn)
})

mainContainer.appendChild(categoryContainer)

// ---------------- KATEGORIVAL OCH FRÅGOR ----------------
function clearMainContainer() {
    mainContainer.replaceChildren();
}

let filteredQuestions = []
let currentQuestionIndex = 0

categoryContainer.addEventListener('click', (e) => {
      // Undviker att fånga andra klick i containern
    const categoryBtn = e.target.closest('button')

    if (categoryBtn) {
        const currentCategory = categoryBtn.value
        console.log(currentCategory)

        clearMainContainer()

        // Använder .find för att hitta kategorier och svårighetsgrad utifrån currentCategory och currentDifficulty som man klickade i när man valde
        // Spottar ut det man valt i en ny div (header-container) som nu ligger över main-container.
        const showCategory = quizArray.find(cat => cat.category === currentCategory)

        const chosenQuizParameters = document.createElement("h2")
        chosenQuizParameters.textContent = `Din valda kategori är ${showCategory.category}.`

        headerContainer.appendChild(chosenQuizParameters)

        // Filtrerar ut frågorna utifrån valda kriterier
        filteredQuestions = quizArray.filter(
        quizArray => quizArray.category === currentCategory)

        currentQuestionIndex = 0

        showQuestion()
    }

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
    