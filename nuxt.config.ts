import { defineNuxtConfig } from 'nuxt';
import { loadEnv } from 'vite';

const lifycycle = process.env.npm_lifecycle_event;

const envName = process.env.APP_ENV;
const envData = loadEnv(envName, 'env');

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['~/assets/less/uilib.less'],
  meta: {
    title: 'Desty',
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: 'https://www.desty.app/favicon.ico?v=2',
    }]
  },
  build: {
    transpile: lifycycle === 'build' ? ['element-plus'] : [],
  },
  // build modules
  buildModules: ["@pinia/nuxt"],
  modules: [
    // 请求代理配置，解决跨域
	  '@nuxtjs/proxy',
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
  // 注册运行时环境配置变量
  publicRuntimeConfig: envData,
  vite: {
    envDir: '~/env',
  },
})
