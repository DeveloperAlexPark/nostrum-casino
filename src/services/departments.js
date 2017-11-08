import axios from 'axios';

export function getDepartments() {
	return axios.get('departments')
}

export function editDepartment(data) {
	return axios.patch(`/departments/${data.id}`, data)
}