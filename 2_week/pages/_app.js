import 'react-app-polyfill/ie11'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Noto Sans KR'
    padding: 0;
    margin: 0;
  }

  p {
    margin: 0;
  }
`

const theme = {

}


function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp