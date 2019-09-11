import React from 'react';

import { Route, Switch, withRouter } from 'react-router-dom';
import LandingPage from './LandingPage';
import SignupPage from './SignupPage';

function App() {
  return (
    <Switch>
      <Route exact path={'/'} component={LandingPage} />
      <Route path={'/signup'} component={SignupPage} />
    </Switch>
  );
}

export default withRouter(App);
