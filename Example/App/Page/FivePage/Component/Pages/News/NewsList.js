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

import {
    Home,
} from '../../Actions/HomeAction';

import NewsItem from './NewsItem';
import NewsDetail from './NewsDetail';

// import Loading from '../../Common/Loading';


// let channelId = this.props.channelId;
let page = 0;
let isLoadMore = false;
let isRefreshing = false;
let isLoading = true;

export default class NewsList extends Component {
    static defaultProps = {
        'showapi_appid' : '27786',
        'showapi_sign' : '8435f098f5b74384ba294790c7e8b503',
        'type' : '',
    };

    constructor(props){
        super(props);
        var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
        this.state = {
            dataSource : dataSource,
            isRefreshing : false,
            isLoadMore: false,
            allPages: '',
            allNum : '',
            currentPage:'',
        };
        this.renderRow = this.renderRow.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
    }

    // 服务器有没有更多数据
    isMore(){
        console.log(this.state.allPage !== this.state.currentPage);
        // 全部页数不等于当前页数,那就说明有更多数据
        return this.state.allPage !== this.state.currentPage;
    }
    renderFooter(){
        console.log('这是底部View');
        if (!this.isMore() && this.state.allPage !== 0 ){
            return (
                <View style={styles.loadMoreStyle}>
                    <Text style={styles.loadMoreTextStyle} >没有更多数据了</Text>
                </View>
            )
        }

        if (!this.state.isLoadingMore){
            return <View style={styles.loadMoreStyle} />
        }

        return(
            <ActivityIndicator
                style={styles.loadMoreStyle}
            />
        )
    }

    onEndReached(){
        console.log('这是底部加载数据');
        if (!this.isMore() || this.state.isLoadingMore ){
            return;
        }
        // 去服务器请求加载更多数据
        let page = this.setState({
                currentPage : this.state.currentPage + 1
            });

        page = this.state.currentPage;
        const {dispatch} = this.props;
        isLoadMore = false;
        this.setState({
            isLoadMore : true
        });
        console.log(this.state.isRefreshing);
        isLoading= false;
        console.log(page, this.props.type, isLoadMore, this.state.isRefreshing, isLoading);
        dispatch(Home(page, this.props.type, isLoadMore, this.state.isRefreshing, isLoading,(arr)=>{
            // console.log(arr);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(arr['contentlist']),
                isRefreshing:false,
                currentPage:arr.currentPage,
                isLoadMore : false
            });
        }));

    }

    onRefresh(){
        page = 1;
        const {dispatch} = this.props;
        isLoadMore = false;
        this.setState({
            isRefreshing : true
        });
        console.log(this.state.isRefreshing);
        isLoading= false;
        console.log(page, this.props.type, isLoadMore, this.state.isRefreshing, isLoading);
        dispatch(Home(page, this.props.type, isLoadMore, this.state.isRefreshing, isLoading,(arr)=>{
            // console.log(arr);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(arr['contentlist']),
                isRefreshing:false,
                currentPage:arr.currentPage,
            });
        }));
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
        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            dispatch(Home(page,this.props.type,isLoadMore,isRefreshing,isLoading, (arr) => {
                console.log(arr['contentlist'][0]['text']);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(arr['contentlist']),
                    allPages:arr.allPages,
                    allNum:arr.allNum,
                    currentPage:arr.currentPage,
                })
            }))
        })
    }

    loadData(page){

        this.setState({
            isRefreshing :true
        });

        let url = 'http://route.showapi.com/109-35?showapi_appid='+this.props.showapi_appid+
            '&showapi_sign='+this.props.showapi_sign+'&channelId='+this.props.channelId+
            '&needAllList=0&maxResult=20&page=';
        // console.log(url);
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
                contentObj={rowData}
            />
        )
    }
    render() {
        const {Home,rowData} = this.props;
        // let homeList=[];
        // let homeList  = this.state.dataSource.cloneWithRows(Home.HomeList);
        // console.log(Home.HomeList.length);
        // console.log(Home.isRefreshing);
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
                            title="正在加载中……"
                            color="#ccc"
                        />
                    }
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={40}
                    renderFooter={this.renderFooter}
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

