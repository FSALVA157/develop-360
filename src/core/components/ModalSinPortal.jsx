import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Title from 'antd/es/typography/Title';
const ModalSinPortal = ({ titulo, mensaje, setIsVisible, isVisible }) => {
  
  //const [modalOpen, setModalOpen] = useState(isVisible);
  return (
    <>  
      
      <br />
      <br />      
      <Modal
        title={titulo}
        styles={{
            header: {
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                color: 'rgba(255, 255, 255, .3)'
            },
            mask: {
                backdropFilter: 'blur(2px)'
            }
        }}
        centered
        open={isVisible}
        onOk={() => setIsVisible(false)}
        onCancel={() => setIsVisible(false)}
      >
        <Title level={4} type='warning'>{mensaje}</Title>
        
      </Modal>
    </>
  );
};
export default ModalSinPortal;