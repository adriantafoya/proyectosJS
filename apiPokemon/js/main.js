import { fetchData } from './pintar_api.js';
import { buscar } from './buscador.js';

fetchData();

document.addEventListener("DOMContentLoaded", () => {
   document.querySelector('#busqueda').addEventListener('keyup', (e) => {
      buscar(e);
   });
});