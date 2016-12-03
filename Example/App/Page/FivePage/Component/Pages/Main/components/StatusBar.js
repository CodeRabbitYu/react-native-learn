/**
 * Created by jale on 16/6/3.
 */

import React, {Component} from 'react';
import {
    View,Text
} from 'react-native';

import {styles,constants} from '../styles'

class StatusBar extends React.Component {
    render() {
        return (
            <View>
                <View style={styles.statusbar}/>
                <View style={styles.navbar}>
                    <Text style={styles.navbarTitle}>{this.props.title}</Text>
                </View>
            </View>
        );
    }
}

export {StatusBar}