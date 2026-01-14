import { useScrollAnimation } from '../hooks/useScrollAnimation'
import ThreeScene from '../components/ThreeScene'
import ThreeHero from '../components/ThreeHero'
import pageController from '../controllers/PageController'
import '../styles/pages/principal.css'

const Principal = () => {
  useScrollAnimation()

  // Obtener datos del controlador (MVC)
  const cardData = pageController.getPrincipalCardData()
  const sections = pageController.getPrincipalHeroSections()

  return (
    <>
      <ThreeScene particleCount={1200} geometryCount={10} intensity={0.6} />
      <div className="imagen_date">
        <ThreeHero variant="compact" />
      </div>
      <section className="hero1">
        <div className="presentacion">
          <div className="imagen_presentacion">
            <img src="/img/1.png" alt="" />
            <p className="movimiento">ZYNOVA</p>
          </div>
          <div className="dato_presentacion">
            <p>
              INDUSTRIAS ZYNOVA <br />
              comprometido con el desarrollo de las tecnologias peruanas
            </p>
          </div>
        </div>
        <div className="boton_distributed">
          <div className="galeria2">
            {cardData.map((card, index) => (
              <div key={index} className="card1">
                <img src={card.img} alt={card.title} />
                <div className="head-card">
                  <h5 className='titleCard' >{card.title}</h5>
                  <p className='subtitleCard' >{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {sections.map((section, index) => (
        <section key={index} className="hero">
          <div className="hero_texts">
            <h2 className="hero_title">{section.title}</h2>
            <p>{section.text}</p>
          </div>
          <figure className="hero_figure">
            <ThreeHero variant="minimal" />
            <img src={section.img} alt="" className="hero_img" data-animation="up"></img>
          </figure>
        </section>
      ))}
    </>
  )
}

export default Principal

