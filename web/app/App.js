import React from 'react';

import '~/styles/style.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import { useAuth } from '~/lib/auth';
import LandingPage from './LandingPage';
import SignupPage from './SignupPage';

function App() {
  useAuth();

  return (
    <Switch>
      <Route exact path={'/'} component={LandingPage} />
      <Route path={'/signup'} component={SignupPage} />
    </Switch>
  );
}

export default withRouter(App);
