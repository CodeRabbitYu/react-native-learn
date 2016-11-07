/**
 * Created by SLPower on 2016/11/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

// var PageNavigator = require('PageNavigator')


export default class Three extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome} onPress={()=>this.props.navigator.pop()}>
                    Welcome to Three!
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('Three', () => Three);