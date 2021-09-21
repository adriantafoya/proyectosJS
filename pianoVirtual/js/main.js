'use strict';

const teclas = document.querySelectorAll('.teclas');
document.addEventListener('click', (e) => {
	if (e.target.classList.contains('teclas')) {
		let idNota = e.target.dataset.nota;
		let nota = document.querySelector(`#${idNota}`);

		nota.currentTime = 0;
		nota.play();
	}
});