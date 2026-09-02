import { useEffect, useState } from 'react'

export function useScrollState() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false
    const update = () => {
      ticking = false
      const top = window.scrollY || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (top / docHeight) * 100 : 0)
      setScrolled(top > 40)
    }
    // Coalesce to one state update per animation frame instead of one per
    // scroll event (which can fire far faster than the screen refreshes,
    // especially on mobile) — keeps scrolling smooth under React re-renders.
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { scrolled, progress }
}
