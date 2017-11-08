import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { PageHeader, Table, Button, ButtonToolbar, Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import * as employeesService from '../services/employees'
import * as departmentsService from '../services/departments'
import * as employeesActions from '../actions/employees'
import * as departmentsActions from '../actions/departments'

import EmployeeModal from '../components/EmployeeModal/EmployeeModal'

class Employees extends Component {

	componentWillMount = () => {
		if (this.props.departments.length == 0) {
			this._getDepartments();
		}
		this._getEmployees();
	}

	_getDepartments = () => {
		departmentsService.getDepartments().then(function(response) {
			this.props.actions.setDepartments(response.data);
		}.bind(this));
	}

	_getEmployees = () => {
		employeesService.getEmployees().then(function(response) {
			this.props.actions.setEmployees(response.data);
		}.bind(this));
	}

	_departmentIdConvert(id) {
		return this.props.departments.map((item) => {
			return item.id == id ? item.name : null;
		})
	}

	_renderTableBody = (employees) => {
		return employees.map((item) => {
			return(
				<tr key={item.id}>
					<td>{item.id}</td>
					<td>{item.firstName}</td>
					<td>{item.lastName}</td>
					<td>{this._departmentIdConvert(item.departmentId)}</td>
					<td>
						<Button bsStyle="primary" bsSize="small" onClick={() => this.refs.employeeModal._open(item)}>Edit</Button>
					</td>
				</tr>
			);
		})
	}

	render() {
		const { employees } = this.props;
		return(
			<div>
				<PageHeader>Employees</PageHeader>
				<Table striped bordered condensed>
					<thead>
						<tr>
					        <th>#</th>
					        <th>First Name</th>
					        <th>Last Name</th>
					        <th>Department</th>
					        <th>Actions</th>
				      	</tr>
				    </thead>
				    <tbody>
						{this._renderTableBody(employees)}
					</tbody>
				</Table>
				<EmployeeModal ref='employeeModal' _getEmployees={this._getEmployees} departments={this.props.departments} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		employees: state.employees.employees,
		departments: state.departments.departments
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({
			...employeesActions,
			...departmentsActions
		},
		dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Employees)