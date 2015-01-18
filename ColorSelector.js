function updateColor(color, id) {
	if (id == 0){
		planetFringeColors[currentPlanet.id]= color.valueElement.value;
		planets.forEach(function(entry) {
			entry.fringeColor = planetFringeColors[entry.id];
		});
		toolbar[1].subbar[currentPlanet.id].color = planetFringeColors[currentPlanet.id];
	}
	if (id == 1){
		planetFillColors[currentPlanet.id] = color.valueElement.value;
		planets.forEach(function(entry) {
			entry.fillColor = planetFillColors[entry.id];
		});
	}
	if (id == 2){
		currentCraft.model.color = color.valueElement.value;
		toolbar[3].subbar[craftModels.indexOf(currentCraft.model)].color = currentCraft.model.color;
	}
}