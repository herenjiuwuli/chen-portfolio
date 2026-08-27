// 滚动渐显：元素进入视口 → 加 .is-visible
const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const vReveal = {
  mounted(el) {
    if (prefersReduced()) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            io.unobserve(el)
          }
        })
      },
      { rootMargin: '-8% 0px' }
    )
    io.observe(el)
  },
}
