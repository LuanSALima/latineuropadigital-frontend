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
    <ComumCard  text={"Si accede a la página a través de un enlace, póngase en contacto con el propietario del enlace o con el soporte de la plataforma. haga clic en 'Volver' para volver a la pantalla de inicio"}button={"Volver"} 
    image={NotFoundMage}title={"Ups .. ¡¡La página no fue encontrada !!"}/>
    </ScreenView>
  </Page>)
}

export default NotFound;