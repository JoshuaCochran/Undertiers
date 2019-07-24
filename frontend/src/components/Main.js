import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Units from './Units'
import UnitInfo from './UnitInfo'
import AllianceInfo from './AllianceInfo'
import Maps from './MapTest/Maps'

const Main = () => (
	<main>
		<Switch>
			<Route exact path='/units' 
			render={() => <Units maps={false}/>}/>
			<Route path="/units/:id" 
			render={(props) => <UnitInfo id={props.match.params.id}/>}/>
			<Route path="/alliances/:id" 
			render={(props) => <AllianceInfo id={props.match.params.id}/>}/>
			<Route path="/test" component={Maps}/>
			<Route path="/boards/:id"
			render={(props) => <Maps board_id={props.match.params.id}/>}/>
		</Switch>
	</main>
)

export default Main