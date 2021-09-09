const spanHora = document.querySelector('#hora'),
	spanMinutos = document.querySelector('#minutos'),
	spanSegundos = document.querySelector('#segundos'),
	spanHorario = document.querySelector('#horario');

function normalize (digito) {
	if (digito < 10) digito = "0" + digito;

	return digito;
}

function doceHoras (hora) {
	if (hora > 12) hora = hora - 12;

	return hora;
}

function actualizarReloj () {
	let tiempo = new Date();
	let hora = doceHoras(tiempo.getHours());
	let minutos = tiempo.getMinutes();
	let segundos = tiempo.getSeconds();

	if (hora > 12) {
		spanHorario.textContent = "P";
	} else {
		spanHorario.textContent = "A";
	}

	spanHora.textContent = normalize(hora);
	spanMinutos.textContent = normalize(minutos);
	spanSegundos.textContent = normalize(segundos);

	setInterval(actualizarReloj, 900);
}

actualizarReloj();