/**
 * @author jess
 */

//Define the keys we want to use
var KEY = {
    W: 87,
    S: 83,
    O: 79,
    L: 76,
}
const FPS = 30;


var ball = {
	x: 400,
	y: 400,
	dirX: 1,
	dirY: 1,
	speed: 5,
}

var paddleSpeed = 20;

var p1scores = 0;
var p2scores = 0;

var paddle1 = {
	x: 0,
	y: 0
}

var paddle2 = {
	x: 0,
	y: 0
}

var level = 1;
var secondsCounter = 0;

window.onload = init;
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);


function init()
{
	setInterval(setTimer, 1000);
		
	setInterval(main, 600 / FPS);
	$("#fps").text("fps: "+600/FPS);
	
	setInterval(incrementBallSpeed, 15000);
}

function main() {
	update();
}

function incrementBallSpeed() {
	console.log("Incrementing ball speed:");
	ball.speed += 0.5;
}

function setTimer(){
	secondsCounter++;
	$("#seconds").text("Time: "+secondsCounter+ " s");
}

function update() {
	
	if (KEY.W in keysDown) {
		var top = parseInt($("#paddle1").css("top"));
        if(top>155) {
        	$("#paddle1").css("top",top-paddleSpeed);
        }
	}
	if (KEY.S in keysDown) {
		var top = parseInt($("#paddle1").css("top"));
        if(top<680) {
        	$("#paddle1").css("top",top+paddleSpeed);
        }
	}
	if (KEY.O in keysDown) {
		var top = parseInt($("#paddle2").css("top"));
        if(top>155) {
        	$("#paddle2").css("top",top-paddleSpeed);
        }
	}
	if (KEY.L in keysDown) {
		var top = parseInt($("#paddle2").css("top"));
        if(top<680) {
        	$("#paddle2").css("top",top+paddleSpeed);
        }
	}
	
	moveBall();
		
	//General info
	$("#ballSpeed").text("Ball speed: "+ball.speed);
}

function moveBall() {
	var top = parseInt($("#ball").css("top"));
	var left = parseInt($("#ball").css("left"));
	
	//Catch the actual paddle positions
	paddle1.y = parseInt($("#paddle1").css("top"));
	paddle1.x = parseInt($("#paddle1").css("left"));
	paddle2.y = parseInt($("#paddle2").css("top"));
	paddle2.x = parseInt($("#paddle2").css("left"));
	
  	//Update ball position
  	ball.x += ball.speed*ball.dirX;
  	ball.y += ball.speed*ball.dirY;
  	
  	//Check for collitions
  	collider(paddle1,ball);
  	collider(paddle2,ball);

  	
  //X marges
  	if (left<0) {
  		p2scores +=1;
  		$("#player2Scores").text(p2scores);
  		restartPosition();
  	}
  	if (left>800) {
  		p1scores +=1;
  		$("#player1Scores").text(p1scores);
  		restartPosition();
  	}
  
  	//Y marges rebounds!!!!!
   if (top<155) {		
  		ball.dirY = 1;
  	}
  	if (top>750) {		
  		ball.dirY = -1;
  	}
 
 	//Update ball parameters
  	$("#ball").css({ 			
  		"left": ball.x,
  		 "top": ball.y,
  	});
	
}

function collider(p,b) {
	
	var ballRadius = parseInt($("#ball").css("height"));
	var paddleWidth = parseInt($("#paddle1").css("width"));
	var paddleHeight = parseInt($("#paddle1").css("height"));

	//Collition paddle-ball
	if ((p.x<b.x+ballRadius) && (p.x+paddleWidth>b.x) && (p.y<b.y+ballRadius) && (p.y+paddleHeight>b.y)) {
		ball.dirX *= -1;
	}
}

function restartPosition() {
	ball.dirY = Math.round(Math.random()) * 2 - 1;
	ball.dirX = Math.round(Math.random()) * 2 - 1;
	
	ball.x = 400;
	ball.y = 400;
	
	$("#ball").css({"left": ball.x ,"top": ball.y});
}
