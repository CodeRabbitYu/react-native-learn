/**
 * Created by SLPower on 2016/11/29.
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
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';

// import x from './信息页_选择_icon.png'

var {width, height} = Dimensions.get('window');


export default class detail extends Component {

    pushDetail(tag){
        switch (tag) {
            case ('关于我们'):
                return (alert('关于我们'));
            case ('当前版本'):
                return (alert('当前版本'));
            case ('喜欢我们吗?去打分吧!'):
                return (alert('喜欢我们吗?去打分吧!'));
            case ('动力基金'):
                return (alert('动力基金'));
            case ('运动记录'):
                return (alert('运动记录'));
            case ('头像'):
                return (alert('头像'));
            default:
                return(alert('什么鬼!'));
        }
    }

    bottomView(){
        return(
            <View style={{marginTop:10}}>
                <Item
                    itemText={'关于我们'}
                    isRightText={false}
                    isLineHidden={true}
                    itemPress={() => this.pushDetail('关于我们')}
                />
                <Item
                    itemText={'当前版本'}
                    isRightText={false}
                    isLineHidden={true}
                    isArrow={false}
                    itemPress={()=>this.pushDetail('当前版本')}
                />
                <Item
                    itemText={'喜欢我们吗?去打分吧!'}
                    isRightText={false}
                    isLineHidden={false}
                    itemPress={()=>this.pushDetail('喜欢我们吗?去打分吧!')}
                />
            </View>
        )
    }

    middleView(){
        return(
            <View style={{marginTop:10}}>
                <Item
                    itemText={'动力基金'}
                    itemRightText={'38元'}
                    isRightText={true}
                    isLineHidden={true}
                    itemPress={()=>this.pushDetail('动力基金')}
                />
                <Item
                    itemText={'运动记录'}
                    isRightText={false}
                    isLineHidden={false}
                    itemPress={()=>this.pushDetail('运动记录')}
                />
            </View>
        )
    }

    headerView(){
        return(
            <TouchableOpacity activeOpacity={0.5} onPress={()=>this.pushDetail('头像')}>
            <View style={styles.headerViewStyle}>
                <Image style={styles.headerImageStyle} />
                <Text style={styles.headerTextStyle}>西西</Text>
                <Image style={styles.headerRightImageStyle} source={require('./信息页_选择_icon.png')}/>
            </View>
            </TouchableOpacity>
        )
    }
    navigatorView(){
        return(
            <View style={styles.navigatorViewStyle}>
                <Text style={styles.navigatorTextStyle}>信息</Text>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                {this.navigatorView()}
                {this.headerView()}
                {this.middleView()}
                {this.bottomView()}
            </View>
        );
    }
}

class Item extends Component{

    static defaultProps = {
        itemImage:React.PropTypes.string.isRequired,
        itemText:React.PropTypes.string.isRequired,
        itemRightText:React.PropTypes.string.isRequired,
        isRightText:React.PropTypes.bool,
        isLineHidden:React.PropTypes.bool,
        isArrow:React.PropTypes.bool,
        itemPress:React.PropTypes.func,
    };
    render(){
        return(
            <TouchableOpacity activeOpacity={0.5} onPress={()=>this.props.itemPress()}>
            <View style={styles.itemViewStyle}>
                <Image style={styles.itemLeftImageStyle}/>
                <Text style={styles.itemTextStyle}>{this.props.itemText}</Text>
                {this.props.isRightText?
                    <Text style={styles.itemRightTextStyle}>{this.props.itemRightText}</Text>
                    :null
                }
                {this.props.isArrow ?
                    <Image style={styles.itemRightImageStyle} source={require('./信息页_选择_icon.png')}/>
                    :
                    <Text style={styles.versionStyle}>V1.0</Text>
                }

                {this.props.isLineHidden?
                    <View style={styles.lineStyle} />
                    :null
                }
            </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    navigatorViewStyle: {
        backgroundColor:'#fff',
        width:width,
        height:64
    },
    navigatorTextStyle: {
        justifyContent:'center',
        alignSelf:'center',
        fontSize:18,
        color:'#000',
        marginTop:33
    },
    headerViewStyle:{
        flexDirection:'row',
        height:74,
        width:width,
        backgroundColor:'#fff',
        marginTop:10,
    },
    headerImageStyle: {
        height:40,
        width:40,
        marginLeft:20,
        backgroundColor:'red',
        alignSelf:'center'
    },
    headerTextStyle:{
        marginLeft:20,
        alignSelf:'center',
        color:'#172434',
        fontFamily:'PingFangSC-Regular',
        fontSize:16,
    },
    headerRightImageStyle: {
        alignSelf:'center',
        // backgroundColor:'red',
        height:12,
        width:7,
        position:'absolute',
        right:20.5,
        top:30.5
    },
    itemViewStyle: {
        height:60,
        width:width,
        backgroundColor:'#fff',
        flexDirection:'row',
    },
    itemLeftImageStyle: {
        width:20,
        height:20,
        marginLeft:20,
        alignSelf:'center',
        backgroundColor:'red'
    },
    itemTextStyle: {
        marginLeft:12,
        color:'#000',
        fontSize:16,
        fontFamily:'PingFangSC-Regular',
        alignSelf:'center',
    },
    itemRightTextStyle :{
        color:'#f30d31',
        fontSize:13,
        fontFamily:'PingFangSC-Regular',
        alignSelf:'center',
        position:'absolute',
        right:40,
        top:21,
    },
    itemRightImageStyle:{
        alignSelf:'center',
        // backgroundColor:'red',
        height:12,
        width:7,
        position:'absolute',
        right:20.5,
        top:24
    },
    lineStyle:{
        height:1,
        width:width,
        backgroundColor:'#E5E5E5',
        position:'absolute',
        left:20,
        bottom:1,
    },
    versionStyle: {
        position:'absolute',
        right:20,
        top:18.5,
        fontSize:16,
        color:'#999'
    }

});

