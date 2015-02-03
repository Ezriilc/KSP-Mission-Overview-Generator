
var stringStyle = '12pt Calibri';
var stringMove = 14;

var toolbar =[
	//new Button(0, 0, 50, 16, "File"),
	//new Button(50, 0, 50, 16, "Edit"),
	//new Button(100, 0, 50, 16, "View"),
	//new Button(150, 0, 50, 16, "Mode"),
	//new Button(200, 0, 60, 16, "Planets")
	];

function initiateToolbar(){
	initiatePlanetButton();
	initiateCraftButton();
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
	var c = new Button(0, 0, 48, 16, "Crafts");
	c.onClicked = function() {
		if (!this.showSubbar){
		
			var a = this;
			var depth = 16;
			crafts.forEach(function(cra) {
			
				var v = new Button(0, depth, 256, 16, cra.model.name);
				v.target = cra;
				v.parent = a;
				v.color = cra.model.color;
				v.onClicked = function() {
					currentCraft = this.target;
					craftShown = false;
					this.parent.hideSubbar();
					highlightPos[0] = false;
					highlightPos[1] = false;
				};
				v.onSelected = function() {
					highlightPos[0] = this.target.position[0];
					highlightPos[1] = this.target.position[1];
				};
				v.onDeselected = function() {
					highlightPos[0] = false;
					highlightPos[1] = false;
				};
				a.subbar.push(v);
				
				depth += 16;
			});
			
			this.showSubbar = true;
		}
		else{
			this.hideSubbar();
			this.subbar.forEach(function(cra) {
				this.subbar.pop(cra);
			});
		}
    };
	toolbar.push(c);
	
	c = new Button(112, 0, 144, 16, "Add Crafts by Model");
	c.onClicked = function() {
		if (!this.showSubbar){
			this.showSubbar = true;
		}
		else{
			this.hideSubbar();
			this.subbar.forEach(function(cra) {
				this.subbar.pop(cra);
			});
		}
    };
	
	depth = 16;
	//craftModels.forEach(function(cra) {
		//var v = new Button(128, depth, 128, 16, cra.name);
		//v.parent = c;
		//v.pid = depth / 16 - 1;
		//v.color = planetFringeColors[v.pid];
		//v.x += planetHierarchyIndexes[v.pid]* 12;
		//v.onClicked = function() {
		//	new Planet(this.pid);
		//	this.parent.hideSubbar();
		//};
		//c.subbar.push(v);
		//depth += 16;
	//});
	
	toolbar.push(c);
}

function initiatePlanetButton(){
	var c = new Button(48, 0, 64, 16, "Planets");
	c.onClicked = function() {
		if (!this.showSubbar){
		
			var a = this;
			var depth = 16;
			planets.forEach(function(cra) {
			
				var v = new Button(64, depth, 128, 16, cra.fullName + " (" + cra.name + ")");
				v.target = cra;
				v.parent = a;
				v.color = cra.fringeColor;
				v.onClicked = function() {
					currentPlanet = this.target;
					planetShown = false;
					this.parent.hideSubbar();
					highlightPos[0] = false;
					highlightPos[1] = false;
				};
				v.onSelected = function() {
					highlightPos[0] = this.target.position[0];
					highlightPos[1] = this.target.position[1];
				};
				v.onDeselected = function() {
					highlightPos[0] = false;
					highlightPos[1] = false;
				};
				a.subbar.push(v);
				
				depth += 16;
			});
			
			this.showSubbar = true;
		}
		else{
			this.hideSubbar();
			this.subbar.forEach(function(cra) {
				this.subbar.pop(cra);
			});
		}
    };
	toolbar.push(c);

	c = new Button(256, 0, 156, 16, "Add Planets by Model");
	c.onClicked = function() {
		if (!this.showSubbar){
			this.showSubbar = true;
		}
		else{
			this.hideSubbar();
			this.subbar.forEach(function(cra) {
				this.subbar.pop(cra);
			});
		}
    };
	
	var depth = 16;
	planetFullNames.forEach(function(cra) {
		var v = new Button(256, depth, 128, 16, cra);
		v.parent = c;
		v.pid = depth / 16 - 1;
		v.color = planetFringeColors[v.pid];
		v.x += planetHierarchyIndexes[v.pid]* 12;
		v.onClicked = function() {
			new Planet(this.pid);
			this.parent.hideSubbar();
		};
		c.subbar.push(v);
				
		depth += 16;
	});
	
	toolbar.push(c);
}
	
function Button(x, y, width, height, label) {
    this.label = label;
	
    this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	
	this.color = '#000000';

	this.selected = false;
	
	this.subbar = [];
	this.showSubbar = false;
	
	this.hideSubbar = function() {
		this.showSubbar = false;
		this.subbar.forEach(function(entry) {
			entry.selected = false;
		});
	};
	
	this.checkSelected = function() {
		var prevSelelected = this.selected;
        this.selected = (locateMouseX() > this.x && locateMouseX() < this.x + this.width
						&& locateMouseY() > this.y && locateMouseY() < this.y + this.height);
		if (this.selected && !prevSelelected){
			this.onSelected();
		}
		if (!this.selected && prevSelelected){
			this.onDeselected();
		}
    };
	
	this.checkClicked = function() {
        if (this.selected){
			this.onClicked();
			deselectAll();
		}
		this.subbar.forEach(function(entry) {
			entry.checkClicked();
		});
    };
	
	this.onClicked = function() {

    };
	
	this.onSelected = function() {
        
    };
	
	this.onDeselected = function() {
        
    };
}

function drawButton(button){
	canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	button.checkSelected();
	context.font = stringStyle;
	
	if (button.selected){
		drawColor = button.color;
		roundedRect(button.x, button.y, button.width, button.height, 8, true);
		context.fillStyle = '#ffffff';
		context.fillText(" " + button.label, button.x, button.y + stringMove);
	}
	else{
		drawColor = '#ffffff';
		roundedRect(button.x, button.y, button.width, button.height, 8, true);
		context.fillStyle = button.color;
		context.fillText(" " + button.label, button.x, button.y + stringMove);
	}
	
	if (button.showSubbar){
		button.subbar.forEach(function(entry) {
			drawButton(entry);
		});
	}
}

function drawToolbar(){
	toolbar.forEach(function(entry) {
		drawButton(entry);
	});
}

function clickButtons(){
	var targButton;
	toolbar.forEach(function(entry) {
		entry.checkClicked();
		
	});
}

