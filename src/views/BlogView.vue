<script setup>
import { posts } from '../data/site'
</script>

<template>
  <section class="section">
    <div class="container">
      <RouterLink to="/" class="back">← 返回首页</RouterLink>
      <header class="page-head" v-reveal>
        <span class="label">02 — Journal</span>
        <h1 class="page-title">博客</h1>
        <p class="page-sub">学习笔记与项目复盘，用「一句话理解 → 误解 → 要点 → 例子」的结构写。</p>
      </header>

      <!-- 杂志编号列表：编号 + 标题（hover 斜体）+ 日期/标签 + 箭头右移 -->
      <div class="toc">
        <RouterLink
          v-for="(post, i) in posts"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="toc__row group"
          v-reveal
          :style="{ transitionDelay: `${i * 70}ms` }"
        >
          <span class="toc__no">{{ String(i + 1).padStart(2, '0') }}</span>
          <div class="toc__body">
            <h2 class="toc__title group-hover-italic">{{ post.title }}</h2>
            <div class="toc__meta">
              <span class="toc__date">{{ post.date }}</span>
              <span v-for="t in post.tags" :key="t" class="toc__tag">{{ t }}</span>
            </div>
          </div>
          <span class="toc__arrow group-arrow">→</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.toc { max-width: 800px; }
.toc__row {
  display: grid;
  grid-template-columns: 68px 1fr auto;
  gap: 24px; align-items: center;
  border-bottom: 1px solid var(--ink-10);
  padding: 28px 4px;
  transition: border-color 0.4s ease;
}
.toc__row:first-child { border-top: 1px solid var(--ink-10); }
.toc__row:hover { border-bottom-color: var(--ink-40); }

.toc__no {
  font-family: var(--serif);
  font-size: 1.5rem; font-weight: 300;
  color: var(--ink-40);
  transition: color 0.4s ease;
}
.toc__row:hover .toc__no { color: var(--ink); }

.toc__title {
  font-family: var(--serif);
  font-weight: 400;
  font-size: 1.3rem;
  letter-spacing: -0.01em;
  line-height: 1.5;
  margin-bottom: 10px;
}
.toc__meta { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.toc__date { font-size: 0.78rem; color: var(--ink-40); }
.toc__tag {
  font-size: 0.72rem; letter-spacing: 0.08em;
  border: 1px solid var(--ink-10);
  padding: 2px 10px;
  color: var(--ink-60);
}
.toc__arrow { font-size: 1.1rem; color: var(--ink-40); }
.toc__row:hover .toc__arrow { color: var(--ink); }

@media (max-width: 768px) {
  .toc__row { grid-template-columns: 44px 1fr auto; gap: 14px; padding: 22px 2px; }
  .toc__title { font-size: 1.1rem; }
}
</style>
