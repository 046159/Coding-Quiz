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

var score = 0;

// Declare a global variable that will hold a quiz question
var quizQuestion;

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


    quizQuestion = displayQuestion(displayedQuestions);

});

// Add event listener for Submit button
submitButton.addEventListener("click", function (event) {

    // Read initials from screen
    var initials = initialsEl.value;

    // Create an object to store later
    var scoreObject = {
        Initials: initials,
        Score: score,
    }

    // Add score to array of scores
    var itemsInLocalStorage = localStorage.getItem("scores");
    console.log(itemsInLocalStorage);
    var scoresArray = JSON.parse(itemsInLocalStorage);
    if (scoresArray === null) {
        var scoresArray = [];
    }
    console.log("scoresArray");

    scoresArray.push(scoreObject);
    
    // Log test results into localStorage
    localStorage.setItem("scores", JSON.stringify(scoresArray));

    // Show the highscores page
    location.replace("./highscores.html")    

});


function displayQuestion(i) {

    //TODO: Hide the feedback div
    
    // Remove choices/options, presented as buttons, before displaying new ones
    removeButtons();

    var quizElement = quiz[i];
    console.log(quizElement);

    // Set title
    questionTitle.textContent = quizElement.question;

      
        // Render a new li for each todo
        for (var i = 0; i < quizElement.options.length; i++) {
          var option = quizElement.options[i];
          var button = document.createElement("button");
          button.textContent = (i+1) + ". " + option;
          choicesDiv.appendChild(button);
        }
      
/*


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

    */

    return (quizElement);

}

function removeButtons() {
    var choicesPresented = document.getElementById('choices');
    while (choicesPresented.firstChild) {
        choicesPresented.removeChild(choicesPresented.firstChild);
      }
    return;
}

choicesDiv.addEventListener("click", function (event) {
    var chosenOptionText = event.srcElement.innerHTML;
    chosenOptionText = chosenOptionText.substr(3);
    console.log(chosenOptionText);
    var correctAnswerText = quizQuestion.options[quizQuestion.answer];
    if (chosenOptionText === correctAnswerText) {
        console.log("Correct answer");
        score++;
        //TODO: Make visible the feedback div
    }
    else {
        console.log("Incorrect answer");
        //TODO: Make visible the feedback div
    }

    if (displayedQuestions === (quiz.length - 1)) {
        console.log("Have asked all the questions.");

        //Hide the questions and feedback div
        questionsDiv.classList.add("hide");
        feedbackDiv.classList.add("hide");

        //Unhide the end-screen div
        endScreenDiv.classList.remove("hide");
        finalScoreEl.textContent = score;
    }
    else {
        console.log("Will request another question");
        displayedQuestions++;
        quizQuestion = displayQuestion(displayedQuestions);
    }

});