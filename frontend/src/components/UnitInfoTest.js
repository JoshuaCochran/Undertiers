import React, { Component } from 'react';
import AllianceModal from './AllianceModal';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		margin: 'auto',
		color: theme.palette.text.secondary,
	},
	image: {
		width: '82px',
		height: '82px',
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%',
	},
	ali: {
		width: '10px',
		height: '5px',
	}
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
		const style = {
			backgroundImage: "url("+this.state.unit.icon_url+")",
			backgroundSize: 'contain',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
		}
		return (
			<div className={classes.root}>
				<AllianceModal show={this.state.showAlliance} id={this.state.allianceId}/>
				<Grid container direction="row"  alignItems="center" spacing={1}>
					<Grid item  className={classes.image} xs={2} sm={2}>
						<img src={this.state.unit.icon_url}/>
					</Grid>
				</Grid>
				<Grid container direction="row"  alignItems="center" spacing={2}>
					{this.state.unit.alliances.map(alliance =>
					<Grid item className={classes.ali} key={alliance.id} xs={6} sm={5}>
						<img src={alliance.icon_url} onClick={() => this.onAllianceClick(alliance.id)} alt='{alliance.name} icon'/>
					</Grid>
					)}
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(UnitInfoTest);