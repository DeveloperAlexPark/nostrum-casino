let initialState = {
	employees: []
}

export default function employees(state = initialState, action) {
	switch (action.type) {
		case 'SET_EMPLOYEES':
			return {...state, employees: action.payload}
		default:
			return state
	}
}
