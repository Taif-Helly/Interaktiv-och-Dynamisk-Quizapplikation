import { quizArray } from "./array.js";

// Skapar variablar för containers & länkar med CSS
const headerContainer = document.getElementById("header-container");
const mainContainer = document.getElementById("main-container");
const mainBody = document.getElementById("body");

// Skapar logon & textruta med startknapp & länkar med CSS
const logo = document.createElement("h1");
logo.id = "logo-text";
logo.textContent = "Geekqwizz";

window.setTimeout(() => {
  logo.classList.add("intro-fade-in");
  headerContainer.appendChild(logo);
}, 500);

const introBox = document.createElement("div");
introBox.id = "intro-box";

const introText = document.createElement("p");
introText.id = "intro-text";
const introContent =
  "Welcome to Geekqwizz, a retro-style quiz-game! Choose between two categories and try to beat your high score! Each category has multiple questions, good luck!";

const startButton = document.createElement("p");
startButton.id = "start-button";
startButton.textContent = "Click here to start!";

const creatorsText1 = document.createElement("p");
creatorsText1.id = "creators-text";
const creatorsText2 = document.createElement("p");
creatorsText2.id = "creators-text";

const creatorsContent1 = "Created by:";
const creatorsContent2 = "David, Desirée, Johan & Taif";

introText.textContent = introContent;
creatorsText1.textContent = creatorsContent1;
creatorsText2.textContent = creatorsContent2;

introBox.appendChild(introText);
introBox.appendChild(startButton);
introBox.appendChild(creatorsText1);
introBox.appendChild(creatorsText2);

function startPageLoad() {
  setTimeout(() => {
    introBox.classList.add("intro-fade-in");
    mainContainer.appendChild(introBox);
  }, 1500);
}

const duckAudio = new Audio("./quacks.mp3"); 
duckAudio.preload = "auto";
duckAudio.volume = 0.9;

function playDuckLocal(duration) {
  try {
    duckAudio.currentTime = 0;  // starta från början
    duckAudio.play();
    if (duration) {
      setTimeout(() => {
        duckAudio.pause();
        duckAudio.currentTime = 0; // återställ till början
      }, duration);
    }
  } catch (e) {
    console.warn("Audio autoplay blockerat:", e);
  }
}
// Laddar in all ovansttående kod och kör funktionen, lägger till eventlistener till startknappen
startPageLoad();

startButton.addEventListener("click", () => {
  introBox.classList.add("content-fade-out");
  window.setTimeout(() => {
    gameStart();
  }, 500);
});

