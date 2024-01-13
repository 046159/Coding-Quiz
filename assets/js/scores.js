var highScoresEl = document.querySelector("#highscores");

var scoresString = localStorage.getItem("scores");
var scoresArrayRetrieved = JSON.parse(scoresString);
scoresArrayRetrieved.sort((a, b) => parseFloat(b.Score) - parseFloat(a.Score));

for (let i = 0; i < scoresArrayRetrieved.length; i++) {
    var initials = scoresArrayRetrieved[i].Initials;
    var score = scoresArrayRetrieved[i].Score;
    var listItem = document.createElement("li");
    listItem.innerText = initials + " - " + score;
    highScoresEl.appendChild(listItem);
}