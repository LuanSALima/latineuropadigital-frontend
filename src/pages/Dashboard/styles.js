import styled from 'styled-components';

export const Container = styled.div`
  
`;



//for sidebar


export const SidebarStyled = styled.div`
min-width:13vw;
width:auto;
background-color:var(--color-freela-white);
border-radius:0.3rem;
display:flex;
flex-direction:column;
position:absolute;
padding:0 !important;
margin-top:0.5rem;
left:0;
height:80%;
>div{
    display:flex;
    height:20%;
    width:100%;
    padding:0.3rem !important;
    cursor:pointer;
    justify-content:center;
    text-align:center;
    align-items:center;
    transition: background-color 0.3s ease;
    border-radius:0.3rem;
    
    
    :hover{
        background-color:var(--color-freela-hover);
    }

    >span{
        font-size:22px;
        font-weight:560;
    }
}
`;