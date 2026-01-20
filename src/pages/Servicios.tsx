import ThreeScene from '../components/ThreeScene'
import ThreeHero from '../components/ThreeHero'
import pageController from '../controllers/PageController'
import '../styles/pages/principal.css'

const Servicios = () => {
  // Obtener datos del controlador (MVC)
  const services = pageController.getServices()

  return (
    <>
      <ThreeScene particleCount={800} geometryCount={6} intensity={0.5} />
      <section className="hero1">
        <div className="hero_texts1">
          <h2 className="hero_title">
            Tecnologias peruanas al Siguiente Nivel
          </h2>
          <p>
            Estamos desarrollando tecnologias que faciliten la forma de
            interactuar con las maquinas.
          </p>
        </div>
      </section>
      {/* Jaime aqui le pones tu contenido */}
      {/* <section className="hero1">
        <div className="boton_distributed">
          <div className="galeria3">
            {services.map((service, index) => (
              <div key={index} className="card2">
                <ThreeHero variant="minimal" />
                <div className="card2-glow"></div>
              </div>
            ))}
          </div>
        </div> 
      </section> */ }
    </>
  )
}

export default Servicios

