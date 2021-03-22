import React from 'react';
import { Route, Router, Switch } from 'react-router';
import Notices from '../pages/Notices';
import history from '../services/history/history';

// import { Container } from './styles';

function Routes() {
  return <Router history={history}>
      <Switch>
            <Route path={"/"} component={Notices}></Route>
      </Switch>
  </Router>;
}

export default Routes;