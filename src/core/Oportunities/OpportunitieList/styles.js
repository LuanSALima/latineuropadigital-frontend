import styled from "styled-components";
import { ScreenView } from "../../../styles/default";

export const MyCheckBoxList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  align-items: center;
  padding:1rem 0px;
  border-top:1px solid var(--color-freela-hover);
  > input {
    float: left;
    cursor: pointer;
    width: 16px !important;
    min-height:18px;
    margin: 0 !important ;
    :focus{
    box-shadow: 0px 0px 0px 0px white !important; 
    border:0px solid white !important; 
    }
  }
  > label {
    margin: 0 !important;
    margin-left:1rem !important;
    float: left;
    cursor: pointer;
    font-size: 18px;
    width: 90%;
  
  }
`;

export const MyScreenView = styled(ScreenView)`
  width: 100% !important;
  border-radius: 0.2rem;
  padding: 0 !important;
  background-color: white;
  margin: 0 !important;
  margin-top: 0.5rem !important;
  > h1 {
    margin: 0 auto;
    border-bottom: 1px solid var(--color-freela-white);

    @media (max-width: 975px) {
      font-size: 35px;
    }
  }
`;
