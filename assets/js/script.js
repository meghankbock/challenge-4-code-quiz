// declare global variables
var quesObj = [
  {
    id: "ques-1",
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<script>", "<javascript>", "<scripting>", "<js>"],
    answer: "<script>",
    status: "unanswered",
  },

  {
    id: "ques-2",
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    options: [
      "<script href='xxx.js'>",
      "<script name='xxx.js'>",
      "<script src='xxx.js'>",
    ],
    answer: "<script src='xxx.js'>",
    status: "unanswered",
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
var timeLeft = 119;
var timerEl = document.querySelector("#timer");
var highScoreCounter = 0;
var highScoreEl = document.querySelector("#high-scores");

var countdown = function () {
  var timeInterval = setInterval(function () {
    if (timeLeft >= 1 && quesCounter <= quesObj.length - 1) {
      timerEl.textContent = "Time: " + timeLeft;
      timeLeft -= 1;
    } else {
      timerEl.textContent = "Time: " + timeLeft;
      clearInterval(timeInterval);
    }
  }, 1000);
};

var displayQuestion = function () {
  // check to see if questions remain
  if (quesCounter <= quesObj.length - 1) {
    // render question
    quesTextEl.textContent = quesObj[quesCounter].question;

    // render options
    for (var j = 0; j < quesObj[quesCounter].options.length; j++) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "btn answer-btn";
      button.setAttribute("question-id", quesCounter);
      console.log("question id " + button.getAttribute("question-id"));
      button.id = "btn-" + j;
      button.name = quesObj[quesCounter].options[j];
      console.log("name " + quesObj[quesCounter].options[j]);
      button.textContent = quesObj[quesCounter].options[j];
      optionsEl.appendChild(button);
    }
    quizEl.addEventListener("click", answerButtonHandler);
  } else {
      displayFinish();
  }
};

var answerButtonHandler = function (event) {
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
};

function displayResult(result) {
  console.log("interval started");
  var timeLeft2 = 2;

  resultEl.textContent = result;
  console.log(resultEl);

  var timeInterval2 = setInterval(function () {
    console.log("interval called");
    if (timeLeft2 > 1) {
      timeLeft2 -= 1;
    } else if (timeLeft2 === 1) {
      clearQuestion();
      displayQuestion();
      timeLeft2 -= 1;
    } else {
      resultEl.textContent = "";
      clearInterval(timeInterval2);
    }
  }, 500);
}

function clearQuestion() {
  quesTextEl.textContent = "";
  optionsEl.innerHTML = "";
}

function displayFinish() {
    var finalScore = timeLeft;
    quizEl.hidden = true;
    finishQuizEl.hidden = false;
    document.querySelector("#final-score").textContent = "Your final score is " + finalScore;
    var newHighScore = false;
    if( highScores.length > 5) {
        newHighScore = checkHighScores(finalScore);
    }
    else {
        newHighScore = true;
    }

    if(newHighScore === true) {
        var newHighScoreEl = document.createElement("div");
        var inputNewHighScoreEl = document.createElement("input");
        inputNewHighScoreEl.type = "text";
        inputNewHighScoreEl.name = "high-score-initials";
        inputNewHighScoreEl.class = "text-input";
        inputNewHighScoreEl.placeholder = "Enter Initials"

        newHighScoreEl.appendChild(inputNewHighScoreEl);

        var submitButton = document.createElement("button");
        submitButton.textContent = "Submit";
        submitButton.className = "btn submit-btn";

        newHighScoreEl.appendChild(submitButton);

        finishQuizEl.appendChild(newHighScoreEl);
    }
}

function highScoreButtonHandler(event) {
    var targetEl = event.target;

  if (targetEl.matches(".btn")) {
    var initials = document.querySelector("input[name='high-score-initials']").value;
    var score = timeLeft;

    if (!initials || initials >= 0 || initials.length > 2) {
        alert("Please enter your initials as two letters.")
        return false;
    }

    else {
        var highScoreObj = {
            initials: initials,
            score: score,
        };

        createHighScores(highScoreObj);
    }
}
}

function checkHighScores(finalScore) {
    var newHighScore = false;
    for (var i = 0; i < highScores.length; i++) {
        var scoreText = highScores[i].querySelector("span.score-value").textContent;
        var scoreNum = parseInt(scoreText);
        if(finalScore >= scoreNum) {
            newHighScore = true;
        }
    }
    return newHighScore;
}

function loadHighScores() {
    var savedScores = localStorage.getItem("highScores");

    if (!savedScores) {
        return false;
    }

    savedScores = JSON.parse(savedScores);

    for (var i = 0; i < savedScores.length; i++) {
        createHighScores(savedScore[i]);
    }
}

function createHighScores(highScoreObj) {
    var highScoreList = document.querySelector("#high-score-list");
    var highScoreItem = document.createElement("li");
    highScoreItem.className = "high-score-item";
    highScoreItem.innerHTML = "<h3 class='score-initials'>" + highScoreObj.initials + "</h3>-<span class='score-value'>" + highScoreObj.score + "</span>";
    highScoreList.appendChild(highScoreItem);

    highScoreObj.id = highScoreCounter;

    highScores.push(highScoreObj);

    saveScores();

    highScoreCounter++;

    }

function saveScores() {
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function displayHighScores() {
    mainEl.hidden = true;
    highScoreEl.hidden = false;

}

// start quiz by rendering questions
var startQuiz = function () {
  startQuizEl.hidden = true;
  timerEl.textContent = "Time: " + 120;
  countdown();
  displayQuestion();
};

// load high scores
loadHighScores();

// start quiz
startBtn.addEventListener("click", startQuiz);

finishQuizEl.addEventListener("click", highScoreButtonHandler);
