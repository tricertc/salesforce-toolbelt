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

    getTokenizedPassword: function () {
      return this.password + this.securityToken;
    }
  }

};
