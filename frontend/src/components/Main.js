import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Units from './Units'
import UnitInfo from './UnitInfo'

const Main = () => (
	<main>
		<Switch>
			<Route exact path='/units' component={Units}/>
			<Route path="/units/:unitId" exact component={UnitInfo}/>
		</Switch>
	</main>
)

export default Main