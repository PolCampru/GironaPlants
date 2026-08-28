// Design tokens for the whole site. Components read these through
// styled-components' `theme` prop — never hardcode a hex in a component.
//
// The brand (green, cream, logo) is unchanged; everything around it is a
// system now: one type ramp, one 4px spacing scale, one set of radii and
// shadows. `sand` and `footerBlur` were dropped — nothing referenced them.

const colors = {
  // Brand
  brandGreen: "#118B50",
  /** Pressed/hover for solid green. Darkens; the old translucent hover
   *  lightened the button against the page, which read as disabled. */
  greenDeep: "#0C6E3E",
  hoverGreen2: "#0C6E3E",
  /** Tint behind ghost/hovered controls. */
  hoverGreen: "rgba(17, 139, 80, 0.08)",
  lightGreen: "#DCF0DF",
  lime: "#E4F68E",
  moss: "#0A2A35",

  // Neutrals — warm, so they sit on the cream page instead of fighting it
  /** Page ground. */
  paper: "#FAF7F0",
  /** Alias kept for components still written against the old name. */
  creamLight: "#FAF7F0",
  cream: "#FFFDD0",
  white: "#FFFFFF",
  /** Body text. */
  dark: "#201716",
  /** Secondary text — 6.6:1 on paper. Replaces mediumGray, which was 2.2:1. */
  muted: "#635C55",
  /** Hairline between sections and around cards. */
  line: "#E7E2D8",
  /** Softer divider, e.g. between table rows. */
  lineSoft: "#F0EBE1",
  /** Control borders. */
  gray: "#D5CEC2",
  /** Placeholder text only — never body copy. */
  mediumGray: "#9A948C",
  lightGray: "#F4F5F6",

  // Accents
  orange: "#FF7744",
  discountRed: "rgba(255, 20, 24, 0.76)",
  /** Form errors and destructive actions. */
  danger: "#C2410C",
  red: "#C2410C",
};

const space = {
  xs: "0.25rem", // 4
  sm: "0.5rem", // 8
  md: "0.75rem", // 12
  lg: "1rem", // 16
  xl: "1.5rem", // 24
  "2xl": "2rem", // 32
  "3xl": "3rem", // 48
  "4xl": "4rem", // 64
  /** Vertical rhythm between page sections. */
  section: "6rem", // 96
  sectionSm: "4rem", // 64
};

const radii = {
  field: "0.25rem",
  card: "0.875rem",
  panel: "1.25rem",
  pill: "62.5rem",
};

const shadow = {
  sm: "0 1px 2px rgba(32, 23, 22, 0.06)",
  md: "0 8px 24px rgba(10, 42, 53, 0.08)",
  lg: "0 20px 48px rgba(10, 42, 53, 0.14)",
  ring: "0 0 0 3px rgba(17, 139, 80, 0.14)",
};

const font = {
  /** Headlines. */
  display: "var(--font-newsreader), Georgia, 'Times New Roman', serif",
  /** Body and UI. */
  body: "var(--font-manrope), 'Helvetica Neue', Arial, sans-serif",
};

const layout = {
  /** Max content width; the gutters live in .layout-content. */
  maxWidth: "77.5rem", // 1240
  navHeight: "4.75rem", // 76
};

/** Minimum interactive target. */
const control = {
  height: "2.75rem", // 44
  heightLg: "3.25rem", // 52
};

const theme = { colors, space, radii, shadow, font, layout, control };

export type AppTheme = typeof theme;

export default theme;
