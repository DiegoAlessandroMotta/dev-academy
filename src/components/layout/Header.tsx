import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation()
  
  
  useEffect(() => {
    const currentPath = location.pathname.replace('/', '') || ''
    const pageTitle = currentPath ? ` || ${currentPath}` : ''
    document.title = `ZYNOVA${pageTitle}`
  }, [location.pathname])

  return null
}

export default Header

