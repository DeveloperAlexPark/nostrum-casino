import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { PageHeader, Table, Button } from 'react-bootstrap'
import * as departmentsService from '../services/departments'
import * as departmentsActions from '../actions/departments'

import DepartmentModal from '../components/DepartmentModal/DepartmentModal'

class Departments extends Component {

	constructor(props) {
	 	super(props);
	}

	componentWillMount = () => {
		this._getDepartments();
	}

	_getDepartments = () => {
		departmentsService.getDepartments().then(function(response) {
			this.props.actions.setDepartments(response.data);
		}.bind(this));
	}

	_renderTableBody(departments) {
		return departments.map((item) => {
			return(
				<tr key={item.id}>
					<td>{item.id}</td>
					<td>{item.name}</td>
					<td>
						<Button bsStyle="primary" bsSize="small" onClick={() => this.refs.departmentModal._open(item)}>Edit</Button>
					</td>
				</tr>
			);
		})
	}

	render() {
		const { departments } = this.props;
		return(
			<div>
				<PageHeader>Departments</PageHeader>
				<Table striped bordered condensed>
					<thead>
						<tr>
					        <th>#</th>
					        <th>Name</th>
					        <th>Actions</th>
				      	</tr>
				    </thead>
				    <tbody>
						{this._renderTableBody(departments)}
					</tbody>
				</Table>
				<DepartmentModal _getDepartments={this._getDepartments} ref='departmentModal' />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		departments: state.departments.departments
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({
			...departmentsActions
		},
		dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Departments)