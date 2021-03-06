import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Navbar from './Navbar';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      onLoading: true,
    };
  }

  componentDidMount() {
    this.fetcher();
  }

  async fetcher() {
    const result = await getUser();
    this.setState({
      onLoading: false,
      name: result.name,
    });
  }

  render() {
    const { name, onLoading } = this.state;
    return (
      <>
        {
          onLoading ? (<span>Carregando...</span>)
            : (
              <header data-testid="header-component">
                <span data-testid="header-user-name">
                  {name}
                </span>
              </header>
            )
        }
        <Navbar />
      </>
    );
  }
}
