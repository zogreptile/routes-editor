import React from 'react';
import {
  Placemark,
  Polyline,
} from 'react-yandex-maps';

class Route extends React.Component {
  render() {
    const {
      points,
      onChangeLocation,
    } = this.props;

    if (!points.length) {
      return null;
    }

    const routeCoords = points.map(point => point.coords);

    return (
      <>
        <Polyline geometry={routeCoords} />
        {
          points.map((point, index) =>
            <Placemark
              key={point.id}
              geometry={point.coords}
              properties={{
                iconContent: index + 1,
                balloonContent: point.balloonContent,
              }}
              options={{
                draggable: true,
                iconColor: '#ff0000',
              }}
              modules={['geoObject.addon.balloon']}
              onDragEnd={(e) => {
                const newCoords = e.originalEvent.target.geometry.getCoordinates();
                onChangeLocation(point.id, newCoords);
              }}
            />
          )
        }
      </>
    );
  };
};

export default Route;
