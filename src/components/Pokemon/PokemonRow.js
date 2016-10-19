import React, { Component } from 'react';
import Relay from 'react-relay';
import { withRouter } from 'react-router';

import { GridTile } from 'material-ui/GridList';
import { CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';

class PokemonRow extends Component {
  render() {
    const {
      id,
      number,
      name,
      image,
      types,
    } = this.props.pokemon;

    return (
      <GridTile
        key={id}
        title={`${number} - ${name}`}
        subtitle={types.join(', ')}
        style={styles.gridTile}
        onTouchTap={() => this.props.router.push(id)}
      >
        <CardMedia>
          <img
            src={image}
            style={styles.pokemonImage}
          />
        </CardMedia>
      </GridTile>
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
    height: 170,
    width: 'initial',
  },
};

export default Relay.createContainer(withRouter(PokemonRow), {
  fragments: {
    pokemon: () => Relay.QL`
      fragment on Pokemon {
        id
        number
        name
        image
        types
      }
    `,
  },
});
