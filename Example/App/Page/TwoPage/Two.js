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
    Navigator,
    AsyncStorage
} from 'react-native';

import RTTabBar from './RTTabBar';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFont from 'react-native-vector-icons/FontAwesome';

import Account from './Component/Account/Account';
import Login from './Component/Account/Login'
import Edit from './Component/Edit/Edit';
import List from './Component/List/List';
import Picture from './Component/Picture/Picture';

// import RTBar from './RTBar';

export default class Baby extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['视频', '录制', '图片', '我的'],
            tabIconNames: ['ios-videocam', 'ios-recording', 'ios-reverse-camera', 'ios-contact'],
            isLogin:false, // 是否登录
            user:null, // 用户信息

        };
        // 获取用户状态
        this.asynGetAppStatus = this.asynGetAppStatus.bind(this);
        // 登录之后
        this.afterLogin = this.afterLogin.bind(this);
    }

    afterLogin(data){
        // user 是一个对象,里面放着用户信息
        let user = JSON.stringify(data);
        AsyncStorage.setItem('user',user)
            .then(()=>{
                this.setState({
                    isLogin:true,
                    user:data
                })
            })
            .catch((error)=>{
                console.log(error);
                alert(error);
            });
    }

    asynGetAppStatus(){
        AsyncStorage.getItem('user')
            .then((data)=>{
                let user;
                let newState = {};
                if(data){
                    user = JSON.parse(data);
                }
                // 判断user是否存在
                if (user && user.accessToken){
                    newState.isLogin = true;
                    newState.user = user;
                }else  {
                    newState.isLogin = false;
                }
                this.setState(newState);
            })
            .catch((error)=>{
                alert(error)
            });
    }

    componentDidMount() {
        this.asynGetAppStatus();
    }

    render() {
        let tabNames = this.state.tabNames;
        let tabIconNames = this.state.tabIconNames;
        // 判断是否登录,如果没有登录跳转到登录页面, 如果登录进入首页
        if (!this.state.isLogin){
            return <Login afterLogin = {this.afterLogin} />
        }
        return (
            //                    tabLabel="RTBar"
            <View style={{ flex: 1 }}>
            <Navigator
                    onDidFocus={this.onDidFocus.bind(this)}
                    initialRoute={{name:'RTBar',component: RTBar }}
                    configureScene={(route) => {
                        if (route.sceneConfig) {
                            return route.sceneConfig;
                        }
                        return Navigator.SceneConfigs.FloatFromRight;
                    } }
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return (
                            <Component navigator = {navigator} route = {route} {...route.passProps} />
                        )
                    } }
                />
            </View>


        );
    }
    onDidFocus(name){

    }
}

class RTBar extends Component{
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
                tabBarPosition='overlayBottom'
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
                <List tabLabel="list" navigator={this.props.navigator} {...this.props}/>
                <Edit tabLabel="edit" navigator={this.props.navigator} {...this.props}/>
                <Picture tabLabel="picture" navigator={this.props.navigator} {...this.props}/>
                <Account tabLabel="account" navigator={this.props.navigator} {...this.props}/>

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
