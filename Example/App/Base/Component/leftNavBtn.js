/**
 * Created by SLPower on 2016/10/11.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

import icon from './test';
var Icon = require('react-native-vector-icons/FontAwesome');

// var hh = require('react-native-vector-icons/iconfont');

export default class leftNavBtn extends Component {
    static defaultProps = {
        // 回调函数
        popToHome: null
    };

    render() {
        const charmander = 'http://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-blue-version/d/d4/Charmander.gif';
        return (
            <TouchableOpacity onPress={() => this.popTopHome()}>
                {/*<Icon*/}
                    {/*name="chevron-left"   //图片名连接,可以到这个网址搜索:http://ionicons.com/, 使用时:去掉前面的 "icon-" !!!!*/}
                    {/*size={20}   //图片大小*/}
                    {/*color="blue"  //图片颜色*/}
                    {/*style={{marginLeft:10,marginTop:10,height:30}}*/}
                {/*/>*/}
                <Text style={{fontSize:30, color:"#ff4444"}}>
                    {icon('arrow')}
                </Text>

            </TouchableOpacity>
        );
    }
    popTopHome(){
        this.props.popToHome();
    }
}
