import React from 'react';
import { findDOMNode } from 'react-dom';
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

		// Don't replace items with themselves
		if (dragIndex === dropIndex) {
			return;
		};

		// Determine rectangle on screen
		const dropBoundingRect = (findDOMNode(
			component,
		)).getBoundingClientRect();

		// Get vertical middle
		const dropMiddleY = (dropBoundingRect.bottom - dropBoundingRect.top) / 2;

		// Determine mouse position
		const clientOffset = monitor.getClientOffset();

		// Get pixels to the top
		const dropClientY = clientOffset.y - dropBoundingRect.top;

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < dropIndex && dropClientY < dropMiddleY) {
			return
		};

		// Dragging upwards
		if (dragIndex > dropIndex && dropClientY > dropMiddleY) {
			return
		};

		// Time to actually perform the action
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
