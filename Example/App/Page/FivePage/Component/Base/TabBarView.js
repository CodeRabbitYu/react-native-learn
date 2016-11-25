/**
 * Created by SLPower on 16/9/10.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import News from '../Page/News/News';
import Main from '../Page/Main/Main';
const tabBarItems = [
    { title: '新闻', icon: () => <Image style={{ width: 30, height: 30 }} source={require('../Resource/news-normal.png')} />,
        selectedIcon: () => <Image style={{ width: 30, height: 30 }} source={require('../Resource/news-selected.png')} />
        ,component: News },
    { title: '我的', icon: () => <Image style={{ width: 30, height: 30 }} source={require('../Resource/main-normal.png')} />,
        selectedIcon: () => <Image style={{ width: 30, height: 30 }} source={require('../Resource/main-selected.png')} />,
        component: Main },
    // { title: '关于', icon: () => <Image style={{ width: 30, height: 30 }} source={require('./imgs/me.png') }/>, Component: HomeContainer },
]

export default class TabBarView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: tabBarItems[0].title,
        };
    }
    render(){
        return(
            <TabNavigator tabBarStyle={{height:49}}>
                {
                    tabBarItems.map((controller,i) => {
                        let Component = controller.component;
                        return(
                            <TabNavigator.Item
                                key={i}
                                selected = {this.state.selectedTab === controller.title}
                                title = {controller.title}
                                renderIcon = {controller.icon}
                                renderSelectedIcon = {controller.selectedIcon}
                                onPress={() => this.setState({selectedTab:controller.title})}
                                titleStyle={{color:'#333',fontSize:12}}
                                selectedTitleStyle={{color:'rgb(251,33,33)'}}
                                allowFontScaling={true}
                            >
                                <Component navigator = {this.props.navigator} {...this.props} />
                            </TabNavigator.Item>
                        )
                    })
                }
            </TabNavigator>
        )
    }
}


