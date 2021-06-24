exports = module.exports = async (ctx, next) => {
    try {
        await next()
        if (!ctx.status) {
            ctx.throw(500)
        }
        let { body, statusCode = 1, statusMsg = 'OK', response } = ctx
        if ((body || statusCode || statusMsg) && !response.get('Content-Disposition')) {
            ctx.body = {
                statusCode,
                statusMsg,
                data: body
            }
        }
    } catch (err) {
        console.log(err)
        ctx.status = err.status || 500
        ctx.message = err.message
        ctx.error = err.error
        ctx.app.emit('error', err, ctx)
    }
}