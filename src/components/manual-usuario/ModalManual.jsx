import ReactDOM from 'react-dom';
import { CardManual } from './CardManual';
import { Modal } from 'antd';
import { useState } from 'react';
import 'animate.css';

export const ModalManual = ({showModal, setShowModal, handleCancel}) => {
  const [isClosed, setIsClosed] = useState(false)

  const handleCloseModal = (e) => {    
    e.preventDefault()
    console.log("acabo de hacer click en el ok del modal", isClosed)
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
              backgroundColor: 'rgba(0,0,0,0.5)'
            },
            bodyStyle: {
              backgroundColor: 'rgba(0,0,0,0.5)'
            },
            headerStyle: {
              backgroundColor: 'rgba(0,0,0,0.5)'
            },
            maskStyle: {
              backgroundColor: 'rgba(0,0,0,0.5)'
            },
            footerStyle: {
              backgroundColor: 'rgba(0,0,0,0.5)'
            }

          }}
            >
              <CardManual/>
            </Modal>
        </div>
    ,
      document.getElementById('modal')
  )
}
