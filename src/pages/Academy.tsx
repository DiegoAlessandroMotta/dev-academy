import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import ThreeLogos from '../components/ThreeLogos'
import ThreeHero from '../components/ThreeHero'
import courseController from '../controllers/CourseController'
import pageController from '../controllers/PageController'
import '../styles/pages/principal.css'
import '../styles/pages/academy.css'
import { useModal } from '../hooks/useModal'
import CourseModal from '../components/CourseModal'

const Academy = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const { isOpen, openModal, closeModal } = useModal()
  useScrollAnimation()

  // Obtener datos del controlador
  const courses = courseController.getAllCourses()
  const academyInfo = pageController.getAcademyInfo()

  const handleInfoClick = (courseId: string) => {
    setSelectedCourse(courseId)
    openModal()
  }

  return (
    <>
      <ThreeLogos />
      
      <section className="hero">
        <div className="presentacion">
          <div className="imagen_presentacion">
            <img src={academyInfo.presentation.logo} alt="" />
            <p className="movimiento">{academyInfo.presentation.title}</p>
          </div>
          <div className="dato_presentacion">
            <p>
              {academyInfo.presentation.description.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>
        <div className="botones_derecha">
          <a
            href={academyInfo.buttons.enroll}
            target="_blank"
            rel="noopener noreferrer"
            className="button"
          >
            Matricularse
          </a>
          <a href={academyInfo.buttons.intranet} className="button">
            Intranet
          </a>
          <a href={academyInfo.buttons.courses} className="button">
            ver cursos
          </a>
          <a href={academyInfo.buttons.info} className="button">
            Informacion
          </a>
        </div>
        <div className="hero_texts">
          <h2 className="hero_title">{academyInfo.startInfo.title}</h2>
          <p>
            {academyInfo.startInfo.description.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
        <figure className="hero_figure">
          <ThreeHero variant="minimal" />
          <div className="hero_img-placeholder" data-animation="show">
            <div className="hero_img-glow"></div>
          </div>
        </figure>
      </section>
      <section className="hero" id="informacion">
        <div className="hero_texts">
          <h2 className="hero_title">{academyInfo.generalInfo.title}</h2>
          <p>
            {academyInfo.generalInfo.description.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
        <figure className="hero_figure">
          <ThreeHero variant="minimal" />
          <div className="hero_img-placeholder" data-animation="show">
            <div className="hero_img-glow"></div>
          </div>
        </figure>
      </section>
      <section className="hero" id="whi_cdvo">
        <div className="hero_texts">
          <h2 className="hero_title title">{academyInfo.whatIsAcademy.title}</h2>
          <div className="card">
            <div className="card-content">
              <p className="title">{academyInfo.whatIsAcademy.subtitle}</p>
              <p className="subtitle">{academyInfo.whatIsAcademy.description}</p>
            </div>
            <footer className="card-footer">
              <p className="card-footer-item">
                <span>
                  {' '}
                  Pedir mas{' '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={academyInfo.whatIsAcademy.whatsappLink}
                  >
                    Informacion
                  </a>{' '}
                </span>
              </p>
            </footer>
          </div>
        </div>
        <figure className="hero_figure">
          <ThreeHero variant="minimal" />
          <div className="hero_img-placeholder" data-animation="up">
            <div className="hero_img-glow"></div>
          </div>
        </figure>
      </section>
      <section className="hero" id="cursos">
        <div className="hero_texts">
          <h2 className="hero_title">Cursos</h2>
          <div className="contenedor_cursos">
            {courses.map((course) => (
              <div key={course.id} className="card">
                <div className="card-content">
                  <p className="title">&quot;{course.title}&quot;</p>
                  <p className="subtitle">{course.subtitle}</p>
                </div>
                <footer className="card-footer">
                  <p className="card-footer-item">
                    <span>
                      {course.isFinished ? 'Consultar otras ' : 'Incribirse al '}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={course.whatsappLink}
                      >
                        {course.isFinished ? 'Fecha' : 'Curso'}
                      </a>
                    </span>
                  </p>
                  {course.infoLink && !course.isFinished && (
                    <p className="card-footer-item">
                      <span>
                        {' '}
                        Pedir mas{' '}
                        <a
                          className="informacion"
                          onClick={() => handleInfoClick(course.id)}
                          style={{ cursor: 'pointer' }}
                        >
                          Informacion
                        </a>{' '}
                      </span>
                    </p>
                  )}
                </footer>
              </div>
            ))}
          </div>
        </div>
        <figure className="hero_figure">
          <ThreeHero variant="minimal" />
          <div className="hero_img-placeholder" data-animation="up">
            <div className="hero_img-glow"></div>
          </div>
        </figure>
      </section>
      <section className="hero" id="intranet">
        <div className="hero_texts">
          <h2 className="hero_title">{academyInfo.intranet.title}</h2>
          <div className="card">
            <div className="card-content">
              <p className="subtitle">{academyInfo.intranet.description}</p>
            </div>
            <footer className="card-footer">
              <p className="card-footer-item">
                <span>
                  Ir a
                  <a href={academyInfo.intranet.link} target="_blank" rel="noopener noreferrer">
                    Intranet
                  </a>
                </span>
              </p>
            </footer>
          </div>
        </div>
        <figure className="hero_figure">
          <ThreeHero variant="minimal" />
          <div className="hero_img-placeholder" data-animation="up">
            <div className="hero_img-glow"></div>
          </div>
        </figure>
      </section>
      <CourseModal isOpen={isOpen} onClose={closeModal} courseId={selectedCourse} />
    </>
  )
}

export default Academy
