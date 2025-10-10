import { quizArray } from "./array.js";

const headerContainer = document.getElementById("header-container");
const mainContainer = document.getElementById("main-container");

// LOGO
const logo = document.createElement("h1");
logo.id = "logo-text";
logo.textContent = "Geekqwizz";

window.setTimeout(() => {
  logo.classList.add("intro-fade-in");
  headerContainer.appendChild(logo);
}, 500);

// STARTSIDA
const introBox = document.createElement("div");
introBox.id = "intro-box";

const introText = document.createElement("p");
introText.id = "intro-text";
const introContent =
  "Welcome to Geekqwizz, a retro-style quiz-game! Choose between two categories and try to beat your high score! Each category has multiple questions, good luck!";

const startButton = document.createElement("p");
startButton.id = "start-button";
startButton.textContent = "Click here to start!";

const creatorsText = document.createElement("p");
creatorsText.id = "creators-text";
creatorsText.innerHTML = "Created by:<br>David, Desirée, Johan & Taif"

introText.textContent = introContent;

introBox.appendChild(introText);
introBox.appendChild(startButton);
introBox.appendChild(creatorsText);

// Animation när startsidan laddas in
function startPageLoad() {
  setTimeout(() => {
    introBox.classList.add("intro-fade-in");
    mainContainer.appendChild(introBox);
  }, 1500);
}

