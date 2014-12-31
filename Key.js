var keyX = 0;
var keyY = 0;
var keyWidth = 32;
var keyHeight = 32;
var keySelected = false;
var keyBorderWidth = 1.5;
var selectedBorders = [false, false, false, false];
var keyGrabX = 0;
var keyGrabY = 0;

function drawKey(){
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	
	drawColor = '#ffffff'
	roundedRectLocal(keyX, keyY, keyWidth, keyHeight, 4, true);
	drawColor = '#000000'
	lineWidth = keyBorderWidth * 2;
	roundedRectLocal(keyX, keyY, keyWidth, keyHeight, 4, false);
}

function dragKey(){
	if(keySelected){
		keyX = locateMouseX() - midScreenPos[0] - keyGrabX;
		keyY = locateMouseY() - midScreenPos[1] - keyGrabY;
	}
	if (selectedBorders[0]){
		var movDist = keyX - (locateMouseX() - midScreenPos[0]);
		keyX = locateMouseX() - midScreenPos[0];
		keyWidth += movDist;
	}
	if (selectedBorders[1]){
		var movDist = keyY - (locateMouseY() - midScreenPos[1]);
		keyY = locateMouseY() - midScreenPos[1];
		keyHeight += movDist;
	}
	if (selectedBorders[2]){
		keyWidth = -keyX + locateMouseX() - midScreenPos[0];
	}
	if (selectedBorders[3]){
		keyHeight = -keyY + locateMouseY() - midScreenPos[1];
	}
}

function selectKey(){
	if(containsMouse(keyX + keyBorderWidth, keyY + keyBorderWidth, keyWidth - keyBorderWidth, keyHeight - keyBorderWidth)){
		keySelected = true;
		keyGrabX = locateMouseX() - midScreenPos[0] - keyX;
		keyGrabY = locateMouseY() - midScreenPos[1] - keyY;
		deselectPlanets();
	}
	if(containsMouse(keyX - keyBorderWidth, keyY - keyBorderWidth, keyBorderWidth * 2, keyHeight + keyBorderWidth)){
		selectedBorders[0] = true;
		keySelected = false;
		deselectPlanets();
	}
	if(containsMouse(keyX - keyBorderWidth, keyY - keyBorderWidth, keyWidth + keyBorderWidth, keyBorderWidth * 2)){
		selectedBorders[1] = true;
		keySelected = false;
		deselectPlanets();
	}
	if(containsMouse(keyX + keyWidth - keyBorderWidth, keyY - keyBorderWidth, keyBorderWidth * 2, keyHeight + keyBorderWidth)){
		selectedBorders[2] = true;
		keySelected = false;
		deselectPlanets();
	}
	if(containsMouse(keyX - keyBorderWidth, keyY + keyHeight - keyBorderWidth, keyWidth + keyBorderWidth, keyBorderWidth * 2)){
		selectedBorders[3] = true;
		keySelected = false;
		deselectPlanets();
	}
}

function deselectKey(){
	keySelected = false;
	selectedBorders[0] = false;
	selectedBorders[1] = false;
	selectedBorders[2] = false;
	selectedBorders[3] = false;
}