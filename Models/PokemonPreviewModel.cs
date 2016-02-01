using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ReactPokedex.Models
{
    public class PokemonPreviewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ResourceUri { get; set; }
        public string ImageUrl { get; set; }
    }
}