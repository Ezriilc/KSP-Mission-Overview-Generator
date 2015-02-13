var craftModels = new Array();
var crafts = new Array();
var craftShown = false; //whether the correct craft editing menu is shown
var craftModelShown = false;

function CraftModel(name, color, lineWidth) {
    this.name = name;
	
	this.color = color;
	this.lineWidth = lineWidth;	
	
	craftModels.push(this);
	this.children = new Array();
	
	updateSelector();
}

function Craft(model) {
    this.model = model;
	
	this.type = 0;//0: transfer, 1: landing, 2: ascent, 3: orbit, 4: flyby
	
	this.radius = model.lineWidth * 2;
	
    this.startPosition = [0, 0];
	this.endPosition = [0, -64];
	crafts.push(this);
	
	this.startSelected = false;
	this.endSelected = false;
	
	this.arrows = 0;
	
	model.children.push(this);
	this.childId = model.children.indexOf(this);
	
	this.prevCraft = false;
	this.nextCraft = false;
	
	this.parentPlanet = false;
}

function craftRecenterButton(button){
	currentCraft.startPosition = [0, 0];
	currentCraft.endPosition = [0, -64];
}

function initiateCrafts(){
	$("#craftMore").hide();
}

function setCraftType(selector){
	currentCraft.type = Number($("#typeSel").val().substring(1, 2));
}

function setCraftArrows(selector){
	currentCraft.arrows = Number($("#arrSel").val().substring(1, 2));
	if (currentCraft.arrows == 3){
		selector.style.color = "green";
	}
	else{
		selector.style.color = "black";
	}
}

function deleteCraftButton(button){
	crafts.splice(crafts.indexOf(currentCraft), 1);
	currentCraft.model.children.splice(currentCraft.model.children.indexOf(currentCraft), 1);
	updateSelector();
	currentCraft = false;
}

function deleteCraftModelButton(button){
	if (craftModels.length != 1){
		craftModels.splice(craftModels.indexOf(currentCraftModel), 1);
		currentCraftModel.children.forEach(function(entry) {
			entry.model = craftModels[0];
			craftModels[0].children.push(entry);
			entry.childId = entry.model.children.indexOf(entry);
		});
		craftShown = false;
		currentCraftModel = false;
		updateSelector();
	}
}

function setCraftModelToCurrent(ind){
	currentCraft.model.children.splice(currentCraft.model.children.indexOf(currentCraft), 1);
	currentCraft.model = currentCraftModel;
	currentCraftModel.children.push(currentCraft);
	craftShown = false;
}

function setCraftPlanetToCurrent(should){
	if (should){
		currentCraft.parentPlanet = currentPlanet;
	}
	else{
		currentCraft.parentPlanet = false;
	}
	craftShown = false;
}

function drawArrowhead(to, from, headLength){
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	var tox = to[0] + midScreenPos[0]; var toy = to[1] + midScreenPos[1];
	var fromx = from[0] + midScreenPos[0]; var fromy = from[1] + midScreenPos[1];
	var angle = Math.atan2(toy-fromy,tox-fromx);
	context.beginPath();
	context.moveTo(tox-headLength*Math.cos(angle-Math.PI/6),toy-headLength*Math.sin(angle-Math.PI/6));
	context.lineTo(tox, toy);
	context.lineTo(tox-headLength*Math.cos(angle+Math.PI/6),toy-headLength*Math.sin(angle+Math.PI/6));
	context.stroke();
}

