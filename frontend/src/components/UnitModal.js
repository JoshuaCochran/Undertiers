import React, { Component } from 'react';
import UnitInfoTest from './UnitInfoTest';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	dialogPaper: {
		minHeight: '125px',
		maxHeight: '125px',
		minWidth: '83px',
		maxWidth: '83px',
	},
});

class UnitModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: props.show,
			id: props.id,
		};
	}
	
	handleOpen = () => {
		this.setState({
			open: true,
		});
	};
	
	handleClose = () => {
		this.setState({
			open: false,
		});
	};
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.show !== this.state.open) {
			this.setState({open: nextProps.show});
		}
		if (nextProps.id !== this.state.id) {
			this.setState({id: nextProps.id});
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
					onClose={this.handleClose}
					modal={true}
					fullWidth={false}
					maxWidth={'md'}
					classes={{ paper: classes.dialogPaper }}
				>
					<UnitInfoTest id={this.state.id}/>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(UnitModal);