var lineWidth = 3;

var screenPos = [0, 0];
var midScreenPos = [0, 0];

var drawColor = '#ff0000';

var highlightPos = [false, false];

function drawImageLocal(x1, y1, width, height, name){
	drawImage(x1 + midScreenPos[0], y1 + midScreenPos[1], width, height, name);
}
function drawImage(x1, y1, width, height, name){
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	var img = document.getElementById(name);
	context.drawImage(img, x1 - width/2, y1 - height/2, width, height);
}

function drawGridlines(){
	var parentPlanet = false;
	selectedBorders.forEach(function(ent) { //check whether key Borders selected
		if (ent){shouldDrawGridlines = true;}
	});
	if(currentPlanet.selected || keySelected){
		shouldDrawGridlines = true;
	}
	if(currentCraft.startSelected || currentCraft.endSelected){
		if(currentCraft.parentPlanet && currentCraft.type != 0){
			shouldDrawGridlines = true;
			parentPlanet = currentCraft.parentPlanet;
		}
		else if (currentCraft.type == 0){
			shouldDrawGridlines = true;
		}
	}
	
	if (shouldDrawGridlines && document.getElementById("gridlines").checked){
		drawColor = "#808080"
		lineWidth = 1;
		
		if(!parentPlanet){
			var horiz = Number(document.getElementById("horizontalSnap").value);
			if (horiz > 0){
				var x = horiz * Math.round(-midScreenPos[0] / horiz);
				while(x < midScreenPos[0]){
					drawLineLocal(x, -midScreenPos[1], x, midScreenPos[1]);
					x+= horiz;
				}
			}
			var vert = Number(document.getElementById("verticalSnap").value);
			if (vert > 0){
				var y = vert * Math.round(-midScreenPos[1] / vert);
				while(y < midScreenPos[1]){
					drawLineLocal(-midScreenPos[0], y, midScreenPos[0], y);
					y+= vert;
				}
			}
		}
		
		if(parentPlanet){
			var maxDist = 2 * Math.sqrt(midScreenPos[0] *  midScreenPos[0] + midScreenPos[1] * midScreenPos[1]);
			var rad = Number(document.getElementById("radialSnap").value);
			var ang = Number(document.getElementById("angleSnap").value);
			entry = parentPlanet;
			if (rad > 0){
				var r = 0;
				while(r < maxDist){
					drawCircleLocal(entry.position[0], entry.position[1], r + parentPlanet.radius);
					r+= rad;
				}
			}
			if (ang > 0){
				var a = 0;
				var angle = Math.PI * 2 / ang;
				while(a < Math.PI * 2){
					drawLineLocal(entry.position[0], entry.position[1], entry.position[0]-maxDist*Math.cos(a), entry.position[1]-maxDist*Math.sin(a));
					a+= angle;
				}
			}
		}
	}
	shouldDrawGridlines = false;
}

function drawHighlightLocal(){
	if (!(highlightPos[0] === false)){
		lineWidth = 7;
		drawColor = '#ff0000';
		drawLine(highlightPos[0] + midScreenPos[0] - 12, highlightPos[1] + midScreenPos[1], highlightPos[0] + midScreenPos[0] + 12, highlightPos[1] + midScreenPos[1]);
		drawLine(highlightPos[0] + midScreenPos[0], highlightPos[1] + midScreenPos[1] - 12, highlightPos[0] + midScreenPos[0], highlightPos[1] + midScreenPos[1] + 12);
		lineWidth = 3;
		drawColor = '#ffffff';
		drawLine(highlightPos[0] + midScreenPos[0] - 10, highlightPos[1] + midScreenPos[1], highlightPos[0] + midScreenPos[0] + 10, highlightPos[1] + midScreenPos[1]);
		drawLine(highlightPos[0] + midScreenPos[0], highlightPos[1] + midScreenPos[1] - 10, highlightPos[0] + midScreenPos[0], highlightPos[1] + midScreenPos[1] + 10);
	}
}

function drawLine(x1, y1, x2, y2){
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	
	context.lineWidth = lineWidth;
	
	context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
	
	context.strokeStyle = drawColor;
    context.stroke();
	
	//context.lineWidth /= 2;
	
	/*context.beginPath();
    context.arc(x1, y1, context.lineWidth / 2, 0, 2 * Math.PI, false);
	context.stroke();
	
	context.beginPath();
    context.arc(x2, y2, context.lineWidth / 2, 0, 2 * Math.PI, false);
	context.stroke();*/
}

function drawDiamond(x1, y1, radius){
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	
	context.lineWidth = lineWidth;
	context.strokeStyle = drawColor;
	context.lineJoin="round";
	
	context.beginPath();
	context.moveTo(x1, y1 + radius);
    context.lineTo(x1 + radius, y1);
	context.lineTo(x1, y1 - radius);
	context.lineTo(x1 - radius, y1);
	//context.lineTo(x1, y1 + radius);
	//context.lineTo(x1 + radius, y1);
	context.closePath();
	
	context.stroke();
}

function drawDiamondLocal(x1, y1, radius){
	drawDiamond(x1 + midScreenPos[0], y1 + midScreenPos[1], radius);
}

function drawLineLocal(x1, y1, x2, y2){
	drawLine(x1 + midScreenPos[0], y1 + midScreenPos[1], x2 + midScreenPos[0], y2 + midScreenPos[1]);
}

function fillCircle(x1, y1, radius){
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	
	context.beginPath();
    context.arc(x1, y1, radius, 0, 2 * Math.PI, false);
	context.fillStyle = drawColor;
	context.fill();
}

function fillCircleLocal(x1, y1, radius){
	fillCircle(x1 + midScreenPos[0], y1 + midScreenPos[1], radius);
}

function drawCircle(x1, y1, radius){

	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	
	context.lineWidth = lineWidth;
	
	context.beginPath();
    context.arc(x1, y1, radius, 0, 2 * Math.PI, false);
	context.strokeStyle = drawColor;
	context.stroke();
}

function drawCircleLocal(x1, y1, radius){
	drawCircle(x1 + midScreenPos[0], y1 + midScreenPos[1], radius);
}

function drawString(word, x1, y1){
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");

	context.font = keyFont;
    context.fillStyle = '#000000';
	context.fillText(word, x1, y1);
}

function fillRect(x1, y1, x2, y2){
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	
	context.fillStyle = drawColor;
	context.fillRect(x1, y1, x2, y2);
}

function roundedRect(x,y,width,height,radius, fill){
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	
	ctx.fillStyle = drawColor;
	ctx.strokeStyle = drawColor;

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

  if (fill){
	ctx.fill();
  }
  else{
  	ctx.lineWidth = lineWidth;
	ctx.stroke();
  }
}

function roundedRectLocal(x,y,width,height,radius, fill){
	roundedRect(x + midScreenPos[0], y + midScreenPos[1], width,height,radius, fill);
}