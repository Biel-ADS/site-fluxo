import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery.js'
import { markAppReady } from '../hooks/useAppReady.js'

const LETTERS = ['F', 'L', 'U', 'X', 'O', '.']
// Must match the CSS timings below (last letter delay + its duration, then
// the bar's own delay + duration, plus a little breathing room) so the
// overlay never gets pulled away mid-animation.
const FULL_DURATION = 3350
const REDUCED_DURATION = 250
const FADE_DURATION = 500

// Full-screen intro loader: "FLUXO." drops in letter by letter with an
// elastic bounce, a shine sweeps across the wordmark, then the progress
// track fills with an animated accent gradient before the whole thing
// fades away to reveal the site — same technique as the gold-letter-drop
// loader built for other projects, retinted to the FLUXO palette.
export default function Loader() {
  const reducedMotion = usePrefersReducedMotion()
  const [done, setDone] = useState(false)
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    document.body.classList.add('loading-lock')
    const holdTime = reducedMotion ? REDUCED_DURATION : FULL_DURATION
    const doneTimer = setTimeout(() => {
      setDone(true)
      document.body.classList.remove('loading-lock')
      markAppReady()
    }, holdTime)
    const unmountTimer = setTimeout(() => setMounted(false), holdTime + FADE_DURATION)
    return () => {
      clearTimeout(doneTimer)
      clearTimeout(unmountTimer)
      document.body.classList.remove('loading-lock')
    }
  }, [reducedMotion])

  if (!mounted) return null

  return (
    <div className={`loader${done ? ' is-done' : ''}${reducedMotion ? ' no-motion' : ''}`} aria-hidden={done}>
      <div className="loader-glow" />
      <span className="loader-name" aria-label="FLUXO">
        {LETTERS.map((l, i) => (
          <span className="l" key={i}>{l}</span>
        ))}
      </span>
      <div className="loader-track">
        <div className="loader-fill" />
      </div>
      <p className="loader-caption">iniciando sistema</p>
    </div>
  )
}