function drawFlyby(entry){
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	if(entry.type == 4){
		if (entry.parentPlanet){
		entry.orbitHeight = distance(entry.endPosition[0], entry.endPosition[1], entry.parentPlanet.position[0], entry.parentPlanet.position[1]);
			if (planets.indexOf(entry.parentPlanet) == -1){
				entry.parentPlanet = false;
			}
		}
		else{
			$("#warnings").append("<li>Error: Flyby " + entry.model.name + " does not have a parent planet!</li>");
		}
	}
	if(entry.parentPlanet){
		var startAng = Math.atan2(entry.startPosition[1] - entry.parentPlanet.position[1], entry.startPosition[0] - entry.parentPlanet.position[0]);
		var endAng = Math.atan2(entry.endPosition[1] - entry.parentPlanet.position[1], entry.endPosition[0] - entry.parentPlanet.position[0]);
		
		var a = startAng - endAng;
		if (a > Math.PI){a-= Math.PI * 2;}
		if (a < -Math.PI){a+= Math.PI * 2;}
		
		if (Math.abs(a) < 0.01){
			$("#warnings").append("<li>Error: Flyby " + entry.model.name + " should not have the same start and end angles.</li>");
		}
		else if (Math.abs(a) > Math.PI - 0.01){
		context.arc(entry.parentPlanet.position[0] + midScreenPos[0], entry.parentPlanet.position[1] + midScreenPos[1], entry.orbitHeight, 
			Math.atan2(entry.endPosition[1] - entry.parentPlanet.position[1], entry.endPosition[0] - entry.parentPlanet.position[0]),
			Math.atan2(entry.startPosition[1] - entry.parentPlanet.position[1], entry.startPosition[0] - entry.parentPlanet.position[0]));
		}
		else if (a > 0){
		context.arc(entry.parentPlanet.position[0] + midScreenPos[0], entry.parentPlanet.position[1] + midScreenPos[1], entry.orbitHeight, 
			Math.atan2(entry.startPosition[1] - entry.parentPlanet.position[1], entry.startPosition[0] - entry.parentPlanet.position[0]),
			Math.atan2(entry.endPosition[1] - entry.parentPlanet.position[1], entry.endPosition[0] - entry.parentPlanet.position[0]));
		}
		else if (a < 0){
		context.arc(entry.parentPlanet.position[0] + midScreenPos[0], entry.parentPlanet.position[1] + midScreenPos[1], entry.orbitHeight, 
			Math.atan2(entry.endPosition[1] - entry.parentPlanet.position[1], entry.endPosition[0] - entry.parentPlanet.position[0]),
			Math.atan2(entry.startPosition[1] - entry.parentPlanet.position[1], entry.startPosition[0] - entry.parentPlanet.position[0]));
		}
	}
}

function drawOrbit(entry){
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	if(entry.type == 3){
		if (entry.parentPlanet){
		entry.startPosition = entry.parentPlanet.position.slice(0);
		entry.orbitHeight = distance(entry.endPosition[0], entry.endPosition[1], entry.parentPlanet.position[0], entry.parentPlanet.position[1]);
			if (planets.indexOf(entry.parentPlanet) == -1){
				entry.parentPlanet = false;
			}
		}
		else{
			$("#warnings").append("<li>Error: Orbit " + entry.model.name + " does not have a parent planet!</li>");
		}
	}
	if(entry.parentPlanet){
		context.arc(entry.parentPlanet.position[0] + midScreenPos[0], entry.parentPlanet.position[1] + midScreenPos[1], entry.orbitHeight, 0, Math.PI * 2);
	}
}

function drawAscentLanding(entry){
	if(entry.type == 1){
		if (entry.parentPlanet){
			entry.endPosition = entry.parentPlanet.position.slice(0);
			if (planets.indexOf(entry.parentPlanet) == -1){
				entry.parentPlanet = false;
			}
		}
		else{
			$("#warnings").append("<li>Error: Landing " + entry.model.name + " does not have a parent planet!</li>");
		}
	}
	if(entry.type == 2){
		if (entry.parentPlanet){
		entry.startPosition = entry.parentPlanet.position.slice(0);
			if (planets.indexOf(entry.parentPlanet) == -1){
				entry.parentPlanet = false;
			}
		}
		else{
			$("#warnings").append("<li>Error: Ascent " + entry.model.name + " does not have a parent planet!</li>");
		}
	}
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	context.moveTo(entry.startPosition[0] + midScreenPos[0], entry.startPosition[1] + midScreenPos[1]);
	context.lineTo(entry.endPosition[0] + midScreenPos[0], entry.endPosition[1] + midScreenPos[1]);
}

