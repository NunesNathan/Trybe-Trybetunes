import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      disableSearch: true,
    };
  }

  toEnable = (e) => {
    const { value } = e.target;
    const minValue = 2;

    if (value.length >= minValue) {
      this.setState({
        disableSearch: false,
      });
    } else {
      this.setState({
        disableSearch: true,
      });
    }
  }

  render() {
    const { disableSearch } = this.state;
    return (
      <div data-testid="page-search">
        <h2>Search</h2>
        <Header />
        <form>
          <label htmlFor="search">
            <input
              data-testid="search-artist-input"
              onChange={ this.toEnable }
            />
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ disableSearch }
            >
              Pesquisar
            </button>
          </label>
        </form>
      </div>
    );
  }
}
