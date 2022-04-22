'use strict';

const btnInformacion = document.querySelector('#btn-informacion');

function initModalInformacion() {
	modal.classList.add('open');
	spanTitleModal.textContent = "Información";
	divContenido.innerHTML = `
		<h3>¿Qué es pomodoro?</h3>
		<p>
			La técnica Pomodoro es un método para mejorar la administración del tiempo dedicado a una actividad.
			<br>
			Este método se centra en la idea de que las pausas frecuentes contribuyen a mejorar la agilidad mental y por lo tanto retener de mejor forma los conocimientos.
			Su objetivo es lograr la realización de la mayor cantidad de tareas posibles en una breve cantidad de tiempo, aprovechando los momentos en que el cerebro se encuentra fresco y descansado.
			Por lo tanto, combina momentos de concentración absoluta en el estudio con pausas dedicadas a distraer al cerebro con momentos de ocio.
		</p>
		<h3>¿Cómo funciona?</h3>
		<p>
			Un pomodoro = 25 minutos.
			<br>
			Un descanso corto = 5 minutos.
			<br>
			Un descanso largo = 15 minutos.
			<br><br>
			Un ciclo = un pomodoro y un descanso corto.
			<br><br>
			Se toma un descanso largo despues de 4 ciclos. 
		</p>

		<a href="https://www.ubp.edu.ar/ambiente-y-turismo/metodologia-de-pomodoro-organiza-el-tiempo-de-estudio/" target="_blank" class="link">Fuente</a>
		`;
}

btnInformacion.addEventListener('click', initModalInformacion);