var buttonColors = ["red", "blue", "green", "yellow"]; //storing colors in array

var gamePattern = []; //to store pattern

var userClickedPattern = []; //to store user pattern

var started = false; //to check game has started or not

var level = 0; //to check at which level the user is

$(document).keypress(function(){
    if(!started) {
        $("#level-title").text("Level  " + level);
        nextSequence();
        started = true;
    }
}); //to detect the keypress (when a keypress is detected the game starts)

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
}); //animating button, playing sound and checking answer

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
            nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
} //comparing arrays if yes continue else restart the game from level-0

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level  " + level);
    var randonNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randonNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
} //creating a random number and selecting a color from array pushing it to store pattern and animate

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
} //to add animation CSS class

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
} //playing sound

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
} //to start over the game if user looses