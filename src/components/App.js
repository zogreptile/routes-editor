import React from 'react';
import {
  YMaps,
  Map,
} from 'react-yandex-maps';
import nanoid from 'nanoid';
import SearchBar from './SearchBar';
import PlacesList from './PlacesList';
import Route from './Route';
import '../App.css';

const mapState = {
  center: [55.75, 37.57],
  zoom: 14,
};

const mapConfig = {
  load: 'geocode,Polyline',
  apikey: 'eeb0c9a9-72eb-497b-a566-b040ed89c6c1',
};

class App extends React.Component {
  state = {
    searchValue: '',
    points: [],
    ymaps: null,
    map: null,
    route: null,
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

  handleSearchSubmit = async (e) => {
    e.preventDefault();
    const {
      ymaps,
      searchValue,
      points,
      map,
    } = this.state;

    const geocodeResult = await ymaps.geocode(searchValue);
    const newPoint = {
      caption: geocodeResult.geoObjects.get(0).properties.get('text'),
      coords: geocodeResult.geoObjects.get(0).geometry.getCoordinates(),
      id: 'id_' + nanoid(),
    };

    map.setCenter(newPoint.coords);

    this.setState({
      searchValue: '',
      points: [...points, newPoint],
    });
  }

  handlePointRemove = (id) => {
    const {
      points,
      map,
    } = this.state;

    const newPoints = points.filter(point => point.id !== id);

    newPoints.length && map.setCenter(newPoints[0].coords);

    this.setState({
      points: newPoints,
    })
  }

  render() {
    const {
      searchValue,
      points,
    } = this.state;

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
          points={points}
          onRemove={this.handlePointRemove}
        />
        <Map
          defaultState={mapState}
          width='100%'
          height='100vh'
          onLoad={this.setYmapsRef}
          instanceRef={this.setMapRef}
        >
          <Route
            points={points}
          />
        </Map>
      </YMaps>
    );
  }
};

export default App;
