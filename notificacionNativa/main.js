'use strict';

const btnPermiso = document.querySelector('#btn-permiso');
const btnNotificacion = document.querySelector('#btn-notificacion');

function estadoNotificacion() {
	Notification.requestPermission().then(function(estado) {
		console.log("Permiso:", estado);
	});
}

btnPermiso.addEventListener('click', () => {
	estadoNotificacion();
});

btnNotificacion.addEventListener('click', () => {
	if (Notification.permission === 'granted') {
		new Notification("Ha sido hackeado", {
			body: "Su sistema ha sido vulnerado, encierre al navegador y pierda el buscador",
			icon: '../img/icono.png'
		});
	}
});