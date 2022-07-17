import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";
import { store } from "./redux/app/store";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e65100",
      light: "#ffb74d",
      dark: "#ef6c00",
    },
    secondary: {
      main: "#9e9e9e",
      light: "#e0e0e0",
      dark: "#616161",
    },
    typography: {
      fontFamily: "Quicksand",
    },
  },
});

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
