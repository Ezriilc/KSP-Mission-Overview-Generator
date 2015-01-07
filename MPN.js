var click = false;
var mode = false; //linear = false, flowchart = true
var laneWidth = 64;

$(document).ready(function() {

	var c = new Craft("Untitled Space Craft", '#000000', 3);
	c.selected = true;
	new Planet("Ke", planetFillColors[3], planetFringeColors[3]);

	drawAll();

	var rect = document.getElementById("myCanvas").getBoundingClientRect();

	document.getElementById("myCanvas").style.marginLeft = (-rect.width / 2) + "px";
	document.getElementById("myCanvas").style.position = "absolute";

	$(document).mousemove(function(event) {
	
		if (click){drag();}
		
		drawAll();
	});
	
	$(document).mousedown(function(event) {
		mousePress();

		click = true;
	});
	
	$(document).mouseup(function(event) {
	
		click = false;

		mouseRelease();
	});
	
	$(document).keypress(function(event) {
		new Planet("Hi", planetFillColors[3], planetFringeColors[3]);
		new Craft("Untitled Space Craft", '#00aa00', 3);
		drawAll();
		//String.fromCharCode(event.which);
	});
});

function drawAll(){
	pageMouseX = event.pageX;
	pageMouseY = event.pageY;
	
	var rect = document.getElementById("myCanvas").getBoundingClientRect();
		
	canvasX = rect.left;
	canvasY = rect.top;
		
	midScreenPos[0] = screenPos[0] + rect.width / 2;
	midScreenPos[1] = screenPos[1] + rect.height / 2;
		
	drawColor = '#ffffff';
	fillRect(0, 0, rect.width, rect.height);
	drawPlanets();
	drawCrafts();
	drawKey();
	drawToolbar();
}

function drag(){
	dragPlanets();
	dragKey();
}

function mousePress(){
	deselectCrafts(); //temporary
	selectPlanets();
	selectCrafts();
	selectKey();
}

function mouseRelease(){
	deselectPlanets();
	deselectKey();
}