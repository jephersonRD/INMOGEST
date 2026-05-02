// ============================================================
//  INMOGEST SRL — Base de datos de propiedades
//  República Dominicana | 32 inmuebles
// ============================================================

const propertiesDatabase = [

  // ─────────────────────────────────────────
  //  CASAS
  // ─────────────────────────────────────────
  {
    id: 1,
    title: "Casa de Lujo en Piantini",
    type: "casa",
    status: "venta",
    price: 485000,
    location: "santo-domingo",
    locationLabel: "Piantini, Santo Domingo",
    size: 520,
    bedrooms: 5,
    bathrooms: 4,
    parkingSpots: 3,
    yearBuilt: 2019,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1564013799019-4eb4b2a3d0d4?w=800&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80",
      "https://images.unsplash.com/photo-1484154218957-3baf7e4f4b8d?w=800&q=80"
    ],
    description: "Espectacular residencia de dos niveles ubicada en el exclusivo sector de Piantini. Diseño arquitectónico moderno con acabados de primera calidad, amplios espacios sociales y una privacidad sin igual. Perfecta para familias que buscan confort y distinción en el corazón de la capital dominicana.",
    features: [
      "Piscina privada con área de BBQ",
      "Cocina de isla con gabinetes italianos",
      "Sala de cine privada",
      "Generador eléctrico de planta",
      "Sistema de seguridad 24/7",
      "Terraza panorámica",
      "Cuarto de servicio independiente",
      "Jardín tropical paisajizado"
    ],
    tags: ["lujo", "piscina", "seguridad"],
    dateAdded: "2024-03-01"
  },

  {
    id: 2,
    title: "Casa Familiar en Los Cacicazgos",
    type: "casa",
    status: "venta",
    price: 320000,
    location: "santo-domingo",
    locationLabel: "Los Cacicazgos, Santo Domingo",
    size: 380,
    bedrooms: 4,
    bathrooms: 3,
    parkingSpots: 2,
    yearBuilt: 2017,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80",
      "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=800&q=80"
    ],
    description: "Hermosa propiedad en la residencial Los Cacicazgos, uno de los sectores más tranquilos y exclusivos de Santo Domingo. Distribución inteligente de espacios, excelente iluminación natural y acabados de alta gama. Cercana a colegios, centros comerciales y principales vías de acceso.",
    features: [
      "Piscina con área de descanso",
      "Amplio comedor-sala integrado",
      "Cocina americana equipada",
      "Walk-in closet en habitación principal",
      "Inversor de energía instalado",
      "Doble parqueo techado",
      "Terraza en segundo nivel",
      "Área de lavandería independiente"
    ],
    tags: ["familiar", "tranquilo", "exclusivo"],
    dateAdded: "2024-02-15"
  },

  {
    id: 3,
    title: "Villa Moderna en Cap Cana",
    type: "casa",
    status: "venta",
    price: 1250000,
    location: "punta-cana",
    locationLabel: "Cap Cana, Punta Cana",
    size: 850,
    bedrooms: 6,
    bathrooms: 6,
    parkingSpots: 4,
    yearBuilt: 2022,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=800&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80"
    ],
    description: "Villa de ultra-lujo ubicada dentro del exclusivo complejo Cap Cana, con acceso a marina privada y playa. Acabados europeos, techos de doble altura y una piscina infinity con vista al mar que la convierten en una joya arquitectónica única en el Caribe. Ideal como inversión turística o residencia de descanso.",
    features: [
      "Piscina infinity con vista al mar",
      "Acceso a marina privada",
      "Campo de golf en el complejo",
      "Smart home con domótica completa",
      "Bodega de vinos climatizada",
      "Spa y gimnasio privado",
      "Cocina gourmet con electrodomésticos Sub-Zero",
      "Seguridad privada las 24 horas"
    ],
    tags: ["ultra-lujo", "playa", "inversión", "cap-cana"],
    dateAdded: "2024-01-20"
  },

  {
    id: 4,
    title: "Casa en Jardines del Norte, Santiago",
    type: "casa",
    status: "venta",
    price: 195000,
    location: "santiago",
    locationLabel: "Jardines del Norte, Santiago",
    size: 280,
    bedrooms: 3,
    bathrooms: 2,
    parkingSpots: 2,
    yearBuilt: 2015,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa12c98?w=800&q=80"
    ],
    description: "Cómoda y bien mantenida residencia en el residencial Jardines del Norte de Santiago de los Caballeros. Perfecta para familias jóvenes, con espacios funcionales, buen flujo de ventilación natural y acceso fácil a los principales centros comerciales y escuelas de la ciudad.",
    features: [
      "Amplio jardín frontal y posterior",
      "Sala-comedor de concepto abierto",
      "Cocina con área de desayunador",
      "Inversor y tanque de agua",
      "Verja eléctrica y portón automático",
      "Marquesina para dos vehículos",
      "Closets empotrados en habitaciones",
      "Área de lavandería"
    ],
    tags: ["familiar", "santiago", "accesible"],
    dateAdded: "2024-02-28"
  },

  {
    id: 5,
    title: "Casa de Playa en Las Terrenas",
    type: "casa",
    status: "venta",
    price: 420000,
    location: "santo-domingo",
    locationLabel: "Las Terrenas, Samaná",
    size: 310,
    bedrooms: 4,
    bathrooms: 3,
    parkingSpots: 2,
    yearBuilt: 2020,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80",
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80"
    ],
    description: "Cautivadora casa de playa a solo 200 metros del mar en Las Terrenas, Samaná. Rodeada de vegetación tropical, con terrazas que capturan la brisa del Atlántico. Una propiedad única ideal para vivienda permanente, casa vacacional o alquiler turístico de alta rentabilidad.",
    features: [
      "A 200m de la playa",
      "Gran terraza con hamacas",
      "Piscina rodeada de jardín tropical",
      "Cocina exterior con BBQ",
      "Acabados con materiales naturales",
      "Ventilación cruzada natural",
      "Cuartos de servicio independientes",
      "Alta rentabilidad turística (Airbnb)"
    ],
    tags: ["playa", "samaná", "turismo", "inversión"],
    dateAdded: "2024-01-10"
  },

  {
    id: 6,
    title: "Casa Estilo Colonial en Gazcue",
    type: "casa",
    status: "venta",
    price: 275000,
    location: "santo-domingo",
    locationLabel: "Gazcue, Santo Domingo",
    size: 350,
    bedrooms: 4,
    bathrooms: 3,
    parkingSpots: 1,
    yearBuilt: 1958,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1484154218957-3baf7e4f4b8d?w=800&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80"
    ],
    description: "Elegante propiedad de estilo colonial restaurada en el histórico barrio de Gazcue. Techos altos, pisos de mosaico original y galerías que evocan la arquitectura caribeña de mediados del siglo XX. Remodelada con baños y cocina modernos, conservando todo su encanto patrimonial.",
    features: [
      "Arquitectura colonial restaurada",
      "Pisos de mosaico original",
      "Techos de 3.5m de altura",
      "Galería perimetral",
      "Patio interior sombreado",
      "Cocina y baños remodelados",
      "Cerca del Malecón y Zona Colonial",
      "Potencial para uso mixto residencial/comercial"
    ],
    tags: ["colonial", "histórico", "gazcue"],
    dateAdded: "2024-03-10"
  },

  {
    id: 7,
    title: "Casa en Playa Dorada, Puerto Plata",
    type: "casa",
    status: "venta",
    price: 310000,
    location: "puerto-plata",
    locationLabel: "Playa Dorada, Puerto Plata",
    size: 290,
    bedrooms: 3,
    bathrooms: 3,
    parkingSpots: 2,
    yearBuilt: 2018,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1597218868981-1b68e15f0065?w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"
    ],
    description: "Hermosa propiedad dentro del complejo Playa Dorada en Puerto Plata, con acceso directo a campo de golf y playa privada. Diseño caribeño con techos de madera y amplias terrazas. Excelente opción para residencia vacacional o inversión en alquiler turístico en el norte dominicano.",
    features: [
      "Acceso a campo de golf Jack Nicklaus",
      "Playa privada del complejo",
      "Piscina comunitaria olímpica",
      "Seguridad privada 24/7",
      "Canchas de tenis",
      "Centro comercial dentro del complejo",
      "Diseño tropical con materiales naturales",
      "Alta demanda de alquiler vacacional"
    ],
    tags: ["golf", "playa", "puerto-plata", "vacacional"],
    dateAdded: "2024-02-05"
  },

  {
    id: 8,
    title: "Casa de Campo en Jarabacoa",
    type: "casa",
    status: "venta",
    price: 165000,
    location: "santiago",
    locationLabel: "Jarabacoa, La Vega",
    size: 240,
    bedrooms: 3,
    bathrooms: 2,
    parkingSpots: 2,
    yearBuilt: 2016,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80"
    ],
    description: "Acogedora casa de campo en las frescas montañas de Jarabacoa, conocida como La Ciudad de la Eterna Primavera. Rodeada de naturaleza exuberante, ríos y cascadas. Temperatura promedio de 22°C todo el año. Ideal para quienes buscan escapar del calor urbano con un retiro de montaña único.",
    features: [
      "Clima fresco todo el año (22°C promedio)",
      "Vista a montañas y río",
      "Chimenea en sala principal",
      "Amplia terraza con jardín",
      "Cerca de ríos y cascadas",
      "Acceso a rutas de senderismo",
      "Zona tranquila y segura",
      "Potencial para ecoturismo"
    ],
    tags: ["montaña", "naturaleza", "jarabacoa", "fresco"],
    dateAdded: "2024-03-05"
  },

  {
    id: 9,
    title: "Casa con Piscina en Bella Vista",
    type: "casa",
    status: "venta",
    price: 390000,
    location: "santo-domingo",
    locationLabel: "Bella Vista, Santo Domingo",
    size: 440,
    bedrooms: 5,
    bathrooms: 4,
    parkingSpots: 3,
    yearBuilt: 2021,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1588880331179-d8f70c5a8e56?w=800&q=80",
      "https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80"
    ],
    description: "Residencia contemporánea en el exclusivo sector de Bella Vista, con diseño de planta abierta y acabados europeos. La piscina de borde infinito se integra perfectamente con el área social, creando un espacio de entretenimiento de primer nivel. Metros extras de terraza en el nivel superior.",
    features: [
      "Piscina de borde infinito",
      "Cocina gourmet con isla central",
      "Sala de juegos y entretenimiento",
      "Sistema de sonido integrado",
      "Planta eléctrica automática",
      "Cisterna de 5,000 galones",
      "Seguridad perimetral con cámaras",
      "Terraza de 80m² en azotea"
    ],
    tags: ["lujo", "piscina", "bella-vista", "entretenimiento"],
    dateAdded: "2024-01-30"
  },

  {
    id: 10,
    title: "Casa en Casa de Campo, La Romana",
    type: "casa",
    status: "venta",
    price: 875000,
    location: "la-romana",
    locationLabel: "Casa de Campo, La Romana",
    size: 680,
    bedrooms: 5,
    bathrooms: 5,
    parkingSpots: 3,
    yearBuilt: 2020,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
    ],
    description: "Exclusiva villa dentro del mundialmente famoso resort Casa de Campo en La Romana. Rodeada de campos de polo y golf de clase mundial, marina y playa Minitas. Una propiedad que combina el lujo caribeño con servicios de hotel cinco estrellas a disposición permanente del propietario.",
    features: [
      "Acceso a playa Minitas privada",
      "3 campos de golf Pete Dye",
      "Campo de polo internacional",
      "Marina privada con yates",
      "Servicios de hotel 5 estrellas",
      "Seguridad privada las 24h",
      "Cancha de tenis privada",
      "Mayordomo y servicio de limpieza"
    ],
    tags: ["ultra-lujo", "golf", "polo", "la-romana"],
    dateAdded: "2024-01-05"
  },

  // ─────────────────────────────────────────
  //  APARTAMENTOS
  // ─────────────────────────────────────────
  {
    id: 11,
    title: "Apartamento de Lujo en Naco",
    type: "apartamento",
    status: "venta",
    price: 225000,
    location: "santo-domingo",
    locationLabel: "Naco, Santo Domingo",
    size: 185,
    bedrooms: 3,
    bathrooms: 2,
    parkingSpots: 2,
    yearBuilt: 2021,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa12c98?w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80"
    ],
    description: "Apartamento de alta gama en el codiciado sector de Naco, con balcón privado y vista panorámica a la ciudad. El edificio cuenta con amenidades de resort: piscina, gimnasio, salón de eventos y seguridad controlada. Acabados premium con pisos de porcelanato y cocina equipada.",
    features: [
      "Balcón privado con vista a la ciudad",
      "Piscina en azotea del edificio",
      "Gimnasio completamente equipado",
      "Salón de eventos y BBQ",
      "Lobby con concierge",
      "Ascensores panorámicos",
      "Cisterna y planta eléctrica",
      "Dos puestos de parqueo techados"
    ],
    tags: ["lujo", "balcón", "amenidades"],
    dateAdded: "2024-02-20"
  },

  {
    id: 12,
    title: "Apartamento en Evaristo Morales",
    type: "apartamento",
    status: "venta",
    price: 155000,
    location: "santo-domingo",
    locationLabel: "Evaristo Morales, Santo Domingo",
    size: 140,
    bedrooms: 2,
    bathrooms: 2,
    parkingSpots: 1,
    yearBuilt: 2018,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80"
    ],
    description: "Moderno apartamento en Evaristo Morales, a pasos de restaurantes, boutiques y la vida cultural de Santo Domingo. Interiores contemporáneos con cocina abierta al área social, baños con acabados finos y balcón sombreado. Excelente ubicación para jóvenes profesionales y parejas.",
    features: [
      "Cocina abierta al área social",
      "Balcón privado sombreado",
      "Piso de porcelanato italiano",
      "Closets con diseño a medida",
      "Aire acondicionado en todos los cuartos",
      "Seguridad con cámaras y portero",
      "Agua caliente solar",
      "Área de lavandería propia"
    ],
    tags: ["moderno", "céntrico", "profesionales"],
    dateAdded: "2024-03-08"
  },

  {
    id: 13,
    title: "Penthouse en La Esperilla",
    type: "apartamento",
    status: "venta",
    price: 520000,
    location: "santo-domingo",
    locationLabel: "La Esperilla, Santo Domingo",
    size: 320,
    bedrooms: 4,
    bathrooms: 4,
    parkingSpots: 3,
    yearBuilt: 2023,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80"
    ],
    description: "Espectacular penthouse en el piso 22 con terraza privada de 80m² y jacuzzi exterior. Vistas de 360° a toda la ciudad y el mar Caribe al fondo. El mejor apartamento del edificio, con acabados únicos y exclusivos, cocina de chef y sala de cine privada. Una joya sin igual en Santo Domingo.",
    features: [
      "Terraza privada de 80m² con jacuzzi",
      "Vista 360° a ciudad y mar Caribe",
      "Sala de cine privada",
      "Cocina de chef con equipos Sub-Zero",
      "Suite principal con walk-in closet doble",
      "Smart home automatizado",
      "Elevador privado hasta el penthouse",
      "Bodega de vinos climatizada"
    ],
    tags: ["penthouse", "ultra-lujo", "vistas", "jacuzzi"],
    dateAdded: "2024-01-15"
  },

  {
    id: 14,
    title: "Apartamento Frente al Mar en Bávaro",
    type: "apartamento",
    status: "venta",
    price: 185000,
    location: "punta-cana",
    locationLabel: "Bávaro, Punta Cana",
    size: 125,
    bedrooms: 2,
    bathrooms: 2,
    parkingSpots: 1,
    yearBuilt: 2020,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80"
    ],
    description: "Apartamento con vista directa al Océano Atlántico en el complejo residencial-turístico de Bávaro. Acceso a playa de arena blanca, piscinas y restaurantes. Alto potencial de renta vacacional con ocupación del 80% anual. Ideal como inversión con retorno inmediato.",
    features: [
      "Vista directa al mar Atlántico",
      "Acceso a playa de arena blanca",
      "Tres piscinas en el complejo",
      "Restaurante y bar en la propiedad",
      "Servicio de administración para rentas",
      "Cerca de Punta Cana International Airport",
      "Cancha de tenis y volleyball",
      "Programa de intercambio vacacional"
    ],
    tags: ["playa", "inversión", "turismo", "punta-cana"],
    dateAdded: "2024-02-10"
  },

  {
    id: 15,
    title: "Apartamento en Torre Dorada, Santiago",
    type: "apartamento",
    status: "venta",
    price: 135000,
    location: "santiago",
    locationLabel: "Centro, Santiago de los Caballeros",
    size: 115,
    bedrooms: 2,
    bathrooms: 2,
    parkingSpots: 1,
    yearBuilt: 2019,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80"
    ],
    description: "Apartamento céntrico en Santiago de los Caballeros, segunda ciudad más importante de la República Dominicana. Ubicado en un moderno edificio con todas las amenidades necesarias. Excelente para profesionales o parejas que desean vivir en el corazón cibaeño con todo a su alcance.",
    features: [
      "Piscina en azotea del edificio",
      "Gimnasio con equipos modernos",
      "Balcón con vista al Monumento",
      "Lobby principal con seguridad",
      "Parqueo bajo tierra techado",
      "Generador en todo el edificio",
      "Lavandería en el piso",
      "Sala de reuniones para residentes"
    ],
    tags: ["céntrico", "santiago", "moderno"],
    dateAdded: "2024-03-12"
  },

  {
    id: 16,
    title: "Apartamento Estudio en Zona Colonial",
    type: "apartamento",
    status: "venta",
    price: 89000,
    location: "santo-domingo",
    locationLabel: "Zona Colonial, Santo Domingo",
    size: 65,
    bedrooms: 1,
    bathrooms: 1,
    parkingSpots: 0,
    yearBuilt: 2017,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80",
      "https://images.unsplash.com/photo-1630699144867-37acec97df5a?w=800&q=80"
    ],
    description: "Encantador apartamento estudio en pleno corazón de la Zona Colonial de Santo Domingo, Patrimonio de la Humanidad por la UNESCO. Edificio restaurado con detalles arquitectónicos coloniales. La ubicación privilegiada lo convierte en una excelente opción para alquiler turístico de corta estadía.",
    features: [
      "En Patrimonio de la Humanidad UNESCO",
      "Edificio colonial restaurado",
      "A pasos de museos y restaurantes",
      "Acceso al Malecón en 10 minutos",
      "Alta demanda de alquiler turístico",
      "Terraza comunitaria con vista colonial",
      "Internet de alta velocidad incluido",
      "Mobiliario incluido (negociable)"
    ],
    tags: ["colonial", "turismo", "inversión", "histórico"],
    dateAdded: "2024-03-15"
  },

  {
    id: 17,
    title: "Apartamento 3BR en Arroyo Hondo",
    type: "apartamento",
    status: "venta",
    price: 198000,
    location: "santo-domingo",
    locationLabel: "Arroyo Hondo, Santo Domingo",
    size: 175,
    bedrooms: 3,
    bathrooms: 2,
    parkingSpots: 2,
    yearBuilt: 2020,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1617098900591-3f90928e8c54?w=800&q=80",
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&q=80"
    ],
    description: "Espacioso apartamento en Arroyo Hondo, uno de los sectores más cotizados de la capital por su tranquilidad y verdor. Amplio balcón con vista a áreas verdes, cocina amplia y habitación principal con baño en suite. Ideal para familias que buscan calidad de vida dentro de la ciudad.",
    features: [
      "Amplio balcón con vista verde",
      "Habitación principal con baño en suite",
      "Cocina semi-equipada",
      "Piscina olímpica del edificio",
      "Área de juegos infantiles",
      "Salón de fiestas para residentes",
      "Cisterna propia y planta eléctrica",
      "Dos parkings con portón automático"
    ],
    tags: ["familiar", "arroyo-hondo", "verde"],
    dateAdded: "2024-02-25"
  },

  {
    id: 18,
    title: "Apartamento en San Pedro de Macorís",
    type: "apartamento",
    status: "venta",
    price: 98000,
    location: "san-pedro",
    locationLabel: "Centro, San Pedro de Macorís",
    size: 95,
    bedrooms: 2,
    bathrooms: 1,
    parkingSpots: 1,
    yearBuilt: 2016,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
      "https://images.unsplash.com/photo-1601760562234-9814eea6画?w=800&q=80"
    ],
    description: "Práctico y bien ubicado apartamento en San Pedro de Macorís, ciudad con gran actividad comercial e industrial. Cerca de zona franca, universidades y principales servicios. Excelente opción de inversión para alquiler a largo plazo con alta demanda de profesionales locales.",
    features: [
      "Cerca de zona franca industrial",
      "A minutos de universidades",
      "Piscina comunitaria",
      "Seguridad 24/7",
      "Área de lavandería",
      "Parqueo techado",
      "Buena ventilación natural",
      "Precio accesible con financiamiento"
    ],
    tags: ["accesible", "inversión", "san-pedro"],
    dateAdded: "2024-03-20"
  },

  // ─────────────────────────────────────────
  //  TERRENOS
  // ─────────────────────────────────────────
  {
    id: 19,
    title: "Terreno Residencial en Punta Cana",
    type: "terreno",
    status: "venta",
    price: 245000,
    location: "punta-cana",
    locationLabel: "Punta Cana Village, Punta Cana",
    size: 800,
    bedrooms: 0,
    bathrooms: 0,
    parkingSpots: 0,
    yearBuilt: null,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80"
    ],
    description: "Excelente terreno residencial dentro del complejo Punta Cana Village, con todos los servicios instalados (electricidad, agua potable, internet). Ideal para construir villa vacacional o residencia permanente. Área de alta plusvalía con crecimiento constante y mercado turístico en expansión.",
    features: [
      "800m² de terreno plano",
      "Servicios instalados: agua, luz, internet",
      "Dentro de complejo con seguridad",
      "Área de alta plusvalía",
      "Reglamento de construcción definido",
      "Cerca de aeropuerto internacional",
      "Planos arquitectónicos disponibles",
      "Financiamiento bancario disponible"
    ],
    tags: ["terreno", "punta-cana", "inversión", "construcción"],
    dateAdded: "2024-02-18"
  },

  {
    id: 20,
    title: "Terreno Comercial en Santiago",
    type: "terreno",
    status: "venta",
    price: 380000,
    location: "santiago",
    locationLabel: "Autopista Duarte, Santiago",
    size: 2500,
    bedrooms: 0,
    bathrooms: 0,
    parkingSpots: 0,
    yearBuilt: null,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80",
      "https://images.unsplash.com/photo-1510146758428-e5e4b17b8b6a?w=800&q=80"
    ],
    description: "Extenso terreno de 2,500m² en zona comercial de alta visibilidad sobre la Autopista Duarte en Santiago. Flujo vehicular de más de 50,000 vehículos diarios. Ideal para centro comercial, edificio de oficinas, hotel o uso mixto. Todos los permisos de uso de suelo comercial vigentes.",
    features: [
      "2,500m² con frente a autopista principal",
      "Flujo de 50,000 vehículos diarios",
      "Uso de suelo comercial aprobado",
      "Topografía plana y regular",
      "Acceso desde ambos carriles",
      "Servicios básicos en el límite",
      "Estudios de suelo disponibles",
      "Posibilidad de desarrollo en fases"
    ],
    tags: ["comercial", "terreno", "autopista", "santiago"],
    dateAdded: "2024-01-25"
  },

  {
    id: 21,
    title: "Lote Frente al Mar en Samaná",
    type: "terreno",
    status: "venta",
    price: 195000,
    location: "santo-domingo",
    locationLabel: "Bahía de Samaná, Samaná",
    size: 1200,
    bedrooms: 0,
    bathrooms: 0,
    parkingSpots: 0,
    yearBuilt: null,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80",
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&q=80"
    ],
    description: "Raro lote de 1,200m² con frente directo a la Bahía de Samaná, uno de los paisajes más bellos del Caribe. Vista panorámica a las montañas y el mar. Área famosa por el avistamiento de ballenas jorobadas. Potencial turístico extraordinario para eco-resort, glamping o villa privada.",
    features: [
      "Frente directo a la Bahía de Samaná",
      "Vista panorámica de montañas y mar",
      "Zona de avistamiento de ballenas",
      "1,200m² con topografía suave",
      "Acceso por carretera pavimentada",
      "Área de alto potencial turístico",
      "Posibilidad de uso eco-turístico",
      "Escritura pública limpia"
    ],
    tags: ["playa", "samaná", "turismo", "naturaleza"],
    dateAdded: "2024-02-12"
  },

  {
    id: 22,
    title: "Terreno para Proyecto en La Romana",
    type: "terreno",
    status: "venta",
    price: 520000,
    location: "la-romana",
    locationLabel: "La Romana, La Romana",
    size: 5000,
    bedrooms: 0,
    bathrooms: 0,
    parkingSpots: 0,
    yearBuilt: null,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=800&q=80",
      "https://images.unsplash.com/photo-1540206395-68808572332f?w=800&q=80",
      "https://images.unsplash.com/photo-1563906267088-b029e7101114?w=800&q=80"
    ],
    description: "Gran terreno de 5,000m² en La Romana ideal para desarrollo residencial en condominio. Zona en plena expansión con creciente demanda habitacional. Colindante con proyecto residencial de alta gama en construcción. Estudios técnicos completos y certificado de uso de suelo disponibles.",
    features: [
      "5,000m² con topografía regular",
      "Colindante con proyecto de alta gama",
      "Estudios técnicos completos",
      "Certif. de uso de suelo residencial",
      "Servicios públicos al frente",
      "Acceso por calle pavimentada de 2 carriles",
      "Alta demanda habitacional en la zona",
      "Posibilidad de subdivisión"
    ],
    tags: ["desarrollo", "terreno", "la-romana", "proyecto"],
    dateAdded: "2024-01-28"
  },

  {
    id: 23,
    title: "Solar en Residencial Privado, Sto. Domingo",
    type: "terreno",
    status: "venta",
    price: 145000,
    location: "santo-domingo",
    locationLabel: "Residencial Jardines del Este, Santo Domingo Este",
    size: 600,
    bedrooms: 0,
    bathrooms: 0,
    parkingSpots: 0,
    yearBuilt: null,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&q=80",
      "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=800&q=80"
    ],
    description: "Solar de 600m² dentro de residencial privado en Santo Domingo Este con seguridad 24/7. Infraestructura completa instalada: calles pavimentadas, alumbrado público, acueducto y electricidad al frente del lote. La mejor opción para construir tu casa soñada en un entorno seguro y tranquilo.",
    features: [
      "Dentro de residencial con seguridad 24/7",
      "Infraestructura completa instalada",
      "Calles internas pavimentadas",
      "Alumbrado público LED",
      "Área verde y parque comunitario",
      "Reglamento de construcción establecido",
      "Escritura pública en regla",
      "Financiamiento hipotecario disponible"
    ],
    tags: ["solar", "residencial", "seguridad", "construcción"],
    dateAdded: "2024-03-01"
  },

  // ─────────────────────────────────────────
  //  HOTELES / PROYECTOS HOTELEROS
  // ─────────────────────────────────────────
  {
    id: 24,
    title: "Boutique Hotel en Las Terrenas",
    type: "hotel",
    status: "venta",
    price: 1800000,
    location: "santo-domingo",
    locationLabel: "Las Terrenas, Samaná",
    size: 2200,
    bedrooms: 18,
    bathrooms: 22,
    parkingSpots: 20,
    yearBuilt: 2015,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80"
    ],
    description: "Oportunidad única de adquirir un boutique hotel de 18 habitaciones operativo en Las Terrenas, uno de los destinos turísticos más exclusivos del Caribe. Construido con materiales de alta calidad, jardines tropicales y piscina. Ocupación promedio del 78% anual con clientela europea consolidada.",
    features: [
      "18 habitaciones con baño privado",
      "Restaurante con capacidad para 60 personas",
      "Piscina olímpica con bar flotante",
      "Spa y área de masajes",
      "Cancha de tenis iluminada",
      "Recepción 24/7 con personal capacitado",
      "Sistema de reservas en línea establecido",
      "78% de ocupación promedio anual"
    ],
    tags: ["hotel", "turismo", "inversión", "samaná"],
    dateAdded: "2024-01-08"
  },

  {
    id: 25,
    title: "Hotel de Playa en Puerto Plata",
    type: "hotel",
    status: "venta",
    price: 3500000,
    location: "puerto-plata",
    locationLabel: "Sosúa, Puerto Plata",
    size: 8500,
    bedrooms: 45,
    bathrooms: 50,
    parkingSpots: 60,
    yearBuilt: 2010,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
      "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800&q=80"
    ],
    description: "Hotel todo incluido de 45 habitaciones con acceso directo a la famosa playa de Sosúa, Puerto Plata. Infraestructura completa con múltiples restaurantes, bares, entretenimiento nocturno y deportes acuáticos. Franquiciable o continuación de marca independiente. ROI comprobado con registros contables auditados disponibles.",
    features: [
      "Acceso directo a playa de Sosúa",
      "45 habitaciones (simples, dobles y suites)",
      "3 restaurantes y 4 bares",
      "Shows y entretenimiento nocturno",
      "Centro de deportes acuáticos",
      "Spa de 800m² con 12 cabinas",
      "Pool bar y piscina principal",
      "Registros contables auditados disponibles"
    ],
    tags: ["hotel", "todo-incluido", "playa", "puerto-plata"],
    dateAdded: "2024-01-03"
  },

  // ─────────────────────────────────────────
  //  RESIDENCIALES / CONDOMINIOS
  // ─────────────────────────────────────────
  {
    id: 26,
    title: "Residencial Cerrado en Bávaro",
    type: "residencial",
    status: "venta",
    price: 295000,
    location: "punta-cana",
    locationLabel: "Bávaro, Punta Cana",
    size: 320,
    bedrooms: 4,
    bathrooms: 3,
    parkingSpots: 2,
    yearBuilt: 2022,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1600047508788-786f3865b25a?w=800&q=80",
      "https://images.unsplash.com/photo-1600047508788-786f3865b25a?w=800&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80"
    ],
    description: "Exclusivo townhouse en condominio cerrado en Bávaro, a 5 minutos de la playa. Diseño moderno tropical con techos altos y acabados premium. El complejo cuenta con club house, piscina y seguridad privada. La mezcla perfecta entre privacidad familiar y vida turística caribeña.",
    features: [
      "A 5 minutos de la playa",
      "Club house con piscina y gimnasio",
      "Área de juegos infantiles",
      "Sendero peatonal interior",
      "Seguridad biométrica en accesos",
      "Cocina equipada con isla",
      "Terraza privada en nivel superior",
      "Mantenimiento del condominio incluido"
    ],
    tags: ["condominio", "punta-cana", "familiar", "playa"],
    dateAdded: "2024-02-22"
  },

  {
    id: 27,
    title: "Condominio de Lujo en Piantini",
    type: "residencial",
    status: "venta",
    price: 680000,
    location: "santo-domingo",
    locationLabel: "Piantini, Santo Domingo",
    size: 480,
    bedrooms: 5,
    bathrooms: 5,
    parkingSpots: 3,
    yearBuilt: 2023,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
    ],
    description: "Majestuoso condominio de última generación en Piantini con el diseño más sofisticado del mercado dominicano actual. Acabados europeos en cada rincón, sistemas domóticos integrados y áreas comunes que rivalizan con los mejores hoteles cinco estrellas de la capital.",
    features: [
      "Sistema de domótica completo",
      "Piscina climatizada en azotea",
      "Rooftop bar privado para residentes",
      "Concierge y mayordomo disponibles",
      "Sala de cigar lounge",
      "Sala de reuniones ejecutivas",
      "Bodega climatizada de vinos",
      "Helipuerto en la azotea"
    ],
    tags: ["ultra-lujo", "domótica", "piantini", "helipuerto"],
    dateAdded: "2024-01-18"
  },

  {
    id: 28,
    title: "Townhouse en Alma Rosa, Sto. Domingo Este",
    type: "residencial",
    status: "venta",
    price: 178000,
    location: "santo-domingo",
    locationLabel: "Alma Rosa, Santo Domingo Este",
    size: 195,
    bedrooms: 3,
    bathrooms: 2,
    parkingSpots: 2,
    yearBuilt: 2021,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600047508788-786f3865b25a?w=800&q=80"
    ],
    description: "Moderno townhouse en Alma Rosa, Santo Domingo Este, dentro de condominio cerrado con excelentes amenidades. Distribución en tres niveles que maximiza la privacidad familiar. Cerca del Aeropuerto Internacional Las Américas, centro comercial Ágora Mall y principales avenidas.",
    features: [
      "3 niveles de distribución inteligente",
      "Piscina del condominio",
      "Seguridad 24/7 con cámaras",
      "Parqueo techado para 2 autos",
      "Terraza privada en tercer nivel",
      "Cerca del Aeropuerto Las Américas",
      "A 10 min del Ágora Mall",
      "Sistema inversor instalado"
    ],
    tags: ["townhouse", "sto-domingo-este", "familiar"],
    dateAdded: "2024-03-05"
  },

  // ─────────────────────────────────────────
  //  EDIFICIOS
  // ─────────────────────────────────────────
  {
    id: 29,
    title: "Edificio de Apartamentos en Gazcue",
    type: "edificio",
    status: "venta",
    price: 2100000,
    location: "santo-domingo",
    locationLabel: "Gazcue, Santo Domingo",
    size: 3200,
    bedrooms: 24,
    bathrooms: 24,
    parkingSpots: 24,
    yearBuilt: 2018,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
      "https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=800&q=80",
      "https://images.unsplash.com/photo-1510146758428-e5e4b17b8b6a?w=800&q=80"
    ],
    description: "Edificio residencial de 8 pisos con 24 apartamentos distribuidos en tres por piso, todos arrendados con contratos vigentes. Renta mensual consolidada de $18,000 USD. Excelente estado de mantenimiento con reciente renovación de fachada y ascensores. Ideal para inversionistas institucionales.",
    features: [
      "24 apartamentos todos arrendados",
      "Renta mensual de $18,000 USD",
      "Contratos de arrendamiento vigentes",
      "2 ascensores modernos",
      "Generador central para todo el edificio",
      "Sistema de cisternas y bombas nuevas",
      "Administración profesional en marcha",
      "Auditoría contable disponible"
    ],
    tags: ["edificio", "inversión", "renta", "gazcue"],
    dateAdded: "2024-01-12"
  },

  {
    id: 30,
    title: "Edificio Mixto Comercial-Residencial",
    type: "edificio",
    status: "venta",
    price: 3800000,
    location: "santiago",
    locationLabel: "Av. Las Carreras, Santiago",
    size: 6500,
    bedrooms: 30,
    bathrooms: 32,
    parkingSpots: 40,
    yearBuilt: 2020,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=800&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80"
    ],
    description: "Gran edificio de uso mixto sobre la Avenida Las Carreras, la arteria comercial más importante de Santiago. Planta baja y primer piso comerciales con 8 locales arrendados a marcas reconocidas. Del piso 2 al 12: 30 apartamentos residenciales de alto estándar. Inversión de primera con alta liquidez.",
    features: [
      "8 locales comerciales en PB y P1",
      "30 apartamentos residenciales P2–P12",
      "Planta baja abierta al comercio",
      "Parking subterráneo de 40 espacios",
      "3 ascensores de alta capacidad",
      "Fachada de vidrio templado moderno",
      "Renta mensual total de $32,000 USD",
      "Sistema BMS de gestión del edificio"
    ],
    tags: ["mixto", "comercial", "residencial", "santiago"],
    dateAdded: "2024-01-22"
  },

  // ─────────────────────────────────────────
  //  LOCALES COMERCIALES
  // ─────────────────────────────────────────
  {
    id: 31,
    title: "Local Comercial en Blue Mall, Piantini",
    type: "local-comercial",
    status: "venta",
    price: 340000,
    location: "santo-domingo",
    locationLabel: "Blue Mall, Piantini, Santo Domingo",
    size: 120,
    bedrooms: 0,
    bathrooms: 2,
    parkingSpots: 2,
    yearBuilt: 2016,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80"
    ],
    description: "Exclusivo local comercial de 120m² en el nivel 2 del Blue Mall, el centro comercial más lujoso de República Dominicana. Ubicación premium con alto flujo de clientes de poder adquisitivo elevado. Ideal para tienda de moda, joyería, galería de arte o oficina de representación de marca internacional.",
    features: [
      "Ubicación en Blue Mall Piantini",
      "120m² distribuidos eficientemente",
      "Doble altura con mezzanine opcional",
      "Vitrina amplia hacia pasillo principal",
      "Sistema de A/C centralizado incluido",
      "2 parqueos asignados en subterráneo",
      "Flujo de 15,000 visitantes diarios",
      "Seguridad y mantenimiento del mall"
    ],
    tags: ["comercial", "mall", "lujo", "piantini"],
    dateAdded: "2024-02-08"
  },

  {
    id: 32,
    title: "Local Gastronómico en Zona Colonial",
    type: "local-comercial",
    status: "venta",
    price: 210000,
    location: "santo-domingo",
    locationLabel: "Calle El Conde, Zona Colonial, Santo Domingo",
    size: 185,
    bedrooms: 0,
    bathrooms: 3,
    parkingSpots: 0,
    yearBuilt: 1920,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=800&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80"
    ],
    description: "Histórico local de 185m² sobre la emblemática Calle El Conde en la Zona Colonial, el paseo peatonal más famoso de Santo Domingo. Edificación colonial del siglo XX completamente restaurada, con patio interior y terraza. Perfecto para restaurante de autor, café literario, bar temático o tienda de experiencias.",
    features: [
      "Sobre Calle El Conde peatonal",
      "Patio colonial interior de 40m²",
      "Terraza frontal con vista al peatonal",
      "Cocina de 35m² con campana industrial",
      "Capacidad para 80 comensales",
      "Restauración arquitectónica certificada",
      "Flujo turístico internacional constante",
      "Negocio establecido (traspaso disponible)"
    ],
    tags: ["restaurante", "colonial", "turismo", "gastronomía"],
    dateAdded: "2024-02-01"
  }

];

