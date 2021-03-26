import React from 'react';
import { Route, Router, Switch, Redirect } from 'react-router';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import history from '../services/history/history';
import Login from '../pages/Login';
import Register from '../pages/Register';
import OpportunitieList from '../pages/OpportunitieList';
import OpportunitieRegister from '../pages/OpportunitieRegister';
import OpportunitieEdit from '../pages/OpportunitieEdit';
import NoticeRegister from '../pages/NoticeRegister';
import NoticesList from '../pages/NoticesList';
import NoticesDetails from '../pages/NoticesDetails';
import Dashboard from '../pages/Dashboard';
import TagEdit from '../pages/TagEdit';
import UserEdit from '../pages/UserEdit';

// import { Container } from './styles';

import { isAuthenticated, isAdmin, logout } from "../services/auth";

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

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {... rest}
    render={props =>
      isAdmin() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/unauthorized", state: { from: props.location } }} />
      )
    }
  />
);

function Routes() {
  return <Router history={history}>
      <Switch>
        <Route path="/login"  component={Login} />
        <Route path="/cadastro"  component={Register} />
        <Route path="/oportunidades" exact component={OpportunitieList} />
        <Route path="/noticias" exact component={NoticesList} />
        <Route path="/noticia/:id" exact component={NoticesDetails} />
        <Route path="/" exact component={Home} />
        
        <AdminRoute path="/dashboard" component={Dashboard} />
        <AdminRoute path="/cadastrar-job" component={OpportunitieRegister} />
        <AdminRoute path="/job/editar/:id" component={OpportunitieEdit} />
        <AdminRoute path="/tag/editar/:id" component={TagEdit} />
        <AdminRoute path="/user/editar/:id" component={UserEdit} />

        <AdminRoute path="/criar-post" component={NoticeRegister} />

        <Route path="/logout" exact render={props => {
	          logout(); 
	          return <Redirect to={{ pathname: "/", state: { from: props.location } }} />
	        }}
        />

        <Route path="/unauthorized" component={() => <h1>Você não tem permissão para acessar</h1>}/>
        <Route path="*" component={NotFound}/>
      </Switch>
  </Router>;
}

export default Routes;