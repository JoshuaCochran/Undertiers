import React from 'react'
import { ItemTypes } from './DragTypes';
import { useDrag } from 'react-dnd';

export default function Knight() {
	const [{isDragging}, drag] = useDrag({
		item: { type: ItemTypes.KNIGHT },
			collect: monitor => ({
				isDragging: !!monitor.isDragging(),
			}),
	})

	return (
		<div
			ref={drag}
			style={{
				opacity: isDragging ? 0.5 : 1,
				fontSize: 100,
				fontWeight: 'bold',
				cursor: 'move',
			}}
		>
			♘
		</div>
	)
}