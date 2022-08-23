import React, { Component } from 'react';
import PropType from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { previewUrl, trackName, trackId, favTrue, favButton,
    } = this.props;
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
            onClick={ (e) => favButton(trackId, e.target) }
            id={ trackId }
            defaultChecked={ favTrue }
          />
        </label>
      </li>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropType.string.isRequired,
  trackName: PropType.string.isRequired,
  trackId: PropType.number.isRequired,
  favTrue: PropType.bool.isRequired,
  favButton: PropType.func.isRequired,
};
