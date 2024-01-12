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

// Function for when Start Quiz Button is pressed
startQuizButton.addEventListener("click", function () {

    // Hide Start Screen Div and Unhide Questions Div
    startScreenDiv.classList.add("hide");
    questionsDiv.classList.remove("hide");

    for (var i = 0; i < quiz.length; i++) {
        var quizElement = quiz[i];

        // Set title
        questionTitle.textContent = quizElement.question;

        // Add text for list items
        li1.textContent = quizElement.options[0];
        li2.textContent = quizElement.options[1];
        li3.textContent = quizElement.options[2];
        li4.textContent = quizElement.options[3];

        // Append list items to list element
        listEl.appendChild(li1);
        listEl.appendChild(li2);
        listEl.appendChild(li3);
        listEl.appendChild(li4);
    }

    // Append list element to choice Div
    choicesDiv.appendChild(listEl);

});

