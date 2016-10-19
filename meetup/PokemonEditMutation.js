import Relay from 'react-relay';

class PokemonEditMutation extends Relay.Mutation {
  static fragments = {
    pokemon: () => Relay.QL`
      fragment on Pokemon {
        id
      },
    `,
  };

  // As variáveis que uma mutation recebe como input
  // São enviadas junto com o payload pra mutation no
  // GraphQL
  getVariables() {
    return {
      id: this.props.id,
      name: this.props.name,
      maxHP: this.props.maxHP,
    };
  }

  // Retorna a mutation que utilizaremos
  getMutation() {
    return Relay.QL`mutation {
      PokemonEditMutation
    }`;
  }

  // Diz o que queremos do server quando a mutation terminar
  // Ou seja, eu quero todo o payload do Pokémon
  // que eu acabei de alterar
  getFatQuery() {
    return Relay.QL`
      fragment on PokemonEditMutation {
        pokemon {
          name
          maxHP
        }
      }
    `;
  }

  getOptimisticResponse() {
    return {
      pokemon: {
        id: this.props.pokemon.id,
        name: this.props.name,
        maxHP: this.props.maxHP,
      },
    };
  }

  // São as variáveis que queremos que o Relay altere
  // no state local após a mutation
  // Dizemos ao Relay que o objeto `pokemon` retornado
  // da mutation deve ser merged com o `pokemon` local
  // com base no ID (this.props.id)
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        pokemon: this.props.pokemon.id,
      },
    }];
  }
}

export default PokemonEditMutation;
