import React from 'react';
import ComumCard from '../../components/ComumCard';
import Header from '../../components/Header';
import { Page, ScreenView } from '../../styles/default';
import NotFoundMage from '../../assets/404.svg'

function NotFound() {
  return (
    <Page>
    <Header/>
    <ScreenView width={"65%"}>
    <ComumCard  text={"Se você está acessando a página por um link, entre em contato com o dono do l"+
    "ink ou o suporte da plataforma! clique em 'Retornar' para voltar a tela Inicial"}button={"Retornar"} 
    image={NotFoundMage}title={"Ops.. A Página não Foi Encontrada!!"}/>
    </ScreenView>
  </Page>)
}

export default NotFound;