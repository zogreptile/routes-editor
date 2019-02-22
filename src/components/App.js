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
  load: 'geocode,route',
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
      route,
    } = this.state;

    const geocodeResult = await ymaps.geocode(searchValue);
    const newPoint = {
      caption: geocodeResult.geoObjects.get(0).properties.get('text'),
      coords: geocodeResult.geoObjects.get(0).geometry.getCoordinates(),
      id: 'id_' + nanoid(),
    };
    const newPoints = [...points, newPoint];
    const newRoute = newPoints.length > 1 ?
      await ymaps.route(newPoints.map(point => point.coords)) :
      null;

    map.setCenter(newPoint.coords);
    route && map.geoObjects.remove(route);

    this.setState({
      searchValue: '',
      points: [...points, newPoint],
      route: newRoute,
    });
  }

  handlePointRemove = async (id) => {
    const {
      points,
      map,
      ymaps,
      route,
    } = this.state;

    const newPoints = points.filter(point => point.id !== id);
    const newRoute = newPoints.length > 1 ?
      await ymaps.route(newPoints.map(point => point.coords)) :
      null;

    route && map.geoObjects.remove(route);
    newPoints.length && map.setCenter(newPoints[0].coords);

    this.setState({
      points: newPoints,
      route: newRoute,
    })
  }

  render() {
    const {
      searchValue,
      points,
      map,
      route,
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
            map={map}
            route={route}
          />
        </Map>
      </YMaps>
    );
  }
};

export default App;
