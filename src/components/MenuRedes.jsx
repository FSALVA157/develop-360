import React, { useContext, useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu, Popover } from "antd";
import shareSvg from "../assets/share.svg";
import { useCopyLink } from "../hooks/useCopyLink";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { onShareExperience } from "../tracking/listeners/experienceEventsListeners";
import { shareExperienceEvent } from "../tracking/events/experienceEvents";
import PropTypes from 'prop-types';
import { withTracking } from 'react-tracker';
import { AnaliticasContext } from "../context/analiticas-context/AnaliticasContext";

const MenuRedes = ({ data, trackPageShared }) => {
  const { copied, handleCopy } = useCopyLink();
  const [showMenu, setShowMenu] = useState(true);
  const currentUrl = window.location.href;
  const {addEventHandler} = useContext(AnaliticasContext)

  const handleOnCopy = () => {
    handleCopy();
    onShareExperience(addEventHandler,{
      idExperienceShared: data.id,
      nameExperienceShared: data.nombre      
    });
  };

  const items = [
    
    {
      key: "enlace_key",
      // label: "Copiar enlace",     
      style: {
        padding: "0px",
      } ,
      icon: (
        <CopyToClipboard text={currentUrl} onCopy={handleOnCopy}>
          <Popover            
            title="Enlace copiado!"
            trigger="click"
            open={copied}
            // onOpenChange={handleOpenChange}
          >
            <img
              src={shareSvg}
              alt="Custom Icon"
              style={{margin: 0,padding: 0, width: 40, height: 40 }}
              className={`animate__animated ${
                !showMenu ? "animate__fadeOut" : "animate__fadeIn"
              } itemMenuFloat`}
            />
          </Popover>
        </CopyToClipboard>
      ),
    },
    
  ];

  // const [current, setCurrent] = useState("mail");
  // const onClick = (e) => {
  //   console.log("click ", e);
  //   setCurrent(e.key);
  // };
  return (
    <div 
      id="menuFlotanteRedes"
      >
      <Menu
        // onClick={onClick}
        // selectedKeys={[current]}        
        mode="inline"
        items={items}
        theme="purple"
        style={{           
          height: 50,
          width: "100%",
          padding: 0,
          margin: 0,
          display: "block",
          // justifyContent: "flex.end",
          // alignItems: "end",
          // gap: "20px",
          
        }}
      />
      
    </div>
  );
};

MenuRedes.propTypes = {  
  trackPageShared: PropTypes.func
}

const mapTrackingToProps = trackEvent => {    
  return {
    trackPageShared: (data) =>{      
       trackEvent(shareExperienceEvent(data))
      }
  };
};

const menuRedesWithTrackingShare = withTracking(mapTrackingToProps)(MenuRedes)
export default menuRedesWithTrackingShare
