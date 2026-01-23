import ThreeScene from '../components/ThreeScene'
import pageController from '../controllers/PageController'
import '../styles/pages/principal.css'

const Servicios = () => {
  // Imágenes de apoyo para los servicios
  const serviceImages = pageController.getServices()

  const featuredServices = [
    {
      title: 'Creación de páginas web',
      badge: 'Landing · E‑commerce · Portales',
      description:
        'Diseñamos y desarrollamos sitios y aplicaciones web modernas, rápidas y adaptadas a cualquier dispositivo. Integramos pasarelas de pago, paneles de administración y SEO técnico para que tu proyecto no solo se vea bien, también venda.',
      highlights: [
        'Diseños personalizados alineados a tu marca',
        'Páginas optimizadas para velocidad y SEO',
        'Integración con métricas y analítica (Google Analytics, Meta, etc.)',
      ],
      image: serviceImages[0] ?? '/img/gif_cdvo1.gif',
    },
    {
      title: 'Aplicaciones móviles',
      badge: 'Android · iOS · PWA',
      description:
        'Construimos apps móviles intuitivas, seguras y conectadas a tus sistemas para que tus usuarios siempre estén online. Trabajamos con notificaciones push, autenticación y sincronización de datos en tiempo real.',
      highlights: [
        'Interfaces pensadas para usarse con una sola mano',
        'Experiencia nativa o híbrida según tu necesidad',
        'Publicación y soporte para tiendas de apps',
      ],
      image: serviceImages[1] ?? '/img/gif_cdvo2.gif',
    },
    {
      title: 'Programas de escritorio',
      badge: 'Automatización · Control · Data',
      description:
        'Desarrollamos software de escritorio a medida para optimizar procesos internos, integrar dispositivos y automatizar tareas repetitivas. Ideal para empresas que necesitan control local, reportes avanzados y alto rendimiento.',
      highlights: [
        'Automatización de tareas repetitivas y reportes',
        'Integración con dispositivos físicos y sistemas internos',
        'Enfoque en seguridad, respaldo y estabilidad',
      ],
      image: serviceImages[4] ?? '/img/gif_cdvo9.gif',
    },
  ]

  return (
    <>
      <ThreeScene particleCount={800} geometryCount={6} intensity={0.5} />
      <section className="hero1 hero-alliance">
        <div className="hero_alliance-card">
          <span className="chip chip-alliance">Alianza estratégica</span>
          <h2 className="hero_title">ZYNOVA x stegendev.com</h2>
          <p>
            Nos unimos con{' '}
            <a
              href="https://stegendev.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              stegendev.com
            </a>{' '}
            para combinar creatividad, ingeniería y experiencia real en
            proyectos para empresas y emprendimientos.
          </p>
          <p>
            Juntos construimos soluciones digitales que no solo se ven bien,
            también funcionan, escalan y generan resultados medibles.
          </p>
          <a
            className="btn-gradient"
            href="https://stegendev.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Conocer stegendev.com
          </a>
        </div>
      </section>

      <section className="hero1">
        <div className="hero_texts1">
          <h2 className="hero_title">Nuestros servicios</h2>
          <p>
            Te acompañamos en todo el proceso de creación de soluciones
            digitales: desde la idea hasta el despliegue en producción.
          </p>
        </div>
        <div className="boton_distributed">
          <div className="galeria3">
            {featuredServices.map((service, index) => (
              <div key={index} className="card2">
                <img src={service.image} alt={service.title} />
                <div className="head-card">
                  <div className="card-header-row">
                    <h5 className="titleCard">{service.title}</h5>
                    {service.badge && (
                      <span className="chip chip-small">{service.badge}</span>
                    )}
                  </div>
                  <p className="subtitleCard">{service.description}</p>
                </div>
                <div className="card2-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hero1">
        <div className="hero_texts1">
          <h2 className="hero_title">¿Qué incluye cada servicio?</h2>
          <p>
            No solo creamos software: te ayudamos a construir experiencias
            completas que funcionen en el mundo real.
          </p>
        </div>
        <div className="boton_distributed">
          <div className="galeria3">
            <div className="service-detail">
              <h3>Creación de páginas web</h3>
              <ul>
                <li>Diseños personalizados alineados a la identidad de tu marca.</li>
                <li>Sitios optimizados para velocidad, SEO y dispositivos móviles.</li>
                <li>Integración con pasarelas de pago, paneles de administración y métricas.</li>
              </ul>
            </div>
            <div className="service-detail">
              <h3>Aplicaciones móviles</h3>
              <ul>
                <li>Interfaces pensadas para usarse con una sola mano.</li>
                <li>Experiencias nativas o híbridas según tu proyecto.</li>
                <li>Publicación y soporte en tiendas de apps y actualización continua.</li>
              </ul>
            </div>
            <div className="service-detail">
              <h3>Programas de escritorio</h3>
              <ul>
                <li>Automatización de tareas repetitivas y generación de reportes.</li>
                <li>Integración con dispositivos físicos y sistemas internos.</li>
                <li>Enfoque en seguridad, respaldo y estabilidad a largo plazo.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="hero1">
        <div className="hero_texts1">
          <h2 className="hero_title">Cómo trabajamos tu proyecto</h2>
          <p>
            Te acompañamos desde la idea inicial hasta el soporte después del
            lanzamiento, con un proceso claro y transparente.
          </p>
        </div>
        <div className="boton_distributed">
          <div className="galeria3">
            <div className="service-detail">
              <h3>1. Descubrimiento</h3>
              <p>
                Analizamos tu negocio, objetivos y público para proponer la
                solución que realmente necesitas.
              </p>
            </div>
            <div className="service-detail">
              <h3>2. Diseño & prototipos</h3>
              <p>
                Creamos prototipos navegables para que veas cómo se sentirá tu
                web, app o software antes de desarrollarlo.
              </p>
            </div>
            <div className="service-detail">
              <h3>3. Desarrollo</h3>
              <p>
                Construimos la solución con buenas prácticas, seguridad y foco
                en rendimiento.
              </p>
            </div>
            <div className="service-detail">
              <h3>4. Lanzamiento & soporte</h3>
              <p>
                Te ayudamos a publicar, monitorear y mejorar tu producto con
                actualizaciones y soporte técnico.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="hero1">
        <div className="hero_texts1">
          <h2 className="hero_title">Tecnologías que usamos</h2>
          <p>
            Elegimos la tecnología adecuada según el tipo de proyecto, pensando
            en escalabilidad, mantenimiento y costo.
          </p>
        </div>
        <div className="boton_distributed">
          <div className="galeria3">
            <div className="service-detail">
              <h3>Web</h3>
              <p className="tech-badges">
                <span className="tech-badge">HTML</span>
                <span className="tech-badge">CSS</span>
                <span className="tech-badge">JavaScript</span>
                <span className="tech-badge">React</span>
              </p>
            </div>
            <div className="service-detail">
              <h3>Móvil</h3>
              <p className="tech-badges">
                <span className="tech-badge">React Native</span>
                <span className="tech-badge">Ionic</span>
                <span className="tech-badge">PWA</span>
              </p>
            </div>
            <div className="service-detail">
              <h3>Escritorio</h3>
              <p className="tech-badges">
                <span className="tech-badge">C++</span>
                <span className="tech-badge">.NET</span>
                <span className="tech-badge">Electron</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="hero1">
        <div className="hero_texts1">
          <h2 className="hero_title">¿Listo para empezar?</h2>
          <p>
            Cuéntanos tu idea y te ayudamos a convertirla en una solución
            digital real, ya sea una web, app móvil o software de escritorio.
          </p>
          <a
            className="btn-gradient"
            href="https://wa.me/51925543023?text=Hola%20quiero%20información%20sobre%20los%20servicios%20de%20ZYNOVA"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hablar por WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}

export default Servicios

