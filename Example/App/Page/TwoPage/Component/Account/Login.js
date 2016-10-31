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
import Request from '../Common/request';
import Config from '../Common/config';

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            codeAlreadySend: false, // 是否发送验证码
            verifyCode: '',  // 验证码
            times: 60, // 剩余时间

        };
        this.login = this.login.bind(this);
        this.getVerifyCode = this.getVerifyCode.bind(this);
        this.showVerifyCode = this.showVerifyCode.bind(this);
    }
    // 获取验证码成功之后显示
    showVerifyCode(){
        console.log('开始显示验证码输入框与开始倒计时');
        this.setState({
            codeAlreadySend:true,
            times:10
        });
        this.intervarl = setInterval(()=>{
            if(this.state.times === 0){
                // 加上return之后,就不会再往下面走,要是不加,时间会变成 -1
                return clearInterval(this.intervarl);
            }
            this.setState({
                times:this.state.times-1,
            })
        },1000);
    }
    // 获取验证码
    getVerifyCode(){
        // 去服务器获取验证码
        // 复杂的话需要用到正则表达式
        let phoneNumber = this.state.phoneNumber;
        if (!this.state.phoneNumber){
            alert('手机号码不能为空');
            return;
        }
        let body = {
            phoneNumber:phoneNumber
        };
        let url = Config.api.base + Config.api.signup;
        Request.post(url,body)
            .then(
                (data)=>{
                    if (data && data.success){
                        this.showVerifyCode();
                    }else {
                        alert('获取验证码失败,请稍后重试');
                    }
                }
            )
            .catch((error)=>{
                alert(error);
            })
    }
    // 登录按钮
    login() {
        // 去服务器验证手机号码和验证码是否匹配
        // 复杂的话需要用到正则表达式
        let phoneNumber = this.state.phoneNumber;
        let verifyCode = this.state.verifyCode;
        // 手机号码或验证码为空
        if (!verifyCode || !phoneNumber){
            alert('手机号码不能为空');
            return;
        }
        let body = {
            phoneNumber:phoneNumber,
            code:verifyCode
        };
        let url = Config.api.base + Config.api.verify;
        Request.post(url,body)
            .then(
                (data)=>{
                    if (data && data.success){
                        console.log(data);
                        this.props.afterLogin(data.data);
                    }else {
                        alert('获取验证码失败,请稍后重试');
                    }
                }
            )
            .catch((error)=>{
                // alert(error);
                console.log(error);
            })
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
                    {/*数据是否发送? 如果发送了,显示输入验证码的提示框; 如果没发送,就不显示*/}
                    {this.state.codeAlreadySend ?
                        <View
                            style={styles.verifyCodeStyle}>
                            <TextInput
                                placeholder='请输入验证码'
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType={'phone-pad'}
                                style={styles.textInputStyle}
                                onChangeText={(text)=> {
                                    this.setState({
                                        verifyCode: text,
                                    });
                                }}
                            />
                            {/*判断倒计时是不是等于0,如果等于那将文字改成重新获取,如果不等于,那就继续倒计时*/}
                            {this.state.times === 0 ?
                                <View style={styles.countDownStyle}>
                                    <Text style={styles.countDownTextStyle} onPress={this.getVerifyCode}>重新获取</Text>
                                </View>
                                :
                                <View style={styles.countDownStyle}>
                                    <Text style={styles.countDownTextStyle}>剩余{this.state.times}秒</Text>
                                </View>
                            }
                        </View>
                        : null
                    }
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

    componentWillUnmount() {
        console.log('组件即将卸载');
        this.intervarl && clearInterval(this.intervarl);
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
    // 验证码输入框样式
    verifyCodeStyle:{
        marginTop:10,
        height:40,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    // 验证码框
    countDownStyle:{
        width:100,
        borderWidth:1,
        borderRadius:4,
        backgroundColor :'#ee735d',
        borderColor:'#ee735d',
        marginLeft:5,
        // marginBottom:5,
        // marginTop:2,
        justifyContent:'center',
        alignItems:'center',
    },
    // 验证码文字
    countDownTextStyle:{
        fontSize:16,
        color:'#fff',
        fontWeight:'600'
    },
});
