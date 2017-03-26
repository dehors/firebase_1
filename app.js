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
	const ulList = document.getElementById('list');
	//Crear referencia
	var dbRef1 = firebase.database().ref().child('objeto');
	var dbRef2 = dbRef1.child('habilidades');
	//Sicronizar cambios objecto
	dbRef1.on('value', snap => {
		preObject.innerText = JSON.stringify(snap.val(),null,3);
	});
	//Sincronizar cambios en la lista
	dbRef2.on('child_added', snap => {
		const li = document.createElement('li');
		li.innerText = snap.val();
		li.id = snap.key;
		ulList.appendChild(li);
	});

	dbRef2.on('child_changed', snap => {
		const liChanged = document.getElementById('snap.key');
		liChanged.innerText = snap.val();
	});

	dbRef2.on('child_removed', snap => {
		const liRemove = document.getElementById('snap.key');
		liRemove.remove();
	});
}());