import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import renderer from 'react-test-renderer';
import PlaceItem from '../../components/PlaceItem';

test('PlaceItem renders', () => {
  const caption = 'Test caption';
  const component = renderer.create(
    <DragDropContextProvider backend={HTML5Backend}>
      <PlaceItem caption={caption} />
    </DragDropContextProvider>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
