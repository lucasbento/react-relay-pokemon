import React from 'react';
import Relay from 'react-relay';
import { withRouter } from 'react-router';

import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';

const styles = {
  lastEvolutionWarning: {
    margin: 7,
  },
};

const PokemonEvolution = ({ evolutions, router }) => (
  <div>
    {evolutions ?
      <List>
        <Subheader>Evolutions</Subheader>

        {evolutions.map(evolution => (
          <ListItem
            key={evolution.id}
            primaryText={`${evolution.number} - ${evolution.name}`}
            leftAvatar={<Avatar src={evolution.image} />}
            onTouchTap={() => router.push(evolution.id)}
          />
        ))}
      </List> :
      <div style={styles.lastEvolutionWarning}>
        This is the last evolution
      </div>
    }
  </div>
);

export default Relay.createContainer(withRouter(PokemonEvolution), {
  fragments: {
    evolutions: () => Relay.QL`
      fragment on Pokemon @relay(plural: true) {
        id
        name
        number
        image
      }
    `,
  }
});
