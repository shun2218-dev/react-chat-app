import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React, { ReactNode } from "react";
import { FC } from "react";

// blue: "#61DAFB",
// white: "#ffffff",
// gray: "#282C34",
// black: "#16171A",
// navy: "#20232A",
type ThemeProps = {
  children: ReactNode;
};

const ThemeContext: FC<ThemeProps> = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#61DAFB",
      },
      secondary: {
        main: "#282C34",
      },
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeContext;
