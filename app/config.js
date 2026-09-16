// Your name appears in the top navigation and page titles.
export const name = "John Collins";
export const websiteDescription = `${name}'s personal website.`;

// Add, remove, or reorder links here. href accepts local paths or external URLs.
export const navigationLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
];

// Home page profile. Put the photo in public/ and set its filename below.
// Leave filename empty for a blank photo placeholder. Facts can optionally link to
// another page, an external website, or an email address.
// Edit the main introduction separately in app/components/intro.mdx.
export const ownerProfile = {
  photo: {
    filename: "20260907_185253.jpg",
    alt: `Portrait of ${name}`,
  },
  facts: [
    { label: "Now", value: "Student at Mass Tech" },
    { label: "Studying", value: "Deep Learning, AI Safety" },
    { label: "Interests", value: "Unsupervised learning, AI safety, computational biology, systems programming" },
    {
      label: "Contact",
      value: "[first name] t i j [last initial] [organization suffix], no spaces",
    },
  ],
  // Heading for the links section below the profile facts.
  linksTitle: "Links",
  // Replace these example URLs with yours.
  // Add, remove, or reorder entries; use [] to hide the list.
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/john-collins-a34810437/" },
    //{ label: "Google Scholar", href: "https://scholar.google.com/citations?user=your-id" },
  ],
};

// Fonts: use a Google Fonts family name (e.g. "Open Sans"), or one of:
//   { family: "Open Sans", weights: [400, 500, 600, 700] }
//   { family: "Custom Serif", stylesheet: "https://example.com/fonts.css" }
//   { family: "Custom Mono", src: "https://example.com/mono.woff2", weight: "100 900" }
// For stylesheet links, family must match the CSS font-family in that stylesheet.
// Direct files accept optional weight (default "400") and style (default "normal").
// Use null for a system font stack. A Google name alone loads its regular style;
// use weights or a Google stylesheet URL for additional weights/italic styles.
// External fonts load in the visitor's browser. No layout or CSS edits are needed.
/** @type {import('./lib/fonts').FontConfig} */
export const fonts = {
  sans: { family: "Geist", weights: [400, 500, 600, 700] },
  serif: { family: "PT Serif", weights: [400, 500, 600, 700] },
  monospace: { family: "Geist Mono", weights: [400, 500, 600, 700] },
};

// Default site font. Explicit font-serif/font-sans/font-mono styles still override it.
/** @type {'sans' | 'serif' | 'monospace'} */
export const defaultFont = "serif";

// computed values

export const metadata = {
  title: {
    default: `Home ⋅ ${name}`,
    template: `%s ⋅ ${name}`,
  },
  description: websiteDescription,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
