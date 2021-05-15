const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const IS_DEVELOPMENT = process.env.NODE_ENV === 'dev'

const dirSrc = path.join(__dirname, 'src')
const dirStatic = path.join(__dirname, 'static')
const dirStyles = path.join(dirSrc, 'styles')
const dirAssets = path.join(dirSrc, 'assets')
const dirNode = 'node_modules'

module.exports = {
  entry: [path.join(dirSrc, 'index.js'), path.join(dirStyles, 'index.scss')],
  resolve: {
    modules: [dirNode],
    alias: {
      '@': dirSrc,
      '@static': dirStatic,
      '@styles': dirStyles,
      '@assets': dirAssets
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEVELOPMENT
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: './static',
          to: '',
          noErrorOnMissing: true
        }
      ]
    }),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
          [
            'svgo',
            {
              plugins: [
                {
                  removeViewBox: false
                }
              ]
            }
          ]
        ]
      }
    }),
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          },
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader'
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader']
      }
    ]
  }
}
