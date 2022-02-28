"use strict";
import { data } from './data.js';

const body = document.querySelector('body');
const contenedorSpinner = document.querySelector('#contenedorSpinner');
const cantidadPokemones = 898;

function mostrarSpinner() {
   window.scrollTo(0, 0);
   contenedorSpinner.classList.remove('oculto');
   body.classList.add('paralizar');
}

function ocultarSpinner() {
   contenedorSpinner.classList.add('oculto');
   body.classList.remove('paralizar');
}

function pintarApi() {
   // for (let indice = 1; indice <= 1; indice++) {
   //    let pokemon = data[indice];

   //    console.log(indice)
   //    console.log(pokemon)
   //    pintarCard(pokemon);
   // }

   pintarCard(data);

   setTimeout(function() {
      ocultarSpinner();
   }, 1000);
};

const pintarCard = (data) => {

   for (const idPokemon in data) {

      let dataPokemon = data[idPokemon];

      let main = document.querySelector('#main');
      let template = document.querySelector('#card-template').content;
      let clone = template.cloneNode(true);
      let fragmento = document.createDocumentFragment();

      if (idPokemon < 10) {
         clone.querySelector('#id').textContent = "00" + idPokemon;
      } else if (idPokemon < 100) {
         clone.querySelector('#id').textContent = "0" + idPokemon;
      } else {
         clone.querySelector('#id').textContent = idPokemon;
      }

      if (dataPokemon.imgURL) {
      	clone.querySelector('#img').setAttribute('src', `${dataPokemon.imgURL}`);
      } else {
      	clone.querySelector('#img').setAttribute('src', '../img/pokeball.png');
      }

      clone.querySelector('#img').setAttribute('loading', 'lazy');
      clone.querySelector('#nombre').textContent = dataPokemon.nombre.charAt(0).toUpperCase() + dataPokemon.nombre.slice(1);
      clone.querySelector('#hp').textContent = dataPokemon.hp;
      clone.querySelector('#experiencia').textContent = dataPokemon.experiencia;
      clone.querySelector('#ataque').textContent = dataPokemon.ataque;
      clone.querySelector('#defensa').textContent = dataPokemon.defensa;
      clone.querySelector('#especial').textContent = dataPokemon.especial;

      fragmento.appendChild(clone);
      main.appendChild(fragmento);
   }
}

export { pintarApi, mostrarSpinner };