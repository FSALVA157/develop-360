import React from "react";
import { Flex, Progress } from "antd";
import { metrica_mas_visitadas } from "../data/dataMetricas";



export const ProgressMasVisitados = () => {
  return (
    <>
      <Flex gap="small" vertical>
        {
            metrica_mas_visitadas.map((item, index) => (
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                marginBottom: 30,
                }}>
                <span>{item.recorrido + "   :   " + item.porcentaje + " %"}  </span>
                <Progress percent={item.porcentaje} status={item.porcentaje > 50 ? 'success' : 'exception'} />
                </div>
            ))
        }
        
      </Flex>
    </>
  );
};
