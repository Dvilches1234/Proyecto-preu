import React, { Component } from 'react';
import decode from 'jwt-decode';
export default class AuthService {
  constructor(domain){
    this.domain = domain || 'http://localhost:3000/api'
    this.fetch = this.fetch.bind(this)
    this.login = this.login.bind(this)
  }
  login(rut, password){
    return this.fetch(`$[this.domain]/authenticate`, {
      method: 'POST',
      body: JSON.stringify({
        rut,
        password
      })
    }).then(res => {
      this.setToken(res.token)
      return Promise.resolve(res);
    })
  }

  loggedIn(){
    const token = this.getToken()
    return !!token && !this.isTokenValid(token)
  }

  isTokenValid(idToken){
    try{
      const decoded = decode(idToken)
      if (decoded.exp < Date.now() /1000)
    }
  }

  setToken(idToken){
    localStorage.setItem('id_token', idToken)
  }

  getToken(){
    return localStorage.getItem('id_token')
  }

  logout(){
    localStorage.removeItem('id_token')
  }


  fetch(url, options){
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    if(this.loggedIn()){
      headers['Authorization'] = 'Bearer ' + this.getToken()
    }

    return fetch(url, {
      headers,
      ...options
    })
    .then(this._checkStatus)
    .then(response => response.json())
  }

  _checkStatus(response){
    if(response.status >= 200 && response.status < 300){
      return response
    }else{
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }
}
