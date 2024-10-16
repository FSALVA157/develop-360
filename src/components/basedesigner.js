import React, { useEffect, useRef, useState } from "react";
import T360view from "./t360view";
import EscenaForm from "./escenaForm";
import ElementosForm from "./elementosForm";
import {
  VideoCameraAddOutlined,
  FolderOpenOutlined,
  AppstoreAddOutlined,
  MenuOutlined,
  LogoutOutlined,
  CodeOutlined,
  ProductOutlined,
  ClusterOutlined,
  PictureOutlined,
  UserOutlined,
  BlockOutlined,
  PlusSquareOutlined,
  SaveOutlined,
  ShareAltOutlined,
  PieChartOutlined,
  ExperimentOutlined
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  theme,
  Tabs,
  message,
  Badge,
  Divider,
  Switch,
  Button,
  Flex,
  Input,
  Collapse,
  Space,
} from "antd";
import ElementInspector from "./elementInspector";
import EmptyPage from "./emptyPage";
import ExperienciasForm from "./experienciaForm";
import LoadingSpin from "./loadingSpin";
import ArchivadasForm from "./archivadasForm";
import Publicar from "./publicar";
import SceneInspector from "./sceneInspector";
import GuardandoQueue from "./guardandoQueue";
import { FormEnlances } from "../FormEnlances";
import { ModalFormLogin } from "./auth-components/ModalFormLogin";
import apiService from "../services/apiService";
import { AuthContext } from "../context/auth-context/AuthContext";
import { useAddMockRegister } from "../conversor/useAddMockRegister";
import { useCloudinaryUpload } from "../hooks/useCloudinaryUpload";
const { Header, Content, Footer, Sider } = Layout;

