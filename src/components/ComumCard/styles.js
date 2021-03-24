import styled from "styled-components";

export const Container = styled.div`
text-align:center;
display:flex;
flex-direction:column;
height:auto;
padding:1rem;
>label{
  padding:1rem;
  color:var(--color-freela-text);
  font-size:25px;

}
`;
export const Description = styled.div`
    display:flex;
    flex-direction:column;
    width:95%;
    margin:0 auto;
    text-align:center;
    height:auto;
    padding:1rem;
    padding-bottom:3rem;
    height: 95%;
    
    >span{
        font-size:18px;
        width:95% ;
        color:var(--color-freela-text);
        padding:1rem;
        overflow-wrap:break-word;
        margin:0 auto;
    }
    >img{
        height:75%;
        width:100%;
        margin:0 auto;
        margin-top:1rem;
        padding:3rem;
        @media(min-width:1060px){
        width:50% !important;
}
    }
    >button{
  margin:0 auto;
  margin-top:3rem;
  border-radius:0.5rem;
  padding:1rem;
  width:45%;
  background-color:#6c63ff;
  transition: background-color 0.4s ease;
  color:white;

:hover{
  background-color:var(--color-soft-blue);
}
    }
`;