import React, { Component } from 'react';
import {Route, Redirect } from 'react-router-dom';
import AuthService from './auth';

const isLoggedIn = AuthService.loggedIn
class ProtectedRoute extends Component {
  render(){
    const { component: Component, ...props } = this.props

    return (
      <Route
        {...props}
        render={props => (
          isLoggedIn ?
            <Component {...props} /> :
            <Redirect to='/login' />
        )}
      />
    )
  }
}

export default ProtectedRoute