// ============================================================
//  Funciones de acceso y filtrado
// ============================================================

/**
 * Devuelve todas las propiedades.
 */
function getAllProperties() {
  return propertiesDatabase;
}

/**
 * Devuelve las propiedades destacadas (featured).
 */
function getFeaturedProperties() {
  return propertiesDatabase.filter(p => p.featured);
}

/**
 * Busca una propiedad por su ID.
 */
function getPropertyById(id) {
  return propertiesDatabase.find(p => p.id === id) || null;
}

/**
 * Filtra propiedades según los criterios dados.
 * @param {Object} filters
 * @param {string}  [filters.search]       - Texto libre
 * @param {string}  [filters.type]         - Tipo de propiedad
 * @param {number}  [filters.minPrice]     - Precio mínimo
 * @param {number}  [filters.maxPrice]     - Precio máximo
 * @param {string}  [filters.location]     - Slug de ubicación
 * @param {number}  [filters.minSize]      - Metros cuadrados mínimos
 */
function filterProperties(filters = {}) {
  let results = [...propertiesDatabase];

  // Búsqueda de texto libre
  if (filters.search && filters.search.trim() !== '') {
    const q = filters.search.toLowerCase();
    results = results.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.locationLabel.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  // Tipo de propiedad
  if (filters.type && filters.type !== '') {
    results = results.filter(p => p.type === filters.type);
  }

  // Precio mínimo
  if (filters.minPrice && !isNaN(filters.minPrice)) {
    results = results.filter(p => p.price >= Number(filters.minPrice));
  }

  // Precio máximo
  if (filters.maxPrice && !isNaN(filters.maxPrice)) {
    results = results.filter(p => p.price <= Number(filters.maxPrice));
  }

  // Ubicación
  if (filters.location && filters.location !== '') {
    results = results.filter(p => p.location === filters.location);
  }

  // Metros cuadrados mínimos
  if (filters.minSize && !isNaN(filters.minSize)) {
    results = results.filter(p => p.size >= Number(filters.minSize));
  }

  return results;
}

/**
 * Ordena un array de propiedades.
 * @param {Array}  properties
 * @param {string} sortBy - 'newest' | 'price-low' | 'price-high' | 'size-big' | 'size-small'
 */
function sortProperties(properties, sortBy = 'newest') {
  const arr = [...properties];
  switch (sortBy) {
    case 'price-low':
      return arr.sort((a, b) => a.price - b.price);
    case 'price-high':
      return arr.sort((a, b) => b.price - a.price);
    case 'size-big':
      return arr.sort((a, b) => b.size - a.size);
    case 'size-small':
      return arr.sort((a, b) => a.size - b.size);
    case 'newest':
    default:
      return arr.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  }
}

/**
 * Formatea un precio en USD.
 */
function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

/**
 * Devuelve la etiqueta legible de un tipo de propiedad.
 */
function getTypeLabel(type) {
  const labels = {
    'casa': 'Casa',
    'apartamento': 'Apartamento',
    'terreno': 'Terreno',
    'hotel': 'Hotel',
    'residencial': 'Residencial',
    'edificio': 'Edificio',
    'local-comercial': 'Local Comercial'
  };
  return labels[type] || type;
}

// ============================================================
//  Exportar para uso global (compatible con scripts externos)
// ============================================================
if (typeof window !== 'undefined') {
  window.propertiesDatabase  = propertiesDatabase;
  window.getAllProperties     = getAllProperties;
  window.getFeaturedProperties = getFeaturedProperties;
  window.getPropertyById      = getPropertyById;
  window.filterProperties     = filterProperties;
  window.sortProperties       = sortProperties;
  window.formatPrice          = formatPrice;
  window.getTypeLabel         = getTypeLabel;
}

// Soporte para módulos CommonJS (Node / bundlers)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    propertiesDatabase,
    getAllProperties,
    getFeaturedProperties,
    getPropertyById,
    filterProperties,
    sortProperties,
    formatPrice,
    getTypeLabel
  };
}
