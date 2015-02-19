function snapPointToLine(p, start, end) {
    var ap1 = p[0]-start[0],
        ap2 = p[1]-start[1],
        ab1 = end[0]-start[0],
        ab2 = end[1]-start[1],
        mag = ab1*ab1 + ab2*ab2,
        dot = ap1*ab1 + ap2*ab2,
        t = dot/mag;

    if (t < 0) {
        return start.slice(0);
    } else if (t > 1) {
		return end.slice(0);
    } else {
        return [start[0]+ab1*t, start[1]+ab2*t];
    }
}

function getSnappingPoints(craft, ends){ //0: start; 1: end; 5: both, else: inner
	var ret = new Array();
	if (ends == 0){
		if (craft.prevCraftType == 0){ret.push(craft.startPosition);}
	}
	else if (ends == 1){
		if (craft.nextCraftType == 0){ret.push(craft.endPosition);}
	}
	else if (ends == 5){
		if (craft.prevCraftType == 0){ret.push(craft.startPosition);}
		if (craft.nextCraftType == 0){ret.push(craft.endPosition);}
	}
	else{
		if (craft.type < 3){
			var lin = Number(document.getElementById("linearSnap").value);
			if (lin > 0){
				var num = 0;
				var inc = [craft.startPosition[0], craft.startPosition[1]];
				while (num < lin - 1){
					inc[0] -= (craft.startPosition[0] - craft.endPosition[0]) / lin;
					inc[1] -= (craft.startPosition[1] - craft.endPosition[1]) / lin;
					ret.push(inc.slice(0));
					num++;
				}
			}
		}
		else{
			var ang = Number(document.getElementById("angleSnap").value);
			if (ang > 0){
				var a = 0;
				var angle = Math.PI * 2 / ang;
				while(a < Math.PI * 2){
					if (craft.type == 4){ //flyby
						var f = a + Math.PI;
						if (f > Math.PI){f-= Math.PI * 2;}
						if (f < -Math.PI){f+= Math.PI * 2;}
						
						if (!angleWithinFlyby(
						f,
						Math.atan2(craft.startPosition[1] - craft.parentPlanet.position[1], craft.startPosition[0] - craft.parentPlanet.position[0]),
						Math.atan2(craft.endPosition[1] - craft.parentPlanet.position[1], craft.endPosition[0] - craft.parentPlanet.position[0]),
						false,
						craft.ccw
						)){
							ret.push([craft.parentPlanet.position[0] - craft.orbitHeight*Math.cos(a), craft.parentPlanet.position[1] - craft.orbitHeight*Math.sin(a)]);
						}
					}
					else{ //orbit
						ret.push([craft.startPosition[0] - craft.orbitHeight*Math.cos(a), craft.startPosition[1] - craft.orbitHeight*Math.sin(a)]);
					}
					a+= angle;
				}
			}
		}
	}
	return ret;
}

/*function angleBetween(pAng, startAng, endAng, includeEnds){
	var a = startAng - pAng;
	if (a > Math.PI){a-= Math.PI * 2;}
	if (a < -Math.PI){a+= Math.PI * 2;}
	
	var b = pAng - endAng;
	if (b > Math.PI){b-= Math.PI * 2;}
	if (b < -Math.PI){b+= Math.PI * 2;}
	
	var c = startAng - endAng;
	if (c > Math.PI){c-= Math.PI * 2;}
	if (c < -Math.PI){c+= Math.PI * 2;}
	
	a = Math.abs(a);
	b = Math.abs(b);
	c = Math.abs(c);
	
	if (Math.abs(a) < 0.01 ||  Math.abs(b) < 0.01){
		return !includeEnds;
	}
	else if (Math.abs(Math.PI - c) < 0.01){
		a = startAng - pAng;
		if (a > Math.PI){a-= Math.PI * 2;}
		if (a < -Math.PI){a+= Math.PI * 2;}
		return a < 0;
	}
	else if (Math.abs(a + b - c) < 0.01){
		return true;
	} else {
		return false;
	}
}*/

function angleWithinFlyby(pAng, startAng, endAng, includeEnds, ccw){
	var a = startAng - pAng;
	if (a > Math.PI * 2){a-= Math.PI * 2;}
	if (a < 0){a+= Math.PI * 2;}
	
	var b = pAng - endAng;
	if (b > Math.PI * 2){b-= Math.PI * 2;}
	if (b < 0){b+= Math.PI * 2;}
	
	var c = startAng - endAng;
	if (c > Math.PI * 2){c-= Math.PI * 2;}
	if (c < 0){c+= Math.PI * 2;}
	
	if (Math.abs(a) < 0.01 ||  Math.abs(b) < 0.01){
		return !includeEnds;
	}
	else{
		return (Math.abs(a + b - c) > 0.01);
	}
}

function snapPointToArc(p, start, end, center, isFlyby, flybyccw) {
    var endDist = distance(end[0], end[1], center[0], center[1]);
	var pAng = Math.atan2(p[1] - center[1], p[0] - center[0]);
	
	var startAng = Math.atan2(start[1] - center[1], start[0] - center[0]);
	var endAng = Math.atan2(end[1] - center[1], end[0] - center[0]);
	
	if (isFlyby){
		if (!angleWithinFlyby(pAng, startAng, endAng, true, flybyccw)){
			return [endDist * Math.cos(pAng) + center[0], endDist * Math.sin(pAng) + center[1]];
		}
		else{
			return false;
		}
	}
	else{
		return [endDist * Math.cos(pAng) + center[0], endDist * Math.sin(pAng) + center[1]];
	}
}

