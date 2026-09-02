import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery.js'

gsap.registerPlugin(ScrollTrigger)

// Splits text into per-letter spans and reveals them one by one on scroll —
// same technique as tobiasahlin/moving-letters (per-char translate + rotate,
// staggered by index), reimplemented with GSAP/ScrollTrigger to match the
// rest of the site's motion stack. Initial hidden state lives in CSS
// (.ml-letter) so there's no flash of unanimated text before JS runs.
export default function SplitText({ children, as: Tag = 'span', className = '' }) {
  const ref = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  const text = typeof children === 'string' ? children : ''
  const letters = useMemo(() => [...text], [text])

  useEffect(() => {
    if (reducedMotion) return
    const el = ref.current
    if (!el) return
    const chars = el.querySelectorAll('.ml-letter')

    const ctx = gsap.context(() => {
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        x: 0,
        rotateZ: 0,
        duration: 0.6,
        ease: 'expo.out',
        stagger: 0.025,
        scrollTrigger: { trigger: el, start: 'top 90%' },
      })
    }, el)

    return () => ctx.revert()
  }, [reducedMotion, text])

  return (
    <Tag ref={ref} className={`split-text ${className}`} aria-label={text}>
      {letters.map((ch, i) =>
        // A real, breakable space between words — not part of the .ml-letter
        // targets — so short tags can still wrap on narrow screens instead
        // of turning into one unbreakable string of letters.
        ch === ' ' ? (
          ' '
        ) : (
          <span className="ml-letter" aria-hidden="true" key={i}>{ch}</span>
        )
      )}
    </Tag>
  )
}
