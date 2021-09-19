"use strict";

// const url = "file:///home/adrian/Frontend/proyectosJS/imc/";
const url = "https://adriantafoya.github.io/proyectosJS/imc/";
const headerContFlex = document.getElementById('header-cont-flex');
const linkVolver = document.getElementById('link-volver');
const indicadorHeader = document.getElementById('indicador-header');
const btnSiguiente = document.getElementById('btn-siguiente');

// Varibles form seccion
const inputAltura = document.getElementById('input-altura');
const radioSistemaPeso = document.getElementsByName('sistema-peso');
const inputPeso = document.getElementById('input-peso');


const calcularIMC = () => {
	let peso = 0, altura = 0, imc = 0, estadoSalud = '';

	altura = inputAltura.value;

	if (radioSistemaPeso[0].checked) {
		peso = parseFloat(inputPeso.value);
	} else if (radioSistemaPeso[1].checked) {
		peso = parseFloat(inputPeso.value) / 2.205;
	}

	imc = peso / (altura ** 2);
	imc = imc.toFixed(2);
	imc = parseFloat(imc);

	if (imc < 18.5) {
		estadoSalud = 'Delgadez extrema';
	} else if (imc >= 18.5 && imc < 25) {
		estadoSalud = 'Peso normal';
	} else if (imc >= 25 && imc < 30) {
		estadoSalud = 'Sobrepeso';
	} else if (imc >= 30 && imc < 35) {
		estadoSalud = 'Obesidad';
	} else if (imc >= 35) {
		estadoSalud = 'Obesidad extrema';
	}

	localStorage.setItem('imc', `${imc}`);
	localStorage.setItem('estado-salud', `${estadoSalud}`);
	location.href = "resultado.html";
}


// Deshabilitar el link volver si esta en el index
if (location.href === `${url}index.html`) {
	linkVolver.style.display = "none";
} else {
	linkVolver.style.display = "block";
}

// Si no esta el link volver, el indicador estara en el centro
if (linkVolver.style.display === "none") {
	headerContFlex.style.justifyContent = "center";
} else {
	headerContFlex.style.justifyContent = "space-beetwen";
}

if (radioSistemaPeso[0].checked) {
	inputPeso.removeAttribute('disabled');
} else if (radioSistemaPeso[1].checked) {
	inputPeso.removeAttribute('disabled');
}

document.addEventListener('click', (e) => {
	if (e.target.name === 'sistema-peso') {
		if (radioSistemaPeso[0].checked) {
			inputPeso.removeAttribute('disabled');
			inputPeso.focus();
		} else if (radioSistemaPeso[1].checked) {
			inputPeso.removeAttribute('disabled');
			inputPeso.focus();
		}
	}
});

document.addEventListener('keyup', () => {
	// Si los inputs estan completados el btn siguiente se habilita
	if (inputAltura.value !== "" && inputPeso.value !== "") {
		btnSiguiente.removeAttribute('disabled');
	} else {
		btnSiguiente.setAttribute('disabled', '');
	}
});

btnSiguiente.addEventListener('click', calcularIMC);
btnSiguiente.addEventListener('keyup', (e) => {
	if (e.keyCode === 13) {
		calcularIMC();
	}
});