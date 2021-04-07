import styled from 'styled-components';
export const Container = styled.div`
  display:flex;
  height:auto;
  max-height:auto;
  width:100%;
  min-height:140px;
  min-width:240px;
  cursor:pointer;
  margin-bottom:1rem;
  border:1px solid var(--color-freela-hover);
  padding:1rem !important;
   transition:box-shadow 0.3s ease;
    :hover{
    box-shadow: 2px 2px 10px 5px  var(--color-freela-hover);
    }
`;
export const Image = styled.div`
    width:350px;
    display:inline-block;
    display: flex;
    background-size:contain;      /* faz a imagem ficar contida dentro do elemento */
    background-repeat:no-repeat;  /* faz a imagem não ser repetida */
    background-position: center;  /* centra a imagem independentemente do tamanho ou largura do elemento */
    img{
        width:350px;
        max-height:100%;
        min-height:140px;
        min-width:240px;
        display: flex;
        align-items: center;
        justify-content: center;
     border-radius:0.2rem;
     transition:transform 0.3s ease;
     :hover{
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
     }
    }
    `;


export const Description = styled.div`
   margin-left:1rem;
   padding:1rem;
   >span{
    font-size:14px;
    padding:0.2rem;
    overflow-wrap:break-word;
    color: var(--color-freela-text);
    line-break:anywhere;
    overflow-wrap:break-word;
    }
`;

export const Title = styled.div`
display:flex;
flex-direction:column;
width:156px;   
>img{
        width:40px;
        height:35px;
        border-radius:0.5rem;
}
>span{
    font-size:14px !important;
    padding:0.2rem;
    overflow-wrap:break-word;
    color: var(--color-freela-text);
    overflow-wrap:break-word;
    line-break:anywhere;
}
>label{
    font-size:18px;
    text-transform:uppercase;
    font-weight:630;
    padding:0.2rem;
    color: var(--color-freela-pink);
    line-break:anywhere;
    overflow-wrap:break-word;
}
`;

