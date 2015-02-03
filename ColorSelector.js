function updateColor(color, id) {
	if (id == 0){
		currentPlanet.model.fringeColor = color.valueElement.value;
	}
	if (id == 1){
		currentPlanet.model.fillColor = color.valueElement.value;
	}
	if (id == 2){
		currentCraft.model.color = color.valueElement.value;
	}
	updateSelector();
}