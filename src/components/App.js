import React from 'react';
import {
  YMaps,
  Map,
  Placemark,
} from 'react-yandex-maps';
import SearchBar from './SearchBar';
import PlacesList from './PlacesList';
import '../App.css';

const mapState = {
  center: [55.75, 37.57],
  zoom: 14,
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
          const newPlace = {
            caption: result.geoObjects.get(0).properties.get('text'),
            coords: result.geoObjects.get(0).geometry.getCoordinates(),
          };

          this.setState({
            searchValue: '',
            placemarks: [...placemarks, newPlace],
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

    return placemarks.map((place, ind) => <Placemark key={ind} geometry={place.coords} />);
  }

  render() {
    const { searchValue, placemarks } = this.state;
    return (
      <YMaps
        query={mapConfig}
      >
        <SearchBar
          value={searchValue}
          onChange={this.handleSearchChange}
          onSubmit={this.handleSearchSubmit}
        />
        <PlacesList
          items={placemarks}
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
