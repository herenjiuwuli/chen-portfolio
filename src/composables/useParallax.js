// 视差引擎：共享 rAF 循环 + transform-only（translate3d）
// 用法：元素加 data-parallax="0.15"（速率），背景层 0.1-0.2，前景层 0.35-0.5
// 禁用：prefers-reduced-motion 或移动端（<768px）→ 不绑定滚动，样式归零
export function useParallax() {
  if (typeof window === 'undefined') return () => {}

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const mobile = window.matchMedia('(max-width: 768px)').matches
  if (reduce || mobile) return () => {} // 不动画：CSS 已把 transform 归零

  let ticking = false
  const els = Array.from(document.querySelectorAll('[data-parallax]'))
  if (!els.length) return () => {}

  const onScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      const y = window.scrollY
      els.forEach((el) => {
        const rate = parseFloat(el.dataset.parallax || '0')
        el.style.setProperty('--pe-y', `${-y * rate}px`)
      })
      ticking = false
    })
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll() // 初始位置

  return () => window.removeEventListener('scroll', onScroll)
}
