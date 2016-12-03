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

import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import NewsList from './NewsList';
import NavBar from 'react-native-navbar';

export default class News extends Component {

    static defaultProps = {
        'showapi_appid' : '27786',
        'showapi_sign' : '8435f098f5b74384ba294790c7e8b503'
    };

    constructor(props){
        super(props);
        this.state = {
            typeArr : [
                {
                    'title':'全部',
                    'type':'',
                },
                {
                    'title':'视频',
                    'type':'41',
                },
                {
                    'title':'图片',
                    'type':'10',
                },
                {
                    'title':'段子',
                    'type':'29',
                },
                {
                    'title':'声音 ',
                    'type':'31',
                },
            ],
        }
    }

    render() {
        var titleConfig = {
            title: '新闻',
            style: {color: 'black', fontSize: 18, fontWeight: '500'}
        };

        return (
            <View style={styles.container}>
                <NavBar
                title={titleConfig}
                style={{height:44,borderBottomWidth:1,borderBottomColor:'#dddddd'}}
                />
                {
                    this.state.typeArr.length > 0 ?
                        <ScrollableTabView
                            renderTabBar={() => <ScrollableTabBar/>}>
                            {
                                this.state.typeArr.map((item, i) => {
                                    return (
                                        <NewsList key={i} tabLabel={item.title} type={item.type}
                                                  navigator={this.props.navigator} {...this.props}/>
                                    )
                                })
                            }
                    </ScrollableTabView> : null
                }





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
