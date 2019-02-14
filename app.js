var daniBuffer;
var willBuffer;

var daniPunches;
var willPunches;

var progressBarDani;
var progressBarWill;


var buttonPressedDani;
var buttonPressedWill;

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
		update();
	});
}

function setData(name, val) {
	firebase.database().ref('punches/' + name).set(val);
}

function update() {
	
	willComposite = willPunches + willBuffer;
	daniComposite = daniPunches + daniBuffer;

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

	addPictures(daniPunches, willPunches);
}

function addPictures(dPunches, wPunches) {
	var punchImagesDani = document.getElementById('punchImagesDani');
	var punchImagesWill = document.getElementById('punchImagesWill');
	
	var punchImage = document.createElement('img');
	punchImage.src = 'punch-buggy.png';
	punchImage.width = '30';
	punchImage.height = '30';
	punchImage.className = 'img-fluid.max-width: 100%';
	punchImage.id = 'punch-image';

	if (willBuffer == 0 && daniBuffer == 0){
		for (let index = 0; index < Math.max(dPunches, wPunches); index++) {
			if (index < dPunches) {punchImagesDani.appendChild(punchImage.cloneNode(true));}
			if (index < wPunches) {punchImagesWill.appendChild(punchImage.cloneNode(true));}
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
