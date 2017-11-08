import React, { Component } from 'react';
import { Button, ButtonToolbar, Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import * as departmentsService from '../../services/departments';

export default class DepartmentModal extends Component {

	constructor(props) {
		super(props);
	
		this.state = {
			showModal: false,
			name: ''
		};
	}

	_close = () => {
		this.setState({
			showModal: false,
			name: ''
		});
	}

	_open = (department) => {
		this.setState({
			showModal: true,
	  		name: department.name,
	  		id: department.id
		});
	}

	_editDepartment = (e) => {

		e.preventDefault();

		const { id, name } = this.state;

		const data = {
			id,
			name
		}

		departmentsService.editDepartment(data).then(function() {
			this._close();
			this.props._getDepartments();
		}.bind(this));
	}

	render() {
		const { name } = this.state;
		return(
			<Modal show={this.state.showModal} onHide={this._close}>
				<Modal.Header closeButton>
					<Modal.Title>Редактирование</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={this._editDepartment}>
						<FormGroup>
							<ControlLabel>Department name</ControlLabel>
							<FormControl
								type="text"
								value={name}
								placeholder="Department name"
								onChange={(e) => this.setState({ name: e.target.value })}
							/>
						</FormGroup>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<ButtonToolbar>
						<Button bsStyle='success' onClick={this._editDepartment}>Save</Button>
						<Button onClick={this._close}>Close</Button>
					</ButtonToolbar>
				</Modal.Footer>
			</Modal>
		);
	}
}