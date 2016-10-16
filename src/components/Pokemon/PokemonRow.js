import React, { Component } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

import { GridTile } from 'material-ui/GridList';
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
      <Link to={id}>
        <GridTile
          key={id}
          title={`${number} - ${name}`}
          subtitle={types.join(', ')}
        >
          <img src={image} />
        </GridTile>
      </Link>
    );
  }
}

const styles = {
  title: {
    color: 'white',
    textDecoration: 'none',
  },
};

export default Relay.createContainer(PokemonRow, {
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
