const mainContainer = document.getElementById('main-container')

// Logotext
const logo = document.createElement('h1')
logo.textContent = 'GI QUIZ'
mainContainer.appendChild(logo)

// Sidotitel
const pageTitle = document.createElement('h2')
pageTitle.textContent = 'Välj frågekategori'
mainContainer.appendChild(pageTitle)

// Kategori-container
const categoryContainer = document.createElement('div')
categoryContainer.id = 'category-container'

// Array med alla kategorier och deras information
const categories = [
    {value: 'coding', title: 'Coding', description: 'Everything about code', questions: 5},
    {value: 'gaming', title: 'Gaming', description: 'Everything about video games', questions: 5}
]

// Knapp med information för varje kategori
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

// Svårighetsgrad-container
const difficultyContainer = document.createElement('div')
difficultyContainer.id = 'difficulty-container'

// Array med alla svårighetsgrader
const difficulties = [
    {value: 'easy', text: 'Easy'},
    {value: 'medium', text: 'Medium'},
    {value: 'hard', text: 'Hard'},
    {value: 'extreme', text: 'Extreme'}
]

// Knapp för varje svårighetsgrad
difficulties.forEach(difficulty => {
    const btn = document.createElement('button')
    btn.value = difficulty.value
    btn.textContent = difficulty.text
    difficultyContainer.appendChild(btn)
})

mainContainer.appendChild(difficultyContainer)

// Startknapp
const startButton = document.createElement('button')
startButton.id = 'start-btn'
startButton.value = 'start-btn'
startButton.textContent = 'Start quiz'
mainContainer.appendChild (startButton)

// Gammalt, kan tas bort
/* const categoryContainer = document.getElementById('category-container')
const difficultyContainer = document.getElementById('difficulty-container')
const startButton = document.getElementById('start-btn') */

// Logik
let currentCategory = null
let currentDifficulty = null

// Om vi bara vill välja kategori
/* categoryContainer.addEventListener('click', (e) => { 
    if (e.target.tagName === 'BUTTON') {
        currentCategory = e.target.value 
        console.log(currentCategory) } }) */


// Om vi vill välja kategori och svårighetsgrad
categoryContainer.addEventListener('click', (e) => {
    // Undviker att fånga andra klick i containern
    const categoryBtn = e.target.closest('button')

    if (categoryBtn) {
        // Hämtar value från knappen som användaren har klickat på
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
            // Markerar kategorin som användaren klickat på
            currentCategory =  clickedCategory
            categoryBtn.classList.add('selected')

            // Visar och avmarkerar svårighetsknapparna (när användaren byter kategori)
            difficultyContainer.style.display = 'block';
            currentDifficulty = null;
            difficultyContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
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

// Kollar om användaren har valt kategori och svårighetsgrad
function checkIfReady() {
    if (currentCategory && currentDifficulty) {
    // Här ska vi välja rätt frågor från arrayen

    // Visar startknappen
    startButton.style.display = 'block'
    console.log(currentCategory + ' och ' + currentDifficulty)
} else {
    startButton.style.display = 'none'
}
}