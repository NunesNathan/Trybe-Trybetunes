import React, { Component } from 'react';
import Navbar from './Navbar';

import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      onLoading: true,
      username: '',
    };
  }

  componentDidMount() {
    this.fetcher();
  }

  async fetcher() {
    const user = await getUser();
    this.setState({
      username: user.name,
      onLoading: false,
    });
  }

  render() {
    const { onLoading, username } = this.state;
    return (
      <>
        <Navbar />
        {
          onLoading ? (
            <span>Carregando...</span>
          ) : (
            <header data-testid="header-component">
              <span data-testid="header-user-name">
                {username}
              </span>
            </header>
          )
        }
      </>
    );
  }
}
