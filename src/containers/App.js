import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Grid, Row, Col, Alert } from 'react-bootstrap'

import LeftMenu from '../components/LeftMenu/LeftMenu'

import * as appActions from '../actions/app'

class App extends Component {

	handleAlertDismiss = () => {
		this.props.actions.setErrorMessage('');
	}

	render() {
		const { children, errorMessage } = this.props;
		return(
			<div>
				<Grid>
					{errorMessage &&
						<Row>
							<Col md={12}>
								<Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
									<h4>{errorMessage}</h4>
								</Alert>
							</Col>
						</Row>
					}
					<Row>
						<Col xs={12} md={3} >
							<LeftMenu />
						</Col>
						<Col xs={12} md={9}>
							{children}
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		errorMessage: state.app.errorMessage
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({
			...appActions
		},
		dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)