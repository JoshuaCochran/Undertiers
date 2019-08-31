import React, { Component } from 'react';

class AllianceInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			alliance: props.alliance,
		};
	}
	
	render() {
		return (
			<div>
				<h1>{this.state.alliance.name}</h1>
				<img src={this.state.alliance.icon_url} alt={this.state.alliance.name + ' icon'}/>
				{this.state.alliance.synergies.map(synergy =>
					<div key={this.state.alliance.name}>{synergy}</div>
				)}
			</div>
		);
	}
}

export default AllianceInfo;