const checkbox = document.querySelector('#ckb-tema'),
	icono = document.querySelector('#icono-tema');
	temaAlmacenado = localStorage.getItem('tema');

const cambiarTema = () => {
	if (checkbox.checked === false) {
		icono.innerText = 'dark_mode';
		localStorage.setItem('tema', 'claro');
		document.documentElement.setAttribute('data-theme', 'claro');
	}
	else {
		icono.innerText = 'light_mode';
		localStorage.setItem('tema', 'oscuro');
		document.documentElement.setAttribute('data-theme', 'oscuro');
	}
}

if (temaAlmacenado === null || temaAlmacenado === "claro") {
	checkbox.checked = false;
	cambiarTema();
} else if (temaAlmacenado === "oscuro") {
	checkbox.checked = true;
	cambiarTema();
}

checkbox.addEventListener('click', () => {
	cambiarTema();
	document.querySelector('#body').style.transition = "background .6s";
});