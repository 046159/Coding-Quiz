/* -------------------------------------------------------------------------- */
/*                              Declare variables                             */
/* -------------------------------------------------------------------------- */
var highScoresEl = document.querySelector("#highscores");
var clearButtonEl = document.querySelector("#clear");
var scoresString = localStorage.getItem("scores");
var scoresArrayRetrieved = JSON.parse(scoresString); // Convert string to array

/* -------------------------------------------------------------------------- */
/*                              Show high scores                              */
/* -------------------------------------------------------------------------- */
if (scoresArrayRetrieved != null) {

    /* ------------------- Sort the array in descending order ------------------- */
    scoresArrayRetrieved.sort((a, b) => parseFloat(b.Score) - parseFloat(a.Score));

    /* --------------- Show each of the scores and who scored them -------------- */
    for (let i = 0; i < scoresArrayRetrieved.length; i++) {
        var initials = scoresArrayRetrieved[i].Initials; 
        var score = scoresArrayRetrieved[i].Score;
        var listItem = document.createElement("li");
        listItem.innerText = initials + " - " + score;
        highScoresEl.appendChild(listItem);
    }
}

/* -------------------------------------------------------------------------- */
/*                              Clear high scores when button pressed         */
/* -------------------------------------------------------------------------- */
clearButtonEl.addEventListener("click", function (event) {
    localStorage.removeItem("scores");

    /* ------------ Get all high scores and remove them from display ------------ */
    var scoresPresented = document.getElementById('highscores');
    while (scoresPresented.firstChild) {
        scoresPresented.removeChild(scoresPresented.firstChild);
    }
})