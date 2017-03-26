(function () {
	var config = {
		apiKey: "AIzaSyDS5JDH0OeTTywz-GQ29FkGXqN-TZGRShc",
		authDomain: "inatec-6d717.firebaseapp.com",
		databaseURL: "https://inatec-6d717.firebaseio.com",
		storageBucket: "inatec-6d717.appspot.com",
		messagingSenderId: "51838091736"
	};
	firebase.initializeApp(config);

	//Obtener elemento
	const preObject = document.getElementById('objeto');
	//Crear referencia
	var dbRef1 = firebase.database().ref().child('objeto');
	//Sicronizar cambios objecto
	dbRef1.on('value', snap => {
		preObject.innerText = JSON.stringify(snap.val(),null,3);
	});
}());