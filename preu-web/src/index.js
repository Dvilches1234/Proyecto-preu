import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import WrappedLoginForm from './components/Login/Login';
import CreateStudent from './components/CreateStudent/CreateStudent';
ReactDOM.render(
  <Router>
    <div>
      <Route exact path='/' component={App} />
      <Route exact path='/login' component={WrappedLoginForm} />
      <Route exact path='/create/alumno' component={CreateStudent} />

    </div>
  </Router>

  , document.getElementById('root'));
