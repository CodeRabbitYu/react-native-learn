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
            channelListArr : [],
            tidArr : [],
        }
    }
    componentDidMount() {
        this.loadData();
    }

    loadData(){
        let url = 'http://route.showapi.com/109-34?showapi_appid='+this.props.showapi_appid+'&showapi_sign='+this.props.showapi_sign;
        // console.log(url);
        fetch(url)
            .then((response) => response.json())
            .then((responseData)=> {
                // console.log(responseData);
                let channelList = responseData['showapi_res_body']['channelList'];

                this.setState({
                    channelListArr : channelList
                });
            })
            .catch((error) => {
                console.log(error);
            });
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
                    this.state.channelListArr.length > 0 ?
                        <ScrollableTabView
                            renderTabBar={() => <ScrollableTabBar/>}>
                            {
                                this.state.channelListArr.map((item, i) => {
                                    return (
                                        <NewsList key={i} tabLabel={item.name} channelId={item.channelId}
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
