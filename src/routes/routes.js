import React from 'react';
import { Route, Router, Switch, Redirect } from 'react-router';
import Notices from '../pages/Notices';
import NotFound from '../pages/NotFound';
import history from '../services/history/history';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Opportunities from '../pages/Opportunities';
import RegisterJob from '../pages/RegisterJob';
import EditJob from '../pages/EditJob';

// import { Container } from './styles';

import { isAuthenticated, logout } from "../services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

function Routes() {
  return <Router history={history}>
      <Switch>
            <Route path="/login"  component={Login} />
            <Route path="/cadastro"  component={Register} />
            <Route path="/oportunidades" exact component={Opportunities} />
            <Route path="/" exact component={Notices} />
            
            <PrivateRoute path="/dashboard" component={() => <h1>Página protegida por Token</h1>} />
            <PrivateRoute path="/cadastrar-job" component={RegisterJob} />
            <PrivateRoute path="/editar-job/:id" component={EditJob} />
            <Route path="/logout" exact render={props => {
	          logout(); 
	          return <Redirect to={{ pathname: "/", state: { from: props.location } }} />
	        }} 
	        />

	        <Route path="*" component={NotFound}/>
      </Switch>
  </Router>;
}

export default Routes;