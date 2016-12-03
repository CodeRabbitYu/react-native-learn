/**
 * Created by jale on 16/6/3.
 */
import React, {Component} from 'react';
import {
    View,TouchableHighlight,Text
} from 'react-native';


import {styles,constants} from '../styles'

class ListItem extends React.Component {
    render() {
        return (
            <TouchableHighlight onPress={this.props.onPress}>
                <View style={styles.li}>
                    <Text style={styles.liText}>{this.props.item.title}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

export {ListItem}