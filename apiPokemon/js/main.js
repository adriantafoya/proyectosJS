import { generarCard } from './api.js';
import { buscar } from './busqueda.js';

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('#busqueda').addEventListener('keyup', (e) => {
    buscar(e);
  });
  
  generarCard();
});