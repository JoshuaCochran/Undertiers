import React, { Fragment } from 'react'
import Board from './Board'
import { observe } from './Game'
import ReactDOM from 'react-dom'


export default function EntryBoard() {
const root = document.getElementById('root')

	observe(knightPosition =>
	  ReactDOM.render(<Board knightPosition={knightPosition} />, root),
	)
}