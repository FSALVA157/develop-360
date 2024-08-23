import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Image } from 'antd';
const { Meta } = Card;
export const CardManual = () => (
  <Card
    style={{
      width: 300, 
      backgroundColor: 'rgba(0,0,0,0.2)',
      
    }}
    styles={{
      bodyStyle: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        color: 'white'
      },
      headerStyle: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        color: 'white'
      },
      maskStyle: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        color: 'white'
      },
      footerStyle: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        color: 'white'
      },
      coverStyle: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        color: 'white'
      },
      metaStyle: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        color: 'white'
      }
    }}  
    
    cover={      
      <Image
    width={200}
    src="https://www.gwm.cl/media/3y5l1o4d/02-infografias-gwm-caracteristicas-de-los-vehiculos-electricos-1.webp?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
    preview={{
      src: 'https://www.gwm.cl/media/3y5l1o4d/02-infografias-gwm-caracteristicas-de-los-vehiculos-electricos-1.webp',
    }}
  />
    }
    // actions={[
    //   <SettingOutlined key="setting" />,
    //   <EditOutlined key="edit" />,
    //   <EllipsisOutlined key="ellipsis" />,
    // ]}
  >
    <Meta
      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
      title="Card title"
      
      description="This is the description"
    />
  </Card>
);
