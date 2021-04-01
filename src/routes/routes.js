import React from 'react';
import { Route, Router, Switch, Redirect } from 'react-router';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import history from '../services/history/history';
import Login from '../pages/Login';

import OpportunitieList from '../core/Oportunities/OpportunitieList';
import OpportunitieRegister from '../core/Oportunities/OpportunitieRegister';
import OpportunitieEdit from '../core/Oportunities/OpportunitieEdit';
import OpportunitiePendents from '../core/Oportunities/OpportunitiePendents';

import NoticeRegister from '../core/Notices/NoticeRegister';
import NoticesList from '../core/Notices/NoticesList';
import NoticesDetails from '../core/Notices/NoticesDetails';
import NoticeEdit from '../core/Notices/NoticeEdit';

import DirectoryRegister from '../core/Directory/DirectoryRegister';
import DirectoryList from '../core/Directory/DirectoryList';
import DirectoryDetails from '../core/Directory/DirectoryDetails';
import DirectoryEdit from '../core/Directory/DirectoryEdit';

import EventRegister from '../core/Event/EventRegister';
import EventList from '../core/Event/EventList';
import EventDetails from '../core/Event/EventDetails';
import EventEdit from '../core/Event/EventEdit';

import CourseRegister from '../core/Course/CourseRegister';
import CourseList from '../core/Course/CourseList';
import CourseDetails from '../core/Course/CourseDetails';
import CourseEdit from '../core/Course/CourseEdit';

import TagRegister from '../pages/Tags/TagRegister';
import TagEdit from '../pages/Tags/TagEdit';

import JobTypeRegister from '../pages/JobType/JobTypeRegister';
import JobTypeEdit from '../pages/JobType/JobTypeEdit';

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

        <AdminRoute path="/jobtype/cadastrar" component={JobTypeRegister} />
        <AdminRoute path="/jobtype/editar/:id" component={JobTypeEdit} />

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