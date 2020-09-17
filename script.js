// ================================================
//  DOM ELEMENTS
// ================================================
var timerEl = $("#timer");
var startBtn = $(".startBtn");
var questionTextEl = $("#questionText");
var answerBtn = $(".answer-btn");
var answerEl1 = $("#answer1");
var answerEl2 = $("#answer2");
var answerEl3 = $("#answer3");
var answerEl4 = $("#answer4");
var leaderboardEl = $("#leaderboard-list");
var welcomeSection = $("#welcome-section")
var triviaSection = $("#trivia-section")
var leaderboardSection = $("#leaderboard-section")
var gameProgressEl = $("#game-progress")


// ================================================
//  Initialize Variables
// ================================================

var secondsLeft = 100;
var questionIndex = 0;
const wrongDeduction = 5;

var storedScores = JSON.parse(localStorage.getItem('scores')) || [];

// Create Question Content
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
        question: "Which country produces the most coffee in the world?",
        answer1: "Taiwan",
        answer2: "United States",
        answer3: "Peru",
        answer4: "Brazil",
        correctAns: "answer4"
    },
    {
        question: "What is the most frequently sold item at Walmart?",
        answer1: "Tennis Racket",
        answer2: "Banana",
        answer3: "Gum",
        answer4: "Gift Cards",
        correctAns: "answer2"
    },
    {
        question: "What does Ph.D stand for?",
        answer1: "Post Doctorate",
        answer2: "Professional Doctor",
        answer3: "Doctor of Philosphy",
        answer4: "Professional Dentist",
        correctAns: "answer3"
    },
    {
        question: "What is the total number of dots on a pair of dice?",
        answer1: "42",
        answer2: "36",
        answer3: "48",
        answer4: "32",
        correctAns: "answer1"
    },
    {
        question: "How long is New Zealand's Ninety Mile Beach?",
        answer1: "75 miles",
        answer2: "90 miles",
        answer3: "99 miles",
        answer4: "55 miles",
        correctAns: "answer4"
    },
    {
        question: "Among land animals, what species has the largest eyes?",
        answer1: "Hippo",
        answer2: "Giraffe",
        answer3: "Ostrich",
        answer4: "Elephant",
        correctAns: "answer3"
    },
    {
        question: "In what year did The Titanic sink?",
        answer1: "1915",
        answer2: "1930",
        answer3: "1996",
        answer4: "1912",
        correctAns: "answer4"
    },
    {
        question: "What is the sum of all the angles of a triangle?",
        answer1: "360",
        answer2: "270",
        answer3: "180",
        answer4: "90",
        correctAns: "answer3"
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
startBtn.on("click", function() {
    // Reset
    questionIndex = 0;
    secondsLeft = 100;

    console.log("click")

    // Toggle Visibility
    welcomeSection.addClass("d-none");
    leaderboardSection.addClass("d-none");
    gameProgressEl.removeClass("d-none");
    triviaSection.removeClass("d-none")
    timerEl.removeClass("d-none")


    // Display Questions
    generateQuestions();

    // Runs Timer, only if there isn't already a timer running
    if(secondsLeft === 100){
        var gameTimer = setInterval(() => {
            secondsLeft--;
            timerEl.text(`${secondsLeft}`);
    
            // If time left is 0 OR there are no more questions
            if(secondsLeft <= 0 || questionIndex === questionList.length) {
                clearInterval(gameTimer);
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
        // Correct Answer, sets background green then return to white
        triviaSection.css("background-color", "green");
        setTimeout(function() {
            triviaSection.css("background-color", "white");
        }, 400)
    } else {
        // Incorrect Answer, sets background red then return to white
        triviaSection.css("background-color", "red");
        setTimeout(function() {
            triviaSection.css("background-color", "white");
        }, 400)

        // triviaSection.css("background-color", "white").delay(800);
        secondsLeft = secondsLeft - wrongDeduction;
    }
    
    // increase the question index
    questionIndex++;

    // if there are more questions in the array, generate next question
    if(questionIndex < questionList.length) {
        generateQuestions();
    }
})

// Generate Question using the Current Question Index
function generateQuestions() {
    // Update Questions
    questionTextEl.text(questionList[questionIndex].question);
    answerEl1.text(questionList[questionIndex].answer1);
    answerEl2.text(questionList[questionIndex].answer2);
    answerEl3.text(questionList[questionIndex].answer3);
    answerEl4.text(questionList[questionIndex].answer4);

    // Update Question Tracker
    gameProgressEl.text(`${questionIndex+1} / ${questionList.length}`)
}

// Game Over Function
function gameOver() {
    //  Hide all question and answer elements
    triviaSection.addClass("d-none");
    leaderboardSection.removeClass("d-none")

    // Prompt user for intials
    var userInits = prompt(`Great game! Your score is: ${secondsLeft}! Please enter your intials to save your score: `);
    
    // Create Object to Store Initials and Score
    var userObj = {
        userInits: userInits,
        userScore: secondsLeft
    }

    // Push the Users score to the stored scores
    storedScores.push(userObj);

    //  Save score to local storage
    localStorage.setItem('scores',JSON.stringify(storedScores));

    // Display leaderboard
    displayLeaderboard();
}

function displayLeaderboard() {
    //empty old high scores
    leaderboardEl.empty();

    // Update the high scores
    var localStorageData = JSON.parse(localStorage.getItem("scores"))

    // Sort the Leaderboard
    console.log(localStorageData.sort((a,b) => (a.userScore > b.userScore) ? -1 : 1))
    
    // Grab the top 10 on the leaderboard
    localStorageData.splice(10)

    // Build leaderboard
    localStorageData.forEach(function(userObj) {
        var scoreLiEl = $("<li>");
        scoreLiEl.text(`${userObj.userInits} - ${userObj.userScore}`);
        leaderboardEl.append(scoreLiEl);
    })

}
