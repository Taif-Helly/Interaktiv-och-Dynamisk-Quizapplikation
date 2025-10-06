import { quizArray } from "./array.js";

// Skapar variablar för containers & länkar med CSS

const headerContainer = document.getElementById("header-container");
const mainContainer = document.getElementById("main-container");

const mainBody = document.getElementById("body");

// Skapar logon & textruta med startknapp & länkar med CSS

const logo = document.createElement("h1");
logo.id = "logo-text";
logo.textContent = "Geekqwizz";

window.setTimeout (() => {
  logo.classList.add("intro-fade-in")
  headerContainer.appendChild(logo);
}, 500)

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
  }, 1500)
}

// Laddar in all ovansttående kod och kör funktionen, lägger till eventlistener till startknappen

startPageLoad();

startButton.addEventListener("click", () => {
  introBox.classList.add("content-fade-out");
    window.setTimeout(() => {
      gameStart()
    }, 500);

});

//Funktioner
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
  
  const backgroundContainer = document.createElement('div')
  backgroundContainer.classList.add("content-fade-in");
  backgroundContainer.id = 'background-container'
  mainContainer.appendChild(backgroundContainer)

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
    btn.classList.add("content-fade-in")
    
    const title = document.createElement("h2");
    title.textContent = category.title;

    const description = document.createElement("p");
    description.textContent = category.description;

    
    btn.appendChild(title);
    btn.appendChild(description);
    
    categoryContainer.appendChild(btn);
    const questions = document.createElement("p");
    questions.textContent = `${category.questions} questions`;
    questions.id = "intro-text"
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

  categoryContainer.addEventListener("click", (e) => {

    // Undviker att fånga andra klick i containern
    const categoryBtn = e.target.closest("button");

    if (categoryBtn) {
      const currentCategory = categoryBtn.value;

      clearMainContainer();

      // Använder .find för att hitta kategorier och svårighetsgrad utifrån currentCategory och currentDifficulty som man klickade i när man valde
      // Spottar ut det man valt i en ny div (header-container) som nu ligger över main-container.
      const showCategory = quizArray.find(
        (cat) => cat.category === currentCategory
      );

      //   const chosenQuizParameters = document.createElement("h2")
      pageTitle.textContent = `${showCategory.category}`;

      //   headerContainer.appendChild(chosenQuizParameters)

      // Filtrerar ut frågorna utifrån valda kriterier
      filteredQuestions = quizArray.filter(
        (quizArray) => quizArray.category === currentCategory
      );

      currentQuestionIndex = 0;

      showQuestion();
    }
  });
  
  function showQuestion() {
    const question = filteredQuestions[currentQuestionIndex];

    if (question) {
      const questionContainer = document.createElement("div");
      questionContainer.id = "question-container"
      
      const questionText = document.createElement('h2')
      questionText.textContent = question.question;
      questionText.classList.add("content-fade-in")

      backgroundContainer.appendChild(questionContainer);
      questionContainer.appendChild(questionText)

      const answerDiv = document.createElement("div");
      answerDiv.id = "answerDiv";

      question.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.textContent = answer;
        answerButton.setAttribute("data-index", index);
        answerButton.id = "btn-style";
        answerButton.classList.add("content-fade-in")

        answerButton.addEventListener("click", (e) => {
          const clickedAnswer = Number(e.target.dataset.index);
          const correctAnswer = question.rightAnswer;

          if (clickedAnswer === correctAnswer) {
            score++;
            answerButton.id = "correct-btn"
          } else {
            answerButton.id = "wrong-btn"
          }

          setTimeout(() => {
            questionContainer.classList.add("content-fade-out")
            answerDiv.classList.add("content-fade-out")
          }, 2000);
          setTimeout(() => {
            currentQuestionIndex++;
            clearMainContainer();
            answerDiv.classList.remove("content-fade-out");
            questionContainer.classList.remove("content-fade-out")
            showQuestion();
          }, 400);
});
        answerDiv.appendChild(answerButton);
      });

      backgroundContainer.appendChild(answerDiv);
    } else {
      const topList = localStorage.getItem('pastScore')
      localStorage.setItem('pastScore', score)
      
      pageTitle.textContent = "Thank's for playing!"
      const scoreEL = document.createElement("p");
      scoreEL.id = "intro-text";
      scoreEL.classList.add("content-fade-in")
      scoreEL.textContent = `Your right answers are ${score} out of ${filteredQuestions.length}. Your best score is: ${topList}`;
      backgroundContainer.appendChild(scoreEL);

      const restartButton = document.createElement('button');
      restartButton.textContent = 'Retake quiz'
      restartButton.id = "restart-btn-style"
      restartButton.classList.add("content-fade-in")
      backgroundContainer.appendChild(restartButton)

      restartButton.addEventListener('click', () => {
        backgroundContainer.classList.add('content-fade-out')
        pageTitle.classList.add('content-fade-out')
        mainContainer.classList.add("content-fade-in")
        
        setTimeout(() => {
          pageTitle.innerHTML = ""
          mainContainer.replaceChildren();
          headerContainer.removeChild(pageTitle);
          backgroundContainer.classList.remove('content-fade-out')
          pageTitle.classList.remove('content-fade-out')
          gameStart()
        }, 500)
    })
  }
};
  }
