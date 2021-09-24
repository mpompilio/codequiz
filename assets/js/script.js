var timerEl = document.getElementById('countdown');
var questionElement = document.getElementById('question');
var timeLeft = 0;
var startBtn = document.getElementById('start');
var clear = document.getElementById('clear');
var buttons = document.querySelectorAll('.answer-select');
var scores = document.querySelectorAll('.high-score-display');
var button0 = document.getElementById('0');
var button1 = document.getElementById('1');
var button2 = document.getElementById('2');
var button3 = document.getElementById('3');
var name = document.querySelector('.name');
var highScore = document.querySelector('.high-score');
var playAgain = document.querySelector('.play-again');
var scoreList = document.querySelector('.scoreList');

var taskIdCounter = 0;
var questionIndex = 0;
var answersIndex = 0;
var times = [];

//starts countdown timer
var countdown = function () {
    timeLeft = 75;

    var timeInterval = setInterval(function () {

        if (timeLeft > 1) {
            timerEl.textContent = timeLeft;

            timeLeft--;
            if (questionIndex === 5) {
                clearInterval(timeInterval);
            }
        } else {
            timerEl.textContent = '';

            clearInterval(timeInterval);

        }
    }, 1000);
}

//displays first questions
var displayQuestions = function () {

    var disQuestion = newQuestions[questionIndex];
    questionElement.textContent = disQuestion.question;

}
//displays first answer choices
var displayAnswers = function () {

    var removeButton = document.getElementById('start');
    removeButton.remove();

    var disAnswers = newQuestions[questionIndex];

    for (var i = 0; i < disAnswers.answers.length; i++) {

        buttons[i].style.display = "block";
        buttons[i].innerHTML += disAnswers.answers[i];
    }

}


//executes functions
var clickButton = function () {
    countdown();
    displayQuestions();
    displayAnswers();

}

//When you click on answer options, it switches to the next answers
var clickAnswer = function (event) {

    var answerVal = event.target.textContent;
    var disAnswers = newQuestions[questionIndex];

    //checks if correct or not. 
    if (answerVal == disAnswers.correct) {
        console.log("Correct!");

        //takes off 5 seconds if answer is wrong
    } else {
        timeLeft = timeLeft - 5;
    }

    questionIndex++;

    //if the questionIndex length is reached, the score page appears
    if (questionIndex === 5) {
        times.push(timeLeft);
        saveTime();
        var clearContent = document.querySelector('.challenge');
        clearContent.innerHTML = "Game is Over!";
        var score = document.querySelector('.question');
        score.innerHTML = "Final Score is " + timeLeft;

        for (var i = 0; i < disAnswers.answers.length; i++) {
            buttons[i].remove();
        }

        playAgain.style.display = "block";
        highScore.style.display = "block";

    }
    var disAnswers = newQuestions[questionIndex];
    var disQuestion = newQuestions[questionIndex];
    questionElement.textContent = disQuestion.question;

    for (var i = 0; i < disAnswers.answers.length; i++) {
        buttons[i].innerHTML = "";
        buttons[i].style.display = "block";
        buttons[i].innerHTML += disAnswers.answers[i];

    }

    if (answerVal == disAnswers.correct) {
        console.log("Nice");
    } else {
        timeLeft = timeLeft - 5;
    }

}

//shows all the previous scores from the localStorage
var goHighscores = function () {
    var headerRemove = document.querySelector('.header');
    var highScoreContent = document.querySelector('.challenge');
    highScoreContent.innerHTML = "Highscores";
    highScore.remove();
    headerRemove.remove();

    scoreList.style.display = "block"

    var loadTime = localStorage.getItem('timeLeft');
    loadTime = JSON.parse(loadTime);
    for (i = 0; i < loadTime.length; i++) {
        scores[i].innerHTML = loadTime[i];
    }

}
//reloads game
var reloadPage = function () {
    location.reload();
}

var questions = function (question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
}

//holds questions, answers, and correct choies options
var newQuestions = [
    new questions("Commonly used data-types do not include: ", ["strings", "booleans", "alerts", "number"], "alerts"),
    new questions("The condition of an if / else statement is enclosed with _______ ", ["quotes", "curly brackets", "parenthesis", "square brackets"], "curly brackets"),
    new questions("Arrays in JavaScript can be used to store ________ ", ["numbers and strings", "other arrays", "booleans", "all of the above"], "all of the above"),
    new questions("String values must be enclosed within ________ when being assigned to variables.", ["commas", "curly brackets", "quotes", "parenthesis"], "quotes"),
    new questions("A very useful tool used during development and debugging for printing content to the debugger is: ", ["JavaScript", "terminal/bash", "for loops", "console.log"], "console.log")
]

//loads localStorage
var loadTime = function () {
    var loadTime = localStorage.getItem('timeLeft');
    loadTime = JSON.parse(loadTime);

    for (i = 0; i < loadTime.length; i++) {
        times.push(loadTime[i]);

    }
}

//saves localStorage
var saveTime = function () {

    localStorage.setItem('timeLeft', JSON.stringify(times));
}


startBtn.addEventListener("click", clickButton);
button0.addEventListener("click", clickAnswer);
button1.addEventListener("click", clickAnswer);
button2.addEventListener("click", clickAnswer);
button3.addEventListener("click", clickAnswer);
highScore.addEventListener("click", goHighscores);
playAgain.addEventListener("click", reloadPage);

loadTime();