import React from "react";
import {connect} from "react-redux"
import { List, InputItem, WingBlank, WhiteSpace, Button } from "antd-mobile"
import {Redirect} from "react-router-dom"
import Logo from '../../component/logo/logo'
import { login } from "../../redux/user.redux"
import '../../index.css'

@connect(
    state=>state.user,
    { login }
)
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:"",
            pwd:""
        }
        this.register = this.register.bind(this)
        this.handlelogin = this.handlelogin.bind(this)
    }
    /* 将输入框变化的值设置到setState里面去 */
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    register() {
        console.log(this.props)
        this.props.history.push('/register')
    }
    handlelogin(){
        this.props.login(this.state)
    }
    render() {
        return (
            <div>
                <Logo></Logo>
                {this.props.redirectTo && this.props.redirectTo !='/login'? <Redirect to = {this.props.redirectTo}/>:null}
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                        <InputItem 
                            onChange={v => this.handleChange("user", v)}
                        >用户</InputItem>
                        <WhiteSpace />
                        <InputItem
                            onChange={v => this.handleChange("pwd", v)}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button onClick={this.handlelogin} type='primary'>登录</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login