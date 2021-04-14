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

     @media(max-width:650px){ 
        flex-direction:column;
        margin:0 !important;
    }
`;
export const Image = styled.div`
   
    img{
        min-width:150px;
        max-height:350;
        max-width:340px;
        height:320px;
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
    }
    @media(max-width:650px){
        img{

            min-width:150px;
            max-height:100%;
            max-width:100%;
            height:auto;
            margin:0 auto !important
        }
    }
    `;


export const Description = styled.div`
   width: inherit;
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

    @media(max-width:650px){
        flex-direction:column;
        margin-left:0 !important
    }

`;

export const Title = styled.div`
display:flex;
flex-direction:column;

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
@media(max-width:650px){
        flex-direction:column;
    }
`;

export const Time = styled.div`
text-align: end;
>span{
  font-size:14px;
  color: gray;
}
@media(max-width:650px){
        flex-direction:column;
    }
`;

export const Tag = styled.div`
  width: fit-content;
  float: left;
  margin-bottom:0.5rem;
  margin: 0 5px;
  
  >span{
    float: left;
    padding: 2px 10px;
    margin-bottom:0.25rem;
    color: white; 
    background-color: #2f2d2d;
    max-width: 175px;
    overflow-wrap: break-word;
  }
`;