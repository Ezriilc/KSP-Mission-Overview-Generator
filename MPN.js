var click = false;
var mode = true; //linear = false, flowchart = true
var laneWidth = 64;
var screenSelected = false;

var currentPlanet = false;
var currentCraft = false;

$(document).ready(function() {

	setWindow(-1);

	initiatePlanets();
	initiateCrafts();

	initiateToolbar();

	var p = new Planet(4);
	var m = new CraftModel("Untitled Space Craft", '#000000', 3);
	var c = new Craft(m);

	drawAll();

	var rect = document.getElementById("myCanvas").getBoundingClientRect();

	//document.getElementById("myCanvas").style.marginLeft = (-rect.width / 2) + "px";
	//document.getElementById("myCanvas").style.position = "absolute";
	//document.getElementById("tweak").style.position = "absolute";

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
		//new Planet(3);
		//new Craft("Untitled Space Craft", '#00aa00', 3);
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
	
	drawHighlightLocal();
}

function drag(){
	dragPlanets();
	dragKey();
}

function mousePress(){
	screenSelected = true;
	selectPlanets();
	selectCrafts();
	selectKey();
	clickButtons();
}

function deselectAll(){
	screenSelected = false;
	deselectCrafts();
	deselectPlanets();
	deselectKey();
}

function mouseRelease(){
	deselectPlanets();
	deselectKey();
}

function changeHeight(textbox){
	document.getElementById("myCanvas").height = textbox.value;
	drawAll();
}

function changeWidth(textbox){
	document.getElementById("myCanvas").width = textbox.value;
	drawAll();
}

