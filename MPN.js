var click = false;
//var mode = true; //linear = false, flowchart = true
var laneWidth = 64;
var screenSelected = false;
var leftClick = true;

var currentPlanet = false;
var currentCraft = false;
var currentCraftModel = false;
var currentPlanetModel = false;

var shouldDrawGridlines = false;

var lastMouseEvent = false;

//var keyEnum = {Alt:0};
//var keyArray = [false];

var alt = false;

$(document).ready(function() {

	setWindow(-1);
	initiatePlanets();
	initiateCrafts();
	var m = new CraftModel("Untitled Space Craft", '#000000', 3);

	initiateToolbar();

	var p = new Planet(planetModels[4]);
	var c = new Craft(m);
	c.parentPlanet = p;
	c.type = 2;
	//drawAll();
	updateSelector();

	var rect = document.getElementById("myCanvas").getBoundingClientRect();

	window.onresize = function(){
		updateSelectorSize();
	}
	$(document).mousemove(function(event) {
		alt = event.altKey;
		lastMouseEvent = event;
		if (click){drag();}
		drawAll();
	});
	
	$(document).mousedown(function(event) {
		click = true;
		mousePress();
		leftClick = detectLeftButton(event);
	});
	
	$(document).mouseup(function(event) {
		click = false;
		mouseRelease();
	});
	//$(document).keydown(function(event) {
	/*document.onkeydown = function(event){  
		if(event.keyCode == 18){ //alt
			keyArray[keyEnum.Alt] = true;
		}
		drawAll();
	}
	document.onkeyup = function(event){  
		if(event.keyCode == 18){ //alt
			keyArray[keyEnum.Alt] = false;
		}
		drawAll();
	}*/
});

function drawAll(){
	$("#warnings").empty();

	pageMouseX = lastMouseEvent.pageX;
	pageMouseY = lastMouseEvent.pageY;
	
	var rect = document.getElementById("myCanvas").getBoundingClientRect();
	canvasX = rect.left;
	canvasY = rect.top;
		
	midScreenPos[0] = screenPos[0] + rect.width / 2 + 0.5;
	midScreenPos[1] = screenPos[1] + rect.height / 2 + 0.5;
	drawColor = '#ffffff';
	fillRect(0, 0, rect.width, rect.height);
	drawGridlines();

	drawPlanets();
	drawCrafts();
	drawKey();
	
	drawHighlightLocal();
	if($("#warnings:empty").length > 0){ //if there is at least 1 empty "#warnings"
		$("#warningSection").hide();
	}
	else{
		$("#warningSection").show();
	}
}

function drag(){
	dragPlanets();
	dragCrafts();
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
	drawAll();
}

function mouseRelease(){
	deselectAll();
}

function changeHeight(textbox){
	document.getElementById("myCanvas").height = textbox.value;
	drawAll();
}

function changeWidth(textbox){
	document.getElementById("myCanvas").width = textbox.value;
	drawAll();
}

function detectLeftButton(event) {
    if ('buttons' in event) {
        return event.buttons === 1;
    } else if ('which' in event) {
        return event.which === 1;
    } else {
        return event.button === 1;
    }
}