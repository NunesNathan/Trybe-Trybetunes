import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      disableSearch: true,
    };
  }

  request = (e) => {
    console.log(e);
  }

  toEnable = (e) => {
    const { value } = e.target;
    const minValue = 2;
    this.setState({
      searchInput: value,
    }, () => {
      if (value.length >= minValue) {
        this.setState({
          disableSearch: false,
        });
      } else {
        this.setState({
          disableSearch: true,
        });
      }
    });
  }

  render() {
    const { disableSearch, searchInput } = this.state;
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
              onClick={ () => this.request(searchInput) }
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
