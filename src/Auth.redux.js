import axios from "axios";
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const USER_DATA = 'USER_DATA'

const oState = {
    isAuth: false, 
    user: '李云龙'
}
export function auth(state = oState, action) {
    console.log(state, action);
    switch (action.type) {
        case LOGIN:
            return { ...state, isAuth: true }
        case LOGOUT:
            return { ...state, isAuth: false }
        case USER_DATA:
            return { ...state, name: action.payload.name}
        default:
            return state;
    }
}
export function getUserData() {
    // dispatch用来通知数据修改
    return dispatch => {
        axios.get('/data').then(
            res=>{
                if (res.status ===200)
                {
                    dispatch(userData(res.data))
                }
            }
        )
    }
}

export function userData(data) {
    return { type: USER_DATA ,payload:data}
}
export function login(params) {
    return { type: LOGIN }
}

export function logout(params) {
    return { type: LOGOUT }
}