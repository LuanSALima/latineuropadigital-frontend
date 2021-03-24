import styled from "styled-components";
import { ScreenView } from "../../styles/default";
import bannerImage from '../../assets/banner.jpg';

export const MyView = styled(ScreenView)`
display:flex;
flex-direction:column;
margin:0;
padding:0 !important;
min-height:auto;

@media (max-width: 995px) {
    width:100% !important;
    margin-top :10px;
    >div{
      >label{
      font-size:22px !important;
    }
    }
  }

`;

    

export const Banner = styled.div`
height:auto;
        justify-content:center;
margin-top:0.6rem !important;
height:550px;
background-image: url(${bannerImage});
padding: 0 !important;
background-repeat:round;

@media(max-width:750px){
            height:350px;
            margin:0 !important;
        }
        @media(min-width:1600px){
            height:750px;
        }
>div{
    z-index:999;
    margin-top:1rem;
}
    

    `;