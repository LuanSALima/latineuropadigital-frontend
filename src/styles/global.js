import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
* {
margin:0;
padding:0;
outline:0;
box-sizing:border-box;

}
a {
text-decoration: none;
}
input,textarea {
border: 1.5px solid var(--color-blackPurple) !important;
transition:border 0.3s ease;
    transition:box-shadow 0.2s ease;
    :focus{
      border: 1px solid #1e1e1e !important;
    box-shadow: 1px 1px 3px 1px #2e2e2e;
}
}
button {
cursor: pointer;
border: 0;
background: none;
outline: 0 !important;
}
html, body, #root {
min-height: 100%;
width: 100%;
/* overflow-x:hidden; */
}

*, button, input,textarea {
border: 0;
background: none;
outline: 0 !important;
font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, Arial, sans-serif;
}

body{
    font:14px 'Roboto', sans-serif;
    -webkit-font-font-smoothing: antialiased !important;
    background:#fcffff;
    color:#333;
}

:root {
    --color-input: #ccc;
    --color-primary: #fff;
    --color-secondary: #000;
    --color-placeholder: hsl(0deg 0% 50%);
    --color-placeholder-secondary: #aaafb5;
    --border-active: #53aae9;
    --btn-bg: #2eac2b;
    --bg-dark: #0a0612;
    --bg-forms: #201d29;
    --bg-btn: #204f96;
    --bg-btn-hover: #0b50b8;
    --color-bestBlue:#4287f5;

  --color-background: #121214;
  --color-soft-green: #3dad66;
  --color-soft-red: #e83f5b;
  --color-soft-blue:#668cff;
  --color-soft-yellow: #f7df1e;

  --color-high-green: #119957;
  --color-high-red: #f51d41;
  --color-high-blue:#1a53ff;
  --color-high-yellow: #ebd105;

  --color-silver:#2e2c2c;
  --color-blackPurple:#150f21;
  --color-blackWhite:#d6d5d2;
  --color-orange: #fd951f;
  --color-white:#f5f5f5;
  --color-text: #a8a8b3;
  --color-support: #737380;
  --color-shape: #202024;
  --color-shape-hover: #29292e;
  --color-icons: #41414d;
  --color-borders: #323238;
  --color-black: #0d0d0f;
  --font-family-always: Helvetica, Arial, sans-serif;
  --font-weigth-text: 400;
  --font-size-text: 16px;
  --font-weight-between: 400;
  --font-size-between:21px;
  --font-weight-title: 700;
  --font-size-title: 28px;


  //Freelance color wireframe

  --color-freela-pink:#eb0069;
  --color-freela-white:#eeeeee;
  --color-freela-hover:#e3e1e1;
  --color-freela-highPink:#c40259;
  --color-freela-text:#1b1b1b;
}`;
