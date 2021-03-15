
//global variables

var score = 0;
var currQuestion = -1; //current Question
var timer;

//When start button is pressed, timer starts -- This Works!
/*Acceptance Criteria:GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question*/

function start() {
    document.getElementById('btn').style.display = "none";
    document.getElementById('start-play').style.display = "none";

    timeLeft = 60;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    timer = setInterval(function () {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        //proceed to end game function when timer runs out
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);

    currQuestion = -1;
    next();

}

// When start button is pressed, a random array of questions pop up in the quiz

//random array of questions

var questions = [
    {
        question: "What does JSON stand for?",
        choices: ["it's a name", "JavaScript Object Notation", "Pass"],
        answer: "JavaScript Object Notation"
    },
    {
        question: "How do you call an id?",
        choices: [".", "#", "()"],
        answer: "#"
    },
    {
        question: "What output does a prompt have?",
        choices: ["String", "Number", "Boolean"],
        answer: "String"
    },
    {
        question: "How do you style an HTML?",
        choices: ["Javascript", "CSS", "JSON"],
        answer: "CSS"
    },
    {
        question: "What is not a storage option?",
        choices: ["Local", "Session", "Memory"],
        answer: "Memory"
    },
    {
        question: "What is in quotation marks?",
        choices: ["String", "Number", "Boolean"],
        answer: "String"
    },
    {
        question: "How do you make an html interactive",
        choices: ["CSS", "JavaScript", "JSON"],
        answer: "Javascript"
    },
    {
        question: "What does API stand for?",
        choices: ["Application Programming Interface", "JavaScript Object Notation", "It doesn't stand for anything."],
        answer: "Application Programming Interface"
    },
    {
        question: "How would you call for Not a Number?",
        choices: ["!=number", "NaN", "not ANumber"],
        answer: "NaN"
    },
];

//Loops through the questions
/* Acceptance Criteria: WHEN I answer a question
THEN I am presented with another question*/

function next() {
    currQuestion++;

    /* Acceptance Criteria: WHEN all questions are answered or the timer reaches 0
    THEN the game is over*/

    if (currQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var content = "<h2>" + questions[currQuestion].question + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currQuestion].choices.length; buttonLoop++) {

        var buttonCode = "<li><button onclick=\"[ANS]\">[CHOICE]</button></li>";
        buttonCode = buttonCode.replace("[CHOICE]", questions[currQuestion].choices[buttonLoop]);
        if (questions[currQuestion].choices[buttonLoop] == questions[currQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        content += buttonCode
    }


    document.getElementById("answer-options").innerHTML = content;
}

//if player misses a question, time is decreased by 10 seconds -- This Works
/*WHEN I answer a question incorrectly
THEN time is subtracted from the clock*/
function incorrect() {
    timeLeft -= 10;
    next();// calls on the next question
}

//if player is correct, score increases by 10
function correct() {
    score += 10;
    next(); // calls on the next question
}

/*Acceptance Criteria: THEN the game is over
WHEN the game is over
THEN I can save my initials and my score*/
//stores the correct number of scores in the game

function saveScore() {
    var initials = document.getElementById("name").value.trim();
    if (initials !== "") {
        var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    }

    var entry = {
        initials: initials,
        score: score
    };

    highscores.push(entry);

    localStorage.setItem("highscores", JSON.stringify(highscores));

}

function getScore() {
    document.getElementById("scores").removeAttribute("class");
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    highscores.sort(function (a, b) { return b.score - a.score });

    highscores.forEach(score => {
        var scoreListItem = document.createElement("li");
        scoreListItem.textContent = score.initials + " " + score.score;
        var scoreList = document.getElementById("highscores");
        scoreList.appendChild(scoreListItem);
    });

}


function endGame() {
    clearInterval(timer);
    // timeLeft = 0;
    var endGame = document.getElementById("endgame");
    endGame.removeAttribute("class");

    var quizDiv = document.getElementById("quiz");
    quizDiv.setAttribute("class", "hide");

    var finalScore = document.getElementById("final-score");
    finalScore.textContent = score
}


//Clears the highscores stored in the local storage
var clearScores = document.getElementById("clearScore");
clearScores.addEventListener("click", function () {
    localStorage.clear();
});

//Makes submit button function 
var submitbtn = document.getElementById("submit");
submitbtn.addEventListener("click", function () {
    saveScore();
    getScore();
});

//Gets highscores
var getScores = document.getElementById("getScore");
getScores.addEventListener("click", function () {
    getScore();
    var quizDiv = document.getElementById("quiz");
    quizDiv.setAttribute("class", "hide");
});

//Restarts Game 
var restart = document.getElementById("restart");
restart.addEventListener("click", function () {
    start();
    var restartQuiz = document.getElementById("quiz");
    restartQuiz.removeAttribute("class");
    var hideScores = document.getElementById("scores");
    hideScores.setAttribute("class", "hide");
    var hideEndGame = document.getElementById("endgame");
    hideEndGame.setAttribute("class", "hide");
});