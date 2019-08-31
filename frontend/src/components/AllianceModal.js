import React, { Component } from 'react';
import AllianceInfo from './AllianceInfo';
import Dialog from '@material-ui/core/Dialog';

class AllianceModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: props.show,
			alliance: null,
		};
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.show !== this.state.open) {
			this.setState({open: nextProps.show});
		}
		if (nextProps.alliance !== this.state.alliance) {
			this.setState({alliance: nextProps.alliance});
		}
	}
	
	render() {
		return (
			<div>
				<Dialog
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.state.open}
					onClose={this.props.handleAllianceClose}
					fullWidth
				>
					<div>
						<AllianceInfo alliance={this.state.alliance}/>
					</div>
				</Dialog>
			</div>
		);
	}
}

export default AllianceModal;