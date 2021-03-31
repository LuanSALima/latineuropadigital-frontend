import styled from 'styled-components';
import { ScreenView } from '../../../styles/default';

export const MyScreenView = styled(ScreenView)`
background-color:white !important;
border-radius:1rem;
margin-top:5rem;  
>h1{
    margin:0 auto;
    border-bottom:1px solid var(--color-freela-white);
    @media(max-width:975px){
      font-size:35px;
      padding:1rem;
    }
}
`;

export const OportunityCard = styled.div`
background-color:var(--color-freela-pink);
color:var(--color-freela-white);
font-size:18px;
width:350px;
min-height:250px;
max-height:100vh;
height:auto;
margin-top:1rem;
border-radius:0.5rem;
padding:0 !important;
cursor:pointer;
transition:height 0.3s, width 0.3s ease;
:hover{
    width:355px;

cursor:pointer;
}

>label{
    margin:0 auto !important;
    font-size:26px;
    font-weight:560;
cursor:pointer;
    padding:1.6rem;
    text-transform:uppercase;
}
>span{
    padding:0.7rem 1rem ;
    font-size:18px !important;
    text-align:left;
    margin:0 auto;
    >b{
    }
}
`;