/**
 * Created by SLPower on 2016/10/14.
 */
'use strict'
import queryString from 'query-string';

let request = {
    get:(url ,params , successCallBack , failCallBack) =>{
        if (params){
            url += '&' + queryString.stringify(params)
        }
        console.log(url);
        return fetch(url)
            .then((response) => response.json())
            .then((response) => {
                successCallBack(response);
            })
            .catch ((error) => {
                failCallBack(error);
            });
    }
};

module.exports = request;
