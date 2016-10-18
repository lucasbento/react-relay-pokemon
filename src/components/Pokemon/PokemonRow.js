import React, { Component } from 'react';
import Relay from 'react-relay';
import { withRouter } from 'react-router';

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
      <GridTile
        key={id}
        title={`${number} - ${name}`}
        subtitle={types.join(', ')}
        style={styles.gridTile}
        onClick={() => this.props.router.push(id)}
      >
        <img src={image} />
      </GridTile>
    );
  }
}

const styles = {
  gridTile: {
    cursor: 'pointer',
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
