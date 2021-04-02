import React from 'react';
import { MdStarBorder,MdStar } from 'react-icons/md';
import { AppButton } from '../../styles/default';
import { Feature } from './styles';

// import { Container } from './styles';


function Stars(props) {
  return (
      <Feature                                                                                                                                                      >
            <AppButton type="warning" onClick={props.onClick}>
            {props.isFeature?<MdStar size={30} color="yellow"/>:
            <MdStarBorder size={30} color="yellow"/>}
            </AppButton>
      </Feature>
  );
}

export default Stars;