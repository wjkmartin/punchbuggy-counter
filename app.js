var config = {
    apiKey: "AAAARBOssDY:APA91bF16wbUSOA-J8F1ZMEQ0B4Ml7OKTJK3D3YKD6tpeDvL0gAbVCvZbrK-0MDlQfOJlikXslRp4TJvi7eMVLx8FGw0BNXjL-xpnQW6_hpJTBrwheBLekJDF9dPjDB0tYlLBWm0b0oa",
    databaseURL: "https://punch-buggy-e83c6.firebaseio.com/"
  };
  firebase.initializeApp(config);

var database = firebase.database();
let punches 

let d_punches = 59;
let w_punches = 30;

let progressBarDani;
let progressBarWill;

let daniBuffer = 0;
let willBuffer = 0;

function appStart() {
	
	let _progressBarDani = document.getElementById("dani-progress");
	let _progressBarWill = document.getElementById("will-progress");

	progressBarDani = _progressBarDani;
	progressBarWill = _progressBarWill;
	update(_progressBarDani, _progressBarWill);
}

function update() {
	if (willBuffer > 0) {
		document.getElementById("willPunches").style.color = "green";
	}
	else {
		document.getElementById("willPunches").style.color = "black";
	}

	if (daniBuffer > 0) {
		document.getElementById("daniPunches").style.color = "green";
	}
	else {
		document.getElementById("daniPunches").style.color = "black";
	}

	document.getElementById("daniPunches").innerHTML = d_punches + daniBuffer;
	document.getElementById("willPunches").innerHTML = w_punches + willBuffer;

	progressBarDani.setAttribute("aria-valuenow", d_punches + daniBuffer);
	progressBarWill.setAttribute("aria-valuenow", w_punches + willBuffer);

	progressBarDani.setAttribute("style", 'width: ' + (d_punches + daniBuffer).toString() + '%')
	progressBarWill.setAttribute("style", 'width: ' + (w_punches + willBuffer).toString() + '%');

}

function d_press() {
	daniBuffer += 1;
	update();
}

function w_press() {
	willBuffer += 1;
	update();
}

function confirm() {
	d_punches += daniBuffer;
	w_punches += willBuffer;

	daniBuffer = 0;
	willBuffer = 0;

	update();
	
}