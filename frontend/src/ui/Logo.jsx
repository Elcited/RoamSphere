import React from "react";

const Logo = () => {
  const styles = {
    "--color-brand-1": "#4cede1",
    "--color-brand-2": "#ffc53a",
    "--color-brand-3": "#ff858d",
    "--color-gradient":
      "linear-gradient(20deg, #00F8F1, #FFBD1E 43%, #FE848F 94%)",
    "--color-white": "#fcfefe",
    "--color-white-light": "#f6f6f6",
    "--color-black": "#093740",
    "--color-black-dark": "#041d22",
    "--color-black-light": "#1f444d",
    "--color-black-lighter": "#0B4550",
    "--color-gray": "#a4a4a4",
    "--color-gray-red": "#f3f3f3",
    "--color-heading": "#093740",
    "--color-text": "#093740",
    "--font-family-fraktion": '"Fraktion Mono", monospace',
    "--font-family-monument": '"Monument Extended", sans-serif',
    "--font-family-mono": "var(--font-family-fraktion)",
    "--font-family-sans": "var(--font-family-monument)",
    "--font-family-heading": "var(--font-family-sans)",
    "--font-family-text": "var(--font-family-mono)",
    "--font-size-base": "16px",
    "--font-weight-base": "400",
    "--font-height-base": "1.48",
    "--font-family-base": "var(--font-family-text)",
    "--font-spacing-base": "-.025em",
    "--font-size-h-sm": "1.375rem",
    "--font-weight-h-sm": "400",
    "--font-height-h-sm": "1.4287",
    "--font-family-h-sm": "var(--font-family-heading)",
    "--font-size-t-md": "1rem",
    "--font-weight-t-md": "300",
    "--font-height-t-md": "1.48",
    "--font-family-t-md": "var(--font-family-text)",
    "--font-size-t-sm": ".875rem",
    "--font-weight-t-sm": "400",
    "--font-height-t-sm": "1.48",
    "--font-family-t-sm": "var(--font-family-text)",
    "--font-size-h-xl": "clamp(3.5rem, 4.25vw, 4.375rem)",
    "--font-weight-h-xl": "400",
    "--font-height-h-xl": "1.4287",
    "--font-family-h-xl": "var(--font-family-heading)",
    "--font-size-h-lg": "clamp(3.2rem, 3.33vw, 4rem)",
    "--font-weight-h-lg": "400",
    "--font-height-h-lg": "1.4287",
    "--font-family-h-lg": "var(--font-family-heading)",
    "--font-size-h-md": "clamp(2.8rem, 2.9vw, 3.5rem)",
    "--font-weight-h-md": "400",
    "--font-height-h-md": "1.4287",
    "--font-family-h-md": "var(--font-family-heading)",
    "--font-size-t-lg": "1.125rem",
    "--font-weight-t-lg": "300",
    "--font-height-t-lg": "1.48",
    "--font-family-t-lg": "var(--font-family-text)",
    "--container-max-width": "120rem",
    "--grid-column-abs-width": ".07228",
    "--grid-gutter-abs-width": ".01204",
    "--scrollbar-width": "calc( (var(--vw) - var(--cw)) * 100 )",
    "--container-abs-offset":
      "calc( 50% - min(50vw, (var(--container-max-width) / 2)) + (var(--container-offset) / 2) + min(max(calc( (var(--container-max-width) / 2) - 50vw + (var(--scrollbar-width) / 2) ), 0px), calc( var(--scrollbar-width) / 2 )) )",
    "--grid-width":
      "min(calc(100vw - var(--container-offset) - var(--scrollbar-width)), calc(var(--container-max-width) - var(--container-offset)))",
    "--grid-column-width":
      "calc( var(--grid-width) * var(--grid-column-abs-width) )",
    "--grid-gutter-width":
      "calc( var(--grid-width) * var(--grid-gutter-abs-width) )",
    "--card-width": "calc( var(--font-size-h-sm) * 18 )",
    "--card-height": "var(--card-width)",
    "--card-gutter": "calc( var(--font-size-h-sm) * 1.8 )",
    "--container-offset": "12rem",
    "--logo-path":
      'path("M4.378 0H0v3.304h4.378V0ZM4.282 4.811H.07v12.377h4.213V4.811ZM14.803 4.332c-1.765 0-3.225.647-4.19 1.723V4.809H6.4v12.377h4.213v-6.464c.023-2.49 1.413-3.015 2.823-3.015 1.176 0 2.214.455 2.214 2.057v7.422h4.236v-8.33c0-2.945-1.766-4.524-5.083-4.524ZM29.276 7.636c2.119 0 3.271.55 3.696 2.13l3.907-.358c-.66-3.374-3.413-5.076-7.553-5.076-4.777 0-7.978 2.587-7.978 6.655s3.201 6.678 7.978 6.678c4.048 0 6.894-1.723 7.553-5.1l-3.907-.358c-.425 1.58-1.578 2.13-3.696 2.13-2.305 0-3.695-1.507-3.695-3.35 0-2.084 1.39-3.351 3.695-3.351ZM42.67 7.468h-.165V4.811h-4.049v12.377h4.095v-3.997c0-3.471 1.578-4.788 4.66-4.788v-4.07c-2.377 0-4.07 1.196-4.542 3.135ZM56.083 14.364c-1.977 0-3.532-.79-3.812-2.513h11.18v-.982c0-4.69-3.436-6.56-7.718-6.56-4.635 0-7.695 2.369-7.695 6.704 0 4.335 3.202 6.655 8.073 6.655 3.413 0 6.213-1.103 7.366-4.356l-4.14-.503c-.59 1.15-1.743 1.555-3.249 1.555h-.005Zm-.096-7.11c1.482 0 2.635.55 3.083 1.652h-6.542c.564-1.196 1.789-1.652 3.46-1.652ZM75.806 6.008c-.823-1.029-2.424-1.676-4.26-1.676-3.836 0-6.92 2.346-6.92 6.705 0 4.358 3.084 6.63 6.92 6.63 1.954 0 3.624-.67 4.401-1.819l.096 1.34h4.002V0h-4.236v6.008h-.003Zm-3.294 8.162c-2.237 0-3.647-1.22-3.647-3.136 0-1.917 1.413-3.207 3.647-3.207s3.647 1.243 3.647 3.207c0 1.963-1.413 3.136-3.647 3.136ZM86.466 0h-4.378v3.304h4.378V0ZM86.373 4.811H82.16v12.377h4.213V4.811ZM96.986 4.332c-1.835 0-3.435.647-4.259 1.676V0h-4.236v17.188h4.002l.096-1.34c.777 1.15 2.447 1.82 4.4 1.82 3.838 0 6.921-2.346 6.921-6.631 0-4.286-3.083-6.705-6.92-6.705h-.004Zm-.965 9.838c-2.236 0-3.646-1.22-3.646-3.136 0-1.917 1.413-3.207 3.646-3.207 2.234 0 3.647 1.243 3.647 3.207 0 1.963-1.413 3.136-3.647 3.136ZM109.766 0h-4.236v17.188h4.236V0ZM119.438 14.364c-1.976 0-3.531-.79-3.811-2.513h11.179v-.982c0-4.69-3.435-6.56-7.718-6.56-4.634 0-7.694 2.369-7.694 6.704 0 4.335 3.201 6.655 8.073 6.655 3.412 0 6.212-1.103 7.365-4.356l-4.14-.503c-.59 1.15-1.743 1.555-3.248 1.555h-.006Zm-.095-7.11c1.482 0 2.635.55 3.083 1.652h-6.542c.563-1.196 1.788-1.652 3.459-1.652ZM141.121 10.99c-.966-1.7-3.274-1.87-5.349-1.87-1.93 0-3.646.144-3.646-.86 0-.742.869-1.174 2.236-1.174 1.601 0 2.635.574 3.152 1.461l3.838-.717c-1.035-2.395-3.225-3.495-6.637-3.495-3.976 0-6.45 1.508-6.45 4.477 0 3.615 3.624 3.83 6.12 3.877 1.953.023 3.129-.047 3.129.934 0 .885-1.011 1.15-2.352 1.15-1.34 0-2.658-.265-3.343-1.508l-3.906.717c.682 2.513 3.481 3.686 7.108 3.686 1.499 0 2.86-.2 3.947-.665l2.155-6.013h-.002Z")',
    "--angle": "3.7301934516956616deg",
    "--vw": "15.36px",
    "--cw": "15.36px",
    "--vh": "3.14px",
    "--ch": "83.45px",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
    "--x": "0em",
    position: "fixed",
    top: "3.625rem",
    left: "var(--container-abs-offset)",
    zIndex: 10,
    aspectRatio: "150/22",
    width: "9.375rem",
    height: "auto",
    transformOrigin: "0 0",
    willChange: "transform",
  };

  return (
    <div className="sb-logo" style={styles}>
      <div className="sb__text"></div>
      <div className="sb__slash"></div>
      <div className="sb__background"></div>
      <div className="sb__cast"></div>
      <div className="sb__glow"></div>
      <span className="u-sr-only">incredibles</span>
    </div>
  );
};

export default Logo;
