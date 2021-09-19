const spanImc = document.getElementById('imc');
const spanEstadoSalud = document.getElementById('estado-salud');
let $estadoSalud = localStorage.getItem('estado-salud');
let $imc = localStorage.getItem('imc');

spanEstadoSalud.textContent = $estadoSalud;
spanImc.textContent = $imc;