function chooseDraw(entry){
	if (entry.type == 4){
		drawFlyby(entry);
	}
	else if (entry.type == 3){
		drawOrbit(entry);
	}
	else{
		drawAscentLanding(entry);
	}
}

function drawCraft(entry){
		detectAdjacentCrafts();
	
		var canvas = document.getElementById("myCanvas");
		var context = canvas.getContext("2d");
		context.lineWidth = entry.model.lineWidth;
		context.strokeStyle = entry.model.color;

		//draw line or arc
		context.beginPath();
		chooseDraw(entry);
		context.strokeStyle = entry.model.color;
		context.stroke();
		
		//draw arrow or round end
		drawColor = entry.model.color;
		if (entry.type < 3){
			if(entry.arrows == 1 || entry.arrows == 2){
				drawArrowhead(entry.endPosition, entry.startPosition, entry.model.lineWidth * 4);
			}
			else{
				fillCircleLocal(entry.endPosition[0], entry.endPosition[1], entry.model.lineWidth / 2);
			}
			if(entry.arrows == 3 || entry.arrows == 2){
				drawArrowhead(entry.startPosition, entry.endPosition, entry.model.lineWidth * 4);
			}
			else{
				fillCircleLocal(entry.startPosition[0], entry.startPosition[1], entry.model.lineWidth / 2);
			}
		}
}

function drawCrafts(){
	//drawImageLocal(entry.endPosition[0] + entry.radius * 2, entry.endPosition[1], entry.radius * 3, entry.radius * 3, "arrow-right");
	crafts.forEach(function(entry) {
		drawCraft(entry);
	});
	
	if (currentCraft){
		lineWidth = currentCraft.model.lineWidth;
		drawColor = currentCraft.model.color;
		drawDiamondLocal(currentCraft.startPosition[0], currentCraft.startPosition[1], currentCraft.radius);
		drawCircleLocal(currentCraft.endPosition[0], currentCraft.endPosition[1], currentCraft.radius);
	}
	if(currentCraft.startSelected || currentCraft.endSelected){
		crafts.forEach(function(entry) {
			if (entry != currentCraft){
				drawColor = entry.model.color;
				//var points = getSnappingPoints(entry, currentCraft.startSelected || !canSnap(entry, currentCraft), currentCraft.endSelected || !canSnap(entry, currentCraft));
				var points = getSnappingPoints(entry, true, true);
				points.forEach(function(ent) {
					if(distance(ent[0] + midScreenPos[0], ent[1] + midScreenPos[1], locateMouseX(), locateMouseY()) < Number(document.getElementById("connectSnap").value)){
						lineWidth = 3;
					}
					else{
						lineWidth = 1;
					}
					drawCircleLocal(ent[0], ent[1], Number(document.getElementById("connectSnap").value));
				});
			}
			if((currentCraft.startSelected || currentCraft.endSelected) && canSnap(entry, currentCraft)){
				lineWidth = entry.model.lineWidth;;
				drawColor = entry.model.color;
				drawDiamondLocal(entry.startPosition[0], entry.startPosition[1], entry.radius);
				drawCircleLocal(entry.endPosition[0], entry.endPosition[1], entry.radius);
			}
		});
	}
	
	if (currentCraft){
		if (!craftShown){
			updateSelector();
			
			$("#label2").show();
			$("#craft").show();
			
			document.getElementById("label2").innerHTML = currentCraft.model.name  + " (Instance)";
			$("#selCraft").hide();
			craftShown = true;
			
			$("#typeSel").val("t" + currentCraft.type);
			
			$("#arrSel").val("a" + currentCraft.arrows);
			if (currentCraft.arrows == 3){
				document.getElementById("arrSel").style.color = "green";
			}
			else{
				document.getElementById("arrSel").style.color = "black";
			}
			
			if (currentCraft.parentPlanet){
				document.getElementById("label8").innerHTML = "Parent Planet: " + currentCraft.parentPlanet.model.fullName;
			}
			else{
				document.getElementById("label8").innerHTML = "Parent Planet: None";
			}
			document.getElementById("label4").innerHTML = "Model: " + currentCraft.model.name;
		}
	}
	else{
		$("#craft").hide();
		$("#label2").hide();
		$("#selCraft").show();
		craftShown = false;
	}
	if (currentCraftModel){
		if (currentCraftModel != currentCraft.model){
			$("#label5").show();
		}
		else{
			$("#label5").hide();
		}
		if (!craftModelShown){
			updateSelector();
			$("#label3").show();
			$("#craft2").show();
			document.getElementById('color2').color.fromString(currentCraftModel.color);
			document.getElementById('name2').value = currentCraftModel.name;
			document.getElementById('width2').value = currentCraftModel.lineWidth;
			document.getElementById("label5").innerHTML = "Change to selected model: '" + currentCraftModel.name + "'";
			document.getElementById("label3").innerHTML = currentCraftModel.name + " (Model)";
			$("#selCraft2").hide();
			craftModelShown = true;
		}
	}
	else{
		$("#craft2").hide();
		$("#label3").hide();
		$("#selCraft2").show();
		craftModelShown = false;
		$("#label5").hide();
	}
	
	if (currentPlanet){
		if (currentPlanet != currentCraft.parentPlanet){
			$("#label9").show();
			document.getElementById("label9").innerHTML = "Change to selected planet: '" + currentPlanet.model.fullName + "'";
		}
		else{
			$("#label9").hide();
		}
	}
	else{
		$("#label9").hide();
	}
}

