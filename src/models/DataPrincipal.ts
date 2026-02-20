// Modelo de datos principal para la aplicación

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  whatsappLink: string;
  language: string;
  infoLink?: string;
  isFinished?: boolean;
  description?: string;
  levels?: CourseLevel[];
  precio?: string
}

export interface CourseLevel {
  level: string;
  description: string;
  topics: string[];
  codeExample?: string;
}

export interface CardData {
  img: string;
  title: string;
  description: string;
}

export interface HeroSection {
  title: string;
  text: string;
  img: string;
  animation: "show" | "up" | "fade";
}

export interface CompanyInfo {
  name: string;
  description: string;
  mission: string;
  vision: string;
}

class DataPrincipal {
  // Datos de cursos
  private courses: Course[] = [
    {
      id: "1",
      title: "C++",
      subtitle:
        "Empieza en programación con C++ y desarrolla la lógica que usan los verdaderos programadores. Desde cero, paso a paso, con proyectos reales.",
      whatsappLink:
        "https://web.whatsapp.com/",
      infoLink: "info",
      language: "language-cpp",
      description:
        "Es un lenguaje de programación de propósito general que se utiliza en una amplia variedad de aplicaciones, desde sistemas operativos y controladores de dispositivos hasta juegos y aplicaciones empresariales y al tener acceso directo al sistema operativo se puede usar para simplificar ciertas cosas. Su versatilidad lo hace útil para muchos tipos de proyectos.",
      levels: [
        {
          level: "PRIMER NIVEL",
          description:
            "En esta unidad aprenderas los conceptos basicos , donde la gran parte sera explicado con codigo y diapositivas , para asi lograr comprender el concepto de programacion.",
          topics: [
            "VARIABLES",
            "OUT-IN",
            "CONDICIONALES",
            "BUCLES",
            "EVALUACION DE PROYECTO",
          ],
          codeExample: 'std::cout<<"hola mundo!!"<<endl;',
        },
        {
          level: "SEGUNDO NIVEL",
          description:
            "En esta unidad estaremos mas enfocado en los array y usaremos algunas librerias como conio.h donde se explicara el concepto fundamental de los contadores.",
          topics: [
            "ARRAYS",
            "CONTADORES",
            "ANIDAMIENTO DE ARRAYS",
            "FUNCIONES",
            "EVALUACION DE PROYECTO",
          ],
          codeExample: "string datos[10] = [h][o][l][a][][m][u][n][d][o];",
        },
        {
          level: "TERCER NIVEL",
          description:
            "En este nivel ya habremos aprendido sobre los conceptos de programacion , y ahora los pondremos a prueba desarrollando un algoritmos de proceso de caracteres. Usaremos las estructuras.",
          topics: [
            "STRUCTURAS",
            "STRUCTURAS + CONTADORES",
            "STRUCTURAS + ARRAYS",
            "STRUCTURAS ANIDADAS",
            "EVALUACION DE PROYECTO",
          ],
          codeExample:
            "struct datos{ int ho; String la; float mun; bool do; };",
        },
        {
          level: "CUARTO NIVEL",
          description:
            "En este nivel nos adentraremos en el concepto de la manipulacion de objetos POO (PROGRAMACION ORIENTADA A OBJETOS) , esta tecnologia no ayudara a desarrollar videojuegos simples.",
          topics: [
            "POO",
            "POO + ESTRUCTURAS",
            "POO + CAMPO DE DATOS",
            "POO",
            "EVALUACION DE PROYECTO",
          ],
          codeExample:
            "class mago{ private: int vida; int puntos; public: void atakar() }",
        },
      ],
      precio: "Costo mensual de S/150 soles",
    },
    {
      id: "2",
      title: "APLICACIONES WEB",
      subtitle:
        "Aprende a construir sitios y aplicaciones web modernas desde la base. Domina frontend paso a paso y crea proyectos funcionales que puedas mostrar desde el primer mes.",
      whatsappLink:
        "https://web.whatsapp.com/",
      infoLink: "info",
      language: "language-js",
      description: `
        Aprenderas html css y js y como se conectan entre si para poder funcionar, entenderas la importancia que tiene el backend y por que son ramas 
        distintas y como debe enviarse la informacion
        `,
      levels: [
        {
          level: "PRIMER NIVEL",
          description:
            "En esta unidad aprenderas lo html y css para que puedas crear tus propias ideas y veras la importancia de cada atributo",
          topics: [
            "Atributos HTML",
            "CSS",
            "efectos basicos",
            "HOVER",
            "EVALUACION DE PROYECTO",
          ],
          codeExample: ".MyCARD:hover{font-size:10}",
        },
        {
          level: "SEGUNDO NIVEL",
          description:
            "Aprenderas mas sobre el lenguaje de javascript y como este influye en las paginas web",
          topics: [
            "variables",
            "Arrys y Objetos",
            "eventos",
            "Funciones",
            "EVALUACION DE PROYECTO",
          ],
          codeExample: "var datos = [h,o,l,a, ,m,u,n,d,o]",
        },
        {
          level: "TERCER NIVEL",
          description:
            "En este nivel tendras claro html y css y podras conectarlos para realizar un sistema web enfocado en el cliente",
          topics: [
            "Eventos KEY",
            "Manipulacion del DOM",
            "Submits",
            "EVALUACION DE PROYECTO",
          ],
          codeExample: `let CARD = document.getElementById("Dev Academy")`,
        },
        {
          level: "CUARTO NIVEL",
          description:
            "En este nivel ya habras aprendido todo el concepto basico, ahora trabajaremos con APIS y como usarlos",
          topics: [
            "AJAX",
            "DOBLE TIME",
            "Connect Tokens",
            "API conect",
            "EVALUACION DE PROYECTO",
          ],
          codeExample: `fetch(URL)
          .then(response=>{console.log(response)})
          .cath(error => console.warn(error));`,
        },
      ],
      precio: "Costo mensual de S/250 soles",
    },
  ];

