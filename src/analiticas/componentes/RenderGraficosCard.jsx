
import { Card } from 'antd'
import React from 'react'


export const RenderGraficosCard = ({children}) => {
  return (
    <Card
       style={{
         margin: '10px',
       }}
    >
      
        {children}
    </Card>
  )
}
