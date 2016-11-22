/**
 * Created by SLPower on 2016/11/17.
 */
import React, { Component, PropTypes } from 'react';
import {
    requireNativeComponent
} from 'react-native';

var PushManager = requireNativeComponent('RCTPushView', PushView);


export default class PushView extends Component {

    static propTypes = {
        /**
         *
         * 定义组件需要传到原生端的属性
         * 使用React.PropTypes来进行校验
         */
        //Button的title
        btnTitle:PropTypes.string,
        //按钮点击事件
        onButtonClicked:PropTypes.func,

    };

    render() {
        return (
            <PushManager {...this.props} />
        );
    }
}