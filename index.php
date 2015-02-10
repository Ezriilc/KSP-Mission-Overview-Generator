<?php
    $content = 'Some fancy, PHP magic here.';
?>
<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script type="text/javascript" src="jscolor/jscolor.js"></script>
	
    <meta charset="utf-8" />
    <meta name="msapplication-config" content="none"/>
    <meta name="description" content="Mission Profile Notation Generator"/>
	<meta name="author" content="Thunderous Echo"/>
    <meta name="keywords" content="php, web page, example"/>
	
	<script type="text/javascript" src="MPN.js"></script>
	<script type="text/javascript" src="Draw.js"></script>
	<script type="text/javascript" src="LocateMouse.js"></script>
	<script type="text/javascript" src="Planets.js"></script>
	<script type="text/javascript" src="PanelMenu.js"></script>
	<script type="text/javascript" src="Key.js"></script>
	<script type="text/javascript" src="Crafts.js"></script>
	<script type="text/javascript" src="ColorSelector.js"></script>
	
    <title>MPN Generator</title>
    <link rel="shortcut icon" href="favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="base.css"/>
    <link rel="stylesheet" type="text/css" href="custom.css"/>
	<link rel="stylesheet" type="text/css" href="sectionFill.css"/>
	
</head>
<body>
	<div class="menu" style="text-align:center; font-size:x-large;">
		<a href="http://forum.kerbalspaceprogram.com/threads/102508-How-to-show-What-you-did-Mission-Profile-Notation">Forum Thread</a>
		<a href="https://github.com/Ezriilc/KSP-Mission-Overview-Generator">Source</a>
		<a href=" ">Video</a>
		<div style="clear:both;"></div>
	</div>
	
	<div id = "craftModelSel" class = "sel" style = "text-align: left; left: 0%">
		<h4>Craft Models:</h4>
		<input type = "button" value = "Hide" style = "height:20px" onclick="setPopout(2)"></input>
		<div id = "craftSel"></div>
		<section><input type = "button" value = "+" style = "height:20px" onclick="createCraftModel(this)"></input></section>
	</div>
	<div id = "planetModelSel" class = "sel" style = "text-align: left; left: 100%; transform: translate(-100%, 0%);">
		<h4>Planet Models:</h4>
		<input type = "button" value = "Hide" style = "height:20px" onclick="setPopout(3)"></input>
		<input type = "button" value = "Restore defaults" style = "height:20px" onclick="resetPlanetModels(this)"></input>
		<div id = "planetSel"></div>
		<section><input type = "button" value = "+" style = "height:20px" onclick="createPlanetModel(this)"></input></section>
	</div>
	
	<div style= "display: block">
		<canvas class = "rounded"
		id="myCanvas" 
		width="1000" height="500" 
		style= "border:1px solid #6c823d; 
		text-align: center; margin-top: 5px"
		></canvas>
		<img src="icon/arrow-down.png" id = "arrow-down" style=" display:none">
		<img src="icon/arrow-up.png" id = "arrow-up" style=" display:none">
		<img src="icon/arrow-left.png" id = "arrow-left" style=" display:none">
		<img src="icon/arrow-right.png" id = "arrow-right" style=" display:none">
		<img src="icon/arrow-cw.png" id = "arrow-cw" style=" display:none">
		<img src="icon/arrow-ccw.png" id = "arrow-ccw" style="display:none">
	</div>
		<div id = "windowButtons" style= "text-align: center; display: table; margin: auto">
			<section style= "text-align: left; display: table-cell">
				<h1>Edit</h1>
				<p></p><input type = "checkbox" id="craftEditShow" value = "Crafts" onclick = "setWindow(0)"> Crafts
				<p></p><input type = "checkbox" id="craftEditShow" value = "Craft Models" onclick = "setWindow(5)"> Craft Models
				<p></p><input type = "checkbox" id="planetEditShow" value = "Planets" onclick = "setWindow(1)"> Planets
				<p></p><input type = "checkbox" id="craftEditShow" value = "Planet Models" onclick = "setWindow(6)"> Planet Models
				<!--<p></p><input type = "checkbox" id="trajectoryEditShow" value = "Edit Trajectories" onclick = "setWindow(3)"> Trajectories-->
			</section>
			<section style= "text-align: left; display: table-cell">
				<h1>View</h1>
				Size:  <input id="width" type = "text" size = "4" onchange = "changeWidth(this)" value = "1000"></input> x <input id="height" type = "text" size = "4" onchange = "changeHeight(this)" value="500"></input>
				<p></p>Gridlines: <input id="gridlines" type = "checkbox" checked></input>
				<!--<p></p>Craft points: <input id="craftPoints" type = "checkbox"></input>-->
			</section>
			<section style= "text-align: right; display: table-cell">
				<h1 style = "text-align: left">Snap</h1>
				<p></p>Horizontal:  <input id="horizontalSnap" type = "text" size = "3" value = "32"></input>
				<p></p>Vertical:  <input id="verticalSnap" type = "text" size = "3" value="32"></input>
				<p></p>Radial: 	<input id="radialSnap" type = "text" size = "3" value="12"></input>
				<p></p>Angular: 	<input id="angleSnap" type = "text" size = "3" value="8"></input>
				<p></p>Connecting: 	<input id="connectSnap" type = "text" size = "3" value="16"></input>
			</section>
			<section style= "text-align: left; display: table-cell">
				<h1>Help</h1>
				<p></p><input type = "checkbox" id="instructionsShow" value = "Help" onclick = "setWindow(4)"> Help
				<p></p><a href=" ">Video</a>
			</section>
			<section style= "text-align: left; display: table-cell">
				<h1>Model Lists</h1>
				<p></p><input id = "showCraftModelList" type = "checkbox" checked = "true" onclick = "setPopout(0)"> Craft Models
				<p></p><input id = "showPlanetModelList" type = "checkbox" checked = "true" onclick = "setPopout(1)"> Planet Models
			</section>
			<section style= "text-align: left; display: table-cell" id="warningSection">
				<h1>Errors</h1>
				<ul id = "warnings" style = "fill-color: #ffffff; width: 200px"></ul>
			</section>
		</div>
		<section style= "text-align: center; display: block" id = "craftEdit">
			<h5 id = "selCraft">Select a craft to edit</h5>
			<div id= "craft">
				<h1 id="label2">Untitled Space Craft</h1>
				<input type = "button" value = "Delete" onclick="deleteCraftButton(this)" align = "text-align: center"></input>
				<input type = "button" value = "Recenter" onclick="craftRecenterButton(this)" align = "text-align: center"></input>
				<input type = "button" value = "Deselect" onclick="currentCraft = false; craftShown = false" align = "text-align: center"></input>
				<p id="label4">Model:
				<button id="label5" onclick = "setCraftModelToCurrent()">Change to selected model: "Untitled Space Craft"</button></p>
				
				<p id="label8">Parent Planet:
				<button id="label9" onclick = "setCraftPlanetToCurrent(true)">Change to selected planet: "Untitled Planet"</button>
				<button onclick = "setCraftPlanetToCurrent(false)">Clear</button></p>
				
				<p></p>Type: <select id="typeSel" onchange="setCraftType(this)">
					<option value = "t0">Transfer</option>
					<option value = "t1">Landing</option>
					<option value = "t2">Ascent</option>
					<option value = "t3">Orbit</option>
					<option value = "t4">Flyby</option>
				</select>
				<p></p>Arrows: <select id="arrSel" onchange="setCraftArrows(this)">
					<option value = "a0">Vague</option>
					<option value = "a1">Unidirectional</option>
					<option value = "a2">Bidirectional</option>
					<option value = "a3">Reverse</option>
				</select>
				<!--<section style = "text-align: center; background-color: #ffffff">-->
				<!--<h4 style = "margin-top: 5px" >Add Next Manuever:</h4>-->
				<p></p>Add Next Manuever:
				<button style = "width: 128px">Transfer (T)</button>
				<button style = "width: 128px">Landing (L)</button>
				<button style = "width: 128px">Ascent (A)</button>
				<button style = "width: 128px">Orbit (O)</button>
				<button style = "width: 128px">Flyby (F)</button>
				<!--</section>-->
			</div>
		</section>
		<section style= "text-align: center; display: block" id = "craftModelEdit">
			<h5 id = "selCraft2">Select a craft model to edit</h5>
			<div id= "craft2">
				<h1 id="label3">Untitled Space Craft</h1>
				<input id = "deleteCraftModelButton" type = "button" value = "Delete" onclick="deleteCraftModelButton(this)" align = "text-align: center"></input>
				<input type = "button" value = "Deselect" onclick="a" align = "text-align: center"></input>
				<p>Name:   <input id="name2" type = "text" onchange = "name2(this)"></input></p>
				<p>Color:   <input id="color2" class="color {hash:true,caps:false,pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black',pickerClosable:true,onImmediateChange:'updateColor(this, 2);'}"></p>
				<p>Line Width:   <input id="width2" type = "text" size = "2" onchange = "width2(this)"></input></p>
			</div>
		</section>
		<section style= "text-align: center; display: block" id = "planetEdit">
				<h5 id = "selPlanet" >Select a planet to edit</h5>
				<h1 id="label1">Untitled Planet</h1>
				<div id= "planet" align = "text-align: right">
					<input type = "button" value = "Delete" onclick="deletePlanetButton(this)" align = "text-align: center"></input>
					<input type = "button" value = "Recenter" onclick="planetRecenterButton(this)" align = "text-align: center"></input>
					<input type = "button" value = "Deselect" onclick="currentPlanet = false; planetShown = false" align = "text-align: center"></input>
					<p id="label6">Model:
					<button id="label7" onclick = "setPlanetModelToCurrent()">Change to selected model: "Untitled Planet"</button></p>
				</div>
			</section>
			<section style= "text-align: center; display: block" id = "planetModelEdit">
				<h5 id = "selPlanet2">Select a planet model to edit</h5>
				<h1 id="label0">Untitled Planet</h1>
				<div id= "planet2" align = "text-align: right">
					<input id = "deletePlanetModelButton" type = "button" value = "Delete" onclick="deletePlanetModelButton(this)" align = "text-align: center"></input>
					<input type = "button" value = "Deselect" onclick="a" align = "text-align: center"></input>
					<p></p>
					Name:   <input id="name1" type = "text" onchange = "name1(this)"></input>
					<p></p>
					Abbreviation:   <input id="abbr" type = "text" size = "2" onchange = "abbr(this)"></input>
					<p></p>
					Outline Color:   <input id="color0" class="color {hash:true,caps:false,pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black', pickerClosable:true, required:false, onImmediateChange:'updateColor(this, 0);'}">
					<p></p>
					Fill Color:   <input id="color1" class="color {hash:true,caps:false,pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black', pickerClosable:true, required:false, onImmediateChange:'updateColor(this, 1);'}">
					<p></p>
					Hierarchical Index:   <input id="ind" type = "text" size = "2" onchange = "ind(this)"></input>
				</div>
			</section>
			<!--<section style = "text-align: center; display: block" id = "trajectoryEdit">
				<h5 id = "selCraft3">Select a craft to edit its trajectory</h5>
				<div id= "craft3">
					<h1>Trajectory Customizer</h1>
					<section style = "display: inline-block">
						<input type = "button" style = "font-size: x-large; width:64px" value = "↔" ></input>
						<input type = "button" style = "font-size: x-large; width:64px" value = "↕"></input>
						<input type = "button" style = "font-size: x-large; width:64px" value = ")"></input>
					</section>
				</div>
			</section>-->
			<!--<section style= "text-align: left; display: inline-block">
				<h1>Add Decals</h1>
					<section style= "display: inline-block">
						<h1>Actions</h1>
						<input type = "button" value = "Fuel Transfer" onclick=""></input>
						<p></p>
						<input type = "button" value = "Aerobraking" onclick=""></input>
						<p></p>
						<input type = "button" value = "Arrow" onclick=""></input>
						<p></p>
						<input type = "button" value = "Destroy" onclick=""></input>
					</section>
					<section style= "display: inline-block">
						<h1>Labels</h1>
						<input type = "button" value = "Text" onclick=""></input>
						<p></p>
						<input type = "button" value = "Planet Name" onclick=""></input>
						<p></p>
						<input type = "button" value = "Chronological" onclick=""></input>
					</section>
					<section style= "display: inline-block"> Preview:<canvas id="decalPreview" width = "64px" height = "64px"></canvas></section>
			</section>-->
		<section style= "text-align: left; display: block; background-color: #ffffff" id = "instructions" >
			<h1>Help</h1>
				<p></p>
				<h2>Crafts and Planets</h2>
					<h4>Crafts</h4>
					<p>One "Craft" is one part of the path a represented spacecraft takes (transfer, landing, orbit).</p>
					<h4>Planets</h4>
					<p>One "Planet" is one instance of a planet that appears in the Overview and interacts with crafts.</p>
					<h4>Editing Sections</h4>
						<p>To open this section, select a craft or planet by clicking on it or by clicking on its instance number in the "Craft Models" or "Planet Models" lists under its model, then click "Crafts" or "Planets" under "Edit".</p>
						<ul>
							<li>"Delete" deletes the craft or planet, <strong>not</strong> the model.</li>
							<li>"Recenter" moves the planet to the center of the screen.</li>
							<li>"Deselect" deselects the craft or planet. </li>
							<li>"Model" changes the model this craft or planet uses to the currently selected model. Select models through the "Craft Models" or "Planet Models" list.</p>
						</ul>
				<h2>Models</h2>
					<p>Each craft or planet on the screen derives its appearance and name from a model. Because all Kerbins use the same model, all Kerbins will look the same. Likewise, all copies of the same spacecraft will look the same. Models appear in the key if they are in use.</p>
					<p>To create a craft or planet that uses a certain model, click the "+" in the "Craft Models" or "Planet Models" list under the model you want to add an instance of. You can change the model that an existing craft or planet uses through its editing section.</p>
					<h4>Editing Sections</h4>
						<p>To open this section, select a craft model or planet model by clicking on it in the "Craft Models" or "Planet Models" lists, then click "Craft Models" or "Planet Models" under "Edit".</p>
						<ul>
							<li>"Name" is the name of a model (that will appear in the Key). </li>
							<li>"Abbreviation" (Planets) is the abbreviation that will appear on decals labelling planets that use this model. </li>
							<li>"Outline Color"(Planets), "Fill Color"(Planets), and "Color" (Crafts) are the colors that appear on crafts or planets that use this model. </li>
							<li>"Line Width" (Crafts) is the line width used to draw the paths of crafts that use this model.</li>
							<li>"Hierarchical Index" (Planets): See below.</li>
						</ul>
						<h5>Hierarchical Index</h5>
							<p>The representative size of a planet depends on what it is orbiting. Sun-Kerbol is hierarchical index 0, so it it the biggest. Things orbiting Sun-Kerbol are hierarchical index 1, so they are half the size. Things orbiting things orbiting Sun-Kerbol are hierarchical index 2, so they are half <i>that size</i>, and so on.</p>
							<p>Even though Laythe is bigger than Duna, it orbits Jool, while Duna orbits the sun, so Laythe is represented at half Duna's size.</p>
							<p>Hierarchical indexes are part of a model, and can be edited through "Show Model Options" in a planet's editing section.</p>
							<p>If you set a hierarchical index to -4, that planet will be represented as 16 times larger than Sun-Kerbol. Please edit responsibly.</p>
			<h2>Key</h2>
				<p>The Key is the black rounded rectangle on the viewing canvas listing active models. This will appear in the final Overview. The Key shows which craft models and planet models are which.</p>
				<p>The Key can be dragged around by dragging it on its center. You can change its size by dragging on the edges and corners.</p>
				<p>If the Key appears red, it is too small for is contents! Resize it larger!</p>
			<h2>View</h2>
				<ul>
					<li>"Size" allows you to change the dimensions of the final Overview. Values in pixels.</li>
				</ul>
			<h2>Snap</h2>
				<ul>
					<li>"Horizontal" and "Vertical": Transfers and planets snap to this grid, relative to the origin. Values in pixels.</li>
					<li>"Radial": All other crafts snap at these incremental distances from their parent planet. Values in pixels radius.</li>
					<li>"Angular": All other crafts snap at these angles from their parent planet. Values in number of snapping angles.</li>
					<li>"Connecting": How close the end point of one craft and the start point of another must be brought for them to connect. Values in pixels.</li>
				</ul>
				<p>Grid-lines are shown when relevant.</p>
			<h2>Craft Models and Planet Models sidebars</h2>
				<p>Models can be selected from here by clicking on their button.</p>
				<p>Crafts and Planets can be selected from here by clicking on their instance button under their model.</p>
				<p>You cannot delete any of the stock planets and must have at least 1 craft model at all times.</p>
			
	</section>
	<p>MOG</p>
</body>
</html>
