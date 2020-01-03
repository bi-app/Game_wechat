import { IConfig } from 'umi-types';
import { resolve } from 'path';
import pxToViewPort from 'postcss-px-to-viewport';
import ThemeConfig from '../src/themes/theme'; // ref: https://umijs.org/config/

const config: IConfig = {
  publicPath: '/coupon_test/',
  outputPath: './coupon_test',
  targets: {
    android: 5,
    chrome: 58,
    edge: 13,
    firefox: 45,
    ie: 9,
    ios: 7,
    safari: 10,
  },
  history: 'hash',
  hash: true,
  ignoreMomentLocale: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true,
          immer: true,
        },
        dynamicImport: {
          loadingComponent: './components/Loader/Loader',
          webpackChunkName: true,
        },
        title: ' ',
        hd: true,
        fastClick: true,
        dll: true,
        scripts: [
          // { src: 'https://cdn.jsdelivr.net/npm/eruda@1.5.4/eruda.min.js' },
          // { content: `eruda.init();` },
        ],
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /data.d\.(t|j)sx?$/,
            /components\//,
            /turntable\//,
          ],
        },

      },
    ],
  ],
  theme: ThemeConfig,
  define: {
    BASE_URL:'http://ydhtest.fetower.com',
    "process.env.couponPrefix": '/api',
  },
  alias: {
    assets: resolve(__dirname, './src/assets/'),
    components: resolve(__dirname, './src/components'),
    api: resolve(__dirname, './src/services'),
    utils: resolve(__dirname, './src/utils/'),
    themes: resolve(__dirname, './src/themes'),
  },
  disableRedirectHoist: true,
  extraPostCSSPlugins: [
    pxToViewPort({
      viewportWidth: 750,
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
    }),
  ],
  proxy: {
    '/wx': {
      target: 'http://ydhtest.fetower.com',
      changeOrigin: true,
      pathRewrite: {
        '^/wx': '/',
      },
    },
    '/api': {
      target: 'http://120.26.211.143:5003',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/',
      },
    },
  },
};
export default config;

