import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import '../styles/components/three-background.css'

interface ThreeBackgroundProps {
  className?: string
}

const ThreeBackground = ({ className = '' }: ThreeBackgroundProps) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    if (!mountRef.current) return


    // Escena
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Cámara
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Partículas
    const particleCount = 2000
    const particles = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    // Nueva paleta de colores
    const colorPalette = [
      new THREE.Color(0x3f0c8f), // galaxy violet
      new THREE.Color(0x6b1ac5), // galaxy purple
      new THREE.Color(0xc82bfa), // galaxy pink
      new THREE.Color(0x30d5c8), // cyan accent
      new THREE.Color(0x59ebff), // sky accent
    ]

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20
      positions[i + 1] = (Math.random() - 0.5) * 20
      positions[i + 2] = (Math.random() - 0.5) * 20

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i] = color.r
      colors[i + 1] = color.g
      colors[i + 2] = color.b
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })

    const particleSystem = new THREE.Points(particles, particleMaterial)
    scene.add(particleSystem)

    // Geometrías flotantes
    const geometries: THREE.Mesh[] = []
    const geometryTypes = [
      () => new THREE.IcosahedronGeometry(0.3, 0),
      () => new THREE.OctahedronGeometry(0.3, 0),
      () => new THREE.TetrahedronGeometry(0.3, 0),
    ]

    for (let i = 0; i < 15; i++) {
      const geometryType = geometryTypes[Math.floor(Math.random() * geometryTypes.length)]
      const geometry = geometryType()
      const material = new THREE.MeshStandardMaterial({
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        emissive: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.6,
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      )
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )
      scene.add(mesh)
      geometries.push(mesh)
    }

    // Luces con nueva paleta
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x30d5c8, 1, 100)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x6b1ac5, 1, 100)
    pointLight2.position.set(-5, -5, -5)
    scene.add(pointLight2)

    // Animación
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)

      // Rotar partículas
      particleSystem.rotation.y += 0.001
      particleSystem.rotation.x += 0.0005

      // Rotar y mover geometrías
      geometries.forEach((mesh, index) => {
        mesh.rotation.x += 0.01
        mesh.rotation.y += 0.01
        mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001
      })

      // Mover luces
      const time = Date.now() * 0.0005
      pointLight1.position.x = Math.sin(time) * 5
      pointLight1.position.y = Math.cos(time) * 5
      pointLight2.position.x = Math.cos(time) * 5
      pointLight2.position.y = Math.sin(time) * 5

      renderer.render(scene, camera)
    }

    animate()

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current) return
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      rendererRef.current.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement)
      }
      rendererRef.current?.dispose()
      scene.clear()
    }
  }, [])

  return <div ref={mountRef} className={`three-background ${className}`} />
}

export default ThreeBackground

