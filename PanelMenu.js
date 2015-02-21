
var stringStyle = '12pt Calibri';
var stringMove = 14;

function initiateToolbar(){
	initiatePlanetButton();
	initiateCraftButton();
}
function updateSelector(){
	var x = window.scrollX;
	var y = window.scrollY;
	$('#craftModelSel').append($('#craftModelEdit'));
	$('#craftModelSel').append($('#craftEdit'));
	$("#craftSel").empty();
	var ind = 0;
	if (craftModels.length == 1){
		document.getElementById("deleteCraftModelButton").style.color = "#808080";
	}
	else{
		document.getElementById("deleteCraftModelButton").style.color = "#000000";
	}
	craftModels.forEach(function(entry) {
		if (currentCraftModel == entry){
			$("#craftSel").append("<section id = 'cmodelsec" + ind + "'><button onclick='currentCraftModel = false; craftModelShown = false; updateSelector();'><canvas id = 'cmodel" + ind + "'width = '200px' height = '" + (keyFontSize + 4) + "px'></canvas></button></section>");
		}
		else{
			$("#craftSel").append("<section id = 'cmodelsec" + ind + "'><button onclick='currentCraftModel = craftModels[" + ind + "]; craftModelShown = false;'><canvas id = 'cmodel" + ind + "'width = '200px' height = '" + (keyFontSize + 4) + "px'></canvas></button></section>");
		}
		var canvas = document.getElementById("cmodel" + ind);
		var context = canvas.getContext("2d");
		context.beginPath();
		context.moveTo(0, keyFontSize/2);
		context.lineTo(keyLineLength, keyFontSize/2);
		context.strokeStyle = entry.color;
		context.lineWidth = entry.lineWidth;
		context.stroke();
		
		context.fillStyle = entry.color;
		
		if (currentCraftModel == entry){
			context.font = "Bold " + keyFont;
			context.fillText("*" + entry.name, 2 + keyLineLength, keyFontSize);
			$("#cmodelsec" + ind).append($('#craftModelEdit'));
		}
		else{
			context.font = keyFont;
			context.fillText(entry.name, 2 + keyLineLength, keyFontSize);
		}
		
		$("#cmodelsec" + ind).append("<p></p>Instances: ");
		var v = 0;
		entry.children.forEach(function(ent) {
			v++;
			if (ent == currentCraft){
				$("#cmodelsec" + ind).append("<button onclick = 'currentCraft = false; updateSelector()' style = 'font-weight: bold; color:" + entry.color + "'>*" + v + "</button>");
				$("#cmodelsec" + ind).append($('#craftEdit'));
			}
			else{
				$("#cmodelsec" + ind).append("<button onclick='currentCraft = craftModels[" + ind + "].children[" + (v-1) + "]; craftShown = false' style = 'color:" + entry.color + "'>" + v + "</button>");
			}
		});
		$("#cmodelsec" + ind).append("<button onclick='new Craft(craftModels[" + ind + "]); updateSelector()'>+</button>");
		ind++;
	});
	$('#planetModelSel').append($('#planetModelEdit'));		
	$('#planetModelSel').append($('#planetEdit'));
	$("#planetSel").empty();
	ind = 0;
	planetModels.forEach(function(entry) {
		if (currentPlanetModel == entry){
			$("#planetSel").append("<section id = 'pmodelsec" + ind + "'><button onclick='currentPlanetModel = false; updateSelector(); planetModelShown = false;'><canvas id = 'pmodel" + ind + "'width = '200px' height = '" + (keyFontSize + 4) + "px'></canvas></button></section>");	
		}
		else{
			$("#planetSel").append("<section id = 'pmodelsec" + ind + "'><button onclick='currentPlanetModel = planetModels[" + ind + "]; planetModelShown = false;'><canvas id = 'pmodel" + ind + "'width = '200px' height = '" + (keyFontSize + 4) + "px'></canvas></button></section>");	
		}
		var canvas = document.getElementById("pmodel" + ind);
		var context = canvas.getContext("2d");
		context.beginPath();
		context.arc(keyLineLength/2, keyFontSize/2 + 2, keyFontSize / 2 - 4, 0, 2 * Math.PI, false);
		context.fillStyle = entry.fillColor;
		context.lineWidth = 3;
		context.fill();
		context.strokeStyle = entry.fringeColor;
		context.lineWidth = 3;
		context.stroke();
		
		context.fillStyle = entry.fringeColor;
		if (currentPlanetModel == entry){
			context.font = "Bold " + keyFont;
			context.fillText("*" + entry.fullName, 2 + keyLineLength, keyFontSize);
			//$("#pmodelsec" + ind).click(function(){currentPlanetModel = false; updateSelector();});
			$("#pmodelsec" + ind).append($('#planetModelEdit'));
		}
		else{
			context.font = keyFont;
			context.fillText(entry.fullName, 2 + keyLineLength, keyFontSize);
		}
		
		$("#pmodelsec" + ind).append("<p></p>Instances: ");
		var v = 0;
		entry.children.forEach(function(ent) {
			v++;
			if (ent == currentPlanet){
				$("#pmodelsec" + ind).append("<button onclick='currentPlanet = false; updateSelector()' style = 'font-weight: bold; color:" + entry.fringeColor + "'>*" + v + "</button>");
				$("#pmodelsec" + ind).append($('#planetEdit'));
			}
			else{
				$("#pmodelsec" + ind).append("<button onclick='currentPlanet = planetModels[" + ind + "].children[" + (v-1) + "]; planetShown = false' style = 'color:" + entry.fringeColor + "'>" + v + "</button>");
			}
		});
		$("#pmodelsec" + ind).append("<button onclick='new Planet(planetModels[" + ind + "]); updateSelector()'>+</button>");
		ind++;
	});
	window.scrollTo(x, y);
}

