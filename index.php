<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
    <title>KSP Mission Overview Generator</title>
    <meta charset="utf-8" />
    <meta name="description" content="A Mission Overview Generator for Kerbal Space Program"/>
	<meta name="author" content="Thunderous Echo"/>
    <meta name="keywords" content="missions, planning, graphics"/>
    <meta name="msapplication-config" content="none"/>
	
    <link rel="shortcut icon" href="favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="base.css"/>
    <link rel="stylesheet" type="text/css" href="custom.css"/>
	<link rel="stylesheet" type="text/css" href="sectionFill.css"/>
	
	<script src="jquery-2.1.3.min.js"></script>
	<script type="text/javascript" src="jscolor/jscolor.js"></script>
	<script type="text/javascript" src="MPN.js"></script>
	<script type="text/javascript" src="Draw.js"></script>
	<script type="text/javascript" src="LocateMouse.js"></script>
	<script type="text/javascript" src="Planets.js"></script>
	<script type="text/javascript" src="PanelMenu.js"></script>
	<script type="text/javascript" src="Key.js"></script>
	<script type="text/javascript" src="Crafts.js"></script>
	<script type="text/javascript" src="ColorSelector.js"></script>
	<script type="text/javascript" src="Snap.js"></script>
	
</head>
<body>
	<div class="menu" style="text-align:center; font-size:x-large;">
		<a title="Kerbaltek Home" href="/">Home</a>
        <a onclick="window.open(this.href);return false;" href="http://forum.kerbalspaceprogram.com/threads/102508">Forum Thread/Rules</a>
		<a onclick="window.open(this.href);return false;" href="https://github.com/Ezriilc/KSP-Mission-Overview-Generator">Source</a>
		<div style="clear:both;"></div>
	</div>
	
	<div id = "craftModelSel" class = "sel" style = "text-align: left; left: 0%">
		<h4>Craft Models:</h4>
		<input type = "button" value = "Hide" style = "height:20px" onclick="setPopout(2)" />
		<div id = "craftSel"></div>
		<input type = "button" value = "+ Model" style = "height:20px" onclick="createCraftModel(this)" />
	</div>
	<div id = "planetModelSel" class = "sel" style = "text-align: left; left: 100%; transform: translate(-100%, 0%);">
		<h4>Planet Models:</h4>
		<input type = "button" value = "Hide" style = "height:20px" onclick="setPopout(3)"></input>
		<input type = "button" value = "Restore defaults" style = "height:20px" onclick="resetPlanetModels(this)" />
		<div id = "planetSel"></div>
		<input type = "button" value = "+ Model" style = "height:20px" onclick="createPlanetModel(this)" />
	</div>
	
	<div style= "display: block">
		<canvas class = "rounded"
		id="myCanvas" 
		width="1000" height="500" 
		style= "border:1px solid #6c823d; 
		text-align: center; margin-top: 5px"
		></canvas>
	</div>
		<div id = "windowButtons" style= "text-align: center; display: table; margin: auto">
			<section style= "text-align: left; display: table-cell">
				<h1>View</h1>
				Size:  <input id="width" type = "text" size = "4" onchange = "changeWidth(this)" value = "1000"/> x <input id="height" type = "text" size = "4" onchange = "changeHeight(this)" value="500" />
				<p>Grid-lines: <input id="gridlines" type = "checkbox" checked/></p>
			</section>
			<section style= "text-align: right; display: table-cell">
				<h1 style = "text-align: left">Snap</h1>
				<p>Horizontal:  <input id="horizontalSnap" type = "text" size = "3" value = "32"/></p>
				<p>Vertical:  <input id="verticalSnap" type = "text" size = "3" value="32"/></p>
				<p>Radial: 	<input id="radialSnap" type = "text" size = "3" value="8"/></p>
				<p>Linear: 	<input id="linearSnap" type = "text" size = "3" value="4"/></p>
				<p>Angular: 	<input id="angleSnap" type = "text" size = "3" value="8"/></p>
				<p>Connecting: 	<input id="connectSnap" type = "text" size = "3" value="16"/></p>
			</section>
			<section style= "text-align: left; display: table-cell">
				<h1>Help</h1>
				<p><input type = "checkbox" id="instructionsShow" value = "Help" onclick = "setWindow(4)"/> Help</p>
				<p><input type = "checkbox" id="instructionsShow" value = "Help" onclick = "setWindow(2)"/> FAQs</p>
				<p><input type = "checkbox" id="rulesShow" value = "Rules" onclick = "setWindow(7)"/> Hotkeys</p>
				<p><a onclick="window.open(this.href);return false;" href="http://forum.kerbalspaceprogram.com/threads/102508">Rules</a></p>
			</section>
			<section style= "text-align: left; display: table-cell">
				<h1>Model List Sidebars</h1>
				<p><input id = "showCraftModelList" type = "checkbox" onclick = "setPopout(0)" checked /> Craft Models</p>
				<p><input id = "showPlanetModelList" type = "checkbox" onclick = "setPopout(1)" checked /> Planet Models</p>
				<h3>Editing Sections</h3>
				<p><input type = "checkbox" id="craftEditShow" value = "Crafts" onclick = "setWindow(0)" checked /> Crafts</p>
				<p><input type = "checkbox" id="craftEditShow" value = "Craft Models" onclick = "setWindow(5)" checked /> Craft Models</p>
				<p><input type = "checkbox" id="planetEditShow" value = "Planets" onclick = "setWindow(1)" checked /> Planets</p>
				<p><input type = "checkbox" id="craftEditShow" value = "Planet Models" onclick = "setWindow(6)" checked /> Planet Models</p>
			</section>
		</div>
		<section style= "background-color: #ffff00; display: block" id="warningSection">
			<h1>Errors</h1>
			<ul id = "warnings"></ul>
		</section>
		<section style= "text-align: center; display: block" id = "craftEdit">
			<h5 id = "selCraft">Select a craft to edit</h5>
			<div id= "craft">
				<h1 id="label2">Untitled Space Craft</h1>
				<input type = "button" value = "Delete" onclick="deleteCraftButton(this)" align = "text-align: center"/>
				<input type = "button" value = "Recenter" onclick="craftRecenterButton(this)" align = "text-align: center"/>
				<input type = "button" value = "Deselect" onclick="currentCraft = false; craftShown = false; updateSelector();" align = "text-align: center"/>
				
				<section style = "text-align: center">
					<h3>Appearance</h3>
					<p>Type: <select id="typeSel" onchange="setCraftType(this)">
						<option value = "t0">Transfer</option>
						<option value = "t1">Landing</option>
						<option value = "t2">Ascent</option>
						<option value = "t3">Orbit</option>
						<option value = "t4">Flyby</option>
					</select></p>
					<div style = "text-align: left">
						<p id = "ccwIn"><input id = "ccwCheckbox" type = "checkbox" onclick = "currentCraft.ccw = !currentCraft.ccw" checked></input>Counter-clockwise</p>
						<p id = "aerobrakeIn"><input id = "aerobrakeCheckbox" type = "checkbox" onclick = "currentCraft.aerobrake = !currentCraft.aerobrake"></input>Aerobraking</p>
						<p id = "destroyIn"><input id = "destroyCheckbox" type = "checkbox" onclick = "currentCraft.destroy = !currentCraft.destroy"></input>Destroy</p>
						<p id = "refuelIn"><input id = "refuelCheckbox" type = "checkbox" onclick = "currentCraft.refuel = !currentCraft.refuel"></input>Refuelling</p>
						<p id = "startIn"><input id = "startCheckbox" type = "checkbox" onclick = "currentCraft.startArrow = !currentCraft.startArrow"></input>There-and-Back</p>
						<!--<p><button>▲</button><button>▼</button> Chronological label <canvas id = "chronologicalIndexPreview" width = "12" height = "12"></canvas></p>-->
					</div>
				</section>
				<p></p>
				<section style = "display: inline-block">
					<p id="label4" style = "display: inline-block">Model:</p>
					<button id="label5" style = "display: inline-block" onclick = "setCraftModelToCurrent()">Change to selected model: "Untitled Space Craft"</button>
				</section>
				<section style = "display: inline-block">
					<p id="label8" style = "display: inline-block">Parent Planet:</p>
					<button id="label9" onclick = "setCraftPlanetToCurrent(true)" style = "display: inline-block">Change to selected planet: "Untitled Planet"</button>
					<button onclick = "setCraftPlanetToCurrent(false)" style = "display: inline-block">Clear</button>
				</section>
			</div>
		</section>
		<section style= "text-align: center; display: block" id = "craftModelEdit">
			<h5 id = "selCraft2">Select a craft model to edit</h5>
			<div id= "craft2">
				<h1 id="label3">Untitled Space Craft</h1>
				<input id = "deleteCraftModelButton" type = "button" value = "Delete" onclick="deleteCraftModelButton(this)" align = "text-align: center"/>
				<input type = "button" value = "Deselect" onclick="currentCraftModel = false; craftModelShown = false; updateSelector();" align = "text-align: center"/>
				<p>Name:   <input id="name2" type = "text" onchange = "name2(this)"/></p>
				<p>Color:   <input id="color2" class="color {hash:true,caps:false,pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black',pickerClosable:true,onImmediateChange:'updateColor(this, 2);'}"></p>
				<p>Line Width:   <input id="width2" type = "text" size = "2" onchange = "width2(this)"></input></p>
			</div>
		</section>
		<section style= "text-align: center; display: block" id = "planetEdit">
				<h5 id = "selPlanet" >Select a planet to edit</h5>
				<h1 id="label1">Untitled Planet</h1>
				<div id= "planet" align = "text-align: right">
					<input type = "button" value = "Delete" onclick="deletePlanetButton(this)" align = "text-align: center"/>
					<input type = "button" value = "Recenter" onclick="planetRecenterButton(this)" align = "text-align: center"/>
					<input type = "button" value = "Deselect" onclick="currentPlanet = false; planetShown = false; updateSelector();" align = "text-align: center"/>
					<section style = "display: inline-block">
						<p id="label6" style = "display: inline-block">Model:</p>
						<button id="label7" onclick = "setPlanetModelToCurrent()" style = "display: inline-block">Change to selected model: "Untitled Planet"</button>
					</section>
				</div>
			</section>
			<section style= "text-align: center; display: block" id = "planetModelEdit">
				<h5 id = "selPlanet2">Select a planet model to edit</h5>
				<h1 id="label0">Untitled Planet</h1>
				<div id= "planet2" align = "text-align: right">
					<input id = "deletePlanetModelButton" type = "button" value = "Delete" onclick="deletePlanetModelButton(this)" align = "text-align: center"/>
					<input type = "button" value = "Deselect" onclick="currentPlanetModel = false; planetModelShown = false; updateSelector();" align = "text-align: center"/>
					<p>Name:   <input id="name1" type = "text" onchange = "name1(this)"/></p>
					<p>Abbreviation:   <input id="abbr" type = "text" size = "2" onchange = "abbr(this)"/></p>
					<p>Outline Color:   <input id="color0" class="color {hash:true,caps:false,pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black', pickerClosable:true, required:false, onImmediateChange:'updateColor(this, 0);'}"/></p>
					<p>Fill Color:   <input id="color1" class="color {hash:true,caps:false,pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black', pickerClosable:true, required:false, onImmediateChange:'updateColor(this, 1);'}"/></p>
					<p>Hierarchial Index:   <input id="ind" type = "text" size = "2" onchange = "ind(this)"/></p>
				</div>
			</section>
		<section style= "text-align: left; display: block; background-color: #ffffff" id = "hotkeys" >
			<h1>Hotkeys</h2>
				<ul>
					<li>Force Undocking/Docking: Hold <strong>Alt</strong> while dragging a craft's start or end point. This will snap it along a craft's line instead of its start or end point as normally done with crafts of two different models. This is only necessary when docking a craft to a craft of the same model.</li>
				</ul>
		</section>
		<section style= "text-align: left; display: block; background-color: #ffffff" id = "faq" >
			<h1>FAQs</h1>
			<h4>How do I add a craft or planet?</h4>
			<p>To create a craft or planet, click the "+" in the "Craft Models" or "Planet Models" list under the model you want to add an instance of.</p>
		</section>
		<section style= "text-align: left; display: block; background-color: #ffffff" id = "instructions" >
			<h1>Help</h1>
				<h2>Crafts and Planets</h2>
					<p>To create a craft or planet, click the "+" in the "Craft Models" or "Planet Models" list under the model you want to add an instance of.</p>
					<h4>Crafts</h4>
					<p>One "Craft" is one part of the path a represented vessel (or instance of a represented vessel) takes and that appears in the Overview. Asteroids are sometimes crafts.</p>
					<ul>
						<li>A "Transfer" represents an or part of an interstellar, interplanetary or 'intermoonar' transfer. This is the only type of maneuver that snaps to the global grid and does not require a parent planet. You can chain these to avoid obstacles.</li>
						<li>A "Landing" represents a landing/descent onto a celestial body. These automatically snap their ending point to their parent planet.</li>
						<li>An "Ascent" represents an ascent from a celestial body. These automatically snap their starting point to their parent planet.</li>
						<li>An "Orbit" represents a notable time at which a craft was in orbit around a celestial body. Other crafts always connect to these along their circumference, never at the start and end points.</li>
						<li>A "Flyby" represents a flyby/gravity assist from a celestial body, or a close encounter with an asteroid.</li>
					</ul>
					<p>Start points are shown as diamonds and end points are shown as circles.</p>
					<h4>Planets</h4>
					<p>One "Planet" is one instance of a planet that appears in the Overview and interacts with crafts. A "Planet" represents one celestial body (anything with an SOI and gravity, plus sometimes asteroids).</p>
					<h4>Craft and Planet Editing Sections</h4>
						<p>To open this section, select a craft or planet by clicking on it or by clicking on its instance number in the "Craft Models" or "Planet Models" lists under its model, then check "Crafts" or "Planets" under "Editing Sections". The section will open at the instance number of this craft in the model list.</p>
						<ul>
							<li>"Delete" deletes this craft or planet.</li>
							<li>"Recenter" moves this craft planet to the center of the screen.</li>
							<li>"Deselect" deselects this craft or planet.</li>
							<li>"Type"(Crafts) changes the type of maneuver this craft is.</li>
							<li>"Arrows"(Crafts) changes the location and number of arrows this craft displays.</li>
							<li>"Add Next Maneuver"(Crafts) appends another craft of the clicked type to the end of this one.</li>
							<li>"Model" is the model this craft or planet uses.</li>
								<ul>
									<li>"Change to selected model" changes the model this craft or planet uses to the currently selected model. Select models through the "Craft Models" or "Planet Models" list. This button is only available when the craft or planet's model is not the selected craft or planet model.</p>
								</ul>
							<li>"Parent Planet"(Crafts) is the parent planet this craft uses.</li>
								<ul>
									<li>"Change to selected planet"(Crafts) changes this craft's parent planet to the currently selected planet. Select a planet by clicking on it or by clicking on its instance number in the "Planet Models" list under its model. This button is only available when the craft's parent planet is not the selected planet.</p>
									<li>"Clear"(Crafts) clears this craft's parent planet. Note that if this craft is not a transfer, this will result in an error and must be resolved.</p>
								</ul>
						</ul>
				<h2>Models</h2>
					<p>To create a model, click the giant "+ Model" at the bottom of the "Craft Models" or "Planet Models" list.</p>
					<p>Each craft or planet on the screen derives its appearance and name from a model. Because all Kerbins use the same model, all Kerbins will look the same. Likewise, all copies of the same craft will look the same. Models appear in the key if they are in use.</p>
					<p>One "Craft Model" is one craft. If you launch two "Kerbal X"s, they can be represented by the same model(See Hotkeys). Asteroids are sometimes crafts.</p>
					<p>One "Planet Model" is one celestial body (anything with an SOI and gravity, plus sometimes asteroids).</p>
					<p>To create a craft or planet that uses a certain model, click the "+" in the "Craft Models" or "Planet Models" list under the model you want to add an instance of. You can change the model that an existing craft or planet uses through its editing section.</p>
					<h4>Model Editing Sections</h4>
						<p>To open this section, select a craft model or planet model by clicking on it in the "Craft Models" or "Planet Models" lists, then check "Craft Models" or "Planet Models" under "Editing Sections". The section will open at this model in the model list.</p>
						<ul>
							<li>"Delete" deletes this model, if allowed. You cannot delete any of the stock planets and must have at least 1 craft model at all times. If you cannot delete this model, this button will appear gray.</li>
							<li>"Deselect" deselects this model. </li>
							<li>"Name" is the name of a model (that will appear in the Key). </li>
							<li>"Abbreviation" (Planets) is the abbreviation that will appear on decals labelling planets that use this model. </li>
							<li>"Outline Color"(Planets), "Fill Color"(Planets), and "Color" (Crafts) are the colors that appear on crafts or planets that use this model. </li>
							<li>"Line Width" (Crafts) is the line width used to draw the paths of crafts that use this model. Must be an odd, positive integer.</li>
							<li>"Hierarchial Index" (Planets) is the hierarchial index of this model. See below.</li>
						</ul>
						<h5>Hierarchical Index</h5>
							<p>The representative size of a planet depends on what it is orbiting. Sun-Kerbol is hierarchical index 0, so it it the biggest. Things orbiting Sun-Kerbol are hierarchical index 1, so they are half the size. Things orbiting things orbiting Sun-Kerbol are hierarchical index 2, so they are half <i>that size</i>, and so on.</p>
							<p>Even though Laythe is bigger than Duna, it orbits Jool, while Duna orbits the sun, so Laythe is represented at half Duna's size.</p>
							<p>Hierarchical indexes are part of a model, and can be edited through "Show Model Options" in a planet's editing section.</p>
							<p>If you set a hierarchical index to -4, that planet will be represented as 16 times larger than Sun-Kerbol. Please edit responsibly.</p>
			<h2>Key</h2>
				<p>The Key is the black rounded rectangle on the viewing canvas (preview section) listing active models. This will appear in the final Overview. The Key shows which craft models and planet models are which.</p>
				<p>The Key can be dragged around by dragging it on its center. You can change its size by dragging on the edges and corners.</p>
				<p>If the Key appears red, it is too small for is contents! Resize it larger!</p>
			<h2>View</h2>
				<ul>
					<li>"Size" allows you to change the dimensions of the final Overview. Values in pixels.</li>
					<li>"Grid-lines": Whether grid-lines should be shown (when relevant).</li>
				</ul>
			<h2>Snap</h2>
				<ul>
					<li>"Horizontal" and "Vertical": Transfers and planets snap to this grid, relative to the origin. Values in pixels.</li>
					<li>"Radial": All crafts except transfers snap at these incremental distances from their parent planet's <strong>surface</strong>. Values in pixels radius.</li>
					<li>"Linear": Increments along a transfer, ascent, or descent that other crafts snap to when docking or undocking. Values in number of incremental divisions.</li>
					<li>"Angular": Angles along an orbit or flyby(when docking or undocking) that other crafts snap to. Also, all crafts except transfers snap at these angles from their parent planet. Values in number of snapping angles.</li>
					<li>"Connecting": How close the end point of one craft and the start point of another must be brought for them to connect. Values in pixels.</li>
					<p>Set any of these to zero to disable them.</p>
				</ul>
				<p>Grid-lines are shown when relevant if grid-lines are enabled. Enable grid-lines through "Grid-lines" in the view window.</p>
			<h2>Craft Models and Planet Models sidebars</h2>
				<p>Models can be selected from here by clicking on their button.</p>
				<p>Crafts and Planets can be selected from here by clicking on their instance button under their model.</p>
			<h2>Exporting the Overview</h2>
				<p>There is currently no "Export As" button around. You'll have to:</p>
				<ol>
					<li>Deselect all crafts. (Otherwise, the start and end points will show up in the final Overview.)</li>
					<li>Right click on the canvas (preview section) and select "Save image as...".</li>
				</ol>
				<p>If your browser cannot save directly from the canvas, <input value = "click here" type = "button" onclick = "var canvas = document.getElementById('myCanvas'); var dataURL = canvas.toDataURL(); document.getElementById('canvasImg').src = dataURL;"></input> to generate an "img" that you should be able to save.</p>
				<img id="canvasImg"></img>
	</section>
	<p>Mission Overview Generator release 1.0</p>
</body>
</html>
