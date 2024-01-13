var startQuizButton = document.querySelector("#start");
var questionsDiv = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choicesDiv = document.querySelector("#choices");
var startScreenDiv = document.querySelector("#start-screen");

// Create unordered list element and list items for the choices
var listEl = document.createElement("ul");
var li1 = document.createElement("li");
var li2 = document.createElement("li");
var li3 = document.createElement("li");
var li4 = document.createElement("li");

// Create buttons
var button1 = document.createElement("button");
var button2 = document.createElement("button");
var button3 = document.createElement("button");
var button4 = document.createElement("button");

var displayedQuestions = 0;

// Function for when Start Quiz Button is pressed
startQuizButton.addEventListener("click", function () {

    // Hide Start Screen Div and Unhide Questions Div
    startScreenDiv.classList.add("hide");
    questionsDiv.classList.remove("hide");

});

var quizQuestion = displayQuestion(displayedQuestions);

function displayQuestion(i) {

    //TODO: Hide the feedback div

    var quizElement = quiz[i];

    // Set title
    questionTitle.textContent = quizElement.question;

    // Add options text to buttons
    button1.innerText = quizElement.options[0];
    button2.innerText = quizElement.options[1];
    button3.innerText = quizElement.options[2];
    button4.innerText = quizElement.options[3];

    // Append buttons to list items
    li1.appendChild(button1);
    li2.appendChild(button2);
    li3.appendChild(button3);
    li4.appendChild(button4);

    // Append list items to list element
    listEl.appendChild(li1);
    listEl.appendChild(li2);
    listEl.appendChild(li3);
    listEl.appendChild(li4);

    // Append list element to choice Div
    choicesDiv.appendChild(listEl);

    return (quizElement);

}

choicesDiv.addEventListener("click", function (event) {
    console.log("Entered the event listener for choosing option");
    var chosenOptionText = event.srcElement.innerHTML;
    var correctAnswerText = quizQuestion.options[quizQuestion.answer];
    if (chosenOptionText === correctAnswerText) {
        console.log("Correct answer");
        //TODO: Make visible the feedback div
    }
    else {
        console.log("Incorrect answer");
        //TODO: Make visible the feedback div
    }

    if (displayedQuestions === (quiz.length - 1)) {
        console.log("Have asked all the questions.");

        //TODO: Hide the questions and feedback div

        //TODO: Unhide the end-screen div

        //TODO: Log test results into localStorage
    }
    else {
        console.log("Will request another question");
        displayedQuestions++;
        quizQuestion = displayQuestion(displayedQuestions);
    }

});