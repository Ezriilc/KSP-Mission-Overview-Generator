var crafts = new Array();

function Craft(name, color, lineWidth) {
    this.name = name;
	
	this.color = color;
	this.lineWidth = lineWidth;		
	
    this.position = [0, 0];
	this.radius = 4;
	crafts.push(this);
	
	this.selected = false;
}

function drawCrafts(){

	crafts.forEach(function(entry) {
	
		if (entry.selected){entry.radius = 8;}
		else{entry.radius = 4;}

		drawColor = '#ffffff';
		fillCircleLocal(entry.position[0], entry.position[1], entry.radius);
		drawColor = entry.color;
		drawCircleLocal(entry.position[0], entry.position[1], entry.radius);
		
		drawPath(entry);
	});
}

function drawPath(craft){}

function selectCrafts(){

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
		itX++;
		
		if(distance(entry.position[0] + midScreenPos[0], entry.position[1] + midScreenPos[1], locateMouseX(), locateMouseY()) < entry.radius
			|| containsMouse(keyX + spaceX * itY, keyY + (itX - 2) * keyFontSize + 4, spaceX, keyFontSize)){

			deselectPlanets();
			deselectCrafts();
			entry.selected = true;
		}
	});
}

function deselectCrafts(){
	crafts.forEach(function(entry) {
		entry.selected = false;
	});
}