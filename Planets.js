//import System.Collections.Generic;

var planetNames = ["Mo", "Ev", "Gi", "Ke", "Mu", "Mi", "Du", "Ik", "Dr", "Jo", "La", "Ty", "Va", "Po", "Bo", "Ee"];
var planetFillColors = ['', '', '', '#4F81BD'];
var planetFringeColors = ['', '', '', '#0056BD'];
var planets = new Array();

function Planet(name, fillColor, fringeColor) {
    this.name = name;
	
    //this.fillColor = '#' + Math.round(Math.random() * 255 * 256 * 256).toString(16).toUpperCase();	
	//this.fringeColor = '#' + Math.round(Math.random() * 255 * 256 * 256).toString(16).toUpperCase();	
	//this.fillColor = planetFillColors[3];	
	//this.fringeColor = planetFringeColors[3];		
	this.fillColor = fillColor;
	this.fringeColor = fringeColor;		
	
    this.position = [0, 0];
	this.radius = 16;
	planets.push(this);
	this.selected = false;
}

function drawPlanets(){
	planets.forEach(function(entry) {
		drawColor = entry.fillColor;
		fillCircleLocal(entry.position[0], entry.position[1], entry.radius);
		drawColor = entry.fringeColor;
		drawCircleLocal(entry.position[0], entry.position[1], entry.radius);
	});
}

function selectPlanets(){
	planets.forEach(function(entry) {
		if(distance(entry.position[0] + midScreenPos[0], entry.position[1] + midScreenPos[1], locateMouseX(), locateMouseY()) < entry.radius){
			deselectPlanets(); //deselectAll results in a craft deselection glitch
			entry.selected = true;
		}
	});
}

function deselectPlanets(){
	planets.forEach(function(entry) {
		entry.selected = false;
	});
}

function dragPlanets(){
	planets.forEach(function(entry) {
		if(entry.selected){
			entry.position[0] = locateMouseX() - midScreenPos[0];
			entry.position[1] = locateMouseY() - midScreenPos[1];
		}
		if (!mode){
			snapToLane(entry);
		}
	});
}

function distance(x1, y1, x2, y2){
   return Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));
};

function snapToLane(planet){
	planet.position[1] = laneWidth * Math.round(planet.position[1] / laneWidth);
}