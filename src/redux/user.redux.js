import axios from "axios";

import { getRedirectPath } from "../util";
const ERROR_MSG = "ERROR_MSG"
const AUTH_SUCCESS = "AUTH_SUCCESS"
const LOAD_DATA = "LOAD_DATA"
const LOGOUT = "LOGOUT"

const initState = {
    redirectTo:'',
    isAuth: false,
    msg: '',
    usr: '',
    pwd: '',
    type: ''
}
export function user(state = initState, action) {
    console.log(action);
    switch (action.type) {
        case AUTH_SUCCESS:
            return { ...state, redirectTo: getRedirectPath(action.payload), msg: '', ...action.payload };
        case LOAD_DATA:
            return { ...state, ...action.payload}
        case ERROR_MSG:
            return { ...state, isAuth: false, msg: action.msg};
        case LOGOUT:
            return { ...initState, redirectTo:'/login'}
        default:
            return state
    }
    return state
}

function authSuccess(obj) {
    const { pwd, ...data } = obj
    return { type: AUTH_SUCCESS, payload: data }
}


export function loadData(userinfo) {
    return { type: LOAD_DATA, payload: userinfo }
}

export function logoutSubmit() {
    return {type: LOGOUT}
}

function errMsg(msg) {
    return { type: ERROR_MSG, msg: msg }
}



export function login({user,pwd}) {
    if (!user || !pwd )
    {
        return errMsg("用户名或密码错误");
    }
    return dispatch=>{
        axios.post('/user/login', { user, pwd})
        .then(res=>{
            if ((200 === res.status) && ( 0 === res.data.code)){
                dispatch(authSuccess(res.data.data))
            }
            else{
                dispatch(errMsg(res.data.msg))
            }
        })
    }
}

export function register({ user, pwd, repeatpwd, type }) {
    if (!user || !pwd || !type) {
        return errMsg("用户必须输入用户名和密码");
    }
    if (pwd !== repeatpwd) {
        return errMsg("密码和确认密码同");
    }
    /* 因为是个异步的请求，所以要用到trunk的那个插件支持redux 异步操作 */
    return dispatch=>{
        axios.post('/user/register', { user, pwd, type })
            .then(res=>{
                if ((200 === res.status) && (0 === res.data.code)) {
                    dispatch(authSuccess({ user, pwd, type }))
                }
                else {
                    dispatch(errMsg(errMsg(res.data.msg)))
                }
            })
    }
    
}

export function update(data) {
    return dispatch=>{
        axios.post('/user/update',data)
        .then(res=>{
            if ((200===res.status)&& (0 === res.data.code)){
                dispatch(authSuccess(res.data.data))
            }
            else{
                dispatch(errMsg(res.data.msg))
            }
        })
    }
}


