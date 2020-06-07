const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const config = (env) => {
  const isDev = env.NODE_ENV === 'development';

  return {
    mode: isDev ? 'development' : 'production',
    entry: './src/scripts/index.ts',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      plugins: [new TsconfigPathsPlugin({ configFile: path.join(__dirname, 'tsconfig.json') })],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    devtool: isDev ? 'inline-source-map' : false,
    plugins: [
      new Dotenv({
        path: path.join(__dirname, 'config', `${env.NODE_ENV}.env`),
        defaults: path.join(__dirname, 'config', 'default.env'),
        unsafeAllowAllEnvVars: true,
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html'),
      }),
    ],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
      historyApiFallback: true,
    },
  };
};

module.exports = config;
