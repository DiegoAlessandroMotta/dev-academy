import { useEffect } from 'react'

export const useScrollAnimation = () => {
  useEffect(() => {
    const imagenes = document.querySelectorAll('.hero_figure')

    const triggerAnimation = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const imagen = entry.target.querySelector('img')
        if (imagen) {
          imagen.classList.toggle('unset', entry.isIntersecting)
        }
      })
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    }

    const observador = new IntersectionObserver(triggerAnimation, options)

    imagenes.forEach((image) => {
      observador.observe(image)
    })

    return () => {
      imagenes.forEach((image) => {
        observador.unobserve(image)
      })
    }
  }, [])
}

export default useScrollAnimation

