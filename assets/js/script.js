
//global variables

var score = 0;
var currQuestion = -1; //current Question


//When start button is pressed, timer starts -- This Works!
/*Acceptance Criteria:GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question*/

function start(){

    timeLeft = 60;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        //proceed to end game function when timer runs out
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000);

    next();
    // document.getElementById('button').style.visibility='hidden';//how to hide the button when the game has started???

}

// When start button is pressed, a random array of questions pop up in the quiz

//random array of questions

var questions = [//write more questions here
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

    var quizContent = "<h2>" + questions[currQuestion].question + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currQuestion].choices[buttonLoop]);
        if (questions[currQuestion].choices[buttonLoop] == questions[currQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }


    document.getElementById("quiz").innerHTML = quizContent;
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

//stores the correct number of scores in the game




// stops timer to end game .. needs work here
function endGame (){
    clearInterval(timer);

    var quizContent = `
    <h1>Game over!</h1>
    <h3>Your score is` + score +  `!</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setScore()">Set score!</button>`;

    document.getElementById("quiz").innerHTML = quizContent;
}

