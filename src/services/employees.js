import axios from 'axios';

export function getEmployees() {
	return axios.get('/employees')
}

export function editEmployee(data) {
	return axios.patch(`/employees/${data.id}`, data)
}