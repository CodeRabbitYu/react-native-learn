/**
 * Created by SLPower on 2016/10/10.
 */
import React from 'react';
import {
    AppRegistry,
    Navigator,
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    StatusBar,
    ListView,
    InteractionManager
} from 'react-native';
import Util from '../../Base/Component/Util';
import NavBar from 'react-native-navbar';
import LeftNavBtn from '../../Base/Component/leftNavBtn'

export default class Time extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            number:0,
            text:0,
            startBtnText:'开始',
            startBtnColor: "green",
            stopBtnText:'计次',
            underlayColor:"#eee",
            watchOn: false,
            recordCounter: 0,
            record:[
                {title:"",time:""},
                {title:"",time:""},
                {title:"",time:""},
                {title:"",time:""},
                {title:"",time:""},
                {title:"",time:""},
                {title:"",time:""}
            ],
        };
    }


    static defaultProps = {
        // 每隔多少时间
        duration:1000,
    };

    // 实现一些复杂的操作
    componentDidMount() {
        // 设置通知栏是否隐藏,0不隐藏,1隐藏
        StatusBar.setBarStyle(0);

        // 开启定时器
        // this.startTimer();
    };
    // 开启定时器
    startBegin(){
        // 1.添加定时器
        this.setIntervar = setInterval(()=>{
            var number = ++this.state.number;
            //2.3更新状态机
            this.setState({
                number:number
            });
        },this.props.duration)
    }
    // 关闭定时器
    stopTimer(){
        this.setIntervar && clearInterval(this.setIntervar);
    }

    render(){
        var titleConfig = {
            title: '计时器',
            style: {color:'red',fontSize:18}
        };
        return(
            <View style={{flex:1,backgroundColor:'#f7f7f7',
                }}>
                {/*popToHome ={() => this.popToHome()}*/}

                <NavBar
                    title={titleConfig}
                    style={{height:44,borderBottomWidth:1,borderBottomColor:'#dddddd'}}
                    leftButton={
                        <LeftNavBtn
                            onPress={()=>this.popToHome()}
                        />
                    }
                />
                <View style={styles.topViewStyle}>
                    <View>
                        <TextInput
                            style={styles.inputsStyle}
                            //清除按钮
                            clearButtonMode={'always'}
                            //占位文字
                            placeholder={"请输入启动时间"}
                            //键盘
                            onChangeText={(text) => this.textChange(text)}
                            enablesReturnKeyAutomatically={true}
                        />
                        <TouchableOpacity
                            style={styles.submitStyle}
                            onPress={()=>this.renderSubmit()}
                        >
                            <Text style={{textAlign:'center',marginRight:50,fontSize:20}}>提交</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.textStyle}>{this.state.number}</Text>
                </View>
                <View style={{flexDirection:'row',backgroundColor:'white'}}>
                    <View style={styles.btnViewStyle}>
                        <TouchableOpacity
                            onPress={()=>this.stopNumber()}
                            style={styles.btnStyle}
                        >
                            <Text style={[styles.btnTextStyle,{color:'gray'}]}>{this.state.stopBtnText}</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.btnViewStyle}>
                        <TouchableOpacity
                            onPress={()=>this.startTimer()}
                            style={[styles.btnStyle,{backgroundColor:'white'}]}
                        >
                            <Text style={[styles.btnTextStyle,{color:this.state.startBtnColor}]}>{this.state.startBtnText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <WatchRecord record={this.state.record}></WatchRecord>
            </View>
        )
    }

    popToHome(){
        InteractionManager.runAfterInteractions(()=>{
            var currentRoute = this.props.navigator.getCurrentRoutes();
            for(var i = 0 ; i <currentRoute.length ; i ++){
                if (currentRoute[i].name == 'Root'){
                    this.props.navigator.popToRoute(currentRoute[i]);
                }
            }
        });
    }

    renderSubmit(){
        var text = this.state.text;

        if (text==0){
            this.setState({
                number:0
            })
        }else {
            this.setState({
                number: this.state.text
            })
        }
    }

    startTimer(){
        console.log(111)
        // this.startBegin();
        if (!this.state.watchOn) {
            // this.props.startWatch();
            this.startBegin();
            this.setState({
                startBtnText: "停止",
                startBtnColor: "#ff0044",
                stopBtnText: "计次",
                underlayColor:"#eee",
                watchOn: true
            })
        }else{
            // this.props.stopWatch()
            this.stopTimer();
            this.setState({
                startBtnText: "启动",
                startBtnColor: "#60B644",
                stopBtnText: "复位",
                underlayColor:"#eee",
                watchOn: false,
            })
        }
    }

    stopNumber(){
        let {recordCounter, record} = this.state;
        recordCounter++;
        if (recordCounter<8) {
            record.pop();
        }
        record.unshift({title:"计次"+recordCounter,time:this.state.number});

        if (this.state.watchOn) {
            // alert(this.state.watchOn)

            this.setState({
                record:record
            })

        }else{
            this.setState({
                stopBtnText: "计次",
                number:10
            })
        }
    }


    textChange(text){
        if(/^[0-9]+$/.test(text)){
            this.setState({
                text:text
            })
        }else {
            alert('请输入数字');
            this.setState({
                text:0
            })
        }
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.setIntervar && clearInterval(this.setIntervar);
    }
}

class WatchRecord extends React.Component {
    static propTypes = {
        record: React.PropTypes.array.isRequired,
    };
    render(){
        let ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
        theDataSource = ds.cloneWithRows(this.props.record);
        return(
            <ListView
                style={styles.recordList}
                dataSource={theDataSource}
                renderRow={(rowData) =>
                    <View style={styles.recordItem}>
                        <Text style={styles.recordItemTitle}>{rowData.title}</Text>
                        <View style={{alignItems: "center"}}>
                            <Text style={styles.recordItemTime}>{rowData.time}</Text>
                        </View>
                    </View>}
            />
        )
    }
}



const styles = StyleSheet.create({
    topViewStyle:{
        height:100,
        backgroundColor:'white',
        flexDirection:'row',
    },
    submitStyle:{
        width:Util.size.width/2,

    },
    inputsStyle:{
        width:Util.size.width/2,
        height:60,
    },
    textStyle:{
        height:100,
        width:Util.size.width/2,
        fontSize:30,
        textAlign:'center',
        padding:30
    },
    btnTextStyle: {
        textAlign:'center',
        marginTop:50,
        fontSize:17,
    },
    btnViewStyle:{
        width:Util.size.width/2,
        height:Util.size.width/2,
        backgroundColor:'#f7f7f7'
    },
    btnStyle:{
        width:Util.size.width/2- 70,
        height:Util.size.width/2 - 70,
        backgroundColor:'white',
        borderRadius:300,
        margin:30
    },
    recordList:{
        width: Util.size.width,
        height: Util.size.height - 300,
        paddingLeft: 15,
    },
    recordItem:{
        height: 40,
        borderBottomWidth:Util.pixel,borderBottomColor:"#bbb",
        paddingTop: 5, paddingLeft: 10, paddingRight:10, paddingBottom:5,
        flexDirection:"row",
        alignItems:"center"
    },
    recordItemTitle:{
        backgroundColor:"transparent",
        flex:1,
        textAlign:"left",
        paddingLeft:20,
        color:"#777"
    },
    recordItemTime:{
        backgroundColor:"transparent",
        flex:1,
        textAlign:"right",
        paddingRight:20,
        color:"#222"
    },

});