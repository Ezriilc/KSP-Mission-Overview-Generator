var lastSelectedPlanet;

function setPlanet(planet){
	lastSelectedPlanet = planet;
}

function updateColor(color, id) {
	if (id == 0){
		planetFringeColors[lastSelectedPlanet.id]= color.valueElement.value;
		
		
		planets.forEach(function(entry) {
			entry.fringeColor = planetFringeColors[entry.id];
		});
	}
	if (id == 1){
		planetFillColors[lastSelectedPlanet.id] = color.valueElement.value;
		planets.forEach(function(entry) {
			entry.fillColor = planetFillColors[entry.id];
		});
	}
	if (id == 2){
		crafts.forEach(function(entry) {
			if (entry.selected){
				entry.color = color.valueElement.value;
			}
		});
	}
}