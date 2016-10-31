/**
 * Created by SLPower on 2016/10/17.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
    Dimensions,

} from 'react-native';

var {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import Request from '../Common/request';
import Config from '../Common/config';

export default class Item extends Component {
    constructor(props){
        super(props);
        this.state = {
            rowData:this.props.rowData,
            isHandle:this.props.rowData.isHandle
        };
    }

    handleClick=()=>{
        let isHandle = !this.state.isHandle;
        let rowData = this.state.rowData;
        let url = Config.api.base + Config.api.handle;
        let body = {
            id:rowData.id,
            isHandle: isHandle ? 'yes' : 'no',
            accessToken:'rabbit'
        };
        Request.post(url,body)
            .then(
                (data)=>{
                    console.log(data);
                    if (data && data.success){
                        this.setState({
                            isHandle:isHandle
                        });
                    }else {
                        (alert('网络错误,请稍后重试!'));
                    }
                }
            )
            .catch(
                (error)=>{
                    (alert('网络错误,请稍后重试:'+error));
                }
            );
    };

    render() {
        let rowData = this.state.rowData;
        return (
            <TouchableHighlight
                onPress={this.props.onSelect}>
                <View style={styles.itemStyle}>
                    <Text style={styles.titleStyle}>{rowData.title}</Text>
                    <Image style={styles.imageStyle} source={{uri:rowData.thumb}}>
                        <Icon
                            name="ios-play"
                            size={28}
                            style={styles.playStyle}
                        />
                    </Image>
                    <View style={styles.itemFootStyle}>
                        <View style={styles.handleBox}>
                            <Icon
                                name={this.state.isHandle ? "ios-heart" : "ios-heart-outline"}
                                size={28}
                                style={[styles.handleImageStyle,this.state.isHandle ? null : styles.handleSelectedStyle]}
                                onPress={this.handleClick}
                            />
                            <Text style={styles.handleText} onPress={this.handleClick}>点赞</Text>
                        </View>
                        <View style={styles.handleBox}>
                            <Icon
                                name="ios-chatbubbles"
                                size={28}
                                style={styles.commentsImageStyle}
                            />
                            <Text style={styles.handleText}>评论</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    itemStyle:{
        width:width,
        marginBottom:10,
        backgroundColor:'white'
    },
    titleStyle:{
        fontSize:18,
        padding:3,
        color:'#333',
    },
    imageStyle:{
        height:width*0.56,
        width:width,
        resizeMode:'cover'
    },
    itemFootStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#eee'
        // width:width,
    },
    handleBox:{
        padding:10,
        flexDirection:'row',
        width:width/2-0.5,
        justifyContent:'center',
        backgroundColor:'white'
    },
    handleImageStyle:{
        fontSize:22,
        // color:"#333"
        color:"#ed7b66"
    },
    handleSelectedStyle:{
        fontSize:22,
        color:"#333"
    },
    handleText:{
        fontSize:18,
        color:"#333",
        paddingLeft:12,
        marginTop:3
    },
    playStyle:{
        position:'absolute',
        bottom:14,
        right:14,
        width:46,
        height:46,
        paddingTop:9,
        paddingLeft:18,
        backgroundColor:'transparent',
        borderColor:'#fff',
        borderWidth:1,
        borderRadius:23,
        color:'#ed7b66'
    },
    commentsImageStyle:{
        fontSize:22,
        color:"#333"
    },
});
