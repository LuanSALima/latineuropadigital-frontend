import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
* {
margin: 0;
padding: 0;
box-sizing: border-box;
font-size:var(--font-size-text);
font-weight:var(--font-weigth-text);
  background-color:black;

}
a {
text-decoration: none;
}
input {
border: 1.5px solid var(--color-blackPurple) !important;
transition:border 0.3s ease;
    transition:box-shadow 0.2s ease;
    :focus{
      border:1.5px solid var(--color-soft-blue) !important;
      box-shadow: 0px 0px 2.5px 0.7px  var(--color-high-green);
}
}
button {
cursor: pointer;
}
html, body, #root {
font-size: 14px;
min-height: 100%;
width: 100%;
-webkit-font-font-smoothing: antialiased !important;
font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, Arial, sans-serif;

}
*, button, input {
border: 0;
background: none;
outline: 0 !important;
font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, Arial, sans-serif;
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
}`;
