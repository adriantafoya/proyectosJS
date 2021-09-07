const capaColor = document.querySelector('#capa-color'),
	inputColor = document.querySelector('#input-color'),
	inputOpacidad = document.querySelector('#input-opacidad'),
	txtColor = document.querySelector('#txt-color'),
	txtOpacidad = document.querySelector('#txt-opacidad'),
	colorFinal = document.querySelector('#color-final'),
	medioCirculoColor = document.querySelector('#mitad-color'),
	medioCirculoColorConTransparencia = document.querySelector('#mitad-color-transparencia'),
	inputURL = document.querySelector('#input-url-imagen'),
	body = document.querySelector('#body');

const cambiarColorFondo = tipoInput => {
	let color,
		opacidad;

	if (tipoInput === "input") {
		color = inputColor.value;
		opacidad = parseInt(inputOpacidad.value);
	} else if (tipoInput === "input-txt") {
		color = txtColor.value;
		opacidad = parseInt(txtOpacidad.value);
	}

	if (opacidad < 10) opacidad = "0" + opacidad;
	if (opacidad === 100) opacidad = "";
	let opacidadString = String(opacidad);
	let colorConTransparencia = color + opacidadString;

	capaColor.style.backgroundColor = colorConTransparencia;
	capaColor.style.transition = "background .3s";

	colorFinal.textContent = colorConTransparencia;

	medioCirculoColor.style.backgroundColor = color;
	medioCirculoColorConTransparencia.style.backgroundColor = colorConTransparencia;

	if (tipoInput === "input") {
		txtColor.value = inputColor.value;
		txtOpacidad.value = inputOpacidad.value;
	} else if (tipoInput === "input-txt") {
		inputColor.value = txtColor.value;
		inputOpacidad.value = txtOpacidad.value;
	}
}

const cambiarImagenFondo = () => {
	let urlImagen = inputURL.value || "https://images.pexels.com/photos/5186869/pexels-photo-5186869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1079&w=1920";

	body.style.backgroundImage = `url('${urlImagen}')`;
}

// Al Cargar
cambiarColorFondo("input");
cambiarImagenFondo("input");
txtColor.value = inputColor.value;
txtOpacidad.value = inputOpacidad.value;
inputURL.value = "";


// Eventos
inputColor.addEventListener('change', () => {
	cambiarColorFondo("input");
})
inputColor.addEventListener('click', () => {
	cambiarColorFondo("input");
});
inputOpacidad.addEventListener('change', () => {
	cambiarColorFondo("input");
});

// Eventos teclado
inputURL.addEventListener('keydown', (e) => {
	if (e.keyCode === 13) cambiarColorFondo("input-txt");
});
txtColor.addEventListener('keydown', (e) => {
	if (e.keyCode === 13) cambiarColorFondo("input-txt");
});
txtOpacidad.addEventListener('keydown', (e) => {
	if (e.keyCode === 13) cambiarColorFondo("input-txt");
});

console.log("< 💩/>");