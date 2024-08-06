
var userClickPattern = [];
var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];

var started = false;

var level = 0;

$(document).keypress(function (){
    if(started == false){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    }
});

 function nextSequence(){

    userClickPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(200).fadeOut(200).fadeIn(200);


}
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");

    userClickPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickPattern.length-1);

});

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    
    audio.play();
}

function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");
    setTimeout(function (){
        $("." + currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
if(userClickPattern[currentLevel] == gamePattern[currentLevel]){
    console.log("sucess");

    if(userClickPattern.length == gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
}
else{
    console.log("failure");
    var wrong = new Audio("./sounds/wrong.mp3");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $(document).keypress(gameOver());
}
}

function gameOver(){
    started = false;
    gamePattern = [];
    level = 0;
}