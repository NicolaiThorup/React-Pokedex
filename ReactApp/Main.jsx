var React = require('react');
var ReactDOM = require('react-dom');
var PokemonList = require('./Components/PokemonList.jsx');

var filters = ['Lowest Number', 'Highest Number', 'A-Z', 'Z-A'];

ReactDOM.render(<PokemonList filters={filters} />, document.getElementById('pokedex'));
