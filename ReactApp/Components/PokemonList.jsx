var React = require('react');
var PokemonListItem = require('./PokemonListItem.jsx');
var Reflux = require('reflux');
var Actions = require('../Reflux/Actions.jsx');
var PokemonsStore = require('../Reflux/PokemonsStore.jsx');
var PokemonModal = require('./PokemonModal.jsx');
var DropdownList = require('react-widgets').DropdownList;

var PokemonList = React.createClass({
  mixins: [Reflux.listenTo(PokemonsStore, 'onChange')],
  getInitialState: function() {
    return {searchValue: "", pokemonListData: []};
  },
  componentDidMount: function() {
    Actions.getPokemons();
  },
  onChange: function(event, data) {
    this.setState({pokemonListData: data});
  },
  onSearchChange: function(e) {
    this.setState({searchValue: e.target.value});
    Actions.searchPokemon(e.target.value);
  },
  onFilterChange: function(filter) {
    Actions.changeFilter(filter);
  },
  render: function() {
    var listItems = this.state.pokemonListData.map(function(item) {
      return (<PokemonListItem key={item.Id} searchValue={this.state.searchValue} data={item}/>);
    }.bind(this));
    return (
      <div>
        <PokemonModal/>
          <div className="col-md-3" style={{'marginTop':'8px'}}>
            <DropdownList onSelect={this.onFilterChange} defaultValue={"Lowest Number"} data={this.props.filters}/>
          </div>
          <div className="col-md-4" style={{'marginLeft':'-10px', 'paddingLeft':'0px'}}>
            <form className="navbar-form navbar-left" role="search">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search - name or number" onChange={this.onSearchChange} value={this.state.searchValue}/>
              </div>
              <button type="submit" className="btn btn-default">
                <span className="glyphicon glyphicon-search"></span>
              </button>
            </form>
          </div>
        <br/><br/><br/>
        <div>
          {listItems}
        </div>
      </div>
    );
  }
});

module.exports = PokemonList;
