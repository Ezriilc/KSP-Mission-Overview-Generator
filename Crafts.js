var crafts = new Array();
var craftShown = false; //whether the craft editing menu is shown

function Craft(name, color, lineWidth) {
    this.name = name;
	
	this.color = color;
	this.lineWidth = lineWidth;		
	
    this.position = [0, 0];
	this.radius = 4;
	crafts.push(this);
	
	this.where = 0; //0: on planet
	
	this.selected = false;
}

function drawCrafts(){

	var show = false;
	
	crafts.forEach(function(entry) {
		if (entry.selected){
			entry.radius = 8;
			show = entry;
		}
		else{entry.radius = 4;}

		//drawColor = '#ffffff';
		//fillCircleLocal(entry.position[0], entry.position[1], entry.radius);
		drawColor = entry.color;
		lineWidth = entry.lineWidth;
		drawCircleLocal(entry.position[0], entry.position[1], entry.radius);
		
		drawPath(entry);
	});
	
	if (show){
		if (!craftShown){
		$("#label2").remove();
		$("#craft").show();
		document.getElementById('color2').color.fromString(show.color);
		document.getElementById('name2').value = show.name;
		document.getElementById('width2').value = show.lineWidth;
		
		$label2 = $("<h1 id = 'label2'>" + show.name + "</h1>");
		$("#craftColor").after($label2);
		$("#craftColor").hide();
		craftShown = true;
		}
		
		if (document.getElementById('name2').value != show.name){show.name = document.getElementById('name2').value;}
		if (Number(document.getElementById('width2').value) != show.lineWidth && Number(document.getElementById('width2').value) != NaN && Number(document.getElementById('width2').value) > 0){show.lineWidth = Number(document.getElementById('width2').value);}
	}
	else{
		$("#craft").hide();
		$("#label2").remove();
		$("#craftColor").show();
		craftShown = false;
	}
}

function drawPath(craft){}

function selectCrafts(){
	crafts.forEach(function(entry) {
		if(distance(entry.position[0] + midScreenPos[0], entry.position[1] + midScreenPos[1], locateMouseX(), locateMouseY()) < entry.radius){
			if (!entry.selected){
				deselectAll();
				entry.selected = true;
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