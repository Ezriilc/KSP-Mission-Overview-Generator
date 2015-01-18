var planetNames = ["Su", "Mo", "Ev", "Gi", "Ke", "Mu", "Mi", "Du", "Ik", "Dr", "Jo", "La", "Ty", "Va", "Po", "Bo", "Ee"];
var planetFullNames = ["Sun-Kerbol", "Moho", "Eve", "Gilly", "Kerbin", "Mun", "Minmus", "Duna", "Ike", "Dres", "Jool", "Laythe", "Tylo", "Vall", "Pol", "Bop", "Eeloo"];
var planetFillColors = ['#ffe91f', '#a87316', '#7e4185', '#856e41', '#4f81bd', '#8f8e8e', '#92ff8a', '#ab2c2c', '#2e2e2e', '#7a7a7a', '#60cf4a', '#2b9cff', '#d6d6d6', '#9cced6', '#cfab36', '#634734', '#ffffff'];
var planetFringeColors = ['#ad9e15', '#5e4617', '#4d2852', '#473b23', '#0056bd', '#5c5b5b', '#62ab5c', '#571616', '#000000', '#404040', '#418c32', '#1e6cb0', '#ababab', '#7ea7ad', '#997e28', '#3b2a1f', '#a8a8a8'];
var planetHierarchyIndexes = [0, 1, 1, 2, 1, 2, 2, 1, 2, 1, 1, 2, 2, 2, 2, 2, 1]; 
var planets = new Array();

var planetShown = false; //whether the correnct planet is shown
var planetMoreShown = false;

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
	this.radius = 32 * Math.pow(2, -planetHierarchyIndexes[id]);
	planets.push(this);
	this.selected = false;
}

function deletePlanetButton(button){
    planets.splice(planets.indexOf(currentPlanet), 1);
	currentPlanet = false;
}

function drawPlanets(){
	lineWidth = 3;
	planets.forEach(function(entry) {
		drawColor = entry.fillColor;
		fillCircleLocal(entry.position[0], entry.position[1], entry.radius);
		drawColor = entry.fringeColor;
		drawCircleLocal(entry.position[0], entry.position[1], entry.radius);
	});
	
	if (currentPlanet){
		if (!planetShown){
			$("#label1").remove();
			$("#planet").show();
			document.getElementById('color0').color.fromString(currentPlanet.fringeColor);
			document.getElementById('color1').color.fromString(currentPlanet.fillColor);
			document.getElementById('name1').value = currentPlanet.fullName;
			document.getElementById('abbr').value = currentPlanet.name;
			document.getElementById('ind').value = planetHierarchyIndexes[currentPlanet.id];
		
			$label1 = $("<h1 id = 'label1'>" + currentPlanet.fullName + "</h1>");
			$("#planetColor").after($label1);
			$("#planetColor").hide();
			planetShown = true;
			$("#planetModelSelector").val(currentPlanet.id);
				
			//alert(planetNames.length);
			//alert(planetFullNames.length);
			//alert(planetFillColors.length);
			//alert(planetFringeColors.length);
			//alert(planetHierarchyIndexes.length);
			
		}
	}
	else{
		$("#planet").hide();
		$("#label1").remove();
		$("#planetColor").show();
		planetShown = false;
	}
}

function ind(textbox){
	planetHierarchyIndexes[currentPlanet.id] = textbox.value
	toolbar[1].subbar[currentPlanet.id].x = toolbar[1].x + planetHierarchyIndexes[currentPlanet.id]* 12;
	if (currentPlanet.id > 16){toolbar[1].subbar[currentPlanet.id].x +=128;}
	planets.forEach(function(entry) {
		entry.radius = 32 * Math.pow(2, -planetHierarchyIndexes[entry.id]);
	});
}

function name1(textbox){
	planetFullNames[currentPlanet.id] = document.getElementById('name1').value;
	currentPlanet.fullName = planetFullNames[currentPlanet.id];
	toolbar[1].subbar[currentPlanet.id].label = planetFullNames[currentPlanet.id];
			
	for (var x = planetFullNames.length; x > -1; x--){
		document.getElementById("planetModelSelector").remove(x);
	}
	planetFullNames.forEach(function(entry) {
		$("#planetModelSelector").append("<option value='" + planetFullNames.indexOf(entry) + "'>" + entry + "</option>");
	});
	$("#planetModelSelector").val(currentPlanet.id);
			
	planetShown = false;
}

function abbr(textbox){
	planetNames[currentCraft.id] = document.getElementById('abbr').value;
	currentPlanet.name = planetNames[currentCraft.id];
}

function createPlanetModel(button){

	planetNames.push("Un");
	planetFullNames.push("Untitled Planet");
	planetFillColors.push('#' + Math.round(Math.random() * 255 * 256 * 256).toString(16).toUpperCase());
	planetFringeColors.push('#' + Math.round(Math.random() * 255 * 256 * 256).toString(16).toUpperCase());
	planetHierarchyIndexes.push(Math.round(Math.random() * 3 - 0.5));
	$("#planetModelSelector").append("<option value='" + (planetFullNames.length - 1) + "'>" + "Untitled Planet" + "</option>");
	
	var v = new Button(toolbar[1].x + 128, (toolbar[1].subbar.length - 17) * 16 + 16, 128, 16, planetFullNames[toolbar[1].subbar.length]);
	v.parent = toolbar[1];
	v.pid = toolbar[1].subbar.length; //one more than the highest
	v.color = planetFringeColors[v.pid];
	v.x += planetHierarchyIndexes[v.pid]* 12;
	v.onClicked = function() {
		new Planet(this.pid);
		this.parent.hideSubbar();
	};
	toolbar[1].subbar.push(v);
}

function planetModelSelector(selector){
	currentPlanet.name = planetNames[selector.value];
	currentPlanet.fullName = planetFullNames[selector.value];
	currentPlanet.fillColor = planetFillColors[selector.value];
	currentPlanet.fringeColor = planetFringeColors[selector.value];
	currentPlanet.radius = 32 * Math.pow(2, -planetHierarchyIndexes[selector.value]);
	currentPlanet.id = selector.value;
	planetShown = false;
}

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

function initiatePlanets(){
	$("#planetMore").hide();
	planetFullNames.forEach(function(entry) {
		$("#planetModelSelector").append("<option value='" + planetFullNames.indexOf(entry) + "'>" + entry + "</option>");
	});
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