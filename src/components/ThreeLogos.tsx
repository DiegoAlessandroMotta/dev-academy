import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import '../styles/components/three-background.css'

interface ThreeLogosProps {
  className?: string
}

const ThreeLogos = ({ className = '' }: ThreeLogosProps) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const animationFrameRef = useRef<number>()
  const logosRef = useRef<THREE.Mesh[]>([])
  const timeRef = useRef(0)

  useEffect(() => {
    if (!mountRef.current) return

    // Nueva paleta de colores

    // Escena
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Cámara
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 10)
    cameraRef.current = camera

    // Renderer optimizado
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

    // Logos de programación
    const languages = [
      { name: 'Python', color: 0x3776ab },
      { name: 'textoValor.length();', color: 0x2c2d72 },
      { name: 'Java', color: 0xed8b00 },
      { name: 'if ( 0 == varpos ){}', color: 0x2c2d72 },
      { name: 'C++', color: 0x00599c },
      { name: '(Mapa)? 1 : 0', color: 0x00599c },
      { name: 'for(int i , o;i < 5;i++,o++)', color: 0x2c2d72 },
      { name: 'PHP', color: 0x777bb4 },
      { name: 'const contador = 0;', color: 0x2c2d72 },
      { name: 'JS', color: 0xf7df1e },
      { name: 'mapaValores[5][5] = 0;', color: 0x2c2d72 },
      { name: 'CSS', color: 0x1572b6 },
      { name: 'HTML', color: 0xe34f26 },
      { name: 'Lua', color: 0x2c2d72 },

    ]

    // Crear geometrías para los logos
    languages.forEach((lang, index) => {
      // Crear un plano con el nombre del lenguaje
      const geometry = new THREE.PlaneGeometry(1.5, 0.8)
      
      // Material con el color del lenguaje y efecto de brillo
      const material = new THREE.MeshStandardMaterial({
        color: lang.color,
        emissive: new THREE.Color(lang.color),
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
      })

      // Crear el mesh
      const mesh = new THREE.Mesh(geometry, material)
      
      // Posición inicial en un círculo
      const angle = (index / languages.length) * Math.PI * 2
      const radius = 4 + Math.random() * 2
      mesh.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 5
      )
      
      // Rotación inicial
      mesh.rotation.z = Math.random() * Math.PI * 2
      
      // Guardar datos para animación
      ;(mesh as any).basePosition = mesh.position.clone()
      ;(mesh as any).rotationSpeed = {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01,
      }
      ;(mesh as any).floatSpeed = Math.random() * 0.02 + 0.01
      ;(mesh as any).floatAmount = Math.random() * 0.5 + 0.3
      ;(mesh as any).orbitSpeed = 0.1 + Math.random() * 0.1
      ;(mesh as any).orbitRadius = radius
      ;(mesh as any).orbitAngle = angle
      ;(mesh as any).languageName = lang.name
      ;(mesh as any).languageColor = lang.color

      // Crear texto usando Canvas para el nombre
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (context) {
        canvas.width = 256
        canvas.height = 128
        context.fillStyle = `#${lang.color.toString(16).padStart(6, '0')}`
        context.font = 'bold 48px Arial'
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText(lang.name, 128, 64)
        
        // Crear textura desde el canvas
        const texture = new THREE.CanvasTexture(canvas)
        texture.needsUpdate = true
        
        // Material con textura
        const textMaterial = new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true,
          opacity: 0.9,
          emissive: new THREE.Color(lang.color),
          emissiveIntensity: 0.3,
          side: THREE.DoubleSide,
        })
        
        mesh.material = textMaterial
      }

      scene.add(mesh)
      logosRef.current.push(mesh)
    })

    // Luces suaves con nueva paleta
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x30d5c8, 1.2, 50)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x6b1ac5, 1.2, 50)
    pointLight2.position.set(-5, -5, 5)
    scene.add(pointLight2)

    // Animación suave
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)
      timeRef.current += 0.016 // ~60fps

      // Animar logos
      logosRef.current.forEach((mesh, index) => {
        const data = mesh as any
        
        // Rotación suave
        mesh.rotation.x += data.rotationSpeed.x
        mesh.rotation.y += data.rotationSpeed.y
        mesh.rotation.z += data.rotationSpeed.z

        // Movimiento flotante
        const floatOffset = Math.sin(timeRef.current * data.floatSpeed + index) * data.floatAmount
        mesh.position.y = data.basePosition.y + floatOffset

        // Órbita suave
        const orbitAngle = data.orbitAngle + timeRef.current * data.orbitSpeed
        const orbitRadius = data.orbitRadius + Math.sin(timeRef.current * 0.5 + index) * 0.3
        mesh.position.x = Math.cos(orbitAngle) * orbitRadius
        mesh.position.z = Math.sin(orbitAngle) * orbitRadius + Math.sin(timeRef.current + index) * 0.5

        // Efecto de pulso en la emisión
        const pulse = Math.sin(timeRef.current * 2 + index) * 0.2 + 0.3
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.emissiveIntensity = pulse
        }
      })

      // Mover luces suavemente
      const lightTime = timeRef.current * 0.3
      pointLight1.position.x = Math.sin(lightTime) * 5
      pointLight1.position.y = Math.cos(lightTime) * 5
      pointLight2.position.x = Math.cos(lightTime) * 5
      pointLight2.position.y = Math.sin(lightTime) * 5

      renderer.render(scene, camera)
    }

    animate()

    // Resize handler
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
          // Ignorar
        }
      }
      rendererRef.current?.dispose()
      logosRef.current.forEach((mesh) => {
        mesh.geometry.dispose()
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat:THREE.Material) => {
            const material = mat as THREE.Material & { map?: THREE.Texture }
            if (material.map) material.map.dispose()
            material.dispose()
          })
        } else {
          if (mesh.material instanceof THREE.Material) {
            const mat = mesh.material as THREE.Material & { map?: THREE.Texture }
            if (mat.map) mat.map.dispose()
            mat.dispose()
          }
        }
      })
      scene.clear()
    }
  }, [])

  return <div ref={mountRef} className={`three-logos ${className}`} />
}

export default ThreeLogos

