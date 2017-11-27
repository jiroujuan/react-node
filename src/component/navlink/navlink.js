import React from "react"
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

/* 因为TabBar不是路由组件，如果需要使用props.location和跳转则需要自己加载withRouter组件来使用 */
@withRouter
class NavLinkBar extends React.Component {
    /* 要求页面必须参数必须传递selectAvatar这个参数，参数类型必须是func否则会报错 */
    static propTypes = {
        data: PropTypes.array.isRequired
    }
    render() {
        const navList = this.props.data.filter(v => !v.hide)
        const { pathname } = this.props.location
        return (
            <TabBar>
                {navList.map(v => (
                    <TabBar.Item
                        key={v.path}
                        title={v.text}
                        icon={{ uri: require(`./img/${v.icon}.png`) }}
                        selectedIcon={{ uri: require(`./img/${v.icon}-active.png`) }}
                        selected={pathname === v.path}
                        onPress={() => {
                            this.props.history.push(v.path)
                        }}
                    >

                    </TabBar.Item>
                ))}
            </TabBar>
        )
    }
}

export default NavLinkBar