import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Units from './Units'
import UnitInfo from './UnitInfo'
import AllianceInfo from './AllianceInfo'

const Main = () => (
	<main>
		<Switch>
			<Route exact path='/units' component={Units}/>
			<Route path="/units/:unitId" exact component={UnitInfo}/>
			<Route path="/alliances/:allianceId" exact component={AllianceInfo}/>
		</Switch>
	</main>
)

export default Main