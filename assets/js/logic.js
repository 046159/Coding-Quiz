/* -------------------------------------------------------------------------- */
/*                              Declare variables                             */
/* -------------------------------------------------------------------------- */

/* ----------------------------- Query Selectors ---------------------------- */
var startQuizButton = document.querySelector("#start");
var submitButton = document.querySelector("#submit");
var questionsDiv = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choicesDiv = document.querySelector("#choices");
var startScreenDiv = document.querySelector("#start-screen");
var feedbackDiv = document.querySelector("#feedback");
var endScreenDiv = document.querySelector("#end-screen");
var finalScoreEl = document.querySelector("#final-score");
var initialsEl = document.querySelector("#initials");
var timerEl = document.querySelector("#time");

/* ---------------------------- Declare constants --------------------------- */
const correctAudio = new Audio("assets/sfx/correct.wav");
const incorrectAudio = new Audio("assets/sfx/incorrect.wav");

/* ----------------------------- Other variables ---------------------------- */
var score = 0; // Keep track of the score
var timer; // Quiz timer
var feedbackTimer; // Feedback timer for displaying feedback
var timerCount = 75; // Timer for overall quiz (seconds)
var feedbackTimerCount = 2; // Timer for displaying feedback (seconds)
var quizQuestion; // Will hold a single quiz question that needs to be shown
var displayedQuestions = 0; // Number of questions displayed

/* -------------------------------------------------------------------------- */
/*               Event Listener for when Start Quiz Button is pressed         */
/* -------------------------------------------------------------------------- */
startQuizButton.addEventListener("click", function () {
    startScreenDiv.classList.add("hide"); // Hide the Start Screen
    questionsDiv.classList.remove("hide"); // Show the Questions Div
    startTimer(); // Start the quiz timer
    quizQuestion = displayQuestion(displayedQuestions); // Display the first question
});

/* -------------------------------------------------------------------------- */
/*                      Event Listener for Submit button                      */
/* -------------------------------------------------------------------------- */
submitButton.addEventListener("click", function (event) {
    var initials = initialsEl.value; // Read initials from screen

    /* ----------------------- Don't allow empty initials ----------------------- */
    if (initials === "") {
        displayFeedback("Please enter your initials before submitting");
        return;
    }
    /* ----------------------- Don't allow more than 3 characters --------------- */
    if (initials.length > 3) {
        displayFeedback("Initials cannot be longer than 3 characters");
        return;
    }

    /* --------------------- Create an object to store later -------------------- */
    var scoreObject = {
        Initials: initials,
        Score: score,
    }

    /* ------------------- Add score object to array of scores ------------------ */
    var itemsInLocalStorage = localStorage.getItem("scores");
    var scoresArray = JSON.parse(itemsInLocalStorage);
    if (scoresArray === null) {
        var scoresArray = [];
    }
    scoresArray.push(scoreObject);

    /* ------------------- Log test results into localStorage ------------------- */
    localStorage.setItem("scores", JSON.stringify(scoresArray));

    /* ------------------------ Show the highscores page ------------------------ */
    location.replace("./highscores.html")
});

/* -------------------------------------------------------------------------- */
/*                A function to display an individual question                */
/* -------------------------------------------------------------------------- */
function displayQuestion(i) {
    removeButtons(); // Remove previous choices (presented as buttons)
    var quizElement = quiz[i]; // Get the question from the quiz array
    questionTitle.textContent = quizElement.question; // Set question

    /* ------------------- Render a new button for each choice ------------------ */
    for (var i = 0; i < quizElement.options.length; i++) {
        var option = quizElement.options[i];
        var button = document.createElement("button"); // Create the button
        button.textContent = (i + 1) + ". " + option; // Prefix choice with a number
        choicesDiv.appendChild(button); // Append the button
    }

    return (quizElement);
}

/* -------------------------------------------------------------------------- */
/*         A function to remove previous choices from being displayed         */
/* -------------------------------------------------------------------------- */
function removeButtons() {
    var choicesPresented = document.getElementById('choices');
    while (choicesPresented.firstChild) {
        choicesPresented.removeChild(choicesPresented.firstChild);
    }
    return;
}

/* -------------------------------------------------------------------------- */
/*    Event listener for when a choice is selected in response to question    */
/* -------------------------------------------------------------------------- */
choicesDiv.addEventListener("click", function (event) {

    /* ----------------- Check if selection matches with answer ----------------- */
    var chosenOptionText = event.srcElement.innerHTML; // Option selected
    chosenOptionText = chosenOptionText.substr(3); // Discard the number prefix e.g. "1. "
    var correctAnswerText = quizQuestion.options[quizQuestion.answer];
    if (chosenOptionText === correctAnswerText) {
        displayFeedback("Correct!");
        correctAudio.play();
        score++;
    }
    else {
        displayFeedback("Wrong!");
        incorrectAudio.play();
        timerCount = timerCount - 10;
    }

    /* ---------------------- Check if reached end of quiz ---------------------- */
    if (displayedQuestions === (quiz.length - 1)) {
        console.log("Have asked all the questions.");
        questionsDiv.classList.add("hide");

        /* ----------------------------- Stop the timer ----------------------------- */
        clearInterval(timer);
        timerEl.textContent = 0;

        /* ---------------- Unhide the end-screen div and show score ---------------- */
        endScreenDiv.classList.remove("hide");
        finalScoreEl.textContent = score;
    }
    else {
        console.log("Will request another question");
        displayedQuestions++;
        quizQuestion = displayQuestion(displayedQuestions); // Display next question
    }

});

/* -------------------------------------------------------------------------- */
/*                           Function for quiz timer                          */
/* -------------------------------------------------------------------------- */
function startTimer() {
    timer = setInterval(function () {
        timerCount--;
        timerEl.textContent = timerCount;
        if (timerCount === 0) {
            location.replace("./highscores.html") // End quiz if timer has run out
        }
    }, 1000);
}

/* -------------------------------------------------------------------------- */
/*                   Function to display feedback on screen                   */
/* -------------------------------------------------------------------------- */
function displayFeedback(displayText) {
    feedbackDiv.classList.remove("hide");
    feedbackDiv.textContent = displayText;
    startFeedbackTimer(); // Display the feedback for required number of seconds
}

/* -------------------------------------------------------------------------- */
/*               Function to start timer on displaying feedback               */
/* -------------------------------------------------------------------------- */
function startFeedbackTimer() {
    feedbackTimer = setInterval(function () {
        console.log(feedbackTimerCount);
        feedbackTimerCount--;
        if (feedbackTimerCount === 0) {
            feedbackDiv.classList.add("hide");
            clearInterval(feedbackTimer);
            feedbackTimerCount = 1;
        }
    }, 1000);
}