/**
 * Created by SLPower on 2016/12/1.
 */
import * as types from '../Actions/ActionTypes';

const initialState = {
    HomeList: [],
    isLoading: true,
    isLoadMore: false,
    isRefreshing: false,
};

let HomeReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.FETCH_HOME_LIST:
            return Object.assign({} , state ,{
                isLoadMore:action.isLoadMore,
                isRefreshing:action.isRefreshing,
                isLoading:action.isLoading
            });
        case types.RECEIVE_HOME_LIST:
            return Object.assign({} , state, {
                HomeList:state.isLoadMore ? state.HomeList.concat(action.homeList) : action.homeList,
                isRefreshing:false,
                isLoading:false,
            });
        case types.RESET_STATE:
            return Object.assign({},state,{
                HomeList:[],
                isLoading:true,
            });
        default:
            return state;
    }
};

export default HomeReducer;



