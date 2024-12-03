
import React from 'react'

import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { metrica_mensuales } from '../data/dataMetricas'




export const BarChartRecorridos = () => {
    
  return (   
        
      <ResponsiveContainer aspect={3}>
        <BarChart
          // width={500}
          // height={300}
          data={metrica_mensuales}
          // padding={{ top: 20, right: 5, bottom: 5, left: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />          
          <Tooltip />
          <Legend />
          <Bar dataKey="visitas" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue"/>} 
           barSize={30}
          >
            <LabelList style={{ fill: 'black' }} dataKey="experiencia" position="center" />
          </Bar>          
        </BarChart>
      </ResponsiveContainer>

  )
}
