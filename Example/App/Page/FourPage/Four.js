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
    View
} from 'react-native';
import NavBar from 'react-native-navbar';
import LeftNavBtn from '../../Base/Component/leftNavBtn'


export default class Four extends Component {
    // 组件加载完成
    render() {
        var titleConfig = {
            title: '生命周期',
            style: {color:'black',fontSize:18,fontWeight:'500'}
        };
        return (
            <View style={styles.container}>
                <NavBar
                    title={titleConfig}
                    style={{height:44,borderBottomWidth:1,borderBottomColor:'#dddddd'}}
                    leftButton={
                        <LeftNavBtn
                            onPress={()=>this.popToHome()}
                        />
                    }
                />
                <Detail />
            </View>
        );
    }
    popToHome(){
        this.props.navigator.popToTop();
    }
}

class Detail extends Component {
    // 组件要不要更新
    shouldComponentUpdate() {
        console.log('shouldComponentUpdate','组件要不要更新');
        return true;
    }
    // 组件将要更新
    componentWillUpdate(){
        console.log('componentWillUpdate','组件将要更新');
    }

    // 即将拿到组件的更新
    componentWillReceiveProps(props) {
        console.log('componentWillReceiveProps',props);
    }

    // 组件已经更新
    componentDidUpdate() {
        console.log('componentDidUpdate','组件更新完成');
    }

    // 组件将要加载
    componentWillMount() {
        console.log('componentWillMount','组件将要加载');
    }

    // 在调用render之后,组件已经加载
    componentDidMount() {
        console.log('componentDidMount','组件加载完成');
    }
    // 组件初始之前的值
    static defaultProps = {
        number : 1
    };
    // 组件初始的值
    constructor(props){
        console.log(props,'组件初始之前的值');
        super(props);
        this.state = {
            number : this.props.number
        };
        console.log(this.state.number,'state初始的值');
    }
    render() {
        console.log('render','组件加载');
        return (
            <View style={styles.container}>
                <Text onPress={this.onTextClick.bind(this)} style={styles.TextStyle}>点击我呀!</Text>
                <Text style={styles.TextStyle}>{this.state.number}</Text>
                <Text style={[styles.TextStyle,{fontSize:18}]}>(主要看控制台打印哦~)</Text>
            </View>
        );
    }
    onTextClick(){
        var number =  this.state.number;
        number ++;
        this.setState({
            number:number
        })
        console.log(this.state.number,'state变更的值');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    TextStyle : {
        alignItems:'center',
        justifyContent: 'center',
        alignSelf:'center',
        height:50,
        marginTop:10,
        fontSize:20,
    }
});

AppRegistry.registerComponent('Example', () => Four);