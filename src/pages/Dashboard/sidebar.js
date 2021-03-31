import React from "react";

import { SidebarStyled } from "./styles";

function Sidebar(props) {
  return (
    <SidebarStyled  style={props.view?{height:"auto"}:{}}>
      <div onClick={props.viewClick} >
        <span>{props.view?">":"<"}</span>
      </div>
      <div onClick={props.noticia} style={{display: props.view}}>
        <span>Notícias</span>
      </div>
      <div onClick={props.diretorio} style={{display: props.view}}>
        <span>Diretórios</span>
      </div>
      <div onClick={props.evento} style={{display: props.view}}>
        <span>Agendas</span>
      </div>
      <div onClick={props.curso} style={{display: props.view}}>
        <span>Cursos</span>
      </div>
      <div onClick={props.usuario} style={{display: props.view}}>
        <span>Usuários</span>
      </div>
      <div onClick={props.oportunidade} style={{display: props.view}}>
        <span>Oportunidades</span>
      </div>
      <div onClick={props.tag} style={{display: props.view}}>
        <span>Tags</span>
      </div>
      <div onClick={props.jobType} style={{display: props.view}}>
        <span>Tipos de Oportunidades</span>
      </div>
    </SidebarStyled>
  );
}

export default Sidebar;
