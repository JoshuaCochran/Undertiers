import React, { Component } from 'react';
import AllianceModal from './AllianceModal';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './css/unitinfo.css';

const styles = theme => ({
	root: {
		flexGrow: 1,
		position: 'relative',
	},
	center: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		width: '84px',
		height: '84px',
		marginTop: '-42px',
		marginLeft: '-42px',
	},
	parent: {
		position: 'relative',
	},
	image: {
		position: 'absolute',
		top: 90,
		width: '35px',
		height: 'auto',
	},
	unitName: {
		textAlign: 'center',
		color: 'white',
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		margin: 'auto',
		color: theme.palette.text.secondary,
	},
});

class UnitInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showAlliance: false,
			alliance: null,
			unit: props.unit,
		};
		this.handleAllianceClose = this.handleAllianceClose.bind(this);
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.unit !== this.state.unit) {
			this.setState({unit: nextProps.unit});
		}
	}
	
	onAllianceClick(alliance) {
		this.setState({showAlliance: true, alliance: alliance})
	}
	
	handleAllianceClose() {
		this.setState({showAlliance: false})
	}
	
	render() {
		const { classes } = this.props;
		return (
			<div>
				<AllianceModal show={this.state.showAlliance} alliance={this.state.alliance} handleAllianceClose={() => this.handleAllianceClose()}/>
				<div id="unitName">{this.state.unit.name}</div>
				<table id="wrapper">
					<tr>
						<td><img className={classes.center} src={this.state.unit.icon_url}/></td>
					</tr>
				</table>
				<Grid container direction="row" justify="space-between" alignItems="flex-start">
				{this.state.unit.alliances.map(alliance =>
					<Grid key={alliance.name} item xm={4} sm={3} style={{marginRight: '3px'}} >
					<div>
						<img className={classes.image} src={alliance.icon_url} onClick={() => this.onAllianceClick(alliance)} alt='{alliance.name} icon'/>
					</div>
					</Grid>
				)}	
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(UnitInfo);