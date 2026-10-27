<script setup>
/**
 * 首页：暖纸浅色 + 滚动驱动版式
 * 版式与动效参数是从 preview/mishano-motion-prototype.html 逐屏真机调出来的，
 * 改数值前先看 src/styles/mishano.css 里的注释，别凭感觉调。
 */
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { capabilities, posts, site, works } from '../data/site'

const postsCount = posts.length

const heroEl = ref(null)
const progressEl = ref(null)
const worksEl = ref(null)
const trackEl = ref(null)
const capsEl = ref(null)
const stackEl = ref(null)
const capRailEl = ref(null)
const hudRailEl = ref(null)
const contactEl = ref(null)

/* 只做「当前第几个 / 是否已入场」这类会改变 DOM 类名的状态；
   每帧都在变的 transform 走命令式，避免整页重渲染 */
const active = ref(-1)
const seen = ref(works.map(() => false))
const capIndex = ref(0)
const contactIn = ref(false)

const isMobile = ref(false)
const reduceMotion = ref(false)
const pinned = computed(() => !isMobile.value && !reduceMotion.value)
/* 作品段高度跟着作品数量走：增删作品不用改 CSS；窄屏/减弱动效要退回 auto */
const worksStyle = computed(() =>
  pinned.value ? { height: `calc(100vh * (1 + ${works.length - 1} * var(--span)))` } : {},
)

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

let mqMobile
let mqReduce
let io
let raf = 0
let panels = []
let nums = []
let cards = []
let dockLinks = []

function setActive(i) {
  if (i === active.value) return
  active.value = i
  if (seen.value[i] === false) seen.value[i] = true // 一次点亮，之后不再撤销
}

function update() {
  raf = 0
  if (!heroEl.value || !worksEl.value) return

  const y = window.scrollY
  const max = document.body.scrollHeight - window.innerHeight
  progressEl.value.style.transform = `scaleX(${max > 0 ? clamp(y / max, 0, 1) : 0})`
  heroEl.value.style.setProperty('--hp', clamp(y / (window.innerHeight * 0.95), 0, 1).toFixed(3))

  if (!pinned.value) {
    setActive(0)
    seen.value = works.map(() => true) // 取消钉住时全部直接显示
    cards.forEach((c) => {
      c.style.transform = ''
      c.style.removeProperty('--covered')
    })
    return
  }

  /* ---------- ② 横向滑轨 ---------- */
  const wTotal = worksEl.value.offsetHeight - window.innerHeight
  if (wTotal > 0) {
    const p = clamp((y - worksEl.value.offsetTop) / wTotal, 0, 1)
    const n = panels.length
    trackEl.value.style.transform = `translate3d(${-p * (n - 1) * window.innerWidth}px,0,0)`
    hudRailEl.value.style.transform = `scaleX(${p})`

    panels.forEach((el, i) => {
      // 大编号反向视差：比内容慢半步，画面才有层次
      const local = clamp(i - p * (n - 1), -1, 1)
      nums[i].style.transform = `translate3d(${local * 46}px,0,0)`
    })
    setActive(Math.round(p * (n - 1)))
  }

  /* ---------- ③ 工作方式：按滚动进度逐张压上来 ----------
     不依赖多元素 sticky（那会在容器到底时让最后一张反压第一张），
     而是用进度直接算每张卡的位移，顺序永远是对的。 */
  const cTotal = capsEl.value.offsetHeight - window.innerHeight
  if (cTotal > 0) {
    const cp = clamp((y - capsEl.value.offsetTop) / cTotal, 0, 1)
    const n = cards.length
    capRailEl.value.style.transform = `scaleX(${cp})`
    capIndex.value = Math.min(n, Math.floor(cp * n) + 1)

    cards.forEach((card, i) => {
      const land = i / n // 落位进度
      const rise = clamp((land - cp) / 0.3, 0, 1) // 1 = 还在下面
      const ty = rise * (window.innerHeight * 0.96)
      const covered = clamp((cp - (i + 1) / n) / 0.3, 0, 1) // 被后一张压住的程度
      const s = 1 - covered * 0.04
      card.style.transform = `translate3d(0,${ty.toFixed(1)}px,0) scale(${s.toFixed(4)})`
      card.style.setProperty('--covered', covered.toFixed(3))
    })
  }
}

function onScroll() {
  if (!raf) raf = requestAnimationFrame(update)
}

function updateDock() {
  const mid = window.innerHeight * 0.5
  let best = 0
  const els = secEls()
  els.forEach((s, i) => {
    if (!s) return
    const r = s.getBoundingClientRect()
    if (r.top <= mid && r.bottom > mid) best = i
  })
  dockLinks.forEach((a, i) => a.classList.toggle('on', i === best))
}

/* 不能用 href="#works"：本站是 hash 路由，它会被当成路径 /works 而重定向回首页 */
const secEls = () => [worksEl.value, capsEl.value, contactEl.value]

