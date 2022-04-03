'use strict';

const slcCategoria = document.querySelector('#slc-categoria'),
	btnCopiarTexto = document.querySelector('#btn-copiar-texto'),
	btnRefrescar = document.querySelector('#btn-refrescar'),
	btnCerrarModal = document.querySelector('#btn-cerrar-modal'),
	modal = document.querySelector('#modal'),
	txtFrase = document.querySelector('#txt-frase');


function copiarTexto() {
	let seleccion = document.createRange();

	seleccion.selectNodeContents(txtFrase);
	window.getSelection().removeAllRanges();
	window.getSelection().addRange(seleccion);

	let res = document.execCommand('copy');
	window.getSelection().removeRange(seleccion);

	modal.showModal();
}

function generarFrase(data) {
	txtFrase.textContent = data.value;
}

function peticionApi(categoria = slcCategoria.value) {
	fetch(`https://api.chucknorris.io/jokes/random?category=${categoria}`)
	.then(response => response.json())
	.then(data => generarFrase(data))
}

slcCategoria.addEventListener('change', () => peticionApi(slcCategoria.value));
btnCopiarTexto.addEventListener('click', copiarTexto);
btnRefrescar.addEventListener('click', () => peticionApi());
btnCerrarModal.addEventListener('click', () => modal.close());

peticionApi();