import React from 'react';
import { Route, Router, Switch } from 'react-router';
import Notices from '../pages/Notices';
import NotFound from '../pages/NotFound';
import history from '../services/history/history';

// import { Container } from './styles';

function Routes() {
  return <Router history={history}>
      <Switch>
            <Route path="/" exact component={Notices} />
            <Route path="*" component={NotFound}/>
      </Switch>
  </Router>;
}

export default Routes;