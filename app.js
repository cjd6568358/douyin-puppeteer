const http = require('http');
const Koa = require('koa');
const compress = require('koa-compress');
const koaBody = require("koa-body");
const routerConfigFn = require('./src/router/index')
const corsMiddleware = require('./src/middleware/corsMiddleware')
const pipeMiddleware = require('./src/middleware/pipeMiddleware')
const { SERVER_PORT } = require('./config')
const app = new Koa()

app.proxy = true;
// middlewares
app.use(compress());
// app.use(bodyParser({
//     formLimit: '10mb'
// }));
app.use(koaBody({
    multipart: true,
    jsonLimit: '10mb',
    formLimit: '10mb',
    textLimit: '10mb',
    formidable: {
        maxFieldsSize: 10 * 1024 * 1024,
        keepExtensions: true,
        multipart: true
    }
}))
app.use(corsMiddleware);
app.use(pipeMiddleware);
// 注册路由
routerConfigFn(app);

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

const server = http.createServer(app.callback())
server.listen(SERVER_PORT, '0.0.0.0', function (err) {
    if (err) {
        return console.log(`http server init error: ${err.message}`);
    }
    console.log(`http server listening at port: ${SERVER_PORT}`);
})
server.on('error', function (err) {
    console.log('server error', err);
})