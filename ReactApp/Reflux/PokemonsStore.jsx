var HTTP = require('../Services/Httpservice.js')
var Reflux = require('reflux');
var Actions = require('./Actions.jsx');

var PokemonsStore = Reflux.createStore({
  listenables: [Actions],
  getPokemons: function() {
    HTTP.get("/api/Pokemon/GetPokedex/").then(function(data) {
      this.pokemonList = data;
      this.trigger('change', this.pokemonList);
    }.bind(this));
  },
  searchPokemon: function(searchTerm) {
    var newList = [];
    this.pokemonList.map(function(item) {
      if (searchTerm == "" || (item.Name + " - " + item.Id).toUpperCase().indexOf(searchTerm.toUpperCase()) > -1) {
        newList.push(item);
      }
    });
    this.trigger('change', newList);
  },
  changeFilter: function(filter) {
    var sortedData;
    if (filter == "A-Z") {
      sortedData = aZFilter(this.pokemonList);
    }else if (filter == "Z-A") {
      sortedData = zAFilter(this.pokemonList);
    }else if(filter == "Lowest Number"){
      sortedData = lowestFirst(this.pokemonList);
    }else if(filter == "Highest Number"){
      sortedData = highestFirst(this.pokemonList);
    }
    this.trigger('change', sortedData);
  }
});

var aZFilter = function(data) {
  return data.sort(function(a, b) {
    if (a.Name > b.Name) {
      return 1;
    }
    if (a.Name < b.Name) {
      return -1;
    }
    return 0;
  });
}
var zAFilter = function(data) {
  return data.sort(function(a, b) {
    if (a.Name > b.Name) {
      return -1;
    }
    if (a.Name < b.Name) {
      return 1;
    }
    return 0;
  });
}
var lowestFirst = function(data) {
  return data.sort(function(a, b) {
    if (a.Id > b.Id) {
      return 1;
    }
    if (a.Id < b.Id) {
      return -1;
    }
    return 0;
  });
}
var highestFirst = function(data) {
  return data.sort(function(a, b) {
    if (a.Id > b.Id) {
      return -1;
    }
    if (a.Id < b.Id) {
      return 1;
    }
    return 0;
  });
}

module.exports = PokemonsStore;
