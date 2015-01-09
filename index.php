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
		<a title="A link." href="http://forum.kerbalspaceprogram.com/threads/102508-How-to-show-What-you-did-Mission-Profile-Notation">Mission Profile Notation</a>
		<div style="clear:both;">
	</div>
	
    </div>
		<div>
			<canvas id="myCanvas" 
			width="800" height="450" 
			style= "border:1px solid #d3d3d3; 
			text-align: center; margin-top: 5px"
			></canvas>
		</div>
		
		<section style= "margin-top: 460px">
			<section style= "text-align: center; display: inline-block">
				<h5 id = "craftColor" >Select a craft to edit</h5>
				<h1 id="label2">Untitled Space Craft</h1>
				<div id= "craft" align = "right">
					Color:   <input id="color2" class="color {hash:true,caps:false,pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black',pickerClosable:true,onImmediateChange:'updateColor(this, 2);'}">
					<p></p>
					Name:   <input id="name2" type = "text"></input>
					<p></p>
					Line Width:   <input id="width2" type = "text"></input>
				</div>
			</section>
			<section style= "text-align: center; display: inline-block">
				<h5 id = "something" >A thing!</h5>
			</section>
			<section style= "text-align: center; display: inline-block">
				<h5 id = "something" >A thing!</h5>
			</section>
			<section style= "text-align: center; display: inline-block">
				<h5 id = "something" >A thing!</h5>
			</section>
			<section style= "text-align: right; display: inline-block">
				<input type = "button" value = "Add custom planet"></input>
				<p></p>
				Name:   <input id="name2" type = "text"></input>
				<p></p>
				Abbreviation:   <tag></tag>
				<p></p>
				Outline Color:   <input id="color0" class="color {hash:true,caps:false,pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black', pickerClosable:true, required:false, onImmediateChange:'updateColor(this, 0);'}">
				<p></p>
				Fill Color:   <input id="color1" class="color {hash:true,caps:false,pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black', pickerClosable:true, required:false, onImmediateChange:'updateColor(this, 1);'}">
			</section>
		</section>

</body>
</html>
