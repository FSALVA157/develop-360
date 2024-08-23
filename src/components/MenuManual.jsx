import React, { useState } from "react";
import { Collapse, Menu, Popover } from "antd";
import diagramSvg from "../assets/diagram.svg";




const MenuManual = ({ showModal, setShowModal}) => {

  const [showMenu, setShowMenu] = useState(true);
  const currentUrl = window.location.href;

  const items = [    
    {
      key: "scenes_key",
      icon: (
        <img
          src={diagramSvg}
          alt="escenas"
          style={{ width: 40, height: 40, margin: 0, padding: 0, filter: 'drop-shadow(0px 0px 2px rgba(0, 0, 0, 1))' }}
          className={`animate__animated ${
            !showMenu ? "animate__fadeOut" : "animate__fadeIn"
          } itemMenuFloat`}
        />
      ),
      // label: "menu de escenas",
      onClick: () => setShowModal(true),
      style: {
        marginBottom: "20px",
        marginTop: "0px",
        padding: "0px",
      },
    },    
    
  ];

  // const [current, setCurrent] = useState("mail");
  // const onClick = (e) => {
  //   console.log("click ", e);
  //   setCurrent(e.key);
  // };
  return (
    <div 
      id="menuFlotanteManual"
      >
      <Menu
        // onClick={onClick}
        // selectedKeys={[current]}        
        mode="inline"
        items={items}
        theme="purple"
        style={{           
          height: 50,
          // width: "100%",
          margin: 0,
          padding: 0,
          display: "block",
          // justifyContent: "flex.end",
          // alignItems: "end",
          // gap: "20px",
          
        }}
      />
      
    </div>
  );
};
export default MenuManual;
