

import React, { Component } from 'react';
import {connect} from 'react-redux';
import Home from '../pages/Home';

class HomeContainer extends Component {
    render(){
        return(
            <Home {...this.props} />
        )
    }
}

export default connect((state) => {
    const {Home} = state;
    return{
        Home
    }
})
(HomeContainer);