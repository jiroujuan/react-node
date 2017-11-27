import React from "react";
import { connect } from "react-redux"
import axios from "axios";
import { getUserList } from "../../redux/chatuser.redux"
/* HTML标签首字母需要大写要不会报错 */
import UserCard from "../usercard/usercard"

@connect(
    state => state.chatuser,
    { getUserList }
)
class Genius extends React.Component {
    componentDidMount() {
        this.props.getUserList('boss')
    }
    render() {
        return (
            <UserCard userList = {this.props.userList}></UserCard>
        )
    }
}

export default Genius