const BaseDesigner = ({ usuarioActivo, setUsuarioActivo, googleAPI }) => {
  const [mostrarEscenaForm, setMostrarEscenaForm] = useState(false);
  const [mostrarElementosForm, setMostrarElementosForm] = useState(false);
  const [mostrarArchivadasForm, setMostrarArchivadasForm] = useState(false);
  const [mostrarPublicar, setMostrarPublicar] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState(1);
  const [elemento, setElemento] = useState(null);
  const [camaraPos, setCamaraPos] = useState({ x: 0, y: 0 });
  const [mostrarExperienciaForm, setMostrarExperienciaForm] = useState(false);
  //hook que maneja agregar mock
  const { addNewRegister, dataMock } = useAddMockRegister();

//tomemos el authState desde el context 
  const {authState, logout, login } = React.useContext(AuthContext);

  //state que maneja la creacion de experiencias a una API o a Drive
  //true: drive, false: API
  const [modo, setModo] = useState(true);

  const [proyecto, setProyecto] = useState({
    id: null,
    nombre: "",
    escenas: [],
    isAnimated: false,
    linkUrl: "",
    titulo360: "",
    redesSociales: {
      facebook: "",
      twitter: "",
      youtube: "",
    },
    otras360: [
      // {
      //   icono: "",
      //   titulo: "",
      //   url: "",
      //   imagen: "",
      // },
    ],
  });

  const [cambiosGuardando, setCambiosGuardando] = useState(0);

  const [drive] = useState(usuarioActivo.home.id);
  const [loading, setLoading] = useState(false);
  const [escenaIndex, setEscenaIndex] = useState(null);
  const [escena, setEscena] = useState({
    fondo: "",
    elementos: [],
    inicio: { x: 0, y: 0 },
  });

  //controladores de input de linkUrl
  const [urlLink, setUrlLink] = useState("");
  const [titulo360Value, setTitulo360Value] = useState("");
  const [redesState, setRedesState] = useState({
    facebook: "",
    twitter: "",
    youtube: "",
  });
  const [otras, setOtras] = useState([]);

  const inputUrlRef = useRef(null);
  const inputTitulo360Ref = useRef(null);
  // const inputTwitterRef = useRef(null);
  // const inputYoutubeRef = useRef(null);
  // const inputFacebookRef = useRef(null);

  const {uploadImageCl, urlImageCl} = useCloudinaryUpload();
  
  const manageConversorClick = () => {
    addNewRegister(proyecto);
    
  };

  useEffect(() => {
    if(dataMock){
      console.log("****VEAMOS EL ESTADO DE LA DATA MOCKEADA************");
      console.log(dataMock);

      if (dataMock.length > 1) {
        const image = dataMock[1]?.escenas[0]?.fondo;
        console.log("image", image);
        uploadImageCl(image);
      }
    }
  }, [dataMock])
  

  const agregarElemento = () => {
    console.log("elementos: ", proyecto.escenas.length);
    if (proyecto.escenas.length) setMostrarElementosForm(true);
    else {
      message.error("Debe crear una escena antes de agregar elementos.");
    }
  };

  const cambiarTabKey = (tk) => {
    //if (elemento)
    setActiveTabKey(tk);
    //else message.error('Debe elemento antes ingresar al inspector.');
  };

  const rotarCamara = () => {
    console.log("llego aqui", camaraPos);

    /*let valorX = camaraPos.x * Math.PI / 180
    let valorY = camaraPos.y * Math.PI / 180 *-1*/

    const posicionActual = { x: 0, y: 0, z: 0 };

    // Calcular la diferencia en las coordenadas
    const dx = camaraPos.x - posicionActual.x;
    const dy = camaraPos.y - posicionActual.y;
    const dz = camaraPos.z - posicionActual.z;

    // Calcular los ángulos de rotación (en radianes)
    const anguloX = Math.atan2(dy, Math.sqrt(dx * dx + dz * dz));
    const anguloY = Math.atan2(dx, dz);

    console.log("llego aqui", { anguloX, anguloY });

    let camara = document.getElementById("camara");
    if (camara) {
      camara.components["look-controls"].pitchObject.rotation.x = anguloX;
      camara.components["look-controls"].yawObject.rotation.y =
        anguloY + Math.PI;
    }
  };

  const handleSwitchIsAnimated = () => {
    setProyecto((prev) => ({ ...prev, isAnimated: !prev.isAnimated }));
    setCambiosGuardando(cambiosGuardando + 1);
  };

  const handleUrlLink = () => {
    //console.log("URL: ", urlLink);
    setProyecto((prev) => ({ ...prev, linkUrl: urlLink.trim() }));
    setCambiosGuardando(cambiosGuardando + 1);
    setUrlLink("");
  };

  const handleDoubleClickUrlInput = () => {
    inputUrlRef.current.select();
  };

  const handleTitulo360 = () => {
    setProyecto((prev) => ({ ...prev, titulo360: titulo360Value.trim() }));
    setCambiosGuardando(cambiosGuardando + 1);
    setTitulo360Value("");
  };

  const handleSubmitEnlaces = (nuevaLista) => {        
    setOtras([...nuevaLista]);    
    setProyecto((prev) => ({ ...prev, otras360: nuevaLista }));    
    setCambiosGuardando(cambiosGuardando + 1);
  };

  // const handleRedesSave = () => {
  //   setProyecto((prev) => ({ ...prev, redesSociales: redesState }));
  //   setCambiosGuardando(cambiosGuardando + 1);
  // };

  const handleDoubleClicTitulo360Input = () => {
    inputTitulo360Ref.current.select();
  };

  // const handleDoubleClicTwitterInput = () => {
  //   inputTwitterRef.current.select();
  // };

  // const handleDoubleClicFacebookInput = () => {
  //   inputFacebookRef.current.select();
  // };

  // const handleDoubleClicYoutubeInput = () => {
  //   inputYoutubeRef.current.select();
  // };

  useEffect(() => {
    rotarCamara();
  }, [camaraPos]);

  const guardarCambios = async (p) => {
    //setCambiosGuardando(cambiosGuardando+1);
    setLoading(true);
    console.log("antes de guardar: ", p);
    let response;
    if(modo){
      response = await googleAPI.saveFile(p, proyecto.id);
    }else{
      response = await googleAPI.saveFile(p, p.id);
    }
    console.log("al guardar: ", response);
    setCambiosGuardando(0);
    setLoading(false);
    //setCambiosGuardando(cambiosGuardando-1);
  };

  const guardarCambiosEscena = (e) => {
    setEscena({ ...e });
    if (e.principal)
      proyecto.escenas = proyecto.escenas.map((es) => {
        return { ...es, principal: false };
      });
    proyecto.escenas[escenaIndex] = e;
    setProyecto({ ...proyecto });
    console.log(e);
    setCambiosGuardando(cambiosGuardando + 1);
  };

  const guardarCambiosElemento = (e) => {
    setElemento(e);
    setCambiosGuardando(cambiosGuardando + 1);
    console.log("cambiando elemento");
  };

  const items1 = [
    {
      label: usuarioActivo.c2.value.wt.rV,
      icon: UserOutlined,
      hijos: [
        {
          label: "Opciones",
          icon: React.createElement(MenuOutlined),
          onClick: () => googleAPI.listFiles().then((x) => console.log(x)),
        },
        {
          label: "Cerrar Sesion",
          icon: React.createElement(LogoutOutlined),
          onClick: () => googleAPI.logOut(),
        },
      ],
    },
    {
      label: "Experiencias",
      icon: VideoCameraAddOutlined,
      hijos: [
        {
          label: "Nueva",
          icon: React.createElement(AppstoreAddOutlined),
          onClick: () => setMostrarExperienciaForm(true),
        },
        {
          label: "Archivadas",
          icon: React.createElement(FolderOpenOutlined),
          onClick: async () => {            
            setLoading(true);
            let e;
            if(modo){
              console.log(drive);
              e = await googleAPI.getExperiencias(drive);
              console.log("forma de e al traer de drive", e)
              console.log(e);
            }else{
              e = await apiService.getData("experiencias");              
              e = e.map(item => {
                return {
                  id: item.id,
                  name: item.nombre,
                }
              });
              console.log(e[0]);
            }
            if (e.length) {
              setUsuarioActivo({ ...usuarioActivo, experiencias: e });
              setMostrarArchivadasForm(true);

              console.log(usuarioActivo);
            } else alert("No hay experiencias archivadas.");
            setLoading(false);
          },
        },
      ],
    },
    
    {
      label: authState.username,
      icon: UserOutlined,
      hijos: [
        {
          label: "Opciones",
          icon: React.createElement(MenuOutlined),
          onClick: () => googleAPI.listFiles().then((x) => console.log(x)),
        },
        {
          label: "Cerrar Sesion",
          icon: React.createElement(LogoutOutlined),
          onClick: () => logout(),
        },
      ],
    },
    {
      label: "Analíticas",
      icon:  PieChartOutlined,      
      onClick: () => window.open("/analiticas", "_blank"),
    },
    {
      label: "Guardar",
      icon: SaveOutlined,
      onClick: () => guardarCambios(proyecto),
      oculto: cambiosGuardando == 0,
    },
  ]
    .filter((x) => !x.oculto)
    .map((opcion, key) => ({
      key,
      icon: React.createElement(opcion.icon),
      label: opcion.label,
      children: opcion.hijos,
      onClick: opcion.onClick,
    }));

  const [menuLateral, setMenuLateral] = useState([
    {
      label: "Escenas",
      icon: ClusterOutlined,
      submenu: [
        {
          label: "Nueva...",
          icon: PlusSquareOutlined,
          funcion: () => setMostrarEscenaForm(true),
        },
      ],
    },
    {
      label: "Elementos",
      icon: ProductOutlined,
      submenu: [
        {
          label: "Nuevo...",
          icon: PlusSquareOutlined,
          funcion: agregarElemento,
        },
      ],
    },
    {
      label: "Publicar",
      icon: ShareAltOutlined,
      submenu: [
        {
          label: "<IFrame>",
          icon: CodeOutlined,
          funcion: () => setMostrarPublicar(true),
        },
      ],
    }  

  ]);

  const getMenuLateral = () => {
    return menuLateral.map((opcion, index) => {
      const key = String(index + 1);
      return {
        key: `sub${key}`,
        icon: React.createElement(opcion.icon),
        label: opcion.label,
        children: opcion.submenu.map((subopcion, j) => {
          const subKey = index * 4 + j + 1;
          return {
            key: subKey,
            label: subopcion.label,
            icon: React.createElement(subopcion.icon),
            onClick: subopcion.funcion,
          };
        }),
      };
    });
  };

  useEffect(() => {
    console.log(proyecto);
    setUrlLink(proyecto.linkUrl);
    setTitulo360Value(proyecto.titulo360);
    setRedesState(proyecto.redesSociales);
    setOtras(proyecto.otras360);
    if (proyecto.escenas.length && escena.fondo == "") cargarEscena(0);

    setMenuLateral([
      {
        label: "Escenas",
        icon: ClusterOutlined,
        submenu: proyecto.escenas
          .map((e, i) => {
            return {
              label: (
                <>
                  {e.principal ? (
                    <Badge title="Escena Principal" count={"P"} size="small" />
                  ) : null}
                  <span style={{ marginLeft: 10 }}>{e.titulo}</span>
                </>
              ),
              icon: PictureOutlined,
              funcion: () => cargarEscena(i),
            };
          })
          .concat([
            {
              label: "Nueva...",
              icon: PlusSquareOutlined,
              funcion: () => setMostrarEscenaForm(true),
            },
          ]),
      },
      {
        label: "Elementos",
        icon: ProductOutlined,
        submenu: escena.elementos
          .map((e) => {
            return {
              label: e.nombre,
              icon: BlockOutlined,
              funcion: () => {
                setEditingElement(e);
                setCamaraPos(e.position);
              },
            };
          })
          .concat([
            {
              label: "Nuevo...",
              icon: PlusSquareOutlined,
              funcion: agregarElemento,
            },
          ]),
      },
      {
        label: "Publicar",
        icon: ShareAltOutlined,
        submenu: [
          {
            label: "<IFrame>",
            icon: CodeOutlined,
            funcion: () => setMostrarPublicar(true),
          },
        ],
      },
    ]);
  }, [proyecto, escena]);

  const eliminarExperiencia = async (id) => {
    googleAPI.deleteFile(id);
  };

  const crearExperiencia = async (newExp) => {
    console.log("DATA DE NewExp: ", newExp);
    setMostrarExperienciaForm(false);
    const newProyecto = {
      id: null,
      nombre: newExp.titulo,
      escenas: [],
      isAnimated: true,
      linkUrl: newExp.linkUrl,
      titulo360: newExp.titulo360,
      redesSociales: newExp.redesSociales,
      otras360: newExp.otras360,
    };
    console.log("DATA DE NUEVO PROYECTO ANTES DE ENVIAR A LA API: ", newProyecto);
    setLoading(true);
    let nuevoArchivo = await googleAPI.createFile(
      newExp.titulo + "-" + Date.now() + ".grf",
      drive,
      newProyecto
    );
    let respuesta = JSON.parse(nuevoArchivo.body);
    console.log(respuesta);
    setProyecto({ ...newProyecto, id: respuesta.id });
    await googleAPI.setReadPermission(respuesta.id);
    setLoading(false);
  };

  const cargarEscena = (indice) => {
    setEscena(proyecto.escenas[indice]);
    setElemento(null);
    setEscenaIndex(indice);
    setActiveTabKey(2);
  };

  const eliminarElemento = (elemento) => {
    let index = proyecto.escenas[escenaIndex].elementos.findIndex(
      (e) => e.id === elemento.id
    );
    proyecto.escenas[escenaIndex].elementos.splice(index, 1);
    setEscena({ ...proyecto.escenas[escenaIndex] });
    setProyecto({ ...proyecto });
    setCambiosGuardando(cambiosGuardando + 1);
  };

  const setEditingElement = (e) => {
    setElemento(escena.elementos.find((x) => x.id == e.id));
    setActiveTabKey(2);
  };

  const addEscena = (values) => {
    const newEscena = {
      titulo: values.titulo,
      fondo: values.imageContent,
      elementos: [],
      inicio: { x: 0, y: 0 },
      principal: proyecto.escenas.length == 0,
    };
    //const newEscena = {label: values.titulo, imagen: values.imageContent, icon: PictureOutlined, funcion:() => cargarEscena(newEscenaFile)};
    proyecto.escenas.push(newEscena);

    setProyecto({ ...proyecto });
    setCambiosGuardando(cambiosGuardando + 1);
    cargarEscena(proyecto.escenas.length - 1);

    setMostrarEscenaForm(false);
  };

  const abrir = () => {
    var myReader = new FileReader();
    myReader.addEventListener("loadend", function (e) {
      console.log(e.srcElement.result); //prints a string
    });
    //start the reading process.

    fetch(
      "https://drive.google.com/uc?id=1sX0wMfdQdv64jk2pUdS-Ma_BZfrI6wGv&export=download",
      { mode: "no-cors" }
    ).then((x) => x.blob().then((y) => myReader.readAsText(y)));
  };

  // const handleRename = (values) => {
  //   googleAPI
  //     .renameFile(proyecto.id, proyecto.nombre)
  //     .then((res) => {
  //       alert("El archivo ha sido renombrado con Exito!!");
  //     })
  //     .catch((err) => {
  //       alert(
  //         "ERRRO: No pudo renombrarse el archivo, por favor, vuelva a loguearse y repita la operación."
  //       );
  //     });
  // };

  const addElemento = (values) => {
    console.log("VALUES QUE ENTRAN A ADD ELEMENTO: ", values);
    console.log(values);
    //  const tmpEscena = escena;
    const newElemento = {
      id: "" + Date.now(),
      nombre: values.nombre,
      position: { x: 18, y: -10, z: -22 },
      rotation: { x: 0, y: 0, z: 0 },
      tipo: parseInt(values.elemento),
    };

    //escena.elementos.push(newElemento)
    console.log("escena", escena);

    setEscena({ ...escena, elementos: [...escena.elementos, newElemento] });
    console.log("proyecto.escenas[escenaIndex]", proyecto.escenas[escenaIndex]);
    console.log("escenaIndex", escenaIndex);

    proyecto.escenas[escenaIndex] = {
      ...proyecto.escenas[escenaIndex],
      elementos: [...proyecto.escenas[escenaIndex].elementos, newElemento],
    };
    setProyecto({ ...proyecto });
    setCambiosGuardando(cambiosGuardando + 1);
    setMostrarElementosForm(false);
  };

  const tabItems = [
    {
      key: 1,
      label: "Opciones",
      children: (
        <>
          <Menu
            mode="inline"
            style={{ height: "100%" }}
            items={getMenuLateral()}
          />

          {/* <Divider orientation="left">Animation</Divider> */}
           <Divider style={{ fontSize:'.8rem' }}>conversor</Divider>
            <Button disabled={!modo}  danger onClick={manageConversorClick} >Convertir Experiencia</Button>
            <Divider></Divider>
          <Collapse
            items={[
              {
                key: "animate_option",
                label: "Configuración Animación",
                children: (
                  <>
                    {proyecto.isAnimated !== undefined && (
                      <div>
                        <Divider>Habilitar Animación</Divider>
                        <Switch
                          checked={proyecto.isAnimated}
                          style={{ marginTop: 10 }}
                          onChange={handleSwitchIsAnimated}
                          checkedChildren="On"
                          unCheckedChildren="Off"
                        />
                      </div>
                    )}
                  </>
                ),
              },
            ]}
          />

          <Collapse
            items={[
              {
                key: "carrito_option",
                label: "Configuración Carrito",
                children: (
                  <>
                    <Flex align="center" gap="small" vertical>
                      <Input
                        ref={inputUrlRef}
                        onChange={(e) => setUrlLink(e.target.value)}
                        placeholder="https://www.google.com/"
                        style={{ width: "100%" }}
                        value={urlLink}
                        onDoubleClick={handleDoubleClickUrlInput}
                      />
                      <Button onClick={handleUrlLink} type="primary">
                        Guardar
                      </Button>
                    </Flex>
                  </>
                ),
              },
            ]}
          />

          <Collapse
            items={[
              {
                key: "titulo_option",
                label: "Configuración Titulo",
                children: (
                  <>
                    <Flex align="center" gap="small" vertical>
                      <Input
                        ref={inputTitulo360Ref}
                        onChange={(e) => setTitulo360Value(e.target.value)}
                        placeholder="titulo para despliegue 360"
                        style={{ width: "100%" }}
                        value={titulo360Value}
                        onDoubleClick={handleDoubleClicTitulo360Input}
                      />
                      <Button onClick={handleTitulo360} type="primary">
                        Guardar Titulo
                      </Button>
                    </Flex>
                  </>
                ),
              },
            ]}
          />

          <Collapse
            items={[
              {
                key: "titulo_option",
                label: "Configuración Enlaces",
                children: (
                  <>
                    <FormEnlances enlaces={otras} handleSubmitEnlaces={handleSubmitEnlaces} setEnlaces={setOtras}/>
                  </>
                ),
              },
            ]}
          />

          {/* <Divider>Renombrar Archivo</Divider>
            <Button onClick={handleRename} >Rename</Button> */}

          {/* <Divider style={{ marginTop: "40px" }}>Redes Sociales</Divider> */}
          {/* <Flex align="center" gap="small" vertical>
            <Input
              ref={inputTwitterRef}
              placeholder="twitter.com"
              prefix={<TwitterOutlined style={{ color: "rgba(0,0,0,.90)" }} />}
              style={{ width: "100%" }}
              value={redesState.twitter}
              onDoubleClick={handleDoubleClicTwitterInput}
              onChange={(e) =>
                setRedesState({ ...redesState, twitter: e.target.value })
              }
            />
            <Input
              ref={inputFacebookRef}
              placeholder="facebook.com"
              prefix={<FacebookOutlined style={{ color: "rgba(0,0,0,.90)" }} />}
              style={{ width: "100%" }}
              value={redesState.facebook}
              onDoubleClick={handleDoubleClicFacebookInput}
              onChange={(e) =>
                setRedesState({ ...redesState, facebook: e.target.value })
              }
            />
            <Input
              ref={inputTwitterRef}
              placeholder="youtube.com"
              prefix={<YoutubeOutlined style={{ color: "rgba(0,0,0,.90)" }} />}
              style={{ width: "100%" }}
              value={redesState.youtube}
              onDoubleClick={handleDoubleClicYoutubeInput}
              onChange={(e) =>
                setRedesState({ ...redesState, youtube: e.target.value })
              }
            />

            <Button onClick={handleRedesSave} type="primary">
              Guardar Redes
            </Button>
          </Flex> */}
        </>
      ),
    },
    {
      key: 2,
      label: "Inspector",
      children: elemento ? (
        <ElementInspector
          proyecto={proyecto}
          elemento={elemento}
          guardarCambios={guardarCambiosElemento}
          eliminarElemento={eliminarElemento}
        />
      ) : (
        <SceneInspector escena={escena} guardarCambios={guardarCambiosEscena} />
      ),
    },
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      {proyecto.id ? (
        <Sider
          style={{
            background: colorBgContainer,
            //height: "70vh",
            height: "100%",
            overflow: "auto",
          }}
          width={250}
        >
          <Tabs
            items={tabItems}
            style={{ paddingLeft: 10 }}
            activeKey={activeTabKey}
            onChange={cambiarTabKey}
          />
        </Sider>
      ) : null}

      {/* <Layout style={{ height: "100vh" }}> */}
      <Layout style={{ height: "100vh" }}>
        <GuardandoQueue cantidad={cambiosGuardando} />
        <Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={items1}
            style={{
              flex: 1,
              minWidth: 0,
            }}
          />
          <Space direction="horizontal">
            <span style={{color: 'white', marginRight: 10 }}>Desea Trabajar con Backend o Drive?</span>
            <Switch defaultChecked checkedChildren="drive" unCheckedChildren="api" onChange={() => {setModo(prev=>!prev)}} />

        </Space>
        </Header>
        {/* <Content
          style={{
            padding: "0 48px",
          }}
        > */}
        {/* <Layout
            style={{
              padding: "24px 0",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          > */}
        {/* {proyecto.id?<Sider
            style={{
              background: colorBgContainer,              
               height: '70vh',
             // height: '100%',
              overflow: 'auto'
              
            }}
            width={250}
          >
            <Tabs items={tabItems} style={{paddingLeft: 10}} activeKey={activeTabKey} onChange={cambiarTabKey}/>            
          </Sider>:null} */}
        <Content
          style={{
            padding: "0 24px",
          }}
        >
          {proyecto.id ? (
            <T360view escena={escena} seleccionarElemento={setEditingElement} />
          ) : (
            <EmptyPage accion={setMostrarExperienciaForm} />
          )}
        </Content>
        {/* </Layout> */}
        {/* </Content> */}

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Griftin 360 Designer ©{new Date().getFullYear()}
          
        </Footer>
        {
            !authState.isLogged && !modo && <ModalFormLogin />

        }
        <LoadingSpin visible={loading} />
        <ArchivadasForm
          visible={mostrarArchivadasForm}
          archivadas={usuarioActivo.experiencias ?? []}
          eliminarExperiencia={eliminarExperiencia}
          alCerrar={() => setMostrarArchivadasForm(false)}
          alAceptar={(p) => {
            setProyecto(p);
            setMostrarArchivadasForm(false);
          }}
          modo={modo}
        />
        <ExperienciasForm
          visible={mostrarExperienciaForm}
          alCerrar={() => setMostrarExperienciaForm(false)}
          alAceptar={crearExperiencia}
        />
        <EscenaForm
          visible={mostrarEscenaForm}
          alCerrar={() => setMostrarEscenaForm(false)}
          alAceptar={addEscena}
          modo={modo}
        />
        <ElementosForm
          visible={mostrarElementosForm}
          alCerrar={() => setMostrarElementosForm(false)}
          alAceptar={addElemento}
        />
        <Publicar
          projectId={proyecto}
          visible={mostrarPublicar}
          alCerrar={() => setMostrarPublicar(false)}
        />
      </Layout>
      
    </Layout>
  );
};
export default BaseDesigner;
