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
        imageUrlArr : [],
        title:'',
        pubDate: '',
    };

    renderImage(){
        let imageArr = this.props.imageUrlArr;

        if (imageArr.length == 0){
            return(
                <TouchableOpacity activeOpacity={0.5} onPress={this.props.pushPage}>
                    <View style={styles.viewStyle}>
                        <Text style={styles.titleStyle} numberOfLines={2}>{this.props.title}</Text>
                        <Text style={styles.dateStyle} numberOfLines={2}>{this.props.pubDate}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        if(imageArr.length == 1){
            return(
                <TouchableOpacity activeOpacity={0.5} onPress={this.props.pushPage}>
                    <View style={styles.oneViewStyle}>
                        <View style={styles.oneImageStyle}>
                            <Image source={{uri:imageArr[0]['url']}} style={[styles.imageStyle,{height:80,width:80}]} />
                        </View>
                        <Text style={[styles.titleStyle,{width:width - 120,margin:5}]} numberOfLines={2}>{this.props.title}</Text>
                        <Text style={styles.dateStyle} numberOfLines={2}>{this.props.pubDate}</Text>
                    </View>
                </TouchableOpacity>

        )
        }
        if(imageArr.length == 2){
            return(
                <TouchableOpacity activeOpacity={0.5} onPress={this.props.pushPage}>
                    <View style={styles.twoViewStyle}>
                        <Text style={[styles.titleStyle,{marginLeft:5}]} numberOfLines={2}>{this.props.title}</Text>
                        <View style={styles.twoImageStyle}>
                            <Image source={{uri:imageArr[0]['url']}} style={[styles.imageStyle,{width:width/2-7,marginLeft:5}]} />
                            <Image source={{uri:imageArr[1]['url']}} style={[styles.imageStyle,{width:width/2-7,marginLeft:5}]} />
                        </View>
                        <Text style={styles.dateStyle} numberOfLines={2}>{this.props.pubDate}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        if(imageArr.length >= 3){
            return(
                <TouchableOpacity activeOpacity={0.5} onPress={this.props.pushPage}>
                    <View style={styles.threeViewStyle}>
                        <Text style={[styles.titleStyle,{marginLeft:5}]} numberOfLines={2}>{this.props.title}</Text>

                        <View style={styles.threeImageStyle}>
                            <Image source={{uri:imageArr[0]['url']}} style={[styles.imageStyle,{width:width/3-7,marginLeft:5}]} />
                            <Image source={{uri:imageArr[1]['url']}} style={[styles.imageStyle,{width:width/3-7,marginLeft:5}]} />
                            <Image source={{uri:imageArr[2]['url']}} style={[styles.imageStyle,{width:width/3-7,marginLeft:5}]} />
                        </View>
                        <Text style={styles.dateStyle} numberOfLines={2}>{this.props.pubDate}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderImage()}
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
    imageStyle:{
        width:100,
        height:70,
        // resizeMode:'cover',

    },
    titleStyle:{
        fontSize:18,
    },
    viewStyle:{
        // margin:10
        height:80,
        margin:5
    },
    oneViewStyle:{
        flexDirection:'row',
        height:90,
    },
    twoViewStyle:{
        height:135,
        marginTop:5
    },
    threeViewStyle: {
        height:135,
        marginTop:5
    },
    oneImageStyle:{
        margin:5
    },
    dateStyle: {
        position:'absolute',
        bottom:2,
        right:5,
    },
    twoImageStyle:{
        flexDirection:'row',
        position:'absolute',
        bottom:20
    },
    threeImageStyle: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20
    },
    lineStyle:{
        height:1,
        backgroundColor:'#dddddd',
    },

});

