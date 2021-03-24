import styled from 'styled-components';

export const ScrollView = styled.div`
  background-color: transparent;
  overflow: auto;
    display:flex;
    flex-direction:row !important;
    >div{
    :not(:first-child){
            margin-left:2.5rem;
        }

}
    
`;
