const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cssLoaders = [
    MiniCssExtractPlugin.loader,
    {loader: 'css-loader'},
];

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 4000,
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'style-[hash].css',
        }),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js',

    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json'),
                        },
                    },
                ],
                exclude: /(node_modules)/
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.hbs$/,
                use: [{
                    loader: "handlebars-loader",
                    options: {
                        helperDirs: path.resolve(__dirname, "./src/helpers")
                    }
                }]
            },
            {
                test: /\.pcss$/,
                use: [...cssLoaders, {loader: 'postcss-loader'}],
            },
        ]
    }
};
