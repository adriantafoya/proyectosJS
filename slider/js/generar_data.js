'use strict';

// Ejemplo: https://picsum.photos/id/237/500/300

const urlBase = 'https://picsum.photos/id';
const anchoImg1 = "500";
const altoImg1 = "300";
const anchoImg2 = "800";
const altoImg2 = "475";

function generarData(cantidad) {
	let data = [];
	
	for (let indice = 0; indice < cantidad; indice++) {
		let idImg = indice + 1;
		let urlImg;
		
		if (idImg % 3 === 0) {
			urlImg = `${urlBase}/${idImg}/${anchoImg2}/${altoImg2}`;
		} else {
			urlImg = `${urlBase}/${idImg}/${anchoImg1}/${altoImg1}`;
		}

		data[indice] = urlImg;
	}

	return data;
}