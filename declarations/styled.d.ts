import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      surfacePrimary: string;
      surfaceContrast: string;
      surfaceDefault: string;
      color: string;
      colorInverse: string;
      colorHeader: string;
      colorDim: string;
      colorLink: string;
      colorLinkHover: string;
    };
    fonts: {
      sans: string;
      mono: string;
    };
    sizes: {
      maxWidth: number;
    };
  }
}
