import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WrappedLoginForm from './login/login';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import ProtectedRoute from './services/ProtectedRoute';
import { Router, Route, Redirect } from 'react-router-dom';




ReactDOM.render(
  <Router>
    <ProtectedRoute path='/' component={App} />
    <Route path='/login' component={WrappedLoginForm} />
  </Router>
  , document.getElementById('root'));
registerServiceWorker();
