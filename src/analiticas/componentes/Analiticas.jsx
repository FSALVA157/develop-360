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
      style={{
        textAlign: 'center',
        marginRight: '300px', // Compensate for avatar width
        fontFamily: 'Spartan'
      }}
      avatar={<Avatar size={300} src={membrete} style={{height: 100, fill:"cover"}} />}
      title={<h1 style={{fontFamily: 'Spartan'}}>Dashboard de Analíticas: AGN Ford</h1>}
      description={<h2 style={{fontFamily: 'Spartan'}}>{experienciasList.filter((exp) => exp.id === idSelectedExp)[0].nombre}</h2>}
      
    /> 
          
     <div  style={{
          display: 'block',
          justifyContent: 'center',
          marginTop: '16px',
          marginLeft: '300px',
          marginRight: '300px',
        }}>
          
        <Button
          onClick={handleDownloadPdf}
          type="primary"
          shape="round"
          icon={<CloudDownloadOutlined />}
          size="middle"          
        >
          Descargar PDF
        </Button>
      </div>  
      {/* <Flex gap={"middle"} vertical align="center" justify="center" style={{ width: '100%' }} >      
                <Button onClick={handleDownloadPdf} type="primary" shape="round" icon={<CloudDownloadOutlined />} size="middle">
              Descargar PDF
            </Button>
        </Flex> */}
      <div style={{ margin: "10px 50px " }}>
        <Divider orientation="left">Analiticas</Divider>
        <Row>
          <Col
            style={{ minWidth: "300px", backgroundColor: "#F9F9F9" }}
            flex="1 1 50%"
          >            
            <Divider>Metricas Individuales</Divider>
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
        </Flex >
            <RenderGraficosCard children={<MetricasIndividuales metricasGenerales={metricasGenerales} />}/>
            
          </Col>
          <Col
             xs={24} sm={12} md={12} lg={12}
              style={{ backgroundColor: "#F9F9F9",marginTop: "0px 0px", height: "100%" }}
              flex="1 1 50%"              
            >
              <Divider>Agregados al Carrito</Divider>
              <Flex style={{paddingTop:"30px", height:'100%'}}>
              <RenderGraficosCard children={<PaddingChartPaddingCarrito />} />
              </Flex>
            </Col>
          {/* <Col style={{ minWidth: "300px" }} flex="1 1 50%">
            <Divider></Flex>Ranking de Mas Visitadas</Divider>
            <RenderGraficosCard children={<BarChartRecorridos />} />
          </Col> */}
        </Row>

        <Row>
          {/* <Col
            style={{ minWidth: "300px", backgroundColor: "#F9F9F9" }}
            flex="1 1 50%"
          >            
            <Divider>Metricas Individuales</Divider>
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
        </Flex>
            <RenderGraficosCard children={<MetricasIndividuales metricasGenerales={metricasGenerales} />}/>
            
          </Col> */}
          <Col style={{ minWidth: "300px" }} flex="1 1 100%">
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
              <Divider>Tiempo de Permanencia Recorridos</Divider>
              <RenderGraficosCard children={<ProgressPermanencia />} />
              {/* <Divider>Agregados al Carrito</Divider>
              <RenderGraficosCard children={<PaddingChartPaddingCarrito />} /> */}
            </Col>
            {/* <Col
             xs={24} sm={12} md={12} lg={12}
              style={{  backgroundColor: "#F9F9F9" }}
              flex="1 1 50%"
            >
              <Divider>Agregados al Carrito</Divider>
              <RenderGraficosCard children={<PaddingChartPaddingCarrito />} />
            </Col> */}
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
              {/* <Divider>Tiempo de Permanencia Recorridos</Divider>
              <RenderGraficosCard children={<ProgressPermanencia />} /> */}
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
