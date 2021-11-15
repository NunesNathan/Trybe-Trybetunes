import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Search from './Search';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isEnabled: true,
      toLoading: false,
      toGo: false,
    };
  }

  validadeLogin = (name) => {
    this.setState({
      toLoading: true,
    }, () => createUser({ name })
      .then(() => this.setState({
        toGo: true,
      })));
  }

  buttonValidate = (e) => {
    const min = 3;
    const { value } = e.target;
    const length = (value.length >= min);
    this.setState({
      name: value,
    }, () => {
      this.setState({
        isEnabled: !length,
      });
    });
  };

  render() {
    const { name, toLoading, isEnabled, toGo } = this.state;
    return (
      <div data-testid="page-login">
        <h2>Login</h2>
        <form>
          <label htmlFor="login">
            <input
              placeholder="Login"
              data-testid="login-name-input"
              onChange={ this.buttonValidate }
              id="login"
            />
            <button
              data-testid="login-submit-button"
              id="login"
              type="button"
              disabled={ isEnabled }
              onClick={
                () => this.validadeLogin(name)
              }
            >
              Entrar
            </button>
          </label>
        </form>
        {
          toLoading
          && <h3>Carregando...</h3>
        }
        {
          toGo
          && <Redirect to="/search" component={ Search } />
        }
      </div>
    );
  }
}
