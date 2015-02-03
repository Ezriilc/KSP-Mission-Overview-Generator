
var stringStyle = '12pt Calibri';
var stringMove = 14;

function initiateToolbar(){
	initiatePlanetButton();
	initiateCraftButton();
}
function updateSelectorSize(){
	/*var canvasObject = document.getElementById("craftSelCanvas")
	canvasObject.setAttribute('width', ((window.innerWidth - 1100) / 2) + "");
	canvasObject.setAttribute('height', craftModels.length * keyFontSize + 4 + "");
	
	var canvasObject = document.getElementById("planetSelCanvas")
	canvasObject.setAttribute('width', ((window.innerWidth - 1100) / 2) + "");
	canvasObject.setAttribute('height', planetModels.length * keyFontSize + 4 + "");*/
}
function updateSelector(){
	//updateSelectorSize();
	$("#craftSel").empty();
	var ind = 0;
	craftModels.forEach(function(entry) {
		$("#craftSel").append("<section id = 'cmodelsec" + ind + "'><button><canvas id = 'cmodel" + ind + "'width = '200px' height = '" + (keyFontSize + 4) + "px'></canvas></button></section>");
		
		var canvas = document.getElementById("cmodel" + ind);
		var context = canvas.getContext("2d");
		context.beginPath();
		context.moveTo(0, keyFontSize/2);
		context.lineTo(keyLineLength, keyFontSize/2);
		context.strokeStyle = entry.color;
		context.lineWidth = entry.lineWidth;
		context.stroke();
		
		context.fillStyle = entry.color;
		context.font = keyFont;
		context.fillText(entry.name, 2 + keyLineLength, keyFontSize);
		
		$("#cmodelsec" + ind).append("<p></p>Instances: ");
		var v = 0;
		entry.children.forEach(function(ent) {
			v++;
			if (ent == currentCraft){
				$("#cmodelsec" + ind).append("<button style = 'font-weight: bold; color:" + entry.color + "'>" + v + "*</button>");
			}
			else{
				$("#cmodelsec" + ind).append("<button style = 'color:" + entry.color + "'>" + v + "</button>");
			}
		});
		$("#cmodelsec" + ind).append("<button>+</button>");
		ind++;
	});
	
	$("#planetSel").empty();
	ind = 0;
	planetModels.forEach(function(entry) {
		$("#planetSel").append("<section id = 'pmodelsec" + ind + "'><button><canvas id = 'pmodel" + ind + "'width = '200px' height = '" + (keyFontSize + 4) + "px'></canvas></button></section>");
		
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
		context.font = keyFont;
		context.fillText(entry.fullName, 2 + keyLineLength, keyFontSize);
		
		$("#pmodelsec" + ind).append("<p></p>Instances: ");
		var v = 0;
		entry.children.forEach(function(ent) {
			v++;
			if (ent == currentPlanet){
				$("#pmodelsec" + ind).append("<button style = 'font-weight: bold; color:" + entry.fringeColor + "'>" + v + "*</button>");
			}
			else{
				$("#pmodelsec" + ind).append("<button style = 'color:" + entry.fringeColor + "'>" + v + "</button>");
			}
		});
		$("#pmodelsec" + ind).append("<button>+</button>");
		ind++;
	});
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
			$('#craftEdit').hide();
			$('#planetEdit').hide();
			//$('#view').hide();
			$('#trajectoryEdit').hide();
			$('#instructions').hide();
			$('#craftModelEdit').hide();
			$('#planetModelEdit').hide();
		break;
		case 0:
			if($('#craftEdit').is(':visible')){
				$('#craftEdit').hide();
			}
			else{
				$('#craftEdit').show();
				$('#windowButtons').after($('#craftEdit'));
			}
			break;
		case 1:
			if($('#planetEdit').is(':visible')){
				$('#planetEdit').hide();
			}
			else{
				$('#planetEdit').show();
				$('#windowButtons').after($('#planetEdit'));
			}
			break;
		/*case 2:
			if($('#view').is(':visible')){
				$('#view').hide();
			}
			else{
				$('#view').show();
				$('#windowButtons').after($('#view'));
			}
			break;*/
		case 3:
			if($('#trajectoryEdit').is(':visible')){
				$('#trajectoryEdit').hide();
			}
			else{
				$('#trajectoryEdit').show();
				$('#windowButtons').after($('#trajectoryEdit'));
			}
			break;
		case 4:
			if($('#instructions').is(':visible')){
				$('#instructions').hide();
			}
			else{
				$('#instructions').show();
				//$('#windowButtons').after($('#instructions'));
			}
			break;
		case 5:
			if($('#craftModelEdit').is(':visible')){
				$('#craftModelEdit').hide();
			}
			else{
				$('#craftModelEdit').show();
				$('#windowButtons').after($('#craftModelEdit'));
			}
			break;
		case 6:
			if($('#planetModelEdit').is(':visible')){
				$('#planetModelEdit').hide();
			}
			else{
				$('#planetModelEdit').show();
				$('#windowButtons').after($('#planetModelEdit'));
			}
			break;
	}
}

function initiateCraftButton(){

}

function initiatePlanetButton(){

}

