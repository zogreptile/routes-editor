import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import renderer from 'react-test-renderer';
import PlacesList from '../../components/PlacesList';
import points from '../../__fixtures__/points';

test('PlacesList renders', () => {
  const component = renderer.create(
    <DragDropContextProvider backend={HTML5Backend}>
      <PlacesList points={points} />
    </DragDropContextProvider>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
