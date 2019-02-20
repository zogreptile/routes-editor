import React from 'react';

class SearchBar extends React.Component {
  render() {
    return (
      <form
        className='search-bar'
        onSubmit={this.props.onSubmit}
      >
        <input
          className='search-bar__input'
          type='text'
          placeholder='Введите адрес'
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </form>
    );
  }
};

export default SearchBar;