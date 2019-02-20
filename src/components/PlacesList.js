import React from 'react';

class PlacesList extends React.Component {
  static defaultProps = {
    items: [],
  }

  render() {
    const { items } = this.props;

    if (!items.length) {
      return null;
    }

    return (
      <ul className='places'>
        {items.map((el, ind) =>
          <li
            className='places__item'
            key={ind}
          >
            {el.caption}
          </li>
        )}
      </ul>
    );
  }
}

export default PlacesList;
