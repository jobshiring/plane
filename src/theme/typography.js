// ----------------------------------------------------------------------

// Convert pixel values to rem for better scalability
const pxToRem = (value) => `${value / 16}rem`;

// Generate responsive font sizes for different screen widths
const responsiveFontSizes = ({ sm, md, lg }) => ({
  "@media (max-width:600px)": { fontSize: pxToRem(sm) },
  "@media (min-width:900px)": { fontSize: pxToRem(md) },
  "@media (min-width:1200px)": { fontSize: pxToRem(lg) },
});

// Typography settings following modern best practices
const typography = {
  // --- FONT WEIGHT ADJUSTMENTS ---
  fontWeightRegular: 400,
  fontWeightMedium: 500, // Reduced from 600 for better distinction from Bold
  fontWeightSemiBold: 600, // Added a standard semi-bold
  fontWeightBold: 700,
  fontWeightExtraBold: 800,
  fontWeightBlack: 900,

  // Headings
  h1: {
    fontWeight: 800,
    lineHeight: 1.2, // Tighter line height for large headers
    fontSize: pxToRem(48),
    letterSpacing: 1.25, // Crisp, tighter letter spacing for impact
    ...responsiveFontSizes({ sm: 36, md: 58, lg: 64 }),
  },
  h2: {
    fontWeight: 800,
    lineHeight: 1.25,
    fontSize: pxToRem(36),
    letterSpacing: -0.5,
    ...responsiveFontSizes({ sm: 30, md: 44, lg: 48 }),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.4, // Slightly looser for better readability
    fontSize: pxToRem(28),
    letterSpacing: 0,
    ...responsiveFontSizes({ sm: 24, md: 30, lg: 32 }),
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.4,
    fontSize: pxToRem(24),
    letterSpacing: 0.25,
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontWeight: 600, // Changed to SemiBold (600) for common headings
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 18, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 600, // SemiBold
    lineHeight: 1.6,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 16, md: 18, lg: 18 }),
  },

  // Subtitles
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
    letterSpacing: 0.15, // Subtle spacing for clarity
  },
  subtitle2: {
    fontWeight: 500, // Medium weight for less emphasis
    lineHeight: 1.6,
    fontSize: pxToRem(14),
  },

  // Body text - Increased font sizes for better default readability
  body1: {
    lineHeight: 1.6, // Increased line height (from 1.5) for long paragraphs
    fontSize: pxToRem(16), // Increased default size (from 14)
  },
  body2: {
    lineHeight: 1.6,
    fontSize: pxToRem(14), // Increased default size (from 12)
  },

  // Miscellaneous text styles
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12), // Increased default size (from 10)
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    letterSpacing: 1.5, // Increased letter spacing for the uppercase effect
    textTransform: "uppercase", // Added transform hint
  },
  button: {
    fontWeight: 700,
    lineHeight: 1.75,
    fontSize: pxToRem(14),
    letterSpacing: 0.5, // Standard button letter spacing
    textTransform: "none", // Added hint for keeping capitalization natural
  },
};

export default typography;
