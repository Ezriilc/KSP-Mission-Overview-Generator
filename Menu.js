
var stringStyle = '12pt Calibri';
var stringMove = 14;

var toolbar =[
	new Button(0, 0, 50, 16, "File"),
	new Button(50, 0, 50, 16, "Edit"),
	new Button(100, 0, 50, 16, "View"),
	new Button(150, 0, 50, 16, "Mode"),
	new Button(200, 0, 60, 16, "Planets"),
	];

function Button(x, y, width, height, label) {
    this.label = label;
	
    this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.selected = false;
	
	this.checkSelected = function() {
        this.selected = (locateMouseX() > this.x && locateMouseX() < this.x + this.width
						&& locateMouseY() > this.y && locateMouseY() < this.y + this.height);
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
}

function drawToolbar(){
	toolbar.forEach(function(entry) {
		drawButton(entry);
	});
}