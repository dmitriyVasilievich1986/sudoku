const Dotenv = require('dotenv-webpack')
const path = require('path');

module.exports = {
    entry: {
        main: path.resolve('./src/App.js'),
    },
    output: {
        path: path.resolve('./static/js'),
    },
    plugins: [
        new Dotenv()
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
};
