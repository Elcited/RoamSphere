import { createGlobalStyle } from "styled-components";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const GlobalStyles = createGlobalStyle`
* {
  box-sizing:border-box;
  margin: 0;
  padding: 0;

  &::before, ::after {
    box-sizing: border-box
  }

}

html {
  font-size: 62.5%
}

body {
  font-family: 'Rubik', 'Noto Sans SC', sans-serif;
  color: #072126;
  line-height: 1.5;
  font-size: 1.6rem;
  background-color: #fff;

  :lang(zh) {
  font-family: 'Noto Sans SC', sans-serif; /* 仅对中文文本生效 */
}
}

h1 {
  font-weight:700;
}

`;

export default GlobalStyles;
