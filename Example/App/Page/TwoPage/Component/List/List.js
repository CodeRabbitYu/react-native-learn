/**
 * Created by SLPower on 2016/10/13.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableHighlight,
    Dimensions,
    ActivityIndicator,
    RefreshControl,
    InteractionManager
} from 'react-native';

var {width, height} = Dimensions.get('window');

let cacheResults = {
    nextPage:1,
    items:[],
    total:0,
};

import NavBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Ionicons';
import Item from './item'
import config from '../Common/config';
import request from '../Common/request';
import Detail from './Detail';

export default class List extends Component {
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
        this.state = {
            dataSource : ds,
            isLoadingMore:false,
            isRefreshing:false
        };
    };

    componentDidMount() {
        this.loadData(1);
    }

    loadData(page) {
        console.log("page:" + page);
        if (page !== 0){
            this.setState({
                isLoadingMore:true
            });
        }else {
            this.setState({
                isRefreshing :true
            });
        }
        // 第一步,完整地址
        request.get(config.api.base + config.api.list,{
            accessToken:'111',
            page:page
        }).then(
            (data) => {
                console.log(data);
                if (data.success){
                    //把服务器得到的数据,存到里面
                    let items = cacheResults.items.slice();

                    if (page !== 0){
                        // concat 需要看一下
                        items = items.concat(data.data);

                        cacheResults.nextPage += 1;
                    } else {
                        items = data.data.concat(items);
                      }
                    cacheResults.items = items;
                    cacheResults.total = data.total;

                    console.log('总数据的长度' + cacheResults.total);
                    console.log('当前的listView数据长度' + cacheResults.items.length);
                    setTimeout(()=>{
                        if (page !== 0){
                            this.setState({
                                dataSource: this.state.dataSource.cloneWithRows(cacheResults.items),
                                isLoadingMore:false
                            });
                        } else {
                            this.setState({
                                dataSource: this.state.dataSource.cloneWithRows(cacheResults.items),
                                isRefreshing :false
                            });
                        }
                    },0);
                }
            }
        ).catch(
            (err)=>{
                if (page !== 0){
                    this.setState({
                        isLoadingMore:false
                    });
                }else {
                    this.setState({
                        isRefreshing:false
                    });
                }
                alert('error' + err);
            }
        );
    }

    // 上拉加载更多数据
    loadMoreData=()=>{
        // 判断有没有更多数据 或者 数据正在加载
        // 这样的时候需要return
        if (!this.isMore() || this.state.isLoadingMore){
            return;
        }

        // 去服务器请求加载更多数据
        let page = cacheResults.nextPage;
        this.loadData(page);
    };

    // 服务器有没有更多数据
    isMore(){
        // 只要列表长度和total数据比较不相等,那就说明有数据
        return cacheResults.items.length !== cacheResults.total
    }

    // 下拉刷新
    _onRefresh=()=>{
        if(!this.isMore() || this.state.isRefreshing){
            console.log(this.state.isRefreshing);
            return;
        }

        // 去服务器获取数据
        // page 相当于数据的页码
        this.loadData(0);
    };

    render() {
        var titleConfig = {
            title: '视频',
            style: {color:'black',fontSize:20,fontWeight:'600'}
        };
        return (
            <View style={styles.container}>
                <NavBar
                    title={titleConfig}
                    style={{height:44,borderBottomWidth:1,borderBottomColor:'#dddddd'}}
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData,rowID,sectionID)=>this.renderRow(rowData)}
                    style={styles.listStyle}
                    enableEmptySections={true}
                    onEndReachedThreshold={20}
                    onEndReached={this.loadMoreData}
                    renderFooter={this.renderFooter}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}

                        />
                    }
                />
            </View>
        );
    }

    // 返回底部信息
    renderFooter=()=>{
        if (!this.isMore() && cacheResults.total !== 0 ){
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
    };

    renderRow(rowData){
        return(
            <Item
                rowData={rowData}
                onSelect={() => this.pushPage(rowData)}
                key={rowData._id}
            />
        )
    }

    pushPage(rowData) {
        let {navigator} = this.props;
        if (navigator) {
            // 解构 和 模式匹配
            InteractionManager.runAfterInteractions(()=> {
                navigator.push({
                    title: 'Detail',
                    component: Detail,
                    passProps:{
                        rowData:rowData
                    }
                })
            });
        }
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
    listStyle: {
        backgroundColor:'white'
    },




    loadMoreStyle:{
        marginVertical:20
    },
    loadMoreTextStyle:{
        fontSize:18,
        color:'#777',
        alignItems :'center'
    },
});