// FUNKTIONER
// Funktion shufflar frågorna in i en ny array med slice
function shuffle(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

// Ljudeffekt när spelaren inte väljer ett svarsalternativ i quizet
const duckAudio = new Audio("./quacks.mp3");
duckAudio.preload = "auto";
duckAudio.volume = 0.9;

function playDuckLocal(duration) {
  try {
    duckAudio.currentTime = 0; // Starta från början
    duckAudio.play();
    if (duration) {
      setTimeout(() => {
        duckAudio.pause();
        duckAudio.currentTime = 0; // Återställ till början
      }, duration);
    }
  } catch (e) {
    console.warn("Audio autoplay blockerat:", e);
  }
}

// Laddar in all ovansttående kod och kör funktionen, lägger till eventlistener till startknappen
startPageLoad();

// Animation när quizet startas
startButton.addEventListener("click", () => {
  introBox.classList.add("content-fade-out");
  window.setTimeout(() => {
    gameStart();
  }, 500);
});

// QUIZET
function gameStart() {
  // Rensar mainContainer
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
      description: "Everything about code",
      questions: countQuestionsPerCategory("Coding"),
    },
    {
      value: "Gaming",
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
    btn.innerText = category.value;

    categoryContainer.appendChild(btn);
    backgroundContainer.appendChild(categoryContainer);
  });

  // Rensar backgroundContainer
  function clearBackgroundContainer() {
    backgroundContainer.replaceChildren();
  }

  // Frågevariabler
  let filteredQuestions = [];
  let currentQuestionIndex = 0;
  let score = 0;

  // TIMER
  let questionTimerId = null;
  let timerEl = null;

  function clearQuestionTimer() {
    if (questionTimerId) {
      clearInterval(questionTimerId); // Stoppar intervallet
      questionTimerId = null;
    }
    if (timerEl && timerEl.parentNode) {
     // timerEl.parentNode.removeChild(timerEl);
      timerEl = null;
    }
  }

  function startQuestionTimer(seconds, onTimeout) {
    clearQuestionTimer(); // Säkerställer att gamla timers inte lever vidare

    timerEl = document.createElement("div");
    timerEl.className = "timer";
    timerEl.textContent = `Time Left: ${seconds}s`;

    backgroundContainer.prepend(timerEl);

    let timeLeft = seconds;
    questionTimerId = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft > 0) {
        timerEl.textContent = `Time Left: ${timeLeft}s`;
      } else {
        timerEl.textContent = "Time Left: 0s";
        clearQuestionTimer();
        onTimeout && onTimeout(); // Extra säkerhet
      }
    }, 1000);
  }

  // KATEGORIVAL
  categoryContainer.addEventListener("click", (e) => {
    // Undviker att fånga andra klick i containern
    const categoryBtn = e.target.closest("button");

    if (categoryBtn) {
      const currentCategory = categoryBtn.value;

      clearBackgroundContainer();

      // Hitta kategori, visa rubrik och filtrera frågor
      const showCategory = quizArray.find(
        (cat) => cat.category === currentCategory
      );

      pageTitle.textContent = `${showCategory.category}`;

      // Filtrerar ut frågorna och shufflar, för varje fråga (q) skapar vi en ny fråga med slumpade svarsalternativ.
      // Kollar rätt svar innan blandningen och sparar ner den.
      filteredQuestions = shuffle(
        quizArray.filter((q) => q.category === currentCategory)
      ).map((q) => {
        const answers = shuffle([...q.answers]);
        const correctValue = q.answers[q.rightAnswer];
        return {
          ...q,
          answers,
          rightAnswer: answers.indexOf(correctValue),
        };
      });

      currentQuestionIndex = 0;
      showQuestion();
    }
  });

  // FRÅGORNA
  // Navigerar till nästa fråga (används av klick OCH timeout)
  function goToNextQuestion(questionContainer, answerDiv) {
    if (questionContainer) questionContainer.classList.add("content-fade-out");
    if (answerDiv) answerDiv.classList.add("content-fade-out");

    setTimeout(() => {
      currentQuestionIndex++; 
      clearBackgroundContainer();
      showQuestion();
    }, 800);
    if (answerDiv) answerDiv.classList.remove("content-fade-out");
    if (questionContainer)
     questionContainer.classList.remove("content-fade-out");
  }

  // Visar frågorna
  function showQuestion() {
    // Visar den fråga som shufflas fram
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

      // Starta timer för frågan
      startQuestionTimer(5, () => {
        if (!answeredThisQuestion) {
          playDuckLocal(1800); // Spelar ljudeffekt
        }
        // När tiden är slut, gå vidare till nästa fråga
        goToNextQuestion(questionContainer, answerDiv);
      });

      // SVARSALTERNATIV
      question.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.textContent = answer;
        answerButton.setAttribute("data-index", index);
        answerButton.id = "btn-style";
        answerButton.classList.add("content-fade-in");
        
        answerButton.addEventListener("click", (e) => {
          answerButton.style.userSelect = 'none';
          answeredThisQuestion = true;
          const clickedAnswer = Number(e.target.dataset.index);
          const correctAnswer = question.rightAnswer;
          
          // Kollar om användarens svar är rätt svar, om ja: lägger till poäng, och visar rätt/fel visuellt
          if (clickedAnswer === correctAnswer) {
            score++;
            answerButton.id = "correct-btn";
          } else {
            answerButton.id = "wrong-btn";
          }
          
          // Går till nästa fråga
          goToNextQuestion(questionContainer, answerDiv);
        });
        
        answerDiv.appendChild(answerButton);
      });

      backgroundContainer.appendChild(answerDiv);
    } else {
      // RESULTATSIDA
      clearQuestionTimer();
      
      pageTitle.textContent = "Thanks for playing!";
      const scoreEL = document.createElement("p");
      scoreEL.id = "intro-text";
      scoreEL.classList.add("content-fade-in");
      // Visar hur många rätt svar användaren hade av totala frågorna
      scoreEL.textContent = `Your right answers are ${score} out of ${filteredQuestions.length}.`;
      backgroundContainer.appendChild(scoreEL);

      // Hämtar highscore från localStorage (om det inte finns ett highscore, är highscore 0)
      const highScore = parseFloat(localStorage.getItem("highScore")) || 0;

      // Kollar om användarens poäng är ett nytt highscore eller inte
      if (score > highScore) {
        // Sätter nytt highscore i localStorage
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

      // Kör om quizet när användaren klickar på restart-knappen
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