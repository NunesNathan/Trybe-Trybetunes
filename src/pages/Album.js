import React, { Component } from 'react';
import Header from '../components/Header';

export default class Album extends Component {
  render() {
    return (
      <div>
        <div data-testid="page-album">
          <h2>Album</h2>
          <Header />
        </div>
      </div>
    );
  }
}
