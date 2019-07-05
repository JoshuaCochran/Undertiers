import React, { Component } from 'react';
import AllianceModal from './AllianceModal';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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
		position: 'absolute',
		left: '40%', 
		color: 'white',
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		margin: 'auto',
		color: theme.palette.text.secondary,
	},
});

class UnitInfoTest extends Component {
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
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<AllianceModal show={this.state.showAlliance} id={this.state.allianceId}/>
				<span className={classes.unitName}>{this.state.unit.name}</span>
				<img className={classes.center} src={this.state.unit.icon_url}/>
				<Grid container direction="row" justify="space-between" alignItems="flex-start">
				{this.state.unit.alliances.map(alliance =>
					<Grid item xm={4} sm={3} style={{marginRight: '3px'}} >
					<div key={alliance.id}>
						<img className={classes.image} src={alliance.icon_url} onClick={() => this.onAllianceClick(alliance.id)} alt='{alliance.name} icon'/>
					</div>
					</Grid>
				)}	
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(UnitInfoTest);