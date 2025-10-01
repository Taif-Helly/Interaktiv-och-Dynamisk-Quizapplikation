// Startsidan

const mainBody = document.getElementById('body')
const introBox = document.getElementById("intro-box");

function startPageLoad () {
    introBox.classList.add("content-fade-in");
    introBox.addEventListener("fully-faded-in", () => { mainBody.appendChild(introBox); }, { once: true });
}

startPageLoad();

const logoType = document.getElementById("shine-text")
logoType.textContent = "Geekqwizz"


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
const creatorsContent2 = "David, Desirée, Johan & Taif!";

introText.textContent = introContent
creatorsText1.textContent = creatorsContent1
creatorsText2.textContent = creatorsContent2
introBox.appendChild(introText);

introBox.appendChild(startButton);

introBox.appendChild(creatorsText1);
introBox.appendChild(creatorsText2);

function launchGame () {
    introBox.classList.add("content-fade-out");
    introBox.addEventListener("fully-faded-out", () => { introBox.remove(); }, { once: true });
}

startButton.addEventListener('click', launchGame);

