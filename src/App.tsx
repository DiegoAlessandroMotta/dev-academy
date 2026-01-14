import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Principal from './pages/Principal'
import Nosotros from './pages/Nosotros'
import Servicios from './pages/Servicios'
import Academy from './pages/Academy'
import ErrorPage from './pages/ErrorPage'
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

