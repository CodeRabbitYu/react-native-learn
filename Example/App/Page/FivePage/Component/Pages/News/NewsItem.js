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
    View,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';

var {width, height} = Dimensions.get('window');

export default class NewsItem extends Component {
    static defaultProps = {
        contentObj: {},
    };

    constructor(props){
        super(props);
        this.state = {
            newText:'',
        }
    }
    picturePress(){
        return(
            <View style={{height:height,width:width,backgroundColor:'red'}}>
                <Text>2222</Text>
            </View>
        )
    }

    componentDidMount(){
        this.renderReplace();
    }
    // 处理文字
    renderReplace(){
        let text = this.props.contentObj.text;
        if (text.replace('\n')){
            text = text.replace('\n','');
            text = text.replace('\n','');
            text = text.replace('\n','');
            text = text.replace('\n','');
            text = text.replace('\n','');
        }
        this.setState({
            newText:text
        })
    }
    // 搞笑段子
    renderFunny(){
        return(
            <View>
                <Text style={styles.textStyle}>
                    {this.state.newText}
                </Text>
            </View>
        )
    }
    // 搞笑视频
    renderVideo(){
        return(
            <View>
                <Text style={styles.textStyle}>{this.state.newText}</Text>
                <Image source={{uri:this.props.contentObj.video_url}} style={{width:width,height:100,}} />
            </View>
        )
    }
    // 搞笑图片
    renderPicture(){
        return(
            <TouchableOpacity onPress={()=>this.picturePress()}>

            <View>
                <Text style={styles.textStyle}>{this.state.newText}</Text>
                <Image source={{uri:this.props.contentObj.image0}} style={{width:width,height:300,}} resizeMode='cover' />
            </View>
            </TouchableOpacity>

        )
    }
    // 搞笑声音
    renderMusic(){
        return(
            <View>
                <Text style={styles.textStyle}>
                    {this.state.newText}
                </Text>
            </View>
        )
    }

    // 全部cell
    renderCell(){
        //视频
        if (this.props.contentObj.type == '41'){
            return(
                <View>
                    {this.renderVideo()}
                </View>
            )
        }
        // 图片
        if (this.props.contentObj.type == '10'){
            return(
                <View>
                    {this.renderPicture()}
                </View>
            )
        }
        // 搞笑段子
        if (this.props.contentObj.type == '29'){
            return (
                <View>{this.renderFunny()}</View>
            )
        }
        // 声音
        if (this.props.contentObj.type == '31'){
            return(
                <View>
                    {this.renderMusic()}
                </View>
            )
        }

    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderCell()}
                <View style={styles.lineStyle} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        width:width,
        backgroundColor: 'white',

    },
    lineStyle: {
        backgroundColor:'#ddd',
        height:1,
        marginLeft:10,
        marginRight:10
    },
    textStyle: {
        fontSize:18,
        margin:10,
    }

});

