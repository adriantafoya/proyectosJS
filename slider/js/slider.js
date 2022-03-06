'use strict';

// Elementos HTML
const galeria = document.getElementById('galeria');
const slider = document.getElementById('slider');
const imgSlider = document.getElementById('img-slider');

// Botones
const btnCerrar = document.getElementById('btn-cerrar');
const btnFlechaIzquierda = document.getElementById('btn-flecha-izquierda');
const btnFlechaDerecha = document.getElementById('btn-flecha-derecha');

// Variables
const cantidadImagenes = 30;
const data = generarData(cantidadImagenes);
let indiceDeImgSeleccionada = "";


// Funciones

function agregarImagen(url) {
	let img = document.createElement('img');
	img.setAttribute('src', url);
	img.setAttribute('class', 'img-galeria');
	img.setAttribute('load', 'lazy');
	galeria.appendChild(img);
}

function crearImagenes() {
	for (let i = 0; i < data.length; i++) {
		agregarImagen(data[i]);
	}
}

function estadoSlider(indicador) {
	// 0 = no mostrar
	// 1 = mostrar

	if (indicador) {
		slider.classList.add('activo');
	} else {
		slider.classList.remove('activo');
	}
}

function abrirImagen(e) {
	if (e.target.classList.contains('img-galeria')) {
		let imgSeleccionada = e.target;
		indiceDeImgSeleccionada = data.indexOf(imgSeleccionada.src);

		imgSlider.src = imgSeleccionada.src;
		estadoSlider(1);
	}
}

function cambiarImagen(direccion) {
	if (direccion === "<" && indiceDeImgSeleccionada > 0) {
		indiceDeImgSeleccionada--;
		imgSlider.src = data[indiceDeImgSeleccionada];
	}

	else if (direccion === ">" && indiceDeImgSeleccionada < data.length - 1) {
		indiceDeImgSeleccionada++;
		imgSlider.src = data[indiceDeImgSeleccionada];
	}
}


// Eventos

btnCerrar.addEventListener('click', (e) => estadoSlider(0));
btnFlechaIzquierda.addEventListener('click', (e) => cambiarImagen("<"));
btnFlechaDerecha.addEventListener('click', (e) => cambiarImagen(">"));
galeria.addEventListener('click', (e) => abrirImagen(e));
document.addEventListener('keydown', (e) => {
	if (slider.classList.contains('activo')) {
		if (e.key === "ArrowLeft") cambiarImagen('<');
		if (e.key === "ArrowRight") cambiarImagen('>');
		if (e.key === "Escape") estadoSlider(0);
	}
})


// LLamar funciones
crearImagenes();
