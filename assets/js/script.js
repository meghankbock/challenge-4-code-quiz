// declare global variables
var quesObj = [
  {
    id: "ques-1",
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<script>", "<javascript>", "<scripting>", "<js>"],
    answer: "<script>",
  },

  {
    id: "ques-2",
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    options: [
      "<script href='xxx.js'>",
      "<script name='xxx.js'>",
      "<script src='xxx.js'>",
      "<script id='xxx.js'>",
    ],
    answer: "<script src='xxx.js'>",
  },

  {
    id: "ques-3",
    question: "How do you write 'Hello World' in an alert box?",
    options: [
      "alertBox('Hello World')",
      "msgBox('Hello World')",
      "msg('Hello World')",
      "alert('Hello World')",
    ],
    answer: "alert('Hello World')",
  },

  {
    id: "ques-4",
    question: "How do you create a function in JavaScript?",
    options: [
      "function myFunction()",
      "function:myFunction()",
      "function = myFunction()",
      "myfunction function()",
    ],
    answer: "function myFunction()",
  },

  {
    id: "ques-5",
    question: "How to write an IF statement in JavaScript?",
    options: ["if i = 5 then", "if (i == 5)", "if i = 5", "if i == 5 then"],
    answer: "if (i == 5)",
  },
];

var highScores = [];

var mainEl = document.querySelector("main");
var quizEl = document.querySelector("#quiz-content");
var quesEl = document.querySelector("#question");
var quesTextEl = document.querySelector("#question-text");
var optionsEl = document.querySelector("#options");
var resultEl = document.querySelector("#result");
var startQuizEl = document.querySelector("#start-quiz");
var finishQuizEl = document.querySelector("#finish-quiz");
var startBtn = document.querySelector("#start-quiz-btn");
var quesCounter = 0;
var score = 0;
var timeLeft = 0;
var timerEl = document.querySelector("#timer");
var highScoreCounter = 0;
var highScoreEl = document.querySelector("#high-scores-container");
var highScoreHeaderEl = document.querySelector("#high-score-header");
var headerEl = document.querySelector("header");
var highScoreList = document.querySelector("#high-score-list");
var highScoreObj = [];
var newHighScoreEl = document.querySelector("#new-high-score");

function countdown() {
  console.log("countdown function called");
  var timeInterval = setInterval(function () {
    if (timeLeft >= 1 && quesCounter <= quesObj.length - 1) {
      timerEl.textContent = "Time: " + timeLeft;
      timeLeft -= 1;
    } else {
      timerEl.textContent = "Time: " + timeLeft;
      clearInterval(timeInterval);
    }
  }, 1000);
}

function displayQuestion() {
  console.log("displayQuestion function called");

  quizEl.hidden = false;

  // check to see if questions remain
  if (quesCounter <= quesObj.length - 1) {
    // render question
    quesTextEl.textContent = quesObj[quesCounter].question;

    // render options
    for (var j = 0; j < quesObj[quesCounter].options.length; j++) {
      var buttonDiv = document.createElement("div");
      buttonDiv.className = "btn-div";
      var button = document.createElement("button");
      button.type = "button";
      button.className = "btn answer-btn";
      button.setAttribute("question-id", quesCounter);
      console.log("question id " + button.getAttribute("question-id"));
      button.id = "btn-" + j;
      button.name = quesObj[quesCounter].options[j];
      console.log("name " + quesObj[quesCounter].options[j]);
      button.textContent = j + 1 + ". " + quesObj[quesCounter].options[j];
      buttonDiv.appendChild(button);
      optionsEl.appendChild(buttonDiv);
    }
    quizEl.addEventListener("click", answerButtonHandler);
  } else {
    displayFinish();
  }
}

function answerButtonHandler(event) {
  console.log("answerButtonHandler function called");
  var targetEl = event.target;

  if (targetEl.matches(".btn")) {
    var quesId = event.target.getAttribute("question-id");
    var answer = event.target.getAttribute("name");
    //var questionId = event.target.getAttribute("question-id");
    //console.log("question id " + questionId);
    var result = "";

    if (quesObj[quesId].answer === answer) {
      result = "Correct!";
      score += 1;
    } else {
      result = "Wrong!";
      timeLeft -= 10;
    }
    displayResult(result);

    quesCounter += 1;
  }
}

function displayResult(result) {
  console.log("displayResult function called");
  console.log("interval started");
  var timeLeft2 = 2;

  resultEl.textContent = result;
  resultEl.hidden = false;
  console.log(resultEl);

  var timeInterval2 = setInterval(function () {
    console.log("interval called");
    if (timeLeft2 > 1) {
      timeLeft2 -= 1;
      clearQuestion();
      displayQuestion();
    } else {
      resultEl.textContent = "";
      resultEl.hidden = true;
      clearInterval(timeInterval2);
    }
  }, 500);
}

function clearQuestion() {
  console.log("clearQuestion function called");
  quesTextEl.textContent = "";
  optionsEl.innerHTML = "";
}

