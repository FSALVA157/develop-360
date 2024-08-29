
import { Col, Row } from 'antd'
import React from 'react'
import { DatoNumericoCard } from './DatoNumericoCard'


export const MetricasIndividuales = ({ metricasGenerales }) => {
  return (
    <>
            <Row>
              <Col style={{ minWidth: "10px" }} flex="1 1 33%">
                <DatoNumericoCard
                  valor={metricasGenerales.visitas}
                  titulo="Cantidad de Visitas"
                />
              </Col>
              <Col style={{ minWidth: "10px" }} flex="1 1 33%">
                <DatoNumericoCard
                  valor={metricasGenerales.agregados_al_carrito}
                  titulo="Agregados al Carrito"
                />
              </Col>
              <Col style={{ minWidth: "10px" }} flex="1 1 33%">
                <DatoNumericoCard
                  valor={metricasGenerales.promedio_tiempo_visita}
                  titulo="Promedio Tiempo de Visita"
                />
              </Col>
            </Row>
            <Row>
              <Col style={{ minWidth: "10px" }} flex="1 1 33%">
                <DatoNumericoCard
                  valor={metricasGenerales.cantidad_compartido}
                  titulo="Cantidad Compartido"
                />
              </Col>
              <Col style={{ minWidth: "10px" }} flex="1 1 33%">
                <DatoNumericoCard
                  valor={metricasGenerales.clics_en_relaciones}
                  titulo="Clics en Relaciones"
                />
              </Col>
              <Col style={{ minWidth: "10px" }} flex="1 1 33%">
                <DatoNumericoCard
                  valor={metricasGenerales.cantidad_interacciones}
                  titulo="Cantidad Interacciones"
                />
              </Col>
            </Row>
    </>
  )
}
