// question vars
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

// element vars
var mainEl = document.querySelector("main");
var quizEl = document.querySelector("#quiz-content");
var quesEl = document.querySelector("#question");
var quesTextEl = document.querySelector("#question-text");
var optionsEl = document.querySelector("#options");
var resultEl = document.querySelector("#result");
var startQuizEl = document.querySelector("#start-quiz");
var finishQuizEl = document.querySelector("#finish-quiz");
var startBtn = document.querySelector("#start-quiz-btn");
var highScoreEl = document.querySelector("#high-scores-container");
var highScoreHeaderEl = document.querySelector("#high-score-header");
var headerEl = document.querySelector("header");
var highScoreList = document.querySelector("#high-score-list");
var timerEl = document.querySelector("#timer");
var newHighScoreEl = document.querySelector("#new-high-score");
var highScoreMessageEl = document.querySelector("#high-score-message");

// other vars
var quesCounter = 0;
var finalScore = 0;
var timeLeft = 0;
var highScoreCounter = 0;
var highScores = [];

// start timer
function countdown() {
  console.log("countdown function called");
  var timeInterval = setInterval(function () {
    if (timeLeft >= 1 && quesCounter < quesObj.length - 1) {
      timerEl.textContent = "Time: " + timeLeft;
      timeLeft -= 1;
    } else if(timeLeft >= 1 && quesCounter === quesObj.length - 1) {
        timerEl.textContent = "Time: " + timeLeft;
        timeLeft -=1;
    } else if(timeLeft === 0 && quesCounter != quesObj.length - 1) {
        timerEl.textContent = "Time: " + timeLeft;
        displayFinish();
        clearInterval(timeInterval);
    } else {
        timerEl.textContent = "Time: " + timeLeft;
        clearInterval(timeInterval);
    }
  }, 1000);
}

// display question + options
function displayQuestion() {
  console.log("displayQuestion function called");

  // show quizEl
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
      button.id = "btn-" + j;
      button.name = quesObj[quesCounter].options[j];
      button.textContent = j + 1 + ". " + quesObj[quesCounter].options[j];
      buttonDiv.appendChild(button);
      optionsEl.appendChild(buttonDiv);
    }
    quizEl.addEventListener("click", answerButtonHandler);
  } else {
    // show finish page if all questions asked
    displayFinish();
  }
}

// handle answer button clicking
function answerButtonHandler(event) {
  console.log("answerButtonHandler function called");
  var targetEl = event.target;

  if (targetEl.matches(".btn")) {
    var quesId = event.target.getAttribute("question-id");
    var answer = event.target.getAttribute("name");
    var result = "";

    if (quesObj[quesId].answer === answer) {
      result = "Correct!";
      score += 1;
    } else {
      result = "Wrong!";
      timeLeft -= 9;
    }
    displayResult(result);

    // trigger next question
    quesCounter += 1;
  }
}

// display correct/wrong result
function displayResult(result) {
  console.log("displayResult function called");
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

// clear out prior question + options
function clearQuestion() {
  console.log("clearQuestion function called");
  quesTextEl.textContent = "";
  optionsEl.innerHTML = "";
}

// display finish page
function displayFinish() {
  console.log("displayFinish function called");
  finalScore = timeLeft;

  if (timeLeft < 0) {
    finalScore = 0;
  }

  // hide elements
  quizEl.hidden = true;
  highScoreHeaderEl.hidden = false;
  finishQuizEl.hidden = false;

  // display final score
  document.querySelector("#final-score").textContent =
    "Your final score is " + finalScore + ".";

  // run high score logic
  var newHighScore = false;
  console.log("highScores length: " + highScores.length);
  if (highScores.length > 4) {
    newHighScore = checkHighScores(finalScore);
  } else {
    newHighScore = true;
  }

  // display new high score text if applicable
  if (newHighScore === true) {
    highScoreMessageEl.textContent =
      "CONGRATS, your score was high enough to be added to the list of High Scores. Please enter your intials below.";
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
  } else {
    // display no high score text if applicable
    document.querySelector("#high-score-message").textContent =
      "SORRY, your score was not high enough to be added to the Top 5 High Score List. Better luck next time!";
    var restartButton = document.createElement("button");
    restartButton.className = "btn quiz-return-btn";
    restartButton.id = "return-btn";
    restartButton.type = "button";
    restartButton.textContent = "Start Over";
    newHighScoreEl.appendChild(restartButton);
  }
}

// check if final score is in top 5
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

// handle new high score input
function highScoreSubmitHandler(event) {
  console.log("highScoreButtonHandler function called");
  event.preventDefault();

  var initials = document.querySelector(
    "input[name='high-score-initials']"
  ).value;
  var score = timeLeft;

  initials = initials.toUpperCase();

  // validate user input
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

    sortHighScores();
  }
}