function displayFinish() {
  console.log("displayFinish function called");
  var finalScore = timeLeft;

  if(timeLeft < 0) {
      finalScore = 0;
  }

  quizEl.hidden = true;
  highScoreHeaderEl.hidden = false;
  finishQuizEl.hidden = false;
  document.querySelector("#final-score").textContent =
    "Your final score is " + finalScore + ".";
  var newHighScore = false;
  if (highScores.length > 5) {
    newHighScore = checkHighScores(finalScore);
  } else {
    newHighScore = true;
  }

  if (newHighScore === true) {
    var newHighScoreFormEl = document.createElement("form");
    newHighScoreFormEl.className = "new-high-score-form";
    newHighScoreFormEl.id = "new-high-score-form";
    var inputNewHighScoreEl = document.createElement("input");
    inputNewHighScoreEl.type = "text";
    inputNewHighScoreEl.name = "high-score-initials";
    inputNewHighScoreEl.className = "text-input";
    inputNewHighScoreEl.placeholder = "Enter Initials";

    newHighScoreFormEl.appendChild(inputNewHighScoreEl);

    var submitButton = document.createElement("button");
    submitButton.type = "Submit";
    submitButton.textContent = "Submit";
    submitButton.className = "btn submit-btn";

    newHighScoreFormEl.appendChild(submitButton);
    newHighScoreEl.appendChild(newHighScoreFormEl);
  }
}

function checkHighScores(finalScore) {
  console.log("checkHighScores function called");
  var newHighScore = false;
  for (var i = 0; i < highScores.length; i++) {
    var scoreNum = highScores[i].score;
    if (finalScore >= scoreNum) {
      newHighScore = true;
    }
  }
  return newHighScore;
}

function highScoreSubmitHandler(event) {
  console.log("highScoreButtonHandler function called");
  event.preventDefault();

  var initials = document.querySelector(
    "input[name='high-score-initials']"
  ).value;
  var score = timeLeft;

  initials = initials.toUpperCase();

  if (
    !initials ||
    initials.charCodeAt(0) < 64 ||
    initials.charCodeAt(1) < 64 ||
    initials.charCodeAt(0) > 90 ||
    initials.charCodeAt(1) > 90 ||
    initials.length > 2
  ) {
    alert("Your initials must be two letters long.");
    return false;
  } else {
    highScoreObj = {
      initials: initials,
      score: score,
    };

    createHighScores(highScoreObj);
    displayHighScores();
  }
}

function createHighScores(highScoreObj) {
  console.log("createHighScores function called");

  document.querySelector("#no-high-score").textContent = "";

  var highScoreItem = document.createElement("li");
  highScoreItem.className = "high-score-item";
  highScoreItem.innerHTML =
    "<h3 class='score-initials'>" +
    highScoreObj.initials +
    " - " +
    highScoreObj.score;
  highScoreList.appendChild(highScoreItem);

  highScoreObj.id = highScoreCounter;

  highScores.push(highScoreObj);

  sortHighScores();

  highScoreCounter++;
}

function sortHighScores() {
  console.log("sortHighScores function called");
  var minScore = 120;
  var minScoreId = 0;
  if (!highScores) {
    console.log("highScoreObj empty");
    return false;
  } else if (highScores.length > 5) {
    console.log("more than 5 high scores");
    for (var i = 0; i < highScores.length; i++) {
      console.log(highScores[i].score);
      if (highScores[i].score < minScore) {
        minScore = highScores[i].score;
        minScoreId = highScores[i].id;
        console.log("Min Score ID: " + minScoreId);
      }
    }
    highScores.splice(minScoreId, 1);
    console.log("High Score Length: " + highScores.length);
  }
  saveScores();
}

function loadHighScores() {
  console.log("loadHighScores function called");
  var savedScores = localStorage.getItem("highScores");

  if (!savedScores) {
    document.querySelector("#no-high-score").textContent = "No high scores to report.";
    highScoreList.textContent = "";
    return false;
  }

  savedScores = JSON.parse(savedScores);

  for (var i = 0; i < savedScores.length; i++) {
    createHighScores(savedScores[i]);
    highScoreObj.push(savedScores[i]);
  }
}

function saveScores() {
  console.log("saveScores function called");
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

function highScoreLinkHandler(event) {
  console.log("highScoreLinkHandler function called");
  var targetEl = event.target;

  if (targetEl.matches(".high-score-link")) {
    displayHighScores();
  }
}

function displayHighScores() {
  console.log("displayHighScores function called");

  mainEl.hidden = true;
  highScoreEl.hidden = false;
}

function returnClearButtonHandler(event) {
  var targetEl = event.target;

  if (targetEl.matches("#return-btn")) {
    returnToStartQuiz();
  } else if (targetEl.matches("#clear-btn")) {
    localStorage.clear();
    loadHighScores();
  }
}

function returnToStartQuiz() {
  location.reload();
}

// start quiz by rendering questions
function startQuiz() {
  console.log("startQuiz function called");

  // reset vars
  quesCounter = 0;
  score = 0;
  timeLeft = 119;

  // hide elements
  startQuizEl.hidden = true;
  highScoreHeaderEl.hidden = true;

  // display initial timmer
  timerEl.textContent = "Time: " + 120;

  // start countdown
  countdown();

  //display question
  displayQuestion();
}

// load high scores
loadHighScores();

// start quiz
headerEl.addEventListener("click", highScoreLinkHandler);

highScoreEl.addEventListener("click", returnClearButtonHandler);

startBtn.addEventListener("click", startQuiz);

quizEl.addEventListener("click", returnClearButtonHandler);

newHighScoreEl.addEventListener("submit", highScoreSubmitHandler);
