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
},
{
  "id": 4,
  "nombre": "Experiencia 4",
  "producto": "Casa en la Playa",
  "fecha_creacion": "2022-01-01",
  "fecha_actualizacion": "2022-01-01"
},
{
  "id": 5,
  "nombre": "Experiencia 5",
  "producto": "Moto Deportiva RX1532",
  "fecha_creacion": "2022-01-01",
  "fecha_actualizacion": "2022-01-01"
}
];

export const metrica_generales = [
  {
    "id_experiencia": 1,
    "visitas": 5000,
    "agregados_al_carrito": 300,
    "promedio_tiempo_visita": "3m 45s",
    "cantidad_compartido": 1500,
    "clics_en_relaciones": 200,
    "cantidad_interacciones": 5000
  },
  {
    "id_experiencia": 2,
    "visitas": 4500,
    "agregados_al_carrito": 250,
    "promedio_tiempo_visita": "2m 50s",
    "cantidad_compartido": 1200,
    "clics_en_relaciones": 180,
    "cantidad_interacciones": 4500
  },
  {
    "id_experiencia": 3,
    "visitas": 3000,
    "agregados_al_carrito": 200,
    "promedio_tiempo_visita": "4m 10s",
    "cantidad_compartido": 1000,
    "clics_en_relaciones": 150,
    "cantidad_interacciones": 3000
  },
  {
    "id_experiencia": 4,
    "visitas": 3500,
    "agregados_al_carrito": 220,
    "promedio_tiempo_visita": "3m 20s",
    "cantidad_compartido": 1100,
    "clics_en_relaciones": 160,
    "cantidad_interacciones": 3500
  },
  {
    "id_experiencia": 5,
    "visitas": 4000,
    "agregados_al_carrito": 280,
    "promedio_tiempo_visita": "3m 55s",
    "cantidad_compartido": 1300,
    "clics_en_relaciones": 170,
    "cantidad_interacciones": 4000
  }
];

export const metrica_visitas = [
  { "recorrido": "Recorrido 1", "visitas": 1500 },
  { "recorrido": "Recorrido 2", "visitas": 1200 },
  { "recorrido": "Recorrido 3", "visitas": 1000 },
  { "recorrido": "Recorrido 4", "visitas": 800 },
  { "recorrido": "Recorrido 5", "visitas": 600 }
];

export const metrica_carrito = [
  { "recorrido": "Recorrido 1", "value": 500 },
  { "recorrido": "Recorrido 2", "value": 400 },
  { "recorrido": "Recorrido 3", "value": 300 },
  { "recorrido": "Recorrido 4", "value": 200 },
  { "recorrido": "Recorrido 5", "value": 100 }
];

export const metrica_mensuales = [
  { "mes": "Enero", "visitas": 1500, "experiencia": "Exp 1" },
  { "mes": "Febrero", "visitas": 1800, "experiencia": "Exp 2" },
  { "mes": "Marzo", "visitas": 2000, "experiencia": "Exp 3" },
  { "mes": "Abril", "visitas": 2200, "experiencia": "Exp 1" },
  { "mes": "Mayo", "visitas": 2400, "experiencia": "Exp 2" },
  { "mes": "Junio", "visitas": 3000, "experiencia": "Exp 1" },
  { "mes": "Julio", "visitas": 3500, "experiencia": "Exp 3" },
  { "mes": "Agosto", "visitas": 3800, "experiencia": "Exp 1" },
  { "mes": "Septiembre", "visitas": 4000, "experiencia": "Exp 1" }
];

export const metrica_dispositivos = [
  { "tipo": "Escritorio", "value": 5000 },
  { "tipo": "Mobile", "value": 3000 },
  { "tipo": "Tablet", "value": 2000 }
];

export const tabla_experiencias = [
  {
    id: '1',
    nombre: 'Recorrido 1',
    categoria: "Categoría 1",
    fecha_publicacion: '01/01/2020',
    producto: 'producto 1',
    link: 'https://www.google.com',
    status: "ALTO"
  },
  {
    id: '2',
    nombre: 'Recorrido 2',
    categoria: "Categoría 2",
    fecha_publicacion: '02/01/2020',
    producto: 'producto 2',
    link: 'https://www.apple.com',
    status: "MEDIO"
  },
  {
    id: '3',
    nombre: 'Recorrido 3',
    categoria: "Categoría 3",
    fecha_publicacion: '03/01/2020',
    producto: 'producto 3',
    link: 'https://www.microsoft.com',
    status: "BAJO"
  },
  {
    id: '4',
    nombre: 'Recorrido 4',
    categoria: "Categoría 1",
    fecha_publicacion: '04/01/2020',
    producto: 'producto 4',
    link: 'https://www.amazon.com',
    status: "ALTO"
  },
  {
    id: '5',
    nombre: 'Recorrido 5',
    categoria: "Categoría 2",
    fecha_publicacion: '05/01/2020',
    producto: 'producto 5',
    link: 'https://www.google.com',
    status: "MEDIO"
  },
  {
    id: '6',
    nombre: 'Recorrido 6',
    categoria: "Categoría 3",
    fecha_publicacion: '06/01/2020',
    producto: 'producto 6',
    link: 'https://www.yahoo.com',
    status: "BAJO"
  }
];

export const metrica_mas_visitadas = [
  { "recorrido": "Recorrido 1", "interacciones": 2000, "porcentaje": 74 },
  { "recorrido": "Recorrido 2", "interacciones": 1500, "porcentaje": 52 },
  { "recorrido": "Recorrido 3", "interacciones": 1000, "porcentaje": 36 },
  { "recorrido": "Recorrido 4", "interacciones": 800, "porcentaje": 28 },
  { "recorrido": "Recorrido 5", "interacciones": 600, "porcentaje": 22 }
];

export const metrica_interacciones = [
  { "recorrido": "Recorrido 1", "interacciones": 2000, "porcentaje": 74 },
  { "recorrido": "Recorrido 2", "interacciones": 1500, "porcentaje": 52 },
  { "recorrido": "Recorrido 3", "interacciones": 1000, "porcentaje": 36 },
  { "recorrido": "Recorrido 4", "interacciones": 800, "porcentaje": 28 },
  { "recorrido": "Recorrido 5", "interacciones": 600, "porcentaje": 22 }
];

export const metrica_permanencia = [
  { "recorrido": "Recorrido 1", "tiempo_permanencia": "3m", "porcentaje": 96 },
  { "recorrido": "Recorrido 2", "tiempo_permanencia": "2m 30s", "porcentaje": 85 },
  { "recorrido": "Recorrido 3", "tiempo_permanencia": "2m", "porcentaje": 75 },
  { "recorrido": "Recorrido 4", "tiempo_permanencia": "1m 45s", "porcentaje": 65 },
  { "recorrido": "Recorrido 5", "tiempo_permanencia": "1m 30s", "porcentaje": 55 }
];

export const metrica_rebote = [
  { "recorrido": "Recorrido 1", "rebote": "4%", "porcentaje": 96 },
  { "recorrido": "Recorrido 2", "rebote": "5%", "porcentaje": 85 },
  { "recorrido": "Recorrido 3", "rebote": "6%", "porcentaje": 75 },
  { "recorrido": "Recorrido 4", "rebote": "7%", "porcentaje": 65 },
  { "recorrido": "Recorrido 5", "rebote": "8%", "porcentaje": 55 }
];