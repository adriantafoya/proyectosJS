'use strict';

// Elementos HTML
const spanTemporizador = document.querySelector('#span-temporizador');
const spanProceso = document.querySelector('#span-proceso');
const progressBar = document.querySelectorAll('.progress-bar__fr');
const spanCiclo = document.querySelector('#span-ciclo');
const btnIniciar = document.querySelector('#btn-iniciar');
const btnReiniciar = document.querySelector('#btn-reiniciar');

// Variables
let tiempoTemporizador = JSON.parse(JSON.stringify(tiempo));
tiempoTemporizador.trabajo.h = parseInt(tiempo.trabajo.h);
tiempoTemporizador.trabajo.m = parseInt(tiempo.trabajo.m);
tiempoTemporizador.trabajo.s = parseInt(tiempo.trabajo.s);

tiempoTemporizador.descansoCorto.h = parseInt(tiempo.descansoCorto.h);
tiempoTemporizador.descansoCorto.m = parseInt(tiempo.descansoCorto.m);
tiempoTemporizador.descansoCorto.s = parseInt(tiempo.descansoCorto.s);

tiempoTemporizador.descansoLargo.h = parseInt(tiempo.descansoLargo.h);
tiempoTemporizador.descansoLargo.m = parseInt(tiempo.descansoLargo.m);
tiempoTemporizador.descansoLargo.s = parseInt(tiempo.descansoLargo.s);

const tiempoTrabajo = (tiempoTemporizador.trabajo.h * 360) + (tiempoTemporizador.trabajo.m * 60) + tiempoTemporizador.trabajo.s;
const tiempoDescansoCorto = (tiempoTemporizador.descansoCorto.h * 360) + (tiempoTemporizador.descansoCorto.m * 60) + tiempoTemporizador.descansoCorto.s;
const tiempoDescansoLargo = (tiempoTemporizador.descansoLargo.h * 360) + (tiempoTemporizador.descansoLargo.m * 60) + tiempoTemporizador.descansoLargo.s;
const tiempoCiclo = tiempoTrabajo + tiempoDescansoCorto;
let ciclo = 1;
let intervaloTemporizador = null;

let tiempoString = '00:00:00';


// funciones
function mostrarNotificacion(proceso, tiempo) {
	let titulo = "";
	let opciones = {};

	if (Notification.permission === 'granted') {
		if (proceso === "trabajo") {
			titulo = "Es hora de trabajar";
			opciones.body = `Es hora de trabar durante ${tiempo}`;
			opciones.icon = "../img/trabajando.png";
		} else if (proceso === "descansoCorto") {
			titulo = "Es hora de un descanso corto";
			opciones.body = `Es hora de tomar un descanso corto de ${tiempo}`;
			opciones.icon = "../img/descans.png";
		} else if (proceso === "descansoLargo") {
			titulo = "Es hora de un descanso largo";
			opciones.body = `Es hora de tomar un descanso largo de ${tiempo}`;
			opciones.icon = "../img/descans.png";
		}

		new Notification(titulo, opciones);
	}
}

function unDigito(numero) {
	if (numero < 10) {
		return "0" + numero;
	} else {
		return numero;
	}
}

function reiniciarTiempos() {
	let dataTiempo = JSON.parse(localStorage.getItem('data-pomodoro'));
	tiempoTemporizador.trabajo.h = parseInt(dataTiempo.trabajo.h);
	tiempoTemporizador.trabajo.m = parseInt(dataTiempo.trabajo.m);
	tiempoTemporizador.trabajo.s = parseInt(dataTiempo.trabajo.s);

	tiempoTemporizador.descansoCorto.h = parseInt(dataTiempo.descansoCorto.h);
	tiempoTemporizador.descansoCorto.m = parseInt(dataTiempo.descansoCorto.m);
	tiempoTemporizador.descansoCorto.s = parseInt(dataTiempo.descansoCorto.s);

	tiempoTemporizador.descansoLargo.h = parseInt(dataTiempo.descansoLargo.h);
	tiempoTemporizador.descansoLargo.m = parseInt(dataTiempo.descansoLargo.m);
	tiempoTemporizador.descansoLargo.s = parseInt(dataTiempo.descansoLargo.s);

	tiempoString = '00:00:00';
}

