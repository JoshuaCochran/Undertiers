import React, { Component } from 'react';
import UnitInfo from './UnitInfo';
import Dialog from '@material-ui/core/Dialog';

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
		return (
			<div>
				<Dialog
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
				>
					<div>
						<UnitInfo id={this.state.id}/>
					</div>
				</Dialog>
			</div>
		);
	}
}

export default UnitModal;