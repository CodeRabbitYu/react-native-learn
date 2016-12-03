/**
 * Created by SLPower on 2016/12/1.
 */
import { createStore,  applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '../Reducers/RootReducer';

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let store = createStoreWithMiddleware(RootReducer);
// let state = store.getState();
// alert(state.Search.searchText)
export default store;