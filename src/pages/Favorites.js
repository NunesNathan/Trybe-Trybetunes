import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      favorites: [],
      toLoading: true,
    };
  }

  componentDidMount() {
    this.fetcher();
  }

  async favButton(fav) {
    this.setState({
      toLoading: true,
    });
    await removeSong(fav);
    this.setState({
      favorites: await getFavoriteSongs(),
      toLoading: false,
    });
  }

  async fetcher() {
    this.setState({
      favorites: await getFavoriteSongs(),
      toLoading: false,
    });
  }

  render() {
    const { toLoading, favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <h1>Favorites</h1>
        <Header />
        <div>
          {toLoading
            ? <span>Carregando...</span>
            : (
              <ul>
                {favorites.map((favorite) => (
                  <MusicCard
                    key={ favorite.trackId }
                    { ...favorite }
                    favTrue
                    favButton={ () => this.favButton(favorite) }
                  />))}
              </ul>
            )}
        </div>
      </div>
    );
  }
}
