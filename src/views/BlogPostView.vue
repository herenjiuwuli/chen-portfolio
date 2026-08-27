<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { posts } from '../data/site'

// 博客管线：import.meta.glob 加载全部 md（raw）
const modules = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true })

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!m) return { meta: {}, body: raw }
  const meta = {}
  m[1].split('\n').forEach((line) => {
    const idx = line.indexOf(':')
    if (idx > 0) {
      const k = line.slice(0, idx).trim()
      const v = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '')
      if (k) meta[k] = v
    }
  })
  return { meta, body: raw.slice(m[0].length) }
}

const route = useRoute()
const slug = computed(() => route.params.slug)

const post = computed(() => posts.find((p) => p.slug === slug.value))

const html = computed(() => {
  const raw = modules[`../posts/${slug.value}.md`]
  if (!raw) return '<p>文章不存在。</p>'
  const { meta, body } = parseFrontmatter(raw)
  // 去掉正文第一个 H1（标题已在页面上方展示），避免重复
  const cleaned = body.replace(/^#\s+.+\n+/, '')
  return marked.parse(cleaned, { gfm: true, breaks: false })
})
</script>

<template>
  <section class="section">
    <div class="container post" v-if="post">
      <RouterLink to="/blog" class="post__back">← 返回专栏</RouterLink>

      <header class="post__head">
        <span class="post__index">02 — 专栏</span>
        <h1 class="post__title" v-reveal>{{ post.title }}</h1>
        <div class="post__meta">
          <span class="post__date">{{ post.date }}</span>
          <span v-for="t in post.tags" :key="t" class="post__tag">{{ t }}</span>
        </div>
      </header>

      <!-- 文章正文：首字下沉（drop cap 砖红）+ 引文砖红竖线 + 68ch 测度 -->
      <article class="prose drop-cap" v-html="html"></article>

      <footer class="post__end">
        <RouterLink to="/blog" class="post__back">← 返回专栏</RouterLink>
        <p class="post__sign">— {{ post.date }} · 晨</p>
      </footer>
    </div>
    <div class="container" v-else>
      <h1 class="page-title">文章不存在</h1>
      <RouterLink to="/blog" class="post__back">← 返回专栏</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.post { max-width: 760px; }
.post__back {
  display: inline-block; color: var(--ink-70); font-size: 0.9rem;
  margin-bottom: 24px; transition: color 0.2s;
}
.post__back:hover { color: var(--brick); }

.post__head { border-top: 1px solid var(--ink-20); padding-top: 20px; margin-bottom: 36px; }
.post__index { font-family: var(--serif); color: var(--brick); font-size: 0.95rem; letter-spacing: 2px; }
.post__title {
  font-family: var(--serif);
  font-size: clamp(1.7rem, 4.5vw, 2.6rem);
  font-weight: 600; line-height: 1.3;
  margin: 10px 0 16px;
}
.post__meta { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.post__date { font-family: var(--mono); font-size: 0.85rem; color: var(--ink-50); }
.post__tag { font-size: 0.78rem; border: 1px solid var(--ink-20); padding: 2px 12px; color: var(--ink-70); }

.post__end { margin-top: 48px; border-top: 1px solid var(--ink-20); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; }
.post__sign { font-family: var(--serif); color: var(--ink-50); font-size: 0.9rem; }
</style>
