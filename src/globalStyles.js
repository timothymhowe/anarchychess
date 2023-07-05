import { createGlobalStyle } from 'styled-components';
import ms_sans_serif from './assets/fonts/w95fa.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';
import { styleReset } from 'react95';

const GlobalStyle = createGlobalStyle`
${styleReset}
@font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body, input, select, textarea, button {
    font-family: 'ms_sans_serif';
  }
  background-color:#008080
`

export default GlobalStyle;