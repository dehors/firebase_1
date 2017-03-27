(function () {
	var config = {
		apiKey: "AIzaSyDS5JDH0OeTTywz-GQ29FkGXqN-TZGRShc",
		authDomain: "inatec-6d717.firebaseapp.com",
		databaseURL: "https://inatec-6d717.firebaseio.com",
		storageBucket: "inatec-6d717.appspot.com",
		messagingSenderId: "51838091736"
	};
	firebase.initializeApp(config);
	var userConect = null;
	var UserKey = "";
	var database = firebase.database();

	//Obtener elemento
	const preObject = document.getElementById('objeto');
	const ulList = document.getElementById('list');
	//Crear referencia
	var dbRef1 = database.ref().child('objeto');
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
		console.log(snap.val());
	});

	dbRef2.on('child_removed', snap => {
		const liRemove = document.getElementById('snap.key');
		liRemove.remove();
	});

	//Auth
	const txtEmail = document.getElementById('txtEmail');
	const txtPassword = document.getElementById('txtPassword');
	const btnLogin = document.getElementById('btnLogin');
	const btnSingUp = document.getElementById('btnSingUp');
	const btnLogOut = document.getElementById('btnLogOut');
	//Evento login
	btnLogin.addEventListener('click', e =>{
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();

		const promise = auth.signInWithEmailAndPassword(email,pass);
		promise.catch(e => console.log(e.message));
	});

	btnSingUp.addEventListener('click', e =>{
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();

		const promise = auth.createUserWithEmailAndPassword(email,pass);
		promise.catch(e => console.log(e.message));
	});

	btnSingUp.addEventListener('click', e =>{
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();

		const promise = auth.createUserWithEmailAndPassword(email,pass);
		promise.catch(e => console.log(e.message));
	});

	btnLogOut.addEventListener('click', e =>{
		firebase.auth().signOut();
		destroy();
	});

	firebase.auth().onAuthStateChanged( firebaseUser => {
		if (firebaseUser) {
			console.log(firebaseUser);
			btnLogOut.classList.remove('hide');
			userConect=database.ref("/users");
			store(firebaseUser.uid,firebaseUser.email);
			userConect.on('child_added',function(data){
				console.log('Se a conectado '+data.val().email);
			});

			userConect.on('child_removed', snap => {
				console.log(snap.val().email+" Ha cerrado");
			});

		}else{
			console.log('no logeuado');
			btnLogOut.classList.add('hide');
		}
	});

	//Upload
	var uploader = document.getElementById('uploader');
	var fileButton = document.getElementById('fileButton');

	fileButton.addEventListener('change',function(e){
		var file = e.target.files[0];
		var storageRef = firebase.storage().ref('mis_fotos/'+file.name);
		var task = storageRef.put(file);
		task.on('state_changed',
			function progress(snapshot){
				var percentage = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
				uploader.value = percentage;
			},
			function error(err){

			},
			function complete(){

			}
		);
	});

	//Consultar
	const cursos = dbRef1.child('cursos/js');
	const suscritos = dbRef1.child('suscritoCurso/js');

	const curso = dbRef1.child('cursos');
	// const query = curso
	// 			  .orderByChild('nombre')
	// 			  .equalTo('sdasd')
	// 			  .limitToFirst(1);

	cursos.on('value',snap => {
		console.log(JSON.stringify(snap.val(),null,3));
	});

	suscritos.on('child_added',snap => {
		console.log(JSON.stringify(snap.val(),null,3));
	});

	//Agregar registro
	function store(uid,email){
		var conectados = userConect.push({
			uid:uid,
			email:email
		});
		UserKey = conectados.key;
	}
	function destroy(){
		database.ref("/users/"+UserKey).remove();
	}

	var ref = firebase.database().ref("onlineState");
	ref.onDisconnect().set(false);

	ref.onDisconnect().cancel();

	ref.onDisconnect().remove();

	var ref = firebase.database().ref("users/ada/status");
	ref.onDisconnect().set("I disconnected!");

	var ref = firebase.database().ref("users/ada");
	ref.update({
		onlineState: true,
		status: "I'm online."
	});
	ref.onDisconnect().update({
		onlineState: false,
		status: "I'm offline."
	});


}());