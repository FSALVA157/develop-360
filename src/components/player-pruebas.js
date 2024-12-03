import React, { useEffect, useRef } from "react";
import { Entity } from "aframe-react";
import "aframe";
//import "./App.css";
import "aframe/src/style/aframe.css";

function Player360() {
  const sceneRef = useRef(null);


  useEffect(() => {
    const sceneEl = sceneRef.current;
    
    // Listener para cuando la escena de A-Frame esté completamente cargada
    const onSceneLoad = () => {
      console.log("Scene loaded");
    };

    if (sceneEl) {
      sceneEl.addEventListener("loaded", onSceneLoad);
    }

    // Registrando un componente A-Frame personalizado dentro del hook
    // AFRAME.registerComponent("add-number", {
    //   init: function () {
    //     this.el.addEventListener("click", this.onClick.bind(this));
    //   },
    //   onClick: function () {
    //     console.error("onClick - add-number triggered");
    //   }
    // });

    //Cleanup: Remover el listener cuando el componente se desmonte
    return () => {
      if (sceneEl) {
        sceneEl.removeEventListener("loaded", onSceneLoad);
      }
    };
  }, []);

  const enterVR = () => {
    const scene = document.querySelector('a-scene');
    if (scene && scene.enterVR) {
      scene.enterVR();
    }
  };
  

  

  return (
    <>  
    <a-scene
      ref={sceneRef}
      vr-mode-ui="enabled: true"
      cursor="rayOrigin: mouse"
      background="color: #FAFAFA"     
    >
      
     
      <a-assets>
        {/* <a-asset-item
          id="model"
          src="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b/Astronaut.glb?1542147958948"
        /> */}
      </a-assets>

      {/* <Entity gltf-model={{ src: "#model" }} position="0 0 -5" /> */}
      {/* <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9" shadow />
      <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E" shadow />
      <a-cylinder
        position="1 0.75 -3"
        radius="0.5"
        height="1.5"
        color="#FFC65D"
        shadow=""
      />
      <a-plane
        position="0 0 -4"
        rotation="-90 0 0"
        width="4"
        height="4"
        color="#7BC8A4"
        shadow=""
        add-number=""
      /> */}
      {/* <div 
        class="a-enter-vr fullscreen" 
        aframe-injected=""
        ><button 
            class="a-enter-vr-button"
            title="Enter VR mode with a headset or fullscreen without" aframe-injected=""></button></div>*/}
    </a-scene> 
    <button onClick={enterVR} style={{ position: "absolute", top: 10, right: 10 }}>Enter VR</button>
     <div         
        class="a-enter-vr fullscreen" 
        aframe-injected=""
        ><button           
            class="a-enter-vr-button"
            title="Enter VR mode with a headset or fullscreen without" aframe-injected=""></button></div>
    
    </>
  );
};

export default Player360;
