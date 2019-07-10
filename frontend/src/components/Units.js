import React, { Component } from 'react';
import UnitModal from './UnitModal';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Grid from ‘@material-ui/core/Grid’;
import Paper from ‘@material-ui/core/Paper’;

const styles = theme => ({
	toolbar: {
		marginTop: '35px',
                flexGrow: 1,
	},
        root: {
            flexGrow: 1,
        },
});

class Units extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showUnit: false,
			unit: { alliance: [] },
			units: [],
			anchorEl: null,
		};
		
		this.onUnitClick = this.onUnitClick.bind(this);
		this.handleMenuClick = this.handleMenuClick.bind(this);
		this.handleMenuClose = this.handleMenuClose.bind(this);
		this.sortByTier = this.sortByTier.bind(this);
		this.sortAlphabetically = this.sortAlphabetically.bind(this);
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
	
	sortByTier() {
		const myData = this.state.units.sort((a,b) => a.tier - b.tier);
		this.setState({units: myData});
	}
	
	sortAlphabetically() {
		const myData = this.state.units.sort(function(a,b){
			var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
			if (nameA < nameB)
				return -1;
			if (nameA > nameB)
				return 1;
			return 0;
		});
		this.setState({units: myData});
	}
	
	onUnitClick(unit) {
		this.setState({showUnit: true, showAlliance: false, unit: unit})
	}
	
	handleMenuClick(event) {
		this.setState({anchorEl: event.currentTarget});
	}
	
	handleMenuClose() {
		this.setState({anchorEl: null})
	}

	render() {
		const {classes} = this.props;
		return (
			<div className={classes.toolbar}>
				<Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleMenuClick}>
					Sort by
				</Button>
				<Menu
					id="simple-menu"
					anchorEl={this.state.anchorEl}
					keepMounted
					open={Boolean(this.state.anchorEl)}
					onClose={this.handleMenuClose}
				>
					<MenuItem onClick={this.sortByTier}>Tier</MenuItem>
					<MenuItem onClick={this.sortAlphabetically}>Alphabetically</MenuItem>
				</Menu>
				<UnitModal show={this.state.showUnit} unit={this.state.unit}/>
				<Grid container spacing={3}>
                                {this.state.units.map(item => (
					<Grid item xs={6} key={item.id}>
						<h1>{item.name}</h1>
						<img src={item.icon_url} onClick={() => this.onUnitClick(item)}alt="{item.name} icon"/>
					</Grid>
				))}
                                </Grid>
			</div>
		);
	}
}

export default withStyles(styles)(Units);
