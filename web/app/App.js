import React from 'react';

import '~/styles/style.css';
import { ApolloProvider } from '@apollo/react-hooks';
import { Route, Switch, withRouter } from 'react-router-dom';
import { useAuth } from '~/lib/auth';
import { useNewApolloClient } from '~/apollo/init';
import LandingPage from './LandingPage';
import NotFound from './NotFound';
import SignupPage from './SignupPage';

// TODO: maybe add some sort of error boundary

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
      <Route path={'/signup'} component={SignupPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default withRouter(_App);
