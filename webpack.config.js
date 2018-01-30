const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        src: path.join(__dirname, 'src/main.js')

    },
    output: {
        path: path.resolve(__dirname, 'src/dist'),
        filename: '[name].bundle.js'
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.NoEmitOnErrorsPlugin()

    ],

    devtool: 'eval-source-map',

    devServer: {
        contentBase: path.resolve(__dirname, 'src'),
        port: 9000,
        compress: true,
        historyApiFallback: {
            rewrites: [
                {
                    from: /^\/^.(jpe?g|png|gif|svg|css|scss|json|js|jsx)/,
                    to: 'index.html'
                }
            ]
        }

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

module.exports.node = {
  child_process: 'empty',
  fs : 'empty'
}