function name2(textbox){
	currentCraftModel.name = document.getElementById('name2').value;
	document.getElementById("label2").innerHTML = currentCraft.model.name  + " (Instance)";
	craftModelShown = false;
	updateSelector();
}
function width2(textbox){
	if (Number(document.getElementById('width2').value) != NaN 
	&& Number(document.getElementById('width2').value) > 0){
		currentCraftModel.lineWidth = Number(document.getElementById('width2').value);
	}
	crafts.forEach(function(entry) {
		entry.radius = entry.model.lineWidth * 2;
	});
}

function createCraftModel(button){
	new CraftModel("Untitled Space Craft", '#' + Math.round(Math.random() * 255 * 256 * 256).toString(16).toUpperCase(), 3);
}

function selectCrafts(){
	if (currentCraft){
		if(distance(currentCraft.startPosition[0] + midScreenPos[0], currentCraft.startPosition[1] + midScreenPos[1], locateMouseX(), locateMouseY()) < currentCraft.radius){
			deselectAll();
			currentCraft.startSelected = true;
		}
		if(distance(currentCraft.endPosition[0] + midScreenPos[0], currentCraft.endPosition[1] + midScreenPos[1], locateMouseX(), locateMouseY()) < currentCraft.radius){
			deselectAll();
			currentCraft.endSelected = true;
		}
	}
	if (!currentCraft.startSelected && !currentCraft.endSelected){
		crafts.forEach(function(entry) {
			var tp = false;
			var v = 0;
			var m = [locateMouseX() - midScreenPos[0], locateMouseY() - midScreenPos[1]];
			if (entry.type < 3){
				tp = snapPointToLine(m, entry.startPosition, entry.endPosition);
			}
			else if (entry.type == 3){
				tp = snapPointToArc(m, entry.startPosition, entry.endPosition, entry.parentPlanet.position, false);
			}
			else{
				tp = snapPointToArc(m, entry.startPosition, entry.endPosition, entry.parentPlanet.position, true);
			}
			if (tp){
				var d = distance(m[0], m[1], tp[0], tp[1]);
				if (d < entry.model.lineWidth * 2){
					deselectAll();
					currentCraft = entry;
					craftShown = false;
				}
			}
		});
	}
}

