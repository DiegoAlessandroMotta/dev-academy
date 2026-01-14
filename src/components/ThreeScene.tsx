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
  geometryCount = 12,
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

    //imagenes load
      const textureC = new THREE.TextureLoader();
      const texturePython = new THREE.TextureLoader();
      const textureJava = new THREE.TextureLoader();
      const textureLua = new THREE.TextureLoader();
      const texturephp = new THREE.TextureLoader();
      const textureReact = new THREE.TextureLoader();


      const Logoc = textureC.load('/img/logos/c++.png');
      const logopython = texturePython.load('/img/logos/python.png');
      const logoJava = textureJava.load('/img/logos/java.png');
      const logoJs = textureJava.load('/img/logos/j.png');
      const logoLua = textureLua.load('/img/logos/php.png');
      const logoPhp = texturephp.load('/img/logos/php.png');
      const logoReact = textureReact.load('/img/logos/')

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

    // Geometrías flotantes optimizadas
    const geometryTypes = [
      () => new THREE.IcosahedronGeometry(0.4, 0),
      () => new THREE.OctahedronGeometry(0.4, 0),
      () => new THREE.TetrahedronGeometry(0.4, 0),
      () => new THREE.TorusGeometry(0.3, 0.1, 8, 16),
    ]

    for (let i = 0; i < geometryCount; i++) {
      const geometryType = geometryTypes[Math.floor(Math.random() * geometryTypes.length)]
      const geometry = geometryType()
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      

      //falta corregir
      const material = new THREE.SpriteMaterial ({
        map:logoJava
      })

      const mesh = new THREE.Mesh(geometry, material)
      const angle = (i / geometryCount) * Math.PI * 2
      const radius = 3 + Math.random() * 2
      mesh.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 5
      )
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )
      
      // Guardar datos para animación
      ;(mesh as any).initialPosition = mesh.position.clone()
      ;(mesh as any).rotationSpeed = {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      }
      ;(mesh as any).floatSpeed = Math.random() * 0.01 + 0.005
      ;(mesh as any).floatAmount = Math.random() * 0.5 + 0.3
      
      scene.add(mesh)
      geometriesRef.current.push(mesh)
    }

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
      geometriesRef.current.forEach((mesh, index) => {
        const data = mesh as any
        mesh.rotation.x += data.rotationSpeed.x
        mesh.rotation.y += data.rotationSpeed.y
        mesh.rotation.z += data.rotationSpeed.z

        // Movimiento flotante suave
        const floatOffset = Math.sin(timeRef.current * 2 + index) * data.floatAmount
        mesh.position.y = data.initialPosition.y + floatOffset

        // Rotación orbital suave
        const orbitAngle = timeRef.current * 0.5 + index
        const orbitRadius = 3 + Math.sin(timeRef.current + index) * 0.5
        mesh.position.x = Math.cos(orbitAngle) * orbitRadius
        mesh.position.z = Math.sin(orbitAngle) * orbitRadius
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