function goSection(i) {
  secEls()[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function gotoWork(i) {
  const total = worksEl.value.offsetHeight - window.innerHeight
  window.scrollTo({
    top: worksEl.value.offsetTop + (i / (works.length - 1)) * total,
    behavior: 'smooth',
  })
}

function onResize() {
  update()
}

/* 断点/动效偏好切换：钉住模式下要算高度，切回纵向时要清空 */
function syncMq() {
  isMobile.value = mqMobile.matches
  reduceMotion.value = mqReduce.matches
  nextTick(update)
}

onMounted(async () => {
  mqMobile = window.matchMedia('(max-width:760px)')
  mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
  isMobile.value = mqMobile.matches
  reduceMotion.value = mqReduce.matches

  mqMobile.addEventListener('change', syncMq)
  mqReduce.addEventListener('change', syncMq)

  await nextTick()

  panels = [...trackEl.value.querySelectorAll('.panel')]
  nums = panels.map((p) => p.querySelector('.p-num'))
  cards = [...stackEl.value.querySelectorAll('.scard')]
  dockLinks = [...document.querySelectorAll('.dock a')]

  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        contactIn.value = true
        io.unobserve(e.target)
      })
    },
    { threshold: 0.25 },
  )
  io.observe(contactEl.value)

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('scroll', updateDock, { passive: true })
  window.addEventListener('resize', onResize)

  update()
  updateDock()

  // 从博客返回时浏览器可能恢复滚动位置，补一次
  window.addEventListener('load', update, { once: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('scroll', updateDock)
  window.removeEventListener('resize', onResize)
  mqMobile?.removeEventListener('change', syncMq)
  mqReduce?.removeEventListener('change', syncMq)
  io?.disconnect()
  if (raf) cancelAnimationFrame(raf)
})
</script>

<template>
  <div class="progress" ref="progressEl"></div>

  <header class="top">
    <div class="brand">{{ site.brand }}</div>
  </header>

  <!-- ① 首屏 -->
  <section class="hero" id="hero" ref="heroEl">
    <div class="eyebrow">{{ site.eyebrow }}</div>
    <h1>{{ site.brand }}<span class="dot">.</span></h1>
    <div class="lede">
      <p v-html="site.lede"></p>
      <p class="lede2">{{ site.lede2 }}</p>
      <span class="rule"></span>
    </div>
    <div class="hint">SCROLL</div>
  </section>

  <!-- ② 作品：横向滑轨，单一底色 -->
  <section class="works-wrap" id="works" ref="worksEl" :style="worksStyle">
    <div class="track-sticky">
      <div class="track-viewport">
        <div class="track" ref="trackEl">
          <article
            v-for="(w, i) in works"
            :key="w.no"
            class="panel"
            :class="{ 'is-on': active === i, seen: seen[i] }"
          >
            <div class="p-num">{{ w.no }}</div>
            <div class="p-body">
              <h3 class="p-anim">
                <span>{{ w.title }}</span>
                <small>{{ w.sub }}</small>
              </h3>
              <p class="p-anim"><span>{{ w.desc }}</span></p>
              <div class="p-links">
                <a
                  v-for="l in w.links"
                  :key="l.href"
                  class="p-link"
                  :href="l.href"
                  target="_blank"
                  rel="noopener"
                  >{{ l.label }}<i>↗</i></a
                >
              </div>
            </div>
            <ul class="p-meta">
              <li v-for="m in w.meta" :key="m.b"><b>{{ m.b }}</b>{{ m.rest }}</li>
            </ul>
          </article>
        </div>
      </div>

      <div class="track-head">
        <h2>作品</h2>
      </div>

      <div class="hud">
        <div class="count"><b>{{ String(active + 1).padStart(2, '0') }}</b> / {{ String(works.length).padStart(2, '0') }}</div>
        <div class="rail"><i ref="hudRailEl"></i></div>
        <div class="dots">
          <button
            v-for="(w, i) in works"
            :key="w.no"
            :class="{ on: active === i }"
            :aria-label="`第 ${i + 1} 个作品`"
            @click="gotoWork(i)"
          ></button>
        </div>
      </div>
    </div>
  </section>

  <!-- ③ 工作方式：卡片逐张从下方叠上来 -->
  <section class="caps-wrap" id="caps" ref="capsEl">
    <div class="caps-sticky">
      <div class="caps-head">
        <h2>工作方式</h2>
        <span class="idx">02</span>
      </div>

      <div class="stack" ref="stackEl">
        <article
          v-for="(c, i) in capabilities"
          :key="c.no"
          class="scard"
          :style="{ '--i': i }"
        >
          <div class="sbar">
            <span class="sidx">{{ c.no }}</span>
            <span class="sk">{{ c.tag }}</span>
            <span class="sline"></span>
          </div>
          <div class="sbody">
            <h3>{{ c.h[0] }}<br />{{ c.h[1] }}</h3>
            <p class="note">
              {{ c.note }}<span class="stack-line">{{ c.stack }}</span>
            </p>
          </div>
        </article>
      </div>

      <div class="caps-hud">
        <div class="count">
          <b>{{ String(capIndex).padStart(2, '0') }}</b> / {{ String(capabilities.length).padStart(2, '0') }}
        </div>
        <div class="rail"><i ref="capRailEl"></i></div>
      </div>
    </div>
  </section>

  <!-- ④ 联系 -->
  <section class="contact" id="contact" ref="contactEl" :class="{ in: contactIn }">
    <div class="sec-head"><h2>联系<span class="dot">.</span></h2></div>
    <div class="links">
      <a :href="`mailto:${site.email}`">{{ site.email }}</a>
      <a :href="site.github" target="_blank" rel="noopener">github.com/herenjiuwuli</a>
      <RouterLink to="/blog">{{ postsCount }} 篇笔记</RouterLink>
    </div>
    <p class="cta-note">{{ site.cta }}</p>
    <ul class="c-meta">
      <li><b>{{ site.city }}</b>意向城市</li>
      <li><b>{{ site.track }}</b>目标方向</li>
      <li><b>{{ site.status }}</b>状态</li>
    </ul>
    <div class="foot">
      <span>{{ site.name }}</span>
      <span>{{ site.city }} · {{ site.status }}</span>
      <span>{{ site.track }}</span>
      <span>2026</span>
    </div>
  </section>

  <nav class="dock">
    <a href="#works" @click.prevent="goSection(0)">作品</a>
    <a href="#caps" @click.prevent="goSection(1)">方式</a>
    <a href="#contact" @click.prevent="goSection(2)">联系</a>
  </nav>
</template>
