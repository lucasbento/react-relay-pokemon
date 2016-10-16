import React, { Component } from 'react';
import Relay from 'react-relay';
import { withRouter, Link } from 'react-router';

import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
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
        >
          <img src={image} />
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
          {evolutions ?
            <List>
              <Subheader>Evolutions</Subheader>
              {evolutions.map(evolution => (
                <Link
                  to={evolution.id}
                  key={evolution.id}
                >
                  <ListItem
                    primaryText={`${evolution.number} - ${evolution.name}`}
                    leftAvatar={<Avatar src={evolution.image} />}
                  />
                </Link>
              ))}
            </List> :
            <div style={styles.lastEvolutionWarning}>
              This is the last evolution
            </div>
          }
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
  lastEvolutionWarning: {
    margin: 7,
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
            id
            number
            name
            image
          }
        }
      }
    `,
  },
});
