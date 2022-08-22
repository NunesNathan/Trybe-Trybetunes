import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Search from './Search';

export default class Login extends Component {
  constructor() {
    super();

    this.MINIMUM_USERNAME_LENGTH = 3;
    this.state = {
      username: '',
      isEnabled: true,
      toLoading: false,
      toGo: false,
    };
  }

  buttonValidate = (value) => {
    this.setState({
      isEnabled: value.length < this.MINIMUM_USERNAME_LENGTH,
    });
  };

  validadeLogin = () => {
    const { username: name } = this.state;
    this.setState({
      toLoading: true,
    }, () => createUser({ name }));
    this.setState({
      toGo: true,
    });
  }

  render() {
    const { isEnabled, toLoading, toGo } = this.state;
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <form>
          <label htmlFor="login">
            <input
              data-testid="login-name-input"
              id="login"
              onChange={ (e) => {
                const { value } = e.target;
                this.setState({
                  username: value,
                });
                this.buttonValidate(value);
              } }
              placeholder="Login"
            />
            <button
              data-testid="login-submit-button"
              disabled={ isEnabled }
              id="login"
              onClick={ this.validadeLogin }
              type="button"
            >
              Entrar
            </button>
          </label>
        </form>
        {
          toLoading
          && <span>Carregando...</span>
        }
        {
          toGo
          && <Redirect to="/search" component={ Search } />
        }
      </div>
    );
  }
}
