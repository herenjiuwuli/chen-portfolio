<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 磁吸按钮：鼠标靠近时按钮向鼠标偏移（≤8px），移出回弹
const props = defineProps({
  href: { type: String, default: '#' },
  external: { type: Boolean, default: false },
  ghost: { type: Boolean, default: false },
  as: { type: String, default: 'a' },
})

const el = ref(null)
let raf = 0

const onMove = (e) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const r = el.value.getBoundingClientRect()
  const dx = e.clientX - (r.left + r.width / 2)
  const dy = e.clientY - (r.top + r.height / 2)
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(() => {
    // 杂志式克制位移（≤4px 量级）
    el.value.style.transform = `translate(${dx * 0.1}px, ${dy * 0.12}px)`
  })
}
const onLeave = () => {
  cancelAnimationFrame(raf)
  el.value.style.transform = ''
}

onMounted(() => {
  el.value.addEventListener('mousemove', onMove)
  el.value.addEventListener('mouseleave', onLeave)
})
onUnmounted(() => {
  if (el.value) {
    el.value.removeEventListener('mousemove', onMove)
    el.value.removeEventListener('mouseleave', onLeave)
  }
})
</script>

<template>
  <a
    ref="el"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    class="btn"
    :class="{ 'btn--ghost': ghost }"
    style="display: inline-block; will-change: transform"
  >
    <slot />
  </a>
</template>
