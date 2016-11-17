/**
 * Created by SLPower on 2016/11/12.
 */
import React, { Component, PropTypes } from 'react';
import {
    AppRegistry,
    NativeModules,
    requireNativeComponent,
    Text
} from 'react-native';

let PushManager = requireNativeComponent('PushManager', PushView);


export default class PushView extends Component {
    render() {
        return (
            <PushManager {...this.props} />
        );
    }
}
