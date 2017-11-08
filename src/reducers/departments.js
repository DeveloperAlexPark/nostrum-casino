let initialState = {
	departments: []
}

export default function departments(state = initialState, action) {
	switch (action.type) {
		case 'SET_DEPARTMENTS':
			return {...state, departments: action.payload}
		default:
			return state
	}
}
