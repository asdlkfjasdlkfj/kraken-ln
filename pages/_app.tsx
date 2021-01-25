import {
  createGlobalStyle,
  ThemeProvider,
  DefaultTheme,
} from "styled-components";
import type { AppProps } from "next/app";
import Head from "next/head";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-family: ${(props) => props.theme.fonts.sans}
  }

  h1,h2,h3,h4,h5,h6{
    font-weight: normal;
  }

  * {
    box-sizing: border-box;
  }
`;

const theme: DefaultTheme = {
  colors: {
    surfacePrimary: "#2824b6",
    surfaceContrast: "#242424",
    surfaceDefault: "#fff",
    color: "#333",
    colorInverse: "#fff",
    colorHeader: "#242424",
    colorDim: "#b7b7b7",
    colorLink: "#2824b6",
    colorLinkHover: "#41309e",
  },
  fonts: {
    sans: "Poppins, sans-serif",
    mono: "Roboto Mono,Consolas,Menlo,Courier New,monospace",
  },
  sizes: {
    maxWidth: 1100,
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;700&family=Roboto+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
