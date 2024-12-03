export const lista_experiencias = [{
  "id": 1,
  "nombre": "Salón de ventas AGN Ford",
  "producto": "Salón de Ventas",
  "fecha_creacion": "2022-01-01",
  "fecha_actualizacion": "2022-01-01"
},
{
  "id": 2,
  "nombre": "Ford Ranger",
  "producto": "camioneta",
  "fecha_creacion": "2022-01-01",
  "fecha_actualizacion": "2022-01-01"
},
{
  "id": 3,
  "nombre": "Ford Maverick",
  "producto": "camioneta",
  "fecha_creacion": "2022-01-01",
  "fecha_actualizacion": "2022-01-01"
},
{
  "id": 4,
  "nombre": "Ford Nueva Bronco",
  "producto": "camioneta",
  "fecha_creacion": "2022-01-01",
  "fecha_actualizacion": "2022-01-01"
},
{
  "id": 5,
  "nombre": "Ford Kuga",
  "producto": "camioneta",
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
  { "recorrido": "Salón de ventas AGN Ford", "visitas": 1500 },
  { "recorrido": "Ford Ranger", "visitas": 1200 },
  { "recorrido": "Ford Maverick", "visitas": 1000 },
  { "recorrido": "Ford Nueva Bronco", "visitas": 800 },
  { "recorrido": "Ford Kuga", "visitas": 600 }
];

export const metrica_carrito = [
  { "recorrido": "Salón de ventas AGN Ford", "value": 500 },
  { "recorrido": "Ford Ranger", "value": 400 },
  { "recorrido": "Ford Maverick", "value": 300 },
  { "recorrido": "Ford Nueva Bronco", "value": 200 },
  { "recorrido": "Ford Kuga", "value": 100 }
];

export const metrica_mensuales = [
  { "mes": "Enero", "visitas": 1500, "experiencia": "Salón" },
  { "mes": "Febrero", "visitas": 1800, "experiencia": "Ranger" },
  { "mes": "Marzo", "visitas": 2000, "experiencia": "Maverick" },
  { "mes": "Abril", "visitas": 2200, "experiencia": "Salón" },
  { "mes": "Mayo", "visitas": 2400, "experiencia": "Ranger" },
  { "mes": "Junio", "visitas": 3000, "experiencia": "Salón" },
  { "mes": "Julio", "visitas": 3500, "experiencia": "Maverick" },
  { "mes": "Agosto", "visitas": 3800, "experiencia": "Salón" },
  { "mes": "Septiembre", "visitas": 4000, "experiencia": "Salón" }
];

export const metrica_dispositivos = [
  { "tipo": "Escritorio", "value": 5000 },
  { "tipo": "Mobile", "value": 3000 },
  { "tipo": "Tablet", "value": 2000 }
];

export const tabla_experiencias = [
  {
    id: '1',
    nombre: 'Salón de ventas AGN Ford',
    categoria: "ventas",
    fecha_publicacion: '12/01/2024',    
    link: 'https://metaverso.griftin.com.ar/player/0249548e-22ea-455e-b6c7-b8a86d4bbb5e',
    status: "ALTO"
  },
  {
    id: '2',
    nombre: 'Ford Ranger',
    categoria: "camioneta",
    fecha_publicacion: '02/02/2024',    
    link: 'https://metaverso.griftin.com.ar/player/11P_dUpEr9XVEu2UwRl4wurQ6lsqgbUOJ',
    status: "MEDIO"
  },
  {
    id: '3',
    nombre: 'Ford Maverick',
    categoria: "camioneta",
    fecha_publicacion: '20/04/2024',    
    link: 'https://metaverso.griftin.com.ar/player/15qK4Anlqr5jXn26UTD9gc_lEs6YQnLOK',
    status: "BAJO"
  },
  {
    id: '4',
    nombre: 'Ford Nueva Bronco',
    categoria: "camioneta",
    fecha_publicacion: '14/06/2024',    
    link: 'https://metaverso.griftin.com.ar/player/15TnBLFWPPKW5tYGempLKMlUfH5bMQAKv',
    status: "ALTO"
  },
  {
    id: '5',
    nombre: 'Ford Kuga',
    categoria: "camioneta",
    fecha_publicacion: '17/07/2024',    
    link: 'https://metaverso.griftin.com.ar/player/1f75lU0RU36LjdFKSO4vx1NHlbdYPEVF_',
    status: "MEDIO"
  }
];

export const metrica_mas_visitadas = [
  { "recorrido": "Salón de ventas AGN Ford", "interacciones": 2000, "porcentaje": 74 },
  { "recorrido": "Ford Ranger", "interacciones": 1500, "porcentaje": 52 },
  { "recorrido": "Ford Maverick", "interacciones": 1000, "porcentaje": 36 },
  { "recorrido": "Ford Nueva Bronco", "interacciones": 800, "porcentaje": 28 },
  { "recorrido": "Ford Kuga", "interacciones": 600, "porcentaje": 22 }
];

export const metrica_interacciones = [
  { "recorrido": "Salón de ventas AGN Ford", "interacciones": 2000, "porcentaje": 74 },
  { "recorrido": "Ford Ranger", "interacciones": 1500, "porcentaje": 52 },
  { "recorrido": "Ford Maverick", "interacciones": 1000, "porcentaje": 36 },
  { "recorrido": "Ford Nueva Bronco", "interacciones": 800, "porcentaje": 28 },
  { "recorrido": "Ford Kuga", "interacciones": 600, "porcentaje": 22 }
];

export const metrica_permanencia = [
  { "recorrido": "Salón de ventas AGN Ford", "tiempo_permanencia": "3m", "porcentaje": 96 },
  { "recorrido": "Ford Ranger", "tiempo_permanencia": "2m 30s", "porcentaje": 85 },
  { "recorrido": "Ford Maverick", "tiempo_permanencia": "2m", "porcentaje": 75 },
  { "recorrido": "Ford Nueva Bronco", "tiempo_permanencia": "1m 45s", "porcentaje": 65 },
  { "recorrido": "Ford Kuga", "tiempo_permanencia": "1m 30s", "porcentaje": 55 }
];

export const metrica_rebote = [
  { "recorrido": "Salón de ventas AGN Ford", "rebote": "4%", "porcentaje": 96 },
  { "recorrido": "Ford Ranger", "rebote": "5%", "porcentaje": 85 },
  { "recorrido": "Ford Maverick", "rebote": "6%", "porcentaje": 75 },
  { "recorrido": "Ford Nueva Bronco", "rebote": "7%", "porcentaje": 65 },
  { "recorrido": "Ford Kuga", "rebote": "8%", "porcentaje": 55 }
];