import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import WrappedLoginForm from './components/Login/Login';
import CreateStudent from './components/CreateUser/CreateStudent/CreateStudent';
import CreateVolunteer from './components/CreateUser/CreateVolunteer/CreateVolunteer';
import WrappedCreateSection from './components/CreateSection/CreateSection';
ReactDOM.render(
  <Router>
    <div>
      <Route exact path='/' component={App} />
      <Route exact path='/login' component={WrappedLoginForm} />
      <Route exact path='/create/alumno' component={CreateStudent} />
      <Route exact path='/create/voluntario' component={CreateVolunteer} />
      <Route exact path='/create/seccion' component={WrappedCreateSection} />

    </div>
  </Router>

  , document.getElementById('root'));
