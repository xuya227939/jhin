/* eslint-disable no-undef */
/*
 * socket集成
 * @Author: Jiang
 * @Date: 2019-08-27 18:00:15
 * @Last Modified by: Jiang
 * @Last Modified time: 2020-11-01 17:52:54
 */

// @ts-ignore
import io from '@assets/js/socket.io-mp.js';
import { SOCKET_URL } from '@config';

let SOCKET: any = '';

// 坐席登录
const customerOnline = () => {
    SOCKET = io(SOCKET_URL, { transports: ['websocket'] });
};

// 服务器断开链接
const serverDisconnect = () => {
    if (!SOCKET) return;
    SOCKET.on('disconnect');
};

// 断开链接
const disconnect = () => {
    if (!SOCKET) return;
    SOCKET.disconnect();
};

const offConnect = () => {
    if (!SOCKET) {
        return;
    }
    SOCKET.off('connect');
};

// 移除单个监听
const removeListener = eventName => {
    if (!SOCKET) return;
    SOCKET.removeListener(eventName);
};

// 移出所有监听
const removeAllListeners = () => {
    if (!SOCKET) return;
    SOCKET.removeAllListeners();
};

// socket关闭
const close = () => {
    if (!SOCKET) return;
    SOCKET.on('disconnect');
    SOCKET.off('connect');
    SOCKET.removeAllListeners();
    SOCKET.disconnect();
};

// 事件通知
const serviceRoomMessage = fn => {
    if (!SOCKET) return;

    SOCKET.on('serviceRoomMessage', msg => {
        const { serviceId } = msg;
        if (wx.getStorageSync('serviceId') == serviceId) {
            console.log('serviceRoomMessage：', msg);
            fn(msg);
        }
    });
};

export {
    customerOnline,
    disconnect,
    serverDisconnect,
    offConnect,
    removeAllListeners,
    removeListener,
    close,
    serviceRoomMessage,
};
