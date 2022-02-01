"use strict";

export const buscar = (e) => {
	const nombrePokemon = document.querySelectorAll('.nombre');
	let busqueda = e.target.value;

	if (busqueda !== '') {
		nombrePokemon.forEach((elemento) => {
			if (elemento.textContent.includes(busqueda) === true || elemento.textContent.toLowerCase().includes(busqueda) === true) {
				elemento.closest('article').style.display = "block";
			} else {
				elemento.closest('article').style.display = "none";
			}
		});
	} else {
		nombrePokemon.forEach((elemento) => {
			elemento.closest('article').style.display = "block";
		});
	}
}