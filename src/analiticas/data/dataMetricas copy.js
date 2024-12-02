
export const lista_experiencias = [{
  "id": 1,
  "nombre": "Experiencia 1",
  "producto": "Camioneta Modelo RX1532",
  "fecha_creacion": "2022-01-01",
  "fecha_actualizacion": "2022-01-01"
},
{
  "id": 2,
  "nombre": "Experiencia 2",
  "producto": "Automóvil Deportivo modelos RX1532",
  "fecha_creacion": "2022-01-01",
  "fecha_actualizacion": "2022-01-01"
},
{
  "id": 3,
  "nombre": "Experiencia 3",
  "producto": "Departamento en Puerto Madero",
  "fecha_creacion": "2022-01-01",
  "fecha_actualizacion": "2022-01-01"
}
];

export const metrica_generales = [
  {
    "id_experiencia": 1,
    "visitas": 2000,
    "agregados_al_carrito": 100,
    "promedio_tiempo_visita": "2m 34s",
    "cantidad_compartido": 1000,
    "clics_en_relaciones": 60,
    "cantidad_interacciones": 2000
  },
  {
    "id_experiencia": 2,
    "visitas": 1789,
    "agregados_al_carrito": 30,
    "promedio_tiempo_visita": "1h 30m 34s",
    "cantidad_compartido": 750,
    "clics_en_relaciones": 1200,
    "cantidad_interacciones": 38521
  },
  {
    "id_experiencia": 3,
    "visitas": 126,
    "agregados_al_carrito": 70,
    "promedio_tiempo_visita": "50m 6s",
    "cantidad_compartido": 687,
    "clics_en_relaciones": 964,
    "cantidad_interacciones": 12900
  }

]
  

  export const metrica_visitas = [
    { "recorrido": "Recorrido 1", "visitas": 500 },
    { "recorrido": "Recorrido 2", "visitas": 300 },
    { "recorrido": "Recorrido 3", "visitas": 200 }
  ]

  export const metrica_carrito = [
    { "recorrido": "Recorrido 1", "value": 150 },
    { "recorrido": "Recorrido 2", "value": 300 },
    { "recorrido": "Recorrido 3", "value": 600 },
    { "recorrido": "Recorrido 4", "value": 50 }
  ]

  
  export const metrica_mensuales = [
    { "mes": "Enero", "visitas": 150, "experiencia": "Exp 1" },
    { "mes": "Febrero", "visitas": 180, "experiencia": "Exp 2" },
    { "mes": "Marzo", "visitas": 200, "experiencia": "Exp 3" },
    { "mes": "Abril", "visitas": 220, "experiencia": "Exp 1" },
    { "mes": "Mayo", "visitas": 240, "experiencia": "Exp 2" },
    { "mes": "Junio", "visitas": 300, "experiencia": "Exp 1" },
    { "mes": "Julio", "visitas": 350, "experiencia": "Exp 3" },
    { "mes": "Agosto", "visitas": 380, "experiencia": "Exp 1" },
    { "mes": "Septiembre", "visitas": 400, "experiencia": "Exp 1" }
  ]

  export const metrica_dispositivos = [
    { "tipo": "Escritorio", "value": 800 },
    { "tipo": "Mobile", "value": 300 },
    { "tipo": "Tablet", "value":300 }
  ]

  export const tabla_experiencias = [
    {
      id: '1',
      nombre: 'Recorrido 1',
      categoria: "Categoría 1",
      fecha_publicacion: '01/01/2020',
      producto: 'producto 1',
      link: 'https://www.google.com',
      status: "ALTO"      
    },
    {
      id: '2',
      nombre: 'Recorrido 2',
      categoria: "Categoría 2",
      fecha_publicacion: '02/01/2020',
      producto: 'producto 2',
      link: 'https://www.apple.com',
      status: "MEDIO"
    },
    {
      id: '3',
      nombre: 'Recorrido 3',
      categoria: "Categoría 3",
      fecha_publicacion: '03/01/2020',
      producto: 'producto 3',
      link: 'https://www.microsoft.com',
      status: "BAJO"
    },
    {
      id: '4',
      nombre: 'Recorrido 4',
      categoria: "Categoría 1",
      fecha_publicacion: '04/01/2020',
      producto: 'producto 4',
      link: 'https://www.amazon.com',
      status: "ALTO"
    },
    {
      id: '5',
      nombre: 'Recorrido 5',
      categoria: "Categoría 2",
      fecha_publicacion: '05/01/2020',
      producto: 'producto 5',
      link: 'https://www.google.com',
      status: "MEDIO"
    },
    {
      id: '6',
      nombre: 'Recorrido 6',
      categoria: "Categoría 3",
      fecha_publicacion: '06/01/2020',
      producto: 'producto 6',
      link: 'https://www.yahoo.com',
      status: "BAJO"
    },
    
    
  ];

  export const metrica_mas_visitadas = [
    { "recorrido": "Recorrido 1", "interacciones": 200, "porcentaje": 74 },
    { "recorrido": "Recorrido 2", "interacciones": 150, "porcentaje": 52 },
    { "recorrido": "Recorrido 3", "interacciones": 50, "porcentaje": 36 }
  ]

  export const metrica_interacciones = [
    { "recorrido": "Recorrido 1", "interacciones": 200, "porcentaje": 74 },
    { "recorrido": "Recorrido 2", "interacciones": 150, "porcentaje": 5 },
    { "recorrido": "Recorrido 3", "interacciones": 50, "porcentaje": 36 }
  ]

  export const metrica_permanencia = [
    { "recorrido": "Recorrido 1", "tiempo_permanencia": "3m", "porcentaje": 96 },
    { "recorrido": "Recorrido 2", "tiempo_permanencia": "2m", "porcentaje": 32 },
    { "recorrido": "Recorrido 3", "tiempo_permanencia": "1m 30s", "porcentaje": 40 }
  ]

  export const metrica_rebote = [
    { "recorrido": "Recorrido 1", "rebote": "4%", "porcentaje": 96 },
    { "recorrido": "Recorrido 2", "rebote": "8%", "porcentaje": 72 },
    { "recorrido": "Recorrido 3", "rebote": "10%", "porcentaje": 30 }
  ]
  
  
  