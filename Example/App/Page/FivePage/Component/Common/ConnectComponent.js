/**
 * 作者：paozi
 * 创建：2016/10/16
 * 修改：
 * 描述：容器连接
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../Actions/Index';


const options = {
	withRef: true
};


export default function connectComponent({ mapStateToProps, mapDispatchToProps, mergeProps, LayoutComponent }) {
	return connect(
		mapStateToProps || function (state) {
			return {};
		},
		mapDispatchToProps || function (dispatch) {
			return {
				actions: bindActionCreators(actions, dispatch)
			}
		},
		mergeProps,
		options
	)(LayoutComponent);
}
