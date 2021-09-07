boton = document.querySelector('#btn-form');

boton.addEventListener('click', () => {
	const cajaResultado = document.querySelector('#seccion-resultado'),
		errorDiaNacimiento = !!document.querySelector('#error-dia'),
		errorMesNacimiento = !!document.querySelector('#error-mes'),
		errorFechaInvalida = !!document.querySelector('.error-fecha-invalida'),
		mensajeErrorDiaNacimiento = `<h3 id="error-dia">Introduce un dia</h3>`,
		mensajeErrorMesNacimiento = `<h3 id="error-dia">Introduce un Mes</h3>`,
		mensajeErrorFechaInvalida = `<h3 id="error-fecha-invalida">Esta fecha es invalida</h3>`;

	let diaNacimiento = document.querySelector('#dia-nacimiento').value,
		mesNacimiento = document.querySelector('#mes-nacimiento').value;


	const fechas = (mes, dia, mesInicio, diaInicio, mesFinal, diaFinal) => {
		if ((mes === mesInicio && dia >= diaInicio) || (mes === mesFinal && dia <= diaFinal)) {
			return true;
		} else {
			return false;
		}
	}


	const mostrarSigno = signo => {
		const limpiarAcentos = cadena => cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

		let srcImg = `img/${limpiarAcentos(signo).toLowerCase()}.svg`;

		cajaResultado.innerHTML = `
			<img src="${srcImg}" alt="Signo ${signo}" title="${signo}">
			<h2>${signo}</h2>`;
	}


	// Valida que se los campos no esten vacios y las fechas sean validas
	if (mesNacimiento === "") cajaResultado.innerHTML = mensajeErrorMesNacimiento;
	if (diaNacimiento === "") cajaResultado.innerHTML = mensajeErrorDiaNacimiento;


	// Valida que las fechas sean correctas
	if (mesNacimiento === "febrero" && diaNacimiento > 29) cajaResultado.innerHTML = mensajeErrorFechaInvalida;
	if (mesNacimiento === "abril" && diaNacimiento > 30) cajaResultado.innerHTML = mensajeErrorFechaInvalida;
	if (mesNacimiento === "junio" && diaNacimiento > 30) cajaResultado.innerHTML = mensajeErrorFechaInvalida;
	if (mesNacimiento === "septiembre" && diaNacimiento > 30) cajaResultado.innerHTML = mensajeErrorFechaInvalida;
	if (mesNacimiento === "noviembre" && diaNacimiento > 30) cajaResultado.innerHTML = mensajeErrorFechaInvalida;


	// Asigna los signos del zodiaco
	if (fechas(mesNacimiento, diaNacimiento, "marzo", 21, "abril", 19)) mostrarSigno("Aries");
	if (fechas(mesNacimiento, diaNacimiento, "abril", 20, "mayo", 21)) mostrarSigno("Tauro");
	if (fechas(mesNacimiento, diaNacimiento, "mayo", 22, "junio", 21)) mostrarSigno("Géminis");
	if (fechas(mesNacimiento, diaNacimiento, "junio", 22, "julio", 22)) mostrarSigno("Cáncer");
	if (fechas(mesNacimiento, diaNacimiento, "julio", 23, "agosto", 23)) mostrarSigno("Leo");
	if (fechas(mesNacimiento, diaNacimiento, "agosto", 24, "septiembre", 23)) mostrarSigno("Virgo");
	if (fechas(mesNacimiento, diaNacimiento, "septiembre", 24, "octubre", 23)) mostrarSigno("Libra");
	if (fechas(mesNacimiento, diaNacimiento, "octubre", 24, "noviembre", 22)) mostrarSigno("Escorpión");
	if (fechas(mesNacimiento, diaNacimiento, "noviembre", 23, "diciembre", 21)) mostrarSigno("Sagitario");
	if (fechas(mesNacimiento, diaNacimiento, "diciembre", 22, "enero", 20)) mostrarSigno("Capricornio");
	if (fechas(mesNacimiento, diaNacimiento, "enero", 21, "febrero", 18)) mostrarSigno("Acuario");
	if (fechas(mesNacimiento, diaNacimiento, "febrero", 19, "marzo", 20)) mostrarSigno("Piscis");
});