  // Datos de tarjetas para la página principal
  private cardData: CardData[] = [
    {
      img: "/img/gif_cdvo1.gif",
      title: "Diseños",
      description: "Diseños completamente desarrollados desde cero",
    },
    {
      img: "/img/gif_cdvo2.gif",
      title: "VIDEO JUEGOS",
      description: "Tecnologias de c++ usados para desarrollo basico",
    },
    {
      img: "/img/gif_cdvo3.gif",
      title: "Loaders",
      description: "Diseño para la carga de datos",
    },
    {
      img: "/img/gif_cdvo7.gif",
      title: "App",
      description: "Aplicaciones con el uso de tecnologias innovadoras",
    },
    {
      img: "/img/gif_cdvo9.gif",
      title: "C++",
      description: "Desarrollando habilidades",
    },
    {
      img: "/img/gif_cdvo8.gif",
      title: "IA",
      description: "Desarrollando Inteligencias Artificiales",
    },
  ];

  // Secciones hero para la página principal
  private heroSections: HeroSection[] = [
    {
      title: "DESARROLLO DE APLICACIONES DINAMICAS",
      text: "Tenemos la creencia que una aplicacion dinamica llega a ser mas intuitiva para los usuarios",
      img: "/img/empresa1.png",
      animation: "show",
    },
    {
      title: "DISEÑOS INTERACTIVOS CON LOS USUARIOS",
      text: "Diseños que se adaptan de acuerdo a la interaccion que tenga el usuario",
      img: "/img/empresa2.png",
      animation: "show",
    },
    {
      title: "CONECTADOS A UNA RED DE SEGURIDAD Y PRIVACIDAD",
      text: "Disponemos de un propio servidor , asi administramos y supervisamos la informacion",
      img: "/img/empresa3.png",
      animation: "show",
    },
    {
      title: "RECOLENTANDO NUEVO TALENTOS",
      text: "Buscamos nuevos talentos ya sea aun universitario o graduado , pues creeemos que las personas pueden mostrar sus talentos desde temprana edad",
      img: "/img/empresa4.png",
      animation: "up",
    },
    {
      title: "DESARROLLANDO HABILIDADES PARA EL FUTURO",
      text: "Prepararemos a que los jovenes en el camino de la programacion asesorandolos y resolviendo sus dudas",
      img: "/img/modelo_gif_cdvo.gif",
      animation: "up",
    },
    {
      title: "OBJETIVOS PARA EL DESARROLLO DE FUTURAS GENERACIONES",
      text: "Nuestras tecnologias tienen que beneficiar a todos , por ello estamos en el desarrollo de tutorias gratuitas para el",
      img: "/img/objetivos.png",
      animation: "up",
    },
  ];