function setPopout(id){
	switch (id){
		case -1:
			$('#craftModelSel').hide();
			$('#planetModelSel').hide();
		break;
		case 0:
			if($('#craftModelSel').is(':visible')){
				$('#craftModelSel').hide();
			}
			else{
				$('#craftModelSel').show();	
			}
			break;
		case 1:
			if($('#planetModelSel').is(':visible')){
				$('#planetModelSel').hide();
			}
			else{
				$('#planetModelSel').show();	
			}
			break;
		case 2:
			$('#craftModelSel').hide();
			document.getElementById("showCraftModelList").checked = false;
			break;
		case 3:
			$('#planetModelSel').hide();
			document.getElementById("showPlanetModelList").checked = false;
			break;
	}
}

function setWindow(id){
	switch (id){
		case -1:
			//$('#craftEdit').hide();
			//$('#planetEdit').hide();
			$('#faq').hide();
			$('#trajectoryEdit').hide();
			$('#instructions').hide();
			//$('#craftModelEdit').hide();
			//$('#planetModelEdit').hide();
			$('#hotkeys').hide();
		break;
		case 0:
			if($('#craftEdit').is(':visible')){
				$('#craftEdit').hide();
			}
			else{
				$('#craftEdit').show();
			}
			break;
		case 1:
			if($('#planetEdit').is(':visible')){
				$('#planetEdit').hide();
			}
			else{
				$('#planetEdit').show();
			}
			break;
		case 2:
			if($('#faq').is(':visible')){
				$('#faq').hide();
			}
			else{
				$('#faq').show();
			}
			break;
		case 3:
			if($('#trajectoryEdit').is(':visible')){
				$('#trajectoryEdit').hide();
			}
			else{
				$('#trajectoryEdit').show();
				$('#warningSection').after($('#trajectoryEdit'));
			}
			break;
		case 4:
			if($('#instructions').is(':visible')){
				$('#instructions').hide();
			}
			else{
				$('#instructions').show();
			}
			break;
		case 5:
			if($('#craftModelEdit').is(':visible')){
				$('#craftModelEdit').hide();
			}
			else{
				$('#craftModelEdit').show();
			}
			break;
		case 6:
			if($('#planetModelEdit').is(':visible')){
				$('#planetModelEdit').hide();
			}
			else{
				$('#planetModelEdit').show();
			}
			break;
		case 7:
			if($('#hotkeys').is(':visible')){
				$('#hotkeys').hide();
			}
			else{
				$('#hotkeys').show();
			}
			break;
	}
}

function initiateCraftButton(){

}

function initiatePlanetButton(){

}

