var daniBuffer;
var willBuffer;

var daniPunches;
var willPunches;

var progressBarDani;
var progressBarWill;

var buttonPressedDani;
var buttonPressedWill;

var willComposite;
var daniComposite;

var appStarted = false;

function appStart() {
	var _daniBuffer = 0;
	var _willBuffer = 0;

	var _daniPunches;
	var _willPunches;

	var _progressBarDani = document.getElementById("dani-progress");
	var _progressBarWill = document.getElementById("will-progress");

	daniBuffer = _daniBuffer;
	willBuffer = _willBuffer;

	daniPunches = _daniPunches;
	willPunches = _willPunches;

	progressBarDani = _progressBarDani;
	progressBarWill = _progressBarWill;

	var config = {
		apiKey: "AIzaSyARFzGES2rHlAp8r7jrd68sy4MqUvIhOGk",
		authDomain: "punch-buggy-e83c6.firebaseapp.com",
		databaseURL: "https://punch-buggy-e83c6.firebaseio.com/",
	  };
	  firebase.initializeApp(config);
	
	var ref = firebase.database();
	
	getData('will', ref);
	getData('dani', ref);
}

function getData(name, ref) {
	ref.ref('punches/').on('value', (snapshot) => {
		if (name === 'dani') {daniPunches = snapshot.val().dani;}
		else if (name === 'will') {willPunches = snapshot.val().will;}
		update(true);
	});
}

function setData(name, val) {
	firebase.database().ref('punches/' + name).set(val);
}

function update() {
	willComposite = willPunches + willBuffer;
	daniComposite = daniPunches + daniBuffer;

	console.log(willComposite);

	if (willBuffer > 0) {
		document.getElementById("willPunches").style.color = "green";
	}
	else {
		document.getElementById("willPunches").style.color = "white";
	}

	if (daniBuffer > 0) {
		document.getElementById("daniPunches").style.color = "green";
	}
	else {
		document.getElementById("daniPunches").style.color = "white";
	}

	document.getElementById("daniPunches").innerHTML = daniComposite;
	document.getElementById("willPunches").innerHTML = willComposite;

	progressBarDani.setAttribute("aria-valuenow", daniComposite);
	progressBarWill.setAttribute("aria-valuenow", willComposite);

	progressBarDani.setAttribute("style", 'width: ' + (daniComposite).toString() + '%')
	progressBarWill.setAttribute("style", 'width: ' + (willComposite).toString() + '%');

	let willChange = document.getElementById('willManualOver');
	let daniChange = document.getElementById('daniManualOver');

	willChange.value = willPunches;
	daniChange.value = daniPunches;

	addPictures();
	
}

function addPictures(daniRemove, willRemove) {
	var punchImagesDani = document.getElementById('punchImagesDani');
	var punchImagesWill = document.getElementById('punchImagesWill');
	
	var punchImage = document.createElement('img');
	punchImage.src = 'punch-buggy.png';
	punchImage.className = 'img-fluid.max-width: 100%';
	punchImage.id = 'punch-image';

	if (appStarted === false){
		for (let index = 0; index < Math.max(daniPunches, willPunches); index++) {
			if (index < daniPunches) {punchImagesDani.appendChild(punchImage.cloneNode(true));}
			if (index < willPunches) {punchImagesWill.appendChild(punchImage.cloneNode(true));}
		}
	}
	
	if (daniBuffer > 0 && buttonPressedDani) {
			punchImagesDani.appendChild(punchImage.cloneNode(true));
			buttonPressedDani = false;
		}

	if (willBuffer > 0 && buttonPressedWill) {
			punchImagesWill.appendChild(punchImage.cloneNode(true));
			buttonPressedWill = false;
		}

	if (daniRemove > 0) {
		for (let index = 0; index < daniRemove ; index++) {
			var punchChild = document.getElementById('punch-image');
			punchImagesDani.removeChild(punchChild);
		}
	}
	
	if (willRemove > 0) {
		for (let index = 0; index < willRemove ; index++) {
			var punchChild = document.getElementById('punch-image');
			punchImagesWill.removeChild(punchChild);
		}
	}

	setTimeout(function() {
		appStarted = true;
	}, 100);
}


function d_press() {
	buttonPressedDani = true;
	daniBuffer += 1;
	update();
}

function w_press() {
	buttonPressedWill = true;
	willBuffer += 1;
	update();
}

function confirm() {
	setData('will', willComposite);
	setData('dani', daniComposite);

	daniBuffer = 0;
	willBuffer = 0;

	update();
}

function reset() {
	buttonPressedDani = false;
	buttonPressedWill = false;
	
	addPictures(daniBuffer, willBuffer);
	
	daniBuffer = 0;
	willBuffer = 0;
}

function manualChange() {
	var _willChange = Number(document.getElementById('willManualOver').value);
	var _daniChange = Number(document.getElementById('daniManualOver').value);

	if (_willChange != willPunches) {
		setData('will', _willChange);
	}
	
	if (_daniChange != daniPunches) {
		setData('dani', _daniChange);
	}

	update();
}
