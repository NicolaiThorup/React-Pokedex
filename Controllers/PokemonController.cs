using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using ReactPokedex.Interfaces;
using ReactPokedex.Models;

namespace ReactPokedex.Controllers
{
    [RoutePrefix("api/Pokemon")]
    public class PokemonController : ApiController
    {
        private readonly IPokemonService _service;

        public PokemonController(IPokemonService service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("GetPokedex")]
        public async Task<PokemonPreviewModel[]> GetPokedex()
        {
            return await _service.GetPokedex();
        }

        [HttpGet]
        [Route("GetPokemon")]
        public async Task<PokemonModel> GetPokemon(int id)
        {
            return await _service.GetPokemon(id);
        }

        [HttpGet]
        [Route("ForceCacheOnAllPokemons")]
        public async Task<bool> ForceCacheOnAllPokemons()
        {
            var pokedex = await GetPokedex();
            foreach (var pokemon in pokedex)
            {
                await GetPokemon(pokemon.Id);
            }
            return true;
        }
    }
}
