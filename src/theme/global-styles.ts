import { globalCss } from './index';

export const globalStyles = globalCss({
  '@import':
    'url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap")',

  '*, *::before, *::after': { boxSizing: 'border-box' },
  html: {
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  'html, body, #root': { height: '100%' },
  body: {
    margin: 0,
    fontFamily: '$sans',
    fontSize: '$3',
    lineHeight: '$normal',
    color: '$text',
    backgroundColor: '$bg',
    transition: 'background-color 150ms ease, color 150ms ease',
  },
  'h1, h2, h3, h4, p, figure': { margin: 0 },
  a: { color: 'inherit' },
  'button, input, textarea, select': { fontFamily: 'inherit' },
  ul: { listStyle: 'none', margin: 0, padding: 0 },
});
