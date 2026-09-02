import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Points, PointMaterial, Line } from '@react-three/drei'
import gsap from 'gsap'
import * as THREE from 'three'
import { useAppReady } from '../../hooks/useAppReady.js'

// Icosahedron vertex positions become "nodes"; nearby nodes get connected
// with thin lines — a 3D take on the automation-network motif used across the site.
function useNodePositions(radius, detail) {
  return useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(radius, detail)
    const pos = geo.attributes.position
    const points = []
    const seen = new Set()
    for (let i = 0; i < pos.count; i++) {
      const key = `${pos.getX(i).toFixed(2)}_${pos.getY(i).toFixed(2)}_${pos.getZ(i).toFixed(2)}`
      if (seen.has(key)) continue
      seen.add(key)
      points.push(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)))
    }
    geo.dispose()
    return points
  }, [radius, detail])
}

function useSegments(points, maxDist) {
  return useMemo(() => {
    const segs = []
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < maxDist) segs.push({ ai: i, aj: j, a: points[i], b: points[j] })
      }
    }
    return segs
  }, [points, maxDist])
}

// Breadth-first traversal from a root node: returns the connection order
// ("waves" of edges linking a newly-reached node to the network) plus the
// leftover edges that only close the mesh once every node is already wired.
function buildAssemblyPlan(points, segments) {
  const n = points.length
  const adj = Array.from({ length: n }, () => [])
  segments.forEach((seg, segIndex) => {
    adj[seg.ai].push({ to: seg.aj, segIndex })
    adj[seg.aj].push({ to: seg.ai, segIndex })
  })

  const visited = new Array(n).fill(false)
  const root = 0
  visited[root] = true
  let frontier = [root]
  const waves = []
  const treeSegSet = new Set()

  while (frontier.length) {
    const next = []
    const edges = []
    for (const node of frontier) {
      for (const { to, segIndex } of adj[node]) {
        if (!visited[to]) {
          visited[to] = true
          edges.push({ segIndex, from: node, to })
          treeSegSet.add(segIndex)
          next.push(to)
        }
      }
    }
    if (edges.length) waves.push(edges)
    frontier = next
  }

  const extraSegIndices = segments.reduce((acc, _, i) => {
    if (!treeSegSet.has(i)) acc.push(i)
    return acc
  }, [])

  return { root, waves, extraSegIndices }
}

function DriftingParticles({ count, spread, color, size, spin, matRef }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread
      arr[i * 3 + 2] = (Math.random() - 0.5) * spread
    }
    return arr
  }, [count, spread])

  useFrame((_, delta) => {
    if (ref.current && spin && !document.hidden) ref.current.rotation.y += delta * 0.02
  })

  if (count <= 0) return null

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial ref={matRef} transparent color={color} size={size} sizeAttenuation depthWrite={false} opacity={0} />
    </Points>
  )
}

