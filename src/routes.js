import React from "react";
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import LoginForm from "./components/loginForm";
import BaseDesigner from "./components/basedesigner";
import Player360 from "./components/player";
import { Analiticas } from "./analiticas/componentes/Analiticas";

export default function Routes({ googleAPI, usuarioActivo, setUsuarioActivo }){
  return (
    <Router>
      <Switch>
        <Route exact path="/" 
          element={ !usuarioActivo
            ? <LoginForm googleAPI={googleAPI}/>
            : <BaseDesigner usuarioActivo={usuarioActivo} setUsuarioActivo={setUsuarioActivo} googleAPI={googleAPI}
          />} 
        />
        <Route path="/player/:proyectId?" element={<Player360/>} />
        <Route path="/analiticas" element={<Analiticas/>} />
      </Switch>      
    </Router>
  );
};

