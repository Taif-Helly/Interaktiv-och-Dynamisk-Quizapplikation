let appState = "start";

function setState(next){
  appState = next;
  render();
}

const app = document.getElementById("app");

function render() {
  app.innerHTML = ""; // rensa

  if (appState === "start") {
    renderIntro();
  } else if (appState === "quiz") {
    renderQuiz();
  } else if (appState === "result") {
    renderResult();
  }
}

function renderIntro() {
  const h1 = document.createElement("h1");
  h1.textContent = "Välkommen till Quizet!";
  app.appendChild(h1);

  const startBtn = document.createElement("button");
  startBtn.textContent = "Starta Quiz";
  startBtn.onclick = () => {
    currentQuestion = 0;
    score = 0;
    setState("quiz");
  };
  app.appendChild(startBtn);
}

let questions = [
  { question: "Vad är 2+2?", answers: ["3","4","5"], right: 1 },
  { question: "Vilken färg har himlen?", answers: ["Grön","Blå","Röd"], right: 1 }
];

let currentQuestion = 0;
let score = 0;

function renderQuiz() {
  const q = questions[currentQuestion];

  const h2 = document.createElement("h2");
  h2.textContent = q.question;
  app.appendChild(h2);

  q.answers.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.onclick = () => {
      if (i === q.right) score++;
      currentQuestion++;
      if (currentQuestion < questions.length) {
        render(); // nästa fråga
      } else {
        setState("result"); // slutet
      }
    };
    app.appendChild(btn);
  });
}

function renderResult() {
  const h2 = document.createElement("h2");
  h2.textContent = `Du fick ${score} av ${questions.length} rätt!`;
  app.appendChild(h2);

  const againBtn = document.createElement("button");
  againBtn.textContent = "Spela igen";
  againBtn.onclick = () => setState("start"); // Ändrat från "intro" till "start"
  app.appendChild(againBtn);
}

render();