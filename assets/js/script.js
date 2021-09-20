var timerEl = document.getElementById('countdown');
var startBtn = document.getElementById('start');
var clicked = document.getElementById('answers');
var clear = document.getElementById('clear');


var taskIdCounter = 0;
var questionIndex = 0;
var answersIndex = 0;




var countdown = function () {
    var timeLeft = 75;

    var timeInterval = setInterval(function () {

        if (timeLeft > 1) {
            timerEl.textContent = timeLeft;

            timeLeft--;
        } else {
            timerEl.textContent = '';

            clearInterval(timeInterval);
            // Call the other function

        }
    }, 1000);
}


var displayQuestions = function () {

    var questionElement = document.getElementById('question');
    var paragraphEl = document.getElementById('paragraph');

    paragraphEl.textContent = "";

    var disQuestion = newQuestions[questionIndex];
    questionElement.textContent = disQuestion.question;



    
}

var displayAnswers = function () {
    
   
    var removeButton = document.getElementById('start');
    removeButton.remove();

    var answerElement = document.getElementById('answers');
    var disAnswers = newQuestions[questionIndex];
   


    for (var i = 0; i < disAnswers.answers.length; i++) {

        answerElement.innerHTML += "<button class='answer-select' id='" + i + "'>" + disAnswers.answers[i] + "</button>";

    }
    questionIndex++;
}

var clickButton = function () {
    countdown();
    displayQuestions();
    displayAnswers();
    

}


var clickAnswer = function (event) {

    var selectedAnswer = event.target
    var answerVal = event.target.textContent; 
    var answerElement = document.getElementById('answers');
    var disAnswers = newQuestions[questionIndex - 1];
    
    answerElement.innerHTML = '';

    for (var i = 0; i < disAnswers.answers.length; i++) {
        answerElement.innerHTML += "<button class='answer-select' id='" + i + "'>" + disAnswers.answers[i] + "</button>";
        
    
    
    if(answerVal === disAnswers.correct) {
    console.log("Nice");
    timerEl + 15;
    }
 
    }
    

    
    questionIndex++;
}


var questions = function (question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
}

var newQuestions = [
    new questions("Commonly used data-types do not include: ", ["strings", "booleans", "alerts", "number"], "alerts"),
    new questions("The condition of an if / else statement is enclosed with _______ ", ["quotes", "cuely brackets", "parenthesis", "square brackets"], "curly brackets"),
    new questions("Arrays in JavaScript can be used to store ________ ", ["numbers and strings", "other arrays", "booleans", "all of the above"], "all of the above"),
    new questions("String values must be enclosed within ________ when being assigned to variables.", ["commas", "curly brackets", "quotes", "parenthesis"], "quotes"),
    new questions("A very useful tool used during development and debugging for printing content to the debugger is: ", ["JavaScript", "terminal/bash", "for loops", "console.log"], "console.log")
]




startBtn.addEventListener("click", clickButton);
clicked.addEventListener("click", clickAnswer);