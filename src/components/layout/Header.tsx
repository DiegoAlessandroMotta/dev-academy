import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const location = useLocation()
  
  
  useEffect(() => {
    const currentPath = location.pathname.replace('/', '') || ''
    const pageTitle = currentPath ? ` || ${currentPath}` : ''
    document.title = `CDVO${pageTitle}`
  }, [location.pathname])

  return null
}

export default Header

