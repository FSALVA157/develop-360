
import { Table, Tag } from 'antd';
import React from 'react'
import { tabla_experiencias } from '../data/dataMetricas';

export const TablaExperiencias = () => {
    const columns = [
        {
          id: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Nombre Recorrido',
          dataIndex: 'nombre',
          key: 'nombre',
        },
        {
          title: 'Categoria',
          dataIndex: 'categoria',
          key: 'categoria',
        },
        {
            title: 'Fecha Publicación',
            dataIndex: 'fecha_publicacion',
            key: 'fecha_publicacion',
          },
          // {
          //   title: 'Producto',
          //   dataIndex: 'producto',
          //   key: 'producto',
          // },
          {
            title: 'Link',
            dataIndex: 'link',            
            key: 'link',
            render: (text, record) => <a href={text} target="_blank">{record.nombre}</a>
          },
          {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_,{status})=>(
                <Tag color={status === "ALTO" ? "green" : status === "MEDIO" ? "orange" : "red"}>{status.toUpperCase()}</Tag>
            )
          },
      ];
  return (
    <>
    <Table columns={columns} dataSource={tabla_experiencias} />
    </>
  )
}
