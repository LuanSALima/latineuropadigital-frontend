import React from 'react';
import { MdStarBorder,MdStar } from 'react-icons/md';
import { AppButton } from '../../styles/default';

// import { Container } from './styles';


function Stars(props) {
  return (
      <div                                                                                                                                                      >
            <AppButton type="warning" onClick={props.onClick}>
            {props.isFeature?<MdStar size={30} color="yellow"/>:
            <MdStarBorder size={30} color="yellow"/>}
            </AppButton>
      </div>
  );
}

export default Stars;