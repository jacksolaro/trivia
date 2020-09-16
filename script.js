// ================================================
//  DOM ELEMENTS
// ================================================
var timerEl = $("#timer");
var startBtn = $("#startBtn");
var questionTextEl = $("#questionText");
var answerBtn = $(".answer-btn");
var answerEl1 = $("#answer1");
var answerEl2 = $("#answer2");
var answerEl3 = $("#answer3");
var answerEl4 = $("#answer4");


// ================================================
//  Initialize Variables
// ================================================

var secondsLeft = 100;
var questionIndex = 0;

// TODO: Create Question Content
var questionList = [
    {
        question: "Which singer’s real name is Stefani Joanne Angelina Germanotta?",
        answer1: "Lady Gaga",
        answer2: "Madonna",
        answer3: "Gwen Stefani",
        answer4: "Lorde",
        correctAns: "answer1"
    },
    {
        question: "Which of the following is one of the only two egg laying mammals left on the planet today?",
        answer1: "Common Opossum",
        answer2: "Aardvark",
        answer3: "Duck-Billed Platypus",
        answer4: "Common Bat",
        correctAns: "answer3"
    },
    {
        question: "What is the tiny piece at the end of a shoelace called?",
        answer1: "Aglet",
        answer2: "Lace Fastener",
        answer3: "Tiplet",
        answer4: "Lace Tip",
        correctAns: "answer1"
    }
]

// ================================================
//  Page Load
// ================================================
timerEl.text(secondsLeft);


// ================================================
//  Functions
// ================================================

// Start Game
// TODO: At 10 seconds left, turn text red and bold
startBtn.on("click", function() {
    // Hide the Start Button
    startBtn.css({'display':'none'});

    // TODO: Hide the Starter Screen

    // Display Questions
    generateQuestions();

    // Runs Timer, only if there isn't already a timer running
    if(secondsLeft === 100 || secondsLeft <= 0){
        var gameTimer = setInterval(() => {
            secondsLeft--;
            timerEl.text(`${secondsLeft}`);
    
            // TODO: If time left is 0 OR there are no more questions
            if(secondsLeft <= 0 || questionIndex === questionList.length) {
                clearInterval(gameTimer);
                console.log("Game Over")
                // TODO: Run gameOver()
                gameOver();
            }
    
        }, 1000)
    }
})

// Answer Click
answerBtn.on("click", function(e) {
    var answerChoice = (e.target);
    
    // Check to see if the user selected the correct answer
    if(answerChoice.id === questionList[questionIndex].correctAns) {
        // Correct Answer
        console.log("it works so far")
    } else {
        // Incorrect Answer
        console.log("it works and you clicked a wrong answer")
        secondsLeft = secondsLeft - 15;
    }
    
    // increase the question index
    questionIndex++;

    // if there are more questions in the array, generate next question
    if(questionIndex < questionList.length) {
        generateQuestions();
    }
})

// Generate Questions
function generateQuestions() {
    questionTextEl.text(questionList[questionIndex].question);
    answerEl1.text(questionList[questionIndex].answer1);
    answerEl2.text(questionList[questionIndex].answer2);
    answerEl3.text(questionList[questionIndex].answer3);
    answerEl4.text(questionList[questionIndex].answer4);
}

// Game Over Function
function gameOver() {
    // TODO: Hide all question and answer elements
    
    // Prompt user for intials
    prompt(`Great game! Your score is: ${secondsLeft}! Please enter your intials to save your score: `);
    
    // Save score to local storage
    
    // Display leaderboard

}




