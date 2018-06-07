var axios = require('axios')
let apiHost = 'http://' + (process.env.API_HOST || 'localhost') + '3000'

module.exports = {
  authenticateUser: function(rut, password) {
    let data = {
      auth: {
        rut: rut,
        password: password
      }
    }

    return axios.post(apiHost + '/api/authenticate', data)
    .then( function(response) {
      return response.data.jwt
    })
    .catch(function(error){
      return undefined
    })
  },

  getCurrentUser: function(jwt) {
    var config = {
      headers: {}
    }
    if(jwt) {
      config['headers']['Authorization'] = 'Bearer ' + jwt
    }
    return axios.get(apiHost + '/api/users/current', config)
    .then(function(response){
      return response.data
    })
    .catch(function(error){
      return undefined
    })
  }
}
