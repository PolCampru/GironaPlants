import "styled-components";
import type { AppTheme } from "@/lib/theme";

// Makes `props.theme` in every styled component resolve to the real token
// object instead of styled-components' empty DefaultTheme.
declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}
