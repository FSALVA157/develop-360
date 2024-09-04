import ReactDOM from 'react-dom';

import { Button, Modal } from 'antd';
import { useState } from 'react';
import  FormLogin  from './FormLogin';
import FormRegister from './FormRegister';


export const ModalFormLogin = (
    // {showModal, setShowModal}
) => {
  const [isClosed, setIsClosed] = useState(false)
  const [isRegister, setIsRegister] = useState(true)

  const handleCloseModal = (e) => {    
    //e.preventDefault()    
    setIsClosed(true)
  }

  return ReactDOM.createPortal(    
        
          <Modal open={true}       
           
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
