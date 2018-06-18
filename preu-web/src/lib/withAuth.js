import React, { Component } from 'react';
import APIService from './APIService';
import { Redirect } from 'react-router-dom';

const withAuth = (allowedTypes) => (AuthComponent) => {
  const Auth = new APIService();

  return class WithAuthorization extends Component {
    constructor(props) {
      super(props);
      this.state = {
          user: null
      }
    }

    componentWillMount() {
      if(!Auth.loggedIn()){
        this.props.history.replace('/login')
      }else{
        try {
          const user = Auth.getUser()
          this.setState({
            user: user
          })
        } catch(err){
          Auth.logout()
          this.props.history.replace('/login')
        }
      }
    }

    render() {
      const { type } = this.state.user;
      if(this.state.user && allowedTypes.includes(type)){
        return (
          <AuthComponent history={this.props.history} user={this.state.user} {...this.props}/>
        )
      }else if(this.state.user && !allowedTypes.includes(type)){
          return  (
            <Redirect to='/' />
          )
      }else{
          return null
      }
    }
  }
}

export default withAuth;
