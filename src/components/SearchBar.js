import React from 'react';

class SearchBar extends React.PureComponent {
  render() {
    const {
      value,
      onChange,
      onSubmit,
    } = this.props;

    return (
      <form
        className='search-bar'
        onSubmit={onSubmit}
      >
        <input
          className='search-bar__input'
          type='text'
          placeholder='Введите адрес'
          value={value}
          onChange={onChange}
        />
      </form>
    );
  }
};

export default SearchBar;