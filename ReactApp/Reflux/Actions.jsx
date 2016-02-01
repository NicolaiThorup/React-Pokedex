var Reflux = require('reflux');

var Actions = Reflux.createActions([
  'getPokemons',
  'getPokemon',
  'searchPokemon',
  'changeFilter'
]);

module.exports = Actions;
