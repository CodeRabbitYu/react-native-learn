/**
 * Created by SLPower on 2016/12/1.
 */
import React from 'react';
import {connect} from 'react-redux';
import Home from '../Pages/News/News';

class HomeContainer extends React.Component {
    render() {
        return (
            <Home {...this.props} />
        )
    }
}

export default connect((state) => {
    const { Home } = state;
    return {
        Home
    }
})
(HomeContainer);