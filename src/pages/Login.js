import React, { Component } from 'react';
// import createUser from '../services/userAPI';
const { createUser } = require('../services/userAPI');

export default class Login extends Component {
  loginValidate = (e) => {
    const { value } = e.target.previousSibling;
    const minCharac = 3;
    console.log(value.length >= minCharac);
    return value.length >= minCharac
      ? createUser({ name: value })
      : null;
  }

  render() {
    return (
      <div data-testid="page-login">
        <h2>Login</h2>
        <form>
          <label htmlFor="login">
            <input placeholder="Login" id="login" data-testid="login-name-input" />
            <button
              data-testid="login-submit-button"
              id="login"
              type="button"
              onClick={ this.loginValidate }
            >
              Entrar
            </button>
          </label>
        </form>
      </div>
    );
  }
}
