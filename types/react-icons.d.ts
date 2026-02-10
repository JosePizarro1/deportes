declare module "react-icons/*" {
  import * as React from "react";
  export type IconType = React.ComponentType<
    React.SVGProps<SVGSVGElement> & { size?: string | number; color?: string; title?: string }
  >;
}
