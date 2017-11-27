/* 该文件用于管理所有用户相关的路由 */
const express = require('express')
const Router = express.Router()
const model = require('./model')
const utils = require('utility')
const _fitler = { 'pwd': 0, '__v': 0 }

/* 获取mongoose的user模型 */
const User = model.getModel('user')
const errorType = {
    register: "Register Error Result: "
}

function md5Pwd(pwd) {
    const salt = 'huashengmi12!#@@#@*&#&YAJA#s'
    return utils.md5(utils.md5(pwd + salt))
}

Router.get('/list', function (req, res) {
    // User.remove({},function (e,d) {

    // })
    const {type} = req.query;
    console.log(req.query);
    console.log(type);
    User.find({ type}, function (err, oDoc) {
        console.log(oDoc)
        if (!err) {
            return res.json({ code: 0, data: oDoc})
        }
    })

})

Router.post('/login', function (req, res) {
    console.log(req.body)
    const { user, pwd } = req.body
    console.log(md5Pwd(pwd));
    User.find({ user, pwd: md5Pwd(pwd) }, _fitler, function (err, oDoc) {
        if (oDoc.length === 0) {
            return res.json({ code: 1, msg: "用户名或密码错误" })
        }
        console.log("userid " + oDoc[0]._id);
        res.cookie("userid", oDoc[0]._id)
        return res.json({ code: 0, data: oDoc[0] })
    })
})

Router.post('/register', function (req, res) {
    console.log(req.body)
    const { user, pwd, type } = req.body
    console.log(user)
    User.find({ user }, function (err, oDoc) {
        if (oDoc.length !== 0) {
            /* 说明用户已经注册过了 */
            return res.json({ code: 1, msg: "用户已经注册过了" })
        }

        if (err) {
            /* 数据库返回失败 */
            console.error(errorType.register + err);
            return res.json({ code: 1, msg: "注册失败" })
        }

        const userModel = new User({ user, type, pwd: md5Pwd(pwd)})
        userModel.save(function (err,oDoc) {
            if (err) {
                /* 数据库返回失败 */
                console.error(errorType.register + err);
                return res.json({ code: 1, msg: "数据库创建文档失败" })
            }
            console.log(oDoc)
            res.cookie('userid',oDoc._id);
            return res.json({ code: 0 })
        })
    })
})

Router.post('/update',function (req,res) {
    const {userid } = req.cookies
    if (!userid){
        return json.dumps({code:1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid,body,function (err,oDoc) {
        /* 合并两个对象 */
        const data = Object.assign({},{
            type:oDoc.type,
            user: oDoc.user
        }, body)
        return res.json({code:0,data})
    })
})

Router.get('/info', function (req, res) {
    const { userid } = req.cookies
    if (!userid) {
        return res.json({ code: 1 })
    }
    User.findOne({ _id: userid }, _fitler, function (err, oDoc) {
        if (err) {
            return res.json({ code: 1, msg: "后端报错" })
        }
        if (oDoc) {
            return res.json({ code: 0, data: oDoc })
        }
    })

})

module.exports = Router