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
	});

	firebase.auth().onAuthStateChanged( firebaseUser => {
		if (firebaseUser) {
			console.log(firebaseUser);
			btnLogOut.classList.remove('hide');
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

}());