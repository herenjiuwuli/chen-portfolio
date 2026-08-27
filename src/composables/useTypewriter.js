// 打字机：逐字追加 + ▍光标闪烁；循环播放句子
import { ref, onMounted, onUnmounted } from 'vue'

export function useTypewriter(phrases, { speed = 80, pause = 1600 } = {}) {
  const text = ref('')
  let timers = []

  const wait = (fn, ms) => timers.push(setTimeout(fn, ms))

  const play = (pi = 0, ci = 0) => {
    const phrase = phrases[pi % phrases.length]
    if (ci <= phrase.length) {
      text.value = phrase.slice(0, ci)
      wait(() => play(pi, ci + 1), speed)
    } else {
      wait(() => play(pi + 1, 0), pause) // 删字效果可选，直接切下一句
    }
  }

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      text.value = phrases[0]
      return
    }
    play()
  })
  onUnmounted(() => timers.forEach(clearTimeout))

  return text
}
