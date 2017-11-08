import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import thunkMiddleware    from 'redux-thunk';

export default function configureStore(initialState) {

	const enhancer = compose(
		applyMiddleware(thunkMiddleware)
	);

	const store = createStore(rootReducer, initialState, enhancer)

	if (module.hot) {
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers')
			store.replaceReducer(nextRootReducer)
		})
	}

	return store
}