// create high score object
function createHighScores(highScoreObj) {
  console.log("createHighScores function called");

  document.querySelector("#no-high-score").textContent = "";

  highScoreObj.id = highScoreCounter;

  highScores.push(highScoreObj);

  highScoreCounter++;
}

// sort list of high scores and remove score after top 5
function sortHighScores() {
  console.log("sortHighScores function called");
  var minScore = 120;
  var minScoreId = 0;
  if (!highScores) {
    return false;
  } else if (highScores.length > 5) {
    for (var i = 0; i < highScores.length; i++) {
      console.log(highScores[i].score);
      if (highScores[i].score < minScore) {
        minScore = highScores[i].score;
        minScoreId = highScores[i].id;
      }
    }
    highScores.splice(minScoreId, 1);
  }
  highScores.sort((a, b) => b.score - a.score);

  saveScores(highScores);

  renderHighScores();
}

// render high score list
function renderHighScores() {
  console.log("renderHighScores function called");
  if (highScores) {
    for (var i = 0; i < highScores.length; i++) {
      var highScoreItem = document.createElement("li");
      highScoreItem.className = "high-score-item";
      highScoreItem.innerHTML =
        "<h3 class='score-initials'>" +
        highScores[i].initials +
        " - " +
        highScores[i].score;
      highScoreList.appendChild(highScoreItem);
    }
    displayHighScores();
  }
}

// display high scores element
function displayHighScores() {
  console.log("displayHighScores function called");
  mainEl.hidden = true;
  highScoreEl.hidden = false;
}

// load high scores from local storage
function loadHighScores() {
  console.log("loadHighScores function called");
  var savedScores = localStorage.getItem("highScores");

  if (!savedScores) {
    document.querySelector("#no-high-score").textContent =
      "No high scores to report.";
    highScoreList.textContent = "";
    return false;
  }

  savedScores = JSON.parse(savedScores);

  for (var i = 0; i < savedScores.length; i++) {
    createHighScores(savedScores[i]);
  }
}

// save high scores to local storage
function saveScores() {
  console.log("saveScores function called");
  console.log(highScores);
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

// handle view high scores link
function highScoreLinkHandler(event) {
  console.log("highScoreLinkHandler function called");
  var targetEl = event.target;

  if (targetEl.matches(".high-score-link")) {
    renderHighScores();
  }
}

// handle return or clear button
function returnClearButtonHandler(event) {
  var targetEl = event.target;

  if (targetEl.matches("#return-btn")) {
    returnToStartQuiz();
  } else if (targetEl.matches("#clear-btn")) {
    localStorage.clear();
    loadHighScores();
  }
}

// reload quiz
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

// start quiz on click
startBtn.addEventListener("click", startQuiz);

// view high scores on click
headerEl.addEventListener("click", highScoreLinkHandler);

// return or clear on click
highScoreEl.addEventListener("click", returnClearButtonHandler);

// restart quiz on click
quizEl.addEventListener("click", returnClearButtonHandler);
finishQuizEl.addEventListener("click", returnClearButtonHandler);

// new high score input on click
newHighScoreEl.addEventListener("submit", highScoreSubmitHandler);
