import { createStitches } from '@stitches/react';
import { darkTokens, lightTokens } from './tokens';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  createTheme,
  getCssText,
  theme,
} = createStitches({
  theme: lightTokens,
  media: {
    sm: '(min-width: 640px)',
    md: '(min-width: 860px)',
    lg: '(min-width: 1180px)',
  },
  utils: {
    px: (value: string | number) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: string | number) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    mx: (value: string | number) => ({ marginLeft: value, marginRight: value }),
    my: (value: string | number) => ({ marginTop: value, marginBottom: value }),
  },
});

export const darkTheme = createTheme('dark-theme', { colors: darkTokens });

export type CSS = Parameters<typeof css>[0];
