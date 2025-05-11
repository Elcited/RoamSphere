import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: "unset",
          padding: 0,
        },
        content: {
          margin: 0,
          "&.Mui-expanded": {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: 0,
          margin: 0,
        },
      },
    },
  },
});

export default theme;
