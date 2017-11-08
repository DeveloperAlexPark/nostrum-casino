import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

import { navigation } from './navigation';

export default class LeftMenu extends Component {

	_renderNav = () => {
		return navigation.map((item) => {
			return(
				<LinkContainer key={item.id} to={item.link}>
					<NavItem>{item.label}</NavItem>
				</LinkContainer>
			);
		})
	}

	render() {
		return(
			<div>
				<Nav bsStyle='pills' stacked>
					{this._renderNav()}
				</Nav>
			</div>
		);
	}
}