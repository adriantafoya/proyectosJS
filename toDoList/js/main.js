const main =  document.querySelector('#main'),
	contenedorTareas = document.querySelector('#cont-tareas'),
	btnCrearTarea = document.querySelector('#btn-crear-tarea'),
	inputTextoTarea = document.querySelector('#txt-tarea'),
	slcFiltro = document.querySelector('#slc-filtro');


// Crear tarea
const crearTarea = () => {
	let textoTarea = document.querySelector('#txt-tarea');

	agregarTarea(textoTarea.value);
	textoTarea.value = "";
}

// Agregar tarea
const agregarTarea = (texto) => { 
	const cardTarea = document.createElement('article'),
		id = Date.now(),
		idTarea = "tarea" + id;

	cardTarea.setAttribute('id', idTarea);
	cardTarea.setAttribute('class', 'card-tarea');
	cardTarea.innerHTML = `
		<!-- Checkbox Copletar -->
		<input type="checkbox" id="ckb-tarea${id}" class="card-tarea__cont-acciones__checkbox">
		<label for="ckb-tarea${id}" class="card-tarea__cont-acciones__lbl-completar"><span class="material-icons icono-btn-completar">done</span></label>
		<!-- Texto -->
		<input type="text" id="txt-tarea${id}" class="card-tarea__output" readonly="" value="${texto}">
		<!-- BTN Editar -->
		<button id="btnEditar${id}" class="btn-editar-tarea">
			<span class="material-icons icono-btn-editar">edit</span>
		</button>
		<!-- BTN Eliminar -->
		<button class="btn-eliminar-tarea">
			<span class="material-icons icono-btn-eliminar">delete</span>
		</button>`;

	contenedorTareas.prepend(cardTarea);
	inputTextoTarea.focus();

	// LocalStorage
	if (localStorage.getItem('actividades') === null) {
		let registroActividades = {};

		registroActividades[idTarea] = {
			"id": id,
			"idTarea": idTarea,
			"valueInput": texto,
			"checked": false
		};

		localStorage.setItem('actividades', JSON.stringify(registroActividades));
	} else {
		let registroActividades = JSON.parse(localStorage.getItem('actividades'));

		registroActividades[idTarea] = {
			"id": id,
			"idTarea": idTarea,
			"valueInput": texto,
			"checked": false
		};

		localStorage.setItem('actividades', JSON.stringify(registroActividades));
	}
}

// Eliminar tarea 
const eliminarTarea = e => {
	if (e.target.classList.contains('btn-eliminar-tarea') || e.target.classList.contains('icono-btn-eliminar')) {
		let confimarEliminar = confirm("Esta seguro que desea eliminar esta actividad");

		if (confimarEliminar === true) {
			let sectionPadre = e.target.closest('section').id;

			idTarea = e.target.closest('article').id;
			document.querySelector(`#${idTarea}`).classList.add('eliminar-tarea');

			setTimeout(() => {
				contenedorTareas.removeChild(document.querySelector(`#${idTarea}`));
			}, 200);

			// LocalSorage
			let registroActividades = JSON.parse(localStorage.getItem('actividades'));
			delete registroActividades[idTarea];
			localStorage.setItem('actividades', JSON.stringify(registroActividades));
		}
  	}
}

// Completar tarea
const completarTarea = e => {
	if (e.target.classList.contains('card-tarea__cont-acciones__lbl-completar') || e.target.classList.contains('icono-btn-completar')) {
		let idTarea = e.target.closest('article').id,
			cardTarea = document.querySelector(`#${idTarea}`);
		let dateNow = idTarea.replace('tarea', '');
		dateNow = parseInt(dateNow);
		let idCheckbox = "ckb-tarea" + dateNow;
		let checkbox = document.querySelector(`#${idCheckbox}`);
		let registroActividades = JSON.parse(localStorage.getItem('actividades'));

		if (checkbox.checked === false) {
			cardTarea.classList.add('completar-tarea');
			registroActividades[idTarea].checked = true;
		} else if (checkbox.checked === true) {
			cardTarea.classList.remove('completar-tarea');
			registroActividades[idTarea].checked = false;
		}

		localStorage.setItem('actividades', JSON.stringify(registroActividades));
  	}
}

// Editar Tarea
const editarTareas = e => {
	if (e.target.classList.contains('btn-editar-tarea') || e.target.classList.contains('icono-btn-editar')) {
		let idTarea = e.target.closest('article').id;
		let dateNow = idTarea.replace('tarea', '');
		let idInput = "txt-tarea" + dateNow;
		let input = document.querySelector(`#${idInput}`);
 		let registroActividades = JSON.parse(localStorage.getItem('actividades'));

		if (input.getAttribute('readonly') === null) {
			input.setAttribute('readonly', "");
			input.classList.remove('editar-tarea');

			// LocalStorage
			registroActividades[idTarea].valueInput = input.value;
			localStorage.setItem('actividades', JSON.stringify(registroActividades));
		} else {
			input.removeAttribute('readonly');
			input.classList.add('editar-tarea');
			input.focus();
			input.select();

			input.addEventListener('keydown', (e) => {
				if (e.keyCode === 13) {
					input.setAttribute('readonly', "");
					input.classList.remove('editar-tarea');

					// LocalStorage
					registroActividades[idTarea].valueInput = input.value;
					localStorage.setItem('actividades', JSON.stringify(registroActividades));
				}
			});
		}
  	}
}

// Filtrar tareas
const filtrartareas = () => {

	if (slcFiltro.value === "todas") {
		document.querySelectorAll('.card-tarea').forEach(elemento => {
			if (elemento.style.display !== "grid") {
				elemento.style.display = "grid";
			}
		});
	} else if (slcFiltro.value === "incompletas") {
		document.querySelectorAll('.card-tarea__cont-acciones__checkbox').forEach(elemento => {
			if (elemento.checked === true) {
				elemento.closest('article').style.display = "none";
			}
			if (elemento.checked === false) {
				elemento.closest('article').style.display = "grid";
			}
		});
	} else if (slcFiltro.value === "completadas") {
		document.querySelectorAll('.card-tarea__cont-acciones__checkbox').forEach(elemento => {
			if (elemento.checked === false) {
				elemento.closest('article').style.display = "none";
			}
			if (elemento.checked === true) {
				elemento.closest('article').style.display = "grid";
			}
		});
	}
}

// Filtro
filtrartareas();
slcFiltro.addEventListener('click', filtrartareas);
slcFiltro.addEventListener('change', filtrartareas);
// Agregar
btnCrearTarea.addEventListener('click', crearTarea);
// Agregar tarea con tecla enter
inputTextoTarea.addEventListener('keydown', (e) => {
	if (e.keyCode === 13) crearTarea();
})
// Eventos btns
main.addEventListener('click', (e) => {
	eliminarTarea(e);
	completarTarea(e);
	editarTareas(e);
});