'use strict';

// Elementos
const btnAjustes = document.querySelector('#btn-ajustes');

// Variables

// Funciones
function initModalAjustes() {
	modal.classList.add('open');
   	spanTitleModal.textContent = "Ajustes";

	divContenido.innerHTML = `
		<form method="post" id="form-ajustes" class="modal__form">
			<div class="modal__form__group-input">
				<h4>Tiempo de trabajo</h4>
				<label class="label-inline">
				   Horas:
				   <input type="number" name="trabajo_h" value="${tiempo.trabajo.h}" class="input input--inline"> 
				</label>
				<label class="label-inline">
					Minutos:
					<input type="number" name="trabajo_m" value="${tiempo.trabajo.m}" class="input input--inline"> 
				</label>
				<label class="label-inline">
				   Segundos:
				   <input type="number" name="trabajo_s" value="${tiempo.trabajo.s}" class="input input--inline"> 
				</label>
			</div>
			<div class="modal__form__group-input">
            <h4>Tiempo de descanso corto</h4>
            <label class="label-inline">
                Horas:
                <input type="number" name="descansoCorto_h" value="${tiempo.descansoCorto.h}" class="input input--inline"> 
            </label>
            <label class="label-inline">
                Minutos:
                <input type="number" name="descansoCorto_m" value="${tiempo.descansoCorto.m}" class="input input--inline"> 
            </label>
            <label class="label-inline">
                Segundos:
                <input type="number" name="descansoCorto_s" value="${tiempo.descansoCorto.s}" class="input input--inline"> 
            </label>
			</div>
			<div class="modal__form__group-input">
            <h4>Tiempo de descanso largo</h4>
            <label class="label-inline">
                Horas:
                <input type="number" name="descansoLargo_h" value="${tiempo.descansoLargo.h}" class="input input--inline"> 
            </label>
            <label class="label-inline">
                Minutos:
                <input type="number" name="descansoLargo_m" value="${tiempo.descansoLargo.m}" class="input input--inline"> 
            </label>
            <label class="label-inline">
                Segundos:
                <input type="number" name="descansoLargo_s" value="${tiempo.descansoLargo.s}" class="input input--inline"> 
            </label>
			</div>
			<button class="button button--monospace button--form">Guardar cambios</button>
    	</form>`;
   
   const formAjustes = document.querySelector('#form-ajustes');

   formAjustes.addEventListener('submit', (e) => {
		e.preventDefault();

		const data = Object.fromEntries(new FormData(e.target));

		for(const el in data) {
			if (data[el] === "") {
				data[el] = 0;
			}
		}

		tiempo.trabajo.h = data.trabajo_h;
		tiempo.trabajo.m = data.trabajo_m;
		tiempo.trabajo.s = data.trabajo_s;

		tiempo.descansoCorto.h = data.descansoCorto_h;
		tiempo.descansoCorto.m = data.descansoCorto_m;
		tiempo.descansoCorto.s = data.descansoCorto_s;

		tiempo.descansoLargo.h = data.descansoLargo_h;
		tiempo.descansoLargo.m = data.descansoLargo_m;
		tiempo.descansoLargo.s = data.descansoLargo_s;

		localStorage.setItem('data-pomodoro', JSON.stringify(tiempo));
		modal.classList.remove('open');
		// Despues pensar en una forma de que los cambio sucedan sin recargar la pagina (aun no)
		alert("Para que los cambios surtan efecto recargue la página");
   	});
}

btnAjustes.addEventListener('click', initModalAjustes);


if (localStorage.getItem('data-pomodoro')) {
	tiempo = JSON.parse(localStorage.getItem('data-pomodoro'));
} else {
	localStorage.setItem('data-pomodoro', JSON.stringify(tiempo));
}