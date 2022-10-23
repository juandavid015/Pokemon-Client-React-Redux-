import { createStore, applyMiddleware , compose} from 'redux';
import reducer from '../reducer/reducer';
import thunk from 'redux-thunk';

const store = createStore(reducer, compose(applyMiddleware(thunk), process.env.NODE_ENV !== 'production'?  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(): null));

export default store;