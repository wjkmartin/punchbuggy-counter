var d_punches = 44;
var w_punches = 17;

var dani = false;
var will = false;

function update() {
	document.getElementById("dani-progress").width = width(d_punches).toString() + '%';
	document.getElementById("will-progress").width = width(w_punches).toString() + '%';
}

function width(n) {
	return (n / 100) * 100;  
}

function d_press() {
	dani = true;
}

function w_press() {
	will = true;
}

function confirm() {
	if (dani) {
		d_punches++;
	}
	else if (will) {
		w_punches++;
	}
	else {
		return;
	}
	document.getElementById(id).width = width(d_punches);
	document.getElementById(id).width = width(w_punches);
	dani = false;
	will = false;
}