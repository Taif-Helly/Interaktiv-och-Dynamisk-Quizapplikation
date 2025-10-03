// Startsidan

const mainBody = document.getElementById('body')
const logoBox = document.createElement('div')
logoBox.id = 'logo-box'
const logoText = document.createElement('h1')
logoText.id = 'logo-text'
logoText.textContent = "Geekqwizz"

mainBody.appendChild(logoBox)
mainBody.appendChild(logoText)

const introBox = document.createElement('div')
introBox.id = 'intro-box'
mainBody.appendChild(introBox)

function startPageLoad () {
    introBox.classList.add("content-fade-in");
    introBox.addEventListener("fully-faded-in", () => { mainBody.appendChild(introBox) });
}

startPageLoad();



const introText = document.createElement('p')
introText.id = "intro-text"
const introContent = "Welcome to Geekqwizz, a retro-style quiz-game! Choose between two categories and try to beat your high score! Each categor has five questions, good luck!"

const startButton = document.createElement('p')
startButton.id = "start-button"

startButton.textContent = "Click herer to start!"

const creatorsText1 = document.createElement('p');
creatorsText1.id ="creators-text"
const creatorsText2 = document.createElement('p');
creatorsText2.id ="creators-text"

const creatorsContent1 = "Created by:";
const creatorsContent2 = "David, Desirée, Johan & Taif";

introText.textContent = introContent
creatorsText1.textContent = creatorsContent1
creatorsText2.textContent = creatorsContent2
introBox.appendChild(introText);

introBox.appendChild(startButton);

introBox.appendChild(creatorsText1);
introBox.appendChild(creatorsText2);

const categoryContainer = document.createElement('div')
categoryContainer.id = 'category-container'

const pageTitle = document.createElement('h2')
pageTitle.id = "title-text"
pageTitle.textContent = 'Välj frågekategori'

//Starta spelet här

function gameStart () {
        introBox.classList.add("content-fade-out");
        setInterval(() => {
        mainBody.removeChild(introBox)
        }, 200)
        
    
    //Frågorna börjar här
    
    categoryContainer.classList.add("content-fade-in")
    setInterval(() => {
    mainBody.appendChild(categoryContainer)
    categoryContainer.addEventListener("fully-faded-in", () => { categoryContainer.appendChild(pageTitle) })
    // categoryContainer.appendChild(pageTitle)
    }, 300)


// ---------------- KATEGORI-ARRAY OCH -KNAPPAR ----------------

// Array med alla kategorier och deras information
const categories = [
    {
        value: 'coding', 
        title: 'Coding', 
        description: 'Everything about code', 
        difficulties: [
            { value: 'easy', text: 'Easy', questions: 5 },
            { value: 'medium', text: 'Medium', questions: 5 },
            { value: 'hard', text: 'Hard', questions: 5 },
            { value: 'extreme', text: 'Extreme', questions: 5 }
        ]
    },
    {
        value: 'gaming', 
        title: 'Gaming', 
        description: 'Everything about video games', 
        difficulties : [
            { value: 'easy', text: 'Easy', questions: 5 },
            { value: 'medium', text: 'Medium', questions: 5 },
            { value: 'hard', text: 'Hard', questions: 5 }
        ]
    }
]

// Knapp med information för varje kategori

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


// ---------------- SVÅRIGHETSGRAD-ARRAY OCH -KNAPPAR ----------------
// OBS. ALLT I KOMMENTARER UNDER DEN HÄR DELEN KAN TAS BORT
// Svårighetsgrad-container
const difficultyContainer = document.createElement('div')
difficultyContainer.id = 'difficulty-container'
difficultyContainer.style.display = 'none'


// mainBody.appendChild(difficultyContainer)

function showDifficulitesForCategory(categoryValue) {
    const category = categories.find(cat => cat.value === categoryValue)
    difficultyContainer.innerHTML = ''

    if (category) {
        category.difficulties.forEach(diff => {
            const btn = document.createElement('button')
            btn.value = diff.value
            btn.textContent = `${diff.text} ${diff.questions} frågor`
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

// Gammalt, kan tas bort
/* const categoryContainer = document.getElementById('category-container')
const difficultyContainer = document.getElementById('difficulty-container')
const startButton = document.getElementById('start-btn') */


// ---------------- KATEGORI- OCH SVÅRIGHETSVAL ----------------
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
});
}

startButton.addEventListener('click', gameStart);


