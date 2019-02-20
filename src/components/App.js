import React from 'react';
import {
  YMaps,
  Map,
  Placemark,
} from 'react-yandex-maps';
import SearchBar from './SearchBar';
import '../App.css';

const mapState = {
  center: [55.75, 37.57],
  zoom: 9,
};

const mapConfig = {
  load: 'geocode',
  apikey: 'eeb0c9a9-72eb-497b-a566-b040ed89c6c1',
};

class App extends React.Component {
  state = {
    searchValue: '',
    placemarks: [],
    ymaps: null,
  }

  setYmaps = (ymaps) => {
    this.setState({ ymaps });
  }

  handleSearchChange = (e) => {
    this.setState({ searchValue: e.target.value });
  }

  handleSearchSubmit = (e) => {
    e.preventDefault();
    const { ymaps, searchValue, placemarks } = this.state;

    ymaps.geocode(searchValue)
      .then(
        result => {
          const newPlaceCoords = result.geoObjects.get(0).geometry.getCoordinates();
          this.setState({
            searchValue: '',
            placemarks: [...placemarks, newPlaceCoords],
          })
        },
        err => {
          console.log('Geocode error: ', err);
        }
      );
  }

  renderPlacemarks = () => {
    const { placemarks } = this.state;

    if (!placemarks.length) {
      return null;
    }

    return placemarks.map((coords, ind) => <Placemark key={ind} geometry={coords} />);
  }

  render() {
    const { searchValue } = this.state;
    return (
      <YMaps
        query={mapConfig}
      >
        <SearchBar
          value={searchValue}
          onChange={this.handleSearchChange}
          onSubmit={this.handleSearchSubmit}
        />
        <Map
          defaultState={mapState}
          width='100%'
          height='100vh'
          onLoad={ymaps => this.setYmaps(ymaps)}
        >
        {this.renderPlacemarks()}
        </Map>
      </YMaps>
    );
  }
};

export default App;
