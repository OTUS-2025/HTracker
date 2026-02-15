import { createMemoryHistory, createRouter } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/about', component: AboutPage },
  { path: '/profile', name: 'profile', component: ProfilePage },
  { path: '/:catchAll(.*)', redirect: '/' },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
