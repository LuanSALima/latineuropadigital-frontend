import styled from 'styled-components';

export const Container = styled.div`
  height:auto;
  width:325px;
  padding:0 !important;
  cursor:pointer;
`;
export const Image = styled.div`
    width:100%;
    padding:0 !important;
    img{
     height:380px;
     width:325px;   
     border-radius:0.2rem;
    }
    `;

export const Title = styled.div`
border-top:2px solid var(--color-blackPurple);
display:flex;
flex-direction:row;
align-items:center;
width:325px;   
>img{
margin-top:5px;
        width:40px;
        height:35px;
}
>label{
margin-top:5px;
    
    margin-left:10px;
    font-size:22px;
    text-transform:uppercase;
    font-weight:650;
    padding:0.2rem;
    color: var(--color-freela-text);
    overflow-wrap:break-word;

}
`;

export const Description = styled.div`
    >span{
    font-size:18px;
    padding:0.2rem;
    overflow-wrap:break-word;
    color: var(--color-freela-text);

    }
`;