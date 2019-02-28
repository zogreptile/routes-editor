import React from 'react';
import PlaceItem from './PlaceItem';

class PlacesList extends React.PureComponent {
  render() {
    const {
      points = [],
      onRemoveItem,
      onDropItem,
    } = this.props;

    if (!points.length) {
      return null;
    }

    return (
      <ul className='places'>
        {points.map((el, ind) =>
          <PlaceItem
            key={el.id}
            id={el.id}
            index={ind}
            caption={el.caption}
            onRemove={() => onRemoveItem(el.id)}
            onDrop={onDropItem}
          />
        )}
      </ul>
    );
  };
};

export default PlacesList;
