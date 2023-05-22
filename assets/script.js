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
// let question;

const leaderboard = [];

// This function starts the game
function letGameBegin() {
  shuffleArray(questions);
  currentQuestion = 0;
  // score = 0;

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
  if (questions[currentQuestion]) {
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

    if (currentQuestion < question.length - 1) {
      html += `<p id="answer-feedback"></p>`;
    }

    document.getElementById("Game").innerHTML = html;
  }
}

//This function displays the end results
function showGameOver() {
  Game.innerHTML = "<h2>Game Over<h2>";
  Game.style.textAlign = "center";
  Game.innerHTML +=
    "<p>Congrats on finishing! Your score is: " + score + " out of 4</p>";
  document.getElementById("answer-feedback").innerHTML = "";
}

//This function checks to see whether the answer is correct or not
function checkAnswer(answer) {
  const question = questions[currentQuestion];
  if (
    questions[currentQuestion] &&
    answer === questions[currentQuestion].answer
  ) {
    score++;
    if (currentQuestion >= questions.length - 1) {
      clearInterval(timerId);
      showGameOver();
      saveScore();
    } else {
      if (currentQuestion < questions.length - 1) {
        document.getElementById("answer-feedback").innerHTML = "Correct!";
      }
      currentQuestion++;
      showQuestion();
    }
  } else {
    timeLeft -= 15;
    if (currentQuestion >= questions.length - 1 || timeLeft <= 0) {
      clearInterval(timerId);
      showGameOver();
      saveScore();
    } else {
      if (currentQuestion < questions.length - 1) {
        document.getElementById("answer-feedback").innerHTML = "Incorrect!";
      }
      currentQuestion++;
      showQuestion();
    }
  }
}

function updateTimer() {
  timeLeft--;
  document.getElementById("timer").innerHTML = timeLeft;
  if (questions[currentQuestion] && timeLeft === 0) {
    clearInterval(timerId);
    checkAnswer("");
  }
}
function saveScore() {
  const initials = prompt("Enter your initials:");
  const entry = { initials: initials, score: score };
  leaderboard.push(entry);
  localStorage.setItem(initials, score);
  displayLeaderboard(leaderboard);
}

function createLeaderboard() {
  let html = "<h2>Leaderboard</h2>";

  leaderboard.sort((a, b) => b.score - a.score);

  if (leaderboard.length === 0) {
    html += "<p>No scores saved yet. Be the first!</p>";
  } else {
    html += "<ol>";
    for (let entry of leaderboard) {
      html += `<li>${entry.initials} : ${entry.score}</li>`;
    }
    html += "</ol>";
  }
  return html;
}
function displayLeaderboard() {
  let html = createLeaderboard();

  const leaderboardElement = document.getElementById("leaderboard");
  if (leaderboardElement) {
    leaderboardElement.innerHTML = html;
  } else {
    console.error("Leaderboard element not found.");
  }
}

letGameBegin();
let timerId = setInterval(updateTimer, 1000);
