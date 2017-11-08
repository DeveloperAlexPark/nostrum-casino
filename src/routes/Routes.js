import React from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import {
	App,
	Departments,
	Employees
} from '../containers';

import configureStore from '../store/configureStore'
import configureAxios from '../axiosConfig/axiosConfig'

configureAxios();

export const store = configureStore();

export const Routes = () => {
	return(
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<App>
						<Switch>
							<Route path='/departments' exact component={Departments} />
							<Route path='/employees' component={Employees} />
						</Switch>
					</App>
				</Switch>
			</BrowserRouter>
		</Provider>
	)
}