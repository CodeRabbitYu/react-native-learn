/**
 * Created by SLPower on 2016/11/23.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    InteractionManager
} from 'react-native';

import NavBar from 'react-native-navbar';
import LeftNavBtn from '../../Base/Component/leftNavBtn';

export default class Five extends Component {


    popToHome(){
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.pop();
        });
    }
    render() {
        var titleConfig = {
            title: '新闻',
            style: {color:'black',fontSize:18,fontWeight:'500'}
        };
        let items = ['Menu Item 1','Menu Item 2','Menu Item 3','Menu Item 4','Menu Item 5'];
        return (
            <View style={styles.container}>
                <NavBar
                    title={titleConfig}
                    style={{height:44,borderBottomWidth:1,borderBottomColor:'#dddddd'}}
                    leftButton={
                        <LeftNavBtn
                            onPress={()=>this.popToHome()}
                        />
                    }
                />

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
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

AppRegistry.registerComponent('Five', () => Five);
