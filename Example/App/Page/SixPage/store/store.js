/**
 * Created by SLPower on 2016/11/30.
 */
import {createStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let store = createStoreWithMiddleware(rootReducer);
// let state = store.getState();
// alert(state.Search.searchText)
export default store;

