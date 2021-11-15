import React, { Component } from 'react';
import PropType from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      response: false,
      name: '',
      album: '',
    };
  }

  async componentDidMount() {
    this.fetcher();
  }

  fetcher = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const result = await getMusics(id);
    const name = result[0].artistName;
    const album = result[0].collectionName;
    this.setState({
      response: true,
      results: result,
      name,
      album,
    });
  }

  render() {
    const { name, response, results, album } = this.state;
    return (
      <div>
        <div data-testid="page-album">
          <h2>Album</h2>
          <Header />
        </div>
        {response
          && (
            <>
              <h3
                data-testid="artist-name"
              >
                {name}
              </h3>
              <h3
                data-testid="album-name"
              >
                {album}
              </h3>
              <ul>
                {/* https://stackoverflow.com/questions/40679613/how-to-skip-first-in-map-function */}
                {results.slice(1).map((result) => (
                  <MusicCard
                    key={ result.trackId }
                    wrapperType={ result.wrapperType }
                    previewUrl={ result.previewUrl }
                    trackName={ result.trackName }
                    trackId={ result.trackId }
                  />
                ))}
              </ul>
            </ >
          )}
      </div>
    );
  }
}

Album.propTypes = {
  id: PropType.number.isRequired,
  match: PropType.shape({
    params: PropType.objectOf(PropType.number),
  }).isRequired,
};
