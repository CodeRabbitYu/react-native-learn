/**
 * Created by jale on 16/6/3.
 */
import React, { Component} from 'react';
import {
    View,TouchableHighlight,Text
} from 'react-native';


import {styles,constants} from '../styles'

class ActionButton extends Component {
    render() {
        return (
            <View style={styles.action}>
                <TouchableHighlight
                    underlayColor={constants.actionColor}
                    onPress={this.props.onPress}>
                    <Text style={styles.actionText}>{this.props.title}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export {ActionButton};