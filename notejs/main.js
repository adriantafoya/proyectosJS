"use strict";

// Contantes
const aside = document.querySelector('aside');
const main = document.querySelector('main');
const tagNoHayNotas = document.querySelector('#tagNoHayNotas');
const sectionNotas = document.querySelector('#sectionNotas');
const txtTituloNota = document.querySelector('#txtTituloNota');
const txtContenidoNota = document.querySelector('#txtContenidoNota');
const btnEliminarNota = document.querySelector('#btnEliminarNota');
const btnMenuNotas = document.querySelector('#btnMenuNotas');
const btnNuevaNota = document.querySelector('#btnNuevaNota');

// Variables
let idDeNotaSeleccionada = '';
let idDeNotaSeleccionadaParaEliminacion = '';
let menuNotasVisible = true;

// Funciones
function elementoVisible(idElemento) {
	return (idElemento.classList.contains('oculto'))?true:false;
}

function ocultarElemento(idElemento) {
	idElemento.classList.add('oculto');
}

function mostrarElemento(idElemento) {
	idElemento.classList.remove('oculto');
}

function eliminarNota() {
	let confirmar = confirm("Si elimina esta nota no podra recuperarla, seguro que desea continuar?");

	if (confirmar === true) {
		let data = JSON.parse(localStorage.getItem('data'));

		if (idDeNotaSeleccionadaParaEliminacion === idDeNotaSeleccionada) {
			idDeNotaSeleccionada = '';
			txtTituloNota.value = '';
			txtContenidoNota.value = '';
		}

		delete data[idDeNotaSeleccionadaParaEliminacion];

		if (Object.entries(data).length === 0) {

			localStorage.removeItem('data');
			mostrarElemento(tagNoHayNotas);
			ocultarElemento(sectionNotas);

		} else {
			localStorage.setItem('data', JSON.stringify(data));
		}

		sectionNotas.removeChild(document.querySelector(`#${idDeNotaSeleccionadaParaEliminacion}`));
		idDeNotaSeleccionadaParaEliminacion = '';
	}

	ocultarElemento(btnEliminarNota);
}

function crearNuevaNota() {
	const existeData = localStorage.getItem('data')?true:false;

	if (existeData === false) {
		ocultarElemento(tagNoHayNotas);
		mostrarElemento(sectionNotas);
	}

	if (idDeNotaSeleccionada !== "") {
		document.querySelector(`#${idDeNotaSeleccionada}`).classList.remove('seleccionado');
	}

	if (screen.width <= 768 || window.innerWidth <= 768) {
		ocultarElemento(aside);
		mostrarElemento(btnMenuNotas);
	}

	mostrarElemento(main);
	idDeNotaSeleccionada = "";
	txtTituloNota.value = "";
	txtContenidoNota.value = "";
	txtTituloNota.focus();
	guardarCambios();
}

function guardarCambios() {

	const existeData = localStorage.getItem('data')?true:false;
	let data = {};

	// Buscar el registro de notas
	if (existeData) {
		data = JSON.parse(localStorage.getItem('data'));
	}

	if (idDeNotaSeleccionada === '') {
		const idNota = `n-${Date.now()}`;
		let nuevoOption = document.createElement('option');

		nuevoOption.setAttribute('id', idNota);
		nuevoOption.setAttribute('value', idNota);
		nuevoOption.setAttribute('title', txtTituloNota.value);
		nuevoOption.textContent = txtTituloNota.value;

		sectionNotas.prepend(nuevoOption);
		marcarNotaSeleccionada(idNota);

		data[idNota] = {
			titulo: txtTituloNota.value,
			contenido: txtContenidoNota.value
		}
	} else {
		data[idDeNotaSeleccionada] = {
			titulo: txtTituloNota.value,
			contenido: txtContenidoNota.value
		}

		document.querySelector(`#${idDeNotaSeleccionada}`).textContent = txtTituloNota.value;
	}

	// Almacenar los datos en localStorage
	localStorage.setItem('data', JSON.stringify(data));
}

function marcarNotaSeleccionada(idNota) {
	if (idDeNotaSeleccionada !== "") {
		document.querySelector(`#${idDeNotaSeleccionada}`).classList.remove('seleccionado');
	}

	idDeNotaSeleccionada = idNota;
	document.querySelector(`#${idDeNotaSeleccionada}`).classList.add('seleccionado');
}

