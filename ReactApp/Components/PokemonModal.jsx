var React = require('react');
var Reflux = require('reflux');
var SinglePokemonStore = require('../Reflux/SinglePokemonStore.jsx');

var PokemonModal = React.createClass({
  mixins: [Reflux.listenTo(SinglePokemonStore, 'onChange')],
  getInitialState: function() {
    return {
      data: {
        Pokemon: []
      }
    }
  },
  onChange: function(event, data) {
    this.setState({data: data});
    $('#myModal').modal('show');
  },
  render: function() {
    return (
      <div>
        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <h2>{this.state.data.Pokemon.Name}</h2>
                <div className="col-sm-4">
                  <img src={this.state.data.ImageUrl}/>
                </div>
                <div>
                  <p>Attack:
                     {this.state.data.Pokemon.Attack}</p>
                  <p>Defense:
                     {this.state.data.Pokemon.Defense}</p>
                  <p>Catch Rate:
                     {this.state.data.Pokemon.CatchRate}</p>
                  <p>Height: 
                    {this.state.data.Pokemon.Height}</p>
                </div>
                <br/>
                <span>
                  {this.state.data.Description}
                </span>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = PokemonModal;
