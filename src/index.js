import 'babel-polyfill';

import { AppContainer } from 'react-hot-loader';
import React from 'react';
import Relay from 'react-relay';
import { render } from 'react-dom';
import RelayStore from './RelayStore';

import injectTapEventPlugin from 'react-tap-event-plugin';

import PokemonApp from './PokemonApp';

injectTapEventPlugin();

const networkLayer = new Relay.DefaultNetworkLayer(process.env.GRAPHQL_URL);
RelayStore.reset(networkLayer);

const rootEl = document.getElementById('root');

render(
  <AppContainer>
    <PokemonApp />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./PokemonApp', () => {
    const NextApp = require('./PokemonApp').default;

    render(<AppContainer><NextApp/></AppContainer>,
      document.getElementById('root')
    );
  });
}

// Keep this until this is fixed: https://github.com/reactjs/react-router/issues/2182
console.error = (() => {
  const error = console.error
  return function (exception) {
    (exception && typeof exception === 'string' && exception.match(/change <Router /))
    ? undefined
    : error.apply(console, arguments)
  }
})()
