import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../../styles/layout/navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.navbar_contenido')
      if (header) {
        header.classList.toggle('estylo_abajo', window.scrollY > 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    const valor = document.querySelector('.botones_navbar') as HTMLElement
    const elemento = document.querySelector('.navbar_contenido') as HTMLElement
    const link = elemento?.querySelector('a') as HTMLElement

    if (valor && elemento && link) {
      if (isMenuOpen) {
        valor.style.height = '10vh'
        valor.style.display = 'none'
        link.style.width = '60%'
      } else {
        valor.style.height = '100vh'
        valor.style.display = 'block'
        link.style.width = '80%'
      }
    }
  }

  return (
    <header className="navbar_contenido">
      <div className="titulo navbar-item">
        <button className="_afec" id="boton_responsive" onClick={toggleMenu}>
          <span className="_afed"></span>
          <span className="_afee"></span>
          <span className="_afef"></span>
        </button>
        <Link to="/" className="logo navbar-item">
          <img src="/view/img/1.png" alt="" width="30px" />
          PYCS
        </Link>
      </div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" className="botones_navbar">
          <ul>
            <li>
              <Link className="navbar-item" to="/">
                Principal
              </Link>
            </li>
            <li>
              <Link className="navbar-item" to="/nosotros">
                Nosotros
              </Link>
            </li>
            <li>
              <Link className="navbar-item" to="/servicios">
                Servicios
              </Link>
            </li>
            <li>
              <Link className="navbar-item" to="/academy">
                Academy
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar

