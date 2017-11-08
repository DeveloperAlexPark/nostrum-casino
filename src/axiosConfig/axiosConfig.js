import axios from 'axios';
import { store } from '../routes/Routes'

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.common['Accept'] = 'application/json';

export default function configureAxios() {
	axios.interceptors.response.use(function(response) {

		store.dispatch({
			type: 'SET_ERROR_MESSAGE',
			payload: ''
		});

		return response;
	}, function(error) {

		if (!error.response) {
			store.dispatch({
				type: 'SET_ERROR_MESSAGE',
				payload: 'Ошибка подключения к базе данных'
			});
		}

		return Promise.reject(error);
	});
}