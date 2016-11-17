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
                <Text style={styles.welcome}>
                    我是react-native页面
                </Text>


                <PushButton
                    style={{width:100,height:100}}
                    />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'red',
    },
    welcome: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
    },
    pushButtonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width:100,
        height:100,
        // backgroundColor:'blue',
        alignSelf:'center',
        marginTop:150
    },
});

AppRegistry.registerComponent('Three', () => Three);