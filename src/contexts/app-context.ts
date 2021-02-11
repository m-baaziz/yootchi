import React from "react";

import { ThemePreference } from "../types/theme-preference";

type AppContext = {
  stage: string;
  lang: string;
  theme: ThemePreference;
};

const appContext = React.createContext<AppContext>({
  stage: "prod",
  lang: "en",
  theme: "light",
});

export default appContext;
