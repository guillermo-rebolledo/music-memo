export const site = {
  name: "Memo's Music Journal",
  description: "Plain notes on what I listen to.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://memorebo.dev",
  author: {
    name: "Memo Rebolledo",
    url: "https://memorebo.dev",
  },
  locale: "en-US",
} as const;
