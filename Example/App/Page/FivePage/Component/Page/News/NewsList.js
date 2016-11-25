/**
 * Created by SLPower on 2016/11/24.
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
    ListView,
    InteractionManager,
    RefreshControl
} from 'react-native';

import NewsItem from './NewsItem';
import NewsDetail from './NewsDetail';


export default class NewsList extends Component {
    static defaultProps = {
        'showapi_appid' : '27786',
        'showapi_sign' : '8435f098f5b74384ba294790c7e8b503',
        'channelId' : '',
    };

    constructor(props){
        super(props);
        var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
        this.state = {
            page : 1,
            dataSource : dataSource,
            isRefreshing : false
        };
        this.renderRow = this.renderRow.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }

    onRefresh(){
        this.loadData(1);
    }

    pushPage(rowData){
        let {navigator} = this.props;
        if (navigator) {
            InteractionManager.runAfterInteractions(()=> {
                navigator.push({
                    component: NewsDetail,
                    passProps:{
                        link:rowData.link,
                    }
                })
            });
        }
    }

    componentDidMount() {
        this.loadData(1);
    }

    loadData(page){
        console.log(page);

        this.setState({
            isRefreshing :true
        });

        let url = 'http://route.showapi.com/109-35?showapi_appid='+this.props.showapi_appid+
            '&showapi_sign='+this.props.showapi_sign+'&channelId='+this.props.channelId+
            '&needAllList=0&maxResult=20&page='+page;
        console.log(url);
        fetch(url)
            .then((response) => response.json())
            .then((responseData)=> {
                console.log(responseData);
                this.setState({
                   dataSource: this.state.dataSource.cloneWithRows(responseData['showapi_res_body']['pagebean']['contentlist'])
                });

            });
    }

    renderRow(rowData){
        return(
            <NewsItem
                title = {rowData.title}
                imageUrlArr = {rowData.imageurls}
                pubDate = {rowData.pubDate}
                pushPage = {() => this.pushPage(rowData)}
            />
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    enableEmptySections={true}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh}
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

