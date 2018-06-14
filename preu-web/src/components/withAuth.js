import React, { Component } from 'react';
import APIService from './APIService';

export default function withAuth(AuthComponent){
  const Auth = new APIService();

  return class AuthWrapped extends Component {
    constructor() {
      super();
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
      if(this.state.user){
        return (
          <AuthComponent history={this.props.history} user={this.state.user} />
        )
      }else{
        return null
      }
    }
  }
}
