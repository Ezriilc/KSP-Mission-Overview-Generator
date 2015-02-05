var craftModels = new Array();
var crafts = new Array();
var craftShown = false; //whether the correct craft editing menu is shown
var craftModelShown = false;

function CraftModel(name, color, lineWidth) {
    this.name = name;
	
	this.color = color;
	this.lineWidth = lineWidth;	
	
	this.radius = 4;
	craftModels.push(this);
	this.children = new Array();
	
	updateSelector();
}

function Craft(model) {
    this.model = model;

	//this.location = 1; //in orbit: 0, on surface: 1, at endpoint: 2, arriving at planet: 3; arriving at vessel: 4;
	//this.planet = false;
	
    this.position = [0, 0];
	crafts.push(this);
	
	this.selected = false;
	model.children.push(this);
	this.childId = model.children.indexOf(this);
}

function craftRecenterButton(button){
	currentCraft.position[0] = 0;
	currentCraft.position[1] = 0;
}

function initiateCrafts(){
	$("#craftMore").hide();
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

function drawCrafts(){
	crafts.forEach(function(entry) {
		if (entry == currentCraft){
			entry.radius = 8;
		}
		else{entry.radius = 4;}

		//drawColor = '#ffffff';
		//fillCircleLocal(entry.position[0], entry.position[1], entry.radius);
		drawColor = entry.model.color;
		lineWidth = entry.model.lineWidth;
		drawCircleLocal(entry.position[0], entry.position[1], entry.radius);
		
		drawPath(entry);
	});
	
	if (currentCraft){
		if (!craftShown){
		updateSelector();
		$("#label2").show();
		//$("#label3").show();
		$("#craft").show();
		//$("#craft2").show();
		/*document.getElementById('color2').color.fromString(currentCraft.model.color);
		document.getElementById('name2').value = currentCraft.model.name;
		document.getElementById('width2').value = currentCraft.model.lineWidth;*/
		//$("#craftModelSelector").val(craftModels.indexOf(currentCraft.model));
		
		document.getElementById("label2").innerHTML = currentCraft.model.name  + " (Instance)";
		//document.getElementById("label3").innerHTML = currentCraft.model.name + " (Model)";
		$("#selCraft").hide();
		//$("#selCraft2").hide();
		craftShown = true;
		}
	}
	else{
		$("#craft").hide();
		//$("#craft2").hide();
		$("#label2").hide();
		//$("#label3").hide();
		$("#selCraft").show();
		//$("#selCraft2").show();
		craftShown = false;
	}
	
	if (currentCraftModel){
		$("#label4").show();
		if (!craftModelShown){
			updateSelector();
		//$("#label2").show();
			$("#label3").show();
		//$("#craft").show();
			$("#craft2").show();
			document.getElementById('color2').color.fromString(currentCraftModel.color);
			document.getElementById('name2').value = currentCraftModel.name;
			document.getElementById('width2').value = currentCraftModel.lineWidth;
		//$("#craftModelSelector").val(craftModels.indexOf(currentCraft.model));
			document.getElementById("label5").innerHTML = "Change to selected model: '" + currentCraftModel.name + "'";
		//document.getElementById("label2").innerHTML = currentCraft.model.name  + " (Instance)";;
			document.getElementById("label3").innerHTML = currentCraftModel.name + " (Model)";
		//$("#selCraft").hide();
			$("#selCraft2").hide();
			craftModelShown = true;
		}
	}
	else{
		//$("#craft").hide();
		$("#craft2").hide();
		//$("#label2").hide();
		$("#label3").hide();
		//$("#selCraft").show();
		$("#selCraft2").show();
		craftModelShown = false;
		$("#label4").hide();
	}
}

function name2(textbox){
	//currentCraft.model.name = document.getElementById('name2').value;
	currentCraftModel.name = document.getElementById('name2').value;
	document.getElementById("label2").innerHTML = currentCraft.model.name  + " (Instance)";
	//document.getElementById("label3").innerHTML = currentCraftModel.name + " (Model)";
	craftModelShown = false;
	updateSelector();
}
function width2(textbox){
	if (Number(document.getElementById('width2').value) != NaN 
	&& Number(document.getElementById('width2').value) > 0){
		//currentCraft.model.lineWidth = Number(document.getElementById('width2').value);
		currentCraftModel.lineWidth = Number(document.getElementById('width2').value);
	}
}

/*function craftModelSelector(selector){
	currentCraft.model = craftModels[selector.value];
	craftShown = false;
}*/

function createCraftModel(button){
	new CraftModel("Untitled Space Craft", '#' + Math.round(Math.random() * 255 * 256 * 256).toString(16).toUpperCase(), 3);
}

function drawPath(craft){}

function selectCrafts(){
	crafts.forEach(function(entry) {
		if(distance(entry.position[0] + midScreenPos[0], entry.position[1] + midScreenPos[1], locateMouseX(), locateMouseY()) < entry.radius){
			if (!entry.selected){
				deselectAll();
				entry.selected = true;
				currentCraft = entry;
				craftShown = false;
			}
			else{
				deselectAll();
			}	
		}
	});
}
function deselectCrafts(){
	crafts.forEach(function(entry) {
		entry.selected = false;
	});
}