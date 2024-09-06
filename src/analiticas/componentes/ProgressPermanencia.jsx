import React from "react";
import { Flex, Progress } from "antd";
import { metrica_permanencia } from "../data/dataMetricas";



export const ProgressPermanencia = () => {
  return (
    <>
      <Flex gap="small" vertical>
        {
            metrica_permanencia.map((item, index) => (
                <div style={{display: 'flex',
                   flexDirection: 'column',
                   justifyContent: 'space-between',
                marginBottom: 30,
                }}>
                <span>{item.recorrido}  </span>
                <Progress percent={item.porcentaje} size={[500, 20]}  />
                
                </div>
            ))
        }
        
      </Flex>
    </>
  );
};
