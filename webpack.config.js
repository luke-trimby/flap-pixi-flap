const path = require('path');
var webpack = require("webpack");
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const isDebug = process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "staging";
const gameName = process.env.npm_package_name;
const version = process.env.npm_package_version;

const ifDefConfig = {
    __DEBUG__: isDebug,
    __NODE_ENV__: JSON.stringify(process.env.NODE_ENV),
    __VERSION__: JSON.stringify(version),
    "ifdef-verbose": true,
    "ifdef-triple-slash": true
};

const tsLoaders = [{ loader: "ts-loader" }];
if (!isDebug) {
    tsLoaders.push({ loader: "ifdef-loader", options: ifDefConfig });
}

const config = {
    mode: isDebug ? 'development' : 'production',
    entry: './src/app.ts',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'lib/game.js',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: tsLoaders,
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __NODE_ENV__: JSON.stringify(process.env.NODE_ENV),
            __GAMENAME__: JSON.stringify(gameName),
            __VERSION__: JSON.stringify(version),
            __DEBUG__: JSON.stringify(isDebug),
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin( [
            { from: 'src/index.html' },
            { from: 'assets/css/style.css', to: 'assets/css/style.css' },
            { from: 'assets/images', to: 'assets/images' },
            { from: 'assets/atlas', to: 'assets/atlas' },
            { from: 'assets/fonts', to: 'assets/fonts' },
            { from: 'assets/fav', to: 'assets/fav' }
        ]),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        host: '0.0.0.0',
        port: 8556,
        hot: true
    },
    optimization: {
        minimize: !isDebug
    }
};

module.exports = config;