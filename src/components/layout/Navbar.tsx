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
    const ventana = document.getElementById("navbarBasicExample") as HTMLDivElement
    const elemento = document.querySelector('.navbar_contenido') as HTMLElement
    const link = elemento?.querySelector('a') as HTMLElement

    const APP = document.getElementsByClassName("App")[0] as HTMLElement

    if (valor && elemento && link) {
      if (isMenuOpen) {
        link.style.width = '60%'
        ventana.classList.add("closewindows");
        document.body.style.overflow = "";
        setTimeout(() => {
          ventana.classList.remove("closewindows")
          ventana.style.width = '1vh';
          valor.style.display = 'none'
        }, 1000);
        APP.style.overflow = ""
      } else {
        document.body.style.overflow = "hidden";
        valor.style.height = '100vh'
        link.style.width = '80%'
        ventana.classList.add("deploywindows");
        valor.style.display = 'block'
        ventana.style.width = '1vh';
        APP.style.overflow = "hidden"
        setTimeout(() => {
          ventana.classList.remove("deploywindows");
          ventana.style.width = '100vh';
        }, 1000)
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
        <Link to="/" className="navbar-item">
          <span className='text-white font-bold text-2xl'>
            {'</> '}
            Dev Academy
          </span>
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

