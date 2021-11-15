import React, { Component } from 'react';
import PropType from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { previewUrl, trackName } = this.props;
    return (
      <li>
        <h4>{trackName}</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
      </li>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropType.string.isRequired,
  trackName: PropType.string.isRequired,
};
