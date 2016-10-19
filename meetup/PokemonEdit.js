import React, { Component } from 'react';
import Relay from 'react-relay';
import RelayStore from '../../RelayStore';

import PokemonEditMutation from './PokemonEditMutation';

class PokemonEdit extends Component {
  handleSubmitForm = () => {
    const {
      id,
      name,
      maxHP,
    } = this.refs;

    const mutation = new PokemonEditMutation({
      id: id.input.value,
      name: name.input.value,
      maxHP: maxHP.input.value,
    });

    this.props.relay.commitUpdate(mutation, {
      onSuccess: successResponse =>
        console.log('Mutation foi lindo', successResponse),
      onFailure: failureResponse =>
        console.error('Deu ruim na mutation', failureResponse),
    });
  }

  render() {
    return (
      <div>
        My Form...
      </div>
    );
  }
}

export default Relay.createContainer(PokemonEdit, {
  initialVariables: {
    id: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        pokemon(id: $id) {
          id
          name
          maxHP
          ${PokemonEditMutation.getFragment('pokemon')}
        }
      }
    `,
  },
});
