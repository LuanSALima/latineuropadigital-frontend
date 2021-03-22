import React from 'react';
import Header from '../../components/Header';
import { Page, ScreenView } from '../../styles/default';

function Notices() {
  return (
      <Page>
        <Header/>
        <ScreenView width={"90%"}>
          <h1>Hello Notices</h1>
        </ScreenView>
      </Page>
  );
}

export default Notices;