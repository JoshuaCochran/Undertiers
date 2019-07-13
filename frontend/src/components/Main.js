import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Units from './Units'
import UnitInfo from './UnitInfo'
import AllianceInfo from './AllianceInfo'
import Board from './MapTest/Board'

const Main = () => (
	<main>
		<Switch>
			<Route exact path='/units' component={Units}/>
			<Route path="/units/:id" 
			render={(props) => <UnitInfo id={props.match.params.id}/>}/>
			<Route path="/alliances/:id" 
			render={(props) => <AllianceInfo id={props.match.params.id}/>}/>
			<Route path="/test" component={Board}/>
		</Switch>
	</main>
)

export default Main