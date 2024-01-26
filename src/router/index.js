import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
        },
        {
          path: '/category/:id',
          name: 'category',
          component: Category,
        },
        {
          path: '/category/sub/:id',
          name: 'subCategory',
          component: SubCategory,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
  // 路由滚动行为定制
  scrollBehavior() {
    return {
      top: 0,
    }
  },
})

export default router
