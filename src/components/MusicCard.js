import React, { Component } from 'react';
import PropType from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      toLoading: false,
    };
  }

  toFav = async (id) => {
    this.setState({
      toLoading: true,
    });
    const result = await getMusics(id);
    await addSong(result[0]);
    this.setState({
      toLoading: false,
    });
  }

  render() {
    const { toLoading } = this.state;
    const { previewUrl, trackName, trackId, favorites } = this.props;
    return (
      <li>
        <h4>{trackName}</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ () => this.toFav(trackId) }
            id={ trackId }
            defaultChecked={ favorites.find((favorite) => favorite.trackId === trackId) }
          />
        </label>
        {
          toLoading
          && <h3>Carregando...</h3>
        }
      </li>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropType.string.isRequired,
  trackName: PropType.string.isRequired,
  trackId: PropType.number.isRequired,
  favorites: PropType.shape({
    find: PropType.func.isRequired,
    trackId: PropType.number.isRequired,
  }).isRequired,
};
