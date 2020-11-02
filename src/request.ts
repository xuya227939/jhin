/* eslint-disable no-undef */
import { axios } from 'taro-axios';
import { BASE_API } from '@config';

// 创建axios实例
const service = axios.create({
    baseURL: BASE_API,
    timeout: 50000,
    withCredentials: false, // 跨域携带cookie
    xsrfCookieName: 'xsrf-token', //当创建实例的时候配置默认配置,
});

// 请求拦截器
service.interceptors.request.use(
    function(config) {
        const cookie = wx.getStorageSync('user') ? JSON.parse(wx.getStorageSync('user')).token : '';
        if (cookie) {
            config.headers['access-token'] = cookie;
        }
        config.headers['Content-Type'] = 'application/json;charset=UTF-8';
        // 每次请求带上时间戳 防刷处理
        if (config.method === 'get') {
            config.params = {
                ...config.data,
                timestamp: Date.parse(new Date() + '') / 1000,
            };
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        if (response.status !== 200) {
            wx.showToast({
                title: `发送request失败${JSON.stringify(response)},方法名：${
                    response.request.responseURL
                }`,
                icon: 'none',
                duration: 2000,
            });
            return Promise.reject(new Error('网络异常，请稍后重试'));
        }
        const res = response.data;
        return res;
    },
    error => {
        return Promise.reject(error);
    }
);

export default service;
