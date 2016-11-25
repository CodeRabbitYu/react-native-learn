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
    InteractionManager,
    WebView
} from 'react-native';

import NavBar from 'react-native-navbar';

import LeftNavBtn from '../../../../../Base/Component/leftNavBtn';

var WEBVIEW_REF = 'webview';
var DEFAULT_URL = 'https://m.facebook.com';
var TEXT_INPUT_REF = 'urlInput';

export default class NewsDetail extends Component {
    popToHome(){
        InteractionManager.runAfterInteractions(()=>{
            this.props.navigator.pop();
        });
    }
    render() {

        var titleConfig = {
            title: '新闻详情',
            style: {color: 'black', fontSize: 18, fontWeight: '500'}
        };
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
                <WebView
                    ref={WEBVIEW_REF}
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{uri: this.props.link}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
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

