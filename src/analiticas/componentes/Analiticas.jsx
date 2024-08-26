import { Col, Divider, Row } from "antd";
import React from "react";
import { DatoNumericoCard } from "./DatoNumericoCard";
import { metrica_generales } from "../data/dataMetricas";
import { RenderGraficosCard } from "./RenderGraficosCard";
import { BarChartRecorridos } from "./BarChartRecorridos";
import PieChartDispositivos from "./PieChartDispositivos";

export const Analiticas = () => {
  const {visitas, agregados_al_carrito, promedio_tiempo_visita, cantidad_compartido, clics_en_relaciones, metrica_dispositivos} = metrica_generales

  return (
    <>
      <Divider orientation="left">Analiticas</Divider>
      <Row>
        <Col
          style={{ minWidth: "300px", backgroundColor: "#F9F9F9" }}
          flex="1 1 40%"
        >
          <Divider>Datos de Una Experiencia</Divider>
          <Row>
            <Col
              style={{ minWidth: "10px" }}
              flex="1 1 33%"
            >
              <DatoNumericoCard valor={visitas} titulo="Cantidad de Visitas" />
            </Col>
            <Col
              style={{ minWidth: "10px" }}
              flex="1 1 33%"
            >
              <DatoNumericoCard valor={agregados_al_carrito} titulo="Agregados al Carrito" />
            </Col>
            <Col
              style={{  minWidth: "10px" }}
              flex="1 1 33%"
            >
              <DatoNumericoCard valor={promedio_tiempo_visita} titulo="Promedio Tiempo de Visita" />
            </Col>
          </Row>
          <Row>
            <Col
              style={{  minWidth: "10px" }}
              flex="1 1 33%"
            >
              <DatoNumericoCard valor="2000" titulo="Visitas" />
            </Col>
            <Col
              style={{ minWidth: "10px" }}
              flex="1 1 33%"
            >
              <DatoNumericoCard valor="2000" titulo="Visitas" />
            </Col>
            <Col
              style={{ minWidth: "10px" }}
              flex="1 1 33%"
            >
              <DatoNumericoCard valor="2000" titulo="Visitas" />
            </Col>
          </Row>
        </Col>
        <Col
          style={{minWidth: "300px" }}
          flex="1 1 60%"
        >
          <Divider>Ranking de Mas Visitadas</Divider>
          <RenderGraficosCard children={<BarChartRecorridos />} />
        </Col>
      </Row>

      <Row>
      <Col
          style={{ minWidth: "300px", backgroundColor: "#F9F9F9" }}
          flex="1 1 50%"
        >
          <Divider>Grafico de Dispositivos</Divider>
          <RenderGraficosCard children={<PieChartDispositivos />} />
        </Col>
        <Col
          style={{ minWidth: "300px", backgroundColor: "#F9F9F9" }}
          flex="1 1 50%"
        >
          <Divider>Agregados al Carrito</Divider>
        </Col>
      </Row>
    </>
  );
};
