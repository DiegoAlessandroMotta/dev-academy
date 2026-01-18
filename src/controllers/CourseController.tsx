import { Course } from '../models/DataPrincipal'
import dataPrincipal from '../models/DataPrincipal'

class CourseController {
  /**
   * Obtiene todos los cursos disponibles
   */
  getAllCourses(): Course[] {
    return dataPrincipal.getCourses()
  }

  /**
   * Obtiene un curso por su ID
   */
  getCourseById(id: string): Course | undefined {
    return dataPrincipal.getCourseById(id)
  }

  /**
   * Obtiene solo los cursos activos (no finalizados)
   */
  getActiveCourses(): Course[] {
    return dataPrincipal.getCourses().filter((course) => !course.isFinished)
  }

  /**
   * Obtiene solo los cursos finalizados
   */
  getFinishedCourses(): Course[] {
    return dataPrincipal.getCourses().filter((course) => course.isFinished)
  }

  /**
   * Genera el contenido HTML/JSX para el modal de información de un curso
   */
  getCourseModalContent(courseId: string): {
    title: string
    content: JSX.Element
    whatsappLink: string
  } | null {
    const course = this.getCourseById(courseId)
    if (!course) return null

    if (courseId === '1' && course.levels) {
      return {
        title: `INFORMACION DEL CURSO ${course.title}`,
        whatsappLink: course.whatsappLink,
        content: this.generateCourseContent(course),
      }
    } else if (courseId === '2') {
      return {
        title: 'INFORMACION DEL CURSO DE APLICACIONES DE PAGINAS WEB',
        whatsappLink: course.whatsappLink,
        content: this.generateCourseContent(course),
      }
    }

    return null
  }

  generateCourseContent(course: Course): JSX.Element {
    return (
      <div>
        <h1>{course.title}</h1>
        <p>
          &quot;{course.description}&quot; <i>Su versatilidad lo hace útil para muchos tipos de proyectos.</i>
        </p>
        <br />
        <h2>¿ De que consta este curso ?</h2>
        <br />
        <p>
          &quot;El curso estara divido en 4 semanas de desarrollo de programacion , al dia el curso tendra una duracion de 3
          horas , donde 2 horas seran usados para la parte practica y una 1 hora para la parte teorica , esto para
          poder adaptarnos. Todos los viernes se dara una evaluacion a los estudiantes , donde tendran que desarrollar
          un sistema entregado por el docente.&quot;
        </p>
        <br />
        <h2>LO QUE APRENDERAS</h2>
        <br />
        {course.levels?.map((level, index) => (
          <div key={index}>
            <h3>{level.level}</h3>
            <br />
            <p>{level.description}</p>
            <ul>
              {level.topics.map((topic, topicIndex) => (
                <li key={topicIndex}>{topic}</li>
              ))}
            </ul>
            {level.codeExample && (
              <>
                <blockquote>{level.codeExample}</blockquote>
                <br />
              </>
            )}
          </div>
        ))}
        <br />
        <p>LOS CERTIFICADOS SERAN OTORGADOS A LOS ALUMNOS MAS DESTACADOS .</p>
      </div>
    )
  }
}

export const courseController = new CourseController()
export default courseController

