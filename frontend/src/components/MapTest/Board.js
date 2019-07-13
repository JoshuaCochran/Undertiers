import React, { Component } from 'react'
import Square from './Square'
import Knight from './Knight'
import { moveKnight } from './Game'

function handleSquareClick(toX, toY) {
	moveKnight(toX, toY)
}

function renderSquare(i, [knightX, knightY]) {
		const x = i % 8
		const y = Math.floor(i / 8)
		const black = (x + y) % 2 === 1
		const isKnightHere = knightX === x && knightY === y
		const piece = isKnightHere ? <Knight /> : null
		
		return (
			<div onClick={() => handleSquareClick(x, y)}>
			<div key={i} style={{ width: '12.5%', height: '12.5%' }}>
				<Square black={black}>{piece}</Square>
			</div>
			</div>
		)
}

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			knightPosition: [0,0],
			squares: [],
		}
	}

	componentDidMount() {
		const squareData = []
		for (let i = 0; i < 64; i++) {
			squareData.push(renderSquare(i , this.state.knightPosition));
			this.setState({ squares: squareData });
		}
	}
	
	render() {
		return (
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexWrap: 'wrap',
					position: 'absolute',
				}}
			>
				{this.state.squares}
			</div>
		)
	}
}

export default Board;