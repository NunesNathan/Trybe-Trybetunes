import React, { Component } from 'react';

export default class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <h1>Not Found</h1>
        <p>Parece que você está sem sintonia! =/</p>
        <a
          data-testid="link-to-search"
          href="/"
        >
          Voltar ao Login
        </a>
        <a
          href="/search"
          data-testid="link-to-search"
        >
          Ir à Home
        </a>
      </div>
    );
  }
}