function temporizador(proceso) {
	let barra = null;
	let tiempoProceso = null;
	let ancho = 0;
	let tiempoNotifiacion = "";
	
	mostrarNotificacion(proceso, `${unDigito(tiempoTemporizador[proceso].h)}:${unDigito(tiempoTemporizador[proceso].m)}:${unDigito(tiempoTemporizador[proceso].s)}`);
	reiniciarTiempos();

	if (proceso !== "descansoLargo") {
		spanCiclo.textContent = ciclo;
	}

	if (proceso === "trabajo") {
		tiempoProceso = tiempoTrabajo;
		barra = progressBar[0];
		spanProceso.textContent = "Trabajando";
	} else if (proceso === "descansoCorto") {
		tiempoProceso = tiempoDescansoCorto;
		barra = progressBar[1];
		spanProceso.textContent = "Descanso corto";
	} else if (proceso === "descansoLargo") {
		tiempoProceso = tiempoDescansoLargo;
		spanProceso.textContent = "Descanso largo";
	}

	intervaloTemporizador = setInterval(() => {
		if (barra) {
			ancho = 100 - (((tiempoTemporizador[proceso].h * 360) + (tiempoTemporizador[proceso].m * 60) + tiempoTemporizador[proceso].s) * 100 / tiempoProceso);
			barra.style.setProperty('--width', `${ancho}%`);
		}

		tiempoString = `${unDigito(tiempoTemporizador[proceso].h)}:${unDigito(tiempoTemporizador[proceso].m)}:${unDigito(tiempoTemporizador[proceso].s)}`;
		spanTemporizador.textContent = tiempoString;

		if (tiempoTemporizador[proceso].h === 0 && tiempoTemporizador[proceso].m === 0 && tiempoTemporizador[proceso].s === 0) {
			clearInterval(intervaloTemporizador);

			if (proceso === "trabajo") {
				barra.style.setProperty('--width', `100%`);
				temporizador("descansoCorto");
			} else if (proceso === "descansoCorto" && ciclo%4 === 0) {
				ciclo = 1;
				progressBar[0].style.setProperty('--width', `0%`);
				progressBar[1].style.setProperty('--width', `0%`);
				temporizador("descansoLargo");
			} else if (proceso === "descansoCorto") {
				ciclo++;
				progressBar[0].style.setProperty('--width', `0%`);
				progressBar[1].style.setProperty('--width', `0%`);
				temporizador("trabajo");
			} else if (proceso === "descansoLargo") {				
				temporizador("trabajo");
			}
		} else {

			if (tiempoTemporizador[proceso].s === 0) {
				if (tiempoTemporizador[proceso].h > 0) {
					if (tiempoTemporizador[proceso].m > 0) {
						tiempoTemporizador[proceso].m--;
					} else {
						tiempoTemporizador[proceso].m = 59;
					}

					tiempoTemporizador[proceso].h--;
					tiempoTemporizador[proceso].s = 59;
				} else {
					tiempoTemporizador[proceso].m--;
					tiempoTemporizador[proceso].s = 59;
				}
			} else {
				tiempoTemporizador[proceso].s--;
			}

		}

	}, 1000);
}

function iniciarTemporizador() {
	let ancho = 0;

	reiniciarTiempos();

	temporizador("trabajo");
}


// Eventos
btnReiniciar.addEventListener('click', () => {
	let confirmacion = confirm("Seguro que desea reiniciar el temporizador incluidos los ciclos?");

	if (confirmacion === true) {
		clearInterval(intervaloTemporizador);
		reiniciarTiempos();
		spanTemporizador.textContent = tiempoString;
		spanProceso.textContent = 'Inactividad';
		spanCiclo.textContent = 0;
		spanProceso.classList.remove('indicador--activo');
		btnReiniciar.classList.add('button--d-n');
		btnIniciar.classList.remove('button--d-n');
		progressBar[0].style.setProperty('--width', `0%`);
		progressBar[1].style.setProperty('--width', `0%`);
	}
});

btnIniciar.addEventListener('click', () => {
	spanProceso.classList.add('indicador--activo');
	btnIniciar.classList.add('button--d-n');
	btnReiniciar.classList.remove('button--d-n');

	iniciarTemporizador();
});


// Ejecutar primero
progressBar[0].style.width = `${(tiempoTrabajo * 100) / tiempoCiclo}%`;
progressBar[1].style.width = `${(tiempoDescansoCorto * 100) / tiempoCiclo}%`;


// Falta mandar las notificaciones