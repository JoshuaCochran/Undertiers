import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Units from './Units'

const Main = () => (
	<main>
		<Switch>
			<Route exact path='/units' component={Units}/>
		</Switch>
	</main>
)

export default Main