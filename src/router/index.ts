import { createMemoryHistory, createRouter } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import AuthPage from '@/pages/AuthPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/about', name: 'about', component: AboutPage },
  { path: '/profile', component: ProfilePage },
  {
    path: '/auth',
    name: 'auth',
    children: [
      {
        path: 'as-suggest',
        name: 'auth-as-suggest',
        meta: { useAs: 'asSuggest' },
        component: AuthPage,
      },
      {
        path: 'as-suggest-token',
        name: 'auth-as-suggest-token',
        meta: { useAs: 'asSuggestToken' },
        component: AuthPage,
      },
    ],
    meta: { useAs: 'asBeforeSuggest' },
    component: AuthPage,
  },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
