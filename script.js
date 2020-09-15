var timer = document.querySelector("#timer");
var startBtn = document.querySelector("#startBtn");
var questionTextEl = document.querySelector("#questionText");

// Number of Seconds on the Timer
var secondsLeft = 100;

function startGame() {
    runTimer();
    console.log("Game Started")
    generateQuestions();
}

// Run Timer
// TODO: At 10 seconds left, turn text red and bold
function runTimer() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = secondsLeft + " seconds left";

        if(secondsLeft <= 0) {
        clearInterval(timerInterval);
        console.log("Game Over")
        }

    }, 1000);
}

function generateQuestions() {
    console.log(questions[0].question);
    questionTextEl.textContent = questions[0].question;
}


startBtn.addEventListener("click", function(){
    if(secondsLeft === 100 || secondsLeft === 0) {
        startGame();
    }
})

// TODO: Create Question Content
const questions = [
    {
        question: "Question 1",
        answers: [
            { text: 'Answer 1', correct: true},
            { text: 'Answer 2', correct: false},
            { text: 'Answer 3', correct: false},
            { text: 'Answer 4', correct: false}
        ]
    },
    {
        question: "Question 2",
        answers: [
            { text: 'Answer 1', correct: true},
            { text: 'Answer 2', correct: false},
            { text: 'Answer 3', correct: false},
            { text: 'Answer 4', correct: false}
        ]
    },
    {
        question: "Question 3",
        answers: [
            { text: 'Answer 1', correct: true},
            { text: 'Answer 2', correct: false},
            { text: 'Answer 3', correct: false},
            { text: 'Answer 4', correct: false}
        ]
    },
]