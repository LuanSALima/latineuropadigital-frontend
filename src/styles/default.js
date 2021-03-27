import styled, { css } from "styled-components";



export const Page = styled.div`
  width: 100%;
  min-height:100vh;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  background-color: #edf4f5;
`;

export const ContentView = styled.div`
  margin: 0 auto;
      display:flex;
      flex-direction:column;
      width: 100%;

    >label{
     font-size:25px; 
     text-align:center
     }
     >input{
         margin-top:1rem !important;
         width:65% !important;
         height:45px !important;
     }
     >a{
        color:var(--color-high-blue) !important;
        cursor:pointer;
        text-align:center;
        margin-top:1rem;
        padding:1rem 0rem 1rem 0rem;
     }
     >button{
         margin-top:2rem !important;
         width:80%;
         font-size:20px !important;
     }`

  export const FeatureContent = styled.div`
  width:fit-content;
  margin-top:1rem;
  font-size:23px;
  text-transform:uppercase;
  font-style:bold;
  color:var(--color-freela-white);
  text-align:left;
  background-color:var(--color-freela-pink);
  display:flex;
  padding:0.5rem 6rem 0.5rem 1rem !important;

`;
  export const LittleFeatureContent = styled.div`
  width:fit-content;
  font-size:17px;
  display:flex;
  margin-top:5px !important;
  font-style:bold;
  color:var(--color-freela-white);
  background-color:var(--color-freela-text);
  display:flex;
  padding:0.3rem 8rem 0.3rem 4rem !important;
  justify-content:center;
`;
const myView = css`
  width: ${props=>props.width? props.width:"75%"};
  justify-content:${(props)=>props.center?"center":"0"};
  height:auto;
  min-height: 80vh;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  margin-top:45px;
  padding: 1rem 1rem 3rem 1rem;
  margin-bottom:4rem !important;
  
  background-color:#fff;
  border-radius: 0.3rem;
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
  @media (max-width: 995px) {
    width:95% !important;
    margin-top :10px;
    >div{
      >label{
      font-size:22px !important;
    }
      >input{
        width:90% !important;
        height: 45px !important;
      }
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
      : "var(--color-freela-pink)"};
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
        : "var(--color-freela-highPink)"};
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
