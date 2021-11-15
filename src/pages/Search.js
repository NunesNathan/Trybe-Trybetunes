import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      disableSearch: true,
      toLoading: false,
      response: false,
      results: [],
    };
  }

  request = (e) => {
    this.setState({
      toLoading: true,
    }, () => searchAlbumsAPI(e)
      .then((then) => this.setState({
        response: true,
        results: then,
        toLoading: false,
      })));
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
    const { disableSearch, searchInput, toLoading, response, results } = this.state;
    return (
      <div data-testid="page-search">
        <h2>Search</h2>
        <Header />
        {toLoading
          ? <h3>Carregando...</h3>
          : (
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
          )}
        {
          response
          && (
            <ul>
              <h3>
                {`Resultado de álbuns de: ${searchInput}`}
              </h3>
              { results[0] !== undefined ? (results.map((result) => (
                <li
                  key={ result.collectionId }
                >
                  <Link
                    to={ `/album/${result.collectionId}` }
                    data-testid={ `link-to-album-${result.collectionId}` }
                  >
                    { result.collectionName }
                  </Link>
                </li>)))
                : <h4>Nenhum álbum foi encontrado</h4>}
            </ul>
          )
        }
      </div>
    );
  }
}
