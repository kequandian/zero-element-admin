var koa=require('koa')
var route=require('koa-route')//配置路由
var koaBody=require('koa-body')// 解析post请求会用到koa-body

let app=new koa();
let config = require("./config") //端口
let port = config.globalConfig.port
app.use(koaBody())

// api调用
let setting=require('./api/setting')

app.use(route.get('/api/adm/config',setting.getJson))
app.use(route.get('/api/mainpage',setting.getMainPage))

console.log("服务器开启，端口为"+port)
app.listen(port)