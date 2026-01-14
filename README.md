# CDVO - React + Vite + TypeScript

Este proyecto ha sido migrado de PHP a React con Vite y TypeScript, siguiendo el patrón de arquitectura **Modelo-Vista-Controlador (MVC)**.

## Instalación

1. Instala las dependencias:
```bash
npm install
```

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:3000`

## Construcción

Para crear una versión de producción:

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`

## Arquitectura MVC

El proyecto está estructurado siguiendo el patrón Modelo-Vista-Controlador:

### Modelos (`src/models/`)
- **DataPrincipal.ts**: Modelo principal que contiene todos los datos de la aplicación
  - Cursos
  - Información de la empresa
  - Tarjetas y secciones hero
  - Información de Academy
  - Servicios

### Controladores (`src/controllers/`)
- **CourseController.ts**: Maneja la lógica de negocio relacionada con cursos
  - `getAllCourses()`: Obtiene todos los cursos
  - `getCourseById()`: Obtiene un curso por ID
  - `getActiveCourses()`: Obtiene cursos activos
  - `getCourseModalContent()`: Genera contenido para modales

- **PageController.ts**: Maneja la lógica de negocio de las páginas
  - `getPrincipalCardData()`: Datos de tarjetas para página principal
  - `getPrincipalHeroSections()`: Secciones hero
  - `getCompanyInfo()`: Información de la empresa
  - `getServices()`: Servicios
  - `getAcademyInfo()`: Información completa de Academy

### Vistas (`src/pages/` y `src/components/`)
- Componentes React que representan la interfaz de usuario
- Obtienen datos a través de los controladores
- No contienen lógica de negocio, solo presentación

## Estructura del Proyecto

```
├── public/                  # Archivos estáticos (servidos en la raíz)
│   └── view/               # Assets (CSS, imágenes)
│       ├── css/
│       └── img/
├── src/
│   ├── models/             # Modelos de datos (MVC)
│   │   └── DataPrincipal.ts
│   ├── controllers/        # Controladores (MVC)
│   │   ├── CourseController.ts
│   │   └── PageController.ts
│   ├── components/         # Componentes reutilizables
│   │   ├── layout/         # Header, Navbar, Footer
│   │   ├── ThreeBackground.tsx
│   │   └── CourseModal.tsx
│   ├── pages/              # Páginas (Vistas MVC)
│   │   ├── Principal.tsx
│   │   ├── Nosotros.tsx
│   │   ├── Servicios.tsx
│   │   ├── Academy.tsx
│   │   └── ErrorPage.tsx
│   ├── hooks/              # Custom hooks
│   │   ├── useScrollAnimation.ts
│   │   └── useModal.ts
│   ├── styles/             # Estilos organizados
│   │   ├── variables.css
│   │   ├── layout/
│   │   ├── pages/
│   │   └── components/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Uso de DataPrincipal

Todos los datos de la aplicación están centralizados en `DataPrincipal`. Para acceder a ellos:

```typescript
import dataPrincipal from './models/DataPrincipal'

// Obtener todos los cursos
const courses = dataPrincipal.getCourses()

// Obtener un curso específico
const course = dataPrincipal.getCourseById('1')

// Obtener información de la empresa
const companyInfo = dataPrincipal.getCompanyInfo()
```

O a través de los controladores:

```typescript
import courseController from './controllers/CourseController'
import pageController from './controllers/PageController'

// Usar controladores para obtener datos procesados
const courses = courseController.getAllCourses()
const cardData = pageController.getPrincipalCardData()
```

## Notas Importantes

- **Archivos estáticos**: Los archivos CSS e imágenes deben estar en `public/view/` para que Vite los sirva correctamente.
- **MVC**: El proyecto sigue estrictamente el patrón MVC para facilitar el mantenimiento y la escalabilidad.
- **DataPrincipal**: Todos los datos están en `DataPrincipal.ts`. Cuando conectes una API, solo necesitarás modificar este archivo.
- El proyecto usa React Router para la navegación
- Los estilos de Bulma CSS se cargan desde `/view/css/bulma.min.css`

## Tecnologías

- React 18
- TypeScript
- Vite
- React Router DOM
- THREE.js (efectos visuales 3D)

## Características de Diseño

### Paleta de Colores Cósmica
- **Negro Cósmico** (#0F051E) - Fondo principal
- **Violeta Profundo** (#3A0CA3) - Acentos principales
- **Púrpura Nebulosa** (#7209B7) - Gradientes y efectos
- **Magenta Galáctico** (#B5179E) - Elementos interactivos
- **Rosa Estrella** (#F72585) - Acentos y highlights

### Efectos Visuales
- **THREE.js Background**: Fondo animado con partículas y geometrías 3D flotantes
- **Glassmorphism**: Efectos de vidrio esmerilado en componentes
- **Animaciones Cósmicas**: Efectos de pulso, brillo y flotación
- **Gradientes Dinámicos**: Transiciones suaves entre colores cósmicos

