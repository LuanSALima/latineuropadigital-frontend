import styled, { css } from "styled-components";

export const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  background-color: #edf4f5;
`;

export const ContentView = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;

  > label {
    font-size: 25px;
    text-align: center;
  }
  > input {
    margin-top: 1rem !important;
    width: 65% !important;
    height: 45px !important;
    border:1px solid var(--color-freela-text);
  }

  > div {
    padding: 0 !important;
    margin: 0 auto !important;
    justify-content: center !important;
    > label {
      margin: 0 auto !important;
      margin: 2rem !important;
      text-align: center;
      color: var(--color-freela-text);
      font-size: 20px;
      > svg {
        margin-left: 1rem;
        font-size: 35px !important;
        color: var(--color-freela-pink) !important;
      }
    }
    > input[type="file"] {
      border: 0px !important;
      padding: 0rem !important;
      margin-top: 2rem !important;
      margin-bottom: 1rem !important;
      display: none !important;
      ::-webkit-file-upload-button {
        color: white;
        display: inline-block;
        background: #1cb6e0;
        border: none;
        padding: 7px 15px;
        font-weight: 700;
        border-radius: 3px;
        white-space: nowrap;
        cursor: pointer;
        font-size: 10pt;
      }
    }

    > img {
      height: 350px;
      width: 100%;
      margin-bottom: 1rem;
      border-radius: 0.3rem;
    }
  }
  > a {
    color: var(--color-high-blue) !important;
    cursor: pointer;
    text-align: center;
    margin-top: 1rem;
    padding: 1rem 0rem 1rem 0rem;
  }
  > button {
    margin-top: 1rem !important;
    width: 65%;
    font-size: 20px !important;
  }
`;

export const FeatureContent = styled.div`
  width: fit-content;
  margin-top: 0.4rem !important;
  font-size: 22.5px;
  text-transform: uppercase;
  font-style: bold;
  color: var(--color-freela-white);
  text-align: left;
  background-color: var(--color-freela-pink);
  display: flex;
  padding: 0.3rem 6rem 0.5rem 2.5rem !important;
`;
export const LittleFeatureContent = styled.div`
  width: fit-content;
  font-size: 17px;
  display: flex;
  margin-top: 5px !important;
  font-style: bold;
  color: var(--color-freela-white);
  background-color: var(--color-freela-text);
  display: flex;
  padding: 0.3rem 8rem 0.3rem 4rem !important;
  justify-content: center;
`;
const myView = css`
  width: ${(props) => (props.width ? props.width : "75%")};
  justify-content: ${(props) => (props.center ? "center" : "0")};
  height: auto;
  min-height: ${(props) => (props.height ? props.height : "100vh")};
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  padding: 1rem 1rem 3rem 1rem;
  margin-top: 5rem !important;
  margin-bottom: 1.5rem !important;
  background-color: #fff;
  border-radius: 0.25rem;
  > label {
    padding: 1rem;
    font-size: var(--font-size-title);
    color: black;
  }

  > div {
    padding: 1rem;
    display: flex;
    flex-direction: column;

    > fieldset {
      width: 64%;
      margin: 0 auto;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    > textarea,
    input {
      width: 70%;
      border-radius: 0.3rem;
      display: flex;
      padding: 1rem;
      margin: 0 auto;
      margin-top: 1rem;
      resize: none;
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
    width: 95% !important;
    margin-top: 10px;
    > div {
      > label {
        font-size: 22px !important;
      }
      > input {
        width: 90% !important;
        height: 45px !important;
      }
    }
  }
`;

export const MyFilteredOptions = styled.fieldset`
  width: 30%;
  margin-inline-start: auto;
  padding: 1rem;
  @media (max-width: 700px) {
    width: 45%;
  }
`;
export const Form = styled.form`
  ${myView};
  border: ${(props) => (!props.nullBorder ? "1px solid #1e1e1e" : null)};
  box-shadow: ${(props) => (!props.nullBox ? "2px 2px 6px 2px #2e2e2e" : null)};
`;

export const ScreenView = styled.div`
  ${myView};
  background-color: transparent;
`;

export const TwoDivided = styled.div`
  width: 100%;
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: row;
  > div {
    margin-left: 1rem;
  }
  > form {
    padding: 1rem;
    margin-left: 1rem;
  }

  @media (max-width: 1060px) {
    flex-direction: column;
    > div {
      margin: 0;
      width: 100% !important;
      > div {
        > div {
          > img {
            width: 250px;
          }
        }
      }
    }
    > form {
      margin: 0;
      margin-top: 1rem;
      width: 100% !important;
    }
  }
`;

