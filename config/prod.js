const path = require('path');

module.exports = {
    env: {
        NODE_ENV: '"production"'
    },
    defineConstants: {},
    mini: {},
    h5: {
        /**
         * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
         * 参考代码如下：
         * webpackChain (chain) {
         *   chain.plugin('analyzer')
         *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
         * }
         */
    },
    alias: {
        '@components': path.resolve(__dirname, '..', 'src/components'),
        '@config': path.resolve(__dirname, '..', 'src/config'),
        '@assets': path.resolve(__dirname, '..', 'src/assets'),
        '@request': path.resolve(__dirname, '..', 'src/request'),
        '@utils': path.resolve(__dirname, '..', 'src/utils'),
    }
};