  // Información de la empresa
  private companyInfo: CompanyInfo = {
    name: "Dev Academy",
    description:
      "Somos una empresa que busca desarrollar las tecnologias peruanas , y llevarla al siguiente nivel , para eso creemos que devemos formar excelentes programadores y excelentes Sistemas.",
    mission:
      "Nuestra mision es liderar la innovacion en el desarrollo de soluciones de software y hardware de alta calidad, al mismo tiempo que fomentamos el aprendisaje y el crecimiento profesional a traves de una educacion tecnologica accesible y efectiva.",
    vision:
      "Ser lider en el desarrollo de tecnologias de vanguardia y en la formacion de talentos, creando un impacto positivo en el sector tecnologico y contribuyendo al desarrollo de una comunidad tecnologica dinamica y altamente capacitada.",
  };

  // Servicios (imágenes)
  private services: string[] = [
    "/img/gif_cdvo1.gif",
    "/img/gif_cdvo2.gif",
    "/img/gif_cdvo3.gif",
    "/img/gif_cdvo7.gif",
    "/img/gif_cdvo9.gif",
    "/img/gif_cdvo8.gif",
  ];

  // Getters públicos
  getCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: string): Course | undefined {
    return this.courses.find((course) => course.id === id);
  }

  getCardData(): CardData[] {
    return this.cardData;
  }

  getHeroSections(): HeroSection[] {
    return this.heroSections;
  }

  getCompanyInfo(): CompanyInfo {
    return this.companyInfo;
  }

  getServices(): string[] {
    return this.services;
  }

  getAcademyInfo() {
    return {
      presentation: {
        logo: "/img/1.png",
        title: "Dev Academy",
        description:
          "Aquí no enseñamos a depender de la IA, sino a usarla como herramienta.\n Porque quien sabe programar no teme a la automatización, la lidera !.",
      },
      startInfo: {
        title: "Inicio",
        description:
          "Las clases inician el 2 de febrero \n De lunes a viernes cada uno de ellos duran 3 horas. Aprende un nuevo lenguaje de programacion mientras disfrutas tus vacaciones",
        image: "/img/academy1.gif",
      },
      generalInfo: {
        title: "Informacion",
        description:
          "Dev Academy comprometido con el desarrollo de tecnologias brinda clases a todos las personas que quieran aprender las tecnologias que estan innovando el futuro. Asesorando a los estudiantes desde cero a intermedio.\nAl completar el curso por completo y estar entre los primeros puestos , obtendras un certificado de reconocimiento firmado por la empresa.(este puede ayudarte a entrar a la empresa).",
        image: "/img/academy4.gif",
      },
      whatIsAcademy: {
        title: "¿ QUE ES Dev Academy-Academy?",
        subtitle: '"Dev Academy - ACADEMY"',
        description:
          "Se creo esta plataforma para pulir las capacidades de los estudiantes de informatica o sistemas, llevandolos al siguiente nivel. donde cada miembro es asesorado en su camino de la programacion.",
        whatsappLink:
          "https://web.whatsapp.com/",
        image: "/img/modelo_gif_cdvo.gif",
      },
      intranet: {
        title: "INTRANET",
        description:
          "desarrollamos una plataforma web exclusivamente para nuestros estudiantes donde pueden ver sus cursos,notas,ranking academico,avances y apuntes..",
        link: "#",
        image: "/img/academy2.gif",
      },
      buttons: {
        enroll: "https://web.whatsapp.com/",
        intranet: "#intranet",
        courses: "#cursos",
        info: "#whi_Dev Academy",
      },
    };
  }
}

// Instancia singleton
export const dataPrincipal = new DataPrincipal();
export default dataPrincipal;
