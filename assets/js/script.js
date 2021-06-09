var questions = [
  {
    question: "1. Commonly used data types DO NOT include:",
    answers: ["a: strings", "b: booleans", "c: alerts", "d: numbers"],
    correctAnswer: "c: alerts",
  },
  {
    question:
      "2. The condition in an if/else statement is enclosed within ____.",
    answers: [
      "a: quotes",
      "b: curly brackets",
      "c: parenthesis",
      "d: square brackets",
    ],
    correctAnswer: "c: parenthesis",
  },
  {
    question: "3. Arrays in JavaScript can be used to store _____.",
    answers: [
      "a: numbers and strings",
      "b: other arrays",
      "c: booleans",
      "d: all the above",
    ],
    correctAnswer: "d: all the above",
  },
  {
    question:
      "4. String values must be enclosed within _____ when being assigned variables.",
    answers: ["a: commas", "b: quotes", "c: curly brackets", "d: parenthesis"],
    correctAnswer: "b: quotes",
  },
  {
    question:
      "5. A very useful tool during development and debugging for printing content to the debugger is:",
    answers: [
      "a: JavaScript",
      "b: terminal/bash",
      "c: for loops",
      "d: console.log",
    ],
    correctAnswer: "d: console.log",
  },
];
var currentQuestion = 0;
var timerEl = document.getElementById("timer");
var timeLeft = 60;
var topScores = [];
var score = 50;
var yourScore = document.querySelector("#your-score");
var result = document.getElementById("result");
var savedScoresEl = document.getElementById("saved-scores");
var question = document.getElementById("question");
var choices = document.getElementById("choices");
var startBtn = document.getElementById("start");
var introEl = document.querySelector(".intro");
var quizEl = document.querySelector(".quiz-questions")
var initialInput = document.querySelector("#initials");
var highscoreForm = document.getElementById("high-scores");

function generateQuestions() {
  if (currentQuestion === 5) {
    return;
  }
  question.textContent = questions[currentQuestion].question;
  choices.innerHTML = "";

  for (
    var index = 0;
    index < questions[currentQuestion].answers.length;
    index++
  ) {
    var choice = document.createElement("button");
    choice.textContent = questions[currentQuestion].answers[index];

    choice.addEventListener("click", checkAnswers);
    choices.appendChild(choice);
    choice.setAttribute(
      "style",
      "background-color: #611a73; color: aliceblue; padding: 10px; display: block; margin: 5px; font-size: 15px"
    );
  }
}
function checkAnswers(event) {
  var selectedAnswer = event.target.innerHTML;

  if (selectedAnswer !== questions[currentQuestion].correctAnswer) {
    timeLeft -= 10;
    score -= 10;
    result.textContent = "Wrong!";
  } else {
    score += 10;
    result.textContent = "Correct!";
  }
  if (currentQuestion < 4) {
    currentQuestion++;
    generateQuestions();
  } else {
      quizEl.setAttribute("class", "display-none")
    renderHighscores();
  }

}

function setTimer() {
  timer = setInterval(function () {
    timeLeft--;
    timerEl.textContent = "Time Remaining: " + timeLeft;

    if (timeLeft < 1) {
      clearInterval(timer);
    }
  }, 1000);
}

function renderHighscores() {
    highscoreForm.classList.remove("display-none")
    yourScore.textContent = "Wow! Your score is: " + score;
    savedScoresEl.innerHTML = "";

    var savedScores = JSON.parse(localStorage.getItem("topScores"));
  
    for (var i = 0; i < savedScores.length; i++) {
    var highscore = savedScores[i];

    var li = document.createElement("li");
    li.textContent = highscore;
    li.setAttribute("data-index", i);

    savedScoresEl.appendChild(li);
  }
}

highscoreForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var newScore = "Initials: " + initialInput.value.trim() + " " + "Score: " + score;

  topScores.push(newScore);
  localStorage.setItem("topScores", JSON.stringify(topScores));
  initialInput.value = "";
});

function startQuiz() {
    introEl.setAttribute("class", "display-none")
    quizEl.classList.remove("display-none")
  setTimer();
  generateQuestions();
}
startBtn.addEventListener("click", startQuiz);

