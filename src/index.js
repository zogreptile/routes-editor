import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { YMaps } from 'react-yandex-maps';
import App from './components/App';
import { ymapQuery } from './constants';
import './index.css';

ReactDOM.render(
  <DragDropContextProvider backend={HTML5Backend}>
    <YMaps query={ymapQuery}>
      <App />
    </YMaps>
  </DragDropContextProvider>,
  document.getElementById('root')
);
