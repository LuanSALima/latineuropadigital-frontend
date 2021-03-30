import React from 'react';
import { Route, Router, Switch, Redirect } from 'react-router';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import history from '../services/history/history';
import Login from '../pages/Login';

import OpportunitieList from '../pages/Oportunities/OpportunitieList';
import OpportunitieRegister from '../pages/Oportunities/OpportunitieRegister';
import OpportunitieEdit from '../pages/Oportunities/OpportunitieEdit';
import OpportunitiePendents from '../pages/Oportunities/OpportunitiePendents';

import NoticeRegister from '../pages/Notices/NoticeRegister';
import NoticesList from '../pages/Notices/NoticesList';
import NoticesDetails from '../pages/Notices/NoticesDetails';
import NoticeEdit from '../pages/Notices/NoticeEdit';

import DirectoryRegister from '../pages/Directory/DirectoryRegister';
import DirectoryList from '../pages/Directory/DirectoryList';
import DirectoryDetails from '../pages/Directory/DirectoryDetails';
import DirectoryEdit from '../pages/Directory/DirectoryEdit';

import EventRegister from '../pages/Event/EventRegister';
import EventList from '../pages/Event/EventList';
import EventDetails from '../pages/Event/EventDetails';
import EventEdit from '../pages/Event/EventEdit';

import CourseRegister from '../pages/Course/CourseRegister';
import CourseList from '../pages/Course/CourseList';
import CourseDetails from '../pages/Course/CourseDetails';
import CourseEdit from '../pages/Course/CourseEdit';

import TagRegister from '../pages/Tags/TagRegister';
import TagEdit from '../pages/Tags/TagEdit';

import UserEdit from '../pages/UserEdit';

import Dashboard from '../pages/Dashboard';

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
        <Route path="/" exact component={Home} />

        <Route path="/login"  component={Login} />
        
        <Route path="/noticias" exact component={NoticesList} />
        <Route path="/noticia/:id" exact component={NoticesDetails} />

        <Route path="/diretorios" exact component={DirectoryList} />
        <Route path="/diretorio/:id" exact component={DirectoryDetails} />

        <Route path="/eventos" exact component={EventList} />
        <Route path="/evento/:id" exact component={EventDetails} />

        <Route path="/cursos" exact component={CourseList} />
        <Route path="/curso/:id" exact component={CourseDetails} />

        <Route path="/oportunidades" exact component={OpportunitieList} />
        <Route path="/job/cadastrar" component={OpportunitieRegister} />
        
        <AdminRoute path="/dashboard" component={Dashboard} />

        <AdminRoute path="/oportunidades-pendentes" component={OpportunitiePendents} />
        <AdminRoute path="/job/editar/:id" component={OpportunitieEdit} />
        
        <AdminRoute path="/tag/cadastrar" component={TagRegister} />
        <AdminRoute path="/tag/editar/:id" component={TagEdit} />

        <AdminRoute path="/notice/cadastrar" component={NoticeRegister} />
        <AdminRoute path="/notice/editar/:id" component={NoticeEdit} />

        <AdminRoute path="/directory/cadastrar" component={DirectoryRegister} />
        <AdminRoute path="/directory/editar/:id" component={DirectoryEdit} />

        <AdminRoute path="/event/cadastrar" component={EventRegister} />
        <AdminRoute path="/event/editar/:id" component={EventEdit} />

        <AdminRoute path="/course/cadastrar" component={CourseRegister} />
        <AdminRoute path="/course/editar/:id" component={CourseEdit} />

        <AdminRoute path="/user/editar/:id" component={UserEdit} />

        

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