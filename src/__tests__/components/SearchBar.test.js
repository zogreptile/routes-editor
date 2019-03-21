import React from 'react';
import renderer from 'react-test-renderer';
import SearchBar from '../../components/SearchBar';

test('SearchBar renders', () => {
  const component = renderer.create(
    <SearchBar />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
