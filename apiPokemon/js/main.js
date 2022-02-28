import { pintarApi, mostrarSpinner } from './pintar_api.js';
import { buscar } from './buscador.js';

mostrarSpinner();
pintarApi();

document.addEventListener("DOMContentLoaded", () => {
   document.querySelector('#busqueda').addEventListener('keyup', (e) => {
      buscar(e);
   });
});