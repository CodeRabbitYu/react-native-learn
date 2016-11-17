/**
 * Created by SLPower on 2016/11/5.
 */
import React, { Component, PropTypes } from 'react';
import {
    AppRegistry,
    NativeModules,
    requireNativeComponent,
    Text
} from 'react-native';

let RCTPushViewManager = requireNativeComponent('RCTPushViewManager', PushView);


export default class PushView extends Component {
    render() {
        return (
            <RCTPushViewManager {...this.props} />
        );
    }
}

