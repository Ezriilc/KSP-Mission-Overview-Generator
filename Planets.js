//import System.Collections.Generic;

var planetNames = ["Su", "Mo", "Ev", "Gi", "Ke", "Mu", "Mi", "Du", "Ik", "Dr", "Jo", "La", "Ty", "Va", "Po", "Bo", "Ee"];
var planetFullNames = ["Sun-Kerbol", "Moho", "Eve", "Gilly", "Kerbin", "Mun", "Minmus", "Duna", "Ike", "Dres", "Jool", "Laythe", "Tylo", "Vall", "Pol", "Bop", "Eeloo"];
var planetFillColors = ['#ffe91f', '#a87316', '#7e4185', '#856e41', '#4f81bd', '#8f8e8e', '#92ff8a', '#ab2c2c', '#2e2e2e', '#7a7a7a', '#60cf4a', '#2b9cff', '#d6d6d6', '#9cced6', '#cfab36', '#634734', '#ffffff'];
var planetFringeColors = ['#ad9e15', '#5e4617', '#4d2852', '#473b23', '#0056bd', '#5c5b5b', '#62ab5c', '#571616', '#000000', '#404040', '#418c32', '#1e6cb0', '#ababab', '#7ea7ad', '#997e28', '#3b2a1f', '#a8a8a8'];
var planetHierarchyIndexes = [0, 1, 1, 2, 1, 2, 2, 1, 2, 1, 1, 2, 2, 2, 2, 2, 1]; 
var planets = new Array();

function Planet(id) {
	this.id = id;
    this.name = planetNames[id];
	this.fullName = planetFullNames[id];
	
    //this.fillColor = '#' + Math.round(Math.random() * 255 * 256 * 256).toString(16).toUpperCase();	
	//this.fringeColor = '#' + Math.round(Math.random() * 255 * 256 * 256).toString(16).toUpperCase();	
	this.fillColor = planetFillColors[id];	
	this.fringeColor = planetFringeColors[id];		
	//this.fillColor = fillColor;
	//this.fringeColor = fringeColor;		
	
    this.position = [0, 0];
	this.radius = 16;
	planets.push(this);
	this.selected = false;
}

function drawPlanets(){
	lineWidth = 3;
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
			setPlanet(entry);
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