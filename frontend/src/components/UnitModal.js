import React, { Component } from 'react';
import UnitInfo from './UnitInfo';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	dialogPaper: {
		minHeight: '145px',
		maxHeight: '145px',
		minWidth: '145px',
		maxWidth: '145px',
		backgroundColor: 'rgba(35, 35, 35)',
		overflow: "hidden",
		height: "100%",
	},
});

class UnitModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: props.show,
			unit: { alliance: [] },
		};
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.show !== this.state.open) {
			this.setState({open: nextProps.show});
		}
		if (nextProps.unit !== this.state.unit) {
			this.setState({unit: nextProps.unit});
		}
	}
	
	render() {
		const {classes}=this.props;
		return (
			<div>
				<Dialog
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.state.open}
					onClose={this.props.handleUnitClose}
					classes={{ paper: classes.dialogPaper }}
				>
					<UnitInfo unit={this.state.unit}/>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(UnitModal);