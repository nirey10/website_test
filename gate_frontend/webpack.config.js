// webpack.config.js
const path = require('path');

module.exports = {
    // Other webpack configurations...
    resolve: {
        fallback: {
            http: false,
        },
    },
};