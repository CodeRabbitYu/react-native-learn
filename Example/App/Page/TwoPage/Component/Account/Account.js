/**
 * Created by SLPower on 2016/10/13.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
var {width, height} = Dimensions.get('window');
var Platform = require('react-native').Platform;
// var ImagePicker = require('react-native-image-picker');
import ImagePicker from 'react-native-image-picker';
import NavBar from 'react-native-navbar';
import Login from './Login'
import Icon from 'react-native-vector-icons/Ionicons';

// 调取相册需要
var options = {
    title: 'Select Avatar',
    customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
export default class Account extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLogin:false, // 是否登录
            user:null, // 用户信息
        };
        // 获取用户状态
        this.asynGetAppStatus = this.asynGetAppStatus.bind(this);
        // 打开相册
        this.pickPhoto = this.pickPhoto.bind(this);
    }

    pickPhoto(){
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let user = this.state.user;
                let avatarUrl = '';
                // You can display the image using either data...
                const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                // 得到URL,这个不分平台,  第一种方案
                // avatarUrl = 'data:image/jpeg;base64,' + response.data;

                // 下面是分平台的, 第二种方案
                // or a reference to the platform specific asset location
                if (Platform.OS === 'ios') {
                    const source = {uri: response.uri.replace('file://', ''), isStatic: true};
                    avatarUrl = response.uri.replace('file://', '');
                } else {
                    const source = {uri: response.uri, isStatic: true};
                    avatarUrl = response.uri;
                }

                user.avatar = avatarUrl;

                this.setState({
                    user:user
                });
            }
        });
    }

    asynGetAppStatus(){
        AsyncStorage.getItem('user')
            .then((data)=>{
                let user;
                let newState = {};
                if(data){
                    user = JSON.parse(data);
                    console.log(data);
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
        let user = this.state.user;
        if (!user){
            return <Login />
        }
        var titleConfig = {
            title: '我的',
            style: {color:'black',fontSize:20,fontWeight:'600'}
        };
        return (
            <View style={styles.container}>
                <NavBar
                    title={titleConfig}
                    style={{height:44,borderBottomWidth:1,borderBottomColor:'#dddddd'}}
                />
                {/*如果有用户的头像则显示用户的头像,如果没有则添加用户头像的图标*/}
                {user.avatar ?
                    <TouchableOpacity
                        style={styles.avatarContainer}
                        onPress={this.pickPhoto}
                    >
                        <Image
                            style={styles.avatarContainer}
                            source={{uri:user.avatar}}
                        >
                            {/*用户真正的头像*/}
                            <View
                                style={styles.avatarViewStyle}>
                                <Image
                                    style={styles.avatarStyle}
                                    source={{uri: user.avatar}}>
                                </Image>
                            </View>
                            <Text style={styles.avatarTextStyle}>点击这里可以更换头像</Text>
                        </Image>
                    </TouchableOpacity>
                    :
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarTextStyle}>添加用户头像</Text>
                        <TouchableOpacity
                            style={styles.avatarBtnStyle}>
                            <Icon
                                name="md-add"
                                size={45}
                                style={styles.avatarIconStyle}
                            />
                        </TouchableOpacity>
                    </View>
                }



            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    // 加载头像的外层View
    avatarContainer:{
        width:width,
        height:140,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#666'
    },
    // 加载头像的提示文字
    avatarTextStyle:{
        fontSize:16,
        fontWeight:'600',
        textAlign:'center',
        color:'#fff',
        backgroundColor:'transparent'
    },
    // 点击按钮
    avatarBtnStyle:{
        marginTop:15,
        justifyContent:'center',
        alignItems:'center'
    },
    // 添加头像按钮
    avatarIconStyle:{
        padding:20,
        paddingLeft:25,
        paddingRight:25,
        color:'#666',
        backgroundColor:'#fff',
        borderRadius:30
    },
    // 用户之前的头像的外层View
    avatarViewStyle:{
        marginTop:15,
        justifyContent:'center',
        alignItems:'center'
    },
    // 用户之前的头像
    avatarStyle:{
        width:width*0.2,
        height:width*0.2,
        marginBottom:20,
        borderRadius:width*0.1,
        borderWidth:1,
        borderColor:'red',
        resizeMode:'cover'
    }
});
