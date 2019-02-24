import React from 'react';
import {
  Placemark,
  Polyline,
} from 'react-yandex-maps';

class Route extends React.Component {
  render() {
    const { points } = this.props;

    if (!points.length) {
      return null;
    }

    const routeCoords = points.map(point => point.coords);

    return (
      <>
        {
          points.length > 1 ?
            <Polyline geometry={routeCoords} /> :
            null
        }
        {
          points.map((point, ind) => {
            return (
              <Placemark
                key={ind}
                geometry={point.coords}
                options={{ iconColor: '#ff0000' }}
              />
            )
          })
        }
      </>
    );
  };
};

export default Route;
