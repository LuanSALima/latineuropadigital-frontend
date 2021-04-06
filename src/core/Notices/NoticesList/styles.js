import styled from 'styled-components';
import { ScreenView } from '../../../styles/default';

export const MyScreenView = styled(ScreenView)`
  width:100%;
  border-radius:0.2rem;
  background-color:white;
  margin-top:0.5rem !important;
>h1{
    margin:0 auto;
    border-bottom:1px solid var(--color-freela-white);

    @media(max-width:975px){
      font-size:35px;
      padding:1rem;
    }

}
`;
