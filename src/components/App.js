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
    coords: null,
    ymaps: null,
  }

  handleSearchChange = (e) => {
    this.setState({ searchValue: e.target.value });
  }

  handleSearchSubmit = (e) => {
    e.preventDefault();
    const { ymaps, searchValue } = this.state;

    ymaps.geocode(searchValue)
      .then(result => {
        this.setState({
          searchValue: '',
          coords: result.geoObjects.get(0).geometry.getCoordinates() 
        })
      });
  }

  getYmaps = (ymaps) => {
    this.setState({ ymaps });
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
          onLoad={ymaps => this.getYmaps(ymaps)}
        >
        {
          this.state.coords && <Placemark geometry={this.state.coords} />
        }
        </Map>
      </YMaps>
    );
  }
};

export default App;
