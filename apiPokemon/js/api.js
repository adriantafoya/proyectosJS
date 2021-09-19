"use strict";

const pintarCard = (pokemon) => {
   const main = document.querySelector('#main');
   const template = document.querySelector('#card-template').content;
   const clone = template.cloneNode(true);
   const fragmento = document.createDocumentFragment();

   clone.querySelector('#img').setAttribute('src', `${pokemon.imgCvg}`);
   clone.querySelector('#nombre').textContent = pokemon.nombre;
   clone.querySelector('#hp').textContent = pokemon.hp;
   clone.querySelector('#experiencia').textContent = pokemon.experiencia;
   clone.querySelector('#ataque').textContent = pokemon.ataque;
   clone.querySelector('#defensa').textContent = pokemon.defensa;
   clone.querySelector('#especial').textContent = pokemon.especial;

   fragmento.appendChild(clone);
   main.prepend(fragmento);
}

const fetchData = async (id) => {
   try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      const pokemon = {
         imgCvg: data.sprites.other.dream_world.front_default,
         nombre: data.name,
         experiencia: data.base_experience,
         hp: data.stats[0].base_stat,
         ataque: data.stats[1].base_stat,
         defensa: data.stats[2].base_stat,
         especial: data.stats[3].base_stat,
      };

      pintarCard(pokemon);

   } catch (error) {
      console.log(error);
   }
};

export const generarCard = () => {
   for (let x = 150; x >= 1; x--) {
      fetchData(x);
   }
}