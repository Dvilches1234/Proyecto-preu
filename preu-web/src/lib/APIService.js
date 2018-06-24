import decode from 'jwt-decode';

export default class APIService {

  constructor(){
    this.prefix = '/api'
    this.fetch = this.fetch.bind(this)
    this.login = this.login.bind(this)
    this.getUser = this.getUser.bind(this)
  }


  login(values){
    return this.fetch('/authenticate', {
      method: 'POST',
      body: JSON.stringify(values)
    }).then(res => {
      this.setToken(res.token)
      return Promise.resolve(res)
    })
  }

  loggedIn(){
    const token = this.getToken()
    return !!token
  }

  setToken(token){
    localStorage.setItem('token', token)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  logout(){
    localStorage.removeItem('token')
  }

  getUser(){
    return decode(this.getToken())
  }

  fetch(url, options){
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    if(this.loggedIn()){
      headers['Authorization'] = 'Bearer ' + this.getToken()
    }

    return fetch(this.prefix + url, {
      headers,
      ...options
    }).then(this._checkStatus).then(response => response.json())
  }

  _checkStatus(response){
    if (response.status >= 200 && response.status < 300){
      return response
    }else{
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }
}
