import React from "react";
import { Flex, Progress } from "antd";
import { metrica_interacciones } from "../data/dataMetricas";

export const ProgressInteracciones = () => {
  

  return (
    <>
      <Flex gap="large" justify="space-between" wrap>
        {metrica_interacciones.map((item, index) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginBottom: 30,
            }}
          >
            {/* <Progress type="dashboard" percent={item.porcentaje} strokeColor={index % 2 ? twoColors : conicColors} /> */}
            <Progress
              type="dashboard"
              percent={item.porcentaje}
              steps={8}
              trailColor="rgba(0, 0, 0, 0.06)"
              strokeWidth={10}
            />
            <span style={{ marginTop: 20, color: "#000" }}>
              {item.recorrido}
            </span>
          </div>
        ))}
      </Flex>
    </>
  );
};
