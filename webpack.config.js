var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var extractCSS = new ExtractTextPlugin("[name].css");

var plugins = [
    ...defaultsPlugins(),
    extractCSS,
    new HtmlWebpackPlugin({
        inject: false,
        template: path.join(__dirname, 'webpack.template.ejs'),

        title: 'Instak',
        appMountId: 'root',
        mobile: true,
        meta: {
            HandheldFriendly: true,
            'msapplication-tap-highlight': 'no',
            'apple-mobile-web-app-capable': 'yes',
            'mobile-web-app-capable': 'yes',
            'theme-color': '#ffffff'
        },
        links: [
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: '/favicon-32x32.png'
            }, {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: '/favicon-16x16.png'
            }, {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href: '/apple-touch-icon.png'
            }, {
                rel: 'mask-icon',
                href: '/safari-pinned-tab.svg',
                color: '#411ccb'
            }, {
                rel: 'manifest',
                href: '/manifest.json'
            }
        ]
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
    }),
    new webpack.ProvidePlugin({
        Promise: 'bluebird',
        React: 'react',
        ReactDOM: 'react-dom',
        cssModule: 'react-css-modules',
        Translate: 'react-translate-component',
        counterpart: 'counterpart'
    })
];

function defaultsPlugins() {
    var result = process.env.NODE_ENV !== 'development'
        ? [new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })] : [];
    result.push(new webpack.NoErrorsPlugin());
    return result;
}

function loaderCSS(){
    return {
        loader:'css-loader',
        query:{
            minimize: process.env.NODE_ENV !== 'development',
            importLoaders: 0,
            modules: true,
            localIdentName:process.env.NODE_ENV === 'development' ?
                '[name]-[local]-[hash:base64:5]' :
                '[hash:base64]'
        }
    };
}

function loaderBabel(test, ...query){
    return {
        test,
        query: {
            presets:[['es2015',{
                modules:false
            }],'stage-0',...query],
            plugins: ["transform-decorators-legacy"]
        },
        exclude: /(node_modules)/,
        loader: 'babel-loader'
    }
}

module.exports = [{
    devtool: 'source-map',
    context:__dirname,
    entry:{
        index:path.join(__dirname, 'src/index.jsx')
    },
    resolve:{
        extensions: ['.js', '.jsx']
    },
    output:{
        path:path.join(__dirname, 'public'),
        filename:'[name].js',
        publicPath:'/'
    },
    target:'web',
    module:{
        loaders:[
            loaderBabel(/\.js$/),
            loaderBabel(/\.jsx$/, 'react'),
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loader: extractCSS.extract({
                    loader: [loaderCSS()]
                })
            },{
                test: /\.less$/,
                loader: extractCSS.extract({
                    loader: [loaderCSS(),{
                        loader:'less-loader',
                        query:{
                            sourceMap: true
                        }
                    }]
                })
            }, {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'url-loader',
                query: {
                    limit: 25000,
                    name: './fonts/[name].[ext]'
                }
            }, {
                test: /\.(png|ico|icns|jp(e)?g)$/,
                loader: "file-loader",
                query:{
                    name: './images/[name].[hash].[ext]'
                }
            }
        ]
    },
    plugins
},{
    target: 'node',
    node: {
        __dirname: true,
        __filename: true
    },
    externals: [require('webpack-node-externals')()],
    context: __dirname,
    entry:{
        index:path.join(__dirname, 'Server/index.js')
    },
    output:{
        path:path.join(__dirname, './'),
        filename:'server.start.js'
    },
    module:{
        loaders:[
            loaderBabel(/\.js$/),
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: defaultsPlugins()
}];