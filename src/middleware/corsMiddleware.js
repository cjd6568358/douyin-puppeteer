const { SERVER_PORT, NODE_ENV, PLATOM } = require('../../config')
exports = module.exports = async (ctx, next) => {
    await next()
    ctx.set({
        'Access-Control-Allow-Origin': `${ctx.header['origin'] || '*'}`,
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Content-Type,CORSCookies,cache-control,pragma',
        "Access-Control-Allow-Methods": "OPTIONS, GET, POST, PUT, DELETE",
        'Access-Control-Max-Age': 600,
        'Access-Control-Expose-Headers': 'CORSCookies',
        'SERVER_PORT': SERVER_PORT,
        'PLATOM': PLATOM,
        'NODE_ENV': NODE_ENV,
    })
}