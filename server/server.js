const express = require('express');
const bodypaser = require('body-parser')
const cookiepaser = require('cookie-parser')
const userRouter = require('./user')

const app = express();

/* 加载cookie中间件 */
app.use(cookiepaser())
/* 加载能处理post请求的body */
app.use(bodypaser.json())
/* 路由 */
app.use('/user', userRouter)

app.listen(9093,function () {
    console.log('Node app start at port 9093');
})