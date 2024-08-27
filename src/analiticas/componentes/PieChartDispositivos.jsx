import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { metrica_dispositivos } from "../data/dataMetricas";
import { Col, Row } from "antd";

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class PieChartDispositivos extends PureComponent {
  render() {
    return (
      <>
        <Row align={"middle"}>
          <Col
            style={{
              minWidth: "50px",
              backgroundColor: "#F9F9F9",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            flex="1 1 30%"
          >
            <div style={{ marginTop: 20 }}>
              {metrica_dispositivos.map((entry, index) => (
                <div
                  key={`legend-${index}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      backgroundColor: COLORS[index % COLORS.length],
                      marginRight: 8,
                    }}
                  ></div>
                  <span>{entry.tipo}</span>
                </div>
              ))}
            </div>
          </Col>

          <Col
            style={{
              minWidth: "300px",
              backgroundColor: "#F9F9F9",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
            flex="1 1 70%"
          >
            <ResponsiveContainer aspect={2}>
              <PieChart width="100%" height="100%">
                <Pie
                  data={metrica_dispositivos}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {metrica_dispositivos.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      </>
    );
  }
}
