
var stringStyle = '12pt Calibri';
var stringMove = 14;

var toolbar =[
	new Button(0, 0, 50, 16, "File"),
	new Button(50, 0, 50, 16, "Edit"),
	new Button(100, 0, 50, 16, "View"),
	new Button(150, 0, 50, 16, "Mode"),
	new Button(200, 0, 60, 16, "Planets")
	];

function initiateToolbar(){
	var c = new Button(260, 0, 60, 16, "Crafts");
	c.onClicked = function() {
		if (!this.showSubbar){
		
			var a = this;
			var depth = 16;
			crafts.forEach(function(cra) {
			
				var v = new Button(260, depth, 256, 16, cra.name);
				v.target = cra;
				v.parent = a;
				v.onClicked = function() {
					if (!this.target.selected){
						deselectAll();
						this.target.selected = true;
					}
					else{
						deselectAll();
					}
					this.parent.hideSubbar();
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
}
	
function Button(x, y, width, height, label) {
    this.label = label;
	
    this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

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
        this.selected = (locateMouseX() > this.x && locateMouseX() < this.x + this.width
						&& locateMouseY() > this.y && locateMouseY() < this.y + this.height);
		if (this.selected){
			this.onSelected();
		}
		else{
			this.onDeselected();
		}
    };
	
	this.checkClicked = function() {
        if (this.selected){this.onClicked();}
		this.subbar.forEach(function(entry) {
			entry.checkClicked();
		});
    };
	
	this.onClicked = function() {
        alert("onClicked function unbound for button " + this.label + "."); 
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
		drawColor = '#000000';
		roundedRect(button.x, button.y, button.width, button.height, 8, true);
		context.fillStyle = '#ffffff';
		context.fillText(" " + button.label, button.x, button.y + stringMove);
	}
	else{
		drawColor = '#ffffff';
		roundedRect(button.x, button.y, button.width, button.height, 8, true);
		context.fillStyle = '#000000';
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
	toolbar.forEach(function(entry) {
		entry.checkClicked();
	});
}

/* CRAFTS */

