import React from "react";

import { SidebarStyled } from "./styles";

function Sidebar(props) {
  return (
    <SidebarStyled>
      <div onClick={props.noticia}>
        <span>Notícias</span>
      </div>
      <div onClick={props.diretorio}>
        <span>Diretórios</span>
      </div>
      <div onClick={props.evento}>
        <span>Agendas</span>
      </div>
      <div onClick={props.curso}>
        <span>Cursos</span>
      </div>
      <div onClick={props.usuario}>
        <span>Usuários</span>
      </div>
      <div onClick={props.oportunidade}>
        <span>Oportunidades</span>
      </div>
      <div onClick={props.tag}>
        <span>Tags</span>
      </div>
      <div onClick={props.jobType}>
        <span>Tipos de Oportunidades</span>
      </div>
    </SidebarStyled>
  );
}

export default Sidebar;
