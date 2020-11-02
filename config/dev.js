const path = require('path');

module.exports = {
    env: {
        NODE_ENV: '"development"'
    },
    defineConstants: {},
    mini: {},
    h5: {
        esnextModules: ['taro-ui']
    },
    alias: {
        '@/*': path.resolve(__dirname, '..', 'src'),
        '@components': path.resolve(__dirname, '..', 'src/components'),
        '@assets': path.resolve(__dirname, '..', 'src/assets'),
        '@config': path.resolve(__dirname, '..', 'src/config'),
        '@request': path.resolve(__dirname, '..', 'src/request'),
        '@utils': path.resolve(__dirname, '..', 'src/utils'),
    }
};