/**
 * Webpack config for development electron main process
 */
import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';
import checkNodeEnv from '../scripts/check-node-env';
import baseConfig from './webpack.config.base';
import webpackPaths from './webpack.paths';

// Load environment variables
const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';
dotenv.config({ path: path.resolve(__dirname, envFile) });

// When an ESLint server is running, we can't set the NODE_ENV so we'll check if it's
// at the dev webpack config is not accidentally run in a production environment
if (process.env.NODE_ENV === 'production') {
  checkNodeEnv('development');
}

const configuration: webpack.Configuration = {
  devtool: 'inline-source-map',

  mode: 'development',

  target: 'electron-main',

  entry: {
    main: path.join(webpackPaths.srcMainPath, 'main.ts'),
    preload: path.join(webpackPaths.srcMainPath, 'preload.ts'),
  },

  output: {
    path: webpackPaths.dllPath,
    filename: '[name].bundle.dev.js',
    library: {
      type: 'umd',
    },
  },

  plugins: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE === 'true' ? 'server' : 'disabled',
      analyzerPort: 8888,
    }),

    new webpack.DefinePlugin({
      'process.type': '"browser"',
      'process.env.REACT_APP_API_URL': JSON.stringify(
        process.env.REACT_APP_API_URL,
      ),
    }),
  ],

  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false,
  },
};

export default merge(baseConfig, configuration);

// /**
//  * Webpack config for development electron main process
//  */

// import path from 'path';
// import webpack from 'webpack';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
// import { merge } from 'webpack-merge';
// import checkNodeEnv from '../scripts/check-node-env';
// import baseConfig from './webpack.config.base';
// import webpackPaths from './webpack.paths';

// // When an ESLint server is running, we can't set the NODE_ENV so we'll check if it's
// // at the dev webpack config is not accidentally run in a production environment
// if (process.env.NODE_ENV === 'production') {
//   checkNodeEnv('development');
// }

// const configuration: webpack.Configuration = {
//   devtool: 'inline-source-map',

//   mode: 'development',

//   target: 'electron-main',

//   entry: {
//     main: path.join(webpackPaths.srcMainPath, 'main.ts'),
//     preload: path.join(webpackPaths.srcMainPath, 'preload.ts'),
//   },

//   output: {
//     path: webpackPaths.dllPath,
//     filename: '[name].bundle.dev.js',
//     library: {
//       type: 'umd',
//     },
//   },

//   plugins: [
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     new BundleAnalyzerPlugin({
//       analyzerMode: process.env.ANALYZE === 'true' ? 'server' : 'disabled',
//       analyzerPort: 8888,
//     }),

//     new webpack.DefinePlugin({
//       'process.type': '"browser"',
//     }),
//   ],

//   /**
//    * Disables webpack processing of __dirname and __filename.
//    * If you run the bundle in node.js it falls back to these values of node.js.
//    * https://github.com/webpack/webpack/issues/2010
//    */
//   node: {
//     __dirname: false,
//     __filename: false,
//   },
// };

// export default merge(baseConfig, configuration);
