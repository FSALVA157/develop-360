import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AFRAME from "aframe";
import { Entity } from "aframe-react";
import info from "../assets/info.png";
import gafas_white from "../assets/gafas_white.png";
import video from "../assets/video.jpg";
import image from "../assets/image-icon.png";
import "./controles.css";
import LoadingSpin from "./loadingSpin";
import PopUpMsg from "./popUpMsg";
import OpenProject from "./openProject";
import EscenasMenu from "./escenasMenu";
import { Alert } from "antd";
import "animate.css";
import MenuComponent from "./MenuComponent";
import ReactGA from "react-ga4";
import MenuOtras from "./MenuOtras";
import Visitas from "./Visitas";
import MenuRedes from "./MenuRedes";
import MenuEscenas from "./MenuEscenas";
import MenuEnlaces from "./MenuEnlaces";
import { ModalManual } from "./manual-usuario/ModalManual";
import MenuManual from "./MenuManual";
import { withTracking } from "react-tracker";
import { pageViewEvent } from "../tracking/events/experienceEvents";
import PropTypes from "prop-types";
import {
  onPageView,
  onViewScene,
  onCalculateSpent,
} from "../tracking/listeners/experienceEventsListeners";
import { AnaliticasContext } from "../context/analiticas-context/AnaliticasContext";
import apiService from "../services/apiService";
require("aframe-look-at-component");

