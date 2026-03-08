export const Colors = {
  primary: "#9D4EDD",
  secondary: "#3A86FF",
  accent: "#FB5607",
  background: "#151718",
  surface: "#1e2022",
  foreground: "#ECEDEE",
  muted: "#9BA1A6",
  border: "#334155",
  success: "#4ADE80",
  warning: "#FB5607",
  error: "#F87171",
} as const;

export type ColorKey = keyof typeof Colors;
