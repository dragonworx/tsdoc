const chalk = require('chalk');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const package = require('./package.json');
const path = require('path');

module.exports = (env) => {
    const isProduction = env === 'prod' || process.env.NODE_ENV === 'production';
    console.log(chalk.cyan(`${package.name} ${isProduction ? 'PROD' : 'DEV'} v${package.version}`));

    return {
        cache: false,
        entry: "./src/index.tsx",
        output: {
            filename: "app.js",
            path: __dirname + "/public/build"
        },
        mode: "development",
        devtool: isProduction ? undefined : "#inline-source-map",
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json", ".less", ".css", ".txt"],
            alias: {
                // 'react-blit': path.resolve(__dirname, 'packages/react-blit/'),
            }
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "awesome-typescript-loader"
                },
                {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader"
                },
                { 
                    test: /\.less$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'less-loader',
                      ],
                },
                {
                    test: /\.test.js/i,
                    use: 'raw-loader',
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin(),
            ...(isProduction ? [
                new OptimizeCssAssetsPlugin({
                    assetNameRegExp: /.css$/g,
                    cssProcessor: require('cssnano'),
                    cssProcessorPluginOptions: {
                        preset: ['default', { discardComments: { removeAll: true } }],
                    },
                    canPrint: true
                }),
            ] : []),
        ]
    };
}