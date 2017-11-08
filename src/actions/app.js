export function setErrorMessage(errorMessage) {
	return {
		type: 'SET_ERROR_MESSAGE',
		payload: errorMessage
	}
}