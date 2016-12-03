import * as types from './ActionTypes';
import Request from '../Common/Request';
import Config from '../Common/Config';

let cacheResults = {
    items:[],
    allPage:0,
    currentPage:0
};

let id = '';

export let Home = (page,type ,isLoadMore,isRefreshing,isLoading,blackArr) => {
    // let url = Config.api.homeList + '&page=' + page + '&type=' + id;
    let url = Config.api.homeList;

    // id = type;

    // console.log(id);
    // console.log(type);
    return dispatch => {
        dispatch(fetchHomeList(isLoading,isRefreshing,isLoadMore));
        return Request.get(url,{
            type:type,
            page:page,
        }, (response) => {
            // console.log(response.showapi_res_body.pagebean);

            blackArr(response.showapi_res_body.pagebean);

        }, (error) => {
            console.log(error);
            dispatch(receiveHomeList([]));
        });
    }
};

let fetchHomeList = (isLoadMore, isRefreshing, isLoading) => {
    return {
        type: types.FETCH_HOME_LIST,
        isLoadMore: isLoadMore,
        isRefreshing: isRefreshing,
        isLoading: isLoading,
    }
};

let receiveHomeList = (homeList) => {
    console.log(homeList.length);
    return {
        type: types.RECEIVE_HOME_LIST,
        homeList: homeList,
    }
};

let resetHomeList = (homeList) => {
    return{
        type: types.RESET_STATE,
        homeList:homeList,
    }
}
