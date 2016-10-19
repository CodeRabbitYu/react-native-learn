/**
 * Created by SLPower on 2016/10/17.
 */


import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    AlertIOS,
    ActivityIndicator
} from 'react-native';

import VideoPlayeriOS from './VideoPlayeriOS';
import VideoPlayerAndroid from './VideoPlayerAndroid';
//            Platform.OS === 'ios' ? <VideoPlayeriOS /> : <VideoPlayerAndroid />
import NavBar from 'react-native-navbar';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';


import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');

export default class Detail extends Component {
    constructor(props){
        super(props);
        this.state = {
            rowData:this.props.rowData,
            rate: 1,
            volume: 1,
            muted: true,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            controls: false,
            // 暂停
            paused: false,
            skin: 'custom',
            isVideoLoad:false,
            isPlay:false,

        };
        this.onLoadStart = this.onLoadStart.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onEnd = this.onEnd.bind(this);
        this.onError = this.onError.bind(this);
        this.onPlay = this.onPlay.bind(this);
    }

    onPlay(){
        this.refs.videoPlayer.seek(0);
    }

    onLoadStart(){
        console.log('onLoadStart');
    }
    onLoad(data){
        this.setState({duration: data.duration});
    }
    onProgress(data) {

        if(!this.state.isVideoLoad){
            this.setState({
                isVideoLoad:true
            });
        }
        if(!this.state.isPlay){
            this.setState({
                isPlay:true
            });
        }
        this.setState({currentTime: data.currentTime});
    }

    onEnd(){
        console.log('onEnd');
        // 当结束的时候暂停播放
        this.setState({
            currentTime:this.state.duration,
            isPlay:false,
        });
    }
    onError(error){
        console.log(error);
    }
   
    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        } else {
            return 0;
        }
    }

    render() {
        // console.log(this.props.rowData);
        let rowData = this.state.rowData;
        var titleConfig = {
            title: rowData.title,
            style: {color:'black',fontSize:20,fontWeight:'600'}
        };

        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
        return (
            <View style={{backgroundColor:'white',flex:1}}>
                <NavBar
                    title={titleConfig}
                    style={{height:44,borderBottomWidth:1,borderBottomColor:'#dddddd'}}
                />
                <View style={styles.videoViewStyle}>
                    <Video
                        source={{uri:"http://www.reactnative.vip/data/movie.mp4"}}
                        style={styles.videoStyle}
                        // 速率
                        rate={this.state.rate}
                        // 开始暂停
                        paused={this.state.paused}
                        // 声音大小
                        volume={this.state.volume}
                        // 静音
                        muted={this.state.muted}
                        // 屏幕
                        resizeMode={this.state.resizeMode}
                        // 重复播放
                        repeat={false}

                        onLoadStart={this.onLoadStart}
                        onLoad={this.onLoad}
                        onProgress={this.onProgress}
                        onEnd={this.onEnd}
                        onError={this.onError}

                        ref="videoPlayer"

                    />
                    {/*视频若没有完成显示一个指示器*/}
                    {!this.state.isVideoLoad ?
                        <ActivityIndicator color="white" size="large"
                                           style={styles.loadStyle}/>
                        :null}

                    {this.state.isVideoLoad && this.state.isPlay ?
                        <Icon
                            name="ios-play"
                            size={45}
                            style={styles.playStyle}
                            onPress={this.onPlay}
                        />
                        :null}

                    <View style={styles.progress}>
                        <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]} />
                        <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]} />
                    </View>

                </View>
            </View>
        );
    }
    backToList=()=>{
        let {navigator} = this.props;
        if (navigator){
            navigator.pop();
        }
    }
}

const styles = StyleSheet.create({
    videoViewStyle:{
        width:width,
        height:380,
        backgroundColor:'white',

    },
    videoStyle:{
        width:width,
        height:360,
        backgroundColor:'black'
    },
    loadStyle: {
        marginVertical:20,
        position:'absolute',
        left:0,
        width:width,
        top:160,
        backgroundColor:'transparent',
        alignSelf:'center'
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 10,
        backgroundColor: '#cccccc',
    },
    innerProgressRemaining: {
        height: 10,
        backgroundColor: '#2C2C2C',
    },
    playStyle:{
        position:'absolute',
        top:160,
        left:width/2-30,
        width:60,
        height:60,
        paddingTop:10,
        paddingLeft:22,
        backgroundColor:'transparent',
        borderColor:'#fff',
        borderWidth:1,
        borderRadius:30,
        color:'#ed7b66'
    },

});