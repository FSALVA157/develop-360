import ReactDOM from 'react-dom';
import { CardManual } from './CardManual';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import 'animate.css';

export const ModalManual = ({showModal, setShowModal, handleCancel}) => {
  const [isClosed, setIsClosed] = useState(false)

  const handleCloseModal = (e) => {    
    e.preventDefault()    
    setIsClosed(true)
  }

  return ReactDOM.createPortal(    

        <div className={`${isClosed ? "animate__animated animate__rollOut" : "animate__animated animate__rollIn"}`} onAnimationEnd={() => {
          if (isClosed) {
            console.log("Entrando a cerrar el modal", isClosed)
            setShowModal(false); 
            setIsClosed(false)
          }
        }}        
        >
          <Modal open={showModal} onOk={handleCloseModal} onCancel={handleCancel} 
           
           styles={{
            content: {
              backgroundColor: 'rgba(0,0,0,0.5)'} 
            }}
            footer={[
              <Button type="primary" ghost onClick={handleCloseModal}>Cerrar</Button>
            ]}
            >
              <CardManual/>
            </Modal>
        </div>
    ,
      document.getElementById('modal')
  )
}
