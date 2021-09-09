"use strict";

const inputTexto = document.querySelector("#txt-entrada"),
	btnGenerar = document.querySelector('#btn-generar'),
	contenedorResultado = document.querySelector('#resultado');


function generarCodigo () {
	let texto = inputTexto.value;
	let arrayTexto = texto.split('');
	let arrayCodigoASCII = [];
	let codigoBinario = [];

	arrayTexto.forEach((elemento, x) => {
		arrayCodigoASCII[x] = elemento.charCodeAt();
	});

	arrayCodigoASCII.forEach((elemento, x) => {
		codigoBinario.push(conversorBinario(elemento));
	});

	codigoBinario = codigoBinario.join(" ");

	contenedorResultado.textContent = codigoBinario;
}

function conversorBinario (ascii) {
	let codigoBin = [];
	let x = ascii;

	while (ascii > 0) {
		codigoBin.unshift(ascii % 2);
		ascii = parseInt(ascii / 2);
	}

	codigoBin = verificarBits(codigoBin.join(""));

	return codigoBin;
}

function verificarBits (bin) {
	if (bin.length < 8) {
		let binCorregido;

		switch (bin.length) {
			case 1: binCorregido = "0000000" + bin; 
			break;
			case 2: binCorregido = "000000" + bin; 
			break;
			case 3: binCorregido = "00000" + bin;
			break;
			case 4: binCorregido = "0000" + bin; 
			break;
			case 5: binCorregido = "000" + bin; 
			break;
			case 6: binCorregido = "00" + bin; 
			break;
			case 7: binCorregido = "0" + bin; 
			break;
		}

		return binCorregido;
	}
}

btnGenerar.addEventListener('click', generarCodigo);
inputTexto.addEventListener('keydown', (e) => {
	if (e.keyCode === 13) generarCodigo();
});