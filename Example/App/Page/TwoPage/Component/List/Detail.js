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
    ActivityIndicator,
    InteractionManager,
    TouchableOpacity,
    ListView,
    Image,
    TextInput,
    Modal,
    PixelRatio
} from 'react-native';

import VideoPlayeriOS from './VideoPlayeriOS';
import VideoPlayerAndroid from './VideoPlayerAndroid';
//            Platform.OS === 'ios' ? <VideoPlayeriOS /> : <VideoPlayerAndroid />
import NavBar from 'react-native-navbar';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';


import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');
import LeftNavBtn from '../../../../Base/Component/leftNavBtn'
import Button from 'react-native-button'
import config from '../Common/config';
import request from '../Common/request';

let cacheResults = {
    nextPage:1,
    items:[],
    total:0,
};

export default class Detail extends Component {
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
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
            isVideoOk:false,
            dataSource : ds,
            isLoadingMore:false,
            animationType:'slide', // none slide fade
            modalVisible:false,   // 模态场景是否可见
            transparent:true,    // 是否透明显示
            content:'rabbit',     // 文本输入框显示文字
            isSendingComment:false, //评论之后连接网络的延迟



        };
        this.onLoadStart = this.onLoadStart.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onEnd = this.onEnd.bind(this);
        this.onError = this.onError.bind(this);
        this.onPlay = this.onPlay.bind(this);
        // 暂停播放
        this.onPause = this.onPause.bind(this);
        // 恢复播放
        this.resumePlayer = this.resumePlayer.bind(this);
        // 列表
        this.renderRow = this.renderRow.bind(this);
        // 加载更多数据
        this.loadMoreData = this.loadMoreData.bind(this);
        // 返回底部信息
        this.renderFooter = this.renderFooter.bind(this);
        // 返回头部信息
        this.renderHeader = this.renderHeader.bind(this);
        //
        this.loadData = this.loadData.bind(this);
        // 获得焦点
        this.onFocus = this.onFocus.bind(this);
        // 失去焦点
        this.onBlur = this.onBlur.bind(this);

        this.setModalVisible = this.setModalVisible.bind(this);
        this.startShow = this.startShow.bind(this);
        // 关闭model
        this.closeModal = this.closeModal.bind(this);
        // 提交按钮
        this.submitButton = this.submitButton.bind(this);
    }
    // 提交按钮
    submitButton(){
        console.log('点击按钮');
        if(!this.state.content){
            return alert('评论内容不能为空!');
        }
        // 如果正在发送评论(点击按钮之后的延迟)
        if(this.isSendingComment){
            return alert('正在发送评论');
        }
        // 访问网络之前,改变发送状态, 然后调用网络请求  POST请求
        // 第一次发送评论
        this.setState({
            isSendingComment:true
        },()=>{
            let body = {
                accessToken:'rabbit',
                id_video:'123',
                content:this.state.content,
            };
            let url = config.api.base + config.api.comment;
            request.post(url,body)
                .then(
                    (data)=>{
                        if(data && data.success){
                            let items = cacheResults.items.slice();
                            // 将一条数据添加到前面的数组里面
                            items = [{
                                content:this.state.content,
                                replyBy:{
                                    nickname:'rabbit',
                                    avatar:'http://i.gtimg.cn/music/photo/mid_singer_300/r/e/0042kZuh1dgLre.jpg'
                                }
                            }].concat(items);
                            cacheResults.items = items;
                            cacheResults.total = cacheResults.total+1;
                            this.setState({
                                dataSource : this.state.dataSource.cloneWithRows(cacheResults.items),
                                isSendingComment:false
                            });
                            this.setModalVisible(false);
                        }
                    }
                ).catch(
                    (error)=>{
                        console.log(error);
                        this.setState({
                            isSendingComment:false,
                        });
                        this.setModalVisible(false);
                        alert('评论失败,请稍后重试');
            });
        });
    }
    // 关闭按钮
    closeModal(){
        this.setModalVisible(false);
    }
    // 弹出模态视图
    setModalVisible =(visible) => {
        this.setState({modalVisible:visible});
    };
    // 显示了
    startShow(){
        console.log('开始显示');
    };
    // 获得焦点
    onFocus(){
        this.setModalVisible(true);
        console.log('获得焦点');
    }
    // 失去焦点
    onBlur(){
        console.log('失去焦点');
    }
    componentDidMount() {
        this.loadData(1);
    };
    loadData(page) {
        console.log("page:" + page);
        this.setState({
            isLoadingMore:true
        });

        // 第一步,完整地址
        request.get(config.api.base + config.api.comments,{
            accessToken:'111',
            page:page,
            id:'1111'
        }).then(
            (data) => {
                console.log(data);
                if (data && data.success){
                    //把服务器得到的数据,存到里面
                    let items = cacheResults.items.slice();
                        // concat 需要看一下
                    items = items.concat(data.data);

                    cacheResults.nextPage += 1;

                    cacheResults.items = items;
                    cacheResults.total = data.total;

                    console.log('总数据的长度' + cacheResults.total);
                    console.log('当前的listView数据长度' + cacheResults.items.length);
                    setTimeout(()=>{
                        this.setState({
                            dataSource: this.state.dataSource.cloneWithRows(cacheResults.items),
                            isLoadingMore:false
                        });

                    },0);
                }
            }
        ).catch(
            (err)=>{
                this.setState({
                    isLoadingMore:false
                });

                alert('error' + err);
            }
        );
    };
    // 顶部输入框 => 跳转新页面
    renderHeader=()=>{
        let rowData = this.state.rowData;
        return(
            <View style={styles.listHeaderStyle}>
                <View style={styles.infoStyle}>
                    <Image style={styles.avatarStyle} source={{uri:rowData.author.avatar}} />
                    <View style={styles.descStyle}>
                        <Text style={styles.nickNameStyle}>{rowData.author.nickname}</Text>
                        <Text style={styles.titleStyle}>{rowData.title}</Text>
                    </View>
                </View>
                <View style={styles.commentStyle}>
                    <View style={styles.commentView}>
                        <TextInput
                            placeholder='评论一下咯'
                            underlineColorAndroid='transparent'
                            style={styles.textInputStyle}
                            // 多行
                            multiline={true}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                        />
                    </View>
                </View>
                <View style={styles.commentArea}>
                    <Text style={styles.commentTextStyle}>精彩评论</Text>
                </View>
            </View>
        )
    }
    // 服务器有没有更多数据
    isMore(){
        // 只要列表长度和total数据比较不相等,那就说明有数据
        return cacheResults.items.length !== cacheResults.total
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
    // 上拉加载更多数据
    loadMoreData=()=>{
        // 判断有没有更多数据 或者 数据正在加载
        // 这样的时候需要return
        if (!this.isMore() || this.state.isLoadingMore){
            return;
        }

        // 去服务器请求加载更多数据
        let page = cacheResults.nextPage;
        console.log(page);
        this.loadData(page);
    };
    // 列表数据
    renderRow(rowData){
        return(
            <View style={styles.replyStyle} key={rowData.id}>
                <Image style={styles.replyAvatarStyle} source={{uri:rowData.replyBy.avatar}} />
                <View style={styles.replyDescStyle}>
                    <Text style={styles.replyNickNameStyle}>{rowData.replyBy.nickname}</Text>
                    <Text style={styles.replyContentStyle}>{rowData.content}</Text>
                </View>
            </View>
        );
    }
    // 恢复播放
    resumePlayer(){
        if (this.state.paused) {
            this.setState({
                paused:false
            })
        }
    }
    // 暂停播放
    onPause(){
        if (!this.state.paused) {
            this.setState({
                paused:true
            })
        }
    }
    // 重新播放
    onPlay(){
        this.refs.videoPlayer.seek(0);
    }
    // 开始加载
    onLoadStart(){
        console.log('onLoadStart');
    }
    // 正在加载
    onLoad(data){
        this.setState({duration: data.duration});
    }
    // 进度条
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
    // 视频结束
    onEnd(){
        console.log('onEnd');
        // 当结束的时候暂停播放
        this.setState({
            currentTime:this.state.duration,
            isPlay:false,
        });
    }
    // 视频出错
    onError(error){
        console.log(error);
        this.setState({
            isVideoOk:true
        });
    }
    // 进度条调用的方法
    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        } else {
            return 0;
        }
    }
    // 返回首页
    popToHome(){
        InteractionManager.runAfterInteractions(()=>{
            var currentRoute = this.props.navigator.getCurrentRoutes();
            for(var i = 0 ; i <currentRoute.length ; i ++){
                if (currentRoute[i].name == 'list'){
                    this.props.navigator.popToRoute(currentRoute[i]);
                }
            }
        });
    }

    render() {
        let rowData = this.state.rowData;
        var titleConfig = {
            title: rowData.title,
            style: {color:'black',fontSize:20,fontWeight:'600'}
        };
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
        return (
            <View style={{backgroundColor:'white',flex:1}}>
                {/*导航条*/}
                <NavBar
                    title={titleConfig}
                    style={{height:44,borderBottomWidth:1,borderBottomColor:'#dddddd'}}
                    leftButton={
                        <LeftNavBtn
                            popToHome ={() => this.popToHome()}
                        />
                    }
                />
                {/*顶部的视频播放器*/}
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

                    {/*视频播放完成,显示一个重新播放的按钮*/}
                    {this.state.isVideoLoad && !this.state.isPlay ?
                        <Icon
                            name="ios-play"
                            size={45}
                            style={styles.playStyle}
                            onPress={this.onPlay}
                        />
                        :null}
                    {/*视频的暂停和播放*/}
                    {this.state.isVideoLoad && this.state.isPlay ?
                        <TouchableOpacity
                            onPress={this.onPause}
                            style={styles.pauseStyle}
                        >
                            {this.state.paused ?
                                <Icon
                                    name="ios-play"
                                    size={45}
                                    style={styles.playStyle}
                                    onPress={this.resumePlayer}
                                />
                                :null}
                        </TouchableOpacity>
                        :null}
                    {/*视频如果出错,提示信息*/}
                    {this.state.isVideoOk && !this.state.isPlay ?
                        <Text style={styles.videoOKStyle}>视频出错啦!</Text>
                        :null}

                    {/*进度条*/}
                    <View style={styles.progress}>
                        <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]} />
                        <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]} />
                    </View>

                </View>
                {/*作者信息,用户评论*/}
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    style={styles.listStyle}
                    enableEmptySections={true}
                    automaticallyAdjustContentInsets={false}
                    onEndReachedThreshold={20}
                    onEndReached={this.loadMoreData}
                    renderFooter={this.renderFooter}
                    renderHeader={this.renderHeader}
                />

                <Modal
                    animationType={this.state.animationType}
                    transparent={this.state.transparent}
                    visible={this.state.modalVisible}
                    // 关闭
                    onRequestClose={() => {
                        this.setModalVisible(false)
                    }}
                    // 开启
                    onShow={this.startShow}
                >
                    {/*模态的视图*/}
                    <View style={styles.modalContainer}>
                         <Icon
                             name="ios-close-outline"
                             size={45}
                             onPress={this.closeModal}
                             style={styles.closeIcon}
                         />
                        <View style={styles.commentStyle}>
                            <View style={styles.commentView}>
                                <TextInput
                                    placeholder='评论一下咯'
                                    style={styles.textInputStyle}
                                    // 多行
                                    multiline={true}
                                    defaultValue={this.state.content}
                                    onChangeText={(text)=>{
                                        this.setState({
                                            content:text
                                        })
                                    }}
                                    onFocus={this.onFocus}
                                    onBlur={this.onBlur}
                                />
                            </View>
                            <Button
                                style={styles.submitButtonStyle}
                                onPress={this.submitButton}
                            >
                                评论一下
                            </Button>
                        </View>
                    </View>
                </Modal>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    videoViewStyle:{
        width:width,
        height:240,
        backgroundColor:'white',

    },
    videoStyle:{
        width:width,
        height:230,
        backgroundColor:'black'
    },
    loadStyle: {
        marginVertical:20,
        position:'absolute',
        left:0,
        width:width,
        top:90,
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
        top:90,
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
    // 暂停按钮Style
    pauseStyle:{
        position:'absolute',
        top:0,
        left:0,
        width:width,
        height:230
    },
    // 视频是否正确
    videoOKStyle:{
        position:'absolute',
        left:0,
        width:width,
        top:125,
        backgroundColor:'transparent',
        textAlign :'center',
        color:'white',
        fontSize:18
    },
    // 作者信息
    infoStyle:{
        flexDirection:'row',
        width:width,
        justifyContent:'center',
    },
    // 头像
    avatarStyle:{
        height:60,
        width:60,
        borderRadius:30,
        margin:8
    },
    // 作者简介
    descStyle:{
        flex:1
    },
    // 昵称
    nickNameStyle:{
        fontSize:18,
        marginTop:13,
        marginLeft:10,
    },
    // 视频标题
    titleStyle:{
        marginTop:6,
        marginLeft:10,
        fontSize:16,
        color:'#666666'
    },
    // 评论View
    replyStyle:{
        flexDirection:'row',
        width:width,
        justifyContent:'flex-start',
    },
    // 评论人头像
    replyAvatarStyle:{
        height:40,
        width:40,
        borderRadius:20,
        margin:8
    },
    // 评论人简介
    replyDescStyle:{
        flex:1
    },
    // 评论人昵称
    replyNickNameStyle:{
        fontSize:18,
        marginTop:13,
        marginLeft:10,
        color:'red'
    },
    // 评论
    replyContentStyle:{
        marginTop:4,
        color:'blue',
        marginLeft:10
    },
    // 加载更多
    loadMoreStyle:{
        marginVertical:20,
        alignItems :'center',
        justifyContent:'center'
    },
    // 加载更多文字
    loadMoreTextStyle:{
        fontSize:18,
        color:'#777',
        alignItems :'center',
        justifyContent:'center'
    },
    // list的header
    listHeaderStyle:{
        marginTop:10,
        width:width
    },
    // 评论那个框
    commentStyle :{
        marginTop:6,
        padding:8,
        width:width
    },
    // 顶部输入框外层View
    commentView: {
        borderWidth:1,
        borderColor:'#ddd',
        borderRadius:4,
    },
    // 输入框
    textInputStyle:{
        paddingLeft:4,
        color:'#333',
        borderWidth:1,
        borderColor:'#ddd',
        borderRadius:4,
        fontSize:14,
        height:50,
    },
    // 精彩评论外层
    commentArea:{
        width:width,
        paddingBottom:6,
        paddingLeft:10,
        paddingRight:10,
        borderBottomColor:'#eee',
        borderBottomWidth:1,

    },
    // 精彩评论文字
    commentTextStyle:{
        fontSize:15,
        color:'red'
    },
    // 弹出页面的样式
    modalContainer:{
        flex:1,
        paddingTop:45,
        backgroundColor:'white'
    },
    // 关闭按钮样式
    closeIcon:{
        fontSize:30,
        margin:10,
        color:'black',
    },
    // 提交按钮样式
    submitButtonStyle:{
        width:width-20,
        padding:16,
        marginTop:20,
        borderWidth:1,
        borderColor:'red',
        borderRadius:4,
        color:'blue',
        fontSize:18
    }

});