export type Project = {
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  imageAlt: string;
  stack: string[];
  github: string;
  preview?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Request Live Music",
    eyebrow: "Mobile product",
    description:
      "A cross-platform app that connects audiences with nearby live entertainers for real-time song requests. Built around location-aware discovery, role-based experiences, and live request management.",
    image: "/img/portfolio/request-live-main.webp",
    imageAlt: "Request Live Music mobile application screens",
    stack: ["Flutter", "Dart", "Firebase", "Cloud Firestore"],
    github: "https://github.com/derekdotdev/request-live-mobile",
    featured: true,
  },
  {
    title: "Youth Homelessness Project",
    eyebrow: "Civic technology",
    description:
      "A privacy-conscious platform that helps students find relevant local resources while giving authorized city staff tools to understand needs and maintain assistance programs.",
    image: "/img/portfolio/youth-homelessness.webp",
    imageAlt: "Youth Homelessness Project resource interface",
    stack: ["Java", "Spring Boot", "Spring Security", "SQL"],
    github: "https://github.com/derekdotdev/YouthHomelessnessProject",
    preview: "https://vimeo.com/723512095",
    featured: true,
  },
  {
    title: "Cat Tracker 5000",
    eyebrow: "Embedded experiment",
    description:
      "An Arduino data-collection system that measures a pet’s response time at mealtime using sound and motion sensors, timestamps each event, and exports the results for analysis.",
    image: "/img/portfolio/cat-tracker.webp",
    imageAlt: "Cat Tracker hardware and data visualization",
    stack: ["Arduino", "C++", "Sensors", "Data logging"],
    github: "https://github.com/derekdotdev/cat-tracker",
    preview: "https://vimeo.com/718704776",
  },
];