function canInlineSnap(c1, c2){
	var ret = (c1.model === c2.model && (!(c1 === c2)) && (c1.type != 3) && (c2.type != 3));
	return ret;
}

function snapPointToCraftSnappingPoints(pos, entry, ends){
	var points = getSnappingPoints(entry, ends);
	var minDist = Number.POSITIVE_INFINITY;
	var snapPoint = false;
	points.forEach(function(ent) {
		var dist = distance(ent[0], ent[1], pos[0], pos[1]);
		if(dist < minDist){
			minDist = dist;
			snapPoint = ent;
		}
	});
	return snapPoint;
}

function snapToCrafts(c, start){

	var ret = false; //whether this craft could be snapped

	var lin = Number(document.getElementById("linearSnap").value);
	var ang = Number(document.getElementById("angleSnap").value);
	var minDist = Number.POSITIVE_INFINITY;
	var snapPoint = false;
	var snapCraft = false;
	
	var e = 0;
	if (start){e = 1;}
	if (c.type == 3){e=5;}
	
	var pos = [0, 0];
	if (start){pos = c.startPosition;}
	else{pos = c.endPosition;}
	
	var inline = false;//wheteher attatched within line (not at endpoints)
	
	crafts.forEach(function(entry) {
		if (entry != c){
			var i = false; //inline
			var tp = false;
			var v = 0;
			if (entry.type < 3){
				if (!alt && canInlineSnap(c, entry)){
					tp = snapPointToCraftSnappingPoints(pos, entry, e); i = false;//endpoints
				}
				else{
					if (lin <= 0){tp = snapPointToLine(pos, entry.startPosition, entry.endPosition); i = false;}//along line
					else{tp = snapPointToCraftSnappingPoints(pos, entry, -1); i = true;}//interior points
				}
			}
			else{
				if (entry.type == 3){//doesn't need alt pressed: never snaps to end points
					if (ang <= 0){tp = snapPointToArc(pos, entry.startPosition, entry.endPosition, entry.parentPlanet.position, false, entry.ccw); i = false;}
					else{tp = snapPointToCraftSnappingPoints(pos, entry, -1); i = false;}
				}
				else{
					if (!alt && canInlineSnap(c, entry)){
						tp = snapPointToCraftSnappingPoints(pos, entry, e); i = false;//endpoints
					}
					else{
						if (ang <= 0){tp = snapPointToArc(pos, entry.startPosition, entry.endPosition, entry.parentPlanet.position, true, entry.ccw); i = false;}//along line
						else{tp = snapPointToCraftSnappingPoints(pos, entry, -1); i = true;}//interior points
					}
				}
			}
			if (tp){
				var d = distance(pos[0], pos[1], tp[0], tp[1]);
				if (minDist > d){
					minDist = d;
					snapPoint = tp;
					snapCraft = entry;
					inline = i;
				}
			}
		}
	});
	if (start){
		if (minDist < Number(document.getElementById("connectSnap").value)){
			c.startPosition = snapPoint.slice(0);
			ret = true;
		}
	}
	else{
		if (minDist < Number(document.getElementById("connectSnap").value)){
			c.endPosition = snapPoint.slice(0);
			ret = true;
		}	
	}
	return ret;
}

function detectCraftRelationships(){
	crafts.forEach(function(clearTarget) {
		clearTarget.nextCraft = false;
		clearTarget.nextCraftType = 0;
		clearTarget.prevCraft = false;
		clearTarget.prevCraftType = 0;
	});
	crafts.forEach(function(par) {
		var points = getSnappingPoints(par, -1);
		crafts.forEach(function(entry) {
			points.forEach(function(ent) {
				if (entry.endPosition[0] == ent[0] && entry.endPosition[1] == ent[1]){
					entry.nextCraft = par;
					entry.nextCraftType = 1;
				}
				else if (entry.startPosition[0] == ent[0] && entry.startPosition[1] == ent[1]){
					entry.prevCraft = par;
					entry.prevCraftType = 1;
				}
			});
			if (par.type != 3){
				if (entry.endPosition[0] == par.startPosition[0] && entry.endPosition[1] == par.startPosition[1]){
					entry.nextCraft = par;
					entry.nextCraftType = 2;
				}
				else if (entry.startPosition[0] == par.endPosition[0] && entry.startPosition[1] == par.endPosition[1]){
					entry.prevCraft = par;
					entry.prevCraftType = 2;
				}
			}
		});
	});
}

function radialSnap(pos, parent, planet, doRadialSnap){
	var dist = distance(pos[0], pos[1], parent[0], parent[1]);
	var rot = Math.atan2(-pos[1] + parent[1], -pos[0] + parent[0]);
	var rad = Number(document.getElementById("radialSnap").value);
	if (rad > 0 && doRadialSnap){
		dist = rad * Math.round((dist - planet.radius) / rad) + planet.radius;
	}
	var ang = Math.PI * 2 / Number(document.getElementById("angleSnap").value);
	if (Number(document.getElementById("angleSnap").value) > 0){
		rot = ang * Math.round(rot / ang);
	}
	pos[0] = parent[0] - dist*Math.cos(rot);
	pos[1] = parent[1] - dist*Math.sin(rot);
}