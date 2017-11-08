let initialState = {
	errorMessage: ''
}

export default function setErrorMessage(state = initialState, action) {
	switch (action.type) {
		case 'SET_ERROR_MESSAGE':
			return {...state, errorMessage: action.payload}
		default:
			return state
	}
}
