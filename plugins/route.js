
// 路由导航守卫，拦截处理
export default defineNuxtPlugin(nuxtApp => {
  const { beforeEach } = useRouter();
  beforeEach((to, from, next) => {
    next();
  })
})