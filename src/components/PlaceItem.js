import React from 'react';
import {
  DragSource,
  DropTarget,
} from 'react-dnd';
import { ItemTypes } from '../constants';

const itemSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  }
};

const collectSource = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
};

const itemTarget = {
  drop(props, monitor, component) {
		if (!component) {
			return null;
		};
		const dragIndex = monitor.getItem().index;
		const dropIndex = props.index;

		if (dragIndex === dropIndex) {
			return;
		};

		props.onDrop(dragIndex, dropIndex);
		monitor.getItem().index = dropIndex;
  },
};

const collectTarget = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isHovering: monitor.isOver(),
})

const PlaceItem = ({
  connectDragSource,
  connectDropTarget,
  isDragging,
  isHovering,
  caption,
  onRemove,
}) => connectDragSource(connectDropTarget(
  <li
    className='places__item'
    style={{
      opacity: isDragging ? 0 : 1,
      color: isHovering && !isDragging ? '#3589eb' : 'inherit',
    }}
  >
    {caption}
    <button
      className='places__item-remove'
      onClick={onRemove}
    >
      ✕
    </button>
  </li>
));

export default DropTarget(
  ItemTypes.LIST_ITEM,
  itemTarget,
  collectTarget
)(DragSource(
  ItemTypes.LIST_ITEM,
  itemSource,
  collectSource
)(PlaceItem));
