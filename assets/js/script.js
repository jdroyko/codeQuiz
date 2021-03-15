
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
    var timer = setInterval(function () {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        //proceed to end game function when timer runs out
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);

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
    localStorage.setItem("highScore", score);
    var entry = {
        "person": document.getElementById('name').value,
        "score": score
    };

    var allHighScores = getScore();
    allHighScores.push(entry);

    localStorage.setItem("allHighScores", JSON.stringify(allHighScores));
}

function getScore() {
    var allHighScores =
        JSON.parse(localStorage.getItem("allHighScores"));
    if (!allHighScores) {
        allHighScores = []
    }
    return allHighScores;
}

// stops timer to end game
function endGame() {
    timeLeft = 0;
    var content = `
    <h1>Your Code Quiz Result:</h1>
    <h3>Your score is ` + score + `!</h3>
    <input type="text" id="name" placeholder="Enter Intials"> 
    <button onclick="submit()">Submit</button>`

    document.getElementById("quiz").innerHTML = content;
}

//Submit calls for savescore then gets the score to display High Score list
function submit() {
    saveScore();
    var getEntry = getScore();

    //Loop to get the names and scores into the high scores
    //The buttons show up but the functions aren't working inside the buttons
    //When commenting out the document style that shows as error the buttons work 
    //but not in the way that intended.
    var content = ` 
    <button onclick="start()">Play Again!</button> 
    <button onclick="clearScore()">Clear Highscores</button>
    <h1> High Scores </h1>
    <ul>`;
    for (var i = 0; i < getEntry.length; i++) {
        content += "<li>" + getEntry[i].person +"   " + getEntry[i].score + "</li>";
    }
    content += "</ul>"
    

    // var repeatButton = document.createElement("button");
    // button.innerHtml = "Play Again!"
    // repeatButton.addEventListener("click", start());

    document.getElementById("quiz").innerHTML = content;
}

//Clears the highscores stored in the local storage
function clearScore(){
    localStorage.clear();
}
