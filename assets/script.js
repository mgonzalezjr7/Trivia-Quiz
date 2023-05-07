const questions = [
  {
    question: "What are Variables?",
    options: [
      "Containers for storing data",
      "Blocks of code designed to perform a particular task",
      "Zero or more characters written inside quotes",
      "Statements used to perform different actions based on different conditions",
    ],
    answer: "Containers for storing data",
  },
  {
    question:
      "Which of the following functions would you use to output data to the console?",
    options: [
      "console.stamp() ",
      "console.pub()",
      "console.print()",
      "console.log()",
    ],
    answer: "console.log()",
  },
  {
    question: "Which of the following is not a Primitive Data Type?",
    options: ["Number", "String", "Undefined", "Event"],
    answer: "Event",
  },
  {
    question: "Within an Array, what element would index 1 be considered?",
    options: ["First", "Second", "Third", "Fourth"],
    answer: "Second",
  },
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 120;
let question;

// This function starts the game
function letGameBegin() {
  shuffleArray(questions);
  currentQuestion = 0;
  score = 0;

  showQuestion();
}
//This function shuffles the question
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

//This function displays the question

function showQuestion() {
  if (questions[currentQuestion]);
  {
    const question = questions[currentQuestion];
    let html = `
        <h2>${question.question}</h2>
        <p>Time left: <span id="timer">${timeLeft}</span> seconds</p>
        <ul>
        `;
    for (let option of question.options) {
      html += `<li><button onclick="checkAnswer('${option}')">${option}</button></li>`;
    }

    html += "</ul>";

    document.getElementById("Game").innerHTML = html;
  }
}

function showGameOver() {
  // Game.style.display = "none";
  Game.innerHTML = "<h2>Game Over<h2>";
  Game.style.textAlign = "center";
  Game.innerHTML += "<p>Congrats on finishing! Your score is: " + score + " out of 4</p>";
}
function checkAnswer(answer) {
  const question = questions[currentQuestion];
  if (answer === questions[currentQuestion].answer) {
    score++;
    document.getElementById("answer-feedback").innerHTML = "Correct!";
    if (currentQuestion >= questions.length - 1) {
      clearInterval(timerId);
      showGameOver();
    } else {
      currentQuestion++;
      showQuestion();
    }
  } else {
    timeLeft -= 15;
    document.getElementById("answer-feedback").innerHTML = "Wrong!";
    if (timeLeft <= 0) {
      clearInterval(timerId);
      showGameOver();
    } else {
      currentQuestion++;
      showQuestion();
    }
  }
}

function updateTimer() {
  timeLeft--;
  document.getElementById("timer").innerHTML = timeLeft;
  if (timeLeft === 0) {
    clearInterval(timerId);
    checkAnswer("");
  }
}
function sendGame() {
  const html = `<h2>Results</h2><p>You got ${score} out of ${questions.length} questions correct.</p><button onclick="letGameBegin()">Play Again</button>`;
  document.getElementById("Game").innerHTML = html;
}

letGameBegin();
let timerId = setInterval(updateTimer, 1000);
