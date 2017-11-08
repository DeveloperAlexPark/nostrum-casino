import React, { Component } from 'react';
import { Button, ButtonToolbar, Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import * as employeesService from '../../services/employees';

export default class EmployeeModal extends Component {

	constructor(props) {
		super(props);
	
		this.state = {
			showModal: false,
			firstName: '',
			lastName: '',
			departmentId: ''
		};
	}

	_close = () => {
		this.setState({
			showModal: false,
			firstName: '',
			lastName: '',
			departmentId: ''
		});
	}

	_open = (employee) => {
		this.setState({
			showModal: true,
	  		firstName: employee.firstName,
			lastName: employee.lastName,
			departmentId: employee.departmentId,
			id: employee.id
		});
	}

	_editEmployee = () => {

		const { id, firstName, lastName, departmentId } = this.state;

		const data = {
			id,
			firstName,
			lastName,
			departmentId
		}

		employeesService.editEmployee(data).then(function() {
			this._close();
			this.props._getEmployees();
		}.bind(this));
	}

	_renderDepartmentsOptions = () => {
		return this.props.departments.map((item) => {
			return(
				<option key={item.id} value={item.id}>{item.name}</option>
			);
		})
	}

	render() {
		const { firstName, lastName, departmentId } = this.state;
		return(
			<Modal show={this.state.showModal} onHide={this._close}>
				<Modal.Header closeButton>
					<Modal.Title>Редактирование</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup>
							<ControlLabel>First Name</ControlLabel>
							<FormControl
					            type="text"
					            value={firstName}
					            placeholder="First Name"
					            onChange={(e) => this.setState({ firstName: e.target.value })}
					        />
						</FormGroup>
						<FormGroup>
							<ControlLabel>Last Name</ControlLabel>
							<FormControl
								type="text"
								value={lastName}
								placeholder="Last Name"
								onChange={(e) => this.setState({ lastName: e.target.value })}
							/>
						</FormGroup>
						<FormGroup controlId="formControlsSelect">
							<ControlLabel>Department</ControlLabel>
							<FormControl 
								value={departmentId} 
								onChange={(e) => this.setState({ departmentId: e.target.value })} 
								componentClass="select" 
								placeholder="select">
								{this._renderDepartmentsOptions()}
							</FormControl>
					    </FormGroup>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<ButtonToolbar>
						<Button bsStyle='success' onClick={this._editEmployee}>Save</Button>
						<Button onClick={this._close}>Close</Button>
					</ButtonToolbar>
				</Modal.Footer>
			</Modal>
		);
	}
}