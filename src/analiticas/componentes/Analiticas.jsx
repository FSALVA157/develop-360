import { Avatar, Card, Col, Divider, Row, Select } from "antd";
import React, { useState } from "react";
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
import { MetricasIndividuales } from "./MetricasIndividuales";





export const Analiticas = () => {
  

  const [experienciasList, setExperienciasList] = useState(lista_experiencias);
  const [idSelectedExp, setIdSelectedExp] = useState(1)
  const [metricasGenerales, setMetricasGenerales] = useState(metrica_generales.filter((exp) => exp.id_experiencia === idSelectedExp)[0])


  const handleChangeExperiencia = (value) => {    
    setIdSelectedExp(value)
    setMetricasGenerales(metrica_generales.filter((exp) => exp.id_experiencia === value)[0])
  }

  return (
    <Card     
    >
       <Meta
      avatar={<Avatar size={300} src={membrete} style={{height: 100, fill:"cover"}} />}
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
            <Divider>Metricas Individuales</Divider>
            <RenderGraficosCard children={<MetricasIndividuales metricasGenerales={metricasGenerales} />}/>
            
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
