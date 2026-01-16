import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import '../styles/components/three-background.css'

interface ThreeSceneProps {
  className?: string
  particleCount?: number
  geometryCount?: number
  intensity?: number
}

const ThreeScene = ({
  className = '',
  particleCount = 1500,
  geometryCount = 7,
  intensity = 0.6,
}: ThreeSceneProps) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const animationFrameRef = useRef<number>()
  const geometriesRef = useRef<THREE.Mesh[]>([])
  const particlesRef = useRef<THREE.Points | null>(null)
  const timeRef = useRef(0)

  useEffect(() => {
    
    if (!mountRef.current) return

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
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5
    cameraRef.current = camera

    // Renderer optimizado
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limitar pixel ratio para mejor rendimiento
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Partículas optimizadas
    const particles = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30
      positions[i + 1] = (Math.random() - 0.5) * 30
      positions[i + 2] = (Math.random() - 0.5) * 30

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i] = color.r
      colors[i + 1] = color.g
      colors[i + 2] = color.b

      sizes[i / 3] = Math.random() * 2 + 0.5
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: intensity,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })

    const particleSystem = new THREE.Points(particles, particleMaterial)
    scene.add(particleSystem)
    particlesRef.current = particleSystem

  
    // Luces optimizadas con nueva paleta
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x30d5c8, 1.5, 100)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x6b1ac5, 1.5, 100)
    pointLight2.position.set(-5, -5, -5)
    scene.add(pointLight2)

    // Animación suave con requestAnimationFrame
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)
      timeRef.current += 0.01

      // Rotar partículas suavemente
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0005
        particlesRef.current.rotation.x += 0.0003
      }

      // Animar geometrías con movimiento suave
      geometriesRef.current.forEach((mesh) => {
        //const data = mesh as any
        mesh.rotation.y += mesh.userData.spinSpped;
        /*mesh.rotation.x += data.rotationSpeed.x
        mesh.rotation.y += data.rotationSpeed.y
        mesh.rotation.z += data.rotationSpeed.z
        */
        // Movimiento flotante suave
        //const floatOffset = Math.sin(timeRef.current * 2 + index) * data.floatAmount
        //mesh.position.y = data.initialPosition.y + floatOffset

        // Rotación orbital suave
        //const orbitAngle = timeRef.current * 0.5 + index
        //const orbitRadius = 3 + Math.sin(timeRef.current + index) * 0.5
        //mesh.position.x = Math.cos(orbitAngle) * orbitRadius
        //mesh.position.z = Math.sin(orbitAngle) * orbitRadius
      })

      // Mover luces suavemente
      const lightTime = timeRef.current * 0.3
      pointLight1.position.x = Math.sin(lightTime) * 6
      pointLight1.position.y = Math.cos(lightTime) * 6
      pointLight2.position.x = Math.cos(lightTime) * 6
      pointLight2.position.y = Math.sin(lightTime) * 6

      renderer.render(scene, camera)
    }

    animate()

    // Resize handler optimizado
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return
      cameraRef.current.aspect = window.innerWidth / window.innerHeight
      cameraRef.current.updateProjectionMatrix()
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
        try {
          mountRef.current.removeChild(rendererRef.current.domElement)
        } catch (e) {
          // Ignorar errores si el elemento ya fue removido
        }
      }
      rendererRef.current?.dispose()
      geometriesRef.current.forEach((mesh) => {
        mesh.geometry.dispose()
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => mat.dispose())
        } else {
          mesh.material.dispose()
        }
      })
      if (particlesRef.current) {
        particlesRef.current.geometry.dispose()
        if (particlesRef.current.material instanceof THREE.Material) {
          particlesRef.current.material.dispose()
        }
      }
      scene.clear()
    }
  }, [particleCount, geometryCount, intensity])

  return <div ref={mountRef} className={`three-scene ${className}`} />
}

export default ThreeScene

