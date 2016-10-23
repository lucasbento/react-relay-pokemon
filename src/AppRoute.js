import React from 'react';
import Relay from 'react-relay';

import { Route, IndexRoute, Router, Redirect, useRouterHistory, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';
import RelayStore from './RelayStore';

import { createHashHistory } from 'history';

import App from './components/App';

import PokemonList from './components/Pokemon/PokemonList';
import PokemonDetail from './components/Pokemon/PokemonDetail';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

const RootQuery = {
  query: () => Relay.QL`
    query {
      query
    }
  `,
};

const AppRoute = () => (
  <App>
    <Router
      history={appHistory}
      render={applyRouterMiddleware(useRelay)}
      environment={RelayStore}
    >
      <Route
        path="/"
        component={PokemonList}
        queries={RootQuery}
      />
      <Route
        path=":id"
        component={PokemonDetail}
        queries={RootQuery}
      />
    </Router>
  </App>
);

export default AppRoute;
