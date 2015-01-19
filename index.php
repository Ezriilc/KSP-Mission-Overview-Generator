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
    <meta name="description" content="Example PHP/HTML Page"/>
    <meta name="author" content="Ezriilc"/>
    <meta name="keywords" content="php, web page, example"/>
	
	<script type="text/javascript" src="MPN.js"></script>
	<script type="text/javascript" src="Draw.js"></script>
	<script type="text/javascript" src="LocateMouse.js"></script>
	<script type="text/javascript" src="Planets.js"></script>
	<script type="text/javascript" src="Menu.js"></script>
	<script type="text/javascript" src="Key.js"></script>
	<script type="text/javascript" src="Crafts.js"></script>
	<script type="text/javascript" src="ColorSelector.js"></script>
	
    <title>MPN Generator</title>
    <link rel="shortcut icon" href="favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="base.css"/>
    <link rel="stylesheet" type="text/css" href="custom.css"/>

</head>
<body>
	<div class="menu" style="text-align:center; font-size:x-large;">
		<a href="http://forum.kerbalspaceprogram.com/threads/102508-How-to-show-What-you-did-Mission-Profile-Notation">Forum Thread</a>
		<a href="https://github.com/Ezriilc/KSP-Mission-Overview-Generator">Source</a>
		<a href=" ">Video Instructions</a>
		<div style="clear:both;"></div>
	</div>
	<div style= "display: block">
		<canvas id="myCanvas" 
		width="1000" height="500" 
		style= "border:1px solid #d3d3d3; 
		text-align: center; margin-top: 5px"
		></canvas>
	</div>
		<section style= "text-align: center; display: block" id = "windowButtons">
			<input type = "button" id="craftEditShow" value = "Edit Crafts and Craft Models" onclick = "setWindow(0)">
			<input type = "button" id="planetEditShow" value = "Edit Planets and Planet Models" onclick = "setWindow(1)">
			<input type = "button" id="viewShow" value = "View" onclick = "setWindow(2)">
			<input type = "button" id="trajectoryEditShow" value = "Edit Trajectories" onclick = "setWindow(3)">
			<input type = "button" id="instructionsShow" value = "Help" onclick = "setWindow(4)">
		</section>
		<section style= "text-align: center; display: block" id = "craftEdit">
			<h5 id = "craftColor">Select a craft to edit</h5>
			<h1 id="label2">Untitled Space Craft</h1>
			<div id= "craft">
				<input type = "button" value = "Delete" onclick="deleteCraftButton(this)" align = "text-align: center"></input>
				<input type = "button" value = "Recenter" onclick="craftRecenterButton(this)" align = "text-align: center"></input>
				<input type = "button" value = "Deselect" onclick="currentCraft = false; craftShown = false;" align = "text-align: center"></input>
				<p></p>
					Model:   
					<select id = "craftModelSelector" onchange = "craftModelSelector(this)" style = "width: 128px">
					</select>
					<input type = "button" value = "+" onclick="createCraftModel(this)"></input>
				<p></p>
				<input type = "button" value = "Show Model Options" onclick="craftMoreButton(this)" align = "text-align: center"></input>
				<section id= "craftMore" style= "text-align: center">
					<p>Name:   <input id="name2" type = "text" onchange = "name2(this)"></input></p>
					<p>Color:   <input id="color2" class="color {hash:true,caps:false,pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black',pickerClosable:true,onImmediateChange:'updateColor(this, 2);'}"></p>
					<p>Line Width:   <input id="width2" type = "text" size = "2" onchange = "width2(this)"></input></p>
				</section>
			</div>
		</section>
			<section style= "text-align: center; display: block" id = "planetEdit">
				<h5 id = "planetColor" >Select a planet to edit</h5>
				<h1 id="label1">Untitled Planet</h1>
				<div id= "planet" align = "text-align: right">
					<input type = "button" value = "Delete" onclick="deletePlanetButton(this)" align = "text-align: center"></input>
					<input type = "button" value = "Recenter" onclick="planetRecenterButton(this)" align = "text-align: center"></input>
					<input type = "button" value = "Deselect" onclick="currentPlanet = false; planetShown = false;" align = "text-align: center"></input>
					<p></p>
						Model:   
						<select id = "planetModelSelector" onchange = "planetModelSelector(this)" style = "width: 128px">
						</select>
						<input type = "button" value = "+" onclick="createPlanetModel(this)"></input>
					<p></p>
					<input type = "button" value = "Show Model Options" onclick="planetMoreButton(this)" align = "text-align: center"></input>
					<section id= "planetMore" style= "text-align: center">
						Name:   <input id="name1" type = "text" onchange = "name1(this)"></input>
						<p></p>
						Abbreviation:   <input id="abbr" type = "text" size = "2" onchange = "abbr(this)"></input>
						<p></p>
						Outline Color:   <input id="color0" class="color {hash:true,caps:false,pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black', pickerClosable:true, required:false, onImmediateChange:'updateColor(this, 0);'}">
						<p></p>
						Fill Color:   <input id="color1" class="color {hash:true,caps:false,pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black', pickerClosable:true, required:false, onImmediateChange:'updateColor(this, 1);'}">
						<p></p>
						Hierarchical Index:   <input id="ind" type = "text" size = "2" onchange = "ind(this)"></input>
					</section>
				</div>
			</section>
			<section style= "text-align: center; display: block" id = "view">
				<h1>View</h1>
				<!--A Slider<input type = "range" value = "50" align = "text-align: center"></input>-->
				<p></p>
				Dimensions:  <input id="width" type = "text" size = "4" onchange = "changeWidth(this)" value = "1000"></input> x <input id="height" type = "text" size = "4" onchange = "changeHeight(this)" value="500"></input>
			</section>
			<section style = "display: block" id = "trajectoryEdit">
				<h1>Trajectory Customizer</h1>
				<input type = "button" value = "There will be a bunch of these (7-ish)"></input>
				<p></p>
				<input type = "text" value = "And a few of these (2-ish)" size = "32"></input>
				<p></p>
				<section style = "display: inline-block">
					<input type = "button" style = "margin-left: 14px" value = "/\">
					<p></p>
					<input type = "button" value = "<"> <input type = "button" value = ">">
					<p></p>
					<input type = "button" style = "margin-left: 14px" value = "\/">
				</section> <--And maybe something like this, but I'm not sure I'll need it
			</section>
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
		<section style= "text-align: left; display: block" id = "instructions">
			<h1>Help</h1>
				<p></p>
				<h2>Crafts and Planets</h2>
					<p>Click on "Crafts" or "Planets" in the toolbar to show buttons for selecting crafts and planets on the screen. You can hover over these to show which button corresponds to which craft or planet.</p>
					<h4>Crafts</h4>
					<h4>Planets</h4>
						<p>The "Planets" button in the toolbar allows you to see abbreviations of planets as well as names.</p>
					<h4>Editing Section</h4>
						<p>To open this section, select a craft or planet by clicking on it or through the toolbar, then click "Edit Crafts and Craft Models" or "Edit Planets and Planet Models"</p>
						<ul>
							<li>"Delete" deletes the craft or planet, <strong>not</strong> the model.</li>
							<li>"Recenter" moves the planet to 0, 0. </li>
							<li>"Deselect" deselects the craft or planet. </li>
							<li>The Model drop down menu allows you to select which model a craft or planet uses. </li>
							<li>The "+" button next to it allows you to create new models.</li>
							<li>The "Show Model Options" button opens a sub-section that allows you to change the properties of that model.</li>
						</ul>
				<h2>Models</h2>
					<p>Each craft or planet on the screen derives its appearance and name from a model. Because all Kerbins use the same model, all Kerbins will look the same. Likewise, all copies of the same spacecraft will look the same. Models appear in the key if they are in use.</p>
					<p>To create a craft or planet that uses a certain model, click on "Add Crafts" or "Add Planets" in the toolbar. You can change the model that an existing craft or planet uses through the Model drop-down menu in its editing section. The "+" button next to it allows you to create new models.</p>
					<h4>Editing Sub-Section</h4>
						<p>To open this section, open the crafts or planets editing section, then click "Show Model Options".</p>
						<ul>
							<li>"Name" is the name of a model (it will appear in the Key). </li>
							<li>"Abbreviation" (Planets) is the abbreviation that will appear on decals labelling planets that use this model. </li>
							<li>"Outline Color"(Planets), "Fill Color"(Planets),  and "Color" (Crafts) are the colors that appear on crafts or planets that use this model. </li>
							<li>"Line Width" is the line width used to draw the paths of crafts that use this model.</li>
						</ul>
						<h5>Hierarchical Index</h5>
							<p>The representative size of a planet depends on what it is orbiting. Sun-Kerbol is hierarchical index 0, so it it the biggest. Things orbiting Sun-Kerbol are hierarchical index 1, so they are half the size. Things orbiting things orbiting Sun-Kerbol are hierarchical index 2, so they are half <i>that size</i>, and so on.</p>
							<p>Even though Laythe is bigger than Duna, it orbits Jool, while Duna orbits the sun, so Laythe is represented at half Duna's size.</p>
							<p>Hierarchical indexes are part of a model, and can be edited through "Show Model Options" in a planet's editing section.</p>
							<p>If you set a hierarchical index to -4, that planet will be represented as 16 times larger than Sun-Kerbol. Please edit responsibly.</p>
			<h2>Key</h2>
				<p>The Key is the black rounded rectangle on the viewing canvas. This will appear in the final Overview. The Key shows which crafts and planets are which.</p>
				<p>The Key can be dragged around by its center. You can change its size by dragging on the edges and corners.</p>
				<p>If the Key appears red, it is too small for is contents! Resize it larger!</p>
			<h2>View</h2>
				<ul>
					<li>"Dimensions" allows you to change the dimensions of the viewing canvas.</li>
				</ul>
	</section>
</body>
</html>
