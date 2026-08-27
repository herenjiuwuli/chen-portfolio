<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useParallax } from './composables/useParallax'
import { site } from './data/site'

let cleanup = () => {}
let progressCleanup = () => {}

onMounted(() => {
  cleanup = useParallax()

  // 滚动进度条
  const bar = document.querySelector('.scroll-progress')
  if (bar && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const update = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      const p = max > 0 ? h.scrollTop / max : 0
      document.documentElement.style.setProperty('--progress', p)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    progressCleanup = () => window.removeEventListener('scroll', update)
  }
})

onUnmounted(() => {
  cleanup()
  progressCleanup()
})
</script>

<template>
  <div class="app">
    <div class="scroll-progress"></div>

    <nav class="nav">
      <RouterLink to="/" class="nav__brand">{{ site.brand }}</RouterLink>
      <div class="nav__links">
        <RouterLink to="/" class="nav__link" exact-active-class="router-link-active">首页</RouterLink>
        <RouterLink to="/projects" class="nav__link">作品</RouterLink>
        <RouterLink to="/blog" class="nav__link">博客</RouterLink>
        <RouterLink to="/about" class="nav__link">关于</RouterLink>
      </div>
    </nav>

    <main class="main">
      <RouterView />
    </main>

    <footer class="footer">
      <p>© 2026 {{ site.brand }} · <a :href="site.github" target="_blank" rel="noopener noreferrer">GitHub</a> · 用 Vue3 + Vite 手写</p>
    </footer>
  </div>
</template>

<style scoped>
.main { min-height: calc(100vh - var(--nav-h) - 120px); }
</style>
