import React from 'react';
import { Placemark } from 'react-yandex-maps';

class Route extends React.Component {
  render() {
    const {
      points,
      map,
      route,
    } = this.props;

    if (!points.length) {
      return null;
    }

    route && map.geoObjects.add(route);

    return points.map((point, ind) => {
      const newCoords = [point.coords[0] + 0.0002, point.coords[1] - 0.0002];
      return (
        <Placemark
          key={ind}
          geometry={newCoords}
          options={{ iconColor: '#ff0000' }}
          // geometry={point.coords}
        />
      )
    });
  }
};

export default Route;
