using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PokeAPI;

namespace ReactPokedex.Models
{
    public class PokemonModel
    {
        public Pokemon Pokemon { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
    }
}