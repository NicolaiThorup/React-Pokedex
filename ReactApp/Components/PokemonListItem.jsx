var React = require('react');
var Reflux = require('reflux');
var Actions = require('../Reflux/Actions.jsx');

var PokemonListItem = React.createClass({
  onClick: function(){
    Actions.getPokemon(this.props.data.Id);
  },
  render : function(){
    return(
      <div onClick={this.onClick} className="col-xs-2 portfolio-item pokemon-item">
          <h4>{this.props.data.Id} - {this.props.data.Name}</h4>
          <img src={this.props.data.ImageUrl} alt=""></img>
      </div>
    );
  }
});

module.exports = PokemonListItem;
