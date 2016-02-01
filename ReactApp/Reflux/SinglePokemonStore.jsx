var HTTP = require('../Services/Httpservice.js')
var Reflux = require('reflux');
var Actions = require('./Actions.jsx');

var SinglePokemonStore = Reflux.createStore({
  listenables: [Actions],
  getPokemon: function(id) {
    HTTP.get("/api/Pokemon/GetPokemon?id=" + id)
    .then(function(data) {
      this.trigger('change', data);
    }.bind(this));
  }
});

module.exports = SinglePokemonStore;
