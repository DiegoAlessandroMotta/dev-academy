import { useEffect, useMemo } from 'react'
import courseController from '../controllers/CourseController'
import Prism from "prismjs"
import '../styles/components/modal.css'
import "prismjs/themes/prism-tomorrow.css"


interface CourseModalProps {
  isOpen: boolean
  onClose: () => void
  courseId: string | null
}

const CourseModal = ({ isOpen, onClose, courseId }: CourseModalProps) => {
  const courseInfo = useMemo(() => {
    if (!courseId) return null
    return courseController.getCourseModalContent(courseId)
  }, [courseId])

  useEffect(() => {
    Prism.highlightAll()
  }, [courseInfo])

  if (!isOpen || !courseInfo) return null

  return (
    <div id="modal_datos" className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title" id="titulo_modal">
            {courseInfo.title}
          </p>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose}
          ></button>
        </header>
        <section className="modal-card-body" id="contenido_modal">
          {courseInfo.content}
        </section>
        <footer className="modal-card-foot">
          <div className="buttons">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={courseInfo.whatsappLink}
              id="suscribirse"
              className="button is-success"
            >
              SUSCRIBIRSE
            </a>
            <button className="button" onClick={onClose}>
              Entendido
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default CourseModal

