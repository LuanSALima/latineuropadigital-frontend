import styled, { css } from "styled-components";



export const Page = styled.div`
  width: 100%;
  min-height:100vh;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  background-color: #edf4f5;
`;

const myView = css`
  width: ${props=>props.width? props.width:"70%"};
  height:auto;
  min-height: 80vh;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  margin-top:1rem;
  padding: 1rem 1rem 3rem 1rem;
  
  background-color: var(--color-primary);
  border-radius: 0.5rem;
  min-height: 80vh;
  > label {
    padding: 1rem;
    font-size: var(--font-size-title);
    color: black;
  }

  > div {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    > input {
      width: 70%;
      border-radius: 0.3rem;
      display: flex;
      padding: 1rem;
      margin: 0 auto;
      margin-top: 1rem;
    }
    > button {
      padding: 0.5rem 2rem 0.5rem 2rem;
      margin: 0 auto;
      border-radius: 0.3rem;
      cursor: pointer;
      font-size: var(--font-size-text);
      color: black;
      margin-top: 1rem;
      border: 1px solid black;
    }
  }
`;

export const Form = styled.form`
${myView};
border: 1px solid #1e1e1e,;
box-shadow: 2px 2px 6px 2px #2e2e2e;
`;

export const ScreenView = styled.div`
${myView};
  background-color:transparent !important;
`;

export const TwoDivided = styled.div`
width:100%;
padding:1rem;
height:100%;
display:flex;
flex-direction:row;
>div{
  margin-left:1rem;
}
>form{
  padding:1rem;
  margin-left:1rem;
}

@media(max-width:1060px){
flex-direction:column;
>div{
  margin:0;
  width:100% !important;
  >div{
    >div{

  >img{
    width:250px;
  }
    }
  }
}
>form{
  margin:0;
  margin-top:1rem;
  width:100% !important;
}
}


`;



//Buttons (Four types, danger, succes, succes and default.)
export const AppButton = styled.button`
  background-color: ${(props) =>
    props.type === "success"
      ? "var(--color-soft-green)"
      : props.type === "danger"
      ? "var(--color-soft-red)"
      : props.type === "warning"
      ? "var(--color-soft-yellow)"
      : "var(--color-soft-blue)"};
  border-color: transparent !important;
  color: var(--color-white) !important;
  cursor: pointer;
  transition: background-color 0.3s ease-in;

  :hover {
    background-color: ${(props) =>
      props.type === "success"
        ? "var(--color-high-green)"
        : props.type === "danger"
        ? "var(--color-high-red)"
        : props.type === "warning"
        ? "var(--color-high-yellow)"
        : "var(--color-high-blue)"};
  }
`;
export const Outline_Button = styled.button`
  background-color: transparent !important;
  border-color: ${(props) =>
    props.type === "success"
      ? "var(--color-high-green)"
      : props.type === "danger"
      ? "var(--color-high-red)"
      : props.type === "warning"
      ? "var(--color-high-yellow)"
      : "var(--color-high-blue)"} !important;
  color: ${(props) =>
    props.type === "success"
      ? "var(--color-high-green)"
      : props.type === "danger"
      ? "var(--color-high-red)"
      : props.type === "warning"
      ? "var(--color-high-yellow)"
      : "var(--color-high-blue)"} !important;
  cursor: pointer;
  transition: background-color 0.3s ease-in;

  :hover {
    background-color: ${(props) =>
      props.type === "success"
        ? "var(--color-high-green)"
        : props.type === "danger"
        ? "var(--color-high-red)"
        : props.type === "warning"
        ? "var(--color-high-yellow)"
        : "var(--color-high-blue)"} !important;

    color: white !important;
  }
`;
