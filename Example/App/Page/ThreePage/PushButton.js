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

var PushManager = requireNativeComponent('pushManager', PushView);


export default class PushView extends Component {
    render() {
        return (
            <PushManager {...this.props} />
        );
    }
}

