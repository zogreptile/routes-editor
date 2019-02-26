import React from 'react';
import { Map } from 'react-yandex-maps';
import nanoid from 'nanoid';
import SearchBar from './SearchBar';
import PlacesList from './PlacesList';
import Route from './Route';
import { mapState } from '../constants';
import '../App.css';

class App extends React.Component {
  state = {
    searchValue: '',
    points: [],
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

  handleSearchSubmit = async (e) => {
    e.preventDefault();
    const {
      ymaps,
      searchValue,
      points,
      map,
    } = this.state;

    if (!searchValue) {
      return null;
    }

    try {
      const geocodeResponse = await ymaps.geocode(searchValue, { results: 1 });
      const geocodedPoint = geocodeResponse.geoObjects.get(0);
      const newPoint = {
        id: 'id_' + nanoid(),
        coords: geocodedPoint.geometry.getCoordinates(),
        caption: geocodedPoint.properties.get('text'),
        balloonContent: geocodedPoint.properties.get('balloonContent'),
      };
  
      map.setCenter(newPoint.coords);
  
      this.setState({
        searchValue: '',
        points: [...points, newPoint],
      });
    } catch (err) {
      console.log('SEARCH_ERROR: ', err);
    }

  }

  handleItemRemove = (id) => {
    const {
      points,
      map,
    } = this.state;

    const newPoints = points.filter(point => point.id !== id);

    //TODO: show all points
    newPoints.length && map.setCenter(newPoints[newPoints.length - 1].coords);

    this.setState({ points: newPoints });
  }

  handleItemDrop = (dragIndex, dropIndex) => {
    const { points } = this.state;

    const newPoints = [...points];
    const dragItem = newPoints[dragIndex];
    const dropItem = newPoints[dropIndex];
    newPoints[dragIndex] = dropItem;
    newPoints[dropIndex] = dragItem;

    this.setState({ points: newPoints });
  }

  handlePointChangeLocation = async (id, coords) => {
    const {
      points,
      ymaps,
    } = this.state;

    try {
      const geocodeResponse = await ymaps.geocode(coords, { results: 1 });
      const geocodedPoint = geocodeResponse.geoObjects.get(0);
      const updatedPoints = points.reduce((acc, el) => {
        if (el.id === id) {
          const updatedPoint = {
            ...el,
            coords,
            caption: geocodedPoint.getAddressLine(),
            balloonContent: geocodedPoint.properties.get('balloonContent'),
          };
          return [...acc, updatedPoint];
        }
  
        return [...acc, el];
      }, []);
  
      this.setState({
        points: updatedPoints,
      });
    } catch (err) {
      console.log('CHANGE_LOCATION_ERROR: ', err);
    }
  }

  render() {
    const {
      searchValue,
      points,
    } = this.state;

    return (
      <>
        <SearchBar
          value={searchValue}
          onChange={this.handleSearchChange}
          onSubmit={this.handleSearchSubmit}
        />
        <PlacesList
          points={points}
          onRemoveItem={this.handleItemRemove}
          onDropItem={this.handleItemDrop}
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
            onChangeLocation={this.handlePointChangeLocation}
          />
        </Map>
      </>
    );
  }
};

export default App;
