const theme = {
  palette: {
    primary: {
      main: "rgb(0, 104, 120)",
      container: "rgb(166, 238, 255)",
      onContainer: "rgb(0, 78, 91)",
    },
    secondary: {
      main: "rgb(77, 92, 146)",
      container: "rgb(220, 225, 255)",
      onContainer: "rgb(52, 68, 121)",
    },
    tertiary: {
      main: "rgb(85, 93, 126)",
      container: "rgb(220, 225, 255)",
      onContainer: "rgb(61, 69, 101)",
    },
    error: {
      main: "rgb(186, 26, 26)",
      container: "rgb(255, 218, 214)",
      onContainer: "rgb(147, 0, 10)",
    },
    white: {
      main: "#ffffff",
    },
    background: {
      default: "rgb(245, 250, 252)",
      paper: "rgb(245, 250, 252)",
    },
    surface: {
      main: "rgb(245, 250, 252)",
      variant: "rgb(219, 228, 231)",
      dim: "rgb(213, 219, 221)",
      bright: "rgb(245, 250, 252)",
      container: {
        lowest: "rgb(255, 255, 255)",
        low: "rgb(239, 244, 246)",
        main: "rgb(233, 239, 241)",
        high: "rgb(228, 233, 235)",
        highest: "rgb(222, 227, 229)",
      },
    },
    onSurface: {
      main: "rgb(23, 29, 30)",
      variant: "rgb(63, 72, 75)",
    },
    outline: {
      main: "rgb(111, 121, 123)",
      variant: "rgb(191, 200, 203)",
    },
    inverse: {
      surface: "rgb(43, 49, 51)",
      onSurface: "rgb(236, 242, 243)",
      primary: "rgb(131, 210, 228)",
    },
    fixed: {
      primary: {
        main: "rgb(166, 238, 255)",
        dim: "rgb(131, 210, 228)",
        variant: "rgb(0, 78, 91)",
      },
      secondary: {
        main: "rgb(220, 225, 255)",
        dim: "rgb(182, 196, 255)",
        variant: "rgb(52, 68, 121)",
      },
      tertiary: {
        main: "rgb(220, 225, 255)",
        dim: "rgb(189, 197, 235)",
        variant: "rgb(61, 69, 101)",
      },
    },
  },
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
};

export default theme;
