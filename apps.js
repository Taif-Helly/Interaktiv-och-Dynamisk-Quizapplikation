const mainContainer = document.getElementById('main-container')

const logo = document.createElement('h1')
logo.textContent = 'GI QUIZ'
mainContainer.appendChild(logo)

const title = document.createElement('h2')
title.textContent = 'Välj frågekategori'
mainContainer.appendChild(title)

const categoryContainer = document.createElement('div')
categoryContainer.id = 'category-container'

const categories = [
    {value: 'coding', text: 'Coding'},
    {value: 'gaming', text: 'Gaming'}
]

categories.forEach(category => {
    const btn = document.createElement('button')
    btn.value = category.value
    btn.textContent = category.text
    categoryContainer.appendChild(btn)
})

mainContainer.appendChild(categoryContainer)

const difficultyContainer = document.createElement('div')
difficultyContainer.id = 'difficulty-container'

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
    difficultyContainer.appendChild(btn)
})

mainContainer.appendChild(difficultyContainer)

const startButton = document.createElement('button')
startButton.id = 'start-btn'
startButton.value = 'start-btn'
startButton.textContent = 'Start quiz'
mainContainer.appendChild (startButton)

/* const categoryContainer = document.getElementById('category-container')
const difficultyContainer = document.getElementById('difficulty-container')
const startButton = document.getElementById('start-btn') */

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
    if (e.target.tagName === 'BUTTON') {
        // Hämtar value från knappen som användaren har klickat på
        const clickedCategory = e.target.value

        // Avmarkerar tidigare vald knapp
        categoryContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('selected')) // Det här kanske man kan lägga i en funktion eftersom det upprepas

        if (currentCategory === clickedCategory) {
            // Om användaren klickar på samma knapp igen avmarkeras den
            currentCategory = null
            e.target.classList.remove('selected')
            
            // Döljer och avmarkerar svårighetsknapparna
            difficultyContainer.style.display = 'none'
            currentDifficulty = null
            difficultyContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
        } else {
            // Markerar kategorin som användaren klickat på
            currentCategory =  clickedCategory
            e.target.classList.add('selected')

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
    if (e.target.tagName === 'BUTTON') {
        const clickedDifficulty = e.target.value

        if (currentDifficulty === clickedDifficulty) {
            currentDifficulty = null
            e.target.classList.remove('selected') 
        } else {
            currentDifficulty =  clickedDifficulty  
            difficultyContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'))
            e.target.classList.add('selected')     
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