import styled from 'styled-components';

export const TitleView = styled.label`
margin:0 !important;
margin-left:1.5rem !important;
text-transform:uppercase;
font-size:22px;
font-weight:750;
color:black;
padding:0 !important;
letter-spacing:1px;
`;

export const SubtitleView = styled.span`
margin:0 !important;
padding:0 !important;
width:75%;
overflow-wrap: break-word;
margin-left:1.5rem !important;
color:var(--color-freela-text);
font-size:18px;

`;

export const ScrollView = styled.div`
  background-color: transparent;
  overflow: auto;
  margin-bottom:1rem !important;
    display:flex;
    flex-direction:row !important;
    >div{
    :not(:first-child){
            margin-left:2.5rem;
        }

}
    
`;
