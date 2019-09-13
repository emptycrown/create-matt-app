import React from 'react';

import '~/styles/style.css';
import { ApolloProvider } from '@apollo/react-hooks';
import { AuthRoute, useAuth } from '~/lib/auth';
import { Route, Switch, withRouter } from 'react-router-dom';
import { useNewApolloClient } from '~/apollo/init';
import LandingPage from './LandingPage';
import LifePage from './LifePage';
import NotFound from './NotFound';
import SignupPage from './SignupPage';

// CMA-TODO: maybe add some sort of error boundary

function _App() {
  const apolloClient = useNewApolloClient();
  useAuth();

  return (
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  );
}

function App() {
  return (
    <Switch>
      <Route exact path={'/'} component={LandingPage} />
      <AuthRoute requires="NO_USER" path={'/signup'} component={SignupPage} />
      <AuthRoute path={'/life'} component={LifePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default withRouter(_App);
