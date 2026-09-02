import { useEffect, useState } from 'react'

let appReady = false

// Flips once the intro Loader finishes, so above-the-fold entrance
// animations (nav, hero) wait behind the loader instead of playing out
// unseen while it still covers the screen.
export function markAppReady() {
  if (appReady) return
  appReady = true
  window.dispatchEvent(new Event('app:ready'))
}

export function useAppReady() {
  const [ready, setReady] = useState(appReady)

  useEffect(() => {
    if (appReady) {
      setReady(true)
      return
    }
    const onReady = () => setReady(true)
    window.addEventListener('app:ready', onReady)
    return () => window.removeEventListener('app:ready', onReady)
  }, [])

  return ready
}
