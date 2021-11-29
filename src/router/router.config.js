/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/index'),
    meta: {
      title: '首页',
      keepAlive: false
    }
  }
]
