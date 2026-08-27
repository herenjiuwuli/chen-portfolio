<script setup>
import { useCountUp } from '../composables/useCountUp'
import MagneticButton from '../components/MagneticButton.vue'
import { site } from '../data/site'

const projectCount = useCountUp(3)
const testCount = useCountUp(82)
const blogCount = useCountUp(3)

const skills = [
  { name: 'Vue3 / Vite', level: '日常主力' },
  { name: 'JavaScript', level: '持续精进' },
  { name: 'Node / Express', level: '能写后端' },
  { name: '测试（Vitest · pytest · Playwright）', level: '82+ 用例实践' },
  { name: 'CI / 部署', level: 'GitHub Actions · Cloudflare · Vercel' },
  { name: '数据工具链', level: '采集 → 看板 → 多维表格' },
]
</script>

<template>
  <section class="section">
    <div class="container">
      <header class="page-head" v-reveal>
        <span class="page-index">03 — 自述</span>
        <h1 class="page-title">关于</h1>
        <p class="page-sub">一个想把重复劳动写成工具的前端学习者。</p>
      </header>

      <!-- countUp 触发锚点 -->
      <div id="countup-anchor" aria-hidden="true"></div>

      <!-- 章节一：我是谁 -->
      <section class="chapter" v-reveal>
        <span class="chapter__no">01</span>
        <div class="chapter__grid">
          <h2 class="chapter__title">我是谁</h2>
          <div class="chapter__body">
            <p class="measure">{{ site.intro }}</p>
            <p class="measure">
              目前的技术路线：先把 Vue3 前端基本功打扎实，再用真实项目把「测试 + 部署 + 数据」这条链路走通，
              目标是成为一个能独立交付完整功能的全栈开发者。
            </p>
          </div>
        </div>
      </section>

      <!-- 章节二：一些数字 -->
      <section class="chapter" v-reveal>
        <span class="chapter__no">02</span>
        <div class="chapter__grid">
          <h2 class="chapter__title">一些数字</h2>
          <div class="stats">
            <div class="stat">
              <span class="stat__num">{{ projectCount }}</span>
              <span class="stat__label">个作品</span>
            </div>
            <div class="stat">
              <span class="stat__num">{{ testCount }}+</span>
              <span class="stat__label">个自动化测试</span>
            </div>
            <div class="stat">
              <span class="stat__num">{{ blogCount }}</span>
              <span class="stat__label">篇博客</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 章节三：技能与方向 -->
      <section class="chapter" v-reveal>
        <span class="chapter__no">03</span>
        <div class="chapter__grid">
          <h2 class="chapter__title">技能与方向</h2>
          <ul class="skills">
            <li v-for="s in skills" :key="s.name" class="skill">
              <span class="skill__name">{{ s.name }}</span>
              <span class="skill__level">{{ s.level }}</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- 章节四：联系 -->
      <section class="chapter" v-reveal>
        <span class="chapter__no">04</span>
        <div class="chapter__grid">
          <h2 class="chapter__title">联系我</h2>
          <div>
            <p class="measure">欢迎交流前端、测试、数据相关的话题，也接受简历建议。</p>
            <div class="about__btns">
              <MagneticButton :href="`mailto:${site.email}`">发邮件：{{ site.email }}</MagneticButton>
              <MagneticButton :href="site.github" :external="true" ghost>GitHub：herenjiuwuli</MagneticButton>
              <MagneticButton :href="site.resume" :external="true" ghost>下载简历</MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.chapter { margin-bottom: 56px; }
.chapter__grid {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 40px;
  margin-top: 26px;
}
.chapter__body p { margin-bottom: 12px; color: var(--ink-70); }

.stats { display: flex; gap: 44px; flex-wrap: wrap; padding-top: 4px; }
.stat { display: flex; flex-direction: column; }
.stat__num { font-family: var(--serif); font-size: 2.6rem; font-weight: 300; color: var(--brick); }
.stat__label { font-size: 0.9rem; color: var(--ink-70); }

.skills { list-style: none; }
.skill {
  display: flex; justify-content: space-between; align-items: baseline;
  border-bottom: 1px solid var(--ink-20);
  padding: 14px 2px;
}
.skill__name { font-family: var(--serif); font-size: 1.05rem; }
.skill__level { color: var(--ink-70); font-size: 0.88rem; }

.about__btns { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 22px; }

@media (max-width: 768px) {
  .chapter__grid { grid-template-columns: 1fr; gap: 18px; }
}
</style>
