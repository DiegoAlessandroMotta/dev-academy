import dataPrincipal from '../models/DataPrincipal'
import { CardData, HeroSection, CompanyInfo } from '../models/DataPrincipal'

class PageController {
  /**
   * Obtiene los datos de las tarjetas para la página principal
   */
  getPrincipalCardData(): CardData[] {
    return dataPrincipal.getCardData()
  }

  /**
   * Obtiene las secciones hero para la página principal
   */
  getPrincipalHeroSections(): HeroSection[] {
    return dataPrincipal.getHeroSections()
  }

  /**
   * Obtiene la información de la empresa
   */
  getCompanyInfo(): CompanyInfo {
    return dataPrincipal.getCompanyInfo()
  }

  /**
   * Obtiene los servicios (imágenes)
   */
  getServices(): string[] {
    return dataPrincipal.getServices()
  }

  /**
   * Obtiene toda la información de Academy
   */
  getAcademyInfo() {
    return dataPrincipal.getAcademyInfo()
  }
}

export const pageController = new PageController()
export default pageController

