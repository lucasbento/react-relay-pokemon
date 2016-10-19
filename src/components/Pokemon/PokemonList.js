import React, { Component } from 'react';
import Relay from 'react-relay';

import { GridList } from 'material-ui/GridList';

import Loading from '../common/Loading';

import PokemonRow from './PokemonRow';

class PokemonList extends Component {
  state = {
    isLoading: false,
  }

  // Infinity loading
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
    const { pokemons } = this.props.viewer;

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

// Relay fornece um HOC, onde passadamos o component
// à query no GraphQL
export default Relay.createContainer(PokemonList, {
  // Variáveis iniciais que serão utilizadas na query
  initialVariables: {
    count: 20, // Quantos pokemons iremos solicitar ao GraphQL no init
  },
  fragments: {
    // Fragmento que será agrupado à query root
    viewer: () => Relay.QL`
      fragment on Viewer {
        pokemons(first: $count) {
          id
          ${PokemonRow.getFragment('pokemon')}
        }
      }
    `,
  },
});
