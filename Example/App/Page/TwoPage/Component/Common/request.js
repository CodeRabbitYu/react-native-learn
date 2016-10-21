/**
 * Created by SLPower on 2016/10/14.
 */
'use strict'

import Mock from 'mockjs';
import config from './config';
import queryString from 'query-string'
import _ from 'lodash';
let request = {

}

// 设定params json对象
request.get = (url,params) => {
    if(params){
        url += '?' + queryString.stringify(params)
    }

    return fetch(url)
        .then((response) => response.json())
        .then((response) => Mock.mock(response))
};

request.post = (url,body) => {

    // json对象的合并  工具:loadsh
    // config.map  合并 body
    let map = _.extend(config.map,{
        body : JSON.stringify(body)
    });


    return fetch(url,map)
        .then((response) => response.json())
        .then((response) => Mock.mock(response))

};

module.exports = request;
