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
      return (
        <Placemark
          key={ind}
          geometry={point.coords}
          options={{ iconColor: '#ff0000' }}
        />
      )
    });
  }
};

export default Route;
