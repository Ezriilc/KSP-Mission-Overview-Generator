//var planetNames = ["Su", "Mo", "Ev", "Gi", "Ke", "Mu", "Mi", "Du", "Ik", "Dr", "Jo", "La", "Ty", "Va", "Po", "Bo", "Ee"];
//var planetFullNames = ["Sun-Kerbol", "Moho", "Eve", "Gilly", "Kerbin", "Mun", "Minmus", "Duna", "Ike", "Dres", "Jool", "Laythe", "Tylo", "Vall", "Pol", "Bop", "Eeloo"];
//var planetFillColors = ['#ffe91f', '#a87316', '#7e4185', '#856e41', '#4f81bd', '#8f8e8e', '#92ff8a', '#ab2c2c', '#2e2e2e', '#7a7a7a', '#60cf4a', '#2b9cff', '#d6d6d6', '#9cced6', '#cfab36', '#634734', '#ffffff'];
//var planetFringeColors = ['#ad9e15', '#5e4617', '#4d2852', '#473b23', '#0056bd', '#5c5b5b', '#62ab5c', '#571616', '#000000', '#404040', '#418c32', '#1e6cb0', '#ababab', '#7ea7ad', '#997e28', '#3b2a1f', '#a8a8a8'];
/*Bakcup values above: Bop and Pol switched*/

var planetNames = ["Su", "Mo", "Ev", "Gi", "Ke", "Mu", "Mi", "Du", "Ik", "Dr", "Jo", "La", "Ty", "Va", "Bo", "Po", "Ee"];
var planetFullNames = ["Sun-Kerbol", "Moho", "Eve", "Gilly", "Kerbin", "Mun", "Minmus", "Duna", "Ike", "Dres", "Jool", "Laythe", "Tylo", "Vall", "Bop", "Pol", "Eeloo"];
var planetFillColors = ['#ffe91f', '#a87316', '#7e4185', '#856e41', '#4f81bd', '#8f8e8e', '#92ff8a', '#ab2c2c', '#2e2e2e', '#7a7a7a', '#60cf4a', '#2b9cff', '#d6d6d6', '#9cced6', '#634734', '#cfab36', '#ffffff'];
var planetFringeColors = ['#ad9e15', '#5e4617', '#4d2852', '#473b23', '#0056bd', '#5c5b5b', '#62ab5c', '#571616', '#000000', '#404040', '#418c32', '#1e6cb0', '#ababab', '#7ea7ad', '#3b2a1f', '#997e28', '#a8a8a8'];

var planetHierarchyIndexes = [0, 1, 1, 2, 1, 2, 2, 1, 2, 1, 1, 2, 2, 2, 2, 2, 1]; 
/* Above are preset values for planet mdoels*/

var planets = new Array();
var planetModels = new Array();
var planetShown = false; //whether the correct planet is shown
var planetMoreShown = false;

function PlanetModel(name, fullName, fillColor, fringeColor, hierarchyIndex) {
    this.name = name;
	this.fullName = fullName;
	
	this.fillColor = fillColor;
	this.fringeColor = fringeColor;
	this.hierarchyIndex = hierarchyIndex;
	
	planetModels.push(this);
	this.children = new Array();
	
	updateSelector();
}

function initiatePlanets(){
	for (var x = 0; x < 17; x++){
		new PlanetModel(planetNames[x], planetFullNames[x], planetFillColors[x], planetFringeColors[x], planetHierarchyIndexes[x]);
	}
}

function resetPlanetModels(button){
	for (var x = 0; x < 17; x++){
		planetModels[x].name = planetNames[x]; 
		planetModels[x].fullName = planetFullNames[x]; 
		planetModels[x].fillColor = planetFillColors[x];
		planetModels[x].fringeColor = planetFringeColors[x];
		planetModels[x].hierarchyIndex = planetHierarchyIndexes[x];
	}
	planets.forEach(function(entry) {
		entry.radius = 32 * Math.pow(2, -entry.model.hierarchyIndex);
	});
	planetShown = false;
	updateSelector();
}

