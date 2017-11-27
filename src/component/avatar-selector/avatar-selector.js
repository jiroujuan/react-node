import React from "react";
import { Grid, List } from "antd-mobile"
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component{

    /* 要求页面必须参数必须传递selectAvatar这个参数，参数类型必须是func否则会报错 */
    static propTypes = {
        selectAvatar: PropTypes.func.isRequired
    }
    constructor(props){
        super(props)
        this.state= {}
    }
    render(){
        const avatarList = 'girl,boy,woman,man,bull,chick,hippopotamus,crab,hedgehog,koala,lemur,pig,tiger,whale,zebra'
                           .split(',').map(v=>({
                               icon:require(`../img/${v}.png`),
                               text:v
                           }))
        const gridHandle = this.state.icon?(
            <div>
                <span>已经选择头像</span>
                <img src={this.state.icon} alt="" style={{width:20}}/>
            </div>
        ): <div>请选择头像 </div>
        return (
            <div>
                <List renderHeader={() => gridHandle}>
                    <Grid data={avatarList}
                        columnNum={5}
                        onClick={elm => {
                            this.setState(elm)
                            this.props.selectAvatar(elm.text)
                        }}
                    />
                </List>
            </div>
        )
    }
}

export default AvatarSelector