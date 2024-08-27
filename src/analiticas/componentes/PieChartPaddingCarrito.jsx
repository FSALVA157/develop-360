import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { metrica_carrito } from "../data/dataMetricas";
import { Col, Row } from "antd";

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];
const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.recorrido}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default class PaddingChartPaddingCarrito extends PureComponent {
  state = {
    activeIndex: 0,
  };

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
      <>
        <Row  align={"middle"}>
          <Col
            style={{
              minWidth: "50px",
              backgroundColor: "#F9F9F9",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 270,
            }}
            flex="1 1 30%"
            
          >
            <div style={{ marginTop: 20 }}>
              {metrica_carrito.map((entry, index) => (
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
                  <span>{entry.recorrido}</span>
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
              height: '100%',
            }}
            flex="1 1 70%"
          >
            <ResponsiveContainer aspect={2}>
              <PieChart
                width="100%"
                height="100%"
                onMouseEnter={this.onPieEnter}
              >
                <Pie
                  data={metrica_carrito}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  activeIndex={this.state.activeIndex}
                  activeShape={renderActiveShape}
                  onMouseEnter={this.onPieEnter}
                >
                  {metrica_carrito.map((entry, index) => (
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
