import React, { Component } from 'react';

class UnitInfo extends Component {
	state = {
		unit: {alliances: []}
	};
	
	async componentDidMount() {
		const { match: { params } } = this.props;
		const url = 'http://127.0.0.1:8000/units/' + params.unitId;
		
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
	
	render() {
		return (
			<div>
				<h1>{this.state.unit.name}</h1>
				<img src={this.state.unit.icon_url} alt='{this.state.unit.name} icon'/>
				{this.state.unit.alliances.map(alliance =>
					<div key={alliance.id}>
						<h4>{alliance.name}</h4>
						<img src={alliance.icon_url} alt='{alliance.name} icon'/>
					</div>
				)}
			</div>
		);
	}
}

export default UnitInfo;