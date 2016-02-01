using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ReactPokedex.Models;

namespace ReactPokedex.Interfaces
{
    public interface IPokemonService
    {
        Task<PokemonPreviewModel[]> GetPokedex();
        Task<PokemonModel> GetPokemon(int id);
    }
}
