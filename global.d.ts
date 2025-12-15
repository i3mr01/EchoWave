import type * as React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ms-store-badge": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        productid?: string;
        productname?: string;
        "window-mode"?: string;
        theme?: string;
        size?: string;
        language?: string;
        animation?: string;
      };
    }
  }
}

