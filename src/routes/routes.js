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
import NoticeRegister from '../pages/NoticeRegister';
import NoticesList from '../pages/NoticesList';
import NoticesDetails from '../pages/NoticesDetails';

// import { Container } from './styles';

import { isAuthenticated, isAdmin, isProfessional, logout } from "../services/auth";

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

const UserProfessionalRoute = ({ component: Component, ...rest }) => (
  <Route
    {... rest}
    render={props =>
      isProfessional() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/unprofessional", state: { from: props.location } }} />
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
            <Route path="/oportunidades" exact component={Opportunities} />
            <Route path="/noticias" exact component={NoticesList} />
            <Route path="/noticia/:id" exact component={NoticesDetails} />
            <Route path="/" exact component={Notices} />
            
            <PrivateRoute path="/dashboard" component={() => <h1>Página protegida por Token</h1>} />
            <UserProfessionalRoute path="/cadastrar-job" component={RegisterJob} />
            <PrivateRoute path="/editar-job/:id" component={EditJob} />

            <AdminRoute path="/criar-post" component={NoticeRegister} />

            <Route path="/logout" exact render={props => {
    	          logout(); 
    	          return <Redirect to={{ pathname: "/", state: { from: props.location } }} />
    	        }}
  	        />

            <Route path="/unauthorized" component={() => <h1>Você não tem permissão para acessar</h1>}/>
            <Route path="/unprofessional" component={() => <h1>Sua conta não é profissional!</h1>}/>
            <Route path="*" component={NotFound}/>
      </Switch>
  </Router>;
}

export default Routes;