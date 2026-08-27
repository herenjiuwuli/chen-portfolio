<script setup>
import { posts } from '../data/site'
</script>

<template>
  <section class="section">
    <div class="container">
      <header class="page-head" v-reveal>
        <span class="page-index">02 — 专栏</span>
        <h1 class="page-title">博客</h1>
        <p class="page-sub">学习笔记与项目复盘，用「一句话理解 → 误解 → 要点 → 例子」的结构写。</p>
      </header>

      <!-- 杂志目录：border-t 细线列表 -->
      <div class="toc">
        <RouterLink
          v-for="(post, i) in posts"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="toc__row"
          v-reveal
          :style="{ transitionDelay: `${i * 70}ms` }"
        >
          <span class="toc__no">{{ String(i + 1).padStart(2, '0') }}</span>
          <div class="toc__body">
            <h2 class="toc__title">{{ post.title }}</h2>
            <div class="toc__meta">
              <span class="toc__date">{{ post.date }}</span>
              <span v-for="t in post.tags" :key="t" class="toc__tag">{{ t }}</span>
            </div>
          </div>
          <span class="toc__arrow">→</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.toc { max-width: 720px; }
.toc__row {
  display: grid;
  grid-template-columns: 56px 1fr auto;
  gap: 20px; align-items: center;
  border-top: 1px solid var(--ink-20);
  padding: 22px 4px;
  transition: background 0.25s ease;
}
.toc__row:last-child { border-bottom: 1px solid var(--ink-20); }
.toc__row:hover { background: var(--paper-deep); }
.toc__no {
  font-family: var(--serif);
  font-size: 1.5rem; font-weight: 300;
  color: var(--brick);
}
.toc__title { font-family: var(--serif); font-size: 1.25rem; font-weight: 600; line-height: 1.45; margin-bottom: 6px; }
.toc__row:hover .toc__title { color: var(--brick); }
.toc__meta { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
.toc__date { font-family: var(--mono); font-size: 0.8rem; color: var(--ink-50); }
.toc__tag { font-size: 0.75rem; border: 1px solid var(--ink-20); padding: 1px 10px; color: var(--ink-70); }
.toc__arrow { font-size: 1.2rem; color: var(--ink-50); transition: color 0.25s, transform 0.25s; }
.toc__row:hover .toc__arrow { color: var(--brick); transform: translateX(4px); }
</style>