function deselectCrafts(){
	crafts.forEach(function(entry) {
		entry.startSelected = false;
		entry.endSelected = false;
		crafts.forEach(function(entry2) {
		});
	});
	
	crafts.forEach(function(entry) {
		entry.startSelected = false;
		entry.endSelected = false;
	});
}

function dragCrafts(){
	crafts.forEach(function(entry) {
		if(entry.startSelected){
			entry.startPosition[0] = locateMouseX() - midScreenPos[0];
			entry.startPosition[1] = locateMouseY() - midScreenPos[1];
			snapToAdjacentCrafts(entry, true);
			detectAdjacentCrafts();
			snapToCrafts(entry, true);
			if (entry.prevCraft == false){
				if (entry.type == 0){
					snap(entry.startPosition);
				}
				else{
					radialSnap(entry.startPosition, entry.parentPlanet.position, entry.parentPlanet, true);
				}
			}
			if (entry.type == 4 && entry.parentPlanet){//flyby: keep start and end points at same altitude
				var startDist = distance(entry.startPosition[0], entry.startPosition[1], entry.parentPlanet.position[0], entry.parentPlanet.position[1]);
				var endDist = distance(entry.endPosition[0], entry.endPosition[1], entry.parentPlanet.position[0], entry.parentPlanet.position[1]);
				if (endDist <= 0){endDist = 1; entry.endPosition[0] += 1};
				if (startDist <= 0){startDist = 1;}
				entry.endPosition[0] = entry.parentPlanet.position[0] + ((entry.endPosition[0] - entry.parentPlanet.position[0]) / endDist * startDist);
				entry.endPosition[1] = entry.parentPlanet.position[1] + ((entry.endPosition[1] - entry.parentPlanet.position[1]) / endDist * startDist);
			}
		}
		if(entry.endSelected){
			entry.endPosition[0] = locateMouseX() - midScreenPos[0];
			entry.endPosition[1] = locateMouseY() - midScreenPos[1];
			snapToAdjacentCrafts(entry, false);
			detectAdjacentCrafts();
			snapToCrafts(entry, false);
			if (entry.nextCraft == false){
				if (entry.type == 0){
					snap(entry.endPosition);
				}
				else{
					radialSnap(entry.endPosition, entry.parentPlanet.position, entry.parentPlanet, true);
				}
			}
			if (entry.type == 4 && entry.parentPlanet){//flyby: keep start and end points at same altitude
				var startDist = distance(entry.startPosition[0], entry.startPosition[1], entry.parentPlanet.position[0], entry.parentPlanet.position[1]);
				var endDist = distance(entry.endPosition[0], entry.endPosition[1], entry.parentPlanet.position[0], entry.parentPlanet.position[1]);
				if (endDist <= 0){endDist = 1;}
				if (startDist <= 0){startDist = 1; entry.startPosition[0] += 1};
				entry.startPosition[0] = entry.parentPlanet.position[0] + ((entry.startPosition[0] - entry.parentPlanet.position[0]) / startDist * endDist);
				entry.startPosition[1] = entry.parentPlanet.position[1] + ((entry.startPosition[1] - entry.parentPlanet.position[1]) / startDist * endDist);
			}
		}
	});
}

function detectAdjacentCrafts(){
	crafts.forEach(function(entry) {
		entry.prevCraft = false;
		entry.nextCraft = false;
	});
	crafts.forEach(function(entry) {
		crafts.forEach(function(entry2) {
			if (canSnap(entry, entry2) && entry.startPosition[0] == entry2.endPosition[0] && entry.startPosition[1] == entry2.endPosition[1]){
				if (entry2.nextCraft){
					$("#warnings").append("<li>Welcome, Schrödinger.</li>");
				}
				if (entry.prevCraft){
					$("#warnings").append("<li>Welcome, Gersh Budker.</li>");
				}
				if (!entry2.nextCraft && !entry.prevCraft){
					entry.prevCraft = entry2;
					entry2.nextCraft = entry;
				}
			}
		});
	});
}