export default function NetworkOrb({
  color = '#C9FF3D',
  radius = 2.1,
  detail = 1,
  particleColor,
  particleCount = 220,
  autoRotateSpeed = 0.06,
  mouseInfluence = 0.25,
  enableFloat = true,
  enableMotion = true,
  assemble = true,
}) {
  const group = useRef()
  const wireMatRef = useRef()
  const particleMatRef = useRef()
  const nodeRefs = useRef([])
  const lineRefs = useRef([])
  const assembled = useRef(false)
  const appReady = useAppReady()

  const points = useNodePositions(radius, detail)
  const segments = useSegments(points, radius * 1.05)

  nodeRefs.current = []
  lineRefs.current = []

  useFrame((state, delta) => {
    if (!group.current || !enableMotion || document.hidden) return
    group.current.rotation.y += delta * autoRotateSpeed
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * mouseInfluence,
      0.04
    )
    group.current.rotation.y += state.pointer.x * 0.0004
  })

  // Builds the structure instead of popping in fully formed. Waits for the
  // intro Loader to hand off (useAppReady) before starting — otherwise the
  // whole assembly would play out hidden behind the loader and the orb
  // would just appear already-formed once it fades away.
  useLayoutEffect(() => {
    if (assembled.current) return

    const nodeScales = nodeRefs.current.map((m) => m.scale)
    const lineMats = lineRefs.current.map((l) => l.material)

    if (!assemble) {
      assembled.current = true
      nodeScales.forEach((s) => s.set(1, 1, 1))
      if (wireMatRef.current) wireMatRef.current.opacity = 0.5
      lineMats.forEach((m) => { m.opacity = 0.35 })
      if (particleMatRef.current) particleMatRef.current.opacity = 0.8
      if (group.current) group.current.scale.set(1, 1, 1)
      return
    }

    nodeScales.forEach((s) => s.set(0, 0, 0))
    lineMats.forEach((m) => { m.opacity = 0 })
    if (wireMatRef.current) wireMatRef.current.opacity = 0
    if (particleMatRef.current) particleMatRef.current.opacity = 0
    if (group.current) group.current.scale.set(0.55, 0.55, 0.55)

    if (!appReady) return

    assembled.current = true
    const { root, waves, extraSegIndices } = buildAssemblyPlan(points, segments)
    const LINE_OPACITY = 0.35

    const tl = gsap.timeline({ defaults: { overwrite: 'auto' } })
    tl.to(group.current.scale, { x: 1, y: 1, z: 1, duration: 1.4, ease: 'power3.out' }, 0)
    if (particleMatRef.current) {
      tl.to(particleMatRef.current, { opacity: 0.8, duration: 1.1, ease: 'power2.out' }, 0.2)
    }

    // Root node pops in first, then each wave of edges "draws" from an
    // already-connected node out to a new one — the network assembling
    // outward, point by point, instead of everything fading in at once.
    if (nodeScales[root]) {
      tl.to(nodeScales[root], { x: 1, y: 1, z: 1, duration: 0.4, ease: 'back.out(2.6)' }, 0.15)
    }

    const drawDuration = 0.5
    const waveGap = 0.16
    const edgeStagger = 0.05
    let cursor = 0.3

    waves.forEach((wave) => {
      wave.forEach(({ segIndex, from, to }, k) => {
        const line = lineRefs.current[segIndex]
        const nodeScale = nodeScales[to]
        const start = cursor + k * edgeStagger
        if (line) {
          const fromP = points[from]
          const toP = points[to]
          const proxy = { t: 0 }
          tl.to(line.material, { opacity: LINE_OPACITY, duration: 0.15, ease: 'power1.out' }, start)
          tl.to(proxy, {
            t: 1,
            duration: drawDuration,
            ease: 'power2.inOut',
            onUpdate: () => {
              const t = proxy.t
              line.geometry.setPositions([
                fromP.x, fromP.y, fromP.z,
                fromP.x + (toP.x - fromP.x) * t,
                fromP.y + (toP.y - fromP.y) * t,
                fromP.z + (toP.z - fromP.z) * t,
              ])
            },
          }, start)
        }
        if (nodeScale) {
          tl.to(nodeScale, { x: 1, y: 1, z: 1, duration: 0.35, ease: 'back.out(2.6)' }, start + drawDuration * 0.75)
        }
      })
      cursor += waveGap + (wave.length - 1) * edgeStagger
    })

    // Once the whole shape is wired up, quietly fill in the remaining
    // short links and the wireframe glow so the orb reads as fully formed.
    const settleStart = cursor + 0.15
    if (wireMatRef.current) {
      tl.to(wireMatRef.current, { opacity: 0.5, duration: 0.7, ease: 'power2.out' }, settleStart)
    }
    if (extraSegIndices.length) {
      const extraMats = extraSegIndices.map((i) => lineRefs.current[i]?.material).filter(Boolean)
      tl.to(extraMats, { opacity: LINE_OPACITY, duration: 0.6, stagger: 0.35 / extraMats.length, ease: 'power1.out' }, settleStart)
    }

    return () => tl.kill()
  }, [assemble, points, segments, appReady])

  const orb = (
    <>
      <mesh>
        <icosahedronGeometry args={[radius, detail]} />
        <meshBasicMaterial ref={wireMatRef} color={color} wireframe transparent opacity={0} />
      </mesh>
      <group>
        {segments.map((seg, i) => (
          <Line
            key={i}
            ref={(el) => { if (el) lineRefs.current[i] = el }}
            points={[seg.a, seg.b]}
            color={color}
            transparent
            opacity={0}
            lineWidth={1}
          />
        ))}
      </group>
      {points.map((p, i) => (
        <mesh key={i} position={p} ref={(el) => { if (el) nodeRefs.current[i] = el }}>
          <sphereGeometry args={[0.028, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </>
  )

  return (
    <group ref={group}>
      {enableFloat ? (
        <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
          {orb}
        </Float>
      ) : (
        orb
      )}
      <DriftingParticles
        count={particleCount}
        spread={9}
        color={particleColor || color}
        size={0.02}
        spin={enableMotion}
        matRef={particleMatRef}
      />
    </group>
  )
}
