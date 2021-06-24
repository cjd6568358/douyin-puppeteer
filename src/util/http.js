const axios = require('axios')
const https = require('https')
const Agent = require('agentkeepalive')
const { NODE_ENV } = require('../../config')
const keepaliveAgent = new Agent({
    maxSockets: 100,
    maxFreeSockets: 10,
    timeout: 600000,
    freeSocketTimeout: 30000
})
const httpClient = axios.create({
    withCredentials: true
});
httpClient.defaults.httpAgent = keepaliveAgent;
httpClient.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false
})
httpClient.interceptors.request.use(async (config) => {
    // Do something before request is sent
    return config;
}, async function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
httpClient.interceptors.response.use(async (response) => {
    NODE_ENV === 'development' && console.log('server request url:' + response.request.path);
    // Do something with response data
    return response;
}, async function (error) {
    // Do something with response error
    return Promise.reject(error);
});

module.exports = httpClient