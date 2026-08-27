<script setup>
import { projects } from '../data/site'
</script>

<template>
  <section class="section">
    <div class="container">
      <header class="page-head" v-reveal>
        <span class="page-index">01 — 作品集</span>
        <h1 class="page-title">作品</h1>
        <p class="page-sub">自己动手做过的完整项目，从练手到能跑的真实工具。</p>
      </header>

      <!-- 每个作品一章：sticky 图文交错（左列钉住，右列描述滚动） -->
      <article v-for="(p, i) in projects" :key="p.slug" class="chapter" v-reveal>
        <span class="chapter__no">{{ String(i + 1).padStart(2, '0') }}</span>

        <div class="interlock">
          <!-- sticky 钉住列：墨黑底 + 衬线首字母 + 编号 -->
          <div class="interlock__sticky">
            <div class="plate" :style="{ background: p.colorDark || '#1a1712' }">
              <span class="plate__initial">{{ p.initial }}</span>
              <span class="plate__no">{{ String(i + 1).padStart(2, '0') }}</span>
            </div>
          </div>

          <!-- 滚动列：标题 + 描述 + 技术标签 -->
          <div class="interlock__scroll">
            <h2 class="interlock__title">{{ p.title }}</h2>
            <p class="interlock__blurb">{{ p.blurb }}</p>
            <div class="interlock__tech">
              <span v-for="t in p.tech" :key="t" class="tag">{{ t }}</span>
            </div>
            <p class="interlock__note">
              <RouterLink :to="`/blog/${p.slug === 'mcn-data-tool' ? 'extension-scraping' : p.slug === 'ai-topic-agent' ? 'pytest-api-testing' : 'shop-recap'}`" class="interlock__link">
                相关文章 →
              </RouterLink>
            </p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.chapter { margin-bottom: 72px; }

/* sticky 图文交错：左列钉住 100vh，右列正常滚动 */
.interlock {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 48px;
  align-items: start;
  margin-top: 28px;
}
.interlock__sticky { position: sticky; top: calc(var(--nav-h) + 24px); }
.plate {
  position: relative;
  height: min(420px, 62vh);
  display: flex; align-items: center; justify-content: center;
}
.plate__initial {
  font-family: var(--serif);
  font-size: clamp(6rem, 12vw, 9rem);
  font-weight: 600;
  color: var(--paper);
  line-height: 1;
}
.plate__no {
  position: absolute; bottom: 18px; right: 22px;
  font-family: var(--serif);
  font-size: 1.1rem; letter-spacing: 2px;
  color: rgba(245, 240, 230, 0.7);
}
.interlock__scroll { padding-top: 8px; }
.interlock__title { font-family: var(--serif); font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 600; margin-bottom: 16px; }
.interlock__blurb { color: var(--ink-70); max-width: var(--measure); margin-bottom: 20px; }
.interlock__tech { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 22px; }
.tag {
  font-family: var(--mono);
  font-size: 0.78rem;
  border: 1px solid var(--ink-20);
  padding: 3px 12px;
  color: var(--ink-70);
}
.interlock__note { border-top: 1px solid var(--ink-20); padding-top: 16px; }
.interlock__link { color: var(--brick); border-bottom: 1px solid transparent; transition: border-color 0.2s; }
.interlock__link:hover { border-bottom-color: var(--brick); }

@media (max-width: 768px) {
  .interlock { grid-template-columns: 1fr; gap: 24px; }
  .interlock__sticky { position: static; }
  .plate { height: 220px; }
}
</style>
