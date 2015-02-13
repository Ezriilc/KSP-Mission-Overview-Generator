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
		//return false;
    } else if (t > 1) {
		return end.slice(0);
		//return false;
    } else {
        return [start[0]+ab1*t, start[1]+ab2*t];
    }
}

function getSnappingPoints(craft, start, end){
	var ret = new Array();
	if(start){
		ret.push(craft.startPosition.slice(0));
	}
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
					
					if (!angleBetween(
					f,
					Math.atan2(craft.startPosition[1] - craft.parentPlanet.position[1], craft.startPosition[0] - craft.parentPlanet.position[0]),
					Math.atan2(craft.endPosition[1] - craft.parentPlanet.position[1], craft.endPosition[0] - craft.parentPlanet.position[0]),
					false)){
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
	if(end){
		ret.push(craft.endPosition.slice(0));
	}
	return ret;
}

function angleBetween(pAng, startAng, endAng, includeEnds){
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
}

function snapPointToArc(p, start, end, center, isFlyby) {
    var endDist = distance(end[0], end[1], center[0], center[1]);
	var pAng = Math.atan2(p[1] - center[1], p[0] - center[0]);
	
	var startAng = Math.atan2(start[1] - center[1], start[0] - center[0]);
	var endAng = Math.atan2(end[1] - center[1], end[0] - center[0]);
	
	if (isFlyby){
		if (!angleBetween(pAng, startAng, endAng, true)){
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

function canSnap(c1, c2){
	return c1.model === c2.model && !(c1 === c2) && c1.type != 3 && c2.type != 3;
}

function snapToCrafts(c, start){
	if (c.type != 3){
		if (start){
			crafts.forEach(function(entry) {
				if (entry != c){
					var tp = false;
					var v = 0;
					if (entry.type < 3){
						tp = snapPointToLine(c.startPosition, entry.startPosition, entry.endPosition);
					}
					else if (entry.type == 3){
						tp = snapPointToArc(c.startPosition, entry.startPosition, entry.endPosition, entry.parentPlanet.position, false);
					}
					else{
						tp = snapPointToArc(c.startPosition, entry.startPosition, entry.endPosition, entry.parentPlanet.position, true);
					}
					if (tp){
						var d = distance(c.startPosition[0], c.startPosition[1], tp[0], tp[1]);
						if (d < Number(document.getElementById("connectSnap").value)){
							c.startPosition = tp;
							c.prevCraft = entry;
							//if (entry.type > 2){
							//	radialSnap(c.startPosition, entry.parentPlanet.position, entry.parentPlanet, false);
							//}
						}
					}
				}
			});
		}
		else{
			crafts.forEach(function(entry) {
				if (entry != c){
					var tp = false;
					var v = 0;
					if (entry.type < 3){
						tp = snapPointToLine(c.endPosition, entry.startPosition, entry.endPosition);
					}
					else if (entry.type == 3){
						tp = snapPointToArc(c.endPosition, entry.startPosition, entry.endPosition, entry.parentPlanet.position, false);
					}
					else{
						tp = snapPointToArc(c.endPosition, entry.startPosition, entry.endPosition, entry.parentPlanet.position, true);
					}
					if (tp){
						var d = distance(c.endPosition[0], c.endPosition[1], tp[0], tp[1]);
						if (d < Number(document.getElementById("connectSnap").value)){
							c.endPosition = tp;
							c.nextCraft = entry;
							//if (entry.type > 2){
							//	radialSnap(c.endPosition, entry.parentPlanet.position, entry.parentPlanet, false);
							//}
						}
					}
				}
			});
		}
	}
}

function snapToAdjacentCrafts(c, start){
	if (start){
		crafts.forEach(function(entry) {
			var d = distance(c.startPosition[0], c.startPosition[1], entry.endPosition[0], entry.endPosition[1]);
			if(canSnap(entry, c) && d < Number(document.getElementById("connectSnap").value) && d > 0){
				c.startPosition[0] = entry.endPosition[0];
				c.startPosition[1] = entry.endPosition[1];
			}
		});
	}
	else{
		crafts.forEach(function(entry) {
			var d = distance(c.endPosition[0], c.endPosition[1], entry.startPosition[0], entry.startPosition[1]);
			if(canSnap(entry, c) && d < Number(document.getElementById("connectSnap").value) && d > 0){
				c.endPosition[0] = entry.startPosition[0];
				c.endPosition[1] = entry.startPosition[1];
			}
		});
	}
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