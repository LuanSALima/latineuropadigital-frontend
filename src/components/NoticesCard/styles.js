import styled from 'styled-components';
export const Container = styled.div`
  display:flex;
  height:auto;
  width:750px;
  cursor:pointer;
  margin-bottom:1rem;
  border-top:1px solid var(--color-freela-hover);
  padding:1rem !important;
   transition:box-shadow 0.3s ease;
    :hover{
    box-shadow: 2px 2px 10px 5px  var(--color-freela-hover);
    }
`;
export const Image = styled.div`
    width:100%;
    img{
     width: 400px;
     max-height:250px;
     border-radius:0.2rem;
     transition:transform 0.3s ease;
     :hover{
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
     }
    }
    `;

export const Title = styled.div`
display:flex;
flex-direction:column;
width:256px;   
>img{
        width:40px;
        height:35px;
        border-radius:0.5rem;
}
>span{
    font-size:18px;
    padding:0.2rem;
    overflow-wrap:break-word;
    color: var(--color-freela-text);
}
>label{
    font-size:20px;
    text-transform:uppercase;
    font-weight:630;
    padding:0.2rem;
    color: var(--color-freela-pink);
    overflow-wrap:break-word;
}
`;

export const Description = styled.div`
   margin-left:1rem;
   padding:1rem;
   >span{
    font-size:18px;
    padding:0.2rem;
    overflow-wrap:break-word;
    color: var(--color-freela-text);
    }
`;