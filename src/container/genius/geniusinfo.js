import React from "react";
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import AvatarSelector from "../../component/avatar-selector/avatar-selector"
import { update } from "../../redux/user.redux"

@connect(
    state => state.user,
    { update }
)

class Geniusinfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            desc: '',
            company: '',
            money: ''
        }
    }
    onChange(key, value) {
        this.setState({
            [key]: value
        })
    }

    render() {
        const pathName = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {redirect && (redirect !== pathName) ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <NavBar
                    mode="dark"
                >大牛完善信息页面</NavBar>
                <AvatarSelector
                    selectAvatar={(imgname) => {
                        this.setState({
                            avatar: imgname
                        })
                    }}
                ></AvatarSelector>
                <InputItem onChange={(v) => this.onChange("title", v)}
                >求职岗位</InputItem>
                <InputItem onChange={(v) => this.onChange("money", v)}
                >期望薪资</InputItem>
                <TextareaItem
                    onChange={(v) => this.onChange("desc", v)}
                    rows={3}
                    autoHeight
                    title="个人简介"
                ></TextareaItem>
                <Button
                    onClick={() => {
                        this.props.update(this.state)
                    }}
                    type="primary">保存</Button>
            </div>
        )
    }
}

export default Geniusinfo