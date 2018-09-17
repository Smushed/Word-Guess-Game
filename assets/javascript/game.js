var answersArray = ["monkey", "hippo", "crocodile", "lion", "zebra", "giraffe", "elephant", "rhinoceros", "warthog"];
var randomAnswer = Math.floor(Math.random() * answersArray.length);
var answer = answersArray[randomAnswer];
var hiddenAnswer = [];
var boolAnswer = false;
var win = 0;
var loss = 0;

// Dealing with player input
var wrongAnswerBank = [];
var inputAmount = 0;
var lives = 10;

// Get elements from HTML
var showAnswer = document.getElementById("word-to-guess");
var showWrongAnswer = document.getElementById("wrong-answers");
var showWin = document.getElementById("win-text");
var showLoss = document.getElementById("loss-text");
var showLastAnswer = document.getElementById("show-last-answer");
var showRemainingLives = document.getElementById("lives-remaining");
var showImage = document.getElementById("last-answer-image");

// Makes the answer hidden then writes it to the screen
for (var i = 0; i < answer.length; i++){
    hiddenAnswer.push("_ ");
};
showAnswer.innerHTML = hiddenAnswer.join(" ");

// Initialize the wins and losses to the screen
showWin.innerHTML = win;
showLoss.innerHTML = loss;
showLastAnswer.innerHTML = "Press any key to get started";
showRemainingLives.innerHTML = lives;

//Updates the image on the screen to the image of the last answer
function changeImage(){
    if (answer === "monkey") {
        showImage.src = "assets/images/monkey.jpg";
    } else if (answer === "hippo") {
        showImage.src = "assets/images/hippo.jpg";
    } else if (answer ==="crocodile"){
        showImage.src = "assets/images/crocodile.jpg";
    } else if (answer === "lion") {
        showImage.src = "assets/images/lion.jpg";
    } else if (answer === "zebra") {
        showImage.src = "assets/images/zebra.jpg";
    } else if (answer === "giraffe") {
        showImage.src = "assets/images/giraffe.png";
    } else if (answer === "elephant") {
        showImage.src = "assets/images/elephant.jpg";
    } else if (answer === "rhinoceros") {
        showImage.src = "assets/images/rhinoceros.jpg";
    } else if (answer === "warthog") {
        showImage.src = "assets/images/warthog.jpg";
    };
};

// Game over reset; also updates the wins, losses and update the last won word on the screen
function resetGame(){
    randomAnswer = Math.floor(Math.random() * answersArray.length);
    answer = answersArray[randomAnswer];
    lives = 10;
    //Clear out the hidden answer
    hiddenAnswer = [];
    showAnswer.innerHTML = hiddenAnswer;
    for (var i = 0; i < answer.length; i++){
        hiddenAnswer.push("_ ");;
    };
    showAnswer.innerHTML = hiddenAnswer.join(" ");
    //Clear out the word bank
    wrongAnswerBank = [];
    showWrongAnswer.innerHTML = wrongAnswerBank;
    //Update the wins and losses
    showWin.innerHTML = win;
    showLoss.innerHTML = loss;
};

document.onkeyup = function(event) {
    var userGuess = event.key;
    var validGuess = event.keyCode

    // If statement validates that the input is a letter
    if (validGuess > 64 && validGuess < 91){
        userGuess = userGuess.toLowerCase();
        boolAnswer = answer.includes(userGuess);
        for (var i = 0; i < answer.length; i++){
            if (answer[i] === userGuess) {
                hiddenAnswer[i] = userGuess;
                showAnswer.innerHTML = hiddenAnswer.join(" ");
            };
        };
        // This determines if the answer is wrong. Also checks if the letter was already guessed
        if (boolAnswer === false && wrongAnswerBank.includes(userGuess) === false){
            wrongAnswerBank.push(userGuess);
            showWrongAnswer.innerHTML = wrongAnswerBank.join(" ");
            lives--;
            showRemainingLives.innerHTML = lives;
        };
        // Win condition. If there are no longer any hidden letters
        if (hiddenAnswer.includes("_ ") === false){
            setTimeout(function(){
                showLastAnswer.innerHTML = "You won! The answer was " + answer + ".";
                win++;
                changeImage();
                resetGame();
            }, 10);
        };
        // The player is out of guesses
        if (lives <= 0){
            setTimeout(function(){
                showLastAnswer.innerHTML = "You lost! The answer was " + answer + ".";
                loss++;
                changeImage();
                resetGame();
            }, 10);   
        };
    };
};