import React, { Component } from 'react';
import Header from '../components/Header';

export default class Album extends Component {
  render() {
    return (
      <div>
        <div data-testid="page-album">
          <Header />
          <h2>Album</h2>
        </div>
      </div>
    );
  }
}
