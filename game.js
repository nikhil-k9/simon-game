var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var start=true;

$(document).keypress(function(){
  if(start===true){
    $("#level-title").text("level "+level);
    nextSequence();
    start="false";}
});


$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
      nextSequence();
    },1000);
    }
  }
  else{
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over Press Any Key To Restart");
    //$(document).keypress(function(){
      restart();
    //})
  }
}

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("level "+level);
var randomNumber=Math.floor(Math.random()*4);
var randomChosenColor=buttonColors[randomNumber];
gamePattern.push(randomChosenColor);
$("#"+randomChosenColor).fadeOut(100).fadeIn(100);
playSound(randomChosenColor);
animatePress(randomChosenColor);
}


function playSound(name){
  var audio= new Audio("sounds/"+name+".mp3");
  audio.play();
}


function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(
    function(){
      $("#"+currentColor).removeClass("pressed");
    },100);
}


function restart(){
  level=0;
  start=true;
  gamePattern=[];
}
