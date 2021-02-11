import React from "react";
import type { AppProps } from "next/app";
import { useMediaQuery } from "@material-ui/core";
import { CookiesProvider } from "react-cookie";

import Layout from "../src/components/layout/Layout";

import AppContext from "../src/contexts/app-context";

import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  const preferLightTheme = useMediaQuery("(prefers-color-scheme: light)");

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <CookiesProvider>
      <AppContext.Provider
        value={{
          stage: "dev",
          lang: "en",
          theme: preferLightTheme ? "light" : "dark",
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContext.Provider>
    </CookiesProvider>
  );
}

export default MyApp;
