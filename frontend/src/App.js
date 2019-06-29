import React, { Component } from 'react';

class App extends Component {
	state = {
		units: []
	};
	
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
	
	render() {
		return (
			<div>
			{this.state.units.map(item => (
				<div key={item.id}>
					<h1>{item.name}</h1>
					<span>{item.icon_url}</span>
					<span>{item.tile_url}</span>
					{item.alliances.map(alliance => (
						<div key={alliance.id}>
							<h4>{alliance.name}</h4>
							<img src={alliance.icon_url}/>
						</div>
					))}
				</div>
			))}
			</div>
		);
	}
}

export default App;
