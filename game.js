const buttonColours = ['red', 'yellow', 'green', 'blue'];
let randomChosenColour; 
let gamePattern = [];
let userClickedPattern =[];
let level = -1;
let started = false;

$(document).keydown(start);
$('#level-title').click(start);

$('.btn').click(function() {
    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    animateAndSound(userChosenColor);
    checkAnswer(userClickedPattern.length -1);
})

function start () {
    if(!started) {
        newSequence();
        started=true;
    }   
}

function newSequence() {
    level++;
    $('#level-title').text('Level '+level);
    let rand = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[rand];
    gamePattern.push(randomChosenColour);
    animateAndSound(randomChosenColour);
}

function animateAndSound(colour) {
    $('#'+colour).fadeIn(200).fadeOut(200).fadeIn(200);
    let audio = new Audio('sounds/'+colour+'.mp3');
    audio.play();
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]){
        animateAndSound('wrong');
        $('body').addClass('game-over');  
        setTimeout(()=> {
            $('body').removeClass('game-over');  
        }, 1000)  
        $('#level-title').text('GameOver, Press Any Key or Click Here to Restart');
        started = false;
        gamePattern = [];
        userClickedPattern =[];
        level = -1;
    } else {   
        if(gamePattern.length===userClickedPattern.length) {
            setTimeout(()=> {
                newSequence();  
            }, 1000)  
            userClickedPattern = [];
        }              
    }
}

