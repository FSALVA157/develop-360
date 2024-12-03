import ReactDOM from 'react-dom';

import {  Modal } from 'antd';
import { useEffect, useState } from 'react';
import  FormLogin  from './FormLogin';
import FormRegister from './FormRegister';


export const ModalFormLogin = (
    
) => {
  const [isOpen, setIsOpen] = useState(true)
  const [isRegister, setIsRegister] = useState(false)

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
