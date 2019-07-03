import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Units from './Units'
import UnitInfo from './UnitInfo'
import AllianceInfo from './AllianceInfo'

const Main = () => (
	<main>
		<Switch>
			<Route exact path='/units' component={Units}/>
			<Route path="/units/:id" 
			render={(props) => <UnitInfo id={props.match.params.id}/>}/>
			<Route path="/alliances/:id" 
			render={(props) => <AllianceInfo id={props.match.params.id}/>}/>
		</Switch>
	</main>
)

export default Main