import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();

    this.MINIMUM_SEARCH_LENGTH = 2;
    this.state = {
      disableSearch: true,
      response: false,
      results: [],
      searchInput: '',
      toLoading: false,
    };

    this.request = this.request.bind(this);
    this.toEnable = this.toEnable.bind(this);
  }

  async request() {
    const { searchInput } = this.state;
    this.setState({
      toLoading: true,
    });
    const results = await searchAlbumsAPI(searchInput);
    this.setState({
      response: true,
      results,
      toLoading: false,
    });
  }

  toEnable({ value }) {
    this.setState({
      searchInput: value,
      disableSearch: value.length < this.MINIMUM_SEARCH_LENGTH,
    });
  }

  render() {
    const { disableSearch, searchInput, toLoading, response, results } = this.state;
    return (
      <div data-testid="page-search">
        <h1>Search</h1>
        <Header />
        { toLoading ? (
          <span>Carregando...</span>
        ) : (
          <form>
            <label htmlFor="search">
              <input
                data-testid="search-artist-input"
                onChange={ (e) => this.toEnable(e.target) }
              />
              <button
                data-testid="search-artist-button"
                disabled={ disableSearch }
                onClick={ this.request }
                type="button"
              >
                Pesquisar
              </button>
            </label>
          </form>
        )}
        { response
          && (
            <ul>
              <h2>
                {`Resultado de álbuns de: ${searchInput}`}
              </h2>
              { results.length > 0 ? (
                results.map((result) => (
                  <li
                    key={ result.collectionId }
                  >
                    <Link
                      to={ `/album/${result.collectionId}` }
                      data-testid={ `link-to-album-${result.collectionId}` }
                    >
                      { result.collectionName }
                    </Link>
                  </li>
                ))
              ) : <h2>Nenhum álbum foi encontrado</h2>}
            </ul>
          )}
      </div>
    );
  }
}
