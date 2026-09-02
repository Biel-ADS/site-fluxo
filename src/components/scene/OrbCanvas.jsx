import { Canvas } from '@react-three/fiber'
import NetworkOrb from './NetworkOrb.jsx'

// Split into its own chunk (see Scene3D.jsx) so the ~300kB three.js/R3F/drei
// payload downloads separately from the critical text+GSAP bundle.
export default function OrbCanvas({ dpr, orbProps, frameloop = 'always' }) {
  return (
    <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }} dpr={dpr} gl={{ antialias: dpr[1] > 1 }} frameloop={frameloop}>
      <NetworkOrb {...orbProps} />
    </Canvas>
  )
}
