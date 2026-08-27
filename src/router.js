import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import ProjectsView from './views/ProjectsView.vue'
import BlogView from './views/BlogView.vue'
import BlogPostView from './views/BlogPostView.vue'
import AboutView from './views/AboutView.vue'

// hash 路由：Cloudflare Pages 免 rewrite 配置
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/projects', name: 'projects', component: ProjectsView },
    { path: '/blog', name: 'blog', component: BlogView },
    { path: '/blog/:slug', name: 'blog-post', component: BlogPostView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
