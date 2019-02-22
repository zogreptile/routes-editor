import React from 'react';

class PlacesList extends React.Component {
  static defaultProps = {
    points: [],
  }

  render() {
    const { points, onRemove } = this.props;

    if (!points.length) {
      return null;
    }

    return (
      <ul className='places'>
        {points.map((el, ind) =>
          <li
            className='places__item'
            key={ind}
          >
            {el.caption}
            <button
              className='places__item-remove'
              onClick={() => onRemove(el.id)}
            >
              ✕
            </button>
          </li>
        )}
      </ul>
    );
  }
}

export default PlacesList;
