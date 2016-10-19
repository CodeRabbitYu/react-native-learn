/**
 * Created by SLPower on 2016/10/7.
 */
import React from 'react';
import {
    AppRegistry,
    Navigator,
    View,
    StyleSheet,
    Text,
    Image,
} from 'react-native';

import Root from '../Base/Root';

export default class App extends React.Component {
    render(){
        return(
            <View style={{ flex: 1 }}>
                <Navigator
                    initialRoute={{ name: 'Root', component: Root }}
                    style={{height:64}}
                    configureScene={(route) => {
                        if (route.sceneConfig) {
                            return route.sceneConfig;
                        }
                        return Navigator.SceneConfigs.PushFromRight;
                    } }
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return (
                            <Component navigator = {navigator} route = {route} {...route.passProps} />
                        )
                    } }
                />
            </View>
        )
    }
}