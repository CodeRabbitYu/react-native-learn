/**
 * Created by SLPower on 2016/11/30.
 */
import * as types from '../actions/actionTypes';

const initialState = {
    HomeList: [],
    isLoading: true,
    isLoadMore: false,
    isRefreshing: false,
};


let homeReducer = (state = initialState , action) => {
    switch (action.type){
        case types.FETCH_HOME_LIST:
            return Object.assign({},state , {
                isLoading:action.isLoading,
                isRefreshing:action.isRefreshing,
                isLoadMore:action.isLoadingMore
            });
        case types.RECEIVE_HOME_LIST:
            return Object.assign({} , state, {
                HomeList: state.isLoadMore ? state.HomeList.concat(action.homeList) : action.homeList,
                isRefreshing:false,
                isLoading:false,
            });
        default:
            return state;
    }
};

export default homeReducer;

