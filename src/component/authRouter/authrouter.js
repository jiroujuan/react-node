import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {loadData} from "../../redux/user.redux"

/* 因为我们withRouter这个组件并不是一个路由组件所以this.props.history是一个undefined 
所以我们需要使用router4里面的withRouter包裹一下整个组件
*/
@withRouter
@connect(null,
    { loadData })
/* 判断用户信息并跳转的地方 */
class AuthRoute extends React.Component {
    componentDidMount() {
        const publicList = ['/login', '/register']
        const pathname = this.props.location.pathname
        if (publicList.indexOf(pathname) > -1) {
            return null
        }
        axios.get('./user/info').
            then(res => {
                if (200 === res.status) {
                    console.log(res.data)
                    if (0 === res.data.code) {
                        /* 说明有登录信息 */
                        this.props.loadData(res.data.data)
                    }
                    else {
                        /* 跳转到login页面 */
                        this.props.history.push('./login');
                    }
                }
            })
    }
    render() {
        return null
    }
}

export default AuthRoute
