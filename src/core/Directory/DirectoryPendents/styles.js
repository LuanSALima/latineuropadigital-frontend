import styled from 'styled-components';
import { ScreenView } from '../../../styles/default';

export const MyScreenView = styled(ScreenView)`
  width:90%;
  border-radius:1rem;
  background-color:white;
>h1{
    margin:0 auto;
    border-bottom:1px solid var(--color-freela-white);

    @media(max-width:975px){
      font-size:35px;
      padding:1rem;
    }
}
`;
