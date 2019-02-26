import React from 'react';
import PlaceItem from './PlaceItem';

const PlacesList = ({
  points = [],
  onRemoveItem,
  onDropItem,
}) => (!points.length ?
  null :
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

export default PlacesList;
