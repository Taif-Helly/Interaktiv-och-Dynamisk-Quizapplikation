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

startButton.textContent = "Click here to start!"

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

function launchGame () {
        introBox.classList.add("content-fade-out");
    setInterval(() => {
        mainBody.removeChild(introBox)
        
    }, 200);
}

startButton.addEventListener('click', launchGame);

