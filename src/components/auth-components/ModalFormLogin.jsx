import ReactDOM from 'react-dom';

import { Button, Modal } from 'antd';
import { useState } from 'react';
import  FormLogin  from './FormLogin';
import FormRegister from './FormRegister';


export const ModalFormLogin = (
    // {showModal, setShowModal}
) => {
  const [isOpen, setIsOpen] = useState(true)
  const [isRegister, setIsRegister] = useState(true)

  const handleCloseModal = (e) => {    
    //e.preventDefault()    
    setIsOpen(false)
  }

  return ReactDOM.createPortal(    
        
          <Modal open={isOpen}       
           
           styles={{
            content: {
              backgroundColor: 'rgba(255,255,255,0.9)'
            },
           header: {
              backgroundColor: 'rgba(255,255,255,0)',
              marginBottom: '20px'
            }
            
            }}
            footer={[              
            ]}
            closable={false}
            >
              {isRegister ? <FormRegister handleCloseModal={handleCloseModal} setIsRegister={setIsRegister}/> : <FormLogin handleCloseModal={handleCloseModal} setIsRegister={setIsRegister}/>}

              
            </Modal>
        
    ,document.getElementById('modal')
  )
}
