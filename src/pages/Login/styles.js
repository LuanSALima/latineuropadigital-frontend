import styled from "styled-components";

export const ContentLogin = styled.div`
      margin: 0 auto;
      display:flex;
      flex-direction:column;
      width: 100%;

    >label{
     font-size:25px; 
     text-align:center
     }
     >input{
         margin-top:2rem !important;
         width:65% !important;
     }
     >a{
        color:var(--color-high-blue) !important;
        cursor:pointer;
        text-align:center;
        margin-top:1rem;
        padding:1rem 0rem 1rem 0rem;
     }
     >button{
         margin-top:2rem !important;
         width:80%;
         font-size:20px !important;
     }
  `;