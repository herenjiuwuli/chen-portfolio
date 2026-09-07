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
      <RouterLink to="/blog" class="link-underline post__back">← 返回专栏</RouterLink>

      <header class="post__head">
        <span class="label">02 — Journal</span>
        <h1 class="post__title" v-reveal>{{ post.title }}</h1>
        <div class="post__meta">
          <span class="post__date">{{ post.date }}</span>
          <span v-for="t in post.tags" :key="t" class="post__tag">{{ t }}</span>
        </div>
      </header>

      <!-- 文章正文：drop cap 墨黑首字 + 斜体衬线引文（无竖线）+ 68ch 无衬线正文 -->
      <article class="prose drop-cap" v-html="html"></article>

      <footer class="post__end">
        <RouterLink to="/blog" class="link-underline post__back">← 返回专栏</RouterLink>
        <p class="post__sign">— {{ post.date }} · 晨</p>
      </footer>
    </div>
    <div class="container" v-else>
      <h1 class="page-title">文章不存在</h1>
      <RouterLink to="/blog" class="link-underline post__back">← 返回专栏</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.post { max-width: 820px; }
.post__back {
  display: inline-block;
  color: var(--ink-60);
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  margin-bottom: 40px;
  transition: color 0.25s ease;
}
.post__back:hover { color: var(--ink); }

.post__head { border-top: 1px solid var(--ink-10); padding-top: 24px; margin-bottom: 48px; }
.post__title {
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(1.9rem, 4.5vw, 3rem);
  line-height: 1.25;
  letter-spacing: -0.025em;
  margin: 14px 0 20px;
}
.post__meta { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.post__date { font-size: 0.78rem; color: var(--ink-40); }
.post__tag {
  font-size: 0.72rem; letter-spacing: 0.08em;
  border: 1px solid var(--ink-10);
  padding: 2px 10px;
  color: var(--ink-60);
}

.post__end {
  margin-top: 56px;
  border-top: 1px solid var(--ink-10);
  padding-top: 24px;
  display: flex; justify-content: space-between; align-items: center;
}
.post__sign { font-family: var(--serif); font-weight: 400; color: var(--ink-40); font-size: 0.9rem; }
</style>