function Player360({ trackPageView }) {
  const [open, setOpen] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [popUpTitulo, setPopUpTitulo] = useState("");
  const [popUpContenido, setPopUpContenido] = useState(null);
  const [isMobileXp] = useState(AFRAME.utils.device.isMobile());
  const [isVR, setIsVR] = useState(false);
  const [escenaIndex, setEscenaIndex] = useState(0);
  const [proyecto, setProyecto] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [mobileVideoSrc, setMobileVideoSrc] = useState("");
  const [mobilePlayerPos, setMobilePlayerPos] = useState({ x: 0, y: 0, z: 1 });
  const [VRPopUpImage, setVRPopUpImage] = useState(null);
  const [timeOutClick, setTimeOutClick] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [animateEnabled, setAnimateEnabled] = useState(true);
  const [urlLink, setUrlLink] = useState("");
  const [showAlertLink, setShowAlertLink] = useState(false);
  const [showMenuFloat, setShowMenuFloat] = useState(true);
  const [desplegarMenu, setDesplegarMenu] = useState(false);
  const [showModalManual, setShowModalManual] = useState(false);
  //state que maneja el ocultamiento de la card de menu de otras segun click en pantalla
  const [desplegarCard, setDesplegarCard] = useState(false);
  const menuEnlacesOtrasRef = useRef(null);

  //state que maneja el src de sky para el caso de events con cursor
  //https://live.staticflickr.com/65535/49752260808_8338ea3043_b.jpg
  //const [skySrc, setSkySrc] = useState("https://images.pexels.com/photos/17325269/pexels-photo-17325269/free-photo-of-molinos-de-viento.jpeg?auto=compress&cs=tinysrgb&w=600");
  const [skySrc, setSkySrc] = useState(
    "https://live.staticflickr.com/65535/49752260808_8338ea3043_b.jpg"
  );
  const [indiceEscena, setIndiceEscena] = useState(0);

  //manejo de Context de Analiticas
  const { analiticasState, addEventHandler, setAnalyticState } =
    useContext(AnaliticasContext);

  //variables para analitica de permanencia
  const [spentTime, setSpentTime] = useState(0);
  let startTime;

  const [titulo360Value, setTitulo360Value] = useState("");
  const [alertErrorMessage, setAlertErrorMessage] = useState({
    titulo: "",
    mensaje: "",
  });

  const [redesState, setRedesState] = useState({
    facebook: "",
    twitter: "",
    youtube: "",
  });

  const [linksDataState, setLinksData] = useState([]);

  const location = useParams();
  const cielo = useRef(null);
  const escena = useRef(null);
  const camara = useRef(null);
  const cursor = useRef(null);
  const vrbutton = useRef(null);
  const videoControl = useRef(null);
  const iframe = useRef(null);
  var distanciaTouch = 0;
  var touchPos = { x: 0, y: 0 };

  // const ANALYTICS_KEY = process.env.REACT_APP_GOOGLE_ANALYTICS_KEY;

  const getTipo = (e) => {
    switch (e.tipo) {
      case 0:
        return "video-button";
      case 1:
        return "msg-button";
      case 2:
        return "view-button";
      case 3:
        return "image-button";
      default:
        return null;
    }
  };

  useEffect(() => {
    //const interval = setInterval(() => {
    //if (proyecto?.escenas && cielo.current && !AFRAME.components["cursor-listener"]) {
    if (cielo.current && !AFRAME.components["to-scene-1"]) {
      console.log("PROYECTO ADENTRO DEL REGISTRO DE EVENTO!!!!", proyecto);

      AFRAME.registerComponent("to-scene-1", {
        init: function () {
          let lastIndex = -1;
          const COLORS = ["red", "green", "blue"];

          this.el.addEventListener("click", function (evt) {
            lastIndex = (lastIndex + 1) % COLORS.length;
            this.setAttribute("material", "color", COLORS[lastIndex]);
            console.log("I was clicked at: ", evt.detail.intersection.point);

            if (cielo.current) {
              //cielo.current.setAttribute("material", "color", COLORS[lastIndex]);
              // cielo.current.setAttribute("material", "src", "https://images.pexels.com/photos/17325269/pexels-photo-17325269/free-photo-of-molinos-de-viento.jpeg?auto=compress&cs=tinysrgb&w=600");
              //cielo.current.setAttribute("material", "src", skySrc); // Usa el valor actual del ref
              cielo.current.emit("fadein");
              //setEscenaOnEventVR(indiceEscena);
              setEscenaOnEventVR(0);
            }
          });
        },
      });
    }
    if (cielo.current && !AFRAME.components["to-scene-2"]) {
      console.log("PROYECTO ADENTRO DEL REGISTRO DE EVENTO 2!!!!", proyecto);

      AFRAME.registerComponent("to-scene-2", {
        init: function () {
          let lastIndex = -1;
          const COLORS = ["red", "green", "blue"];

          this.el.addEventListener("click", function (evt) {
            lastIndex = (lastIndex + 1) % COLORS.length;
            this.setAttribute("material", "color", COLORS[lastIndex]);
            console.log("I was clicked at 2: ", evt.detail.intersection.point);

            if (cielo.current) {
              //cielo.current.setAttribute("material", "color", COLORS[lastIndex]);
              // cielo.current.setAttribute("material", "src", "https://images.pexels.com/photos/17325269/pexels-photo-17325269/free-photo-of-molinos-de-viento.jpeg?auto=compress&cs=tinysrgb&w=600");
              //cielo.current.setAttribute("material", "src", skySrc); // Usa el valor actual del ref
              cielo.current.emit("fadein");
              //setEscenaOnEventVR(indiceEscena);
              setEscenaOnEventVR(1);
            }
          });
        },
      });
    }

    if (cielo.current && !AFRAME.components["to-scene-3"]) {
      console.log("PROYECTO ADENTRO DEL REGISTRO DE EVENTO 2!!!!", proyecto);

      AFRAME.registerComponent("to-scene-3", {
        init: function () {
          let lastIndex = -1;
          const COLORS = ["red", "green", "blue"];

          this.el.addEventListener("click", function (evt) {
            lastIndex = (lastIndex + 1) % COLORS.length;
            this.setAttribute("material", "color", COLORS[lastIndex]);
            console.log("I was clicked at 3: ", evt.detail.intersection.point);

            if (cielo.current) {
              //cielo.current.setAttribute("material", "color", COLORS[lastIndex]);
              // cielo.current.setAttribute("material", "src", "https://images.pexels.com/photos/17325269/pexels-photo-17325269/free-photo-of-molinos-de-viento.jpeg?auto=compress&cs=tinysrgb&w=600");
              //cielo.current.setAttribute("material", "src", skySrc); // Usa el valor actual del ref
              cielo.current.emit("fadein");
              //setEscenaOnEventVR(indiceEscena);
              setEscenaOnEventVR(2);
            }
          });
        },
      });
    }

    if (cielo.current && !AFRAME.components["to-scene-4"]) {
      console.log("PROYECTO ADENTRO DEL REGISTRO DE EVENTO 4!!!!", proyecto);

      AFRAME.registerComponent("to-scene-4", {
        init: function () {
          let lastIndex = -1;
          const COLORS = ["red", "green", "blue"];

          this.el.addEventListener("click", function (evt) {
            lastIndex = (lastIndex + 1) % COLORS.length;
            this.setAttribute("material", "color", COLORS[lastIndex]);
            console.log("I was clicked at 4: ", evt.detail.intersection.point);

            if (cielo.current) {
              //cielo.current.setAttribute("material", "color", COLORS[lastIndex]);
              // cielo.current.setAttribute("material", "src", "https://images.pexels.com/photos/17325269/pexels-photo-17325269/free-photo-of-molinos-de-viento.jpeg?auto=compress&cs=tinysrgb&w=600");
              //cielo.current.setAttribute("material", "src", skySrc); // Usa el valor actual del ref
              cielo.current.emit("fadein");
              //setEscenaOnEventVR(indiceEscena);
              setEscenaOnEventVR(3);
            }
          });
        },
      });
    }

    if (cielo.current && !AFRAME.components["to-scene-5"]) {
      console.log("PROYECTO ADENTRO DEL REGISTRO DE EVENTO 5!!!!", proyecto);

      AFRAME.registerComponent("to-scene-5", {
        init: function () {
          let lastIndex = -1;
          const COLORS = ["red", "green", "blue"];

          this.el.addEventListener("click", function (evt) {
            lastIndex = (lastIndex + 1) % COLORS.length;
            this.setAttribute("material", "color", COLORS[lastIndex]);
            console.log("I was clicked at 5: ", evt.detail.intersection.point);

            if (cielo.current) {
              //cielo.current.setAttribute("material", "color", COLORS[lastIndex]);
              // cielo.current.setAttribute("material", "src", "https://images.pexels.com/photos/17325269/pexels-photo-17325269/free-photo-of-molinos-de-viento.jpeg?auto=compress&cs=tinysrgb&w=600");
              //cielo.current.setAttribute("material", "src", skySrc); // Usa el valor actual del ref
              cielo.current.emit("fadein");
              //setEscenaOnEventVR(indiceEscena);
              setEscenaOnEventVR(4);
            }
          });
        },
      });
    }
    //}, 100); // Revisa cada 100 ms hasta que las condiciones se cumplan.

    // Limpia el intervalo si el componente se desmonta antes de cumplir las condiciones.
    //  return () => clearInterval(interval);
  }, [indiceEscena]);

  useEffect(() => {

    if (proyecto) {

      for (let i = 0; i < proyecto.escenas.length; i++) {
        const element = document.getElementById(`link${i + 1}`);
        if (element) {
          element.setAttribute("visible", "true"); // Cambia el atributo "visible" a true en A-Frame
          const label = document.getElementById(`label${i + 1}`);
          if (label) {
            label.setAttribute("value", proyecto.escenas[i].titulo); // Cambia el atributo "visible" a true en A-Frame
          }
        } else {
          console.warn(`Elemento con ID link${i + 1} no encontrado.`);
        }
      }
    }
  }, [proyecto]);

  // const setEventoParaEsfera = () => {
  //   if (cielo.current && !AFRAME.components["cursor-listener"]) {
  //     console.log("PROYECTO ADENTRO DEL REGISTRO DE EVENTO!!!!", proyecto);

  //     AFRAME.registerComponent("cursor-listener", {
  //       init: function () {
  //         let lastIndex = -1;
  //         const COLORS = ["red", "green", "blue"];

  //         this.el.addEventListener("click", function (evt) {
  //           lastIndex = (lastIndex + 1) % COLORS.length;
  //           this.setAttribute("material", "color", COLORS[lastIndex]);
  //           console.log("I was clicked at: ", evt.detail.intersection.point);

  //           if (cielo.current) {
  //             //cielo.current.setAttribute("material", "color", COLORS[lastIndex]);
  //             // cielo.current.setAttribute("material", "src", "https://images.pexels.com/photos/17325269/pexels-photo-17325269/free-photo-of-molinos-de-viento.jpeg?auto=compress&cs=tinysrgb&w=600");
  //             //cielo.current.setAttribute("material", "src", skySrc); // Usa el valor actual del ref
  //             cielo.current.emit("fadein");
  //             setEscenaOnEventVR(indiceEscena);
  //           }
  //         });
  //       },
  //     });
  //   }
  // };

  // useEffect(() => {
  //   ReactGA.initialize(ANALYTICS_KEY);
  // }, []);

  // useEffect(() => {
  //   console.log("PROYECTO EN EFFECT DE MANEJADORES &&&&&&&&&&&&&&&&&&&&&&&", proyecto);
  //   if (proyecto && !AFRAME.components["cursor-listener"]) {
  //     AFRAME.registerComponent("cursor-listener", {
  //       init: function () {
  //         var lastIndex = -1;
  //         var COLORS = ["red", "green", "blue"];

  //         // Cambia el evento "click" para usar una función de flecha
  //         // this.el.addEventListener("click", (evt) => {
  //         //   console.log("I was clicked at: ", evt.detail.intersection.point);

  //         //   // Aquí se llama a setEscena con el valor actualizado de proyecto
  //         //   //setEscena("jardin", proyecto);
  //         // });

  //         this.el.addEventListener("click", function (evt) {
  //           lastIndex = (lastIndex + 1) % COLORS.length;
  //           this.setAttribute("material", "color", COLORS[lastIndex]);
  //           console.log("I was clicked at: ", evt.detail.intersection.point);
  //           setEscena("jardin", proyecto);
  //         });
  //       },
  //     });
  //   }
  // }, [proyecto]);

  const setEscenaOnEventVR = (indice) => {
    console.log("ADENTRO DE SET ESCENA  PARA VR -----------");

    let controls = camara.current.components["look-controls"];
    setEscenaIndex(indice);
    // if(indiceEscena === 0){
    //   setIndiceEscena(1);
    // }else{
    //   setIndiceEscena(0);
    // }
  };

  const setEscena = (escenaTitulo, p) => {
    cielo.current.emit("fadeout");
    let controls = camara.current.components["look-controls"];
    setTimeout(() => {
      if (controls) {
        let indice = p.escenas.findIndex((x) => x.titulo === escenaTitulo);
        if (indice < 0) indice = 0;
        console.log("indice-----------", indice);
        setEscenaIndex(indice);
        let valorX =
          ((p.escenas[indice].inicio ? p.escenas[indice].inicio.x : 0) *
            Math.PI) /
          180;
        let valorY =
          (((p.escenas[indice].inicio ? p.escenas[indice].inicio.y : 0) *
            Math.PI) /
            180) *
          -1;
        controls.pitchObject.rotation.x = valorX;
        controls.yawObject.rotation.y = valorY;
      }
      cielo.current.emit("fadein");
      //setEventoParaEsfera();
    }, 500);
  };

  const setVR = () => {
    escena.current.enterVR();
  };

  const setFullscreen = () => {
    if (!document.fullscreenElement)
      document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  };

  const zoomIn = (zoomin) => {
    let objCamara = camara.current.getAttribute("camera", "zoom");
    objCamara.zoom += 0.1 * (zoomin ? 1 : -1);
    if (objCamara.zoom <= 1) objCamara.zoom = 1;
    if (objCamara.zoom >= 5) objCamara.zoom = 5;

    camara.current.setAttribute("camera", "zoom", objCamara.zoom);
  };

  const handleCardRelacionadas = (event) => {
    // console.log(event.target)
    // console.log("REFFFFFF", menuEnlacesOtrasRef.current)
    // console.log("contain event", !menuEnlacesOtrasRef.current.contains(event.target))
    if (
      menuEnlacesOtrasRef.current &&
      !menuEnlacesOtrasRef.current.contains(event.target)
    ) {
      console.log("CLICKEANDO AFUERA!!");
      console.log(desplegarCard);
      setDesplegarCard((prev) => false);
    } else {
      console.log("CLICKEANDO ADENTRO!!");
      setDesplegarCard((prev) => true);
    }
  };

  const handleClickLinkButton = (e) => {
    console.log(">>>>>>>>>>><urlLink en handleClickLinkButton", urlLink);
    if (urlLink !== undefined && urlLink !== "") {
      ReactGA.event({
        category: "User",
        action: "onLinkClick",
      });
      window.open(urlLink, "_blank");
    } else {
      setAlertErrorMessage({
        titulo: "Link Inexistente",
        mensaje:
          "Configure el enlace de la Experiencia 360 con su sitio web o su carrito de compras.",
      });
      setShowAlertLink(true);
      setTimeout(() => {
        setShowAlertLink(false);
      }, 2000);
    }
  };

  const handleNavigateRelated = (urlTarget) => {
    if (urlTarget !== undefined && urlTarget !== "") {
      ReactGA.event({
        category: "User",
        action: "onLinkClick",
      });
      window.open(urlTarget, "_blank");
    } else {
      setAlertErrorMessage({
        titulo: "Link Inexistente",
        mensaje:
          "Configure el enlace de la Experiencia 360 con su sitio web o su carrito de compras.",
      });
      setShowAlertLink(true);
      setTimeout(() => {
        setShowAlertLink(false);
      }, 2000);
    }
  };

  const handleClickPlusButton = (e) => {
    zoomIn(true);
  };

  const handleClickMinusButton = (e) => {
    zoomIn(false);
  };

  const handleClickFullScreenButton = (e) => {
    setFullscreen();
  };

  const handleClickScenesButton = (e) => {
    viewScenasShortcut();
  };

  const handleClickOptionButton = (key_word) => {
    switch (key_word) {
      case "enlace_1_key":
        break;
        break;
      case "animation_key":
        setAnimateEnabled(!animateEnabled);
        break;
      case "twitter_key":
        if (redesState?.twitter !== undefined && redesState?.twitter !== "") {
          window.open(redesState.twitter, "_blank");
        } else {
          setAlertErrorMessage({
            titulo: "Twitter Inexistente",
            mensaje: "Configure el enlace a su plataforma de Twitter.",
          });
          setShowAlertLink(true);
          setTimeout(() => {
            setShowAlertLink(false);
          }, 2000);
        }
        break;
      case "youtube_key":
        if (redesState?.youtube !== undefined && redesState?.youtube !== "") {
          window.open(redesState.youtube, "_blank");
        } else {
          setAlertErrorMessage({
            titulo: "Youtube Inexistente",
            mensaje: "Configure el enlace a su plataforma de Youtube.",
          });
          setShowAlertLink(true);
          setTimeout(() => {
            setShowAlertLink(false);
          }, 2000);
        }
        break;
      case "facebook_key":
        if (redesState?.facebook !== undefined && redesState?.facebook !== "") {
          window.open(redesState.facebook, "_blank");
        } else {
          setAlertErrorMessage({
            titulo: "Facebook Inexistente",
            mensaje: "Configure el enlace a su plataforma de Facebook.",
          });
          setShowAlertLink(true);
          setTimeout(() => {
            setShowAlertLink(false);
          }, 2000);
        }
        break;

      default:
        break;
    }
  };

  const setVRPopUpPosition = (e, elemento = "player") => {
    let pos = camara.current.getAttribute("position");
    let rot = camara.current.getAttribute("rotation");
    console.log(pos, rot);

    const distance = 30;
    const theta = (rot.y * Math.PI) / 180;
    const planeX = pos.x - distance * Math.sin(theta);
    const planeZ = pos.z - distance * Math.cos(theta);
    let position = document.getElementById(elemento).getAttribute("position");
    position.x = planeX;
    position.y = pos.y;
    position.z = planeZ;
    console.log(position);
    document.getElementById(elemento).setAttribute("position", position);
  };

  const getFunction = (e) => {
    switch (e.tipo) {
      case 0:
        return () => {
          if (playing) return;
          if (!isVR) {
            setPopUpTitulo(e.nombre);
            let videoURL =
              e.video +
              (e.video && e.video.includes("?") ? "&" : "?") +
              "autoplay=1";
            if (iframe.current) iframe.current.src = videoURL;
            setPopUpContenido(
              <iframe
                ref={!iframe.current ? iframe : null}
                src={videoURL}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                width="100%"
                height="350vh"
              />
            );

            setOpen(true);
            console.log(e);
          } else {
            setPopUpTitulo(e.nombre);
            setMobileVideoSrc(e.video);
            console.log(e.position);
            setVRPopUpPosition(e);
            videoControl.current.play();
            setPlaying(true);
          }
        };
      case 1:
        return () => {
          if (playing) return;
          setPopUpTitulo(e.titulo);
          setPopUpContenido(e.texto);
          if (!isVR) {
            setOpen(true);
            console.log(e);
          } else {
            setVRPopUpPosition(e);
            setPlaying(true);
          }
        };
      case 2:
        return () => {
          if (playing) return;
          if (e.escena) {
            console.log(">>>>>>Navegando a la Escena: " + e.escena);
            onViewScene(addEventHandler, { name_scene: e.escena });
            setEscena(e.escena, proyecto);
          } else {
            setPopUpTitulo(e.nombre);
            setPopUpContenido("No hay una escena asociada a este link");
            setOpen(true);
          }
        };
      case 3:
        return () => {
          if (playing) return;
          if (e.imagen) {
            setPopUpTitulo(e.nombre);
            if (!isVR) {
              setPopUpContenido(<img width="100%" src={e.imagen} />);
              setOpen(true);
            } else {
              setVRPopUpImage(e.imagen);
              document.getElementById("imageURL").src = e.imagen;
              setVRPopUpPosition(e);
              setPlaying(true);
            }
          }
        };
      default:
        return null;
    }
  };

  const calcularDistancia = (a, b) => {
    const dx = a.clientX - b.clientX;
    const dy = a.clientY - b.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const setFileData = (data) => {
    setProyecto({ ...data });
    let escenaPrincipal = data.escenas.find((e) => e.principal);
    if (escenaPrincipal) setEscena(escenaPrincipal.titulo, data);
    else setEscena(0, data);
  };

  const getProject = async () => {
    if (!location.proyectId) return;
    setCargando(true);

    //nuevo codigo para llamar desde la api
    if (location.proyectId == "1A") {
      getDataApi();
      return;
    }
    var a = await fetch(
      "https://codegstudio.com/apps/360/convertir.php?id=" + location.proyectId
    );
    a.json().then((data) => {
      setFileData(data);
      console.log("<<<<<<<<<DATOS DEL PROYECTO OBTENIDOS DEL FILE<<<<<<<<<<");
      console.log(data);
      //llamada el listner de visita de pagina
      onPageView(addEventHandler, {
        id_experience: data.id,
        name_experience: data.nombre,
      });
      setCargando(false);
      setAnimateEnabled(data.isAnimated);
      setUrlLink(data.linkUrl);
      setTitulo360Value(data.titulo360);
      setRedesState(data.redesSociales);
      setLinksData(data.otras360);
    });
  };

  const isMobile = () => {
    document.querySelector("a-scene").addEventListener("enter-vr", function () {
      setIsVR(true);
    });

    document.querySelector("a-scene").addEventListener("exit-vr", function () {
      setIsVR(false);
    });

    if (!isMobileXp) {
      cursor.current.setAttribute(
        "cursor",
        "rayOrigin: mouse; fuse: true; fuseTimeout: 100"
      );
      cursor.current.setAttribute("visible", false);
    } else {
      cursor.current.setAttribute("cursor", "fuse: true; fuseTimeout: 100");
      cursor.current.setAttribute(
        "geometry",
        "primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
      );
    }
    camara.current.setAttribute("wasd-controls", { enabled: false });
  };

  const setMouseEvents = () => {
    let rotationSpeed = 0.01;
    let tt = document.getElementById("tooltip");
    window.addEventListener("mousemove", (event) => {
      tt.style.left = event.pageX - 50 + "px";
      tt.style.top = event.pageY - 50 + "px";
    });

    window.addEventListener("wheel", (event) => {
      let delta = event.deltaY || event.detail || event.wheelDelta;
      zoomIn(delta < 0);
    });
    window.addEventListener("touchstart", (event) => {
      distanciaTouch = 0;
      let toques = Array.from(event.touches);
      if (toques.length > 1) {
        distanciaTouch = calcularDistancia(toques[0], toques[1]);
        console.log("toques iniciales", distanciaTouch);
        console.log(
          "toques iniciales",
          calcularDistancia(toques[0], toques[1])
        );
      }
      if (toques.length == 1) {
        touchPos = { x: toques[0].clientX, y: toques[0].clientY };
        console.log("starttouch", {
          x: toques[0].clientX,
          y: toques[0].clientY,
        });
      }
    });

    window.addEventListener("touchend", (event) => {
      let toques = Array.from(event.changedTouches);
      console.log("endtouch", event);
      if (toques.length == 1) {
        if (toques[0].clientX == touchPos.x && toques[0].clientY == touchPos.y)
          tapBackground();
        setDesplegarMenu((prev) => !prev);
      }
    });

    window.addEventListener("touchmove", (event) => {
      let toques = Array.from(event.touches);
      if (toques.length > 1) {
        let esAcercamiento =
          distanciaTouch < calcularDistancia(toques[0], toques[1]);
        zoomIn(esAcercamiento);
        console.log("distancia", distanciaTouch);
      }
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        camara.current.components["look-controls"].yawObject.rotation.y +=
          rotationSpeed;
      } else if (e.key === "ArrowRight") {
        camara.current.components["look-controls"].yawObject.rotation.y -=
          rotationSpeed;
      } else if (e.key === "ArrowUp") {
        camara.current.components["look-controls"].pitchObject.rotation.x +=
          rotationSpeed;
      } else if (e.key === "ArrowDown") {
        camara.current.components["look-controls"].pitchObject.rotation.x -=
          rotationSpeed;
      }
    });

    window.addEventListener("click", (e) => {
      setAnimateEnabled(false);
      //setDesplegarMenu(prev => !prev);
      // console.log("showMenuFloat antes de cambiarlo", showMenuFloat);
      // setShowMenuFloat((prev) => {
      //   console.log("showMenuFloat adentro de setShowMenu es: ", prev);
      //   return !prev;
      // });
    });

    /*window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft') {
              this.rotateLeft = false;
            } else if (e.key === 'ArrowRight') {
              this.rotateRight = false;
            }
          });*/
  };

  const cerrarPopUp = () => {
    setOpen(false);
    if (iframe.current) iframe.current.src = "";
    setPopUpContenido(null);
    setPlaying(false);
    setMobileVideoSrc("");
    document.getElementById("imageURL").src = "";
    setVRPopUpImage(null);
  };

  const tapBackground = () => {
    setDesplegarMenu((prev) => !prev);
    let escenasContainer = document.getElementById("escenasContainer");
    escenasContainer.classList.add("hidden-scenes");
    console.log("tapBackground", timeOutClick);
    // if (timeOutClick) return;
    // let banner = document.getElementById("banner");
    // let escenasContainer = document.getElementById("escenasContainer");
    // banner.classList.remove("hidden-menu");
    // let to = setTimeout(() => {
    //   console.log("intervalo");
    //   let banner = document.getElementById("banner");
    //   if (
    //     banner &&
    //     banner.classList &&
    //     !banner.classList.contains("hidden-menu")
    //   ) {
    //     banner.classList.add("hidden-menu");
    //     escenasContainer.classList.add("hidden-scenes");
    //   }
    //   setTimeOutClick(null);
    // }, 1000);
    // setTimeOutClick(to);
  };

  const viewScenasShortcut = () => {
    let escenasContainer = document.getElementById("escenasContainer");
    escenasContainer.classList.remove("hidden-scenes");
  };

  const showTooltip = (e) => {
    let tt = document.getElementById("tooltip");
    tt.classList.remove("hidden");
    tt.innerHTML = e.nombre;
    //tt.style.left =
    /*
        tt.setAttribute('visible', true);
        tt.setAttribute('text', 'value', e.nombre);
        //setVRPopUpPosition(e, 'tooltip')
        tt.setAttribute('position', `${e.position.x-2} ${e.position.y} ${-12}`);*/
  };

  const hideTooltip = (e) => {
    let tt = document.getElementById("tooltip");
    tt.classList.add("hidden"); /*
        tt.setAttribute('visible', false);*/
  };

  const getDataApi = async () => {
    const resData = await apiService.getData("proyectos");
    console.log("DATA DESDE API DE FER>>>", resData);
    const data = resData[0];
    onPageView(addEventHandler, {
      id_experience: data.id,
      name_experience: data.nombre,
    });
    setFileData(data);
    setCargando(false);
    setAnimateEnabled(data.isAnimated);
    setUrlLink(data.linkUrl);
    setTitulo360Value(data.titulo360);
    setRedesState(data.redesSociales);
    setLinksData(data.otras360);
  };

  useEffect(() => {
    //inicio contador de tiempo de permanencia
    startTime = Date.now();

    const handleBeforeUnload = () => {
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000;
      setSpentTime(duration);
      sessionStorage.setItem("tiempoPermanencia", duration);
      onCalculateSpent({
        idExperience: proyecto.id,
        nameExperience: proyecto.nombre,
        timeSeconds: duration,
      });
    };

    console.log("[PLAYER-VIEW]:::EFFECT", !location.proyectId);
    setMouseEvents();
    getProject();
    isMobile();
    ReactGA.event({
      category: "User",
      action: "onLoadExperience",
      data: {
        user_rol: "visitor",
      },
    });
    document.addEventListener("click", handleCardRelacionadas);
    // document.addEventListener("dblclick", () => {
    //   setShowModalManual(true)
    // });

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {};
  }, []);

  useEffect(() => {
    console.log("ANIMACION HABILITADA?", animateEnabled);
  }, [animateEnabled]);

  // const actionEnterVR = () => {
  //   const scene = document.querySelector('a-scene');
  //   if (scene && scene.enterVR) {
  //     scene.enterVR();
  //     cursor.current.setAttribute("cursor", "rayOrigin: controller; fuse: true; fuseTimeout: 100");
  //     cursor.current.setAttribute("visible", true);
  //   }
  // };
  // const actionEnterVR = () => {
  //   const scene = document.querySelector('a-scene');
  //   if (scene && scene.enterVR) {
  //     scene.enterVR().then(() => {
  //       cursor.current.setAttribute("raycaster", "objects: .objeto");
  //       cursor.current.setAttribute("cursor", "rayOrigin: controller; fuse: true; fuseTimeout: 1000");
  //       cursor.current.setAttribute("visible", true);
  //     });
  //   }
  // };

  const actionEnterVR = () => {
    const scene = document.querySelector("a-scene");
    if (scene && scene.enterVR) {
      scene.enterVR();
    }
  };

  return (
    <>
      {" "}
      <LoadingSpin visible={cargando} />
      <OpenProject visible={!location.proyectId} setFileData={setFileData} />
      <PopUpMsg
        visible={open}
        titulo={popUpTitulo}
        contenido={popUpContenido}
        alCerrar={cerrarPopUp}
      />
      <EscenasMenu
        escenas={proyecto ? proyecto.escenas : []}
        setEscena={(e) => setEscena(e, proyecto)}
      />
      <div id="tooltip" className="hidden"></div>
      {!cargando && proyecto && !open && !playing && (
        <div id="banner" className="hidden-menu">
          {/* <div
              className="controlbutton"
              id="zoominbutton"
              onClick={() => zoomIn(true)}
            ></div>
            <div
              className="controlbutton"
              id="zoomoutbutton"
              onClick={() => zoomIn(false)}
            ></div> */}
          {/* <div
              className="controlbutton"
              id="fullscreenbutton"
              onClick={setFullscreen}
            ></div> */}
          {/* <div
              className="controlbutton"
              id="linkbutton"
              onClick={handleClickLinkButton}
            ></div> */}
          {/* <div
              className="controlbutton"
              id="vrbutton"
              ref={vrbutton}
              onClick={setVR}
              style={{ display: isMobileXp ? "block" : "none" }}
            ></div> */}
          {/* <div
              className="controlbutton"
              id="shortcutbutton"
              ref={vrbutton}
              onClick={viewScenasShortcut}
            >
              <ApartmentOutlined style={{ fontSize: 45 }} />
            </div> */}
        </div>
      )}
      <a-scene
        ref={escena}
        onMouseDown={(e) => {
          if (e.clientX != undefined)
            setMousePos({ x: e.clientX, y: e.clientY });
        }}
        onMouseUp={(e) => {
          if (
            e.clientX != undefined &&
            e.clientX == mousePos.x &&
            e.clientY == mousePos.y
          )
            tapBackground();
        }}
      >
        <a-assets>
          <img id="plus" src={info} alt="plus" />
          <img id="gafas" src={gafas_white} alt="gafas" />
          <img id="playvideo" src={video} alt="playvideo" />
          <img id="image" src={image} alt="image" />
          <img id="imageURL" src="" alt="imageURL" />
          <video
            ref={videoControl}
            id="videocontrol"
            width="100%"
            src={mobileVideoSrc}
            controls
            autoPlay
          />
        </a-assets>
        {/* <a-entity oculus-touch-controls="hand: left"></a-entity>
<a-entity oculus-touch-controls="hand: right"></a-entity> */}

        <a-sky
          ref={cielo}
          id="cielo"
          src={
            proyecto && proyecto.escenas.length
              ? proyecto.escenas[escenaIndex].fondo
              : ""
          }
          rotation="0 90 0"
          material="opacity: 1; transparent:true"
          animation__fade_in="property: material.opacity; from: 0; to: 1; dur: 1500; startEvents: fadein"
          animation__fade_out="property: material.opacity; from: 1; to: 0; dur: 500; startEvents: fadeout"
        />
        <a-camera
          id="camara"
          ref={camara}
          animation={`property: rotation; from: 0 0 0; to: 0 360 0; dur: 800000; loop: true; easing:linear; enabled: ${animateEnabled};`}
        >
          <a-cursor
            position="0 0 -1"
            id="cursor"
            ref={cursor}
            cursor="fuse: true; fuseTimeout: 100"
            raycaster="objects: .objeto"
            material="shader:flat; color:white"
          />
          <a-entity
            cursor="fuse: true; fuseTimeout: 500"
            rayOrigin="controller"
            raycaster="objects: .interactable; showLine: true; debug: true"
            position="0 0 -1"
            geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
            material="color: black; shader: flat"
          ></a-entity>
        </a-camera>
        <a-mixin
          id="msg-button"
          geometry="primitive: circle; radius:2;"
          animation__scale="property: scale; to: 2.2 2.2 2.2; dur: 200; startEvents: mouseenter"
          animation__scale_reverse="property: scale; to: 1 1 1; dur: 200; startEvents: mouseleave"
          material="color: white; opacity: 0.5; transparent: true; shader: flat; src: #plus; side: double"
          clickeable
        ></a-mixin>
        <a-mixin
          id="view-button"          
          geometry="primitive: circle; radius:5;"
          material="opacity: 1; transparent:true; shader: flat; src: #gafas; side: double"
          animation__scale="property: scale; to: 2.2 2.2 2.2; dur: 200; startEvents: mouseenter"
          animation__scale_reverse="property: scale; to: 1 1 1; dur: 200; startEvents: mouseleave"
          animation="property: rotation; dur:3000; to: 0 360 0; easing:linear; loop:true"
          clickeable
        ></a-mixin>
        <a-mixin
          id="video-button"
          geometry="primitive: circle; radius:1;"
          material="color: white; opacity: 0.5; transparent: true; shader: flat; src: #playvideo; side: double"
          animation__scale="property: scale; to: 2.2 2.2 2.2; dur: 200; startEvents: mouseenter"
          animation__scale_reverse="property: scale; to: 1 1 1; dur: 200; startEvents: mouseleave"
          border="sides: 4; radius: 25; wall: #rail;"
          clickeable
        ></a-mixin>
        <a-mixin
          id="image-button"
          geometry="primitive: circle; radius:1;"
          material="color: white; opacity: 0.5; transparent: true; shader: flat; src: #image; side: double"
          animation__scale="property: scale; to: 2.2 2.2 2.2; dur: 200; startEvents: mouseenter"
          animation__scale_reverse="property: scale; to: 1 1 1; dur: 200; startEvents: mouseleave"
          border="sides: 4; radius: 25; wall: #rail;"
          clickeable
        ></a-mixin>
        <a-plane
          id="player"
          width="42"
          height="32"
          look-at="#camara"
          position={mobilePlayerPos}
          visible={playing}
        >
          <a-entity
            position="1.5 8.5 10"
            text={
              "shader: msdf; anchor: center; width: 30; font: https://cdn.aframe.io/examples/ui/Viga-Regular.json; color: black; value: " +
              popUpTitulo
            }
          />
          {!popUpContenido && !VRPopUpImage && (
            <a-video
              src="#videocontrol"
              width="37"
              height="23"
              rotation="0 0 0"
              position="0 0 1"
              visible={!popUpContenido && !VRPopUpImage}
              border="sides: 4; radius: 25; wall: #rail;"
            ></a-video>
          )}
          {VRPopUpImage && (
            <Entity
              width="37"
              height="23"
              rotation="0 0 0"
              position="0 0 1"
              visible={VRPopUpImage}
              geometry="primitive: plane; height: 23; width: 37"
              material="shader: flat; src: #imageURL; side: double"
              border="sides: 4; radius: 25; wall: #rail;"
            ></Entity>
          )}
          {popUpContenido && (
            <Entity
              position="-12.5 2.5 10"
              visible={popUpContenido}
              text={
                popUpContenido
                  ? "shader: msdf; anchor: left; width: 25; font: https://cdn.aframe.io/examples/ui/Viga-Regular.json; color: black; value: " +
                    popUpContenido
                  : ""
              }
            />
          )}
          <Entity
            position="8 -10 10"
            className="objeto"
            animation__scale="property: scale; to: 1.5 1.5 1.5; dur: 200; startEvents: mouseenter"
            animation__scale_reverse="property: scale; to: 1 1 1; dur: 200; startEvents: mouseleave"
            text="shader: msdf; anchor: left; width: 20; font: https://cdn.aframe.io/examples/ui/Viga-Regular.json; color: black; value: ok"
            events={{
              click: cerrarPopUp,
            }}
          />
        </a-plane>
        {/*<Entity
              id="tooltip"
              visible={false}
              text="shader: msdf; anchor: left; width: 40; font: https://cdn.aframe.io/examples/ui/Viga-Regular.json; color: white; value: ok"
                  />*/}
        {proyecto && proyecto.escenas.length
          ? proyecto.escenas[escenaIndex].elementos.map((e, k) => 
            {             
              
              const position = proyecto.escenas.findIndex((es) => es.titulo === e.escena);

              console.log("<<<<<POSITION", position)
              console.log("<<<<<ELEMENTO>>>>>", e)

            return (
              <Entity
                key={k}
                position={`${e.position.x} ${e.position.y} ${e.position.z}`}
                rotation={`${e.rotation.x} ${e.rotation.y} ${e.rotation.z}`}
                mixin={getTipo(e)}
               // class="interactable"
               {...(e.tipo === 2 ? { [`to-scene-${position}`]: true } : {})}
                id={e.id}
                className="objeto interactable"
                visible={!playing}
                events={{
                  click: getFunction(e),
                  mouseenter: (s) => showTooltip(e),
                  mouseleave: () => hideTooltip(e),
                }}
              />
            )
          }
          )
          : ""}
        <a-text
          font="kelsonsans"
          value={JSON.stringify(analiticasState, null, 2)}
          width="6"
          position="-2.5 -2 -10"
          rotation="0 0 0"
          wrap-count="30"
        ></a-text>
{/* 
        <a-entity
          id="link1"
          visible={false}
        >
          <a-text
          id="label1"
          value="Este es un tooltip"
          font="kelsonsans"
          width="4"
          rotation="0 0 0"
          position="-2 -0 -9"
          visible="true"
          color="#FFFFFF"
          align="center"
        ></a-text>
        <a-sphere          
          class="interactable"
          
          //cursor-listener
          to-scene-1
          position="-2 0 -10"
          geometry="primitive: sphere; segmentsWidth: 32; segmentsHeight: 16; radius: 0.5"
          material="color: #B0B0B0; metalness: 0.8; roughness: 0.2"
        ></a-sphere>
        </a-entity>

        <a-entity
          id="link2"
          visible={false}
        >
          <a-text
          id="label2"
          value="Este es un tooltip"
          font="kelsonsans"
          width="4"
          rotation="0 0 0"
          position="0 0 -9"
          visible="true"
          color="#FFFFFF"
          align="center"
        ></a-text>
        <a-sphere          
          class="interactable"
          
          //cursor-listener
          to-scene-2
          position="0 0 -10"
          geometry="primitive: sphere; segmentsWidth: 32; segmentsHeight: 16; radius: 0.5"
          material="color: #B0B0B0; metalness: 0.8; roughness: 0.2"
        ></a-sphere>
        </a-entity>

        <a-entity
          id="link3"
          visible={false}
        >
          <a-text
          id="label3"
          value="escena"
          font="kelsonsans"
          width="4"
          rotation="0 0 0"
          position="2 0 -9"
          visible="true"
          color="#FFFFFF"
          align="center"
        ></a-text>
        <a-sphere          
          class="interactable"
          
          //cursor-listener
          to-scene-3
          position="2 0 -10"
          geometry="primitive: sphere; segmentsWidth: 32; segmentsHeight: 16; radius: 0.5"
          material="color: #B0B0B0; metalness: 0.8; roughness: 0.2"
        ></a-sphere>
        </a-entity>

        <a-entity
          id="link4"
          visible={false}
        >
          <a-text
          id="label4"
          value="escena"
          font="kelsonsans"
          width="4"
          rotation="0 0 0"
          position="4 0 -9"
          visible="true"
          color="#FFFFFF"
          align="center"
        ></a-text>
        <a-sphere          
          class="interactable"
          
          //cursor-listener
          to-scene-4
          position="4 0 -10"
          geometry="primitive: sphere; segmentsWidth: 32; segmentsHeight: 16; radius: 0.5"
          material="color: #B0B0B0; metalness: 0.8; roughness: 0.2"
        ></a-sphere>
        </a-entity>

        <a-entity
          id="link5"
          visible={false}
        >
          <a-text
          id="label5"
          value="escena"
          font="kelsonsans"
          width="4"
          rotation="0 0 0"
          position="6 -0 -9"
          visible="true"
          color="#FFFFFF"
          align="center"
        ></a-text>
        <a-sphere          
          class="interactable"          
          //cursor-listener
          to-scene-5
          position="6 0 -10"
          geometry="primitive: sphere; segmentsWidth: 32; segmentsHeight: 16; radius: 0.5"
          material="color: #B0B0B0; metalness: 0.8; roughness: 0.2"
        ></a-sphere>
        </a-entity>
 */}
      </a-scene>
      <button
        onClick={actionEnterVR}
        style={{
          position: "absolute",
          top: "50%",
          left: 10,
          padding: 10,
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          border: "1px solid white",
        }}
      >
        VR
      </button>
      {showAlertLink && (
        <Alert
          id="alertLink"
          message={alertErrorMessage.titulo}
          description={alertErrorMessage.mensaje}
          type="error"
          style={{ opacity: 0.4 }}
        />
      )}
      <h1 class="titleExperiencia">{titulo360Value}</h1>
      {desplegarMenu && (
        <div
          className={`animate__animated ${
            showMenuFloat ? "animate__fadeIn" : "animate__fadeOut"
          }`}
        >
          <MenuComponent
            id="menuFlotante"
            handleLinkButton={handleClickLinkButton}
            handleOptionButton={handleClickOptionButton}
            handleClickPlusButton={handleClickPlusButton}
            handleClickMinusButton={handleClickMinusButton}
            handleClickFullScreenButton={handleClickFullScreenButton}
            handleClickScenesButton={handleClickScenesButton}
            desplegarMenu={desplegarMenu}
            setDesplegarMenu={setDesplegarMenu}
            isMobile={isMobileXp}
            setVR={setVR}
          />
        </div>
      )}
      <MenuOtras
        // id="menuFlotanteOtras"
        handleLinkButton={handleClickLinkButton}
        // handleOptionButton={handleClickOptionButton}
      />
      <Visitas />
      <MenuRedes data={proyecto} />
      <MenuManual
        showModal={showModalManual}
        setShowModal={setShowModalManual}
      />
      <div ref={menuEnlacesOtrasRef}>
        <MenuEnlaces
          handleLinkButton={handleNavigateRelated}
          data={linksDataState}
          handleShowFromPadre={handleCardRelacionadas}
          desplegarCard={desplegarCard}
        />
      </div>
      {/* <div style={{display: "block"}}>
          <CardCar />
        </div> */}
      <MenuEscenas
        handleClickScenesButton={handleClickScenesButton}
      ></MenuEscenas>
      <ModalManual
        showModal={showModalManual}
        setShowModal={setShowModalManual}
      />
    </>
  );
}

Player360.propTypes = {
  trackPageView: PropTypes.func,
};

const mapTrackingToProps = (trackEvent) => {
  return {
    trackPageView: (pageName) => {
      trackEvent(pageViewEvent(pageName));
    },
  };
};

const playerWithTracking = withTracking(mapTrackingToProps)(Player360);
export default playerWithTracking;

//export default withTracking(mapTrackingToProps)(Player360)
