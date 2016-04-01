function getMapHeight() {
	var map = document.getElementById("map");
	return parseInt(map.style.height);
}

function getMapWidth() {
	var map = document.getElementById("map");
	return parseInt(map.style.width);
}

function getMapTop() {
	var map = document.getElementById("map");
	return parseInt(map.style.top);
}

function getMapLeft() {
	var map = document.getElementById("map");
	return parseInt(map.style.left);
}

function getMapDivHeight() {
	var map_div = document.getElementById("map-div");
	return parseInt(map_div.offsetHeight);
}

function getMapDivWidth() {
	var map_div = document.getElementById("map-div");
	return parseInt(map_div.offsetWidth);
}

function getMapDivTop() {
	var map_div = document.getElementById("map-div");
	return parseInt(map_div.offsetTop);
}

function getMapDivLeft() {
	var map_div = document.getElementById("map-div");
	return parseInt(map_div.offsetLeft);
}

function isInMapDiv(x,y) {
	return (x >= getMapDivLeft() && x <= getMapDivLeft() + getMapDivWidth() && y >= getMapDivTop() && y <= getMapDivTop() + getMapDivHeight());
}

/// DRAGGING FUNCTIONS
// for real dragging, you'll want to track the distance between where the
// mouse button is going down and the actual corner of the map

var isDragging = false;

var xOffSet;
var yOffSet;

function handleMouseDown(evt) {
	evt = (evt) ? evt : ((event) ? event : null);
	
	if (isInMapDiv(evt.clientX,evt.clientY)) {
		isDragging = true;
		xOffSet = evt.clientX - getMapLeft();
		yOffSet = evt.clientY - getMapTop();
		document.body.style.cursor = "move";
		return false;	// don't forget this line or some versions of Firefox will get in trouble when dragging
	}
}

function handleMouseUp(evt) {
	evt = (evt) ? evt : ((event) ? event : null);
	
	if (isDragging) {
		var map = document.getElementById("map");
		map.style.left = evt.clientX - xOffSet + "px";
		map.style.top = evt.clientY - yOffSet + "px";
		document.body.style.cursor = "default";
		isDragging = false;
	}
}

function handleMouseMove(evt) {
	evt = (evt) ? evt : ((event) ? event : null);
	
	if (isDragging) {
		var map = document.getElementById("map");
		map.style.left = evt.clientX - xOffSet + "px";
		map.style.top = evt.clientY - yOffSet + "px";
		return false;  // don't forget this line or some versions of IE won't allow dragging;
	}
}

function handleDoubleClick(evt) {
	evt = (evt) ? evt : ((event) ? event : null);

	if (isInMapDiv(evt.clientX,evt.clientY)) {
		var center_x = getMapDivLeft() + getMapDivWidth() / 2;
		var center_y = getMapDivTop() + getMapDivHeight() / 2;
		var offset_x = center_x - evt.clientX;
		var offset_y = center_y - evt.clientY;
		var map = document.getElementById("map");
		map.style.left = getMapLeft() + offset_x + "px";
		map.style.top = getMapTop() + offset_y + "px";
	}
}

function scrollHalf(dir) {
	var map = document.getElementById("map");
	var h = getMapDivHeight();
	var w = getMapDivWidth();
	var t = getMapTop();
	var l = getMapLeft();
	alert(getMapLeft());
	switch(dir) {
		case 0: map.style.top = t - h / 2 + "px"; break;
		case 1: map.style.left = l - w / 2 + "px"; break;
		case 2: map.style.left = l + w / 2 + "px"; break;
		case 3: map.style.top = t + h / 2 + "px"; break;
		default: break;
	}
}

var imgIndex = 0;
var s_w = 1283;
var s_h = 997;
var m_w = 2047;
var m_h = 1589;
var l_w = 3063;
var l_h = 2373;
var xl_w = 4084;
var xl_h = 3164;

function zoom(z_dir) {
	var center_x = getMapDivWidth() / 2;
	var center_y = getMapDivHeight() / 2;
	var offset_x;
	var offset_y;
	if (z_dir == 0 && imgIndex != 3) {
		if (imgIndex == 0) {
			offset_x = (center_x - getMapLeft()) * m_w / s_w;
			offset_y = (center_y - getMapTop()) * m_h / s_h;
			document.getElementById("map").src="map-m.gif";
		} else if (imgIndex == 1) {
			offset_x = (center_x - getMapLeft()) * l_w / m_w;
			offset_y = (center_y - getMapTop()) * l_h / m_h;
			document.getElementById("map").src="map-l.gif";
		} else if (imgIndex == 2) {
			offset_x = (center_x - getMapLeft()) * xl_w / l_w;
			offset_y = (center_y - getMapTop()) * xl_h / l_h;
			document.getElementById("map").src="map-xl.gif";
		}
		imgIndex++;
	} else if (z_dir == 1 && imgIndex != 0) {
		if (imgIndex == 3) {
			offset_x = (center_x - getMapLeft()) * l_w / xl_w;
			offset_y = (center_y - getMapTop()) * l_h / xl_h;
			document.getElementById("map").src="map-l.gif";
		} 
		else if (imgIndex == 2) {
			offset_x = (center_x - getMapLeft()) * m_w / l_w;
			offset_y = (center_y - getMapTop()) * m_h / l_h;
			document.getElementById("map").src="map-m.gif";
		} else if (imgIndex == 1) {
			offset_x = (center_x - getMapLeft()) * s_w / m_w;
			offset_y = (center_y - getMapTop()) * s_h / m_h;
			document.getElementById("map").src="map-s.gif";;
		}
		imgIndex--;
	}
	var map = document.getElementById("map");
	map.style.left = center_x - offset_x + "px";
	map.style.top = center_y - offset_y + "px";
}

/// SETUP FUNCTIONS

document.onmousedown = handleMouseDown;
document.onmouseup = handleMouseUp;
document.onmousemove = handleMouseMove;
document.ondblclick = handleDoubleClick;