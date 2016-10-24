/**
 * Created by SLPower on 2016/10/13.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';

import NavBar from 'react-native-navbar';

export default class Account extends Component {
    constructor(props){
        super(props);
        this.state = {
            phoneNumber:'',
        };
        this.login = this.login.bind(this);
        this.getVerifyCode = this.getVerifyCode.bind(this);
    }
    // 获取验证码
    getVerifyCode(){

    }
    // 登录按钮
    login() {

    }
    render() {
        var titleConfig = {
            title: '登录',
            style: {color:'black',fontSize:20,fontWeight:'600'}
        };
        return (
            <View style={styles.container}>
                <NavBar
                    title={titleConfig}
                    style={{height:44,borderBottomWidth:1,borderBottomColor:'#dddddd'}}
                />
                <View style={styles.loginBoxStyle}>
                    <Text style={styles.titleStyle}>快速登录</Text>
                    <TextInput
                        placeholder='请输入手机号'
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType={'phone-pad'}
                        style={styles.textInputStyle}
                        onChangeText={(text)=>{
                            this.setState({
                                phoneNumber : text,
                            });
                        }}
                    />
                    {/*数据是否发送? 如果发送了,显示登录; 如果没发送,提示用户获取验证码*/}
                    {this.state.codeAlreadySend ?
                        <View style={styles.btnStyle}>
                            <Text style={styles.btnTextStyle} onPress={this.login}>登录</Text>
                        </View>
                        :
                        <View style={styles.btnStyle}>
                            <Text style={styles.btnTextStyle} onPress={this.getVerifyCode}>获取验证码</Text>
                        </View>
                    }

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    // 登录Box
    loginBoxStyle: {
        marginTop:20,
        padding:10
    },
    // 登录左边文字
    titleStyle: {
        marginBottom:20,
        fontSize:20,
        textAlign:'center',
        fontWeight:'bold',
        color:'#777'
    },
    // 输入框样式
    textInputStyle:{
        flex:1,
        height:40,
        padding:5,
        color:'#666',
        fontSize:20,
        backgroundColor:'white',
        borderWidth:1,
        borderRadius:4,
        borderColor:'#777'
    },
    btnStyle: {
        marginTop:10,
        height:40,
        backgroundColor:'transparent',
        justifyContent:'center',
        alignItems :'center',
        borderRadius:4,
        borderWidth:1,
        borderColor:'#ee735d'
    },
    btnTextStyle :{
        fontSize:16,
        fontWeight:'bold',
        color:'#ee735d'
    },
});
