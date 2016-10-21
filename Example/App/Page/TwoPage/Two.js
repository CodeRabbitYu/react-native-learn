/**
 * Created by SLPower on 2016/10/12.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    InteractionManager,
    Navigator
} from 'react-native';

import RTTabBar from './RTTabBar';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFont from 'react-native-vector-icons/FontAwesome';

import Account from './Component/Account/Account';
import Edit from './Component/Edit/Edit';
import List from './Component/List/List';
import Picture from './Component/Picture/Picture';

export default class Baby extends Component{
    constructor(props) {
        super(props);

        this.state = {
            tabNames: ['视频', '录制', '图片', '我的'],
            tabIconNames: ['ios-videocam', 'ios-recording', 'ios-reverse-camera', 'ios-contact'],

        };
    }
    render() {
        let tabNames = this.state.tabNames;
        let tabIconNames = this.state.tabIconNames;
        return (
            <ScrollableTabView
                // renderTabBar={() => <ScrollableTabBar/>}
                renderTabBar={() => <RTTabBar tabNames={tabNames} tabIconNames={tabIconNames}/>}
                tabBarPosition='bottom'
                onChangeTab={
                    (obj) => {
                        {/*console.log('被选中的tab下标：' + obj.i);*/}
                    }
                }
                onScroll={
                    (position) => {
                        {/*console.log('滑动时的位置：' + position);*/}
                    }
                }
                locked={false}
                initialPage={0}
                prerenderingSiblingsNumber={1}
            >
                <Navigator
                    tabLabel="list"
                    initialRoute={{name:'list',component:List}}
                    configureScene={(route) => {
                        if (route.sceneConfig) {
                            return route.sceneConfig;
                        }
                        return Navigator.SceneConfigs.PushFromRight;
                    } }
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return (
                            <Component navigator = {navigator} route = {route} {...route.passProps} />
                        )
                    } }
                />

                {/*<List tabLabel="list"/>*/}
                <Edit tabLabel="edit"/>
                <Picture tabLabel="picture"/>
                <Account tabLabel="account"/>

            </ScrollableTabView>
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
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

