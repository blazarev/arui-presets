const path = require('path');
const webpack = require('webpack');

const DEFAULT_QUERY = {
    name: '[name].[hash].[ext]'
};

function webpackBaseConfigBuilder(options) {
    options = options || {};

    const assetsPath = options.assetsPath || null;
    const QUERY =
        assetsPath
            ? `${assetsPath}${DEFAULT_QUERY}`
            : DEFAULT_QUERY;

    return (
        {
            resolve: {
                modules: [
                    path.join(process.cwd(), 'node_modules')
                ],
                extensions: ['.js', '.jsx']
            },
            module: {
                rules: [
                    {
                        test: /\.jsx?$/,
                        loader: require.resolve('babel-loader'),
                        exclude: /node_modules/
                    },
                    {
                        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                        loader: require.resolve('file-loader'),
                        options: Object.assign({ mimetype: 'application/font-woff' }, QUERY)
                    },
                    {
                        test: /\.(ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                        loader: require.resolve('file-loader'),
                        options: Object.assign({ mimetype: 'application/octet-stream' }, QUERY)
                    },
                    {
                        test: /\.(eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                        loader: require.resolve('file-loader')
                    },
                    {
                        test: /\.(jpe?g)$/i,
                        loader: require.resolve('file-loader'),
                        options: Object.assign({ mimetype: 'image/jpeg' }, QUERY)
                    },
                    {
                        test: /\.(gif)$/i,
                        loader: require.resolve('file-loader'),
                        options: Object.assign({ mimetype: 'image/gif' }, QUERY)
                    },
                    {
                        test: /\.(png)$/i,
                        loader: require.resolve('file-loader'),
                        options: Object.assign({ mimetype: 'image/png' }, QUERY)
                    },
                    {
                        test: /\.(svg)$/i,
                        loader: require.resolve('file-loader'),
                        options: Object.assign({ mimetype: 'image/svg+xml' }, QUERY)
                    }
                ]
            },
            plugins: [
                new webpack.ProvidePlugin({
                    React: 'react'
                }),
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                    'process.HOT_LOADER': process.env.HOT_LOADER
                })
            ]
        }
    );
}

module.exports = webpackBaseConfigBuilder;
