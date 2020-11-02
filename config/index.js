const path = require('path');
let webpackChain = require('webpack-chain');
webpackChain = new webpackChain();

const config = {
    projectName: 'jhin',
    date: '2020-10-30',
    designWidth: 750,
    deviceRatio: {
        640: 2.34 / 2,
        750: 1,
        828: 1.81 / 2
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: [],
    defineConstants: {},
    copy: {
        patterns: [],
        options: {}
    },
    framework: 'react',
    mini: {
        postcss: {
            pxtransform: {
                enable: true,
                config: {

                }
            },
            url: {
                enable: true,
                config: {
                    limit: 1024 // 设定转换尺寸上限
                }
            },
            cssModules: {
                enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: 'module', // 转换模式，取值为 global/module
                    generateScopedName: '[name]__[local]___[hash:base64:5]'
                }
            }
        },
        compile: {
            exclude: [
                path.resolve(__dirname, '..', 'src/assets/tim-wx.js')
            ]
        },
        webpackChain(chain) {
            chain.merge({
                module: {
                    rule: {
                        myloader: {
                            enforce: 'pre',
                            test: /\.(ts|tsx|js|jsx)$/,
                            exclude: [/node_modules|assets/],
                            use: [{
                                loader: 'eslint-loader',
                                options: {
                                    cache: true,
                                    emitWarning: true,
                                    failOnError: true
                                }
                            }]
                        }
                    }
                }
            });
        }
    },
    h5: {
        publicPath: '/',
        staticDirectory: 'static',
        postcss: {
            autoprefixer: {
                enable: true,
                config: {}
            },
            cssModules: {
                enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: 'module', // 转换模式，取值为 global/module
                    generateScopedName: '[name]__[local]___[hash:base64:5]'
                }
            }
        }
    }
};

module.exports = function (merge) {
    if (process.env.NODE_ENV === 'development') {
        return merge({}, config, require('./dev'));
    }
    return merge({}, config, require('./prod'));
};