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
    map: null,
  }

  setMapRef = (map) => {
    this.setState({ map });
  }

  setYmapsRef = (ymaps) => {
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
          const { map } = this.state;
          const newPlace = {
            caption: result.geoObjects.get(0).properties.get('text'),
            coords: result.geoObjects.get(0).geometry.getCoordinates(),
          };

          map.setCenter(newPlace.coords);

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
          onLoad={this.setYmapsRef}
          instanceRef={this.setMapRef}
        >
          {this.renderPlacemarks()}
        </Map>
      </YMaps>
    );
  }
};

export default App;
