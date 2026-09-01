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
    image: "/img/portfolio/request-live-main.png",
    imageAlt: "Request Live Music mobile application screens",
    stack: ["Flutter", "Dart", "Firebase", "Cloud Firestore"],
    github: "https://github.com/derekdotdev/request-live-mobile",
    preview: "https://vimeo.com/708658225",
    featured: true,
  },
  {
    title: "Youth Homelessness Project",
    eyebrow: "Civic technology",
    description:
      "A privacy-conscious platform that helps students find relevant local resources while giving authorized city staff tools to understand needs and maintain assistance programs.",
    image: "/img/portfolio/youth-homelessness.png",
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
    image: "/img/portfolio/cat-tracker.png",
    imageAlt: "Cat Tracker hardware and data visualization",
    stack: ["Arduino", "C++", "Sensors", "Data logging"],
    github: "https://github.com/derekdotdev/cat-tracker",
    preview: "https://vimeo.com/718704776",
  },
  {
    title: "Expense Tracker API",
    eyebrow: "Backend system",
    description:
      "A secure REST API for managing expenses, designed around clear CRUD workflows, persistent relational data, and token-based authentication.",
    image: "/img/portfolio/expense-tracker.png",
    imageAlt: "Expense Tracker API documentation",
    stack: ["Java", "Spring Boot", "JPA", "JWT"],
    github: "https://github.com/derekdotdev/expense-tracker-rest-api",
  },
  {
    title: "Dart Todo List",
    eyebrow: "Cross-platform app",
    description:
      "A focused task-management application exploring application state, authentication, data persistence, and consistent interactions across mobile and web.",
    image: "/img/portfolio/todo-list-main.png",
    imageAlt: "Dart Todo List application screens",
    stack: ["Flutter", "Dart", "Provider", "Firebase"],
    github: "https://github.com/derekdotdev/TodoList-Flutter",
    preview: "https://vimeo.com/723338757",
  },
  {
    title: "Word Frequency Counter",
    eyebrow: "Desktop utility",
    description:
      "A JavaFX tool that extracts text from a selected webpage region, analyzes word frequency, and presents ranked results in a desktop interface.",
    image: "/img/portfolio/word-frequency-analyzer.png",
    imageAlt: "Word Frequency Counter desktop interface",
    stack: ["Java", "JavaFX", "Regex", "MySQL"],
    github: "https://github.com/derekdotdev/JavaFX-Word-Frequency-Counter",
    preview: "https://vimeo.com/636527956",
  },
];
