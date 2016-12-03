/**
 * Created by SLPower on 2016/10/14.
 */
'use strict'

const token ={
    'showapi_appid' : '27786',
    'showapi_sign' : '8435f098f5b74384ba294790c7e8b503',
};

const config = {

    api:{
        homeList:'http://route.showapi.com/255-1?showapi_appid='+token.showapi_appid+
        '&showapi_sign=' + token.showapi_sign
    },
    map:{
        method:'POST',
        header:{
            'Accept-Encoding':'gzip, deflate',
            'Content-Type':'application/json',
            'User-Agent':'11',
            'X-Device-ID':'111',
            'X-Ip':'111',

        },
        // body:JSON.stringify(body),
        follow:20,
        timeout:8000,
        size:0
    },
};

// const token = {
//     'showapi_appid' : '27786',
//     'showapi_sign' : '8435f098f5b74384ba294790c7e8b503',
// };

module.exports = config;
