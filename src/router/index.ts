import { createRoute } from '@kitbag/router'

const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

export const routes = [
  createRoute({ name: 'home', path: '/', component: Home }),
  createRoute({ name: 'path', path: '/about', component: About }),
] as const
