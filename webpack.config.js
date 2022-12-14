const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');
const filesHTML = [
    {
        filename: 'index.html',
        chunks: ['index']
    },
    {
        filename: './html/home.html',
        chunks: ['home']
    },
    {   filename: './html/pruebas.html',
        chunks: ['pruebas']
    }, 
    {   
        filename: './html/registro-inicio-sesion.html',
        chunks: ['registroInicio']
    },
    {   
        filename: './html/humanos.html',
        chunks: ['humanos']
    },
    {   
        filename: './html/asignar-pruebas.html',
        chunks: ['asignarPruebas']
    }
]

module.exports = {
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        allowedHosts: 'all',
        static: {
            directory: path.join(__dirname, '/')
        },
        hot: true,
        open:true
    },
    output: {
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },       
            {
                test: /\.(c|sc|sa)ss$/,
                use: [ MiniCssExtractPlugin.loader, 
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: () => {
                                    require('autoprefixer')
                                }
                            }
                        }
                    }
                ]
            }
        ]
    },
    optimization: {},
    entry: {
        index: './src/index.js',
        pruebas: './src/js/pruebas/index.js',
        registroInicio: './src/js/registro-inicio-sesion/index.js',
        humanos: './src/js/humanos/index.js',
        asignarPruebas: './src/js/asignar-pruebas.js',
        home: './src/js/home.js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                {from: 'src/assets/', to: 'assets/'},
                {from: 'src/html/*', to: 'html/[name].[ext]'}
            ]
        })
    ].concat(filesHTML.map((templateFile) => new HtmlWebPackPlugin({
        filename: templateFile.filename,
        template: './src/' + templateFile.filename,
        chunks: templateFile.chunks,
        inject: (templateFile.chunks.length==0) ? false : true
    })))
};