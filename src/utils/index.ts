/* eslint-disable no-undef */

// 权限匹配
const AUTHORIZE_MATCH = {
    record: '麦克风',
    camera: '摄像头',
};

// 未授权某种权限提示并跳设置
export const goAuthorize = type => {
    wx.getSetting({
        success: res => {
            if (!res.authSetting[`scope.${type}`]) {
                wx.showModal({
                    title: '用户未授权',
                    content: `如需正常使用，请前往授权${AUTHORIZE_MATCH[type]}功能`,
                    showCancel: false,
                    confirmText: '去授权',
                    confirmColor: '#3DBE1C',
                }).then(res => {
                    if (res.confirm) {
                        wx.openSetting({
                            success() {},
                        });
                    }
                });
            }
        },
    });
};

// 获取摄像头权限
export const authorizeCamera = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: res => {
                if (!res.authSetting['scope.camera']) {
                    wx.authorize({
                        scope: 'scope.camera',
                        success: () => {
                            // 用户同意开启摄像头权限
                            resolve();
                        },
                        fail: () => {
                            // 不同意摄像头
                            goAuthorize('camera');
                            reject();
                        },
                    });
                }

                if (res.authSetting['scope.camera']) resolve();
            },
        });
    });
};

// 获取相册权限
export const authorizeWritePhotosAlbum = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: res => {
                if (!res.authSetting['scope.writePhotosAlbum']) {
                    wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success: () => {
                            // 用户同意开启相册权限
                            resolve();
                        },
                        fail: () => {
                            // 不同意相册
                            goAuthorize('writePhotosAlbum');
                            reject();
                        },
                    });
                }

                if (res.authSetting['scope.writePhotosAlbum']) resolve();
            },
        });
    });
};

// 获取录音权限
export const authorizeRecord = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: res => {
                if (!res.authSetting['scope.record']) {
                    wx.authorize({
                        scope: 'scope.record',
                        success: () => {
                            resolve();
                        },
                        fail: () => {
                            goAuthorize('record');
                            reject();
                        },
                    });
                }
                if (res.authSetting['scope.record']) resolve();
            },
        });
    });
};

// 判断是否在微信游览器
export const isWeiXin = () => {
    if (!navigator) {
        return true;
    }
    const ua = navigator.userAgent.toLowerCase();
    const isWeixin = ua.indexOf('micromessenger') != -1;
    if (isWeixin) {
        return true;
    } else {
        return false;
    }
};

// 图片url（或filepath）转base64
export const fileTobase64 = path => {
    return 'data:image/jpeg;base64,' + wx.getFileSystemManager().readFileSync(path, 'base64');
};

// 推送pdf
export const openDocument = url => {
    return new Promise(resolve => {
        wx.downloadFile({
            url: url,
            success: function(res) {
                const filePath = res.tempFilePath;
                wx.openDocument({
                    filePath: filePath,
                    success: function() {
                        resolve();
                    },
                });
            },
        });
    });
};
