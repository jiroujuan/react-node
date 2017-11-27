import axios from "axios";

const USER_LIST = "USER_LIST"
const userListInit = {
    userList:[]
}

export  function chatuser(state = userListInit,action) {
    switch (action.type) {
        case USER_LIST:
            return { ...state, userList: action.payload};
    
        default:
            return state;
    }
}

function userList(data) {
    return { type: USER_LIST,payload:data}
}

export function getUserList(type){
    return dispath=>{
        axios.get('/user/list?type=' + type)
            .then(res => {
                if ((0 === res.data.code) && (200 === res.status)) {
                    dispath(userList(res.data.data))
                }
            })
    }
} 