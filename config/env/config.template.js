module.exports = {

  salesforce: {
    oauth2: {
      loginUrl: '', // https://(test|login).salesforce.com
      clientId: '',
      clientSecret: '',
      redirectUri: ''
    },

    username: '',
    password: '',
    securityToken: '',

    maxRequest: 500,

    headers: {
      'SForce-Auto-Assign': 'FALSE'
    },

    getTokenizedPassword: function () {
      return this.password + this.securityToken;
    }
  }

};