// Eventos
document.addEventListener('keydown', (e) => {		
		if (e.key === "Escape" && elementoVisible(btnEliminarNota)) {
			ocultarElemento(btnEliminarNota);
		}
	}
);

window.addEventListener('resize', () => {
	if (screen.width <= 768 || window.innerWidth <= 768) {
		if (idDeNotaSeleccionada === '') {
			mostrarElemento(aside);
			ocultarElemento(btnMenuNotas);
		} else if (menuNotasVisible) {
			ocultarElemento(aside);
			mostrarElemento(btnMenuNotas);
			mostrarElemento(main);
			menuNotasVisible = false;
		}
	} else {
		
		mostrarElemento(aside);
		menuNotasVisible = true;

		if (menuNotasVisible) {
			mostrarElemento(btnMenuNotas);
		}
	}
});

txtTituloNota.addEventListener('keydown', (e) => {

	if (e.key === "Enter") {
		window.setTimeout(() => {
			txtContenidoNota.focus();
		}, 1);
	}

	guardarCambios();
});

txtTituloNota.addEventListener('keyup', guardarCambios);

txtContenidoNota.addEventListener('keydown', function(e) {

	if (e.key === "Tab") {
		e.preventDefault();
		e.stopPropagation();
		
		let inicio = this.selectionStart;
		this.value = this.value.substring(0, this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
		this.selectionEnd = inicio + 1;
	}

	guardarCambios();

});

txtContenidoNota.addEventListener('keyup', guardarCambios);

sectionNotas.addEventListener('click', (e) => {
	const idNota = e.target.value;
	
	if (idNota !== undefined) {
		const data = JSON.parse(localStorage.getItem('data'));

		marcarNotaSeleccionada(idNota);
		txtTituloNota.value = data[idNota].titulo;
		txtContenidoNota.value = data[idNota].contenido;
		mostrarElemento(main);

		if (screen.width <= 768 || window.innerWidth <= 768) {
			ocultarElemento(aside);
			mostrarElemento(btnMenuNotas);
			mostrarElemento(main);
		}
	}
});

sectionNotas.addEventListener('contextmenu', (e) => {
	if (e.target.tagName === "OPTION") {
		e.preventDefault();
		e.stopPropagation();

		let option = document.querySelector(`#${e.target.id}`);

		mostrarElemento(btnEliminarNota);
		btnEliminarNota.style.top = e.clientY + 'px';
		btnEliminarNota.style.left = e.clientX + 'px';
		btnEliminarNota.focus();		
		idDeNotaSeleccionadaParaEliminacion = e.target.id;
	}
});

btnMenuNotas.addEventListener('click', () => {
	if (!elementoVisible(aside)) {
		ocultarElemento(aside);
		menuNotasVisible = false;
	} else {
		mostrarElemento(aside);

		menuNotasVisible = true;

		if (screen.width <= 768 || window.innerWidth <= 768) {
			ocultarElemento(btnMenuNotas);
			ocultarElemento(main);
		}
	}
});

btnNuevaNota.addEventListener('click', crearNuevaNota);
btnEliminarNota.addEventListener('blur', () => ocultarElemento(btnEliminarNota));
btnEliminarNota.addEventListener('click', eliminarNota);

// Verificar el LocalStorage, para "pintar" las notas existentes
if (localStorage.getItem('data')) {
	let data = JSON.parse(localStorage.getItem('data'));

	for (const idNota in data) {
		const nuevoOption = document.createElement('option');

		nuevoOption.textContent = data[idNota].titulo;
		nuevoOption.setAttribute('value', idNota);
		nuevoOption.setAttribute('id', idNota);
		nuevoOption.setAttribute('title', data[idNota].titulo);
		sectionNotas.prepend(nuevoOption);
		txtTituloNota.value = "";
		txtContenidoNota.value = "";
	}
} else {
	mostrarElemento(tagNoHayNotas);
	ocultarElemento(sectionNotas);
}


if (menuNotasVisible === true && screen.width > 768 || window.innerWidth > 768) {
	mostrarElemento(btnMenuNotas)
}