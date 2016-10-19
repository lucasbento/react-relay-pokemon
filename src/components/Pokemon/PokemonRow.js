import React, { Component } from 'react';
import Relay from 'react-relay';
import { withRouter } from 'react-router';

import PokemonEvolution from './PokemonEvolution';

import { GridTile } from 'material-ui/GridList';
import { CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

class PokemonRow extends Component {
  state = {
    showEvolutions: null,
  }

  goToPokemon = id => this.props.router.push(id)

  toggleEvolutions = ({ currentTarget }) => {
    this.setState({
      showEvolutions: !!this.state.evolutions ? null : currentTarget,
    })
  }

  render() {
    const {
      id,
      number,
      name,
      image,
      types,
      evolutions,
    } = this.props.pokemon;

    return (
      <div>
        <GridTile
          key={id}
          title={`${number} - ${name}`}
          subtitle={types.join(', ')}
          style={styles.gridTile}
          actionIcon={
            <div>
              <IconButton onTouchTap={this.toggleEvolutions}>
                <FontIcon color="white" className="material-icons" children="adb" />
              </IconButton>
              <IconButton onTouchTap={() => this.goToPokemon(id)}>
                <FontIcon color="white" className="material-icons" children="send" />
              </IconButton>
            </div>
          }
        >
          <CardMedia>
            <img
              src={image}
              style={styles.pokemonImage}
              onTouchTap={() => this.goToPokemon(id)}
            />
          </CardMedia>
        </GridTile>
        <Popover
          open={!!this.state.showEvolutions}
          anchorEl={this.state.showEvolutions}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={() => this.setState({ showEvolutions: null })}
        >
          <PokemonEvolution evolutions={evolutions || null} />
        </Popover>
      </div>
    );
  }
}

const styles = {
  gridTile: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
  },
  pokemonImage: {
    width: 170,
    height: 170,
  },
};

export default Relay.createContainer(withRouter(PokemonRow), {
  fragments: {
    // Fragmento de um Pokemon
    pokemon: () => Relay.QL`
      fragment on Pokemon {
        id
        number
        name
        image
        types
        evolutions {
          ${PokemonEvolution.getFragment('evolutions')}
        }
      }
    `,
  },
});
