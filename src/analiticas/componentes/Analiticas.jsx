import { Avatar, Card, Col, Divider, Row, Select } from "antd";
import React, { useState } from "react";
import { DatoNumericoCard } from "./DatoNumericoCard";
import { lista_experiencias, metrica_generales } from "../data/dataMetricas";
import { RenderGraficosCard } from "./RenderGraficosCard";
import { BarChartRecorridos } from "./BarChartRecorridos";
import PieChartDispositivos from "./PieChartDispositivos";
import PaddingChartPaddingCarrito from "./PieChartPaddingCarrito";
import { TablaExperiencias } from "./TablaExperiencias";
import { ProgressMasVisitados } from "./ProgressMasVisitados";
import { ProgressPermanencia } from "./ProgressPermanencia";
import { ProgressRebote } from "./ProgressRebote";
import { ProgressInteracciones } from "./ProgressInteracciones";
import Meta from "antd/es/card/Meta";
import membrete from '../../assets/membrete.png'

const initialStateExperiencias = [];



export const Analiticas = () => {
  const {
    visitas,
    agregados_al_carrito,
    promedio_tiempo_visita,
    cantidad_compartido,
    clics_en_relaciones,
    cantidad_interacciones    
  } = metrica_generales;

  const [experienciasList, setExperienciasList] = useState(lista_experiencias);
  const [idSelectedExp, setIdSelectedExp] = useState(1)


  const handleChangeExperiencia = (value) => {
    console.log(">>>>>>>",value)
    setIdSelectedExp(value)
  }

  return (
    <Card     
    >
       <Meta
      avatar={<Avatar size={160} src={membrete} />}
      title={<h2>Dashboard de Analíticas de la Empresa: Insights y Tendencias</h2>}
      description={<h1>{experienciasList.filter((exp) => exp.id === idSelectedExp)[0].producto}</h1>}
    />
      <Select
      defaultValue={experienciasList.filter((exp) => exp.id === idSelectedExp)[0].nombre}
      style={{
        width: 200,
      }}
      onChange={handleChangeExperiencia}
      options={
        experienciasList.map((exp) => ({ label: exp.nombre, value: exp.id }))
      }
    />
      <div style={{ margin: "10px 50px " }}>
        <Divider orientation="left">Analiticas</Divider>
        <Row>
          <Col
            style={{ minWidth: "300px", backgroundColor: "#F9F9F9" }}
            flex="1 1 50%"
          >
            <Divider>Datos de Una Experiencia</Divider>
            <Row>
              <Col style={{ minWidth: "10px" }} flex="1 1 33%">
                <DatoNumericoCard
                  valor={visitas}
                  titulo="Cantidad de Visitas"
                />
              </Col>
              <Col style={{ minWidth: "10px" }} flex="1 1 33%">
                <DatoNumericoCard
                  valor={agregados_al_carrito}
                  titulo="Agregados al Carrito"
                />
              </Col>
              <Col style={{ minWidth: "10px" }} flex="1 1 33%">
                <DatoNumericoCard
                  valor={promedio_tiempo_visita}
                  titulo="Promedio Tiempo de Visita"
                />
              </Col>
            </Row>
            <Row>
              <Col style={{ minWidth: "10px" }} flex="1 1 33%">
                <DatoNumericoCard
                  valor={cantidad_compartido}
                  titulo="Cantidad Compartido"
                />
              </Col>
              <Col style={{ minWidth: "10px" }} flex="1 1 33%">
                <DatoNumericoCard
                  valor={clics_en_relaciones}
                  titulo="Clics en Relaciones"
                />
              </Col>
              <Col style={{ minWidth: "10px" }} flex="1 1 33%">
                <DatoNumericoCard
                  valor={cantidad_interacciones}
                  titulo="Cantidad Interacciones"
                />
              </Col>
            </Row>
          </Col>
          <Col style={{ minWidth: "300px" }} flex="1 1 50%">
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
            <RenderGraficosCard children={<PaddingChartPaddingCarrito />} />
          </Col>
        </Row>

        <Row>
          <Col
            style={{ minWidth: "300px", backgroundColor: "#F9F9F9" }}
            flex="1 1 50%"
          >
            <Divider>Experiencias</Divider>
            <RenderGraficosCard children={<TablaExperiencias />} />
          </Col>
          <Col
            style={{ minWidth: "300px", backgroundColor: "#F9F9F9" }}
            flex="1 1 50%"
          >
            <Divider>Recorridos Mas Visitadas</Divider>
            <RenderGraficosCard children={<ProgressMasVisitados />} />
            <Divider>Tiempo de Permanencia Recorridos</Divider>
            <RenderGraficosCard children={<ProgressPermanencia />} />
          </Col>
        </Row>
        <Row>
          <Col
            style={{ minWidth: "300px", backgroundColor: "#F9F9F9" }}
            flex="1 1 50%"
          >
            <Divider>Tasa de Rebote</Divider>
            <RenderGraficosCard children={<ProgressRebote />} />
          </Col>
          <Col
            style={{ minWidth: "300px", backgroundColor: "#F9F9F9" }}
            flex="1 1 50%"
          >
            <Divider>Interacciones con Recorridos</Divider>
            <RenderGraficosCard children={<ProgressInteracciones />} />
          </Col>
        </Row>
      </div>
    </Card>
  );
};
