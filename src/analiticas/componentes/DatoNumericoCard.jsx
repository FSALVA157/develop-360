
import { Card } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'

export const DatoNumericoCard = ({valor, titulo}) => {

  return (
    <Card
    title={<h5 style={{textAlign:'center', wordWrap:'break-word', whiteSpace:'normal', padding:'0'}}>{titulo}</h5>}
    bordered={true}
    style={{
      margin: '10px',
    }}
  >
    <Title level={3}>{valor}</Title>
  </Card>
  )
}
