// 数字滚动：进视口从 0 滚到目标值（easeOutCubic）
import { ref, onMounted, onUnmounted } from 'vue'

export function useCountUp(target, { duration = 1400 } = {}) {
  const value = ref(0)
  let raf = 0
  let started = false

  const animate = () => {
    const t0 = performance.now()
    const step = (now) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      value.value = Math.round(target * eased)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
  }

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      value.value = target
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true
          animate()
          io.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    io.observe(document.getElementById('countup-anchor') || document.body)
  })

  onUnmounted(() => cancelAnimationFrame(raf))

  return value
}
