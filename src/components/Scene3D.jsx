import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { useIsMobile, usePrefersReducedMotion } from '../hooks/useMediaQuery.js'

const OrbCanvas = lazy(() => import('./scene/OrbCanvas.jsx'))

/**
 * Wraps the 3D hero/CTA scene with mobile-aware quality settings and
 * lazy-mounting: the canvas (and its ~300kB three.js chunk) only loads
 * once the section is close to the viewport, and geometry/particle counts
 * drop on small screens or when the user prefers reduced motion.
 */
export default function Scene3D({ className, color, radius = 2.1, particleColor, autoRotateSpeed = 0.06, mouseInfluence = 0.25 }) {
  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()
  const wrapperRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true)
      setIsVisible(true)
      return
    }
    // Keeps watching after the first mount (rather than disconnecting) so the
    // WebGL render loop can pause via frameloop="never" once the orb scrolls
    // out of view — the canvas stays mounted (no re-play of the assembly
    // animation) but stops burning GPU/battery while off-screen.
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true)
            setIsVisible(true)
          } else {
            setIsVisible(false)
          }
        })
      },
      { rootMargin: '400px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const orbProps = {
    color,
    radius,
    particleColor,
    autoRotateSpeed: reducedMotion ? 0 : autoRotateSpeed,
    mouseInfluence: reducedMotion ? 0 : mouseInfluence,
    detail: isMobile ? 0 : 1,
    particleCount: isMobile ? 70 : 220,
    enableFloat: !reducedMotion,
    enableMotion: !reducedMotion,
    assemble: !reducedMotion,
  }

  const dpr = isMobile ? [1, 1] : [1, 1.8]

  return (
    <div className={className} ref={wrapperRef}>
      {shouldLoad && (
        <Suspense fallback={null}>
          <OrbCanvas dpr={dpr} orbProps={orbProps} frameloop={isVisible ? 'always' : 'never'} />
        </Suspense>
      )}
    </div>
  )
}
