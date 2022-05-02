import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

const routes = [
  {
    path: '/',
    redirect: { path: '/edgex-ui-system' },
    name: 'home',
    component: App,
  },
  {
    path: '/dashboard',
    // redirect的path值需与activeRule一致
    redirect: { path: '/' },
    name: 'dashboard',
    component: App,
  },
  {
    path: '/system',
    redirect: { path: '/edgex-ui-system' },
    name: 'system',
    component: App,
  },
  {
    path: '/metadata',
    redirect: { path: '/' },
    name: 'metadata',
    component: App,
  },
  {
    path: '/data-center',
    redirect: { path: '/' },
    name: 'data-center',
    component: App,
  },
  {
    path: '/scheduler',
    redirect: { path: '/' },
    name: 'scheduler',
    component: App,
  },
  {
    path: '/notifications',
    redirect: { path: '/notifications-vue' },
    name: 'notifications',
    component: App,
  },
  {
    path: '/rule-engine',
    redirect: { path: '/' },
    name: 'rule-engine',
    component: App,
  },
  {
    path: '/app-service',
    redirect: { path: '/app-service/app-service-list' },
    name: 'app-service',
    component: App,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
