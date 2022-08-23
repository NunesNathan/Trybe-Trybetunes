import React, { Component } from 'react';
import PropType from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      album: '',
      favorites: [],
      name: '',
      response: false,
      results: [],
      toLoading: true,
    };
  }

  componentDidMount() {
    this.fetcher();
  }

  async favButton(id, { checked }) {
    this.setState({
      toLoading: true,
    });
    const [result] = await getMusics(id);
    if (checked) {
      await addSong(result);
    } else {
      await removeSong(result);
    }
    this.setState({
      toLoading: false,
    });
  }

  async fetcher() {
    this.setState({
      favorites: await getFavoriteSongs(),
    });
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    const { artistName: name, collectionName: album } = result[0];
    this.setState({
      album,
      name,
      response: true,
      results: result.slice(1),
      toLoading: false,
    });
  }

  isFavorite(id) {
    const { favorites } = this.state;
    return favorites.some(({ trackId }) => trackId === id);
  }

  render() {
    const { name, response, results, album, toLoading } = this.state;
    return (
      <div data-testid="page-album">
        <h1>Album</h1>
        <Header />
        { toLoading
          && <span>Carregando...</span> }
        { response
          && (
            <>
              <h2
                data-testid="artist-name"
              >
                {name}
              </h2>
              <h3
                data-testid="album-name"
              >
                {album}
              </h3>
              <ul>
                { results.map((result) => (
                  <MusicCard
                    key={ result.trackId }
                    { ...result }
                    favTrue={ this.isFavorite(result.trackId) }
                    favButton={ (id, eventTarget) => this.favButton(id, eventTarget) }
                  />
                )) }
              </ul>
            </>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropType.shape({
    params: PropType.objectOf(PropType.string),
  }).isRequired,
};
