var keyX = -128;
var keyY = 64;
var keyWidth = 256;
var keyHeight = 128;
var keySelected = false;
var keyBorderWidth = 1.5;
var selectedBorders = [false, false, false, false];
var keyGrabX = 0;
var keyGrabY = 0;
var keyFont = '16pt Calibri';
var keyFontSize = 16;
var keyLineLength = 16;

function drawKey(){ /* TEXT WRAPPING CODE START*/
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	
	var minStringWidth = 0;
	context.font = keyFont;

	var itX = 1; //(misnamed): current number of items so far in the y direction (in this column)
	var itY = 0; //(misnamed): current number of columns so far in the x direction
	
	var shouldDraw = false;
	
	planetModels.forEach(function(entry) { /*START code that counts number of items to draw and determines how many columns to divide them into*/
		shouldDraw = false;
		planets.forEach(function(ent) { //check whether an instance of this model exists
			if (ent.model == entry){shouldDraw = true;}
		});
		
		if (shouldDraw){
		
			minStringWidth = Math.max(minStringWidth, context.measureText(entry).width);
			
			if (itX * keyFontSize + 4 > keyHeight - 4){
				itX = 1;
				itY ++;
			}
			itX++;
		}
	});
	
	craftModels.forEach(function(entry) {
	
		shouldDraw = false;
	
		crafts.forEach(function(ent) {
			if (ent.model == entry){shouldDraw = true;}
		});
		
		if (shouldDraw){
			minStringWidth = Math.max(minStringWidth, context.measureText(entry.name).width);
			if (itX * keyFontSize + 4 > keyHeight - 4){
				itX = 1;
				itY ++;
			}
			itX++;
		}
	}); /*END code that counts number of items to draw and determines how many columns to divide them into*/
	
	var spaceX = keyWidth / (itY + 1); //width of each column
	itX = 1; //reset iteration variables to actually draw key
	itY = 0;
	
	drawColor = '#ffffff' //key fill color
	roundedRectLocal(keyX, keyY, keyWidth, keyHeight, 4, true);//fill key with white
	drawColor = '#000000' //key border color
	if (spaceX < minStringWidth + keyLineLength + 8|| keyHeight < keyFontSize + 8){
		drawColor = '#ff0000'//if the key is too small for contents, change the border color to red
	}
	lineWidth = keyBorderWidth * 2;
	roundedRectLocal(keyX, keyY, keyWidth, keyHeight, 4, false);//draw border around key
	
	planetModels.forEach(function(entry) {
		shouldDraw = false;
		planets.forEach(function(ent) {
			if (ent.model == entry){shouldDraw = true;}
		});

		if (shouldDraw){
			if (itX * keyFontSize + 4 > keyHeight - 4){
				itX = 1;
				itY ++;
			}
		
			var wCol = entry.fringeColor;
			drawColor = entry.fringeColor;
			context.fillStyle = wCol;
			context.font = keyFont;
			context.fillText(entry.fullName, keyX + midScreenPos[0] + 8 + keyLineLength + spaceX * itY, keyY + midScreenPos[1] + itX * keyFontSize + 4);
		
			drawColor = entry.fillColor;
			fillCircleLocal(keyLineLength / 2 + keyX + 4 + spaceX * itY, keyY + itX * keyFontSize + 4 - keyFontSize/2, keyFontSize / 2 - 4);
			drawColor = entry.fringeColor;
			drawCircleLocal(keyLineLength / 2 + keyX + 4 + spaceX * itY, keyY + itX * keyFontSize + 4 - keyFontSize/2, keyFontSize / 2 - 4);

			itX++;
		}
	});
	craftModels.forEach(function(entry) {
	
		shouldDraw = false;
	
		crafts.forEach(function(ent) {
			if (ent.model == entry){shouldDraw = true;}
		});
		
		if (shouldDraw){
			if (itX * keyFontSize + 4 > keyHeight - 4){
				itX = 1;
				itY ++;
			}
		
			var wCol = entry.color;
			drawColor = entry.color;
			lineWidth = entry.lineWidth;
			drawLineLocal(keyX + 4 + spaceX * itY, keyY + itX * keyFontSize + 4 - keyFontSize/2, keyX + 4 + keyLineLength + spaceX * itY, keyY + itX * keyFontSize + 4 - keyFontSize/2);
			context.fillStyle = wCol;
			context.font = keyFont;
			context.fillText(entry.name, keyX + midScreenPos[0] + 8 + keyLineLength + spaceX * itY, keyY + midScreenPos[1] + itX * keyFontSize + 4);
			itX++;
		}
	});
	context.fillStyle = '#000000';
	context.fillText("Key", keyX + midScreenPos[0], keyY + midScreenPos[1] - (keyFontSize/2));
}/* TEXT WRAPPING CODE END*/

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
	
	if (keySelected || selectedBorders[0] || selectedBorders[1] || selectedBorders[2] || selectedBorders[3]){
		var p = [keyX, keyY];
		snap(p);
		keyX = p[0]; keyY = p[1];
		
		p = [keyWidth, keyHeight];
		snap(p);
		keyWidth = p[0]; keyHeight = p[1];
	}
}

function selectKey(){
	if(containsMouse(keyX + keyBorderWidth, keyY + keyBorderWidth, keyWidth - keyBorderWidth, keyHeight - keyBorderWidth)){
		keyGrabX = locateMouseX() - midScreenPos[0] - keyX;
		keyGrabY = locateMouseY() - midScreenPos[1] - keyY;
		deselectAll();
		keySelected = true;
	}
	if(containsMouse(keyX - keyBorderWidth, keyY - keyBorderWidth, keyBorderWidth * 2, keyHeight + keyBorderWidth)){
		selectedBorders[0] = true;
		keySelected = false;
	}
	if(containsMouse(keyX - keyBorderWidth, keyY - keyBorderWidth, keyWidth + keyBorderWidth, keyBorderWidth * 2)){
		selectedBorders[1] = true;
		keySelected = false;
	}
	if(containsMouse(keyX + keyWidth - keyBorderWidth, keyY - keyBorderWidth, keyBorderWidth * 2, keyHeight + keyBorderWidth)){
		selectedBorders[2] = true;
		keySelected = false;
	}
	if(containsMouse(keyX - keyBorderWidth, keyY + keyHeight - keyBorderWidth, keyWidth + keyBorderWidth, keyBorderWidth * 2)){
		selectedBorders[3] = true;
		keySelected = false;
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