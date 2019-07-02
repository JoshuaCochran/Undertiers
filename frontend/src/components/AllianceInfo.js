import React, { Component } from 'react';

class AllianceInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.id,
			alliance: {}
		};
	}
	
	async componentDidMount() {
		const url = 'http://127.0.0.1:8000/alliances/' + this.state.id;
		
		try {
			const res = await fetch(url);
			const alliance = await res.json();
			this.setState({
				alliance
			});
		} catch(e) {
			console.log(e);
		}
	}
	
	render() {
		return (
			<div>
				<h1>{this.state.alliance.name}</h1>
				<img src={this.state.alliance.icon_url} alt='{this.state.alliance.name} icon'/>
			</div>
		);
	}
}

export default AllianceInfo;