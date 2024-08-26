import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Image } from "antd";
const { Meta } = Card;
export const CardManual = () => (
  <Card
    style={{
      width: "100%",
      backgroundColor: "rgba(0,0,0,0.2)",
    }}
    cover={
      <Image
        style={{ filter: "blur(4px)" }}
        src="https://www.gwm.cl/media/3y5l1o4d/02-infografias-gwm-caracteristicas-de-los-vehiculos-electricos-1.webp?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
        preview={{
          src: "https://www.gwm.cl/media/3y5l1o4d/02-infografias-gwm-caracteristicas-de-los-vehiculos-electricos-1.webp",
        }}
      />
    }
    // actions={[
    //   <SettingOutlined key="setting" />,
    //   <EditOutlined key="edit" />,
    //   <EllipsisOutlined key="ellipsis" />,
    // ]}
  >
    <Meta title={<h3 style={{ color: "white" }}>Caracteristicas</h3>} />
  </Card>
);
