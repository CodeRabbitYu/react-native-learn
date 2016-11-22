/**
 * Created by SLPower on 2016/11/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    NativeModules
} from 'react-native';

import PushButton from './PushButton';

class PageOne extends Component {

    render() {

        return(
            <View style={{justifyContent: 'center',alignItems: 'center',marginTop:100}}>
                <Text style={styles.welcome}>这是页面一！</Text>
            </View>
        );
    }
}

export default class Three extends Component {

    // 组件要不要更新
    shouldComponentUpdate() {
        return true;
    }
    // 组件将要更新
    componentWillUpdate(){

    }

    // 组件已经更新
    componentDidUpdate() {

    }

    // 组件将要加载
    componentWillMount() {

    }

    // 在调用render之后,组件已经加载
    componentDidMount() {

    }

    // 组件加载
    render() {
        // var  { launchOptions }  = this.props;
        // if (launchOptions && launchOptions.componentName) {
        //     switch (launchOptions.componentName) {
        //         case 'PageOne':
        //             return(
        //                 <PageOne/>
        //             );
        //             break;
        //         default:
        //
        //     }
        // }
        return (
            <View style={styles.container}>


                <PushButton
                    style={styles.buttonStyle}
                    btnTitle="我是原生按钮呦！"
                    onButtonClicked={(event) => {
                        console.log('React事件' + event.nativeEvent.randomValue);
                    }}
                    />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonStyle:{
        width:200,
        height:100,
        backgroundColor:'red',
        alignSelf:'center',
        justifyContent: 'center',
        marginTop:100
    }
});

AppRegistry.registerComponent('Three', () => Three);