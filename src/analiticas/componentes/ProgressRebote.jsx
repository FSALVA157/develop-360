
import React from "react";
import { Flex, Progress } from "antd";
import { metrica_rebote } from "../data/dataMetricas";



export const ProgressRebote = () => {
    const twoColors = {
        '0%': '#108ee9',
        '100%': '#87d068',
      };
      const conicColors = {
        '0%': '#87d068',
        '50%': '#ffe58f',
        '100%': '#ffccc7',
      };

  return (
    <>
      <Flex gap="large" justify="space-between" wrap>
        {
            metrica_rebote.map((item, index) => (
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                marginBottom: 30,
                }}>
                
                <Progress type="dashboard" percent={item.porcentaje} strokeColor={index % 2 ? twoColors : conicColors} />
                <span style={{marginTop: 20, color: '#000'}}>{item.recorrido}  </span>
                </div>
            ))
        }
        </Flex>
        
    </>
  );
};
