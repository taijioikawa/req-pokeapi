const mapeamentoTiposParaCoresBootstrap = {
    "normal" : "dark",
    "grass" : "success",
    "fire" : "danger",
    "water" : "primary",
    "bug":"success emphasis",
    "poison" : "warning text-dark",
    "eletric" : "warning text-dark",
    "ground" : "secondary",
    "fairy" : "info text-dark",
    "fighting" : "danger",
    "psychic" : "info",
    "rock" : "secondary",
    "ghost" : "dark",
    "ice" : "info",
}

async function getPokemon(){
    const container = document.getElementById("pokedex-container");
    const loadingElement = document.getElementById("loading");

    try{
     const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
     const data = await response.json();    

     loadingElement.remove();
   
        for(const pokemon of data.results){
            const detailResponse = await fetch(pokemon.url);
            const pokemonDetails = await detailResponse.json();

            const name = pokemonDetails.name;
            const id = pokemonDetails.id;
            const imageUrl = pokemonDetails.sprites.other['official-artwork'].front_default;
            const primaryType = pokemonDetails.types[0].type.name;
            const badgeColor = mapeamentoTiposParaCoresBootstrap[primaryType] || 'dark';

            const cardHTML = `
               <div class="col">
                    <div class="card h-100 pokemon-card border-0 shadow-sm">
                        <div class="text-center p-3 bg-light rounded-top">
                            <img src="${imageUrl}" class="card-img-top img-fluid style="max-height: 180px; width: auto; alt="Imagem do Pokemon">
                        </div>
                        <div class="card-body text-center">
                            <span class="text-muted fw-bold">#${String(id).padStart(3, '0')}</span>
                            <h5 class="card-title my-2 fw-semibold">${name}</h5>
                            <span class="badge bg-${badgeColor} type-badge">${primaryType}</span>
                        </div>
                    </div>
                </div>
            `;

            container.innerHTML += cardHTML;
        }
    
    }catch(error){
     console.error("Erro ao buscar os Pokémons: ", error);
     loadingElement.innerHTML = `<p class="text-danger fw-bold">Erro ao carregar os dados. Verifique a conexão. </p>`;
   }
}

document.addEventListener('DOMContentLoaded', getPokemon);
