import React from 'react';
import { Route, Router, Switch } from 'react-router';
import Notices from '../pages/Notices';
import NotFound from '../pages/NotFound';
import history from '../services/history/history';
import Login from '../pages/Login';
import Register from '../pages/Register';

// import { Container } from './styles';

function Routes() {
  return <Router history={history}>
      <Switch>
            <Route path="/login"  component={Login} />
            <Route path="/cadastro"  component={Register} />
            <Route path="/" exact component={Notices} />
            <Route path="*" component={NotFound}/>
      </Switch>
  </Router>;
}

export default Routes;