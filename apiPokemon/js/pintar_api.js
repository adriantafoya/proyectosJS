"use strict";

const body = document.querySelector('body');
const contenedorSpinner = document.querySelector('#contenedorSpinner');
const avisoCartasCargadas = document.querySelector('#avisoCartasCargadas');
const contadorCartasCargadas = document.querySelector('#contadorCartasCargadas');
const cantidadPokemones = 300;

let data = {};

function mostrarSpinner() {
   window.scrollTo(0, 0);
   contenedorSpinner.classList.remove('oculto');
   body.classList.add('paralizar');
}

function ocultarSpinner() {
   contenedorSpinner.classList.add('oculto');
   body.classList.remove('paralizar');
}

function mostrarCartasCargadas() {
   avisoCartasCargadas.classList.remove('oculto');
}

function ocultarCartasCargadas() {
   avisoCartasCargadas.classList.add('oculto');
}

const fetchData = async () => {
   try {
      mostrarSpinner();

      if (localStorage.getItem('data')) {
         data = JSON.parse(localStorage.getItem('data'));
      } else {

         mostrarCartasCargadas();

         for (let indice = 1; indice <= cantidadPokemones; indice++) {
            contadorCartasCargadas.textContent = indice;

            if (indice === cantidadPokemones) {
               ocultarCartasCargadas();
            }

            let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${indice}`);
            let resJSON = await res.json();
            let pokemon = {
               imgCvg: resJSON.sprites.other.dream_world.front_default,
               nombre: resJSON.name,
               experiencia: resJSON.base_experience,
               hp: resJSON.stats[0].base_stat,
               ataque: resJSON.stats[1].base_stat,
               defensa: resJSON.stats[2].base_stat,
               especial: resJSON.stats[3].base_stat,
            };

            data[indice] = pokemon;
         }

         localStorage.setItem('data', JSON.stringify(data));
      }

      pintarCard(data);

      setTimeout(function() {
         ocultarSpinner();
      }, 2200);

   } catch (error) {
      console.log(error);
   }
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

      clone.querySelector('#img').setAttribute('src', `${dataPokemon.imgCvg}`);
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

export { fetchData };