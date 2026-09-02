export type Principle = {
  number: string;
  title: string;
  description: string;
};

export type Impact = Principle & {
  category: string;
  outcomes: string[];
};

export type Capability = Omit<Principle, "description"> & {
  description: string;
};

export const principles: Principle[] = [
  {
    number: "01",
    title: "Architecture owner",
    description:
      "Define UI conventions and boundaries that keep Compose features consistent as the application evolves.",
  },
  {
    number: "02",
    title: "Loosely coupled",
    description:
      "Use domain interfaces, dependency inversion, and Hilt to keep responsibilities explicit and replaceable.",
  },
  {
    number: "03",
    title: "Built to last",
    description:
      "Apply SOLID principles, clean code, and focused tests to make change safer over the long term.",
  },
];

export const impacts: Impact[] = [
  {
    number: "01",
    category: "Android modernization",
    title: "Modernized application architecture.",
    description:
      "Led the transition from imperative Java and observer-based patterns to Jetpack Compose, MVI, Clean Architecture, Hilt, and layered automated testing.",
    outcomes: [
      "Reusable UI patterns",
      "Dependency-inverted boundaries",
      "Testable state",
    ],
  },
  {
    number: "02",
    category: "Workflow automation",
    title: "Simplified hardware integration.",
    description:
      "Architected operator-facing Android workflows that replaced manual, CLI-driven vehicle and radio pairing with dynamic discovery and automated configuration.",
    outcomes: [
      "Lower operational complexity",
      "Dynamic configuration",
      "Operator-first UX",
    ],
  },
  {
    number: "03",
    category: "Native interoperability",
    title: "Connected Android to native systems.",
    description:
      "Designed bounded JNI integrations that expose existing C++ capabilities through maintainable Android data-layer interfaces.",
    outcomes: ["JNI / C++", "Data-layer isolation", "Stable domain contracts"],
  },
];

export const capabilities: Capability[] = [
  {
    number: "01",
    title: "UI Architecture",
    description:
      "Translate product designs into reusable, themed Material 3 components and establish consistent Compose and MVI state patterns across the application.",
  },
  {
    number: "02",
    title: "App Architecture",
    description:
      "Clean Architecture, SOLID principles, domain interfaces, dependency inversion, and Hilt.",
  },
  {
    number: "03",
    title: "Platform & Data",
    description:
      "Design lifecycle-aware foreground services for reliable long-running work under Android’s background-execution constraints, with Room persistence and bounded JNI/C++ integration.",
  },
  {
    number: "04",
    title: "Testing & Quality",
    description:
      "Build confidence with pure Kotlin unit tests, Flow testing with Turbine, instrumented tests, and automated Jetpack Compose UI tests using JUnit and AssertK.",
  },
];
