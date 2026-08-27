<script setup>
import { useTypewriter } from '../composables/useTypewriter'
import MagneticButton from '../components/MagneticButton.vue'
import { site } from '../data/site'

const typed = useTypewriter(site.taglines)
</script>

<template>
  <section class="hero">
    <!-- 视差背景层：超大淡字「晨」rate 0.12 + 年份 rate 0.2（前景）+ 砖红竖线 rate 0.35 -->
    <div class="hero__bg" data-parallax="0.12" aria-hidden="true">晨</div>
    <div class="hero__year" data-parallax="0.2" aria-hidden="true">2026</div>
    <div class="hero__rule" data-parallax="0.35" aria-hidden="true"></div>

    <div class="container hero__inner">
      <p class="hero__index" v-reveal>— 封面故事 · Frontend & Full-stack</p>
      <h1 class="hero__title" v-reveal>{{ site.brand }}</h1>
      <p class="hero__typed" v-reveal>
        <span class="typed-text">{{ typed }}</span><span class="caret">▍</span>
      </p>
      <p class="hero__intro measure" v-reveal>{{ site.intro }}</p>

      <div class="hero__cta" v-reveal>
        <MagneticButton :href="site.resume" :external="true">查看简历 ↓</MagneticButton>
        <MagneticButton :href="site.github" :external="true" ghost>GitHub</MagneticButton>
      </div>
    </div>

    <!-- 杂志目录式入口：章节编号 + 顶部细横线 -->
    <div class="container hero__entries">
      <RouterLink to="/projects" class="entry" v-reveal>
        <span class="entry__no">01</span>
        <div class="entry__body">
          <span class="entry__label">作品</span>
          <span class="entry__hint">3 个项目 · 全栈 / 测试 / Agent</span>
        </div>
      </RouterLink>
      <RouterLink to="/blog" class="entry" v-reveal :style="{ transitionDelay: '90ms' }">
        <span class="entry__no">02</span>
        <div class="entry__body">
          <span class="entry__label">博客</span>
          <span class="entry__hint">踩坑与复盘 · 3 篇</span>
        </div>
      </RouterLink>
      <RouterLink to="/about" class="entry" v-reveal :style="{ transitionDelay: '180ms' }">
        <span class="entry__no">03</span>
        <div class="entry__body">
          <span class="entry__label">关于</span>
          <span class="entry__hint">我是谁 · 在学什么</span>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: calc(100vh - var(--nav-h));
  display: flex; flex-direction: column; justify-content: center;
  padding: 72px 0 56px;
  overflow: hidden;
}
/* 视差背景层（transform-only，rate 0.12 慢） */
.hero__bg {
  position: absolute; top: 6%; right: 2%;
  font-family: var(--serif);
  font-size: clamp(14rem, 34vw, 30rem);
  font-weight: 300;
  color: transparent;
  -webkit-text-stroke: 1px var(--ink-20);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}
.hero__year {
  position: absolute; bottom: 14%; left: 4%;
  font-family: var(--serif);
  font-size: clamp(6rem, 16vw, 12rem);
  color: var(--ink-20);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}
.hero__rule {
  position: absolute; top: 0; bottom: 0; left: 34%;
  width: 2px;
  background: var(--brick);
  opacity: 0.35;
  pointer-events: none;
}
.hero__inner { position: relative; z-index: 1; }
.hero__index {
  font-family: var(--serif);
  color: var(--brick);
  font-size: 0.95rem;
  letter-spacing: 2px;
  margin-bottom: 16px;
}
.hero__title {
  font-family: var(--serif);
  font-size: clamp(5rem, 18vw, 11rem);
  font-weight: 600;
  line-height: 0.95;
  letter-spacing: 2px;
  margin-bottom: 10px;
}
.hero__typed {
  font-size: clamp(1.05rem, 2.4vw, 1.4rem);
  color: var(--ink-70);
  min-height: 2em; margin-bottom: 28px;
  font-family: var(--serif);
}
.caret { animation: blink 1s steps(1) infinite; color: var(--brick); }
@keyframes blink { 50% { opacity: 0; } }

.hero__intro { font-size: 1.02rem; margin-bottom: 40px; }

.hero__cta { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 64px; }

/* 目录式入口：border-t 细线 + 衬线编号，hover 砖红 */
.hero__entries { position: relative; z-index: 1; display: flex; flex-direction: column; max-width: 640px; }
.entry {
  display: flex; align-items: center; gap: 22px;
  border-top: 1px solid var(--ink-20);
  padding: 18px 4px;
  transition: color 0.25s ease;
}
.entry:last-child { border-bottom: 1px solid var(--ink-20); }
.entry:hover .entry__no { color: var(--brick); }
.entry__no {
  font-family: var(--serif);
  font-size: 1.6rem; font-weight: 300;
  color: var(--ink-50);
  transition: color 0.25s ease;
  min-width: 52px;
}
.entry__body { display: flex; flex-direction: column; gap: 2px; }
.entry__label { font-family: var(--serif); font-size: 1.35rem; transition: color 0.25s ease; }
.entry:hover .entry__label { color: var(--brick); }
.entry__hint { font-size: 0.88rem; color: var(--ink-70); }
</style>
