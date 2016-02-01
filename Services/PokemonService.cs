using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using PokeAPI;
using ReactPokedex.Interfaces;
using ReactPokedex.Models;

namespace ReactPokedex.Services
{
    public class PokemonService : IPokemonService
    {
        private readonly ICacheProvider _cache;
        public PokemonService(ICacheProvider cache)
        {
            _cache = cache;
        }

        public async Task<PokemonPreviewModel[]> GetPokedex()
        {
            List<PokemonPreviewModel> pokedexPreviewModels = _cache.Get("pokemonPreviewModel") as List<PokemonPreviewModel>;

            if (pokedexPreviewModels == null)
            {
                Pokedex pokedex = await Pokedex.GetInstanceAsync();
                pokedexPreviewModels = new List<PokemonPreviewModel>();

                foreach (var pokemonModel in pokedex.Pokemon)
                {
                    if (pokemonModel.Value.Id >= 152)
                        break;
                    pokedexPreviewModels.Add(new PokemonPreviewModel()
                    {
                        Id = pokemonModel.Value.Id,
                        ResourceUri = pokemonModel.Value.ResourceUri.AbsoluteUri,
                        ImageUrl = PokemonImageUrl(pokemonModel.Value.Id),
                        Name = pokemonModel.Value.Name
                    });
                }
                _cache.Set("pokemonPreviewModel", pokedex, 60);
            }
            return pokedexPreviewModels.ToArray();
        }

        public async Task<PokemonModel> GetPokemon(int id)
        {
            PokemonModel pokemonModel = _cache.Get("pokemon " + id) as PokemonModel;

            if (pokemonModel == null)
            {
                var pokemon = await Pokemon.GetInstanceAsync(id);
                var description = await Description.GetInstanceAsync(GetDescriptionId(pokemon));
                pokemonModel = new PokemonModel()
                {
                    Description = description,
                    Pokemon = pokemon,
                    ImageUrl = PokemonImageUrl(id)
                };
                _cache.Set("pokemon " + id, pokemonModel, 60);
            }
            return pokemonModel;
        }

        private static int GetDescriptionId(Pokemon pokemon)
        {
            var lastOrDefault = pokemon.Descriptions[0].ResourceUri.Segments.LastOrDefault();
            return int.Parse(lastOrDefault?.Replace("/", ""));
        }

        private string PokemonImageUrl(int id)
        {
            return $"http://pokeapi.co/media/img/{id}.png";
        }
    }
}