'use strict';

// Elementos "Globales";
const modal = document.querySelector('#modal');
const divContenido = document.querySelector('#div-contenido-modal');
const btnCerrarModal = document.querySelector('#btn-cerrar-modal');
const spanTitleModal = document.querySelector('#span-title-modal');


// Variables "globales"
let tiempo = {
	trabajo: {
		h: 0,
		m: 25,
		s: 0,
	},
	descansoCorto: {
		h: 0,
		m: 5,
		s: 0,
	},
	descansoLargo: {
		h: 0,
		m: 15,
		s: 0,
	},
}


// Eventos "globales"
btnCerrarModal.addEventListener('click', () => modal.classList.remove('open'));
document.addEventListener('keydown', (e) => {
	if (e.key === "Escape" && modal.classList.contains('open')) {
		modal.classList.remove('open');
	}
});


if (Notification.permission === 'default') {
	Notification.requestPermission().then(function(estado) {
		console.log("Permiso:", estado);
	});
}