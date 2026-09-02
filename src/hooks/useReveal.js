import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = el.classList.contains('reveal') ? [el] : el.querySelectorAll('.reveal')
    const list = targets.length ? targets : [el]

    const ctx = gsap.context(() => {
      list.forEach((target) => {
        gsap.to(target, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: target, start: 'top 88%' },
        })
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}
