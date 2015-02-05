var click = false;
//var mode = true; //linear = false, flowchart = true
var laneWidth = 64;
var screenSelected = false;

var currentPlanet = false;
var currentCraft = false;
var currentCraftModel = false;
var currentPlanetModel = false;

$(document).ready(function() {

	setWindow(-1);
	initiatePlanets();
	initiateCrafts();
	var m = new CraftModel("Untitled Space Craft", '#000000', 3);

	initiateToolbar();

	var p = new Planet(planetModels[4]);
	var c = new Craft(m);
	drawAll();
	updateSelector();

	var rect = document.getElementById("myCanvas").getBoundingClientRect();

	window.onresize = function(){
		updateSelectorSize();
	}
	$(document).mousemove(function(event) {
		if (click){drag();}
		drawAll();
	});
	
	$(document).mousedown(function(event) {
		click = true;
		mousePress();
	});
	
	$(document).mouseup(function(event) {
		click = false;
		mouseRelease();
	});
	
	$(document).keypress(function(event) {
		drawAll();
	});
});

function drawAll(){
	//updateSelector();
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
	//drawToolbar();
	
	drawHighlightLocal();
}

function drag(){
	dragPlanets();
	dragKey();
}

function mousePress(){
	//screenSelected = true;
	selectPlanets();
	selectCrafts();
	selectKey();
	//clickButtons();
}

function deselectAll(){
	//screenSelected = false;
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

