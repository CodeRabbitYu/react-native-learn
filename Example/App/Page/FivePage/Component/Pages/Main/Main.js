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
    ListView,
    AlertIOS
} from 'react-native';

import NavBar from 'react-native-navbar';
import LeftNavBtn from '../../../../../Base/Component/leftNavBtn';

// import Wilddog from 'wilddog';

import {styles} from './styles';
import {ActionButton} from './components/ActionButton'
import {ListItem} from './components/ListItem'
import {StatusBar} from './components/StatusBar'

const Wilddog = require('wilddog');
const WilddogUrl = 'https://scm.wilddogio.com/';

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        };
        this.itemsRef = Main.getRef().child('items');
    }

    static getRef() {
        return new Wilddog(WilddogUrl);
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar title="Wilddog List"/>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderItem.bind(this)}
                    style={styles.listview}/>
                <ActionButton title="新的条目" onPress={this._addItem.bind(this)}/>
            </View>
        );
    }

    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }

    // 这里就是让这个 ListItem 活起来的关键所有在了
    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {

            // get children as an array
            var items = [];
            snap.forEach((child) => {
                items.push({
                    title: child.val().title,
                    _key: child.key()
                });
            });

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            });

        });
    }

    // 新建条目的时候只需要向 wilddog 写入数据即可, 因为我们在前面调用了 itemsRef.on('value'), wilddog 数据库中的改动会被自动
    // 同步到本地进行处理
    _addItem() {
        AlertIOS.prompt(
            '新增条目',
            '请输入要添加的条目名称',
            [
                {
                    text: '确认',
                    onPress: (text) => {
                        this.itemsRef.push({title: text})
                    }
                }
            ],
            'plain-text'
        );
    }

    _renderItem(item) {
        const onPress = () => {
            AlertIOS.prompt(
                '删除条目',
                '确认删除 ' + item.title + ' 吗?',
                [
                    {text: '删除', onPress: (text) => this.itemsRef.child(item._key).remove()},
                    {text: '取消', onPress: (text) => console.log('已取消')}
                ],
                'default'
            );
        };
        return (
            <ListItem item={item} onPress={onPress}/>
        );
    }



    // render() {
    //     var titleConfig = {
    //         title: '我的',
    //         style: {color:'black',fontSize:18 ,fontWeight:'500'}
    //     };
    //     return (
    //         <View style={styles1.container}>
    //             <NavBar
    //                 title={titleConfig}
    //                 style={{height:44,borderBottomWidth:1,borderBottomColor:'#dddddd'}}
    //             />
    //         </View>
    //     );
    // }
}


const styles1 = StyleSheet.create({
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