function Planet(model){
	this.model = model;
	
	this.position = [0, 0];
	this.radius = 32 * Math.pow(2, -model.hierarchyIndex);
	planets.push(this);
	
	this.selected = false;
	model.children.push(this);
	this.childId = model.children.indexOf(this);
}

function deletePlanetButton(button){
    planets.splice(planets.indexOf(currentPlanet), 1);
	currentPlanet = false;
}

function planetRecenterButton(button){
	currentPlanet.position[0] = 0;
	currentPlanet.position[1] = 0;
}

function drawPlanets(){
	lineWidth = 3;
	planets.forEach(function(entry) {
		drawColor = entry.model.fillColor;
		fillCircleLocal(entry.position[0], entry.position[1], entry.radius);
		drawColor = entry.model.fringeColor;
		drawCircleLocal(entry.position[0], entry.position[1], entry.radius);
	});
	
	if (currentPlanet){
		if (!planetShown){
			updateSelector();
			$("#label1").show();
			$("#label0").show();
			$("#planet").show();
			$("#planet2").show();
			document.getElementById('color0').color.fromString(currentPlanet.model.fringeColor);
			document.getElementById('color1').color.fromString(currentPlanet.model.fillColor);
			document.getElementById('name1').value = currentPlanet.model.fullName;
			document.getElementById('abbr').value = currentPlanet.model.name;
			document.getElementById('ind').value = currentPlanet.model.hierarchyIndex;
			document.getElementById("label1").innerHTML = currentPlanet.model.fullName  + " (Instance)";
			document.getElementById("label0").innerHTML = currentPlanet.model.fullName  + " (Model)";
			$("#selPlanet").hide();
			$("#selPlanet2").hide();
			planetShown = true;
		}
	}
	else{
		$("#planet").hide();
		$("#planet2").hide();
		$("#label1").hide();
		$("#label0").hide();
		$("#selPlanet").show();
		$("#selPlanet2").show();
		planetShown = false;
	}
}

function ind(textbox){
	currentPlanet.model.hierarchyIndex = textbox.value;
	planets.forEach(function(entry) {
		entry.radius = 32 * Math.pow(2, -entry.model.hierarchyIndex);
	});
}

function name1(textbox){
	currentPlanet.model.fullName = document.getElementById('name1').value;
	updateSelector();
	planetShown = false;
}

function abbr(textbox){
	currentPlanet.model.name = document.getElementById('abbr').value;
}

function createPlanetModel(button){
	new PlanetModel("Un", 
		"Untitled Planet", 
		'#' + Math.round(Math.random() * 255 * 256 * 256).toString(16).toUpperCase(), 
		'#' + Math.round(Math.random() * 255 * 256 * 256).toString(16).toUpperCase(), 
		Math.round(Math.random() * 3 - 0.5));
	updateSelector();
}

/*function planetModelSelector(selector){
	currentPlanet.name = planetNames[selector.value];
	currentPlanet.fullName = planetFullNames[selector.value];
	currentPlanet.fillColor = planetFillColors[selector.value];
	currentPlanet.fringeColor = planetFringeColors[selector.value];
	currentPlanet.radius = 32 * Math.pow(2, -planetHierarchyIndexes[selector.value]);
	currentPlanet.id = selector.value;
	planetShown = false;
}*/

function planetMoreButton(button){
	if (planetMoreShown){
		button.value = "Show Model Options";
		$("#planetMore").hide();
	}
	else{
		button.value = "Hide Model Options";
		$("#planetMore").show();
	}
	planetMoreShown = !planetMoreShown;
}

function selectPlanets(){
	planets.forEach(function(entry) {
		if(distance(entry.position[0] + midScreenPos[0], entry.position[1] + midScreenPos[1], locateMouseX(), locateMouseY()) < entry.radius){
			deselectAll();
			entry.selected = true;
			currentPlanet = entry;
			planetShown = false;
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