import React from 'react';
/* 渲染页面用的组件 */
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

/* 用于多页面的跳转 router4组件*/
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'
/* 如果import是一个函数则需要加上花括号 */
import Login from './container/login/login'
import Register from './container/register/register'
import Bossinfo from './container/boss/bossinfo'
import Geniusinfo from './container/genius/geniusinfo'
import AuthRouter from './component/authRouter/authrouter'
import Dashboard from './component/dashboard/dashboard'
import reducers from './reducer'
import "./config"


// /* 用于加载redux调试工具 */
// const devToolsExtension = window.devToolsExtension() ? window.devToolsExtension() : () => { };
// /* applyMiddleware和thunk的作用是使redux可以执行异步任务 如定时回调 */

// /* compose 用于合并两个函数 */
// const store = createStore(reducer,
//     compose(applyMiddleware(thunk), devToolsExtension));

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

function Boss() {
    return <h1>boss</h1>
}

/* 通过ReactDom.render 将store addGun作为参数传递给组件Component里面 可以*/
ReactDom.render(
    /* Provider 组件在应用最外层 传入store */
    /*  BrowserRouter 包裹整个应用
        Link 用于跳转
        Route 用于跳转加载哪个react组件 里面的exact是用于完全匹配
    */
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRouter></AuthRouter>
                <Switch>
                    <Route path='/bossinfo' component={Bossinfo}></Route>
                    <Route path='/geniusinfo' component={Geniusinfo}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
 
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);