import React from 'react';
import { Link } from 'react-router';

import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';

const styles = {
  lastEvolutionWarning: {
    margin: 7,
  },
};

const PokemonEvolution = ({ evolutions }) => (
  <div>
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
  </div>
);

export default PokemonEvolution;
