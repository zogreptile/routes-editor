import React from 'react';
import { YMaps } from 'react-yandex-maps';
import renderer from 'react-test-renderer';
import App from '../../components/App';

test('App renders', () => {
  const component = renderer.create(
    <YMaps>
      <App />
    </YMaps>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
