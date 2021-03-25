import styled from "styled-components";

export const FooterStyles = styled.footer`
display: flex;
  /* justify-content: space-around; */
  align-items: center;
  min-height: 80px;
  height:auto;
  background-color: var(--color-freela-pink);
  padding: 0px 1rem 0px 1rem;
  justify-content:space-between;
    >div{
        padding:1rem;
        display:flex;
        flex-direction:column;
        padding:1.3rem 0rem 0rem 1rem;
     

        >label{
            font-size:18px;
        color: var(--color-freela-white);
    
        }
    }
    >a{
       >div{
        padding:1rem;
        display:flex;
        flex-direction:column;
        padding:1.3rem 0rem 0rem 1rem;
            margin-right:3rem;
            justify-content:center;
            text-align:center;
            border:1px solid var(--color-freela-white);
            >label{
            font-size:18px;
            margin-right:1rem;
            cursor:pointer;
        color: var(--color-freela-white);
      
          
        }
    }
`