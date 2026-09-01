<script setup>
import { projects } from '../data/site'
</script>

<template>
  <section class="section">
    <div class="container">
      <header class="page-head" v-reveal>
        <span class="label">01 — Works</span>
        <h1 class="page-title">作品</h1>
        <p class="page-sub">自己动手做过的完整项目，从练手到能跑的真实工具。</p>
      </header>

      <!-- 每作品一章：12 列网格，左列 sticky（编号 + 墨黑 plate），右列描述滚动 -->
      <article v-for="(p, i) in projects" :key="p.slug" class="project" v-reveal>
        <div class="project__grid">
          <div class="project__sticky">
            <span class="project__no">{{ String(i + 1).padStart(2, '0') }}</span>
            <!-- 图片区：容器裁切 + 子元素慢速放大（Cinematic Zoom） -->
            <div class="project__plate group">
              <div class="project__zoom">
                <span class="project__initial">{{ p.initial }}</span>
              </div>
            </div>
          </div>

          <div class="project__info">
            <h2 class="project__title group-hover-italic">{{ p.title }}</h2>
            <p class="project__blurb">{{ p.blurb }}</p>
            <div class="project__tech">
              <span v-for="t in p.tech" :key="t" class="tag">{{ t }}</span>
            </div>
            <p class="project__note">
              <RouterLink
                v-if="p.post"
                :to="`/blog/${p.post}`"
                class="link-underline project__link"
              >相关文章 →</RouterLink>
              <a
                v-if="p.repo"
                :href="p.repo"
                target="_blank"
                rel="noopener"
                class="link-underline project__link project__link--repo"
              >GitHub 仓库 →</a>
            </p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.project { margin-bottom: 88px; }

/* 12 列网格：sticky 5 列 + 内容 7 列 */
.project__grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 48px;
  align-items: start;
}
.project__sticky { grid-column: 1 / 6; position: sticky; top: calc(var(--nav-h) + 24px); }
.project__no {
  display: block;
  font-family: var(--serif);
  font-size: 2.6rem; font-weight: 300;
  color: var(--ink);
  line-height: 1;
  margin-bottom: 18px;
}

/* 墨黑 plate：图片区容器（hover 边框加深 + 内层慢速放大） */
.project__plate { border: 1px solid var(--ink-10); overflow: hidden; transition: border-color 0.4s ease; }
.project__plate:hover { border-color: var(--ink-40); }
.project__zoom {
  background: var(--ink);
  display: flex; align-items: center; justify-content: center;
  height: min(400px, 56vh);
  transition: transform 1s ease;
}
.group:hover .project__zoom { transform: scale(1.05); }
.project__initial {
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(5rem, 10vw, 7.5rem);
  color: #f9f8f6;
  line-height: 1;
}

.project__info { grid-column: 6 / 13; padding-top: 10px; }
.project__title {
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(1.7rem, 3.5vw, 2.4rem);
  letter-spacing: -0.02em;
  margin-bottom: 18px;
}
.project__blurb { color: var(--ink-60); max-width: var(--measure); margin-bottom: 24px; }
.project__tech { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
.tag {
  font-size: 0.75rem; letter-spacing: 0.06em;
  border: 1px solid var(--ink-10);
  padding: 4px 12px;
  color: var(--ink-60);
  transition: border-color 0.3s ease;
}
.tag:hover { border-color: var(--ink-40); }
.project__note { border-top: 1px solid var(--ink-10); padding-top: 18px; }
.project__link { font-size: 0.9rem; margin-right: 18px; }
.project__link--repo { color: var(--ink-60); }
.project__link--repo:hover { color: var(--ink); }

@media (max-width: 768px) {
  .project { margin-bottom: 64px; }
  .project__grid { grid-template-columns: 1fr; gap: 24px; }
  .project__sticky { position: static; }
  .project__zoom { height: 220px; }
}
</style>