// ======================= SPELLOGIK =======================
function gameStart() {
  mainContainer.replaceChildren();

  function countQuestionsPerCategory(category) {
    return quizArray.filter((q) => q.category === category).length;
  }

  const pageTitle = document.createElement("h2");
  pageTitle.classList.add("content-fade-in");
  pageTitle.textContent = "Choose category";
  pageTitle.id = "category";
  headerContainer.appendChild(pageTitle);

  const backgroundContainer = document.createElement("div");
  backgroundContainer.classList.add("content-fade-in");
  backgroundContainer.id = "background-container";
  mainContainer.appendChild(backgroundContainer);

  const categoryContainer = document.createElement("div");
  categoryContainer.id = "category-container";
  categoryContainer.classList.add("content-fade-in");

  // Array med alla kategorier och deras information
  const categories = [
    {
      value: "Coding",
      // title: 'Coding',
      description: "Everything about code",
      questions: countQuestionsPerCategory("Coding"),
    },
    {
      value: "Gaming",
      // title: 'Gaming',
      description: "Everything about video games",
      questions: countQuestionsPerCategory("Gaming"),
    },
  ];

  // Skapar en knapp för varje kategori, med information om kategorin
  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.value = category.value;
    btn.id = "btn-style";
    btn.classList.add("content-fade-in");

    const title = document.createElement("h2");
    title.textContent = category.title;

    const description = document.createElement("p");
    description.textContent = category.description;

    btn.appendChild(title);
    btn.appendChild(description);

    categoryContainer.appendChild(btn);
    const questions = document.createElement("p");
    questions.textContent = `${category.questions} questions`;
    questions.id = "intro-text";
    backgroundContainer.appendChild(categoryContainer);
    // categoryContainer.appendChild(questions)
  });

  // ---------------- KATEGORIVAL OCH FRÅGOR ----------------

  function clearMainContainer() {
    backgroundContainer.replaceChildren();
  }

  let filteredQuestions = [];
  let currentQuestionIndex = 0;
  let score = 0;

  // ======== TIMER: state + hjälpfunktioner (visas endast under frågor) ========
  let questionTimerId = null;
  let timerEl = null;

  //skapar/definerar funtionen
  function clearQuestionTimer() {       
    if (questionTimerId) { 
      clearInterval(questionTimerId); //En städ funktion som stoppar intervallet och tar bort timern från sidan//
      questionTimerId = null;
    }
    if (timerEl && timerEl.parentNode) {
      timerEl.parentNode.removeChild(timerEl);
      timerEl = null;
    }
  }

  //Använder/kör funktionen
  function startQuestionTimer(seconds, onTimeout) {
    clearQuestionTimer(); // Säkerställ att ingen gammal timer lever vidare

    // Skapa enkel timer UI ovanför frågan
    timerEl = document.createElement("div");
    timerEl.className = "timer";
    timerEl.textContent = `Time Left: ${seconds}s`;

    // Placering in i backgroundContainer överst
    backgroundContainer.prepend(timerEl);

    let timeLeft = seconds;
    questionTimerId = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft > 0) {
        timerEl.textContent = `Time Left: ${timeLeft}s`;
      } else {
        timerEl.textContent = "Time Left:0s";
        clearQuestionTimer();
        onTimeout && onTimeout(); //extra säkerhet
      }
    }, 1000);
  }
  // ======== SLUT TIMER ========

  categoryContainer.addEventListener("click", (e) => {
    // Undviker att fånga andra klick i containern
    const categoryBtn = e.target.closest("button");

    if (categoryBtn) {
      const currentCategory = categoryBtn.value;

      clearMainContainer();

      // Hitta kategori, visa rubrik och filtrera frågor
      const showCategory = quizArray.find(
        (cat) => cat.category === currentCategory
      );

      pageTitle.textContent = `${showCategory.category}`;

      filteredQuestions = quizArray.filter(
        (q) => q.category === currentCategory
      );

      currentQuestionIndex = 0;
      showQuestion();
    }
  });

  // Gemensam navigering till nästa fråga (används av klick OCH timeout)
  function goToNextQuestion(questionContainer, answerDiv) {
    // Fade ut och gå vidare
    if (questionContainer) questionContainer.classList.add("content-fade-out");
    if (answerDiv) answerDiv.classList.add("content-fade-out");

    setTimeout(() => {
      currentQuestionIndex++;
      clearMainContainer();
      if (answerDiv) answerDiv.classList.remove("content-fade-out");
      if (questionContainer) questionContainer.classList.remove("content-fade-out");
      showQuestion();
    }, 400);
  }

  function showQuestion() {
    const question = filteredQuestions[currentQuestionIndex];

    if (question) {
      let answeredThisQuestion = false; 
      const questionContainer = document.createElement("div");
      questionContainer.id = "question-container";

      const questionText = document.createElement("h2");
      questionText.textContent = question.question;
      questionText.classList.add("content-fade-in");

      backgroundContainer.appendChild(questionContainer);
      questionContainer.appendChild(questionText);

      const answerDiv = document.createElement("div");
      answerDiv.id = "answerDiv";

      // === Starta timer för den här frågan ===
      startQuestionTimer(10, () => {
        if (!answeredThisQuestion) {
        playDuckLocal(1800);     // <-- spelar quack
      } 
        // När tiden är slut, gå vidare till nästa fråga, annars går den vidare utan timer.
        goToNextQuestion(questionContainer, answerDiv);
      });

      question.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.textContent = answer;
        answerButton.setAttribute("data-index", index);
        answerButton.id = "btn-style";
        answerButton.classList.add("content-fade-in");

        answerButton.addEventListener("click", (e) => {
        answeredThisQuestion = true; 
          const clickedAnswer = Number(e.target.dataset.index);
          const correctAnswer = question.rightAnswer;

          if (clickedAnswer === correctAnswer) {
            score++;
            answerButton.id = "correct-btn";
          } else {
            answerButton.id = "wrong-btn";
          }

          // Gå vidare (snabb fade)
          goToNextQuestion(questionContainer, answerDiv);
        });

        answerDiv.appendChild(answerButton);
      });

      backgroundContainer.appendChild(answerDiv);
    } else {

      pageTitle.textContent = "Thank's for playing!";
      const scoreEL = document.createElement("p");
      scoreEL.id = "intro-text";
      scoreEL.classList.add("content-fade-in");
      scoreEL.textContent = `Your right answers are ${score} out of ${filteredQuestions.length}.`;
      backgroundContainer.appendChild(scoreEL);

      const highScore = parseFloat(localStorage.getItem("highScore")) || 0;

      if (score > highScore) {
        localStorage.setItem("highScore", score);
        const highScoreEL = document.createElement("p");
        highScoreEL.id = "intro-text";
        highScoreEL.classList.add("content-fade-in");
        highScoreEL.textContent = `Your new high score is ${score}!`;
        backgroundContainer.appendChild(highScoreEL);
      } else {
        const highScoreEL = document.createElement("p");
        highScoreEL.id = "intro-text";
        highScoreEL.classList.add("content-fade-in");
        highScoreEL.textContent = `Your high score: ${highScore}`;
        backgroundContainer.appendChild(highScoreEL);
      }

      const restartButton = document.createElement("button");
      restartButton.textContent = "Retake quiz";
      restartButton.id = "restart-btn-style";
      restartButton.classList.add("content-fade-in");
      backgroundContainer.appendChild(restartButton);

      restartButton.addEventListener("click", () => {
  
        backgroundContainer.classList.add("content-fade-out");
        pageTitle.classList.add("content-fade-out");
        mainContainer.classList.add("content-fade-in");

        setTimeout(() => {
          pageTitle.innerHTML = "";
          mainContainer.replaceChildren();
          headerContainer.removeChild(pageTitle);
          backgroundContainer.classList.remove("content-fade-out");
          pageTitle.classList.remove("content-fade-out");
          gameStart();
        }, 500);
      });
    }
  }
}
