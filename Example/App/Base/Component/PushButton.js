/**
 * Created by SLPower on 2016/11/5.
 */
import React, { Component, PropTypes } from 'react';
import { requireNativeComponent} from 'react-native';

var NativeButton = requireNativeComponent('PushButton', PushButton);

export default class PushButton extends Component {
    render() {
        return (
            <NativeButton {...this.props} />
        );
    }
}

