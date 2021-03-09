
//global variables

var score = 0;
var currQuestion = -1; //current Question


//When start button is pressed, timer starts
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

}

// When start button is pressed, a random array of questions pop up in the quiz

//random array of questions

var questions = [
    {
        question: "What does JSON stand for?",
        choices: ["it's a name", "JavaScript Object Notation", "Pass"],
        answer: "JavaScript Object Notation"
        },

];