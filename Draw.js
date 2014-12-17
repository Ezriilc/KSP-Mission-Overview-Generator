var lineWidth = 10;

var screenPos = [0, 0];
var midScreenPos = [0, 0];

var drawColor = '#ff0000';

function drawLine(x1, y1, x2, y2){
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	
	context.lineWidth = lineWidth;
	
	context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
	
	context.strokeStyle = drawColor;
    context.stroke();
	
	context.lineWidth /= 2;
	
	context.beginPath();
    context.arc(x1, y1, context.lineWidth / 2, 0, 2 * Math.PI, false);
	context.stroke();
	
	context.beginPath();
    context.arc(x2, y2, context.lineWidth / 2, 0, 2 * Math.PI, false);
	context.stroke();
}

function drawLineLocal(x1, y1, x2, y2){
	drawLine(x1 - midScreenPos[0], y1 - midScreenPos[1], x2 - midScreenPos[0], y2 - midScreenPos[1]);
}

function fillCircle(x1, y1, radius){

	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	
	context.lineWidth = radius;
	
	context.beginPath();
    context.arc(x1, y1, radius / 2, 0, 2 * Math.PI, false);
	context.strokeStyle = drawColor;
	context.stroke();
}

function fillCircleLocal(x1, y1, radius){
	fillCircle(x1 + midScreenPos[0], y1 + midScreenPos[1], radius);
}

function drawCircle(x1, y1, radius){

	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	
	context.lineWidth = 3;
	
	context.beginPath();
    context.arc(x1, y1, radius, 0, 2 * Math.PI, false);
	context.strokeStyle = drawColor;
	context.stroke();
}

function drawCircleLocal(x1, y1, radius){
	drawCircle(x1 + midScreenPos[0], y1 + midScreenPos[1], radius);
}

function drawString(){
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");

	context.font = '40pt Calibri';
    context.fillStyle = drawColor;
	context.fillText("yay", 10, 40);
}

function fillRect(x1, y1, x2, y2){
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	
	context.fillStyle = '#ffffff';
	context.fillRect(x1, y1, x2, y2);
}

function roundedRect(x,y,width,height,radius){
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


  ctx.beginPath();
  ctx.moveTo(x,y+radius);
  ctx.lineTo(x,y+height-radius);
  ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
  ctx.lineTo(x+width-radius,y+height);
  ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
  ctx.lineTo(x+width,y+radius);
  ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
  ctx.lineTo(x+radius,y);
  ctx.quadraticCurveTo(x,y,x,y+radius);
  //ctx.stroke();
  ctx.fill();
}