/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Provider} from 'react-redux';
import store from './store/store';

import Root from './base/root'

export default class Six extends Component {
    render() {

        return (
            <Provider store={store} >
                <Root />
            </Provider>
        );
    }
}

