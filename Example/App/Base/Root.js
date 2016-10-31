/**
 * Created by SLPower on 2016/10/7.
 */
import React from 'react';
import {
    AppRegistry,
    View,
    StyleSheet,
    Text,
    Platform,
    Image,
    ListView,
    TouchableOpacity,
    InteractionManager,
    NativeModules
} from 'react-native';

var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');

import NavBar from 'react-native-navbar';
import Time from '../Page/OnePage/One';
import Baby from '../Page/TwoPage/Two';
var Push = NativeModules.PushNative;

export default class Root extends React.Component {

    componentDidMount() {
        this.loadJsonData();
    }

    loadJsonData(){
        this.setState({
            // cell的数据源
            dataSource: this.state.dataSource.cloneWithRows(this.state.days),
        });

    }

    constructor(props){
        super(props);
        const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource,
            days: [{
                key: 1,
                title: "计时器",
                icon: "闹钟",
                component: Time
            },{
                key : 2,
                title : "宝宝秀",
                icon: "宝宝",
                component: Baby
            },{
                key : 3,
                title : "跳转",
                icon: "跳转",
                component: Push
            }],
                exclude: "node_modules"
        }

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData,rowID,sectionID)=>this.renderRow(rowData,rowID,sectionID)}
                    contentContainerStyle={styles.contentViewStyle}
                    automaticallyAdjustContentInsets={true}
                    style={{marginTop:64}}
                />
            </View>
        )
    }

    renderRow(rowData,rowID,sectionID){
        //利用map做了遍历布局,可以在以后使用
        // var onThis = this;
        // var days = DemoJson.days.map(function(elem, index){
        //     return(
        //         <TouchableOpacity key={elem.key} onPress={()=> onThis.jumpToDay(index)}>
        //              <Image source={{uri:rowData.icon}} style={{width:width/4,height:width/4}} />
        //              <Text style={{textAlign:'center'}}>{rowData.title}</Text>
        //         </TouchableOpacity>
        //     );
        // });
        // return(
        //     <View>{days}</View>
        // )

        return(
            <View style={{width:width/4,height:width/4+10}}>
                <TouchableOpacity
                    onPress={()=>this.jumpToDay(sectionID)}>
                    <Image source={{uri:rowData.icon}} style={{width:width/4-10,height:width/4-10,resizeMode:'cover'}} />
                    <Text style={{textAlign:'center'}}>{rowData.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    jumpToDay(index){
        if(index == 2){
            console.log(index);
            Push.RNOpenOneVC('测试');
        }else {
            var days = this.state.days[index];
            let {navigator} = this.props;
            if (navigator) {
                InteractionManager.runAfterInteractions(()=> {
                    navigator.push({
                        title: days.title,
                        index: index + 1,
                        component: days.component
                    })
                });
            }
        }
    }

}

const styles = StyleSheet.create({
    contentViewStyle: {
        // 多个cell再同一行显示
        flexWrap: 'wrap',
        // 设置主轴方向
        flexDirection: 'row',
        alignItems: 'center',
        width: width
    },
})