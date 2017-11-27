import React from "react";
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from "antd-mobile"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import {register} from "../../redux/user.redux"
import Logo from '../../component/logo/logo'
import '../../index.css'


@connect(
    state=>state.user,
    { register }
)

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: "",
            pwd: "",
            repeatpwd: "",
            type: "genius"
        }
        this.handleRegister = this.handleRegister.bind(this)
    }
    /* 将输入框变化的值设置到setState里面去 */
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    
    handleRegister() {
        this.props.register(this.state)
    }
    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo ? <Redirect to = {this.props.redirectTo} /> : null}
                <Logo></Logo>
                <List>
                    {this.props.msg?<p className = 'error-msg'>{this.props.msg}</p>:null}
                    <InputItem
                        onChange={v => this.handleChange("user", v)}
                    >用户</InputItem>
                    <WhiteSpace />
                    <InputItem
                        onChange={v => this.handleChange("pwd", v)}
                        type="password"
                    >密码</InputItem>
                    <WhiteSpace />
                    <InputItem
                        onChange={v => this.handleChange("repeatpwd", v)}
                        type="password"
                    >确认密码</InputItem>
                    <WhiteSpace />
                    <RadioItem
                        checked={this.state.type == 'genius'}
                        onChange={() => this.handleChange("type", "genius")}
                    >大牛
                    </RadioItem>
                    <WhiteSpace />
                    <RadioItem
                        checked={this.state.type == 'boss'}
                        onChange={() => this.handleChange("type", "boss")}
                    >Boss
                    </RadioItem>
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>
                </List>
            </div>
        )
    }
}

export default Register