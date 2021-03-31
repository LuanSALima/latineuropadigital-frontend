import styled from 'styled-components';

 
export const SidebarStyled = styled.div`
min-width:18vw !important;
width:auto;
background-color:var(--color-freela-white);
border-radius:0.3rem;
display:flex;
flex-direction:column;
position:absolute;
padding:0 !important;
margin-top:4rem;
left:0;
height:80%;
z-index:9999;

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

@media (max-width: 995px) {
max-width:25vw;
width:auto;
background-color:var(--color-freela-white);
border-radius:0.3rem;
display:flex;
flex-direction:column !important;
position:absolute;
margin-top:0 !important;
padding:0 !important;
>div{
    display:flex;
    height:100%;
    width:100%;
    padding:0.3rem !important;
    cursor:pointer;
    justify-content:center;
    text-align:center;
    align-items:center;
    padding:0.5rem;
    transition: background-color 0.3s ease;
    border-radius:0.3rem;
    
    
    :hover{
        background-color:var(--color-freela-hover);
    }

    >span{
        font-size:13px;
        font-weight:560;
    }
}
}
`;

export const Content = styled.div`
display:flex;
width: ${(props)=>props.view?"100%":"75%"};
height:auto;
margin:0 auto;
padding:1rem!important;
position:absolute;
right:0;
>h1{
    margin:0 auto;
    padding:1rem;
}
>table{
    margin-top:2rem;
    width:100% !important;
}
`;