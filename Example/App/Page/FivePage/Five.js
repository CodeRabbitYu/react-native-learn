/**
 * Created by SLPower on 2016/11/23.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Store from './Component/Store/Store';

import Root from './Component/Base/Root';

export default class Five extends Component {

    render() {
        return (
            <Provider store = {Store} >
                <Root />
            </Provider>
        );
    }
}


// AppRegistry.registerComponent('Five', () => Five);
