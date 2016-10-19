/**
 * Created by SLPower on 2016/10/11.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
class TestDemo extends Component {
    render() {


    var map = {
        "arrow": "62976",
        "checked": "62977",
        "checked-s": "62978",
        "tag-svip": "62995"
        };
    }
}
var map = {"arrow":"58885","checked":"58885","checked-s":"62978","tag-svip":"62995"};

module.exports = (name)=>String.fromCharCode(map[name]);
module.exports.map = map;