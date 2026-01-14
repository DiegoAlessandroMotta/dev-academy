import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import '../styles/components/three-background.css'

interface ThreeHeroProps {
  className?: string
  variant?: 'default' | 'compact' | 'minimal'
}

const ThreeHero = ({ className = '', variant = 'default' }: ThreeHeroProps) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const animationFrameRef = useRef<number>()
  const meshesRef = useRef<THREE.Mesh[]>([])
  const timeRef = useRef(0)

  useEffect(() => {
    if (!mountRef.current) return

    const config = {
      default: { particles: 800, geometries: 8, intensity: 0.7 },
      compact: { particles: 500, geometries: 5, intensity: 0.5 },
      minimal: { particles: 300, geometries: 3, intensity: 0.4 },
    }[variant]

    // Nueva paleta de colores
    const colorPalette = [
      new THREE.Color(0x3f0c8f), // galaxy violet
      new THREE.Color(0x6b1ac5), // galaxy purple
      new THREE.Color(0xc82bfa), // galaxy pink
      new THREE.Color(0x30d5c8), // cyan accent
      new THREE.Color(0x59ebff), // sky accent
    ]

    // Escena
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Cámara
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 8)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Partículas
    const particles = new THREE.BufferGeometry()
    const positions = new Float32Array(config.particles * 3)
    const colors = new Float32Array(config.particles * 3)

    for (let i = 0; i < config.particles * 3; i += 3) {
      const radius = 8 + Math.random() * 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      positions[i] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i + 2] = radius * Math.cos(phi)

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i] = color.r
      colors[i + 1] = color.g
      colors[i + 2] = color.b
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: config.intensity,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })

    const particleSystem = new THREE.Points(particles, particleMaterial)
    scene.add(particleSystem)

    // Geometrías principales
    const geometryTypes = [
      () => new THREE.IcosahedronGeometry(0.5, 1),
      () => new THREE.OctahedronGeometry(0.5, 1),
      () => new THREE.TorusKnotGeometry(0.4, 0.1, 64, 12),
    ]

    for (let i = 0; i < config.geometries; i++) {
      const geometryType = geometryTypes[i % geometryTypes.length]
      const geometry = geometryType()
      const color = colorPalette[i % colorPalette.length]

      const material = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.8,
      })

      const mesh = new THREE.Mesh(geometry, material)
      const angle = (i / config.geometries) * Math.PI * 2
      const radius = 2.5
      mesh.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 2
      )

      ;(mesh as any).baseRotation = {
        x: Math.random() * Math.PI,
        y: Math.random() * Math.PI,
        z: Math.random() * Math.PI,
      }
      ;(mesh as any).rotationSpeed = {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01,
      }
      ;(mesh as any).orbitRadius = radius
      ;(mesh as any).orbitSpeed = 0.3 + Math.random() * 0.2
      ;(mesh as any).orbitAngle = angle

      scene.add(mesh)
      meshesRef.current.push(mesh)
    }

    // Luces con nueva paleta
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x30d5c8, 2, 50)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x6b1ac5, 2, 50)
    pointLight2.position.set(-5, -5, 5)
    scene.add(pointLight2)

    // Animación
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)
      timeRef.current += 0.016 // ~60fps

      // Rotar partículas
      particleSystem.rotation.y += 0.001
      particleSystem.rotation.x += 0.0005

      // Animar geometrías
      meshesRef.current.forEach((mesh, index) => {
        const data = mesh as any
        mesh.rotation.x = data.baseRotation.x + timeRef.current * data.rotationSpeed.x
        mesh.rotation.y = data.baseRotation.y + timeRef.current * data.rotationSpeed.y
        mesh.rotation.z = data.baseRotation.z + timeRef.current * data.rotationSpeed.z

        // Órbita suave
        const orbitAngle = data.orbitAngle + timeRef.current * data.orbitSpeed
        mesh.position.x = Math.cos(orbitAngle) * data.orbitRadius
        mesh.position.y = Math.sin(orbitAngle) * data.orbitRadius
        mesh.position.z += Math.sin(timeRef.current * 2 + index) * 0.01
      })

      // Luces
      const lightTime = timeRef.current * 0.4
      pointLight1.position.x = Math.sin(lightTime) * 5
      pointLight1.position.y = Math.cos(lightTime) * 5
      pointLight2.position.x = Math.cos(lightTime) * 5
      pointLight2.position.y = Math.sin(lightTime) * 5

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return
      cameraRef.current.aspect = window.innerWidth / window.innerHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (mountRef.current && rendererRef.current) {
        try {
          mountRef.current.removeChild(rendererRef.current.domElement)
        } catch (e) {
          // Ignorar
        }
      }
      rendererRef.current?.dispose()
      meshesRef.current.forEach((mesh) => {
        mesh.geometry.dispose()
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => mat.dispose())
        } else {
          mesh.material.dispose()
        }
      })
      particleSystem.geometry.dispose()
      if (particleSystem.material instanceof THREE.Material) {
        particleSystem.material.dispose()
      }
      scene.clear()
    }
  }, [variant])

  return <div ref={mountRef} className={`three-hero ${className}`} />
}

export default ThreeHero

