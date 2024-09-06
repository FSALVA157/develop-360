import { Avatar, Button, Card, Col, Divider, Flex, Row, Select } from "antd";
import React, { useRef, useState } from "react";
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
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  CloudDownloadOutlined
} from '@ant-design/icons';




export const Analiticas = () => {
  const [experienciasList, setExperienciasList] = useState(lista_experiencias);
  const [idSelectedExp, setIdSelectedExp] = useState(1)
  const [metricasGenerales, setMetricasGenerales] = useState(metrica_generales.filter((exp) => exp.id_experiencia === idSelectedExp)[0])
  const printRef = useRef();


  const handleChangeExperiencia = (value) => {    
    setIdSelectedExp(value)
    setMetricasGenerales(metrica_generales.filter((exp) => exp.id_experiencia === value)[0])
  }

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('analytics.pdf');
  };
  

  return (
    <div ref={printRef}>
      <Card
      >        
         <Meta
        avatar={<Avatar size={160} src={membrete} />}
        title={<h2>Dashboard de Analíticas de la Empresa: Insights y Tendencias</h2>}
        description={<h1>{experienciasList.filter((exp) => exp.id === idSelectedExp)[0].producto}</h1>}
      />
       
        <Flex gap={"middle"} vertical align="center" >
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
                <Button onClick={handleDownloadPdf} type="primary" shape="round" icon={<CloudDownloadOutlined />} size="middle">
              Descargar PDF
            </Button>
        </Flex>
        <div style={{ margin: "10px 50px " }}>
          <Divider orientation="left">Analiticas</Divider>
          <Row>
            <Col
               xs={24} sm={12} md={12} lg={12}
              style={{  backgroundColor: "#F9F9F9" }}
              flex="1 1 20%"
            >
              <Divider>Metricas Individuales</Divider>
              <RenderGraficosCard children={<MetricasIndividuales metricasGenerales={metricasGenerales} />}/>
      
            </Col>
            <Col 
               xs={24} sm={12} md={12} lg={12} style={{ backgroundColor: "#F9F9F9" }} flex="1 1 80%">
              <Divider>Ranking de Mas Visitadas</Divider>
              <RenderGraficosCard children={<BarChartRecorridos />} />
            </Col>
          </Row>
          <Row>
            <Col
             xs={24} sm={12} md={12} lg={12}
              style={{  backgroundColor: "#F9F9F9" }}
              flex="1 1 50%"
            >
              <Divider>Grafico de Dispositivos</Divider>
              <RenderGraficosCard children={<PieChartDispositivos />} />
            </Col>
            <Col
             xs={24} sm={12} md={12} lg={12}
              style={{  backgroundColor: "#F9F9F9" }}
              flex="1 1 50%"
            >
              <Divider>Agregados al Carrito</Divider>
              <RenderGraficosCard children={<PaddingChartPaddingCarrito />} />
            </Col>
          </Row>
          <Row>
            <Col
              xs={0} sm={12} md={12} lg={12}
              style={{  backgroundColor: "#F9F9F9" }}
              flex="1 1 50%"
            >
              <Divider>Experiencias</Divider>
              <RenderGraficosCard children={<TablaExperiencias />} />
            </Col>
            <Col
              xs={24} sm={12} md={12} lg={12}
              style={{  backgroundColor: "#F9F9F9" }}
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
            xs={24} sm={12} md={12} lg={12}
              style={{ backgroundColor: "#F9F9F9" }}
              flex="1 1 50%"
            >
              <Divider>Tasa de Rebote</Divider>
              <RenderGraficosCard children={<ProgressRebote />} />
            </Col>
            <Col
            xs={24} sm={12} md={12} lg={12}
              style={{ backgroundColor: "#F9F9F9" }}
              flex="1 1 50%"
            >
              <Divider>Interacciones con Recorridos</Divider>
              <RenderGraficosCard children={<ProgressInteracciones />} />
            </Col>
          </Row>
        </div>
      </Card>

    </div>
  );
};
