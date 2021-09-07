let tareasAlmacenadas = localStorage.getItem('actividades');

if (tareasAlmacenadas !== null) {
	tareasAlmacenadas = JSON.parse(localStorage.getItem('actividades'));

	const inputTextoTarea = document.querySelector('#txt-tarea'),
		contenedorTareas = document.querySelector('#cont-tareas');

	for (const objetoTarea in tareasAlmacenadas) {

		let tarea = tareasAlmacenadas[objetoTarea];

		const cardTarea = document.createElement('article');
		let id = tarea.id;

		cardTarea.setAttribute('id', tarea.idTarea);
		cardTarea.setAttribute('class', 'card-tarea');
		cardTarea.innerHTML = `
			<!-- Checkbox Copletar -->
			<input type="checkbox" id="ckb-tarea${id}" class="card-tarea__cont-acciones__checkbox">
			<label for="ckb-tarea${id}" class="card-tarea__cont-acciones__lbl-completar"><span class="material-icons icono-btn-completar">done</span></label>
			<!-- Texto -->
			<input type="text" id="txt-tarea${id}" class="card-tarea__output" readonly="" value="${tarea.valueInput}">
			<!-- BTN Editar -->
			<button id="btnEditar${id}" class="btn-editar-tarea">
				<span class="material-icons icono-btn-editar">edit</span>
			</button>
			<!-- BTN Eliminar -->
			<button class="btn-eliminar-tarea">
				<span class="material-icons icono-btn-eliminar">delete</span>
			</button>`;

		contenedorTareas.prepend(cardTarea);

		if (tarea.checked) {
			cardTarea.classList.add('completar-tarea');
			document.querySelector(`#ckb-tarea${id}`).checked = true;
		}/* else {
			cardTarea.classList.remove('completar-tarea');
			document.querySelector(`#ckb-tarea${id}`).checked = false;
			console.log("Hol");
		}*/
	}

	inputTextoTarea.focus();
}