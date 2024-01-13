var highScoresEl = document.querySelector("#highscores");
var clearButtonEl = document.querySelector("#clear");

var scoresString = localStorage.getItem("scores");
var scoresArrayRetrieved = JSON.parse(scoresString);
if (scoresArrayRetrieved != null) {
    scoresArrayRetrieved.sort((a, b) => parseFloat(b.Score) - parseFloat(a.Score));

    for (let i = 0; i < scoresArrayRetrieved.length; i++) {
        var initials = scoresArrayRetrieved[i].Initials;
        var score = scoresArrayRetrieved[i].Score;
        var listItem = document.createElement("li");
        listItem.innerText = initials + " - " + score;
        highScoresEl.appendChild(listItem);
    }
}

clearButtonEl.addEventListener("click", function (event) {
    localStorage.removeItem("scores");
    var scoresPresented = document.getElementById('highscores');
    while (scoresPresented.firstChild) {
        scoresPresented.removeChild(scoresPresented.firstChild);
    }
})