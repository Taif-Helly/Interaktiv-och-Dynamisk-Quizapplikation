import { quizArray } from "./array.js";

const headerContainer = document.getElementById("header-container");
const mainContainer = document.getElementById("main-container");

const mainBody = document.getElementById("body");

const logo = document.createElement("h1");
logo.id = "logo-text";
logo.textContent = "Geekqwizz";
headerContainer.appendChild(logo);

const introBox = document.createElement("div");
introBox.id = "intro-box";
mainContainer.appendChild(introBox);

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
  introBox.classList.add("content-fade-in");
  introBox.addEventListener("fully-faded-in", () => {
    mainBody.appendChild(introBox);
  });
}

startPageLoad();

startButton.addEventListener("click", () => {
    window.setTimeout(() => {
      mainContainer.removeChild(introBox);
    }, 200);
    gameStart()

});

//Funktioner
function gameStart() {
  introBox.classList.add("content-fade-out");


  const pageTitle = document.createElement("h2");
  pageTitle.classList.add("content-fade-in");
  pageTitle.textContent = "Choose category";
  pageTitle.id = "category";
  headerContainer.appendChild(pageTitle);
  const categoryContainer = document.createElement("div");
  categoryContainer.id = "category-container";
  categoryContainer.classList.add("content-fade-in");

  // Array med alla kategorier och deras information
  const categories = [
    {
      value: "Coding",
    //   title: 'Coding',
      description: "Everything about code",
      questions: countQuestionsPerCategory("Coding"),
    },
    {
      value: "Gaming",
    //   title: 'Gaming',
      description: "Everything about video games",
      questions: countQuestionsPerCategory("Gaming"),
    },
  ];

  // Skapar en knapp för varje kategori, med information om kategorin
  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.value = category.value;
    btn.id = "btn-style";

    const title = document.createElement("h2");
    title.textContent = category.title;

    const description = document.createElement("p");
    description.textContent = category.description;

    
    btn.appendChild(title);
    btn.appendChild(description);
    
    categoryContainer.appendChild(btn);
});

const questionsAmount = document.createElement('div')

const questions = document.createElement("p");
questions.textContent = `${category.questions} questions`;
questions.id = "intro-text"
mainContainer.appendChild(categoryContainer);
mainContainer.appendChild(questionsAmount)
questionsAmount.appendChild(questions);

  // ---------------- KATEGORIVAL OCH FRÅGOR ----------------

  function clearMainContainer() {
    mainContainer.replaceChildren();
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

  function countQuestionsPerCategory(category) {
    return quizArray.filter((q) => q.category === category).length;
  }

  function showQuestion() {
    const question = filteredQuestions[currentQuestionIndex];

    if (question) {
      const questionContainer = document.createElement("div");
      questionContainer.id = "question-container"
      
      const questionText = document.createElement('h2')
      questionText.textContent = question.question;

      mainContainer.appendChild(questionContainer);
      questionContainer.appendChild(questionText)

      const answerDiv = document.createElement("div");
      answerDiv.id = "answerDiv";

      question.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.textContent = answer;
        answerButton.setAttribute("data-index", index);
        answerButton.id = "btn-style";

        answerButton.addEventListener("click", (e) => {
          const clickedAnswer = Number(e.target.dataset.index);
          const correctAnswer = question.rightAnswer;

          if (clickedAnswer === correctAnswer) {
            score++;
          }

          currentQuestionIndex++;
          clearMainContainer();
          showQuestion();
        });

        answerDiv.appendChild(answerButton);
      });

      mainContainer.appendChild(answerDiv);
    } else {
    //   mainContainer.textContent = "Out of questions at the moment, please hold";
      const scoreEL = document.createElement("p");
      scoreEL.id = "userScore";
      scoreEL.textContent = `Your right answers are ${score} out of ${filteredQuestions.length}`;
      mainContainer.appendChild(scoreEL);

      const restartButton = document.createElement('button');
      restartButton.textContent = 'Retake quiz'
      restartButton.id = "btn-style"
      mainContainer.appendChild(restartButton)

      restartButton.addEventListener('click', () => {
        pageTitle.innerHTML = ""
        clearMainContainer()
        gameStart()
      })
    }
  }
}
