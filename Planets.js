var planetNames = ["Su", "Mo", "Ev", "Gi", "Ke", "Mu", "Mi", "Du", "Ik", "Dr", "Jo", "La", "Ty", "Va", "Bo", "Po", "Ee"];
var planetFullNames = ["Sun-Kerbol", "Moho", "Eve", "Gilly", "Kerbin", "Mun", "Minmus", "Duna", "Ike", "Dres", "Jool", "Laythe", "Tylo", "Vall", "Bop", "Pol", "Eeloo"];
var planetFillColors = ['#ffe91f', '#a87316', '#7e4185', '#856e41', '#4f81bd', '#8f8e8e', '#92ff8a', '#ab2c2c', '#2e2e2e', '#7a7a7a', '#60cf4a', '#2b9cff', '#d6d6d6', '#9cced6', '#634734', '#cfab36', '#ffffff'];
var planetFringeColors = ['#ad9e15', '#5e4617', '#4d2852', '#473b23', '#0056bd', '#5c5b5b', '#62ab5c', '#571616', '#000000', '#404040', '#418c32', '#1e6cb0', '#ababab', '#7ea7ad', '#3b2a1f', '#997e28', '#a8a8a8'];

var planetHierarchyIndexes = [0, 1, 1, 2, 1, 2, 2, 1, 2, 1, 1, 2, 2, 2, 2, 2, 1];
/* Above are preset values for planet mdoels*/

var planets = new Array();
var planetModels = new Array();
var planetShown = false; //whether the correct planet is shown
var planetModelShown = false;

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
	planetModelShown = false;
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
	currentPlanet.model.children.splice(currentPlanet.model.children.indexOf(currentPlanet), 1);
	updateSelector();
	currentPlanet = false;
}

function deletePlanetModelButton(button){
	if (planetModels.indexOf(currentPlanetModel) > 16){
		planetModels.splice(craftModels.indexOf(currentPlanetModel), 1);
		currentPlanetModel.children.forEach(function(entry) {
			entry.model = planetModels[0];
			planetModels[0].children.push(entry);
			entry.childId = entry.model.children.indexOf(entry);
		});
		planetShown = false;
		currentPlanetModel = false;
		updateSelector();
	}
}

function setPlanetModelToCurrent(ind){
	currentPlanet.model.children.splice(currentPlanet.model.children.indexOf(currentPlanet), 1);
	currentPlanet.model = currentPlanetModel;
	currentPlanetModel.children.push(currentPlanet);
	planetShown = false;
	currentPlanet.radius = 32 * Math.pow(2, -currentPlanet.model.hierarchyIndex);
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
			$("#planet").show();
			//document.getElementById("label1").innerHTML = currentPlanet.model.fullName  + " (Instance)";
			document.getElementById("label1").innerHTML = currentPlanet.model.fullName + " ("+ (currentPlanet.model.children.indexOf(currentPlanet) + 1) +")";
			$("#selPlanet").hide();
			$("#selPlanet2").hide();
			planetShown = true;
			document.getElementById("label6").innerHTML = "Model: " + currentPlanet.model.fullName;
		}
	}
	else{
		$("#planet").hide();
		$("#label1").hide();
		$("#selPlanet").show();
		planetShown = false;
	}
	
	if (currentPlanetModel){
		if (currentPlanetModel != currentPlanet.model){
			$("#label7").show();
		}
		else{
			$("#label7").hide();
		}
		if (!planetModelShown){
			if (planetModels.indexOf(currentPlanetModel) <= 16){
				document.getElementById("deletePlanetModelButton").style.color = "#808080";
			}
			else{
				document.getElementById("deletePlanetModelButton").style.color = "#000000";
			}
			updateSelector();
			$("#label0").show();
			$("#planet2").show();
			document.getElementById('color0').color.fromString(currentPlanetModel.fringeColor);
			document.getElementById('color1').color.fromString(currentPlanetModel.fillColor);
			document.getElementById('name1').value = currentPlanetModel.fullName;
			document.getElementById('abbr').value = currentPlanetModel.name;
			document.getElementById('ind').value = currentPlanetModel.hierarchyIndex;
			document.getElementById("label0").innerHTML = currentPlanetModel.fullName  + " (Model)";
			document.getElementById("label7").innerHTML = "Change to selected model: '" + currentPlanetModel.fullName + "'";
			$("#selPlanet2").hide();
			planetModelShown = true;
		}
	}
	else{
		$("#label7").hide();
		$("#planet2").hide();
		$("#label0").hide();
		$("#selPlanet2").show();
		planetModelShown = false;
	}
}

function ind(textbox){
	currentPlanetModel.hierarchyIndex = textbox.value;
	planets.forEach(function(entry) {
		entry.radius = 32 * Math.pow(2, -entry.model.hierarchyIndex);
	});
}

function name1(textbox){
	currentPlanetModel.fullName = document.getElementById('name1').value;
	//updateSelector();
	planetModelShown = false;
	planetShown = false;
}

function abbr(textbox){
	currentPlanetModel.name = document.getElementById('abbr').value;
}

function createPlanetModel(button){
	new PlanetModel("Un", 
		"Untitled Planet", 
		'#' + Math.round(Math.random() * 255 * 256 * 256).toString(16).toUpperCase(), 
		'#' + Math.round(Math.random() * 255 * 256 * 256).toString(16).toUpperCase(), 
		Math.round(Math.random() * 3 - 0.5));
	updateSelector();
}

function createPlanet(button, model){
	var c = new Planet(model);
	c.selected = true;
	currentPlanet = c;
	click = true;
	planetShown = false;
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
		entry.position[0] = rangify(entry.position[0], -midScreenPos[0], midScreenPos[0]);
		entry.position[1] = rangify(entry.position[1], -midScreenPos[1], midScreenPos[1]);
	});
}

function dragPlanets(){
	planets.forEach(function(entry) {
		if(entry.selected){
			entry.position[0] = locateMouseX() - midScreenPos[0];
			entry.position[1] = locateMouseY() - midScreenPos[1];
			snap(entry.position);
		}
	});
}

function distance(x1, y1, x2, y2){
   return Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));
};

function snap(pos){
	var vert = Number(document.getElementById("verticalSnap").value);
	if (vert > 0){
		pos[1] = vert * Math.round(pos[1] / vert);
	}
	var horiz = Number(document.getElementById("horizontalSnap").value);
	if (horiz > 0){
		pos[0] = horiz * Math.round(pos[0] / horiz);
	}
}