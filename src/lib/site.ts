export const EMAIL = "drew@drewnagda.com";

const subject = "Distressed property: [address]";
const body = [
  "Hi Drew,",
  "",
  "Address:",
  "What happened to it (fire, probate, vacant, tenant, other):",
  "My timeline:",
  "Best number to reach me:",
  "",
  "Photos attached.",
].join("\n");

export const PROPERTY_MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
export const HELLO_MAILTO = `mailto:${EMAIL}`;

export const SOCIALS = [
  { label: "X", href: "https://x.com/nagda" },
  { label: "LinkedIn", href: "https://linkedin.com/in/drewnagda" },
  { label: "YouTube", href: "https://youtube.com/@drewnagda" },
];
