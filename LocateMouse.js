var pageMouseX = 0;
var pageMouseY = 0;

var canvasX = 0;
var canvasY = 0;

function locateMouseX(){
	return pageMouseX - window.scrollX - canvasX;
}

function locateMouseY(){
	return pageMouseY - window.scrollY - canvasY;
}

function containsMouse(x, y, width, height){
	return locateMouseX() >= x + midScreenPos[0] && locateMouseX() <= x + midScreenPos[0] + width &&
			locateMouseY() >= y + midScreenPos[1] && locateMouseY() <= y + midScreenPos[1] + height;
}

function containsMouseGlobal(x, y, width, height){
	var px = pageMouseX - window.scrollX;
	var py = pageMouseY - window.scrollY;
	return px >= x && px <= x + width &&
			py >= y && py <= y + height;
}