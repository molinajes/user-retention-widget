const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        src: path.join(__dirname, 'src/components/GAUserRetentionWidget/GAUserRetentionWidget.js')

    },
    output: {
        path: path.resolve(__dirname, 'src/dist'),
        filename: 'GAUserRetentionWidget.js'
    },


    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url?limit=1000!img?minimize&optimizationLevel=5&progressive=true'
            },
            {
                test: /require\.js$/,
                use: [
                    {
                        loader: 'exports-loader?requirejs'
                    }
                ]
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react', 'stage-0']
                        }
                    }
                ]
            }
        ],
    },
    resolve: {
        alias: {
            requirejs: path.resolve(__dirname, 'src/dist/require.js'),
        }
    }
};
