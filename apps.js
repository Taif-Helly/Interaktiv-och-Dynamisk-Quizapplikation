const categoryContainer = document.getElementById('category-container')
const difficultyContainer = document.getElementById('difficulty-container')

let currentCategory = null
let currentDifficulty = null

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
    console.log(currentCategory + ' och ' + currentDifficulty)
}
}