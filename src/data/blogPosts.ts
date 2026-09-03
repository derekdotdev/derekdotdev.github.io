export type BlogPost = {
  title: string;
  description: string;
  eyebrow: string;
  href: string;
};

export const blogPosts: BlogPost[] = [
  {
    title: "Modernizing Tomahawk’s Android app, one feature at a time.",
    description:
      "How a focused Compose experiment became a repeatable path from imperative Java to testable, reusable Android architecture.",
    eyebrow: "Android · Architecture",
    href: "/blog/modernizing-android-architecture/",
  },
  {
    title: "An idea that started a career.",
    description:
      "The story of Request Live Music, from a song-request problem behind the booth to a cross-platform product and the first crash that taught me to debug by understanding the domain.",
    eyebrow: "Origin story · Product building",
    href: "/blog/request-live-music/",
  },
];
