var crafts = new Array();

function Craft(name, color, lineWidth) {
    this.name = name;
	
	this.color = color;
	this.lineWidth = lineWidth;		
	
    this.position = [0, 0];
	this.radius = 4;
	crafts.push(this);
	
	this.where = 0; //0: on planet
	
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
	crafts.forEach(function(entry) {
		if(distance(entry.position[0] + midScreenPos[0], entry.position[1] + midScreenPos[1], locateMouseX(), locateMouseY()) < entry.radius){
			if (!entry.selected){
				deselectAll();
				entry.selected = true;
			}
			else{
				deselectAll();
			}	
		}
	});
}
function deselectCrafts(){
	crafts.forEach(function(entry) {
		entry.selected = false;
	});
}