////////////////////////////////////////

//for side bar after links

export const MySideBarCard = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 1rem;
  border: 1px solid var(--color-freela-hover);
  padding: 10px;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: box-shadow 0.3s ease;
  :hover {
    box-shadow: 1px 1px 10px 3px var(--color-freela-hover);
  }
  > img {
    width: 100%;
    height: 100%;
    max-height: 530px;
    max-width: 275px !important;
    transition: transform 0.3s ease;
    :hover {
      transform: scale(1.02);
    }
  }
  > span {
    color: var(--color-freela-text);
    font-size: 18px;
    margin-top: 1rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    display: block;
    overflow: hidden;
  }
`;

export const MySideCardLink = styled.div`
  float: left;
  width: 25%;
  cursor: pointer;
  > img {
    padding-top: 1rem;
    width: 100%;
    height: 100%;
    min-height: 200px;
    margin-top: 1rem;
    border-top: 1px solid var(--color-freela-hover);
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;
//Englobing all Div maps
export const MyCardMap = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 75%;
  float: left;

  > h2 {
    margin: 0 auto;
    width: 100%;
    justify-content: center;
    padding-bottom: 2rem;
    text-align: center;
  }
  @media (max-width: 1600px) {
    width: 75%;
  }

  @media (max-width: 1000px) {
    width: 100%;
  }
`;
//When a englobe all card
export const MyCardLink = styled.div`
  width: 95%;
  margin-left: 0.65rem;
  margin-bottom: 1rem;
  max-height: 400px;
  @media (min-width: 1600px) {
    width: 48%;
    margin-left: 10px !important;
  }

  @media (max-width: 650px) {
    max-height: 100% !important;
  }
  > a {
    max-width: 100%;
  }
`;
//////////////////////////////////////

//For Details view
export const Details = styled(ScreenView)`
  background-color: white !important;
  padding: 2rem !important;
  //title
  > label {
    margin-top: 1rem;
    margin: 0 auto;
  }
  //subtitle
  > h3 {
    margin: 0 auto;
  }

  > img {
    height: 450px;
    background-color: var(--color-freela-white);
    border-radius: 0.3rem;
  }
  //contenido
  > h4 {
    margin: 0 auto;
    margin-top: 1rem;
  }
  //content
  > span {
    margin-top: 1rem;
    padding: 0.5rem;
    text-align: justify;
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

export const ProgressBar = styled.div`
  width: ${(props) => (props.width ? props.width : "0%")};
  height: 30px;
  line-height: 30px;
  color: white;
  background-color: blue;
  text-align: center;
  transition: width 0.6s ease;
`;

export const FormBlock = styled.div`
  display: block !important;
`;

export const FormColumn = styled.div`
  width: 50%;
  float: left;
`;

export const FormGroup = styled.div`
  padding: 15px;

  input {
    width: 100% !important;
    height: 30px;
    border: 1px solid gray !important;
    border-radius: 0 !important;
    margin-top: 0 !important;
  }

  textarea {
    width: 100%;
    height: 80px;
    margin-top: 0;
    padding: 10px;
  }

  select {
    width: 100%;
    padding: 10px;
    font-size: 17px;
    border: 1px solid gray;
    option {
      font-size: 17px;
    }
  }

  fieldset {
    input {
      border: 0 !important;
      height: 24px;
    }
    input:focus {
      border: 0 !important;
      box-shadow: 0 0 !important;
    }
  }
`;

export const Required = styled.span`
  color: red;
`;

export const CharLimit = styled.div`
  width: 100%;
  text-align: center;
`;

export const DetailsBlock = styled.div`
  width: 100%;
  display: flex;
  padding: 0px 10px;
  height: fit-content;
`;

export const DetailsColumn = styled.div`
  width: 50%;
  display: flex;
  flex-direction:column;
  float: left;
  justify-items:start;
`;

export const DetailsItem = styled.div`
  display: flex;
  width:95%;

  p {
    align-items:center !important;
    font-size: 20px;
    margin-left:1.3rem;
    color:var(--color-freela-pink);
  }

  span {
    font-size: 18px;
    margin-inline-start:auto;
    margin-right:1rem;
  }

`;

export const RelativeDetailsBlock = styled.div`
  display: inline-grid;
  width: 49% !important;
  height: fit-content;
  position: relative;
  z-index: 10;

  button {
    width: 50%;
    padding: 0.8rem 1.5rem;
    margin: 0 auto;
    border-radius: 0.3rem;
    cursor: pointer;
    font-size: var(--font-size-text);
  }
`;