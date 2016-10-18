import React, { Component } from 'react';
import Relay from 'react-relay';
import { withRouter } from 'react-router';

import PokemonEvolution from './PokemonEvolution';

import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';

class PokemonDetail extends Component {
  render() {
    const {
      number,
      name,
      image,
      types,
      weaknesses,
      evolutions,
    } = this.props.viewer.pokemon;

    return (
      <Card>
        <CardMedia
          overlay={
            <CardTitle
              title={`${number} - ${name}`}
              subtitle={types.join(', ')}
            />
          }
          style={styles.cardMedia}
        >
          <img
            src={image}
            style={styles.pokemonImage}
          />
        </CardMedia>
        <CardText>
          <div style={styles.chips}>
            {types.map((type, index) =>
              <Chip
                key={index}
                style={styles.chip}
              >
                {type}
              </Chip>
            )}
          </div>
          <div style={styles.chips}>
            {weaknesses.map((weakness, index) =>
              <Chip
                key={index}
                style={styles.chip}
              >
                {weakness}
              </Chip>
            )}
          </div>
          <PokemonEvolution evolutions={evolutions|| null} />
        </CardText>
        <CardActions style={styles.cardActions}>
          <FlatButton
            label="Back"
            onTouchTap={() => this.props.router.goBack()}
          />
        </CardActions>
      </Card>
    );
  }
}

const styles = {
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 5,
  },
  cardMedia: {
    display: 'flex',
    justifyContent: 'center',
  },
  pokemonImage: {
    minWidth: 200,
    maxWidth: 200,
  },
};

export default Relay.createContainer(withRouter(PokemonDetail), {
  initialVariables: {
    id: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        pokemon(id: $id) {
          number
          name
          image
          types
          weaknesses
          evolutions {
            ${PokemonEvolution.getFragment('evolutions')}
          }
        }
      }
    `,
  },
});
