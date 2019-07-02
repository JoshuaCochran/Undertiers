import React, { Component } from 'react';
import AllianceModal from './AllianceModal';

class UnitInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.id,
			showAlliance: false,
			allianceId: 1,
			unit: { alliances: [] }
		};
	}
	
	async componentDidMount() {
		const url = 'http://127.0.0.1:8000/units/' + this.state.id;
		
		try {
			const res = await fetch(url);
			const unit = await res.json();
			this.setState({
				unit
			});
		} catch (e) {
			console.log(e);
		}
	}
	
	onAllianceClick(id) {
		this.setState({showAlliance: true, allianceId: id})
	}
	
	render() {
		return (
			<div>
				<AllianceModal show={this.state.showAlliance} id={this.state.allianceId}/>
				<h1>{this.state.unit.name}</h1>
				<img src={this.state.unit.icon_url} alt='{this.state.unit.name} icon'/>
				{this.state.unit.alliances.map(alliance =>
					<div key={alliance.id}>
						<h4>{alliance.name}</h4>
						<img src={alliance.icon_url} onClick={() => this.onAllianceClick(alliance.id)} alt='{alliance.name} icon'/>
					</div>
				)}
			</div>
		);
	}
}

export default UnitInfo;