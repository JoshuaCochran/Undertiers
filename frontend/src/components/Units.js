import React, { Component } from 'react';
import UnitModal from './UnitModal';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import UnitInfo from './UnitInfo';

const styles = theme => ({
	popover: {
		pointerEvents: 'none',
	},
	dialogPaper: {
		minHeight: '125px',
		maxHeight: '125px',
		minWidth: '145px',
		maxWidth: '145px',
		backgroundColor: 'rgba(35, 35, 35)',
		overflow: "hidden",
		height: "100%",
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
			showPopover: false,
			showMenu: false,
			sortedAlphabetically: false,
			sortedByTier: false,
		};
		
		this.onUnitClick = this.onUnitClick.bind(this);
		this.handleUnitClose = this.handleUnitClose.bind(this);
		this.handleMenuClick = this.handleMenuClick.bind(this);
		this.handleMenuClose = this.handleMenuClose.bind(this);
		this.sortByTier = this.sortByTier.bind(this);
		this.sortAlphabetically = this.sortAlphabetically.bind(this);
		this.handlePopoverOpen = this.handlePopoverOpen.bind(this);
		this.handlePopoverClose = this.handlePopoverClose.bind(this);
	}
	
	async componentDidMount() {
		try {
			const res = await fetch('http://www.undertiers.com:8000/units/');
			const units = await res.json();
			this.setState({
				units
			});
		} catch (e) {
			console.log(e);
		}
	}
	
	sortByTier() {
		const sortedByTier = this.state.sortedByTier;
		const myData = this.state.units.sort((a,b) => sortedByTier ? a.tier - b.tier : b.tier - a.tier);
		this.setState({units: myData, sortedByTier: !sortedByTier});
	}
	
	sortAlphabetically() {
		const alphabetical = this.state.sortedAlphabetically;
		const myData = this.state.units.sort(function(a,b){
			var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
			if (nameA < nameB)
				return alphabetical ? 1 : -1;
			if (nameA > nameB)
				return alphabetical ? -1 : 1;
			return 0;
		});
		this.setState({units: myData, sortedAlphabetically: !this.state.sortedAlphabetically});
	}
	
	onUnitClick(unit) {
		this.setState({showUnit: true, showAlliance: false, unit: unit})
	}
	
	handleUnitClose() {
		this.setState({showUnit: false})
	}
	
	handleMenuClick(event) {
		this.setState({anchorEl: event.currentTarget, showMenu: true});
	}
	
	handleMenuClose() {
		this.setState({anchorEl: null, showMenu: false})
	}
	
	handlePopoverOpen(event, unit) {
		this.setState({showPopover: true, unit: unit, anchorEl: event.currentTarget});
	}
	
	handlePopoverClose() {
		this.setState({anchorEl: null, showPopover: false});
	}
	
	render() {
		const {classes} = this.props;
		return (
			<div style={{position: 'fixed', height: '100%', backgroundColor: 'rgba(35, 35, 35)'}}>
				<Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleMenuClick} style={{color: 'white'}}>
					Sort
				</Button>
				<Menu
					id="simple-menu"
					anchorEl={this.state.anchorEl}
					keepMounted
					open={this.state.showMenu}
					onClose={this.handleMenuClose}
				>
					<MenuItem onClick={this.sortByTier}>By Tier</MenuItem>
					<MenuItem onClick={this.sortAlphabetically}>Alphabetically</MenuItem>
				</Menu>
				<UnitModal show={this.state.showUnit} handleUnitClose={() => this.handleUnitClose()} unit={this.state.unit}/>
				<Popover
					id="mouse-over-popover"
					open={this.state.showPopover}
					className={classes.popover}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					onClose={this.handlePopoverClose}
					disableRestoreFocus
					classes={{ paper: classes.dialogPaper }}
				>
					<UnitInfo unit={this.state.unit}/>
				</Popover>
				<Grid container spacing={1}>
					{this.state.units.map(item => (
					<Grid item key={item.id}>
						<img src={item.icon_url} 
							onClick={() => this.onUnitClick(item)}
							alt="{item.name} icon"
							aria-owns={this.state.showPopover ? 'mouse-over-popover' : undefined}
							aria-haspopup="true"
							onMouseEnter={(e) => this.handlePopoverOpen(e, item)}
							onMouseLeave={this.handlePopoverClose}/>
					</Grid>
				))}
                </Grid>
			</div>
		);
	}
}

export default withStyles(styles)(Units);
