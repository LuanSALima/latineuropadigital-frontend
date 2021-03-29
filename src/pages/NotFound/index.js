import React from 'react';
import ComumCard from '../../components/ComumCard';
import Header from '../../components/Header';
import { Page } from '../../styles/default';
import NotFoundMage from '../../assets/404.svg'
import Footer from '../../components/Footer';
import { MyView } from './styles';
import history from '../../services/history/history'
function NotFound() {
  return (
    <Page>
    <Header/>
    <MyView width={"65%"}>
    <ComumCard  text={"Si accede a la página a través de un enlace, póngase en contacto con el propietario del enlace o con el soporte de la plataforma. haga clic en 'Volver' para volver a la pantalla de inicio"}button={"Volver"} 
    onClick={()=>{history.push('/')}}
    image={NotFoundMage}title={"Ups .. ¡¡La página no fue encontrada !!"}/>
    </MyView>
    <Footer/>
  </Page>)
}

export default NotFound;