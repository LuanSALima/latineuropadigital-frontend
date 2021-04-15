import styled from "styled-components";

export const MyImage = styled.div`
width:95%;
margin-left:0.65rem;
margin-bottom:1rem;


@media(max-width:650px){ 
max-height:100% !important;
}

img{
    min-width:150px;
       max-height:650px !important;
       max-width:100%;
       height:auto;
       margin:0 auto !important;
        display: flex;
        align-items: center;
        justify-content: center;
     border-radius:0.2rem;
     transition:transform 0.3s ease;
     :hover{
    -webkit-transform: scale(1.05);
    -ms-transform: scale(1.05);
    transform: scale(1.05);
     }
    
     @media(max-width:650px){
       

       min-width:150px;
       height:auto;
       margin:0 auto !important
}
    }
    

`;