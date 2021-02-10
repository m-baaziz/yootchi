import React from "react";

import { ThemePreference } from "./types/themePreference";

const AppContext = React.createContext({
  stage: "prod",
  lang: "en",
  theme: ThemePreference,
});

export default AppContext;
