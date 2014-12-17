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