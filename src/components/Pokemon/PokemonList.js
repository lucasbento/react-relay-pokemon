import React, { Component } from 'react';
import Relay from 'react-relay';

import { GridList } from 'material-ui/GridList';

import Loading from '../common/Loading';

import PokemonRow from './PokemonRow';

class PokemonList extends Component {
  state = {
    isLoading: false,
  }

  handleScroll = () => {
    if (((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 300)) && !this.state.isLoading) {
      this.setState({
        isLoading: true,
      });

      this.props.relay.setVariables({
        count: this.props.relay.variables.count + 10,
      }, readyState => {
        if (!readyState.done)
          return;

        this.setState({
          isLoading: false,
        });
      });
    }
  }

  componentDidMount = () => window.addEventListener('scroll', this.handleScroll)

  componentWillUnmount = () => window.removeEventListener('scroll', this.handleScroll)

  render() {
    const { pokemons } = this.props.query;

    return (
      <div>
        <GridList
          cellHeight={180}
        >
          {pokemons.map(pokemon =>
            <PokemonRow
              key={pokemon.id}
              pokemon={pokemon}
            />
          )}
        </GridList>
        <Loading show={this.state.isLoading} />
      </div>
    );
  }
}

export default Relay.createContainer(PokemonList, {
  initialVariables: {
    count: 20,
  },
  fragments: {
    query: () => Relay.QL`
      fragment on Query {
        pokemons(first: $count) {
          id
          ${PokemonRow.getFragment('pokemon')}
        }
      }
    `,
  },
});
