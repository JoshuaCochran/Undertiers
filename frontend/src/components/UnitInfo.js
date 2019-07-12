import React, { Component } from 'react';
import AllianceModal from './AllianceModal';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
	popoverImage: {
		marginTop: '-45%',
		transform: 'scale(0.83)',
	},
	unitName: {
		textAlign: 'center',
		margin: 'auto',
		color: 'white',
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
				<Grid container direction="row" justify="center" alignItems="center">
					<Grid item>
						<div className={classes.unitName}>{this.state.unit.name}</div>
					</Grid>
				</Grid>
				<Grid container direction="row" justify="center" alignItems="center">
					<Grid item>
						<img src={this.state.unit.icon_url} alt={this.state.unit.name + ' icon'}/>
					</Grid>
				</Grid>
				<Grid container direction="row" justify="flex-start" alignItems="center">
				{this.state.unit.alliances.map(alliance =>
					<Grid
						key={alliance.name} 
						item xm={4} sm={4} 
						style={{marginLeft: 'auto', marginRight: 'auto'}}
					>
						<img className={classes.popoverImage} src={alliance.icon_url} onClick={() => this.onAllianceClick(alliance)} alt={alliance.name + ' icon'}/>	
					</Grid>
				)}	
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(UnitInfo);