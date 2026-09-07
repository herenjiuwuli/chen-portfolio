<script setup>
import { site } from '../data/site'

// 目录式入口（编辑风：编号 + 细线分隔）
const entries = [
  { to: '/projects', no: '01', label: '作品', hint: '3 个完整项目 · 全栈 / 测试 / Agent' },
  { to: '/blog', no: '02', label: '博客', hint: '踩坑与复盘 · 3 篇' },
  { to: '/about', no: '03', label: '关于', hint: '我是谁 · 在学什么' },
]
</script>

<template>
  <section class="hero">
    <div class="container">
      <p class="label hero__eyebrow">Portfolio · 2026</p>
      <h1 class="hero__title">{{ site.brand }}</h1>
      <p class="hero__sub">{{ site.taglines[1] }}</p>
      <p class="hero__intro measure">{{ site.intro }}</p>

      <div class="hero__cta">
        <a class="btn" :href="site.resume">查看简历</a>
        <a class="btn btn--ghost" :href="site.github" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </div>

    <!-- 编辑风目录：编号 + border 分隔线（hover /10→/40）+ 标题斜体 + 箭头右移 -->
    <div class="container hero__entries">
      <RouterLink
        v-for="(e, i) in entries"
        :key="e.no"
        :to="e.to"
        class="entry group"
        v-reveal
        :style="{ transitionDelay: `${i * 90}ms` }"
      >
        <span class="entry__no">{{ e.no }}</span>
        <div class="entry__body">
          <span class="entry__label group-hover-italic">{{ e.label }}</span>
          <span class="entry__hint">{{ e.hint }}</span>
        </div>
        <span class="entry__arrow group-arrow">→</span>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.hero { padding: 120px 0 80px; }

.hero__eyebrow { margin-bottom: 26px; }
.hero__title {
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(4.5rem, 14vw, 9rem);
  line-height: 0.9;
  letter-spacing: -0.03em;
  margin-bottom: 30px;
}
.hero__sub {
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(1.15rem, 2.6vw, 1.5rem);
  color: var(--ink-60);
  margin-bottom: 34px;
}
.hero__intro { color: var(--ink-60); margin-bottom: 46px; }

.hero__cta { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 100px; }

/* 目录式入口：编号 + border 分隔 + group 交互 */
.hero__entries { max-width: 700px; }
.entry {
  display: grid;
  grid-template-columns: 60px 1fr auto;
  gap: 22px; align-items: center;
  border-top: 1px solid var(--ink-10);
  padding: 26px 4px;
  transition: border-color 0.4s ease;
}
.entry:last-child { border-bottom: 1px solid var(--ink-10); }
.entry:hover { border-top-color: var(--ink-40); }
.entry:last-child:hover { border-bottom-color: var(--ink-40); }

.entry__no {
  font-family: var(--serif);
  font-size: 1.4rem; font-weight: 300;
  color: var(--ink-40);
  transition: color 0.4s ease;
}
.entry:hover .entry__no { color: var(--ink); }

.entry__label {
  font-family: var(--serif);
  font-size: 1.35rem; font-weight: 400;
  color: var(--ink);
  letter-spacing: -0.01em;
}
.entry__hint { font-size: 0.85rem; color: var(--ink-60); margin-top: 3px; }
.entry__arrow { font-size: 1.1rem; color: var(--ink-40); }

@media (max-width: 768px) {
  .hero { padding: 80px 0 56px; }
  .entry { grid-template-columns: 44px 1fr auto; gap: 14px; padding: 20px 2px; }
}
</style>
