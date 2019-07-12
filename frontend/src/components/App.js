import React from 'react'
import NavBar from './NavBar'
import Main from './Main'

const App = () => (
	<div  style={{position: 'fixed', height: '100%', backgroundColor: 'rgba(35, 35, 35)'}}>
		<NavBar />
		<Main />
	</div>
)

export default App
