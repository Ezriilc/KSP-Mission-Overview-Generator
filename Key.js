var keyX = -600;
var keyY = -64;
var keyWidth = 512;
var keyHeight = 128;
var keySelected = false;
var keyBorderWidth = 1.5;
var selectedBorders = [false, false, false, false];
var keyGrabX = 0;
var keyGrabY = 0;
var keyFont = '18pt Calibri';
var keyFontSize = 18;
var keyLineLength = 32;

function drawKey(){
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	
	drawColor = '#ffffff'
	roundedRectLocal(keyX, keyY, keyWidth, keyHeight, 4, true);
	drawColor = '#000000'
	lineWidth = keyBorderWidth * 2;
	if (keyWidth < 8 || keyHeight < 8){
		drawColor = '#ff0000'
	}
	roundedRectLocal(keyX, keyY, keyWidth, keyHeight, 4, false);

	var itX = 1;
	var itY = 0;
	
	crafts.forEach(function() {
		if (itX * keyFontSize + 4 > keyHeight - 4){
			itX = 1;
			itY ++;
		}
		itX++;
	});
	
	var spaceX = keyWidth / (itY + 1);
	itX = 1;
	itY = 0;

	crafts.forEach(function(entry) {
		if (itX * keyFontSize + 4 > keyHeight - 4){
			itX = 1;
			itY ++;
		}
		
		var wCol = entry.color;
		drawColor = entry.color;
		if(containsMouse(keyX + spaceX * itY, keyY + (itX - 1) * keyFontSize + 4, spaceX, keyFontSize)){
			roundedRectLocal(keyX + 2 + spaceX * itY, keyY + (itX - 1) * keyFontSize + 4, spaceX - 6, keyFontSize + 2, 4, true);
			wCol = '#ffffff';
			drawColor = '#ffffff';
		}
		else if (entry.selected){
			roundedRectLocal(keyX + 8 + keyLineLength + spaceX * itY, keyY + (itX - 1) * keyFontSize + 4, spaceX - 12 - keyLineLength, keyFontSize + 2, 4, true);
			wCol = '#ffffff';
		}

		lineWidth = entry.lineWidth;
		drawLineLocal(keyX + 4 + spaceX * itY, keyY + itX * keyFontSize + 4 - keyFontSize/2, keyX + 4 + keyLineLength + spaceX * itY, keyY + itX * keyFontSize + 4 - keyFontSize/2);
		context.fillStyle = wCol;
		context.font = keyFont;
		context.fillText(entry.name, keyX + midScreenPos[0] + 8 + keyLineLength + spaceX * itY, keyY + midScreenPos[1] + itX * keyFontSize + 4);
		itX++;
		
		
	});
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
	if (keyWidth < 8) {keyWidth = 8;}
	if (keyHeight < 8) {keyHeight = 8;}
}