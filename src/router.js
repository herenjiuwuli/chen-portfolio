import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import BlogView from './views/BlogView.vue'
import BlogPostView from './views/BlogPostView.vue'

// hash 路由：Cloudflare Pages 免 rewrite 配置
// 首页已经包含「作品」「工作方式」「联系」，所以不再需要 /projects、/about 两条独立路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/blog', name: 'blog', component: BlogView },
    { path: '/blog/:slug', name: 'blog-post', component: BlogPostView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to) {
    // 锚点（#works 等）交给原生滚动处理，路由只负责换页回到顶部
    if (to.hash) return false
    return { top: 0 }
  },
})

export default router
