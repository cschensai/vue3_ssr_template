// import { defineNuxtConfig } from 'nuxt/config';
import { loadEnv } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

const lifycycle = process.env.npm_lifecycle_event;

const envName = process.env.APP_ENV;
const envData = loadEnv(envName, 'env');

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default {
  css: ['~/homeAssets/less/uilib.less', '~/homeAssets/less/index.less'],
  meta: {
    meta: [
      // 防止点击输入框ios页面进行缩放
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: 'https://www.desty.app/favicon.ico?v=2',
    }, {
      rel: 'canonical',
      href: 'https://desty.app',
    }]
  },
  webpack: {
    extractCSS: true,
    // postcss
    postcss: {
      postcssOptions: require('./postcss.config.js'),
    },
  },
  build: {
    transpile: lifycycle === 'build' ? ['element-plus'] : [],
    // 分离css
    // bundle analyze
    analyze: true,
  },
  // build modules
  // buildModules: [],
  modules: [
    "@pinia/nuxt",
    // 请求代理配置，解决跨域
	  // '@nuxtjs/proxy',
    // 图片懒加载
    '@nuxt/image-edge',
  ],
  // 跨域代理配置
  proxy: {
    '/api': {
      target: 'https://staging.desty.app', // 目标接口域名
      changeOrigin: true, // 表示是否跨域
      pathRewrite: {
        '^/api': '', // 把 /api 替换成 ''
      }
    }
  },
  // source map
  sourcemap: {
    client: false,
    server: false,
  },
  // 只在client渲染
  plugins: [
    {
      src: '~/plugins/desty-design',
      mode: 'client',
    },
    {
      src: '~/plugins/lottie-web',
      mode: 'client',
    }
  ],
  // 注册运行时环境配置变量
  runtimeConfig: {
    public: envData,
  },
  vite: {
    envDir: '~/env',
    plugins: [
      // element-plus按需加载
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        dts: true,
        resolvers: [ElementPlusResolver()]
      }),
    ],
  },
}
