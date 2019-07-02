import React, { Component } from 'react';
import UnitModal from './UnitModal';
import AllianceModal from './AllianceModal';

class Units extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showAlliance: false,
			showUnit: false,
			unitId: 1,
			allianceId: 1,
			units: []
		};
		
		this.onUnitClick = this.onUnitClick.bind(this);
	}
	
	async componentDidMount() {
		try {
			const res = await fetch('http://127.0.0.1:8000/units/');
			const units = await res.json();
			this.setState({
				units
			});
		} catch (e) {
			console.log(e);
		}
	}
	
	onAllianceClick(id) {
		this.setState({showAlliance: true, showUnit: false, allianceId: id})
	}
	
	onUnitClick(id) {
		this.setState({showUnit: true, showAlliance: false, unitId: id})
	}
	
	render() {
		return (
			<div>
			<UnitModal show={this.state.showUnit} id={this.state.unitId}/>
			<AllianceModal show={this.state.showAlliance} id={this.state.allianceId}/>
			{this.state.units.map(item => (
				<div key={item.id}>
					<h1>{item.name}</h1>
					<img src={item.icon_url} onClick={() => this.onUnitClick(item.id)}alt="{item.name} icon"/>
					{item.alliances.map(alliance => (
						<div key={alliance.id}>
							<h4>{alliance.name}</h4>
							<img src={alliance.icon_url} onClick={() => this.onAllianceClick(alliance.id)} alt="{alliance.name} icon"/>
						</div>
					))}
				</div>
			))}
			</div>
		);
	}
}

export default Units;