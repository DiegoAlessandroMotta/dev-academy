import { useScrollAnimation } from '../hooks/useScrollAnimation'
import ThreeScene from '../components/ThreeScene'
import ThreeHero from '../components/ThreeHero'
import pageController from '../controllers/PageController'
import '../styles/pages/principal.css'

const Nosotros = () => {
  useScrollAnimation()

  // Obtener datos del controlador (MVC)
  const companyInfo = pageController.getCompanyInfo()

  return (
    <>
      <ThreeScene particleCount={1000} geometryCount={8} intensity={0.5} />
      <section className="hero">
        <div className="hero_texts">
          <h2 className="hero_title">NOSOTROS</h2>
          <p>{companyInfo.description}</p>
        </div>
        <figure className="hero_figure">
          <ThreeHero variant="minimal" />
          <div className="hero_img-placeholder" data-animation="up">
            <div className="hero_img-glow"></div>
          </div>
        </figure>
      </section>
      <section className="hero">
        <div className="hero_texts">
          <h2 className="hero_title">Mision</h2>
          <p>{companyInfo.mission}</p>
        </div>
        <figure className="hero_figure">
          <ThreeHero variant="minimal" />
          <div className="hero_img-placeholder" data-animation="up">
            <div className="hero_img-glow"></div>
          </div>
        </figure>
        <div className="hero_texts">
          <h2 className="hero_title">Vision</h2>
          <p>{companyInfo.vision}</p>
        </div>
      </section>
    </>
  )
}

export default Nosotros

